import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUser } from "@/lib/auth";
import { orderService } from "@/services/orderService";
import { cartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";
import {
  isValidDNA,
  isValidMutation,
  computeTotalPrice,
} from "@/utils/pricing";

// ─── Constants ─────────────────────────────────────────────────────────────────

export const MAX_FRAGMENTS = 5;
export const MAX_MUTATIONS = 4;

const MUTATION_FORMAT = /^([ACGTacgt])(\d+)([ACGTacgt])$/i;

const BUILD_TYPE_MAP = {
  0: "MULTI_INSERT",
  1: "MUTAGENESIS",
  2: "NEW_BACKBONE",
} as const;

export const INITIAL_FRAGMENT_COUNT: Record<0 | 1 | 2, number> = {
  0: 1,
  1: 1,
  2: 2,
};

// ─── Types ─────────────────────────────────────────────────────────────────────

export type BuildOption = 0 | 1 | 2;

export type Backbone = {
  name: string;
  sequence: string;
};

export type Fragment = {
  name: string;
  sequence: string;
  dnaType: string;
};

const emptyFragment = (): Fragment => ({ name: "", sequence: "", dnaType: "" });

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useOrderForm = () => {
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();

  // ── Auth ──────────────────────────────────────────────────────────────────

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isAuthenticated().then(setLoggedIn);
  }, []);

  // ── Build type ────────────────────────────────────────────────────────────

  const [selectedOption, setSelectedOption] = useState<BuildOption>(0);

  // ── Plasmid name ──────────────────────────────────────────────────────────

  const [plasmidName, setPlasmidName] = useState("");
  const [plasmidError, setPlasmidError] = useState("");

  // ── Backbones ─────────────────────────────────────────────────────────────

  const [backbones, setBackbones] = useState<Backbone[]>([]);
  const [selectedBackbone, setSelectedBackbone] = useState<string | null>(null);
  const [backboneSelectedError, setBackboneSelectedError] = useState("");

  const [newBackboneName, setNewBackboneName] = useState("");
  const [newBackboneSequence, setNewBackboneSequence] = useState("");
  const [backboneUploadError, setBackboneUploadError] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      setBackbones([]);
      setSelectedBackbone(null);
      return;
    }
    getUser()
      .then((user) => {
        if (user) return orderService.getUserBackbones(user.id);
      })
      .then((data) => {
        if (data) setBackbones(data);
      })
      .catch((err) => console.error("Failed to load backbones:", err));
  }, [loggedIn]);

  const getBackboneByName = (name: string | null): Backbone | undefined =>
    backbones.find((b) => b.name === name);

  const getBackboneSize = (): string => {
    const bb = getBackboneByName(selectedBackbone);
    return bb ? `${bb.sequence.length} bp` : "";
  };

  const getBackboneLength = (): number =>
    getBackboneByName(selectedBackbone)?.sequence.length ?? 0;

  const getBackboneSequence = (): string =>
    getBackboneByName(selectedBackbone)?.sequence ?? "";

  // ── Fragments ─────────────────────────────────────────────────────────────

  const [fragments, setFragments] = useState<Fragment[]>(
    Array(INITIAL_FRAGMENT_COUNT[0]).fill(null).map(emptyFragment)
  );
  const [fragmentErrors, setFragmentErrors] = useState<string[]>([]);

  const updateFragmentField = (
    index: number,
    field: keyof Fragment,
    value: string
  ) => {
    setFragments((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

    // Inline sequence validation only — name validation is submit-only
    if (field === "sequence") {
      const error =
        value.trim() !== "" && !isValidDNA(value)
          ? "Fragment can only contain A, C, G, or T."
          : "";
      setFragmentErrors((prev) => {
        const next = [...prev];
        next[index] = error;
        return next;
      });
    }

    // Clear error when DNA type is selected
    if (field === "dnaType") {
      setFragmentErrors((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
    }
  };

  const addFragment = () => {
    if (fragments.length >= MAX_FRAGMENTS) return;
    setFragments((prev) => [...prev, emptyFragment()]);
  };

  const deleteFragment = (index: number, isRequired: boolean) => {
    setFragments((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = emptyFragment()) : next.splice(index, 1);
      return next;
    });
    setFragmentErrors((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = "") : next.splice(index, 1);
      return next;
    });
  };

  // ── Mutations ─────────────────────────────────────────────────────────────

  const [mutations, setMutations] = useState<string[]>([""]);
  const [mutationErrors, setMutationErrors] = useState<string[]>([""]);

  const updateMutation = (index: number, value: string) => {
    setMutations((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    const charError =
      value.trim() !== "" && !/^[ACGTacgt0-9]*$/.test(value)
        ? "Mutation can only contain A, C, G, T, and numbers."
        : "";

    setMutationErrors((prev) => {
      const next = [...prev];
      next[index] = charError;
      return next;
    });
  };

  const addMutation = () => {
    if (mutations.length >= MAX_MUTATIONS) return;
    setMutations((prev) => [...prev, ""]);
    setMutationErrors((prev) => [...prev, ""]);
  };

  const deleteMutation = (index: number, isRequired: boolean) => {
    setMutations((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = "") : next.splice(index, 1);
      return next;
    });
    setMutationErrors((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = "") : next.splice(index, 1);
      return next;
    });
  };

  // ── Build type switching ───────────────────────────────────────────────────

  const selectBuildOption = (option: BuildOption) => {
    if (option === selectedOption) return;

    setSelectedOption(option);

    const initialCount = INITIAL_FRAGMENT_COUNT[option];
    setFragments(Array(initialCount).fill(null).map(emptyFragment));
    setMutations([""]);
    setMutationErrors([""]);
    setPlasmidName("");
    setSelectedBackbone(null);

    setFragmentErrors([]);
    setPlasmidError("");
    setSubmissionError("");
    setBackboneSelectedError("");
    setBackboneUploadError("");
    setMutationSubmitError("");
    setTargetRegion("");
    setTargetRegionError("");
  };

  // ── Submit-level errors ───────────────────────────────────────────────────

  const [submissionError, setSubmissionError] = useState("");
  const [mutationSubmitError, setMutationSubmitError] = useState("");

  // ── Async state ───────────────────────────────────────────────────────────

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  // ─── Validation ────────────────────────────────────────────────────────────

  const validatePlasmidName = (name: string): boolean => {
    let error = "";
    if (name.trim() === "")
      error = "Plasmid name is required.";
    else if (name.length > 50)
      error = "Plasmid name must be 50 characters or less.";
    else if (!/^[a-zA-Z0-9]+$/.test(name))
      error = "Plasmid name can only contain letters and numbers.";

    setPlasmidError(error);
    return error === "";
  };

  /** Returns true if any fragment has an error. */
  const validateFragments = (): boolean => {
    const errors: string[] = Array(fragments.length).fill("");

    fragments.forEach((frag, i) => {
      const trimmedSeq = frag.sequence.trim();
      const trimmedName = frag.name.trim();

      // Name validation — required, alphanumeric, max 50 chars
      if (!trimmedName) {
        errors[i] = "Fragment name is required.";
        return;
      } else if (trimmedName.length > 50) {
        errors[i] = "Fragment name must be 50 characters or less.";
        return;
      } else if (!/^[a-zA-Z0-9]+$/.test(trimmedName)) {
        errors[i] = "Fragment name can only contain letters and numbers.";
        return;
      }

      // Sequence validation
      if (trimmedSeq === "") {
        if (selectedOption === 0 && frag.dnaType.trim())
          errors[i] = "Please enter a corresponding fragment sequence.";
      } else if (!isValidDNA(trimmedSeq)) {
        errors[i] = "Fragment can only contain A, C, G, or T.";
      } else if (selectedOption === 0 && !frag.dnaType) {
        errors[i] = "Please select a DNA type.";
      }
    });

    setFragmentErrors(errors);
    return errors.some((e) => e !== "");
  };

  /** Returns true if there is an error. */
  const validateBackboneUpload = (name: string, sequence: string): boolean => {
    let error = "";
    if (!name.trim())
      error = "Backbone name is required.";
    else if (name.length > 100)
      error = "Backbone name must be 100 characters or less.";
    else if (!/^[a-zA-Z0-9]+$/.test(name))
      error = "Backbone name can only contain letters and numbers.";
    else if (!sequence.trim())
      error = "Backbone sequence is required.";
    else if (!isValidDNA(sequence))
      error = "Backbone sequence can only contain DNA bases (A, C, G, T).";

    setBackboneUploadError(error);
    return error !== "";
  };

  const validateBackboneSelected = (): boolean => {
    const error = !selectedBackbone ? "Select or upload a backbone." : "";
    setBackboneSelectedError(error);
    return error !== "";
  };

  /** Returns true if there is an error. */
  const validateOrder = (): boolean => {
    const needsFragment = selectedOption === 0 || selectedOption === 2;
    const error =
      needsFragment && !fragments.some((f) => f.sequence.trim() !== "")
        ? "Enter at least one fragment."
        : "";
    setSubmissionError(error);
    return error !== "";
  };

  // ── Target region ─────────────────────────────────────────────────────────

  const [targetRegion, setTargetRegion] = useState("");
  const [targetRegionError, setTargetRegionError] = useState("");

  const validateTargetRegion = (sequence: string): boolean => {
    const trimmed = sequence.trim().toUpperCase();
    let error = "";

    if (!trimmed) {
      error = "Target mutation region is required.";
    } else if (!isValidDNA(trimmed)) {
      error = "Target region can only contain A, C, G, or T.";
    } else {
      const backboneSeq = getBackboneSequence().toUpperCase();
      if (!backboneSeq) {
        error = "Select a backbone before entering a target region.";
      } else if (!backboneSeq.includes(trimmed)) {
        error = "Target region was not found in the selected backbone sequence.";
      }
    }

    setTargetRegionError(error);
    return error !== "";
  };

  const updateTargetRegion = (value: string) => {
    setTargetRegion(value);
    if (targetRegionError) validateTargetRegion(value);
  };

  const validateMutations = (): boolean => {
    if (selectedOption !== 1) {
      setMutationSubmitError("");
      return false;
    }

    if (!selectedBackbone) {
      setMutationSubmitError("A backbone must be selected to validate mutations.");
      return true;
    }

    const trimmedTarget = targetRegion.trim().toUpperCase();
    if (!trimmedTarget) {
      setMutationSubmitError("Enter a target mutation region before submitting.");
      return true;
    }

    const targetLength = trimmedTarget.length;
    const validPairs: Record<string, string> = { A: "T", T: "A", C: "G", G: "C" };

    for (let i = 0; i < mutations.length; i++) {
      const mut = mutations[i].trim();
      if (!mut) continue;

      const match = mut.match(MUTATION_FORMAT);
      if (!match) {
        setMutationSubmitError(
          `Mutation ${i + 1} must be in the format A123T (A, C, G, T only).`
        );
        return true;
      }

      const fromBase = match[1].toUpperCase();
      const position = parseInt(match[2], 10);
      const toBase = match[3].toUpperCase();

      if (validPairs[fromBase] !== toBase) {
        setMutationSubmitError(
          `Mutation ${i + 1} is invalid: ${fromBase} can only mutate to ${validPairs[fromBase]}.`
        );
        return true;
      }

      if (position < 1 || position > targetLength) {
        setMutationSubmitError(
          `Mutation ${i + 1} position ${position} is outside the target region length (${targetLength} bp).`
        );
        return true;
      }

      const actualBase = trimmedTarget[position - 1];
      if (actualBase !== fromBase) {
        setMutationSubmitError(
          `Mutation ${i + 1}: position ${position} is ${actualBase}, not ${fromBase}.`
        );
        return true;
      }
    }

    setMutationSubmitError("");
    return false;
  };

  /** Runs all validators. Returns true if the form is valid. */
  const validateAll = (): boolean => {
    const nameOk = validatePlasmidName(plasmidName);
    const hasFragmentErrors = validateFragments();
    const hasOrderErrors = validateOrder();
    const hasBackboneError = validateBackboneSelected();
    const hasTargetRegionError = selectedOption === 1
      ? validateTargetRegion(targetRegion)
      : false;
    const hasMutationErrors = validateMutations();

    return nameOk && !hasFragmentErrors && !hasOrderErrors && !hasBackboneError && !hasTargetRegionError && !hasMutationErrors;
  };

  // ─── Backbone upload handler ───────────────────────────────────────────────

  const submitBackboneUpload = (): boolean => {
    if (validateBackboneUpload(newBackboneName, newBackboneSequence)) return false;

    setBackbones((prev) => [
      ...prev,
      { name: newBackboneName, sequence: newBackboneSequence },
    ]);
    setSelectedBackbone(newBackboneName);
    setNewBackboneName("");
    setNewBackboneSequence("");
    return true;
  };

  // ─── Cart + Order submission ───────────────────────────────────────────────

  const buildOrderPayload = async (userId: string) => {
    const buildType = BUILD_TYPE_MAP[selectedOption];

    const totalPrice = computeTotalPrice(
      selectedOption,
      fragments.map((f) => f.sequence),
      mutations,
      selectedBackbone
    );

    const fragmentsData = fragments
      .filter((f) => f.sequence.trim() !== "")
      .map((f) => ({
        name: f.name.trim(),
        sequence: f.sequence.trim(),
        dnaType: f.dnaType || "SYNTHETIC",
      }));

    const mutationsData = mutations
      .map((m) => m.trim())
      .filter((m) => m !== "" && isValidMutation(m));

    return {
      supabaseUserId: userId,
      plasmidName,
      buildType,
      backboneName: selectedBackbone,
      fragments: fragmentsData,
      mutations: mutationsData,
      price: totalPrice,
      totalPrice,
    };
  };

  const resetFormAfterSuccess = () => {
    setPlasmidName("");
    setFragments(Array(INITIAL_FRAGMENT_COUNT[selectedOption]).fill(null).map(emptyFragment));
    setMutations([""]);
  };

  const addToCart = async () => {
    if (isAddingToCart || !validateAll()) return;

    if (!loggedIn) {
      setOrderError("You must be logged in to add to cart.");
      return;
    }

    setIsAddingToCart(true);
    setOrderError("");
    setOrderSuccess(false);

    try {
      const user = await getUser();
      if (!user) throw new Error("Unable to get user information.");

      const payload = await buildOrderPayload(user.id);
      await cartService.addToCart(payload);
      await refreshCartCount();

      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        resetFormAfterSuccess();
      }, 2000);
    } catch (error: any) {
      setOrderError(error.response?.data || error.message || "Failed to add to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const submitOrder = async () => {
    if (isSubmitting || !validateAll()) return;

    setIsSubmitting(true);
    setOrderError("");
    setOrderSuccess(false);

    try {
      const user = loggedIn ? await getUser() : null;

      const buildType = BUILD_TYPE_MAP[selectedOption];
      const totalPrice = computeTotalPrice(
        selectedOption,
        fragments.map((f) => f.sequence),
        mutations,
        selectedBackbone
      );

      const fragmentsData = fragments
        .filter((f) => f.sequence.trim() !== "")
        .map((f) => ({
          name: f.name.trim(),
          sequence: f.sequence.trim(),
          dnaType: f.dnaType || "SYNTHETIC",
        }));

      const mutationsData = mutations
        .map((m) => m.trim())
        .filter((m) => m !== "" && isValidMutation(m));

      const orderData = {
        plasmidName,
        buildType,
        backboneName: selectedBackbone,
        fragments: fragmentsData,
        mutations: mutationsData,
        totalPrice,
        ...(user && { supabaseUserId: user.id }),
      };

      // TODO: replace with actual checkout page once built
      navigate("/checkout", { state: { order: orderData } });

    } catch (error: any) {
      setOrderError(error.message || "Failed to proceed to checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Exposed API ───────────────────────────────────────────────────────────

  return {
    // Auth
    loggedIn,

    // Build type
    selectedOption,
    selectBuildOption,

    // Plasmid name
    plasmidName,
    setPlasmidName,
    plasmidError,
    validatePlasmidName,

    // Backbones
    backbones,
    selectedBackbone,
    setSelectedBackbone,
    backboneSelectedError,
    setBackboneSelectedError,
    getBackboneSize,
    getBackboneLength,
    getBackboneSequence,

    // Backbone paste form
    newBackboneName,
    setNewBackboneName,
    newBackboneSequence,
    setNewBackboneSequence,
    backboneUploadError,
    submitBackboneUpload,

    // Fragments
    fragments,
    fragmentErrors,
    updateFragmentField,
    addFragment,
    deleteFragment,

    // Target region (mutagenesis)
    targetRegion,
    targetRegionError,
    updateTargetRegion,
    validateTargetRegion,

    // Mutations
    mutations,
    mutationErrors,
    updateMutation,
    addMutation,
    deleteMutation,

    // Submit-level errors
    submissionError,
    mutationSubmitError,

    // Async state
    isSubmitting,
    isAddingToCart,
    orderSuccess,
    orderError,

    // Actions
    addToCart,
    submitOrder,
  };
};
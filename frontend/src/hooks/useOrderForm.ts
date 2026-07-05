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

/** Maps the selected build option to its API string. */
const BUILD_TYPE_MAP = {
  0: "MULTI_INSERT",
  1: "MUTAGENESIS",
  2: "NEW_BACKBONE",
} as const;

/** Minimum number of fragments required before the user can add more. */
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

  // Backbone paste form state
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

  const [fragments, setFragments] = useState<string[]>(
    Array(INITIAL_FRAGMENT_COUNT[0]).fill("")
  );
  const [dnaTypes, setDnaTypes] = useState<string[]>(
    Array(INITIAL_FRAGMENT_COUNT[0]).fill("")
  );
  const [fragmentErrors, setFragmentErrors] = useState<string[]>([]);

  const updateFragment = (index: number, value: string) => {
    setFragments((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    const error =
      value.trim() !== "" && !isValidDNA(value)
        ? "Fragment can only contain A, C, G, or T."
        : "";

    setFragmentErrors((prev) => {
      const next = [...prev];
      next[index] = error;
      return next;
    });
  };

  const updateDnaType = (index: number, value: string) => {
    setDnaTypes((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setFragmentErrors((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  };

  const addFragment = () => {
    if (fragments.length >= MAX_FRAGMENTS) return;
    setFragments((prev) => [...prev, ""]);
    setDnaTypes((prev) => [...prev, ""]);
  };

  const deleteFragment = (index: number, isRequired: boolean) => {
    setFragments((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = "") : next.splice(index, 1);
      return next;
    });
    setDnaTypes((prev) => {
      const next = [...prev];
      isRequired ? (next[index] = "") : next.splice(index, 1);
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

    // Only reject characters that can never be part of a valid mutation.
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

  /**
   * Resets all form fields and errors when the user picks a different build type.
   * Keeps the backbone list and login state since those are not build-specific.
   */
  const selectBuildOption = (option: BuildOption) => {
    if (option === selectedOption) return;

    setSelectedOption(option);

    const initialCount = INITIAL_FRAGMENT_COUNT[option];
    setFragments(Array(initialCount).fill(""));
    setDnaTypes(option === 0 ? Array(initialCount).fill("") : []);
    setMutations([""]);
    setMutationErrors([""]);
    setPlasmidName("");
    setSelectedBackbone(null);

    // Clear all errors and mutagenesis-specific fields
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
      const trimmed = frag.trim();
      if (trimmed === "") {
        if (selectedOption === 0 && dnaTypes[i]?.trim())
          errors[i] = "Please enter a corresponding fragment sequence.";
      } else if (!isValidDNA(trimmed)) {
        errors[i] = "Fragment can only contain A, C, G, or T.";
      } else if (selectedOption === 0 && !dnaTypes[i]) {
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
    const error =
      !selectedBackbone ? "Select or upload a backbone." : "";
    setBackboneSelectedError(error);
    return error !== "";
  };

  /** Returns true if there is an error. */
  const validateOrder = (): boolean => {
    const needsFragment = selectedOption === 0 || selectedOption === 2;
    const error =
      needsFragment && !fragments.some((f) => f.trim() !== "")
        ? "Enter at least one fragment."
        : "";
    setSubmissionError(error);
    return error !== "";
  };

  /** Returns true if there is an error. */
  // ── Target region ─────────────────────────────────────────────────────────

  const [targetRegion, setTargetRegion] = useState("");
  const [targetRegionError, setTargetRegionError] = useState("");

  /**
   * Validates the target mutation region.
   * Checks: valid DNA + exists verbatim in the selected backbone.
   * Returns true if there is an error.
   */
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

  /**
   * Updates target region and re-validates only if there is already
   * an error — avoids firing "not found" on every keystroke.
   * Full validation runs on blur and on submit.
   */
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

      // Base-pair complement validity
      if (validPairs[fromBase] !== toBase) {
        setMutationSubmitError(
          `Mutation ${i + 1} is invalid: ${fromBase} can only mutate to ${validPairs[fromBase]}.`
        );
        return true;
      }

      // Position within target region bounds
      if (position < 1 || position > targetLength) {
        setMutationSubmitError(
          `Mutation ${i + 1} position ${position} is outside the target region length (${targetLength} bp).`
        );
        return true;
      }

      // Confirm "from" base actually exists at that position
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

  /** Shared data-prep used by both addToCart and submitOrder. */
  const buildOrderPayload = async (userId: string) => {
    const buildType = BUILD_TYPE_MAP[selectedOption];

    const totalPrice = computeTotalPrice(
      selectedOption,
      fragments,
      mutations,
      selectedBackbone
    );

    const fragmentsData = fragments
      .map((seq, idx) => ({
        sequence: seq.trim(),
        dnaType: dnaTypes[idx] || "SYNTHETIC",
      }))
      .filter((f) => f.sequence !== "");

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
    setFragments(Array(INITIAL_FRAGMENT_COUNT[selectedOption]).fill(""));
    setDnaTypes(Array(INITIAL_FRAGMENT_COUNT[selectedOption]).fill(""));
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

    if (!loggedIn) {
      setOrderError("You must be logged in to place an order.");
      return;
    }

    setIsSubmitting(true);
    setOrderError("");
    setOrderSuccess(false);

    try {
      const user = await getUser();
      if (!user) throw new Error("Unable to get user information.");

      const payload = await buildOrderPayload(user.id);
      const response = await orderService.createOrder(payload);

      if (response.orderId) {
        setOrderSuccess(true);
        setTimeout(() => navigate("/orders"), 2000);
      } else {
        setOrderError(response.message || "Failed to create order.");
      }
    } catch (error: any) {
      setOrderError(
        error.response?.data?.message || error.message || "Failed to create order."
      );
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
    dnaTypes,
    fragmentErrors,
    updateFragment,
    updateDnaType,
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
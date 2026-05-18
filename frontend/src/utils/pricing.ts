import {
  MULTI_INSERT_PRICING,
  MULTI_MUTAGENESIS_PRICING,
  OWN_BACKBONE_PRICING,
} from "@/config/pricing";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const DNA_REGEX = /^[ACGTacgt]+$/;
const MUTATION_FORMAT = /^([ACGTacgt])(\d+)([ACGTacgt])$/i;

export const isValidDNA = (seq: string): boolean => DNA_REGEX.test(seq);

export const isValidMutation = (mutation: string): boolean =>
  MUTATION_FORMAT.test(mutation.trim());

/** Returns GC content as a percentage (0–100). */
export const computeGCPercent = (seq: string): number => {
  const gcCount = seq.match(/[GCgc]/g)?.length ?? 0;
  return (gcCount / seq.length) * 100;
};

// ─── Shared types ──────────────────────────────────────────────────────────────

export type FragmentPricingRow = {
  /** Original index in the fragments array. (Which fragment, 1st, 2nd, etc.) */
  index: number;
  /** Additional fragment charge (0 for the first fragment). */
  price: number;
  /** Combined surcharges (GC content + length). */
  surcharges: number;
};

export type MutationPricingRow = {
  /** Original index in the mutations array. */
  index: number;
  price: number;
  /** True when the mutation is covered by the base price. */
  included: boolean;
};

// ─── Multi-insert pricing ──────────────────────────────────────────────────────

export type MultiInsertPricing = {
  backbonePrice: number;
  fragments: FragmentPricingRow[];
  total: number;
};

/**
 * Calculates the price for a multi-insert build.
 * Returns null when there is not enough data to compute a price
 * (no backbone selected, or no valid fragment sequences entered).
 */
export const computeMultiInsertPrice = (
  fragments: string[],
  selectedBackbone: string | null
): MultiInsertPricing | null => {
  if (!selectedBackbone) return null;

  const validFragments = fragments
    .map((seq, index) => ({ seq: seq.trim(), index }))
    .filter((f) => f.seq !== "" && isValidDNA(f.seq));

  if (validFragments.length === 0) return null;

  const fragmentPricing: FragmentPricingRow[] = [];
  let total = MULTI_INSERT_PRICING.BASE_PRICE;

  validFragments.forEach((frag, idx) => {
    let price = 0;
    let surcharges = 0;

    // First fragment is included in the base price.
    if (idx > 0) {
      price += MULTI_INSERT_PRICING.ADDITIONAL_FRAGMENT_PRICE;
      total += MULTI_INSERT_PRICING.ADDITIONAL_FRAGMENT_PRICE;
    }

    if (computeGCPercent(frag.seq) > MULTI_INSERT_PRICING.GC_THRESHOLD_PERCENT)
      surcharges += MULTI_INSERT_PRICING.SURCHARGE_PRICE;
    if (frag.seq.length > MULTI_INSERT_PRICING.LENGTH_THRESHOLD_BP)
      surcharges += MULTI_INSERT_PRICING.SURCHARGE_PRICE;

    total += surcharges;
    fragmentPricing.push({ index: frag.index, price, surcharges });
  });

  return {
    backbonePrice: MULTI_INSERT_PRICING.BASE_PRICE,
    fragments: fragmentPricing,
    total,
  };
};

// ─── Mutagenesis pricing ───────────────────────────────────────────────────────

export type MutagenesisPricing = {
  base: number;
  mutations: MutationPricingRow[];
  total: number;
};

/**
 * Calculates the price for a mutagenesis build.
 * Returns null when no backbone is selected or no valid mutations are entered.
 */
export const computeMutagenesisPrice = (
  mutations: string[],
  selectedBackbone: string | null
): MutagenesisPricing | null => {
  if (!selectedBackbone) return null;

  const validMutations = mutations
    .map((m, index) => ({ value: m.trim(), index }))
    .filter((m) => m.value !== "" && isValidMutation(m.value));

  if (validMutations.length === 0) return null;

  const mutationPricing: MutationPricingRow[] = validMutations.map((m, idx) => ({
    index: m.index,
    price: idx === 0 ? 0 : MULTI_MUTAGENESIS_PRICING.ADDITIONAL_MUTATION_PRICE,
    included: idx === 0,
  }));

  const extraCount = Math.max(0, validMutations.length - 1);

  return {
    base: MULTI_MUTAGENESIS_PRICING.BASE_PRICE,
    mutations: mutationPricing,
    total:
      MULTI_MUTAGENESIS_PRICING.BASE_PRICE +
      extraCount * MULTI_MUTAGENESIS_PRICING.ADDITIONAL_MUTATION_PRICE,
  };
};

// ─── New backbone (own backbone) pricing ──────────────────────────────────────

export type OwnBackbonePricing = {
  basePrice: number;
  fragments: FragmentPricingRow[];
  total: number;
};

/**
 * Calculates the price for a new backbone build.
 * Returns null when no valid fragment sequences are entered.
 */
export const computeOwnBackbonePrice = (
  fragments: string[]
): OwnBackbonePricing | null => {
  const validFragments = fragments
    .map((seq, index) => ({ seq: seq.trim(), index }))
    .filter((f) => f.seq !== "" && isValidDNA(f.seq));

  if (validFragments.length === 0) return null;

  const fragmentPricing: FragmentPricingRow[] = [];
  let total = OWN_BACKBONE_PRICING.BASE_PRICE;

  validFragments.forEach((frag, idx) => {
    let price = 0;
    let surcharges = 0;

    if (idx > 0) {
      price += OWN_BACKBONE_PRICING.ADDITIONAL_FRAGMENT_PRICE;
      total += OWN_BACKBONE_PRICING.ADDITIONAL_FRAGMENT_PRICE;
    }

    if (computeGCPercent(frag.seq) > OWN_BACKBONE_PRICING.GC_THRESHOLD_PERCENT)
      surcharges += OWN_BACKBONE_PRICING.SURCHARGE_PRICE;
    if (frag.seq.length > OWN_BACKBONE_PRICING.LENGTH_THRESHOLD_BP)
      surcharges += OWN_BACKBONE_PRICING.SURCHARGE_PRICE;

    total += surcharges;
    fragmentPricing.push({ index: frag.index, price, surcharges });
  });

  return {
    basePrice: OWN_BACKBONE_PRICING.BASE_PRICE,
    fragments: fragmentPricing,
    total,
  };
};

// ─── Generic total helper ──────────────────────────────────────────────────────

/**
 * Convenience function used in submit/cart handlers to get the total price
 * for whichever build type is currently selected, without duplicating
 * the if/else chain in multiple places.
 */
export const computeTotalPrice = (
  selectedOption: 0 | 1 | 2,
  fragments: string[],
  mutations: string[],
  selectedBackbone: string | null
): number => {
  if (selectedOption === 0)
    return computeMultiInsertPrice(fragments, selectedBackbone)?.total ?? 0;
  if (selectedOption === 1)
    return computeMutagenesisPrice(mutations, selectedBackbone)?.total ?? 0;
  return computeOwnBackbonePrice(fragments)?.total ?? 0;
};
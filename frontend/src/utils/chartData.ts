import { isValidDNA, isValidMutation } from "./pricing";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ChartSegment = {
  /** Displayed in the Recharts Tooltip. */
  name: string;
  /** Percentage value (0–100). Recharts uses this as the dataKey. */
  value: number;
  /** Hex fill color for the Cell. */
  color: string;
};

// ─── Color palettes ────────────────────────────────────────────────────────────

const BACKBONE_COLOR = "#1d3461";
const SKELETON_COLOR = "#a6a6a6";

const FRAGMENT_COLORS = [
  "#22c55e", // green-500
  "#3b82f6", // blue-500
  "#a855f7", // purple-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
];

const MUTATION_COLORS = [
  "#ef4444", // red-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#8b5cf6", // violet-500
];

export const getFragmentColor = (index: number): string =>
  FRAGMENT_COLORS[index % FRAGMENT_COLORS.length];

export const getMutationColor = (index: number): string =>
  MUTATION_COLORS[index % MUTATION_COLORS.length];

// ─── Skeleton (empty state) ────────────────────────────────────────────────────

export const buildSkeletonChart = (): ChartSegment[] => [
  { name: "Enter data to visualize plasmid", value: 100, color: SKELETON_COLOR },
];

// ─── Multi-insert chart ────────────────────────────────────────────────────────

const BACKBONE_PERCENT_BY_FRAGMENT_COUNT: Record<number, number> = {
  1: 77,
  2: 75,
  3: 67,
  4: 59,
  5: 48,
};

export const buildMultiInsertChart = (
  fragments: string[],
  selectedBackbone: string | null
): ChartSegment[] | null => {
  if (!selectedBackbone) return null;

  const validFragments = fragments
    .map((f) => f.trim())
    .filter((f) => f !== "" && isValidDNA(f));

  if (validFragments.length === 0) return null;

  const backbonePercent = BACKBONE_PERCENT_BY_FRAGMENT_COUNT[validFragments.length];
  const remaining = 100 - backbonePercent;
  const totalLength = validFragments.reduce((sum, f) => sum + f.length, 0);

  const segments: ChartSegment[] = [
    {
      name: "Backbone",
      value: backbonePercent,
      color: BACKBONE_COLOR,
    },
  ];

  if (validFragments.length === 1) {
    segments.push({
      name: "Fragment 1",
      value: remaining,
      color: getFragmentColor(0),
    });
  } else {
    validFragments.forEach((frag, idx) => {
      segments.push({
        name: `Fragment ${idx + 1}`,
        value: (frag.length / totalLength) * remaining,
        color: getFragmentColor(idx),
      });
    });
  }

  return segments;
};

// ─── New backbone chart ────────────────────────────────────────────────────────

export const buildNewBackboneChart = (
  fragments: string[]
): ChartSegment[] | null => {
  const validFragments = fragments
    .map((f) => f.trim())
    .filter((f) => f !== "" && isValidDNA(f));

  if (validFragments.length === 0) return null;

  const totalLength = validFragments.reduce((sum, f) => sum + f.length, 0);

  return validFragments.map((frag, idx) => ({
    name: `Fragment ${idx + 1}`,
    value: (frag.length / totalLength) * 100,
    color: getFragmentColor(idx),
  }));
};

// ─── Mutagenesis chart ─────────────────────────────────────────────────────────

type ParsedMutation = {
  position: number;
  label: string;
  originalIndex: number;
};

const parseMutations = (mutations: string[]): ParsedMutation[] =>
  mutations
    .map((m, i) => ({ value: m.trim(), index: i }))
    .filter((m) => m.value !== "" && isValidMutation(m.value))
    .map((m) => {
      const match = m.value.match(/^([ACGTacgt])(\d+)([ACGTacgt])$/i)!;
      return {
        position: parseInt(match[2], 10),
        label: m.value.toUpperCase(),
        originalIndex: m.index,
      };
    })
    .sort((a, b) => a.position - b.position);

export const buildMutagenesisChart = (
  mutations: string[],
  selectedBackbone: string | null,
  backboneLength: number
): ChartSegment[] | null => {
  if (!selectedBackbone || backboneLength === 0) return null;

  const validMutations = parseMutations(mutations);

  if (validMutations.length === 0) {
    return [
      {
        name: "Backbone",
        value: 100,
        color: BACKBONE_COLOR,
      },
    ];
  }

  const MUTATION_SLICE_PERCENT = 1;
  const segments: ChartSegment[] = [];
  let currentPosition = 0;

  validMutations.forEach((mut, idx) => {
    const segmentLength = mut.position - currentPosition;
    const segmentPercent = (segmentLength / backboneLength) * 100;

    if (segmentPercent > MUTATION_SLICE_PERCENT / 2) {
      segments.push({
        name: "Backbone",
        value: segmentPercent - MUTATION_SLICE_PERCENT / 2,
        color: BACKBONE_COLOR,
      });
    }

    segments.push({
      name: `Mutation ${mut.originalIndex + 1}: ${mut.label} (pos ${mut.position})`,
      value: MUTATION_SLICE_PERCENT,
      color: getMutationColor(idx),
    });

    currentPosition = mut.position;
  });

  const finalLength = backboneLength - currentPosition;
  const finalPercent = (finalLength / backboneLength) * 100;
  if (finalPercent > 0) {
    segments.push({
      name: "Backbone",
      value: finalPercent,
      color: BACKBONE_COLOR,
    });
  }

  return segments;
};
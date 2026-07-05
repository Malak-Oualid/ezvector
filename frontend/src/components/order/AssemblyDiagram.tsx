import { getFragmentColor } from "@/utils/chartData";
import type { BuildOption } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  buildOption: BuildOption;
  /** Raw fragment strings from form state. */
  fragments: string[];
};

type Segment = {
  label: string;
  color: string;
  isBackbone: boolean;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const BACKBONE_COLOR = "#1d3461";
const W = 520;
const H = 96;
const TRACK_Y = 18;
const TRACK_H = 16;
const CORNER_R = 5;
const ARROW_W = 10;
const START_X = 14;
const NAME_LABEL_Y = TRACK_Y - 9;
const PRIME_LABEL_Y = TRACK_Y + TRACK_H + 11;

// ─── Segment builder ───────────────────────────────────────────────────────────

const buildSegments = (buildOption: BuildOption, fragments: string[]): Segment[] => {
  if (buildOption === 0) {
    // Multi-insert: backbone + one slot per non-empty fragment (min 1)
    const filled = fragments.filter((f) => f.trim() !== "");
    const count = Math.max(1, filled.length);

    return [
      { label: "Backbone", color: BACKBONE_COLOR, isBackbone: true },
      ...Array.from({ length: count }, (_, i) => ({
        label: `Fragment ${i + 1}`,
        color: getFragmentColor(i),
        isBackbone: false,
      })),
    ];
  }

  if (buildOption === 2) {
    // New backbone: no backbone chevron, min 2 fragment slots
    const count = Math.max(2, fragments.length);
    return Array.from({ length: count }, (_, i) => ({
      label: `Fragment ${i + 1}`,
      color: getFragmentColor(i),
      isBackbone: false,
    }));
  }

  return [];
};

// ─── Chevron path builder ──────────────────────────────────────────────────────

const chevronPath = (x: number, w: number, isFirst: boolean, isLast: boolean): string => {
  const pointX = isLast ? x + w : x + w - ARROW_W;
  return [
    `M ${x + (isFirst ? CORNER_R : 0)} ${TRACK_Y}`,
    `L ${pointX} ${TRACK_Y}`,
    `L ${x + w} ${TRACK_Y + TRACK_H / 2}`,
    `L ${pointX} ${TRACK_Y + TRACK_H}`,
    `L ${x + (isFirst ? CORNER_R : 0)} ${TRACK_Y + TRACK_H}`,
    isFirst
      ? `Q ${x} ${TRACK_Y + TRACK_H} ${x} ${TRACK_Y + TRACK_H - CORNER_R} L ${x} ${TRACK_Y + CORNER_R} Q ${x} ${TRACK_Y} ${x + CORNER_R} ${TRACK_Y}`
      : `L ${x} ${TRACK_Y}`,
    "Z",
  ].join(" ");
};

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * Static assembly diagram showing how backbone and fragment chevrons
 * connect into a circular plasmid.
 *
 * - Multi-insert: backbone + one chevron per non-empty fragment (min 1)
 * - New backbone: fragment chevrons only (min 2)
 * - Mutagenesis: renders nothing
 */
const AssemblyDiagram = ({ buildOption, fragments }: Props) => {
  if (buildOption === 1) return null;

  const segs = buildSegments(buildOption, fragments);
  if (segs.length === 0) return null;

  const usableW = W - START_X * 2;
  const segW = Math.floor(usableW / segs.length);
  const lastSegEndX = START_X + segs.length * segW - 2;
  const arcBottomY = H - 8;

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-text-subtle)",
        marginBottom: "0.6rem",
      }}>
        Assembly Layout
      </p>

      <div style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        padding: "0.75rem 0.5rem 0.5rem",
        overflowX: "auto",
      }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", minWidth: 320, height: "auto" }}
        >
          {segs.map((seg, i) => {
            const x = START_X + i * segW;
            const w = i < segs.length - 1 ? segW : segW - 2;
            const isFirst = i === 0;
            const isLast = i === segs.length - 1;
            const midX = x + segW / 2;
            const maxChars = Math.floor(segW / 6);
            const label =
              seg.label.length > maxChars
                ? seg.label.slice(0, maxChars - 1) + "…"
                : seg.label;
            const pointX = isLast ? x + w : x + w - ARROW_W;

            return (
              <g key={i}>
                {/* Chevron */}
                <path
                  d={chevronPath(x, w, isFirst, isLast)}
                  fill={seg.color}
                  opacity="0.9"
                />

                

                {/* 5′ label */}
                <text
                  x={isFirst ? x + 4 : x + 2}
                  y={PRIME_LABEL_Y}
                  fill="#7a8ca8"
                  fontSize="8"
                  fontFamily="DM Mono, monospace"
                  fontWeight="500"
                >
                  5′
                </text>

                {/* 3′ label */}
                <text
                  x={pointX - 4}
                  y={PRIME_LABEL_Y}
                  fill="#7a8ca8"
                  fontSize="8"
                  fontFamily="DM Mono, monospace"
                  fontWeight="500"
                  textAnchor="end"
                >
                  3′
                </text>

                {/* Segment name above track */}
                <text
                  x={midX}
                  y={NAME_LABEL_Y}
                  fill={seg.color}
                  fontSize="9.5"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Closing arc — bottom half of the circular plasmid */}
          <path
            d={`M ${lastSegEndX} ${TRACK_Y + TRACK_H / 2} C ${lastSegEndX + 18} ${arcBottomY} ${START_X - 18} ${arcBottomY} ${START_X} ${TRACK_Y + TRACK_H / 2}`}
            stroke="#b8c3d8"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 2"
            opacity="0.65"
          />

          {/* Arrowhead into backbone 5′ end */}
          <path
            d={`M ${START_X} ${TRACK_Y + TRACK_H / 2} L ${START_X + 6} ${TRACK_Y + TRACK_H / 2 - 4} L ${START_X + 6} ${TRACK_Y + TRACK_H / 2 + 4} Z`}
            fill="#7a8ca8"
            opacity="0.65"
          />
        </svg>
      </div>
    </div>
  );
};

export default AssemblyDiagram;
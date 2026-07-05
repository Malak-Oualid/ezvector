import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  buildMultiInsertChart,
  buildNewBackboneChart,
  buildMutagenesisChart,
  buildSkeletonChart,
  getFragmentColor,
  type ChartSegment,
} from "@/utils/chartData";
import {
  computeMultiInsertPrice,
  computeMutagenesisPrice,
  computeOwnBackbonePrice,
} from "@/utils/pricing";
import type { BuildOption } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  buildOption: BuildOption;
  fragments: string[];
  mutations: string[];
  selectedBackbone: string | null;
  backboneSize: string;
  backboneLength: number;
  backboneSequence: string;
  loggedIn: boolean;
  isSubmitting: boolean;
  isAddingToCart: boolean;
  orderSuccess: boolean;
  orderError: string;
  onAddToCart: () => void;
  onSubmitOrder: () => void;
};

// ─── Sequence helpers (local) ──────────────────────────────────────────────────

const MUTATION_FORMAT = /^([ACGTacgt])(\d+)([ACGTacgt])$/i;
const isValidDNA = (seq: string) => /^[ACGTacgt]+$/.test(seq);

type SequencePart = { label: string; sequence: string; color: string };
type MutationMark = { position: number; toBase: string; label: string; originalIndex: number };
type SequencePartWithMutations = SequencePart & { mutations: MutationMark[] };

const buildPlasmidSequence = (
  buildOption: BuildOption,
  fragments: string[],
  mutations: string[],
  selectedBackbone: string | null,
  backboneSequence: string
): (SequencePart | SequencePartWithMutations)[] | null => {
  if (buildOption === 0) {
    if (!selectedBackbone) return null;
    const valid = fragments
      .map((f, i) => ({ seq: f.trim(), index: i }))
      .filter((f) => f.seq !== "" && isValidDNA(f.seq));
    if (valid.length === 0) return null;
    return [
      { label: "Backbone", sequence: backboneSequence, color: "#1d3461" },
      ...valid.map((f, idx) => ({
        label: `Fragment ${f.index + 1}`,
        sequence: f.seq,
        color: getFragmentColor(idx),
      })),
    ];
  }
  if (buildOption === 1) {
    if (!selectedBackbone || !backboneSequence) return null;
    const validMutations = mutations
      .map((m, i) => ({ value: m.trim(), index: i }))
      .filter((m) => m.value !== "" && MUTATION_FORMAT.test(m.value))
      .map((m) => {
        const match = m.value.match(MUTATION_FORMAT)!;
        return {
          position: parseInt(match[2], 10) - 1,
          toBase: match[3].toUpperCase(),
          label: m.value.toUpperCase(),
          originalIndex: m.index,
        };
      });
    const mutated = backboneSequence.split("");
    validMutations.forEach((mut) => {
      if (mut.position >= 0 && mut.position < mutated.length)
        mutated[mut.position] = mut.toBase;
    });
    return [{ label: "Backbone (with mutations)", sequence: mutated.join(""), color: "#1d3461", mutations: validMutations }];
  }
  if (buildOption === 2) {
    const valid = fragments
      .map((f, i) => ({ seq: f.trim(), index: i }))
      .filter((f) => f.seq !== "" && isValidDNA(f.seq));
    if (valid.length === 0) return null;
    return valid.map((f, idx) => ({
      label: `Fragment ${f.index + 1}`,
      sequence: f.seq,
      color: getFragmentColor(idx),
    }));
  }
  return null;
};

// ─── Chart Tooltip ──────────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      border: "1px solid var(--color-border)",
      borderRadius: 6,
      background: "var(--color-surface)",
      color: "var(--color-text)",
      padding: "0.35rem 0.6rem",
    }}>
      {payload[0].name}
    </div>
  );
};

// ─── PlasmidChart ──────────────────────────────────────────────────────────────

const PlasmidChart = ({ segments }: { segments: ChartSegment[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie
        data={segments}
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={95}
        paddingAngle={2}
        dataKey="value"
      >
        {segments.map((seg, i) => (
          <Cell key={i} fill={seg.color} />
        ))}
      </Pie>
      <Tooltip content={<ChartTooltip />} />
    </PieChart>
  </ResponsiveContainer>
);

// ─── SequenceDisplay ───────────────────────────────────────────────────────────

const SequenceDisplay = ({
  parts,
}: {
  parts: (SequencePart | SequencePartWithMutations)[];
  buildOption: BuildOption;
}) => {
  const fullSequence = parts.map((p) => p.sequence).join("").toUpperCase();
  const totalBp = fullSequence.length;

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
        Complete Sequence
      </p>

      <div style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        padding: "1rem",
      }}>


        {/* Full sequence + copy */}
        <div style={{
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "var(--color-text-muted)",
            }}>
              <span className="vw-mono" style={{ marginLeft: "0.35rem", color: "var(--color-text-subtle)" }}>
                {totalBp} bp
              </span>
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(fullSequence)}
              title="Copy sequence to clipboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.25rem 0.6rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 5,
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--color-navy)",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-navy)";
                e.currentTarget.style.background = "var(--color-navy-dim)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.background = "var(--color-surface)";
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
          </div>
          <div style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 6,
            padding: "0.5rem 0.75rem",
            maxHeight: 80,
            overflowY: "auto",
          }}>
            <code className="vw-mono" style={{ color: "var(--color-text-muted)", wordBreak: "break-all", fontSize: "0.72rem" }}>
              {fullSequence}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PricingTable ──────────────────────────────────────────────────────────────

const cellStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  color: "var(--color-text)",
  padding: "0.5rem 0",
  borderBottom: "1px solid var(--color-border)",
};

const ColorDot = ({ color }: { color: string }) => (
  <div style={{
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color,
    display: "inline-block",
    marginRight: "0.4rem",
    flexShrink: 0,
  }} />
);

const PricingTable = ({
  buildOption,
  fragments,
  mutations,
  selectedBackbone,
  backboneSize,
}: {
  buildOption: BuildOption;
  fragments: string[];
  mutations: string[];
  selectedBackbone: string | null;
  backboneSize: string;
}) => {
  if (buildOption === 0) {
    const pricing = computeMultiInsertPrice(fragments, selectedBackbone);
    if (!pricing) return null;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 1rem" }}>
        {/* Header */}
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Size</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Price</span>

        {/* Backbone row */}
        <span style={{ ...cellStyle, display: "flex", alignItems: "center" }}>
          <ColorDot color="#1d3461" />{selectedBackbone}
        </span>
        <span className="vw-mono" style={{ ...cellStyle, textAlign: "center", color: "var(--color-text-muted)" }}>{backboneSize}</span>
        <span style={{ ...cellStyle, textAlign: "right", fontWeight: 500 }}>${pricing.backbonePrice}</span>

        {/* Fragment rows */}
        {pricing.fragments.map(({ index, price, surcharges }) => {
          const total = price + surcharges;
          return (
            <React.Fragment key={index}>
              <span style={{ ...cellStyle, display: "flex", alignItems: "center" }}>
                <ColorDot color={getFragmentColor(index)} />Fragment {index + 1}
              </span>
              <span className="vw-mono" style={{ ...cellStyle, textAlign: "center", color: "var(--color-text-muted)" }}>
                {fragments[index].trim().length} bp
              </span>
              <span style={{ ...cellStyle, textAlign: "right", fontWeight: 500 }}>
                {total === 0 ? <span style={{ color: "var(--color-text-subtle)", fontStyle: "italic" }}>Included</span> : `$${total}`}
              </span>
            </React.Fragment>
          );
        })}

        {/* Total */}
        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", paddingTop: "0.75rem" }}>Total</span>
        <span style={{ ...cellStyle, borderBottom: "none", paddingTop: "0.75rem" }} />
        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", textAlign: "right", paddingTop: "0.75rem", fontSize: "1rem" }}>
          ${pricing.total}
        </span>
      </div>
    );
  }

  if (buildOption === 1) {
    const pricing = computeMutagenesisPrice(mutations, selectedBackbone);
    if (!pricing) return null;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 1rem" }}>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Mutation</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Price</span>

        <span style={cellStyle}>{selectedBackbone}</span>
        <span style={{ ...cellStyle, textAlign: "center", color: "var(--color-text-muted)" }}>—</span>
        <span style={{ ...cellStyle, textAlign: "right", fontWeight: 500 }}>${pricing.base}</span>

        {pricing.mutations.map(({ index, price, included }) => (
          <React.Fragment key={index}>
            <span style={cellStyle}>Mutation {index + 1}</span>
            <span className="vw-mono" style={{ ...cellStyle, textAlign: "center", color: "var(--color-text-muted)" }}>
              {mutations[index]}
            </span>
            <span style={{ ...cellStyle, textAlign: "right", fontWeight: 500 }}>
              {included ? <span style={{ color: "var(--color-text-subtle)", fontStyle: "italic" }}>Included</span> : `$${price}`}
            </span>
          </React.Fragment>
        ))}

        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", paddingTop: "0.75rem" }}>Total</span>
        <span style={{ ...cellStyle, borderBottom: "none", paddingTop: "0.75rem" }} />
        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", textAlign: "right", paddingTop: "0.75rem", fontSize: "1rem" }}>
          ${pricing.total}
        </span>
      </div>
    );
  }

  if (buildOption === 2) {
    const pricing = computeOwnBackbonePrice(fragments);
    if (!pricing) return null;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 1rem" }}>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Name</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Size</span>
        <span style={{ ...cellStyle, color: "var(--color-text-subtle)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Price</span>

        {pricing.fragments.map(({ index, price, surcharges }) => {
          const total = price + surcharges;
          return (
            <React.Fragment key={index}>
              <span style={{ ...cellStyle, display: "flex", alignItems: "center" }}>
                <ColorDot color={getFragmentColor(index)} />Fragment {index + 1}
              </span>
              <span className="vw-mono" style={{ ...cellStyle, textAlign: "center", color: "var(--color-text-muted)" }}>
                {fragments[index].trim().length} bp
              </span>
              <span style={{ ...cellStyle, textAlign: "right", fontWeight: 500 }}>
                {total === 0 ? `$${pricing.basePrice}` : `$${total}`}
              </span>
            </React.Fragment>
          );
        })}

        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", paddingTop: "0.75rem" }}>Total</span>
        <span style={{ ...cellStyle, borderBottom: "none", paddingTop: "0.75rem" }} />
        <span style={{ ...cellStyle, borderBottom: "none", fontWeight: 700, color: "var(--color-navy)", textAlign: "right", paddingTop: "0.75rem", fontSize: "1rem" }}>
          ${pricing.total}
        </span>
      </div>
    );
  }

  return null;
};

// ─── Main component ────────────────────────────────────────────────────────────

const PricingSummary = ({
  buildOption,
  fragments,
  mutations,
  selectedBackbone,
  backboneSize,
  backboneLength,
  backboneSequence,
  loggedIn,
  isSubmitting,
  isAddingToCart,
  orderSuccess,
  orderError,
  onAddToCart,
  onSubmitOrder,
}: Props) => {
  const segments: ChartSegment[] =
    (buildOption === 0
      ? buildMultiInsertChart(fragments, selectedBackbone)
      : buildOption === 1
        ? buildMutagenesisChart(mutations, selectedBackbone, backboneLength)
        : buildNewBackboneChart(fragments)) ?? buildSkeletonChart();

  const plasmidParts = buildPlasmidSequence(
    buildOption, fragments, mutations, selectedBackbone, backboneSequence
  );

  const hasPricing =
    (buildOption === 0 && computeMultiInsertPrice(fragments, selectedBackbone) !== null) ||
    (buildOption === 1 && computeMutagenesisPrice(mutations, selectedBackbone) !== null) ||
    (buildOption === 2 && computeOwnBackbonePrice(fragments) !== null);

  return (
    <div style={{ width: "45%", display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* ── Chart card ─────────────────────────────────────────────────────── */}
      <div className="vw-card" style={{ padding: "1.5rem" }}>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-text-subtle)",
          marginBottom: "0.25rem",
        }}>
          Plasmid Build
        </p>

        <PlasmidChart segments={segments} />

        {plasmidParts && (
          <SequenceDisplay parts={plasmidParts} buildOption={buildOption} />
        )}
      </div>

      {/* ── Pricing card ───────────────────────────────────────────────────── */}
      {hasPricing && (
        <div className="vw-card" style={{ padding: "1.5rem" }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-text-subtle)",
            marginBottom: "1rem",
          }}>
            Order Summary
          </p>
          <PricingTable
            buildOption={buildOption}
            fragments={fragments}
            mutations={mutations}
            selectedBackbone={selectedBackbone}
            backboneSize={backboneSize}
          />
        </div>
      )}

      {/* ── Feedback ───────────────────────────────────────────────────────── */}
      {orderSuccess && (
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: 8,
          padding: "0.85rem 1rem",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          color: "#166534",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          ✅ Added to cart successfully!
        </div>
      )}
      {orderError && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          borderRadius: 8,
          padding: "0.85rem 1rem",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          color: "#991b1b",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          {orderError}
        </div>
      )}

      {/* ── Action buttons ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {/* Checkout — primary red CTA */}
        <button
          onClick={onSubmitOrder}
          disabled={isAddingToCart || isSubmitting}
          className="vw-btn-primary"
          style={{ width: "100%", textAlign: "center" }}
        >
          {isSubmitting ? "Processing…" : "Proceed to Checkout →"}
        </button>

        {/* Add to cart — outline secondary */}
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart || isSubmitting || !loggedIn}
          className="vw-btn-outline"
          style={{ width: "100%", textAlign: "center" }}
        >
          {isAddingToCart ? "Adding…" : "Add to Cart"}
        </button>

        {!loggedIn && (
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.78rem",
            color: "var(--color-text-subtle)",
            textAlign: "center",
            marginTop: "0.1rem",
          }}>
            Log in to add items to your cart
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingSummary;
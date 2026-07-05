import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAX_FRAGMENTS, type BuildOption, type Fragment } from "@/hooks/useOrderForm";
import { getFragmentColor } from "@/utils/chartData";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  buildOption: BuildOption;
  fragments: Fragment[];
  fragmentErrors: string[];
  onFragmentFieldChange: (index: number, field: keyof Fragment, value: string) => void;
  onDeleteFragment: (index: number, isRequired: boolean) => void;
  onAddFragment: () => void;
  requiredCount: number;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const DNA_TYPE_OPTIONS = [
  { value: "genomic",   label: "Genomic"   },
  { value: "synthetic", label: "Synthetic" },
  { value: "plasmid",   label: "Plasmid"   },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * Renders the list of fragment inputs for Multi-insert and New backbone builds.
 *
 * Each fragment row has:
 * - A colored dot (matching the donut chart palette)
 * - A name input (required, alphanumeric, max 50 chars — validated on submit)
 * - A DNA type dropdown (Multi-insert only)
 * - A textarea for the sequence (DM Mono, scrollable, ~3 rows)
 * - A live bp count below the textarea
 * - A trash button to clear/remove the row
 *
 * Purely presentational — all state lives in useOrderForm.
 */
const FragmentInputList = ({
  buildOption,
  fragments,
  fragmentErrors,
  onFragmentFieldChange,
  onDeleteFragment,
  onAddFragment,
  requiredCount,
}: Props) => {
  const showDnaType = buildOption === 0;

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      {fragments.map((frag, i) => {
        const isRequired = i < requiredCount;
        const hasContent =
          frag.name.trim() !== "" || frag.sequence.trim() !== "";
        const hasError = Boolean(fragmentErrors[i]);
        const color = getFragmentColor(i);
        const bpCount = frag.sequence.trim().length;

        return (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: `1px solid ${hasError ? "var(--color-red)" : "var(--color-border)"}`,
              borderRadius: 10,
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
          >
            {/* ── Fragment header ──────────────────────────────────────── */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.6rem 0.75rem",
              borderBottom: `1px solid var(--color-border)`,
              background: "var(--color-bg)",
            }}>
              {/* Color dot */}
              <div style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }} />

              {/* Fragment name input */}
              <input
                type="text"
                placeholder={`Fragment ${i + 1} name`}
                value={frag.name}
                onChange={(e) => onFragmentFieldChange(i, "name", e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  outline: "none",
                  minWidth: 0,
                }}
              />

              {/* DNA type dropdown — Multi-insert only */}
              {showDnaType && (
                <Select
                  value={frag.dnaType || ""}
                  onValueChange={(val) => onFragmentFieldChange(i, "dnaType", val)}
                >
                  <SelectTrigger style={{
                    width: 130,
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    color: frag.dnaType ? "var(--color-text)" : "var(--color-text-subtle)",
                    flexShrink: 0,
                    height: 30,
                  }}>
                    <SelectValue placeholder="DNA type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DNA_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Delete button */}
              {(!isRequired || hasContent) && (
                <button
                  type="button"
                  aria-label={`Delete fragment ${i + 1}`}
                  onClick={() => onDeleteFragment(i, isRequired)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0.2rem",
                    cursor: "pointer",
                    color: "var(--color-text-subtle)",
                    transition: "color 0.15s",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-subtle)";
                  }}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* ── Sequence body ────────────────────────────────────────── */}
            <div style={{ padding: "0.6rem 0.75rem" }}>
              <textarea
                rows={3}
                placeholder="Enter DNA sequence (5′ → 3′) — A, C, G, T only"
                value={frag.sequence}
                onChange={(e) => onFragmentFieldChange(i, "sequence", e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: "var(--color-text)",
                  lineHeight: 1.6,
                  resize: "vertical",
                  minHeight: 64,
                }}
              />

              {/* bp count */}
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-text-subtle)",
                marginTop: "0.2rem",
              }}>
                {bpCount > 0 ? `${bpCount} bp` : ""}
              </p>
            </div>

            {/* ── Error ────────────────────────────────────────────────── */}
            {hasError && (
              <div style={{
                padding: "0.4rem 0.75rem",
                borderTop: "1px solid var(--color-border)",
                background: "#fef2f2",
              }}>
                <p style={{
                  fontSize: "0.78rem",
                  color: "var(--color-red)",
                  fontFamily: "var(--font-sans)",
                }}>
                  {fragmentErrors[i]}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Add fragment */}
      {fragments.length < MAX_FRAGMENTS && (
        <button
          type="button"
          onClick={onAddFragment}
          className="vw-link"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            marginTop: "0.25rem",
          }}
        >
          + Add fragment
        </button>
      )}
    </div>
  );
};

export default FragmentInputList;
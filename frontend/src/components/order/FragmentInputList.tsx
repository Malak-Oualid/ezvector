import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAX_FRAGMENTS, type BuildOption } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  buildOption: BuildOption;
  fragments: string[];
  dnaTypes: string[];
  fragmentErrors: string[];
  onFragmentChange: (index: number, value: string) => void;
  onDnaTypeChange: (index: number, value: string) => void;
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

// ─── Shared styles ─────────────────────────────────────────────────────────────

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  flex: 1,
  background: "var(--color-surface)",
  border: `1px solid ${hasError ? "var(--color-red)" : "var(--color-border)"}`,
  borderRadius: 6,
  padding: "0.5rem 0.75rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.82rem",
  color: "var(--color-text)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  width: "100%",
});

// ─── Component ─────────────────────────────────────────────────────────────────

const FragmentInputList = ({
  buildOption,
  fragments,
  dnaTypes,
  fragmentErrors,
  onFragmentChange,
  onDnaTypeChange,
  onDeleteFragment,
  onAddFragment,
  requiredCount,
}: Props) => {
  const showDnaType = buildOption === 0;

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      {fragments.map((value, i) => {
        const isRequired = i < requiredCount;
        const hasContent =
          value.trim() !== "" || (showDnaType && dnaTypes[i]?.trim() !== "");
        const hasError = Boolean(fragmentErrors[i]);

        return (
          <div key={i} style={{ display: "grid", gap: "0.4rem" }}>
            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Step circle */}
              <div style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "var(--color-navy)",
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <label style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text)",
              }}>
                Fragment {i + 1}
                {isRequired && (
                  <span style={{ color: "var(--color-red)", marginLeft: 2 }}>*</span>
                )}
              </label>
            </div>

            {/* Input row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Enter DNA sequence (5′ → 3′)"
                value={value}
                onChange={(e) => onFragmentChange(i, e.target.value)}
                style={inputStyle(hasError)}
                onFocus={(e) => {
                  if (!hasError) {
                    e.currentTarget.style.borderColor = "var(--color-blue-muted)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,127,181,0.15)";
                  }
                }}
                onBlur={(e) => {
                  if (!hasError) {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />

              {/* DNA type dropdown — Multi-insert only */}
              {showDnaType && (
                <Select
                  value={dnaTypes[i] || ""}
                  onValueChange={(val) => onDnaTypeChange(i, val)}
                >
                  <SelectTrigger style={{
                    width: 140,
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: dnaTypes[i] ? "var(--color-text)" : "var(--color-text-subtle)",
                    flexShrink: 0,
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
                    padding: "0.25rem",
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
                  <Trash2 size={15} />
                </button>
              )}
            </div>

            {/* Error */}
            {hasError && (
              <p style={{
                fontSize: "0.78rem",
                color: "var(--color-red)",
                fontFamily: "var(--font-sans)",
              }}>
                {fragmentErrors[i]}
              </p>
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
import { Trash2 } from "lucide-react";
import { MAX_MUTATIONS } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  mutations: string[];
  mutationErrors: string[];
  onMutationChange: (index: number, value: string) => void;
  onDeleteMutation: (index: number, isRequired: boolean) => void;
  onAddMutation: () => void;
};

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

/**
 * Renders the list of mutation inputs for a mutagenesis build.
 * Purely presentational — all state changes go up through callbacks.
 */
const MutationInputList = ({
  mutations,
  mutationErrors,
  onMutationChange,
  onDeleteMutation,
  onAddMutation,
}: Props) => (
  <div style={{ display: "grid", gap: "1.25rem" }}>
    {mutations.map((value, i) => {
      const isRequired = i === 0;
      const hasContent = value.trim() !== "";
      const hasError = Boolean(mutationErrors[i]);

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
              Mutation {i + 1}
              {isRequired && (
                <span style={{ color: "var(--color-red)", marginLeft: 2 }}>*</span>
              )}
            </label>
          </div>

          {/* Input row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="e.g. A123T"
              value={value}
              onChange={(e) => onMutationChange(i, e.target.value)}
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

            {/* Delete button */}
            {(!isRequired || hasContent) && (
              <button
                type="button"
                aria-label={`Delete mutation ${i + 1}`}
                onClick={() => onDeleteMutation(i, isRequired)}
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

          {/* Format hint — only on first row when empty */}
          {i === 0 && !hasContent && (
            <p style={{
              fontSize: "0.75rem",
              color: "var(--color-text-subtle)",
              fontFamily: "var(--font-mono)",
            }}>
              Format: original base + position + new base (e.g. A123T)
            </p>
          )}

          {/* Error */}
          {hasError && (
            <p style={{
              fontSize: "0.78rem",
              color: "var(--color-red)",
              fontFamily: "var(--font-sans)",
            }}>
              {mutationErrors[i]}
            </p>
          )}
        </div>
      );
    })}

    {/* Add mutation */}
    {mutations.length < MAX_MUTATIONS && (
      <button
        type="button"
        onClick={onAddMutation}
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
        + Add mutation
      </button>
    )}
  </div>
);

export default MutationInputList;
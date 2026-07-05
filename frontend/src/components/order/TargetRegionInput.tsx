// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  value: string;
  error: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
};

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * Input for the target mutation region in a mutagenesis build.
 *
 * The user pastes the sub-sequence of the backbone they want to mutate.
 * Mutation positions (e.g. A123T) are counted relative to position 1
 * of this sequence, not position 1 of the full backbone.
 *
 * Validation (valid DNA + verbatim substring of backbone) runs on blur
 * and on submit via useOrderForm.validateTargetRegion.
 */
const TargetRegionInput = ({ value, error, onChange, onBlur }: Props) => {
  const trimmedLength = value.trim().length;

  return (
    <div style={{ display: "grid", gap: "0.4rem" }}>
      <label style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-text)",
      }}>
        Target Mutation Region <span style={{ color: "var(--color-red)" }}>*</span>
      </label>

      <textarea
        rows={3}
        placeholder="Paste the sub-sequence of the backbone you want to mutate — A, C, G, T only, 5′ → 3′"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        style={{
          width: "100%",
          background: "var(--color-surface)",
          border: `1px solid ${error ? "var(--color-red)" : "var(--color-border)"}`,
          borderRadius: 6,
          padding: "0.5rem 0.75rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          color: "var(--color-text)",
          outline: "none",
          resize: "vertical",
          transition: "border-color 0.15s, box-shadow 0.15s",
          lineHeight: 1.6,
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "var(--color-blue-muted)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,127,181,0.15)";
          }
        }}
      />

      {/* Live bp count */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "var(--color-text-subtle)",
      }}>
        {trimmedLength > 0
          ? `${trimmedLength} bp`
          : "Mutation positions are numbered from position 1 of this sequence"}
      </p>

      {error && (
        <p style={{
          fontSize: "0.78rem",
          color: "var(--color-red)",
          fontFamily: "var(--font-sans)",
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TargetRegionInput;
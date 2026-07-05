import type { BuildOption } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  selectedOption: BuildOption;
  onSelect: (option: BuildOption) => void;
};

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

/**
 * Multi-Insert: donut chart with navy backbone (~75%) and
 * two fragment slices in green and blue.
 */
const MultiInsertIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    {/* Backbone arc ~75% — navy */}
    <path
      d="M 40 8 A 32 32 0 1 1 12.29 52"
      fill="none" stroke="#1d3461" strokeWidth="10" strokeLinecap="round"
    />
    {/* Fragment 1 arc ~15% — green */}
    <path
      d="M 12.29 52 A 32 32 0 0 1 28.5 10.3"
      fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
    />
    {/* Fragment 2 arc ~10% — blue */}
    <path
      d="M 28.5 10.3 A 32 32 0 0 1 40 8"
      fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round"
    />
  </svg>
);

/**
 * Mutagenesis: full navy backbone donut with three
 * small colored dots at mutation sites on the ring.
 */
const MutagenesisIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    {/* Full backbone ring — r=32 to match other icons */}
    <circle cx="40" cy="40" r="32" fill="none" stroke="#1d3461" strokeWidth="10" />
    {/* Mutation site 1 — red, top */}
    <circle cx="40" cy="8" r="5" fill="#d94f2b" />
    {/* Mutation site 2 — amber, bottom-right */}
    <circle cx="67.7" cy="56" r="5" fill="#f59e0b" />
    {/* Mutation site 3 — emerald, bottom-left */}
    <circle cx="12.3" cy="56" r="5" fill="#10b981" />
  </svg>
);

/**
 * New Backbone: four equal fragments forming a full ring,
 * each in a distinct color — no pre-existing backbone.
 */
const NewBackboneIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    {/* Fragment 1 — navy, top-right quarter */}
    <path
      d="M 40 8 A 32 32 0 0 1 72 40"
      fill="none" stroke="#d94f2b" strokeWidth="10" strokeLinecap="round"
    />
    {/* Fragment 2 — green, bottom-right quarter */}
    <path
      d="M 72 40 A 32 32 0 0 1 40 72"
      fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
    />
    {/* Fragment 3 — blue, bottom-left quarter */}
    <path
      d="M 40 72 A 32 32 0 0 1 8 40"
      fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round"
    />
    {/* Fragment 4 — amber, top-left quarter */}
    <path
      d="M 8 40 A 32 32 0 0 1 40 8"
      fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round"
    />
  </svg>
);

// ─── Build type definitions ────────────────────────────────────────────────────

const BUILD_TYPES: {
  label: string;
  description: string;
  Icon: () => React.ReactElement;
}[] = [
  {
    label: "Multi-Insert",
    description: "Clone up to 5 fragments into any backbone.",
    Icon: MultiInsertIcon,
  },
  {
    label: "Mutagenesis",
    description: "Introduce up to 4 precise point mutations.",
    Icon: MutagenesisIcon,
  },
  {
    label: "New Backbone",
    description: "Assemble a custom backbone from fragments.",
    Icon: NewBackboneIcon,
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const BuildTypeSelector = ({ selectedOption, onSelect }: Props) => (
  <div style={{ width: "100%", marginBottom: "0.5rem" }}>
    <p className="vw-eyebrow" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>Step 1</p>
    <h2 className="vw-heading" style={{ marginBottom: "1.75rem" }}>
      Choose your build type
    </h2>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.25rem",
      maxWidth: 860,
      margin: "0 auto",
    }}>
      {BUILD_TYPES.map(({ label, description, Icon }, i) => {
        const option = i as BuildOption;
        const isSelected = selectedOption === option;

        return (
          <div
            key={option}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`Select ${label} build`}
            onClick={() => onSelect(option)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(option)}
            className="vw-card vw-card-accent"
            style={{
              padding: "1.5rem",
              cursor: "pointer",
              ...(isSelected && {
                borderColor: "var(--color-navy)",
                borderWidth: 2,
                background: "var(--color-navy-dim)",
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-hover)",
              }),
            }}
          >
            {/* Icon */}
            <div style={{
              width: "50%",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              background: isSelected
                ? "rgba(29, 52, 97, 0.06)"
                : "var(--color-bg)",
              borderRadius: 10,
              padding: "0.75rem",
              transition: "background 0.2s",
            }}>
              <Icon />
            </div>

            {/* Label */}
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: isSelected ? "var(--color-navy)" : "var(--color-text)",
              marginBottom: "0.35rem",
              transition: "color 0.2s",
            }}>
              {label}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
            }}>
              {description}
            </p>

            {/* Selected indicator */}
            {isSelected && (
              <div style={{
                marginTop: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--color-navy)",
                }} />
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--color-navy)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  Selected
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default BuildTypeSelector;
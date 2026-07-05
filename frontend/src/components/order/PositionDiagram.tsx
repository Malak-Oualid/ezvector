// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * Explanatory diagram showing how mutation positions are counted
 * relative to the target mutation region (not the full backbone).
 *
 * DNA notation only — e.g. A123T means the base at position 123
 * of the target region is A and will be changed to T.
 *
 * Static SVG, no props.
 */
const PositionDiagram = () => (
  <div style={{
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    padding: "0.85rem 1rem 0.75rem",
  }}>
    <p style={{
      fontFamily: "var(--font-sans)",
      fontSize: "0.72rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--color-text-subtle)",
      marginBottom: "0.5rem",
    }}>
      How positions are counted
    </p>

    <svg
      viewBox="0 0 460 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* ── Full backbone bar (background) ── */}
      <rect x="0" y="42" width="460" height="12" rx="3" fill="#d4dae8" />

      {/* ── Target region highlight on backbone ── */}
      <rect x="110" y="38" width="195" height="20" rx="4"
        fill="rgba(29,52,97,0.08)" stroke="#1d3461" strokeWidth="1.2" />

      {/* Backbone end labels */}
      <text x="48" y="50" textAnchor="middle" fill="#7a8ca8"
        fontSize="7.5" fontFamily="DM Sans, sans-serif">full backbone</text>
      <text x="412" y="50" textAnchor="middle" fill="#7a8ca8"
        fontSize="7.5" fontFamily="DM Sans, sans-serif">sequence</text>

      {/* ── Target region bracket label ── */}
      <text x="207" y="32" textAnchor="middle" fill="#1d3461"
        fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600">
        target mutation region
      </text>

      {/* ── Position ticks at start/end of target region ── */}
      <line x1="110" y1="60" x2="110" y2="68" stroke="#1d3461" strokeWidth="1" opacity="0.6" />
      <line x1="305" y1="60" x2="305" y2="68" stroke="#1d3461" strokeWidth="1" opacity="0.6" />
      <text x="110" y="78" textAnchor="middle" fill="#7a8ca8"
        fontSize="7.5" fontFamily="DM Mono, monospace">position 1</text>
      <text x="305" y="78" textAnchor="middle" fill="#7a8ca8"
        fontSize="7.5" fontFamily="DM Mono, monospace">position n</text>

      {/* ── Mutation pin at position ~123 within target region ── */}
      {/* Pin sits roughly 35% into the target region highlight */}
      <line x1="179" y1="38" x2="179" y2="18"
        stroke="#d94f2b" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="179" cy="14" r="4" fill="#d94f2b" />

      {/* Mutation label badge */}
      <rect x="188" y="7" width="40" height="14" rx="3" fill="#1a1508" />
      <text x="191" y="17" fill="#d94f2b"
        fontSize="9" fontFamily="DM Mono, monospace" fontWeight="600">A123T</text>

      {/* Arrow pointing down from badge to pin */}
      {/* already implied by the dashed line above */}

      {/* ── 5′ / 3′ end markers on target region ── */}
      <text x="114" y="50" fill="#5b7fb5"
        fontSize="7" fontFamily="DM Mono, monospace" fontWeight="500">5′</text>
      <text x="290" y="50" fill="#5b7fb5"
        fontSize="7" fontFamily="DM Mono, monospace" fontWeight="500">3′</text>
    </svg>

    <p style={{
      fontFamily: "var(--font-sans)",
      fontSize: "0.75rem",
      color: "var(--color-text-muted)",
      lineHeight: 1.55,
      marginTop: "0.5rem",
    }}>
      Positions are numbered from <strong>position 1 of your target mutation
      region</strong>.{" "}
      <span className="vw-mono">A123T</span> means the base at position 123
      of the pasted region is <span className="vw-mono">A</span> and will be
      changed to <span className="vw-mono">T</span>.
    </p>
  </div>
);

export default PositionDiagram;
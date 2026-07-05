import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Backbone } from "@/hooks/useOrderForm";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  loggedIn: boolean;
  backbones: Backbone[];
  selectedBackbone: string | null;
  backboneSelectedError: string;

  // Paste form state (reused for the inline "Paste new" tab)
  newBackboneName: string;
  newBackboneSequence: string;
  backboneUploadError: string;

  // Callbacks
  onSelectBackbone: (name: string) => void;
  onSubmitUpload: () => boolean;
  onNewBackboneNameChange: (value: string) => void;
  onNewBackboneSequenceChange: (value: string) => void;
};

type Mode = "select" | "paste";

// ─── Shared input style ────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  padding: "0.5rem 0.75rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "var(--color-text)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--color-blue-muted)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,127,181,0.15)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * Backbone selection for Multi-insert and Mutagenesis builds.
 *
 * Two modes via inline tab toggle:
 * - "select": dropdown of the user's previously used backbones
 * - "paste":  inline form to paste a new backbone name + sequence
 *
 * Pasting a new backbone via onSubmitUpload adds it to the backbones
 * list and selects it (handled in useOrderForm), then this component
 * switches back to "select" mode automatically.
 */
const BackboneSelector = ({
  loggedIn,
  backbones,
  selectedBackbone,
  backboneSelectedError,
  newBackboneName,
  newBackboneSequence,
  backboneUploadError,
  onSelectBackbone,
  onSubmitUpload,
  onNewBackboneNameChange,
  onNewBackboneSequenceChange,
}: Props) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("select");

  const handleAdd = () => {
  if (onSubmitUpload()) {
    setMode("select");
  }
};
const location = useLocation();

  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {/* Label */}
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-text)",
        marginBottom: "0.1rem",
      }}>
        Vector Backbone
      </p>

      {/* Logged-out nudge */}
      {!loggedIn && (
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
          <button
            type="button"
            onClick={() => navigate("/auth", { state: { from: location.pathname } })}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontWeight: 600,
              color: "var(--color-navy)",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "inherit",
            }}
          >
            Log in
          </button>{" "}
          to view your previously used backbones
        </p>
      )}

      {/* ── Tab toggle ────────────────────────────────────────────────────── */}
      <div style={{
        display: "inline-flex",
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: 7,
        padding: 3,
        width: "fit-content",
      }}>
        {(["select", "paste"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            style={{
              border: "none",
              borderRadius: 5,
              padding: "0.4rem 1rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
              background: mode === m ? "var(--color-surface)" : "transparent",
              color: mode === m ? "var(--color-navy)" : "var(--color-text-muted)",
              boxShadow: mode === m ? "0 1px 3px rgba(29,52,97,0.1)" : "none",
            }}
          >
            {m === "select" ? "Select existing" : "Paste new"}
          </button>
        ))}
      </div>

      {/* ── Select mode ───────────────────────────────────────────────────── */}
      {mode === "select" && (
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <Select
            value={selectedBackbone ?? ""}
            onValueChange={onSelectBackbone}
          >
            <SelectTrigger
              style={{
                width: 220,
                background: "var(--color-surface)",
                border: `1px solid ${backboneSelectedError ? "var(--color-red)" : "var(--color-border)"}`,
                borderRadius: 6,
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: selectedBackbone ? "var(--color-text)" : "var(--color-text-subtle)",
              }}
            >
              <SelectValue placeholder="Select a backbone" />
            </SelectTrigger>
            <SelectContent>
              {backbones.map((b) => (
                <SelectItem key={b.name} value={b.name}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {backbones.length === 0 && (
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-subtle)", fontFamily: "var(--font-sans)" }}>
              No saved backbones yet.{" "}
              <button
                type="button"
                onClick={() => setMode("paste")}
                className="vw-link"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "inherit" }}
              >
                Paste one now →
              </button>
            </p>
          )}

          {backboneSelectedError && (
            <p style={{ fontSize: "0.82rem", color: "var(--color-red)" }}>
              {backboneSelectedError}
            </p>
          )}
        </div>
      )}

      {/* ── Paste mode ────────────────────────────────────────────────────── */}
      {mode === "paste" && (
        <div style={{ display: "grid", gap: "0.75rem", maxWidth: 420 }}>
          {/* Name field */}
          <div>
            <label style={{
              display: "block",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--color-text)",
              marginBottom: "0.35rem",
            }}>
              Backbone Name
            </label>
            <input
              type="text"
              placeholder="e.g. pUC19"
              value={newBackboneName}
              onChange={(e) => onNewBackboneNameChange(e.target.value)}
              style={inputStyle}
              {...focusHandlers}
            />
          </div>

          {/* Sequence field */}
          <div>
            <label style={{
              display: "block",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--color-text)",
              marginBottom: "0.35rem",
            }}>
              Backbone Sequence (5′ → 3′)
            </label>
            <textarea
              rows={3}
              placeholder="Paste complete plasmid sequence"
              value={newBackboneSequence}
              onChange={(e) => onNewBackboneSequenceChange(e.target.value)}
              style={{
                ...inputStyle,
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                resize: "vertical",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-blue-muted)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,127,181,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <p style={{
              fontSize: "0.72rem",
              color: "var(--color-text-subtle)",
              marginTop: "0.3rem",
              fontFamily: "var(--font-mono)",
            }}>
              {newBackboneSequence.trim().length > 0
                ? `${newBackboneSequence.trim().length} bp`
                : "Only A, C, G, T characters accepted"}
            </p>
          </div>

          {backboneUploadError && (
            <p style={{ fontSize: "0.82rem", color: "var(--color-red)" }}>
              {backboneUploadError}
            </p>
          )}

          <div>
            <button
              type="button"
              onClick={handleAdd}
              className="vw-btn-primary"
              style={{ padding: "0.55rem 1.25rem", fontSize: "0.85rem" }}
            >
              Add Backbone
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackboneSelector;
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useOrderForm, INITIAL_FRAGMENT_COUNT } from "@/hooks/useOrderForm";
import BuildTypeSelector from "@/components/order/BuildTypeSelector";
import BackboneSelector from "@/components/order/BackboneSelector";
import FragmentInputList from "@/components/order/FragmentInputList";
import MutationInputList from "@/components/order/MutationInputList";
import AssemblyDiagram from "@/components/order/AssemblyDiagram";
import PositionDiagram from "@/components/order/PositionDiagram";
import TargetRegionInput from "@/components/order/TargetRegionInput";
import PricingSummary from "@/components/order/PricingSummary";

// ─── Page ──────────────────────────────────────────────────────────────────────

const OrderPage: React.FC = () => {
  const form = useOrderForm();

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--color-bg)" }}>
      {form.loggedIn && <Sidebar />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!form.loggedIn && <Header />}

        <main style={{ flex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: "4rem 3rem" }}>

          {/* ── Step 1: Build type ───────────────────────────────────────── */}
          <BuildTypeSelector
            selectedOption={form.selectedOption}
            onSelect={form.selectBuildOption}
          />

          {/* ── Step 2: Build details ────────────────────────────────────── */}
          <div style={{ marginTop: "3rem" }}>
            <p className="vw-eyebrow" style={{ marginBottom: "0.5rem" }}>Step 2</p>
            <h2 className="vw-heading" style={{ marginBottom: "2rem" }}>
              Build your plasmid
            </h2>

            <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

              {/* ── Left column: inputs ──────────────────────────────────── */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Plasmid name */}
                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-text)",
                  }}>
                    Plasmid Name <span style={{ color: "var(--color-red)" }}>*</span>
                  </label>
                  <input
                    id="plasmidName"
                    type="text"
                    placeholder="e.g. pMyProtein"
                    value={form.plasmidName}
                    onChange={(e) => {
                      form.setPlasmidName(e.target.value);
                      form.validatePlasmidName(e.target.value);
                    }}
                    onBlur={() => form.validatePlasmidName(form.plasmidName)}
                    style={{
                      background: "var(--color-surface)",
                      border: `1px solid ${form.plasmidError ? "var(--color-red)" : "var(--color-border)"}`,
                      borderRadius: 6,
                      padding: "0.5rem 0.75rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      color: "var(--color-text)",
                      outline: "none",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      maxWidth: 320,
                    }}
                    onFocus={(e) => {
                      if (!form.plasmidError) {
                        e.currentTarget.style.borderColor = "var(--color-blue-muted)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,127,181,0.15)";
                      }
                    }}
                    onBlurCapture={(e) => {
                      if (!form.plasmidError) {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  />
                  {form.plasmidError && (
                    <p style={{ fontSize: "0.78rem", color: "var(--color-red)", fontFamily: "var(--font-sans)" }}>
                      {form.plasmidError}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--color-border)" }} />

                {/* Backbone (Multi-insert + Mutagenesis) */}
                {(form.selectedOption === 0 || form.selectedOption === 1) && (
                  <BackboneSelector
                    loggedIn={form.loggedIn}
                    backbones={form.backbones}
                    selectedBackbone={form.selectedBackbone}
                    backboneSelectedError={form.backboneSelectedError}
                    newBackboneName={form.newBackboneName}
                    newBackboneSequence={form.newBackboneSequence}
                    backboneUploadError={form.backboneUploadError}
                    onSelectBackbone={(name) => {
                      form.setSelectedBackbone(name);
                      form.setBackboneSelectedError("");
                    }}
                    onSubmitUpload={form.submitBackboneUpload}
                    onNewBackboneNameChange={form.setNewBackboneName}
                    onNewBackboneSequenceChange={form.setNewBackboneSequence}
                  />
                )}

                {/* Fragment inputs (Multi-insert + New backbone) */}
                {(form.selectedOption === 0 || form.selectedOption === 2) && (
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-text)",
                        marginBottom: "0.1rem",
                      }}>
                        DNA Fragments
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontFamily: "var(--font-sans)" }}>
                        Enter sequences 5′ → 3′. Up to 5 fragments.
                      </p>
                    </div>

                    <AssemblyDiagram
                      buildOption={form.selectedOption}
                      fragments={form.fragments}
                    />

                    <FragmentInputList
                      buildOption={form.selectedOption}
                      fragments={form.fragments}
                      fragmentErrors={form.fragmentErrors}
                      onFragmentFieldChange={form.updateFragmentField}
                      onDeleteFragment={form.deleteFragment}
                      onAddFragment={form.addFragment}
                      requiredCount={INITIAL_FRAGMENT_COUNT[form.selectedOption]}
                    />
                  </div>
                )}

                {/* Mutation inputs (Mutagenesis) */}
                {form.selectedOption === 1 && (
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-text)",
                        marginBottom: "0.1rem",
                      }}>
                        Point Mutations
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontFamily: "var(--font-sans)" }}>
                        Up to 4 mutations per order.
                      </p>
                    </div>

                    <PositionDiagram />

                    <TargetRegionInput
                      value={form.targetRegion}
                      error={form.targetRegionError}
                      onChange={form.updateTargetRegion}
                      onBlur={form.validateTargetRegion}
                    />

                    <MutationInputList
                      mutations={form.mutations}
                      mutationErrors={form.mutationErrors}
                      onMutationChange={form.updateMutation}
                      onDeleteMutation={form.deleteMutation}
                      onAddMutation={form.addMutation}
                    />
                  </div>
                )}

                {/* Submit-level errors */}
                {form.submissionError && (
                  <p style={{ fontSize: "0.82rem", color: "var(--color-red)", fontFamily: "var(--font-sans)" }}>
                    {form.submissionError}
                  </p>
                )}
                {form.mutationSubmitError && (
                  <p style={{ fontSize: "0.82rem", color: "var(--color-red)", fontFamily: "var(--font-sans)" }}>
                    {form.mutationSubmitError}
                  </p>
                )}
              </div>

              {/* ── Right column: chart + pricing + actions ──────────────── */}
              <PricingSummary
                buildOption={form.selectedOption}
                fragments={form.fragments}
                mutations={form.mutations}
                selectedBackbone={form.selectedBackbone}
                backboneSize={form.getBackboneSize()}
                backboneLength={form.getBackboneLength()}
                backboneSequence={form.getBackboneSequence()}
                loggedIn={form.loggedIn}
                isSubmitting={form.isSubmitting}
                isAddingToCart={form.isAddingToCart}
                orderSuccess={form.orderSuccess}
                orderError={form.orderError}
                onAddToCart={form.addToCart}
                onSubmitOrder={form.submitOrder}
              />
            </div>
          </div>
        </main>

        {!form.loggedIn && <Footer />}
      </div>
    </div>
  );
};

export default OrderPage;
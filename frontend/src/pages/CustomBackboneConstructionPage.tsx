import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function CustomBackboneConstructionPage() {
  const [activeTab, setActiveTab] = useState<"about" | "pricing" | "sample-prep" | "faq">("about");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f4f6fa; color: #1a2236; overflow-x: hidden; }
        .tab-btn { transition: all 0.15s; }
        .tab-btn:hover { border-color: #1d3461; color: #1d3461; }
        .tab-btn.active { background: #1d3461; border-color: #1d3461; color: #fff; }
        .value-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(29,52,97,0.08); border-color: #8fa8d0 !important; }
      `}</style>

      <div style={{ paddingTop: 60, minHeight: "100vh" }}>
        <Header />
        
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(to bottom right, rgba(244,246,250,0.7), rgba(212,218,232,0.5))", borderBottom: "1px solid #d4dae8", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#3b82f6" }} title="Fragment 1" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#16a34a" }} title="Fragment 2" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#f97316" }} title="Fragment 3" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#a855f7" }} title="Fragment 4" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#14b8a6" }} title="Fragment 5" />
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "0.75rem" }}>Custom Backbone Construction</h1>
          <p style={{ color: "#4a5a78", maxWidth: "36rem", margin: "0 auto" }}>Design and build entirely new plasmid backbones from scratch: combine any elements including markers, origins, promoters, and reporters to create the custom vector you've always wanted.</p>
          <a href="/order" style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.5rem 1.5rem", background: "#1d3461", color: "#fff", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
             onMouseEnter={e => { e.currentTarget.style.background = "#5b7fb5"; }}
             onMouseLeave={e => { e.currentTarget.style.background = "#1d3461"; }}
          >Order Now</a>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", padding: "0 2rem", marginBottom: "2rem" }}>
          {["about", "pricing", "sample-prep", "faq"].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              style={{ padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, border: "1px solid #d4dae8", background: activeTab === tab ? "#1d3461" : "#fff", color: activeTab === tab ? "#fff" : "#4a5a78", cursor: "pointer", textTransform: "capitalize" }}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem", paddingBottom: "4rem" }}>
          {activeTab === "about" && (
            <>
              <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2.5rem", marginBottom: "3rem" }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1rem" }}>Why settle for someone else's plasmid backbone?</h2>
                <p style={{ color: "#4a5a78", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  Cloning into a pre-built plasmid is like moving into someone else's house; you're stuck with their design choices whether you like them or not. The wrong selectable marker, an incompatible origin, or a promoter that never quite fits your system can leave you rearranging someone else's blueprint instead of building your own.
                </p>
                <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>
                  Our custom backbone construction service lets you design new plasmids from the ground up. Mix and match DNA parts to build custom plasmids tailored to your project. Your dream plasmid deserves to exist. Bring it to life today.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "3rem" }}>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Freedom from Pre-Built Constructs</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Build the plasmid you want, not the one you're stuck with.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Unlimited Design Freedom</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Mix and match any combination of parts including origins, markers, reporters, promoters in one seamless build.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Faster & Cleaner than DIY</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Go from concept to construct in days, not months.</p>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1.5rem" }}>Available Components</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Selectable Markers</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Ampicillin, Kanamycin, Chloramphenicol, Tetracycline, and more</p>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Origins of Replication</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>High-copy, low-copy, medium-copy, and inducible origins</p>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Promoters</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Constitutive, inducible, tissue-specific, and synthetic promoters</p>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Reporters & Tags</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>GFP, RFP, His-tag, FLAG-tag, and other fusion tags</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "pricing" && (
            <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
              <div style={{ borderBottom: "2px solid #1d3461", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "0.25rem" }}>Pricing Breakdown</h2>
                <p style={{ fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>LAB-REPORT-PRICING-V1.0</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ border: "1px solid #b8c3d8", borderRadius: 8, padding: "1.5rem", background: "rgba(244,246,250,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>CUSTOM_BACKBONE_ASSEMBLY</h3>
                      <p style={{ fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>ID: BB-CUSTOM-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>$200.00</span>
                  </div>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: assembly and verification of custom backbone with up to 4 components</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dbeafe", color: "#1d4ed8", borderRadius: 4 }}>TURNAROUND: ~1-2 WEEKS</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #b8c3d8", borderRadius: 8, padding: "1.5rem", background: "rgba(244,246,250,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>ADDITIONAL_COMPONENT</h3>
                      <p style={{ fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>ID: BB-COMP-ADD-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>$25.00</span>
                  </div>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Each additional component beyond 4</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#15803d", borderRadius: 4 }}>TURNAROUND: ~1-2 WEEKS</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(239,246,255,0.5)", border: "1px solid #bfdbfe", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4a5a78" }}>
                  <strong style={{ color: "#1d3461" }}>Note:</strong> Complex backbones with many components may require additional time. Contact us for a custom quote on large projects.
                </p>
              </div>
            </div>
          )}

          {activeTab === "sample-prep" && (
            <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1d3461", marginBottom: "1.5rem" }}>Design Submission Guidelines</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderLeft: "4px solid #1d3461", paddingLeft: "1rem" }}>
                  <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Provide Component Sequences</h4>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Submit sequences for each component (markers, origins, promoters, etc.) in FASTA or GenBank format.</p>
                </div>
                <div style={{ borderLeft: "4px solid #5b7fb5", paddingLeft: "1rem" }}>
                  <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Specify Assembly Order</h4>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Clearly indicate the desired order and orientation of each component in the final plasmid.</p>
                </div>
                <div style={{ borderLeft: "4px solid #16a34a", paddingLeft: "1rem" }}>
                  <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Include Restriction Sites (Optional)</h4>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>If you need specific restriction sites for future cloning, include them in your design specifications.</p>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,237,213,0.5)", border: "1px solid #fed7aa", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4a5a78" }}>
                  <strong style={{ color: "#ea580c" }}>Important:</strong> Our team will review your design for feasibility and contact you if any modifications are recommended before assembly begins.
                </p>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1d3461", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>What components can I include?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>You can include any standard plasmid components: selectable markers, origins of replication, promoters, reporters, tags, multiple cloning sites, and more.</p>
                </div>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Is there a limit on the number of components?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Our standard service includes up to 4 components. For more complex backbones, contact us for a custom quote.</p>
                </div>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Can you use my existing DNA parts?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Yes, if you have existing DNA parts, we can incorporate them into your custom backbone design.</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>What if the assembly fails?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>In the rare event of a failure, we'll rebuild your backbone at no additional cost. Your satisfaction is guaranteed.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

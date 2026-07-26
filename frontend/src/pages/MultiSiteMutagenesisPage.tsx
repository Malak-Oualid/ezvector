import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function MultiSiteMutagenesisPage() {
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
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "0.75rem" }}>Multi-Site & Codon Mutagenesis</h1>
          <p style={{ color: "#4a5a78", maxWidth: "36rem", margin: "0 auto" }}>Make targeted site-directed or codon-level mutations at up to five sites in a single build.</p>
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
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1rem" }}>Why make one change when you can make five?</h2>
                <p style={{ color: "#4a5a78", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  Site-directed mutagenesis shouldn't mean endless primer design, failed PCRs, and late nights screening colonies that never work. Traditional workflows make you chase one mutation at a time, hoping each round behaves.
                </p>
                <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>
                  Our multi-site mutagenesis service introduces up to five defined mutations in a single build, whether introducing point mutations or generating codon-level variants. Create parallel designs or randomized libraries without the frustration of iterative PCRs or screening cycles. Give your PCR machine a break.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "3rem" }}>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Multi-Site Mutagenesis</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Stop re-running the same assembly hoping for a miracle. We build complex constructs that actually work.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Codon Mutagenesis</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Assemble any fragments in any order, into any vector. No restriction sites, no scars, just clean, seamless builds.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1d3461", marginBottom: "0.75rem" }}>Save your time (and sanity)</h3>
                  <p style={{ color: "#4a5a78", lineHeight: 1.75 }}>Spend your time doing experiments, not redoing cloning. Get sequence verified plasmids back in days.</p>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1.5rem" }}>Key Applications</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ borderLeft: "4px solid #1d3461", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Site-Directed Mutagenesis</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Introduce precise point mutations, deletions, or insertions at specific locations in your plasmid.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #5b7fb5", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Codon Optimization</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Optimize codon usage for expression in different organisms or create synonymous variants for functional studies.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #16a34a", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.25rem" }}>Variant Libraries</h4>
                    <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Generate parallel designs or randomized libraries for screening and selection experiments.</p>
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
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>BASE_MUTAGENESIS_SERVICE</h3>
                      <p style={{ fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>ID: MUT-BASE-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>$120.00</span>
                  </div>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: up to 5 site-directed mutations in a single build</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dbeafe", color: "#1d4ed8", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #b8c3d8", borderRadius: 8, padding: "1.5rem", background: "rgba(244,246,250,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>CODON_LEVEL_MUTAGENESIS</h3>
                      <p style={{ fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>ID: MUT-CODON-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1d3461", fontFamily: "DM Mono, monospace" }}>$150.00</span>
                  </div>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: codon optimization or codon-level variant generation</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#7a8ca8", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#15803d", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(239,246,255,0.5)", border: "1px solid #bfdbfe", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4a5a78" }}>
                  <strong style={{ color: "#1d3461" }}>Note:</strong> Each additional mutation beyond 5 sites may incur additional fees. Contact us for custom projects.
                </p>
              </div>
            </div>
          )}

          {activeTab === "sample-prep" && (
            <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1d3461", marginBottom: "1.5rem" }}>Sample Submission Guidelines</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#1d3461", borderBottom: "1px solid #d4dae8" }}>Material Type</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#1d3461", borderBottom: "1px solid #d4dae8" }}>Volume Required</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#1d3461", borderBottom: "1px solid #d4dae8" }}>Concentration Required</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#1d3461", borderBottom: "1px solid #d4dae8" }}>Purity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #d4dae8", color: "#1d3461", fontWeight: 500 }}>Plasmid DNA</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #d4dae8", color: "#4a5a78" }}>20 μL</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #d4dae8", color: "#4a5a78" }}>20–50 ng/μL, 100–500 ng/μL</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #d4dae8", color: "#4a5a78" }}>A260/A280 &gt; 1.8 and A260/A230 &gt; 2</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,237,213,0.5)", border: "1px solid #fed7aa", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4a5a78" }}>
                  <strong style={{ color: "#ea580c" }}>Important:</strong> Please provide the wild-type plasmid as your backbone. Include a detailed description of the desired mutations in your order.
                </p>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1d3461", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>What types of mutations can you make?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>We can make point mutations, deletions, insertions, and codon-level changes. Contact us for more complex modifications.</p>
                </div>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Do I need to provide primers?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>No, we design and synthesize all primers needed for your mutagenesis project.</p>
                </div>
                <div style={{ borderBottom: "1px solid #d4dae8", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>Can you make mutations in any plasmid?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>Yes, we can introduce mutations into any plasmid backbone you provide, regardless of size or complexity.</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#1d3461", marginBottom: "0.5rem" }}>What if the mutagenesis fails?</h3>
                  <p style={{ color: "#4a5a78", fontSize: "0.875rem" }}>In the rare event of a failure, we'll repeat the mutagenesis at no additional cost. Your satisfaction is guaranteed.</p>
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

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function MultiInsertCloningPage() {
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
        
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(to bottom right, rgba(239,246,255,0.5), rgba(219,234,254,0.5))", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#3b82f6" }} title="Fragment 1" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#16a34a" }} title="Fragment 2" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#f97316" }} title="Fragment 3" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#a855f7" }} title="Fragment 4" />
            <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: "#14b8a6" }} title="Fragment 5" />
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "0.75rem" }}>Multi-Insert Cloning</h1>
          <p style={{ color: "#4b5563", maxWidth: "36rem", margin: "0 auto" }}>Seamlessly assemble complex plasmids with up to 5 inserts in a single step.</p>
          <a href="/order" style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.5rem 1.5rem", background: "#111827", color: "#fff", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
             onMouseEnter={e => { e.currentTarget.style.background = "#374151"; }}
             onMouseLeave={e => { e.currentTarget.style.background = "#111827"; }}
          >Order Now</a>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", padding: "0 2rem", marginBottom: "2rem" }}>
          {["about", "pricing", "sample-prep", "faq"].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              style={{ padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, border: "1px solid #e5e7eb", background: activeTab === tab ? "#1d3461" : "#fff", color: activeTab === tab ? "#fff" : "#4b5563", cursor: "pointer", textTransform: "capitalize" }}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem", paddingBottom: "4rem" }}>
          {activeTab === "about" && (
            <>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2.5rem", marginBottom: "3rem" }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1rem" }}>Because "maybe it'll work this time" isn't a workflow.</h2>
                <p style={{ color: "#4b5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  Cloning shouldn't feel like Groundhog Day. DIY cloning wastes your time, your reagents, and your patience with failed assemblies, size limits, and restriction site constraints.
                </p>
                <p style={{ color: "#4b5563", lineHeight: 1.75 }}>
                  Our multi-insert cloning service assembles up to five DNA fragments of any length or composition in a single seamless build. Each plasmid is sequence-verified and ready to use, saving you from wasted weekends, repeat reactions, and the frustration of uncertainty. More inserts. Less effort. Real results.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "3rem" }}>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>No more failed assemblies</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Stop re-running the same assembly hoping for a miracle. We build complex constructs that actually work.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Design Flexibility</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Assemble any fragments in any order, into any vector. No restriction sites, no scars, just clean, seamless builds.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Save your time (and sanity)</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Spend your time doing experiments, not redoing cloning. Get sequence verified plasmids back in days.</p>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem", marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>Key Applications</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ borderLeft: "4px solid #111827", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Standard and Complex Cloning</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>From single gene inserts to multi-fragment constructs, we handle everything.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #2563eb", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Combinatorial Cloning</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Easily generate variant libraries by swapping or recombining different inserts within the same vector. Perfect for domain shuffling, promoter testing, and protein tagging.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #16a34a", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Hybrid Cloning & Synthesis</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Combine existing DNA parts with new synthetic fragments in a single build. Reduce synthesis costs by only ordering what's new and let us assemble everything into your vector.</p>
                  </div>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1.5rem" }}>Comparison</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb" }}>Feature</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb", background: "rgba(17,24,39,0.04)" }}>VectorWeave</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>DNA Synthesis Vendors</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>DIY Cloning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Existing DNA Use</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Reuse what you already have. Cloning is cheaper than re-synthesizing.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>You pay to re-synthesize sequences that already exist.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Labor-intensive and failure-prone.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Assembly Capability</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Assemble up to 5 inserts of any length, GC content, and complexity.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Long or complex sequences often fail.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>1–2 inserts before failure rates spike.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Vector Flexibility</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Clone into any plasmid. No vendor lock-in.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Restricted to vendor-approved backbones.</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Requires manual prep and compatibility work.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Number of Inserts</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Up to 5 fragments</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>N/A</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>1–2 inserts before failure rates skyrocket.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Speed & Time</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Zero bench time and ~1 week turnaround</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Long delivery times</td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>Hours of setup, repeats, troubleshooting</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75rem 1rem", color: "#111827", fontWeight: 500 }}>Total Cost</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#111827", background: "rgba(17,24,39,0.03)" }}>Predictable and affordable. No hidden onboarding fees.</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#4b5563" }}>High costs for long or complex builds + onboarding fees.</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#4b5563" }}>High reagent, labor, and redo costs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "pricing" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
              <div style={{ borderBottom: "2px solid #111827", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "0.25rem" }}>Pricing Breakdown</h2>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>LAB-REPORT-PRICING-V1.0</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "1.5rem", background: "rgba(249,250,251,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>BASE_PLASMID_ASSEMBLY</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: PLA-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$150.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: cloning and verification of one plasmid</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dbeafe", color: "#1d4ed8", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "1.5rem", background: "rgba(249,250,251,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>STANDARD_INSERT</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: INS-STD-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$50.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Criteria: DNA fragments &lt; 3,000 bp and &lt; 60% GC</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#15803d", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "1.5rem", background: "rgba(249,250,251,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>COMPLEX_INSERT</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: INS-CPX-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$90.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Criteria: DNA fragments &gt; 3,000 bp or &gt; 60% GC</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#fed7aa", color: "#c2410c", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(239,246,255,0.5)", border: "1px solid #bfdbfe", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  <strong style={{ color: "#111827" }}>Example Calculation:</strong> A plasmid with three standard inserts = $150 + (3 × $50) = $300
                </p>
              </div>
            </div>
          )}

          {activeTab === "sample-prep" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>Sample Submission Guidelines</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb" }}>Material Type</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb" }}>Volume Required</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb" }}>Concentration Required</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#111827", borderBottom: "1px solid #e5e7eb" }}>Purity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#111827", fontWeight: 500 }}>Plasmid DNA</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>20 μL</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>20–50 ng/μL, 100–500 ng/μL</td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>A260/A280 &gt; 1.8 and A260/A230 &gt; 2</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", color: "#111827", fontWeight: 500 }}>Genomic DNA</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#4b5563" }}>20 μL</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#4b5563" }}>—</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#4b5563" }}>A260/A280 &gt; 1.8 and A260/A230 &gt; 2</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,237,213,0.5)", border: "1px solid #fed7aa", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  <strong style={{ color: "#ea580c" }}>Important:</strong> Please send DNA samples in water to facilitate downstream processing. DNA samples must not contain primers, denaturants, or contaminants.
                </p>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>What is the maximum number of inserts I can use?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>We support up to 5 inserts in a single assembly. For more complex projects, contact us to discuss custom solutions.</p>
                </div>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>Are there any size limitations on the inserts?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>No, we can assemble fragments of any length. However, very long or complex fragments may be classified as complex inserts with different pricing.</p>
                </div>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>Do I need to provide restriction sites?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>No, our assembly method is restriction-site free. Just provide your sequences and we'll handle the rest.</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>What if my assembly fails?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>In the rare event of a failure, we'll rebuild your plasmid at no additional cost. Your satisfaction is guaranteed.</p>
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

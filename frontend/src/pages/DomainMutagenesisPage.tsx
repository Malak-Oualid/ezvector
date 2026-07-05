import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function DomainMutagenesisPage() {
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
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "0.75rem" }}>Domain Mutagenesis</h1>
          <p style={{ color: "#4b5563", maxWidth: "36rem", margin: "0 auto" }}>Create variant libraries by mutating separate DNA domains on your plasmid all at once.</p>
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
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1rem" }}>Why mutagenize just one domain when you can do three?</h2>
                <p style={{ color: "#4b5563", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  Functional exploration shouldn't be constrained by your cloning workflow. Building plasmid variant libraries means endless rounds of cloning, verification, and troubleshooting.
                </p>
                <p style={{ color: "#4b5563", lineHeight: 1.75 }}>
                  Our domain mutagenesis service eliminates the grind. You can now mutagenize up to three separate domains on your plasmid simultaneously, allowing you to swap, randomize and reengineer regions in parallel. Outsource your mutagenesis so you can focus on what your variants teach you, not how to make them.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "3rem" }}>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Freedom from Pre-Built Constructs</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Build the plasmid you want, not the one you're stuck with.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Seamless Integration of Parts</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Mix and match any combination of parts including origins, markers, reporters, promoters in one seamless build.</p>
                </div>
                <div className="value-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>Faster & Cleaner than DIY</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.75 }}>Go from concept to construct in days, not months.</p>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#1d3461", marginBottom: "1.5rem" }}>Key Applications</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ borderLeft: "4px solid #111827", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Protein Domain Swapping</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Swap functional domains between proteins to study structure-function relationships and create chimeric proteins.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #2563eb", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Promoter/Enhancer Libraries</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Generate libraries of promoter variants to optimize expression levels across different conditions.</p>
                  </div>
                  <div style={{ borderLeft: "4px solid #16a34a", paddingLeft: "1rem" }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>Binding Site Optimization</h4>
                    <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Systematically mutate binding domains to optimize affinity, specificity, or other functional properties.</p>
                  </div>
                </div>
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
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>SINGLE_DOMAIN_MUTAGENESIS</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: DM-SINGLE-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$100.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: mutagenesis of one domain with up to 5 mutations</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dbeafe", color: "#1d4ed8", borderRadius: 4 }}>TURNAROUND: ~1 WEEK</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "1.5rem", background: "rgba(249,250,251,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>TWO_DOMAIN_MUTAGENESIS</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: DM-DOUBLE-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$180.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: mutagenesis of two domains with up to 5 mutations each</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#15803d", borderRadius: 4 }}>TURNAROUND: ~1-2 WEEKS</span>
                  </div>
                </div>
                <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "1.5rem", background: "rgba(249,250,251,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", fontFamily: "DM Mono, monospace" }}>THREE_DOMAIN_MUTAGENESIS</h3>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>ID: DM-TRIPLE-001</p>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", fontFamily: "DM Mono, monospace" }}>$250.00</span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Includes: mutagenesis of three domains with up to 5 mutations each</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#6b7280", fontFamily: "DM Mono, monospace" }}>
                    <span style={{ padding: "0.25rem 0.5rem", background: "#fed7aa", color: "#c2410c", borderRadius: 4 }}>TURNAROUND: ~1-2 WEEKS</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(239,246,255,0.5)", border: "1px solid #bfdbfe", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  <strong style={{ color: "#111827" }}>Note:</strong> Additional mutations beyond 5 per domain may incur extra fees. Contact us for complex projects.
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
                </tbody>
              </table>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,237,213,0.5)", border: "1px solid #fed7aa", borderRadius: 8 }}>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  <strong style={{ color: "#ea580c" }}>Important:</strong> Please provide the wild-type plasmid and clearly specify the domains to be mutagenized along with the desired mutations for each domain.
                </p>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>What defines a "domain"?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>A domain is a distinct functional or structural region of your protein. Common examples include binding domains, catalytic domains, transmembrane regions, and signal peptides.</p>
                </div>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>Can I randomize mutations within a domain?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>Yes, we can create randomized libraries within specified domains. Contact us to discuss your library design requirements.</p>
                </div>
                <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>How do you ensure domain boundaries are respected?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>We carefully design primers to target specific domain boundaries based on your specifications or sequence analysis.</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>What if the mutagenesis fails?</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>In the rare event of a failure, we'll repeat the mutagenesis at no additional cost. Your satisfaction is guaranteed.</p>
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

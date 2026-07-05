import Header from "../components/Header";
import Footer from "../components/Footer";

interface ServiceItem { title: string; tagline: string; body: string; features: string[]; wide?: boolean; link: string; }

const SERVICES: ServiceItem[] = [
  {
    title: "Multi-Insert Cloning",
    tagline: '"Maybe it\'ll work this time" isn\'t a workflow.',
    body: "Seamlessly assemble complex plasmids with up to 5 inserts in a single step. Each plasmid is sequence-verified and ready to use, saving you from wasted weekends and repeat reactions.",
    features: ["Up to 5 fragments in one seamless build", "No restriction sites, no scars", "Sequence-verified results in days"],
    link: "/services/multi-insert-cloning",
  },
  {
    title: "Custom Backbone Construction",
    tagline: "Why settle for someone else's plasmid backbone?",
    body: "Design and build entirely new plasmid backbones from scratch. Combine any elements — markers, origins, promoters, reporters — to create the custom vector you've always wanted.",
    features: ["Freedom from pre-built constructs", "Mix & match any combination of parts", "Concept to construct in days, not months"],
    link: "/services/custom-backbone-construction",
  },
  {
    title: "Multi-Site & Codon Mutagenesis",
    tagline: "Why make one change when you can make five?",
    body: "Make targeted site-directed or codon-level mutations at up to five sites in a single build. Create parallel designs or randomized libraries without iterative PCRs or screening cycles.",
    features: ["Up to 5 mutations per build", "Point mutations or codon-level changes", "Parallel variant libraries in one step"],
    link: "/services/multi-site-mutagenesis",
  },
  {
    title: "Domain Mutagenesis",
    tagline: "Why mutagenize just one domain when you can do three?",
    body: "Create variant libraries by mutating separate DNA domains simultaneously. Swap, randomize, and reengineer regions in parallel. Focus on what your variants teach you, not how to make them.",
    features: ["Up to 3 simultaneous domain mutations", "Seamless integration of parts", "Outsource the grind, keep the science"],
    link: "/services/domain-mutagenesis",
  },
  {
    title: "Synthetic DNA Cloning",
    tagline: "We handle the vendors. You handle the science.",
    body: "Clone synthetic DNA fragments into any plasmid backbone, without onboarding fees. We coordinate with synthesis providers, clone into any vector — even low copy plasmids — and send you verified constructs.",
    features: ["Clone into your vector, not a vendor's", "No onboarding fees or setup minimums", "We handle all vendor communication"],
    wide: true,
    link: "/services/synthetic-dna-cloning",
  },
];

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f4f6fa; color: #1a2236; overflow-x: hidden; }
        .service-card { transition: all 0.2s; }
        .service-card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(29,52,97,0.08); border-color: #93c5fd !important; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, #111827, #93c5fd); opacity: 0; border-radius: 12px 12px 0 0; transition: opacity 0.2s; }
        .service-card:hover::before { opacity: 1; }
      `}</style>

      <div style={{ paddingTop: 60, minHeight: "100vh" }}>
        <Header />

        <div style={{ background: "#f9fafb", minHeight: "100vh", marginTop: 0 }}>
          <section style={{ padding: "4rem 2rem 5rem", maxWidth: "72rem", margin: "0 auto" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#2563eb", marginBottom: "0.5rem", textAlign: "center" }}>Services</p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "3.5rem", textAlign: "center" }}>Everything you need to clone.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {SERVICES.map(s => (
                  <div key={s.title} className="service-card" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "2rem", position: "relative", overflow: "hidden", gridColumn: s.wide ? "1 / -1" : undefined }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>{s.title}</h3>
                    <p style={{ fontSize: "0.875rem", fontStyle: "italic", color: "#2563eb", marginBottom: "0.75rem" }}>{s.tagline}</p>
                    <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.75, marginBottom: "1.25rem" }}>{s.body}</p>
                    <div style={{ display: s.wide ? "flex" : "flex", flexDirection: s.wide ? "row" : "column", flexWrap: s.wide ? "wrap" : "nowrap", gap: s.wide ? "2rem" : "0.25rem", marginBottom: "1.5rem" }}>
                      {s.features.map(f => (
                          <span key={f} style={{ fontSize: "0.875rem", color: "#4b5563", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", background: "#93c5fd", flexShrink: 0 }} />{f}
                    </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                      <a href="/order" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", border: "1px solid #111827", color: "#111827", padding: "0.375rem 1rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", transition: "all 0.15s" }}
                         onMouseEnter={e => { e.currentTarget.style.background = "#111827"; e.currentTarget.style.color = "#fff"; }}
                         onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111827"; }}
                      >
                        Order Now →
                      </a>
                      <a href={s.link} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "#d94f2b", color: "#fff", padding: "0.375rem 1rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", transition: "all 0.15s" }}
                         onMouseEnter={e => { e.currentTarget.style.background = "#b84020"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                         onMouseLeave={e => { e.currentTarget.style.background = "#d94f2b"; e.currentTarget.style.transform = ""; }}
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

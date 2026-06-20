import BG_B64 from "../assets/hero.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

/* ── Types ─────────────────────────────────────────── */
interface CompareRow { feat: string; us: string; vendors: string; diy: string; }

/* ── Data ───────────────────────────────────────────── */

const COMPARE_ROWS: CompareRow[] = [
  { feat: "Vector Flexibility", us: "Clone into any plasmid. No vendor lock-in.", vendors: "Restricted to vendor-approved backbones.", diy: "Requires manual prep and compatibility work." },
  { feat: "Assembly Capability", us: "Up to 5 inserts of any length, GC content & complexity.", vendors: "Long or complex sequences often fail.", diy: "1–2 inserts before failure rates spike." },
  { feat: "Onboarding Costs", us: "No onboarding fees. Pay only for what you build.", vendors: "Added setup and onboarding fees per vector.", diy: "High reagent and consumable costs." },
  { feat: "Speed & Time", us: "Zero bench time and ~1 week turnaround.", vendors: "No hands-on work, but long delivery times.", diy: "Hours of setup, repeats, and troubleshooting." },
  { feat: "Total Cost", us: "Predictable and affordable. No hidden fees.", vendors: "High costs for long or complex builds.", diy: "High reagent, labor, and re-do costs." },
];

/* ── DNA Weaving SVG ────────────────────────────────────── */
function DNAWeaveSVG() {
  const [hover, setHover] = useState(false);

  return (
      <svg
          viewBox="-150 -150 300 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: 280, height: 280, cursor: "pointer" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
      >
        {/* Background threads */}
        <g opacity="0.3">
          {[-120, -80, -40, 0, 40, 80, 120].map((y, i) => (
            <line key={i} x1="-140" y1={y} x2="140" y2={y} stroke="#d4dae8" strokeWidth="1.5" />
          ))}
          {[-120, -80, -40, 0, 40, 80, 120].map((x, i) => (
            <line key={i} x1={x} y1="-140" x2={x} y2="140" stroke="#d4dae8" strokeWidth="1.5" />
          ))}
        </g>

        {/* DNA double helix weaving pattern */}
        <g style={{ transition: "transform 0.5s ease", transform: hover ? "scale(1.05)" : "scale(1)" }}>
          {/* Left strand */}
          <path d="M -60 -100 Q -30 -50 -60 0 T -60 100" fill="none" stroke="#5b7fb5" strokeWidth="4" strokeLinecap="round" />
          {/* Right strand */}
          <path d="M 60 -100 Q 30 -50 60 0 T 60 100" fill="none" stroke="#1a7a4a" strokeWidth="4" strokeLinecap="round" />

          {/* Cross-links (weaving) */}
          {[-80, -40, 0, 40, 80].map((y, i) => {
            const offset = i % 2 === 0 ? 0 : 15;
            return (
              <g key={i}>
                <line x1="-60" y1={y} x2="60" y2={y} stroke="#d94f2b" strokeWidth="2" opacity="0.6" />
                <circle cx={-30 + offset} cy={y} r="4" fill="#d94f2b" />
                <circle cx={30 - offset} cy={y} r="4" fill="#d94f2b" />
              </g>
            );
          })}

          {/* Embroidery needle */}
          <g transform={hover ? "translate(10, -10)" : "translate(0, 0)"} style={{ transition: "transform 0.3s ease" }}>
            <path d="M 80 -80 L 100 -60 L 95 -55 L 75 -75 Z" fill="#8fa8d0" />
            <line x1="80" y1="-80" x2="60" y2="-100" stroke="#8fa8d0" strokeWidth="2" />
            <circle cx="80" cy="-80" r="3" fill="#1d3461" />
          </g>

          {/* Thread from needle */}
          <path d="M 60 -100 Q 40 -80 20 -60 T -20 -20" fill="none" stroke="#d94f2b" strokeWidth="1.5" strokeDasharray="4,4" opacity={hover ? 0.8 : 0.4} />
        </g>

        {/* Decorative corners */}
        <g opacity="0.4">
          <path d="M -130 -130 L -130 -110 L -110 -110" fill="none" stroke="#1d3461" strokeWidth="2" />
          <path d="M 130 -130 L 130 -110 L 110 -110" fill="none" stroke="#1d3461" strokeWidth="2" />
          <path d="M -130 130 L -130 110 L -110 110" fill="none" stroke="#1d3461" strokeWidth="2" />
          <path d="M 130 130 L 130 110 L 110 110" fill="none" stroke="#1d3461" strokeWidth="2" />
        </g>
      </svg>
  );
}

/* ── Main ───────────────────────────────────────────── */
export default function LandingPage() {
  return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f4f6fa; color: #1a2236; overflow-x: hidden; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-0 { animation: fadeUp 0.6s 0.0s ease both; }
        .anim-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .anim-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .anim-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .anim-4 { animation: fadeUp 0.6s 0.4s ease both; }
        .anim-5 { animation: fadeUp 0.7s 0.25s ease both; }

        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1d3461, #8fa8d0);
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 14px 14px 0 0;
        }
        .svc-card:hover::before { opacity: 1; }
        .svc-card:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(29,52,97,0.08); border-color: #8fa8d0 !important; }
        .value-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(29,52,97,0.08); border-color: #8fa8d0 !important; }
      `}</style>

        <Header />

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: 60 }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url(${BG_B64})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.25,
          }} />
          <div style={{
            position: "relative", zIndex: 5, flex: 1,
            display: "grid", gridTemplateColumns: "1fr 1fr",
            alignItems: "center", maxWidth: 1200, margin: "0 auto",
            padding: "5rem 3rem 8rem", gap: "4rem", width: "100%",
          }}>
            <div>
              <h1 className="anim-1" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(3.2rem, 6vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                <span style={{ color: "#1d3461" }}>Clone</span><br />
                <span style={{ color: "#d94f2b" }}>Anything.</span>
              </h1>
              <p className="anim-2" style={{ fontSize: "1.15rem", fontWeight: 400, color: "#4a5a78", letterSpacing: "0.01em", marginBottom: "0.75rem" }}>
                You design it. We build it.
              </p>
              <p className="anim-3" style={{ fontSize: "0.95rem", color: "#4a5a78", lineHeight: 1.7, maxWidth: 420, marginBottom: "2.5rem" }}>
                Multi-insert cloning, multi-site mutagenesis, and custom plasmid backbones — all delivered in days. Send your DNA and we'll do the rest.
              </p>
              <div className="anim-4" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <a href="/order" style={{ background: "#d94f2b", color: "#fff", border: "none", padding: "0.85rem 2.2rem", borderRadius: 8, fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "all 0.18s", display: "inline-block" }}
                   onMouseEnter={e => { e.currentTarget.style.background = "#b84020"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(217,79,43,0.3)"; }}
                   onMouseLeave={e => { e.currentTarget.style.background = "#d94f2b"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >Start Cloning</a>
                <a href="/services" style={{ color: "#1d3461", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.15s" }}
                   onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "#1d3461")}
                   onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}
                >See our services →</a>
              </div>
            </div>
            <div className="anim-5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(212,218,232,0.7)", boxShadow: "0 12px 48px rgba(29,52,97,0.1)" }}>
                <DNAWeaveSVG />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, width: "100%", zIndex: 10, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: 100 }}>
              <path d="M0,100 L0,62 C120,12 240,92 360,55 C480,15 600,88 720,52 C840,14 960,90 1080,54 C1200,16 1320,88 1440,54 L1440,100 Z" fill="#f4f6fa" />
            </svg>
          </div>
        </section>

        {/* BELOW HERO */}
        <div style={{ background: "#f4f6fa", position: "relative", zIndex: 5 }}>

          {/* Stop Cloning Section */}
          <section style={{ padding: "5rem 3rem", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "1.5rem" }}>Stop cloning. Start creating.</h2>
            <p style={{ fontSize: "1rem", color: "#4a5a78", lineHeight: 1.7, maxWidth: 800, margin: "0 auto 3.5rem" }}>
              Cloning is great... if you think weekends are overrated. We don't. We'll spare you the frustration and the agarose. Send us your DNA and we'll give you that plasmid you've been chasing, so you can finally take Saturday off.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {[
                {
                  title: "Synthetic Inserts",
                  icon: <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block", margin: "0 auto 1rem" }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#d4dae8" strokeWidth="6"/>
                    <path d="M 40 8 A 32 32 0 0 1 72 40" fill="none" stroke="#d94f2b" strokeWidth="6" strokeLinecap="round"/>
                  </svg>,
                  link: "/services/synthetic-dna-cloning",
                },
                {
                  title: "Multi-Insert Cloning",
                  icon: <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block", margin: "0 auto 1rem" }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#d4dae8" strokeWidth="6"/>
                    <path d="M 40 8 A 32 32 0 0 1 72 40" fill="none" stroke="#d94f2b" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M 72 40 A 32 32 0 0 1 40 72" fill="none" stroke="#5b7fb5" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M 40 72 A 32 32 0 0 1 8 40" fill="none" stroke="#1a7a4a" strokeWidth="6" strokeLinecap="round"/>
                  </svg>,
                  link: "/services/multi-insert-cloning",
                },
                {
                  title: "Build New Plasmid Backbones",
                  icon: <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block", margin: "0 auto 1rem" }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#d4dae8" strokeWidth="6"/>
                    <path d="M 40 8 A 32 32 0 0 1 72 40" fill="none" stroke="#1d3461" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M 72 40 A 32 32 0 0 1 40 72" fill="none" stroke="#5b7fb5" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M 40 72 A 32 32 0 0 1 8 40" fill="none" stroke="#d94f2b" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M 8 40 A 32 32 0 0 1 40 8" fill="none" stroke="#f1c40f" strokeWidth="6" strokeLinecap="round"/>
                  </svg>,
                  link: "/services/custom-backbone-construction",
                },
                {
                  title: "Multi-Site Mutagenesis",
                  icon: <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block", margin: "0 auto 1rem" }}>
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#d4dae8" strokeWidth="6"/>
                    <path d="M 40 8 l 2.5 7.5 l 7.5 0 l -6 4.5 l 2.5 7.5 l -6.5 -4.5 l -6.5 4.5 l 2.5 -7.5 l -6 -4.5 l 7.5 0 Z" fill="#d94f2b"/>
                    <path d="M 72 40 l 2.5 7.5 l 7.5 0 l -6 4.5 l 2.5 7.5 l -6.5 -4.5 l -6.5 4.5 l 2.5 -7.5 l -6 -4.5 l 7.5 0 Z" fill="#5b7fb5"/>
                    <path d="M 16 60 l 2.5 7.5 l 7.5 0 l -6 4.5 l 2.5 7.5 l -6.5 -4.5 l -6.5 4.5 l 2.5 -7.5 l -6 -4.5 l 7.5 0 Z" fill="#1a7a4a"/>
                  </svg>,
                  link: "/services/multi-site-mutagenesis",
                },
              ].map(item => (
                  <div key={item.title} className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem 1.5rem", textAlign: "center", transition: "all 0.2s" }}>
                    {item.icon}
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a2236", marginBottom: "0.5rem" }}>{item.title}</h3>
                    <a href={item.link} style={{ color: "#5b7fb5", fontSize: "0.8rem", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.15s" }}
                       onMouseEnter={e => e.currentTarget.style.borderBottomColor = "#5b7fb5"}
                       onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}
                    >Learn more →</a>
                  </div>
              ))}
            </div>
          </section>

          {/* Workflow */}
          <section style={{ background: "#fff", padding: "5rem 3rem", borderTop: "1px solid #d4dae8", borderBottom: "1px solid #d4dae8" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5b7fb5", marginBottom: "0.75rem", textAlign: "center" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "3.5rem", textAlign: "center" }}>Your new cloning workflow.</h2>
              
              <div style={{ position: "relative", padding: "2rem 0" }}>
                {/* Serpentine Path SVG */}
                <svg viewBox="0 0 400 600" style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: "100%", height: "600px", pointerEvents: "none", zIndex: 0 }} preserveAspectRatio="none">
                  <path d="M 200 0 Q 350 100 350 200 Q 350 300 200 300 Q 50 300 50 400 Q 50 500 200 500 Q 350 500 350 600" fill="none" stroke="#d4dae8" strokeWidth="8" strokeLinecap="round"/>
                </svg>

                {/* Steps */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Step 1: Place your Order - Icon Right, Text Left */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8rem", padding: "0 2rem" }}>
                    <div style={{ flex: 1, paddingRight: "3rem", textAlign: "right" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1d3461", marginBottom: "0.5rem" }}>Place your Order</h3>
                      <p style={{ fontSize: "0.9rem", color: "#4a5a78", lineHeight: 1.6 }}>Upload your plasmid design online. Pay with a credit card or PO and get your submission instructions.</p>
                    </div>
                    <div style={{ flex: 0, paddingLeft: "3rem" }}>
                      <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block" }}>
                        {/* Monitor outline */}
                        <rect x="10" y="15" width="60" height="40" rx="3" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <rect x="30" y="55" width="20" height="5" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <rect x="25" y="60" width="30" height="3" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        {/* Colorful circular loading graphic */}
                        <circle cx="40" cy="35" r="12" fill="none" stroke="#d94f2b" strokeWidth="2" strokeDasharray="4,2"/>
                        <circle cx="40" cy="35" r="8" fill="none" stroke="#5b7fb5" strokeWidth="2" strokeDasharray="3,2"/>
                        <circle cx="40" cy="35" r="4" fill="#1a7a4a"/>
                      </svg>
                    </div>
                  </div>

                  {/* Step 2: Prepare samples - Icon Left, Text Right */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8rem", padding: "0 2rem" }}>
                    <div style={{ flex: 0, paddingRight: "3rem" }}>
                      <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block" }}>
                        {/* Test tube rack outline */}
                        <rect x="15" y="20" width="50" height="45" rx="2" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <line x1="15" y1="35" x2="65" y2="35" stroke="#1d3461" strokeWidth="2"/>
                        {/* 8 test tubes */}
                        {[1,2,3,4,5,6,7,8].map((i) => (
                          <g key={i}>
                            <rect x={18 + (i-1) * 6} y="22" width="4" height="12" rx="1" stroke="#1d3461" strokeWidth="1.5" fill="none"/>
                            <circle cx={20 + (i-1) * 6} cy="18" r="2" fill="#1d3461"/>
                          </g>
                        ))}
                      </svg>
                    </div>
                    <div style={{ flex: 1, paddingLeft: "3rem", textAlign: "left" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1d3461", marginBottom: "0.5rem" }}>Prepare samples</h3>
                      <p style={{ fontSize: "0.9rem", color: "#4a5a78", lineHeight: 1.6 }}>Prepare your DNA fragments for submission.</p>
                    </div>
                  </div>

                  {/* Step 3: Submit your samples - Icon Right, Text Left */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8rem", padding: "0 2rem" }}>
                    <div style={{ flex: 1, paddingRight: "3rem", textAlign: "right" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1d3461", marginBottom: "0.5rem" }}>Submit your samples</h3>
                      <p style={{ fontSize: "0.9rem", color: "#4a5a78", lineHeight: 1.6 }}>Place your samples in a dropbox or mail them to us.</p>
                    </div>
                    <div style={{ flex: 0, paddingLeft: "3rem" }}>
                      <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block" }}>
                        {/* 3D cardboard box outline */}
                        <rect x="20" y="25" width="40" height="35" rx="2" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <line x1="20" y1="35" x2="60" y2="35" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="40" y1="25" x2="40" y2="60" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="20" y1="25" x2="30" y2="15" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="60" y1="25" x2="70" y2="15" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="30" y1="15" x2="70" y2="15" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="30" y1="15" x2="30" y2="35" stroke="#1d3461" strokeWidth="2"/>
                        <line x1="70" y1="15" x2="70" y2="35" stroke="#1d3461" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>

                  {/* Step 4: Receive your plasmid - Icon Left, Text Right */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
                    <div style={{ flex: 0, paddingRight: "3rem" }}>
                      <svg viewBox="0 0 80 80" fill="none" style={{ width: 80, height: 80, display: "block" }}>
                        {/* Monitor outline */}
                        <rect x="10" y="15" width="60" height="40" rx="3" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <rect x="30" y="55" width="20" height="5" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        <rect x="25" y="60" width="30" height="3" stroke="#1d3461" strokeWidth="2" fill="none"/>
                        {/* Sequence readout lines */}
                        <line x1="15" y1="25" x2="65" y2="25" stroke="#1d3461" strokeWidth="1"/>
                        <line x1="15" y1="30" x2="55" y2="30" stroke="#1d3461" strokeWidth="1"/>
                        <line x1="15" y1="35" x2="60" y2="35" stroke="#1d3461" strokeWidth="1"/>
                        <line x1="15" y1="40" x2="50" y2="40" stroke="#1d3461" strokeWidth="1"/>
                        <line x1="15" y1="45" x2="58" y2="45" stroke="#1d3461" strokeWidth="1"/>
                        {/* Colorful plasmid ring */}
                        <circle cx="65" cy="50" r="8" fill="none" stroke="#d94f2b" strokeWidth="2"/>
                        <circle cx="65" cy="50" r="5" fill="none" stroke="#5b7fb5" strokeWidth="2"/>
                        <circle cx="65" cy="50" r="2" fill="#1a7a4a"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, paddingLeft: "3rem", textAlign: "left" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1d3461", marginBottom: "0.5rem" }}>Receive your plasmid</h3>
                      <p style={{ fontSize: "0.9rem", color: "#4a5a78", lineHeight: 1.6 }}>We'll send you your plasmid and its verified sequence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Value Props */}
          <section style={{ background: "#f4f6fa", padding: "5rem 3rem", borderTop: "1px solid #d4dae8", borderBottom: "1px solid #d4dae8" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5b7fb5", marginBottom: "0.75rem" }}>Why VectorWeave?</p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "3.5rem" }}>Science, not cloning.</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                {[
                  {
                    title: "Save Time",
                    body: "Spend your time on experiments that matter, not cloning. Just send us your design and DNA.",
                    icon: <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44, display: "block", margin: "0 auto 1.25rem" }}>
                      <circle cx="22" cy="22" r="20" stroke="#d4dae8" strokeWidth="1.5"/>
                      <circle cx="22" cy="22" r="15" fill="none" stroke="#1d3461" strokeWidth="2"/>
                      <line x1="22" y1="22" x2="22" y2="10" stroke="#1d3461" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="22" y1="22" x2="30" y2="26" stroke="#5b7fb5" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="22" cy="22" r="2" fill="#d94f2b"/>
                    </svg>,
                  },
                  {
                    title: "Save Money",
                    body: "Stop burning money on costly reagents and do-overs. One order, one price: no kits, no repeats, no surprises.",
                    icon: <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44, display: "block", margin: "0 auto 1.25rem" }}>
                      <circle cx="22" cy="22" r="20" stroke="#d4dae8" strokeWidth="1.5"/>
                      <text x="22" y="30" textAnchor="middle" fontFamily="DM Sans" fontWeight="700" fontSize="22" fill="#1d3461">$</text>
                    </svg>,
                  },
                  {
                    title: "Do Better Science",
                    body: "Build the complex plasmids you've only dreamed about. If you can design it, we can make it real.",
                    icon: <svg viewBox="0 0 44 44" fill="none" style={{ width: 44, height: 44, display: "block", margin: "0 auto 1.25rem" }}>
                      <circle cx="22" cy="8" r="5" fill="none" stroke="#5b7fb5" strokeWidth="2"/>
                      <circle cx="8" cy="30" r="5" fill="none" stroke="#d94f2b" strokeWidth="2"/>
                      <circle cx="36" cy="30" r="5" fill="none" stroke="#1a7a4a" strokeWidth="2"/>
                      <line x1="22" y1="13" x2="22" y2="38" stroke="#1d3461" strokeWidth="1.5" strokeDasharray="2,2"/>
                      <line x1="13" y1="30" x2="31" y2="30" stroke="#1d3461" strokeWidth="1.5"/>
                    </svg>,
                  },
                ].map(v => (
                    <div key={v.title} className="value-card" style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 14, padding: "2rem", textAlign: "center", transition: "all 0.2s" }}>
                      {v.icon}
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1a2236", marginBottom: "0.5rem" }}>{v.title}</h3>
                      <p style={{ fontSize: "0.875rem", color: "#4a5a78", lineHeight: 1.65 }}>{v.body}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section style={{ background: "#fff", padding: "5rem 3rem", borderTop: "1px solid #d4dae8", borderBottom: "1px solid #d4dae8" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5b7fb5", marginBottom: "0.75rem", textAlign: "center" }}>How We Compare</p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.6rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "3.5rem", textAlign: "center" }}>The better choice is clear.</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                <tr>
                  <th style={{ padding: "1rem 1.5rem 1rem 0", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a8ca8", borderBottom: "2px solid #d4dae8" }}>Feature</th>
                  <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1d3461", borderBottom: "2px solid #d4dae8", background: "rgba(29,52,97,0.04)", borderRadius: "8px 8px 0 0" }}>VectorWeave</th>
                  <th style={{ padding: "1rem 1rem 1rem 1.5rem", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a8ca8", borderBottom: "2px solid #d4dae8" }}>DNA Synthesis Vendors</th>
                  <th style={{ padding: "1rem 0 1rem 1rem", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a8ca8", borderBottom: "2px solid #d4dae8" }}>DIY Cloning</th>
                </tr>
                </thead>
                <tbody>
                {COMPARE_ROWS.map(r => (
                    <tr key={r.feat}>
                      <td style={{ padding: "1rem 1.5rem 1rem 0", borderBottom: "1px solid #d4dae8", color: "#1a2236", fontWeight: 500, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", verticalAlign: "top" }}>{r.feat}</td>
                      <td style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #d4dae8", color: "#1a2236", fontWeight: 500, background: "rgba(29,52,97,0.03)", verticalAlign: "top" }}>{r.us}</td>
                      <td style={{ padding: "1rem 1rem 1rem 1.5rem", borderBottom: "1px solid #d4dae8", color: "#4a5a78", verticalAlign: "top" }}>{r.vendors}</td>
                      <td style={{ padding: "1rem 0 1rem 1rem", borderBottom: "1px solid #d4dae8", color: "#4a5a78", verticalAlign: "top" }}>{r.diy}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer CTA */}
          <div style={{ padding: "6rem 3rem", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: "2.8rem", letterSpacing: "-0.03em", color: "#1d3461", marginBottom: "1rem", lineHeight: 1.1 }}>
              Ready to clone<br /><span style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontWeight: 400 }}>anything?</span>
            </h2>
            <p style={{ color: "#4a5a78", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Join hundreds of researchers who've stopped wasting weekends in the lab. Send us your design and let VectorWeave handle the rest.
            </p>
            <a href="/order" style={{ background: "#d94f2b", color: "#fff", border: "none", padding: "0.85rem 2.2rem", borderRadius: 8, fontSize: "1rem", fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "all 0.18s" }}
               onMouseEnter={e => { e.currentTarget.style.background = "#b84020"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(217,79,43,0.3)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "#d94f2b"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >Start Cloning Today</a>
          </div>
        </div>

        <Footer />
      </>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";

interface DropdownItem { label: string; to: string; }
interface NavItem { label: string; to?: string; dropdown?: DropdownItem[]; }

const NAV: NavItem[] = [
  { label: "Services", to: "/services", dropdown: [
      { label: "Single & Multi-Insert Cloning", to: "/services/multi-insert-cloning" },
      { label: "Custom Backbone Construction", to: "/services/custom-backbone-construction" },
      { label: "Multi-Site & Codon Mutagenesis", to: "/services/multi-site-mutagenesis" },
      { label: "Domain Mutagenesis", to: "/services/domain-mutagenesis" },
      { label: "Synthetic DNA Cloning", to: "/services/synthetic-dna-cloning" },
    ]},
  { label: "How-to", dropdown: [
      { label: "Submit Orders", to: "/how-to/submit-orders" },
      { label: "Submit Samples", to: "/how-to/submit-samples" },
      { label: "Start Dropbox", to: "/how-to/start-dropbox" },
      { label: "Cancel Order", to: "/how-to/cancel-order" },
    ]},
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

import logoSrc from "../assets/VectorWeave-final2-b.png";

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  if (!item.dropdown) {
    return (
        <Link to={item.to ?? "#"}
           style={{ color: "#4b5563", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }}
           onMouseEnter={e => e.currentTarget.style.color = "#111827"}
           onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
        >{item.label}</Link>
    );
  }
  return (
      <div style={{ position: "relative" }}
           onMouseEnter={() => setOpen(true)}
           onMouseLeave={() => setOpen(false)}
      >
        <Link to={item.to ?? "#"} style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#4b5563", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }}
           onMouseEnter={e => e.currentTarget.style.color = "#111827"}
           onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
        >
          {item.label} <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>▾</span>
        </Link>
        {open && (
            <div style={{ position: "absolute", top: "100%", left: 0, paddingTop: "0.75rem", zIndex: 50, minWidth: "15rem" }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.5rem 0", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                {item.dropdown.map(d => (
                    <Link key={d.label} to={d.to} style={{ display: "block", padding: "0.625rem 1.25rem", fontSize: "0.875rem", color: "#4b5563", textDecoration: "none", transition: "all 0.15s" }}
                       onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.color = "#111827"; }}
                       onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; }}
                    >
                      {d.label}
                    </Link>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}

export default function Header() {
  return (
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: "60px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e5e7eb" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} alt="VectorWeave" style={{ height: "3rem", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV.map(item => <NavDropdown key={item.label} item={item} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link to="/auth" style={{ padding: "0.375rem 1rem", border: "1px solid #d1d5db", color: "#4b5563", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
             onMouseEnter={e => { e.currentTarget.style.borderColor = "#111827"; e.currentTarget.style.color = "#111827"; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.color = "#4b5563"; }}
          >Sign In</Link>
          <Link to="/order" style={{ padding: "0.375rem 1rem", background: "#111827", color: "#fff", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
             onMouseEnter={e => e.currentTarget.style.background = "#374151"}
             onMouseLeave={e => e.currentTarget.style.background = "#111827"}
          >Order Now</Link>
        </div>
      </nav>
  );
}
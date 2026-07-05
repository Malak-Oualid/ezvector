import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Package, User as UserIcon, LogOut, ShoppingBag, ShoppingCart } from "lucide-react";
import { isAuthenticated, logout, getUser } from "@/lib/auth";
import { useCart } from "@/context/CartContext";
import logoSrc from "../assets/VectorWeave-final2-b.png";

// ─── Nav config ────────────────────────────────────────────────────────────────

interface DropdownItem { label: string; to: string; }
interface NavItem { label: string; to?: string; dropdown?: DropdownItem[]; }

const NAV: NavItem[] = [
  {
    label: "Services", to: "/services", dropdown: [
      { label: "Single & Multi-Insert Cloning", to: "#" },
      { label: "Custom Backbone Construction", to: "#" },
      { label: "Multi-Site & Codon Mutagenesis", to: "#" },
      { label: "Domain Mutagenesis", to: "#" },
      { label: "Synthetic DNA Cloning", to: "#" },
    ]
  },
  {
    label: "How-to", dropdown: [
      { label: "Submit Orders", to: "#" },
      { label: "Submit Samples", to: "#" },
      { label: "Start a Dropbox", to: "#" },
      { label: "Cancel an Order", to: "#" },
    ]
  },
  { label: "FAQ", to: "#" },
  { label: "Contact Us", to: "#" },
];

// ─── Shared styles ─────────────────────────────────────────────────────────────

const navLinkStyle: React.CSSProperties = {
  color: "#4a5a78", textDecoration: "none", fontSize: "0.875rem",
  fontWeight: 500, transition: "color 0.15s",
};

const dropdownItemStyle: React.CSSProperties = {
  display: "block", padding: "0.6rem 1.25rem", fontSize: "0.84rem",
  color: "#4a5a78", textDecoration: "none", transition: "background 0.12s, color 0.12s",
};

const userMenuItemStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "0.6rem",
  width: "100%", padding: "0.6rem 1rem", fontSize: "0.84rem",
  color: "#4a5a78", background: "none", border: "none",
  cursor: "pointer", textAlign: "left", transition: "background 0.12s, color 0.12s",
  borderRadius: 6,
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.dropdown) {
    return (
      <Link
        to={item.to ?? "#"}
        style={navLinkStyle}
        onMouseEnter={e => (e.currentTarget.style.color = "#1d3461")}
        onMouseLeave={e => (e.currentTarget.style.color = "#4a5a78")}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.to ?? "#"}
        style={{ ...navLinkStyle, display: "flex", alignItems: "center", gap: 4 }}
      >
        {item.label} <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>▾</span>
      </Link>

      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, paddingTop: 12, zIndex: 50, minWidth: 240 }}>
          <div style={{ background: "#fff", border: "1px solid #d4dae8", borderRadius: 10, padding: "0.5rem 0", boxShadow: "0 8px 32px rgba(29,52,97,0.12)" }}>
            {item.dropdown.map(d => (
              <Link
                key={d.label}
                to={d.to}
                style={dropdownItemStyle}
                onMouseEnter={e => { e.currentTarget.style.background = "#eef1f7"; e.currentTarget.style.color = "#1d3461"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#4a5a78"; }}
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

// ─── User menu (logged-in state) ───────────────────────────────────────────────

interface UserMenuProps {
  userEmail: string;
  cartCount: number;
  onLogout: () => void;
}

function UserMenu({ userEmail, cartCount, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuLinks = [
    { label: "Dashboard",  to: "/profile",  icon: <Package className="w-4 h-4" /> },
    { label: "Orders",     to: "/orders",   icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Profile",    to: "/account",  icon: <UserIcon className="w-4 h-4" /> },
  ];

  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : "??";

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* Avatar trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "none", border: "1.5px solid #d4dae8", borderRadius: 8,
          padding: "0.3rem 0.75rem", cursor: "pointer", transition: "all 0.15s",
          color: "#4a5a78", fontSize: "0.83rem", fontWeight: 500,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d3461"; e.currentTarget.style.color = "#1d3461"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4dae8"; e.currentTarget.style.color = "#4a5a78"; }}
        aria-label="User menu"
        aria-expanded={open}
      >
        {/* Avatar circle */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#1d3461", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
        }}>
          {initials}
        </div>
        <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {userEmail}
        </span>
        <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>▾</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          minWidth: 220, zIndex: 300,
          background: "#fff", border: "1px solid #d4dae8",
          borderRadius: 12, padding: "0.5rem",
          boxShadow: "0 8px 32px rgba(29,52,97,0.14)",
        }}>
          {/* Nav links */}
          {menuLinks.map(link => (
            <button
              key={link.to}
              onClick={() => { navigate(link.to); setOpen(false); }}
              style={{
                ...userMenuItemStyle,
                background: location.pathname === link.to ? "#eef1f7" : "none",
                color: location.pathname === link.to ? "#1d3461" : "#4a5a78",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eef1f7"; e.currentTarget.style.color = "#1d3461"; }}
              onMouseLeave={e => {
                e.currentTarget.style.background = location.pathname === link.to ? "#eef1f7" : "none";
                e.currentTarget.style.color = location.pathname === link.to ? "#1d3461" : "#4a5a78";
              }}
            >
              {link.icon}
              {link.label}
            </button>
          ))}

          {/* Cart with badge */}
          <button
            onClick={() => { navigate("/cart"); setOpen(false); }}
            style={{
              ...userMenuItemStyle,
              background: location.pathname === "/cart" ? "#eef1f7" : "none",
              color: location.pathname === "/cart" ? "#1d3461" : "#4a5a78",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#eef1f7"; e.currentTarget.style.color = "#1d3461"; }}
            onMouseLeave={e => {
              e.currentTarget.style.background = location.pathname === "/cart" ? "#eef1f7" : "none";
              e.currentTarget.style.color = location.pathname === "/cart" ? "#1d3461" : "#4a5a78";
            }}
          >
            <div style={{ position: "relative" }}>
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6,
                  background: "#ef4444", color: "#fff",
                  fontSize: "0.6rem", fontWeight: 700,
                  borderRadius: "50%", width: 14, height: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            Cart
            {cartCount > 0 && (
              <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#6b7280" }}>
                ({cartCount})
              </span>
            )}
          </button>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "0.4rem 0" }} />

          {/* Log out */}
          <button
            onClick={() => { onLogout(); setOpen(false); }}
            style={{ ...userMenuItemStyle, color: "#dc2626" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Header ───────────────────────────────────────────────────────────────

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setLoggedIn(authenticated);
      if (authenticated) {
        const user = await getUser();
        setUserEmail(user?.email ?? "");
      }
    };
    checkAuth();
  }, [location.pathname]); // Re-check on navigation so login/logout updates instantly

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    setUserEmail("");
    navigate("/");
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: 60,
      background: "rgba(244,246,250,0.88)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(212,218,232,0.6)",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={logoSrc} alt="VectorWeave" style={{ height: 47, width: "auto" }} />
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV.map(item => <NavDropdown key={item.label} item={item} />)}
      </div>

      {/* Right side — auth-aware */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {loggedIn ? (
          <UserMenu
            userEmail={userEmail}
            cartCount={cartCount}
            onLogout={handleLogout}
          />
        ) : (
          <button
            onClick={() => navigate("/auth", { state: { from: location.pathname } })}
            style={{
              background: "none", border: "1.5px solid #d4dae8", color: "#4a5a78",
              padding: "0.4rem 1.1rem", borderRadius: 7, fontSize: "0.83rem",
              fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d3461"; e.currentTarget.style.color = "#1d3461"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4dae8"; e.currentTarget.style.color = "#4a5a78"; }}
          >
            Sign In
          </button>
        )}

        <Link
          to="/order"
          style={{
            background: "#1d3461", color: "#fff", padding: "0.45rem 1.25rem",
            borderRadius: 7, fontSize: "0.83rem", fontWeight: 600,
            textDecoration: "none", transition: "all 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#3a5a99")}
          onMouseLeave={e => (e.currentTarget.style.background = "#1d3461")}
        >
          Order Now
        </Link>
      </div>
    </nav>
  );
}
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Resume from "./pages/Resume.jsx";
import Contact from "./pages/Contact.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#00bcd4" : "#90a4ae",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.05em",
    padding: "6px 14px",
    borderRadius: "8px",
    background: isActive ? "rgba(0,188,212,0.1)" : "transparent",
    border: isActive ? "1px solid rgba(0,188,212,0.3)" : "1px solid transparent",
    transition: "all 0.3s",
  });

  const mobileLinkStyle = ({ isActive }) => ({
    color: isActive ? "#00bcd4" : "#90a4ae",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
    padding: "12px 20px",
    borderRadius: "10px",
    background: isActive ? "rgba(0,188,212,0.1)" : "transparent",
    border: isActive ? "1px solid rgba(0,188,212,0.3)" : "1px solid transparent",
    transition: "all 0.3s",
    display: "block",
  });

  return (
    <>
      <style>{`
        .nav-link:hover { color: #00bcd4 !important; background: rgba(0,188,212,0.07) !important; }
        .hamburger:hover { background: rgba(0,188,212,0.1) !important; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(6,11,15,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,188,212,0.12)",
        padding: "0 24px",
        height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontWeight: 800, fontSize: "18px",
            background: "linear-gradient(90deg,#00bcd4,#26a69a)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
          }}>SC</span>
        </NavLink>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }} className="desktop-nav">
          {[
            { to: "/", label: "About" },
            { to: "/skills", label: "Skills" },
            { to: "/projects", label: "Projects" },
            { to: "/resume", label: "Resume" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} style={linkStyle} className="nav-link">
              {label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none",
            background: "transparent", border: "1px solid rgba(0,188,212,0.3)",
            borderRadius: "8px", padding: "6px 10px", cursor: "pointer",
            color: "#00bcd4", fontSize: "20px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999,
          background: "rgba(6,11,15,0.97)",
          borderBottom: "1px solid rgba(0,188,212,0.12)",
          padding: "12px 16px",
          display: "flex", flexDirection: "column", gap: "6px",
        }}>
          {[
            { to: "/", label: "About" },
            { to: "/skills", label: "Skills" },
            { to: "/projects", label: "Projects" },
            { to: "/resume", label: "Resume" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
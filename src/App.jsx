import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Resume from "./pages/Resume.jsx";
import Contact from "./pages/Contact.jsx";

function Navbar() {
  const links = [
    { to: "/", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        background: "rgba(6,11,15,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,188,212,0.2)",
        zIndex: 1000,
      }}
    >
      <div style={{ color: "#00bcd4", fontWeight: 700 }}>
        Subhajit
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            style={({ isActive }) => ({
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              color: isActive ? "#00bcd4" : "#90a4ae",
              border: isActive
                ? "1px solid #00bcd4"
                : "1px solid transparent",
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "#060b0f",
          color: "#fff",
          paddingTop: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
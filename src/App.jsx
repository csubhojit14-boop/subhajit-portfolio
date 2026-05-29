import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

function Navbar() {
  const links = [
    { to: "/", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(6,11,15,0.88)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(0,188,212,0.12)", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ width:40, height:40, borderRadius:"10px", background:"linear-gradient(135deg,#00bcd4,#26a69a)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"16px", color:"#060b0f" }}>SC</div>
        <div>
          <div style={{ fontWeight:700, fontSize:"15px", color:"#e0f7fa" }}>Subhajit Chakraborty</div>
          <div style={{ fontSize:"11px", color:"#00bcd4" }}>Web Developer</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:"4px" }}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to==="/"} style={({ isActive }) => ({
            padding:"8px 16px", borderRadius:"8px",
            background: isActive ? "rgba(0,188,212,0.15)" : "transparent",
            color: isActive ? "#00bcd4" : "#90a4ae",
            border: isActive ? "1px solid rgba(0,188,212,0.3)" : "1px solid transparent",
            textDecoration:"none", fontSize:"14px", fontWeight: isActive ? 600 : 400,
            transition:"all 0.2s",
          })}>
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
      <div style={{ fontFamily:"'Sora','Segoe UI',sans-serif", background:"#060b0f", minHeight:"100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
          * { margin:0; padding:0; box-sizing:border-box; }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
          @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.5);opacity:0} }
          @keyframes particle-float { 0%,100%{transform:translateY(0);opacity:0} 10%{opacity:0.8} 90%{opacity:0.8} 100%{transform:translateY(-120px);opacity:0} }
          @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
          @keyframes glow-pulse { 0%,100%{box-shadow:0 0 30px rgba(0,188,212,0.3)} 50%{box-shadow:0 0 70px rgba(0,188,212,0.7)} }
        `}</style>
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
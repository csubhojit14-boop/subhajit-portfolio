import { useState, useEffect } from "react";
import myPhoto from '../assets/profile.jpg';

export default function About() {
  const [typedText, setTypedText] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const roles = ["Web Developer", "Python Developer", "Frontend Developer", "Problem Solver"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 35 : 75;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTypedText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
        else setCharIdx(c => c + 1);
      } else {
        setTypedText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setCharIdx(0); setRoleIdx(i => (i + 1) % roles.length); }
        else setCharIdx(c => c - 1);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    setParticles(Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random() * 100, size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 5, delay: Math.random() * 5,
      color: i % 3 === 0 ? "255,87,34" : i % 3 === 1 ? "38,166,154" : "0,229,255"
    })));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#060b0f", color: "#e0f7fa", overflow: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-16px) rotate(1.5deg)} 66%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(1.6);opacity:0} }
        @keyframes particle-float { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-150px) translateX(15px);opacity:0} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 30px rgba(0,188,212,0.4),0 0 60px rgba(0,188,212,0.1)} 50%{box-shadow:0 0 80px rgba(0,188,212,0.8),0 0 120px rgba(0,188,212,0.3)} }
        @keyframes slide-up { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes bounce-in { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes rotate-border { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes counter { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .stat-card:hover { transform: translateY(-8px) scale(1.08) !important; border-color: rgba(0,188,212,0.5) !important; box-shadow: 0 12px 40px rgba(0,188,212,0.25) !important; }
        .btn-view:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,188,212,0.6) !important; }
        .btn-contact:hover { background: rgba(0,188,212,0.12) !important; transform: translateY(-4px) !important; border-color: rgba(0,188,212,0.7) !important; }
      `}</style>

      {/* Animated background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 90% 70% at ${50 + mousePos.x * 15}% ${20 + mousePos.y * 15}%, rgba(0,188,212,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at ${80 - mousePos.x * 10}% ${80 - mousePos.y * 10}%, rgba(38,166,154,0.06) 0%, transparent 60%)`,
        transition: "background 0.4s ease"
      }} />

      {/* Grid pattern */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(0,188,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 1,
          background: `rgba(${p.color},0.6)`,
          left: `${p.x}%`, bottom: 0, width: p.size, height: p.size,
          animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
          boxShadow: `0 0 ${p.size * 2}px rgba(${p.color},0.4)`,
        }} />
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "80px 24px 60px" }}>

        {/* Avatar with rotating border */}
        <div style={{ position: "relative", marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(0.5)",
          transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "2px solid rgba(0,188,212,0.5)", animation: "pulse-ring 2.5s ease-out infinite" }} />
          <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "2px solid rgba(0,188,212,0.3)", animation: "pulse-ring 2.5s ease-out infinite 1.2s" }} />
          <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "2px solid rgba(0,188,212,0.15)", animation: "pulse-ring 2.5s ease-out infinite 2.4s" }} />
          {/* Rotating dashed ring */}
          <div style={{ position: "absolute", width: 175, height: 175, borderRadius: "50%", border: "2px dashed rgba(0,188,212,0.3)", animation: "rotate-border 8s linear infinite" }} />
          <img src={myPhoto} alt="Subhajit" style={{
            width: 158, height: 158, borderRadius: "50%",
            border: "3px solid #ff8a65", objectFit: "cover",
            animation: "float 5s ease-in-out infinite, glow-pulse 3s ease-in-out infinite",
            position: "relative", zIndex: 2,
          }} />
        </div>

        {/* Name */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease 0.2s" }}>
          <h1 style={{ fontSize: "clamp(26px,5.5vw,56px)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.1 }}>
            I'm{" "}
            <span style={{
              background: "linear-gradient(90deg,#00bcd4,#26a69a,#ffccbc,#00bcd4)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite",
              textTransform: "uppercase", letterSpacing: "2px",
            }}>
              Subhajit Chakraborty
            </span>
          </h1>
        </div>

        {/* Typing */}
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.4s" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,188,212,0.08)", border: "1px solid rgba(0,188,212,0.2)",
            borderRadius: "30px", padding: "8px 20px", marginBottom: "24px",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00bcd4", display: "inline-block", boxShadow: "0 0 8px #00bcd4", animation: "blink 1.5s infinite" }} />
            <span style={{ fontSize: "clamp(15px,2.5vw,22px)", color: "#00bcd4", fontWeight: 600, minWidth: "180px", textAlign: "left" }}>
              {typedText}
              <span style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#00bcd4", marginLeft: "2px", animation: "blink 1s infinite", verticalAlign: "text-bottom" }} />
            </span>
          </div>
        </div>

        {/* Bio */}
        <p style={{
          maxWidth: "560px", color: "#90a4ae", lineHeight: 1.8, fontSize: "16px", marginBottom: "40px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.5s",
        }}>
          Motivated web developer based in <span style={{ color: "#00bcd4" }}>Purba Burdwan, West Bengal</span>. I love building real-world solutions with clean code using <span style={{ color: "#00bcd4" }}>HTML, CSS, JavaScript</span> and <span style={{ color: "#00bcd4" }}>Python</span>.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "56px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.6s",
        }}>
          <a href="/projects" className="btn-view" style={{
            padding: "14px 32px", background: "linear-gradient(135deg,#00bcd4,#26a69a)",
            color: "#060b0f", borderRadius: "12px", fontWeight: 700, fontSize: "15px",
            textDecoration: "none", boxShadow: "0 4px 20px rgba(0,188,212,0.35)",
            transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "8px",
          }}>View Projects 🚀</a>
          <a href="/contact" className="btn-contact" style={{
            padding: "14px 32px", background: "transparent", color: "#00bcd4",
            borderRadius: "12px", fontWeight: 600, fontSize: "15px",
            textDecoration: "none", border: "1px solid rgba(0,188,212,0.4)",
            transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "8px",
          }}>Contact Me ✉️</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.7s",
        }}>
          {[["2+","Projects","📁"],["Web","Developer","💻"],["2023","Started","🚀"],["Diploma","CSE","🎓"]].map(([n,l,icon]) => (
            <div key={l} className="stat-card" style={{
              background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.15)",
              borderRadius: "16px", padding: "20px 28px", textAlign: "center",
              transition: "all 0.3s", cursor: "default",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#00bcd4" }}>{n}</div>
              <div style={{ fontSize: "12px", color: "#546e7a", marginTop: "4px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.5 }}>
          <div style={{ fontSize: "12px", color: "#546e7a", letterSpacing: "0.1em" }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg,rgba(0,188,212,0.8),transparent)" }} />
        </div>
      </div>
    </div>
  );
}
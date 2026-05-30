import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const PROJECTS = [
  {
    title: "Library Management System",
    period: "2025",
    desc: "A full-stack Library Management System to manage books, members, and issue/return records with admin dashboard and search functionality.",
    tags: ["HTML", "CSS", "JavaScript", "Python"],
    emoji: "📚",
    gradient: "linear-gradient(135deg, #00bcd4, #26a69a)",
    glow: "rgba(0,188,212,0.3)",
  },
  {
    title: "Weather App",
    period: "2025",
    desc: "A real-time weather application that displays current temperature, humidity, wind speed and weather forecast for any city worldwide using OpenWeather API.",
    tags: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    emoji: "🌤️",
    gradient: "linear-gradient(135deg, #26a69a, #00bcd4)",
    glow: "rgba(38,166,154,0.3)",
  },
];

function ProjectCard({ p, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(0,188,212,0.5)" : "rgba(0,188,212,0.15)"}`,
        borderRadius: "24px", overflow: "hidden", marginBottom: "32px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${60 + index * 20}px)`,
        transition: `all 0.7s ease ${index * 150}ms`,
        boxShadow: hovered ? `0 24px 60px ${p.glow}` : "none",
      }}>

      {/* Top gradient bar */}
      <div style={{ height: "4px", background: p.gradient }} />

      <div style={{ padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "20px" }}>
          {/* Emoji box */}
          <div style={{
            width: 64, height: 64, borderRadius: "16px",
            background: `${p.glow.replace("0.3", "0.15")}`,
            border: `1px solid ${p.glow.replace("0.3", "0.4")}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "32px", flexShrink: 0,
            transform: hovered ? "rotate(10deg) scale(1.1)" : "rotate(0deg) scale(1)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: hovered ? `0 8px 24px ${p.glow}` : "none",
          }}>
            {p.emoji}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#546e7a", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: "20px" }}>{p.period}</span>
              <span style={{ fontSize: "12px", color: "#00bcd4", background: "rgba(0,188,212,0.1)", padding: "3px 10px", borderRadius: "20px" }}>✅ Completed</span>
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#e0f7fa", display: "flex", alignItems: "center", gap: "8px" }}>
              {p.title}
              <span style={{ fontSize: "16px", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)", transition: "all 0.3s", color: "#00bcd4" }}>↗</span>
            </h3>
          </div>
        </div>

        <p style={{ color: "#90a4ae", lineHeight: 1.8, marginBottom: "20px", fontSize: "14px", fontFamily: "monospace" }}>{p.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {p.tags.map((t, i) => (
            <span key={t} style={{
              padding: "5px 14px", borderRadius: "20px",
              background: `rgba(0,188,212,${0.05 + i * 0.03})`,
              border: "1px solid rgba(0,188,212,0.25)",
              color: "#00bcd4", fontSize: "12px", fontWeight: 600,
              transition: "all 0.2s",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <div style={{ minHeight: "100vh", background: "#060b0f", color: "#e0f7fa", padding: "80px 24px" }}>
      <style>{`
        @keyframes float-title { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease", marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a)", borderRadius: "2px", marginBottom: "16px" }} />
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, marginBottom: "8px" }}>🚀 Projects</h2>
          <p style={{ color: "#546e7a", fontSize: "15px" }}>A collection of my major works — more coming soon!</p>
        </div>

        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}

        {/* Coming soon card */}
        <div style={{
          border: "2px dashed rgba(0,188,212,0.2)", borderRadius: "24px",
          padding: "40px", textAlign: "center",
          background: "rgba(0,188,212,0.02)",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔨</div>
          <div style={{ color: "#546e7a", fontWeight: 600 }}>More projects coming soon...</div>
          <div style={{ color: "#455a64", fontSize: "13px", marginTop: "6px" }}>Currently working on new ideas!</div>
        </div>
      </div>
    </div>
  );
}
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

const SKILLS_DATA = [
  { name: "Python", icon: "🐍", level: 75, color: "#3776ab" },
  { name: "JavaScript", icon: "⚡", level: 70, color: "#f7df1e" },
  { name: "C", icon: "🔵", level: 65, color: "#00bcd4" },
  { name: "C++", icon: "🔷", level: 60, color: "#26a69a" },
  { name: "HTML", icon: "🌐", level: 85, color: "#e34f26" },
  { name: "CSS", icon: "🎨", level: 80, color: "#1572b6" },
  { name: "MySQL", icon: "🗄️", level: 55, color: "#4479a1" },
  { name: "Git", icon: "🔀", level: 70, color: "#f05032" },
  { name: "GitHub", icon: "🐙", level: 70, color: "#ffffff" },
  { name: "VS Code", icon: "💻", level: 90, color: "#007acc" },
];

function SkillCard({ skill, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${skill.color === "#f7df1e" ? "247,223,30" : "0,188,212"},0.1)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? skill.color + "66" : "rgba(0,188,212,0.12)"}`,
        borderRadius: "16px", padding: "20px",
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition: `all 0.5s ease ${delay}ms`,
        boxShadow: hovered ? `0 8px 30px ${skill.color}33` : "none",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "12px",
          background: `${skill.color}22`,
          border: `1px solid ${skill.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px",
          transform: hovered ? "rotate(10deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "transform 0.3s",
        }}>
          {skill.icon}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#e0f7fa", fontSize: "16px" }}>{skill.name}</div>
          <div style={{ fontSize: "12px", color: "#546e7a" }}>{skill.level}%</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", height: "8px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "10px",
          background: `linear-gradient(90deg, ${skill.color}, #00bcd4)`,
          width: inView ? `${skill.level}%` : "0%",
          transition: `width 1s ease ${delay + 200}ms`,
          boxShadow: `0 0 10px ${skill.color}88`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <div style={{ minHeight: "100vh", background: "#060b0f", color: "#e0f7fa", padding: "80px 24px" }}>
      <style>{`
        @keyframes float-icon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease" }}>
          <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a)", borderRadius: "2px", marginBottom: "16px" }} />
          <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, marginBottom: "8px" }}>✨ My Skills</h2>
          <p style={{ color: "#546e7a", marginBottom: "48px" }}>Technical expertise blended with creativity — my core competencies.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "16px" }}>
          {SKILLS_DATA.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 80} />
          ))}
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <div style={{ color: "#546e7a", fontSize: "13px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tech Stack</div>
          <div>
            {SKILLS_DATA.map(s => (
              <span key={s.name} style={{
                display: "inline-block", padding: "6px 14px", borderRadius: "20px",
                border: `1px solid ${s.color}44`, color: s.color,
                fontSize: "13px", margin: "4px", fontWeight: 500,
                background: `${s.color}11`,
              }}>{s.icon} {s.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
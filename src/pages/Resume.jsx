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

function TimelineItem({ icon, title, subtitle, detail, delay, color = "#00bcd4" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", gap: "16px", marginBottom: "24px",
      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
      transition: `all 0.6s ease ${delay}ms`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${color}22`, border: `2px solid ${color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{icon}</div>
        <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg,${color}44,transparent)`, marginTop: "8px" }} />
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,188,212,0.12)", borderRadius: "14px", padding: "16px 20px", flex: 1, marginBottom: "8px" }}>
        <div style={{ fontWeight: 700, color: "#e0f7fa", fontSize: "15px", marginBottom: "4px" }}>{title}</div>
        <div style={{ color: color, fontSize: "13px", marginBottom: "4px" }}>{subtitle}</div>
        <div style={{ color: "#546e7a", fontSize: "12px" }}>{detail}</div>
      </div>
    </div>
  );
}

export default function Resume() {
  const [headerRef, headerInView] = useInView();
  const tag = { display: "inline-block", padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(0,188,212,0.3)", color: "#00bcd4", fontSize: "12px", margin: "4px", background: "rgba(0,188,212,0.08)", fontWeight: 600 };

  return (
    <div style={{ minHeight: "100vh", background: "#060b0f", color: "#e0f7fa", padding: "80px 24px" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease", marginBottom: "40px" }}>
          <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a)", borderRadius: "2px", marginBottom: "16px" }} />
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, marginBottom: "8px" }}>📄 Resume</h2>
          <p style={{ color: "#546e7a", fontSize: "15px" }}>A quick glance at my journey.</p>
        </div>

        {/* Profile card */}
        <div style={{ background: "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(38,166,154,0.05))", border: "1px solid rgba(0,188,212,0.2)", borderRadius: "20px", padding: "28px", marginBottom: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a,#00e5ff)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#00bcd4,#26a69a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>👨‍💻</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "22px", background: "linear-gradient(90deg,#00bcd4,#26a69a,#00e5ff,#00bcd4)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>SUBHAJIT CHAKRABORTY</div>
              <div style={{ color: "#90a4ae", fontSize: "14px" }}>Diploma in Computer Science | Web Developer</div>
              <div style={{ color: "#546e7a", fontSize: "13px", marginTop: "2px" }}>📍 Purba Burdwan, West Bengal, India</div>
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "16px" }}>
            <div style={{ color: "#00bcd4", fontWeight: 700, marginBottom: "8px", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>💬 Professional Summary</div>
            <p style={{ color: "#90a4ae", lineHeight: 1.8, fontSize: "14px" }}>Motivated Web Developer and Diploma CSE student passionate about building real-world applications. Skilled in Python, JavaScript, HTML, CSS, C and C++. Always committed to continuous learning and problem solving.</p>
          </div>
        </div>

        {/* Timeline sections */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ color: "#00bcd4", fontWeight: 700, fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(0,188,212,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🎓</span>
            Education
          </div>
          <TimelineItem icon="🏫" title="Diploma in Computer Science" subtitle="Sir Rajendra Nath Mukherjee Govt. Polytechnic, Basirhat" detail="2023 – 2026 (Currently Pursuing)" delay={0} />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <div style={{ color: "#00bcd4", fontWeight: 700, fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(0,188,212,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>💼</span>
            Internship
          </div>
          <TimelineItem icon="📱" title="Android App Development" subtitle="Internship" detail="Hands-on experience in Android development" delay={100} color="#26a69a" />
          <TimelineItem icon="🌐" title="Web Development" subtitle="Internship" detail="Built real-world web applications" delay={200} color="#26a69a" />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <div style={{ color: "#00bcd4", fontWeight: 700, fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(0,188,212,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🌐</span>
            Languages
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[["🗣️","Bengali","Native"],["💬","English","Proficient"],["🤝","Hindi","Conversational"]].map(([flag,lang,level]) => (
              <div key={lang} style={{ background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.15)", borderRadius: "12px", padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "4px" }}>{flag}</div>
                <div style={{ fontWeight: 700, color: "#e0f7fa", fontSize: "14px" }}>{lang}</div>
                <div style={{ color: "#546e7a", fontSize: "11px" }}>{level}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div style={{ color: "#00bcd4", fontWeight: 700, fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(0,188,212,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🛠️</span>
            Key Skills
          </div>
          <div>{["Python","JavaScript","HTML","CSS","C","C++","Git","GitHub","VS Code"].map(s => <span key={s} style={tag}>{s}</span>)}</div>

          <div style={{ marginTop:"32px", textAlign:"center" }}>
            <a href="/cv.pdf" download="Subhajit_Chakraborty_CV.pdf" style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"14px 32px", background:"linear-gradient(135deg,#00bcd4,#26a69a)", color:"#060b0f", borderRadius:"12px", fontWeight:700, fontSize:"15px", textDecoration:"none", boxShadow:"0 4px 20px rgba(0,188,212,0.3)" }}>
              📄 Download CV
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
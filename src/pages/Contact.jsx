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

export default function Contact() {
  const [headerRef, headerInView] = useInView();
  const [formRef, formInView] = useInView();
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");

  const inputStyle = (name) => ({
    width: "100%", background: focused === name ? "rgba(0,188,212,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === name ? "rgba(0,188,212,0.6)" : "rgba(0,188,212,0.15)"}`,
    borderRadius: "12px", padding: "14px 16px", color: "#e0f7fa", fontSize: "15px",
    outline: "none", boxSizing: "border-box", transition: "all 0.3s",
    boxShadow: focused === name ? "0 0 20px rgba(0,188,212,0.1)" : "none",
    fontFamily: "inherit",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#060b0f", color: "#e0f7fa", padding: "80px 24px" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .social-btn:hover { transform: translateY(-6px) scale(1.12) !important; box-shadow: 0 12px 30px rgba(0,188,212,0.4) !important; }
        .info-card:hover { border-color: rgba(0,188,212,0.4) !important; transform: translateX(6px) !important; box-shadow: 0 8px 30px rgba(0,188,212,0.1) !important; }
      `}</style>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease", marginBottom: "48px", textAlign: "center" }}>
          <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a)", borderRadius: "2px", marginBottom: "16px", margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, marginBottom: "12px" }}>📬 Contact Me</h2>
          <p style={{ color: "#546e7a", fontSize: "15px", maxWidth: "500px", margin: "0 auto" }}>I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!</p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { icon: "✉️", label: "Email", value: "csubhojit14@gmail.com", color: "#00bcd4", delay: 0 },
            { icon: "📍", label: "Location", value: "Kubajpur, Bhatar, Purba Burdwan, WB", color: "#26a69a", delay: 100 },
          ].map(({ icon, label, value, color, delay }) => (
            <div key={label} className="info-card" style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,188,212,0.12)",
              borderRadius: "16px", padding: "20px 24px",
              display: "flex", alignItems: "center", gap: "16px",
              transition: "all 0.3s", cursor: "default",
            }}>
              <div style={{ width: 50, height: 50, borderRadius: "14px", background: `${color}22`, border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, animation: "float 3s ease-in-out infinite" }}>{icon}</div>
              <div>
                <div style={{ color: "#546e7a", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{label}</div>
                <div style={{ color: label === "Email" ? color : "#e0f7fa", fontWeight: 600, fontSize: "14px" }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#546e7a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>Connect With Me</div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            {[
              { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/subhojit-chakraborty-52591b343", color: "#0077b5" },
              { icon: "✉️", label: "Email", url: "mailto:csubhojit14@gmail.com", color: "#00bcd4" },
              { icon: "📷", label: "Instagram", url: "https://www.instagram.com/subhojit.chakraborty.3994?igsh=MXZxcTZvYXhycWt4cw==", color: "#e1306c" },
              { icon: "👤", label: "Facebook", url: "https://www.facebook.com/share/1BP6ay2Cj4/", color: "#1877f2" },
            ].map(({ icon, label, url, color }) => (
              <div key={label} className="social-btn" onClick={() => window.open(url)} style={{
                width: 56, height: 56, borderRadius: "16px",
                background: `${color}18`, border: `1px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", cursor: "pointer", transition: "all 0.3s",
              }} title={label}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div ref={formRef} style={{
          opacity: formInView ? 1 : 0, transform: formInView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.7s ease",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,188,212,0.12)",
          borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#00bcd4,#26a69a,#00e5ff)" }} />

          <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "24px", color: "#00bcd4" }}>✍️ Send a Message</h3>

          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🎉</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#00bcd4", marginBottom: "8px" }}>Message Sent!</div>
              <div style={{ color: "#546e7a" }}>Thank you for reaching out. I'll get back to you soon!</div>
              <button onClick={() => setSent(false)} style={{ marginTop: "20px", padding: "10px 24px", background: "rgba(0,188,212,0.1)", border: "1px solid rgba(0,188,212,0.3)", borderRadius: "10px", color: "#00bcd4", cursor: "pointer", fontWeight: 600 }}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", color: "#90a4ae", fontSize: "12px", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Name</label>
                  <input style={inputStyle("name")} placeholder="Subhajit..." onFocus={() => setFocused("name")} onBlur={() => setFocused("")} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#90a4ae", fontSize: "12px", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Email</label>
                  <input style={inputStyle("email")} placeholder="you@example.com" onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", color: "#90a4ae", fontSize: "12px", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject</label>
                <input style={inputStyle("subject")} placeholder="Project Discussion..." onFocus={() => setFocused("subject")} onBlur={() => setFocused("")} />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "#90a4ae", fontSize: "12px", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                <textarea style={{ ...inputStyle("message"), minHeight: "130px", resize: "vertical" }} placeholder="Your message..." onFocus={() => setFocused("message")} onBlur={() => setFocused("")} />
              </div>
              <button onClick={() => setSent(true)} style={{
                width: "100%", padding: "15px", background: "linear-gradient(135deg,#00bcd4,#26a69a)",
                color: "#060b0f", borderRadius: "12px", fontWeight: 700, fontSize: "16px",
                cursor: "pointer", border: "none", boxShadow: "0 4px 20px rgba(0,188,212,0.35)",
                transition: "all 0.3s", letterSpacing: "0.05em",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,188,212,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,188,212,0.35)"; }}>
                🚀 Send Message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { REGISTRY } from "../compositions/Gallery/compositionRegistry";

// ── Visual preview for each template ─────────────────────────────────────────

const SpotifyPreview = () => (
  <div style={{
    width: "100%", height: "100%",
    background: "#111111",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: 20, padding: "32px 28px", boxSizing: "border-box",
  }}>
    {/* Vinyl record */}
    <div style={{
      width: 108, height: 108,
      borderRadius: "50%",
      background: "radial-gradient(circle at center, transparent 0px, transparent 10px, rgba(255,255,255,0.015) 10px, rgba(255,255,255,0.015) 11px, transparent 11px, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px, transparent 21px, transparent 30px, rgba(255,255,255,0.015) 30px, rgba(255,255,255,0.015) 31px, transparent 31px), #1a1a1a",
      boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
      flexShrink: 0,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: "#1DB954",
        boxShadow: "0 0 16px #1DB95455",
      }} />
    </div>

    {/* Track info */}
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ height: 7, borderRadius: 99, background: "rgba(255,255,255,0.85)", width: "72%" }} />
      <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,0.25)", width: "52%" }} />
    </div>

    {/* Progress */}
    <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 99, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, width: "38%", height: "100%", background: "rgba(255,255,255,0.85)", borderRadius: 99 }} />
      <div style={{ position: "absolute", left: "38%", top: "50%", width: 10, height: 10, background: "white", borderRadius: "50%", transform: "translate(-50%, -50%)" }} />
    </div>

    {/* Controls */}
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {[
        { w: 18, h: 14, r: 3 },
        { w: 14, h: 14, r: 3 },
        { w: 30, h: 30, r: "50%", bright: true },
        { w: 14, h: 14, r: 3 },
        { w: 18, h: 14, r: 3 },
      ].map((s, i) => (
        <div key={i} style={{
          width: s.w, height: s.h,
          borderRadius: s.r,
          background: (s as { bright?: boolean }).bright ? "white" : "rgba(255,255,255,0.3)",
        }} />
      ))}
    </div>
  </div>
);

const FuturePreview = () => (
  <div style={{
    width: "100%", height: "100%",
    background: "linear-gradient(160deg, #0f172a 0%, #0a0f1e 100%)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: 6,
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Ambient glow */}
    <div style={{
      position: "absolute",
      width: 300, height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    }} />
    <div style={{
      fontSize: 68,
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontStyle: "italic",
      color: "white",
      lineHeight: 1,
      letterSpacing: "-2px",
      filter: "drop-shadow(0 0 20px rgba(255,255,255,0.35))",
      position: "relative",
    }}>
      future
    </div>
    <div style={{
      fontSize: 10,
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      letterSpacing: "0.38em",
      color: "rgba(255,255,255,0.45)",
      textTransform: "uppercase" as const,
      position: "relative",
    }}>
      of design
    </div>
  </div>
);

const PREVIEWS: Record<string, React.FC> = {
  SpotifyPlayer: SpotifyPreview,
  FutureOfDesign: FuturePreview,
};

// Coming-soon placeholders
const COMING_SOON = [
  { id: "CinematicTitles", title: "Cinematic Titles",   description: "Dynamic text animations with cinematic lighting effects.", color: "#E50914", icon: "🎬" },
  { id: "DataViz",         title: "Data Visualization", description: "Interactive charts and graphs for video dashboards.",       color: "#007AFF", icon: "📊" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#000",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#fff",
    }}>
      {/* Top bar */}
      <header style={{
        padding: "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, #1DB954, #169c47)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>▶</div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Remotion</span>
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
          {REGISTRY.length} templates
        </span>
      </header>

      {/* Hero */}
      <div style={{ padding: "72px 48px 52px" }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{
            display: "inline-block",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 20,
          }}>
            Templates
          </div>
          <h1 style={{
            fontSize: "clamp(44px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: 0,
            color: "#fff",
          }}>
            Create something beautiful.
          </h1>
          <p style={{
            marginTop: 18,
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
            maxWidth: 420,
          }}>
            Pick a template, customize every detail, and export a frame-perfect video.
          </p>
        </div>
      </div>

      {/* Template grid */}
      <div style={{
        padding: "0 48px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 20,
        maxWidth: 1400,
      }}>
        {/* Active templates from registry */}
        {REGISTRY.map((def) => {
          const Preview = PREVIEWS[def.id];
          return (
            <button
              key={def.id}
              onClick={() => navigate(`/editor/${def.id}`)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "block",
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.16)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {/* Preview thumbnail */}
              <div style={{ height: 240, width: "100%", overflow: "hidden" }}>
                {Preview ? <Preview /> : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: def.color + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 48,
                  }}>{def.icon}</div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "22px 24px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      backgroundColor: def.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14,
                      boxShadow: `0 2px 8px ${def.color}44`,
                    }}>
                      {def.icon}
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {def.title}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", lineHeight: 1 }}>›</span>
                </div>
                <p style={{
                  margin: "10px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.55,
                }}>
                  {def.description}
                </p>
              </div>
            </button>
          );
        })}

        {/* Coming soon */}
        {COMING_SOON.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 20,
              overflow: "hidden",
              opacity: 0.42,
              cursor: "default",
            }}
          >
            <div style={{
              height: 240,
              background: c.color + "0d",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 52, filter: "grayscale(1)",
            }}>
              {c.icon}
            </div>
            <div style={{ padding: "22px 24px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    backgroundColor: c.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, filter: "grayscale(1)",
                  }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{c.title}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.3)",
                }}>
                  Soon
                </span>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.55 }}>
                {c.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

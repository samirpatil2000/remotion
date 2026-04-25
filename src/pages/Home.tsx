import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import { REGISTRY, type CompositionDef } from "../compositions/Gallery/compositionRegistry";

// ── Import Modal ──────────────────────────────────────────────────────────────

const CODE_PLACEHOLDER = `import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';

export default function MyAnimation() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <AbsoluteFill style={{ background: '#111', opacity, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'white', fontSize: 80 }}>Hello!</h1>
    </AbsoluteFill>
  );
}`;

function buildClaudePrompt(url: string): string {
  return `Visit and carefully read the page at this URL: **${url}**

Understand the product — what it does, its key features, its tone, and its target audience.

Then write a compelling 30–45 second product video script with a clear hook, 2–3 key benefits, and a strong call to action.

Then convert that script into a complete, self-contained Remotion component (.jsx file) that follows ALL of these rules strictly:

**Remotion rules:**
- \`export default function\` as the root component
- Import ONLY \`{ AbsoluteFill, useCurrentFrame, interpolate }\` from 'remotion' — do NOT import \`Easing\` or \`spring\` from remotion, they are not available
- Do NOT declare any variable named \`spring\` — it conflicts with Remotion internals
- Run at 30 fps for 180–300 frames total
- Register composition externally; do NOT use \`registerRoot\` or \`<Composition>\` inside this file

**Easing rules (critical):**
- Do NOT use \`Easing\` from remotion — it does not exist
- Define all easing as plain JS functions, for example:
  \`\`\`js
  const easeOut   = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const backEase  = (t) => { const c1=1.70158, c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2); };
  \`\`\`
- Pass these directly into \`interpolate\`'s \`easing\` option

**Animation rules:**
- Animate each scene with smooth entrances (fade + slide or scale), holds, and exits
- Cross-fade between scenes using per-scene opacity calculated from \`useCurrentFrame()\`
- Use only inline CSS styles — no external assets, no image URLs, no CSS files

**Design rules:**
- Use only inline CSS — no className, no external stylesheets
- Match the brand tone of the product (colors, typography, energy)
- All visual elements must be pure CSS/SVG — no \`<img>\` tags, no external URLs

Return ONLY the complete .jsx code — no explanation, no markdown fences. The file must be paste-ready to drop straight into a Remotion player.`;
}

async function resolveUrl(raw: string): Promise<string> {
  const url = raw.trim().startsWith("http") ? raw.trim() : `https://${raw.trim()}`;
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return res.url || url;
  } catch {
    return url;
  }
}

function ImportModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [resolving, setResolving] = useState(false);
  const [code, setCode] = useState("");

  const handleReadUrl = async () => {
    if (!url.trim()) return;
    setResolving(true);
    const finalUrl = await resolveUrl(url);
    setResolving(false);
    const prompt = buildClaudePrompt(finalUrl);
    window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, "_blank");
  };

  const animate = () => {
    sessionStorage.setItem("customJsx", code.trim() || CODE_PLACEHOLDER);
    sessionStorage.setItem("customJsxName", "Custom");
    onClose();
    navigate("/editor/custom");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          width: "100%", maxWidth: 600,
          display: "flex", flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            New Animation
          </div>
          <button
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              width: 28, height: 28, borderRadius: 7,
              background: "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1,
            }}
          >×</button>
        </div>

        {/* ── Generate from URL ── */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.3)", marginBottom: 10,
          }}>
            Generate from URL
          </div>

          {/* URL input row */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              flex: 1,
              display: "flex", alignItems: "center",
              background: "#070707",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "0 14px",
              gap: 8,
            }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>🌐</span>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleReadUrl()}
                placeholder="https://yourproduct.com"
                style={{
                  flex: 1, border: "none", outline: "none",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 13,
                  lineHeight: 1,
                  padding: "11px 0",
                }}
              />
            </div>
            <button
              onClick={handleReadUrl}
              disabled={resolving || !url.trim()}
              style={{
                all: "unset",
                cursor: url.trim() && !resolving ? "pointer" : "default",
                padding: "0 16px",
                borderRadius: 10,
                fontSize: 12, fontWeight: 600,
                background: url.trim() && !resolving ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                color: url.trim() && !resolving ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap" as const,
                height: 42,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {resolving ? (
                <>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "rgba(255,255,255,0.8)",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Resolving…
                </>
              ) : (
                <>Read URL →</>
              )}
            </button>
          </div>

          {/* Helper text */}
          <div style={{ marginTop: 9, fontSize: 11.5, color: "rgba(255,255,255,0.22)", lineHeight: 1.5 }}>
            Opens Claude with a prompt to generate a Remotion video script from your product page. Paste the returned code below.
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          padding: "14px 24px",
          display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" as const }}>
            or paste code manually
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* ── Code textarea ── */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={CODE_PLACEHOLDER}
            spellCheck={false}
            style={{
              flex: 1, resize: "none", border: "none", outline: "none",
              background: "#070707",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
              fontSize: 12, lineHeight: 1.7,
              padding: "14px 20px",
              minHeight: 200,
              caretColor: "#fff",
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", justifyContent: "flex-end", gap: 8,
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              padding: "8px 16px", borderRadius: 8,
              fontSize: 13, fontWeight: 500,
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={animate}
            style={{
              all: "unset", cursor: "pointer",
              padding: "8px 20px", borderRadius: 8,
              fontSize: 13, fontWeight: 600,
              color: "#000", background: "#fff",
            }}
          >
            Animate →
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const CompositionPreview = ({ def }: { def: CompositionDef }) => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background brand color wash */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at center, ${def.color}22 0%, transparent 70%)`,
        opacity: 0.6,
      }} />

      <Player
        component={def.component}
        inputProps={def.defaultProps}
        durationInFrames={def.durationInFrames}
        fps={def.fps}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "9 / 16",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}
        autoPlay
        loop
        controls={false}
      />
    </div>
  );
};

// Coming-soon placeholders
const COMING_SOON = [
  { id: "CinematicTitles", title: "Cinematic Titles",   description: "Dynamic text animations with cinematic lighting effects.", color: "#E50914", icon: "🎬" },
  { id: "DataViz",         title: "Data Visualization", description: "Interactive charts and graphs for video dashboards.",       color: "#007AFF", icon: "📊" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
        {/* Import your own component */}
        <button
          onClick={() => setModalOpen(true)}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "block",
            background: "#0a0a0a",
            border: "1px dashed rgba(255,255,255,0.12)",
            borderRadius: 20,
            overflow: "hidden",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          <div style={{
            height: 240, width: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1.5px dashed rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, color: "rgba(255,255,255,0.35)",
            }}>+</div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>
              Import component
            </span>
          </div>
          <div style={{ padding: "22px 24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14,
              }}>+</div>
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.5)" }}>
                Your Component
              </span>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.55 }}>
              Upload a .jsx or .tsx file and animate it with Remotion.
            </p>
          </div>
        </button>

        {/* Active templates from registry */}
        {REGISTRY.map((def) => {
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
                <CompositionPreview def={def} />
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

      {modalOpen && <ImportModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

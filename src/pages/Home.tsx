import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTRY } from "../compositions/Gallery/compositionRegistry";

// ── Import Modal ──────────────────────────────────────────────────────────────

function ImportModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFile = useCallback((f: File) => {
    if (!f.name.endsWith(".jsx") && !f.name.endsWith(".tsx")) {
      setError("Please upload a .jsx or .tsx file.");
      return;
    }
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setCode((e.target?.result as string) ?? "");
    reader.readAsText(f);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const animate = () => {
    sessionStorage.setItem("customJsx", code);
    sessionStorage.setItem("customJsxName", file?.name ?? "Custom");
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
          width: "100%", maxWidth: 560,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "22px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              Import Component
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
              Upload a .jsx or .tsx file to animate it
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              width: 30, height: 30, borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1,
            }}
          >×</button>
        </div>

        {/* Drop zone */}
        {!file && (
          <div style={{ padding: "24px 24px 0" }}>
            <div
              onDrop={onDrop}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => inputRef.current?.click()}
              style={{
                border: `2px dashed ${dragging ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: 14,
                padding: "44px 32px",
                textAlign: "center",
                cursor: "pointer",
                background: dragging ? "rgba(255,255,255,0.03)" : "transparent",
                transition: "all 0.18s",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>⬆️</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                Drop your file here or click to browse
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", marginTop: 6 }}>
                .jsx or .tsx · exports a default React component
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".jsx,.tsx"
                style={{ display: "none" }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
            {error && (
              <div style={{ fontSize: 12, color: "#ff5a5a", marginTop: 10, textAlign: "center" }}>{error}</div>
            )}
          </div>
        )}

        {/* Code preview */}
        {file && (
          <div style={{ padding: "20px 24px 0" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>📄</div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => { setFile(null); setCode(""); }}
                style={{
                  all: "unset", cursor: "pointer",
                  fontSize: 12, color: "rgba(255,255,255,0.3)",
                }}
              >
                Change file
              </button>
            </div>
            <div style={{
              background: "#070707",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "14px 16px",
              maxHeight: 220,
              overflowY: "auto",
            }}>
              <pre style={{
                margin: 0, fontSize: 11.5,
                fontFamily: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.65,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}>{code}</pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: "20px 24px",
          display: "flex", justifyContent: "flex-end", gap: 10,
          marginTop: 4,
        }}>
          <button
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              padding: "9px 18px", borderRadius: 9,
              fontSize: 13, fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={animate}
            disabled={!file}
            style={{
              all: "unset",
              cursor: file ? "pointer" : "default",
              padding: "9px 22px", borderRadius: 9,
              fontSize: 13, fontWeight: 600,
              color: file ? "#000" : "rgba(255,255,255,0.25)",
              background: file ? "#fff" : "rgba(255,255,255,0.07)",
              transition: "background 0.15s",
            }}
          >
            Animate →
          </button>
        </div>
      </div>
    </div>
  );
}

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

const GoodMoodPreview = () => (
  <div style={{
    width: "100%", height: "100%",
    background: "#000",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 6, padding: "0 20px", boxSizing: "border-box",
  }}>
    {[
      { t: "G", b: "M", c: "#006eff", r: 1.4 },
      { t: "O", b: "O", c: "#ff1d1d", r: 0.8 },
      { t: "O", b: "O", c: "#ffbd14", r: 1.2 },
      { t: "D", b: "D", c: "#ff7fa1", r: 0.6 },
    ].map((col, i) => (
      <div key={i} style={{ display: "flex", flexDirection: "column", height: 100, width: 34 }}>
        <div style={{ 
          height: `${col.r * 50}%`, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" 
        }}>
          <span style={{ color: "white", fontSize: 54, fontWeight: 900, fontFamily: "Bebas Neue, Impact, sans-serif", transform: `scaleY(${col.r})` }}>{col.t}</span>
        </div>
        <div style={{ 
          height: `${(2 - col.r) * 50}%`, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" 
        }}>
          <span style={{ color: col.c, fontSize: 54, fontWeight: 900, fontFamily: "Bebas Neue, Impact, sans-serif", transform: `scaleY(${2 - col.r})` }}>{col.b}</span>
        </div>
      </div>
    ))}
  </div>
);

const PREVIEWS: Record<string, React.FC> = {
  SpotifyPlayer: SpotifyPreview,
  FutureOfDesign: FuturePreview,
  GoodMood: GoodMoodPreview,
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

      {modalOpen && <ImportModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

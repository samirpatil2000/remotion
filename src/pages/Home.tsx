import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import { REGISTRY, type CompositionDef } from "../compositions/Gallery/compositionRegistry";

const CATEGORIES = [
  "All",
  "UI & App",
  "Typography",
  "Social & Media",
  "3D & Abstract",
  "Data & Charts",
  "Utility",
  "Miscellaneous",
];

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

type UrlProvider = "claude" | "openai";

function buildAiPrompt(url: string, provider: UrlProvider): string {
  const prompt = `Visit and carefully read the page at this URL: **${url}**

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

  if (provider === "openai") {
    return `${prompt}

Respond in canvas.`;
  }

  return prompt;
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
  const [openingProvider, setOpeningProvider] = useState<UrlProvider | null>(null);
  const [code, setCode] = useState("");

  const handleReadUrl = async (provider: UrlProvider) => {
    if (!url.trim()) return;
    setOpeningProvider(provider);
    const finalUrl = await resolveUrl(url);
    setOpeningProvider(null);
    const prompt = buildAiPrompt(finalUrl, provider);

    if (provider === "claude") {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, "_blank");
      return;
    }

    // Best-effort deep link into ChatGPT with a prefilled prompt.
    // If the URL param isn't supported, the user can still paste the prompt manually.
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, "_blank");
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
                onKeyDown={e => e.key === "Enter" && !openingProvider && handleReadUrl("claude")}
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
              onClick={() => handleReadUrl("claude")}
              disabled={!!openingProvider || !url.trim()}
              style={{
                all: "unset",
                cursor: url.trim() && !openingProvider ? "pointer" : "default",
                padding: "0 16px",
                borderRadius: 10,
                fontSize: 12, fontWeight: 600,
                background: url.trim() && !openingProvider ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                color: url.trim() && !openingProvider ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap" as const,
                height: 42,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {openingProvider === "claude" ? (
                <>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "rgba(255,255,255,0.8)",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Opening...
                </>
              ) : (
                <>Claude →</>
              )}
            </button>

            <button
              onClick={() => handleReadUrl("openai")}
              disabled={!!openingProvider || !url.trim()}
              style={{
                all: "unset",
                cursor: url.trim() && !openingProvider ? "pointer" : "default",
                padding: "0 16px",
                borderRadius: 10,
                fontSize: 12, fontWeight: 600,
                background: url.trim() && !openingProvider ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                color: url.trim() && !openingProvider ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap" as const,
                height: 42,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {openingProvider === "openai" ? (
                <>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "rgba(255,255,255,0.8)",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Opening...
                </>
              ) : (
                <>OpenAI →</>
              )}
            </button>
          </div>

          {/* Helper text */}
          <div style={{ marginTop: 9, fontSize: 11.5, color: "rgba(255,255,255,0.22)", lineHeight: 1.5 }}>
            Opens Claude or OpenAI with a prompt to generate a Remotion video script from your product page. Paste the returned code below.
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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    let isMounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          def.loadComponent().then(c => {
            if (isMounted) {
              setComp(c);
            }
          });
        }
      },
      { rootMargin: "400px" }
    );
    
    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [def]);

  return (
    <div ref={ref} style={{
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
      {isVisible && Comp ? (
        <Player
          component={Comp}
          inputProps={def.defaultProps}
          durationInFrames={def.durationInFrames}
          fps={def.fps}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          controls={false}
        />
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 40%, ${def.color}25 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, ${def.color}15 0%, transparent 50%)` }} />
          <span style={{ fontSize: 52, opacity: 0.45, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))", zIndex: 1 }}>{def.icon}</span>
        </>
      )}
    </div>
  );
};

function TemplateCard({ def, navigate }: { def: CompositionDef; navigate: (path: string) => void }) {
  return (
    <div 
      onClick={() => navigate(`/editor/${def.id}`)}
      style={{
        backgroundColor: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <div style={{ height: 200, width: "100%", backgroundColor: "#050505", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <CompositionPreview def={def} />
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            backgroundColor: def.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12,
          }}>
            {def.icon}
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#fff" }}>{def.title}</h3>
        </div>
        <p style={{ 
          fontSize: 13, 
          color: "rgba(255,255,255,0.4)", 
          margin: 0, 
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {def.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = CATEGORIES;

  const filteredTemplates = useMemo(() => {
    return REGISTRY.filter(def => {
      const matchesSearch = def.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            def.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            def.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Handle missing categories gracefully
      const defCategory = def.category ?? "Miscellaneous";
      const matchesCategory = selectedCategory === "All" || defCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedTemplates = useMemo(() => {
    if (searchQuery || selectedCategory !== "All") return null;
    const groups: Record<string, typeof REGISTRY> = {};
    for (const cat of categories.slice(1)) {
      const items = REGISTRY.filter(d => (d.category ?? "Miscellaneous") === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [searchQuery, selectedCategory, categories]);

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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              transition: "background 0.15s, border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.14)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
            }}
          >
            <Upload size={16} />
            Import
          </button>

          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
            {REGISTRY.length} templates
          </span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ padding: "72px 48px 40px" }}>
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

      {/* Search and Filters */}
      <div style={{ padding: "0 48px 40px", maxWidth: 1400 }}>
        {/* Search Bar */}
        <div style={{ 
          position: "relative", 
          maxWidth: 600, 
          marginBottom: 24,
        }}>
          <div style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.4)", pointerEvents: "none"
          }}>
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "16px 16px 16px 48px",
              fontSize: 16,
              color: "#fff",
              outline: "none",
              transition: "border-color 0.2s, background-color 0.2s",
              boxSizing: "border-box"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                all: "unset", cursor: "pointer", color: "rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ 
          display: "flex", 
          gap: 10, 
          flexWrap: "wrap",
        }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "8px 18px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  backgroundColor: isSelected ? "#fff" : "rgba(255,255,255,0.06)",
                  color: isSelected ? "#000" : "rgba(255,255,255,0.6)",
                  border: `1px solid ${isSelected ? "transparent" : "rgba(255,255,255,0.08)"}`
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Template View */}
      <div style={{ padding: "0 48px 80px", maxWidth: 1400 }}>
        {groupedTemplates ? (
          // --- Grouped Sections View ---
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {categories.slice(1).map(cat => {
              const items = groupedTemplates[cat];
              if (!items) return null;
              
              return (
                <div key={cat}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)"
                  }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{cat}</h2>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{items.length} templates</span>
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 20,
                  }}>
                    {items.map((def) => (
                      <TemplateCard key={def.id} def={def} navigate={navigate} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // --- Filtered Flat Grid View ---
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "rgba(255,255,255,0.7)" }}>
                {filteredTemplates.length} result{filteredTemplates.length === 1 ? "" : "s"}
              </h2>
            </div>
            {filteredTemplates.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 20,
              }}>
                {filteredTemplates.map((def) => (
                  <TemplateCard key={def.id} def={def} navigate={navigate} />
                ))}
              </div>
            ) : (
              <div style={{ padding: "80px 0", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>No templates found</h3>
                <p style={{ color: "rgba(255,255,255,0.5)" }}>Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom & Coming Soon */}
      <div style={{ padding: "0 48px 80px", maxWidth: 1400 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>More</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
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
                color: "rgba(255,255,255,0.35)",
              }}>
                <Upload size={22} />
              </div>
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
                  color: "rgba(255,255,255,0.55)",
                }}>
                  <Upload size={14} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.5)" }}>
                  Your Component
                </span>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.55 }}>
                Upload a .jsx or .tsx file and animate it with Remotion.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {modalOpen && <ImportModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

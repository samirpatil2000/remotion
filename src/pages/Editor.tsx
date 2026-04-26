import { useState, useMemo, CSSProperties, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Player, type PlayerRef } from "@remotion/player";
import { Check, Download, X, Loader2 } from "lucide-react";
import { REGISTRY } from "../compositions/Gallery/compositionRegistry";
import type { Control } from "../compositions/Gallery/compositionRegistry";

// ── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:       "#000000",
  panel:    "#0a0a0a",
  elevated: "#111111",
  border:   "rgba(255,255,255,0.07)",
  borderMd: "rgba(255,255,255,0.12)",
  text:     "#ffffff",
  muted:    "rgba(255,255,255,0.45)",
  subtle:   "rgba(255,255,255,0.22)",
  faint:    "rgba(255,255,255,0.08)",
  mono:     "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
};

const row: CSSProperties = {
  display: "flex", alignItems: "center",
  justifyContent: "space-between",
  padding: "11px 0",
  borderBottom: `1px solid ${C.border}`,
};

// ── Controls ─────────────────────────────────────────────────────────────────

function ColorField({ ctrl, value, onChange }: { ctrl: Control; value: unknown; onChange: (v: unknown) => void }) {
  const hex = (value as string) || "#000000";
  return (
    <div style={row}>
      <span style={{ fontSize: 13, color: C.muted }}>{ctrl.label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 11, color: C.subtle, fontFamily: C.mono, letterSpacing: "0.03em" }}>
          {hex.toUpperCase()}
        </span>
        <div style={{
          position: "relative", width: 24, height: 24, borderRadius: 6,
          backgroundColor: hex,
          border: "1.5px solid rgba(255,255,255,0.13)",
          boxShadow: `0 2px 8px ${hex}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
          overflow: "hidden", cursor: "pointer", flexShrink: 0,
        }}>
          <input type="color" value={hex} onChange={e => onChange(e.target.value)}
            style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

function SliderField({ ctrl, value, onChange }: { ctrl: Control; value: unknown; onChange: (v: unknown) => void }) {
  const num  = typeof value === "number" ? value : 0;
  const min  = ctrl.min  ?? 0;
  const max  = ctrl.max  ?? 1;
  const step = ctrl.step ?? 0.01;
  const pct  = Math.max(0, Math.min(100, ((num - min) / (max - min)) * 100));
  const display = Number.isInteger(num) ? String(num) : num.toFixed(2);

  return (
    <div style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: C.muted }}>{ctrl.label}</span>
        <span style={{ fontSize: 12, color: C.text, fontFamily: C.mono, minWidth: 32, textAlign: "right" }}>
          {display}
        </span>
      </div>
      <div style={{ position: "relative", height: 18, display: "flex", alignItems: "center" }}>
        {/* Track */}
        <div style={{ position: "absolute", inset: "0 0 0 0", height: 2, top: "50%", transform: "translateY(-50%)", borderRadius: 2, backgroundColor: C.faint }} />
        {/* Fill */}
        <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 2, top: "50%", transform: "translateY(-50%)", borderRadius: 2, backgroundColor: "rgba(255,255,255,0.6)" }} />
        {/* Thumb */}
        <div style={{
          position: "absolute", left: `${pct}%`, transform: "translateX(-50%)",
          width: 12, height: 12, borderRadius: "50%",
          backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }} />
        {/* Input */}
        <input type="range" min={min} max={max} step={step} value={num}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", margin: 0 }} />
      </div>
    </div>
  );
}

function TextField({ ctrl, value, onChange }: { ctrl: Control; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.subtle, marginBottom: 7 }}>
        {ctrl.label}
      </div>
      <input type="text" value={(value as string) ?? ""} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", boxSizing: "border-box" as const,
          background: C.elevated, border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.text, fontSize: 13,
          padding: "8px 11px", outline: "none",
          fontFamily: ctrl.type === "font" ? ((value as string) || "system-ui") : "system-ui",
        }} />
    </div>
  );
}

function ImageField({ ctrl, value, onChange }: { ctrl: Control; value: unknown; onChange: (v: unknown) => void }) {
  const url = (value as string) ?? "";
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.subtle, marginBottom: 8 }}>
        {ctrl.label}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {/* Thumbnail */}
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            width: 52, height: 52, borderRadius: 10, flexShrink: 0,
            background: C.elevated, border: `1.5px dashed ${C.border}`,
            backgroundImage: url ? `url(${url})` : "none",
            backgroundSize: "cover", backgroundPosition: "center",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", overflow: "hidden",
            transition: "border-color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
        >
          {!url && <span style={{ fontSize: 18, opacity: 0.3 }}>+</span>}
        </div>

        {/* URL input + upload button */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <input
            type="text"
            placeholder="Paste image URL…"
            value={url}
            onChange={e => onChange(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box" as const,
              background: C.elevated, border: `1px solid ${C.border}`,
              borderRadius: 8, color: C.text, fontSize: 12,
              padding: "7px 10px", outline: "none",
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              all: "unset", cursor: "pointer", fontSize: 11, fontWeight: 600,
              color: C.muted, padding: "5px 10px", borderRadius: 7,
              background: C.faint, border: `1px solid ${C.border}`,
              textAlign: "center" as const, transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = C.faint)}
          >
            Upload from device
          </button>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

function ToggleField({ ctrl, value, onChange }: { ctrl: Control; value: unknown; onChange: (v: unknown) => void }) {
  const on = Boolean(value);
  return (
    <div style={row}>
      <span style={{ fontSize: 13, color: C.muted }}>{ctrl.label}</span>
      <div onClick={() => onChange(!on)} style={{
        width: 40, height: 22, borderRadius: 11, cursor: "pointer", flexShrink: 0,
        backgroundColor: on ? "rgba(255,255,255,0.85)" : C.faint,
        border: `1px solid ${on ? "transparent" : C.border}`,
        position: "relative", transition: "background 0.2s",
      }}>
        <div style={{
          position: "absolute", top: 2, left: on ? 18 : 2,
          width: 16, height: 16, borderRadius: "50%",
          backgroundColor: on ? "#000" : "rgba(255,255,255,0.4)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
          transition: "left 0.2s, background 0.2s",
        }} />
      </div>
    </div>
  );
}

function renderField(ctrl: Control, value: unknown, onChange: (v: unknown) => void) {
  switch (ctrl.type) {
    case "color":   return <ColorField  key={ctrl.key} ctrl={ctrl} value={value} onChange={onChange} />;
    case "number":  return <SliderField key={ctrl.key} ctrl={ctrl} value={value} onChange={onChange} />;
    case "boolean": return <ToggleField key={ctrl.key} ctrl={ctrl} value={value} onChange={onChange} />;
    case "image":
    case "url":     return <ImageField  key={ctrl.key} ctrl={ctrl} value={value} onChange={onChange} />;
    default:        return <TextField   key={ctrl.key} ctrl={ctrl} value={value} onChange={onChange} />;
  }
}

// ── Editor ───────────────────────────────────────────────────────────────────
export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const def = REGISTRY.find(d => d.id === templateId);

  const [props, setProps] = useState<Record<string, unknown>>(
    () => def ? { ...def.defaultProps } : {}
  );

  const animationSpeed = typeof props.animationSpeed === "number" ? props.animationSpeed : 1;
  // Cap at minimum speed of 0.1 to prevent infinite duration
  const effectiveDuration = Math.floor(def.durationInFrames / Math.max(0.1, animationSpeed));

  // ── Export State ───────────────────────────────────────────────────────────
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const playerRef = useRef<PlayerRef>(null);

  // ── Load composition component on demand ──────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (!def) return;
    setLoadedComponent(null);
    def.loadComponent().then(comp => setLoadedComponent(() => comp));
  }, [def]);

  const handleExport = async () => {
    if (!LoadedComponent || !def) return;
    setIsExporting(true);
    setExportProgress(0);
    setIsComplete(false);
    setRenderError(null);
    setVideoBlob(null);
    setExportStatus("Starting render...");

    try {
      const { renderMediaOnWeb } = await import("@remotion/web-renderer");
      const result = await renderMediaOnWeb({
        composition: {
          id: def.id,
          component: LoadedComponent,
          durationInFrames: effectiveDuration,
          fps: def.fps,
          width: def.width ?? 1080,
          height: def.height ?? 1920,
          defaultProps: def.defaultProps,
        },
        inputProps: props,
        container: "mp4",
        onProgress: ({ progress }) => {
          const pct = Math.round(progress * 100);
          setExportProgress(pct);
          setExportStatus(
            pct < 30 ? "Rendering frames..." :
            pct < 70 ? "Encoding video..." :
            pct < 95 ? "Finalizing..." : "Almost done..."
          );
        },
      });

      const blob = await result.getBlob();
      setVideoBlob(blob);
      setIsComplete(true);
    } catch (e) {
      setRenderError(String(e));
      setIsComplete(true);
    }
  };

  const downloadVideo = () => {
    if (!videoBlob) return;
    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${def.id}.mp4`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  const groups = useMemo(() => {
    if (!def) return [];
    const map = new Map<string, Control[]>();
    for (const ctrl of def.controls) {
      const arr = map.get(ctrl.group) ?? [];
      arr.push(ctrl);
      map.set(ctrl.group, arr);
    }
    return Array.from(map.entries());
  }, [def]);

  if (!def) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: C.bg, color: C.muted, fontFamily: "system-ui" }}>
        Template not found.{" "}
        <span onClick={() => navigate("/")} style={{ color: C.text, cursor: "pointer", marginLeft: 6 }}>← Go back</span>
      </div>
    );
  }

  const updateProp = (key: string, val: unknown) =>
    setProps(prev => ({ ...prev, [key]: val }));

  const resetProps = () => setProps({ ...def.defaultProps });

  const compWidth  = def.width  ?? 1080;
  const compHeight = def.height ?? 1920;
  const aspectRatio = `${compWidth} / ${compHeight}`;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", backgroundColor: C.bg,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
      color: C.text, overflow: "hidden",
    }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header style={{
        height: 56, flexShrink: 0,
        display: "flex", alignItems: "center",
        padding: "0 24px",
        borderBottom: `1px solid ${C.border}`,
        position: "relative",
      }}>
        {/* Back — left edge */}
        <button onClick={() => navigate("/")} style={{
          all: "unset", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4,
          fontSize: 13, color: C.muted,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = C.text)}
          onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
        >
          <span style={{ fontSize: 18, lineHeight: 1, marginTop: -1 }}>‹</span>
          <span style={{ letterSpacing: "-0.01em" }}>Back</span>
        </button>

        {/* Title — dead center via absolute */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "center", gap: 9,
          pointerEvents: "none",
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 7,
            backgroundColor: def.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, boxShadow: `0 0 14px ${def.color}66`,
          }}>
            {def.icon}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            {def.title}
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Reset — ghost text, far right */}
        <button onClick={resetProps} style={{
          all: "unset", cursor: "pointer",
          fontSize: 12, color: C.subtle,
          marginRight: 14, letterSpacing: "-0.01em",
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = C.muted)}
          onMouseLeave={e => (e.currentTarget.style.color = C.subtle)}
        >
          Reset
        </button>

        {/* Export — the only button that matters */}
        <button
          onClick={handleExport}
          style={{
            all: "unset", cursor: "pointer",
            fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
            color: "#000", background: "#ffffff",
            padding: "7px 22px", borderRadius: 100,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Export
        </button>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Left: parameter panel ──────────────────────────────────────── */}
        <aside style={{
          width: 268, flexShrink: 0,
          backgroundColor: C.bg,
          borderRight: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Scrollable controls — no header, controls start immediately */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 60px" }}>
            {groups.map(([group, controls], gi) => (
              <div key={group} style={{ marginTop: gi === 0 ? 0 : 32 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: 12,
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: C.subtle, flexShrink: 0 }} />
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: C.subtle,
                  }}>
                    {group}
                  </span>
                </div>
                {controls.map(ctrl => renderField(ctrl, props[ctrl.key], v => updateProp(ctrl.key, v)))}
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main: video preview ────────────────────────────────────────── */}
        <main style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle radial vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }} />

          {/* Player — sized by actual composition aspect ratio */}
          <div style={{
            position: "relative",
            height: "calc(100vh - 56px - 40px)",
            aspectRatio,
            maxHeight: "calc(100vh - 56px - 40px)",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            {LoadedComponent ? (
              <Player
                ref={playerRef}
                component={LoadedComponent}
                inputProps={props}
                durationInFrames={effectiveDuration}
                fps={def.fps}
                compositionWidth={compWidth}
                compositionHeight={compHeight}
                style={{ width: "100%", height: "100%", display: "block" }}
                controls
                autoPlay
                loop
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#080808",
              }}>
                <Loader2 size={22} style={{ color: "rgba(255,255,255,0.2)", animation: "spin 1s linear infinite" }} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Export Modal ─────────────────────────────────────────────────── */}
      {isExporting && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(20px) saturate(1.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "fadeIn 0.3s ease-out",
        }}>
          <div style={{
            width: 440, backgroundColor: "#0e0e0e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24, padding: 32,
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            display: "flex", flexDirection: "column",
            position: "relative",
          }}>
            {/* Close */}
            {isComplete && (
              <button onClick={() => setIsExporting(false)} style={{
                position: "absolute", top: 20, right: 20,
                all: "unset", cursor: "pointer", color: C.muted,
              }}>
                <X size={20} />
              </button>
            )}

            {!isComplete ? (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.03em" }}>
                  Rendering
                </h2>
                <p style={{ fontSize: 13, color: C.muted, margin: "0 0 28px", letterSpacing: "-0.01em" }}>
                  {exportStatus}
                </p>

                {/* Progress track */}
                <div style={{
                  height: 3, width: "100%", backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: 2, overflow: "hidden", marginBottom: 10,
                }}>
                  <div style={{
                    height: "100%", width: `${exportProgress}%`,
                    background: "linear-gradient(90deg, rgba(255,255,255,0.6), #fff)",
                    borderRadius: 2,
                    transition: "width 0.25s ease-out",
                  }} />
                </div>
                <div style={{ fontSize: 11, color: C.subtle, fontFamily: C.mono, letterSpacing: "0.04em" }}>
                  {exportProgress}%
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                {renderError ? (
                  <>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      backgroundColor: "rgba(239,68,68,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 24px", color: "#ef4444",
                    }}>
                      <X size={28} strokeWidth={3} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                      Render Failed
                    </h2>
                    <p style={{ fontSize: 12, color: C.muted, margin: "0 0 32px", fontFamily: C.mono, wordBreak: "break-all" }}>
                      {renderError}
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      backgroundColor: "rgba(34,197,94,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px", color: "#22c55e",
                    }}>
                      <Check size={28} strokeWidth={3} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.03em" }}>
                      Rendered in your browser.
                    </h2>
                    <p style={{ fontSize: 13, color: C.muted, margin: "0 0 28px", lineHeight: 1.5 }}>
                      No server. No upload. Just you.
                    </p>

                    {/* Primary: download */}
                    <button onClick={downloadVideo} style={{
                      all: "unset", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      width: "100%", padding: "14px 20px", borderRadius: 12, boxSizing: "border-box",
                      background: "#22c55e", color: "#000",
                      fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
                      transition: "opacity 0.15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      <Download size={18} />
                      Download MP4
                    </button>

                  </>
                )}
                <button onClick={() => { setIsExporting(false); setRenderError(null); setVideoBlob(null); }} style={{
                  all: "unset", cursor: "pointer", marginTop: 20,
                  fontSize: 13, color: C.muted, padding: "8px",
                }}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

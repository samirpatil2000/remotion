import { useState, useMemo, CSSProperties } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
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

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", backgroundColor: C.bg,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.text, overflow: "hidden",
    }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header style={{
        height: 52, flexShrink: 0,
        display: "flex", alignItems: "center",
        padding: "0 20px",
        borderBottom: `1px solid ${C.border}`,
        gap: 16,
      }}>
        {/* Back */}
        <button onClick={() => navigate("/")} style={{
          all: "unset", cursor: "pointer",
          width: 30, height: 30, borderRadius: 8,
          background: C.faint, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.text, fontSize: 16, flexShrink: 0,
        }}>
          ‹
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 16, background: C.border }} />

        {/* Template identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            backgroundColor: def.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, boxShadow: `0 2px 6px ${def.color}44`,
          }}>
            {def.icon}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>{def.title}</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Reset */}
        <button onClick={resetProps} style={{
          all: "unset", cursor: "pointer",
          fontSize: 12, color: C.muted,
          padding: "5px 12px", borderRadius: 7,
          border: `1px solid ${C.border}`,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = C.text)}
          onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
        >
          Reset
        </button>

        {/* Export */}
        <button style={{
          all: "unset", cursor: "pointer",
          fontSize: 12, fontWeight: 600,
          color: "#000", background: "#fff",
          padding: "6px 16px", borderRadius: 8,
          letterSpacing: "-0.01em",
        }}>
          Export ↗
        </button>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Left: parameter panel ──────────────────────────────────────── */}
        <aside style={{
          width: 280, flexShrink: 0,
          backgroundColor: C.panel,
          borderRight: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Panel header */}
          <div style={{
            padding: "16px 20px 14px",
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Properties</div>
            <div style={{ fontSize: 11, color: C.subtle, marginTop: 2 }}>Edit live — changes appear instantly</div>
          </div>

          {/* Scrollable controls */}
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 20px 40px" }}>
            {groups.map(([group, controls]) => (
              <div key={group} style={{ marginTop: 22 }}>
                {/* Section header */}
                <div style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: C.subtle,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${C.borderMd}`,
                  marginBottom: 2,
                }}>
                  {group}
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
          backgroundColor: "#040404",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Dot-grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            pointerEvents: "none",
          }} />

          {/* Player wrapper — fixed 9:16, shrinks to fit */}
          <div style={{
            position: "relative",
            height: "calc(100vh - 52px - 32px)",
            aspectRatio: "9 / 16",
            maxHeight: "calc(100vh - 52px - 32px)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}>
            <Player
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              component={def.component as any}
              inputProps={props}
              durationInFrames={def.durationInFrames}
              fps={def.fps}
              compositionWidth={def.durationInFrames > 150 ? 1080 : 1080}
              compositionHeight={1920}
              style={{ width: "100%", height: "100%", display: "block" }}
              controls
              autoPlay
              loop
            />
          </div>
        </main>
      </div>
    </div>
  );
}

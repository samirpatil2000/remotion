import React from "react";
import type { Control } from "./compositionRegistry";

const T = {
  surface:       "#161616",
  border:        "rgba(255,255,255,0.08)",
  text:          "#ffffff",
  textSecondary: "rgba(255,255,255,0.5)",
  textTertiary:  "rgba(255,255,255,0.28)",
  mono:          "'JetBrains Mono', 'SF Mono', monospace",
};

interface ControlProps {
  control: Control;
  value: unknown;
  onChange: (value: unknown) => void;
}

// ── Color ─────────────────────────────────────────────────────────────────────
export const ColorControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  const hex = (value as string) || "#000000";
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 0",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{ color: T.textSecondary, fontSize: 13 }}>{control.label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: T.textTertiary, fontSize: 11, fontFamily: T.mono, letterSpacing: "0.04em" }}>
          {hex.toUpperCase()}
        </span>
        <div style={{
          position: "relative",
          width: 26,
          height: 26,
          borderRadius: 7,
          backgroundColor: hex,
          border: "2px solid rgba(255,255,255,0.14)",
          cursor: "pointer",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: `0 2px 8px ${hex}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}>
          <input
            type="color"
            value={hex}
            onChange={e => onChange(e.target.value)}
            style={{
              opacity: 0,
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              border: "none",
              padding: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ── Slider ────────────────────────────────────────────────────────────────────
export const SliderControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  const num   = typeof value === "number" ? value : 0;
  const min   = control.min  ?? 0;
  const max   = control.max  ?? 1;
  const step  = control.step ?? 0.01;
  const pct   = Math.max(0, Math.min(100, ((num - min) / (max - min)) * 100));
  const label = Number.isInteger(num) ? String(num) : num.toFixed(2);

  return (
    <div style={{ padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.textSecondary, fontSize: 13 }}>{control.label}</span>
        <span style={{
          color: T.text, fontSize: 12,
          fontFamily: T.mono,
          minWidth: 36,
          textAlign: "right",
          letterSpacing: "0.02em",
        }}>
          {label}
        </span>
      </div>

      {/* Custom track + transparent range input on top */}
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        {/* Background track */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          height: 2,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
        }} />
        {/* Fill */}
        <div style={{
          position: "absolute",
          left: 0,
          width: `${pct}%`,
          height: 2,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.75)",
        }} />
        {/* Thumb dot */}
        <div style={{
          position: "absolute",
          left: `${pct}%`,
          transform: "translateX(-50%)",
          width: 13,
          height: 13,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
          pointerEvents: "none",
          flexShrink: 0,
        }} />
        {/* Invisible range input — captures all mouse interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={num}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
            padding: 0,
          }}
        />
      </div>
    </div>
  );
};

// ── Text ──────────────────────────────────────────────────────────────────────
export const TextControl: React.FC<ControlProps> = ({ control, value, onChange }) => (
  <div style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
    <div style={{
      color: T.textTertiary,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.09em",
      textTransform: "uppercase",
      marginBottom: 7,
    }}>
      {control.label}
    </div>
    <input
      type="text"
      value={(value as string) ?? ""}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        color: T.text,
        fontSize: 13,
        padding: "8px 11px",
        outline: "none",
        fontFamily: "system-ui",
        boxSizing: "border-box",
      }}
    />
  </div>
);

// ── Font ──────────────────────────────────────────────────────────────────────
export const FontControl: React.FC<ControlProps> = ({ control, value, onChange }) => (
  <div style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
    <div style={{
      color: T.textTertiary,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.09em",
      textTransform: "uppercase",
      marginBottom: 7,
    }}>
      {control.label}
    </div>
    <input
      type="text"
      value={(value as string) ?? ""}
      placeholder="Font family name…"
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        color: T.text,
        fontSize: 13,
        padding: "8px 11px",
        outline: "none",
        fontFamily: (value as string) || "system-ui",
        boxSizing: "border-box",
      }}
    />
  </div>
);

// ── Toggle ────────────────────────────────────────────────────────────────────
export const ToggleControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  const on = Boolean(value);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 0",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{ color: T.textSecondary, fontSize: 13 }}>{control.label}</span>
      <div
        onClick={() => onChange(!on)}
        style={{
          width: 42,
          height: 24,
          borderRadius: 12,
          backgroundColor: on ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.14)",
          position: "relative",
          cursor: "pointer",
          flexShrink: 0,
          border: `1px solid ${on ? "transparent" : "rgba(255,255,255,0.1)"}`,
        }}
      >
        <div style={{
          position: "absolute",
          top: 2,
          left: on ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: on ? "#000000" : "rgba(255,255,255,0.55)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        }} />
      </div>
    </div>
  );
};

// ── Dispatcher ────────────────────────────────────────────────────────────────
export const renderControl = (
  control: Control,
  value: unknown,
  onChange: (v: unknown) => void,
): React.ReactElement => {
  switch (control.type) {
    case "color":   return <ColorControl  key={control.key} control={control} value={value} onChange={onChange} />;
    case "number":  return <SliderControl key={control.key} control={control} value={value} onChange={onChange} />;
    case "boolean": return <ToggleControl key={control.key} control={control} value={value} onChange={onChange} />;
    case "font":    return <FontControl   key={control.key} control={control} value={value} onChange={onChange} />;
    default:        return <TextControl   key={control.key} control={control} value={value} onChange={onChange} />;
  }
};

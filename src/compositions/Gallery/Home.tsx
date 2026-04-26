import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React, { useState, useMemo } from "react";
import { REGISTRY, type CompositionDef } from "./compositionRegistry";
import { renderControl } from "./controls";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bg:            "#090909",
  panel:         "#0f0f0f",
  surface:       "rgba(255,255,255,0.04)",
  border:        "rgba(255,255,255,0.07)",
  borderStrong:  "rgba(255,255,255,0.12)",
  text:          "#ffffff",
  textSecondary: "rgba(255,255,255,0.48)",
  textTertiary:  "rgba(255,255,255,0.26)",
};

const PANEL_WIDTH   = 356;              // px — left editor sidebar
const PREVIEW_SCALE = (1080 - PANEL_WIDTH) / 1080;   // ≈ 0.67
const PREVIEW_W     = Math.round(1080 * PREVIEW_SCALE); // 724
const PREVIEW_H     = Math.round(1920 * PREVIEW_SCALE); // 1283

// ── Landing: single template card ─────────────────────────────────────────────
const TemplateCard: React.FC<{
  def:      CompositionDef;
  index:    number;
  onSelect: () => void;
  disabled?: boolean;
}> = ({ def, index, onSelect, disabled }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - index * 9, fps, config: { damping: 15, stiffness: 75 } });
  const y = (1 - entrance) * 36;

  return (
    <div
      onClick={disabled ? undefined : onSelect}
      style={{
        opacity: disabled ? 0.35 : entrance,
        transform: `translateY(${disabled ? 0 : y}px)`,
        display: "flex",
        alignItems: "center",
        gap: 26,
        padding: "26px 30px",
        background: disabled ? "rgba(255,255,255,0.02)" : T.surface,
        backdropFilter: "blur(20px)",
        borderRadius: 22,
        border: `1px solid ${disabled ? "rgba(255,255,255,0.04)" : T.border}`,
        cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Icon pill */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: def.color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        flexShrink: 0,
        boxShadow: disabled ? "none" : `0 4px 12px ${def.color}44`,
        filter: disabled ? "grayscale(1)" : "none",
      }}>
        {def.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: T.text, fontSize: 24, fontWeight: 600, marginBottom: 4 }}>{def.title}</div>
        <div style={{ color: T.textSecondary, fontSize: 15, lineHeight: 1.45 }}>{def.description}</div>
      </div>

      {/* Chevron or "Coming soon" badge */}
      {disabled ? (
        <div style={{
          color: T.textTertiary,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          Coming soon
        </div>
      ) : (
        <div style={{ color: T.textTertiary, fontSize: 26, lineHeight: 1, flexShrink: 0 }}>›</div>
      )}
    </div>
  );
};

// ── Landing page (no template selected) ───────────────────────────────────────
const Landing: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = spring({ frame, fps, config: { damping: 14, stiffness: 60 } });

  const comingSoon: CompositionDef[] = [
    {
      id: "CinematicTitles", title: "Cinematic Titles",
      description: "Dynamic text animations with cinematic lighting effects.",
      color: "#E50914", icon: "🎬",
      component: () => null, defaultProps: {},
      durationInFrames: 150, fps: 30, controls: [],
    },
    {
      id: "DataViz", title: "Data Visualization",
      description: "Interactive charts and graphs for video dashboards.",
      color: "#007AFF", icon: "📊",
      component: () => null, defaultProps: {},
      durationInFrames: 150, fps: 30, controls: [],
    },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: T.bg,
      padding: "72px 60px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Background glow orbs */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 480, height: 480,
        background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 120, left: -60,
        width: 360, height: 360,
        background: "radial-gradient(circle, rgba(29,185,84,0.07) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          opacity: header,
          transform: `translateY(${(1 - header) * -20}px)`,
          marginBottom: 60,
        }}>
          <div style={{
            color: T.textTertiary,
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Remotion Studio
          </div>
          <h1 style={{
            color: T.text,
            fontSize: 68, fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}>
            Templates
          </h1>
          <p style={{ color: T.textSecondary, fontSize: 20, marginTop: 14, lineHeight: 1.5 }}>
            Select a template to start editing.
          </p>
        </div>

        {/* Active templates */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {REGISTRY.map((def, i) => (
            <TemplateCard key={def.id} def={def} index={i} onSelect={() => onSelect(def.id)} />
          ))}
          {comingSoon.map((def, i) => (
            <TemplateCard key={def.id} def={def} index={REGISTRY.length + i} onSelect={() => {}} disabled />
          ))}
        </div>

        <div style={{
          marginTop: 64,
          color: T.textTertiary,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          v1.0.0 · Powered by Remotion
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Editor view (template selected) ──────────────────────────────────────────
const Editor: React.FC<{
  def:          CompositionDef;
  props:        Record<string, unknown>;
  onUpdateProp: (key: string, value: unknown) => void;
  onBack:       () => void;
}> = ({ def, props, onUpdateProp, onBack }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Composition, setComposition] = useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    def.loadComponent().then(c => setComposition(() => c));
  }, [def]);

  // Group controls once — stable because def comes from static registry
  const groups = useMemo(() => {
    const map = new Map<string, typeof def.controls>();
    for (const ctrl of def.controls) {
      const list = map.get(ctrl.group) ?? [];
      list.push(ctrl);
      map.set(ctrl.group, list);
    }
    return Array.from(map.entries());
  }, [def.controls]);

  return (
    <AbsoluteFill style={{
      backgroundColor: T.bg,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      flexDirection: "row",
    }}>

      {/* ── Left: parameter panel ────────────────────────────────────────────── */}
      <div style={{
        width: PANEL_WIDTH,
        height: "100%",
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        backgroundColor: T.panel,
      }}>

        {/* Top bar */}
        <div style={{
          height: 68,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: `1px solid ${T.border}`,
          flexShrink: 0,
        }}>
          {/* Back button */}
          <div
            onClick={onBack}
            style={{
              width: 30, height: 30,
              borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${T.border}`,
              display: "flex", justifyContent: "center", alignItems: "center",
              cursor: "pointer",
              fontSize: 17, color: T.text,
              flexShrink: 0,
              userSelect: "none",
            }}
          >
            ‹
          </div>

          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: 7,
              backgroundColor: def.color,
              display: "flex", justifyContent: "center", alignItems: "center",
              fontSize: 14, flexShrink: 0,
              boxShadow: `0 2px 8px ${def.color}44`,
            }}>
              {def.icon}
            </div>
            <span style={{
              color: T.text,
              fontSize: 14,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {def.title}
            </span>
          </div>
        </div>

        {/* Scrollable controls */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 20px 40px",
        }}>
          {groups.map(([groupName, controls]) => (
            <div key={groupName} style={{ marginTop: 20 }}>
              {/* Section header */}
              <div style={{
                color: T.textTertiary,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                paddingBottom: 8,
                marginBottom: 2,
                borderBottom: `1px solid ${T.borderStrong}`,
              }}>
                {groupName}
              </div>

              {/* Controls */}
              <div>
                {controls.map(ctrl =>
                  renderControl(ctrl, props[ctrl.key], v => onUpdateProp(ctrl.key, v))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: live preview ───────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#060606",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot-grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* Composition preview — clipping wrapper */}
        <div style={{
          position: "relative",
          width: PREVIEW_W,
          height: PREVIEW_H,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          {/* Inner 1080×1920 div scaled down */}
          <div style={{
            width: 1080,
            height: 1920,
            transform: `scale(${PREVIEW_SCALE})`,
            transformOrigin: "top left",
          }}>
            {Composition ? (
              <Composition {...(props as Record<string, unknown>)} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#060606" }} />
            )}
          </div>
        </div>

        {/* "Live Preview" pill */}
        <div style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "5px 14px",
          color: T.textTertiary,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          Live Preview
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Root export ───────────────────────────────────────────────────────────────
export const Home: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Per-composition prop overrides; falls back to registry defaults when pristine
  const [propsStore, setPropsStore] = useState<Record<string, Record<string, unknown>>>({});

  const selectedDef  = selectedId ? REGISTRY.find(d => d.id === selectedId) ?? null : null;
  const currentProps = selectedDef
    ? (propsStore[selectedId!] ?? selectedDef.defaultProps)
    : {};

  const handleUpdateProp = (key: string, value: unknown) => {
    setPropsStore(prev => ({
      ...prev,
      [selectedId!]: {
        ...(prev[selectedId!] ?? selectedDef!.defaultProps),
        [key]: value,
      },
    }));
  };

  if (selectedDef) {
    return (
      <Editor
        def={selectedDef}
        props={currentProps}
        onUpdateProp={handleUpdateProp}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return <Landing onSelect={setSelectedId} />;
};

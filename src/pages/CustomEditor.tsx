import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player, type PlayerRef } from "@remotion/player";
import * as BabelStandalone from "@babel/standalone";
import * as React from "react";
import * as Remotion from "remotion";

const C = {
  bg:     "#000000",
  panel:  "#0a0a0a",
  border: "rgba(255,255,255,0.07)",
  muted:  "rgba(255,255,255,0.45)",
  mono:   "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
};

type CompileResult =
  | { ok: true; Component: React.ComponentType<Record<string, unknown>> }
  | { ok: false; error: string };

function compileJSX(code: string): CompileResult {
  try {
    const transformed = BabelStandalone.transform(code, {
      presets: ["react"],
      plugins: [],
    }).code ?? "";

    // Strip static import lines — we inject the modules manually
    const stripped = transformed
      .split("\n")
      .filter(line => !line.trimStart().startsWith("import ") && !line.trimStart().startsWith('"use strict"'))
      .join("\n");

    // Replace export default with a variable assignment
    const withExport = stripped.replace(/export\s+default\s+/, "var __default = ");

    // eslint-disable-next-line no-new-func
    const fn = new Function(
      "React",
      "remotion",
      "useCurrentFrame",
      "useVideoConfig",
      "AbsoluteFill",
      "interpolate",
      "spring",
      `${withExport}\nreturn __default;`
    );

    const Component = fn(
      React,
      Remotion,
      Remotion.useCurrentFrame,
      Remotion.useVideoConfig,
      Remotion.AbsoluteFill,
      Remotion.interpolate,
      Remotion.spring,
    ) as React.ComponentType<Record<string, unknown>>;

    if (typeof Component !== "function") {
      return { ok: false, error: "File must export a default React component function." };
    }

    return { ok: true, Component };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export default function CustomEditor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(() => sessionStorage.getItem("customJsx") ?? "");
  const [name] = useState(() => sessionStorage.getItem("customJsxName") ?? "Custom");
  const [result, setResult] = useState<CompileResult | null>(null);
  const playerRef = useRef<PlayerRef>(null);

  const compile = useCallback(() => {
    if (!code.trim()) return;
    setResult(compileJSX(code));
  }, [code]);

  useEffect(() => { compile(); }, []);  // compile on mount

  if (!code) {
    return (
      <div style={{
        minHeight: "100vh", background: C.bg, color: "#fff",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🎬</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>No component loaded</div>
        <button
          onClick={() => navigate("/")}
          style={{
            all: "unset", cursor: "pointer",
            padding: "10px 22px", borderRadius: 10,
            background: "#fff", color: "#000",
            fontSize: 13, fontWeight: 600,
          }}
        >
          ← Back to templates
        </button>
      </div>
    );
  }

  const fps = 30;
  const durationInFrames = 150;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        padding: "16px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              all: "unset", cursor: "pointer",
              width: 30, height: 30, borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: C.muted,
            }}
          >←</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>📄</div>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{name}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={compile}
            style={{
              all: "unset", cursor: "pointer",
              padding: "8px 18px", borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              fontSize: 12, fontWeight: 600, color: C.muted,
            }}
          >
            ↻ Recompile
          </button>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: code editor */}
        <div style={{
          width: "45%", minWidth: 320, flexShrink: 0,
          display: "flex", flexDirection: "column",
          borderRight: `1px solid ${C.border}`,
        }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: `1px solid ${C.border}`,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
          }}>
            Source
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1, resize: "none", border: "none", outline: "none",
              background: "#060606",
              color: "rgba(255,255,255,0.75)",
              fontFamily: C.mono,
              fontSize: 12, lineHeight: 1.7,
              padding: "16px 18px",
            }}
          />
          {result && !result.ok && (
            <div style={{
              padding: "10px 16px",
              background: "rgba(255,80,80,0.08)",
              borderTop: "1px solid rgba(255,80,80,0.2)",
              fontSize: 11, color: "#ff6060",
              fontFamily: C.mono, lineHeight: 1.5,
            }}>
              {result.error}
            </div>
          )}
        </div>

        {/* Right: preview */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#050505", gap: 20, padding: 32,
        }}>
          {result?.ok ? (
            <>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                maxWidth: "100%",
              }}>
                <Player
                  ref={playerRef}
                  component={result.Component}
                  inputProps={{}}
                  durationInFrames={durationInFrames}
                  fps={fps}
                  compositionWidth={1080}
                  compositionHeight={1080}
                  style={{ width: 400, height: 400 }}
                  controls
                  loop
                  playbackRate={1}
                  initiallyShowControls
                />
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.2)",
                fontFamily: C.mono,
              }}>
                {durationInFrames} frames · {fps} fps · {(durationInFrames / fps).toFixed(1)}s
              </div>
            </>
          ) : (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 12,
              color: "rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontSize: 48 }}>🎬</div>
              <div style={{ fontSize: 14 }}>Edit your code and click Recompile to preview</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

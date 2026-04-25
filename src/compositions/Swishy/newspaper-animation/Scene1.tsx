// Template: newspaper-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  tag: { type: "text", label: "Tag", value: "VOX STYLE EXPLAINER" },
  section: { type: "text", label: "Section", value: "MYSURU DASARA FESTIVAL" },
  title: { type: "text", label: "Headline", value: "Mysuru Dasara: A Royal City in Ritual" },
  subtitle: { type: "text", label: "Subhead", value: "A 10‑day celebration where palace, procession, and public memory move as one." },
  tagDetail: { type: "text", label: "Deck", value: "From the torchlit Palace illumination to the grand Jamboo Savari, Dasara turns Mysuru into a living documentary of power, devotion, and civic choreography." },
  byline: { type: "text", label: "Byline", value: "Explainer Desk" },
  date: { type: "text", label: "Date", value: "2024" },
  bodyCol1: { type: "multilineText", label: "Body Column 1", value: "The Wodeyar dynasty shaped Dasara as a civic ritual of legitimacy.\nNine nights honor the goddess Chamundeshwari on the hill above the city.\nEvery day has a theme — from royal court to folk arts.\nMarkets, craft bazaars, and food streets act as parallel stages.\nSecurity, transport, and sanitation become a temporary mega‑city." },
  bodyCol2: { type: "multilineText", label: "Body Column 2", value: "The Jamboo Savari procession is the cinematic climax.\nA golden howdah carries the idol through a choreographed route.\nHundreds of artists, elephants, and cavalry fill the frame.\nIlluminations sync the palace to nightly crowds and drone shots.\nTourism peaks, but the ritual remains intensely local." },
  pullQuote: { type: "text", label: "Pull Quote", value: "Dasara is not just a festival — it is a live broadcast of heritage, power, and public space." },
  stat1Value: { type: "text", label: "Stat 1 Value", value: "10 DAYS" },
  stat1Label: { type: "text", label: "Stat 1 Label", value: "Ritual Sequence" },
  stat2Value: { type: "text", label: "Stat 2 Value", value: "200+" },
  stat2Label: { type: "text", label: "Stat 2 Label", value: "Cultural Performances" },
  stat3Value: { type: "text", label: "Stat 3 Value", value: "1 CITY" },
  stat3Label: { type: "text", label: "Stat 3 Label", value: "Transformed Nightly" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#f2e6d4" },
  textColor: { type: "color", label: "Text", value: "#2a2219" },
  subtitleColor: { type: "color", label: "Secondary Text", value: "#6a5f54" },
  highlightColor: { type: "color", label: "Highlight", value: "#d6b15b" },
  gridColor: { type: "color", label: "Grid", value: "#cdbfae" },
  quoteBgColor: { type: "color", label: "Quote Background", value: "#eadfc8" },
  quoteTextColor: { type: "color", label: "Quote Text", value: "#3a3128" },
  statBgColor: { type: "color", label: "Stat Background", value: "#efe2c6" },
  gridOpacity: { type: "number", label: "Grid Opacity", value: 0.14, min: 0, max: 1, step: 0.05 },
  gridSize: { type: "number", label: "Grid Size", value: 64, min: 24, max: 140, step: 2 },
  gridLineWidth: { type: "number", label: "Grid Line Width", value: 1, min: 0.5, max: 3, step: 0.5 },
  vignetteColor: { type: "color", label: "Vignette Color", value: "#1f1a15" },
  vignetteOpacity: { type: "number", label: "Vignette Opacity", value: 0.2, min: 0, max: 1, step: 0.05 },
  lightSweepColor: { type: "color", label: "Light Sweep", value: "#f6e7be" },
  lightSweepOpacity: { type: "number", label: "Light Sweep Opacity", value: 0.06, min: 0, max: 0.3, step: 0.02 },
  grainOpacity: { type: "number", label: "Grain Opacity", value: 0.12, min: 0, max: 0.4, step: 0.02 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;

  const animationWindow = durationInFrames * 0.78;
  const adjustedFrame = (frame / animationWindow) * 120 * speed;

  const tagProgress = spring({ frame: Math.max(0, adjustedFrame - 6), fps, config: { damping: 24, stiffness: 80 } });
  const sectionProgress = spring({ frame: Math.max(0, adjustedFrame - 12), fps, config: { damping: 24, stiffness: 80 } });
  const titleProgress = spring({ frame: Math.max(0, adjustedFrame - 18), fps, config: { damping: 22, stiffness: 90 } });
  const highlightProgress = interpolate(adjustedFrame, [22, 52], [0, 1], { extrapolateRight: "clamp" });
  const subtitleProgress = spring({ frame: Math.max(0, adjustedFrame - 36), fps, config: { damping: 24, stiffness: 80 } });
  const tagDetailProgress = spring({ frame: Math.max(0, adjustedFrame - 42), fps, config: { damping: 24, stiffness: 80 } });
  const bylineProgress = spring({ frame: Math.max(0, adjustedFrame - 46), fps, config: { damping: 24, stiffness: 80 } });
  const dateProgress = spring({ frame: Math.max(0, adjustedFrame - 50), fps, config: { damping: 24, stiffness: 80 } });

  const gridSize = SCENE_PARAMS.gridSize.value;
  const lineWidth = SCENE_PARAMS.gridLineWidth.value;
  const horizontalLines = Math.ceil(height / gridSize) + 1;
  const verticalLines = Math.ceil(width / gridSize) + 1;

  const headlineWidth = width * 0.84;
  const highlightHeight = minDim * 0.09;

  const col1Lines = SCENE_PARAMS.bodyCol1.value.split("\n");
  const col2Lines = SCENE_PARAMS.bodyCol2.value.split("\n");
  const bodyStart = 64;
  const lineStagger = 5;

  const statsStart = 110;
  const statProgress = spring({ frame: Math.max(0, adjustedFrame - statsStart), fps, config: { damping: 18, stiffness: 120 } });

  const sweepX = interpolate(frame * speed, [0, durationInFrames * speed], [-0.4 * width, 1.2 * width], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <AbsoluteFill style={{ opacity: SCENE_PARAMS.gridOpacity.value }}>
        <svg width={width} height={height} style={{ width: "100%", height: "100%" }}>
          {Array.from({ length: horizontalLines }).map((_, i) => {
            const y = i * gridSize;
            return (
              <line
                key={"h" + i}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke={SCENE_PARAMS.gridColor.value}
                strokeWidth={lineWidth}
              />
            );
          })}
          {Array.from({ length: verticalLines }).map((_, i) => {
            const x = i * gridSize;
            return (
              <line
                key={"v" + i}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke={SCENE_PARAMS.gridColor.value}
                strokeWidth={lineWidth}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      <div style={{
        position: "absolute",
        left: "8%",
        top: "9%",
        width: "84%",
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "left top"
      }}>
        <div style={{
          fontSize: minDim * 0.022,
          letterSpacing: "0.16em",
          color: SCENE_PARAMS.subtitleColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          textTransform: "uppercase",
          opacity: tagProgress,
          transform: "translateY(" + interpolate(tagProgress, [0, 1], [5, 0], { extrapolateRight: "clamp" }) + "px)"
        }}>{SCENE_PARAMS.tag.value}</div>

        <div style={{
          fontSize: minDim * 0.02,
          letterSpacing: "0.14em",
          color: SCENE_PARAMS.subtitleColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          textTransform: "uppercase",
          marginTop: minDim * 0.012,
          opacity: sectionProgress,
          transform: "translateY(" + interpolate(sectionProgress, [0, 1], [5, 0], { extrapolateRight: "clamp" }) + "px)"
        }}>{SCENE_PARAMS.section.value}</div>

        <div style={{ position: "relative", width: headlineWidth, marginTop: minDim * 0.018 }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: minDim * 0.014,
            height: highlightHeight,
            width: headlineWidth,
            backgroundColor: SCENE_PARAMS.highlightColor.value,
            transform: "scaleX(" + highlightProgress + ")",
            transformOrigin: "left center"
          }} />
          <div style={{
            position: "relative",
            fontSize: minDim * 0.095,
            fontWeight: 700,
            color: SCENE_PARAMS.textColor.value,
            lineHeight: 1.04,
            opacity: titleProgress,
            transform: "translateY(" + interpolate(titleProgress, [0, 1], [8, 0], { extrapolateRight: "clamp" }) + "px)",
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
          }}>{SCENE_PARAMS.title.value}</div>
        </div>

        <div style={{
          marginTop: minDim * 0.03,
          fontSize: minDim * 0.034,
          color: SCENE_PARAMS.subtitleColor.value,
          maxWidth: "92%",
          opacity: subtitleProgress,
          transform: "translateY(" + interpolate(subtitleProgress, [0, 1], [6, 0], { extrapolateRight: "clamp" }) + "px)",
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
        }}>{SCENE_PARAMS.subtitle.value}</div>

        <div style={{
          marginTop: minDim * 0.02,
          fontSize: minDim * 0.028,
          color: SCENE_PARAMS.subtitleColor.value,
          maxWidth: "90%",
          opacity: tagDetailProgress,
          transform: "translateY(" + interpolate(tagDetailProgress, [0, 1], [6, 0], { extrapolateRight: "clamp" }) + "px)",
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
        }}>{SCENE_PARAMS.tagDetail.value}</div>

        <div style={{
          marginTop: minDim * 0.018,
          display: "flex",
          gap: minDim * 0.03,
          color: SCENE_PARAMS.subtitleColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          fontSize: minDim * 0.022
        }}>
          <div style={{ opacity: bylineProgress, transform: "translateY(" + interpolate(bylineProgress, [0, 1], [4, 0], { extrapolateRight: "clamp" }) + "px)" }}>{SCENE_PARAMS.byline.value}</div>
          <div style={{ opacity: dateProgress, transform: "translateY(" + interpolate(dateProgress, [0, 1], [4, 0], { extrapolateRight: "clamp" }) + "px)" }}>{SCENE_PARAMS.date.value}</div>
        </div>

        <div style={{
          marginTop: minDim * 0.038,
          display: "flex",
          gap: "6%",
          alignItems: "flex-start"
        }}>
          <div style={{ width: "47%" }}>
            {col1Lines.map((line, i) => {
              const lineProgress = spring({ frame: Math.max(0, adjustedFrame - (bodyStart + i * lineStagger)), fps, config: { damping: 22, stiffness: 90 } });
              return (
                <div key={"c1" + i} style={{
                  fontSize: minDim * 0.022,
                  lineHeight: 1.45,
                  color: SCENE_PARAMS.textColor.value,
                  marginBottom: minDim * 0.012,
                  opacity: lineProgress,
                  transform: "translateY(" + interpolate(lineProgress, [0, 1], [6, 0], { extrapolateRight: "clamp" }) + "px)",
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
                }}>{line}</div>
              );
            })}
          </div>

          <div style={{ width: "47%" }}>
            <div style={{
              backgroundColor: SCENE_PARAMS.quoteBgColor.value,
              padding: minDim * 0.02,
              marginBottom: minDim * 0.018,
              opacity: spring({ frame: Math.max(0, adjustedFrame - (bodyStart + 3)), fps, config: { damping: 20, stiffness: 90 } }),
              transform: "translateY(" + interpolate(spring({ frame: Math.max(0, adjustedFrame - (bodyStart + 3)), fps, config: { damping: 20, stiffness: 90 } }), [0, 1], [8, 0], { extrapolateRight: "clamp" }) + "px)"
            }}>
              <div style={{
                fontSize: minDim * 0.026,
                lineHeight: 1.3,
                color: SCENE_PARAMS.quoteTextColor.value,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
              }}>{SCENE_PARAMS.pullQuote.value}</div>
            </div>
            {col2Lines.map((line, i) => {
              const lineProgress = spring({ frame: Math.max(0, adjustedFrame - (bodyStart + 10 + i * lineStagger)), fps, config: { damping: 22, stiffness: 90 } });
              return (
                <div key={"c2" + i} style={{
                  fontSize: minDim * 0.022,
                  lineHeight: 1.45,
                  color: SCENE_PARAMS.textColor.value,
                  marginBottom: minDim * 0.012,
                  opacity: lineProgress,
                  transform: "translateY(" + interpolate(lineProgress, [0, 1], [6, 0], { extrapolateRight: "clamp" }) + "px)",
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
                }}>{line}</div>
              );
            })}
          </div>
        </div>

        <div style={{
          marginTop: minDim * 0.028,
          display: "flex",
          gap: minDim * 0.02,
          opacity: statProgress,
          transform: "translateY(" + interpolate(statProgress, [0, 1], [10, 0], { extrapolateRight: "clamp" }) + "px)"
        }}>
          {[
            { v: SCENE_PARAMS.stat1Value.value, l: SCENE_PARAMS.stat1Label.value },
            { v: SCENE_PARAMS.stat2Value.value, l: SCENE_PARAMS.stat2Label.value },
            { v: SCENE_PARAMS.stat3Value.value, l: SCENE_PARAMS.stat3Label.value }
          ].map((s, i) => (
            <div key={"stat" + i} style={{
              flex: 1,
              backgroundColor: SCENE_PARAMS.statBgColor.value,
              padding: minDim * 0.018
            }}>
              <div style={{
                fontSize: minDim * 0.035,
                fontWeight: 700,
                color: SCENE_PARAMS.textColor.value,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
              }}>{s.v}</div>
              <div style={{
                fontSize: minDim * 0.02,
                color: SCENE_PARAMS.subtitleColor.value,
                marginTop: minDim * 0.006,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <AbsoluteFill style={{
        backgroundImage: "radial-gradient(circle at center, rgba(0,0,0,0) 45%, " + SCENE_PARAMS.vignetteColor.value + " 100%)",
        opacity: SCENE_PARAMS.vignetteOpacity.value
      }} />

      <AbsoluteFill>
        <div style={{
          position: "absolute",
          top: "-10%",
          left: sweepX,
          width: "35%",
          height: "120%",
          transform: "rotate(-10deg)",
          background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, " + SCENE_PARAMS.lightSweepColor.value + " 50%, rgba(0,0,0,0) 100%)",
          opacity: SCENE_PARAMS.lightSweepOpacity.value
        }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: SCENE_PARAMS.grainOpacity.value }}>
        <svg width={width} height={height} style={{ width: "100%", height: "100%" }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed={Math.floor(frame * speed)} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width={width} height={height} filter="url(#noiseFilter)" opacity="0.6" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export default Scene;

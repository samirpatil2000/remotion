// Template: generate-ai-voice-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Generate AI Voice" },
  subtitle: { type: "text", label: "Subtitle", value: "Instant speech from any script" },
  cta: { type: "text", label: "CTA", value: "Try it now" },
  voiceoverText: { type: "multilineText", label: "AI Voice Script", value: "Generate AI voice from your text with natural tone and clarity." },
  fontFamily: { type: "font", label: "Font", value: "Space Grotesk" },
  backgroundColor: { type: "color", label: "Background", value: "#0b1020" },
  primaryColor: { type: "color", label: "Primary", value: "#e2e8f0" },
  secondaryColor: { type: "color", label: "Secondary", value: "#94a3b8" },
  accentColor: { type: "color", label: "Accent", value: "#22d3ee" },
  glowColor: { type: "color", label: "Glow", value: "#7c3aed" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  barCount: { type: "number", label: "Bar Count", value: 18, min: 8, max: 30, step: 1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  const animationWindow = durationInFrames * 0.65;
  const normalizedFrame = (adjustedFrame / animationWindow) * 60;

  const titleProgress = spring({ frame: normalizedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const subtitleProgress = spring({ frame: Math.max(0, normalizedFrame - 12), fps, config: { damping: 20, stiffness: 90 } });
  const ctaProgress = spring({ frame: Math.max(0, normalizedFrame - 24), fps, config: { damping: 18, stiffness: 120 } });

  const titleY = interpolate(titleProgress, [0, 1], [20, 0], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [16, 0], { extrapolateRight: "clamp" });
  const ctaY = interpolate(ctaProgress, [0, 1], [12, 0], { extrapolateRight: "clamp" });

  const barCount = Math.round(SCENE_PARAMS.barCount.value);
  const barWidth = (width * 0.7) / barCount;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        position: "absolute",
        right: "-8%",
        top: "-10%",
        width: minDim * 0.7,
        height: minDim * 0.7,
        borderRadius: "50%",
        backgroundColor: SCENE_PARAMS.glowColor.value,
        opacity: 0.12,
        filter: "blur(" + minDim * 0.03 + "px)"
      }} />

      <div style={{
        position: "absolute",
        left: "8%",
        top: "38%",
        transform: "translateY(-50%) scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "left center",
        width: "84%"
      }}>
        <div style={{
          fontSize: minDim * 0.09,
          fontWeight: 700,
          color: SCENE_PARAMS.primaryColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: titleProgress,
          transform: "translateY(" + titleY + "px)"
        }}>{SCENE_PARAMS.title.value}</div>

        <div style={{
          marginTop: minDim * 0.02,
          fontSize: minDim * 0.04,
          fontWeight: 500,
          color: SCENE_PARAMS.secondaryColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: subtitleProgress,
          transform: "translateY(" + subtitleY + "px)"
        }}>{SCENE_PARAMS.subtitle.value}</div>

        <div style={{
          marginTop: minDim * 0.03,
          display: "inline-block",
          padding: minDim * 0.012 + "px " + minDim * 0.03 + "px",
          borderRadius: minDim * 0.04,
          backgroundColor: SCENE_PARAMS.accentColor.value,
          color: "#0b1020",
          fontSize: minDim * 0.032,
          fontWeight: 700,
          letterSpacing: 0.2,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: ctaProgress,
          transform: "translateY(" + ctaY + "px)"
        }}>{SCENE_PARAMS.cta.value}</div>
      </div>

      <div style={{
        position: "absolute",
        left: "50%",
        bottom: "10%",
        transform: "translateX(-50%)",
        width: "70%",
        height: minDim * 0.16,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: barWidth * 0.25
      }}>
        {Array.from({ length: barCount }).map((_, i) => {
          const phase = i * 0.45;
          const base = minDim * 0.025;
          const amp = minDim * 0.09;
          const wave = (Math.sin((frame * 0.15 * speed) + phase) + 1) / 2;
          const barHeight = base + wave * amp;
          const opacity = 0.5 + wave * 0.5;

          return (
            <div
              key={i}
              style={{
                width: barWidth * 0.55,
                height: barHeight,
                borderRadius: barWidth * 0.3,
                backgroundColor: SCENE_PARAMS.accentColor.value,
                opacity
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

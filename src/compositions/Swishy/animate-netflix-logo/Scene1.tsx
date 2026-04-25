// Template: animate-netflix-logo
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoText: { type: "text", label: "Logo Text", value: "NETFLIX" },
  fontFamily: { type: "font", label: "Font", value: "Oswald" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  primaryColor: { type: "color", label: "Primary", value: "#e50914" },
  accentColor: { type: "color", label: "Accent", value: "#e50914" },
  shadowColor: { type: "color", label: "Shadow", value: "#b20710" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;

  const animationWindow = durationInFrames * 0.7;
  const adjustedFrame = (frame / animationWindow) * 60 * speed;

  const bar1 = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 120 } });
  const bar2 = spring({ frame: Math.max(0, adjustedFrame - 8), fps, config: { damping: 20, stiffness: 120 } });
  const bar3 = spring({ frame: Math.max(0, adjustedFrame - 16), fps, config: { damping: 20, stiffness: 120 } });

  const textIn = spring({ frame: Math.max(0, adjustedFrame - 26), fps, config: { damping: 18, stiffness: 100 } });

  const nWidth = minDim * 0.2;
  const nHeight = minDim * 0.45;
  const barWidth = nWidth * 0.28;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        width: nWidth,
        height: nHeight
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: barWidth,
          height: nHeight,
          backgroundColor: SCENE_PARAMS.accentColor.value,
          borderRadius: barWidth * 0.15,
          opacity: bar1,
          transform: "translateY(" + interpolate(bar1, [0,1], [nHeight * 0.15, 0], { extrapolateRight: "clamp" }) + "px)"
        }} />
        <div style={{
          position: "absolute",
          left: nWidth * 0.36,
          top: 0,
          width: barWidth,
          height: nHeight,
          backgroundColor: SCENE_PARAMS.accentColor.value,
          borderRadius: barWidth * 0.15,
          opacity: bar2,
          transform: "skewX(18deg) translateY(" + interpolate(bar2, [0,1], [nHeight * 0.2, 0], { extrapolateRight: "clamp" }) + "px)"
        }} />
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: barWidth,
          height: nHeight,
          backgroundColor: SCENE_PARAMS.accentColor.value,
          borderRadius: barWidth * 0.15,
          opacity: bar3,
          transform: "translateY(" + interpolate(bar3, [0,1], [nHeight * 0.15, 0], { extrapolateRight: "clamp" }) + "px)"
        }} />
        <div style={{
          position: "absolute",
          left: nWidth * 0.06,
          top: nHeight * 0.04,
          width: nWidth * 0.88,
          height: nHeight * 0.92,
          backgroundColor: SCENE_PARAMS.shadowColor.value,
          opacity: interpolate(bar3, [0,1], [0, 0.35], { extrapolateRight: "clamp" }),
          transform: "translate(" + (nWidth * 0.02) + "px, " + (nHeight * 0.02) + "px)"
        }} />
      </div>

      <div style={{
        position: "absolute",
        left: "50%",
        top: "72%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        opacity: textIn
      }}>
        <div style={{
          fontSize: minDim * 0.07,
          letterSpacing: minDim * 0.004,
          color: SCENE_PARAMS.primaryColor.value,
          fontWeight: 600,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          transform: "translateY(" + interpolate(textIn, [0,1], [12, 0], { extrapolateRight: "clamp" }) + "px)"
        }}>{SCENE_PARAMS.logoText.value}</div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

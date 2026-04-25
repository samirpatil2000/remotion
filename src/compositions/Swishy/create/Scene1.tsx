// Template: create
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  coreText: { type: "text", label: "Core Text", value: "create" },
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  primaryColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const animationWindow = durationInFrames * 0.7;
  const adjustedFrame = (frame / animationWindow) * 60 * speed;

  const letters = SCENE_PARAMS.coreText.value.split("");
  const offsets = [
    { x: -minDim * 0.12, y: -minDim * 0.05, r: -6 },
    { x: -minDim * 0.06, y: minDim * 0.08, r: 4 },
    { x: minDim * 0.02, y: -minDim * 0.07, r: -3 },
    { x: minDim * 0.08, y: minDim * 0.04, r: 5 },
    { x: minDim * 0.14, y: -minDim * 0.02, r: -4 },
    { x: minDim * 0.18, y: minDim * 0.06, r: 3 }
  ];

  const blobProgress = spring({ frame: Math.max(0, adjustedFrame - 5), fps, config: { damping: 20, stiffness: 90 } });
  const blobScale = interpolate(blobProgress, [0, 1], [0.7, 1.15], { extrapolateRight: "clamp" });
  const blobOpacity = interpolate(blobProgress, [0, 1], [0, 0.12], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ position: "absolute", inset: 0, transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: minDim * 0.42,
          height: minDim * 0.42,
          borderRadius: "50%",
          backgroundColor: SCENE_PARAMS.accentColor.value,
          transform: "translate(-50%, -50%) scale(" + blobScale + ")",
          opacity: blobOpacity,
          filter: "blur(" + (minDim * 0.02) + "px)"
        }} />

        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", display: "flex" }}>
          {letters.map((letter, i) => {
            const delay = i * 6;
            const progress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 18, stiffness: 120 } });
            const offset = offsets[i % offsets.length];
            const x = interpolate(progress, [0, 1], [offset.x, 0], { extrapolateRight: "clamp" });
            const y = interpolate(progress, [0, 1], [offset.y, 0], { extrapolateRight: "clamp" });
            const r = interpolate(progress, [0, 1], [offset.r, 0], { extrapolateRight: "clamp" });
            const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
            const blur = interpolate(progress, [0, 1], [minDim * 0.01, 0], { extrapolateRight: "clamp" });

            return (
              <span key={i} style={{
                fontSize: minDim * 0.12,
                fontWeight: 600,
                color: SCENE_PARAMS.primaryColor.value,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                display: "inline-block",
                opacity,
                transform: "translate(" + x + "px, " + y + "px) rotate(" + r + "deg)",
                filter: "blur(" + blur + "px)"
              }}>
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

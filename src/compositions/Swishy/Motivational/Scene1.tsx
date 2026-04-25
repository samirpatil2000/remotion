// Template: motivational
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  word1: { type: "text", label: "Word 1", value: "The" },
  word2: { type: "text", label: "Word 2", value: "Big" },
  word3: { type: "text", label: "Word 3", value: "Idea" },
  fontFamily: { type: "font", label: "Font", value: "Bebas Neue" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 10, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 22, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const words = [
    { text: SCENE_PARAMS.word1.value, size: 0.07, delay: 0, color: SCENE_PARAMS.textColor.value, weight: 700 },
    { text: SCENE_PARAMS.word2.value, size: 0.14, delay: SCENE_PARAMS.staggerDelay.value, color: SCENE_PARAMS.accentColor.value, weight: 900 },
    { text: SCENE_PARAMS.word3.value, size: 0.09, delay: SCENE_PARAMS.staggerDelay.value * 2, color: SCENE_PARAMS.textColor.value, weight: 700 }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: minDim * 0.02 }}>
          {words.map((w, i) => {
            const progress = spring({ frame: Math.max(0, adjustedFrame - w.delay), fps, config: { damping: 20, stiffness: 90 } });
            const slideY = interpolate(progress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
            const opacity = interpolate(progress, [0, 1], [0, SCENE_PARAMS.opacity.value], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                fontSize: minDim * w.size,
                fontWeight: w.weight,
                color: w.color,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                opacity: opacity,
                transform: "translateY(" + slideY + "px)",
                lineHeight: 1
              }}>
                {w.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

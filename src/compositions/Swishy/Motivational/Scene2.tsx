// Template: motivational
// Description: No description available
// Scene: Scene 2

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  word1: { type: "text", label: "Word 1", value: "Build" },
  word2: { type: "text", label: "Word 2", value: "the" },
  word3: { type: "text", label: "Word 3", value: "narrative" },
  supporting: { type: "text", label: "Supporting Text", value: "Supporting context" },
  headingFont: { type: "font", label: "Heading Font", value: "Outfit" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#6b7280" },
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

  const baseX = width * 0.18;
  const baseY = height * 0.34;

  const words = [
    { text: SCENE_PARAMS.word1.value, size: 0.085, weight: 700, delay: 0 },
    { text: SCENE_PARAMS.word2.value, size: 0.05, weight: 500, delay: SCENE_PARAMS.staggerDelay.value },
    { text: SCENE_PARAMS.word3.value, size: 0.12, weight: 800, delay: SCENE_PARAMS.staggerDelay.value * 2 }
  ];

  const supportDelay = SCENE_PARAMS.staggerDelay.value * 3 + 6;
  const supportProgress = spring({ frame: Math.max(0, adjustedFrame - supportDelay), fps, config: { damping: 25, stiffness: 80 } });
  const supportY = interpolate(supportProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "left top" }}>
        {words.map((w, i) => {
          const progress = spring({ frame: Math.max(0, adjustedFrame - w.delay), fps, config: { damping: 20, stiffness: 90 } });
          const slideY = interpolate(progress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              position: "absolute",
              left: baseX,
              top: baseY + i * (minDim * 0.09),
              fontSize: minDim * w.size,
              fontWeight: w.weight,
              color: SCENE_PARAMS.textColor.value,
              fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif",
              opacity: progress * SCENE_PARAMS.opacity.value,
              transform: "translateY(" + slideY + "px)",
              lineHeight: 1.05,
              filter: "blur(" + SCENE_PARAMS.blur.value + "px)"
            }}>
              {w.text}
            </div>
          );
        })}

        <div style={{
          position: "absolute",
          left: baseX,
          top: baseY + minDim * 0.3,
          fontSize: minDim * 0.032,
          fontWeight: 500,
          color: SCENE_PARAMS.accentColor.value,
          fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
          opacity: supportProgress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + supportY + "px)",
          maxWidth: width * 0.6
        }}>
          {SCENE_PARAMS.supporting.value}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

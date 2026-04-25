// Template: apple-style-30-sec-counter-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  label: { type: "text", label: "Label", value: "" },
  startValue: { type: "number", label: "Start Value", value: 30, min: 1, max: 120, step: 1 },
  countDuration: { type: "number", label: "Count Duration (frames)", value: 900, min: 300, max: 1800, step: 30 },

  // Typography
  headingFont: { type: "font", label: "Number Font", value: "Manrope" },
  bodyFont: { type: "font", label: "Label Font", value: "DM Sans" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary Text", value: "#111827" },
  secondaryColor: { type: "color", label: "Secondary Text", value: "#6b7280" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  barBackgroundColor: { type: "color", label: "Bar Background", value: "#e5e7eb" },
  barFillColor: { type: "color", label: "Bar Fill", value: "#f73b3b" },

  // Transform
  scale: { type: "number", label: "Scale", value: 0.85, min: 0.5, max: 2, step: 0.05 },

  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const slideY = interpolate(entrance, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(entrance, [0, 1], [0, SCENE_PARAMS.opacity.value], { extrapolateRight: "clamp" });
  const scale = interpolate(entrance, [0, 1], [0.96, 1], { extrapolateRight: "clamp" });

  const totalDuration = SCENE_PARAMS.countDuration.value;
  const countProgress = interpolate(adjustedFrame, [0, totalDuration], [0, 1], { extrapolateRight: "clamp" });
  const eased = countProgress * countProgress * (3 - 2 * countProgress);
  const currentValue = Math.max(0, Math.ceil((1 - eased) * SCENE_PARAMS.startValue.value));

  const isPortrait = height > width;
  const numberSize = minDim * (isPortrait ? 0.16 : 0.12);
  const labelSize = minDim * (isPortrait ? 0.032 : 0.026);
  const barWidth = minDim * (isPortrait ? 0.55 : 0.45);
  const barHeight = minDim * (isPortrait ? 0.018 : 0.014);
  const gap = minDim * 0.03;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          opacity,
          transform: "translateY(" + slideY + "px) scale(" + scale + ")",
          filter: SCENE_PARAMS.blur.value > 0 ? "blur(" + SCENE_PARAMS.blur.value + "px)" : "none"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: gap
          }}>
            <div style={{
              fontSize: numberSize,
              fontWeight: 800,
              color: SCENE_PARAMS.textColor.value,
              fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1
            }}>
              {currentValue}
            </div>
            <div style={{
              marginTop: minDim * 0.01,
              fontSize: labelSize,
              fontWeight: 500,
              color: SCENE_PARAMS.secondaryColor.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
              letterSpacing: "0.02em"
            }}>
              {SCENE_PARAMS.label.value}
            </div>
          </div>

          <div style={{
            width: barWidth,
            height: barHeight,
            backgroundColor: SCENE_PARAMS.barBackgroundColor.value
          }}>
            <div style={{
              width: barWidth * eased,
              height: "100%",
              backgroundColor: SCENE_PARAMS.barFillColor.value
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

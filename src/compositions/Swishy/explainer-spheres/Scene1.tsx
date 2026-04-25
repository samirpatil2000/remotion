// Template: explainer-spheres
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Text
  circle1Text: { type: "text", label: "Circle 1", value: "Well-balanced" },
  circle2Text: { type: "multilineText", label: "Circle 2", value: "Professional\nstability" },
  circle3Text: { type: "text", label: "Circle 3", value: "New Growth" },
  circle4Text: { type: "multilineText", label: "Circle 4", value: "Trustwothiness\nmaturity" },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },

  // Colors
  backgroundStart: { type: "color", label: "Background Start", value: "#0b2e5b" },
  backgroundMid: { type: "color", label: "Background Mid", value: "#0c3d73" },
  backgroundEnd: { type: "color", label: "Background End", value: "#9fb0bf" },
  strokeColor: { type: "color", label: "Circle Stroke", value: "#ffffff" },
  textColor: { type: "color", label: "Text", value: "#ffffff" },

  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },

  // Animation Timing
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 10, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 20, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const r = isPortrait ? width * 0.18 : height * 0.22;
  const spacing = r * 1.18;
  const totalWidth = spacing * 3;
  const startX = width / 2 - totalWidth / 2;
  const centerY = height * 0.52;

  const labels = [
    SCENE_PARAMS.circle1Text.value,
    SCENE_PARAMS.circle2Text.value,
    SCENE_PARAMS.circle3Text.value,
    SCENE_PARAMS.circle4Text.value
  ];

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(90deg, " + SCENE_PARAMS.backgroundStart.value + " 0%, " + SCENE_PARAMS.backgroundMid.value + " 55%, " + SCENE_PARAMS.backgroundEnd.value + " 100%)"
    }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0 }}>
          {labels.map((_, i) => {
            const delay = i * SCENE_PARAMS.staggerDelay.value;
            const drawProgress = interpolate(adjustedFrame, [delay, delay + 40], [0, 1], { extrapolateRight: "clamp" });
            const circumference = 2 * Math.PI * r;
            const dashOffset = circumference * (1 - drawProgress);

            const cx = startX + i * spacing;
            return (
              <circle
                key={i}
                cx={cx}
                cy={centerY}
                r={r}
                fill="none"
                stroke={SCENE_PARAMS.strokeColor.value}
                strokeWidth={minDim * 0.0025}
                strokeOpacity={0.55}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {labels.map((label, i) => {
          const delay = i * SCENE_PARAMS.staggerDelay.value + 18;
          const textProgress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
          const slideY = interpolate(textProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
          const cx = startX + i * spacing;

          const lines = label.split("\n");

          return (
            <div key={i} style={{
              position: "absolute",
              left: cx,
              top: centerY,
              transform: "translate(-50%, -50%) translateY(" + slideY + "px)",
              opacity: textProgress * SCENE_PARAMS.opacity.value,
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.032,
              fontWeight: 500,
              color: SCENE_PARAMS.textColor.value,
              textAlign: "center",
              lineHeight: 1.2,
              filter: "blur(" + SCENE_PARAMS.blur.value + "px)",
            }}>
              {lines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: simple-chart
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Chart" },
  metric: { type: "text", label: "Metric", value: "74%" },
  headingFont: { type: "font", label: "Heading Font", value: "Space Grotesk" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary Text", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  secondaryColor: { type: "color", label: "Secondary", value: "#6b7280" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
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
  const isPortrait = height > width;
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const titleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const titleY = interpolate(titleProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const metricProgress = spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 20, stiffness: 90 } });
  const metricY = interpolate(metricProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value * 0.6, 0], { extrapolateRight: "clamp" });

  const lineProgress = interpolate(adjustedFrame, [10, 60], [0, 1], { extrapolateRight: "clamp" });

  const bars = [0.45, 0.7, 0.55, 0.85, 0.6];
  const barMaxHeight = height * (isPortrait ? 0.22 : 0.3);
  const barWidth = width * (isPortrait ? 0.1 : 0.08);
  const barGap = width * (isPortrait ? 0.04 : 0.03);

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", height: "100%", transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{ position: "absolute", top: "8%", left: "8%", opacity: titleProgress, transform: "translateY(" + titleY + "px)" }}>
          <div style={{ fontSize: minDim * 0.08, fontWeight: 700, color: SCENE_PARAMS.textColor.value, fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui" }}>
            {SCENE_PARAMS.title.value}
          </div>
        </div>

        <div style={{ position: "absolute", top: "22%", left: "8%", opacity: metricProgress, transform: "translateY(" + metricY + "px)" }}>
          <div style={{ fontSize: minDim * 0.12, fontWeight: 800, color: SCENE_PARAMS.textColor.value, fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui" }}>
            {SCENE_PARAMS.metric.value}
          </div>
          <div style={{ marginTop: minDim * 0.008, fontSize: minDim * 0.03, fontWeight: 500, color: SCENE_PARAMS.secondaryColor.value, fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui" }}>
            Weekly trend
          </div>
        </div>

        <svg style={{ position: "absolute", left: "6%", top: "40%", width: "88%", height: "25%" }} viewBox={"0 0 " + width + " " + height * 0.25}>
          <path
            d={"M 0 " + height * 0.21 + " Q " + width * 0.2 + " " + height * 0.1 + " " + width * 0.4 + " " + height * 0.16 + " T " + width * 0.7 + " " + height * 0.05 + " T " + width + " " + height * 0.12}
            stroke={SCENE_PARAMS.accentColor.value}
            strokeWidth={3}
            fill="none"
            strokeDasharray={width * 2}
            strokeDashoffset={width * 2 * (1 - lineProgress)}
          />
        </svg>

        <div style={{ position: "absolute", left: "8%", bottom: "10%", display: "flex", alignItems: "flex-end" }}>
          {bars.map((h, i) => {
            const delay = 10 + i * SCENE_PARAMS.staggerDelay.value;
            const barProgress = interpolate(adjustedFrame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            const barHeight = barMaxHeight * h * barProgress;
            return (
              <div key={i} style={{
                width: barWidth,
                height: barHeight,
                marginRight: i === bars.length - 1 ? 0 : barGap,
                backgroundColor: SCENE_PARAMS.accentColor.value,
                borderRadius: barWidth * 0.15,
                opacity: SCENE_PARAMS.opacity.value
              }} />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

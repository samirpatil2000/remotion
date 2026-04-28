// Template: years-rolling-text
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  startYear: { type: "text", label: "Start Year", value: "1990" },
  endYear: { type: "text", label: "End Year", value: "2024" },
  label: { type: "text", label: "Label", value: "years" },
  numberFont: { type: "font", label: "Number Font", value: "Space Grotesk" },
  labelFont: { type: "font", label: "Label Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  const startYear = parseInt((props.startYear ?? SCENE_PARAMS.startYear.value), 10);
  const endYear = parseInt((props.endYear ?? SCENE_PARAMS.endYear.value), 10);
  const yearCount = Math.max(1, endYear - startYear + 1);

  const numberSize = minDim * 0.22;
  const lineHeight = numberSize * 1.05;

  const rollDuration = 60;
  const rollProgress = interpolate(adjustedFrame, [0, rollDuration], [0, 1], { extrapolateRight: "clamp" });
  const eased = rollProgress * rollProgress * (3 - 2 * rollProgress);
  const offset = eased * (yearCount - 1) * lineHeight;

  const entrance = spring({ frame: Math.max(0, adjustedFrame - 5), fps, config: { damping: 20, stiffness: 90 } });
  const slideY = interpolate(entrance, [0, 1], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(entrance, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });

  const years = Array.from({ length: yearCount }, (_, i) => startYear + i);

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: minDim * 0.02, opacity, transform: "translateY(" + slideY + "px)" }}>
          <div style={{ height: lineHeight, overflow: "hidden" }}>
            <div style={{ transform: "translateY(" + (-offset) + "px)", transition: "none" }}>
              {years.map((y, i) => (
                <div key={i} style={{ height: lineHeight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: numberSize, fontWeight: 700, color: (props.textColor ?? SCENE_PARAMS.textColor.value), fontFamily: (props.numberFont ?? SCENE_PARAMS.numberFont.value) + ", system-ui, sans-serif", letterSpacing: -1 }}>
                  {y}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: minDim * 0.04, fontWeight: 600, color: (props.accentColor ?? SCENE_PARAMS.accentColor.value), fontFamily: (props.labelFont ?? SCENE_PARAMS.labelFont.value) + ", system-ui, sans-serif", letterSpacing: 1, textTransform: "lowercase" }}>
            {(props.label ?? SCENE_PARAMS.label.value)}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

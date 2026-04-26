// Template: motivational
// Description: No description available
// Scene: Scene 4

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  message: { type: "text", label: "Final Message", value: "Final Message" },
  headingFont: { type: "font", label: "Heading Font", value: "Playfair Display" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary Text", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 22, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  const opacity = interpolate(adjustedFrame, [8, 28], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });
  const slideY = interpolate(adjustedFrame, [8, 28], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center" }}>
        <div style={{
          fontSize: minDim * 0.085,
          fontWeight: 700,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.headingFont ?? SCENE_PARAMS.headingFont.value) + ", system-ui, serif",
          opacity,
          transform: "translateY(" + slideY + "px)",
          textAlign: "center",
          letterSpacing: 0.2
        }}>
          {(props.message ?? SCENE_PARAMS.message.value)}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

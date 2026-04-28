// Template: motivational
// Description: No description available
// Scene: Scene 3

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  headline: { type: "text", label: "Headline", value: "The Insight" },
  detail: { type: "text", label: "Supporting Detail", value: "Kindness turns motivation into momentum." },
  headingFont: { type: "font", label: "Heading Font", value: "Playfair Display" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  textColor: { type: "color", label: "Primary Text", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 12, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 18, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  const headlineDelay = 0;
  const detailDelay = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);

  const headlineProgress = spring({ frame: Math.max(0, adjustedFrame - headlineDelay), fps, config: { damping: 20, stiffness: 90 } });
  const detailProgress = spring({ frame: Math.max(0, adjustedFrame - detailDelay), fps, config: { damping: 20, stiffness: 90 } });

  const headlineScale = interpolate(headlineProgress, [0, 1], [0.95, 1], { extrapolateRight: "clamp" });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });

  const detailScale = interpolate(detailProgress, [0, 1], [0.96, 1], { extrapolateRight: "clamp" });
  const detailOpacity = interpolate(detailProgress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });

  const layoutTop = isPortrait ? "36%" : "30%";

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{
        position: "absolute",
        left: "10%",
        top: layoutTop,
        width: "80%",
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "left top",
      }}>
        <div style={{
          fontSize: minDim * 0.095,
          fontWeight: 700,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.headingFont ?? SCENE_PARAMS.headingFont.value) + ", system-ui, sans-serif",
          letterSpacing: 0.2,
          opacity: headlineOpacity,
          transform: "scale(" + headlineScale + ")",
          lineHeight: 1.05,
        }}>
          {(props.headline ?? SCENE_PARAMS.headline.value)}
        </div>

        <div style={{
          marginTop: minDim * 0.03,
          fontSize: minDim * 0.038,
          fontWeight: 500,
          color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
          fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", system-ui, sans-serif",
          opacity: detailOpacity,
          transform: "scale(" + detailScale + ")",
          lineHeight: 1.4,
        }}>
          {(props.detail ?? SCENE_PARAMS.detail.value)}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

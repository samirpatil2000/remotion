// Template: copy-and-paste
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  copies: { type: "number", label: "Copies", value: 25, min: 9, max: 64, step: 1 },
  gridColumns: { type: "number", label: "Grid Columns", value: 5, min: 3, max: 8, step: 1 },
  staggerFrames: { type: "number", label: "Stagger (Frames)", value: 3, min: 1, max: 10, step: 1 },
  docSize: { type: "number", label: "Document Size", value: 0.17, min: 0.1, max: 0.25, step: 0.01 },
  spacingScale: { type: "number", label: "Spacing", value: 0.085, min: 0.05, max: 0.14, step: 0.005 },
  fontFamily: { type: "font", label: "Font", value: "Space Grotesk" },
  backgroundColor: { type: "color", label: "Background", value: "#121f45" },
  docColor: { type: "color", label: "Document", value: "#ffffff" },
  docStrokeColor: { type: "color", label: "Outline", value: "#d1d5db" },
  docFoldColor: { type: "color", label: "Fold", value: "#e5e7eb" },
  docLineColor: { type: "color", label: "Lines", value: "#c7cdd6" },
  shadowColor: { type: "color", label: "Shadow", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const copies = Math.round(SCENE_PARAMS.copies.value);
  const columns = Math.round(SCENE_PARAMS.gridColumns.value);
  const rows = Math.ceil(copies / columns);

  const docWidth = minDim * SCENE_PARAMS.docSize.value;
  const docHeight = docWidth * 1.25;
  const spacing = minDim * SCENE_PARAMS.spacingScale.value;

  const startX = -((columns - 1) * spacing) / 2;
  const startY = -((rows - 1) * spacing) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
        perspective: minDim * 2,
      }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotateX(60deg) rotateZ(45deg) scale(" + SCENE_PARAMS.scale.value + ")",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%"
        }}>
          {Array.from({ length: copies }).map((_, i) => {
            const col = i % columns;
            const row = Math.floor(i / columns);
            const baseX = startX + col * spacing;
            const baseY = startY + row * spacing;

            const delay = i * SCENE_PARAMS.staggerFrames.value;
            const progress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 12, stiffness: 180 } });

            const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
            const scale = 0.6 + progress * 0.55;
            const blur = interpolate(progress, [0, 1], [10, 0], { extrapolateRight: "clamp" });
            const driftX = interpolate(progress, [0, 1], [-minDim * 0.05, 0], { extrapolateRight: "clamp" });
            const driftY = interpolate(progress, [0, 1], [minDim * 0.05, 0], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: docWidth,
                height: docHeight,
                opacity,
                transform: "translate(-50%, -50%) translate(" + baseX + "px, " + baseY + "px) translate(" + driftX + "px, " + driftY + "px) scale(" + scale + ")",
                filter: "blur(" + blur + "px)",
                zIndex: i
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: SCENE_PARAMS.docColor.value,
                  border: "1px solid " + SCENE_PARAMS.docStrokeColor.value,
                  borderRadius: minDim * 0.01,
                  boxShadow: "0 " + (minDim * 0.01) + "px " + (minDim * 0.03) + "px rgba(17,24,39,0.18)"
                }} />
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: docWidth * 0.28,
                  height: docWidth * 0.28,
                  backgroundColor: SCENE_PARAMS.docFoldColor.value,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  borderTopRightRadius: minDim * 0.01
                }} />
                <div style={{
                  position: "absolute",
                  left: "12%",
                  top: "20%",
                  width: "76%",
                  height: "6%",
                  backgroundColor: SCENE_PARAMS.docLineColor.value,
                  borderRadius: minDim * 0.004
                }} />
                <div style={{
                  position: "absolute",
                  left: "12%",
                  top: "36%",
                  width: "64%",
                  height: "6%",
                  backgroundColor: SCENE_PARAMS.docLineColor.value,
                  borderRadius: minDim * 0.004
                }} />
                <div style={{
                  position: "absolute",
                  left: "12%",
                  top: "52%",
                  width: "58%",
                  height: "6%",
                  backgroundColor: SCENE_PARAMS.docLineColor.value,
                  borderRadius: minDim * 0.004
                }} />
                <div style={{
                  position: "absolute",
                  left: "12%",
                  bottom: "12%",
                  width: "34%",
                  height: "8%",
                  backgroundColor: SCENE_PARAMS.accentColor.value,
                  borderRadius: minDim * 0.004
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

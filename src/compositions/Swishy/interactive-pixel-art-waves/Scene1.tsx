// Template: interactive-pixel-art-waves
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  displayFont: { type: "font", label: "Display Font", value: "Space Grotesk" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  primaryColor: { type: "color", label: "Primary", value: "#1e40af" },
  deepColor: { type: "color", label: "Deep Color", value: "#1e3a8a" },
  accentColor: { type: "color", label: "Accent", value: "#93c5fd" },
  pixelScale: { type: "number", label: "Pixel Size", value: 0.028, min: 0.015, max: 0.06, step: 0.005 },
  waveAmplitude: { type: "number", label: "Wave Amplitude", value: 0.14, min: 0.05, max: 0.2, step: 0.01 },
  waveSpeed: { type: "number", label: "Wave Speed", value: 2.4, min: 0.5, max: 3, step: 0.1 },
  layerCount: { type: "number", label: "Wave Layers", value: 10, min: 4, max: 16, step: 1 },
  layerGap: { type: "number", label: "Layer Gap", value: 0.055, min: 0.03, max: 0.1, step: 0.005 },
  bandScale: { type: "number", label: "Band Height", value: 0.03, min: 0.015, max: 0.06, step: 0.005 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.4, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 17, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 10, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  const isPortrait = height > width;

  const pixelSize = minDim * SCENE_PARAMS.pixelScale.value * (isPortrait ? 1 : 0.9);
  const cols = Math.floor(width / pixelSize) + 1;
  const rows = Math.floor(height / pixelSize) + 1;

  const time = adjustedFrame / fps;
  const bandRows = Math.max(2, Math.floor(rows * SCENE_PARAMS.bandScale.value));
  const crestRows = Math.max(1, Math.floor(bandRows * 0.35));

  const entranceProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const translateY = interpolate(entranceProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const containerOpacity = interpolate(entranceProgress, [0, 1], [0, SCENE_PARAMS.opacity.value], { extrapolateRight: "clamp" });

  const blocks = [];
  const layers = SCENE_PARAMS.layerCount.value;

  for (let l = 0; l < layers; l++) {
    const depth = l / Math.max(1, layers - 1);
    const base = Math.min(rows - 1, rows * (0.18 + l * SCENE_PARAMS.layerGap.value));
    const amplitude = rows * SCENE_PARAMS.waveAmplitude.value * (1 - depth * 0.45);
    const speed = SCENE_PARAMS.waveSpeed.value * (1 + depth * 0.35);
    const baseOpacity = 0.35 + (1 - depth) * 0.6;
    const crestOpacity = 0.4 + (1 - depth) * 0.6;
    const layerColor = depth < 0.5 ? SCENE_PARAMS.primaryColor.value : SCENE_PARAMS.deepColor.value;

    for (let i = 0; i < cols; i++) {
      const phase = (i / cols) * Math.PI * 2;
      const wave = Math.sin(phase + time * speed + depth * 1.4);
      const waveRow = Math.floor(base + wave * amplitude);

      for (let r = waveRow; r < waveRow + bandRows; r++) {
        if (r >= 0 && r < rows) {
          const isCrest = r < waveRow + crestRows;
          blocks.push(
            <div
              key={"l-" + l + "-" + i + "-" + r}
              style={{
                position: "absolute",
                left: i * pixelSize,
                top: r * pixelSize,
                width: pixelSize,
                height: pixelSize,
                backgroundColor: isCrest ? SCENE_PARAMS.accentColor.value : layerColor,
                opacity: isCrest ? crestOpacity : baseOpacity
              }}
            />
          );
        }
      }
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: "translateY(" + translateY + "px) scale(" + SCENE_PARAMS.scale.value + ") rotate(" + SCENE_PARAMS.rotation.value + "deg)",
          transformOrigin: "center center",
          opacity: containerOpacity,
          filter: "blur(" + SCENE_PARAMS.blur.value + "px)"
        }}
      >
        {blocks}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

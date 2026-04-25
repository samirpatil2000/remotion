// Template: good-mood
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Typography
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  
  // Colors based on the provided images
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  topRowColor: { type: "color", label: "Top Text", value: "#ffffff" },
  colorM: { type: "color", label: "M (Yellow)", value: "#ffbd14" },
  colorO1: { type: "color", label: "O1 (Blue)", value: "#006eff" },
  colorO2: { type: "color", label: "O2 (Red)", value: "#ff1d1d" },
  colorD: { type: "color", label: "D (Pink)", value: "#ff7fa1" },

  // Controls
  scale: { type: "number", label: "Scale", value: 0.9, min: 0.5, max: 1.5, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.8, min: 0.1, max: 2, step: 0.1 },
  stretchIntensity: { type: "number", label: "Stretch Intensity", value: 0.28, min: 0.1, max: 0.45, step: 0.01 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const speed = SCENE_PARAMS.animationSpeed.value;
  const minDim = Math.min(width, height);
  
  // Columns based on the "GOOD MOOD" grid
  const columns = [
    { top: "G", bottom: "M", bottomColor: SCENE_PARAMS.colorM.value },
    { top: "O", bottom: "O", bottomColor: SCENE_PARAMS.colorO1.value },
    { top: "O", bottom: "O", bottomColor: SCENE_PARAMS.colorO2.value },
    { top: "D", bottom: "D", bottomColor: SCENE_PARAMS.colorD.value },
  ];

  // Container dimensions to maintain aspect ratio similar to the screenshot
  const containerWidth = width * 0.9;
  const containerHeight = containerWidth * 0.8; // Maintain a roughly rectangular grid

  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ 
        width: containerWidth,
        height: containerHeight,
        display: "flex",
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        gap: "2px" // Subtle gap between columns like the screenshot
      }}>
        {columns.map((col, i) => {
          // Create a smooth, slow sine wave for the stretch effect
          // Each column is slightly offset for a flowing wave motion
          const t = (frame * speed) / 25;
          const offset = i * 0.8;
          const rawSin = Math.sin(t - offset);
          
          // splitRatio determines how much of the column height the top letter takes
          // 0.5 is equal split. We oscillate around it.
          const intensity = SCENE_PARAMS.stretchIntensity.value;
          const splitRatio = 0.5 + (rawSin * intensity);
          
          return (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                gap: "2px" 
              }}
            >
              {/* Top Letter (GOOD) */}
              <div style={{ 
                height: `${splitRatio * 100}%`, 
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                transition: "height 0.1s ease-out"
              }}>
                <span style={{ 
                  color: SCENE_PARAMS.topRowColor.value, 
                  fontFamily: `${SCENE_PARAMS.fontFamily.value}, system-ui, sans-serif`,
                  fontSize: minDim * 0.5,
                  fontWeight: 900,
                  lineHeight: 0.8,
                  // The core stretch effect: scaling the Y axis based on the container height
                  transform: `scaleY(${splitRatio * 2})`,
                  transformOrigin: "center",
                  display: "block",
                  textAlign: "center"
                }}>
                  {col.top}
                </span>
              </div>

              {/* Bottom Letter (MOOD) */}
              <div style={{ 
                height: `${(1 - splitRatio) * 100}%`, 
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                transition: "height 0.1s ease-out"
              }}>
                <span style={{ 
                  color: col.bottomColor, 
                  fontFamily: `${SCENE_PARAMS.fontFamily.value}, system-ui, sans-serif`,
                  fontSize: minDim * 0.5,
                  fontWeight: 900,
                  lineHeight: 0.8,
                  // Stretching the bottom letter inversely
                  transform: `scaleY(${(1 - splitRatio) * 2})`,
                  transformOrigin: "center",
                  display: "block",
                  textAlign: "center"
                }}>
                  {col.bottom}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

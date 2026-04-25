// Template: extend
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  text: { type: "text", label: "Text", value: "EXTEND" },
  fontFamily: { type: "font", label: "Font", value: "Bebas Neue" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  stretchIntensity: { type: "number", label: "Stretch Intensity", value: 3, min: 1, max: 8, step: 0.5 },
  diagonalAngle: { type: "number", label: "Diagonal Angle", value: 15, min: 0, max: 45, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  
  const adjustedFrame = frame * speed;
  
  // Phase 1: Rows appear and settle (frames 0-30)
  const introProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 18, stiffness: 80 }
  });

  // Phase 2: First stretch - LEFT diagonal (frames 30-75)
  const stretchStart1 = 30;
  const stretchDuration1 = 45;
  const stretchProgress1 = interpolate(
    adjustedFrame,
    [stretchStart1, stretchStart1 + stretchDuration1 * 0.3, stretchStart1 + stretchDuration1 * 0.7, stretchStart1 + stretchDuration1],
    [0, 0.4, 0.85, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const easedStretch1 = stretchProgress1 * stretchProgress1 * (3 - 2 * stretchProgress1);

  // Phase 2.5: Reset to center (frames 75-105)
  const resetStart1 = 75;
  const resetDuration1 = 30;
  const resetProgress1 = interpolate(
    adjustedFrame,
    [resetStart1, resetStart1 + resetDuration1 * 0.4, resetStart1 + resetDuration1],
    [0, 0.6, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const easedReset1 = resetProgress1 * resetProgress1 * (3 - 2 * resetProgress1);

  // Phase 3: Second stretch - RIGHT diagonal for middle, LEFT for top/bottom (frames 105-150)
  const stretchStart2 = 105;
  const stretchDuration2 = 45;
  const stretchProgress2 = interpolate(
    adjustedFrame,
    [stretchStart2, stretchStart2 + stretchDuration2 * 0.3, stretchStart2 + stretchDuration2 * 0.7, stretchStart2 + stretchDuration2],
    [0, 0.4, 0.85, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const easedStretch2 = stretchProgress2 * stretchProgress2 * (3 - 2 * stretchProgress2);
  
  // Phase 4: Final reset to center (frames 150-180)
  const resetStart2 = 150;
  const resetDuration2 = 30;
  const resetProgress2 = interpolate(
    adjustedFrame,
    [resetStart2, resetStart2 + resetDuration2 * 0.4, resetStart2 + resetDuration2],
    [0, 0.6, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const easedReset2 = resetProgress2 * resetProgress2 * (3 - 2 * resetProgress2);
  
  // Calculate stretch values
  const maxStretch = SCENE_PARAMS.stretchIntensity.value;
  const maxAngle = SCENE_PARAMS.diagonalAngle.value;
  
  // Determine current phase
  const isPhase1 = adjustedFrame >= stretchStart1 && adjustedFrame < resetStart1;
  const isResetPhase1 = adjustedFrame >= resetStart1 && adjustedFrame < stretchStart2;
  const isPhase2 = adjustedFrame >= stretchStart2 && adjustedFrame < resetStart2;
  const isResetPhase2 = adjustedFrame >= resetStart2;
  
  // Calculate middle row transforms based on current phase
  let middleStretchX, middleStretchY, middleRotation, middleSkew;
  
  if (isResetPhase2) {
    // Final reset back to center
    middleStretchX = interpolate(easedReset2, [0, 1], [maxStretch, 1], { extrapolateRight: "clamp" });
    middleStretchY = interpolate(easedReset2, [0, 1], [maxStretch * 0.6, 1], { extrapolateRight: "clamp" });
    middleRotation = interpolate(easedReset2, [0, 1], [maxAngle, 0], { extrapolateRight: "clamp" });
    middleSkew = interpolate(easedReset2, [0, 1], [-8, 0], { extrapolateRight: "clamp" });
  } else if (isPhase2) {
    // Phase 2: stretch to the RIGHT
    middleStretchX = interpolate(easedStretch2, [0, 1], [1, maxStretch], { extrapolateRight: "clamp" });
    middleStretchY = interpolate(easedStretch2, [0, 1], [1, maxStretch * 0.6], { extrapolateRight: "clamp" });
    middleRotation = interpolate(easedStretch2, [0, 1], [0, maxAngle], { extrapolateRight: "clamp" });
    middleSkew = interpolate(easedStretch2, [0, 1], [0, -8], { extrapolateRight: "clamp" });
  } else if (isResetPhase1) {
    // Reset back to center after phase 1
    middleStretchX = interpolate(easedReset1, [0, 1], [maxStretch, 1], { extrapolateRight: "clamp" });
    middleStretchY = interpolate(easedReset1, [0, 1], [maxStretch * 0.6, 1], { extrapolateRight: "clamp" });
    middleRotation = interpolate(easedReset1, [0, 1], [-maxAngle, 0], { extrapolateRight: "clamp" });
    middleSkew = interpolate(easedReset1, [0, 1], [8, 0], { extrapolateRight: "clamp" });
  } else if (isPhase1) {
    // Phase 1: stretch to the LEFT
    middleStretchX = interpolate(easedStretch1, [0, 1], [1, maxStretch], { extrapolateRight: "clamp" });
    middleStretchY = interpolate(easedStretch1, [0, 1], [1, maxStretch * 0.6], { extrapolateRight: "clamp" });
    middleRotation = interpolate(easedStretch1, [0, 1], [0, -maxAngle], { extrapolateRight: "clamp" });
    middleSkew = interpolate(easedStretch1, [0, 1], [0, 8], { extrapolateRight: "clamp" });
  } else {
    middleStretchX = 1;
    middleStretchY = 1;
    middleRotation = 0;
    middleSkew = 0;
  }
  
  // Top and bottom rows transforms
  let topRotation, bottomRotation, topSkew, bottomSkew, topRowOffset, bottomRowOffset, topRowYOffset, bottomRowYOffset;
  
  if (isResetPhase2) {
    // Final reset back to center
    topRotation = interpolate(easedReset2, [0, 1], [-maxAngle * 0.3, 0], { extrapolateRight: "clamp" });
    bottomRotation = interpolate(easedReset2, [0, 1], [maxAngle * 0.3, 0], { extrapolateRight: "clamp" });
    topSkew = interpolate(easedReset2, [0, 1], [8 * 0.4, 0], { extrapolateRight: "clamp" });
    bottomSkew = interpolate(easedReset2, [0, 1], [-8 * 0.4, 0], { extrapolateRight: "clamp" });
    topRowOffset = interpolate(easedReset2, [0, 1], [-width * 0.08, 0], { extrapolateRight: "clamp" });
    bottomRowOffset = interpolate(easedReset2, [0, 1], [width * 0.08, 0], { extrapolateRight: "clamp" });
    topRowYOffset = interpolate(easedReset2, [0, 1], [minDim * 0.05, 0], { extrapolateRight: "clamp" });
    bottomRowYOffset = interpolate(easedReset2, [0, 1], [-minDim * 0.05, 0], { extrapolateRight: "clamp" });
  } else if (isPhase2) {
    // Phase 2: top/bottom do OPPOSITE of phase 1 (move to the right instead of left)
    topRotation = interpolate(easedStretch2, [0, 1], [0, -maxAngle * 0.3], { extrapolateRight: "clamp" });
    bottomRotation = interpolate(easedStretch2, [0, 1], [0, maxAngle * 0.3], { extrapolateRight: "clamp" });
    topSkew = interpolate(easedStretch2, [0, 1], [0, 8 * 0.4], { extrapolateRight: "clamp" });
    bottomSkew = interpolate(easedStretch2, [0, 1], [0, -8 * 0.4], { extrapolateRight: "clamp" });
    topRowOffset = interpolate(easedStretch2, [0, 1], [0, -width * 0.08], { extrapolateRight: "clamp" });
    bottomRowOffset = interpolate(easedStretch2, [0, 1], [0, width * 0.08], { extrapolateRight: "clamp" });
    topRowYOffset = interpolate(easedStretch2, [0, 1], [0, minDim * 0.05], { extrapolateRight: "clamp" });
    bottomRowYOffset = interpolate(easedStretch2, [0, 1], [0, -minDim * 0.05], { extrapolateRight: "clamp" });
  } else if (isResetPhase1) {
    // Reset back to center after phase 1
    topRotation = interpolate(easedReset1, [0, 1], [maxAngle * 0.3, 0], { extrapolateRight: "clamp" });
    bottomRotation = interpolate(easedReset1, [0, 1], [-maxAngle * 0.3, 0], { extrapolateRight: "clamp" });
    topSkew = interpolate(easedReset1, [0, 1], [-8 * 0.4, 0], { extrapolateRight: "clamp" });
    bottomSkew = interpolate(easedReset1, [0, 1], [8 * 0.4, 0], { extrapolateRight: "clamp" });
    topRowOffset = interpolate(easedReset1, [0, 1], [width * 0.08, 0], { extrapolateRight: "clamp" });
    bottomRowOffset = interpolate(easedReset1, [0, 1], [-width * 0.08, 0], { extrapolateRight: "clamp" });
    topRowYOffset = interpolate(easedReset1, [0, 1], [-minDim * 0.05, 0], { extrapolateRight: "clamp" });
    bottomRowYOffset = interpolate(easedReset1, [0, 1], [minDim * 0.05, 0], { extrapolateRight: "clamp" });
  } else if (isPhase1) {
    // Phase 1: stretch left
    topRotation = interpolate(easedStretch1, [0, 1], [0, maxAngle * 0.3], { extrapolateRight: "clamp" });
    bottomRotation = interpolate(easedStretch1, [0, 1], [0, -maxAngle * 0.3], { extrapolateRight: "clamp" });
    topSkew = interpolate(easedStretch1, [0, 1], [0, -8 * 0.4], { extrapolateRight: "clamp" });
    bottomSkew = interpolate(easedStretch1, [0, 1], [0, 8 * 0.4], { extrapolateRight: "clamp" });
    topRowOffset = interpolate(easedStretch1, [0, 1], [0, width * 0.08], { extrapolateRight: "clamp" });
    bottomRowOffset = interpolate(easedStretch1, [0, 1], [0, -width * 0.08], { extrapolateRight: "clamp" });
    topRowYOffset = interpolate(easedStretch1, [0, 1], [0, -minDim * 0.05], { extrapolateRight: "clamp" });
    bottomRowYOffset = interpolate(easedStretch1, [0, 1], [0, minDim * 0.05], { extrapolateRight: "clamp" });
  } else {
    topRotation = 0;
    bottomRotation = 0;
    topSkew = 0;
    bottomSkew = 0;
    topRowOffset = 0;
    bottomRowOffset = 0;
    topRowYOffset = 0;
    bottomRowYOffset = 0;
  }

  const baseRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "visible",
    fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
    color: SCENE_PARAMS.textColor.value,
    fontWeight: 900,
    lineHeight: 0.85,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
  };

  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden"
    }}>
      <div style={{ 
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0
      }}>
        
        {/* Top Row */}
        <div style={{
          ...baseRowStyle,
          fontSize: minDim * 0.22,
          opacity: introProgress,
          transform: `
            translateY(${interpolate(introProgress, [0, 1], [-60, 0]) + topRowYOffset}px)
            translateX(${topRowOffset}px)
            rotate(${topRotation}deg)
            skewX(${topSkew}deg)
          `,
          transformOrigin: "center center"
        }}>
          {SCENE_PARAMS.text.value}
        </div>

        {/* Middle Row */}
        <div style={{
          ...baseRowStyle,
          fontSize: minDim * 0.22,
          opacity: interpolate(introProgress, [0, 0.3, 1], [0, 0, 1], { extrapolateRight: "clamp" }),
          transform: `
            scaleX(${middleStretchX})
            scaleY(${middleStretchY})
            rotate(${middleRotation}deg)
            skewX(${middleSkew}deg)
          `,
          transformOrigin: "center center",
          marginTop: minDim * 0.01,
          marginBottom: minDim * 0.01,
        }}>
          {SCENE_PARAMS.text.value}
        </div>

        {/* Bottom Row */}
        <div style={{
          ...baseRowStyle,
          fontSize: minDim * 0.22,
          opacity: interpolate(introProgress, [0, 0.5, 1], [0, 0, 1], { extrapolateRight: "clamp" }),
          transform: `
            translateY(${interpolate(introProgress, [0, 1], [60, 0]) + bottomRowYOffset}px)
            translateX(${bottomRowOffset}px)
            rotate(${bottomRotation}deg)
            skewX(${bottomSkew}deg)
          `,
          transformOrigin: "center center"
        }}>
          {SCENE_PARAMS.text.value}
        </div>

      </div>
    </AbsoluteFill>
  );
}

export default Scene;

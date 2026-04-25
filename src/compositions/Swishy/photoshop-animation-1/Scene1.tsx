// Template: photoshop-animation-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoText: { type: "text", label: "Logo Text", value: "Ps" },
  backgroundColor: { type: "color", label: "Background", value: "#121212" },
  logoBackgroundColor: { type: "color", label: "Logo Background", value: "#001E36" },
  logoTextColor: { type: "color", label: "Logo Text Color", value: "#31A8FF" },
  glowColor: { type: "color", label: "Glow Color", value: "#31A8FF" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  pulseIntensity: { type: "number", label: "Pulse Intensity", value: 0.03, min: 0, max: 0.1, step: 0.01 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const logoEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  
  const logoScale = interpolate(logoEntrance, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  
  const pulsePhase = Math.max(0, adjustedFrame - 45) / fps;
  const pulseAmount = adjustedFrame > 45 
    ? Math.sin(pulsePhase * 2) * SCENE_PARAMS.pulseIntensity.value 
    : 0;
  const finalLogoScale = logoScale + pulseAmount;
  
  const glowProgress = spring({
    frame: Math.max(0, adjustedFrame - 8),
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  const glowOpacity = interpolate(glowProgress, [0, 1], [0, SCENE_PARAMS.glowIntensity.value], { extrapolateRight: "clamp" });
  const glowScale = interpolate(glowProgress, [0, 1], [0.8, 1.2], { extrapolateRight: "clamp" });
  
  const glowPulse = adjustedFrame > 30 
    ? Math.sin((adjustedFrame - 30) / fps * 1.5) * 0.15 + 1 
    : 1;
  
  const logoSize = minDim * 0.28;
  const borderRadius = logoSize * 0.22;
  
  return React.createElement(
    AbsoluteFill,
    {
      style: {
        backgroundColor: SCENE_PARAMS.backgroundColor.value,
        justifyContent: "center",
        alignItems: "center",
      }
    },
    React.createElement(
      "div",
      {
        style: {
          transform: "scale(" + SCENE_PARAMS.scale.value + ")",
          transformOrigin: "center center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }
      },
      React.createElement("div", {
        style: {
          position: "absolute",
          width: logoSize * 1.8,
          height: logoSize * 1.8,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + SCENE_PARAMS.glowColor.value + " 0%, transparent 70%)",
          opacity: glowOpacity,
          transform: "scale(" + (glowScale * glowPulse) + ")",
          filter: "blur(" + (logoSize * 0.15) + "px)",
        }
      }),
      React.createElement(
        "div",
        {
          style: {
            width: logoSize,
            height: logoSize,
            borderRadius: borderRadius,
            backgroundColor: SCENE_PARAMS.logoBackgroundColor.value,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(" + finalLogoScale + ")",
            boxShadow: "0 0 " + (logoSize * 0.1) + "px rgba(49, 168, 255, 0.3), inset 0 0 " + (logoSize * 0.05) + "px rgba(49, 168, 255, 0.1)",
            border: "2px solid rgba(49, 168, 255, 0.3)",
            position: "relative",
            overflow: "hidden",
          }
        },
        React.createElement("div", {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(49, 168, 255, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)",
            borderRadius: borderRadius - 2,
          }
        }),
        React.createElement(
          "span",
          {
            style: {
              color: SCENE_PARAMS.logoTextColor.value,
              fontSize: logoSize * 0.48,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: logoSize * 0.01,
              position: "relative",
              zIndex: 1,
            }
          },
          SCENE_PARAMS.logoText.value
        )
      )
    )
  );
}

export default Scene;

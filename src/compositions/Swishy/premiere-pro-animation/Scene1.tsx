// Template: premiere-pro-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoText: { type: "text", label: "Logo Text", value: "Pr" },
  fontFamily: { type: "font", label: "Font", value: "Source Sans Pro" },
  backgroundColor: { type: "color", label: "Background", value: "#0a0a12" },
  logoBoxColor: { type: "color", label: "Logo Box", value: "#00005B" },
  logoTextColor: { type: "color", label: "Logo Text", value: "#9999FF" },
  glowColor: { type: "color", label: "Glow Color", value: "#7c3aed" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const logoSize = minDim * 0.35;
  const borderRadius = logoSize * 0.22;
  
  const logoEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  
  const logoScale = interpolate(logoEntrance, [0, 1], [0.1, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(logoEntrance, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, SCENE_PARAMS.opacity.value], { extrapolateRight: "clamp" });
  
  const pulsePhase = Math.max(0, adjustedFrame - 45);
  const pulse = 1 + Math.sin(pulsePhase * 0.08) * 0.02;
  const finalLogoScale = logoScale * pulse;
  
  const glowEntrance = interpolate(adjustedFrame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = 1 + Math.sin(pulsePhase * 0.06) * 0.15;
  const glowOpacity = glowEntrance * SCENE_PARAMS.glowIntensity.value * glowPulse;
  const glowSize = logoSize * 1.8;
  
  return React.createElement(
    AbsoluteFill,
    {
      style: {
        backgroundColor: SCENE_PARAMS.backgroundColor.value,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }
    },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          transform: "scale(" + SCENE_PARAMS.scale.value + ")",
          transformOrigin: "center center",
        }
      },
      React.createElement("div", {
        style: {
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + SCENE_PARAMS.glowColor.value + " 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity,
          filter: "blur(" + (30 + SCENE_PARAMS.blur.value) + "px)",
        }
      }),
      React.createElement("div", {
        style: {
          position: "absolute",
          width: glowSize * 0.7,
          height: glowSize * 0.7,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + SCENE_PARAMS.logoTextColor.value + " 0%, transparent 60%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity * 0.4,
          filter: "blur(" + (20 + SCENE_PARAMS.blur.value) + "px)",
        }
      }),
      React.createElement(
        "div",
        {
          style: {
            width: logoSize,
            height: logoSize,
            backgroundColor: SCENE_PARAMS.logoBoxColor.value,
            borderRadius: borderRadius,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "translateY(" + slideY + "px) scale(" + finalLogoScale + ") rotate(" + SCENE_PARAMS.rotation.value + "deg)",
            boxShadow: "0 " + (logoSize * 0.05) + "px " + (logoSize * 0.15) + "px rgba(0,0,0,0.5), 0 0 " + (logoSize * 0.3) + "px " + SCENE_PARAMS.glowColor.value + "40",
            position: "relative",
            opacity: logoOpacity,
          }
        },
        React.createElement("span", {
          style: {
            color: SCENE_PARAMS.logoTextColor.value,
            fontSize: logoSize * 0.45,
            fontWeight: 700,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            letterSpacing: "-0.02em",
            textShadow: "0 0 20px " + SCENE_PARAMS.logoTextColor.value + "60",
          }
        }, SCENE_PARAMS.logoText.value)
      )
    )
  );
}

export default Scene;

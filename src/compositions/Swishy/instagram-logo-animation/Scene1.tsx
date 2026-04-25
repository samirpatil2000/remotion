// Template: instagram-logo-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0a" },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.4, min: 0.3, max: 1.5, step: 0.1 },
  pulseAmount: { type: "number", label: "Pulse Amount", value: 0.03, min: 0.01, max: 0.08, step: 0.01 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  logoSize: { type: "number", label: "Logo Size", value: 0.35, min: 0.2, max: 0.5, step: 0.05 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 30, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const logoSize = minDim * SCENE_PARAMS.logoSize.value;
  
  // Logo entrance with smooth motion
  const logoEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.1, 1], { extrapolateRight: "clamp" });
  const logoY = interpolate(logoEntrance, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, SCENE_PARAMS.opacity.value], { extrapolateRight: "clamp" });
  
  // Gentle pulse after entrance (starts after frame 45)
  const pulseFrame = Math.max(0, adjustedFrame - 45);
  const pulseAmount = SCENE_PARAMS.pulseAmount.value;
  const pulse = 1 + Math.sin(pulseFrame * 0.08) * pulseAmount * interpolate(adjustedFrame, [45, 60], [0, 1], { extrapolateRight: "clamp" });
  
  // Glow entrance (slightly delayed)
  const glowEntrance = spring({
    frame: Math.max(0, adjustedFrame - 8),
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  const glowScale = interpolate(glowEntrance, [0, 1], [0.5, 1.2], { extrapolateRight: "clamp" });
  const glowOpacity = interpolate(glowEntrance, [0, 1], [0, SCENE_PARAMS.glowIntensity.value], { extrapolateRight: "clamp" });
  
  // Instagram gradient colors
  const gradientColors = "#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5";
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        filter: "blur(" + SCENE_PARAMS.blur.value + "px)",
        opacity: logoOpacity,
      }}>
        {/* Gradient glow behind logo */}
        <div style={{
          position: "absolute",
          width: logoSize * 1.8,
          height: logoSize * 1.8,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + gradientColors + ")",
          filter: "blur(" + (logoSize * 0.4) + "px)",
          opacity: glowOpacity,
          transform: "scale(" + glowScale + ")",
        }} />
        
        {/* Secondary softer glow */}
        <div style={{
          position: "absolute",
          width: logoSize * 2.5,
          height: logoSize * 2.5,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214, 41, 118, 0.4) 0%, rgba(150, 47, 191, 0.2) 40%, transparent 70%)",
          filter: "blur(" + (logoSize * 0.6) + "px)",
          opacity: glowOpacity * 0.6,
          transform: "scale(" + glowScale + ")",
        }} />
        
        {/* Instagram Logo */}
        <div style={{
          width: logoSize,
          height: logoSize,
          borderRadius: logoSize * 0.22,
          background: "linear-gradient(135deg, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateY(" + logoY + "px) scale(" + (logoScale * pulse) + ") rotate(" + SCENE_PARAMS.rotation.value + "deg)",
          boxShadow: "0 " + (logoSize * 0.05) + "px " + (logoSize * 0.3) + "px rgba(0, 0, 0, 0.4)",
        }}>
          {/* Camera body outline */}
          <div style={{
            width: logoSize * 0.55,
            height: logoSize * 0.55,
            borderRadius: logoSize * 0.12,
            border: (logoSize * 0.045) + "px solid white",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {/* Camera lens */}
            <div style={{
              width: logoSize * 0.22,
              height: logoSize * 0.22,
              borderRadius: "50%",
              border: (logoSize * 0.04) + "px solid white",
            }} />
            
            {/* Flash dot */}
            <div style={{
              position: "absolute",
              top: logoSize * 0.05,
              right: logoSize * 0.05,
              width: logoSize * 0.07,
              height: logoSize * 0.07,
              borderRadius: "50%",
              backgroundColor: "white",
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

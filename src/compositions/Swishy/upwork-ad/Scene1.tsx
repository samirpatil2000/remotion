// Template: upwork-ad
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoText: { type: "text", label: "Logo Text", value: "Upwork" },
  percentageValue: { type: "text", label: "Percentage", value: "41%" },
  statLine1: { type: "text", label: "Stat Line 1", value: "of top companies agree" },
  statLine2: { type: "text", label: "Stat Line 2", value: "AI works best when humans lead." },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  accentColor: { type: "color", label: "Accent Green", value: "#14a800" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 12, min: 5, max: 25, step: 1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0, max: 1, step: 0.1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const stagger = SCENE_PARAMS.staggerDelay.value;
  const adjustedFrame = frame * speed;
  
  const isPortrait = height > width;
  
  // Gradient animation - starts from bottom
  const gradientProgress = interpolate(adjustedFrame, [0, 60], [0, 100], { extrapolateRight: "clamp" });
  const gradientOpacity = interpolate(adjustedFrame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  
  // Logo entrance
  const logoProgress = spring({ 
    frame: Math.max(0, adjustedFrame - 15), 
    fps, 
    config: { damping: 22, stiffness: 85 } 
  });
  const logoY = interpolate(logoProgress, [0, 1], [-20, 0]);
  
  // Percentage counter animation
  const percentStart = 30;
  const percentEnd = 70;
  const percentProgress = spring({ 
    frame: Math.max(0, adjustedFrame - percentStart), 
    fps, 
    config: { damping: 25, stiffness: 70 } 
  });
  const displayPercent = Math.round(interpolate(adjustedFrame, [percentStart, percentEnd], [0, 41], { extrapolateRight: "clamp" }));
  const percentScale = interpolate(percentProgress, [0, 1], [0.8, 1]);
  const percentY = interpolate(percentProgress, [0, 1], [30, 0]);
  
  // Stat line 1 entrance
  const stat1Progress = spring({ 
    frame: Math.max(0, adjustedFrame - (percentStart + stagger)), 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  const stat1Y = interpolate(stat1Progress, [0, 1], [20, 0]);
  
  // Stat line 2 entrance
  const stat2Progress = spring({ 
    frame: Math.max(0, adjustedFrame - (percentStart + stagger * 2)), 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  const stat2Y = interpolate(stat2Progress, [0, 1], [20, 0]);
  
  // Glow pulse on percentage
  const glowPulse = interpolate(
    Math.sin((adjustedFrame - 60) * 0.08),
    [-1, 1],
    [0.4, 1]
  ) * SCENE_PARAMS.glowIntensity.value;
  const showGlow = adjustedFrame > 60;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Animated gradient background */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: gradientProgress + "%",
        background: "linear-gradient(to top, " + SCENE_PARAMS.accentColor.value + " 0%, " + SCENE_PARAMS.accentColor.value + "40 40%, transparent 100%)",
        opacity: gradientOpacity,
      }} />
      
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: width * 1.5,
        height: height * 0.8,
        background: "radial-gradient(ellipse at center, " + SCENE_PARAMS.accentColor.value + "30 0%, transparent 60%)",
        opacity: gradientOpacity * 0.6,
      }} />
      
      {/* Main content container */}
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: minDim * 0.08,
        zIndex: 1,
      }}>
        {/* Upwork Logo */}
        <div style={{
          opacity: logoProgress,
          transform: "translateY(" + logoY + "px)",
          marginBottom: minDim * 0.12,
        }}>
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.065,
            fontWeight: 500,
            color: SCENE_PARAMS.textColor.value,
            letterSpacing: "-0.02em",
          }}>
            {SCENE_PARAMS.logoText.value}
          </span>
        </div>
        
        {/* Percentage */}
        <div style={{
          opacity: percentProgress,
          transform: "translateY(" + percentY + "px) scale(" + percentScale + ")",
          position: "relative",
        }}>
          {showGlow && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: minDim * 0.5,
              height: minDim * 0.3,
              background: "radial-gradient(ellipse at center, " + SCENE_PARAMS.accentColor.value + "40 0%, transparent 70%)",
              opacity: glowPulse,
              filter: "blur(" + minDim * 0.03 + "px)",
            }} />
          )}
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.28,
            fontWeight: 700,
            color: SCENE_PARAMS.accentColor.value,
            lineHeight: 1,
            position: "relative",
            textShadow: showGlow ? "0 0 " + (minDim * 0.04 * glowPulse) + "px " + SCENE_PARAMS.accentColor.value + "60" : "none",
          }}>
            {displayPercent}%
          </span>
        </div>
        
        {/* Stat text container */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: minDim * 0.04,
          gap: minDim * 0.015,
        }}>
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.042,
            fontWeight: 400,
            color: SCENE_PARAMS.textColor.value,
            opacity: stat1Progress * 0.85,
            transform: "translateY(" + stat1Y + "px)",
          }}>
            {SCENE_PARAMS.statLine1.value}
          </span>
          
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.048,
            fontWeight: 600,
            color: SCENE_PARAMS.textColor.value,
            opacity: stat2Progress,
            transform: "translateY(" + stat2Y + "px)",
            textAlign: "center",
            maxWidth: minDim * 0.75,
            lineHeight: 1.3,
          }}>
            {SCENE_PARAMS.statLine2.value}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

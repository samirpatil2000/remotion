// Template: simulation-terminated
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  mainText: { type: "text", label: "Main Text", value: "Simulation terminated" },
  fontFamily: { type: "font", label: "Font", value: "JetBrains Mono" },
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0f" },
  primaryColor: { type: "color", label: "Primary (Green)", value: "#00ff88" },
  secondaryColor: { type: "color", label: "Secondary (Blue)", value: "#00d4ff" },
  glowColor: { type: "color", label: "Glow Color", value: "#00ff88" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  glitchIntensity: { type: "number", label: "Glitch Intensity", value: 1, min: 0, max: 2, step: 0.1 },
  scanlineOpacity: { type: "number", label: "Scanline Opacity", value: 0.15, min: 0, max: 0.5, step: 0.05 },
  showCursor: { type: "boolean", label: "Show Cursor", value: true },
  showGrid: { type: "boolean", label: "Show Grid", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const isPortrait = height > width;
  
  const text = SCENE_PARAMS.mainText.value;
  const charCount = text.length;
  
  // Typing animation - characters appear one by one
  const typewriterDuration = charCount * 2.5;
  const charsRevealed = Math.floor(interpolate(
    adjustedFrame,
    [15, 15 + typewriterDuration],
    [0, charCount],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  ));
  
  // Cursor blink
  const cursorVisible = SCENE_PARAMS.showCursor.value && Math.floor(adjustedFrame / 8) % 2 === 0;
  
  // Glitch effect timing
  const glitchActive = (adjustedFrame > 60 && adjustedFrame < 68) || 
                       (adjustedFrame > 85 && adjustedFrame < 90) ||
                       (adjustedFrame > 110 && adjustedFrame < 115);
  
  const glitchOffset = glitchActive ? 
    (Math.sin(adjustedFrame * 50) * 3 * SCENE_PARAMS.glitchIntensity.value) : 0;
  
  // Final reveal glow pulse
  const textComplete = adjustedFrame > (15 + typewriterDuration + 5);
  const glowPulse = textComplete ? 
    interpolate(Math.sin(adjustedFrame * 0.15), [-1, 1], [0.5, 1]) : 0.3;
  
  // Scanline animation
  const scanlineY = (adjustedFrame * 3) % height;
  
  // Grid fade in
  const gridOpacity = interpolate(
    adjustedFrame,
    [0, 30],
    [0, 0.08],
    { extrapolateRight: "clamp" }
  );
  
  // Bracket animation
  const bracketProgress = spring({
    frame: Math.max(0, adjustedFrame - 5),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  
  // Status indicator pulse
  const statusPulse = interpolate(
    Math.sin(adjustedFrame * 0.2),
    [-1, 1],
    [0.4, 1]
  );
  
  // Data fragments animation
  const fragments = [];
  for (let i = 0; i < 12; i++) {
    const fragDelay = i * 5 + 20;
    const fragProgress = spring({
      frame: Math.max(0, adjustedFrame - fragDelay),
      fps,
      config: { damping: 25, stiffness: 80 }
    });
    fragments.push(fragProgress);
  }
  
  const fontSize = isPortrait ? minDim * 0.055 : minDim * 0.065;
  const statusFontSize = minDim * 0.022;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      {SCENE_PARAMS.showGrid.value && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${SCENE_PARAMS.secondaryColor.value}22 1px, transparent 1px),
            linear-gradient(90deg, ${SCENE_PARAMS.secondaryColor.value}22 1px, transparent 1px)
          `,
          backgroundSize: `${minDim * 0.04}px ${minDim * 0.04}px`,
        }} />
      )}
      
      {/* Floating data fragments */}
      {fragments.map((prog, i) => {
        const xPos = (i % 4) * (width / 4) + width * 0.1;
        const yPos = Math.floor(i / 4) * (height / 4) + height * 0.15;
        const fragOpacity = prog * 0.3;
        const chars = "01";
        const fragText = Array(4).fill(0).map(() => chars[Math.floor(Math.random() * 2)]).join("");
        return (
          <div key={i} style={{
            position: "absolute",
            left: xPos,
            top: yPos,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
            fontSize: minDim * 0.018,
            color: SCENE_PARAMS.secondaryColor.value,
            opacity: fragOpacity,
            transform: `translateY(${(1 - prog) * 20}px)`,
          }}>
            {fragText}
          </div>
        );
      })}
      
      {/* Main content container */}
      <div style={{
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: minDim * 0.03,
      }}>
        {/* Status indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: minDim * 0.015,
          opacity: bracketProgress,
          transform: `translateY(${(1 - bracketProgress) * -15}px)`,
        }}>
          <div style={{
            width: minDim * 0.012,
            height: minDim * 0.012,
            borderRadius: "50%",
            backgroundColor: SCENE_PARAMS.primaryColor.value,
            opacity: statusPulse,
            boxShadow: `0 0 ${minDim * 0.015}px ${SCENE_PARAMS.primaryColor.value}`,
          }} />
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
            fontSize: statusFontSize,
            color: SCENE_PARAMS.secondaryColor.value,
            letterSpacing: minDim * 0.003,
            textTransform: "uppercase",
          }}>
            SYSTEM STATUS: OFFLINE
          </span>
        </div>
        
        {/* Main text container with brackets */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: minDim * 0.02,
        }}>
          {/* Left bracket */}
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
            fontSize: fontSize * 1.3,
            color: SCENE_PARAMS.secondaryColor.value,
            opacity: bracketProgress,
            transform: `translateX(${(1 - bracketProgress) * 20}px)`,
          }}>[</span>
          
          {/* Main text with typewriter effect */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}>
            {/* Glitch layer - red */}
            {glitchActive && (
              <span style={{
                position: "absolute",
                fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
                fontSize: fontSize,
                fontWeight: 600,
                color: "#ff0040",
                letterSpacing: minDim * 0.004,
                textTransform: "uppercase",
                transform: `translateX(${glitchOffset}px)`,
                opacity: 0.7,
                clipPath: "inset(30% 0 40% 0)",
              }}>
                {text.slice(0, charsRevealed)}
              </span>
            )}
            
            {/* Glitch layer - blue */}
            {glitchActive && (
              <span style={{
                position: "absolute",
                fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
                fontSize: fontSize,
                fontWeight: 600,
                color: SCENE_PARAMS.secondaryColor.value,
                letterSpacing: minDim * 0.004,
                textTransform: "uppercase",
                transform: `translateX(${-glitchOffset}px)`,
                opacity: 0.7,
                clipPath: "inset(60% 0 10% 0)",
              }}>
                {text.slice(0, charsRevealed)}
              </span>
            )}
            
            {/* Main text */}
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
              fontSize: fontSize,
              fontWeight: 600,
              color: SCENE_PARAMS.primaryColor.value,
              letterSpacing: minDim * 0.004,
              textTransform: "uppercase",
              textShadow: textComplete ? 
                `0 0 ${minDim * 0.02 * glowPulse}px ${SCENE_PARAMS.glowColor.value}, 0 0 ${minDim * 0.04 * glowPulse}px ${SCENE_PARAMS.glowColor.value}40` :
                "none",
            }}>
              {text.slice(0, charsRevealed)}
            </span>
            
            {/* Cursor */}
            {cursorVisible && charsRevealed < charCount && (
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
                fontSize: fontSize,
                fontWeight: 600,
                color: SCENE_PARAMS.primaryColor.value,
                marginLeft: 2,
              }}>_</span>
            )}
          </div>
          
          {/* Right bracket */}
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
            fontSize: fontSize * 1.3,
            color: SCENE_PARAMS.secondaryColor.value,
            opacity: bracketProgress,
            transform: `translateX(${(1 - bracketProgress) * -20}px)`,
          }}>]</span>
        </div>
        
        {/* Underline animation */}
        <div style={{
          width: interpolate(
            adjustedFrame,
            [15 + typewriterDuration, 15 + typewriterDuration + 20],
            [0, minDim * 0.5],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          ),
          height: 2,
          background: `linear-gradient(90deg, transparent, ${SCENE_PARAMS.secondaryColor.value}, ${SCENE_PARAMS.primaryColor.value}, ${SCENE_PARAMS.secondaryColor.value}, transparent)`,
          opacity: 0.6,
        }} />
        
        {/* Timestamp */}
        <div style={{
          opacity: interpolate(adjustedFrame, [70, 85], [0, 0.5], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          fontFamily: SCENE_PARAMS.fontFamily.value + ", monospace",
          fontSize: minDim * 0.018,
          color: SCENE_PARAMS.secondaryColor.value,
          letterSpacing: minDim * 0.002,
        }}>
          [TIMESTAMP: {"2087.12.15_23:59:59"}]
        </div>
      </div>
      
      {/* Scanline effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,${SCENE_PARAMS.scanlineOpacity.value}) 2px,
          rgba(0,0,0,${SCENE_PARAMS.scanlineOpacity.value}) 4px
        )`,
        pointerEvents: "none",
      }} />
      
      {/* Moving scanline */}
      <div style={{
        position: "absolute",
        top: scanlineY,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${SCENE_PARAMS.primaryColor.value}30, transparent)`,
        pointerEvents: "none",
      }} />
      
      {/* Vignette */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none",
      }} />
    </AbsoluteFill>
  );
}

export default Scene;

// Template: animate-characters
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Magic Horse" },
  subtitle: { type: "text", label: "Subtitle", value: "A mystical journey" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#0c0a1d" },
  accentColor: { type: "color", label: "Accent/Glow", value: "#a855f7" },
  secondaryGlow: { type: "color", label: "Secondary Glow", value: "#3b82f6" },
  horseColor: { type: "color", label: "Horse Color", value: "#e2e8f0" },
  textColor: { type: "color", label: "Text Color", value: "#f8fafc" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  sparkleIntensity: { type: "number", label: "Sparkle Intensity", value: 1, min: 0.3, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 1, min: 0.5, max: 2, step: 0.1 },
  showTitle: { type: "boolean", label: "Show Title", value: true },
  showSparkles: { type: "boolean", label: "Show Sparkles", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const isPortrait = height > width;
  
  // Horse entrance animation
  const horseEntrance = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 22, stiffness: 80 } 
  });
  const horseY = interpolate(horseEntrance, [0, 1], [height * 0.15, 0]);
  const horseOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  // Floating animation for the horse
  const floatCycle = Math.sin((adjustedFrame / fps) * 1.5) * minDim * 0.015;
  
  // Mane flow animation
  const maneFlow = Math.sin((adjustedFrame / fps) * 2.5) * 8;
  
  // Glow pulse
  const glowPulse = 0.6 + Math.sin((adjustedFrame / fps) * 2) * 0.4;
  const glowSize = minDim * 0.4 * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * glowPulse;
  
  // Title animation
  const titleDelay = 25;
  const titleProgress = spring({ 
    frame: Math.max(0, adjustedFrame - titleDelay), 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  
  const subtitleDelay = 40;
  const subtitleProgress = spring({ 
    frame: Math.max(0, adjustedFrame - subtitleDelay), 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  
  // Sparkle positions
  const sparkles = [
    { x: 0.25, y: 0.2, delay: 0, size: 1 },
    { x: 0.75, y: 0.15, delay: 5, size: 0.8 },
    { x: 0.15, y: 0.4, delay: 10, size: 0.6 },
    { x: 0.85, y: 0.35, delay: 15, size: 0.9 },
    { x: 0.3, y: 0.6, delay: 8, size: 0.7 },
    { x: 0.7, y: 0.55, delay: 12, size: 0.85 },
    { x: 0.5, y: 0.25, delay: 3, size: 1.1 },
    { x: 0.4, y: 0.7, delay: 18, size: 0.65 },
    { x: 0.6, y: 0.75, delay: 22, size: 0.75 },
  ];
  
  const horseSize = isPortrait ? minDim * 0.7 : minDim * 0.55;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 60%, " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "15 0%, transparent 60%)",
      }} />
      
      {/* Sparkles */}
      {(props.showSparkles ?? SCENE_PARAMS.showSparkles.value) && sparkles.map((sparkle, i) => {
        const sparkleFrame = (adjustedFrame + sparkle.delay * 3) % 60;
        const sparkleOpacity = interpolate(
          sparkleFrame, 
          [0, 15, 30, 45, 60], 
          [0, 1, 0.3, 1, 0],
          { extrapolateRight: "clamp" }
        ) * (props.sparkleIntensity ?? SCENE_PARAMS.sparkleIntensity.value);
        const sparkleScale = interpolate(
          sparkleFrame,
          [0, 15, 30, 45, 60],
          [0.5, 1, 0.7, 1, 0.5]
        );
        
        return (
          <div key={i} style={{
            position: "absolute",
            left: width * sparkle.x,
            top: height * sparkle.y,
            width: minDim * 0.015 * sparkle.size,
            height: minDim * 0.015 * sparkle.size,
            opacity: sparkleOpacity,
            transform: "scale(" + sparkleScale + ") rotate(45deg)",
          }}>
            <div style={{
              position: "absolute",
              width: "100%",
              height: "20%",
              top: "40%",
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              borderRadius: minDim * 0.01,
              boxShadow: "0 0 " + (minDim * 0.02) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
            <div style={{
              position: "absolute",
              width: "20%",
              height: "100%",
              left: "40%",
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              borderRadius: minDim * 0.01,
              boxShadow: "0 0 " + (minDim * 0.02) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
          </div>
        );
      })}
      
      {/* Main content container with scale */}
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Magical glow behind horse */}
        <div style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "40 0%, " + (props.secondaryGlow ?? SCENE_PARAMS.secondaryGlow.value) + "20 40%, transparent 70%)",
          filter: "blur(" + (minDim * 0.05) + "px)",
          opacity: horseOpacity,
        }} />
        
        {/* Horse SVG */}
        <div style={{
          transform: "translateY(" + (horseY + floatCycle) + "px)",
          opacity: horseOpacity,
          filter: "drop-shadow(0 0 " + (minDim * 0.03 * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value)) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + ")",
        }}>
          <svg
            width={horseSize}
            height={horseSize}
            viewBox="0 0 200 200"
            style={{ overflow: "visible" }}
          >
            {/* Horse body */}
            <ellipse
              cx="100"
              cy="115"
              rx="45"
              ry="30"
              fill={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
            />
            
            {/* Horse neck */}
            <path
              d="M 70 100 Q 55 70 60 50 Q 65 35 75 30 Q 85 28 90 35 L 85 95"
              fill={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
            />
            
            {/* Horse head */}
            <ellipse
              cx="68"
              cy="38"
              rx="18"
              ry="15"
              fill={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
            />
            
            {/* Snout */}
            <ellipse
              cx="52"
              cy="45"
              rx="10"
              ry="8"
              fill={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
            />
            
            {/* Eye */}
            <circle
              cx="62"
              cy="35"
              r="3"
              fill={(props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value)}
            />
            <circle
              cx="61"
              cy="34"
              r="1"
              fill="#ffffff"
            />
            
            {/* Ear */}
            <path
              d="M 75 25 Q 78 15 82 20 Q 83 28 78 30"
              fill={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
            />
            
            {/* Magical horn */}
            <path
              d="M 70 22 L 65 -5 L 75 22"
              fill="url(#hornGradient)"
              style={{
                filter: "drop-shadow(0 0 " + (minDim * 0.01) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + ")",
              }}
            />
            
            {/* Mane */}
            <path
              d={"M 80 28 Q " + (95 + maneFlow) + " 35 " + (90 + maneFlow * 0.5) + " 55 Q " + (100 + maneFlow) + " 45 " + (95 + maneFlow * 0.7) + " 70 Q " + (105 + maneFlow) + " 60 " + (100 + maneFlow * 0.5) + " 85 Q " + (90 + maneFlow * 0.3) + " 95 85 100"}
              fill="none"
              stroke="url(#maneGradient)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Front legs */}
            <path
              d="M 75 135 Q 73 155 70 175"
              fill="none"
              stroke={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 90 138 Q 88 155 85 175"
              fill="none"
              stroke={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* Back legs */}
            <path
              d="M 120 138 Q 122 155 125 175"
              fill="none"
              stroke={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 135 135 Q 138 155 142 175"
              fill="none"
              stroke={(props.horseColor ?? SCENE_PARAMS.horseColor.value)}
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* Tail */}
            <path
              d={"M 145 110 Q " + (170 + maneFlow * 1.2) + " 100 " + (175 + maneFlow) + " 130 Q " + (180 + maneFlow * 0.8) + " 145 " + (170 + maneFlow * 0.5) + " 160"}
              fill="none"
              stroke="url(#tailGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="hornGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={(props.horseColor ?? SCENE_PARAMS.horseColor.value)} />
                <stop offset="50%" stopColor={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
                <stop offset="100%" stopColor={(props.secondaryGlow ?? SCENE_PARAMS.secondaryGlow.value)} />
              </linearGradient>
              <linearGradient id="maneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
                <stop offset="50%" stopColor={(props.secondaryGlow ?? SCENE_PARAMS.secondaryGlow.value)} />
                <stop offset="100%" stopColor={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
              </linearGradient>
              <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={(props.secondaryGlow ?? SCENE_PARAMS.secondaryGlow.value)} />
                <stop offset="100%" stopColor={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Title */}
        {(props.showTitle ?? SCENE_PARAMS.showTitle.value) && (
          <div style={{
            marginTop: minDim * 0.08,
            textAlign: "center",
          }}>
            <h1 style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", serif",
              fontSize: minDim * 0.09,
              fontWeight: 700,
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              margin: 0,
              opacity: titleProgress,
              transform: "translateY(" + titleY + "px)",
              textShadow: "0 0 " + (minDim * 0.03) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "80",
              letterSpacing: minDim * 0.005,
            }}>
              {(props.title ?? SCENE_PARAMS.title.value)}
            </h1>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", serif",
              fontSize: minDim * 0.035,
              fontWeight: 400,
              color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              margin: 0,
              marginTop: minDim * 0.015,
              opacity: subtitleProgress,
              letterSpacing: minDim * 0.008,
              textTransform: "uppercase",
            }}>
              {(props.subtitle ?? SCENE_PARAMS.subtitle.value)}
            </p>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

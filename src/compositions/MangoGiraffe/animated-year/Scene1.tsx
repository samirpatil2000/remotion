// Template: animated-year
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  yearText: { type: "text", label: "Year Text", value: "2026" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  waveColor: { type: "color", label: "Wave Color", value: "#22c55e" },
  glowColor: { type: "color", label: "Glow Color", value: "#4ade80" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  waveIntensity: { type: "number", label: "Wave Intensity", value: 30, min: 10, max: 60, step: 5 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  waveSpeed: { type: "number", label: "Wave Speed", value: 0.08, min: 0.02, max: 0.15, step: 0.01 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const textEntrance = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 25, stiffness: 80 } 
  });
  
  const textY = interpolate(textEntrance, [0, 1], [40, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
  
  const glowPulse = interpolate(
    Math.sin(adjustedFrame * 0.05),
    [-1, 1],
    [0.4, 1]
  ) * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value);
  
  const wavePoints = 100;
  const waveAmplitude = (props.waveIntensity ?? SCENE_PARAMS.waveIntensity.value);
  const waveFrequency = (props.waveSpeed ?? SCENE_PARAMS.waveSpeed.value);
  
  const waveEntrance = spring({ 
    frame: Math.max(0, adjustedFrame - 15), 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  
  const generateWavePath = (offset, yBase) => {
    let path = "M 0 " + height;
    
    for (let i = 0; i <= wavePoints; i++) {
      const x = (i / wavePoints) * width;
      const waveY = yBase + 
        Math.sin((i / wavePoints) * Math.PI * 3 + adjustedFrame * waveFrequency + offset) * waveAmplitude * waveEntrance +
        Math.sin((i / wavePoints) * Math.PI * 5 + adjustedFrame * waveFrequency * 0.7 + offset * 2) * (waveAmplitude * 0.4) * waveEntrance;
      
      path += " L " + x + " " + waveY;
    }
    
    path += " L " + width + " " + height + " Z";
    return path;
  };
  
  const waveBaseY = height * 0.62;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}>
        
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox={"0 0 " + width + " " + height}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.3" />
              <stop offset="100%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.5" />
              <stop offset="100%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.7" />
              <stop offset="100%" stopColor={(props.waveColor ?? SCENE_PARAMS.waveColor.value)} stopOpacity="0.15" />
            </linearGradient>
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <path
            d={generateWavePath(0, waveBaseY + 40)}
            fill="url(#waveGradient1)"
            style={{ opacity: waveEntrance }}
          />
          
          <path
            d={generateWavePath(2, waveBaseY + 15)}
            fill="url(#waveGradient2)"
            filter="url(#waveGlow)"
            style={{ opacity: waveEntrance }}
          />
          
          <path
            d={generateWavePath(4, waveBaseY - 10)}
            fill="url(#waveGradient3)"
            style={{ opacity: waveEntrance }}
          />
        </svg>
        
        <div style={{
          position: "relative",
          zIndex: 10,
          transform: "translateY(" + textY + "px)",
          opacity: textOpacity,
          marginTop: -height * 0.1,
        }}>
          <h1 style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: minDim * 0.28,
            fontWeight: 700,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            margin: 0,
            letterSpacing: minDim * 0.02,
            textShadow: "0 0 " + (60 * glowPulse) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + ", 0 0 " + (120 * glowPulse) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + "40, 0 0 " + (180 * glowPulse) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + "20",
          }}>
            {(props.yearText ?? SCENE_PARAMS.yearText.value)}
          </h1>
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

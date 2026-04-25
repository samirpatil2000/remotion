// Template: card
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  panelColor: { type: "color", label: "Panel Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Neon Accent", value: "#39ff14" },
  glowColor: { type: "color", label: "Glow Color", value: "#39ff14" },
  panelOpacity: { type: "number", label: "Panel Opacity", value: 0.12, min: 0.05, max: 0.3, step: 0.01 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  convergenceFrame: { type: "number", label: "Convergence Frame", value: 60, min: 30, max: 90, step: 5 },
  particleCount: { type: "number", label: "Particle Count", value: 24, min: 8, max: 40, step: 2 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0.3, max: 1, step: 0.1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const convergenceFrame = SCENE_PARAMS.convergenceFrame.value;
  
  const panels = [
    { id: 0, startX: -width * 0.6, startY: -height * 0.4, startRotate: -25, delay: 0 },
    { id: 1, startX: width * 0.7, startY: -height * 0.3, startRotate: 20, delay: 5 },
    { id: 2, startX: -width * 0.5, startY: height * 0.5, startRotate: 15, delay: 8 },
    { id: 3, startX: width * 0.6, startY: height * 0.4, startRotate: -18, delay: 12 },
    { id: 4, startX: 0, startY: -height * 0.6, startRotate: 8, delay: 15 },
    { id: 5, startX: 0, startY: height * 0.6, startRotate: -12, delay: 18 },
  ];
  
  const panelWidth = minDim * 0.28;
  const panelHeight = minDim * 0.18;
  
  const mergeComplete = adjustedFrame > convergenceFrame + 25;
  
  const pulseProgress = mergeComplete 
    ? spring({ frame: adjustedFrame - convergenceFrame - 25, fps, config: { damping: 15, stiffness: 80 } })
    : 0;
  
  const glowPulse = mergeComplete
    ? 0.5 + 0.5 * Math.sin((adjustedFrame - convergenceFrame - 25) * 0.15)
    : 0;
  
  const particles = [];
  const particleCount = SCENE_PARAMS.particleCount.value;
  
  if (mergeComplete) {
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const particleDelay = i * 2;
      const particleFrame = Math.max(0, adjustedFrame - convergenceFrame - 30 - particleDelay);
      const particleProgress = spring({ frame: particleFrame, fps, config: { damping: 25, stiffness: 60 } });
      
      const baseRadius = minDim * 0.22;
      const expandRadius = baseRadius + particleProgress * minDim * 0.15;
      const particleX = Math.cos(angle + particleFrame * 0.02) * expandRadius;
      const particleY = Math.sin(angle + particleFrame * 0.02) * expandRadius;
      const particleOpacity = interpolate(particleProgress, [0, 0.3, 1], [0, 1, 0.4], { extrapolateRight: "clamp" });
      const particleSize = minDim * 0.008 * (1 + Math.sin(particleFrame * 0.1 + i) * 0.3);
      
      particles.push({
        x: particleX,
        y: particleY,
        opacity: particleOpacity * SCENE_PARAMS.glowIntensity.value,
        size: particleSize,
        key: i,
      });
    }
  }
  
  const streaks = [];
  if (mergeComplete) {
    for (let i = 0; i < 8; i++) {
      const streakAngle = (i / 8) * Math.PI * 2 + adjustedFrame * 0.03;
      const streakFrame = Math.max(0, adjustedFrame - convergenceFrame - 35);
      const streakProgress = interpolate(streakFrame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
      const streakRadius = minDim * 0.2;
      const streakLength = minDim * 0.08 * streakProgress;
      
      streaks.push({
        angle: streakAngle,
        radius: streakRadius,
        length: streakLength,
        opacity: streakProgress * 0.6 * SCENE_PARAMS.glowIntensity.value,
        key: i,
      });
    }
  }
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: "scale(" + SCENE_PARAMS.scale.value + ")", 
        transformOrigin: "center center",
        position: "relative",
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        
        {mergeComplete && (
          <div style={{
            position: "absolute",
            width: minDim * 0.5,
            height: minDim * 0.5,
            borderRadius: "50%",
            background: "radial-gradient(circle, " + SCENE_PARAMS.glowColor.value + "20 0%, transparent 70%)",
            opacity: pulseProgress * glowPulse * SCENE_PARAMS.glowIntensity.value,
            transform: "scale(" + (1 + pulseProgress * 0.5) + ")",
          }} />
        )}
        
        {streaks.map((streak) => (
          <div key={streak.key} style={{
            position: "absolute",
            width: streak.length,
            height: 2,
            background: "linear-gradient(90deg, " + SCENE_PARAMS.accentColor.value + ", transparent)",
            opacity: streak.opacity,
            transform: "rotate(" + (streak.angle * 180 / Math.PI) + "deg) translateX(" + streak.radius + "px)",
            transformOrigin: "left center",
            borderRadius: 1,
          }} />
        ))}
        
        {panels.map((panel) => {
          const panelFrame = Math.max(0, adjustedFrame - panel.delay);
          const entranceProgress = spring({ 
            frame: panelFrame, 
            fps, 
            config: { damping: 22, stiffness: 85 } 
          });
          
          const convergeProgress = interpolate(
            adjustedFrame, 
            [convergenceFrame - 15, convergenceFrame + 10], 
            [0, 1], 
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          
          const currentX = interpolate(entranceProgress, [0, 1], [panel.startX, panel.startX * 0.15]);
          const currentY = interpolate(entranceProgress, [0, 1], [panel.startY, panel.startY * 0.15]);
          const currentRotate = interpolate(entranceProgress, [0, 1], [panel.startRotate, panel.startRotate * 0.3]);
          
          const finalX = interpolate(convergeProgress, [0, 1], [currentX, 0]);
          const finalY = interpolate(convergeProgress, [0, 1], [currentY, 0]);
          const finalRotate = interpolate(convergeProgress, [0, 1], [currentRotate, 0]);
          
          const scaleZ = interpolate(convergeProgress, [0, 0.5, 1], [1, 1.05, 1]);
          
          const panelOpacity = interpolate(entranceProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
          
          const edgeGlow = mergeComplete ? glowPulse * 0.8 : 0.4;
          
          return (
            <div
              key={panel.id}
              style={{
                position: "absolute",
                width: panelWidth,
                height: panelHeight,
                backgroundColor: SCENE_PARAMS.panelColor.value + Math.round(SCENE_PARAMS.panelOpacity.value * 255).toString(16).padStart(2, '0'),
                borderRadius: minDim * 0.015,
                transform: "translate(" + finalX + "px, " + finalY + "px) rotate(" + finalRotate + "deg) scale(" + scaleZ + ")",
                opacity: panelOpacity,
                border: "1px solid " + SCENE_PARAMS.accentColor.value + Math.round(edgeGlow * 180).toString(16).padStart(2, '0'),
                boxShadow: "0 0 " + (15 + edgeGlow * 20) + "px " + SCENE_PARAMS.accentColor.value + Math.round(edgeGlow * 100).toString(16).padStart(2, '0') + 
                          ", inset 0 0 20px " + SCENE_PARAMS.accentColor.value + "10",
                backdropFilter: "blur(4px)",
              }}
            >
              <div style={{
                position: "absolute",
                top: minDim * 0.015,
                left: minDim * 0.015,
                right: minDim * 0.015,
                height: minDim * 0.008,
                background: "linear-gradient(90deg, " + SCENE_PARAMS.accentColor.value + "60, transparent 60%)",
                borderRadius: minDim * 0.004,
              }} />
              
              <div style={{
                position: "absolute",
                bottom: minDim * 0.02,
                left: minDim * 0.015,
                width: "40%",
                height: minDim * 0.004,
                backgroundColor: SCENE_PARAMS.accentColor.value + "40",
                borderRadius: minDim * 0.002,
              }} />
              <div style={{
                position: "absolute",
                bottom: minDim * 0.035,
                left: minDim * 0.015,
                width: "60%",
                height: minDim * 0.004,
                backgroundColor: SCENE_PARAMS.panelColor.value + "30",
                borderRadius: minDim * 0.002,
              }} />
            </div>
          );
        })}
        
        {particles.map((particle) => (
          <div
            key={particle.key}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: SCENE_PARAMS.accentColor.value,
              transform: "translate(" + particle.x + "px, " + particle.y + "px)",
              opacity: particle.opacity,
              boxShadow: "0 0 " + (particle.size * 2) + "px " + SCENE_PARAMS.accentColor.value,
            }}
          />
        ))}
        
        {mergeComplete && (
          <div style={{
            position: "absolute",
            width: minDim * 0.35,
            height: minDim * 0.22,
            borderRadius: minDim * 0.02,
            border: "2px solid " + SCENE_PARAMS.accentColor.value + Math.round(pulseProgress * glowPulse * 200).toString(16).padStart(2, '0'),
            boxShadow: "0 0 30px " + SCENE_PARAMS.accentColor.value + Math.round(pulseProgress * glowPulse * 150).toString(16).padStart(2, '0') + 
                      ", 0 0 60px " + SCENE_PARAMS.accentColor.value + Math.round(pulseProgress * glowPulse * 80).toString(16).padStart(2, '0'),
            opacity: pulseProgress,
            pointerEvents: "none",
          }} />
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

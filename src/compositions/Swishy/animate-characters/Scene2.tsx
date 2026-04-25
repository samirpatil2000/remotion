// Template: animate-characters
// Description: No description available
// Scene: Scene 2

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  unicornImage: { type: "image", label: "Magical Horse", value: "blob:https://vm-syxpgt9t9xtdh4kycfzmnr.vusercontent.net/7b0a492f-177a-42f4-9c1d-7ac7412992b0" },
  titleText: { type: "text", label: "Title", value: "Part 2: The Mystery Forest" },
  subtitleText: { type: "text", label: "Subtitle", value: "A new adventure awaits..." },
  backgroundColor: { type: "color", label: "Background", value: "#0d1117" },
  forestColor: { type: "color", label: "Forest Color", value: "#1a2f1a" },
  accentColor: { type: "color", label: "Accent Glow", value: "#8b5cf6" },
  mistColor: { type: "color", label: "Mist Color", value: "#4c1d95" },
  textColor: { type: "color", label: "Text Color", value: "#e2e8f0" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  walkSpeed: { type: "number", label: "Walk Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0.3, max: 1, step: 0.1 },
  showTitle: { type: "boolean", label: "Show Title", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const walkSpeed = SCENE_PARAMS.walkSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  
  // Title entrance animation
  const titleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  
  // Title exit after showing
  const titleExit = interpolate(adjustedFrame, [60, 90], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Unicorn walking animation - enters from left, walks to center-right into forest
  const walkStartFrame = 30;
  const walkX = interpolate(
    adjustedFrame,
    [walkStartFrame, walkStartFrame + 120 / walkSpeed],
    [-width * 0.4, width * 0.15],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Bobbing animation for walking motion
  const bobAmount = Math.sin((adjustedFrame * walkSpeed * 0.3)) * 8;
  const legBob = Math.abs(Math.sin((adjustedFrame * walkSpeed * 0.6))) * 3;
  
  // Unicorn entrance fade
  const unicornEntrance = interpolate(adjustedFrame, [walkStartFrame, walkStartFrame + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Unicorn glow pulse
  const glowPulse = Math.sin(adjustedFrame * 0.08) * 0.3 + 0.7;
  const glowSize = 20 + Math.sin(adjustedFrame * 0.1) * 10;
  
  // Forest trees - parallax layers
  const treeLayers = [
    { count: 5, scale: 1.2, speed: 0.3, opacity: 0.3, y: height * 0.55 },
    { count: 7, scale: 0.9, speed: 0.5, opacity: 0.5, y: height * 0.6 },
    { count: 9, scale: 0.7, speed: 0.7, opacity: 0.7, y: height * 0.65 },
  ];
  
  // Mist animation
  const mistOffset1 = (adjustedFrame * 0.5) % (width * 1.5);
  const mistOffset2 = (adjustedFrame * 0.3 + width * 0.5) % (width * 1.5);
  
  // Fireflies / magical particles
  const particles = [];
  for (let i = 0; i < 15; i++) {
    const baseX = (i * 137.5) % width;
    const baseY = height * 0.3 + (i * 89.3) % (height * 0.5);
    const floatY = Math.sin((adjustedFrame + i * 20) * 0.05) * 20;
    const floatX = Math.cos((adjustedFrame + i * 15) * 0.03) * 15;
    const particleOpacity = (Math.sin((adjustedFrame + i * 30) * 0.08) + 1) * 0.4;
    particles.push({ x: baseX + floatX, y: baseY + floatY, opacity: particleOpacity, size: 3 + (i % 3) * 2 });
  }
  
  // Stars twinkling
  const stars = [];
  for (let i = 0; i < 20; i++) {
    const starX = (i * 193.7) % width;
    const starY = (i * 127.3) % (height * 0.4);
    const starOpacity = (Math.sin((adjustedFrame + i * 25) * 0.1) + 1) * 0.35 + 0.1;
    stars.push({ x: starX, y: starY, opacity: starOpacity });
  }
  
  // Subtitle entrance (after title)
  const subtitleDelay = 20;
  const subtitleProgress = spring({ frame: Math.max(0, adjustedFrame - subtitleDelay), fps, config: { damping: 20, stiffness: 90 } });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        
        {/* Deep space gradient background */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at 50% 30%, #1a1025 0%, #0d1117 50%, #050505 100%)",
        }} />
        
        {/* Twinkling stars */}
        {stars.map((star, i) => (
          <div key={"star-" + i} style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            width: 4,
            height: 4,
            opacity: star.opacity,
          }}>
            <div style={{
              position: "absolute",
              width: 4,
              height: 1,
              backgroundColor: "#c4b5fd",
              top: 1.5,
              left: 0,
            }} />
            <div style={{
              position: "absolute",
              width: 1,
              height: 4,
              backgroundColor: "#c4b5fd",
              top: 0,
              left: 1.5,
            }} />
          </div>
        ))}
        
        {/* Background forest layer (furthest) */}
        {treeLayers.map((layer, layerIndex) => (
          <div key={"layer-" + layerIndex} style={{ position: "absolute", width: "100%", height: "100%" }}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const treeX = (i / layer.count) * width * 1.3 - width * 0.15 - (adjustedFrame * layer.speed * 0.3);
              const treeHeight = minDim * 0.4 * layer.scale;
              return (
                <div key={"tree-" + layerIndex + "-" + i} style={{
                  position: "absolute",
                  left: treeX,
                  bottom: height - layer.y,
                  opacity: layer.opacity,
                }}>
                  {/* Tree trunk */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: treeHeight * 0.08,
                    height: treeHeight * 0.3,
                    backgroundColor: "#1a2f1a",
                    borderRadius: 4,
                  }} />
                  {/* Tree foliage */}
                  <div style={{
                    position: "absolute",
                    bottom: treeHeight * 0.2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: (treeHeight * 0.25) + "px solid transparent",
                    borderRight: (treeHeight * 0.25) + "px solid transparent",
                    borderBottom: (treeHeight * 0.5) + "px solid " + SCENE_PARAMS.forestColor.value,
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: treeHeight * 0.35,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: (treeHeight * 0.2) + "px solid transparent",
                    borderRight: (treeHeight * 0.2) + "px solid transparent",
                    borderBottom: (treeHeight * 0.4) + "px solid #0f1f0f",
                  }} />
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Mystical mist layers */}
        <div style={{
          position: "absolute",
          bottom: height * 0.15,
          left: -mistOffset1,
          width: width * 2,
          height: height * 0.25,
          background: "linear-gradient(to top, " + SCENE_PARAMS.mistColor.value + "40, transparent)",
          opacity: 0.6,
          filter: "blur(30px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: height * 0.1,
          left: -mistOffset2,
          width: width * 2,
          height: height * 0.2,
          background: "linear-gradient(to top, #8b5cf640, transparent)",
          opacity: 0.4,
          filter: "blur(40px)",
        }} />
        
        {/* Magical floating particles / fireflies */}
        {particles.map((p, i) => (
          <div key={"particle-" + i} style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#a855f7" : "#06b6d4",
            opacity: p.opacity * SCENE_PARAMS.glowIntensity.value,
            boxShadow: "0 0 " + (p.size * 3) + "px " + (i % 2 === 0 ? "#a855f7" : "#06b6d4"),
          }} />          
        ))}
        
        {/* The Magical Unicorn */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(" + walkX + "px, " + (bobAmount - minDim * 0.1) + "px)",
          opacity: unicornEntrance,
        }}>
          {/* Magical glow around unicorn */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: minDim * 0.45,
            height: minDim * 0.45,
            borderRadius: "50%",
            background: "radial-gradient(circle, " + SCENE_PARAMS.accentColor.value + "40 0%, transparent 70%)",
            opacity: glowPulse * SCENE_PARAMS.glowIntensity.value,
            filter: "blur(" + glowSize + "px)",
          }} />
          
          {/* Unicorn image */}
          <Img 
            src={SCENE_PARAMS.unicornImage.value}
            style={{
              width: minDim * 0.5,
              height: "auto",
              transform: "translateY(" + legBob + "px)",
              filter: "drop-shadow(0 0 20px " + SCENE_PARAMS.accentColor.value + "80)",
            }}
          />
        </div>
        
        {/* Ground / path */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: height * 0.18,
          background: "linear-gradient(to top, #0a0f0a, #1a2f1a 60%, transparent)",
        }} />
        
        {/* Path into forest */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.3,
          height: height * 0.25,
          background: "linear-gradient(to top, #2d1f3d50, transparent)",
          clipPath: "polygon(30% 100%, 70% 100%, 55% 0%, 45% 0%)",
          opacity: 0.7,
        }} />
        
        {/* Title overlay */}
        {SCENE_PARAMS.showTitle.value && (
          <div style={{
            position: "absolute",
            top: height * 0.08,
            left: 0,
            width: "100%",
            textAlign: "center",
            opacity: titleOpacity * titleExit,
            transform: "translateY(" + titleY + "px)",
          }}>
            <h1 style={{
              color: SCENE_PARAMS.textColor.value,
              fontSize: minDim * 0.07,
              fontWeight: 700,
              fontFamily: "system-ui, sans-serif",
              margin: 0,
              textShadow: "0 0 30px " + SCENE_PARAMS.accentColor.value + ", 0 2px 10px rgba(0,0,0,0.8)",
              letterSpacing: 2,
            }}>
              {SCENE_PARAMS.titleText.value}
            </h1>
            
            <p style={{
              color: "#94a3b8",
              fontSize: minDim * 0.032,
              fontWeight: 400,
              fontFamily: "system-ui, sans-serif",
              marginTop: minDim * 0.02,
              opacity: subtitleProgress * titleExit,
              transform: "translateY(" + subtitleY + "px)",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}>
              {SCENE_PARAMS.subtitleText.value}
            </p>
          </div>
        )}
        
        {/* Vignette overlay */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }} />
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

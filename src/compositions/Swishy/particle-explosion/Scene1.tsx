// Template: particle-explosion
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  centerText: { type: "text", label: "Center Text", value: "BOOM" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0a" },
  centerGradient1: { type: "color", label: "Center Gradient 1", value: "#667eea" },
  centerGradient2: { type: "color", label: "Center Gradient 2", value: "#764ba2" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  particleCount: { type: "number", label: "Particle Count", value: 40, min: 10, max: 80, step: 5 },
  particleSpeed: { type: "number", label: "Particle Speed", value: 0.3, min: 0.1, max: 0.8, step: 0.05 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  const minDim = Math.min(width, height);
  const particleCount = (props.particleCount ?? SCENE_PARAMS.particleCount.value);
  const baseSpeed = (props.particleSpeed ?? SCENE_PARAMS.particleSpeed.value);
  
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const particleSpeed = baseSpeed + (i % 5) * 0.15;
    const size = minDim * (0.015 + (i % 3) * 0.008);
    const hue = (i * 9) % 360;
    const delay = (i % 8) * 2;
    particles.push({ angle, speed: particleSpeed, size, hue, delay });
  }
  
  const centerScale = spring({ frame: adjustedFrame, fps, config: { damping: 8, stiffness: 80 } });
  const textOpacity = interpolate(adjustedFrame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center", position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {particles.map((p, i) => {
          const particleFrame = Math.max(0, adjustedFrame - p.delay);
          const distance = particleFrame * p.speed * minDim * 0.015;
          const x = Math.cos(p.angle) * distance;
          const y = Math.sin(p.angle) * distance;
          const opacity = interpolate(particleFrame, [0, 10, 50, 70], [0, 1, 1, 0], { extrapolateRight: "clamp" });
          const particleScale = interpolate(particleFrame, [0, 20, 60], [0.5, 1, 0.3], { extrapolateRight: "clamp" });
          
          return (
            <div key={i} style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "hsl(" + p.hue + ", 80%, 60%)",
              transform: "translate(" + x + "px, " + y + "px) scale(" + particleScale + ")",
              opacity: opacity,
              boxShadow: "0 0 " + (p.size * 2) + "px hsl(" + p.hue + ", 80%, 50%)",
            }} />
          );
        })}
        
        <div style={{
          width: minDim * 0.15,
          height: minDim * 0.15,
          borderRadius: "50%",
          background: "linear-gradient(135deg, " + (props.centerGradient1 ?? SCENE_PARAMS.centerGradient1.value) + " 0%, " + (props.centerGradient2 ?? SCENE_PARAMS.centerGradient2.value) + " 100%)",
          transform: "scale(" + centerScale + ")",
          boxShadow: "0 0 " + (minDim * 0.1) + "px " + (props.centerGradient1 ?? SCENE_PARAMS.centerGradient1.value) + "99",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <span style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: minDim * 0.04,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            opacity: textOpacity,
          }}>
            {(props.centerText ?? SCENE_PARAMS.centerText.value)}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: car-racing
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  roadColor: { type: "color", label: "Road Color", value: "#1e293b" },
  carBodyColor: { type: "color", label: "Car Body", value: "#3b82f6" },
  carWindowColor: { type: "color", label: "Car Windows", value: "#60a5fa" },
  wheelColor: { type: "color", label: "Wheel Color", value: "#1e293b" },
  lineColor: { type: "color", label: "Road Lines", value: "#fbbf24" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  carBounce: { type: "number", label: "Car Bounce", value: 3, min: 0, max: 10, step: 1 },
  showDust: { type: "boolean", label: "Show Dust", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  const isPortrait = height > width;
  
  const carWidth = minDim * 0.35;
  const carHeight = carWidth * 0.35;
  const wheelRadius = carWidth * 0.12;
  
  const roadY = height * 0.65;
  const roadHeight = height * 0.08;
  
  const carEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const carX = interpolate(carEntrance, [0, 1], [-carWidth * 1.5, width * 0.35]);
  
  const bounceAmount = (props.carBounce ?? SCENE_PARAMS.carBounce.value);
  const carBounce = Math.sin(adjustedFrame * 0.4) * bounceAmount;
  
  const wheelRotation = adjustedFrame * 12;
  
  const lineOffset = (adjustedFrame * 8) % (width * 0.3);
  
  const dustParticles = [];
  if ((props.showDust ?? SCENE_PARAMS.showDust.value) && adjustedFrame > 15) {
    for (let i = 0; i < 5; i++) {
      const particleDelay = i * 4;
      const particleLife = (adjustedFrame - 15 - particleDelay) % 30;
      if (particleLife >= 0 && particleLife < 30) {
        const particleX = carX - carWidth * 0.3 - particleLife * 3 - i * 15;
        const particleY = roadY - wheelRadius - particleLife * 1.5 + Math.sin(particleLife * 0.3) * 10;
        const particleOpacity = interpolate(particleLife, [0, 15, 30], [0.6, 0.4, 0], { extrapolateRight: "clamp" });
        const particleScale = interpolate(particleLife, [0, 30], [0.5, 1.5], { extrapolateRight: "clamp" });
        dustParticles.push({ x: particleX, y: particleY, opacity: particleOpacity, scale: particleScale, key: i });
      }
    }
  }
  
  const skyGradient = "linear-gradient(180deg, #1e3a5f 0%, " + (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) + " 100%)";
  
  const sunProgress = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  const sunY = interpolate(sunProgress, [0, 1], [-minDim * 0.15, height * 0.15]);
  
  return (
    <AbsoluteFill style={{ background: skyGradient, overflow: "hidden" }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center", width: "100%", height: "100%", position: "relative" }}>
        
        <div style={{
          position: "absolute",
          top: sunY,
          right: width * 0.15,
          width: minDim * 0.12,
          height: minDim * 0.12,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fbbf24 0%, #f59e0b 60%, transparent 70%)",
          boxShadow: "0 0 " + minDim * 0.08 + "px " + minDim * 0.04 + "px rgba(251, 191, 36, 0.4)",
          opacity: sunProgress,
        }} />
        
        <div style={{
          position: "absolute",
          top: roadY - height * 0.15,
          left: 0,
          width: "100%",
          height: height * 0.15,
          background: "linear-gradient(180deg, transparent 0%, rgba(30, 41, 59, 0.3) 100%)",
        }} />
        
        <div style={{
          position: "absolute",
          top: roadY - roadHeight / 2,
          left: 0,
          width: "100%",
          height: roadHeight,
          backgroundColor: (props.roadColor ?? SCENE_PARAMS.roadColor.value),
          borderTop: "3px solid #334155",
          borderBottom: "3px solid #0f172a",
        }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: -lineOffset,
            width: width * 2,
            height: 4,
            display: "flex",
            gap: width * 0.1,
            transform: "translateY(-50%)",
          }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} style={{
                width: width * 0.08,
                height: 4,
                backgroundColor: (props.lineColor ?? SCENE_PARAMS.lineColor.value),
                borderRadius: 2,
              }} />
            ))}
          </div>
        </div>
        
        <div style={{
          position: "absolute",
          top: roadY + roadHeight / 2,
          left: 0,
          width: "100%",
          height: height * 0.35,
          backgroundColor: "#1a2332",
        }} />
        
        {dustParticles.map((particle) => (
          <div key={particle.key} style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: minDim * 0.03,
            height: minDim * 0.03,
            borderRadius: "50%",
            backgroundColor: "#94a3b8",
            opacity: particle.opacity,
            transform: "scale(" + particle.scale + ")",
          }} />
        ))}
        
        <div style={{
          position: "absolute",
          left: carX,
          top: roadY - carHeight - wheelRadius * 0.5 + carBounce,
          width: carWidth,
          height: carHeight,
        }}>
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: carHeight * 0.5,
            backgroundColor: (props.carBodyColor ?? SCENE_PARAMS.carBodyColor.value),
            borderRadius: carHeight * 0.15,
            boxShadow: "0 " + carHeight * 0.1 + "px " + carHeight * 0.2 + "px rgba(0,0,0,0.3)",
          }} />
          
          <div style={{
            position: "absolute",
            bottom: carHeight * 0.35,
            left: carWidth * 0.2,
            width: carWidth * 0.55,
            height: carHeight * 0.5,
            backgroundColor: (props.carBodyColor ?? SCENE_PARAMS.carBodyColor.value),
            borderRadius: carHeight * 0.2 + "px " + carHeight * 0.2 + "px 0 0",
          }} />
          
          <div style={{
            position: "absolute",
            bottom: carHeight * 0.45,
            left: carWidth * 0.25,
            width: carWidth * 0.2,
            height: carHeight * 0.35,
            backgroundColor: (props.carWindowColor ?? SCENE_PARAMS.carWindowColor.value),
            borderRadius: carHeight * 0.1 + "px " + carHeight * 0.05 + "px 0 0",
            opacity: 0.8,
          }} />
          
          <div style={{
            position: "absolute",
            bottom: carHeight * 0.45,
            left: carWidth * 0.48,
            width: carWidth * 0.22,
            height: carHeight * 0.35,
            backgroundColor: (props.carWindowColor ?? SCENE_PARAMS.carWindowColor.value),
            borderRadius: carHeight * 0.05 + "px " + carHeight * 0.1 + "px 0 0",
            opacity: 0.8,
          }} />
          
          <div style={{
            position: "absolute",
            bottom: carHeight * 0.15,
            right: -carWidth * 0.02,
            width: carWidth * 0.08,
            height: carHeight * 0.12,
            backgroundColor: "#fbbf24",
            borderRadius: 3,
            boxShadow: "0 0 10px 5px rgba(251, 191, 36, 0.5)",
          }} />
          
          <div style={{
            position: "absolute",
            bottom: carHeight * 0.12,
            left: -carWidth * 0.01,
            width: carWidth * 0.06,
            height: carHeight * 0.08,
            backgroundColor: "#ef4444",
            borderRadius: 2,
            opacity: 0.9,
          }} />
          
          <div style={{
            position: "absolute",
            bottom: -wheelRadius * 0.6,
            left: carWidth * 0.15,
            width: wheelRadius * 2,
            height: wheelRadius * 2,
            borderRadius: "50%",
            backgroundColor: (props.wheelColor ?? SCENE_PARAMS.wheelColor.value),
            border: "3px solid #374151",
            transform: "rotate(" + wheelRotation + "deg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              width: wheelRadius * 0.8,
              height: wheelRadius * 0.8,
              borderRadius: "50%",
              backgroundColor: "#6b7280",
            }} />
            <div style={{
              position: "absolute",
              width: 3,
              height: wheelRadius * 1.6,
              backgroundColor: "#4b5563",
            }} />
            <div style={{
              position: "absolute",
              width: wheelRadius * 1.6,
              height: 3,
              backgroundColor: "#4b5563",
            }} />
          </div>
          
          <div style={{
            position: "absolute",
            bottom: -wheelRadius * 0.6,
            right: carWidth * 0.15,
            width: wheelRadius * 2,
            height: wheelRadius * 2,
            borderRadius: "50%",
            backgroundColor: (props.wheelColor ?? SCENE_PARAMS.wheelColor.value),
            border: "3px solid #374151",
            transform: "rotate(" + wheelRotation + "deg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              width: wheelRadius * 0.8,
              height: wheelRadius * 0.8,
              borderRadius: "50%",
              backgroundColor: "#6b7280",
            }} />
            <div style={{
              position: "absolute",
              width: 3,
              height: wheelRadius * 1.6,
              backgroundColor: "#4b5563",
            }} />
            <div style={{
              position: "absolute",
              width: wheelRadius * 1.6,
              height: 3,
              backgroundColor: "#4b5563",
            }} />
          </div>
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

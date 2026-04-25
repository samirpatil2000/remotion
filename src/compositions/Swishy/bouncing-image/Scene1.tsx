// Template: bouncing-image
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  stickerImage: { type: "image", label: "Smashing Good Sticker", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/6112d168-263d-4d9d-ac9a-48bee9c47f5b_background_removed.png" },
  backgroundColor: { type: "color", label: "Background", value: "#f5b81c" },
  shadowColor: { type: "color", label: "Shadow Color", value: "#000000" },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  stickerSize: { type: "number", label: "Sticker Size", value: 0.7, min: 0.3, max: 1, step: 0.05 },
  bounceIntensity: { type: "number", label: "Bounce Intensity", value: 1.2, min: 1, max: 1.5, step: 0.05 },
  shadowOffset: { type: "number", label: "Shadow Offset", value: 15, min: 5, max: 30, step: 1 },
  enablePulse: { type: "boolean", label: "Enable Pulse Loop", value: true },
  showParticles: { type: "boolean", label: "Show Burst Particles", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  const stickerSize = minDim * SCENE_PARAMS.stickerSize.value;
  const bounceIntensity = SCENE_PARAMS.bounceIntensity.value;
  const maxShadowOffset = SCENE_PARAMS.shadowOffset.value;
  
  // Pop-up entrance animation with overshoot
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 150 }
  });
  
  // Scale starts at 0, overshoots to bounceIntensity, settles to 1
  const popScale = interpolate(
    entranceProgress,
    [0, 0.6, 1],
    [0, bounceIntensity, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Vertical slam from above
  const slamY = interpolate(
    entranceProgress,
    [0, 1],
    [-height * 0.3, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Shadow grows with entrance
  const shadowProgress = interpolate(
    adjustedFrame,
    [0, 20],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const shadowOffset = shadowProgress * maxShadowOffset;
  
  // Pulse loop after entrance (starts after frame 40)
  const pulseFrame = Math.max(0, adjustedFrame - 40);
  const pulseScale = SCENE_PARAMS.enablePulse.value 
    ? 1 + Math.sin(pulseFrame * 0.08) * 0.02
    : 1;
  
  // Shadow pulse
  const shadowPulse = SCENE_PARAMS.enablePulse.value
    ? maxShadowOffset + Math.sin(pulseFrame * 0.08) * 3
    : maxShadowOffset;
  
  // Slight rotation wobble
  const wobble = SCENE_PARAMS.enablePulse.value && adjustedFrame > 40
    ? Math.sin(pulseFrame * 0.1) * 2
    : 0;
  
  // Burst particles
  const particles = [];
  if (SCENE_PARAMS.showParticles.value) {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const particleDelay = 8 + i * 0.5;
      const particleProgress = interpolate(
        adjustedFrame,
        [particleDelay, particleDelay + 15, particleDelay + 25],
        [0, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      const distance = interpolate(
        adjustedFrame,
        [particleDelay, particleDelay + 20],
        [stickerSize * 0.3, stickerSize * 0.8],
        { extrapolateRight: "clamp" }
      );
      particles.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: particleProgress,
        size: minDim * 0.015 + (i % 3) * minDim * 0.008,
        rotation: angle * (180 / Math.PI) + adjustedFrame * 2,
      });
    }
  }
  
  // Entrance opacity
  const opacity = interpolate(
    adjustedFrame,
    [0, 8],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Final combined scale
  const finalScale = popScale * pulseScale;
  const finalShadowOffset = adjustedFrame < 40 ? shadowOffset : shadowPulse;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden"
    }}>
      <div style={{ 
        transform: "scale(" + scaleValue + ")", 
        transformOrigin: "center center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        
        {/* Burst particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              backgroundColor: "#ffffff",
              borderRadius: i % 2 === 0 ? "50%" : "0%",
              transform: "translate(" + particle.x + "px, " + particle.y + "px) rotate(" + particle.rotation + "deg)",
              opacity: particle.opacity,
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          />
        ))}
        
        {/* Shadow layer */}
        <div style={{
          position: "absolute",
          width: stickerSize,
          height: stickerSize,
          transform: "translate(" + finalShadowOffset + "px, " + finalShadowOffset + "px) translateY(" + slamY + "px) scale(" + finalScale + ") rotate(" + wobble + "deg)",
          opacity: opacity * 0.3,
          filter: "blur(8px)",
        }}>
          <Img 
            src={SCENE_PARAMS.stickerImage.value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(0)",
            }}
          />
        </div>
        
        {/* Main sticker */}
        <div style={{
          width: stickerSize,
          height: stickerSize,
          transform: "translateY(" + slamY + "px) scale(" + finalScale + ") rotate(" + wobble + "deg)",
          opacity: opacity,
          filter: "drop-shadow(" + (finalShadowOffset * 0.3) + "px " + (finalShadowOffset * 0.3) + "px " + (finalShadowOffset * 0.5) + "px rgba(0,0,0,0.25))",
        }}>
          <Img 
            src={SCENE_PARAMS.stickerImage.value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        
        {/* Impact ring */}
        {adjustedFrame > 5 && adjustedFrame < 35 && (
          <div style={{
            position: "absolute",
            width: interpolate(adjustedFrame, [5, 35], [stickerSize * 0.5, stickerSize * 1.5], { extrapolateRight: "clamp" }),
            height: interpolate(adjustedFrame, [5, 35], [stickerSize * 0.5, stickerSize * 1.5], { extrapolateRight: "clamp" }),
            border: "4px solid rgba(255,255,255,0.8)",
            borderRadius: "50%",
            opacity: interpolate(adjustedFrame, [5, 35], [0.8, 0], { extrapolateRight: "clamp" }),
          }} />
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

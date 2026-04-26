// Template: loading
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  dotColor: { type: "color", label: "Dot Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent (Green)", value: "#22c55e" },
  dotCount: { type: "number", label: "Dot Count", value: 40, min: 20, max: 80, step: 5 },
  dotSize: { type: "number", label: "Dot Size", value: 14, min: 6, max: 24, step: 1 },
  orbitRadius: { type: "number", label: "Orbit Radius", value: 0.28, min: 0.15, max: 0.45, step: 0.02 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const dotCount = (props.dotCount ?? SCENE_PARAMS.dotCount.value);
  const dotSize = (props.dotSize ?? SCENE_PARAMS.dotSize.value);
  const orbitRadius = minDim * (props.orbitRadius ?? SCENE_PARAMS.orbitRadius.value);
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Phase timing (in adjusted frames)
  const chaosPhaseEnd = 60;
  const transitionPhaseEnd = 150;
  const syncPhaseStart = 150;
  const greenTransitionStart = 180;
  const greenTransitionEnd = 260;
  
  // Generate stable random values for each dot using seeded approach
  const dots = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < dotCount; i++) {
      const seed1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const seed2 = Math.sin(i * 93.9898 + 12.233) * 43758.5453;
      const seed3 = Math.sin(i * 45.9898 + 56.233) * 43758.5453;
      const seed4 = Math.sin(i * 67.9898 + 34.233) * 43758.5453;
      const seed5 = Math.sin(i * 23.9898 + 89.233) * 43758.5453;
      
      result.push({
        // Initial scattered position
        initialX: (seed1 - Math.floor(seed1)) * width * 0.8 + width * 0.1,
        initialY: (seed2 - Math.floor(seed2)) * height * 0.8 + height * 0.1,
        // Random drift direction and speed for chaos phase
        driftAngle: (seed3 - Math.floor(seed3)) * Math.PI * 2,
        driftSpeed: 0.3 + (seed4 - Math.floor(seed4)) * 0.7,
        // Final orbit angle
        orbitAngle: (i / dotCount) * Math.PI * 2,
        // Orbit distance variation
        orbitDistanceFactor: 0.85 + (seed5 - Math.floor(seed5)) * 0.3,
        // Slight size variation
        sizeFactor: 0.7 + (seed1 - Math.floor(seed1)) * 0.6,
        // Stagger for green transition
        greenDelay: (seed2 - Math.floor(seed2)) * 40,
      });
    }
    return result;
  }, [dotCount, width, height]);
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      overflow: "hidden",
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        {dots.map((dot, i) => {
          // Calculate chaos phase position (gentle drift)
          const chaosX = dot.initialX + Math.cos(dot.driftAngle) * dot.driftSpeed * Math.min(adjustedFrame, chaosPhaseEnd) * 0.5;
          const chaosY = dot.initialY + Math.sin(dot.driftAngle) * dot.driftSpeed * Math.min(adjustedFrame, chaosPhaseEnd) * 0.5;
          
          // Calculate synchronized orbit position
          const rotationSpeed = 0.008;
          const currentOrbitAngle = dot.orbitAngle + adjustedFrame * rotationSpeed;
          const orbitDistance = orbitRadius * dot.orbitDistanceFactor;
          const syncX = centerX + Math.cos(currentOrbitAngle) * orbitDistance;
          const syncY = centerY + Math.sin(currentOrbitAngle) * orbitDistance;
          
          // Smooth easing for transition
          const easedTransition = spring({
            frame: Math.max(0, adjustedFrame - chaosPhaseEnd),
            fps,
            config: { damping: 25, stiffness: 40 },
          });
          
          // Interpolate position
          const x = chaosX + (syncX - chaosX) * easedTransition;
          const y = chaosY + (syncY - chaosY) * easedTransition;
          
          // All dots turn green with staggered timing
          const greenProgress = interpolate(
            adjustedFrame,
            [greenTransitionStart + dot.greenDelay, greenTransitionEnd + dot.greenDelay],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          
          // Entrance fade
          const entranceOpacity = interpolate(
            adjustedFrame,
            [i * 0.3, i * 0.3 + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          
          const currentDotSize = dotSize * dot.sizeFactor;
          
          // Smooth color transition using greenProgress
          const glowIntensity = greenProgress * 0.7;
          const glowSize = 10 + greenProgress * 16;
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - currentDotSize / 2,
                top: y - currentDotSize / 2,
                width: currentDotSize,
                height: currentDotSize,
                borderRadius: "50%",
                backgroundColor: greenProgress > 0.01 
                  ? (props.accentColor ?? SCENE_PARAMS.accentColor.value) 
                  : (props.dotColor ?? SCENE_PARAMS.dotColor.value),
                opacity: entranceOpacity * (greenProgress > 0.01 ? (0.4 + greenProgress * 0.6) : 1),
                boxShadow: greenProgress > 0.01
                  ? "0 0 " + glowSize + "px rgba(34,197,94," + glowIntensity + ")"
                  : "none",
              }}
            />
          );
        })}
        
        {/* Subtle center glow that appears during sync phase */}
        <div style={{
          position: "absolute",
          left: centerX - minDim * 0.2,
          top: centerY - minDim * 0.2,
          width: minDim * 0.4,
          height: minDim * 0.4,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0) 70%)",
          opacity: interpolate(adjustedFrame, [greenTransitionStart, greenTransitionEnd + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          pointerEvents: "none",
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

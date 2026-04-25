// Template: clock-and-text
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#e8a4c9" },
  clockFaceColor: { type: "color", label: "Clock Face", value: "#000000" },
  handColor1: { type: "color", label: "Hand Color 1", value: "#e8a44a" },
  handColor2: { type: "color", label: "Hand Color 2", value: "#d4553a" },
  centerDotColor: { type: "color", label: "Center Dot", value: "#d4553a" },
  pillBgColor: { type: "color", label: "Pill Background", value: "#ffffff" },
  pillTextColor: { type: "color", label: "Pill Text", value: "#1a1a1a" },
  word1: { type: "text", label: "Word 1", value: "present" },
  word2: { type: "text", label: "Word 2", value: "moment" },
  word3: { type: "text", label: "Word 3", value: "instant" },
  word4: { type: "text", label: "Word 4", value: "hour" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const clockSize = minDim * 0.85;
  const clockRadius = clockSize / 2;
  const centerX = width / 2;
  const centerY = height / 2 - minDim * 0.05;
  
  // Gravity physics for falling elements
  const gravity = 0.8;
  const bounceDamping = 0.4;
  
  const calculateFall = (startFrame, initialY, targetY) => {
    const elapsed = Math.max(0, adjustedFrame - startFrame);
    if (elapsed <= 0) return initialY;
    
    const fallDistance = targetY - initialY;
    const fallTime = Math.sqrt(2 * Math.abs(fallDistance) / gravity);
    
    if (elapsed < fallTime) {
      // Accelerating fall
      const progress = elapsed / fallTime;
      return initialY + fallDistance * progress * progress;
    } else {
      // Bounce phase
      const bounceElapsed = elapsed - fallTime;
      const bounceHeight = fallDistance * 0.15 * Math.exp(-bounceElapsed * 0.15);
      const bounceFreq = 0.3;
      const bounce = Math.abs(Math.sin(bounceElapsed * bounceFreq)) * bounceHeight;
      return targetY - bounce;
    }
  };
  
  // Clock hands animation
  const hand1StartFrame = 0;
  const hand2StartFrame = 10;
  
  // Hand 1 - longer, goes from upper right to lower left (10:20 position)
  const hand1InitialAngle = -60; // starts pointing up-right
  const hand1TargetAngle = 145; // ends pointing lower-left
  const hand1FallProgress = interpolate(adjustedFrame, [hand1StartFrame, hand1StartFrame + 40], [0, 1], { extrapolateRight: "clamp" });
  const hand1Angle = interpolate(
    hand1FallProgress * hand1FallProgress,
    [0, 1],
    [hand1InitialAngle, hand1TargetAngle]
  );
  
  // Hand 2 - shorter, goes from upper left area to right
  const hand2InitialAngle = -120;
  const hand2TargetAngle = -15;
  const hand2FallProgress = interpolate(adjustedFrame, [hand2StartFrame, hand2StartFrame + 35], [0, 1], { extrapolateRight: "clamp" });
  const hand2Angle = interpolate(
    hand2FallProgress * hand2FallProgress,
    [0, 1],
    [hand2InitialAngle, hand2TargetAngle]
  );
  
  // Pills falling animation
  const words = [
    { text: SCENE_PARAMS.word1.value, startFrame: 25 },
    { text: SCENE_PARAMS.word2.value, startFrame: 35 },
    { text: SCENE_PARAMS.word3.value, startFrame: 45 },
    { text: SCENE_PARAMS.word4.value, startFrame: 55 }
  ];
  
  const pillHeight = minDim * 0.055;
  const pillGap = minDim * 0.012;
  const pillsStartY = -minDim * 0.2;
  const pillsBaseY = centerY + clockRadius * 0.35;
  
  // Clock face fade in
  const clockOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  // Center dot appearance
  const centerDotScale = spring({
    frame: Math.max(0, adjustedFrame - 15),
    fps,
    config: { damping: 12, stiffness: 150 }
  });
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative"
      }}>
        {/* Clock face */}
        <div style={{
          position: "absolute",
          left: centerX - clockRadius,
          top: centerY - clockRadius,
          width: clockSize,
          height: clockSize,
          borderRadius: "50%",
          backgroundColor: SCENE_PARAMS.clockFaceColor.value,
          opacity: clockOpacity
        }} />
        
        {/* Clock hands */}
        <svg style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: width,
          height: height,
          pointerEvents: "none"
        }}>
          {/* Hand 1 - longer, gradient from yellow to orange */}
          <defs>
            <linearGradient id="hand1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c99535" />
              <stop offset="100%" stopColor={SCENE_PARAMS.handColor1.value} />
            </linearGradient>
            <linearGradient id="hand2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SCENE_PARAMS.handColor2.value} />
              <stop offset="100%" stopColor="#e87a50" />
            </linearGradient>
          </defs>
          
          {/* Long hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.cos((hand1Angle - 90) * Math.PI / 180) * clockRadius * 0.85}
            y2={centerY + Math.sin((hand1Angle - 90) * Math.PI / 180) * clockRadius * 0.85}
            stroke="url(#hand1Gradient)"
            strokeWidth={minDim * 0.018}
            strokeLinecap="round"
            opacity={hand1FallProgress > 0 ? 1 : 0}
          />
          
          {/* Short hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.cos((hand2Angle - 90) * Math.PI / 180) * clockRadius * 0.55}
            y2={centerY + Math.sin((hand2Angle - 90) * Math.PI / 180) * clockRadius * 0.55}
            stroke="url(#hand2Gradient)"
            strokeWidth={minDim * 0.018}
            strokeLinecap="round"
            opacity={hand2FallProgress > 0 ? 1 : 0}
          />
        </svg>
        
        {/* Center dot */}
        <div style={{
          position: "absolute",
          left: centerX - minDim * 0.025,
          top: centerY - minDim * 0.025,
          width: minDim * 0.05,
          height: minDim * 0.05,
          borderRadius: "50%",
          backgroundColor: SCENE_PARAMS.centerDotColor.value,
          transform: "scale(" + centerDotScale + ")",
          border: minDim * 0.008 + "px solid " + SCENE_PARAMS.handColor1.value
        }} />
        
        {/* Falling pills */}
        {words.map((word, i) => {
          const targetY = pillsBaseY + (i * (pillHeight + pillGap));
          const currentY = calculateFall(word.startFrame, pillsStartY, targetY);
          const isVisible = adjustedFrame >= word.startFrame;
          
          const pillWidth = word.text.length * minDim * 0.028 + minDim * 0.06;
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: centerX - pillWidth / 2,
                top: currentY,
                backgroundColor: SCENE_PARAMS.pillBgColor.value,
                borderRadius: pillHeight / 2,
                paddingLeft: minDim * 0.03,
                paddingRight: minDim * 0.03,
                paddingTop: minDim * 0.012,
                paddingBottom: minDim * 0.012,
                opacity: isVisible ? 1 : 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.038,
                fontWeight: 500,
                color: SCENE_PARAMS.pillTextColor.value,
                fontStyle: "italic"
              }}>
                {word.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

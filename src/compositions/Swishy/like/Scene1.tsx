// Template: like
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  likeCount: { type: "text", label: "Like Count", value: "1" },
  bubbleColor: { type: "color", label: "Bubble Color", value: "#ed4956" },
  heartColor: { type: "color", label: "Heart Color", value: "#ffffff" },
  backgroundColor: { type: "color", label: "Background", value: "#fafafa" },
  glowColor: { type: "color", label: "Glow Color", value: "#ed4956" },
  floatingHeartColor: { type: "color", label: "Floating Hearts", value: "#ed4956" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  slideDistance: { type: "number", label: "Slide Distance", value: 300, min: 100, max: 500, step: 50 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0, max: 1, step: 0.1 },
  heartCount: { type: "number", label: "Floating Hearts", value: 8, min: 4, max: 15, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  // Slide up animation with soft bounce
  const slideProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 18, stiffness: 80 }
  });
  
  const slideY = interpolate(
    slideProgress,
    [0, 1],
    [SCENE_PARAMS.slideDistance.value, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Scale pop as it lands (delayed slightly)
  const scalePopProgress = spring({
    frame: Math.max(0, adjustedFrame - 8),
    fps,
    config: { damping: 12, stiffness: 150 }
  });
  
  const scaleValue = interpolate(
    scalePopProgress,
    [0, 0.5, 0.7, 1],
    [0.8, 1.1, 0.95, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Glow appears briefly as card lands
  const glowOpacity = interpolate(
    adjustedFrame,
    [10, 25, 50, 80],
    [0, SCENE_PARAMS.glowIntensity.value, SCENE_PARAMS.glowIntensity.value * 0.6, 0.2],
    { extrapolateRight: "clamp" }
  );
  
  // Bubble dimensions
  const bubbleSize = minDim * 0.22;
  
  // Floating hearts configuration
  const heartCount = SCENE_PARAMS.heartCount.value;
  const floatingHearts = [];
  
  for (let i = 0; i < heartCount; i++) {
    const startDelay = 25 + i * 10;
    const heartFrame = Math.max(0, adjustedFrame - startDelay);
    const duration = 70;
    const progress = Math.min(heartFrame / duration, 1);
    
    // Random-ish positioning using index
    const xOffset = Math.sin(i * 2.5) * (minDim * 0.28);
    const startY = minDim * 0.1;
    const endY = -minDim * 0.45;
    const yPos = interpolate(progress, [0, 1], [startY, endY], { extrapolateRight: "clamp" });
    
    // Horizontal drift
    const drift = Math.sin(heartFrame / 18 + i) * 12;
    
    // Fade in and out
    const opacity = interpolate(
      progress,
      [0, 0.15, 0.6, 1],
      [0, 0.6, 0.4, 0],
      { extrapolateRight: "clamp" }
    );
    
    // Scale animation
    const heartScale = interpolate(
      progress,
      [0, 0.2, 1],
      [0.4, 1, 0.5],
      { extrapolateRight: "clamp" }
    );
    
    const heartSize = minDim * 0.035 * (0.7 + (i % 3) * 0.25);
    
    if (progress > 0 && progress < 1) {
      floatingHearts.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(calc(-50% + " + (xOffset + drift) + "px), calc(-50% + " + yPos + "px)) scale(" + heartScale + ")",
            opacity: opacity,
            fontSize: heartSize,
            color: SCENE_PARAMS.floatingHeartColor.value,
            filter: "blur(0.5px)",
            zIndex: 1,
          }}
        >
          ♥
        </div>
      );
    }
  }
  
  // Heart SVG path for the main bubble
  const HeartIcon = ({ size, color }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ display: "block" }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: SCENE_PARAMS.backgroundColor.value,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Floating hearts behind the bubble */}
      {floatingHearts}
      
      {/* Main notification bubble container */}
      <div
        style={{
          transform: "scale(" + (scaleValue * SCENE_PARAMS.scale.value) + ") translateY(" + slideY + "px)",
          transformOrigin: "center center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Soft glow effect - appears briefly */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: bubbleSize * 1.8,
            height: bubbleSize * 1.8,
            borderRadius: "50%",
            background: "radial-gradient(circle, " + SCENE_PARAMS.glowColor.value + " 0%, transparent 65%)",
            opacity: glowOpacity,
            filter: "blur(20px)",
            zIndex: -1,
          }}
        />
        
        {/* Red notification bubble */}
        <div
          style={{
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: "50%",
            backgroundColor: SCENE_PARAMS.bubbleColor.value,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 " + (minDim * 0.01) + "px " + (minDim * 0.03) + "px rgba(0, 0, 0, 0.25)",
            gap: minDim * 0.008,
          }}
        >
          {/* White heart icon */}
          <HeartIcon
            size={bubbleSize * 0.4}
            color={SCENE_PARAMS.heartColor.value}
          />
          
          {/* Number 1 */}
          <span
            style={{
              color: SCENE_PARAMS.heartColor.value,
              fontSize: bubbleSize * 0.22,
              fontWeight: 700,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 1,
              marginTop: -minDim * 0.005,
            }}
          >
            {SCENE_PARAMS.likeCount.value}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

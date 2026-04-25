// Template: text-intro
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  title: { type: "text", label: "Title", value: "Welcome" },
  subtitle: { type: "text", label: "Subtitle", value: "Demo Animation Scene" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  textColor: { type: "color", label: "Text Color", value: "#f8fafc" },
  subtitleColor: { type: "color", label: "Subtitle Color", value: "#94a3b8" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 30, min: 10, max: 60, step: 5 },
  
  // Options
  showLine: { type: "boolean", label: "Show Line", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  const entranceOffset = SCENE_PARAMS.entranceOffset.value;
  
  // Responsive calculations
  const minDim = Math.min(width, height);
  const fontSize = minDim * 0.08;
  const subtitleSize = minDim * 0.03;
  
  // Animations
  const titleOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(adjustedFrame, [0, 25], [entranceOffset, 0], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame: adjustedFrame, fps, config: { damping: 12, stiffness: 100 } });
  
  const subtitleOpacity = interpolate(adjustedFrame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(adjustedFrame, [20, 45], [20, 0], { extrapolateRight: "clamp" });
  
  const lineWidth = SCENE_PARAMS.showLine.value 
    ? interpolate(adjustedFrame, [10, 40], [0, width * 0.3], { extrapolateRight: "clamp" })
    : 0;
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center" }}>
        {/* Animated line */}
        {SCENE_PARAMS.showLine.value && (
          <div style={{
            position: "absolute",
            top: height * 0.35,
            left: "50%",
            transform: "translateX(-50%)",
            width: lineWidth,
            height: 3,
            backgroundColor: SCENE_PARAMS.accentColor.value,
            borderRadius: 2,
          }} />
        )}
        
        {/* Title */}
        <h1 style={{
          color: SCENE_PARAMS.textColor.value,
          fontSize: fontSize,
          fontWeight: 700,
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: titleOpacity,
          transform: "translateY(" + titleY + "px) scale(" + titleScale + ")",
          textAlign: "center",
          margin: 0,
        }}>
          {SCENE_PARAMS.title.value}
        </h1>
        
        {/* Subtitle */}
        <p style={{
          color: SCENE_PARAMS.subtitleColor.value,
          fontSize: subtitleSize,
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: subtitleOpacity,
          transform: "translateY(" + subtitleY + "px)",
          marginTop: minDim * 0.02,
          textAlign: "center",
        }}>
          {SCENE_PARAMS.subtitle.value}
        </p>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

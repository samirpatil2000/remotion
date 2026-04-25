// Template: system
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  blockColor: { type: "color", label: "Block Color", value: "#ffffff" },
  lineColor: { type: "color", label: "Line Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent Glow", value: "#22c55e" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  blockOpacity: { type: "number", label: "Block Opacity", value: 0.9, min: 0.3, max: 1, step: 0.05 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0.2, max: 1, step: 0.1 },
  reorganizeDelay: { type: "number", label: "Reorganize Start", value: 45, min: 20, max: 80, step: 5 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const reorganizeStart = SCENE_PARAMS.reorganizeDelay.value;
  
  const blockWidth = minDim * 0.08;
  const blockHeight = minDim * 0.045;
  const lineThickness = minDim * 0.003;
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  const initialPositions = [
    { id: 0, x: centerX, y: centerY - minDim * 0.25, level: 0 },
    { id: 1, x: centerX - minDim * 0.2, y: centerY - minDim * 0.1, level: 1 },
    { id: 2, x: centerX + minDim * 0.2, y: centerY - minDim * 0.1, level: 1 },
    { id: 3, x: centerX - minDim * 0.3, y: centerY + minDim * 0.08, level: 2 },
    { id: 4, x: centerX - minDim * 0.1, y: centerY + minDim * 0.08, level: 2 },
    { id: 5, x: centerX + minDim * 0.1, y: centerY + minDim * 0.08, level: 2 },
    { id: 6, x: centerX + minDim * 0.3, y: centerY + minDim * 0.08, level: 2 },
    { id: 7, x: centerX - minDim * 0.25, y: centerY + minDim * 0.22, level: 3 },
    { id: 8, x: centerX - minDim * 0.05, y: centerY + minDim * 0.22, level: 3 },
    { id: 9, x: centerX + minDim * 0.15, y: centerY + minDim * 0.22, level: 3 },
    { id: 10, x: centerX + minDim * 0.35, y: centerY + minDim * 0.22, level: 3 },
  ];
  
  const finalPositions = [
    { id: 0, x: centerX, y: centerY - minDim * 0.28, level: 0 },
    { id: 1, x: centerX - minDim * 0.15, y: centerY - minDim * 0.12, level: 1 },
    { id: 2, x: centerX + minDim * 0.15, y: centerY - minDim * 0.12, level: 1 },
    { id: 3, x: centerX - minDim * 0.28, y: centerY + minDim * 0.05, level: 2 },
    { id: 4, x: centerX - minDim * 0.08, y: centerY + minDim * 0.05, level: 2 },
    { id: 5, x: centerX + minDim * 0.08, y: centerY + minDim * 0.05, level: 2 },
    { id: 6, x: centerX + minDim * 0.28, y: centerY + minDim * 0.05, level: 2 },
    { id: 7, x: centerX - minDim * 0.32, y: centerY + minDim * 0.2, level: 3 },
    { id: 8, x: centerX - minDim * 0.12, y: centerY + minDim * 0.2, level: 3 },
    { id: 9, x: centerX + minDim * 0.12, y: centerY + minDim * 0.2, level: 3 },
    { id: 10, x: centerX + minDim * 0.32, y: centerY + minDim * 0.2, level: 3 },
  ];
  
  const initialConnections = [
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 7 }, { from: 4, to: 8 },
    { from: 5, to: 9 }, { from: 6, to: 10 },
  ];
  
  const getBlockPosition = (blockIndex) => {
    const initial = initialPositions[blockIndex];
    const final = finalPositions[blockIndex];
    const entranceDelay = initial.level * 8;
    
    const entranceProgress = spring({
      frame: Math.max(0, adjustedFrame - entranceDelay),
      fps,
      config: { damping: 22, stiffness: 85 }
    });
    
    const reorganizeProgress = spring({
      frame: Math.max(0, adjustedFrame - reorganizeStart - blockIndex * 3),
      fps,
      config: { damping: 25, stiffness: 70 }
    });
    
    const startY = initial.y + minDim * 0.15;
    const enteredY = interpolate(entranceProgress, [0, 1], [startY, initial.y]);
    const enteredX = initial.x;
    
    const finalX = interpolate(reorganizeProgress, [0, 1], [enteredX, final.x]);
    const finalY = interpolate(reorganizeProgress, [0, 1], [enteredY, final.y]);
    
    return { x: finalX, y: finalY, entranceProgress, reorganizeProgress };
  };
  
  const glowPhase = adjustedFrame > reorganizeStart + 50 ? 
    Math.sin((adjustedFrame - reorganizeStart - 50) * 0.08) * 0.5 + 0.5 : 0;
  
  const pulseProgress = interpolate(
    adjustedFrame,
    [reorganizeStart + 50, reorganizeStart + 80],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const blocks = initialPositions.map((_, index) => {
    const pos = getBlockPosition(index);
    const glowAmount = glowPhase * SCENE_PARAMS.glowIntensity.value * pulseProgress;
    
    const accentLineProgress = interpolate(
      adjustedFrame,
      [reorganizeStart + 60 + index * 4, reorganizeStart + 90 + index * 4],
      [0, 1],
      { extrapolateRight: "clamp" }
    );
    
    return (
      <React.Fragment key={index}>
        <div style={{
          position: "absolute",
          left: pos.x - blockWidth / 2,
          top: pos.y - blockHeight / 2,
          width: blockWidth,
          height: blockHeight,
          backgroundColor: SCENE_PARAMS.blockColor.value,
          opacity: pos.entranceProgress * SCENE_PARAMS.blockOpacity.value,
          borderRadius: minDim * 0.008,
          boxShadow: glowAmount > 0 ? 
            `0 0 ${minDim * 0.02 * glowAmount}px ${minDim * 0.008 * glowAmount}px ${SCENE_PARAMS.accentColor.value}` : 
            "none",
          transition: "box-shadow 0.1s ease",
        }} />
        
        {accentLineProgress > 0 && (
          <>
            <div style={{
              position: "absolute",
              left: pos.x - blockWidth / 2 - minDim * 0.005,
              top: pos.y - blockHeight / 2,
              width: minDim * 0.003,
              height: blockHeight * accentLineProgress,
              backgroundColor: SCENE_PARAMS.accentColor.value,
              opacity: 0.7,
              borderRadius: minDim * 0.002,
            }} />
            <div style={{
              position: "absolute",
              left: pos.x + blockWidth / 2 + minDim * 0.002,
              top: pos.y + blockHeight / 2 - blockHeight * accentLineProgress,
              width: minDim * 0.003,
              height: blockHeight * accentLineProgress,
              backgroundColor: SCENE_PARAMS.accentColor.value,
              opacity: 0.7,
              borderRadius: minDim * 0.002,
            }} />
          </>
        )}
        
        {accentLineProgress > 0.8 && (
          <>
            <div style={{
              position: "absolute",
              left: pos.x - blockWidth / 2 - minDim * 0.012,
              top: pos.y - minDim * 0.007,
              width: minDim * 0.014,
              height: minDim * 0.014,
              backgroundColor: SCENE_PARAMS.accentColor.value,
              borderRadius: "50%",
              opacity: glowPhase * 0.8,
            }} />
            <div style={{
              position: "absolute",
              left: pos.x + blockWidth / 2 - minDim * 0.002,
              top: pos.y - minDim * 0.007,
              width: minDim * 0.014,
              height: minDim * 0.014,
              backgroundColor: SCENE_PARAMS.accentColor.value,
              borderRadius: "50%",
              opacity: glowPhase * 0.8,
            }} />
          </>
        )}
      </React.Fragment>
    );
  });
  
  const connections = initialConnections.map((conn, index) => {
    const fromPos = getBlockPosition(conn.from);
    const toPos = getBlockPosition(conn.to);
    
    const lineDelay = Math.max(initialPositions[conn.from].level, initialPositions[conn.to].level) * 8 + 10;
    const lineProgress = spring({
      frame: Math.max(0, adjustedFrame - lineDelay),
      fps,
      config: { damping: 25, stiffness: 80 }
    });
    
    const startX = fromPos.x;
    const startY = fromPos.y + blockHeight / 2;
    const endX = toPos.x;
    const endY = toPos.y - blockHeight / 2;
    const midY = (startY + endY) / 2;
    
    const lineGlowAmount = glowPhase * SCENE_PARAMS.glowIntensity.value * pulseProgress * 0.6;
    
    const verticalLength1 = (midY - startY) * lineProgress;
    const horizontalLength = (endX - startX) * lineProgress;
    const verticalLength2 = (endY - midY) * lineProgress;
    
    return (
      <React.Fragment key={"conn-" + index}>
        {verticalLength1 > 0 && (
          <div style={{
            position: "absolute",
            left: startX - lineThickness / 2,
            top: startY,
            width: lineThickness,
            height: Math.abs(verticalLength1),
            backgroundColor: SCENE_PARAMS.lineColor.value,
            opacity: lineProgress * 0.6,
            boxShadow: lineGlowAmount > 0 ? 
              `0 0 ${minDim * 0.01 * lineGlowAmount}px ${SCENE_PARAMS.accentColor.value}` : 
              "none",
          }} />
        )}
        
        {Math.abs(horizontalLength) > 0 && lineProgress > 0.3 && (
          <div style={{
            position: "absolute",
            left: horizontalLength > 0 ? startX : startX + horizontalLength,
            top: midY - lineThickness / 2,
            width: Math.abs(horizontalLength),
            height: lineThickness,
            backgroundColor: SCENE_PARAMS.lineColor.value,
            opacity: lineProgress * 0.6,
            boxShadow: lineGlowAmount > 0 ? 
              `0 0 ${minDim * 0.01 * lineGlowAmount}px ${SCENE_PARAMS.accentColor.value}` : 
              "none",
          }} />
        )}
        
        {verticalLength2 > 0 && lineProgress > 0.5 && (
          <div style={{
            position: "absolute",
            left: endX - lineThickness / 2,
            top: midY,
            width: lineThickness,
            height: Math.abs(verticalLength2),
            backgroundColor: SCENE_PARAMS.lineColor.value,
            opacity: lineProgress * 0.6,
            boxShadow: lineGlowAmount > 0 ? 
              `0 0 ${minDim * 0.01 * lineGlowAmount}px ${SCENE_PARAMS.accentColor.value}` : 
              "none",
          }} />
        )}
      </React.Fragment>
    );
  });
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        position: "relative",
      }}>
        {connections}
        {blocks}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

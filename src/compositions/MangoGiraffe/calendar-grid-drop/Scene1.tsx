// Template: calendar-grid-drop
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  gridColor: { type: "color", label: "Grid Color", value: "#ffffff" },
  checkmarkColor: { type: "color", label: "Checkmark Color", value: "#22c55e" },
  glowColor: { type: "color", label: "Glow Color", value: "#22c55e" },
  gridCount: { type: "number", label: "Grid Count", value: 8, min: 4, max: 12, step: 1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  gridOpacity: { type: "number", label: "Grid Opacity", value: 0.85, min: 0.3, max: 1, step: 0.05 },
  clutterIntensity: { type: "number", label: "Clutter Intensity", value: 1, min: 0.5, max: 1.5, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const gridCount = (props.gridCount ?? SCENE_PARAMS.gridCount.value);
  const clutterIntensity = (props.clutterIntensity ?? SCENE_PARAMS.clutterIntensity.value);
  
  // Timing phases
  const stackPhaseEnd = 45;
  const clutterPhaseEnd = 90;
  const fadePhaseStart = 95;
  const fadePhaseEnd = 160;
  const checkmarkStart = 140;
  
  // Generate grid configurations
  const grids = [];
  for (let i = 0; i < gridCount; i++) {
    const seed = i * 137.5;
    grids.push({
      id: i,
      offsetX: Math.sin(seed) * minDim * 0.12 * clutterIntensity,
      offsetY: Math.cos(seed * 1.3) * minDim * 0.1 * clutterIntensity,
      rotation: Math.sin(seed * 0.7) * 8 * clutterIntensity,
      scale: 0.7 + Math.sin(seed * 0.5) * 0.2,
      stackDelay: i * 4,
      fadeDelay: i * 8,
    });
  }
  
  // Spreadsheet Grid Component
  const SpreadsheetGrid = ({ props, config, index }: any) => {
    const { offsetX, offsetY, rotation, scale: gridScale, stackDelay, fadeDelay } = config;
    
    // Stack-in animation
    const stackProgress = spring({
      frame: Math.max(0, adjustedFrame - stackDelay),
      fps,
      config: { damping: 18, stiffness: 120 }
    });
    
    // Subtle movement during clutter phase
    const wobbleX = Math.sin((adjustedFrame + index * 20) * 0.08) * 3 * clutterIntensity;
    const wobbleY = Math.cos((adjustedFrame + index * 15) * 0.06) * 2 * clutterIntensity;
    const wobbleRotation = Math.sin((adjustedFrame + index * 25) * 0.05) * 1.5 * clutterIntensity;
    
    // Fade-out animation
    const fadeProgress = interpolate(
      adjustedFrame,
      [fadePhaseStart + fadeDelay, fadePhaseStart + fadeDelay + 25],
      [1, 0],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    
    const slideOutX = interpolate(
      adjustedFrame,
      [fadePhaseStart + fadeDelay, fadePhaseStart + fadeDelay + 25],
      [0, (index % 2 === 0 ? 1 : -1) * minDim * 0.3],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    
    const gridWidth = minDim * 0.35 * gridScale;
    const gridHeight = minDim * 0.28 * gridScale;
    const cols = 6;
    const rows = 5;
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;
    
    const initialY = -height * 0.5;
    const targetY = offsetY;
    const currentY = interpolate(stackProgress, [0, 1], [initialY, targetY]);
    
    const finalX = offsetX + wobbleX + slideOutX;
    const finalY = currentY + wobbleY;
    const finalRotation = rotation + wobbleRotation;
    const finalOpacity = stackProgress * fadeProgress * (props.gridOpacity ?? SCENE_PARAMS.gridOpacity.value);
    
    return (
      <div style={{
        position: "absolute",
        width: gridWidth,
        height: gridHeight,
        transform: `translate(${finalX}px, ${finalY}px) rotate(${finalRotation}deg)`,
        opacity: finalOpacity,
        pointerEvents: "none",
        backgroundColor: "#1a1a2e",
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        border: `1px solid ${(props.gridColor ?? SCENE_PARAMS.gridColor.value)}40`,
      }}>
        {/* Grid lines */}
        <svg width={gridWidth} height={gridHeight} style={{ position: "absolute", top: 0, left: 0 }}>
          {/* Vertical lines */}
          {Array.from({ length: cols + 1 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellWidth}
              y1={0}
              x2={i * cellWidth}
              y2={gridHeight}
              stroke={(props.gridColor ?? SCENE_PARAMS.gridColor.value)}
              strokeWidth={i === 0 || i === cols ? 2 : 1}
              strokeOpacity={0.6}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: rows + 1 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellHeight}
              x2={gridWidth}
              y2={i * cellHeight}
              stroke={(props.gridColor ?? SCENE_PARAMS.gridColor.value)}
              strokeWidth={i === 0 || i === rows ? 2 : 1}
              strokeOpacity={0.6}
            />
          ))}
        </svg>
        {/* Cell content simulation */}
        {Array.from({ length: rows * cols }).map((_, cellIndex) => {
          const row = Math.floor(cellIndex / cols);
          const col = cellIndex % cols;
          const showContent = (row + col + index) % 3 !== 0;
          const contentWidth = 0.3 + Math.sin(cellIndex * 0.5 + index) * 0.4;
          return showContent ? (
            <div
              key={cellIndex}
              style={{
                position: "absolute",
                left: col * cellWidth + cellWidth * 0.15,
                top: row * cellHeight + cellHeight * 0.35,
                width: cellWidth * contentWidth,
                height: cellHeight * 0.3,
                backgroundColor: (props.gridColor ?? SCENE_PARAMS.gridColor.value),
                opacity: 0.7,
                borderRadius: 2,
              }}
            />
          ) : null;
        })}
      </div>
    );
  };
  
  // Checkmark animation
  const checkmarkProgress = spring({
    frame: Math.max(0, adjustedFrame - checkmarkStart),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  
  const checkmarkScale = interpolate(checkmarkProgress, [0, 1], [0.5, 1]);
  const checkmarkOpacity = checkmarkProgress;
  
  // Glow animation
  const glowPulse = Math.sin((adjustedFrame - checkmarkStart) * 0.1) * 0.3 + 0.7;
  const glowIntensity = interpolate(
    adjustedFrame,
    [checkmarkStart, checkmarkStart + 30],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  ) * glowPulse;
  
  const checkmarkSize = minDim * 0.15;
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)})`,
        transformOrigin: "center center",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {/* Grid layers */}
        {grids.map((config, index) => (
          <SpreadsheetGrid props={props}  key={config.id} config={config} index={index} />
        ))}
        
        {/* Checkmark */}
        <div style={{
          position: "absolute",
          width: checkmarkSize,
          height: checkmarkSize,
          transform: `scale(${checkmarkScale})`,
          opacity: checkmarkOpacity,
        }}>
          {/* Glow effect */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: checkmarkSize * 2,
            height: checkmarkSize * 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)}40 0%, transparent 70%)`,
            opacity: glowIntensity,
          }} />
          
          {/* Checkmark SVG */}
          <svg
            width={checkmarkSize}
            height={checkmarkSize}
            viewBox="0 0 100 100"
            style={{ position: "relative", zIndex: 1 }}
          >
            <path
              d="M20 50 L40 70 L80 30"
              fill="none"
              stroke={(props.checkmarkColor ?? SCENE_PARAMS.checkmarkColor.value)}
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: `drop-shadow(0 0 ${10 * glowIntensity}px ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)})`,
              }}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

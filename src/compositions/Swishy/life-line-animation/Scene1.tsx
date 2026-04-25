// Template: life-line-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Animation Settings
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  lineColor: { type: "color", label: "Line Color", value: "#004cff" },
  glowColor: { type: "color", label: "Glow Color", value: "#0055ff" },
  
  // Line Settings
  strokeWidth: { type: "number", label: "Line Thickness", value: 4, min: 1, max: 10, step: 0.5 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 10, min: 0, max: 30, step: 1 },
  waveAmplitude: { type: "number", label: "Wave Height", value: 200, min: 50, max: 400, step: 10 },
  waveFrequency: { type: "number", label: "Wave Frequency", value: 0.015, min: 0.005, max: 0.05, step: 0.001 },
  heartbeatCount: { type: "number", label: "Heartbeat Count", value: 5, min: 1, max: 10, step: 1 },
  
  // Dot Settings
  showDot: { type: "boolean", label: "Show Tracking Dot", value: true },
  dotSize: { type: "number", label: "Dot Size", value: 6, min: 3, max: 15, step: 1 },
  
  // Typography
  fontFamily: { type: "font", label: "Font", value: "Open Sans" }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const centerY = height / 2;
  const amplitude = SCENE_PARAMS.waveAmplitude.value;
  const frequency = SCENE_PARAMS.waveFrequency.value;
  const heartbeatCount = Math.round(SCENE_PARAMS.heartbeatCount.value);
  
  // Generate heartbeat wave points
  const generateHeartbeatPath = (progress) => {
    const points = [];
    const totalPoints = width;
    const visibleEnd = totalPoints * progress;
    
    for (let x = 0; x <= visibleEnd; x += 2) {
      let y = centerY;
      
      // Calculate position within heartbeat cycle
      const cycleWidth = width / heartbeatCount;
      const posInCycle = x % cycleWidth;
      const normalizedPos = posInCycle / cycleWidth;
      
      // Create heartbeat spike pattern
      if (normalizedPos > 0.35 && normalizedPos < 0.65) {
        // Heartbeat spike region
        const spikePos = (normalizedPos - 0.35) / 0.3;
        
        if (spikePos < 0.15) {
          // Small dip before spike
          y = centerY + amplitude * 0.1 * Math.sin(spikePos / 0.15 * Math.PI);
        } else if (spikePos < 0.35) {
          // Main upward spike
          const t = (spikePos - 0.15) / 0.2;
          y = centerY - amplitude * Math.pow(Math.sin(t * Math.PI), 0.7);
        } else if (spikePos < 0.55) {
          // Deep valley
          const t = (spikePos - 0.35) / 0.2;
          y = centerY + amplitude * 0.4 * Math.sin(t * Math.PI);
        } else if (spikePos < 0.75) {
          // Secondary smaller spike
          const t = (spikePos - 0.55) / 0.2;
          y = centerY - amplitude * 0.3 * Math.sin(t * Math.PI);
        } else {
          // Return to baseline
          const t = (spikePos - 0.75) / 0.25;
          y = centerY + amplitude * 0.05 * Math.sin(t * Math.PI * 0.5);
        }
      } else {
        // Subtle baseline oscillation
        const baselineWave = Math.sin(x * frequency * 2) * 5;
        y = centerY + baselineWave;
      }
      
      points.push({ x, y });
    }
    
    return points;
  };
  
  // Animation progress (line draws across screen)
  const drawProgress = interpolate(
    adjustedFrame,
    [0, durationInFrames * 0.9],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const points = generateHeartbeatPath(drawProgress);
  
  // Create SVG path from points
  const pathD = points.length > 0 
    ? "M " + points.map(p => p.x + " " + p.y).join(" L ")
    : "";
  
  // Calculate total path length for dash animation
  const pathLength = points.length > 1 
    ? points.reduce((acc, p, i) => {
        if (i === 0) return 0;
        const prev = points[i - 1];
        return acc + Math.sqrt(Math.pow(p.x - prev.x, 2) + Math.pow(p.y - prev.y, 2));
      }, 0)
    : 0;
  
  // Get current dot position
  const currentPoint = points.length > 0 ? points[points.length - 1] : { x: 0, y: centerY };
  
  const filterId = "glow-filter";
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ 
        transform: "scale(" + SCENE_PARAMS.scale.value + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%"
      }}>
        <svg 
          width={width} 
          height={height} 
          viewBox={"0 0 " + width + " " + height}
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur 
                stdDeviation={SCENE_PARAMS.glowIntensity.value} 
                result="coloredBlur"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main heartbeat line */}
          <path
            d={pathD}
            stroke={SCENE_PARAMS.lineColor.value}
            strokeWidth={SCENE_PARAMS.strokeWidth.value}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "url(#" + filterId + ")" }}
          />
          
          {/* Tracking dot */}
          {SCENE_PARAMS.showDot.value && points.length > 0 && (
            <circle
              cx={currentPoint.x}
              cy={currentPoint.y}
              r={SCENE_PARAMS.dotSize.value}
              fill={SCENE_PARAMS.lineColor.value}
              style={{ filter: "url(#" + filterId + ")" }}
            />
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

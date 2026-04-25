// Template: financials
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  maxDollarAmount: { type: "number", label: "Max Dollar Amount", value: 1696, min: 100, max: 10000, step: 1 },
  tooltipLabel: { type: "text", label: "Tooltip Label", value: "Expenses" },
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0a" },
  textColorStart: { type: "color", label: "Text Gradient Start", value: "#ffffff" },
  textColorEnd: { type: "color", label: "Text Gradient End", value: "#404040" },
  gridLineColor: { type: "color", label: "Grid Lines", value: "#1a1a1a" },
  curveColor: { type: "color", label: "Curve Color", value: "#cc0000" },
  curveGlowColor: { type: "color", label: "Curve Glow", value: "#ff0033" },
  tooltipBg: { type: "color", label: "Tooltip Background", value: "#2d2d2d" },
  tooltipTextColor: { type: "color", label: "Tooltip Text", value: "#ffffff" },
  tooltipLabelColor: { type: "color", label: "Tooltip Label Color", value: "#a0a0a0" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  backgroundTextOpacity: { type: "number", label: "Background Text Opacity", value: 0.35, min: 0.1, max: 0.5, step: 0.05 },
  gridLineCount: { type: "number", label: "Grid Line Count", value: 6, min: 3, max: 10, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const maxAmount = SCENE_PARAMS.maxDollarAmount.value;
  
  // Curve animation progress - this drives everything
  const curveProgress = interpolate(
    adjustedFrame,
    [20, 80],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Synced dollar value based on curve progress
  const currentValue = Math.round(maxAmount * curveProgress);
  
  // Background dollar amount animation - synced with curve
  const bgTextOpacity = interpolate(
    adjustedFrame,
    [0, 36],
    [0, SCENE_PARAMS.backgroundTextOpacity.value],
    { extrapolateRight: "clamp" }
  );
  
  const bgTextScale = interpolate(
    adjustedFrame,
    [0, 36],
    [0.95, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Grid lines staggered fade in
  const gridLineCount = SCENE_PARAMS.gridLineCount.value;
  const gridLines = [];
  for (let i = 0; i < gridLineCount; i++) {
    const lineDelay = i * 6;
    const lineOpacity = interpolate(
      adjustedFrame,
      [lineDelay, lineDelay + 20],
      [0, 0.6],
      { extrapolateRight: "clamp" }
    );
    gridLines.push({
      x: (width / (gridLineCount + 1)) * (i + 1),
      opacity: lineOpacity,
    });
  }
  
  // Generate smooth curve path - single smooth bezier curve from bottom-left to top-right
  const generateCurvePath = (progress) => {
    const startX = 0;
    const startY = height;
    const endX = width;
    const endY = height * 0.18;
    
    // Control points for a single smooth bezier curve
    const cp1x = width * 0.35;
    const cp1y = height * 0.95;
    const cp2x = width * 0.65;
    const cp2y = height * 0.25;
    
    const points = [];
    const numPoints = 100;
    const visiblePoints = Math.floor(numPoints * progress);
    
    for (let i = 0; i <= visiblePoints; i++) {
      const t = i / numPoints;
      // Cubic bezier formula
      const x = Math.pow(1-t, 3) * startX + 3 * Math.pow(1-t, 2) * t * cp1x + 3 * (1-t) * Math.pow(t, 2) * cp2x + Math.pow(t, 3) * endX;
      const y = Math.pow(1-t, 3) * startY + 3 * Math.pow(1-t, 2) * t * cp1y + 3 * (1-t) * Math.pow(t, 2) * cp2y + Math.pow(t, 3) * endY;
      points.push({ x, y });
    }
    
    return points;
  };
  
  const curvePoints = generateCurvePath(curveProgress);
  
  // Build smooth SVG path
  const buildSmoothPath = (points) => {
    if (points.length < 2) return "";
    let d = "M " + points[0].x + " " + points[0].y;
    
    for (let i = 1; i < points.length; i++) {
      d += " L " + points[i].x + " " + points[i].y;
    }
    return d;
  };
  
  // Build filled area path for the red glow/fade
  const buildFilledPath = (points) => {
    if (points.length < 2) return "";
    let d = "M " + points[0].x + " " + height;
    d += " L " + points[0].x + " " + points[0].y;
    
    for (let i = 1; i < points.length; i++) {
      d += " L " + points[i].x + " " + points[i].y;
    }
    
    const lastPoint = points[points.length - 1];
    d += " L " + lastPoint.x + " " + height;
    d += " Z";
    return d;
  };
  
  const curvePath = buildSmoothPath(curvePoints);
  const filledPath = buildFilledPath(curvePoints);
  const lastPoint = curvePoints.length > 0 ? curvePoints[curvePoints.length - 1] : { x: 0, y: height };
  
  // Tooltip appears when curve starts and follows the curve
  const tooltipOpacity = interpolate(
    adjustedFrame,
    [25, 40],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const tooltipScale = interpolate(
    adjustedFrame,
    [25, 45],
    [0.8, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(adjustedFrame * 0.08),
    [-1, 1],
    [0.5, 1]
  );
  
  // Red dot pulse
  const dotPulse = interpolate(
    Math.sin(adjustedFrame * 0.12),
    [-1, 1],
    [1, 1.2]
  );
  
  // Tooltip position - on the LEFT side of the curve point (arrow points RIGHT)
  const tooltipWidth = minDim * 0.2;
  const tooltipHeight = minDim * 0.12;
  const tooltipX = lastPoint.x - tooltipWidth - minDim * 0.04;
  const tooltipY = lastPoint.y - tooltipHeight / 2;
  
  // Clamp tooltip position to stay on screen
  const clampedTooltipX = Math.max(minDim * 0.02, tooltipX);
  const clampedTooltipY = Math.max(minDim * 0.05, Math.min(tooltipY, height - tooltipHeight - minDim * 0.05));
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        
        {/* Large background dollar amount - synced with curve */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(" + bgTextScale + ")",
          fontSize: minDim * 0.38,
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(180deg, " + SCENE_PARAMS.textColorStart.value + " 0%, " + SCENE_PARAMS.textColorEnd.value + " 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: bgTextOpacity,
          letterSpacing: minDim * -0.015,
          userSelect: "none",
          whiteSpace: "nowrap",
        }}>
          ${currentValue.toLocaleString()}
        </div>
        
        {/* Vertical dashed grid lines */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {gridLines.map((line, i) => (
            <line
              key={i}
              x1={line.x}
              y1={height * 0.1}
              x2={line.x}
              y2={height}
              stroke={SCENE_PARAMS.gridLineColor.value}
              strokeWidth={1}
              strokeDasharray="8 6"
              opacity={line.opacity}
            />
          ))}
        </svg>
        
        {/* Red glow/fade area under curve */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="redFadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={SCENE_PARAMS.curveGlowColor.value} stopOpacity={0.4 * glowPulse} />
              <stop offset="50%" stopColor={SCENE_PARAMS.curveColor.value} stopOpacity={0.2 * glowPulse} />
              <stop offset="100%" stopColor={SCENE_PARAMS.curveColor.value} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SCENE_PARAMS.curveColor.value} />
              <stop offset="100%" stopColor={SCENE_PARAMS.curveGlowColor.value} />
            </linearGradient>
            <filter id="curveGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Filled red fade area */}
          {filledPath && (
            <path
              d={filledPath}
              fill="url(#redFadeGrad)"
              filter="url(#softGlow)"
            />
          )}
          
          {/* Main curve line */}
          {curvePath && (
            <path
              d={curvePath}
              fill="none"
              stroke="url(#curveGrad)"
              strokeWidth={minDim * 0.01}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#curveGlow)"
            />
          )}
          
          {/* Glowing red data point */}
          {curveProgress > 0.05 && (
            <g>
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={minDim * 0.05 * glowPulse}
                fill={SCENE_PARAMS.curveGlowColor.value}
                opacity={0.25}
              />
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={minDim * 0.02 * dotPulse}
                fill={SCENE_PARAMS.curveGlowColor.value}
                filter="url(#curveGlow)"
              />
            </g>
          )}
        </svg>
        
        {/* 3D Tooltip card - follows curve from the LEFT (arrow points RIGHT) */}
        {tooltipOpacity > 0 && curveProgress > 0.05 && (
          <div style={{
            position: "absolute",
            left: clampedTooltipX,
            top: clampedTooltipY,
            transform: "scale(" + tooltipScale + ")",
            transformOrigin: "right center",
            opacity: tooltipOpacity,
          }}>
            {/* 3D shadow layers */}
            <div style={{
              position: "absolute",
              top: 6,
              left: 6,
              width: tooltipWidth,
              height: tooltipHeight,
              backgroundColor: "#000000",
              borderRadius: minDim * 0.02,
              opacity: 0.4,
            }} />
            <div style={{
              position: "absolute",
              top: 3,
              left: 3,
              width: tooltipWidth,
              height: tooltipHeight,
              backgroundColor: "#1a1a1a",
              borderRadius: minDim * 0.02,
              opacity: 0.6,
            }} />
            
            {/* Main tooltip */}
            <div style={{
              position: "relative",
              width: tooltipWidth,
              height: tooltipHeight,
              background: "linear-gradient(145deg, " + SCENE_PARAMS.tooltipBg.value + " 0%, #1f1f1f 100%)",
              borderRadius: minDim * 0.02,
              padding: minDim * 0.02 + "px " + minDim * 0.025 + "px",
              boxShadow: "0 " + minDim * 0.005 + "px " + minDim * 0.015 + "px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: minDim * 0.005,
              boxSizing: "border-box",
            }}>
              {/* Arrow pointer on the RIGHT side */}
              <div style={{
                position: "absolute",
                right: -minDim * 0.018,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: minDim * 0.015 + "px solid transparent",
                borderBottom: minDim * 0.015 + "px solid transparent",
                borderLeft: minDim * 0.018 + "px solid " + SCENE_PARAMS.tooltipBg.value,
                filter: "drop-shadow(2px 0 2px rgba(0,0,0,0.3))",
              }} />
              
              <span style={{
                fontSize: minDim * 0.024,
                color: SCENE_PARAMS.tooltipLabelColor.value,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: minDim * 0.002,
              }}>
                {SCENE_PARAMS.tooltipLabel.value}
              </span>
              
              <span style={{
                fontSize: minDim * 0.042,
                color: SCENE_PARAMS.tooltipTextColor.value,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}>
                ${currentValue.toLocaleString()}
              </span>
            </div>
          </div>
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

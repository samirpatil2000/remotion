// Template: fintech-dashboard
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  cardTitle: { type: "text", label: "Card Title", value: "Portfolio Value" },
  mainValue: { type: "text", label: "Main Value", value: "$127,482" },
  percentChange: { type: "text", label: "Change %", value: "+12.4%" },
  periodLabel: { type: "text", label: "Period", value: "vs last month" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  cardBackground: { type: "color", label: "Card Background", value: "#1e293b" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  neonGlow: { type: "color", label: "Neon Glow", value: "#60a5fa" },
  positiveColor: { type: "color", label: "Positive", value: "#10b981" },
  textColor: { type: "color", label: "Text", value: "#f8fafc" },
  secondaryText: { type: "color", label: "Secondary Text", value: "#94a3b8" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  skeletonDuration: { type: "number", label: "Skeleton Duration", value: 35, min: 20, max: 60, step: 5 },
  chartDrawDuration: { type: "number", label: "Chart Draw Duration", value: 40, min: 20, max: 60, step: 5 },
  glassBlur: { type: "number", label: "Glass Blur", value: 12, min: 0, max: 30, step: 2 },
  borderRadius: { type: "number", label: "Border Radius", value: 16, min: 0, max: 40, step: 2 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const isPortrait = height > width;
  
  const cardWidth = isPortrait ? width * 0.85 : width * 0.45;
  const cardHeight = cardWidth * 0.7;
  const padding = cardWidth * 0.06;
  
  const skeletonEnd = SCENE_PARAMS.skeletonDuration.value;
  const contentStart = skeletonEnd;
  const chartStart = contentStart + 15;
  const chartEnd = chartStart + SCENE_PARAMS.chartDrawDuration.value;
  const iconsStart = chartStart + 10;
  
  const cardEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 22, stiffness: 85 } });
  const cardY = interpolate(cardEntrance, [0, 1], [40, 0]);
  
  const skeletonOpacity = interpolate(adjustedFrame, [0, skeletonEnd - 10, skeletonEnd], [1, 1, 0], { extrapolateRight: "clamp" });
  const shimmerX = interpolate(adjustedFrame, [0, skeletonEnd], [-100, 200], { extrapolateRight: "clamp" });
  
  const contentOpacity = interpolate(adjustedFrame, [contentStart, contentStart + 15], [0, 1], { extrapolateRight: "clamp" });
  
  const parseNumericValue = (str) => {
    const num = parseFloat(str.replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? 0 : num;
  };
  
  const targetValue = parseNumericValue(SCENE_PARAMS.mainValue.value);
  const countProgress = interpolate(adjustedFrame, [contentStart, contentStart + 45], [0, 1], { extrapolateRight: "clamp" });
  const currentValue = Math.floor(targetValue * countProgress);
  const formattedValue = "$" + currentValue.toLocaleString();
  
  const targetPercent = parseNumericValue(SCENE_PARAMS.percentChange.value);
  const currentPercent = (targetPercent * countProgress).toFixed(1);
  
  const chartProgress = interpolate(adjustedFrame, [chartStart, chartEnd], [0, 100], { extrapolateRight: "clamp" });
  
  const chartPoints = [
    { x: 0, y: 60 },
    { x: 15, y: 45 },
    { x: 30, y: 55 },
    { x: 45, y: 35 },
    { x: 60, y: 40 },
    { x: 75, y: 25 },
    { x: 90, y: 30 },
    { x: 100, y: 15 },
  ];
  
  const chartWidth = cardWidth - padding * 2;
  const chartHeight = cardHeight * 0.35;
  
  const pathD = chartPoints.map((p, i) => {
    const x = (p.x / 100) * chartWidth;
    const y = (p.y / 100) * chartHeight;
    return (i === 0 ? "M" : "L") + x + " " + y;
  }).join(" ");
  
  const icons = [
    { icon: "📊", delay: 0 },
    { icon: "💹", delay: 8 },
    { icon: "⚡", delay: 16 },
  ];
  
  const tiltProgress = interpolate(adjustedFrame, [chartEnd, chartEnd + 30], [0, 1], { extrapolateRight: "clamp" });
  const tiltX = interpolate(tiltProgress, [0, 1], [0, 2]);
  const tiltY = interpolate(tiltProgress, [0, 1], [0, -1]);
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: SCENE_PARAMS.cardBackground.value + "cc",
          backdropFilter: "blur(" + SCENE_PARAMS.glassBlur.value + "px)",
          borderRadius: SCENE_PARAMS.borderRadius.value,
          border: "1px solid " + SCENE_PARAMS.accentColor.value + "40",
          boxShadow: "0 0 40px " + SCENE_PARAMS.neonGlow.value + "20, 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          padding: padding,
          position: "relative",
          overflow: "hidden",
          transform: "translateY(" + cardY + "px) perspective(1000px) rotateX(" + tiltY + "deg) rotateY(" + tiltX + "deg)",
          opacity: cardEntrance,
        }}>
          
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: padding,
            opacity: skeletonOpacity,
            pointerEvents: "none",
          }}>
            <div style={{
              width: "40%",
              height: minDim * 0.018,
              backgroundColor: SCENE_PARAMS.secondaryText.value + "30",
              borderRadius: 4,
              marginBottom: minDim * 0.015,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: shimmerX + "%",
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, " + SCENE_PARAMS.secondaryText.value + "40, transparent)",
              }} />
            </div>
            <div style={{
              width: "70%",
              height: minDim * 0.035,
              backgroundColor: SCENE_PARAMS.secondaryText.value + "30",
              borderRadius: 6,
              marginBottom: minDim * 0.025,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: shimmerX + "%",
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, " + SCENE_PARAMS.secondaryText.value + "40, transparent)",
              }} />
            </div>
            <div style={{
              width: "100%",
              height: chartHeight,
              backgroundColor: SCENE_PARAMS.secondaryText.value + "20",
              borderRadius: 8,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: shimmerX + "%",
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, " + SCENE_PARAMS.secondaryText.value + "30, transparent)",
              }} />
            </div>
          </div>
          
          <div style={{ opacity: contentOpacity }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: minDim * 0.01,
            }}>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.022,
                fontWeight: 500,
                color: SCENE_PARAMS.secondaryText.value,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                {SCENE_PARAMS.cardTitle.value}
              </span>
              <div style={{ display: "flex", gap: minDim * 0.01 }}>
                {icons.map((item, i) => {
                  const iconProgress = spring({ 
                    frame: Math.max(0, adjustedFrame - iconsStart - item.delay), 
                    fps, 
                    config: { damping: 12, stiffness: 180 } 
                  });
                  const iconScale = interpolate(iconProgress, [0, 1], [0, 1]);
                  return (
                    <span key={i} style={{
                      fontSize: minDim * 0.025,
                      transform: "scale(" + iconScale + ")",
                      display: "inline-block",
                    }}>
                      {item.icon}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: minDim * 0.015,
              marginBottom: minDim * 0.015,
            }}>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.055,
                fontWeight: 700,
                color: SCENE_PARAMS.textColor.value,
                letterSpacing: -1,
              }}>
                {formattedValue}
              </span>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.022,
                fontWeight: 600,
                color: SCENE_PARAMS.positiveColor.value,
                backgroundColor: SCENE_PARAMS.positiveColor.value + "20",
                padding: minDim * 0.005 + "px " + minDim * 0.01 + "px",
                borderRadius: 4,
              }}>
                +{currentPercent}%
              </span>
            </div>
            
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.018,
              color: SCENE_PARAMS.secondaryText.value,
              display: "block",
              marginBottom: minDim * 0.02,
            }}>
              {SCENE_PARAMS.periodLabel.value}
            </span>
            
            <div style={{
              position: "relative",
              width: chartWidth,
              height: chartHeight,
            }}>
              <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={SCENE_PARAMS.accentColor.value} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={SCENE_PARAMS.accentColor.value} stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                <path
                  d={pathD + " L" + chartWidth + " " + chartHeight + " L0 " + chartHeight + " Z"}
                  fill="url(#chartGradient)"
                  style={{
                    clipPath: "inset(0 " + (100 - chartProgress) + "% 0 0)",
                  }}
                />
                
                <path
                  d={pathD}
                  fill="none"
                  stroke={SCENE_PARAMS.accentColor.value}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000 - (chartProgress / 100) * 1000,
                  }}
                />
                
                {chartProgress > 95 && (
                  <circle
                    cx={(chartPoints[chartPoints.length - 1].x / 100) * chartWidth}
                    cy={(chartPoints[chartPoints.length - 1].y / 100) * chartHeight}
                    r="6"
                    fill={SCENE_PARAMS.accentColor.value}
                    filter="url(#glow)"
                  />
                )}
              </svg>
            </div>
          </div>
          
          <div style={{
            position: "absolute",
            top: -1,
            left: padding,
            right: padding,
            height: 2,
            background: "linear-gradient(90deg, transparent, " + SCENE_PARAMS.neonGlow.value + ", transparent)",
            opacity: interpolate(adjustedFrame, [contentStart, contentStart + 20], [0, 0.8], { extrapolateRight: "clamp" }),
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

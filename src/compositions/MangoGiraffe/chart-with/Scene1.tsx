// Template: chart-with
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  winRate: { type: "number", label: "Win Rate %", value: 78, min: 50, max: 100, step: 1 },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent", value: "#10b981" },
  gaugeTrackColor: { type: "color", label: "Gauge Track", value: "#e2e8f0" },
  candleGreen: { type: "color", label: "Candle Green", value: "#22c55e" },
  curveColor: { type: "color", label: "Equity Curve", value: "#10b981" },
  dollarColor: { type: "color", label: "Dollar Symbol", value: "#fbbf24" },
  scale: { type: "number", label: "Scale", value: 0.9, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 2, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  showCheckmark: { type: "boolean", label: "Show Checkmark", value: true },
  showDollarSymbols: { type: "boolean", label: "Show Dollar Symbols", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const isPortrait = height > width;
  
  // Gauge animation (0-80 frames)
  const gaugeProgress = interpolate(adjustedFrame, [10, 80], [0, (props.winRate ?? SCENE_PARAMS.winRate.value) / 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const gaugeOpacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Gauge dimensions
  const gaugeSize = minDim * (isPortrait ? 0.35 : 0.3);
  const strokeWidth = gaugeSize * 0.08;
  const radius = (gaugeSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius * 0.75; // 270 degree arc
  const strokeDashoffset = circumference * (1 - gaugeProgress);
  
  // Candlesticks data
  const candlesticks = [
    { height: 0.4, body: 0.25 },
    { height: 0.55, body: 0.3 },
    { height: 0.45, body: 0.2 },
    { height: 0.7, body: 0.4 },
    { height: 0.6, body: 0.35 },
    { height: 0.85, body: 0.5 },
    { height: 0.75, body: 0.4 },
  ];
  
  // Equity curve points
  const curvePoints = [
    { x: 0, y: 0.7 },
    { x: 0.15, y: 0.65 },
    { x: 0.25, y: 0.55 },
    { x: 0.4, y: 0.5 },
    { x: 0.55, y: 0.35 },
    { x: 0.7, y: 0.3 },
    { x: 0.85, y: 0.2 },
    { x: 1, y: 0.15 },
  ];
  
  const curveDrawProgress = interpolate(adjustedFrame, [50, 110], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const curveOpacity = interpolate(adjustedFrame, [45, 55], [0, 1], { extrapolateRight: "clamp" });
  
  // Checkmark animation
  const checkmarkProgress = spring({ frame: Math.max(0, adjustedFrame - 95), fps, config: { damping: 18, stiffness: 120 } });
  const checkmarkScale = interpolate(checkmarkProgress, [0, 1], [0.5, 1]);
  
  // Glow pulse
  const glowPulse = interpolate(Math.sin((adjustedFrame - 100) * 0.08), [-1, 1], [0.3, 1]) * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value);
  const showGlow = adjustedFrame > 100;
  
  // Dollar symbols
  const dollarSymbols = [
    { x: 0.15, delay: 60, duration: 50 },
    { x: 0.35, delay: 70, duration: 45 },
    { x: 0.6, delay: 65, duration: 55 },
    { x: 0.8, delay: 75, duration: 48 },
    { x: 0.25, delay: 85, duration: 52 },
    { x: 0.7, delay: 90, duration: 46 },
  ];
  
  // Layout positioning
  const gaugeX = isPortrait ? width * 0.5 : width * 0.25;
  const gaugeY = isPortrait ? height * 0.22 : height * 0.4;
  const chartX = isPortrait ? width * 0.1 : width * 0.45;
  const chartY = isPortrait ? height * 0.42 : height * 0.15;
  const chartWidth = isPortrait ? width * 0.8 : width * 0.45;
  const chartHeight = isPortrait ? height * 0.25 : height * 0.6;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center", width: width, height: height, position: "relative" }}>
        
        {/* Circular Gauge */}
        <div style={{
          position: "absolute",
          left: gaugeX - gaugeSize / 2,
          top: gaugeY - gaugeSize / 2,
          width: gaugeSize,
          height: gaugeSize,
          opacity: gaugeOpacity,
        }}>
          <svg width={gaugeSize} height={gaugeSize} style={{ transform: "rotate(-225deg)" }}>
            {/* Track */}
            <circle
              cx={gaugeSize / 2}
              cy={gaugeSize / 2}
              r={radius}
              fill="none"
              stroke={(props.gaugeTrackColor ?? SCENE_PARAMS.gaugeTrackColor.value)}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeLinecap="round"
            />
            {/* Progress */}
            <circle
              cx={gaugeSize / 2}
              cy={gaugeSize / 2}
              r={radius}
              fill="none"
              stroke={(props.accentColor ?? SCENE_PARAMS.accentColor.value)}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: showGlow ? "drop-shadow(0 0 " + (8 * glowPulse) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + ")" : "none",
              }}
            />
          </svg>
          {/* Percentage text */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: gaugeSize * 0.22,
              fontWeight: 700,
              color: "#1e293b",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}>
              {Math.round(gaugeProgress * 100)}%
            </div>
            <div style={{
              fontSize: gaugeSize * 0.09,
              fontWeight: 500,
              color: "#64748b",
              fontFamily: "system-ui, sans-serif",
              marginTop: gaugeSize * 0.02,
            }}>
              WIN RATE
            </div>
          </div>
        </div>
        
        {/* Candlesticks */}
        <div style={{
          position: "absolute",
          left: chartX,
          top: chartY,
          width: chartWidth,
          height: chartHeight,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          paddingBottom: chartHeight * 0.1,
        }}>
          {candlesticks.map((candle, i) => {
            const candleDelay = 25 + i * 8;
            const candleProgress = spring({ frame: Math.max(0, adjustedFrame - candleDelay), fps, config: { damping: 22, stiffness: 85 } });
            const candleHeight = candle.height * chartHeight * 0.7 * candleProgress;
            const bodyHeight = candle.body * chartHeight * 0.7 * candleProgress;
            const wickWidth = chartWidth * 0.008;
            const bodyWidth = chartWidth * 0.06;
            
            return (
              <div key={i} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: candleHeight,
                opacity: candleProgress,
              }}>
                {/* Upper wick */}
                <div style={{
                  width: wickWidth,
                  height: (candleHeight - bodyHeight) / 2,
                  backgroundColor: (props.candleGreen ?? SCENE_PARAMS.candleGreen.value),
                  borderRadius: wickWidth / 2,
                }} />
                {/* Body */}
                <div style={{
                  width: bodyWidth,
                  height: bodyHeight,
                  backgroundColor: (props.candleGreen ?? SCENE_PARAMS.candleGreen.value),
                  borderRadius: bodyWidth * 0.15,
                  boxShadow: "0 2px 8px rgba(34, 197, 94, 0.3)",
                }} />
                {/* Lower wick */}
                <div style={{
                  width: wickWidth,
                  height: (candleHeight - bodyHeight) / 2,
                  backgroundColor: (props.candleGreen ?? SCENE_PARAMS.candleGreen.value),
                  borderRadius: wickWidth / 2,
                }} />
              </div>
            );
          })}
        </div>
        
        {/* Equity Curve */}
        <svg style={{
          position: "absolute",
          left: chartX,
          top: chartY,
          width: chartWidth,
          height: chartHeight,
          opacity: curveOpacity,
          overflow: "visible",
        }}>
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={(props.curveColor ?? SCENE_PARAMS.curveColor.value)} stopOpacity="0.6" />
              <stop offset="100%" stopColor={(props.curveColor ?? SCENE_PARAMS.curveColor.value)} stopOpacity="1" />
            </linearGradient>
            <filter id="curveGlow">
              <feGaussianBlur stdDeviation={showGlow ? 4 * glowPulse : 0} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={curvePoints.map((p, i) => {
              const x = p.x * chartWidth;
              const y = p.y * chartHeight;
              return (i === 0 ? "M" : "L") + x + " " + y;
            }).join(" ")}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={chartWidth * 2}
            strokeDashoffset={chartWidth * 2 * (1 - curveDrawProgress)}
            filter={showGlow ? "url(#curveGlow)" : "none"}
          />
          {/* Curve endpoint dot */}
          {curveDrawProgress > 0.95 && (
            <circle
              cx={curvePoints[curvePoints.length - 1].x * chartWidth}
              cy={curvePoints[curvePoints.length - 1].y * chartHeight}
              r={6}
              fill={(props.curveColor ?? SCENE_PARAMS.curveColor.value)}
              style={{
                filter: showGlow ? "drop-shadow(0 0 " + (6 * glowPulse) + "px " + (props.curveColor ?? SCENE_PARAMS.curveColor.value) + ")" : "none",
              }}
            />
          )}
        </svg>
        
        {/* Floating Dollar Symbols */}
        {(props.showDollarSymbols ?? SCENE_PARAMS.showDollarSymbols.value) && dollarSymbols.map((dollar, i) => {
          const dollarStart = dollar.delay;
          const dollarEnd = dollar.delay + dollar.duration;
          const dollarProgress = interpolate(adjustedFrame, [dollarStart, dollarEnd], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const dollarY = interpolate(dollarProgress, [0, 1], [chartY + chartHeight * 0.8, chartY - minDim * 0.1]);
          const dollarOpacity = interpolate(dollarProgress, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0], { extrapolateRight: "clamp" });
          const dollarScale = interpolate(dollarProgress, [0, 0.3, 1], [0.5, 1, 0.7], { extrapolateRight: "clamp" });
          
          return (
            <div key={i} style={{
              position: "absolute",
              left: chartX + dollar.x * chartWidth,
              top: dollarY,
              fontSize: minDim * 0.04,
              fontWeight: 700,
              color: (props.dollarColor ?? SCENE_PARAMS.dollarColor.value),
              fontFamily: "system-ui, sans-serif",
              opacity: dollarOpacity,
              transform: "scale(" + dollarScale + ")",
              textShadow: "0 2px 10px rgba(251, 191, 36, 0.4)",
            }}>
              $
            </div>
          );
        })}
        
        {/* Checkmark */}
        {(props.showCheckmark ?? SCENE_PARAMS.showCheckmark.value) && adjustedFrame > 95 && (
          <div style={{
            position: "absolute",
            left: gaugeX - minDim * 0.06,
            top: gaugeY + gaugeSize * 0.55,
            width: minDim * 0.12,
            height: minDim * 0.12,
            borderRadius: "50%",
            backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: checkmarkProgress,
            transform: "scale(" + checkmarkScale + ")",
            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
          }}>
            <svg width={minDim * 0.06} height={minDim * 0.06} viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#ffffff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={30}
                strokeDashoffset={interpolate(checkmarkProgress, [0, 1], [30, 0])}
              />
            </svg>
          </div>
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

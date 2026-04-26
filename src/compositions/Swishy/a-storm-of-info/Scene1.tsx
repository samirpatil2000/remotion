// Template: a-storm-of-info
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent Glow", value: "#3b82f6" },
  candleGreen: { type: "color", label: "Bullish Candle", value: "#22c55e" },
  candleRed: { type: "color", label: "Bearish Candle", value: "#ef4444" },
  clockColor: { type: "color", label: "Clock Color", value: "#94a3b8" },
  coinColor: { type: "color", label: "Coin Color", value: "#fbbf24" },
  lineColor: { type: "color", label: "Lines Color", value: "#64748b" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  chaosIntensity: { type: "number", label: "Chaos Intensity", value: 1, min: 0.5, max: 1.5, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0.2, max: 1, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const chaos = (props.chaosIntensity ?? SCENE_PARAMS.chaosIntensity.value);
  const adjustedFrame = frame * speed;
  
  const isPortrait = height > width;
  
  // Timeline phases
  const chaosPhaseEnd = 90;
  const clockFadeStart = 30;
  const clockRotationEnd = 150;
  const snapStart = 120;
  const snapEnd = 180;
  const glowStart = 175;
  
  // Clock animation
  const clockOpacity = interpolate(adjustedFrame, [clockFadeStart, clockFadeStart + 30], [0, 0.15], { extrapolateRight: "clamp" });
  const clockRotation = interpolate(adjustedFrame, [clockFadeStart, clockRotationEnd], [0, 360], { extrapolateRight: "clamp" });
  const clockFadeOut = interpolate(adjustedFrame, [snapEnd - 20, snapEnd + 10], [1, 0], { extrapolateRight: "clamp" });
  
  // Snap progress (0 = chaos, 1 = ordered)
  const snapProgress = spring({
    frame: Math.max(0, adjustedFrame - snapStart),
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  // Glow pulse
  const glowOpacity = interpolate(adjustedFrame, [glowStart, glowStart + 20, glowStart + 40, glowStart + 60], [0, (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value), (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * 0.7, (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value)], { extrapolateRight: "clamp" });
  
  // Floating chaos animation helper
  const getFloatOffset = (seed, amplitude) => {
    const time = adjustedFrame * 0.02;
    const chaosMultiplier = interpolate(adjustedFrame, [snapStart, snapEnd], [1, 0], { extrapolateRight: "clamp" });
    return Math.sin(time + seed) * amplitude * chaos * chaosMultiplier;
  };
  
  const getRotationOffset = (seed, amplitude) => {
    const time = adjustedFrame * 0.015;
    const chaosMultiplier = interpolate(adjustedFrame, [snapStart, snapEnd], [1, 0], { extrapolateRight: "clamp" });
    return Math.sin(time + seed * 1.5) * amplitude * chaos * chaosMultiplier;
  };
  
  // Candlestick data for ordered chart
  const candleData = [
    { type: "red", height: 0.4 },
    { type: "green", height: 0.5 },
    { type: "red", height: 0.3 },
    { type: "green", height: 0.6 },
    { type: "green", height: 0.7 },
    { type: "green", height: 0.55 },
    { type: "green", height: 0.8 },
  ];
  
  // Chart dimensions
  const chartWidth = isPortrait ? width * 0.85 : width * 0.5;
  const chartHeight = isPortrait ? height * 0.35 : height * 0.5;
  const chartLeft = (width - chartWidth) / 2;
  const chartTop = isPortrait ? height * 0.35 : height * 0.25;
  
  // Chaos positions for candlesticks
  const candleChaosPositions = [
    { x: width * 0.15, y: height * 0.2, rot: -25 },
    { x: width * 0.75, y: height * 0.15, rot: 45 },
    { x: width * 0.1, y: height * 0.6, rot: -60 },
    { x: width * 0.85, y: height * 0.55, rot: 30 },
    { x: width * 0.3, y: height * 0.8, rot: -40 },
    { x: width * 0.65, y: height * 0.75, rot: 55 },
    { x: width * 0.5, y: height * 0.12, rot: -15 },
  ];
  
  // Dollar coins chaos positions
  const coinChaosPositions = [
    { x: width * 0.2, y: height * 0.35, rot: 0 },
    { x: width * 0.8, y: height * 0.4, rot: 45 },
    { x: width * 0.15, y: height * 0.75, rot: -30 },
    { x: width * 0.85, y: height * 0.8, rot: 60 },
    { x: width * 0.45, y: height * 0.65, rot: -45 },
  ];
  
  // Trend lines chaos positions
  const lineChaosPositions = [
    { x: width * 0.25, y: height * 0.25, rot: 35, length: minDim * 0.15 },
    { x: width * 0.7, y: height * 0.3, rot: -50, length: minDim * 0.12 },
    { x: width * 0.55, y: height * 0.85, rot: 70, length: minDim * 0.18 },
  ];
  
  // Laptop position
  const laptopWidth = isPortrait ? width * 0.7 : width * 0.35;
  const laptopHeight = laptopWidth * 0.65;
  const laptopFinalX = (width - laptopWidth) / 2;
  const laptopFinalY = isPortrait ? height * 0.58 : height * 0.5;
  const laptopChaosX = width * 0.1;
  const laptopChaosY = height * 0.7;
  const laptopChaosRot = -20;
  
  const laptopX = interpolate(snapProgress, [0, 1], [laptopChaosX + getFloatOffset(7, 30), laptopFinalX]);
  const laptopY = interpolate(snapProgress, [0, 1], [laptopChaosY + getFloatOffset(8, 25), laptopFinalY]);
  const laptopRot = interpolate(snapProgress, [0, 1], [laptopChaosRot + getRotationOffset(9, 15), 0]);
  const laptopOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center", width: "100%", height: "100%", position: "relative" }}>
        
        {/* Clock face */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(" + clockRotation + "deg)",
          opacity: clockOpacity * clockFadeOut,
          width: minDim * 0.6,
          height: minDim * 0.6,
        }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke={(props.clockColor ?? SCENE_PARAMS.clockColor.value)} strokeWidth="1" opacity="0.5" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * Math.PI / 180;
              const x1 = 50 + Math.cos(angle) * 40;
              const y1 = 50 + Math.sin(angle) * 40;
              const x2 = 50 + Math.cos(angle) * 44;
              const y2 = 50 + Math.sin(angle) * 44;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={(props.clockColor ?? SCENE_PARAMS.clockColor.value)} strokeWidth="1.5" opacity="0.6" />;
            })}
            <line x1="50" y1="50" x2="50" y2="20" stroke={(props.clockColor ?? SCENE_PARAMS.clockColor.value)} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <line x1="50" y1="50" x2="70" y2="50" stroke={(props.clockColor ?? SCENE_PARAMS.clockColor.value)} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <circle cx="50" cy="50" r="2" fill={(props.clockColor ?? SCENE_PARAMS.clockColor.value)} opacity="0.8" />
          </svg>
        </div>
        
        {/* Scattered Dollar Coins */}
        {coinChaosPositions.map((pos, i) => {
          const coinSize = minDim * 0.06;
          const floatX = getFloatOffset(i * 3, 40);
          const floatY = getFloatOffset(i * 3 + 1, 35);
          const rotOffset = getRotationOffset(i * 3 + 2, 25);
          
          const finalX = chartLeft + chartWidth + minDim * 0.05;
          const finalY = chartTop + (i * chartHeight / 5);
          
          const coinX = interpolate(snapProgress, [0, 1], [pos.x + floatX, finalX]);
          const coinY = interpolate(snapProgress, [0, 1], [pos.y + floatY, finalY]);
          const coinRot = interpolate(snapProgress, [0, 1], [pos.rot + rotOffset, 0]);
          const coinOpacity = interpolate(snapProgress, [0.8, 1], [1, 0], { extrapolateRight: "clamp" });
          
          const entranceOpacity = interpolate(adjustedFrame, [i * 5, i * 5 + 15], [0, 1], { extrapolateRight: "clamp" });
          
          return (
            <div key={"coin" + i} style={{
              position: "absolute",
              left: coinX,
              top: coinY,
              width: coinSize,
              height: coinSize,
              transform: "rotate(" + coinRot + "deg)",
              opacity: entranceOpacity * coinOpacity,
            }}>
              <svg viewBox="0 0 40 40" style={{ width: "100%", height: "100%" }}>
                <circle cx="20" cy="20" r="18" fill={(props.coinColor ?? SCENE_PARAMS.coinColor.value)} />
                <circle cx="20" cy="20" r="14" fill="none" stroke="#fcd34d" strokeWidth="2" />
                <text x="20" y="26" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="bold">$</text>
              </svg>
            </div>
          );
        })}
        
        {/* Broken Trend Lines */}
        {lineChaosPositions.map((pos, i) => {
          const floatX = getFloatOffset(i * 4 + 10, 50);
          const floatY = getFloatOffset(i * 4 + 11, 45);
          const rotOffset = getRotationOffset(i * 4 + 12, 30);
          
          const lineX = pos.x + floatX;
          const lineY = pos.y + floatY;
          const lineRot = pos.rot + rotOffset;
          const lineOpacity = interpolate(snapProgress, [0.3, 0.7], [1, 0], { extrapolateRight: "clamp" });
          const entranceOpacity = interpolate(adjustedFrame, [10 + i * 8, 25 + i * 8], [0, 1], { extrapolateRight: "clamp" });
          
          return (
            <div key={"line" + i} style={{
              position: "absolute",
              left: lineX,
              top: lineY,
              width: pos.length,
              height: 4,
              backgroundColor: (props.lineColor ?? SCENE_PARAMS.lineColor.value),
              transform: "rotate(" + lineRot + "deg)",
              opacity: entranceOpacity * lineOpacity,
              borderRadius: 2,
            }} />
          );
        })}
        
        {/* Candlesticks - chaos to ordered */}
        {candleData.map((candle, i) => {
          const candleWidth = chartWidth / (candleData.length * 2);
          const candleMaxHeight = chartHeight * 0.6;
          const candleHeight = candleMaxHeight * candle.height;
          
          const finalX = chartLeft + (i * 2 + 1) * candleWidth;
          const finalY = chartTop + chartHeight - candleHeight - (i * chartHeight * 0.03);
          
          const chaosPos = candleChaosPositions[i];
          const floatX = getFloatOffset(i * 2, 60);
          const floatY = getFloatOffset(i * 2 + 1, 50);
          const rotOffset = getRotationOffset(i * 2 + 2, 40);
          
          const candleX = interpolate(snapProgress, [0, 1], [chaosPos.x + floatX, finalX]);
          const candleY = interpolate(snapProgress, [0, 1], [chaosPos.y + floatY, finalY]);
          const candleRot = interpolate(snapProgress, [0, 1], [chaosPos.rot + rotOffset, 0]);
          
          const entranceDelay = i * 4;
          const entranceOpacity = interpolate(adjustedFrame, [entranceDelay, entranceDelay + 20], [0, 1], { extrapolateRight: "clamp" });
          
          const candleColor = candle.type === "green" ? (props.candleGreen ?? SCENE_PARAMS.candleGreen.value) : (props.candleRed ?? SCENE_PARAMS.candleRed.value);
          
          return (
            <div key={"candle" + i} style={{
              position: "absolute",
              left: candleX,
              top: candleY,
              transform: "rotate(" + candleRot + "deg)",
              transformOrigin: "center center",
              opacity: entranceOpacity,
            }}>
              {/* Wick */}
              <div style={{
                position: "absolute",
                left: candleWidth / 2 - 1,
                top: -candleHeight * 0.15,
                width: 2,
                height: candleHeight * 0.3,
                backgroundColor: candleColor,
              }} />
              {/* Body */}
              <div style={{
                width: candleWidth,
                height: candleHeight,
                backgroundColor: candleColor,
                borderRadius: 2,
                boxShadow: snapProgress > 0.8 ? "0 0 " + (20 * glowOpacity) + "px " + candleColor : "none",
              }} />
              {/* Lower wick */}
              <div style={{
                position: "absolute",
                left: candleWidth / 2 - 1,
                top: candleHeight,
                width: 2,
                height: candleHeight * 0.2,
                backgroundColor: candleColor,
              }} />
            </div>
          );
        })}
        
        {/* Stop Loss and Take Profit Lines (appear on snap) */}
        {snapProgress > 0.3 && (
          <>
            {/* Stop Loss Line */}
            <div style={{
              position: "absolute",
              left: chartLeft,
              top: chartTop + chartHeight * 0.85,
              width: chartWidth * interpolate(snapProgress, [0.3, 0.7], [0, 1], { extrapolateRight: "clamp" }),
              height: 2,
              backgroundColor: (props.candleRed ?? SCENE_PARAMS.candleRed.value),
              opacity: interpolate(snapProgress, [0.3, 0.6], [0, 0.8], { extrapolateRight: "clamp" }),
            }} />
            {/* Take Profit Line */}
            <div style={{
              position: "absolute",
              left: chartLeft,
              top: chartTop + chartHeight * 0.15,
              width: chartWidth * interpolate(snapProgress, [0.4, 0.8], [0, 1], { extrapolateRight: "clamp" }),
              height: 2,
              backgroundColor: (props.candleGreen ?? SCENE_PARAMS.candleGreen.value),
              opacity: interpolate(snapProgress, [0.4, 0.7], [0, 0.8], { extrapolateRight: "clamp" }),
            }} />
          </>
        )}
        
        {/* Risk Reward Ruler */}
        {snapProgress > 0.5 && (
          <div style={{
            position: "absolute",
            left: chartLeft - minDim * 0.08,
            top: chartTop + chartHeight * 0.15,
            width: minDim * 0.04,
            height: chartHeight * 0.7,
            opacity: interpolate(snapProgress, [0.5, 0.8], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            <svg viewBox="0 0 20 100" style={{ width: "100%", height: "100%" }}>
              <rect x="8" y="0" width="4" height="100" fill={(props.lineColor ?? SCENE_PARAMS.lineColor.value)} rx="2" />
              {[0, 33, 66, 100].map((y, idx) => (
                <rect key={idx} x="2" y={y - 1} width="16" height="2" fill={(props.lineColor ?? SCENE_PARAMS.lineColor.value)} />
              ))}
            </svg>
          </div>
        )}
        
        {/* Laptop with Trading Setup */}
        <div style={{
          position: "absolute",
          left: laptopX,
          top: laptopY,
          width: laptopWidth,
          height: laptopHeight,
          transform: "rotate(" + laptopRot + "deg)",
          opacity: laptopOpacity,
        }}>
          {/* Screen */}
          <div style={{
            width: "100%",
            height: laptopHeight * 0.75,
            backgroundColor: "#1e293b",
            borderRadius: minDim * 0.015,
            border: "3px solid #334155",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: snapProgress > 0.8 ? "0 0 " + (30 * glowOpacity) + "px rgba(59, 130, 246, 0.3)" : "none",
          }}>
            {/* Mini chart on screen */}
            <svg viewBox="0 0 100 60" style={{ width: "80%", height: "70%" }}>
              <polyline
                points="10,50 20,45 30,48 40,35 50,30 60,25 70,20 80,15 90,10"
                fill="none"
                stroke={(props.candleGreen ?? SCENE_PARAMS.candleGreen.value)}
                strokeWidth="2"
                strokeLinecap="round"
                opacity={snapProgress}
              />
              <line x1="10" y1="55" x2="90" y2="55" stroke="#475569" strokeWidth="1" />
              <line x1="10" y1="5" x2="10" y2="55" stroke="#475569" strokeWidth="1" />
            </svg>
          </div>
          {/* Base */}
          <div style={{
            width: "110%",
            height: laptopHeight * 0.08,
            backgroundColor: "#475569",
            borderRadius: "0 0 " + minDim * 0.01 + "px " + minDim * 0.01 + "px",
            marginLeft: "-5%",
            marginTop: -2,
          }} />
        </div>
        
        {/* Final glow overlay */}
        {glowOpacity > 0 && (
          <div style={{
            position: "absolute",
            left: chartLeft - minDim * 0.05,
            top: chartTop - minDim * 0.05,
            width: chartWidth + minDim * 0.1,
            height: chartHeight + minDim * 0.1,
            background: "radial-gradient(ellipse at center, rgba(59, 130, 246, " + (glowOpacity * 0.15) + ") 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

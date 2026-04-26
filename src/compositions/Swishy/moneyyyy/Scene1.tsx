// Template: moneyyyy
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  symbol: { type: "text", label: "Symbol", value: "$" },
  fontFamily: { type: "font", label: "Font", value: "Montserrat" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent Color", value: "#40ff1a" },
  circleRadius: { type: "number", label: "Circle Radius", value: 200, min: 100, max: 400, step: 10 },
  strokeWidth: { type: "number", label: "Stroke Width", value: 12, min: 4, max: 24, step: 2 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 20, min: 5, max: 50, step: 5 },
  symbolSize: { type: "number", label: "Symbol Size", value: 320, min: 100, max: 500, step: 20 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const circleRadius = (props.circleRadius ?? SCENE_PARAMS.circleRadius.value);
  const circumference = 2 * Math.PI * circleRadius;
  
  // Circle draw animation - starts immediately, completes around frame 60
  const circleProgress = interpolate(
    adjustedFrame,
    [0, 60],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Stroke dash offset animates from full (hidden) to partial reveal
  const strokeDashoffset = circumference * (1 - circleProgress * 0.92);
  
  // Circle opacity fades in
  const circleOpacity = interpolate(
    adjustedFrame,
    [0, 20],
    [0, 0.7],
    { extrapolateRight: "clamp" }
  );
  
  // Symbol appears after circle starts drawing - around frame 40
  const symbolDelay = 40;
  const symbolProgress = spring({
    frame: Math.max(0, adjustedFrame - symbolDelay),
    fps,
    config: { damping: 15, stiffness: 120 }
  });
  
  const symbolScale = interpolate(
    symbolProgress,
    [0, 1],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const symbolOpacity = interpolate(
    symbolProgress,
    [0, 0.5, 1],
    [0, 0.8, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Pulsing glow effect after symbol appears
  const pulsePhase = Math.sin((adjustedFrame - symbolDelay) * 0.08) * 0.3 + 1;
  const glowSize = (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * (symbolProgress > 0.5 ? pulsePhase : 1);

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        filter: "drop-shadow(0px 0px " + glowSize + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + ")",
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center"
      }}>
        {/* Circle SVG */}
        <svg 
          width={width} 
          height={height} 
          viewBox={"0 0 " + width + " " + height}
          style={{ overflow: "visible" }}
        >
          <circle
            cx={width / 2}
            cy={height / 2}
            r={circleRadius}
            fill="none"
            stroke={(props.accentColor ?? SCENE_PARAMS.accentColor.value)}
            strokeWidth={(props.strokeWidth ?? SCENE_PARAMS.strokeWidth.value)}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            opacity={circleOpacity}
            transform={"rotate(-90 " + (width / 2) + " " + (height / 2) + ")"}
          />
        </svg>
        
        {/* Dollar Symbol */}
        <div style={{
          position: "absolute",
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          fontWeight: 700,
          fontSize: (props.symbolSize ?? SCENE_PARAMS.symbolSize.value),
          color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
          transform: "scale(" + symbolScale + ")",
          opacity: symbolOpacity,
        }}>
          {(props.symbol ?? SCENE_PARAMS.symbol.value)}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

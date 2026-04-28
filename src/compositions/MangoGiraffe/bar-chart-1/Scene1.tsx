// Template: bar-chart-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  title: { type: "text", label: "Title", value: "Quarterly Results" },
  label1: { type: "text", label: "Label 1", value: "Q1" },
  label2: { type: "text", label: "Label 2", value: "Q2" },
  label3: { type: "text", label: "Label 3", value: "Q3" },
  label4: { type: "text", label: "Label 4", value: "Q4" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#1e293b" },
  textColor: { type: "color", label: "Text Color", value: "#f1f5f9" },
  labelColor: { type: "color", label: "Label Color", value: "#94a3b8" },
  bar1Color: { type: "color", label: "Bar 1 Color", value: "#3b82f6" },
  bar2Color: { type: "color", label: "Bar 2 Color", value: "#8b5cf6" },
  bar3Color: { type: "color", label: "Bar 3 Color", value: "#ec4899" },
  bar4Color: { type: "color", label: "Bar 4 Color", value: "#f59e0b" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 8, min: 2, max: 20, step: 1 },
  
  // Style
  borderRadius: { type: "number", label: "Border Radius", value: 4, min: 0, max: 20, step: 2 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const staggerDelay = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  
  const minDim = Math.min(width, height);
  const barWidth = minDim * 0.12;
  const maxBarHeight = height * 0.5;
  const gap = minDim * 0.04;
  
  const data = [
    { label: (props.label1 ?? SCENE_PARAMS.label1.value), value: 0.6, color: (props.bar1Color ?? SCENE_PARAMS.bar1Color.value) },
    { label: (props.label2 ?? SCENE_PARAMS.label2.value), value: 0.8, color: (props.bar2Color ?? SCENE_PARAMS.bar2Color.value) },
    { label: (props.label3 ?? SCENE_PARAMS.label3.value), value: 0.5, color: (props.bar3Color ?? SCENE_PARAMS.bar3Color.value) },
    { label: (props.label4 ?? SCENE_PARAMS.label4.value), value: 0.9, color: (props.bar4Color ?? SCENE_PARAMS.bar4Color.value) },
  ];
  
  const totalWidth = data.length * barWidth + (data.length - 1) * gap;
  const startX = (width - totalWidth) / 2;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "flex-end", paddingBottom: height * 0.15 }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ position: "absolute", top: height * 0.08, width: "100%", textAlign: "center" }}>
          <h2 style={{ 
            color: (props.textColor ?? SCENE_PARAMS.textColor.value), 
            fontSize: minDim * 0.05, 
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            opacity: interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            {(props.title ?? SCENE_PARAMS.title.value)}
          </h2>
        </div>
        
        {/* Bars container */}
        <div style={{ 
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "center",
          gap: gap,
          width: "100%",
          position: "absolute",
          bottom: height * 0.15,
        }}>
          {data.map((item, i) => {
            const delay = i * staggerDelay;
            const barProgress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 12 } });
            const barHeight = maxBarHeight * item.value * barProgress;
            
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: barWidth,
                  height: barHeight,
                  backgroundColor: item.color,
                  borderRadius: (props.borderRadius ?? SCENE_PARAMS.borderRadius.value),
                  boxShadow: "0 4px 20px " + item.color + "40",
                }} />
                <span style={{
                  color: (props.labelColor ?? SCENE_PARAMS.labelColor.value),
                  fontSize: minDim * 0.025,
                  marginTop: minDim * 0.015,
                  fontFamily: "system-ui, sans-serif",
                }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

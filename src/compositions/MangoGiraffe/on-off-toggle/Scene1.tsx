// Template: on-off-toggle
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  offColor: { type: "color", label: "Off Color", value: "#cbd5e1" },
  onColor: { type: "color", label: "On Color", value: "#22c55e" },
  knobColor: { type: "color", label: "Knob Color", value: "#ffffff" },
  glowColor: { type: "color", label: "Glow Color", value: "#22c55e" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  toggleWidth: { type: "number", label: "Toggle Width", value: 120, min: 80, max: 200, step: 10 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const toggleWidth = minDim * ((props.toggleWidth ?? SCENE_PARAMS.toggleWidth.value) / 1000) * 2;
  const toggleHeight = toggleWidth * 0.55;
  const knobSize = toggleHeight * 0.8;
  const knobPadding = (toggleHeight - knobSize) / 2;
  const knobTravel = toggleWidth - knobSize - (knobPadding * 2);
  
  // Animation timeline
  const entranceStart = 0;
  const entranceEnd = 25;
  const tapStart = 40;
  const toggleOnStart = 45;
  const toggleOnEnd = 65;
  const holdOn = 90;
  const toggleOffStart = 95;
  const toggleOffEnd = 115;
  
  // Entrance animation
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  
  // Toggle ON animation
  const toggleOnProgress = spring({
    frame: Math.max(0, adjustedFrame - toggleOnStart),
    fps,
    config: { damping: 18, stiffness: 120 }
  });
  
  // Toggle OFF animation (starts after hold)
  const toggleOffProgress = spring({
    frame: Math.max(0, adjustedFrame - toggleOffStart),
    fps,
    config: { damping: 18, stiffness: 120 }
  });
  
  // Combined toggle position (0 = off, 1 = on)
  let togglePosition = 0;
  if (adjustedFrame >= toggleOnStart && adjustedFrame < toggleOffStart) {
    togglePosition = toggleOnProgress;
  } else if (adjustedFrame >= toggleOffStart) {
    togglePosition = interpolate(toggleOffProgress, [0, 1], [1, 0]);
  }
  
  // Knob position
  const knobX = interpolate(togglePosition, [0, 1], [knobPadding, knobPadding + knobTravel]);
  
  // Color transition
  const offColorRGB = { r: 203, g: 213, b: 225 }; // #cbd5e1
  const onColorRGB = { r: 34, g: 197, b: 94 }; // #22c55e
  
  const currentR = Math.round(interpolate(togglePosition, [0, 1], [offColorRGB.r, onColorRGB.r]));
  const currentG = Math.round(interpolate(togglePosition, [0, 1], [offColorRGB.g, onColorRGB.g]));
  const currentB = Math.round(interpolate(togglePosition, [0, 1], [offColorRGB.b, onColorRGB.b]));
  const trackColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
  
  // Glow effect
  const glowOpacity = interpolate(togglePosition, [0, 0.5, 1], [0, 0, (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value)]);
  const glowScale = interpolate(togglePosition, [0, 0.5, 1], [1, 1, 1.15]);
  
  // Tap indicator (subtle press effect)
  const tapProgress = spring({
    frame: Math.max(0, adjustedFrame - tapStart),
    fps,
    config: { damping: 25, stiffness: 200 }
  });
  const tapScale = adjustedFrame >= tapStart && adjustedFrame < tapStart + 10
    ? interpolate(tapProgress, [0, 0.5, 1], [1, 0.95, 1])
    : 1;
  
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${scaleValue})`,
        transformOrigin: "center center",
      }}>
        {/* Glow effect behind toggle */}
        <div style={{
          position: "absolute",
          width: toggleWidth * 1.5,
          height: toggleHeight * 1.5,
          borderRadius: toggleHeight,
          backgroundColor: (props.glowColor ?? SCENE_PARAMS.glowColor.value),
          filter: `blur(${toggleHeight * 0.6}px)`,
          opacity: glowOpacity,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          left: "50%",
          top: "50%",
          pointerEvents: "none",
        }} />
        
        {/* Toggle container */}
        <div style={{
          position: "relative",
          width: toggleWidth,
          height: toggleHeight,
          borderRadius: toggleHeight / 2,
          backgroundColor: trackColor,
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)",
          transform: `scale(${entranceScale * tapScale})`,
          opacity: entranceOpacity,
          transition: "background-color 0.01s",
        }}>
          {/* Knob */}
          <div style={{
            position: "absolute",
            width: knobSize,
            height: knobSize,
            borderRadius: "50%",
            backgroundColor: (props.knobColor ?? SCENE_PARAMS.knobColor.value),
            top: knobPadding,
            left: knobX,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
          }} />
        </div>
        
        {/* Label below toggle */}
        <div style={{
          marginTop: minDim * 0.04,
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: minDim * 0.028,
          fontWeight: 500,
          color: togglePosition > 0.5 ? (props.onColor ?? SCENE_PARAMS.onColor.value) : "#64748b",
          opacity: entranceOpacity,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          {togglePosition > 0.5 ? "ON" : "OFF"}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

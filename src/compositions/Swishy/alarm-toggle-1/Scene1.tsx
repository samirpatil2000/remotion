// Template: alarm-toggle-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  alarmTime: { type: "text", label: "Alarm Time", value: "9:40" },
  amPm: { type: "text", label: "AM/PM", value: "AM" },
  alarmLabel: { type: "text", label: "Label", value: "Alarm" },
  fontFamily: { type: "font", label: "Font", value: "Open Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  textOffColor: { type: "color", label: "Text Off Color", value: "#6b7280" },
  toggleOnColor: { type: "color", label: "Toggle On Color", value: "#22c55e" },
  toggleOffColor: { type: "color", label: "Toggle Off Color", value: "#3f3f46" },
  toggleKnobColor: { type: "color", label: "Toggle Knob", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 },
  toggleStartFrame: { type: "number", label: "Toggle Start Frame", value: 30, min: 10, max: 60, step: 5 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const toggleStart = SCENE_PARAMS.toggleStartFrame.value;
  const adjustedFrame = frame * speed;
  
  const toggleProgress = spring({
    frame: Math.max(0, adjustedFrame - toggleStart),
    fps,
    config: { damping: 18, stiffness: 120 }
  });
  
  const toggleWidth = minDim * 0.18;
  const toggleHeight = toggleWidth * 0.55;
  const knobSize = toggleHeight * 0.85;
  const knobPadding = (toggleHeight - knobSize) / 2;
  
  const knobX = interpolate(
    toggleProgress,
    [0, 1],
    [knobPadding, toggleWidth - knobSize - knobPadding],
    { extrapolateRight: "clamp" }
  );
  
  const toggleBgColor = toggleProgress > 0.5 
    ? SCENE_PARAMS.toggleOnColor.value 
    : SCENE_PARAMS.toggleOffColor.value;
  
  const timeColor = interpolate(
    toggleProgress,
    [0, 0.5, 1],
    [0, 0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const displayTimeColor = timeColor > 0.5 
    ? SCENE_PARAMS.textColor.value 
    : SCENE_PARAMS.textOffColor.value;
  
  const knobScale = interpolate(
    toggleProgress,
    [0, 0.3, 0.7, 1],
    [1, 1.1, 1.1, 1],
    { extrapolateRight: "clamp" }
  );
  
  const fadeIn = interpolate(
    adjustedFrame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center",
        opacity: fadeIn,
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: minDim * 0.75,
          padding: minDim * 0.04,
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: minDim * 0.01,
          }}>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: minDim * 0.015,
            }}>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, -apple-system, sans-serif",
                fontSize: minDim * 0.11,
                fontWeight: 300,
                color: displayTimeColor,
                letterSpacing: "-0.02em",
                transition: "color 0.2s ease",
              }}>
                {SCENE_PARAMS.alarmTime.value}
              </span>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, -apple-system, sans-serif",
                fontSize: minDim * 0.045,
                fontWeight: 400,
                color: displayTimeColor,
                transition: "color 0.2s ease",
              }}>
                {SCENE_PARAMS.amPm.value}
              </span>
            </div>
            
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, -apple-system, sans-serif",
              fontSize: minDim * 0.04,
              fontWeight: 400,
              color: SCENE_PARAMS.textOffColor.value,
              marginTop: minDim * 0.005,
            }}>
              {SCENE_PARAMS.alarmLabel.value}
            </span>
          </div>
          
          <div style={{
            position: "relative",
            width: toggleWidth,
            height: toggleHeight,
            borderRadius: toggleHeight / 2,
            backgroundColor: toggleBgColor,
            cursor: "pointer",
            transition: "background-color 0.15s ease",
          }}>
            <div style={{
              position: "absolute",
              top: knobPadding,
              left: knobX,
              width: knobSize,
              height: knobSize,
              borderRadius: "50%",
              backgroundColor: SCENE_PARAMS.toggleKnobColor.value,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              transform: "scale(" + knobScale + ")",
              transformOrigin: "center center",
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

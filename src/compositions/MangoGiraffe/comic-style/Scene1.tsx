// Template: comic-style
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  text: { type: "text", label: "Text", value: "Testing" },
  fontFamily: { type: "font", label: "Font", value: "Bangers" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  outlineColor: { type: "color", label: "Outline Color", value: "#5933b0" },
  shadowColor: { type: "color", label: "Shadow Color", value: "#1a1a2e" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  bounceIntensity: { type: "number", label: "Bounce Intensity", value: 1.3, min: 1, max: 2, step: 0.1 },
  showBurst: { type: "boolean", label: "Show Burst Lines", value: true },
  burstColor: { type: "color", label: "Burst Color", value: "#5933b0" },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const bounceIntensity = (props.bounceIntensity ?? SCENE_PARAMS.bounceIntensity.value);
  
  const entryProgress = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 8, stiffness: 180 } 
  });
  
  const textScale = interpolate(entryProgress, [0, 1], [0, bounceIntensity]);
  const finalScale = textScale > 1 ? interpolate(
    spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 12, stiffness: 200 } }),
    [0, 1],
    [bounceIntensity, 1]
  ) : textScale;
  
  const textRotation = interpolate(
    spring({ frame: adjustedFrame, fps, config: { damping: 10, stiffness: 150 } }),
    [0, 1],
    [-15, 0]
  );
  
  const wobble = Math.sin(adjustedFrame * 0.15) * 2;
  
  const burstOpacity = (props.showBurst ?? SCENE_PARAMS.showBurst.value) 
    ? interpolate(adjustedFrame, [8, 15, 50, 70], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  
  const burstScale = interpolate(
    spring({ frame: Math.max(0, adjustedFrame - 5), fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1],
    [0.5, 1.2]
  );
  
  const burstLines = [];
  const numLines = 12;
  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * 360;
    const lineDelay = i * 2;
    const lineProgress = interpolate(
      adjustedFrame - lineDelay,
      [5, 20],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    burstLines.push({
      angle,
      length: lineProgress * minDim * 0.15,
      opacity: lineProgress,
    });
  }
  
  const halftoneOpacity = interpolate(adjustedFrame, [0, 20], [0, 0.1], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: "radial-gradient(circle, " + (props.shadowColor ?? SCENE_PARAMS.shadowColor.value) + " 1px, transparent 1px)",
        backgroundSize: (minDim * 0.02) + "px " + (minDim * 0.02) + "px",
        opacity: halftoneOpacity,
      }} />
      
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        position: "relative",
      }}>
        {(props.showBurst ?? SCENE_PARAMS.showBurst.value) && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(" + burstScale + ")",
            opacity: burstOpacity,
          }}>
            {burstLines.map((line, i) => (
              <div key={i} style={{
                position: "absolute",
                width: line.length,
                height: minDim * 0.025,
                backgroundColor: (props.burstColor ?? SCENE_PARAMS.burstColor.value),
                transform: "rotate(" + line.angle + "deg) translateX(" + (minDim * 0.2) + "px)",
                transformOrigin: "left center",
                opacity: line.opacity,
                borderRadius: minDim * 0.01,
              }} />))}
          </div>
        )}
        
        <div style={{ 
          position: "relative", 
          display: "inline-block",
          textAlign: "center",
          transform: "scale(" + finalScale + ") rotate(" + (textRotation + wobble) + "deg)",
        }}>
          <h1 style={{
            position: "absolute",
            color: (props.shadowColor ?? SCENE_PARAMS.shadowColor.value),
            fontSize: minDim * 0.22,
            fontWeight: 700,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", Impact, sans-serif",
            margin: 0,
            padding: "0 " + (minDim * 0.05) + "px",
            letterSpacing: "0.05em",
            transform: "translate(" + (minDim * 0.015) + "px, " + (minDim * 0.015) + "px)",
            WebkitTextStroke: (minDim * 0.008) + "px " + (props.shadowColor ?? SCENE_PARAMS.shadowColor.value),
          }}>
            {(props.text ?? SCENE_PARAMS.text.value)}
          </h1>
          
          <h1 style={{
            position: "relative",
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: minDim * 0.22,
            fontWeight: 700,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", Impact, sans-serif",
            margin: 0,
            padding: "0 " + (minDim * 0.05) + "px",
            letterSpacing: "0.05em",
            WebkitTextStroke: (minDim * 0.012) + "px " + (props.outlineColor ?? SCENE_PARAMS.outlineColor.value),
            paintOrder: "stroke fill",
          }}>
            {(props.text ?? SCENE_PARAMS.text.value)}
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: goals
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  item1: { type: "text", label: "Item 1", value: "New Year" },
  item2: { type: "text", label: "Item 2", value: "New Goals" },
  item3: { type: "text", label: "Item 3", value: "New Energy" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent (Green)", value: "#22c55e" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  itemDelay: { type: "number", label: "Item Delay (frames)", value: 40, min: 20, max: 60, step: 5 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 80, min: 30, max: 150, step: 10 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const itemDelay = (props.itemDelay ?? SCENE_PARAMS.itemDelay.value);
  const entranceOffset = (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value);
  
  const items = [
    { text: (props.item1 ?? SCENE_PARAMS.item1.value), direction: "left", delay: 15 },
    { text: (props.item2 ?? SCENE_PARAMS.item2.value), direction: "right", delay: 15 + itemDelay },
    { text: (props.item3 ?? SCENE_PARAMS.item3.value), direction: "top", delay: 15 + itemDelay * 2 },
  ];
  
  const CheckMark = ({ props, progress, size }: any) => {
    const strokeLength = 24;
    const dashOffset = interpolate(progress, [0, 1], [strokeLength, 0], { extrapolateRight: "clamp" });
    const checkScale = interpolate(progress, [0, 0.5, 1], [0.8, 1.1, 1], { extrapolateRight: "clamp" });
    
    return (
      <div style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "scale(" + checkScale + ")",
        opacity: progress,
      }}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L19 7"
            stroke={(props.accentColor ?? SCENE_PARAMS.accentColor.value)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={strokeLength}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
    );
  };
  
  const AccentLine = ({ props, progress, position }: any) => {
    const lineWidth = interpolate(progress, [0, 1], [0, 100], { extrapolateRight: "clamp" });
    const opacity = interpolate(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0], { extrapolateRight: "clamp" });
    
    return (
      <div style={{
        position: "absolute",
        [position]: -4,
        left: 0,
        width: lineWidth + "%",
        height: 2,
        backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
        opacity: opacity,
        borderRadius: 1,
      }} />
    );
  };
  
  const ChecklistItem = ({ props, text, direction, delay, index }: any) => {
    const itemFrame = Math.max(0, adjustedFrame - delay);
    
    const textProgress = spring({
      frame: itemFrame,
      fps,
      config: direction === "top" 
        ? { damping: 15, stiffness: 120 }
        : { damping: 20, stiffness: 90 }
    });
    
    const checkDelay = 18;
    const checkProgress = spring({
      frame: Math.max(0, itemFrame - checkDelay),
      fps,
      config: { damping: 18, stiffness: 150 }
    });
    
    const lineDelay = 22;
    const lineProgress = interpolate(itemFrame, [lineDelay, lineDelay + 25], [0, 1], { extrapolateRight: "clamp" });
    
    let translateX = 0;
    let translateY = 0;
    
    if (direction === "left") {
      translateX = interpolate(textProgress, [0, 1], [-entranceOffset, 0]);
    } else if (direction === "right") {
      translateX = interpolate(textProgress, [0, 1], [entranceOffset, 0]);
    } else if (direction === "top") {
      translateY = interpolate(textProgress, [0, 1], [-entranceOffset, 0]);
    }
    
    const checkSize = minDim * 0.045;
    const fontSize = minDim * 0.065;
    const itemSpacing = minDim * 0.025;
    
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: minDim * 0.025,
        marginBottom: itemSpacing,
        opacity: textProgress,
        transform: "translate(" + translateX + "px, " + translateY + "px)",
      }}>
        <CheckMark props={props}  progress={checkProgress} size={checkSize} />
        <div style={{ position: "relative" }}>
          <span style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: fontSize,
            fontWeight: 700,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            letterSpacing: "-0.02em",
          }}>
            {text}
          </span>
          <AccentLine props={props}  progress={lineProgress} position="bottom" />
        </div>
      </div>
    );
  };
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: minDim * 0.05,
      }}>
        {items.map((item, index) => (
          <ChecklistItem props={props} 
            key={index}
            text={item.text}
            direction={item.direction}
            delay={item.delay}
            index={index}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

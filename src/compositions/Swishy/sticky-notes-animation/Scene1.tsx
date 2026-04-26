// Template: sticky-notes-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  note1Text: { type: "text", label: "Note 1 Text", value: "Don't forget!" },
  note2Text: { type: "text", label: "Note 2 Text", value: "Call Mom ♥" },
  note3Text: { type: "text", label: "Note 3 Text", value: "Buy milk" },
  fontFamily: { type: "font", label: "Font", value: "Caveat" },
  backgroundColor: { type: "color", label: "Desk Color", value: "#e8dcc8" },
  note1Color: { type: "color", label: "Note 1 Color", value: "#fef08a" },
  note2Color: { type: "color", label: "Note 2 Color", value: "#fda4af" },
  note3Color: { type: "color", label: "Note 3 Color", value: "#93c5fd" },
  textColor: { type: "color", label: "Text Color", value: "#1e293b" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  noteDelay: { type: "number", label: "Note Delay (frames)", value: 45, min: 20, max: 80, step: 5 },
  writingSpeed: { type: "number", label: "Writing Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  showShadow: { type: "boolean", label: "Show Shadow", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const noteDelay = (props.noteDelay ?? SCENE_PARAMS.noteDelay.value);
  const writingSpeed = (props.writingSpeed ?? SCENE_PARAMS.writingSpeed.value);
  
  const noteWidth = isPortrait ? width * 0.55 : width * 0.22;
  const noteHeight = noteWidth * 1.0;
  const fontSize = minDim * 0.045;
  
  const notes = [
    { text: (props.note1Text ?? SCENE_PARAMS.note1Text.value), color: (props.note1Color ?? SCENE_PARAMS.note1Color.value), delay: 0, x: 0, rotation: -3 },
    { text: (props.note2Text ?? SCENE_PARAMS.note2Text.value), color: (props.note2Color ?? SCENE_PARAMS.note2Color.value), delay: noteDelay, x: isPortrait ? 0 : -noteWidth * 1.1, rotation: 2 },
    { text: (props.note3Text ?? SCENE_PARAMS.note3Text.value), color: (props.note3Color ?? SCENE_PARAMS.note3Color.value), delay: noteDelay * 2, x: isPortrait ? 0 : noteWidth * 1.1, rotation: -1 },
  ];
  
  const portraitOffsets = [
    { y: -noteHeight * 0.6 },
    { y: noteHeight * 0.5 },
    { y: noteHeight * 1.6 },
  ];
  
  function StickyNote({ props, text, color, delay, xOffset, rotation, index }: any) {
    const noteFrame = Math.max(0, adjustedFrame - delay);
    
    const entranceProgress = spring({
      frame: noteFrame,
      fps,
      config: { damping: 12, stiffness: 100 }
    });
    
    const settleProgress = spring({
      frame: Math.max(0, noteFrame - 15),
      fps,
      config: { damping: 18, stiffness: 150 }
    });
    
    const slideY = interpolate(entranceProgress, [0, 1], [height * 0.4, 0]);
    const scaleEntrance = interpolate(entranceProgress, [0, 1], [0.3, 1]);
    const bounceScale = interpolate(settleProgress, [0, 0.5, 1], [1, 1.03, 1]);
    
    const yOffset = isPortrait ? portraitOffsets[index].y : 0;
    
    const writingDelay = delay + 25;
    const writingFrame = Math.max(0, adjustedFrame - writingDelay) * writingSpeed;
    const charsPerFrame = 0.8;
    const visibleChars = Math.floor(writingFrame * charsPerFrame);
    const displayText = text.substring(0, Math.min(visibleChars, text.length));
    
    const cursorVisible = visibleChars < text.length && noteFrame > 20;
    const cursorBlink = Math.sin(adjustedFrame * 0.3) > 0;
    
    const shadowStyle = (props.showShadow ?? SCENE_PARAMS.showShadow.value) ? {
      boxShadow: "4px 6px 12px rgba(0,0,0,0.15), 2px 3px 6px rgba(0,0,0,0.1)",
    } : {};
    
    return (
      <div style={{
        position: "absolute",
        width: noteWidth,
        height: noteHeight,
        backgroundColor: color,
        borderRadius: minDim * 0.008,
        transform: "translate(" + xOffset + "px, " + (slideY + yOffset) + "px) rotate(" + rotation + "deg) scale(" + (scaleEntrance * bounceScale) + ")",
        opacity: entranceProgress,
        display: "flex",
        flexDirection: "column",
        padding: noteWidth * 0.12,
        boxSizing: "border-box",
        ...shadowStyle,
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: "30%",
          height: noteHeight * 0.06,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
          borderRadius: "0 0 4px 4px",
        }} />
        
        <div style={{
          marginTop: noteHeight * 0.1,
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", cursive, sans-serif",
          fontSize: fontSize,
          fontWeight: 500,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          lineHeight: 1.4,
          wordWrap: "break-word",
          position: "relative",
        }}>
          {displayText}
          {cursorVisible && cursorBlink && (
            <span style={{
              display: "inline-block",
              width: 2,
              height: fontSize * 0.9,
              backgroundColor: (props.textColor ?? SCENE_PARAMS.textColor.value),
              marginLeft: 2,
              verticalAlign: "text-bottom",
            }} />
          )}
        </div>
        
        {[0, 1, 2, 3].map((lineIndex) => (
          <div key={lineIndex} style={{
            position: "absolute",
            bottom: noteHeight * (0.15 + lineIndex * 0.15),
            left: noteWidth * 0.1,
            right: noteWidth * 0.1,
            height: 1,
            backgroundColor: "rgba(0,0,0,0.06)",
          }} />
        ))}
      </div>
    );
  }
  
  const deskGrain = "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.03) 0%, transparent 40%)";
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      backgroundImage: deskGrain,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        position: "absolute",
        top: "8%",
        right: "10%",
        width: minDim * 0.12,
        height: minDim * 0.04,
        backgroundColor: "#78716c",
        borderRadius: minDim * 0.005,
        opacity: 0.3,
        transform: "rotate(15deg)",
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "12%",
        left: "8%",
        width: minDim * 0.08,
        height: minDim * 0.08,
        borderRadius: "50%",
        border: "3px solid #a8a29e",
        opacity: 0.25,
      }} />
      
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: isPortrait ? noteWidth : noteWidth * 3.5,
        height: isPortrait ? noteHeight * 3 : noteHeight,
      }}>
        {notes.map((note, index) => (
          <StickyNote props={props} 
            key={index}
            text={note.text}
            color={note.color}
            delay={note.delay}
            xOffset={note.x}
            rotation={note.rotation}
            index={index}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

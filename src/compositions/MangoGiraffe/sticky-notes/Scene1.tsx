// Template: sticky-notes
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoText: { type: "text", label: "Logo Text", value: "Sticky" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f5" },
  noteColor1: { type: "color", label: "Note Color 1", value: "#fef08a" },
  noteColor2: { type: "color", label: "Note Color 2", value: "#a5f3fc" },
  noteColor3: { type: "color", label: "Note Color 3", value: "#fca5a5" },
  noteColor4: { type: "color", label: "Note Color 4", value: "#d9f99d" },
  noteColor5: { type: "color", label: "Note Color 5", value: "#f5d0fe" },
  accentColor: { type: "color", label: "Accent", value: "#fef08a" },
  textColor: { type: "color", label: "Text Color", value: "#0f172a" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 4, min: 2, max: 12, step: 1 },
  noteCount: { type: "number", label: "Note Count", value: 12, min: 6, max: 20, step: 1 },
  noteSize: { type: "number", label: "Note Size", value: 0.12, min: 0.08, max: 0.2, step: 0.01 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const stagger = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  const noteCount = Math.floor((props.noteCount ?? SCENE_PARAMS.noteCount.value));
  const noteSize = minDim * (props.noteSize ?? SCENE_PARAMS.noteSize.value);
  
  const noteColors = [
    (props.noteColor1 ?? SCENE_PARAMS.noteColor1.value),
    (props.noteColor2 ?? SCENE_PARAMS.noteColor2.value),
    (props.noteColor3 ?? SCENE_PARAMS.noteColor3.value),
    (props.noteColor4 ?? SCENE_PARAMS.noteColor4.value),
    (props.noteColor5 ?? SCENE_PARAMS.noteColor5.value),
  ];
  
  const generateNotes = () => {
    const notes = [];
    const seed = 42;
    for (let i = 0; i < noteCount; i++) {
      const pseudoRandom = (seed * (i + 1) * 9301 + 49297) % 233280;
      const rand1 = pseudoRandom / 233280;
      const rand2 = ((pseudoRandom * 7) % 233280) / 233280;
      const rand3 = ((pseudoRandom * 13) % 233280) / 233280;
      const rand4 = ((pseudoRandom * 19) % 233280) / 233280;
      
      const angle = (i / noteCount) * Math.PI * 2 + rand1 * 0.5;
      const distance = minDim * 0.25 + rand2 * minDim * 0.15;
      
      notes.push({
        id: i,
        finalX: width / 2 + Math.cos(angle) * distance - noteSize / 2,
        finalY: height / 2 + Math.sin(angle) * distance - noteSize / 2,
        startX: width / 2 + Math.cos(angle) * (width + height),
        startY: height / 2 + Math.sin(angle) * (width + height),
        rotation: (rand3 - 0.5) * 30,
        color: noteColors[i % noteColors.length],
        delay: i * stagger,
        scaleVar: 0.85 + rand4 * 0.3,
      });
    }
    return notes;
  };
  
  const notes = generateNotes();
  
  const lastNoteDelay = (noteCount - 1) * stagger;
  const notesSettledFrame = lastNoteDelay + 35;
  const logoStartFrame = notesSettledFrame + 10;
  
  const logoProgress = spring({
    frame: Math.max(0, adjustedFrame - logoStartFrame),
    fps,
    config: { damping: 18, stiffness: 100 },
  });
  
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        {notes.map((note) => {
          const noteProgress = spring({
            frame: Math.max(0, adjustedFrame - note.delay),
            fps,
            config: { damping: 22, stiffness: 85 },
          });
          
          const x = interpolate(noteProgress, [0, 1], [note.startX, note.finalX]);
          const y = interpolate(noteProgress, [0, 1], [note.startY, note.finalY]);
          const rotation = interpolate(noteProgress, [0, 1], [note.rotation + 180, note.rotation]);
          const scale = interpolate(noteProgress, [0, 1], [0.3, note.scaleVar]);
          
          return (
            <div
              key={note.id}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: noteSize,
                height: noteSize,
                backgroundColor: note.color,
                borderRadius: minDim * 0.008,
                transform: "rotate(" + rotation + "deg) scale(" + scale + ")",
                boxShadow: "0 " + minDim * 0.01 + "px " + minDim * 0.025 + "px rgba(0,0,0,0.25)",
                opacity: noteProgress,
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: minDim * 0.015,
                backgroundColor: "rgba(0,0,0,0.08)",
                borderTopLeftRadius: minDim * 0.008,
                borderTopRightRadius: minDim * 0.008,
              }} />
            </div>
          );
        })}
        
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(" + logoScale + ")",
          opacity: logoOpacity,
          textAlign: "center",
          zIndex: 100,
        }}>
          <div style={{
            backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            padding: minDim * 0.03 + "px " + minDim * 0.06 + "px",
            borderRadius: minDim * 0.015,
            boxShadow: "0 " + minDim * 0.015 + "px " + minDim * 0.04 + "px rgba(0,0,0,0.3)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: minDim * 0.02,
              backgroundColor: "rgba(0,0,0,0.1)",
              borderTopLeftRadius: minDim * 0.015,
              borderTopRightRadius: minDim * 0.015,
            }} />
            <h1 style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.12,
              fontWeight: 800,
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              margin: 0,
              letterSpacing: "-0.02em",
            }}>
              {(props.logoText ?? SCENE_PARAMS.logoText.value)}
            </h1>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

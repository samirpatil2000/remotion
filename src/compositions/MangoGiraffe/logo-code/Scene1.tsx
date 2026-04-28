// Template: logo-code
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  mainWord: { type: "text", label: "Main Word", value: "Mango Giraffe" },
  fontFamily: { type: "font", label: "Font", value: "Space Mono" },
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0a" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  scrambleCycles: { type: "number", label: "Scramble Cycles", value: 8, min: 3, max: 15, step: 1 },
  letterStagger: { type: "number", label: "Letter Stagger (frames)", value: 6, min: 2, max: 15, step: 1 },
  cycleSpeed: { type: "number", label: "Cycle Speed (frames)", value: 3, min: 1, max: 6, step: 1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const word = (props.mainWord ?? SCENE_PARAMS.mainWord.value);
  const letters = word.split("");
  
  const scrambleChars = ["+", "-", "=", ";", "*", ".", ":", "/", "\\", "|", "_", "#", "@", "&", "%", "^", "~", "<", ">", "{", "}", "[", "]"];
  
  const letterStagger = (props.letterStagger ?? SCENE_PARAMS.letterStagger.value);
  const scrambleCycles = (props.scrambleCycles ?? SCENE_PARAMS.scrambleCycles.value);
  const cycleSpeed = (props.cycleSpeed ?? SCENE_PARAMS.cycleSpeed.value);
  
  const getLetterDisplay = (letter, index) => {
    const letterStartFrame = index * letterStagger;
    const letterFrame = adjustedFrame - letterStartFrame;
    
    if (letterFrame < 0) {
      return { char: "", opacity: 0 };
    }
    
    const scrambleDuration = scrambleCycles * cycleSpeed;
    
    if (letterFrame >= scrambleDuration) {
      const revealProgress = interpolate(
        letterFrame,
        [scrambleDuration, scrambleDuration + 8],
        [0, 1],
        { extrapolateRight: "clamp" }
      );
      return { char: letter, opacity: 1, scale: interpolate(revealProgress, [0, 1], [1.1, 1]) };
    }
    
    const cycleIndex = Math.floor(letterFrame / cycleSpeed);
    const charIndex = (cycleIndex + index * 7) % scrambleChars.length;
    
    const flickerOpacity = interpolate(
      letterFrame % cycleSpeed,
      [0, cycleSpeed * 0.3, cycleSpeed],
      [0.6, 1, 0.8],
      { extrapolateRight: "clamp" }
    );
    
    return { char: scrambleChars[charIndex], opacity: flickerOpacity, scale: 1 };
  };
  
  const containerEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  const containerOpacity = interpolate(containerEntrance, [0, 1], [0, 1]);
  
  const fontSize = minDim * 0.12;
  const letterSpacing = minDim * 0.015;
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)})`,
        transformOrigin: "center center",
        opacity: containerOpacity,
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: letterSpacing,
        }}>
          {letters.map((letter, index) => {
            const display = getLetterDisplay(letter, index);
            
            return (
              <span
                key={index}
                style={{
                  fontFamily: `"${(props.fontFamily ?? SCENE_PARAMS.fontFamily.value)}", monospace`,
                  fontSize: fontSize,
                  fontWeight: 400,
                  color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                  opacity: display.opacity,
                  transform: `scale(${display.scale || 1})`,
                  display: "inline-block",
                  minWidth: fontSize * 0.6,
                  textAlign: "center",
                  letterSpacing: "0.05em",
                }}
              >
                {display.char}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

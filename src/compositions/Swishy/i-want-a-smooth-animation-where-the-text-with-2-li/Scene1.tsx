// Template: i-want-a-smooth-animation-where-the-text-with-2-li
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  line1Text1: { type: "text", label: "Line 1 (First)", value: "Swishy" },
  line2Text1: { type: "text", label: "Line 2 (First)", value: "Design" },
  line1Text2: { type: "text", label: "Line 1 (Second)", value: "Creative" },
  line2Text2: { type: "text", label: "Line 2 (Second)", value: "Motion" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  jiggleIntensity: { type: "number", label: "Jiggle Intensity", value: 3, min: 1, max: 10, step: 0.5 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  
  const cycleLength = durationInFrames / 2;
  const currentCycle = Math.floor(frame / cycleLength) % 2;
  const cycleFrame = frame % cycleLength;
  
  const isFirstText = currentCycle === 0;
  const line1 = isFirstText ? (props.line1Text1 ?? SCENE_PARAMS.line1Text1.value) : (props.line1Text2 ?? SCENE_PARAMS.line1Text2.value);
  const line2 = isFirstText ? (props.line2Text1 ?? SCENE_PARAMS.line2Text1.value) : (props.line2Text2 ?? SCENE_PARAMS.line2Text2.value);
  
  const enterPhase = cycleLength * 0.3;
  const holdPhase = cycleLength * 0.4;
  const exitPhase = cycleLength * 0.3;
  
  const enterEnd = enterPhase;
  const holdEnd = enterEnd + holdPhase;
  
  const jiggle = (seed, intensity) => {
    const time = frame * 0.02 * speed;
    return Math.sin(time * 2 + seed) * intensity * 0.5 + 
           Math.sin(time * 3.7 + seed * 2) * intensity * 0.3 +
           Math.sin(time * 5.3 + seed * 3) * intensity * 0.2;
  };
  
  const letters1 = line1.split('');
  const letters2 = line2.split('');
  
  const getLetterAnimation = (index, total, isTopLine) => {
    const stagger = index * 2;
    const direction = isTopLine ? -1 : 1;
    const jiggleOffset = (props.jiggleIntensity ?? SCENE_PARAMS.jiggleIntensity.value);
    
    let yOffset = 0;
    let opacity = 0;
    let rotateZ = 0;
    
    if (cycleFrame < enterEnd) {
      const progress = spring({
        frame: Math.max(0, cycleFrame * speed - stagger),
        fps,
        config: { damping: 25, stiffness: 60 }
      });
      yOffset = interpolate(progress, [0, 1], [direction * minDim * 0.3, 0], { extrapolateRight: "clamp" });
      opacity = progress;
      rotateZ = interpolate(progress, [0, 1], [direction * 15, 0], { extrapolateRight: "clamp" });
    } else if (cycleFrame < holdEnd) {
      yOffset = jiggle(index * 7, jiggleOffset);
      opacity = 1;
      rotateZ = jiggle(index * 13, jiggleOffset * 0.3);
    } else {
      const exitFrame = cycleFrame - holdEnd;
      const progress = spring({
        frame: Math.max(0, exitFrame * speed - stagger),
        fps,
        config: { damping: 25, stiffness: 60 }
      });
      yOffset = interpolate(progress, [0, 1], [0, direction * minDim * 0.3], { extrapolateRight: "clamp" });
      yOffset += jiggle(index * 7, jiggleOffset * (1 - progress));
      opacity = 1 - progress;
      rotateZ = interpolate(progress, [0, 1], [0, direction * 15], { extrapolateRight: "clamp" });
    }
    
    const xJiggle = cycleFrame >= enterEnd && cycleFrame < holdEnd ? jiggle(index * 11, jiggleOffset * 0.5) : 0;
    
    return { yOffset, opacity, rotateZ, xJiggle };
  };
  
  const fontSize = minDim * 0.12;
  const letterSpacing = fontSize * 0.02;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: minDim * 0.01
      }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {letters1.map((letter, i) => {
            const anim = getLetterAnimation(i, letters1.length, true);
            return (
              <span
                key={"l1-" + i}
                style={{
                  display: "inline-block",
                  fontSize: fontSize,
                  fontWeight: 600,
                  color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                  opacity: anim.opacity,
                  transform: "translateY(" + anim.yOffset + "px) translateX(" + anim.xJiggle + "px) rotate(" + anim.rotateZ + "deg)",
                  letterSpacing: letterSpacing,
                  willChange: "transform, opacity"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {letters2.map((letter, i) => {
            const anim = getLetterAnimation(i, letters2.length, false);
            return (
              <span
                key={"l2-" + i}
                style={{
                  display: "inline-block",
                  fontSize: fontSize,
                  fontWeight: 600,
                  color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                  opacity: anim.opacity,
                  transform: "translateY(" + anim.yOffset + "px) translateX(" + anim.xJiggle + "px) rotate(" + anim.rotateZ + "deg)",
                  letterSpacing: letterSpacing,
                  willChange: "transform, opacity"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

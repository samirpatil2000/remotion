// Template: concert-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  topText: { type: "text", label: "Top Text", value: "AUG 7-9 • 2026" },
  mainText: { type: "text", label: "Main Text", value: "OUTSIDE LANDS" },
  bottomText: { type: "text", label: "Bottom Text", value: "SAN FRANCISCO • GOLDEN GATE PARK" },
  fontFamily: { type: "font", label: "Font", value: "Archivo Black" },
  backgroundColor: { type: "color", label: "Background", value: "#0a2230" },
  topColor: { type: "color", label: "Top Color", value: "#ed86b6" },
  mainColor: { type: "color", label: "Main Color", value: "#fcee0a" },
  bottomColor: { type: "color", label: "Bottom Color", value: "#e36049" },
  scale: { type: "number", label: "Scale", value: 0.6, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;

  // Using width for font sizes so the logo stays perfectly proportioned
  // and fits horizontally on any screen ratio.
  const linesConfig = [
    {
      text: (props.topText ?? SCENE_PARAMS.topText.value),
      color: (props.topColor ?? SCENE_PARAMS.topColor.value),
      fontSize: width * 0.045,
      letterSpacing: "0.05em",
      marginBottom: -width * 0.015,
      justifyContent: "flex-start",
      paddingLeft: "8%", // Insets the text to align roughly over "OUTSIDE"
      marginRight: width * 0.015,
      scaleY: 1
    },
    {
      text: (props.mainText ?? SCENE_PARAMS.mainText.value),
      color: (props.mainColor ?? SCENE_PARAMS.mainColor.value),
      fontSize: width * 0.14,
      letterSpacing: "-0.01em",
      marginBottom: width * 0.01,
      justifyContent: "center",
      paddingLeft: "0%",
      marginRight: width * 0.03,
      scaleY: 1.15 // Slightly tall aspect ratio to match the logo font
    },
    {
      text: (props.bottomText ?? SCENE_PARAMS.bottomText.value),
      color: (props.bottomColor ?? SCENE_PARAMS.bottomColor.value),
      fontSize: width * 0.038,
      letterSpacing: "0.08em",
      marginBottom: 0,
      justifyContent: "center",
      paddingLeft: "0%",
      marginRight: width * 0.015,
      scaleY: 1
    }
  ];

  const totalWords = linesConfig.reduce((acc, line) => acc + line.text.split(/\s+/).filter(w => w.length > 0).length, 0);

  // Relative timing logic so animations complete properly
  const animationWindow = durationInFrames * 0.7;
  const staggerWindow = animationWindow * 0.6;
  const individualDelay = totalWords > 1 ? staggerWindow / (totalWords - 1) : 0;

  let globalWordIndex = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "95%",
        perspective: "1000px"
      }}>
        {linesConfig.map((line, lineIndex) => {
          const words = line.text.split(/\s+/).filter(w => w.length > 0);
          if (words.length === 0) return null;
          
          return (
            <div key={lineIndex} style={{ 
              display: "flex", 
              flexWrap: "nowrap", 
              justifyContent: line.justifyContent, 
              paddingLeft: line.paddingLeft,
              marginBottom: line.marginBottom, 
              width: "100%",
              zIndex: 3 - lineIndex
            }}>
              {words.map((word, wordIndex) => {
                const currentIndex = globalWordIndex++;
                
                // Calculate staggered spring animation identical to the original
                const delay = currentIndex * individualDelay;
                const progress = spring({
                  frame: Math.max(0, adjustedFrame - delay),
                  fps,
                  config: { damping: 13, stiffness: 140 } // Bouncy landing
                });

                // Motion properties
                const yOffset = interpolate(progress, [0, 1], [-height * 0.6, 0]);
                const opacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
                const rotate = interpolate(progress, [0, 1], [currentIndex % 2 === 0 ? 25 : -25, 0]);
                const blur = interpolate(progress, [0, 1], [10, 0], { extrapolateRight: "clamp" });

                return (
                  <div key={wordIndex} style={{ 
                    marginRight: wordIndex === words.length - 1 ? 0 : line.marginRight, 
                    overflow: "visible",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <div style={{ // Wrapping div to handle scaleY separately from rotation
                      transform: `scaleY(${line.scaleY})`
                    }}>
                      <div style={{
                        display: "inline-block",
                        fontSize: line.fontSize,
                        fontWeight: 900,
                        fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", Impact, system-ui, sans-serif",
                        color: line.color,
                        letterSpacing: line.letterSpacing,
                        lineHeight: 1,
                        transform: `translateY(${yOffset}px) rotate(${rotate}deg)`,
                        opacity: opacity,
                        filter: `blur(${blur}px)`
                      }}>
                        {word}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

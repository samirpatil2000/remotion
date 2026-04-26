// Template: wiggle-text
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  topText: { type: "text", label: "Top Text", value: "Text" },
  bottomText: { type: "text", label: "Bottom Text", value: "title" },
  fontFamily: { type: "font", label: "Font", value: "Permanent Marker" },
  backgroundColor: { type: "color", label: "Background", value: "#121212" },
  gridColor: { type: "color", label: "Grid Color", value: "#2A2A2E" },
  textColor: { type: "color", label: "Text Color", value: "#D4D4C8" },
  glowColor: { type: "color", label: "Glow Color", value: "#D4D4C8" },
  scale: { type: "number", label: "Scale", value: 1.1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.8, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 4, min: 0, max: 30, step: 1 },
  letterStagger: { type: "number", label: "Letter Stagger", value: 3, min: 1, max: 8, step: 1 },
  showGrid: { type: "boolean", label: "Show Grid", value: true },
  sketchyEffect: { type: "boolean", label: "Sketchy Effect", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const stagger = (props.letterStagger ?? SCENE_PARAMS.letterStagger.value);
  
  const topText = (props.topText ?? SCENE_PARAMS.topText.value);
  const bottomText = (props.bottomText ?? SCENE_PARAMS.bottomText.value);
  
  const gridSize = minDim * 0.04;
  const gridLines = [];
  
  if ((props.showGrid ?? SCENE_PARAMS.showGrid.value)) {
    for (let x = 0; x < width; x += gridSize) {
      gridLines.push(
        React.createElement("div", {
          key: "v" + x,
          style: {
            position: "absolute",
            left: x,
            top: 0,
            width: 1,
            height: "100%",
            backgroundColor: (props.gridColor ?? SCENE_PARAMS.gridColor.value),
            opacity: 0.5,
          }
        })
      );
    }
    for (let y = 0; y < height; y += gridSize) {
      gridLines.push(
        React.createElement("div", {
          key: "h" + y,
          style: {
            position: "absolute",
            left: 0,
            top: y,
            width: "100%",
            height: 1,
            backgroundColor: (props.gridColor ?? SCENE_PARAMS.gridColor.value),
            opacity: 0.5,
          }
        })
      );
    }
  }
  
  const renderAnimatedText = (text, startDelay, fontSize, isTop) => {
    const letters = text.split("");
    
    return letters.map((letter, i) => {
      const letterDelay = startDelay + (i * stagger);
      const progress = spring({
        frame: Math.max(0, adjustedFrame - letterDelay),
        fps,
        config: { damping: 18, stiffness: 100 }
      });
      
      const drawProgress = interpolate(adjustedFrame, [letterDelay, letterDelay + 15], [0, 1], { extrapolateRight: "clamp" });
      const yOffset = interpolate(progress, [0, 1], [minDim * 0.05, 0]);
      const rotation = (props.sketchyEffect ?? SCENE_PARAMS.sketchyEffect.value) 
        ? interpolate(progress, [0, 1], [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 2])
        : 0;
      
      const wobble = (props.sketchyEffect ?? SCENE_PARAMS.sketchyEffect.value) && progress > 0.9
        ? Math.sin(adjustedFrame * 0.3 + i) * 1
        : 0;
      
      return React.createElement("span", {
        key: i,
        style: {
          display: "inline-block",
          opacity: drawProgress,
          transform: "translateY(" + (yOffset + wobble) + "px) rotate(" + rotation + "deg)",
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", cursive",
          fontSize: fontSize,
          fontWeight: isTop ? 400 : 700,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          textShadow: "0 0 " + ((props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * drawProgress) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + ", 0 0 " + ((props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * 0.5 * drawProgress) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value),
          letterSpacing: isTop ? minDim * 0.005 : minDim * 0.01,
          marginRight: letter === " " ? minDim * 0.02 : 0,
        }
      }, letter === " " ? "\u00A0" : letter);
    });
  };
  
  const containerProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  const containerScale = interpolate(containerProgress, [0, 1], [0.95, 1]);
  
  return React.createElement(AbsoluteFill, {
    style: {
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }
  },
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }
    }, gridLines),
    
    React.createElement("div", {
      style: {
        transform: "scale(" + ((props.scale ?? SCENE_PARAMS.scale.value) * containerScale) + ")",
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: minDim * 0.02,
      }
    },
      React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          paddingLeft: minDim * 0.05,
        }
      }, renderAnimatedText(topText, 10, minDim * 0.08, true)),
      
      React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
        }
      }, renderAnimatedText(bottomText, 10 + topText.length * stagger + 8, minDim * 0.14, false))
    )
  );
}

export default Scene;

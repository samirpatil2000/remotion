// Template: notepad
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Headline", value: "Note" },
  description: { type: "multilineText", label: "Long Description", value: "Creating compelling video content requires a deep understanding of your audience. Start by identifying the core message you want to convey, then build a narrative structure that keeps viewers engaged from start to finish." },
  cursorChar: { type: "text", label: "Cursor", value: "|" },
  headingFont: { type: "font", label: "Heading Font", value: "Space Grotesk" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  gridColor: { type: "color", label: "Grid Color", value: "#e5e7eb" },
  panelColor: { type: "color", label: "Panel Color", value: "#1c1c1c" },
  textColor: { type: "color", label: "Text Color", value: "#f8fafc" },
  accentColor: { type: "color", label: "Accent", value: "#d95000" },
  macRed: { type: "color", label: "Mac Red", value: "#ff5f57" },
  macYellow: { type: "color", label: "Mac Yellow", value: "#febc2e" },
  macGreen: { type: "color", label: "Mac Green", value: "#28c840" },
  macButtonSize: { type: "number", label: "Mac Button Size", value: 0.018, min: 0.01, max: 0.04, step: 0.002 },
  macButtonGap: { type: "number", label: "Mac Button Gap", value: 0.011, min: 0.005, max: 0.03, step: 0.002 },
  macRowOffset: { type: "number", label: "Mac Row Offset", value: 0.01, min: 0, max: 0.05, step: 0.002 },
  gridSize: { type: "number", label: "Grid Size", value: 80, min: 40, max: 140, step: 5 },
  skewX: { type: "number", label: "Skew X", value: -7, min: -15, max: 15, step: 1 },
  skewY: { type: "number", label: "Skew Y", value: 2, min: -10, max: 10, step: 1 },
  panelWidth: { type: "number", label: "Panel Width", value: 0.66, min: 0.5, max: 0.95, step: 0.01 },
  panelHeight: { type: "number", label: "Panel Height", value: 0.7, min: 0.25, max: 0.7, step: 0.01 },
  shadowOpacity: { type: "number", label: "Shadow Opacity", value: 0.25, min: 0, max: 1, step: 0.05 },
  shadowBlur: { type: "number", label: "Shadow Blur", value: 40, min: 0, max: 80, step: 2 },
  shadowOffset: { type: "number", label: "Shadow Offset", value: 18, min: 0, max: 60, step: 2 },
  cursorBlinkSpeed: { type: "number", label: "Cursor Blink Speed", value: 1.9, min: 0.5, max: 3, step: 0.1 },
  typingSpeed: { type: "number", label: "Typing Speed", value: 1.5, min: 0.5, max: 4, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.3, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  // Phase 1: Pixel click appears (0-15 frames)
  const clickPhaseEnd = 15;
  const clickProgress = interpolate(adjustedFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const clickFade = interpolate(adjustedFrame, [8, clickPhaseEnd], [1, 0], { extrapolateRight: "clamp" });
  
  // Ripple effect
  const rippleScale1 = interpolate(adjustedFrame, [0, 12], [0, 3], { extrapolateRight: "clamp" });
  const rippleOpacity1 = interpolate(adjustedFrame, [0, 12], [0.8, 0], { extrapolateRight: "clamp" });
  const rippleScale2 = interpolate(adjustedFrame, [3, 15], [0, 2.5], { extrapolateRight: "clamp" });
  const rippleOpacity2 = interpolate(adjustedFrame, [3, 15], [0.6, 0], { extrapolateRight: "clamp" });

  // Phase 2: Panel expands from pixel (15-45 frames)
  const expandStart = clickPhaseEnd;
  const expandEnd = 45;
  const expandProgress = spring({
    frame: Math.max(0, adjustedFrame - expandStart),
    fps,
    config: { damping: 18, stiffness: 80 }
  });
  
  const panelScaleValue = interpolate(expandProgress, [0, 1], [0.02, 1], { extrapolateRight: "clamp" });
  const panelOpacity = interpolate(expandProgress, [0, 0.1, 1], [0, 1, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });

  // Phase 3: Zoom into cursor area (45-75 frames)
  const zoomStart = 50;
  const zoomEnd = 75;
  const zoomProgress = spring({
    frame: Math.max(0, adjustedFrame - zoomStart),
    fps,
    config: { damping: 25, stiffness: 70 }
  });
  
  const zoomScale = interpolate(zoomProgress, [0, 1], [1, 1.4], { extrapolateRight: "clamp" });
  const zoomOffsetY = interpolate(zoomProgress, [0, 1], [0, height * 0.12], { extrapolateRight: "clamp" });

  // Phase 4: Title appears (60-80 frames)
  const titleStart = 60;
  const headlineProgress = spring({
    frame: Math.max(0, adjustedFrame - titleStart),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [15, 0], { extrapolateRight: "clamp" });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  // Phase 5: Typing animation (80+ frames)
  const typingStart = 85;
  const description = (props.description ?? SCENE_PARAMS.description.value);
  const charsPerFrame = (props.typingSpeed ?? SCENE_PARAMS.typingSpeed.value) * 0.8;
  const typedChars = Math.floor(Math.max(0, (adjustedFrame - typingStart) * charsPerFrame));
  const displayedText = description.substring(0, Math.min(typedChars, description.length));
  const isTyping = adjustedFrame >= typingStart && typedChars < description.length;

  // Cursor blink
  const blink = (Math.sin((adjustedFrame / fps) * Math.PI * 2 * (props.cursorBlinkSpeed ?? SCENE_PARAMS.cursorBlinkSpeed.value)) + 1) / 2;
  const cursorOpacity = isTyping ? 1 : interpolate(blink, [0, 1], [0.1, 1], { extrapolateRight: "clamp" });

  const gridSize = (props.gridSize ?? SCENE_PARAMS.gridSize.value);
  const panelWidth = width * (props.panelWidth ?? SCENE_PARAMS.panelWidth.value);
  const panelHeight = height * (props.panelHeight ?? SCENE_PARAMS.panelHeight.value);

  const macSize = minDim * (props.macButtonSize ?? SCENE_PARAMS.macButtonSize.value);
  const macGap = minDim * (props.macButtonGap ?? SCENE_PARAMS.macButtonGap.value);

  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      backgroundImage: "linear-gradient(to right, " + (props.gridColor ?? SCENE_PARAMS.gridColor.value) + " 1px, transparent 1px), linear-gradient(to bottom, " + (props.gridColor ?? SCENE_PARAMS.gridColor.value) + " 1px, transparent 1px)",
      backgroundSize: gridSize + "px " + gridSize + "px",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}>
      {/* Click ripple effects */}
      {adjustedFrame < clickPhaseEnd + 5 && (
        <>
          <div style={{
            position: "absolute",
            width: minDim * 0.15,
            height: minDim * 0.15,
            borderRadius: "50%",
            border: "2px solid " + (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            opacity: rippleOpacity1,
            transform: "scale(" + rippleScale1 + ")"
          }} />
          <div style={{
            position: "absolute",
            width: minDim * 0.15,
            height: minDim * 0.15,
            borderRadius: "50%",
            border: "2px solid " + (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            opacity: rippleOpacity2,
            transform: "scale(" + rippleScale2 + ")"
          }} />
          <div style={{
            position: "absolute",
            width: minDim * 0.02,
            height: minDim * 0.02,
            borderRadius: "50%",
            backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            opacity: clickFade,
            transform: "scale(" + clickProgress + ")"
          }} />
        </>
      )}

      {/* Main zooming container */}
      <div style={{
        transform: "scale(" + ((props.scale ?? SCENE_PARAMS.scale.value) * zoomScale) + ") translateY(" + zoomOffsetY + "px)",
        transformOrigin: "center center"
      }}>
        {/* Panel */}
        <div style={{
          width: panelWidth,
          height: panelHeight,
          backgroundColor: (props.panelColor ?? SCENE_PARAMS.panelColor.value),
          borderRadius: minDim * 0.03,
          padding: minDim * 0.05,
          boxShadow: "0 " + (props.shadowOffset ?? SCENE_PARAMS.shadowOffset.value) + "px " + (props.shadowBlur ?? SCENE_PARAMS.shadowBlur.value) + "px rgba(0,0,0," + (props.shadowOpacity ?? SCENE_PARAMS.shadowOpacity.value) + ")",
          opacity: panelOpacity,
          transform: "scale(" + panelScaleValue + ") skew(" + (props.skewX ?? SCENE_PARAMS.skewX.value) + "deg, " + (props.skewY ?? SCENE_PARAMS.skewY.value) + "deg) rotate(" + (props.rotation ?? SCENE_PARAMS.rotation.value) + "deg)",
          filter: "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: minDim * 0.025,
          overflow: "hidden"
        }}>
          {/* Mac buttons */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: macGap,
            marginTop: minDim * (props.macRowOffset ?? SCENE_PARAMS.macRowOffset.value),
            opacity: expandProgress
          }}>
            <div style={{ width: macSize, height: macSize, borderRadius: macSize, backgroundColor: (props.macRed ?? SCENE_PARAMS.macRed.value) }} />
            <div style={{ width: macSize, height: macSize, borderRadius: macSize, backgroundColor: (props.macYellow ?? SCENE_PARAMS.macYellow.value) }} />
            <div style={{ width: macSize, height: macSize, borderRadius: macSize, backgroundColor: (props.macGreen ?? SCENE_PARAMS.macGreen.value) }} />
          </div>
          
          {/* Title */}
          <div style={{
            fontFamily: (props.headingFont ?? SCENE_PARAMS.headingFont.value) + ", system-ui, sans-serif",
            fontSize: minDim * 0.055,
            fontWeight: 700,
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            opacity: headlineOpacity,
            transform: "translateY(" + headlineY + "px)"
          }}>
            {(props.title ?? SCENE_PARAMS.title.value)}
          </div>
          
          {/* Typing area with cursor */}
          <div style={{
            fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", system-ui, sans-serif",
            fontSize: minDim * 0.032,
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            lineHeight: 1.6,
            opacity: adjustedFrame >= typingStart - 5 ? 1 : 0,
            minHeight: minDim * 0.15
          }}>
            <span style={{ color: (props.textColor ?? SCENE_PARAMS.textColor.value) }}>{displayedText}</span>
            <span style={{
              color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              opacity: cursorOpacity,
              fontWeight: 300
            }}>{(props.cursorChar ?? SCENE_PARAMS.cursorChar.value)}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

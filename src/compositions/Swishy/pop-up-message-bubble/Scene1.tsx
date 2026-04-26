// Template: pop-up-message-bubble
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  brandText: { type: "text", label: "Brand Text", value: "SWISHY" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#f3f4f6" },
  badgeColor: { type: "color", label: "Badge Color", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  borderRadius: { type: "number", label: "Border Radius", value: 32, min: 0, max: 60, step: 4 },
  paddingHorizontal: { type: "number", label: "Padding Horizontal", value: 120, min: 40, max: 200, step: 10 },
  paddingVertical: { type: "number", label: "Padding Vertical", value: 64, min: 20, max: 120, step: 8 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;

  // Scale animation - badge scales up with a slight bounce
  const scaleProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 120 }
  });

  // Opacity animation
  const opacityProgress = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Triangle pointer animation - appears slightly after main badge
  const triangleProgress = spring({
    frame: Math.max(0, adjustedFrame - 10),
    fps,
    config: { damping: 16, stiffness: 100 }
  });

  // Calculate responsive sizes
  const fontSize = minDim * 0.065;
  const badgePaddingH = (minDim * (props.paddingHorizontal ?? SCENE_PARAMS.paddingHorizontal.value)) / 1000;
  const badgePaddingV = (minDim * (props.paddingVertical ?? SCENE_PARAMS.paddingVertical.value)) / 1000;
  const borderRadius = (minDim * (props.borderRadius ?? SCENE_PARAMS.borderRadius.value)) / 1000;
  const triangleSize = minDim * 0.04;

  const badgeScale = interpolate(scaleProgress, [0, 1], [0.3, 1]);
  const triangleScale = interpolate(triangleProgress, [0, 1], [0, 1]);
  const triangleY = interpolate(triangleProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {/* Main badge */}
        <div style={{
          backgroundColor: (props.badgeColor ?? SCENE_PARAMS.badgeColor.value),
          borderRadius: borderRadius,
          padding: badgePaddingV + "px " + badgePaddingH + "px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 10,
          opacity: opacityProgress,
          transform: "scale(" + badgeScale + ")"
        }}>
          <h1 style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: fontSize,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textAlign: "center",
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif"
          }}>
            {(props.brandText ?? SCENE_PARAMS.brandText.value)}
          </h1>
        </div>

        {/* Triangle pointer */}
        <div style={{
          position: "absolute",
          bottom: -triangleSize * 0.5,
          left: "20%",
          width: triangleSize,
          height: triangleSize,
          zIndex: 5,
          opacity: triangleScale,
          transform: "translateY(" + triangleY + "px) scale(" + triangleScale + ")",
          transformOrigin: "top center"
        }}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            style={{ display: "block" }}
          >
            <path d="M0 0 L100 0 L20 100 Z" fill={(props.badgeColor ?? SCENE_PARAMS.badgeColor.value)} />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

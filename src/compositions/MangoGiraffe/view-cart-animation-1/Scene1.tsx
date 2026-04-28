// Template: view-cart-animation-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  buttonText: { type: "text", label: "Button Text", value: "View Cart" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  buttonColor: { type: "color", label: "Button Color", value: "#3b82f6" },
  buttonTextColor: { type: "color", label: "Button Text", value: "#ffffff" },
  glowColor: { type: "color", label: "Glow Color", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  bounceIntensity: { type: "number", label: "Bounce Intensity", value: 1.08, min: 1, max: 1.2, step: 0.02 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.4, min: 0, max: 1, step: 0.1 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.25, min: 0, max: 1, step: 0.05 },
  tapScale: { type: "number", label: "Tap Scale", value: 0.92, min: 0.8, max: 1, step: 0.02 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  // Button entrance with soft bounce
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 100 }
  });
  
  // Scale starts at 0, overshoots slightly, then settles
  const bounceMax = (props.bounceIntensity ?? SCENE_PARAMS.bounceIntensity.value);
  const entranceScale = interpolate(
    entranceProgress,
    [0, 0.6, 1],
    [0, bounceMax, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Tap animation starts at frame 50
  const tapStartFrame = 50;
  const tapDuration = 25;
  const tapProgress = interpolate(
    adjustedFrame,
    [tapStartFrame, tapStartFrame + 8, tapStartFrame + tapDuration],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const tapScaleValue = (props.tapScale ?? SCENE_PARAMS.tapScale.value);
  const tapScale = interpolate(
    tapProgress,
    [0, 1],
    [1, tapScaleValue],
    { extrapolateRight: "clamp" }
  );
  
  // Final scale combines entrance and tap
  const finalScale = entranceScale * tapScale * (props.scale ?? SCENE_PARAMS.scale.value);
  
  // Glow animation
  const glowProgress = spring({
    frame: Math.max(0, adjustedFrame - 15),
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  const glowOpacity = interpolate(
    glowProgress,
    [0, 1],
    [0, (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value)],
    { extrapolateRight: "clamp" }
  );
  
  // Button dimensions
  const buttonWidth = minDim * 0.45;
  const buttonHeight = minDim * 0.12;
  const borderRadius = buttonHeight / 2;
  const iconSize = minDim * 0.045;
  const fontSize = minDim * 0.04;
  
  // Shadow and glow
  const shadowIntensity = (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value);
  const boxShadow = `
    0 ${minDim * 0.01}px ${minDim * 0.03}px rgba(0, 0, 0, ${shadowIntensity * 0.15}),
    0 ${minDim * 0.005}px ${minDim * 0.01}px rgba(0, 0, 0, ${shadowIntensity * 0.1}),
    0 0 ${minDim * 0.06}px ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)}${Math.round(glowOpacity * 80).toString(16).padStart(2, '0')}
  `;
  
  // Cart icon SVG path
  const CartIcon = ({ props }: any) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={(props.buttonTextColor ?? SCENE_PARAMS.buttonTextColor.value)}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: minDim * 0.02 }}
    >
      <circle cx="9" cy="21" r="1" fill={(props.buttonTextColor ?? SCENE_PARAMS.buttonTextColor.value)} />
      <circle cx="20" cy="21" r="1" fill={(props.buttonTextColor ?? SCENE_PARAMS.buttonTextColor.value)} />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(circle at 50% 50%, ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)}08 0%, transparent 50%)`,
          opacity: glowProgress,
        }}
      />
      
      {/* Button container */}
      <div
        style={{
          transform: `scale(${finalScale})`,
          transformOrigin: "center center",
          opacity: interpolate(entranceProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: buttonWidth,
            height: buttonHeight,
            backgroundColor: (props.buttonColor ?? SCENE_PARAMS.buttonColor.value),
            borderRadius: borderRadius,
            boxShadow: boxShadow,
            cursor: "pointer",
            transition: "none",
          }}
        >
          <CartIcon props={props}  />
          <span
            style={{
              color: (props.buttonTextColor ?? SCENE_PARAMS.buttonTextColor.value),
              fontSize: fontSize,
              fontWeight: 600,
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {(props.buttonText ?? SCENE_PARAMS.buttonText.value)}
          </span>
        </div>
      </div>
      
      {/* Tap indicator ripple effect */}
      {adjustedFrame >= tapStartFrame && adjustedFrame <= tapStartFrame + tapDuration + 20 && (
        <div
          style={{
            position: "absolute",
            width: buttonWidth * 1.5,
            height: buttonHeight * 1.5,
            borderRadius: borderRadius * 1.5,
            border: `2px solid ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)}`,
            opacity: interpolate(
              adjustedFrame,
              [tapStartFrame, tapStartFrame + 10, tapStartFrame + tapDuration + 20],
              [0, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            transform: `scale(${interpolate(
              adjustedFrame,
              [tapStartFrame, tapStartFrame + tapDuration + 20],
              [0.9, 1.2],
              { extrapolateRight: "clamp" }
            )})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
}

export default Scene;

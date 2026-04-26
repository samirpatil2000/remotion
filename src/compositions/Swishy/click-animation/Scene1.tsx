// Template: click-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  buttonText: { type: "text", label: "Button Text", value: "Click Me" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  buttonColor: { type: "color", label: "Button Color", value: "#3b82f6" },
  buttonTextColor: { type: "color", label: "Button Text", value: "#ffffff" },
  cursorColor: { type: "color", label: "Cursor Color", value: "#1e293b" },
  rippleColor: { type: "color", label: "Ripple Color", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1.95, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  cursorSize: { type: "number", label: "Cursor Size", value: 24, min: 16, max: 40, step: 2 },
  buttonWidth: { type: "number", label: "Button Width", value: 180, min: 120, max: 280, step: 10 },
  showRipple: { type: "boolean", label: "Show Ripple", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  const cursorSize = (props.cursorSize ?? SCENE_PARAMS.cursorSize.value) * (minDim / 1000);
  const buttonW = (props.buttonWidth ?? SCENE_PARAMS.buttonWidth.value) * (minDim / 1000);
  const buttonH = buttonW * 0.35;
  
  const buttonCenterX = width * 0.5;
  const buttonCenterY = height * 0.5;
  
  const cursorStartX = width * 0.15;
  const cursorStartY = height * 0.25;
  const cursorHoverX = buttonCenterX - buttonW * 0.2;
  const cursorHoverY = buttonCenterY - buttonH * 0.1;
  
  const cursorAppearEnd = 20;
  const moveToButtonEnd = 55;
  const hoverPauseEnd = 75;
  const clickFrame = 80;
  const rippleEnd = 110;
  const buttonRecoverEnd = 100;
  
  const cursorOpacity = interpolate(adjustedFrame, [0, cursorAppearEnd], [0, 1], { extrapolateRight: "clamp" });
  
  const cursorScaleIn = interpolate(adjustedFrame, [0, cursorAppearEnd], [0.5, 1], { extrapolateRight: "clamp" });
  
  const moveProgress = spring({
    frame: Math.max(0, adjustedFrame - cursorAppearEnd),
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  const cursorX = interpolate(moveProgress, [0, 1], [cursorStartX, cursorHoverX]);
  const cursorY = interpolate(moveProgress, [0, 1], [cursorStartY, cursorHoverY]);
  
  const isHovering = adjustedFrame > moveToButtonEnd && adjustedFrame < clickFrame + 30;
  
  const buttonHoverScale = interpolate(
    adjustedFrame,
    [moveToButtonEnd - 5, moveToButtonEnd + 10],
    [1, 1.02],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  const clickProgress = spring({
    frame: Math.max(0, adjustedFrame - clickFrame),
    fps,
    config: { damping: 15, stiffness: 150 }
  });
  
  const buttonClickScale = adjustedFrame >= clickFrame && adjustedFrame < buttonRecoverEnd
    ? interpolate(clickProgress, [0, 0.3, 1], [1.02, 0.95, 1])
    : buttonHoverScale;
  
  const rippleProgress = spring({
    frame: Math.max(0, adjustedFrame - clickFrame),
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  
  const rippleScale = interpolate(rippleProgress, [0, 1], [0, 1]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.6, 0.4, 0], { extrapolateRight: "clamp" });
  const rippleSize = minDim * 0.25;
  
  const cursorClickAnim = adjustedFrame >= clickFrame && adjustedFrame < clickFrame + 8
    ? interpolate(adjustedFrame, [clickFrame, clickFrame + 4, clickFrame + 8], [1, 0.85, 1])
    : 1;
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + scaleValue + ")",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        
        <div style={{
          position: "absolute",
          left: buttonCenterX - buttonW / 2,
          top: buttonCenterY - buttonH / 2,
          width: buttonW,
          height: buttonH,
          backgroundColor: (props.buttonColor ?? SCENE_PARAMS.buttonColor.value),
          borderRadius: buttonH * 0.25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "scale(" + buttonClickScale + ")",
          boxShadow: isHovering 
            ? "0 8px 30px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.1)"
            : "0 4px 15px rgba(59, 130, 246, 0.2), 0 2px 6px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.2s ease",
        }}>
          <span style={{
            color: (props.buttonTextColor ?? SCENE_PARAMS.buttonTextColor.value),
            fontSize: minDim * 0.028,
            fontWeight: 600,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}>
            {(props.buttonText ?? SCENE_PARAMS.buttonText.value)}
          </span>
        </div>
        
        {(props.showRipple ?? SCENE_PARAMS.showRipple.value) && adjustedFrame >= clickFrame && (
          <div style={{
            position: "absolute",
            left: cursorHoverX - rippleSize / 2,
            top: cursorHoverY - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            borderRadius: "50%",
            backgroundColor: (props.rippleColor ?? SCENE_PARAMS.rippleColor.value),
            opacity: rippleOpacity,
            transform: "scale(" + rippleScale + ")",
            pointerEvents: "none",
          }} />
        )}
        
        <div style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          transform: "scale(" + (cursorScaleIn * cursorClickAnim) + ")",
          transformOrigin: "top left",
          pointerEvents: "none",
        }}>
          <svg
            width={cursorSize * 1.2}
            height={cursorSize * 1.5}
            viewBox="0 0 24 30"
            fill="none"
          >
            <path
              d="M2 2L2 24L7.5 18.5L12 28L16 26L11.5 16.5L19 16.5L2 2Z"
              fill={(props.cursorColor ?? SCENE_PARAMS.cursorColor.value)}
              stroke={(props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value)}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

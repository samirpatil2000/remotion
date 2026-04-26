// Template: youtube-subscribe-button
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  buttonText: { type: "text", label: "Button Text", value: "Subscribe" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  buttonColor: { type: "color", label: "Button Color", value: "#CD201F" },
  buttonClickedColor: { type: "color", label: "Clicked Color", value: "#171717" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  cursorColor: { type: "color", label: "Cursor Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  clickFrame: { type: "number", label: "Click Frame", value: 45, min: 30, max: 80, step: 5 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const clickFrame = (props.clickFrame ?? SCENE_PARAMS.clickFrame.value);
  
  // Button dimensions
  const buttonWidth = minDim * 0.55;
  const buttonHeight = minDim * 0.14;
  const borderRadius = buttonHeight * 0.15;
  const iconSize = buttonHeight * 0.6;
  
  // Button entrance animation
  const buttonEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const buttonScale = interpolate(buttonEntrance, [0, 1], [0.8, 1]);
  const buttonOpacity = interpolate(buttonEntrance, [0, 1], [0, 1]);
  
  // Cursor animation - enters from bottom
  const cursorStartFrame = 15;
  const cursorEntrance = spring({
    frame: Math.max(0, adjustedFrame - cursorStartFrame),
    fps,
    config: { damping: 22, stiffness: 85 }
  });
  
  // Cursor Y position - starts below screen, moves to button
  const cursorStartY = height * 0.6;
  const cursorEndY = buttonHeight * 0.3;
  const cursorY = interpolate(cursorEntrance, [0, 1], [cursorStartY, cursorEndY]);
  
  // Cursor X position - slight curve in
  const cursorStartX = minDim * 0.15;
  const cursorEndX = buttonWidth * 0.25;
  const cursorX = interpolate(cursorEntrance, [0, 1], [cursorStartX, cursorEndX]);
  
  // Click animation
  const isClicked = adjustedFrame >= clickFrame;
  const clickProgress = spring({
    frame: Math.max(0, adjustedFrame - clickFrame),
    fps,
    config: { damping: 15, stiffness: 150 }
  });
  
  // Button press effect
  const buttonPressScale = isClicked 
    ? interpolate(adjustedFrame, [clickFrame, clickFrame + 5, clickFrame + 12], [1, 0.95, 1], { extrapolateRight: "clamp" })
    : 1;
  
  // Cursor click animation (finger press)
  const cursorClickOffset = isClicked
    ? interpolate(adjustedFrame, [clickFrame, clickFrame + 5, clickFrame + 12], [0, 8, 0], { extrapolateRight: "clamp" })
    : 0;
  
  // Button color transition
  const buttonColor = isClicked ? (props.buttonClickedColor ?? SCENE_PARAMS.buttonClickedColor.value) : (props.buttonColor ?? SCENE_PARAMS.buttonColor.value);
  
  // Subscribed text animation
  const showSubscribed = isClicked;
  const subscribedOpacity = interpolate(clickProgress, [0, 1], [0, 1]);
  
  // Ripple effect on click
  const rippleScale = isClicked 
    ? interpolate(adjustedFrame, [clickFrame, clickFrame + 20], [0, 2.5], { extrapolateRight: "clamp" })
    : 0;
  const rippleOpacity = isClicked
    ? interpolate(adjustedFrame, [clickFrame, clickFrame + 20], [0.4, 0], { extrapolateRight: "clamp" })
    : 0;
  
  // Cursor size
  const cursorSize = minDim * 0.12;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ 
        transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)})`, 
        transformOrigin: "center center",
        position: "relative"
      }}>
        {/* Button Container */}
        <div style={{
          position: "relative",
          transform: `scale(${buttonScale * buttonPressScale})`,
          opacity: buttonOpacity,
        }}>
          {/* Ripple Effect */}
          {isClicked && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: buttonWidth,
              height: buttonHeight,
              backgroundColor: (props.buttonClickedColor ?? SCENE_PARAMS.buttonClickedColor.value),
              borderRadius: borderRadius,
              transform: `translate(-50%, -50%) scale(${rippleScale})`,
              opacity: rippleOpacity,
            }} />
          )}
          
          {/* Main Button */}
          <div style={{
            width: buttonWidth,
            height: buttonHeight,
            backgroundColor: buttonColor,
            borderRadius: borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: minDim * 0.025,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            transition: "background-color 0.1s",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* YouTube Play Icon */}
            <div style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: (props.textColor ?? SCENE_PARAMS.textColor.value),
              borderRadius: iconSize * 0.15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* Play Triangle */}
              <div style={{
                width: 0,
                height: 0,
                borderLeft: `${iconSize * 0.35}px solid ${buttonColor}`,
                borderTop: `${iconSize * 0.22}px solid transparent`,
                borderBottom: `${iconSize * 0.22}px solid transparent`,
                marginLeft: iconSize * 0.08,
              }} />
            </div>
            
            {/* Button Text */}
            <span style={{
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              fontSize: minDim * 0.055,
              fontWeight: 600,
              fontFamily: `${(props.fontFamily ?? SCENE_PARAMS.fontFamily.value)}, system-ui, sans-serif`,
              letterSpacing: "0.5px",
            }}>
              {showSubscribed ? "Subscribed" : (props.buttonText ?? SCENE_PARAMS.buttonText.value)}
            </span>
            
            {/* Checkmark for subscribed state */}
            {showSubscribed && (
              <div style={{
                opacity: subscribedOpacity,
                marginLeft: minDim * 0.01,
              }}>
                <svg 
                  width={minDim * 0.04} 
                  height={minDim * 0.04} 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M5 13l4 4L19 7" 
                    stroke={(props.textColor ?? SCENE_PARAMS.textColor.value)} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Cursor Hand */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${cursorX}px, ${cursorY + cursorClickOffset}px)`,
          opacity: cursorEntrance,
          zIndex: 10,
        }}>
          {/* Pixelated Cursor Hand */}
          <svg 
            width={cursorSize} 
            height={cursorSize} 
            viewBox="0 0 32 32" 
            fill="none"
            style={{
              filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
            }}
          >
            {/* Cursor outline */}
            <path 
              d="M8 2V18L12 14L15 22L19 20L16 12H24L8 2Z" 
              fill={(props.cursorColor ?? SCENE_PARAMS.cursorColor.value)}
              stroke="#000000"
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

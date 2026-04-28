// Template: animated-emoji-button
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  buttonText: { type: "text", label: "Button Text", value: "Hey" },
  emoji: { type: "text", label: "Emoji", value: "👋" },
  fontFamily: { type: "font", label: "Font", value: "Montserrat" },
  backgroundColor: { type: "color", label: "Background", value: "#c4d6e9" },
  buttonColor: { type: "color", label: "Button Color", value: "#3b82f6" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  glowColor: { type: "color", label: "Glow Color", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1.65, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.4, min: 0, max: 1, step: 0.1 },
  tapFrame: { type: "number", label: "Tap Frame", value: 60, min: 30, max: 90, step: 5 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const tapFrame = (props.tapFrame ?? SCENE_PARAMS.tapFrame.value);
  
  // Button entrance animation
  const entranceProgress = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  
  // Tap animation (scale down and back)
  const tapDuration = 20;
  const isTapping = adjustedFrame >= tapFrame && adjustedFrame < tapFrame + tapDuration;
  const tapProgress = isTapping 
    ? interpolate(adjustedFrame, [tapFrame, tapFrame + tapDuration / 2, tapFrame + tapDuration], [1, 0.92, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })
    : 1;
  
  // Glow pulse animation (starts after entrance)
  const glowStartFrame = 25;
  const glowCycleDuration = 45;
  const glowFrame = Math.max(0, adjustedFrame - glowStartFrame);
  const glowPhase = (glowFrame % glowCycleDuration) / glowCycleDuration;
  const glowIntensity = (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * entranceProgress;
  const glowPulse = 0.5 + 0.5 * Math.sin(glowPhase * Math.PI * 2);
  const currentGlow = glowIntensity * (0.6 + 0.4 * glowPulse);
  
  // Hand wave animation
  const waveStartFrame = 30;
  const waveDuration = 50;
  const waveFrame = adjustedFrame - waveStartFrame;
  const isWaving = waveFrame >= 0 && waveFrame < waveDuration;
  
  let waveRotation = 0;
  if (isWaving) {
    const waveProgress = waveFrame / waveDuration;
    // Two waves with decreasing amplitude
    const waveAngle = Math.sin(waveProgress * Math.PI * 4) * (1 - waveProgress * 0.6);
    waveRotation = waveAngle * 20;
  }
  
  // Combined scale
  const finalScale = entranceScale * tapProgress * (props.scale ?? SCENE_PARAMS.scale.value);
  
  // Button dimensions
  const buttonPaddingH = minDim * 0.08;
  const buttonPaddingV = minDim * 0.035;
  const fontSize = minDim * 0.055;
  const emojiSize = minDim * 0.06;
  const borderRadius = minDim * 0.08;
  const glowSpread = minDim * 0.04;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${finalScale})`,
        transformOrigin: "center center",
        opacity: entranceOpacity,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: minDim * 0.02,
          backgroundColor: (props.buttonColor ?? SCENE_PARAMS.buttonColor.value),
          paddingLeft: buttonPaddingH,
          paddingRight: buttonPaddingH,
          paddingTop: buttonPaddingV,
          paddingBottom: buttonPaddingV,
          borderRadius: borderRadius,
          boxShadow: `0 0 ${glowSpread * currentGlow}px ${glowSpread * currentGlow * 0.8}px ${(props.glowColor ?? SCENE_PARAMS.glowColor.value)}${Math.round(currentGlow * 80).toString(16).padStart(2, '0')}`,
          cursor: "pointer",
        }}>
          <span style={{
            fontSize: emojiSize,
            display: "inline-block",
            transform: `rotate(${waveRotation}deg)`,
            transformOrigin: "70% 70%",
          }}>
            {(props.emoji ?? SCENE_PARAMS.emoji.value)}
          </span>
          <span style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: fontSize,
            fontWeight: 600,
            fontFamily: `${(props.fontFamily ?? SCENE_PARAMS.fontFamily.value)}, system-ui, sans-serif`,
            letterSpacing: "-0.02em",
          }}>
            {(props.buttonText ?? SCENE_PARAMS.buttonText.value)}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

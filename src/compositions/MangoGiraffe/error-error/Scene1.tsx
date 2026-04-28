// Template: error-error
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  fontFamily: { type: "font", label: "Font", value: "Open Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  iconColor: { type: "color", label: "Icon Color", value: "#FF0000" },
  glowColor: { type: "color", label: "Glow Color", value: "#FF0000" },
  iconSize: { type: "number", label: "Icon Size", value: 250, min: 100, max: 400, step: 10 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 30, min: 10, max: 60, step: 5 },
  pulseSpeed: { type: "number", label: "Pulse Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;

  // Entrance animation
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 18, stiffness: 100 }
  });

  // Continuous pulsing glow effect
  const pulseSpeed = (props.pulseSpeed ?? SCENE_PARAMS.pulseSpeed.value);
  const pulseCycle = (adjustedFrame * pulseSpeed) / fps;
  const pulseValue = Math.sin(pulseCycle * Math.PI * 2) * 0.5 + 0.5;
  
  // Scale pulse (subtle breathing effect)
  const scaleBase = 1;
  const scalePulse = scaleBase + (pulseValue * 0.1);
  
  // Glow pulse
  const baseGlow = (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value);
  const glowPulse = baseGlow + (pulseValue * baseGlow * 0.5);
  
  // Opacity pulse for the glow
  const opacityPulse = 0.7 + (pulseValue * 0.3);

  const iconSize = (props.iconSize ?? SCENE_PARAMS.iconSize.value) * (minDim / 1080);
  const strokeWidth = 2 * (minDim / 1080);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center"
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={(props.iconColor ?? SCENE_PARAMS.iconColor.value)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            width: iconSize,
            height: iconSize,
            transform: "scale(" + (entranceProgress * scalePulse) + ")",
            filter: "drop-shadow(0px 0px " + glowPulse + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + ")",
            opacity: entranceProgress * opacityPulse
          }}
        >
          {/* Triangle */}
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          {/* Exclamation line */}
          <line x1="12" y1="9" x2="12" y2="13" />
          {/* Exclamation dot */}
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: thinking
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  iconImage: { type: "image", label: "Icon Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1772915423461-q80lzx6/prompt-1772851571161-screenshot_1447-09-17_at_21.46.02.png" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  glowColor: { type: "color", label: "Glow Color", value: "#000000" },
  iconBackgroundColor: { type: "color", label: "Icon Background", value: "#000000" },
  iconBackgroundRadius: { type: "number", label: "Icon Background Radius", value: 28, min: 0, max: 120, step: 2 },
  iconBackgroundPadding: { type: "number", label: "Icon Background Padding", value: 18, min: 0, max: 80, step: 2 },
  iconSize: { type: "number", label: "Icon Size", value: 260, min: 180, max: 520, step: 10 },
  widthScale: { type: "number", label: "Width Scale", value: 1.8, min: 1, max: 1.8, step: 0.05 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 80, min: 10, max: 80, step: 5 },
  glowSaturation: { type: "number", label: "Glow Saturation", value: 1, min: 1, max: 3, step: 0.1 },
  pulseAmount: { type: "number", label: "Pulse Amount", value: 0.25, min: 0.1, max: 0.5, step: 0.05 },
  scale: { type: "number", label: "Scale", value: 2, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  fontFamily: { type: "font", label: "Font", value: "Open Sans" }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const introProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 25, stiffness: 80 }
  });
  
  const pulseFrequency = 0.03 * speed;
  const glowPulse = Math.sin(adjustedFrame * pulseFrequency) * 0.3 + 0.7;
  const scalePulse = 1 + Math.sin(adjustedFrame * pulseFrequency) * SCENE_PARAMS.pulseAmount.value * 0.2;
  
  const glowOpacity = interpolate(
    introProgress,
    [0, 1],
    [0, 0.7],
    { extrapolateRight: "clamp" }
  ) * glowPulse;
  
  const imageScale = interpolate(
    introProgress,
    [0, 1],
    [0.5, 1],
    { extrapolateRight: "clamp" }
  ) * scalePulse;
  
  const glowScale = interpolate(
    introProgress,
    [0, 1],
    [0.8, 1.25],
    { extrapolateRight: "clamp" }
  ) * (1 + (glowPulse - 0.7) * 0.3);
  
  const iconSize = SCENE_PARAMS.iconSize.value * (minDim / 1080);
  const widthScale = SCENE_PARAMS.widthScale.value;
  const bgPadding = SCENE_PARAMS.iconBackgroundPadding.value * (minDim / 1080);
  const bgWidth = iconSize * widthScale + bgPadding * 2;
  const bgHeight = iconSize + bgPadding * 2;
  const bgRadius = SCENE_PARAMS.iconBackgroundRadius.value * (minDim / 1080);
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "center center"
      }}>
        <div style={{
          position: "relative",
          width: iconSize * widthScale,
          height: iconSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            position: "absolute",
            width: bgWidth,
            height: bgHeight,
            backgroundColor: SCENE_PARAMS.iconBackgroundColor.value,
            borderRadius: bgRadius,
            transform: "scale(" + imageScale + ")",
            zIndex: 0
          }} />

          <Img
            src={SCENE_PARAMS.iconImage.value}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              filter: "blur(" + SCENE_PARAMS.glowIntensity.value + "px) saturate(" + SCENE_PARAMS.glowSaturation.value + ") drop-shadow(0px 0px 30px " + SCENE_PARAMS.glowColor.value + ")",
              opacity: glowOpacity,
              transform: "scale(" + glowScale + ")",
              transition: "none"
            }}
          />
          
          <Img
            src={SCENE_PARAMS.iconImage.value}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: "scale(" + imageScale + ")",
              zIndex: 1,
              transition: "none",
              filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.3))"
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

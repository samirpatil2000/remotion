// Template: instagram-update-notification-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Instagram" },
  subtitle: { type: "text", label: "Subtitle", value: "Update available" },
  badgeText: { type: "text", label: "Badge Text", value: "1" },
  iconImage: { type: "image", label: "Icon Image", value: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#44ff00" },
  primaryColor: { type: "color", label: "Primary", value: "#ffffff" },
  secondaryTextColor: { type: "color", label: "Secondary Text", value: "#b4b4c6" },
  cardColor: { type: "color", label: "Card", value: "#16161d" },
  subtleStroke: { type: "color", label: "Stroke", value: "#2a2a36" },
  brandGradientStart: { type: "color", label: "Brand Gradient Start", value: "#f58529" },
  brandGradientEnd: { type: "color", label: "Brand Gradient End", value: "#dd2a7b" },
  badgeTextColor: { type: "color", label: "Badge Text", value: "#ffffff" },
  shadowColor: { type: "color", label: "Shadow Color", value: "rgba(0,0,0,0.45)" },
  scale: { type: "number", label: "Scale", value: 1.1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;

  const animationWindow = durationInFrames * 0.65;
  const adjustedFrame = (frame / animationWindow) * 60 * speed;

  const cardProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 120 } });
  const iconProgress = spring({ frame: Math.max(0, adjustedFrame - 12), fps, config: { damping: 18, stiffness: 120 } });
  const textProgress = spring({ frame: Math.max(0, adjustedFrame - 22), fps, config: { damping: 20, stiffness: 90 } });
  const badgeProgress = spring({ frame: Math.max(0, adjustedFrame - 28), fps, config: { damping: 12, stiffness: 180 } });

  const cardY = interpolate(cardProgress, [0, 1], [30, 0], { extrapolateRight: "clamp" });
  const iconScale = interpolate(iconProgress, [0, 1], [0.7, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(textProgress, [0, 1], [10, 0], { extrapolateRight: "clamp" });
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.6, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: minDim * 0.56,
          height: minDim * 0.2128,
          borderRadius: minDim * 0.04,
          overflow: "hidden",
          opacity: cardProgress,
          transform: "translateY(" + cardY + "px)"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: SCENE_PARAMS.cardColor.value,
            borderRadius: minDim * 0.04,
            border: "1px solid " + SCENE_PARAMS.subtleStroke.value,
            boxShadow: "0 " + minDim * 0.02 + "px " + minDim * 0.08 + "px " + SCENE_PARAMS.shadowColor.value,
            position: "relative"
          }}>
            <div style={{ position: "absolute", top: minDim * 0.055, left: minDim * 0.055, display: "flex", alignItems: "center", gap: minDim * 0.025 }}>
              <div style={{
                width: minDim * 0.085,
                height: minDim * 0.085,
                borderRadius: minDim * 0.025,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: iconProgress,
                transform: "scale(" + iconScale + ")",
                position: "relative",
                overflow: "hidden"
              }}>
                <Img
                  src={SCENE_PARAMS.iconImage.value}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ opacity: textProgress, transform: "translateY(" + textY + "px)" }}>
                <div style={{ fontSize: minDim * 0.043, fontWeight: 700, color: SCENE_PARAMS.primaryColor.value, fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif" }}>
                  {SCENE_PARAMS.title.value}
                </div>
                <div style={{ fontSize: minDim * 0.028, color: SCENE_PARAMS.secondaryTextColor.value, marginTop: minDim * 0.008, fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif" }}>
                  {SCENE_PARAMS.subtitle.value}
                </div>
              </div>
            </div>

            <div style={{
              position: "absolute",
              top: minDim * 0.04,
              right: minDim * 0.04,
              width: minDim * 0.075,
              height: minDim * 0.075,
              borderRadius: "50%",
              background: "linear-gradient(135deg, " + SCENE_PARAMS.brandGradientStart.value + ", " + SCENE_PARAMS.brandGradientEnd.value + ")",
              color: SCENE_PARAMS.badgeTextColor.value,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: minDim * 0.03,
              fontWeight: 700,
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              opacity: badgeProgress,
              transform: "scale(" + badgeScale + ")"
            }}>
              {SCENE_PARAMS.badgeText.value}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

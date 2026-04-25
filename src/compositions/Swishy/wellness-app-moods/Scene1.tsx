// Template: wellness-app-moods
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Images
  happyScreen: { type: "image", label: "Happy Screen", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213193808-create_account_4_.jpg" },
  confusedScreen: { type: "image", label: "Confused Screen", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213198211-create_account_5_.jpg" },
  calmScreen: { type: "image", label: "Calm Screen", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213200436-create_account_6_.jpg" },
  stressedScreen: { type: "image", label: "Stressed Screen", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213206959-create_account_3_.jpg" },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "Roboto" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  happyBg: { type: "color", label: "Happy BG", value: "#fbe7a0" },
  confusedBg: { type: "color", label: "Confused BG", value: "#f6c8b6" },
  calmBg: { type: "color", label: "Calm BG", value: "#a9c8f3" },
  stressedBg: { type: "color", label: "Stressed BG", value: "#b7a6f5" },

  // Transform
  scale: { type: "number", label: "Scale", value: 1.05, min: 0.5, max: 2, step: 0.05 },

  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const effectiveFrame = (frame * speed) % durationInFrames;

  const segment = durationInFrames / 4;
  const currentIndex = Math.floor(effectiveFrame / segment);
  const localFrame = effectiveFrame - currentIndex * segment;
  const transition = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 140 } });

  const currentPosition = currentIndex + transition;
  const translateX = -currentPosition * width;

  const moodColors = [
    SCENE_PARAMS.happyBg.value,
    SCENE_PARAMS.confusedBg.value,
    SCENE_PARAMS.calmBg.value,
    SCENE_PARAMS.stressedBg.value
  ];
  const nextIndex = (currentIndex + 1) % moodColors.length;

  const hexToRgb = (hex) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  };

  const mixColors = (a, b, t) => {
    const c1 = hexToRgb(a);
    const c2 = hexToRgb(b);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const bVal = Math.round(c1.b + (c2.b - c1.b) * t);
    return "rgb(" + r + "," + g + "," + bVal + ")";
  };

  const bgColor = mixColors(moodColors[currentIndex], moodColors[nextIndex], transition);

  const screens = [
    SCENE_PARAMS.happyScreen.value,
    SCENE_PARAMS.confusedScreen.value,
    SCENE_PARAMS.calmScreen.value,
    SCENE_PARAMS.stressedScreen.value,
    SCENE_PARAMS.happyScreen.value
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      <div style={{ width: "100%", height: "100%", transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{ position: "absolute", width: width * screens.length, height: "100%", transform: "translateX(" + translateX + "px)" }}>
          {screens.map((src, i) => {
            const distance = Math.abs(currentPosition - i);
            const screenScale = interpolate(distance, [0, 0.5, 1], [1.03, 1.01, 0.98], { extrapolateRight: "clamp" });
            const screenOpacity = interpolate(distance, [0, 1], [1, 0.95], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ position: "absolute", left: i * width, top: 0, width: width, height: "100%", transform: "scale(" + screenScale + ")", opacity: screenOpacity }}>
                <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

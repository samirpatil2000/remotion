// Template: whatsapp-convo
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  message1: { type: "text", label: "Message 1", value: "ready to do you?" },
  time1: { type: "text", label: "Time 1", value: "10:22 PM" },
  message2: { type: "text", label: "Message 2", value: "on my way" },
  emoji2: { type: "text", label: "Emoji", value: "🎨" },
  time2: { type: "text", label: "Time 2", value: "10:23 PM" },
  typingDots: { type: "text", label: "Typing Dots", value: "..." },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#e6ddd5" },
  topBarColor: { type: "color", label: "Top Bar", value: "#dcd4cb" },
  iconColor: { type: "color", label: "Icon Color", value: "#4b5563" },
  bubbleGreen: { type: "color", label: "Green Bubble", value: "#d9fdd3" },
  bubbleWhite: { type: "color", label: "White Bubble", value: "#ffffff" },
  textColor: { type: "color", label: "Text Color", value: "#1f2937" },
  timeColor: { type: "color", label: "Time Color", value: "#6b7280" },
  tickBlue: { type: "color", label: "Tick Blue", value: "#2f80ed" },

  // Bubble sizing
  typingPadding: { type: "number", label: "Typing Padding", value: 0.015, min: 0.005, max: 0.03, step: 0.002 },
  fullPadding: { type: "number", label: "Full Padding", value: 0.03, min: 0.015, max: 0.06, step: 0.005 },

  // Required
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 10, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 22, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const t1BubbleIn = 6;
  const t1TextIn = 30;
  const t1Tick1 = 42;
  const t1Tick2 = 52;

  const t2BubbleIn = 70;
  const t2TextIn = 98;
  const t2Tick = 114;

  const bubble1Progress = spring({ frame: Math.max(0, adjustedFrame - t1BubbleIn), fps, config: { damping: 20, stiffness: 90 } });
  const bubble2Progress = spring({ frame: Math.max(0, adjustedFrame - t2BubbleIn), fps, config: { damping: 20, stiffness: 90 } });
  const iconProgress = spring({ frame: Math.max(0, adjustedFrame - 2), fps, config: { damping: 20, stiffness: 90 } });

  const bubble1Y = interpolate(bubble1Progress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const bubble2Y = interpolate(bubble2Progress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
  const iconY = interpolate(iconProgress, [0, 1], [10, 0], { extrapolateRight: "clamp" });

  const typingOpacity1 = interpolate(adjustedFrame, [t1TextIn - 6, t1TextIn], [1, 0], { extrapolateRight: "clamp" });
  const textOpacity1 = interpolate(adjustedFrame, [t1TextIn, t1TextIn + 12], [0, 1], { extrapolateRight: "clamp" });

  const typingOpacity2 = interpolate(adjustedFrame, [t2TextIn - 6, t2TextIn], [1, 0], { extrapolateRight: "clamp" });
  const textOpacity2 = interpolate(adjustedFrame, [t2TextIn, t2TextIn + 12], [0, 1], { extrapolateRight: "clamp" });

  const tick1Opacity = interpolate(adjustedFrame, [t1Tick1, t1Tick1 + 8], [0, 1], { extrapolateRight: "clamp" });
  const tick2Opacity = interpolate(adjustedFrame, [t1Tick2, t1Tick2 + 8], [0, 1], { extrapolateRight: "clamp" });
  const tick2Opacity2 = interpolate(adjustedFrame, [t2Tick, t2Tick + 8], [0, 1], { extrapolateRight: "clamp" });

  const tick1Y = interpolate(tick1Opacity, [0, 1], [6, 0], { extrapolateRight: "clamp" });
  const tick2Y = interpolate(tick2Opacity, [0, 1], [6, 0], { extrapolateRight: "clamp" });
  const tick2Y2 = interpolate(tick2Opacity2, [0, 1], [6, 0], { extrapolateRight: "clamp" });

  const dotPulse = 0.6 + 0.4 * Math.sin(adjustedFrame * 0.25);

  const bubble1SizeProgress = interpolate(adjustedFrame, [t1TextIn - 4, t1TextIn + 8], [0, 1], { extrapolateRight: "clamp" });
  const bubble2SizeProgress = interpolate(adjustedFrame, [t2TextIn - 4, t2TextIn + 8], [0, 1], { extrapolateRight: "clamp" });

  const paddingSmall = minDim * SCENE_PARAMS.typingPadding.value;
  const paddingFull = minDim * SCENE_PARAMS.fullPadding.value;

  const bubble1Padding = interpolate(bubble1SizeProgress, [0, 1], [paddingSmall, paddingFull], { extrapolateRight: "clamp" });
  const bubble2Padding = interpolate(bubble2SizeProgress, [0, 1], [paddingSmall, paddingFull], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center", width: "100%", height: "100%" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.09,
          backgroundColor: SCENE_PARAMS.topBarColor.value,
          boxShadow: "0 " + height * 0.002 + "px " + height * 0.01 + "px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          paddingLeft: width * 0.04,
          paddingRight: width * 0.04,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          color: SCENE_PARAMS.iconColor.value,
          fontSize: minDim * 0.035,
          opacity: iconProgress,
          transform: "translateY(" + iconY + "px)"
        }}>
          <div style={{ flex: 1, fontWeight: 500 }}>←</div>
          <div style={{ display: "flex", gap: width * 0.03, fontWeight: 500 }}>
            <span>📷</span>
            <span>✏️</span>
            <span>⋮</span>
          </div>
        </div>

        <div style={{
          position: "absolute",
          top: height * 0.18,
          right: width * 0.06,
          maxWidth: width * 0.7,
          backgroundColor: SCENE_PARAMS.bubbleGreen.value,
          borderRadius: minDim * 0.03,
          padding: bubble1Padding,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          color: SCENE_PARAMS.textColor.value,
          fontSize: minDim * 0.045,
          lineHeight: 1.2,
          boxShadow: "0 " + minDim * 0.003 + "px " + minDim * 0.01 + "px rgba(0,0,0,0.12)",
          opacity: bubble1Progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + bubble1Y + "px)"
        }}>
          <div style={{ opacity: typingOpacity1 * dotPulse }}>{SCENE_PARAMS.typingDots.value}</div>
          <div style={{ opacity: textOpacity1 }}>
            <div>{SCENE_PARAMS.message1.value}</div>
            <div style={{
              marginTop: minDim * 0.015,
              fontSize: minDim * 0.03,
              color: SCENE_PARAMS.timeColor.value,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: minDim * 0.01
            }}>
              <span>{SCENE_PARAMS.time1.value}</span>
              <span style={{ color: SCENE_PARAMS.tickBlue.value, fontWeight: 700, opacity: tick1Opacity, transform: "translateY(" + tick1Y + "px)" }}>✓</span>
              <span style={{ color: SCENE_PARAMS.tickBlue.value, fontWeight: 700, opacity: tick2Opacity, transform: "translateY(" + tick2Y + "px)" }}>✓</span>
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute",
          top: height * 0.39,
          left: width * 0.06,
          maxWidth: width * 0.7,
          backgroundColor: SCENE_PARAMS.bubbleWhite.value,
          borderRadius: minDim * 0.03,
          padding: bubble2Padding,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          color: SCENE_PARAMS.textColor.value,
          fontSize: minDim * 0.045,
          lineHeight: 1.2,
          boxShadow: "0 " + minDim * 0.003 + "px " + minDim * 0.01 + "px rgba(0,0,0,0.12)",
          opacity: bubble2Progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + bubble2Y + "px)"
        }}>
          <div style={{ opacity: typingOpacity2 * dotPulse }}>{SCENE_PARAMS.typingDots.value}</div>
          <div style={{ opacity: textOpacity2 }}>
            <div style={{ display: "flex", gap: minDim * 0.02, alignItems: "center" }}>
              <span>{SCENE_PARAMS.message2.value}</span>
              <span>{SCENE_PARAMS.emoji2.value}</span>
            </div>
            <div style={{
              marginTop: minDim * 0.015,
              fontSize: minDim * 0.03,
              color: SCENE_PARAMS.timeColor.value,
              display: "flex",
              justifyContent: "flex-start",
              gap: minDim * 0.01
            }}>
              <span>{SCENE_PARAMS.time2.value}</span>
              <span style={{ color: SCENE_PARAMS.iconColor.value, fontWeight: 700, opacity: tick2Opacity2, transform: "translateY(" + tick2Y2 + "px)" }}>✓</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

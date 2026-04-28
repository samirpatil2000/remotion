// Template: makin-bank
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  label: { type: "text", label: "Label", value: "Total Amount" },
  targetAmount: { type: "number", label: "Target Amount", value: 99999, min: 0, max: 99999, step: 1 },
  currencySymbol: { type: "text", label: "Currency Symbol", value: "$" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#00c203" },
  cardColor: { type: "color", label: "Card Color", value: "#ffffff" },
  borderColor: { type: "color", label: "Border Color", value: "#202028" },
  textColor: { type: "color", label: "Text Color", value: "#202028" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.8, min: 0.5, max: 2, step: 0.1 },
  countDuration: { type: "number", label: "Count Duration (frames)", value: 90, min: 30, max: 180, step: 10 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  // Card entrance animation
  const cardProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const cardScale = interpolate(cardProgress, [0, 1], [0.8, 1], { extrapolateRight: "clamp" });
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  // Label entrance
  const labelProgress = spring({
    frame: Math.max(0, adjustedFrame - 10),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const labelY = interpolate(labelProgress, [0, 1], [15, 0], { extrapolateRight: "clamp" });

  // Number count-up animation
  const countStart = 20;
  const countEnd = countStart + (props.countDuration ?? SCENE_PARAMS.countDuration.value);
  const countProgress = interpolate(adjustedFrame, [countStart, countEnd], [0, 1], { extrapolateRight: "clamp" });
  const eased = countProgress * countProgress * (3 - 2 * countProgress);
  const currentVal = Math.floor(eased * (props.targetAmount ?? SCENE_PARAMS.targetAmount.value));

  // Arrow blink animation (appears after count is done)
  const arrowVisible = adjustedFrame > countEnd + 10;
  const arrowBlink = arrowVisible ? Math.floor((adjustedFrame - countEnd - 10) / 15) % 2 === 0 : false;

  // Responsive sizing
  const cardWidth = minDim * 0.7;
  const cardPadding = minDim * 0.035;
  const borderWidth = minDim * 0.008;
  const labelSize = minDim * 0.026;
  const amountSize = minDim * 0.052;
  const shadowOffset = minDim * 0.007;

  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
      fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", cursive, monospace"
    }}>
      <div style={{
        transform: "scale(" + ((props.scale ?? SCENE_PARAMS.scale.value) * cardScale) + ")",
        opacity: cardOpacity,
        transformOrigin: "center center"
      }}>
        <div style={{
          backgroundColor: (props.cardColor ?? SCENE_PARAMS.cardColor.value),
          border: borderWidth + "px solid " + (props.borderColor ?? SCENE_PARAMS.borderColor.value),
          borderRadius: minDim * 0.004,
          padding: cardPadding,
          width: cardWidth,
          position: "relative",
          boxShadow: shadowOffset + "px " + shadowOffset + "px 0px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.018
        }}>
          {/* Label */}
          <div style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: labelSize,
            textAlign: "left",
            opacity: labelProgress * 0.8,
            textTransform: "uppercase",
            marginBottom: minDim * 0.008,
            transform: "translateY(" + labelY + "px)"
          }}>
            {(props.label ?? SCENE_PARAMS.label.value)}
          </div>

          {/* Amount */}
          <div style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: amountSize,
            textAlign: "right",
            lineHeight: 1.5,
            textShadow: "2px 2px 0px rgba(0,0,0,0.1)"
          }}>
            {(props.currencySymbol ?? SCENE_PARAMS.currencySymbol.value) + currentVal}
          </div>

          {/* Arrow indicator */}
          <div style={{
            width: 0,
            height: 0,
            borderLeft: (minDim * 0.009) + "px solid transparent",
            borderRight: (minDim * 0.009) + "px solid transparent",
            borderTop: (minDim * 0.013) + "px solid " + (props.borderColor ?? SCENE_PARAMS.borderColor.value),
            position: "absolute",
            bottom: minDim * 0.018,
            right: minDim * 0.018,
            opacity: arrowBlink ? 1 : 0
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const goodMoodSchema = z.object({
  scale: z.number().min(0.5).max(2).step(0.05),
  colorO1: zColor(),
  colorO2: zColor(),
  colorM: zColor(),
  colorD: zColor(),
  topRowColor: zColor(),
  backgroundColor: zColor(),
  animationSpeed: z.number().min(0.1).max(2).step(0.1),
  stretchIntensity: z.number().min(0).max(0.5).step(0.01),
  fontFamily: z.string(),
  wordTop: z.string(),
  wordBottom: z.string(),
});

export const defaultGoodMoodProps: z.infer<typeof goodMoodSchema> = {
  scale: 0.9,
  colorO1: "#006eff", // Blue
  colorO2: "#ff1d1d", // Red
  colorM: "#ffbd14",  // Yellow
  colorD: "#ff7fa1",  // Pink
  topRowColor: "#ffffff",
  backgroundColor: "#000000",
  animationSpeed: 0.8,
  stretchIntensity: 0.28,
  fontFamily: "Bebas Neue, Impact, sans-serif",
  wordTop: "GOOD",
  wordBottom: "MOOD",
};

export const Scene: React.FC<z.infer<typeof goodMoodSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height) * props.scale;

  const wordTop = props.wordTop || "GOOD";
  const wordBottom = props.wordBottom || "MOOD";
  
  const maxLength = Math.max(wordTop.length, wordBottom.length);
  
  const colors = [
    props.colorO1,
    props.colorO2,
    props.colorM,
    props.colorD
  ];

  const columns = Array.from({ length: maxLength }).map((_, i) => ({
    top: wordTop[i] || " ",
    bottom: wordBottom[i] || " ",
    bottomColor: colors[i % colors.length]
  }));

  return (
    <AbsoluteFill style={{ 
      backgroundColor: props.backgroundColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ 
        display: "flex", 
        flexDirection: "row",
        gap: minDim * 0.02
      }}>
        {columns.map((col, i) => {
          // Sine wave for the continuous "good mood" feel
          // We use frame * speed to control the frequency
          const pulse = Math.sin((frame * props.animationSpeed * 0.1) - (i * 0.5)) * props.stretchIntensity;
          
          // The split ratio determines how much space the top vs bottom letter takes
          // It ranges around 0.5 based on the pulse
          const splitRatio = 0.5 + pulse;

          return (
            <div key={i} style={{ 
              display: "flex", 
              flexDirection: "column",
              height: minDim * 0.8,
              width: minDim * (0.88 / Math.max(maxLength, 4)),
            }}>
              {/* Top Letter (GOOD) */}
              <div style={{ 
                height: `${splitRatio * 100}%`, 
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                // Subtle transition for smoothness if props change, though pulse handles frame updates
              }}>
                <span style={{ 
                  color: props.topRowColor, 
                  fontFamily: props.fontFamily,
                  fontSize: minDim * 0.5,
                  fontWeight: 900,
                  lineHeight: 0.8,
                  // The core stretch effect: scaling the Y axis based on the container height
                  // We scale it so it fills the available height visually
                  transform: `scaleY(${splitRatio * 2})`,
                  transformOrigin: "center",
                  display: "block",
                  textAlign: "center",
                  whiteSpace: "nowrap"
                }}>
                  {col.top}
                </span>
              </div>

              {/* Bottom Letter (MOOD) */}
              <div style={{ 
                height: `${(1 - splitRatio) * 100}%`, 
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}>
                <span style={{ 
                  color: col.bottomColor, 
                  fontFamily: props.fontFamily,
                  fontSize: minDim * 0.5,
                  fontWeight: 900,
                  lineHeight: 0.8,
                  // Stretching the bottom letter inversely
                  transform: `scaleY(${(1 - splitRatio) * 2})`,
                  transformOrigin: "center",
                  display: "block",
                  textAlign: "center",
                  whiteSpace: "nowrap"
                }}>
                  {col.bottom}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

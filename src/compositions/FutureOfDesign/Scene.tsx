import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const futureOfDesignSchema = z.object({
  smallText: z.string(),
  mainText: z.string(),
  subText: z.string(),
  textColor: zColor(),
  glowColor: zColor(),
  backgroundColor: zColor(),
  scale: z.number().min(0.5).max(2).step(0.05),
  animationSpeed: z.number().min(0.5).max(2).step(0.1),
  blurAmount: z.number().min(0).max(50).step(5),
  slideDistance: z.number().min(50).max(400).step(25),
  glowIntensity: z.number().min(0).max(10).step(1),
  letterSpacing: z.number().min(-20).max(10).step(2),
});

export const defaultFutureOfDesignProps: z.infer<typeof futureOfDesignSchema> = {
  smallText: "the",
  mainText: "future",
  subText: "of design",
  textColor: "#FFFFFF",
  glowColor: "#FFFFFF",
  backgroundColor: "#0f172a",
  scale: 1.45,
  animationSpeed: 0.6,
  blurAmount: 30,
  slideDistance: 400,
  glowIntensity: 6,
  letterSpacing: -2,
};

export const Scene: React.FC<z.infer<typeof futureOfDesignSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = props.animationSpeed;
  const adjustedFrame = frame * speed;
  const scaleValue = props.scale;
  
  // Main "future" text — blur + slide from left
  const mainProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 22, stiffness: 70 },
  });
  
  const mainX      = interpolate(mainProgress, [0, 1], [-props.slideDistance, 0]);
  const mainBlur   = interpolate(mainProgress, [0, 0.6, 1], [props.blurAmount, 5, 0]);
  const mainOpacity = interpolate(mainProgress, [0, 0.3, 1], [0, 0.8, 1]);
  
  // Secondary text ("the" + "of design") — delayed fade/slide
  const textDelay = 15;
  const secondaryProgress = spring({
    frame: Math.max(0, adjustedFrame - textDelay),
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  
  const secondaryY = interpolate(secondaryProgress, [0, 1], [20, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.backgroundColor,
    }}>
      <div style={{
        transform: `scale(${scaleValue})`,
        transformOrigin: "center center",
        position: "relative",
        width: "100%",
        maxWidth: minDim * 0.8,
      }}>
        <div style={{ position: "relative" }}>

          {/* Small "the" — floats above the "u" in "future" */}
          <div style={{
            position: "absolute",
            color: props.textColor,
            fontSize: minDim * 0.055,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            opacity: Number(secondaryProgress) * 0.8,
            transform: `translateY(${secondaryY}px)`,
            letterSpacing: 1,
            top: minDim * -0.04,
            left: "50%",
            marginLeft: minDim * -0.11,
          }}>
            {props.smallText}
          </div>

          {/* Main "future" — italic serif, blur + slide in from left */}
          <h1 style={{
            color: props.textColor,
            fontSize: minDim * 0.18,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            margin: 0,
            letterSpacing: `${props.letterSpacing}px`,
            opacity: mainOpacity,
            transform: `translateX(${mainX}px)`,
            filter: `blur(${mainBlur}px) drop-shadow(0 0 ${props.glowIntensity}px ${props.glowColor})`,
            textShadow: `0 0 ${props.glowIntensity * 0.5}px ${props.glowColor}`,
            textAlign: "center",
          }}>
            {props.mainText}
          </h1>

          {/* Sub text "of design" — slides up from below */}
          <div style={{
            color: props.textColor,
            fontSize: minDim * 0.042,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            marginTop: minDim * -0.015,
            opacity: Number(secondaryProgress) * 0.9,
            transform: `translateY(${-secondaryY}px)`,
            letterSpacing: minDim * 0.008,
            textAlign: "center",
          }}>
            {props.subText}
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};

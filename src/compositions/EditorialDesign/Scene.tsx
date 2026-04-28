import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { TextMask } from "./Components/TextMask";

export const editorialDesignSchema = z.object({
  smallText: z.string(),
  mainText: z.string(),
  subText: z.string(),
  textColor: zColor(),
  backgroundColor: zColor(),
  scale: z.number().min(0.5).max(2).step(0.05),
  animationSpeed: z.number().min(0.5).max(2).step(0.1),
});

export const defaultEditorialDesignProps: z.infer<typeof editorialDesignSchema> = {
  smallText: "THE",
  mainText: "future",
  subText: "OF DESIGN",
  textColor: "#FFFFFF",
  backgroundColor: "#000000",
  scale: 1,
  animationSpeed: 1,
};

export const Scene: React.FC<z.infer<typeof editorialDesignSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = props.animationSpeed;
  const adjustedFrame = frame * speed;
  
  // Background scale (Ken Burns)
  const bgScale = interpolate(adjustedFrame, [0, 150], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Tracking animation for supporting text
  const trackingProgress = spring({
    frame: Math.max(0, adjustedFrame - 20),
    fps,
    config: { damping: 26, stiffness: 40 },
  });
  const letterSpacing = interpolate(trackingProgress, [0, 1], [0, 4]);
  const secondaryOpacity = interpolate(trackingProgress, [0, 1], [0, 0.8]);

  const minDim = Math.min(width, height);

  return (
    <AbsoluteFill style={{
      backgroundColor: props.backgroundColor,
      overflow: "hidden",
    }}>
      {/* Background layer for Ken Burns */}
      <AbsoluteFill style={{
        transform: `scale(${bgScale})`,
        backgroundColor: props.backgroundColor,
      }} />

      <AbsoluteFill style={{
        padding: minDim * 0.1,
        justifyContent: "center",
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          transform: `scale(${props.scale})`,
          transformOrigin: "left center",
        }}>
          {/* Small text above */}
          <div style={{
            color: props.textColor,
            fontSize: minDim * 0.04,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            letterSpacing: `${letterSpacing}px`,
            opacity: secondaryOpacity,
            marginBottom: minDim * 0.02,
          }}>
            {props.smallText}
          </div>

          {/* Main Hero text with Mask */}
          <div style={{
            color: props.textColor,
            fontSize: minDim * 0.16,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 0.9,
            marginBottom: minDim * 0.02,
          }}>
            <TextMask direction="up" delay={5 / speed}>
              {props.mainText}
            </TextMask>
          </div>

          {/* Sub text below with Mask */}
          <div style={{
            color: props.textColor,
            fontSize: minDim * 0.04,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            letterSpacing: `${letterSpacing}px`,
            opacity: secondaryOpacity,
            display: "flex",
            alignItems: "center",
          }}>
             {/* A small decorative line */}
             <div style={{
               width: minDim * 0.08,
               height: 1,
               backgroundColor: props.textColor,
               marginRight: minDim * 0.03,
               opacity: secondaryOpacity,
               transform: `scaleX(${trackingProgress})`,
               transformOrigin: "left",
             }} />
             
             <TextMask direction="down" delay={25 / speed}>
               {props.subText}
             </TextMask>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { VinylDisk } from "./Components/VinylDisk";
import { TextMask } from "../EditorialDesign/Components/TextMask";

export const cinematicVinylSchema = z.object({
  trackTitle: z.string(),
  artistName: z.string(),
  vinylLabel: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
  scale: z.number().min(0.5).max(2).step(0.05),
  animationSpeed: z.number().min(0.5).max(2).step(0.1),
  rotationSpeed: z.number().min(0.1).max(3).step(0.1),
});

export const defaultCinematicVinylProps: z.infer<typeof cinematicVinylSchema> = {
  trackTitle: "Midnight City",
  artistName: "M83",
  vinylLabel: "https://picsum.photos/seed/m83/800/800",
  backgroundColor: "#050505",
  textColor: "#FFFFFF",
  accentColor: "#FF2D55",
  scale: 1,
  animationSpeed: 1,
  rotationSpeed: 1,
};

export const Scene: React.FC<z.infer<typeof cinematicVinylSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const speed = props.animationSpeed;
  const adjustedFrame = frame * speed;
  const minDim = Math.min(width, height);

  // Vinyl Entrance
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const vinylX = interpolate(entrance, [0, 1], [width * 0.4, 0]);
  const vinylRotation = (adjustedFrame * props.rotationSpeed * 2) % 360;

  // Text Entrance
  const textProgress = spring({
    frame: Math.max(0, adjustedFrame - 20),
    fps,
    config: { damping: 24, stiffness: 70 },
  });

  const cardOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const cardX = interpolate(textProgress, [0, 1], [-50, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: props.backgroundColor, overflow: "hidden" }}>
      {/* Background Atmosphere - Animated Gradient */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 70% 50%, ${props.accentColor}22 0%, transparent 60%)`,
        opacity: Number(entrance),
      }} />

      {/* Main Content Container */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8%",
      }}>
        
        {/* Left Side: Track Info Card (Glassmorphic) */}
        <div style={{
          width: "40%",
          zIndex: 10,
          opacity: cardOpacity,
          transform: `translateX(${cardX}px)`,
        }}>
          <div style={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ marginBottom: 12 }}>
              <TextMask direction="up" delay={30 / speed}>
                <span style={{
                  color: props.accentColor,
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}>Now Playing</span>
              </TextMask>
            </div>

            <div style={{ marginBottom: 8 }}>
              <TextMask direction="up" delay={40 / speed}>
                <h1 style={{
                  color: props.textColor,
                  fontFamily: "system-ui, sans-serif",
                  fontSize: minDim * 0.06,
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.1,
                }}>
                  {props.trackTitle}
                </h1>
              </TextMask>
            </div>

            <div>
              <TextMask direction="up" delay={50 / speed}>
                <p style={{
                  color: props.textColor,
                  fontFamily: "Georgia, serif",
                  fontSize: minDim * 0.035,
                  fontStyle: "italic",
                  margin: 0,
                  opacity: 0.7,
                }}>
                  {props.artistName}
                </p>
              </TextMask>
            </div>
          </div>
        </div>

        {/* Right Side: Large Vinyl Disk */}
        <div style={{
          width: "70%",
          height: "100%",
          position: "absolute",
          right: "-10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${vinylX}px)`,
        }}>
          <VinylDisk
            size={height * 1.1}
            rotation={vinylRotation}
            labelImage={props.vinylLabel}
          />
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

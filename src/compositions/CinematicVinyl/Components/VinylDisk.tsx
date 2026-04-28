import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface VinylDiskProps {
  size: number;
  rotation: number;
  labelImage?: string;
  vinylColor?: string;
  labelColor?: string;
}

export const VinylDisk: React.FC<VinylDiskProps> = ({
  size,
  rotation,
  labelImage,
  vinylColor = "#121212",
  labelColor = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelSize = size * 0.45;
  const centerHoleSize = size * 0.05;

  // Lighting sweep animation
  const lightSweep = ((frame % (fps * 4)) / (fps * 4)) * 360;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: vinylColor,
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.8)",
        transform: `rotate(${rotation}deg)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Radial Grooves */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
          pointerEvents: "none",
        }}
      />

      {/* Primary Reflection (Dynamic Light Sweep) */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background: `conic-gradient(
            from ${lightSweep}deg at 50% 50%,
            transparent 0%,
            rgba(255,255,255,0.05) 15%,
            rgba(255,255,255,0.1) 25%,
            rgba(255,255,255,0.05) 35%,
            transparent 50%,
            rgba(255,255,255,0.03) 75%,
            transparent 100%
          )`,
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      {/* Center Label */}
      <div
        style={{
          width: labelSize,
          height: labelSize,
          borderRadius: "50%",
          backgroundColor: labelColor,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {labelImage ? (
          <Img
            src={labelImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: labelColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#000", opacity: 0.2, fontSize: size * 0.05, fontWeight: 700 }}>VINYL</div>
          </div>
        )}

        {/* Inner shadow for label depth */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
        }} />
      </div>

      {/* Center Hole */}
      <div
        style={{
          position: "absolute",
          width: centerHoleSize,
          height: centerHoleSize,
          borderRadius: "50%",
          backgroundColor: vinylColor,
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.8)",
          zIndex: 10,
        }}
      />
    </div>
  );
};

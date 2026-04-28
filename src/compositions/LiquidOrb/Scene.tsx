import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const liquidOrbSchema = z.object({
  backgroundColor: zColor(),
  primaryColor: zColor(),
  secondaryColor: zColor(),
  accentColor: zColor(),
  scale: z.number().min(0.5).max(2).step(0.05),
  animationSpeed: z.number().min(0.1).max(3).step(0.1),
  blobComplexity: z.number().min(4).max(20).step(1),
});

export const defaultLiquidOrbProps: z.infer<typeof liquidOrbSchema> = {
  backgroundColor: "#000000",
  primaryColor: "#007AFF", // Apple Blue
  secondaryColor: "#5856D6", // Apple Purple
  accentColor: "#FFFFFF",
  scale: 1,
  animationSpeed: 1,
  blobComplexity: 12,
};

const generateBlobPath = (time: number, size: number, complexity: number, offset: number) => {
  const points = [];
  const radius = size / 2;
  
  for (let i = 0; i < complexity; i++) {
    const angle = (i / complexity) * Math.PI * 2;
    const noise = Math.sin(time * 0.05 + i * 0.8 + offset) * 0.15 + 
                  Math.cos(time * 0.03 + i * 1.2 + offset) * 0.1;
    const r = radius * (1 + noise);
    points.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  }
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < complexity; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % complexity];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const cp1x = (midX + p1.x) / 2;
    const cp1y = (midY + p1.y) / 2;
    const cp2x = (midX + p2.x) / 2;
    const cp2y = (midY + p2.y) / 2;
    path += ` Q ${p1.x} ${p1.y}, ${midX} ${midY}`;
  }
  path += " Z";
  return path;
};

export const Scene: React.FC<z.infer<typeof liquidOrbSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  
  const speed = props.animationSpeed;
  const adjustedFrame = frame * speed;
  
  const blobSize = minDim * 0.5;
  
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: props.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Background Glow */}
      <div style={{
        position: "absolute",
        width: blobSize * 2,
        height: blobSize * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${props.primaryColor}33 0%, transparent 70%)`,
        filter: "blur(60px)",
        transform: `scale(${entrance})`,
      }} />

      <div style={{
        transform: `scale(${props.scale * entrance})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}>
        {/* Layer 1: Core Glow */}
        <svg 
          width={blobSize * 1.5} 
          height={blobSize * 1.5} 
          viewBox={`${-blobSize * 0.75} ${-blobSize * 0.75} ${blobSize * 1.5} ${blobSize * 1.5}`}
          style={{ overflow: "visible", position: "absolute" }}
        >
          <path
            d={generateBlobPath(adjustedFrame, blobSize * 0.6, props.blobComplexity, 0)}
            fill={props.primaryColor}
            filter="blur(40px)"
            opacity={0.6}
          />
        </svg>

        {/* Layer 2: Middle Liquid */}
        <svg 
          width={blobSize * 1.5} 
          height={blobSize * 1.5} 
          viewBox={`${-blobSize * 0.75} ${-blobSize * 0.75} ${blobSize * 1.5} ${blobSize * 1.5}`}
          style={{ overflow: "visible", position: "absolute" }}
        >
          <path
            d={generateBlobPath(adjustedFrame, blobSize * 0.8, props.blobComplexity, Math.PI)}
            fill={props.secondaryColor}
            opacity={0.4}
            style={{ mixBlendMode: "screen" }}
          />
        </svg>

        {/* Layer 3: Glass Shell */}
        <svg 
          width={blobSize * 1.5} 
          height={blobSize * 1.5} 
          viewBox={`${-blobSize * 0.75} ${-blobSize * 0.75} ${blobSize * 1.5} ${blobSize * 1.5}`}
          style={{ overflow: "visible", position: "absolute" }}
        >
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>
          <path
            d={generateBlobPath(adjustedFrame, blobSize, props.blobComplexity, frame * 0.02)}
            fill="url(#glassGrad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={2}
            style={{ backdropFilter: "blur(10px)" }}
          />
          
          {/* Surface Reflections */}
          <ellipse
            cx={-blobSize * 0.2}
            cy={-blobSize * 0.2}
            rx={blobSize * 0.1}
            ry={blobSize * 0.05}
            fill="rgba(255,255,255,0.4)"
            transform="rotate(-30)"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

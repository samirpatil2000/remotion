// Template: map
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  fromCity: { type: "text", label: "From City", value: "America" },
  toCity: { type: "text", label: "To City", value: "Dubai" },
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },
  mapImage: { type: "image", label: "Map Image", value: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png" },
  backgroundColor: { type: "color", label: "Background", value: "#e5ecff" },
  textColor: { type: "color", label: "Text", value: "#ffffff" },
  routeColor: { type: "color", label: "Route", value: "#3b82f6" },
  cityDotColor: { type: "color", label: "City Dot", value: "#60a5fa" },
  planeColor: { type: "color", label: "Plane", value: "#ffffff" },
  dotGlowColor: { type: "color", label: "Dot Glow", value: "rgba(59,130,246,0.5)" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const mapWidth = width;
  const mapHeight = height;

  const start = { x: mapWidth * 0.22, y: mapHeight * 0.38 };
  const end = { x: mapWidth * 0.62, y: mapHeight * 0.42 };
  const control = { x: mapWidth * 0.42, y: mapHeight * 0.15 };

  const progressRaw = interpolate(adjustedFrame, [0, 120], [0, 1], { extrapolateRight: "clamp" });
  const progress = progressRaw * progressRaw * (3 - 2 * progressRaw);

  const t = progress;
  const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * control.x + t * t * end.x;
  const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * control.y + t * t * end.y;

  const dx = 2 * (1 - t) * (control.x - start.x) + 2 * t * (end.x - control.x);
  const dy = 2 * (1 - t) * (control.y - start.y) + 2 * t * (end.y - control.y);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const routeReveal = interpolate(progress, [0, 1], [1, 0], { extrapolateRight: "clamp" });
  const labelsOpacity = interpolate(adjustedFrame, [15, 45], [0, 1], { extrapolateRight: "clamp" });

  const dotSize = minDim * 0.025;
  const planeSize = minDim * 0.06;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center"
      }}>
        <Img
          src={SCENE_PARAMS.mapImage.value}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.7) brightness(0.6) contrast(1.1)",
            opacity: 0.8
          }}
        />

        <svg width={mapWidth} height={mapHeight} style={{ position: "absolute", left: 0, top: 0 }}>
          <path
            d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
            fill="none"
            stroke={SCENE_PARAMS.routeColor.value}
            strokeWidth={minDim * 0.007}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={routeReveal}
          />
        </svg>

        <div style={{
          position: "absolute",
          left: start.x,
          top: start.y,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: SCENE_PARAMS.cityDotColor.value,
          boxShadow: `0 0 ${minDim * 0.03}px ${SCENE_PARAMS.dotGlowColor.value}, 0 0 ${minDim * 0.06}px ${SCENE_PARAMS.dotGlowColor.value}`
        }} />

        <div style={{
          position: "absolute",
          left: end.x,
          top: end.y,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: SCENE_PARAMS.cityDotColor.value,
          boxShadow: `0 0 ${minDim * 0.03}px ${SCENE_PARAMS.dotGlowColor.value}, 0 0 ${minDim * 0.06}px ${SCENE_PARAMS.dotGlowColor.value}`
        }} />

        <div style={{
          position: "absolute",
          left: x,
          top: y,
          width: planeSize,
          height: planeSize,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`
        }}>
          <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ display: "block" }}>
            <path
              d="M60 32 L4 10 L20 32 L4 54 Z"
              fill={SCENE_PARAMS.planeColor.value}
            />
            <path
              d="M20 32 L4 10 L36 26 Z"
              fill={SCENE_PARAMS.planeColor.value}
              opacity="0.85"
            />
          </svg>
        </div>

        <div style={{
          position: "absolute",
          left: start.x,
          top: start.y + minDim * 0.05,
          transform: "translateX(-50%)",
          opacity: labelsOpacity,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: minDim * 0.035,
            color: SCENE_PARAMS.textColor.value,
            fontWeight: 600,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)"
          }}>{SCENE_PARAMS.fromCity.value}</div>
        </div>

        <div style={{
          position: "absolute",
          left: end.x,
          top: end.y + minDim * 0.05,
          transform: "translateX(-50%)",
          opacity: labelsOpacity,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: minDim * 0.035,
            color: SCENE_PARAMS.textColor.value,
            fontWeight: 600,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)"
          }}>{SCENE_PARAMS.toCity.value}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

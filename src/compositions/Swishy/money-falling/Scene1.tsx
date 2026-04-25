// Template: money-falling
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  itemCount: { type: "number", label: "Element Count", value: 40, min: 10, max: 100, step: 1 },
  driftAmount: { type: "number", label: "Drift (px)", value: 20, min: 0, max: 100, step: 5 },
  minFallDuration: { type: "number", label: "Min Duration (s)", value: 2, min: 1, max: 5, step: 0.1 },
  maxFallDuration: { type: "number", label: "Max Duration (s)", value: 4, min: 2, max: 8, step: 0.1 },
  itemSize: { type: "number", label: "Icon Size", value: 0.05, min: 0.01, max: 0.1, step: 0.01 },
  flashColor: { type: "color", label: "Flash Color", value: "#FFD700" },
  fontFamily: { type: "font", label: "Font", value: "Open Sans" },
  backgroundColor: { type: "color", label: "Background", value: "transparent" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  // Deterministic random function
  const random = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Money Rain Elements Generation
  const elements = Array.from({ length: Math.floor(SCENE_PARAMS.itemCount.value) }).map((_, i) => {
    const seed = i + 123.45;
    const startX = random(seed) * 100;
    const fallDuration = SCENE_PARAMS.minFallDuration.value + random(seed + 1) * (SCENE_PARAMS.maxFallDuration.value - SCENE_PARAMS.minFallDuration.value);
    const fallDurationFrames = fallDuration * fps;
    const delay = random(seed + 2) * fallDurationFrames;
    const isCoin = random(seed + 3) > 0.5;
    const spinDirection = random(seed + 4) > 0.5 ? 1 : -1;
    
    // Progress calculation for looping
    const localProgress = ((adjustedFrame + delay) % fallDurationFrames) / fallDurationFrames;
    
    return {
      startX,
      localProgress,
      emoji: isCoin ? "💰" : "💵",
      spinDirection,
      seed
    };
  });

  // Golden Flash Particles (Occasional)
  const flashCount = 6;
  const flashes = Array.from({ length: flashCount }).map((_, i) => {
    const seed = i + 987.65;
    const cycleFrames = 45; // Every ~1.5 seconds
    const localFrame = (adjustedFrame + random(seed) * cycleFrames) % cycleFrames;
    const progress = localFrame / cycleFrames;
    
    const posX = random(seed + 1) * 100;
    const posY = random(seed + 2) * 100;
    const opacity = interpolate(progress, [0, 0.2, 0.5], [0, 1, 0], { extrapolateRight: "clamp" });
    const scale = interpolate(progress, [0, 0.5], [0.2, 1.5], { extrapolateRight: "clamp" });

    return { posX, posY, opacity, scale };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, overflow: "hidden" }}>
      <div style={{ transform: `scale(${SCENE_PARAMS.scale.value})`, width: "100%", height: "100%" }}>
        
        {/* Raining Elements */}
        {elements.map((el, i) => {
          const y = interpolate(el.localProgress, [0, 1], [-10, 110]);
          const xDrift = Math.sin(el.localProgress * Math.PI * 4) * SCENE_PARAMS.driftAmount.value;
          const rotation = el.localProgress * 360 * el.spinDirection;
          
          // Fade out in bottom 15%
          const opacity = interpolate(
            el.localProgress, 
            [0, 0.85, 1], 
            [1, 1, 0], 
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={`money-${i}`}
              style={{
                position: "absolute",
                left: `${el.startX}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) translateX(${xDrift}px) rotate(${rotation}deg)`,
                fontSize: minDim * SCENE_PARAMS.itemSize.value,
                opacity,
                pointerEvents: "none",
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                userSelect: "none"
              }}
            >
              {el.emoji}
            </div>
          );
        })}

        {/* Golden Flash Bursts */}
        {flashes.map((f, i) => (
          <div
            key={`flash-${i}`}
            style={{
              position: "absolute",
              left: `${f.posX}%`,
              top: `${f.posY}%`,
              width: minDim * 0.1,
              height: minDim * 0.1,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${SCENE_PARAMS.flashColor.value} 0%, transparent 70%)`,
              opacity: f.opacity,
              transform: `translate(-50%, -50%) scale(${f.scale})`,
              pointerEvents: "none",
              filter: "blur(4px)"
            }}
          />
        ))}

      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: friendship-beads-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  word: { type: "text", label: "Word", value: "subscribe" },
  backgroundColor: { type: "color", label: "Background", value: "#E5E0D8" },
  beadColor: { type: "color", label: "Bead Color", value: "#F8F6F2" },
  letterColor: { type: "color", label: "Letter Color", value: "#1A1A1A" },
  shadowColor: { type: "color", label: "Shadow Color", value: "#8B8680" },
  scale: { type: "number", label: "Scale", value: 0.9, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  beadSize: { type: "number", label: "Bead Size", value: 0.1, min: 0.06, max: 0.18, step: 0.01 },
  scatterAmount: { type: "number", label: "Scatter Amount", value: 1, min: 0.5, max: 2, step: 0.1 },
  stopMotionSteps: { type: "number", label: "Stop Motion Steps", value: 8, min: 4, max: 15, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const word = SCENE_PARAMS.word.value.toUpperCase();
  const letters = word.split('');
  const beadSize = minDim * SCENE_PARAMS.beadSize.value;
  const spacing = beadSize * 1.15;
  const scatterMult = SCENE_PARAMS.scatterAmount.value;
  const steps = SCENE_PARAMS.stopMotionSteps.value;
  
  const totalWidth = letters.length * spacing - (spacing - beadSize);
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;
  
  const seededRandom = (seed) => {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  
  const scatterPositions = letters.map((_, i) => {
    const seed1 = i * 7 + 1;
    const seed2 = i * 13 + 5;
    const seed3 = i * 23 + 11;
    return {
      x: (seededRandom(seed1) - 0.5) * width * 0.7 * scatterMult,
      y: (seededRandom(seed2) - 0.5) * height * 0.6 * scatterMult,
      rotation: (seededRandom(seed3) - 0.5) * 60,
    };
  });
  
  const stopMotionStep = (progress, numSteps) => {
    const stepped = Math.floor(progress * numSteps) / numSteps;
    return Math.min(stepped, 1);
  };
  
  const animationStartFrame = 15;
  const framesPerLetter = 12;
  const settleHoldFrames = 8;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
    }}>
      {/* Subtle surface texture overlay */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 30% 20%, rgba(255,252,245,0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.03) 0%, transparent 40%)`,
        pointerEvents: "none",
      }} />
      
      <div style={{
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center",
        position: "relative",
        width: width,
        height: height,
      }}>
        {letters.map((letter, i) => {
          const letterDelay = animationStartFrame + i * 6;
          const animDuration = framesPerLetter * 3;
          
          const rawProgress = Math.max(0, Math.min(1, (adjustedFrame - letterDelay) / animDuration));
          const steppedProgress = stopMotionStep(rawProgress, steps);
          
          const isAnimating = rawProgress > 0 && rawProgress < 1;
          const jitterSeed = Math.floor(adjustedFrame / 2) + i * 17;
          const jitterX = isAnimating ? (seededRandom(jitterSeed) - 0.5) * 4 : 0;
          const jitterY = isAnimating ? (seededRandom(jitterSeed + 100) - 0.5) * 4 : 0;
          const jitterRotation = isAnimating ? (seededRandom(jitterSeed + 200) - 0.5) * 3 : 0;
          
          const finalX = startX + i * spacing + beadSize / 2;
          const finalY = centerY;
          
          const currentX = scatterPositions[i].x * (1 - steppedProgress) + (finalX - width / 2) * steppedProgress + jitterX;
          const currentY = scatterPositions[i].y * (1 - steppedProgress) + (finalY - height / 2) * steppedProgress + jitterY;
          const currentRotation = scatterPositions[i].rotation * (1 - steppedProgress) + jitterRotation;
          
          const settleFrame = letterDelay + animDuration;
          const settlePop = adjustedFrame > settleFrame && adjustedFrame < settleFrame + settleHoldFrames ? 1.03 : 1;
          
          // Unique imperfections per bead
          const beadSeed = i * 31 + 7;
          const highlightOffsetX = (seededRandom(beadSeed) - 0.5) * beadSize * 0.15;
          const highlightOffsetY = (seededRandom(beadSeed + 1) - 0.5) * beadSize * 0.1 - beadSize * 0.2;
          const highlightSize = beadSize * (0.25 + seededRandom(beadSeed + 2) * 0.15);
          const highlightOpacity = 0.6 + seededRandom(beadSeed + 3) * 0.3;
          
          // Letter offset imperfections
          const letterOffsetX = (seededRandom(beadSeed + 10) - 0.5) * beadSize * 0.06;
          const letterOffsetY = (seededRandom(beadSeed + 11) - 0.5) * beadSize * 0.06;
          const letterRotation = (seededRandom(beadSeed + 12) - 0.5) * 4;
          const letterOpacity = 0.85 + seededRandom(beadSeed + 13) * 0.15;
          
          // Secondary highlight variation
          const secondHighlightX = (seededRandom(beadSeed + 20) - 0.5) * beadSize * 0.3 + beadSize * 0.15;
          const secondHighlightY = (seededRandom(beadSeed + 21) - 0.5) * beadSize * 0.2 - beadSize * 0.1;
          const secondHighlightSize = beadSize * (0.08 + seededRandom(beadSeed + 22) * 0.06);
          
          // Bead color warmth variation
          const warmthShift = Math.floor(seededRandom(beadSeed + 30) * 6) - 3;
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg) scale(${settlePop})`,
                transformOrigin: "center center",
              }}
            >
              {/* Contact shadow - soft and diffused */}
              <div style={{
                position: "absolute",
                width: beadSize * 1.1,
                height: beadSize * 0.3,
                borderRadius: "50%",
                backgroundColor: SCENE_PARAMS.shadowColor.value,
                transform: `translate(${beadSize * 0.08}px, ${beadSize * 0.42}px)`,
                filter: `blur(${beadSize * 0.12}px)`,
                opacity: 0.45,
                marginLeft: -beadSize * 0.55,
                marginTop: -beadSize / 2,
              }} />
              
              {/* Deeper shadow core */}
              <div style={{
                position: "absolute",
                width: beadSize * 0.7,
                height: beadSize * 0.15,
                borderRadius: "50%",
                backgroundColor: "#5A5550",
                transform: `translate(${beadSize * 0.06}px, ${beadSize * 0.45}px)`,
                filter: `blur(${beadSize * 0.06}px)`,
                opacity: 0.35,
                marginLeft: -beadSize * 0.35,
                marginTop: -beadSize / 2,
              }} />
              
              {/* Bead base */}
              <div style={{
                position: "absolute",
                width: beadSize,
                height: beadSize,
                borderRadius: "50%",
                background: `radial-gradient(ellipse at 35% 30%, #FFFCF7 0%, ${SCENE_PARAMS.beadColor.value} 25%, #EDE9E3 70%, #D8D4CE 100%)`,
                marginLeft: -beadSize / 2,
                marginTop: -beadSize / 2,
                boxShadow: `
                  inset ${beadSize * 0.02}px ${beadSize * 0.04}px ${beadSize * 0.08}px rgba(255,252,245,0.7),
                  inset -${beadSize * 0.03}px -${beadSize * 0.05}px ${beadSize * 0.1}px rgba(0,0,0,0.12),
                  inset 0 0 ${beadSize * 0.2}px rgba(0,0,0,0.05)
                `,
                overflow: "hidden",
              }}>
                {/* Subtle surface texture */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: `
                    radial-gradient(circle at ${25 + seededRandom(beadSeed + 40) * 20}% ${20 + seededRandom(beadSeed + 41) * 15}%, rgba(255,255,255,0.08) 0%, transparent 8%),
                    radial-gradient(circle at ${60 + seededRandom(beadSeed + 42) * 25}% ${70 + seededRandom(beadSeed + 43) * 20}%, rgba(0,0,0,0.04) 0%, transparent 10%)
                  `,
                  borderRadius: "50%",
                }} />
                
                {/* Primary highlight - organic and offset */}
                <div style={{
                  position: "absolute",
                  width: highlightSize,
                  height: highlightSize * 0.7,
                  borderRadius: "50%",
                  background: `radial-gradient(ellipse at center, rgba(255,253,248,${highlightOpacity}) 0%, rgba(255,253,248,0.3) 40%, transparent 70%)`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${highlightOffsetX}px), calc(-50% + ${highlightOffsetY}px))`,
                  filter: `blur(${beadSize * 0.02}px)`,
                }} />
                
                {/* Secondary smaller highlight */}
                <div style={{
                  position: "absolute",
                  width: secondHighlightSize,
                  height: secondHighlightSize * 0.8,
                  borderRadius: "50%",
                  background: `radial-gradient(ellipse at center, rgba(255,255,252,0.5) 0%, transparent 60%)`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${secondHighlightX}px), calc(-50% + ${secondHighlightY}px))`,
                }} />
                
                {/* Edge rim light */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, transparent 45%, rgba(255,252,245,0.25) 70%, transparent 85%)`,
                }} />
                
                {/* Bottom edge darkening */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.08) 85%, rgba(0,0,0,0.12) 100%)`,
                }} />
                
                {/* Letter - stamped look with imperfections */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <span style={{
                    color: SCENE_PARAMS.letterColor.value,
                    fontSize: beadSize * 0.5,
                    fontWeight: 800,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    userSelect: "none",
                    textTransform: "uppercase",
                    transform: `translate(${letterOffsetX}px, ${letterOffsetY}px) rotate(${letterRotation}deg)`,
                    opacity: letterOpacity,
                    textShadow: `
                      ${beadSize * 0.005}px ${beadSize * 0.01}px ${beadSize * 0.01}px rgba(0,0,0,0.2),
                      -${beadSize * 0.003}px -${beadSize * 0.003}px ${beadSize * 0.005}px rgba(255,255,255,0.1)
                    `,
                    letterSpacing: "-0.02em",
                  }}>
                    {letter}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: brand-spinning
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  word: { type: "text", label: "Word", value: "brand" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1.7, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.8, min: 0.5, max: 2, step: 0.1 },
  patternIntensity: { type: "number", label: "Pattern Intensity", value: 1.5, min: 0.3, max: 2, step: 0.1 },
  spiralTightness: { type: "number", label: "Spiral Tightness", value: 0.9, min: 0.5, max: 2, step: 0.1 },
  wordCount: { type: "number", label: "Word Count", value: 12, min: 6, max: 20, step: 1 },
  letterSpacing: { type: "number", label: "Letter Spacing", value: 0, min: 0, max: 0.5, step: 0.01 },
  trailEffect: { type: "boolean", label: "Trail Effect", value: false },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const word = (props.word ?? SCENE_PARAMS.word.value);
  const wordCount = Math.round((props.wordCount ?? SCENE_PARAMS.wordCount.value));
  const patternIntensity = (props.patternIntensity ?? SCENE_PARAMS.patternIntensity.value);
  const spiralTightness = (props.spiralTightness ?? SCENE_PARAMS.spiralTightness.value);
  
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = minDim * 0.4;
  
  const fontSize = minDim * 0.08;
  
  const words = [];
  
  for (let i = 0; i < wordCount; i++) {
    const delay = i * 4;
    const entranceProgress = spring({
      frame: Math.max(0, adjustedFrame - delay),
      fps,
      config: { damping: 22, stiffness: 85 },
    });
    
    const baseAngle = (i / wordCount) * Math.PI * 2;
    const timeOffset = adjustedFrame * 0.025 * patternIntensity;
    
    const spiralPhase = Math.sin(adjustedFrame * 0.02 + i * 0.5) * 0.3 * spiralTightness;
    const currentAngle = baseAngle + timeOffset + spiralPhase;
    
    const breathe = Math.sin(adjustedFrame * 0.03 + i * 0.8) * 0.15 + 1;
    const waveRadius = Math.sin(adjustedFrame * 0.015 + i * 0.4) * minDim * 0.08 * patternIntensity;
    const radius = (maxRadius * 0.4 + (i / wordCount) * maxRadius * 0.5) * breathe + waveRadius;
    
    const x = centerX + Math.cos(currentAngle) * radius;
    const y = centerY + Math.sin(currentAngle) * radius;
    
    const tangentAngle = currentAngle + Math.PI / 2;
    const rotationDegrees = (tangentAngle * 180 / Math.PI) + 90;
    const wobble = Math.sin(adjustedFrame * 0.04 + i * 1.2) * 5 * patternIntensity;
    
    const pulseScale = 1 + Math.sin(adjustedFrame * 0.05 + i * 0.6) * 0.08 * patternIntensity;
    
    const opacity = interpolate(entranceProgress, [0, 1], [0, 0.85 + (i % 3) * 0.05]);
    const scale = interpolate(entranceProgress, [0, 1], [0.5, pulseScale]);
    
    words.push({
      x,
      y,
      rotation: rotationDegrees + wobble,
      opacity,
      scale,
      index: i,
    });
    
    if ((props.trailEffect ?? SCENE_PARAMS.trailEffect.value) && entranceProgress > 0.5) {
      const trailCount = 2;
      for (let t = 1; t <= trailCount; t++) {
        const trailTimeOffset = (adjustedFrame - t * 3) * 0.025 * patternIntensity;
        const trailAngle = baseAngle + trailTimeOffset + spiralPhase;
        const trailRadius = radius * (1 - t * 0.05);
        
        words.push({
          x: centerX + Math.cos(trailAngle) * trailRadius,
          y: centerY + Math.sin(trailAngle) * trailRadius,
          rotation: (trailAngle + Math.PI / 2) * 180 / Math.PI + 90,
          opacity: opacity * (0.3 - t * 0.1),
          scale: scale * (0.9 - t * 0.1),
          index: i,
          isTrail: true,
        });
      }
    }
  }
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        {words.map((wordData, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: wordData.x,
              top: wordData.y,
              transform: "translate(-50%, -50%) rotate(" + wordData.rotation + "deg) scale(" + wordData.scale + ")",
              opacity: wordData.opacity,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              fontSize: fontSize,
              fontWeight: 500,
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              letterSpacing: fontSize * (props.letterSpacing ?? SCENE_PARAMS.letterSpacing.value),
              textTransform: "capitalize",
            }}>
              {word}
            </span>
          </div>
        ))}
        
        <div style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          transform: "translate(-50%, -50%)",
          width: minDim * 0.15,
          height: minDim * 0.15,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + (props.textColor ?? SCENE_PARAMS.textColor.value) + "10 0%, transparent 70%)",
          opacity: 0.5 + Math.sin(adjustedFrame * 0.04) * 0.2,
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

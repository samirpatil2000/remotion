// Template: science-club
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  mainText: { type: "text", label: "Main Text", value: "International Day for Women and Girls in Science" },
  fontFamily: { type: "font", label: "Font", value: "Playfair Display" },
  backgroundColor: { type: "color", label: "Background", value: "#0c4a6e" },
  oceanBlue: { type: "color", label: "Ocean Blue", value: "#0284c7" },
  coralPink: { type: "color", label: "Coral Pink", value: "#f472b6" },
  sunsetOrange: { type: "color", label: "Sunset Orange", value: "#fb923c" },
  palmGreen: { type: "color", label: "Palm Green", value: "#22c55e" },
  sandGold: { type: "color", label: "Sand Gold", value: "#fbbf24" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Word Stagger", value: 6, min: 2, max: 15, step: 1 },
  waveIntensity: { type: "number", label: "Wave Intensity", value: 1, min: 0, max: 2, step: 0.1 },
  showMotifs: { type: "boolean", label: "Show Pacific Motifs", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const stagger = SCENE_PARAMS.staggerDelay.value;
  const waveIntensity = SCENE_PARAMS.waveIntensity.value;
  
  const words = SCENE_PARAMS.mainText.value.split(" ");
  
  const waveProgress = spring({ frame: adjustedFrame, fps, config: { damping: 30, stiffness: 40 } });
  
  const renderTapaPattern = (x, y, size, delay, color) => {
    const patternProgress = spring({ 
      frame: Math.max(0, adjustedFrame - delay), 
      fps, 
      config: { damping: 20, stiffness: 90 } 
    });
    const rotation = interpolate(adjustedFrame, [delay, delay + 60], [0, 360], { extrapolateRight: "clamp" });
    
    return (
      <div key={x + "-" + y} style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: patternProgress * 0.6,
        transform: "scale(" + patternProgress + ") rotate(" + rotation + "deg)",
      }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          <polygon points="50,10 90,90 10,90" fill="none" stroke={color} strokeWidth="3" />
          <polygon points="50,25 75,75 25,75" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="50" cy="55" r="8" fill={color} />
        </svg>
      </div>
    );
  };
  
  const renderWave = (yOffset, delay, color, amplitude) => {
    const waveAnim = interpolate(
      adjustedFrame, 
      [delay, delay + 120], 
      [0, Math.PI * 4], 
      { extrapolateRight: "extend" }
    );
    const waveOpacity = spring({ 
      frame: Math.max(0, adjustedFrame - delay), 
      fps, 
      config: { damping: 25, stiffness: 80 } 
    });
    
    const points = [];
    for (let i = 0; i <= 100; i += 2) {
      const x = (i / 100) * width;
      const y = yOffset + Math.sin((i / 10) + waveAnim) * amplitude * waveIntensity;
      points.push(x + "," + y);
    }
    points.push(width + "," + height);
    points.push("0," + height);
    
    return (
      <svg key={yOffset} style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: waveOpacity * 0.3,
      }}>
        <polygon points={points.join(" ")} fill={color} />
      </svg>
    );
  };
  
  const renderFlower = (x, y, size, delay, petalColor, centerColor) => {
    const flowerProgress = spring({ 
      frame: Math.max(0, adjustedFrame - delay), 
      fps, 
      config: { damping: 18, stiffness: 100 } 
    });
    const spin = interpolate(adjustedFrame, [delay, delay + 90], [0, 30], { extrapolateRight: "clamp" });
    
    const petals = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) + spin;
      petals.push(
        <ellipse
          key={i}
          cx="50"
          cy="25"
          rx="12"
          ry="20"
          fill={petalColor}
          transform={"rotate(" + angle + " 50 50)"}
        />
      );
    }
    
    return (
      <div key={x + "-" + y + "-flower"} style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: flowerProgress * 0.8,
        transform: "scale(" + flowerProgress + ")",
      }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {petals}
          <circle cx="50" cy="50" r="15" fill={centerColor} />
        </svg>
      </div>
    );
  };
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      overflow: "hidden",
    }}>
      {renderWave(height * 0.7, 0, SCENE_PARAMS.oceanBlue.value, 30)}
      {renderWave(height * 0.75, 10, SCENE_PARAMS.coralPink.value, 25)}
      {renderWave(height * 0.8, 20, SCENE_PARAMS.palmGreen.value, 20)}
      
      {SCENE_PARAMS.showMotifs.value && (
        <>
          {renderTapaPattern(width * 0.05, height * 0.08, minDim * 0.12, 15, SCENE_PARAMS.sandGold.value)}
          {renderTapaPattern(width * 0.85, height * 0.12, minDim * 0.1, 25, SCENE_PARAMS.coralPink.value)}
          {renderTapaPattern(width * 0.08, height * 0.75, minDim * 0.08, 35, SCENE_PARAMS.palmGreen.value)}
          {renderTapaPattern(width * 0.82, height * 0.7, minDim * 0.11, 45, SCENE_PARAMS.sunsetOrange.value)}
          
          {renderFlower(width * 0.75, height * 0.05, minDim * 0.15, 20, SCENE_PARAMS.coralPink.value, SCENE_PARAMS.sandGold.value)}
          {renderFlower(width * 0.02, height * 0.55, minDim * 0.12, 40, SCENE_PARAMS.sunsetOrange.value, SCENE_PARAMS.coralPink.value)}
          {renderFlower(width * 0.8, height * 0.45, minDim * 0.1, 55, SCENE_PARAMS.palmGreen.value, SCENE_PARAMS.sandGold.value)}
        </>
      )}
      
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: minDim * 0.08,
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: minDim * 0.02,
          maxWidth: isPortrait ? width * 0.9 : width * 0.7,
        }}>
          {words.map((word, i) => {
            const wordDelay = i * stagger;
            const wordProgress = spring({ 
              frame: Math.max(0, adjustedFrame - wordDelay - 30), 
              fps, 
              config: { damping: 20, stiffness: 90 } 
            });
            const wordY = interpolate(wordProgress, [0, 1], [30, 0]);
            
            const colors = [
              SCENE_PARAMS.textColor.value,
              SCENE_PARAMS.sandGold.value,
              SCENE_PARAMS.coralPink.value,
              SCENE_PARAMS.palmGreen.value,
              SCENE_PARAMS.sunsetOrange.value,
            ];
            
            const isHighlight = word.toLowerCase() === "women" || word.toLowerCase() === "girls" || word.toLowerCase() === "science";
            const wordColor = isHighlight ? colors[(i % 4) + 1] : SCENE_PARAMS.textColor.value;
            
            return (
              <span key={i} style={{
                display: "inline-block",
                fontFamily: SCENE_PARAMS.fontFamily.value + ", serif",
                fontSize: minDim * (isHighlight ? 0.085 : 0.065),
                fontWeight: isHighlight ? 700 : 500,
                color: wordColor,
                opacity: wordProgress,
                transform: "translateY(" + wordY + "px)",
                textShadow: isHighlight ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
                letterSpacing: isHighlight ? "0.02em" : "0.01em",
              }}>
                {word}
              </span>
            );
          })}
        </div>
        
        <div style={{
          marginTop: minDim * 0.05,
          display: "flex",
          gap: minDim * 0.02,
          alignItems: "center",
        }}>
          {[SCENE_PARAMS.coralPink.value, SCENE_PARAMS.palmGreen.value, SCENE_PARAMS.sandGold.value, SCENE_PARAMS.sunsetOrange.value, SCENE_PARAMS.oceanBlue.value].map((color, i) => {
            const dotDelay = 70 + (i * 5);
            const dotProgress = spring({ 
              frame: Math.max(0, adjustedFrame - dotDelay), 
              fps, 
              config: { damping: 15, stiffness: 120 } 
            });
            
            return (
              <div key={i} style={{
                width: minDim * 0.025,
                height: minDim * 0.025,
                borderRadius: "50%",
                backgroundColor: color,
                opacity: dotProgress,
                transform: "scale(" + dotProgress + ")",
              }} />
            );
          })}
        </div>
      </div>
      
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: minDim * 0.15,
        background: "linear-gradient(to top, " + SCENE_PARAMS.oceanBlue.value + "40, transparent)",
        opacity: waveProgress,
      }} />
    </AbsoluteFill>
  );
}

export default Scene;

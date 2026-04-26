// Template: spill-word
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  text: { type: "text", label: "Text", value: "Spill" },
  fontFamily: { type: "font", label: "Font", value: "ROTHEFIGHT" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent (Dot)", value: "#EE82EE" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  entranceDuration: { type: "number", label: "Entrance Duration", value: 30, min: 15, max: 60, step: 5 },
  holdDuration: { type: "number", label: "Hold Duration", value: 45, min: 20, max: 80, step: 5 },
  fallStagger: { type: "number", label: "Fall Stagger", value: 17, min: 2, max: 20, step: 1 },
  fallDistance: { type: "number", label: "Fall Distance", value: 750, min: 200, max: 800, step: 50 },
  blurIntensity: { type: "number", label: "Blur Intensity", value: 16, min: 4, max: 25, step: 1 },
  trailOpacity: { type: "number", label: "Trail Opacity", value: 0.45, min: 0.1, max: 0.6, step: 0.05 },
  anticipationAmount: { type: "number", label: "Anticipation Amount", value: 18, min: 3, max: 20, step: 1 },
  maxRotation: { type: "number", label: "Max Rotation", value: 24, min: 8, max: 35, step: 2 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const entranceDuration = (props.entranceDuration ?? SCENE_PARAMS.entranceDuration.value);
  const holdDuration = (props.holdDuration ?? SCENE_PARAMS.holdDuration.value);
  const fallStagger = (props.fallStagger ?? SCENE_PARAMS.fallStagger.value);
  const fallDistance = (props.fallDistance ?? SCENE_PARAMS.fallDistance.value);
  const blurIntensity = (props.blurIntensity ?? SCENE_PARAMS.blurIntensity.value);
  const trailOpacity = (props.trailOpacity ?? SCENE_PARAMS.trailOpacity.value);
  const anticipationAmount = (props.anticipationAmount ?? SCENE_PARAMS.anticipationAmount.value);
  const maxRotation = (props.maxRotation ?? SCENE_PARAMS.maxRotation.value);
  
  const rawText = (props.text ?? SCENE_PARAMS.text.value);
  const text = rawText.charAt(0).toUpperCase() + rawText.slice(1).toLowerCase();
  const letters = text.split("");
  const totalLetters = letters.length;
  
  const exitStart = entranceDuration + holdDuration;
  const anticipationDuration = 35;
  const fallDuration = 75;
  
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 28, stiffness: 70 }
  });
  
  const entranceOpacity = interpolate(adjustedFrame, [0, entranceDuration * 0.6], [0, 1], { extrapolateRight: "clamp" });
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.95, 1]);
  
  const fontSize = minDim * 0.22;
  const dotSize = fontSize * 0.11;
  
  const rotationDirections = [-1, 1, -1, 1, -1];
  const horizontalDrifts = [20, -15, 25, -28, 18];
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        position: "relative",
      }}>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          position: "relative",
          opacity: entranceOpacity,
          transform: "scale(" + entranceScale + ")",
        }}>
          {letters.map((letter, i) => {
            const reverseIndex = totalLetters - 1 - i;
            const letterExitStart = exitStart + (reverseIndex * fallStagger);
            const anticipationStart = letterExitStart;
            const anticipationEnd = anticipationStart + anticipationDuration;
            const fallStart = anticipationEnd;
            const fallEnd = fallStart + fallDuration;
            
            const rotationDir = rotationDirections[i % rotationDirections.length];
            const horizontalDrift = horizontalDrifts[i % horizontalDrifts.length];
            
            const anticipationRaw = interpolate(
              adjustedFrame,
              [anticipationStart, anticipationEnd],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            const anticipationEased = anticipationRaw < 0.5 
              ? 4 * anticipationRaw * anticipationRaw * anticipationRaw 
              : 1 - Math.pow(-2 * anticipationRaw + 2, 3) / 2;
            const anticipationY = -anticipationEased * anticipationAmount;
            const anticipationRotation = anticipationEased * rotationDir * -3;
            
            const fallRaw = interpolate(
              adjustedFrame,
              [fallStart, fallEnd],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            const fallEased = fallRaw < 0.5 
              ? 2 * fallRaw * fallRaw 
              : 1 - Math.pow(-2 * fallRaw + 2, 2) / 2;
            const fallAccelerated = fallEased + (fallEased * fallEased * 0.2);
            
            let letterY = anticipationY;
            let letterRotation = anticipationRotation;
            let letterX = 0;
            
            if (fallRaw > 0) {
              letterY = fallAccelerated * fallDistance;
              const rotationEased = fallRaw < 0.5 
                ? 2 * fallRaw * fallRaw 
                : 1 - Math.pow(-2 * fallRaw + 2, 2) / 2;
              letterRotation = rotationEased * maxRotation * rotationDir;
              const driftEased = fallRaw < 0.5 
                ? 2 * fallRaw * fallRaw 
                : 1 - Math.pow(-2 * fallRaw + 2, 2) / 2;
              letterX = driftEased * horizontalDrift;
            }
            
            const letterOpacity = interpolate(fallRaw, [0, 0.5, 0.85, 1], [1, 0.95, 0.6, 0], { extrapolateRight: "clamp" });
            const letterBlur = fallRaw * fallRaw * blurIntensity;
            
            const isI = letter.toLowerCase() === "i";
            
            const trailCount = 3;
            const trails = [];
            
            if (fallRaw > 0.08 && fallRaw < 0.92) {
              for (let t = 0; t < trailCount; t++) {
                const trailDelay = (t + 1) * 0.1;
                const trailFallRaw = Math.max(0, fallRaw - trailDelay);
                const trailEased = trailFallRaw < 0.5 
                  ? 2 * trailFallRaw * trailFallRaw 
                  : 1 - Math.pow(-2 * trailFallRaw + 2, 2) / 2;
                const trailY = (trailEased + trailEased * trailEased * 0.2) * fallDistance;
                const trailX = trailEased * horizontalDrift * 0.85;
                const trailRotation = trailEased * maxRotation * rotationDir * 0.8;
                const trailOpacityValue = interpolate(
                  fallRaw,
                  [0.08, 0.25, 0.55, 0.85],
                  [0, trailOpacity * (1 - t * 0.25), trailOpacity * (0.7 - t * 0.2), 0],
                  { extrapolateRight: "clamp" }
                );
                const trailBlur = (t + 1) * 2.5 + letterBlur * 0.4;
                
                trails.push(
                  <span
                    key={"trail-" + i + "-" + t}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                      fontSize: fontSize,
                      fontWeight: 700,
                      color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                      letterSpacing: "-0.02em",
                      transform: "translateY(" + trailY + "px) translateX(" + trailX + "px) rotate(" + trailRotation + "deg)",
                      opacity: trailOpacityValue,
                      filter: "blur(" + trailBlur + "px)",
                      pointerEvents: "none",
                    }}
                  >
                    {isI ? "ı" : letter}
                  </span>
                );
              }
            }
            
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {trails}
                
                <span
                  style={{
                    position: "relative",
                    fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                    fontSize: fontSize,
                    fontWeight: 700,
                    color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                    letterSpacing: "-0.02em",
                    transform: "translateY(" + letterY + "px) translateX(" + letterX + "px) rotate(" + letterRotation + "deg)",
                    opacity: letterOpacity,
                    filter: "blur(" + letterBlur + "px)",
                    display: "inline-block",
                    transformOrigin: "center bottom",
                  }}
                >
                  {isI ? (
                    <span style={{ position: "relative", display: "inline-block" }}>
                      <span style={{ opacity: 0 }}>{letter}</span>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                        <span style={{
                          width: dotSize,
                          height: dotSize,
                          backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                          borderRadius: fontSize * 0.012,
                          boxShadow: "0 0 " + (dotSize * 0.35) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "50",
                          marginTop: fontSize * 0.08,
                          transform: "rotate(6deg)",
                        }} />
                        <span style={{
                          width: fontSize * 0.08,
                          height: fontSize * 0.52,
                          backgroundColor: (props.textColor ?? SCENE_PARAMS.textColor.value),
                          borderRadius: fontSize * 0.02,
                          marginTop: fontSize * 0.04,
                        }} />
                      </span>
                    </span>
                  ) : letter}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

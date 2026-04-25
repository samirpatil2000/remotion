// Template: heart-crush-button
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  heartColor: { type: "color", label: "Heart Color", value: "#e63950" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  circleBackground: { type: "color", label: "Circle Background", value: "#ffc0cb" },
  accentColor: { type: "color", label: "Accent Color", value: "#f5a3b0" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  pulseIntensity: { type: "number", label: "Pulse Intensity", value: 1.08, min: 1, max: 1.3, step: 0.02 },
  toggleFrame: { type: "number", label: "Toggle Frame", value: 40, min: 20, max: 90, step: 5 },
  separationDistance: { type: "number", label: "Separation Distance", value: 35, min: 20, max: 80, step: 5 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const toggleFrame = SCENE_PARAMS.toggleFrame.value;
  const separationDist = SCENE_PARAMS.separationDistance.value;
  
  // State transitions - each happens only once:
  // Phase 1 (0 to toggleFrame): Outline only heart (empty inside)
  // Phase 2 (toggleFrame to toggleFrame*2): Filled heart with pulse
  // Phase 3 (toggleFrame*2 onwards): Broken heart that splits apart
  let heartState = "outline";
  if (adjustedFrame >= toggleFrame && adjustedFrame < toggleFrame * 2) {
    heartState = "filled";
  } else if (adjustedFrame >= toggleFrame * 2) {
    heartState = "broken";
  }
  
  // Entrance animation for circle background
  const circleEntrance = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 20, stiffness: 90 } 
  });
  const circleOpacity = interpolate(circleEntrance, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const circleScale = interpolate(circleEntrance, [0, 1], [0.8, 1], { extrapolateRight: "clamp" });
  
  // Heart entrance with elastic overshoot (starts slightly after circle)
  const heartEntranceFrame = Math.max(0, adjustedFrame - 9);
  const heartEntrance = spring({ 
    frame: heartEntranceFrame, 
    fps, 
    config: { damping: 10, stiffness: 180 } 
  });
  const heartEntranceScale = interpolate(heartEntrance, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const heartOpacity = interpolate(heartEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  
  // Click bounce animation at first toggle (outline to filled)
  let clickBounce1 = 1;
  if (adjustedFrame >= toggleFrame && adjustedFrame < toggleFrame + 10) {
    const bounceProgress = (adjustedFrame - toggleFrame) / 10;
    clickBounce1 = 1 - 0.18 * Math.sin(bounceProgress * Math.PI);
  }
  
  // Click bounce animation at second toggle (filled to broken)
  let clickBounce2 = 1;
  if (adjustedFrame >= toggleFrame * 2 && adjustedFrame < toggleFrame * 2 + 12) {
    const bounceProgress = (adjustedFrame - toggleFrame * 2) / 12;
    clickBounce2 = 1 - 0.2 * Math.sin(bounceProgress * Math.PI);
  }
  
  const clickBounce = clickBounce1 * clickBounce2;
  
  // Heartbeat pulse - only during filled state
  const pulseStartFrame = toggleFrame + 15;
  const pulseCycleLength = fps * 0.8;
  
  let pulseScale = 1;
  if (heartState === "filled" && adjustedFrame > pulseStartFrame) {
    const frameInPulse = (adjustedFrame - pulseStartFrame) % pulseCycleLength;
    
    if (frameInPulse < 5) {
      const beatProgress = frameInPulse / 5;
      pulseScale = 1 + (SCENE_PARAMS.pulseIntensity.value - 1) * Math.sin(beatProgress * Math.PI);
    } else if (frameInPulse < 8) {
      pulseScale = 1;
    } else if (frameInPulse < 11) {
      const beatProgress = (frameInPulse - 8) / 3;
      pulseScale = 1 + (0.04) * Math.sin(beatProgress * Math.PI);
    } else {
      pulseScale = 1;
    }
  }
  
  // Circle subtle pulse in sync
  const circlePulseScale = 1 + (pulseScale - 1) * 0.3;
  
  // Combined scales
  const finalHeartScale = heartEntranceScale * pulseScale * clickBounce;
  const finalCircleScale = circleScale * circlePulseScale;
  
  // Heart dimensions
  const heartSize = minDim * 0.28;
  const circleSize = heartSize * 1.8;
  
  // Break animation - separation and rotation for split heart
  const breakStartFrame = toggleFrame * 2;
  const breakDuration = 25;
  
  // Left half animation
  const leftSeparation = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, -separationDist],
    { extrapolateRight: "clamp" }
  );
  const leftRotation = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, -12],
    { extrapolateRight: "clamp" }
  );
  const leftDrop = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, 8],
    { extrapolateRight: "clamp" }
  );
  
  // Right half animation
  const rightSeparation = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, separationDist],
    { extrapolateRight: "clamp" }
  );
  const rightRotation = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, 10],
    { extrapolateRight: "clamp" }
  );
  const rightDrop = interpolate(
    adjustedFrame,
    [breakStartFrame, breakStartFrame + breakDuration],
    [0, 5],
    { extrapolateRight: "clamp" }
  );
  
  // Shake effect during break
  let shakeOffset = 0;
  if (adjustedFrame >= breakStartFrame && adjustedFrame < breakStartFrame + 15) {
    const shakeIntensity = interpolate(adjustedFrame, [breakStartFrame, breakStartFrame + 15], [6, 0], { extrapolateRight: "clamp" });
    shakeOffset = Math.sin(adjustedFrame * 4) * shakeIntensity;
  }
  
  // Glow effect for filled heart
  const glowCycleLength = fps * 1.2;
  let glowBlur = 0;
  if (heartState === "filled" && adjustedFrame > toggleFrame + 10) {
    const glowFrame = (adjustedFrame - toggleFrame - 10) % glowCycleLength;
    const glowProgress = glowFrame / glowCycleLength;
    glowBlur = 8 * Math.sin(glowProgress * Math.PI);
  }
  
  // Broken heart glow (red/painful)
  let brokenGlow = 0;
  if (heartState === "broken" && adjustedFrame > breakStartFrame + 10) {
    const brokenGlowFrame = (adjustedFrame - breakStartFrame - 10) % (fps * 0.7);
    const brokenGlowProgress = brokenGlowFrame / (fps * 0.7);
    brokenGlow = 8 * Math.sin(brokenGlowProgress * Math.PI);
  }
  
  // Full heart path
  const fullHeartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  
  // Jagged crack path that stays within the heart (no sticking out ends)
  const crackPath = "M12 5 L11.2 6.5 L12.8 8 L10.8 10 L13.2 12 L10.5 14 L12.8 16 L11 18 L12 19.5";
  
  // Left half with jagged edge - crack stays within heart bounds
  const leftHalfPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09L12 5 L11.2 6.5 L12.8 8 L10.8 10 L13.2 12 L10.5 14 L12.8 16 L11 18 L12 19.5 L12 21.35Z";
  
  // Right half with jagged edge - crack stays within heart bounds
  const rightHalfPath = "M12 5 L11.2 6.5 L12.8 8 L10.8 10 L13.2 12 L10.5 14 L12.8 16 L11 18 L12 19.5 L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3c-1.74 0-3.41.81-4.5 2.09Z";
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ 
        transform: "scale(" + SCENE_PARAMS.scale.value + ")", 
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {/* Heart Button Container */}
        <div style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          {/* Soft circle background - stays pink always */}
          <div style={{
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            backgroundColor: SCENE_PARAMS.circleBackground.value,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: circleOpacity,
            transform: "scale(" + finalCircleScale + ") translateX(" + shakeOffset + "px)",
            boxShadow: "0 " + (minDim * 0.008) + "px " + (minDim * 0.025) + "px rgba(0,0,0,0.08)",
            overflow: "visible",
          }}>
            {heartState === "outline" ? (
              /* Outline only heart - empty inside */
              <svg 
                width={heartSize} 
                height={heartSize} 
                viewBox="0 0 24 24"
                style={{ 
                  overflow: "visible",
                  opacity: heartOpacity,
                  transform: "scale(" + finalHeartScale + ")",
                }}
              >
                <path
                  d={fullHeartPath}
                  fill="none"
                  stroke={SCENE_PARAMS.heartColor.value}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            ) : heartState === "filled" ? (
              /* Filled heart with gradient */
              <svg 
                width={heartSize} 
                height={heartSize} 
                viewBox="0 0 24 24"
                style={{ 
                  overflow: "visible",
                  opacity: heartOpacity,
                  transform: "scale(" + finalHeartScale + ")",
                  filter: "drop-shadow(0 0 " + glowBlur + "px " + SCENE_PARAMS.accentColor.value + ")",
                }}
              >
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={SCENE_PARAMS.accentColor.value} />
                    <stop offset="50%" stopColor={SCENE_PARAMS.heartColor.value} />
                    <stop offset="100%" stopColor="#c42d44" />
                  </linearGradient>
                </defs>
                <path
                  d={fullHeartPath}
                  fill="url(#heartGradient)"
                />
              </svg>
            ) : (
              /* Broken heart - two halves with jagged crack edges */
              <div style={{
                position: "relative",
                width: heartSize,
                height: heartSize,
                opacity: heartOpacity,
                transform: "scale(" + finalHeartScale + ")",
              }}>
                {/* Left half with jagged crack edge */}
                <svg 
                  width={heartSize} 
                  height={heartSize} 
                  viewBox="0 0 24 24"
                  style={{ 
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "visible",
                    transform: "translateX(" + leftSeparation + "px) translateY(" + leftDrop + "px) rotate(" + leftRotation + "deg)",
                    transformOrigin: "center center",
                    filter: "drop-shadow(0 0 " + brokenGlow + "px " + SCENE_PARAMS.heartColor.value + ")",
                  }}
                >
                  <defs>
                    <linearGradient id="leftHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={SCENE_PARAMS.accentColor.value} />
                      <stop offset="50%" stopColor={SCENE_PARAMS.heartColor.value} />
                      <stop offset="100%" stopColor="#c42d44" />
                    </linearGradient>
                  </defs>
                  {/* Left half filled */}
                  <path
                    d={leftHalfPath}
                    fill="url(#leftHeartGrad)"
                  />
                </svg>
                
                {/* Right half with jagged crack edge */}
                <svg 
                  width={heartSize} 
                  height={heartSize} 
                  viewBox="0 0 24 24"
                  style={{ 
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "visible",
                    transform: "translateX(" + rightSeparation + "px) translateY(" + rightDrop + "px) rotate(" + rightRotation + "deg)",
                    transformOrigin: "center center",
                    filter: "drop-shadow(0 0 " + brokenGlow + "px " + SCENE_PARAMS.heartColor.value + ")",
                  }}
                >
                  <defs>
                    <linearGradient id="rightHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={SCENE_PARAMS.accentColor.value} />
                      <stop offset="50%" stopColor={SCENE_PARAMS.heartColor.value} />
                      <stop offset="100%" stopColor="#c42d44" />
                    </linearGradient>
                  </defs>
                  {/* Right half filled */}
                  <path
                    d={rightHalfPath}
                    fill="url(#rightHeartGrad)"
                  />
                </svg>
                
                {/* Floating crack debris particles */}
                {[...Array(6)].map((_, i) => {
                  const particleDelay = breakStartFrame + i * 3;
                  const particleProgress = interpolate(
                    adjustedFrame,
                    [particleDelay, particleDelay + 20],
                    [0, 1],
                    { extrapolateRight: "clamp" }
                  );
                  const particleX = (i % 2 === 0 ? -1 : 1) * (10 + i * 8) * particleProgress;
                  const particleY = -15 * particleProgress + 30 * particleProgress * particleProgress;
                  const particleOpacity = interpolate(particleProgress, [0, 0.2, 1], [0, 1, 0], { extrapolateRight: "clamp" });
                  const particleRotation = particleProgress * (i % 2 === 0 ? 180 : -180);
                  
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 4 + (i % 3) * 2,
                        height: 4 + (i % 3) * 2,
                        backgroundColor: SCENE_PARAMS.heartColor.value,
                        borderRadius: i % 2 === 0 ? "50%" : "0",
                        transform: "translate(" + particleX + "px, " + particleY + "px) rotate(" + particleRotation + "deg)",
                        opacity: particleOpacity,
                        boxShadow: "0 0 4px " + SCENE_PARAMS.accentColor.value,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

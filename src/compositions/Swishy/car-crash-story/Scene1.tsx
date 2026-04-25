// Template: car-crash-story
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Scene Title
  sceneTitle: { type: "text", label: "Scene Title", value: "A Moment in Time" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  skyGradientTop: { type: "color", label: "Sky Top", value: "#1e3a5f" },
  skyGradientBottom: { type: "color", label: "Sky Bottom", value: "#f97316" },
  buildingColor: { type: "color", label: "Building Color", value: "#1e293b" },
  streetColor: { type: "color", label: "Street Color", value: "#334155" },
  sidewalkColor: { type: "color", label: "Sidewalk Color", value: "#475569" },
  girlDressColor: { type: "color", label: "Girl Dress", value: "#f8fafc" },
  girlHairColor: { type: "color", label: "Girl Hair", value: "#78350f" },
  carColor: { type: "color", label: "Car Color", value: "#1f2937" },
  headlightColor: { type: "color", label: "Headlight", value: "#fbbf24" },
  lampLightColor: { type: "color", label: "Lamp Light", value: "#fcd34d" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  
  // Animation
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  slowMotionIntensity: { type: "number", label: "Slow Motion Intensity", value: 0.15, min: 0.05, max: 0.3, step: 0.05 },
  
  // Toggles
  showTitle: { type: "boolean", label: "Show Title", value: true },
  showVignette: { type: "boolean", label: "Show Vignette", value: true },
  showLensFlare: { type: "boolean", label: "Show Lens Flare", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  // Scene phases
  const walkingPhase = adjustedFrame < 60; // Girl walking peacefully
  const tensionPhase = adjustedFrame >= 60 && adjustedFrame < 90; // Car approaching
  const impactPhase = adjustedFrame >= 90 && adjustedFrame < 130; // Slow motion impact
  const aftermathPhase = adjustedFrame >= 130; // Emotional aftermath
  
  // Girl walking animation
  const girlWalkX = interpolate(
    adjustedFrame,
    [0, 60, 90, 130, 180],
    [width * 0.2, width * 0.45, width * 0.52, width * 0.55, width * 0.55],
    { extrapolateRight: "clamp" }
  );
  
  // Walking bob animation
  const walkBob = walkingPhase ? Math.sin(adjustedFrame * 0.4) * 3 : 0;
  
  // Hair sway
  const hairSway = Math.sin(adjustedFrame * 0.3) * 2;
  
  // Car animation - approaches from right
  const carStartX = width * 1.3;
  const carImpactX = width * 0.48;
  const carEndX = width * 0.35;
  
  const carX = interpolate(
    adjustedFrame,
    [40, 90, 130, 180],
    [carStartX, carImpactX, carEndX, carEndX - 20],
    { extrapolateRight: "clamp" }
  );
  
  // Slow motion effect during impact
  const slowMoProgress = interpolate(
    adjustedFrame,
    [85, 95, 125, 135],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Girl reaction during impact - slight push back
  const girlPushBack = interpolate(
    adjustedFrame,
    [90, 110, 130],
    [0, -15, -20],
    { extrapolateRight: "clamp" }
  );
  
  const girlRotation = interpolate(
    adjustedFrame,
    [90, 110, 130, 160],
    [0, -8, -12, -8],
    { extrapolateRight: "clamp" }
  );
  
  // Screen shake during impact
  const shakeIntensity = interpolate(
    adjustedFrame,
    [88, 95, 110],
    [0, 8, 0],
    { extrapolateRight: "clamp" }
  );
  const shakeX = impactPhase ? Math.sin(adjustedFrame * 2) * shakeIntensity : 0;
  const shakeY = impactPhase ? Math.cos(adjustedFrame * 3) * shakeIntensity * 0.5 : 0;
  
  // Dramatic zoom during slow motion
  const zoomScale = interpolate(
    adjustedFrame,
    [85, 100, 125, 140],
    [1, 1.15, 1.15, 1.05],
    { extrapolateRight: "clamp" }
  );
  
  // Vignette intensity
  const vignetteIntensity = interpolate(
    adjustedFrame,
    [0, 90, 110, 180],
    [0.3, 0.3, 0.6, 0.5],
    { extrapolateRight: "clamp" }
  );
  
  // Title animation
  const titleOpacity = SCENE_PARAMS.showTitle.value ? interpolate(
    adjustedFrame,
    [150, 165, 200, 210],
    [0, 1, 1, 0.8],
    { extrapolateRight: "clamp" }
  ) : 0;
  
  const titleY = interpolate(
    adjustedFrame,
    [150, 170],
    [30, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Street lamp flicker
  const lampFlicker = 0.8 + Math.sin(adjustedFrame * 0.5) * 0.1 + Math.random() * 0.1;
  
  // Lens flare
  const flareOpacity = SCENE_PARAMS.showLensFlare.value ? interpolate(
    adjustedFrame,
    [90, 100, 120],
    [0, 0.6, 0],
    { extrapolateRight: "clamp" }
  ) : 0;
  
  // Evening sky gradient position (subtle animation)
  const skyShift = interpolate(adjustedFrame, [0, 180], [0, 5], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, overflow: "hidden" }}>
      {/* Main scene container with shake and zoom */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `scale(${zoomScale * SCENE_PARAMS.scale.value}) translate(${shakeX}px, ${shakeY}px)`,
        transformOrigin: "50% 60%",
      }}>
        
        {/* Evening Sky */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "55%",
          background: `linear-gradient(180deg, ${SCENE_PARAMS.skyGradientTop.value} ${skyShift}%, #4a5568 50%, ${SCENE_PARAMS.skyGradientBottom.value} 100%)`,
        }} />
        
        {/* Distant buildings silhouette */}
        <div style={{ position: "absolute", bottom: "45%", left: 0, width: "100%", height: "20%" }}>
          {[...Array(12)].map((_, i) => {
            const buildingHeight = 40 + Math.sin(i * 2.5) * 25 + Math.cos(i * 1.3) * 15;
            const buildingWidth = 6 + (i % 3) * 2;
            return (
              <div key={i} style={{
                position: "absolute",
                bottom: 0,
                left: `${i * 8.5}%`,
                width: `${buildingWidth}%`,
                height: `${buildingHeight}%`,
                backgroundColor: SCENE_PARAMS.buildingColor.value,
                opacity: 0.9,
              }}>
                {/* Windows */}
                {[...Array(Math.floor(buildingHeight / 12))].map((_, j) => (
                  <div key={j} style={{
                    position: "absolute",
                    bottom: `${15 + j * 22}%`,
                    left: "20%",
                    width: "60%",
                    height: "8%",
                    backgroundColor: Math.random() > 0.4 ? "#fcd34d" : "#374151",
                    opacity: Math.random() > 0.4 ? 0.7 : 0.3,
                  }} />)
                )}
              </div>
            );
          })}
        </div>
        
        {/* Street */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "45%",
          backgroundColor: SCENE_PARAMS.streetColor.value,
        }}>
          {/* Road markings */}
          <div style={{
            position: "absolute",
            top: "40%",
            left: 0,
            width: "100%",
            height: "3px",
            background: `repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 40px, transparent 40px, transparent 80px)`,
            opacity: 0.6,
          }} />
          
          {/* Sidewalk */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "25%",
            backgroundColor: SCENE_PARAMS.sidewalkColor.value,
          }} />
        </div>
        
        {/* Street Lamps */}
        {[0.15, 0.5, 0.85].map((pos, i) => (
          <div key={i} style={{ position: "absolute", bottom: "43%", left: `${pos * 100}%` }}>
            {/* Lamp post */}
            <div style={{
              width: minDim * 0.008,
              height: minDim * 0.18,
              backgroundColor: "#1f2937",
              position: "absolute",
              bottom: 0,
            }} />
            {/* Lamp head */}
            <div style={{
              width: minDim * 0.025,
              height: minDim * 0.015,
              backgroundColor: "#374151",
              position: "absolute",
              bottom: minDim * 0.17,
              left: -minDim * 0.008,
              borderRadius: minDim * 0.005,
            }} />
            {/* Light glow */}
            <div style={{
              width: minDim * 0.12,
              height: minDim * 0.12,
              background: `radial-gradient(circle, ${SCENE_PARAMS.lampLightColor.value}40 0%, transparent 70%)`,
              position: "absolute",
              bottom: minDim * 0.14,
              left: -minDim * 0.05,
              opacity: lampFlicker,
            }} />
          </div>
        ))}
        
        {/* Trees silhouettes */}
        {[0.08, 0.25, 0.7, 0.92].map((pos, i) => (
          <div key={i} style={{
            position: "absolute",
            bottom: "42%",
            left: `${pos * 100}%`,
          }}>
            {/* Trunk */}
            <div style={{
              width: minDim * 0.015,
              height: minDim * 0.08,
              backgroundColor: "#1f2937",
              position: "absolute",
              bottom: 0,
            }} />
            {/* Foliage */}
            <div style={{
              width: minDim * 0.1,
              height: minDim * 0.12,
              backgroundColor: "#1e3a3a",
              borderRadius: "50%",
              position: "absolute",
              bottom: minDim * 0.06,
              left: -minDim * 0.04,
              opacity: 0.8,
            }} />
          </div>
        ))}
        
        {/* Car */}
        <div style={{
          position: "absolute",
          bottom: "30%",
          left: carX,
          transform: "translateX(-50%)",
        }}>
          {/* Car body */}
          <div style={{
            width: minDim * 0.18,
            height: minDim * 0.06,
            backgroundColor: SCENE_PARAMS.carColor.value,
            borderRadius: minDim * 0.015,
            position: "relative",
          }}>
            {/* Car roof */}
            <div style={{
              position: "absolute",
              top: -minDim * 0.035,
              left: "20%",
              width: "50%",
              height: minDim * 0.04,
              backgroundColor: SCENE_PARAMS.carColor.value,
              borderRadius: `${minDim * 0.015}px ${minDim * 0.015}px 0 0`,
            }} />
            {/* Windows */}
            <div style={{
              position: "absolute",
              top: -minDim * 0.03,
              left: "23%",
              width: "44%",
              height: minDim * 0.025,
              backgroundColor: "#1e40af",
              borderRadius: minDim * 0.008,
              opacity: 0.6,
            }} />
            {/* Headlights */}
            <div style={{
              position: "absolute",
              left: -minDim * 0.008,
              top: "30%",
              width: minDim * 0.015,
              height: minDim * 0.02,
              backgroundColor: SCENE_PARAMS.headlightColor.value,
              borderRadius: minDim * 0.005,
              boxShadow: `0 0 ${minDim * 0.03}px ${SCENE_PARAMS.headlightColor.value}`,
            }} />
            {/* Headlight beam */}
            <div style={{
              position: "absolute",
              left: -minDim * 0.25,
              top: "20%",
              width: minDim * 0.25,
              height: minDim * 0.04,
              background: `linear-gradient(90deg, transparent 0%, ${SCENE_PARAMS.headlightColor.value}30 100%)`,
              opacity: 0.5,
            }} />
            {/* Wheels */}
            <div style={{
              position: "absolute",
              bottom: -minDim * 0.012,
              left: "15%",
              width: minDim * 0.025,
              height: minDim * 0.025,
              backgroundColor: "#111827",
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute",
              bottom: -minDim * 0.012,
              right: "15%",
              width: minDim * 0.025,
              height: minDim * 0.025,
              backgroundColor: "#111827",
              borderRadius: "50%",
            }} />
          </div>
        </div>
        
        {/* Girl */}
        <div style={{
          position: "absolute",
          bottom: "22%",
          left: girlWalkX + girlPushBack,
          transform: `translateX(-50%) rotate(${girlRotation}deg)`,
          transformOrigin: "bottom center",
        }}>
          {/* Girl's shadow */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.01,
            left: "50%",
            transform: "translateX(-50%)",
            width: minDim * 0.05,
            height: minDim * 0.015,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "50%",
          }} />
          
          {/* Legs */}
          <div style={{ position: "absolute", bottom: 0, left: "35%" }}>
            <div style={{
              width: minDim * 0.012,
              height: minDim * 0.045,
              backgroundColor: "#fcd9b6",
              transform: `rotate(${walkingPhase ? Math.sin(adjustedFrame * 0.4) * 15 : 0}deg)`,
              transformOrigin: "top center",
            }} />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: "55%" }}>
            <div style={{
              width: minDim * 0.012,
              height: minDim * 0.045,
              backgroundColor: "#fcd9b6",
              transform: `rotate(${walkingPhase ? -Math.sin(adjustedFrame * 0.4) * 15 : 5}deg)`,
              transformOrigin: "top center",
            }} />
          </div>
          
          {/* Dress/Body */}
          <div style={{
            position: "absolute",
            bottom: minDim * 0.035,
            left: "50%",
            transform: "translateX(-50%)",
            width: minDim * 0.04,
            height: minDim * 0.05,
            backgroundColor: SCENE_PARAMS.girlDressColor.value,
            borderRadius: `${minDim * 0.015}px ${minDim * 0.015}px ${minDim * 0.02}px ${minDim * 0.02}px`,
          }} />
          
          {/* Arms */}
          <div style={{
            position: "absolute",
            bottom: minDim * 0.06,
            left: "20%",
            width: minDim * 0.008,
            height: minDim * 0.035,
            backgroundColor: "#fcd9b6",
            transform: `rotate(${walkingPhase ? -Math.sin(adjustedFrame * 0.4) * 20 : -30}deg)`,
            transformOrigin: "top center",
            borderRadius: minDim * 0.004,
          }} />
          <div style={{
            position: "absolute",
            bottom: minDim * 0.06,
            right: "20%",
            width: minDim * 0.008,
            height: minDim * 0.035,
            backgroundColor: "#fcd9b6",
            transform: `rotate(${walkingPhase ? Math.sin(adjustedFrame * 0.4) * 20 : 25}deg)`,
            transformOrigin: "top center",
            borderRadius: minDim * 0.004,
          }} />
          
          {/* Head */}
          <div style={{
            position: "absolute",
            bottom: minDim * 0.08 + walkBob,
            left: "50%",
            transform: "translateX(-50%)",
            width: minDim * 0.028,
            height: minDim * 0.032,
            backgroundColor: "#fcd9b6",
            borderRadius: "50%",
          }} />
          
          {/* Hair */}
          <div style={{
            position: "absolute",
            bottom: minDim * 0.085 + walkBob,
            left: "50%",
            transform: `translateX(-50%) rotate(${hairSway}deg)`,
            width: minDim * 0.035,
            height: minDim * 0.045,
            backgroundColor: SCENE_PARAMS.girlHairColor.value,
            borderRadius: `${minDim * 0.015}px ${minDim * 0.015}px ${minDim * 0.02}px ${minDim * 0.02}px`,
          }} />
        </div>
        
        {/* Impact flash */}
        {impactPhase && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            opacity: interpolate(adjustedFrame, [90, 95, 100], [0, 0.4, 0], { extrapolateRight: "clamp" }),
          }} />
        )}
      </div>
      
      {/* Cinematic letterbox bars */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "8%",
        backgroundColor: "#000000",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "8%",
        backgroundColor: "#000000",
      }} />
      
      {/* Vignette */}
      {SCENE_PARAMS.showVignette.value && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignetteIntensity}) 100%)`,
          pointerEvents: "none",
        }} />
      )}
      
      {/* Lens flare during impact */}
      {SCENE_PARAMS.showLensFlare.value && flareOpacity > 0 && (
        <div style={{
          position: "absolute",
          top: "35%",
          left: "45%",
          width: minDim * 0.3,
          height: minDim * 0.3,
          background: `radial-gradient(circle, ${SCENE_PARAMS.headlightColor.value}60 0%, transparent 60%)`,
          opacity: flareOpacity,
          transform: "translate(-50%, -50%)",
        }} />
      )}
      
      {/* Slow motion indicator overlay */}
      {slowMoProgress > 0 && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, ${slowMoProgress * 0.1}) 50%, transparent 100%)`,
          pointerEvents: "none",
        }} />
      )}
      
      {/* Title */}
      {SCENE_PARAMS.showTitle.value && titleOpacity > 0 && (
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          <h1 style={{
            color: SCENE_PARAMS.textColor.value,
            fontSize: minDim * 0.055,
            fontWeight: 300,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: minDim * 0.008,
            textTransform: "uppercase",
            margin: 0,
            textShadow: `0 2px 20px rgba(0,0,0,0.8)`,
          }}>
            {SCENE_PARAMS.sceneTitle.value}
          </h1>
          <div style={{
            width: minDim * 0.15,
            height: 1,
            backgroundColor: SCENE_PARAMS.accentColor.value,
            margin: `${minDim * 0.02}px auto 0`,
            opacity: 0.8,
          }} />
        </div>
      )}
    </AbsoluteFill>
  );
}

export default Scene;

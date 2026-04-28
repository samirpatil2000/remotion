// Template: logo-reveal-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Logo Content
  logoText: { type: "text", label: "Logo Letter", value: "V" },
  companyName: { type: "text", label: "Company Name", value: "VENTURE STUDIO" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background Color", value: "#fafafa" },
  shapeColor: { type: "color", label: "Shape Color", value: "#18181b" },
  textColor: { type: "color", label: "Logo Text Color", value: "#ffffff" },
  companyTextColor: { type: "color", label: "Company Text Color", value: "#18181b" },
  
  // Animation Settings
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  rotationSpeed: { type: "number", label: "Rotation Speed", value: 2, min: 0, max: 5, step: 0.1 },
  
  // Shape Settings
  shapeSize: { type: "number", label: "Shape Size", value: 0.2, min: 0.1, max: 0.4, step: 0.02 },
  finalBorderRadius: { type: "number", label: "Final Roundness", value: 0.5, min: 0, max: 0.5, step: 0.05 },
  
  // Shadow Settings
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.25, min: 0, max: 0.5, step: 0.05 },
  
  // Logo Animation
  logoEntranceDelay: { type: "number", label: "Logo Delay (frames)", value: 70, min: 30, max: 100, step: 5 },
  springDamping: { type: "number", label: "Spring Damping", value: 8, min: 5, max: 20, step: 1 },
  springStiffness: { type: "number", label: "Spring Stiffness", value: 100, min: 50, max: 200, step: 10 },
  
  // Typography
  logoFontSize: { type: "number", label: "Logo Font Size", value: 0.08, min: 0.04, max: 0.12, step: 0.01 },
  companyFontSize: { type: "number", label: "Company Font Size", value: 0.04, min: 0.02, max: 0.06, step: 0.005 },
  letterSpacing: { type: "number", label: "Letter Spacing", value: 0.008, min: 0, max: 0.02, step: 0.002 },
  
  // Toggles
  showCompanyName: { type: "boolean", label: "Show Company Name", value: true },
  enableRotation: { type: "boolean", label: "Enable Rotation", value: true },
  showShadow: { type: "boolean", label: "Show Shadow", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const phase1 = interpolate(adjustedFrame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const rotation = (props.enableRotation ?? SCENE_PARAMS.enableRotation.value) ? adjustedFrame * (props.rotationSpeed ?? SCENE_PARAMS.rotationSpeed.value) : 0;
  const shapeSize = minDim * (props.shapeSize ?? SCENE_PARAMS.shapeSize.value);
  
  const borderRadius = interpolate(
    adjustedFrame, 
    [0, 30, 60, 90], 
    [0, shapeSize * 0.2, shapeSize * 0.4, shapeSize * (props.finalBorderRadius ?? SCENE_PARAMS.finalBorderRadius.value)], 
    { extrapolateRight: "clamp" }
  );
  
  const logoDelay = (props.logoEntranceDelay ?? SCENE_PARAMS.logoEntranceDelay.value);
  const logoOpacity = interpolate(adjustedFrame, [logoDelay, logoDelay + 20], [0, 1], { extrapolateRight: "clamp" });
  const logoScale = spring({ 
    frame: Math.max(0, adjustedFrame - logoDelay), 
    fps, 
    config: { 
      damping: (props.springDamping ?? SCENE_PARAMS.springDamping.value), 
      stiffness: (props.springStiffness ?? SCENE_PARAMS.springStiffness.value) 
    } 
  });
  
  const boxShadow = (props.showShadow ?? SCENE_PARAMS.showShadow.value) 
    ? "0 25px 50px -12px rgba(0,0,0," + (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value) + ")"
    : "none";
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ 
        transform: "scale(" + scaleValue + ")", 
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: height * 0.15,
      }}>
        <div style={{
          width: shapeSize,
          height: shapeSize,
          backgroundColor: (props.shapeColor ?? SCENE_PARAMS.shapeColor.value),
          borderRadius: borderRadius,
          transform: "rotate(" + rotation + "deg) scale(" + (0.8 + phase1 * 0.2) + ")",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: boxShadow,
        }}>
          <span style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: minDim * (props.logoFontSize ?? SCENE_PARAMS.logoFontSize.value),
            fontWeight: 700,
            fontFamily: "system-ui",
            opacity: logoOpacity,
            transform: "rotate(" + (-rotation) + "deg) scale(" + logoScale + ")",
          }}>
            {(props.logoText ?? SCENE_PARAMS.logoText.value)}
          </span>
        </div>
        
        {(props.showCompanyName ?? SCENE_PARAMS.showCompanyName.value) && (
          <div style={{
            opacity: logoOpacity,
            transform: "translateY(" + ((1 - logoScale) * 20) + "px)",
          }}>
            <span style={{
              fontSize: minDim * (props.companyFontSize ?? SCENE_PARAMS.companyFontSize.value),
              fontWeight: 600,
              color: (props.companyTextColor ?? SCENE_PARAMS.companyTextColor.value),
              fontFamily: "system-ui",
              letterSpacing: minDim * (props.letterSpacing ?? SCENE_PARAMS.letterSpacing.value),
            }}>
              {(props.companyName ?? SCENE_PARAMS.companyName.value)}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

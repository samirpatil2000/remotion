// Template: spinning-vinyl-player-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  recordImage: { type: "image", label: "Record Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1770879874733-mqhzj5x/f3c464b6-b031-4b03-b728-8f7286edfe16.png" },
  backgroundColor: { type: "color", label: "Background", value: "#e8ffbd" },
  turntableColor: { type: "color", label: "Turntable Base", value: "#e2e8f0" },
  platteColor: { type: "color", label: "Platter Color", value: "#cbd5e1" },
  tonearmColor: { type: "color", label: "Tonearm Color", value: "#1e293b" },
  labelColor: { type: "color", label: "Center Label", value: "#0f172a" },
  highlightColor: { type: "color", label: "Highlight", value: "#ffffff" },
  rotationSpeed: { type: "number", label: "Rotation Speed", value: 1, min: 0.2, max: 3, step: 0.1 },
  highlightIntensity: { type: "number", label: "Highlight Intensity", value: 0.25, min: 0, max: 0.6, step: 0.05 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.15, min: 0, max: 0.4, step: 0.05 },
  showTonearm: { type: "boolean", label: "Show Tonearm", value: true },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  tonearmAngle: { type: "number", label: "Tonearm Angle", value: -28, min: -45, max: -15, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  
  const speed = SCENE_PARAMS.animationSpeed.value;
  const rotSpeed = SCENE_PARAMS.rotationSpeed.value;
  
  // Continuous rotation - 360 degrees per 3 seconds at base speed
  const rotationDuration = fps * 3;
  const rotation = ((frame * speed * rotSpeed) % rotationDuration) / rotationDuration * 360;
  
  // Highlight angle moves with rotation but slower for realistic light sweep
  const highlightAngle = ((frame * speed * 0.5) % (fps * 6)) / (fps * 6) * 360;
  
  // Tonearm is STATIONARY - resting on the outer portion of the record
  // No animation, no movement - just a fixed position
  const tonearmAngle = SCENE_PARAMS.tonearmAngle.value;
  
  // Sizing
  const turntableSize = minDim * 0.75;
  const recordSize = turntableSize * 0.85;
  const labelSize = recordSize * 0.25;
  const spindleSize = labelSize * 0.15;
  
  // Tonearm dimensions
  const tonearmLength = recordSize * 0.5;
  const tonearmWidth = minDim * 0.025;
  const headshellWidth = minDim * 0.05;
  const headshellHeight = minDim * 0.025;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center",
      }}>
        {/* Turntable Base */}
        <div style={{
          width: turntableSize,
          height: turntableSize,
          backgroundColor: SCENE_PARAMS.turntableColor.value,
          borderRadius: minDim * 0.03,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxShadow: `0 ${minDim * 0.02}px ${minDim * 0.06}px rgba(0,0,0,0.3), 0 ${minDim * 0.005}px ${minDim * 0.015}px rgba(0,0,0,0.2)`,
        }}>
          {/* Platter */}
          <div style={{
            width: recordSize * 1.05,
            height: recordSize * 1.05,
            backgroundColor: SCENE_PARAMS.platteColor.value,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            boxShadow: `inset 0 ${minDim * 0.002}px ${minDim * 0.005}px rgba(0,0,0,0.1)`,
          }}>
            {/* Record */}
            <div style={{
              width: recordSize,
              height: recordSize,
              borderRadius: "50%",
              position: "relative",
              transform: `rotate(${rotation}deg)`,
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
            }}>
              {/* Record Image or Default Grooves */}
              {SCENE_PARAMS.recordImage.value ? (
                <Img
                  src={SCENE_PARAMS.recordImage.value}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `repeating-radial-gradient(
                    circle at center,
                    #1a1a1a 0px,
                    #1a1a1a 2px,
                    #252525 2px,
                    #252525 4px
                  )`,
                }} />
              )}
              
              {/* Vinyl Grooves Overlay (subtle) */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `repeating-radial-gradient(
                  circle at center,
                  transparent 0px,
                  transparent 3px,
                  rgba(0,0,0,0.03) 3px,
                  rgba(0,0,0,0.03) 4px
                )`,
                pointerEvents: "none",
              }} />
              
              {/* Center Label */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: labelSize,
                height: labelSize,
                borderRadius: "50%",
                backgroundColor: SCENE_PARAMS.labelColor.value,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 ${minDim * 0.002}px ${minDim * 0.008}px rgba(0,0,0,0.3)`,
              }}>
                {/* Spindle Hole */}
                <div style={{
                  width: spindleSize,
                  height: spindleSize,
                  borderRadius: "50%",
                  backgroundColor: SCENE_PARAMS.platteColor.value,
                  boxShadow: `inset 0 ${minDim * 0.001}px ${minDim * 0.003}px rgba(0,0,0,0.4)`,
                }} />
              </div>
            </div>
            
            {/* Moving Highlight Overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: recordSize,
              height: recordSize,
              borderRadius: "50%",
              background: `linear-gradient(
                ${highlightAngle}deg,
                transparent 0%,
                transparent 35%,
                rgba(255,255,255,${SCENE_PARAMS.highlightIntensity.value}) 48%,
                rgba(255,255,255,${SCENE_PARAMS.highlightIntensity.value * 1.2}) 50%,
                rgba(255,255,255,${SCENE_PARAMS.highlightIntensity.value}) 52%,
                transparent 65%,
                transparent 100%
              )`,
              pointerEvents: "none",
            }} />
            
            {/* Shadow Overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: recordSize,
              height: recordSize,
              borderRadius: "50%",
              background: `linear-gradient(
                ${highlightAngle + 180}deg,
                transparent 0%,
                transparent 40%,
                rgba(0,0,0,${SCENE_PARAMS.shadowIntensity.value}) 55%,
                rgba(0,0,0,${SCENE_PARAMS.shadowIntensity.value * 0.5}) 70%,
                transparent 85%,
                transparent 100%
              )`,
              pointerEvents: "none",
            }} />
          </div>
          
          {/* Tonearm - STATIONARY, resting on outer edge of record */}
          {SCENE_PARAMS.showTonearm.value && (
            <div style={{
              position: "absolute",
              top: turntableSize * 0.12,
              right: turntableSize * 0.12,
              transformOrigin: "top right",
              transform: `rotate(${tonearmAngle}deg)`,
            }}>
              {/* Tonearm Base */}
              <div style={{
                position: "absolute",
                top: -minDim * 0.02,
                right: -minDim * 0.02,
                width: minDim * 0.045,
                height: minDim * 0.045,
                borderRadius: "50%",
                backgroundColor: SCENE_PARAMS.tonearmColor.value,
                boxShadow: `0 ${minDim * 0.003}px ${minDim * 0.01}px rgba(0,0,0,0.3)`,
              }} />
              
              {/* Tonearm Shaft */}
              <div style={{
                width: tonearmWidth,
                height: tonearmLength,
                backgroundColor: SCENE_PARAMS.tonearmColor.value,
                borderRadius: tonearmWidth / 2,
                position: "absolute",
                top: 0,
                right: minDim * 0.01,
                transformOrigin: "top center",
                boxShadow: `${minDim * 0.003}px ${minDim * 0.005}px ${minDim * 0.015}px rgba(0,0,0,0.25)`,
              }} />
              
              {/* Headshell */}
              <div style={{
                position: "absolute",
                top: tonearmLength - minDim * 0.01,
                right: minDim * 0.01 - headshellWidth / 2 + tonearmWidth / 2,
                width: headshellWidth,
                height: headshellHeight,
                backgroundColor: "#94a3b8",
                borderRadius: minDim * 0.005,
                boxShadow: `0 ${minDim * 0.002}px ${minDim * 0.006}px rgba(0,0,0,0.3)`,
              }}>
                {/* Cartridge Details */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "15%",
                  transform: "translateY(-50%)",
                  width: minDim * 0.006,
                  height: minDim * 0.006,
                  borderRadius: "50%",
                  backgroundColor: "#475569",
                }} />
                <div style={{
                  position: "absolute",
                  top: "50%",
                  right: "15%",
                  transform: "translateY(-50%)",
                  width: minDim * 0.006,
                  height: minDim * 0.006,
                  borderRadius: "50%",
                  backgroundColor: "#475569",
                }} />
              </div>
            </div>
          )}
          
          {/* Tonearm Rest */}
          {SCENE_PARAMS.showTonearm.value && (
            <div style={{
              position: "absolute",
              top: turntableSize * 0.08,
              right: turntableSize * 0.25,
              width: minDim * 0.025,
              height: minDim * 0.04,
              backgroundColor: SCENE_PARAMS.tonearmColor.value,
              borderRadius: minDim * 0.005,
              boxShadow: `0 ${minDim * 0.002}px ${minDim * 0.006}px rgba(0,0,0,0.2)`,
            }} />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

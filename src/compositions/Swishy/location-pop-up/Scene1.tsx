// Template: location-pop-up
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#fafafa" },
  pinColor: { type: "color", label: "Pin Color", value: "#ff0000" },
  popupBgColor: { type: "color", label: "Popup Background", value: "#fffbf5" },
  popupTextColor: { type: "color", label: "Popup Text", value: "#030303" },
  accentColor: { type: "color", label: "Accent Color", value: "#3b82f6" },
  glowColor: { type: "color", label: "Glow Color", value: "#ef4444" },
  locationName: { type: "text", label: "Location Name", value: "San Francisco" },
  locationDetail: { type: "text", label: "Location Detail", value: "California, USA" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  pinSize: { type: "number", label: "Pin Size", value: 1, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  showPulse: { type: "boolean", label: "Show Pulse", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const pinBaseSize = minDim * 0.12 * (props.pinSize ?? SCENE_PARAMS.pinSize.value);
  
  // Pin drop animation (frames 0-25)
  const dropProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 100 }
  });
  
  // First bounce starts after initial drop settles (frame 30)
  const bounce1Start = 30;
  const bounce1Progress = spring({
    frame: Math.max(0, adjustedFrame - bounce1Start),
    fps,
    config: { damping: 14, stiffness: 180 }
  });
  
  // Second gentle bounce (frame 50)
  const bounce2Start = 50;
  const bounce2Progress = spring({
    frame: Math.max(0, adjustedFrame - bounce2Start),
    fps,
    config: { damping: 16, stiffness: 150 }
  });
  
  // Calculate pin Y position
  const initialDrop = interpolate(dropProgress, [0, 1], [-height * 0.4, 0]);
  const bounce1Y = adjustedFrame >= bounce1Start 
    ? interpolate(bounce1Progress, [0, 0.3, 1], [0, -minDim * 0.06, 0])
    : 0;
  const bounce2Y = adjustedFrame >= bounce2Start 
    ? interpolate(bounce2Progress, [0, 0.3, 1], [0, -minDim * 0.03, 0])
    : 0;
  
  const pinY = initialDrop + bounce1Y + bounce2Y;
  
  // Pin scale squash on landing
  const squash1 = adjustedFrame >= bounce1Start && adjustedFrame < bounce1Start + 8
    ? interpolate(adjustedFrame, [bounce1Start, bounce1Start + 4, bounce1Start + 8], [1, 1.15, 1])
    : 1;
  const squash2 = adjustedFrame >= bounce2Start && adjustedFrame < bounce2Start + 6
    ? interpolate(adjustedFrame, [bounce2Start, bounce2Start + 3, bounce2Start + 6], [1, 1.08, 1])
    : 1;
  const pinScaleX = squash1 * squash2;
  const pinScaleY = 1 / pinScaleX;
  
  // Popup animation (appears after pin lands)
  const popupStart = 55;
  const popupProgress = spring({
    frame: Math.max(0, adjustedFrame - popupStart),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const popupScale = interpolate(popupProgress, [0, 1], [0.8, 1]);
  const popupY = interpolate(popupProgress, [0, 1], [15, 0]);
  
  // Pulse animation
  const pulseProgress = interpolate(
    adjustedFrame,
    [60, 120],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const pulseScale = interpolate(pulseProgress, [0, 1], [1, 2.5]);
  const pulseOpacity = interpolate(pulseProgress, [0, 0.2, 1], [0, 0.5, 0]);
  
  const pulse2Progress = interpolate(
    adjustedFrame,
    [80, 140],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const pulse2Scale = interpolate(pulse2Progress, [0, 1], [1, 2]);
  const pulse2Opacity = interpolate(pulse2Progress, [0, 0.2, 1], [0, 0.4, 0]);
  
  // Glow pulse animation
  const glowPulse = interpolate(
    adjustedFrame,
    [40, 50, 60, 70, 80, 90],
    [0.4, 0.8, 0.5, 0.9, 0.6, 0.7]
  );
  const glowOpacity = dropProgress * glowPulse * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value);
  
  // Pin opacity
  const pinOpacity = interpolate(dropProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  
  // Position
  const pinPositionX = width * 0.5;
  const pinPositionY = height * 0.5;
  
  const popupWidth = minDim * 0.55;
  const popupHeight = minDim * 0.18;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        
        {/* Pulse rings */}
        {(props.showPulse ?? SCENE_PARAMS.showPulse.value) && (
          <>
            <div style={{
              position: "absolute",
              top: pinPositionY,
              left: pinPositionX,
              width: pinBaseSize * 1.2,
              height: pinBaseSize * 1.2,
              borderRadius: "50%",
              border: "3px solid " + (props.pinColor ?? SCENE_PARAMS.pinColor.value),
              transform: "translate(-50%, -50%) scale(" + pulseScale + ")",
              opacity: pulseOpacity,
            }} />
            <div style={{
              position: "absolute",
              top: pinPositionY,
              left: pinPositionX,
              width: pinBaseSize * 1.2,
              height: pinBaseSize * 1.2,
              borderRadius: "50%",
              border: "2px solid " + (props.pinColor ?? SCENE_PARAMS.pinColor.value),
              transform: "translate(-50%, -50%) scale(" + pulse2Scale + ")",
              opacity: pulse2Opacity,
            }} />
          </>
        )}
        
        {/* Pin glow */}
        <div style={{
          position: "absolute",
          top: pinPositionY,
          left: pinPositionX,
          width: pinBaseSize * 3,
          height: pinBaseSize * 3,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + " 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity,
          filter: "blur(" + (minDim * 0.03) + "px)",
        }} />
        
        {/* Location Pin */}
        <div style={{
          position: "absolute",
          top: pinPositionY,
          left: pinPositionX,
          transform: "translate(-50%, -100%) translateY(" + pinY + "px) scaleX(" + pinScaleX + ") scaleY(" + pinScaleY + ")",
          transformOrigin: "center bottom",
          opacity: pinOpacity,
        }}>
          {/* Pin shadow */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.01,
            left: "50%",
            width: pinBaseSize * 0.6,
            height: pinBaseSize * 0.15,
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "50%",
            transform: "translateX(-50%)",
            filter: "blur(" + (minDim * 0.008) + "px)",
          }} />
          
          {/* Pin body */}
          <svg
            width={pinBaseSize}
            height={pinBaseSize * 1.3}
            viewBox="0 0 24 32"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="50%" stopColor={(props.pinColor ?? SCENE_PARAMS.pinColor.value)} />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="pinShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
              </filter>
            </defs>
            <path
              d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z"
              fill="url(#pinGradient)"
              filter="url(#pinShadow)"
            />
            <circle cx="12" cy="11" r="5" fill="white" />
            <circle cx="12" cy="11" r="3" fill={(props.pinColor ?? SCENE_PARAMS.pinColor.value)} opacity="0.6" />
          </svg>
        </div>
        
        {/* Popup Card */}
        <div style={{
          position: "absolute",
          top: pinPositionY - pinBaseSize * 1.5,
          left: pinPositionX,
          transform: "translate(-50%, -100%) translateY(" + popupY + "px) scale(" + popupScale + ")",
          transformOrigin: "center bottom",
          opacity: popupProgress,
          width: popupWidth,
          backgroundColor: (props.popupBgColor ?? SCENE_PARAMS.popupBgColor.value),
          borderRadius: minDim * 0.025,
          padding: minDim * 0.03,
          boxShadow: "0 " + (minDim * 0.015) + "px " + (minDim * 0.04) + "px rgba(0,0,0,0.3), 0 " + (minDim * 0.005) + "px " + (minDim * 0.015) + "px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: minDim * 0.01,
        }}>
          {/* Popup arrow */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.018,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: (minDim * 0.025) + "px solid transparent",
            borderRight: (minDim * 0.025) + "px solid transparent",
            borderTop: (minDim * 0.02) + "px solid " + (props.popupBgColor ?? SCENE_PARAMS.popupBgColor.value),
          }} />
          
          {/* Location icon */}
          <div style={{
            width: minDim * 0.05,
            height: minDim * 0.05,
            borderRadius: "50%",
            backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "30",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: minDim * 0.005,
          }}>
            <svg width={minDim * 0.025} height={minDim * 0.03} viewBox="0 0 24 32" fill={(props.accentColor ?? SCENE_PARAMS.accentColor.value)}>
              <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
            </svg>
          </div>
          
          {/* Location name */}
          <h2 style={{
            color: (props.popupTextColor ?? SCENE_PARAMS.popupTextColor.value),
            fontSize: minDim * 0.045,
            fontWeight: 700,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            margin: 0,
            textAlign: "center",
          }}>
            {(props.locationName ?? SCENE_PARAMS.locationName.value)}
          </h2>
          
          {/* Location detail */}
          <p style={{
            color: "#94a3b8",
            fontSize: minDim * 0.028,
            fontWeight: 400,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            margin: 0,
            textAlign: "center",
          }}>
            {(props.locationDetail ?? SCENE_PARAMS.locationDetail.value)}
          </p>
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

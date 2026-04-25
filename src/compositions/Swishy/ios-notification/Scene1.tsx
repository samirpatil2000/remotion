// Template: ios-notification
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  appName: { type: "text", label: "App Name", value: "Messages" },
  notificationTitle: { type: "text", label: "Title", value: "Reminder" },
  notificationMessage: { type: "text", label: "Message", value: "Have a good day! ☀️" },
  timeAgo: { type: "text", label: "Time", value: "now" },
  fontFamily: { type: "font", label: "Font", value: "Poppins" },
  backgroundColor: { type: "color", label: "Background", value: "#f7f7f7" },
  notificationBg: { type: "color", label: "Notification Background", value: "#ffffff" },
  titleColor: { type: "color", label: "Title Color", value: "#1c1c1e" },
  messageColor: { type: "color", label: "Message Color", value: "#3a3a3c" },
  subtleColor: { type: "color", label: "Subtle Text", value: "#8e8e93" },
  iconColor: { type: "color", label: "Icon Color", value: "#34c759" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 80, min: 30, max: 150, step: 10 },
  showAppIcon: { type: "boolean", label: "Show App Icon", value: true }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const entranceOffset = SCENE_PARAMS.entranceOffset.value;
  const scaleValue = SCENE_PARAMS.scale.value;
  
  const isPortrait = height > width;
  const notificationWidth = isPortrait ? width * 0.9 : Math.min(width * 0.5, 420);
  const padding = minDim * 0.035;
  const iconSize = minDim * 0.045;
  
  // Notification entrance - slides down from top with spring
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 22, stiffness: 85 }
  });
  
  const notificationY = interpolate(
    entranceProgress,
    [0, 1],
    [-entranceOffset, 0]
  );
  
  const notificationOpacity = interpolate(
    adjustedFrame,
    [0, 8],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Subtle scale bounce on entrance
  const scaleProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 18, stiffness: 120 }
  });
  
  const notificationScale = interpolate(
    scaleProgress,
    [0, 1],
    [0.96, 1]
  );
  
  // Content fade-in with slight delay
  const contentOpacity = interpolate(
    adjustedFrame,
    [5, 18],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Time indicator pulse
  const timePulse = interpolate(
    adjustedFrame,
    [25, 35],
    [0.6, 1],
    { extrapolateRight: "clamp" }
  );
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: height * 0.12,
    }}>
      <div style={{
        transform: `scale(${scaleValue})`,
        transformOrigin: "center top",
      }}>
        {/* Notification Card */}
        <div style={{
          width: notificationWidth,
          backgroundColor: SCENE_PARAMS.notificationBg.value,
          borderRadius: minDim * 0.035,
          padding: padding,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2)",
          transform: `translateY(${notificationY}px) scale(${notificationScale})`,
          opacity: notificationOpacity,
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.012,
        }}>
          {/* Header Row - App Icon, App Name, Time */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: minDim * 0.015,
            opacity: contentOpacity,
          }}>
            {/* App Icon */}
            {SCENE_PARAMS.showAppIcon.value && (
              <div style={{
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize * 0.22,
                backgroundColor: SCENE_PARAMS.iconColor.value,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}>
                {/* Message bubble icon */}
                <svg
                  width={iconSize * 0.6}
                  height={iconSize * 0.6}
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
            )}
            
            {/* App Name */}
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: minDim * 0.025,
              fontWeight: 600,
              color: SCENE_PARAMS.subtleColor.value,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              {SCENE_PARAMS.appName.value}
            </span>
            
            {/* Spacer */}
            <div style={{ flex: 1 }} />
            
            {/* Time */}
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: minDim * 0.022,
              fontWeight: 400,
              color: SCENE_PARAMS.subtleColor.value,
              opacity: timePulse,
            }}>
              {SCENE_PARAMS.timeAgo.value}
            </span>
          </div>
          
          {/* Title */}
          <div style={{
            opacity: contentOpacity,
          }}>
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: minDim * 0.032,
              fontWeight: 600,
              color: SCENE_PARAMS.titleColor.value,
              lineHeight: 1.3,
            }}>
              {SCENE_PARAMS.notificationTitle.value}
            </span>
          </div>
          
          {/* Message */}
          <div style={{
            opacity: contentOpacity,
          }}>
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: minDim * 0.028,
              fontWeight: 400,
              color: SCENE_PARAMS.messageColor.value,
              lineHeight: 1.4,
            }}>
              {SCENE_PARAMS.notificationMessage.value}
            </span>
          </div>
        </div>
        
        {/* Subtle grab indicator */}
        <div style={{
          width: minDim * 0.1,
          height: minDim * 0.008,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: minDim * 0.004,
          margin: "0 auto",
          marginTop: minDim * 0.025,
          opacity: interpolate(adjustedFrame, [20, 35], [0, 1], { extrapolateRight: "clamp" }),
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

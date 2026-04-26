// Template: instagram-stories
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Profile
  profileImage: { type: "image", label: "Profile Picture", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/screenshot_2026-02-04_at_4.19.41_pm.png" },
  username: { type: "text", label: "Username", value: "toolandtea" },
  timestamp: { type: "text", label: "Timestamp", value: "3h" },
  
  // Background Images
  bgImage1: { type: "image", label: "Background 1", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/47c96aeb353842642601de6459054fb3.jpg" },
  bgImage2: { type: "image", label: "Background 2", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/76f96bdfddf8be13c40778bec4c906b5.jpg" },
  bgImage3: { type: "image", label: "Background 3", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/screenshot_2026-02-05_at_1.01.17_am.png" },
  
  // Colors
  backgroundColor: { type: "color", label: "Fallback Background", value: "#000000" },
  progressBarBg: { type: "color", label: "Progress Bar Background", value: "rgba(255,255,255,0.3)" },
  progressBarFill: { type: "color", label: "Progress Bar Fill", value: "#ffffff" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  profilePlaceholderColor: { type: "color", label: "Profile Placeholder", value: "#9DC5A7" },
  
  // Timing
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  slideDuration: { type: "number", label: "Slide Duration (frames)", value: 60, min: 30, max: 120, step: 5 },
  barHeight: { type: "number", label: "Bar Height", value: 8, min: 2, max: 16, step: 1 },
  barGap: { type: "number", label: "Bar Gap", value: 4, min: 2, max: 10, step: 1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const slideDuration = (props.slideDuration ?? SCENE_PARAMS.slideDuration.value);
  const totalDuration = slideDuration * 3;
  
  // Loop the animation
  const loopedFrame = frame % totalDuration;
  
  // Determine current slide (0, 1, or 2)
  const currentSlide = Math.floor(loopedFrame / slideDuration);
  
  // Progress within current slide (0 to 1)
  const slideProgress = (loopedFrame % slideDuration) / slideDuration;
  
  // Layout calculations
  const padding = minDim * 0.04;
  const barHeight = (props.barHeight ?? SCENE_PARAMS.barHeight.value);
  const barGap = (props.barGap ?? SCENE_PARAMS.barGap.value);
  const totalBarWidth = width - (padding * 2);
  const singleBarWidth = (totalBarWidth - (barGap * 2)) / 3;
  
  // Profile section
  const profileSize = minDim * 0.08;
  const profileTop = padding + barHeight + minDim * 0.03;
  
  // Background images array
  const backgrounds = [
    (props.bgImage1 ?? SCENE_PARAMS.bgImage1.value),
    (props.bgImage2 ?? SCENE_PARAMS.bgImage2.value),
    (props.bgImage3 ?? SCENE_PARAMS.bgImage3.value),
  ];
  
  // Get progress for each bar
  const getBarProgress = (barIndex) => {
    if (barIndex < currentSlide) {
      return 1; // Completed
    } else if (barIndex === currentSlide) {
      return slideProgress; // Currently filling
    } else {
      return 0; // Not started
    }
  };
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      {/* Background Image */}
      {backgrounds[currentSlide] ? (
        <Img
          src={backgrounds[currentSlide]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: currentSlide === 0 
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : currentSlide === 1
            ? "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)"
            : "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
        }} />
      )}
      
      {/* Gradient overlay for better UI visibility */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.25,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
        pointerEvents: "none",
      }} />
      
      {/* Progress Bars Container */}
      <div style={{
        position: "absolute",
        top: padding,
        left: padding,
        right: padding,
        display: "flex",
        gap: barGap,
      }}>
        {[0, 1, 2].map((barIndex) => {
          const progress = getBarProgress(barIndex);
          
          return (
            <div
              key={barIndex}
              style={{
                flex: 1,
                height: barHeight,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: barHeight / 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: (progress * 100) + "%",
                  backgroundColor: (props.progressBarFill ?? SCENE_PARAMS.progressBarFill.value),
                  borderRadius: barHeight / 2,
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Profile Header */}
      <div style={{
        position: "absolute",
        top: profileTop,
        left: padding,
        right: padding,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: minDim * 0.025,
        }}>
          {/* Profile Picture */}
          {(props.profileImage ?? SCENE_PARAMS.profileImage.value) ? (
            <Img
              src={(props.profileImage ?? SCENE_PARAMS.profileImage.value)}
              style={{
                width: profileSize,
                height: profileSize,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: profileSize,
              height: profileSize,
              borderRadius: "50%",
              backgroundColor: (props.profilePlaceholderColor ?? SCENE_PARAMS.profilePlaceholderColor.value),
            }} />
          )}
          
          {/* Username and Timestamp */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: minDim * 0.02,
          }}>
            <span style={{
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              fontSize: minDim * 0.035,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {(props.username ?? SCENE_PARAMS.username.value)}
            </span>
            <span style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: minDim * 0.03,
              fontWeight: 400,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {(props.timestamp ?? SCENE_PARAMS.timestamp.value)}
            </span>
          </div>
        </div>
        
        {/* More Options (Kebab Menu) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: minDim * 0.02,
        }}>
          {[0, 1, 2].map((dotIndex) => (
            <div
              key={dotIndex}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: (props.textColor ?? SCENE_PARAMS.textColor.value),
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: website-reveal
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  websiteImage: { type: "image", label: "Website Screenshot", value: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop" },
  backgroundColor: { type: "color", label: "Background", value: "#f2f2f2" },
  browserFrameColor: { type: "color", label: "Browser Frame", value: "#080808" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 500, min: 100, max: 500, step: 25 },
  maxBlur: { type: "number", label: "Max Blur (px)", value: 20, min: 5, max: 40, step: 5 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.2, min: 0, max: 1, step: 0.1 },
  borderRadius: { type: "number", label: "Border Radius", value: 12, min: 0, max: 30, step: 2 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const isPortrait = height > width;
  
  // Browser mockup dimensions
  const browserWidth = isPortrait ? width * 0.88 : width * 0.75;
  const browserHeight = isPortrait ? height * 0.65 : height * 0.8;
  const toolbarHeight = minDim * 0.04;
  const borderRadius = (props.borderRadius ?? SCENE_PARAMS.borderRadius.value);
  
  // Main entrance animation - smooth spring
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 22, stiffness: 85 }
  });
  
  // Y position - slides up from bottom
  const yOffset = interpolate(
    entranceProgress,
    [0, 1],
    [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0]
  );
  
  // Blur animation - starts blurry, becomes sharp
  const blurAmount = interpolate(
    adjustedFrame,
    [0, 35],
    [(props.maxBlur ?? SCENE_PARAMS.maxBlur.value), 0],
    { extrapolateRight: "clamp" }
  );
  
  // Opacity fade in
  const opacity = interpolate(
    adjustedFrame,
    [0, 25],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Scale animation - subtle growth
  const scaleAnim = interpolate(
    entranceProgress,
    [0, 1],
    [0.92, 1]
  );
  
  const finalScale = scaleAnim * (props.scale ?? SCENE_PARAMS.scale.value);
  
  // Traffic light buttons
  const trafficLights = [
    { color: "#ff5f56", delay: 25 },
    { color: "#ffbd2e", delay: 30 },
    { color: "#27c93f", delay: 35 },
  ];
  
  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Subtle gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(ellipse at center, transparent 0%, " + (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) + " 70%)",
        opacity: 0.5,
      }} />
      
      {/* Browser window container */}
      <div style={{
        width: browserWidth,
        height: browserHeight,
        transform: "translateY(" + yOffset + "px) scale(" + finalScale + ")",
        opacity: opacity,
        filter: "blur(" + blurAmount + "px)",
        transformOrigin: "center center",
      }}>
        {/* Browser frame */}
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: (props.browserFrameColor ?? SCENE_PARAMS.browserFrameColor.value),
          borderRadius: borderRadius,
          overflow: "hidden",
          boxShadow: "0 " + (minDim * 0.05) + "px " + (minDim * 0.15) + "px rgba(0, 0, 0, " + (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value) + "), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Browser toolbar */}
          <div style={{
            height: toolbarHeight,
            backgroundColor: (props.browserFrameColor ?? SCENE_PARAMS.browserFrameColor.value),
            display: "flex",
            alignItems: "center",
            padding: "0 " + (minDim * 0.015) + "px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            gap: minDim * 0.008,
          }}>
            {/* Traffic light buttons */}
            {trafficLights.map((light, i) => {
              const buttonProgress = spring({
                frame: Math.max(0, adjustedFrame - light.delay),
                fps,
                config: { damping: 18, stiffness: 120 }
              });
              const buttonScale = interpolate(buttonProgress, [0, 1], [0, 1]);
              
              return (
                <div
                  key={i}
                  style={{
                    width: minDim * 0.012,
                    height: minDim * 0.012,
                    borderRadius: "50%",
                    backgroundColor: light.color,
                    transform: "scale(" + buttonScale + ")",
                  }}
                />
              );
            })}
            
            {/* URL bar */}
            <div style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              marginLeft: minDim * 0.02,
              marginRight: minDim * 0.06,
            }}>
              <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: minDim * 0.008,
                padding: (minDim * 0.005) + "px " + (minDim * 0.02) + "px",
                display: "flex",
                alignItems: "center",
                gap: minDim * 0.008,
                maxWidth: "60%",
              }}>
                {/* Lock icon */}
                <div style={{
                  width: minDim * 0.01,
                  height: minDim * 0.012,
                  backgroundColor: "#27c93f",
                  borderRadius: 2,
                }} />
                <span style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: minDim * 0.018,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 400,
                }}>
                  linkedin.com
                </span>
              </div>
            </div>
          </div>
          
          {/* Website content area */}
          <div style={{
            flex: 1,
            backgroundColor: "#f3f2ef",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* LinkedIn-style mockup content */}
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Top nav bar */}
              <div style={{
                height: minDim * 0.05,
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                padding: "0 " + (minDim * 0.03) + "px",
                justifyContent: "space-between",
              }}>
                {/* LinkedIn logo */}
                <div style={{
                  width: minDim * 0.035,
                  height: minDim * 0.035,
                  backgroundColor: "#0a66c2",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{
                    color: "#ffffff",
                    fontSize: minDim * 0.022,
                    fontWeight: 700,
                    fontFamily: "system-ui, sans-serif",
                  }}>in</span>
                </div>
                
                {/* Nav items placeholders */}
                <div style={{ display: "flex", gap: minDim * 0.025 }}>
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} style={{
                      width: minDim * 0.025,
                      height: minDim * 0.025,
                      backgroundColor: "#666666",
                      borderRadius: 4,
                      opacity: 0.3,
                    }} />
                  ))}
                </div>
              </div>
              
              {/* Main content area */}
              <div style={{
                flex: 1,
                display: "flex",
                padding: minDim * 0.02,
                gap: minDim * 0.015,
              }}>
                {/* Left sidebar */}
                <div style={{
                  width: "22%",
                  display: "flex",
                  flexDirection: "column",
                  gap: minDim * 0.015,
                }}>
                  {/* Profile card */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}>
                    {/* Banner */}
                    <div style={{
                      height: minDim * 0.06,
                      background: "linear-gradient(135deg, #1e3a5f 0%, #0a66c2 100%)",
                    }} />
                    {/* Avatar */}
                    <div style={{
                      marginTop: -(minDim * 0.035),
                      marginLeft: minDim * 0.015,
                    }}>
                      <div style={{
                        width: minDim * 0.065,
                        height: minDim * 0.065,
                        borderRadius: "50%",
                        backgroundColor: "#e0e0e0",
                        border: "3px solid #ffffff",
                      }} />
                    </div>
                    {/* Name placeholder */}
                    <div style={{ padding: minDim * 0.012 }}>
                      <div style={{
                        width: "70%",
                        height: minDim * 0.012,
                        backgroundColor: "#333",
                        borderRadius: 3,
                        marginBottom: minDim * 0.006,
                      }} />
                      <div style={{
                        width: "50%",
                        height: minDim * 0.008,
                        backgroundColor: "#999",
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                </div>
                
                {/* Main feed */}
                <div style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: minDim * 0.015,
                }}>
                  {/* Post cards */}
                  {[0, 1].map((_, idx) => (
                    <div key={idx} style={{
                      backgroundColor: "#ffffff",
                      borderRadius: 8,
                      padding: minDim * 0.018,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}>
                      {/* Post header */}
                      <div style={{ display: "flex", gap: minDim * 0.01, marginBottom: minDim * 0.012 }}>
                        <div style={{
                          width: minDim * 0.045,
                          height: minDim * 0.045,
                          borderRadius: "50%",
                          backgroundColor: "#e0e0e0",
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{
                            width: "40%",
                            height: minDim * 0.01,
                            backgroundColor: "#333",
                            borderRadius: 2,
                            marginBottom: minDim * 0.005,
                          }} />
                          <div style={{
                            width: "25%",
                            height: minDim * 0.007,
                            backgroundColor: "#999",
                            borderRadius: 2,
                          }} />
                        </div>
                      </div>
                      {/* Post content lines */}
                      <div style={{
                        width: "90%",
                        height: minDim * 0.008,
                        backgroundColor: "#666",
                        borderRadius: 2,
                        marginBottom: minDim * 0.006,
                      }} />
                      <div style={{
                        width: "75%",
                        height: minDim * 0.008,
                        backgroundColor: "#999",
                        borderRadius: 2,
                      }} />
                    </div>
                  ))}
                </div>
                
                {/* Right sidebar */}
                <div style={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  gap: minDim * 0.015,
                }}>
                  {/* Messaging card */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    padding: minDim * 0.015,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}>
                    <div style={{
                      width: "60%",
                      height: minDim * 0.01,
                      backgroundColor: "#333",
                      borderRadius: 2,
                      marginBottom: minDim * 0.012,
                    }} />
                    {/* Message bubbles */}
                    {[0, 1, 2].map((_, i) => (
                      <div key={i} style={{
                        display: "flex",
                        gap: minDim * 0.008,
                        marginBottom: minDim * 0.008,
                        alignItems: "center",
                      }}>
                        <div style={{
                          width: minDim * 0.03,
                          height: minDim * 0.03,
                          borderRadius: "50%",
                          backgroundColor: "#e0e0e0",
                        }} />
                        <div style={{
                          width: "60%",
                          height: minDim * 0.008,
                          backgroundColor: "#ccc",
                          borderRadius: 2,
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

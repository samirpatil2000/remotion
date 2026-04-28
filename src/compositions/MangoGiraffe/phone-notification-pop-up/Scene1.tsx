// Template: phone-notification-pop-up
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  notificationMessage: { type: "text", label: "Notification Message", value: "hi how are you" },
  senderName: { type: "text", label: "Sender Name", value: "Sarah" },
  appName: { type: "text", label: "App Name", value: "Messages" },
  fontFamily: { type: "font", label: "Font", value: "Open Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  phoneColor: { type: "color", label: "Phone Color", value: "#1e293b" },
  screenColor: { type: "color", label: "Screen Color", value: "#0f172a" },
  notificationBg: { type: "color", label: "Notification Background", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent Color", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1.25, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  notificationDelay: { type: "number", label: "Notification Delay (frames)", value: 15, min: 15, max: 60, step: 5 },
  showTime: { type: "boolean", label: "Show Time", value: true },
  vibrationIntensity: { type: "number", label: "Vibration Intensity", value: 0.5, min: 0, max: 1, step: 0.1 },
  glowIntensity: { type: "number", label: "Screen Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const notificationDelay = (props.notificationDelay ?? SCENE_PARAMS.notificationDelay.value);
  
  const isPortrait = height > width;
  
  // Phone dimensions
  const phoneHeight = isPortrait ? height * 0.65 : height * 0.8;
  const phoneWidth = phoneHeight / 2.1;
  const finalPhoneWidth = Math.min(phoneWidth, width * 0.7);
  const finalPhoneHeight = finalPhoneWidth * 2.1;
  const cornerRadius = finalPhoneWidth * 0.12;
  const bezelWidth = finalPhoneWidth * 0.04;
  
  // Phone entrance animation
  const phoneEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 22, stiffness: 85 } });
  const phoneY = interpolate(phoneEntrance, [0, 1], [height * 0.15, 0]);
  const phoneOpacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Notification slide down animation - smoother and slower with reduced bounce
  const notificationFrame = Math.max(0, adjustedFrame - notificationDelay);
  const notificationProgress = spring({ frame: notificationFrame, fps, config: { damping: 28, stiffness: 60 } });
  const notificationY = interpolate(notificationProgress, [0, 1], [-80, 0]);
  const notificationOpacity = interpolate(notificationFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  // Subtle phone vibration when notification appears
  const vibrationActive = notificationFrame > 0 && notificationFrame < 25;
  const vibrationAmount = (props.vibrationIntensity ?? SCENE_PARAMS.vibrationIntensity.value) * 1.5;
  const vibrationX = vibrationActive ? Math.sin(notificationFrame * 2.5) * vibrationAmount * (1 - notificationFrame / 25) : 0;
  
  // Soft screen glow when notification appears
  const glowProgress = interpolate(notificationFrame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const glowOpacity = glowProgress * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * 0.15;
  
  // Screen content dimensions
  const screenWidth = finalPhoneWidth - (bezelWidth * 2);
  const screenHeight = finalPhoneHeight - (bezelWidth * 2) - (finalPhoneWidth * 0.08);
  
  // Time display
  const currentTime = "9:41";
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      {/* Ambient glow behind phone */}
      <div style={{
        position: "absolute",
        width: finalPhoneWidth * 1.5,
        height: finalPhoneHeight * 0.8,
        background: `radial-gradient(ellipse at center, ${(props.accentColor ?? SCENE_PARAMS.accentColor.value)}15 0%, transparent 70%)`,
        filter: "blur(40px)",
        opacity: phoneEntrance * 0.6,
      }} />
      
      <div style={{
        transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)}) translateY(${phoneY}px) translateX(${vibrationX}px)`,
        transformOrigin: "center center",
        opacity: phoneOpacity,
      }}>
        {/* Phone body */}
        <div style={{
          width: finalPhoneWidth,
          height: finalPhoneHeight,
          backgroundColor: (props.phoneColor ?? SCENE_PARAMS.phoneColor.value),
          borderRadius: cornerRadius,
          padding: bezelWidth,
          boxSizing: "border-box",
          boxShadow: `0 ${finalPhoneWidth * 0.05}px ${finalPhoneWidth * 0.15}px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
          position: "relative",
        }}>
          {/* Side buttons */}
          <div style={{
            position: "absolute",
            left: -3,
            top: finalPhoneHeight * 0.2,
            width: 3,
            height: finalPhoneHeight * 0.06,
            backgroundColor: "#334155",
            borderRadius: "2px 0 0 2px",
          }} />
          <div style={{
            position: "absolute",
            left: -3,
            top: finalPhoneHeight * 0.3,
            width: 3,
            height: finalPhoneHeight * 0.1,
            backgroundColor: "#334155",
            borderRadius: "2px 0 0 2px",
          }} />
          <div style={{
            position: "absolute",
            left: -3,
            top: finalPhoneHeight * 0.42,
            width: 3,
            height: finalPhoneHeight * 0.1,
            backgroundColor: "#334155",
            borderRadius: "2px 0 0 2px",
          }} />
          <div style={{
            position: "absolute",
            right: -3,
            top: finalPhoneHeight * 0.28,
            width: 3,
            height: finalPhoneHeight * 0.12,
            backgroundColor: "#334155",
            borderRadius: "0 2px 2px 0",
          }} />
          
          {/* Screen */}
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: (props.screenColor ?? SCENE_PARAMS.screenColor.value),
            borderRadius: cornerRadius - bezelWidth,
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Soft screen glow overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(ellipse at center top, ${(props.accentColor ?? SCENE_PARAMS.accentColor.value)} 0%, transparent 60%)`,
              opacity: glowOpacity,
              pointerEvents: "none",
              zIndex: 10,
            }} />
            
            {/* Dynamic Island / Notch */}
            <div style={{
              position: "absolute",
              top: screenHeight * 0.015,
              left: "50%",
              transform: "translateX(-50%)",
              width: screenWidth * 0.35,
              height: screenHeight * 0.035,
              backgroundColor: "#000",
              borderRadius: screenHeight * 0.02,
              zIndex: 20,
            }} />
            
            {/* Status bar */}
            <div style={{
              position: "absolute",
              top: screenHeight * 0.015,
              left: screenWidth * 0.06,
              right: screenWidth * 0.06,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: screenHeight * 0.035,
              zIndex: 15,
            }}>
              {(props.showTime ?? SCENE_PARAMS.showTime.value) && (
                <span style={{
                  color: "#fff",
                  fontSize: screenHeight * 0.018,
                  fontWeight: 600,
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                }}>
                  {currentTime}
                </span>
              )}
              <div style={{ flex: 1 }} />
              {/* Status icons */}
              <div style={{ display: "flex", gap: screenWidth * 0.02, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 1 }}>
                  {[1,2,3,4].map((i) => (
                    <div key={i} style={{
                      width: screenWidth * 0.008,
                      height: screenHeight * 0.006 + (i * screenHeight * 0.003),
                      backgroundColor: i <= 3 ? "#fff" : "#475569",
                      borderRadius: 1,
                    }} />
                  ))}
                </div>
                <div style={{
                  width: screenWidth * 0.065,
                  height: screenHeight * 0.015,
                  border: "1px solid #fff",
                  borderRadius: 3,
                  padding: 1,
                  position: "relative",
                }}>
                  <div style={{
                    width: "80%",
                    height: "100%",
                    backgroundColor: "#22c55e",
                    borderRadius: 1,
                  }} />
                  <div style={{
                    position: "absolute",
                    right: -3,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 2,
                    height: screenHeight * 0.008,
                    backgroundColor: "#fff",
                    borderRadius: "0 1px 1px 0",
                  }} />
                </div>
              </div>
            </div>
            
            {/* Lock screen time */}
            <div style={{
              position: "absolute",
              top: screenHeight * 0.15,
              width: "100%",
              textAlign: "center",
            }}>
              <div style={{
                color: "#fff",
                fontSize: screenHeight * 0.09,
                fontWeight: 200,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                letterSpacing: "-2px",
              }}>
                9:41
              </div>
              <div style={{
                color: "#94a3b8",
                fontSize: screenHeight * 0.02,
                fontWeight: 400,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                marginTop: screenHeight * 0.01,
              }}>
                Monday, January 15
              </div>
            </div>
            
            {/* Notification */}
            <div style={{
              position: "absolute",
              top: screenHeight * 0.35,
              left: screenWidth * 0.04,
              right: screenWidth * 0.04,
              transform: `translateY(${notificationY}px)`,
              opacity: notificationOpacity,
            }}>
              <div style={{
                backgroundColor: (props.notificationBg ?? SCENE_PARAMS.notificationBg.value),
                borderRadius: screenWidth * 0.05,
                padding: screenWidth * 0.04,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                position: "relative",
              }}>
                {/* App icon and header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: screenWidth * 0.03,
                  marginBottom: screenHeight * 0.012,
                }}>
                  {/* Messages app icon */}
                  <div style={{
                    width: screenWidth * 0.1,
                    height: screenWidth * 0.1,
                    borderRadius: screenWidth * 0.022,
                    background: `linear-gradient(135deg, #34d399 0%, ${(props.accentColor ?? SCENE_PARAMS.accentColor.value)} 100%)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <div style={{
                      width: screenWidth * 0.055,
                      height: screenWidth * 0.045,
                      backgroundColor: "#fff",
                      borderRadius: screenWidth * 0.015,
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute",
                        bottom: -screenWidth * 0.008,
                        left: screenWidth * 0.008,
                        width: 0,
                        height: 0,
                        borderLeft: `${screenWidth * 0.012}px solid transparent`,
                        borderRight: `${screenWidth * 0.012}px solid transparent`,
                        borderTop: `${screenWidth * 0.012}px solid #fff`,
                      }} />
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <span style={{
                        color: "#1e293b",
                        fontSize: screenHeight * 0.016,
                        fontWeight: 600,
                        fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}>
                        {(props.appName ?? SCENE_PARAMS.appName.value)}
                      </span>
                      <span style={{
                        color: "#64748b",
                        fontSize: screenHeight * 0.014,
                        fontWeight: 400,
                        fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                      }}>
                        now
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Sender name */}
                <div style={{
                  color: "#0f172a",
                  fontSize: screenHeight * 0.02,
                  fontWeight: 600,
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                  marginBottom: screenHeight * 0.005,
                }}>
                  {(props.senderName ?? SCENE_PARAMS.senderName.value)}
                </div>
                
                {/* Message content */}
                <div style={{
                  color: "#475569",
                  fontSize: screenHeight * 0.018,
                  fontWeight: 400,
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                  lineHeight: 1.4,
                }}>
                  {(props.notificationMessage ?? SCENE_PARAMS.notificationMessage.value)}
                </div>
              </div>
            </div>
            
            {/* Bottom home indicator */}
            <div style={{
              position: "absolute",
              bottom: screenHeight * 0.015,
              left: "50%",
              transform: "translateX(-50%)",
              width: screenWidth * 0.35,
              height: screenHeight * 0.006,
              backgroundColor: "#fff",
              borderRadius: screenHeight * 0.003,
              opacity: 0.6,
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

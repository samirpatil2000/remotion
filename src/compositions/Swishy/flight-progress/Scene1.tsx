// Template: flight-progress
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Departure
  departureCode: { type: "text", label: "Departure Code", value: "YYZ" },
  departureCity: { type: "text", label: "Departure City", value: "Toronto" },
  departureTime: { type: "text", label: "Departure Time", value: "MON, 6:14 PM" },
  
  // Arrival
  arrivalCode: { type: "text", label: "Arrival Code", value: "HND" },
  arrivalCity: { type: "text", label: "Arrival City", value: "Tokyo" },
  arrivalTime: { type: "text", label: "Arrival Time", value: "TUE, 7:14 AM" },
  
  // ETA Card
  etaTime: { type: "text", label: "ETA Time", value: "ETA 2:15 PM" },
  etaTimezone: { type: "text", label: "ETA Timezone", value: "Tokyo Time" },
  etaEvent: { type: "text", label: "Event Countdown", value: "DINNER IN 2:34H" },
  
  // Progress
  flightProgress: { type: "number", label: "Flight Progress %", value: 65, min: 0, max: 100, step: 1 },
  timeRemaining: { type: "text", label: "Time Remaining", value: "-2H 48M" },
  
  // Colors
  backgroundColor: { type: "color", label: "Page Background", value: "#e0e0e0" },
  cardBackground: { type: "color", label: "Card Background", value: "#0f0f12" },
  accentColor: { type: "color", label: "Accent Color", value: "#7cff01" },
  arrowColor: { type: "color", label: "Arrow Color", value: "#ff7b00" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  mutedColor: { type: "color", label: "Muted Text", value: "#888888" },
  
  // Fonts
  codeFont: { type: "font", label: "Airport Code Font", value: "Codystar" },
  bodyFont: { type: "font", label: "Body Font", value: "Inter" },
  monoFont: { type: "font", label: "Mono Font", value: "Roboto Mono" },
  
  // Animation
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  
  // Card dimensions based on viewport
  const cardWidth = Math.min(width * 0.65, 1248);
  const cardHeight = cardWidth * 0.433;
  const padding = cardWidth * 0.08;
  
  // Animation timings
  const cardEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  const departureEntrance = spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 20, stiffness: 90 } });
  const arrowEntrance = spring({ frame: Math.max(0, adjustedFrame - 20), fps, config: { damping: 18, stiffness: 100 } });
  const arrivalEntrance = spring({ frame: Math.max(0, adjustedFrame - 30), fps, config: { damping: 20, stiffness: 90 } });
  const etaEntrance = spring({ frame: Math.max(0, adjustedFrame - 40), fps, config: { damping: 20, stiffness: 90 } });
  const progressEntrance = spring({ frame: Math.max(0, adjustedFrame - 50), fps, config: { damping: 20, stiffness: 90 } });
  
  // Arrival code glow pulse
  const glowPulse = interpolate(
    Math.sin(adjustedFrame * 0.08),
    [-1, 1],
    [0.3, 0.6],
    { extrapolateRight: "clamp" }
  );
  
  // Progress bar animation
  const progressWidth = interpolate(
    progressEntrance,
    [0, 1],
    [0, (props.flightProgress ?? SCENE_PARAMS.flightProgress.value)],
    { extrapolateRight: "clamp" }
  );
  
  const codeSize = cardWidth * 0.09;
  const citySize = cardWidth * 0.025;
  const timeSize = cardWidth * 0.018;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center" }}>
        {/* Main Card */}
        <div style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: (props.cardBackground ?? SCENE_PARAMS.cardBackground.value),
          borderRadius: cardWidth * 0.026,
          padding: padding,
          boxShadow: "0px 20px 50px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          opacity: cardEntrance,
          transform: "scale(" + interpolate(cardEntrance, [0, 1], [0.95, 1]) + ")",
        }}>
          {/* Top Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            {/* Flight Route */}
            <div style={{ display: "flex", gap: cardWidth * 0.03, alignItems: "center" }}>
              {/* Departure */}
              <div style={{
                opacity: departureEntrance,
                transform: "translateY(" + interpolate(departureEntrance, [0, 1], [20, 0]) + "px)",
              }}>
                <div style={{
                  fontFamily: (props.codeFont ?? SCENE_PARAMS.codeFont.value) + ", monospace",
                  fontWeight: 700,
                  fontSize: codeSize,
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                  color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                }}>
                  {(props.departureCode ?? SCENE_PARAMS.departureCode.value)}
                </div>
                <div style={{ marginTop: cardWidth * 0.012 }}>
                  <div style={{ fontSize: citySize, fontWeight: 600, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                    {(props.departureCity ?? SCENE_PARAMS.departureCity.value)}
                  </div>
                  <div style={{ fontSize: timeSize, color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value), marginTop: 4, fontWeight: 500, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                    {(props.departureTime ?? SCENE_PARAMS.departureTime.value)}
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div style={{
                opacity: arrowEntrance,
                transform: "translateY(" + interpolate(arrowEntrance, [0, 1], [10, -10]) + "px)",
                paddingBottom: cardWidth * 0.032,
              }}>
                <svg width={cardWidth * 0.04} height={cardWidth * 0.04} viewBox="0 0 24 24" fill="none">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill={(props.arrowColor ?? SCENE_PARAMS.arrowColor.value)} />
                </svg>
              </div>
              
              {/* Arrival */}
              <div style={{
                opacity: arrivalEntrance,
                transform: "translateY(" + interpolate(arrivalEntrance, [0, 1], [20, 0]) + "px)",
              }}>
                <div style={{
                  fontFamily: (props.codeFont ?? SCENE_PARAMS.codeFont.value) + ", monospace",
                  fontWeight: 700,
                  fontSize: codeSize,
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                  color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                  opacity: glowPulse,
                  textShadow: (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "66 0px 0px 20px",
                }}>
                  {(props.arrivalCode ?? SCENE_PARAMS.arrivalCode.value)}
                </div>
                <div style={{ marginTop: cardWidth * 0.012 }}>
                  <div style={{ fontSize: citySize, fontWeight: 600, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                    {(props.arrivalCity ?? SCENE_PARAMS.arrivalCity.value)}
                  </div>
                  <div style={{ fontSize: timeSize, color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value), marginTop: 4, fontWeight: 500, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                    {(props.arrivalTime ?? SCENE_PARAMS.arrivalTime.value)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* ETA Card */}
            <div style={{
              backgroundColor: "#1a1a1e",
              padding: cardWidth * 0.016 + "px " + cardWidth * 0.019 + "px",
              borderRadius: cardWidth * 0.013,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minWidth: cardWidth * 0.25,
              opacity: etaEntrance,
              transform: "translateX(" + interpolate(etaEntrance, [0, 1], [30, 0]) + "px)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: cardWidth * 0.022, fontWeight: 700, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                  {(props.etaTime ?? SCENE_PARAMS.etaTime.value)}
                </span>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z" fill="#666" />
                </svg>
              </div>
              <span style={{ fontSize: cardWidth * 0.018, color: "#666666", fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                {(props.etaTimezone ?? SCENE_PARAMS.etaTimezone.value)}
              </span>
              <span style={{ fontSize: cardWidth * 0.018, color: (props.arrowColor ?? SCENE_PARAMS.arrowColor.value), fontWeight: 700, marginTop: 4, fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", sans-serif" }}>
                {(props.etaEvent ?? SCENE_PARAMS.etaEvent.value)}
              </span>
            </div>
          </div>
          
          {/* Progress Bar Section */}
          <div style={{
            position: "relative",
            width: "100%",
            marginTop: "auto",
            paddingTop: cardWidth * 0.02,
            opacity: progressEntrance,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: cardWidth * 0.016 }}>
              {/* Progress Track */}
              <div style={{
                flex: 1,
                height: cardWidth * 0.065,
                backgroundColor: "#161619",
                borderRadius: 999,
                position: "relative",
                overflow: "hidden",
                boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.5)",
              }}>
                {/* Progress Fill */}
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: progressWidth + "%",
                  background: "linear-gradient(90deg, " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "44 0%, " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + " 100%)",
                  borderRadius: 999,
                  boxShadow: (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "88 0px 0px 30px",
                }} />
                
                {/* Plane Icon */}
                <div style={{
                  position: "absolute",
                  left: progressWidth + "%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  zIndex: 2,
                  marginLeft: -4,
                }}>
                  <svg width={cardWidth * 0.035} height={cardWidth * 0.035} viewBox="0 0 24 24" fill="none">
                    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="white" />
                  </svg>
                </div>
                
                {/* Highlight */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
                  borderRadius: "999px 999px 0 0",
                  pointerEvents: "none",
                }} />
              </div>
              
              {/* Time Remaining */}
              <div style={{
                fontFamily: (props.monoFont ?? SCENE_PARAMS.monoFont.value) + ", monospace",
                color: "#555555",
                fontSize: cardWidth * 0.02,
                fontWeight: 500,
                minWidth: cardWidth * 0.1,
                textAlign: "right",
              }}>
                {(props.timeRemaining ?? SCENE_PARAMS.timeRemaining.value)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

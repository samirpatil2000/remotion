// Template: phone-messages
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  contactName: { type: "text", label: "Contact Name", value: "John" },
  message1: { type: "text", label: "Message 1", value: "Hey!" },
  message2: { type: "text", label: "Message 2", value: "Hi there!" },
  message3: { type: "text", label: "Message 3", value: "How are you?" },
  message4: { type: "text", label: "Message 4", value: "Doing great!" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#1a1a1a" },
  phoneColor: { type: "color", label: "Phone Screen", value: "#f2f2f7" },
  sentBubbleColor: { type: "color", label: "Sent Bubble", value: "#007aff" },
  receivedBubbleColor: { type: "color", label: "Received Bubble", value: "#e5e5ea" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  messageDelay: { type: "number", label: "Message Delay", value: 20, min: 10, max: 40, step: 5 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  const msgDelay = SCENE_PARAMS.messageDelay.value;
  
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  
  const phoneHeight = isPortrait ? height * 0.75 : height * 0.85;
  const phoneWidth = phoneHeight / 2.1;
  
  const maxPhoneWidth = width * 0.8;
  const finalPhoneWidth = Math.min(phoneWidth, maxPhoneWidth);
  const finalPhoneHeight = finalPhoneWidth * 2.1;
  
  const borderRadius = finalPhoneWidth * 0.12;
  const padding = finalPhoneWidth * 0.04;
  const bubbleFontSize = finalPhoneWidth * 0.065;
  const smallFont = finalPhoneWidth * 0.04;
  
  const messages = [
    { text: SCENE_PARAMS.message1.value, sent: false, delay: 0 },
    { text: SCENE_PARAMS.message2.value, sent: true, delay: msgDelay },
    { text: SCENE_PARAMS.message3.value, sent: false, delay: msgDelay * 2.25 },
    { text: SCENE_PARAMS.message4.value, sent: true, delay: msgDelay * 3.5 },
  ];
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center" }}>
        {/* Phone frame */}
        <div style={{
          width: finalPhoneWidth,
          height: finalPhoneHeight,
          backgroundColor: SCENE_PARAMS.phoneColor.value,
          borderRadius: borderRadius,
          border: "4px solid #2a2a2e",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 80px -12px rgba(0,0,0,0.6)",
          position: "relative",
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: "absolute",
            top: finalPhoneHeight * 0.015,
            left: "50%",
            transform: "translateX(-50%)",
            width: finalPhoneWidth * 0.28,
            height: finalPhoneHeight * 0.032,
            backgroundColor: "#000",
            borderRadius: 100,
            zIndex: 10,
          }} />
          
          {/* Status bar */}
          <div style={{
            height: finalPhoneHeight * 0.055,
            backgroundColor: SCENE_PARAMS.phoneColor.value,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 " + (padding * 1.5) + "px",
            paddingTop: finalPhoneHeight * 0.008,
          }}>
            <div style={{ fontSize: smallFont, fontWeight: 600, fontFamily: "system-ui", color: "#000", width: finalPhoneWidth * 0.2 }}>9:41</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: finalPhoneWidth * 0.015 }}>
              <svg width={smallFont * 1.1} height={smallFont * 0.8} viewBox="0 0 17 11">
                <rect x="0" y="7" width="3" height="4" rx="1" fill="#000"/>
                <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#000"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#000"/>
                <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#000"/>
              </svg>
            </div>
          </div>
          
          {/* Messages header */}
          <div style={{
            padding: padding + "px " + (padding * 1.5) + "px",
            borderBottom: "1px solid #c6c6c8",
            display: "flex",
            alignItems: "center",
            gap: padding,
          }}>
            <div style={{
              width: finalPhoneWidth * 0.1,
              height: finalPhoneWidth * 0.1,
              borderRadius: "50%",
              backgroundColor: SCENE_PARAMS.sentBubbleColor.value,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: smallFont, fontWeight: 600 }}>{SCENE_PARAMS.contactName.value.charAt(0)}</span>
            </div>
            <div>
              <div style={{ fontSize: bubbleFontSize * 0.9, fontWeight: 600, color: "#000", fontFamily: "system-ui" }}>{SCENE_PARAMS.contactName.value}</div>
              <div style={{ fontSize: smallFont * 0.85, color: "#8e8e93", fontFamily: "system-ui" }}>iMessage</div>
            </div>
          </div>
          
          {/* Messages area */}
          <div style={{
            flex: 1,
            padding: padding * 1.5,
            display: "flex",
            flexDirection: "column",
            gap: padding * 0.6,
            justifyContent: "flex-start",
          }}>
            {messages.map((msg, i) => {
              const msgProgress = spring({ frame: Math.max(0, adjustedFrame - msg.delay), fps, config: { damping: 14, stiffness: 120 } });
              const opacity = interpolate(adjustedFrame - msg.delay, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              
              return (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.sent ? "flex-end" : "flex-start",
                  opacity: opacity,
                  transform: "scale(" + msgProgress + ") translateY(" + ((1 - msgProgress) * 15) + "px)",
                }}>
                  <div style={{
                    backgroundColor: msg.sent ? SCENE_PARAMS.sentBubbleColor.value : SCENE_PARAMS.receivedBubbleColor.value,
                    color: msg.sent ? "#fff" : "#000",
                    padding: (padding * 0.5) + "px " + (padding * 0.9) + "px",
                    borderRadius: finalPhoneWidth * 0.055,
                    fontSize: bubbleFontSize,
                    fontFamily: "system-ui",
                    maxWidth: "70%",
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Home indicator */}
          <div style={{ height: finalPhoneHeight * 0.025, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: finalPhoneWidth * 0.35, height: 4, backgroundColor: "#000", borderRadius: 100, opacity: 0.2 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

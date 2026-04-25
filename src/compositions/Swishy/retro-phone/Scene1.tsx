// Template: retro-phone
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  message1: { type: "text", label: "Message 1", value: "hi there" },
  message2: { type: "text", label: "Message 2", value: "yea wassup" },
  message3: { type: "text", label: "Message 3", value: "wanna hang l8r?" },
  message4: { type: "text", label: "Message 4", value: "totally! 😎" },
  person1Emoji: { type: "text", label: "Person 1 Emoji", value: "😊" },
  person2Emoji: { type: "text", label: "Person 2 Emoji", value: "🤔" },
  backgroundColor: { type: "color", label: "Background", value: "#fafafa" },
  gradientColor: { type: "color", label: "Gradient Color", value: "#fcfcfc" },
  phoneColor: { type: "color", label: "Phone Color", value: "#121212" },
  phoneBorder: { type: "color", label: "Phone Border", value: "#1a1a2e" },
  screenColor: { type: "color", label: "Screen Color", value: "#4a5d23" },
  textColor: { type: "color", label: "Text Color", value: "#b8ff00" },
  keypadColor: { type: "color", label: "Keypad Color", value: "#333333" },
  keypadBorder: { type: "color", label: "Keypad Border", value: "#555555" },
  keypadText: { type: "color", label: "Keypad Text", value: "#cccccc" },
  antennaColor: { type: "color", label: "Antenna Color", value: "#666666" },
  callButtonColor: { type: "color", label: "Call Button", value: "#4a7c59" },
  endButtonColor: { type: "color", label: "End Button", value: "#a03e3e" },
  brandColor: { type: "color", label: "Brand Text", value: "#666666" },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  messageDelay: { type: "number", label: "Message Delay (frames)", value: 20, min: 10, max: 40, step: 5 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const phoneHeight = isPortrait ? height * 0.6 : height * 0.8;
  const phoneWidth = phoneHeight * 0.55;
  const maxPhoneWidth = width * 0.7;
  const finalPhoneWidth = Math.min(phoneWidth, maxPhoneWidth);
  const finalPhoneHeight = finalPhoneWidth / 0.55;
  
  const phoneEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const phoneY = interpolate(phoneEntrance, [0, 1], [height * 0.2, 0]);
  
  const messages = [
    { text: SCENE_PARAMS.message1.value, delay: SCENE_PARAMS.messageDelay.value, person: 1 },
    { text: SCENE_PARAMS.message2.value, delay: SCENE_PARAMS.messageDelay.value + 25, person: 2 },
    { text: SCENE_PARAMS.message3.value, delay: SCENE_PARAMS.messageDelay.value + 50, person: 1 },
    { text: SCENE_PARAMS.message4.value, delay: SCENE_PARAMS.messageDelay.value + 75, person: 2 }
  ];
  
  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(circle at 30% 40%, ' + SCENE_PARAMS.gradientColor.value + ' 0%, ' + SCENE_PARAMS.backgroundColor.value + ' 70%)',
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: finalPhoneWidth,
        height: finalPhoneHeight,
        position: "relative",
        transform: "translateY(" + phoneY + "px)",
        opacity: phoneEntrance
      }}>
        {/* Phone body */}
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: SCENE_PARAMS.phoneColor.value,
          borderRadius: finalPhoneWidth * 0.08,
          border: "3px solid " + SCENE_PARAMS.phoneBorder.value,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}>
          {/* Antenna */}
          <div style={{
            position: "absolute",
            top: -finalPhoneHeight * 0.15,
            right: finalPhoneWidth * 0.1,
            width: 3,
            height: finalPhoneHeight * 0.15,
            backgroundColor: SCENE_PARAMS.antennaColor.value,
            borderRadius: "0 0 50px 50px"
          }} />
          
          {/* Screen area */}
          <div style={{
            margin: finalPhoneWidth * 0.08,
            marginBottom: finalPhoneWidth * 0.05,
            height: finalPhoneHeight * 0.4,
            backgroundColor: SCENE_PARAMS.screenColor.value,
            borderRadius: finalPhoneWidth * 0.04,
            border: "2px solid #1a1a1a",
            display: "flex",
            flexDirection: "column",
            padding: finalPhoneWidth * 0.04,
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
            fontFamily: "'Courier New', monospace",
            overflow: "hidden"
          }}>
            {/* Screen header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: finalPhoneWidth * 0.02,
              fontSize: finalPhoneWidth * 0.025,
              color: SCENE_PARAMS.textColor.value
            }}>
              <span>📶 Nokia</span>
              <span>🔋 ██</span>
            </div>
            
            <div style={{
              borderBottom: "1px solid " + SCENE_PARAMS.textColor.value,
              marginBottom: finalPhoneWidth * 0.03,
              opacity: 0.5
            }} />
            
            {/* Messages */}
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: finalPhoneWidth * 0.01,
              fontSize: finalPhoneWidth * 0.03,
              color: SCENE_PARAMS.textColor.value,
              lineHeight: 1.2
            }}>
              {messages.map((msg, i) => {
                const msgProgress = interpolate(
                  adjustedFrame,
                  [msg.delay, msg.delay + 15],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                
                const chars = msg.text.split('');
                const visibleChars = Math.floor(msgProgress * chars.length);
                const personEmoji = msg.person === 1 ? SCENE_PARAMS.person1Emoji.value : SCENE_PARAMS.person2Emoji.value;
                
                return (
                  <div key={i} style={{ opacity: msgProgress > 0 ? 1 : 0 }}>
                    {personEmoji} 
                    {chars.slice(0, visibleChars).join('')}
                    {msgProgress > 0 && msgProgress < 1 && '█'}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Keypad */}
          <div style={{
            padding: finalPhoneWidth * 0.05,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: finalPhoneWidth * 0.02,
            flex: 1
          }}>
            {['1', '2abc', '3def', '4ghi', '5jkl', '6mno', '7pqrs', '8tuv', '9wxyz', '*', '0+', '#'].map((key, i) => {
              const keyDelay = 10 + (i * 2);
              const keyProgress = spring({
                frame: Math.max(0, adjustedFrame - keyDelay),
                fps,
                config: { damping: 25, stiffness: 200 }
              });
              
              return (
                <div key={i} style={{
                  backgroundColor: SCENE_PARAMS.keypadColor.value,
                  border: "2px solid " + SCENE_PARAMS.keypadBorder.value,
                  borderRadius: finalPhoneWidth * 0.02,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: finalPhoneWidth * 0.04,
                  color: SCENE_PARAMS.keypadText.value,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  transform: "scale(" + keyProgress + ")",
                  opacity: keyProgress
                }}>
                  {key}
                </div>
              );
            })}
          </div>
          
          {/* Bottom buttons */}
          <div style={{
            padding: finalPhoneWidth * 0.05,
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div style={{
              width: finalPhoneWidth * 0.15,
              height: finalPhoneWidth * 0.08,
              backgroundColor: SCENE_PARAMS.callButtonColor.value,
              borderRadius: finalPhoneWidth * 0.02,
              border: "2px solid #2d4a35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: finalPhoneWidth * 0.025,
              fontWeight: "bold"
            }}>📞</div>
            
            <div style={{
              width: finalPhoneWidth * 0.15,
              height: finalPhoneWidth * 0.08,
              backgroundColor: SCENE_PARAMS.endButtonColor.value,
              borderRadius: finalPhoneWidth * 0.02,
              border: "2px solid #6b2c2c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: finalPhoneWidth * 0.025,
              fontWeight: "bold"
            }}>❌</div>
          </div>
          
          {/* Brand logo */}
          <div style={{
            position: "absolute",
            bottom: finalPhoneWidth * 0.02,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: finalPhoneWidth * 0.025,
            color: SCENE_PARAMS.brandColor.value,
            fontWeight: "bold",
            fontFamily: "system-ui"
          }}>NOKIA</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

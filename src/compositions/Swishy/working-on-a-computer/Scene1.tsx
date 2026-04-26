// Template: working-on-a-computer
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  deskColor: { type: "color", label: "Desk Color", value: "#1e293b" },
  monitorGlow: { type: "color", label: "Monitor Glow", value: "#3b82f6" },
  terminalGreen: { type: "color", label: "Terminal Text", value: "#22c55e" },
  skinTone: { type: "color", label: "Skin Tone", value: "#d4a574" },
  sleeveColor: { type: "color", label: "Sleeve Color", value: "#18181b" },
  keyboardColor: { type: "color", label: "Keyboard Color", value: "#27272a" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  typingSpeed: { type: "number", label: "Typing Speed", value: 3, min: 1, max: 6, step: 1 },
  showScanlines: { type: "boolean", label: "Show Scanlines", value: true },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  // Scene entrance
  const sceneEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  
  // Monitor flicker effect
  const flicker = Math.sin(adjustedFrame * 0.5) * 0.03 + 0.97;
  
  // Typing animation - cursor blink
  const cursorBlink = Math.floor(adjustedFrame / 15) % 2 === 0;
  
  // Code lines appearing
  const typingDelay = (props.typingSpeed ?? SCENE_PARAMS.typingSpeed.value);
  const codeLines = [
    "$ ssh root@192.168.1.1",
    "Password: ********",
    "Access granted...",
    "$ cat /etc/shadow",
    "root:$6$xyz...",
    "$ ./exploit.sh",
    "[+] Injecting payload...",
    "[+] Success!",
  ];
  
  const visibleLines = Math.min(
    Math.floor((adjustedFrame - 30) / (12 / typingDelay)),
    codeLines.length
  );
  
  // Hand/finger typing animations
  const leftHandY = Math.sin(adjustedFrame * 0.3) * 3;
  const rightHandY = Math.sin(adjustedFrame * 0.3 + 1.5) * 3;
  
  // Individual finger movements
  const getFingerY = (fingerIndex, hand) => {
    const offset = hand === 'left' ? 0 : 5;
    const baseSpeed = 0.4;
    return Math.sin(adjustedFrame * baseSpeed + fingerIndex * 1.2 + offset) * 4;
  };
  
  // Monitor dimensions - first person POV, larger screen
  const monitorWidth = width * 0.85;
  const monitorHeight = height * 0.55;
  const monitorTop = height * 0.05;
  
  // Keyboard dimensions
  const keyboardWidth = width * 0.7;
  const keyboardHeight = minDim * 0.12;
  const keyboardTop = height * 0.72;
  
  // Ambient particles floating up from keyboard glow
  const particles = [];
  for (let i = 0; i < 12; i++) {
    const particleY = height - ((adjustedFrame * 0.8 + i * 40) % (height * 0.5));
    const particleX = width * 0.3 + (Math.sin(i * 2.1) * width * 0.4);
    particles.push({ x: particleX, y: particleY, size: 2 + (i % 3), opacity: 0.1 + (i % 4) * 0.03 });
  }
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      overflow: "hidden",
    }}>
      {/* Ambient particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          backgroundColor: (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value),
          borderRadius: "50%",
          opacity: p.opacity * sceneEntrance,
        }} />
      ))}
      
      {/* Monitor glow on environment */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: monitorTop + monitorHeight * 0.3,
        width: width * 1.2,
        height: height * 0.8,
        transform: "translateX(-50%)",
        background: "radial-gradient(ellipse at center top, " + (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value) + "25 0%, transparent 50%)",
        opacity: (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * flicker * sceneEntrance,
        pointerEvents: "none",
      }} />
      
      {/* Main scene container */}
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        opacity: sceneEntrance,
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        
        {/* Monitor - First Person POV */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: monitorTop,
          width: monitorWidth,
          height: monitorHeight,
          transform: "translateX(-50%) perspective(1000px) rotateX(5deg)",
          transformOrigin: "center bottom",
          backgroundColor: "#0a0a0a",
          borderRadius: minDim * 0.02,
          border: "4px solid #27272a",
          overflow: "hidden",
          boxShadow: "0 0 " + minDim * 0.06 + "px " + (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value) + "40, inset 0 0 " + minDim * 0.02 + "px rgba(0,0,0,0.5)",
        }}>
          {/* Screen content */}
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0c0c0c",
            padding: minDim * 0.03,
            boxSizing: "border-box",
            opacity: flicker,
          }}>
            {/* Terminal header */}
            <div style={{
              display: "flex",
              gap: 8,
              marginBottom: minDim * 0.02,
              paddingBottom: minDim * 0.015,
              borderBottom: "1px solid #27272a",
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#eab308" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ marginLeft: 12, color: "#64748b", fontSize: minDim * 0.022, fontFamily: "monospace" }}>terminal@localhost</span>
            </div>
            
            {/* Code lines */}
            <div style={{
              fontFamily: "monospace",
              fontSize: minDim * 0.028,
              lineHeight: 1.6,
            }}>
              {codeLines.slice(0, Math.max(0, visibleLines)).map((line, i) => {
                const lineProgress = spring({
                  frame: Math.max(0, adjustedFrame - 30 - i * (12 / typingDelay)),
                  fps,
                  config: { damping: 20, stiffness: 120 }
                });
                const isCommand = line.startsWith("$");
                const isSuccess = line.includes("Success") || line.includes("granted");
                const isProgress = line.startsWith("[+]");
                
                return (
                  <div key={i} style={{
                    color: isSuccess ? "#22c55e" : isCommand ? (props.terminalGreen ?? SCENE_PARAMS.terminalGreen.value) : isProgress ? "#3b82f6" : "#94a3b8",
                    opacity: lineProgress,
                    transform: "translateX(" + interpolate(lineProgress, [0, 1], [-10, 0]) + "px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: isSuccess ? "0 0 10px #22c55e50" : "none",
                  }}>
                    {line}
                  </div>
                );
              })}
              {/* Cursor */}
              {cursorBlink && visibleLines <= codeLines.length && (
                <span style={{
                  color: (props.terminalGreen ?? SCENE_PARAMS.terminalGreen.value),
                  opacity: 0.9,
                  textShadow: "0 0 8px " + (props.terminalGreen ?? SCENE_PARAMS.terminalGreen.value),
                }}>█</span>
              )}
            </div>
          </div>
          
          {/* Scanlines overlay */}
          {(props.showScanlines ?? SCENE_PARAMS.showScanlines.value) && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              pointerEvents: "none",
            }} />
          )}
          
          {/* Screen reflection */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
        </div>
        
        {/* Desk surface */}
        <div style={{
          position: "absolute",
          left: 0,
          top: height * 0.62,
          width: width,
          height: height * 0.4,
          background: "linear-gradient(180deg, " + (props.deskColor ?? SCENE_PARAMS.deskColor.value) + " 0%, #0f172a 100%)",
        }} />
        
        {/* Keyboard */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: keyboardTop,
          width: keyboardWidth,
          height: keyboardHeight,
          transform: "translateX(-50%) perspective(800px) rotateX(25deg)",
          transformOrigin: "center top",
          backgroundColor: (props.keyboardColor ?? SCENE_PARAMS.keyboardColor.value),
          borderRadius: minDim * 0.015,
          padding: minDim * 0.012,
          boxSizing: "border-box",
          boxShadow: "0 " + minDim * 0.01 + "px " + minDim * 0.03 + "px rgba(0,0,0,0.4)",
        }}>
          {/* Keyboard rows */}
          {[0, 1, 2, 3].map((row) => (
            <div key={row} style={{
              display: "flex",
              gap: minDim * 0.006,
              marginBottom: minDim * 0.006,
              marginLeft: row === 1 ? minDim * 0.01 : row === 2 ? minDim * 0.02 : row === 3 ? minDim * 0.03 : 0,
            }}>
              {Array.from({ length: row === 3 ? 10 : 13 - row }).map((_, keyIndex) => {
                // Random key press animation
                const isPressed = Math.sin(adjustedFrame * 0.3 + keyIndex * 1.7 + row * 2.3) > 0.7;
                const keyWidth = row === 3 && keyIndex === 4 ? minDim * 0.12 : minDim * 0.025;
                
                return (
                  <div key={keyIndex} style={{
                    width: keyWidth,
                    height: minDim * 0.022,
                    backgroundColor: isPressed ? "#1f2937" : "#374151",
                    borderRadius: minDim * 0.004,
                    transform: isPressed ? "translateY(2px)" : "translateY(0)",
                    boxShadow: isPressed ? "none" : "0 2px 0 #1f2937",
                    transition: "all 0.05s",
                  }} />
                );
              })}
            </div>
          ))}
          
          {/* Keyboard glow */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.02,
            left: "10%",
            right: "10%",
            height: minDim * 0.03,
            background: "radial-gradient(ellipse, " + (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value) + "20 0%, transparent 70%)",
            filter: "blur(" + minDim * 0.01 + "px)",
          }} />
        </div>
        
        {/* Left Hand */}
        <div style={{
          position: "absolute",
          left: width * 0.22,
          top: keyboardTop + keyboardHeight * 0.3,
          transform: "translateY(" + leftHandY + "px) perspective(500px) rotateX(40deg) rotateY(15deg)",
          transformOrigin: "center bottom",
        }}>
          {/* Palm */}
          <div style={{
            width: minDim * 0.1,
            height: minDim * 0.08,
            backgroundColor: (props.skinTone ?? SCENE_PARAMS.skinTone.value),
            borderRadius: "40% 40% 50% 50%",
            position: "relative",
            boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.15)",
          }}>
            {/* Monitor glow on hand */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(0deg, transparent 50%, " + (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value) + "20 100%)",
              borderRadius: "40% 40% 50% 50%",
            }} />
          </div>
          
          {/* Sleeve */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.06,
            left: -minDim * 0.015,
            width: minDim * 0.13,
            height: minDim * 0.08,
            backgroundColor: (props.sleeveColor ?? SCENE_PARAMS.sleeveColor.value),
            borderRadius: "20% 20% 40% 40%",
          }} />
          
          {/* Fingers */}
          {[0, 1, 2, 3, 4].map((finger) => {
            const fingerY = getFingerY(finger, 'left');
            const fingerWidth = finger === 0 ? minDim * 0.018 : minDim * 0.016;
            const fingerHeight = finger === 0 ? minDim * 0.04 : minDim * 0.055 - finger * minDim * 0.003;
            const fingerLeft = finger === 0 ? -minDim * 0.015 : minDim * 0.01 + finger * minDim * 0.02;
            const fingerTop = finger === 0 ? minDim * 0.02 : -fingerHeight + minDim * 0.01;
            
            return (
              <div key={finger} style={{
                position: "absolute",
                left: fingerLeft,
                top: fingerTop,
                width: fingerWidth,
                height: fingerHeight,
                backgroundColor: (props.skinTone ?? SCENE_PARAMS.skinTone.value),
                borderRadius: minDim * 0.008,
                transform: "translateY(" + fingerY + "px) rotate(" + (finger === 0 ? -30 : -5 + finger * 2) + "deg)",
                boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.1)",
              }}>
                {/* Fingernail */}
                <div style={{
                  position: "absolute",
                  top: 2,
                  left: "15%",
                  right: "15%",
                  height: fingerWidth * 0.5,
                  backgroundColor: "#e8d5c4",
                  borderRadius: "50% 50% 30% 30%",
                  opacity: 0.7,
                }} />
              </div>
            );
          })}
        </div>
        
        {/* Right Hand */}
        <div style={{
          position: "absolute",
          right: width * 0.22,
          top: keyboardTop + keyboardHeight * 0.3,
          transform: "translateY(" + rightHandY + "px) perspective(500px) rotateX(40deg) rotateY(-15deg)",
          transformOrigin: "center bottom",
        }}>
          {/* Palm */}
          <div style={{
            width: minDim * 0.1,
            height: minDim * 0.08,
            backgroundColor: (props.skinTone ?? SCENE_PARAMS.skinTone.value),
            borderRadius: "40% 40% 50% 50%",
            position: "relative",
            boxShadow: "inset 5px -5px 15px rgba(0,0,0,0.15)",
          }}>
            {/* Monitor glow on hand */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(0deg, transparent 50%, " + (props.monitorGlow ?? SCENE_PARAMS.monitorGlow.value) + "20 100%)",
              borderRadius: "40% 40% 50% 50%",
            }} />
          </div>
          
          {/* Sleeve */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.06,
            right: -minDim * 0.015,
            width: minDim * 0.13,
            height: minDim * 0.08,
            backgroundColor: (props.sleeveColor ?? SCENE_PARAMS.sleeveColor.value),
            borderRadius: "20% 20% 40% 40%",
          }} />
          
          {/* Fingers */}
          {[0, 1, 2, 3, 4].map((finger) => {
            const fingerY = getFingerY(finger, 'right');
            const fingerWidth = finger === 0 ? minDim * 0.018 : minDim * 0.016;
            const fingerHeight = finger === 0 ? minDim * 0.04 : minDim * 0.055 - finger * minDim * 0.003;
            const fingerRight = finger === 0 ? -minDim * 0.015 : minDim * 0.01 + finger * minDim * 0.02;
            const fingerTop = finger === 0 ? minDim * 0.02 : -fingerHeight + minDim * 0.01;
            
            return (
              <div key={finger} style={{
                position: "absolute",
                right: fingerRight,
                top: fingerTop,
                width: fingerWidth,
                height: fingerHeight,
                backgroundColor: (props.skinTone ?? SCENE_PARAMS.skinTone.value),
                borderRadius: minDim * 0.008,
                transform: "translateY(" + fingerY + "px) rotate(" + (finger === 0 ? 30 : 5 - finger * 2) + "deg)",
                boxShadow: "inset 2px -2px 5px rgba(0,0,0,0.1)",
              }}>
                {/* Fingernail */}
                <div style={{
                  position: "absolute",
                  top: 2,
                  left: "15%",
                  right: "15%",
                  height: fingerWidth * 0.5,
                  backgroundColor: "#e8d5c4",
                  borderRadius: "50% 50% 30% 30%",
                  opacity: 0.7,
                }} />
              </div>
            );
          })}
        </div>
        
        {/* Wrist area ambient shadow */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: keyboardTop + keyboardHeight + minDim * 0.05,
          width: width * 0.5,
          height: minDim * 0.08,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
          filter: "blur(" + minDim * 0.02 + "px)",
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

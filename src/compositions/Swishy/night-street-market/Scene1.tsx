// Template: night-street-market
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  line1: { type: "text", label: "Line 1", value: "NIGHT" },
  line2: { type: "text", label: "Line 2", value: "STREET" },
  line3: { type: "text", label: "Line 3", value: "MARKET" },
  blockColor: { type: "color", label: "Block Color", value: "#111111" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Neon Color", value: "#ff0055" },
  bulbColor: { type: "color", label: "Bulb Color", value: "#ffcc00" },
  backgroundDark: { type: "color", label: "Background Dark", value: "#050505" },
  backgroundLight: { type: "color", label: "Background Light", value: "#1a0b12" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 15, min: 5, max: 30, step: 1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 1, min: 0, max: 2, step: 0.1 },
  showStringLights: { type: "boolean", label: "Show String Lights", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const stagger = SCENE_PARAMS.staggerDelay.value;
  const scaleValue = SCENE_PARAMS.scale.value;
  const glow = SCENE_PARAMS.glowIntensity.value;
  
  const lines = [
    { text: SCENE_PARAMS.line1.value, rotation: -1.5 },
    { text: SCENE_PARAMS.line2.value, rotation: 1 },
    { text: SCENE_PARAMS.line3.value, rotation: -0.5 },
  ];
  
  const fontSize = minDim * 0.13;
  const paddingH = minDim * 0.1;
  const paddingV = minDim * 0.04;

  // Generate Background String Lights
  const stringLights = Array.from({ length: 8 }).map((_, i) => ({
    x: (width / 7) * i,
    y: 100 + Math.sin(i) * 50,
    delay: i * 5,
  }));

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(circle at center, " + SCENE_PARAMS.backgroundLight.value + " 0%, " + SCENE_PARAMS.backgroundDark.value + " 100%)",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      
      {/* Background Ambience: Hanging String Lights */}
      {SCENE_PARAMS.showStringLights.value && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "30%" }}>
          {stringLights.map((light, i) => {
            const sway = Math.sin(adjustedFrame * 0.05 + light.delay) * 5;
            const flicker = Math.random() > 0.98 ? 0.5 : 1;
            return (
              <div key={i} style={{
                position: "absolute",
                left: light.x,
                top: light.y + sway,
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: SCENE_PARAMS.bulbColor.value,
                boxShadow: "0 0 " + (20 * glow) + "px " + SCENE_PARAMS.bulbColor.value,
                opacity: flicker * 0.8,
              }} />
            );
          })}
          <svg width="100%" height="300" style={{ position: "absolute", top: 0, left: 0, opacity: 0.2 }}>
             <path 
               d={`M 0 100 Q ${width/2} 250 ${width} 100`} 
               stroke={SCENE_PARAMS.bulbColor.value} 
               fill="none" 
               strokeWidth="2" 
             />
          </svg>
        </div>
      )}

      <div style={{
        transform: "scale(" + scaleValue + ")",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: minDim * 0.05,
      }}>
        {lines.map((line, i) => {
          const delay = i * stagger;
          const localFrame = Math.max(0, adjustedFrame - delay);
          
          const entrance = spring({
            frame: localFrame,
            fps,
            config: { damping: 15, stiffness: 100 },
          });
          
          // Neon Flicker logic
          const flickerBase = Math.sin(adjustedFrame * 0.3 + i);
          const isFlickering = localFrame > 0 && localFrame < 40;
          const neonOpacity = isFlickering ? (flickerBase > 0 ? 1 : 0.3) : 1;
          
          const slideY = interpolate(entrance, [0, 1], [40, 0]);
          const scale = interpolate(entrance, [0, 1], [0.9, 1]);
          const opacity = interpolate(entrance, [0, 0.2], [0, 1]);

          // Decorative Bulbs around the border
          const bulbs = Array.from({ length: 12 });

          return (
            <div
              key={i}
              style={{
                position: "relative",
                backgroundColor: SCENE_PARAMS.blockColor.value,
                padding: paddingV + "px " + paddingH + "px",
                opacity: opacity,
                transform: "translateY(" + slideY + "px) rotate(" + line.rotation + "deg) scale(" + scale + ")",
                border: "3px solid " + SCENE_PARAMS.accentColor.value,
                boxShadow: "0 0 " + (30 * entrance * glow) + "px " + SCENE_PARAMS.accentColor.value + "44",
              }}
            >
              {/* Perimeter Light Bulbs */}
              {bulbs.map((_, bi) => {
                const blink = Math.sin(adjustedFrame * 0.2 + bi) > 0;
                const pos = bi < 4 
                  ? { top: -6, left: (bi * 25) + "%" } 
                  : bi < 6 
                  ? { right: -6, top: ((bi-4) * 50) + "%" }
                  : bi < 10
                  ? { bottom: -6, right: ((bi-6) * 25) + "%" }
                  : { left: -6, bottom: ((bi-10) * 50) + "%" };
                
                return (
                  <div key={bi} style={{
                    position: "absolute",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: blink ? SCENE_PARAMS.accentColor.value : "#333",
                    boxShadow: blink ? "0 0 10px " + SCENE_PARAMS.accentColor.value : "none",
                    zIndex: 10,
                    ...pos
                  }} />
                );
              })}

              <span style={{
                color: SCENE_PARAMS.textColor.value,
                fontSize: fontSize,
                fontWeight: 900,
                fontFamily: "Impact, 'Arial Narrow Bold', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                lineHeight: 1,
                opacity: neonOpacity,
                textShadow: "0 0 " + (15 * glow) + "px " + SCENE_PARAMS.accentColor.value,
              }}>
                {line.text}
              </span>

              {/* Price Tag/Sticker */}
              {i === lines.length - 1 && (
                <div style={{
                  position: "absolute",
                  right: -minDim * 0.08,
                  bottom: -minDim * 0.04,
                  width: minDim * 0.15,
                  height: minDim * 0.15,
                  backgroundColor: SCENE_PARAMS.bulbColor.value,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "rotate(15deg) scale(" + (entrance * 1.1) + ")",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                  border: "2px dashed black",
                }}>
                   <div style={{ 
                     fontSize: minDim * 0.035, 
                     fontWeight: 900, 
                     color: "black",
                     fontFamily: "system-ui",
                     textAlign: "center"
                   }}>
                     OPEN<br/>LATE
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scanning light effect */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "20%",
        background: "linear-gradient(to bottom, transparent, " + SCENE_PARAMS.accentColor.value + "22, transparent)",
        top: (adjustedFrame % 200) / 2 + "%",
        pointerEvents: "none"
      }} />
    </AbsoluteFill>
  );
}

export default Scene;

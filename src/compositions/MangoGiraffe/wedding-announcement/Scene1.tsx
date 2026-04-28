// Template: wedding-announcement
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  title: { type: "text", label: "Title", value: "Claudia & Ernesto" },
  
  // Typography
  fontFamily: { type: "font", label: "Font", value: "Playfair Display" },
  
  // Colors
  backgroundColor: { type: "color", label: "Sky Top", value: "#0a1628" },
  skyBottom: { type: "color", label: "Sky Bottom", value: "#1a3a5c" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent Color", value: "#e8b84a" },
  buildingColor: { type: "color", label: "Building Color", value: "#0d1117" },
  windowColor: { type: "color", label: "Window Glow", value: "#f5d76e" },
  starColor: { type: "color", label: "Star Color", value: "#fffacd" },
  swirlColor: { type: "color", label: "Swirl Color", value: "#f0d890" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  starCount: { type: "number", label: "Star Count", value: 35, min: 15, max: 60, step: 5 },
  swirlCount: { type: "number", label: "Swirl Count", value: 6, min: 3, max: 12, step: 1 },
  windowFlicker: { type: "boolean", label: "Window Flicker", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const minDim = Math.min(width, height);
  const isPortrait = height > width;
  
  // Title animation
  const titleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  
  // Generate stars
  const starCount = (props.starCount ?? SCENE_PARAMS.starCount.value);
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    const seed1 = Math.sin(i * 12.9898) * 43758.5453 % 1;
    const seed2 = Math.sin(i * 78.233) * 43758.5453 % 1;
    const seed3 = Math.sin(i * 37.719) * 43758.5453 % 1;
    
    const x = (seed1 * 0.9 + 0.05) * width;
    const y = (seed2 * 0.45 + 0.05) * height;
    
    const twinkleSpeed = 0.06 + seed3 * 0.08;
    const twinklePhase = i * 2.3;
    const twinkle = (Math.sin((adjustedFrame * twinkleSpeed) + twinklePhase) + 1) / 2;
    
    const starDelay = 15 + (seed1 * 25);
    const starEntrance = interpolate(adjustedFrame, [starDelay, starDelay + 20], [0, 1], { extrapolateRight: "clamp" });
    
    stars.push({
      x,
      y,
      size: 2 + seed3 * 4,
      opacity: starEntrance * (0.4 + twinkle * 0.6),
    });
  }
  
  // Mid-century modern buildings data - simplified with fewer windows
  const buildings = [
    { x: 0, w: 0.08, h: 0.25, windows: 2 },
    { x: 0.07, w: 0.12, h: 0.38, windows: 3 },
    { x: 0.17, w: 0.06, h: 0.22, windows: 1 },
    { x: 0.22, w: 0.14, h: 0.45, windows: 4 },
    { x: 0.34, w: 0.08, h: 0.3, windows: 2 },
    { x: 0.40, w: 0.1, h: 0.52, windows: 4 },
    { x: 0.48, w: 0.07, h: 0.28, windows: 2 },
    { x: 0.53, w: 0.15, h: 0.48, windows: 3 },
    { x: 0.66, w: 0.06, h: 0.2, windows: 1 },
    { x: 0.70, w: 0.12, h: 0.42, windows: 3 },
    { x: 0.80, w: 0.08, h: 0.32, windows: 2 },
    { x: 0.86, w: 0.14, h: 0.36, windows: 3 },
  ];
  
  // Skyline entrance animation
  const skylineProgress = spring({ frame: Math.max(0, adjustedFrame - 5), fps, config: { damping: 22, stiffness: 85 } });
  
  // Mid-century diamond/starburst element
  const Starburst = ({ props, size, color }: any) => (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 0 L22 16 L40 20 L22 24 L20 40 L18 24 L0 20 L18 16 Z" fill={color} />
      <path d="M20 8 L21 17 L30 20 L21 23 L20 32 L19 23 L10 20 L19 17 Z" fill={color} opacity="0.6" />
    </svg>
  );
  
  // Vintage cartoon swirl component
  const VintageSwirl = ({ props, size, color, rotation, flip }: any) => (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <path
        d="M50 85 C50 85 30 75 25 55 C20 35 35 20 50 25 C65 30 70 45 60 55 C50 65 40 55 45 45 C50 35 60 40 55 50"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px " + color + ")" }}
      />
      <circle cx="55" cy="50" r="4" fill={color} />
    </svg>
  );
  
  // Generate animated swirls
  const swirlCount = (props.swirlCount ?? SCENE_PARAMS.swirlCount.value);
  const swirls = [];
  for (let i = 0; i < swirlCount; i++) {
    const seed1 = Math.sin(i * 23.456) * 43758.5453 % 1;
    const seed2 = Math.sin(i * 67.891) * 43758.5453 % 1;
    const seed3 = Math.sin(i * 89.123) * 43758.5453 % 1;
    
    const baseX = (seed1 * 0.7 + 0.15) * width;
    const baseY = (seed2 * 0.4 + 0.15) * height;
    
    const swirlDelay = 40 + i * 12;
    const swirlEntrance = interpolate(adjustedFrame, [swirlDelay, swirlDelay + 30], [0, 1], { extrapolateRight: "clamp" });
    
    // Floating motion
    const floatX = Math.sin((adjustedFrame * 0.03) + i * 1.5) * minDim * 0.02;
    const floatY = Math.cos((adjustedFrame * 0.025) + i * 2.1) * minDim * 0.015;
    
    // Rotation animation
    const rotationAnim = Math.sin((adjustedFrame * 0.02) + i * 0.8) * 15;
    
    // Scale pulse
    const scalePulse = 1 + Math.sin((adjustedFrame * 0.04) + i * 1.2) * 0.1;
    
    // Fade in and out gently
    const breathe = 0.6 + Math.sin((adjustedFrame * 0.03) + i * 0.9) * 0.4;
    
    swirls.push({
      x: baseX + floatX,
      y: baseY + floatY,
      size: minDim * (0.08 + seed3 * 0.06),
      rotation: rotationAnim,
      scale: scalePulse,
      opacity: swirlEntrance * breathe,
      flip: i % 2 === 0,
    });
  }
  
  // Decorative lines animation
  const lineProgress = interpolate(adjustedFrame, [35, 60], [0, 1], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ 
      background: "linear-gradient(to bottom, " + (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) + " 0%, " + (props.skyBottom ?? SCENE_PARAMS.skyBottom.value) + " 60%, #2d4a6d 100%)",
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center", width: "100%", height: "100%" }}>
        
        {/* Stars */}
        {stars.map((star, i) => (
          <div
            key={"star-" + i}
            style={{
              position: "absolute",
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: (props.starColor ?? SCENE_PARAMS.starColor.value),
              borderRadius: "50%",
              opacity: star.opacity,
              boxShadow: "0 0 " + (star.size * 2) + "px " + (props.starColor ?? SCENE_PARAMS.starColor.value),
            }}
          />
        ))}
        
        {/* Animated vintage swirls */}
        {swirls.map((swirl, i) => (
          <div
            key={"swirl-" + i}
            style={{
              position: "absolute",
              left: swirl.x,
              top: swirl.y,
              transform: "translate(-50%, -50%) rotate(" + swirl.rotation + "deg) scale(" + swirl.scale + ")",
              opacity: swirl.opacity,
              zIndex: 5,
            }}
          >
            <VintageSwirl props={props}  
              size={swirl.size} 
              color={(props.swirlColor ?? SCENE_PARAMS.swirlColor.value)}
              rotation={swirl.rotation}
              flip={swirl.flip}
            />
          </div>
        ))}
        
        {/* City skyline silhouette */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.55,
          transform: "translateY(" + interpolate(skylineProgress, [0, 1], [height * 0.3, 0]) + "px)",
          opacity: skylineProgress,
        }}>
          {buildings.map((building, i) => {
            const buildingDelay = i * 2;
            const buildingProgress = spring({ 
              frame: Math.max(0, adjustedFrame - buildingDelay - 8), 
              fps, 
              config: { damping: 20, stiffness: 90 } 
            });
            
            const bHeight = height * building.h * buildingProgress;
            const bWidth = width * building.w;
            const bLeft = width * building.x;
            
            // Generate fewer windows for this building
            const windowCount = building.windows;
            const windows = [];
            
            for (let w = 0; w < windowCount; w++) {
              const seed = Math.sin((i * 100 + w * 17) * 12.9898) * 43758.5453 % 1;
              const flickerSeed = Math.sin((i * 50 + w * 23) * 45.233) * 43758.5453 % 1;
              const flicker = (props.windowFlicker ?? SCENE_PARAMS.windowFlicker.value) 
                ? (Math.sin((adjustedFrame * 0.08) + flickerSeed * 20) + 1) / 2 * 0.3 + 0.7
                : 1;
              
              const row = Math.floor(w / 2);
              const col = w % 2;
              
              windows.push({
                x: 0.25 + col * 0.5,
                y: 0.2 + row * 0.25,
                opacity: flicker,
              });
            }
            
            return (
              <div
                key={"building-" + i}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: bLeft,
                  width: bWidth,
                  height: bHeight,
                  backgroundColor: (props.buildingColor ?? SCENE_PARAMS.buildingColor.value),
                }}
              >
                {/* Building top detail - mid-century style */}
                {i % 3 === 0 && (
                  <div style={{
                    position: "absolute",
                    top: -bWidth * 0.15,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: bWidth * 0.3,
                    height: bWidth * 0.15,
                    backgroundColor: (props.buildingColor ?? SCENE_PARAMS.buildingColor.value),
                  }} />
                )}
                {i % 3 === 1 && (
                  <div style={{
                    position: "absolute",
                    top: -bWidth * 0.2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: (bWidth * 0.25) + "px solid transparent",
                    borderRight: (bWidth * 0.25) + "px solid transparent",
                    borderBottom: (bWidth * 0.2) + "px solid " + (props.buildingColor ?? SCENE_PARAMS.buildingColor.value),
                  }} />
                )}
                
                {/* Simplified windows */}
                {windows.map((win, wi) => (
                  <div
                    key={"window-" + wi}
                    style={{
                      position: "absolute",
                      left: (win.x * 100) + "%",
                      bottom: ((1 - win.y) * 70 + 10) + "%",
                      transform: "translate(-50%, 50%)",
                      width: bWidth * 0.15,
                      height: bWidth * 0.22,
                      backgroundColor: (props.windowColor ?? SCENE_PARAMS.windowColor.value),
                      opacity: win.opacity * 0.85,
                      boxShadow: "0 0 " + (bWidth * 0.1) + "px " + (props.windowColor ?? SCENE_PARAMS.windowColor.value),
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
        
        {/* Main content area */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
        }}>
          {/* Top starburst */}
          <div style={{
            opacity: interpolate(adjustedFrame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
            transform: "rotate(" + (adjustedFrame * 0.3) + "deg)",
            marginBottom: minDim * 0.03,
          }}>
            <Starburst props={props}  size={minDim * 0.08} color={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
          </div>
          
          {/* Decorative top line */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: minDim * 0.015,
            marginBottom: minDim * 0.025,
          }}>
            <div style={{
              width: interpolate(lineProgress, [0, 1], [0, minDim * 0.15]),
              height: 2,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
            <div style={{
              width: minDim * 0.012,
              height: minDim * 0.012,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              transform: "rotate(45deg)",
              opacity: lineProgress,
            }} />
            <div style={{
              width: interpolate(lineProgress, [0, 1], [0, minDim * 0.15]),
              height: 2,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
          </div>
          
          {/* Title */}
          <h1 style={{
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontSize: isPortrait ? minDim * 0.11 : minDim * 0.09,
            fontWeight: 400,
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.04em",
            margin: 0,
            opacity: titleOpacity,
            transform: "translateY(" + titleY + "px)",
            textShadow: "0 0 " + (minDim * 0.02) + "px rgba(232, 184, 74, 0.4), 0 " + (minDim * 0.004) + "px " + (minDim * 0.01) + "px rgba(0,0,0,0.5)",
          }}>
            {(props.title ?? SCENE_PARAMS.title.value)}
          </h1>
          
          {/* Decorative bottom line */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: minDim * 0.015,
            marginTop: minDim * 0.025,
          }}>
            <div style={{
              width: interpolate(lineProgress, [0, 1], [0, minDim * 0.15]),
              height: 2,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
            <div style={{
              width: minDim * 0.012,
              height: minDim * 0.012,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              transform: "rotate(45deg)",
              opacity: lineProgress,
            }} />
            <div style={{
              width: interpolate(lineProgress, [0, 1], [0, minDim * 0.15]),
              height: 2,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            }} />
          </div>
          
          {/* Bottom starburst */}
          <div style={{
            opacity: interpolate(adjustedFrame, [25, 45], [0, 1], { extrapolateRight: "clamp" }),
            transform: "rotate(" + (-adjustedFrame * 0.25) + "deg)",
            marginTop: minDim * 0.03,
          }}>
            <Starburst props={props}  size={minDim * 0.06} color={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
          </div>
        </div>
        
        {/* Side starbursts */}
        <div style={{
          position: "absolute",
          left: "8%",
          top: "25%",
          opacity: interpolate(adjustedFrame, [30, 50], [0, 0.7], { extrapolateRight: "clamp" }),
          transform: "rotate(" + (adjustedFrame * 0.2) + "deg)",
        }}>
          <Starburst props={props}  size={minDim * 0.05} color={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
        </div>
        <div style={{
          position: "absolute",
          right: "8%",
          top: "30%",
          opacity: interpolate(adjustedFrame, [35, 55], [0, 0.7], { extrapolateRight: "clamp" }),
          transform: "rotate(" + (-adjustedFrame * 0.2) + "deg)",
        }}>
          <Starburst props={props}  size={minDim * 0.045} color={(props.accentColor ?? SCENE_PARAMS.accentColor.value)} />
        </div>
        
        {/* Gradient overlay at bottom for depth */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.15,
          background: "linear-gradient(to top, rgba(10, 22, 40, 0.8) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

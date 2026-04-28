// Template: mario-game
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#8B4513" },
  laptopColor: { type: "color", label: "Laptop Color", value: "#2d3748" },
  screenColor: { type: "color", label: "Screen Color", value: "#87CEEB" },
  marioRed: { type: "color", label: "Mario Red", value: "#E52521" },
  marioBlue: { type: "color", label: "Mario Blue", value: "#049CD8" },
  coinColor: { type: "color", label: "Coin Color", value: "#FFD700" },
  mugColor: { type: "color", label: "Mug Color", value: "#f5f5f5" },
  stickyColor: { type: "color", label: "Sticky Note", value: "#FFEB3B" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const f = frame * speed;
  
  const isPortrait = height > width;
  const laptopWidth = isPortrait ? width * 0.85 : width * 0.5;
  const laptopHeight = laptopWidth * 0.65;
  const screenWidth = laptopWidth * 0.9;
  const screenHeight = laptopHeight * 0.75;
  const marioSize = minDim * 0.06;
  
  // Phase timing
  const phase1End = 60;  // Mario running in screen
  const phase2End = 90;  // Glitch
  const phase3End = 130; // Jump out
  const phase4End = 200; // Land and look around
  const phase5End = 350; // Navigate obstacles, collect coins
  const phase6End = 420; // Jump back in
  
  // Mario in-screen running animation (phase 1)
  const inScreenRun = f < phase1End ? (f % 20) / 20 : 0;
  const marioScreenX = f < phase1End ? interpolate(f, [0, phase1End], [0, screenWidth * 0.6], { extrapolateRight: "clamp" }) : screenWidth * 0.6;
  
  // Glitch effect (phase 2)
  const glitchIntensity = f >= phase1End && f < phase2End 
    ? interpolate(f, [phase1End, phase2End], [0, 1], { extrapolateRight: "clamp" }) 
    : 0;
  const glitchOffset = Math.sin(f * 2) * glitchIntensity * 10;
  const glitchColor = glitchIntensity > 0.5 ? "#ff00ff" : "transparent";
  
  // Jump out animation (phase 3)
  const jumpOutProgress = f >= phase2End && f < phase3End
    ? interpolate(f, [phase2End, phase3End], [0, 1], { extrapolateRight: "clamp" })
    : f >= phase3End ? 1 : 0;
  
  // Mario position calculation
  let marioX, marioY, marioScale, marioRotation;
  const deskY = height * 0.72;
  const laptopCenterX = width / 2;
  const laptopTopY = height * 0.35;
  
  if (f < phase2End) {
    // In screen
    marioX = laptopCenterX - screenWidth/2 + marioScreenX + marioSize/2;
    marioY = laptopTopY + screenHeight * 0.6;
    marioScale = 0.8;
    marioRotation = 0;
  } else if (f < phase3End) {
    // Jumping out - arc trajectory
    const jumpT = jumpOutProgress;
    const startX = laptopCenterX;
    const startY = laptopTopY + screenHeight * 0.5;
    const landX = laptopCenterX + minDim * 0.15;
    const landY = deskY;
    const arcHeight = minDim * 0.25;
    
    marioX = interpolate(jumpT, [0, 1], [startX, landX]);
    marioY = startY + (landY - startY) * jumpT - Math.sin(jumpT * Math.PI) * arcHeight;
    marioScale = interpolate(jumpT, [0, 0.5, 1], [0.8, 1.3, 1]);
    marioRotation = interpolate(jumpT, [0, 1], [0, 360]);
  } else if (f < phase4End) {
    // Landing with squash & stretch
    const landT = interpolate(f, [phase3End, phase3End + 15], [0, 1], { extrapolateRight: "clamp" });
    const squash = f < phase3End + 8 ? interpolate(f, [phase3End, phase3End + 8], [1, 0.6], { extrapolateRight: "clamp" }) : interpolate(f, [phase3End + 8, phase3End + 20], [0.6, 1], { extrapolateRight: "clamp" });
    
    marioX = laptopCenterX + minDim * 0.15;
    marioY = deskY;
    marioScale = 1;
    marioRotation = 0;
  } else if (f < phase5End) {
    // Navigate obstacles
    const navProgress = interpolate(f, [phase4End, phase5End], [0, 1], { extrapolateRight: "clamp" });
    
    // Keyframe positions for obstacle navigation
    const positions = [
      { x: laptopCenterX + minDim * 0.15, y: deskY },           // Start
      { x: laptopCenterX + minDim * 0.25, y: deskY - minDim * 0.12 }, // Jump to sticky
      { x: laptopCenterX + minDim * 0.35, y: deskY - minDim * 0.08 }, // Second sticky
      { x: laptopCenterX - minDim * 0.05, y: deskY },           // Past mug
      { x: laptopCenterX - minDim * 0.2, y: deskY },            // Collect coins
      { x: laptopCenterX, y: deskY },                           // Return to laptop
    ];
    
    const segmentCount = positions.length - 1;
    const currentSegment = Math.min(Math.floor(navProgress * segmentCount), segmentCount - 1);
    const segmentProgress = (navProgress * segmentCount) - currentSegment;
    
    const fromPos = positions[currentSegment];
    const toPos = positions[currentSegment + 1];
    
    marioX = interpolate(segmentProgress, [0, 1], [fromPos.x, toPos.x]);
    const baseY = interpolate(segmentProgress, [0, 1], [fromPos.y, toPos.y]);
    const jumpHeight = Math.sin(segmentProgress * Math.PI) * minDim * 0.08;
    marioY = baseY - jumpHeight;
    marioScale = 1;
    marioRotation = 0;
  } else {
    // Jump back into laptop
    const returnProgress = interpolate(f, [phase5End, phase6End], [0, 1], { extrapolateRight: "clamp" });
    const startX = laptopCenterX;
    const startY = deskY;
    const endX = laptopCenterX;
    const endY = laptopTopY + screenHeight * 0.5;
    const arcHeight = minDim * 0.2;
    
    marioX = interpolate(returnProgress, [0, 1], [startX, endX]);
    marioY = startY + (endY - startY) * returnProgress - Math.sin(returnProgress * Math.PI) * arcHeight;
    marioScale = interpolate(returnProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
    marioRotation = interpolate(returnProgress, [0, 1], [0, -360]);
  }
  
  // Running animation legs
  const runCycle = Math.sin(f * 0.8) * 0.3;
  
  // Coin collection animation
  const coinPositions = [
    { x: laptopCenterX - minDim * 0.15, y: deskY - minDim * 0.02 },
    { x: laptopCenterX - minDim * 0.18, y: deskY - minDim * 0.02 },
    { x: laptopCenterX - minDim * 0.21, y: deskY - minDim * 0.02 },
  ];
  
  const coinCollectFrame = phase4End + 100;
  
  // Screen content - game world
  const groundBlocks = 8;
  const cloudY = screenHeight * 0.2;
  
  // Phone notification flash
  const phoneFlash = f >= phase4End + 30 && f < phase4End + 50;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center", width: "100%", height: "100%", position: "relative" }}>
        
        {/* Desk surface */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.32,
          background: "linear-gradient(to bottom, #A0522D, #8B4513)",
          borderTop: "4px solid #654321",
        }} />
        
        {/* Laptop */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: height * 0.25,
          transform: "translateX(-50%)",
          width: laptopWidth,
          height: laptopHeight,
        }}>
          {/* Laptop lid/screen frame */}
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: (props.laptopColor ?? SCENE_PARAMS.laptopColor.value),
            borderRadius: minDim * 0.015,
            padding: laptopWidth * 0.05,
            boxSizing: "border-box",
          }}>
            {/* Screen */}
            <div style={{
              width: "100%",
              height: "100%",
              backgroundColor: (props.screenColor ?? SCENE_PARAMS.screenColor.value),
              borderRadius: minDim * 0.008,
              overflow: "hidden",
              position: "relative",
              transform: "translateX(" + glitchOffset + "px)",
              boxShadow: glitchIntensity > 0 ? "0 0 20px " + glitchColor : "none",
            }}>
              {/* Game world inside screen */}
              {f < phase6End - 20 && (
                <>
                  {/* Sky gradient */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, #87CEEB, #98D8E8)",
                  }} />
                  
                  {/* Clouds */}
                  <div style={{
                    position: "absolute",
                    left: "20%",
                    top: cloudY,
                    width: screenWidth * 0.15,
                    height: screenWidth * 0.08,
                    backgroundColor: "white",
                    borderRadius: screenWidth * 0.04,
                    opacity: 0.9,
                  }} />
                  <div style={{
                    position: "absolute",
                    left: "60%",
                    top: cloudY * 1.3,
                    width: screenWidth * 0.12,
                    height: screenWidth * 0.06,
                    backgroundColor: "white",
                    borderRadius: screenWidth * 0.03,
                    opacity: 0.8,
                  }} />
                  
                  {/* Ground blocks */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: screenHeight * 0.25,
                    display: "flex",
                  }}>
                    {Array.from({ length: groundBlocks }).map((_, i) => (
                      <div key={i} style={{
                        flex: 1,
                        backgroundColor: i % 2 === 0 ? "#8B4513" : "#A0522D",
                        borderTop: "3px solid #654321",
                        borderRight: "1px solid #654321",
                      }} />
                    ))}
                  </div>
                  
                  {/* Question block */}
                  <div style={{
                    position: "absolute",
                    left: "40%",
                    top: "45%",
                    width: screenWidth * 0.1,
                    height: screenWidth * 0.1,
                    backgroundColor: "#FFB800",
                    border: "3px solid #8B4513",
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: screenWidth * 0.06,
                    fontWeight: "bold",
                    color: "#8B4513",
                  }}>?</div>
                  
                  {/* In-screen Mario (only during phase 1) */}
                  {f < phase2End && (
                    <div style={{
                      position: "absolute",
                      left: marioScreenX,
                      bottom: screenHeight * 0.25,
                      width: marioSize * 0.6,
                      height: marioSize * 0.8,
                    }}>
                      {/* Mario head */}
                      <div style={{
                        width: "100%",
                        height: "40%",
                        backgroundColor: (props.marioRed ?? SCENE_PARAMS.marioRed.value),
                        borderRadius: "50% 50% 0 0",
                      }} />
                      {/* Mario face */}
                      <div style={{
                        width: "100%",
                        height: "25%",
                        backgroundColor: "#FDBCB4",
                      }} />
                      {/* Mario body */}
                      <div style={{
                        width: "100%",
                        height: "35%",
                        backgroundColor: (props.marioBlue ?? SCENE_PARAMS.marioBlue.value),
                        borderRadius: "0 0 30% 30%",
                      }} />
                    </div>
                  )}
                  
                  {/* Glitch lines */}
                  {glitchIntensity > 0 && (
                    <>
                      <div style={{
                        position: "absolute",
                        top: "30%",
                        left: 0,
                        right: 0,
                        height: 4,
                        backgroundColor: "#ff00ff",
                        opacity: glitchIntensity,
                        transform: "translateX(" + (Math.random() * 20 - 10) + "px)",
                      }} />
                      <div style={{
                        position: "absolute",
                        top: "60%",
                        left: 0,
                        right: 0,
                        height: 6,
                        backgroundColor: "#00ffff",
                        opacity: glitchIntensity * 0.8,
                        transform: "translateX(" + (Math.random() * 20 - 10) + "px)",
                      }} />
                    </>
                  )}
                </>
              )}
              
              {/* Normal screen after Mario returns */}
              {f >= phase6End - 20 && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, #87CEEB, #98D8E8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <div style={{ color: "#333", fontSize: minDim * 0.02, fontWeight: "bold" }}>GAME PAUSED</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Laptop base */}
          <div style={{
            position: "absolute",
            bottom: -laptopHeight * 0.08,
            left: "5%",
            width: "90%",
            height: laptopHeight * 0.08,
            backgroundColor: "#1a202c",
            borderRadius: "0 0 8px 8px",
          }} />
        </div>
        
        {/* Coffee Mug (giant pipe) */}
        <div style={{
          position: "absolute",
          left: laptopCenterX + minDim * 0.08,
          top: deskY - minDim * 0.12,
          width: minDim * 0.08,
          height: minDim * 0.12,
          backgroundColor: (props.mugColor ?? SCENE_PARAMS.mugColor.value),
          borderRadius: "0 0 10px 10px",
          border: "3px solid #ddd",
          borderTop: "none",
        }}>
          {/* Mug handle */}
          <div style={{
            position: "absolute",
            right: -minDim * 0.025,
            top: "20%",
            width: minDim * 0.025,
            height: "50%",
            border: "3px solid #ddd",
            borderLeft: "none",
            borderRadius: "0 10px 10px 0",
          }} />
          {/* Coffee inside */}
          <div style={{
            position: "absolute",
            top: minDim * 0.01,
            left: "10%",
            right: "10%",
            height: "70%",
            backgroundColor: "#4a2c2a",
            borderRadius: "0 0 6px 6px",
          }} />
        </div>
        
        {/* Sticky notes (platforms) */}
        <div style={{
          position: "absolute",
          left: laptopCenterX + minDim * 0.22,
          top: deskY - minDim * 0.15,
          width: minDim * 0.08,
          height: minDim * 0.08,
          backgroundColor: (props.stickyColor ?? SCENE_PARAMS.stickyColor.value),
          transform: "rotate(-5deg)",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        }} />
        <div style={{
          position: "absolute",
          left: laptopCenterX + minDim * 0.32,
          top: deskY - minDim * 0.11,
          width: minDim * 0.07,
          height: minDim * 0.07,
          backgroundColor: "#FF6B6B",
          transform: "rotate(3deg)",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        }} />
        
        {/* Phone */}
        <div style={{
          position: "absolute",
          left: laptopCenterX - minDim * 0.3,
          top: deskY - minDim * 0.1,
          width: minDim * 0.06,
          height: minDim * 0.1,
          backgroundColor: "#1a1a2e",
          borderRadius: minDim * 0.008,
          border: "2px solid #333",
          boxShadow: phoneFlash ? "0 0 20px #3b82f6" : "none",
        }}>
          {/* Phone screen */}
          <div style={{
            margin: "10%",
            height: "75%",
            backgroundColor: phoneFlash ? "#3b82f6" : "#0f172a",
            borderRadius: minDim * 0.004,
          }} />
        </div>
        
        {/* Paper clip coins */}
        {coinPositions.map((pos, i) => {
          const collected = f > coinCollectFrame + i * 8;
          const coinY = collected 
            ? interpolate(f, [coinCollectFrame + i * 8, coinCollectFrame + i * 8 + 15], [pos.y, pos.y - minDim * 0.1], { extrapolateRight: "clamp" })
            : pos.y;
          const coinOpacity = collected
            ? interpolate(f, [coinCollectFrame + i * 8, coinCollectFrame + i * 8 + 15], [1, 0], { extrapolateRight: "clamp" })
            : 1;
          const coinRotation = f * 8 + i * 45;
          
          return (
            <div key={i} style={{
              position: "absolute",
              left: pos.x,
              top: coinY,
              width: minDim * 0.025,
              height: minDim * 0.04,
              opacity: coinOpacity,
              transform: "rotateY(" + coinRotation + "deg)",
            }}>
              {/* Paper clip shape */}
              <div style={{
                width: "100%",
                height: "100%",
                border: "3px solid " + (props.coinColor ?? SCENE_PARAMS.coinColor.value),
                borderRadius: minDim * 0.01,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: "30%",
                  left: "20%",
                  right: "20%",
                  height: "40%",
                  border: "2px solid " + (props.coinColor ?? SCENE_PARAMS.coinColor.value),
                  borderRadius: minDim * 0.005,
                }} />
              </div>
            </div>
          );
        })}
        
        {/* Real-world Mario */}
        {f >= phase2End && (
          <div style={{
            position: "absolute",
            left: marioX - marioSize / 2,
            top: marioY - marioSize,
            width: marioSize,
            height: marioSize,
            transform: "scale(" + marioScale + ") rotate(" + marioRotation + "deg)",
            transformOrigin: "center bottom",
          }}>
            {/* Mario hat */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "10%",
              width: "80%",
              height: "25%",
              backgroundColor: (props.marioRed ?? SCENE_PARAMS.marioRed.value),
              borderRadius: "50% 50% 0 0",
            }} />
            {/* Hat brim */}
            <div style={{
              position: "absolute",
              top: "20%",
              left: 0,
              width: "100%",
              height: "10%",
              backgroundColor: (props.marioRed ?? SCENE_PARAMS.marioRed.value),
            }} />
            {/* Face */}
            <div style={{
              position: "absolute",
              top: "28%",
              left: "15%",
              width: "70%",
              height: "30%",
              backgroundColor: "#FDBCB4",
              borderRadius: "10%",
            }}>
              {/* Eyes */}
              <div style={{
                position: "absolute",
                top: "25%",
                left: "20%",
                width: "20%",
                height: "30%",
                backgroundColor: "#000",
                borderRadius: "50%",
              }} />
              <div style={{
                position: "absolute",
                top: "25%",
                right: "20%",
                width: "20%",
                height: "30%",
                backgroundColor: "#000",
                borderRadius: "50%",
              }} />
              {/* Mustache */}
              <div style={{
                position: "absolute",
                bottom: "10%",
                left: "10%",
                width: "80%",
                height: "25%",
                backgroundColor: "#4a2c2a",
                borderRadius: "0 0 50% 50%",
              }} />
            </div>
            {/* Body */}
            <div style={{
              position: "absolute",
              top: "55%",
              left: "20%",
              width: "60%",
              height: "30%",
              backgroundColor: (props.marioBlue ?? SCENE_PARAMS.marioBlue.value),
              borderRadius: "20%",
            }}>
              {/* Buttons */}
              <div style={{
                position: "absolute",
                top: "30%",
                left: "35%",
                width: "30%",
                height: "20%",
                backgroundColor: "#FFD700",
                borderRadius: "50%",
              }} />
            </div>
            {/* Legs with running animation */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: "25%",
              width: "20%",
              height: "20%",
              backgroundColor: (props.marioBlue ?? SCENE_PARAMS.marioBlue.value),
              borderRadius: "0 0 30% 30%",
              transform: "rotate(" + (runCycle * 20) + "deg)",
              transformOrigin: "top center",
            }} />
            <div style={{
              position: "absolute",
              bottom: 0,
              right: "25%",
              width: "20%",
              height: "20%",
              backgroundColor: (props.marioBlue ?? SCENE_PARAMS.marioBlue.value),
              borderRadius: "0 0 30% 30%",
              transform: "rotate(" + (-runCycle * 20) + "deg)",
              transformOrigin: "top center",
            }} />
          </div>
        )}
        
        {/* Coin collect effect */}
        {f > coinCollectFrame && f < coinCollectFrame + 30 && (
          <div style={{
            position: "absolute",
            left: laptopCenterX - minDim * 0.1,
            top: deskY - minDim * 0.2,
            fontSize: minDim * 0.04,
            fontWeight: "bold",
            color: (props.coinColor ?? SCENE_PARAMS.coinColor.value),
            opacity: interpolate(f, [coinCollectFrame, coinCollectFrame + 30], [1, 0], { extrapolateRight: "clamp" }),
            transform: "translateY(" + interpolate(f, [coinCollectFrame, coinCollectFrame + 30], [0, -30], { extrapolateRight: "clamp" }) + "px)",
          }}>
            +300
          </div>
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

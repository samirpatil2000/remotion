// Template: folder-gallery-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  folderName: { type: "text", label: "Folder Name", value: "untitled" },
  image1: { type: "image", label: "Image 1", value: "" },
  image2: { type: "image", label: "Image 2", value: "" },
  image3: { type: "image", label: "Image 3", value: "" },
  image4: { type: "image", label: "Image 4", value: "" },
  backgroundColor: { type: "color", label: "Background", value: "#ffe5e5" },
  folderColor: { type: "color", label: "Folder Color", value: "#99c0ff" },
  folderDarkColor: { type: "color", label: "Folder Dark", value: "#86b4fd" },
  windowColor: { type: "color", label: "Window Color", value: "#1e293b" },
  textColor: { type: "color", label: "Text Color", value: "#1a1a1a" },
  cursorFill: { type: "color", label: "Cursor Fill", value: "#ffffff" },
  cursorOutline: { type: "color", label: "Cursor Outline", value: "#000000" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  placeholderColor: { type: "color", label: "Placeholder Color", value: "#e2e8f0" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  hoverDelay: { type: "number", label: "Hover Start (frames)", value: 30, min: 10, max: 60, step: 5 },
  clickDelay: { type: "number", label: "Click Start (frames)", value: 75, min: 40, max: 120, step: 5 },
  pixelSize: { type: "number", label: "Cursor Pixel Size", value: 4, min: 2, max: 8, step: 1 },
  initialPeekAmount: { type: "number", label: "Initial Peek Amount", value: 55, min: 10, max: 80, step: 5 },
  imageSpacing: { type: "number", label: "Image Spacing", value: 25, min: 10, max: 40, step: 2 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  
  const hoverStart = SCENE_PARAMS.hoverDelay.value;
  const clickStart = SCENE_PARAMS.clickDelay.value;
  const transitionStart = clickStart + 15;
  const windowOpenStart = transitionStart + 20;
  
  const folderImages = [
    { id: 1, src: SCENE_PARAMS.image1.value, startDelay: 0 },
    { id: 2, src: SCENE_PARAMS.image2.value, startDelay: 0 },
    { id: 3, src: SCENE_PARAMS.image3.value, startDelay: 0 },
  ];
  
  const windowImages = [
    { id: 1, src: SCENE_PARAMS.image1.value },
    { id: 2, src: SCENE_PARAMS.image2.value },
    { id: 3, src: SCENE_PARAMS.image3.value },
    { id: 4, src: SCENE_PARAMS.image4.value },
  ];
  
  const cursorStartX = width * 0.8;
  const cursorStartY = height * 0.3;
  const folderCenterX = width * 0.5;
  const folderCenterY = height * 0.45;
  
  const cursorApproachProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 25, stiffness: 60 }
  });
  
  const cursorX = interpolate(cursorApproachProgress, [0, 1], [cursorStartX, folderCenterX]);
  const cursorY = interpolate(cursorApproachProgress, [0, 1], [cursorStartY, folderCenterY]);
  
  const isClicking = adjustedFrame >= clickStart && adjustedFrame < clickStart + 10;
  const clickScale = isClicking ? 0.95 : 1;
  
  const transitionProgress = spring({
    frame: Math.max(0, adjustedFrame - transitionStart),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  
  const windowProgress = spring({
    frame: Math.max(0, adjustedFrame - windowOpenStart),
    fps,
    config: { damping: 22, stiffness: 85 }
  });
  
  const folderOpacity = interpolate(transitionProgress, [0, 0.5], [1, 0], { extrapolateRight: "clamp" });
  const folderScale = interpolate(transitionProgress, [0, 1], [1, 0.8], { extrapolateRight: "clamp" });
  
  const windowWidth = minDim * 0.85;
  const windowHeight = minDim * 0.7;
  
  const folderWidth = minDim * 0.35;
  const folderHeight = minDim * 0.3;
  
  const initialPeek = SCENE_PARAMS.initialPeekAmount.value;
  const imageSpacing = SCENE_PARAMS.imageSpacing.value;
  
  const getImagePeekStyle = (index) => {
    const approachProg = spring({
      frame: adjustedFrame,
      fps,
      config: { damping: 30, stiffness: 50 }
    });
    
    const hoverProg = spring({
      frame: Math.max(0, adjustedFrame - hoverStart),
      fps,
      config: { damping: 25, stiffness: 70 }
    });
    
    const baseOffset = initialPeek;
    const approachOffset = baseOffset + approachProg * (15 + index * 5);
    const hoverOffset = approachOffset + hoverProg * (25 + index * 8);
    
    const baseRotation = -imageSpacing + index * imageSpacing;
    const approachRotation = baseRotation + approachProg * (index - 1) * 2;
    const finalRotation = approachRotation + hoverProg * (index - 1) * 3;
    
    return {
      transform: `translateY(-${hoverOffset}px) rotate(${finalRotation}deg)`,
      zIndex: index,
    };
  };
  
  const pixelSize = SCENE_PARAMS.pixelSize.value;
  
  const fillPixels = [
    [1, 1],
    [1, 2], [2, 2],
    [1, 3], [2, 3], [3, 3],
    [1, 4], [2, 4], [3, 4], [4, 4],
    [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
    [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
    [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],
    [1, 10], [2, 10], [4, 10], [5, 10],
    [1, 11], [5, 11], [6, 11],
    [6, 12], [7, 12],
    [7, 13],
  ];
  
  const outlinePixels = [
    [0, 0],
    [0, 1], [2, 1],
    [0, 2], [3, 2],
    [0, 3], [4, 3],
    [0, 4], [5, 4],
    [0, 5], [6, 5],
    [0, 6], [7, 6],
    [0, 7], [8, 7],
    [0, 8], [9, 8],
    [0, 9], [6, 9], [7, 9], [8, 9], [9, 9],
    [0, 10], [3, 10], [6, 10],
    [0, 11], [2, 11], [4, 11], [7, 11],
    [0, 12], [1, 12], [5, 12], [8, 12],
    [6, 13], [8, 13],
    [7, 14], [8, 14],
  ];
  
  const PixelCursor = ({ x, y, size }) => {
    return (
      <div style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 100,
      }}>
        {fillPixels.map((pixel, i) => (
          <div
            key={`fill-${i}`}
            style={{
              position: "absolute",
              left: pixel[0] * size,
              top: pixel[1] * size,
              width: size,
              height: size,
              backgroundColor: SCENE_PARAMS.cursorFill.value,
            }}
          />
        ))}
        {outlinePixels.map((pixel, i) => (
          <div
            key={`outline-${i}`}
            style={{
              position: "absolute",
              left: pixel[0] * size,
              top: pixel[1] * size,
              width: size,
              height: size,
              backgroundColor: SCENE_PARAMS.cursorOutline.value,
            }}
          />
        ))}
      </div>
    );
  };
  
  const ImagePlaceholder = ({ style }) => (
    <div style={{
      ...style,
      backgroundColor: SCENE_PARAMS.placeholderColor.value,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#64748b" strokeWidth="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="#64748b"/>
        <path d="M21 15l-5-5L5 21" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: `scale(${scaleValue})`, 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        
        {/* Folder */}
        <div style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: folderOpacity,
          transform: `scale(${folderScale * clickScale})`,
          transition: "transform 0.1s ease",
        }}>
          <div style={{
            position: "relative",
            width: folderWidth,
            height: folderHeight,
          }}>
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "85%",
              backgroundColor: SCENE_PARAMS.folderDarkColor.value,
              borderRadius: minDim * 0.02,
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }} />
            
            <div style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              width: "35%",
              height: "15%",
              backgroundColor: SCENE_PARAMS.folderColor.value,
              borderRadius: `${minDim * 0.015}px ${minDim * 0.015}px 0 0`,
            }} />
            
            <div style={{
              position: "absolute",
              bottom: "25%",
              left: "50%",
              transform: "translateX(-50%)",
              width: folderWidth * 0.7,
              height: folderHeight * 0.6,
            }}>
              {folderImages.map((img, index) => {
                const peekStyle = getImagePeekStyle(index);
                return (
                  <div
                    key={img.id}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      marginLeft: -folderWidth * 0.25,
                      width: folderWidth * 0.5,
                      height: folderWidth * 0.4,
                      borderRadius: minDim * 0.015,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      transformOrigin: "center bottom",
                      opacity: 1,
                      overflow: "hidden",
                      ...peekStyle,
                    }}
                  >
                    {img.src ? (
                      <Img src={img.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <ImagePlaceholder style={{ width: "100%", height: "100%", borderRadius: minDim * 0.015 }} />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "75%",
              backgroundColor: SCENE_PARAMS.folderColor.value,
              borderRadius: minDim * 0.02,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }} />
          </div>
          
          <p style={{
            color: SCENE_PARAMS.textColor.value,
            fontSize: minDim * 0.035,
            fontWeight: 500,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginTop: minDim * 0.02,
            opacity: 0.9,
          }}>
            {SCENE_PARAMS.folderName.value}
          </p>
        </div>
        
        {/* macOS Finder Window */}
        <div style={{
          position: "absolute",
          width: windowWidth,
          height: windowHeight,
          backgroundColor: SCENE_PARAMS.windowColor.value,
          borderRadius: minDim * 0.025,
          boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
          overflow: "hidden",
          opacity: windowProgress,
          transform: `scale(${interpolate(windowProgress, [0, 1], [0.9, 1])})`,
        }}>
          <div style={{
            height: minDim * 0.06,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: `0 ${minDim * 0.025}px`,
            gap: minDim * 0.015,
          }}>
            <div style={{ width: minDim * 0.02, height: minDim * 0.02, borderRadius: "50%", backgroundColor: "#ef4444" }} />
            <div style={{ width: minDim * 0.02, height: minDim * 0.02, borderRadius: "50%", backgroundColor: "#eab308" }} />
            <div style={{ width: minDim * 0.02, height: minDim * 0.02, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            
            <p style={{
              color: "#f8fafc",
              fontSize: minDim * 0.028,
              fontWeight: 500,
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginLeft: minDim * 0.05,
              opacity: 0.8,
            }}>
              {SCENE_PARAMS.folderName.value}
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: minDim * 0.03,
            padding: minDim * 0.04,
            height: `calc(100% - ${minDim * 0.06}px)`,
            boxSizing: "border-box",
          }}>
            {windowImages.map((img, index) => {
              const itemDelay = windowOpenStart + 10 + index * 8;
              const itemProgress = spring({
                frame: Math.max(0, adjustedFrame - itemDelay),
                fps,
                config: { damping: 18, stiffness: 120 }
              });
              
              return (
                <div
                  key={img.id}
                  style={{
                    borderRadius: minDim * 0.015,
                    aspectRatio: "4/3",
                    opacity: itemProgress,
                    transform: `scale(${interpolate(itemProgress, [0, 1], [0.8, 1])}) translateY(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    overflow: "hidden",
                  }}
                >
                  {img.src ? (
                    <Img src={img.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImagePlaceholder style={{ width: "100%", height: "100%", borderRadius: minDim * 0.015 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Pixelated Cursor */}
        <div style={{
          opacity: interpolate(adjustedFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          <PixelCursor x={cursorX} y={cursorY} size={pixelSize} />
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

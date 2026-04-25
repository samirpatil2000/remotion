// Template: windows-98-style
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  windowTitle: { type: "text", label: "Window Title", value: "Camera" },
  statusText: { type: "text", label: "Status Text", value: "Ready" },
  fontFamily: { type: "font", label: "Font", value: "MS Sans Serif" },
  backgroundColor: { type: "color", label: "Desktop Color", value: "#008080" },
  windowBg: { type: "color", label: "Window Background", value: "#c0c0c0" },
  titleBarColor: { type: "color", label: "Title Bar", value: "#000080" },
  titleTextColor: { type: "color", label: "Title Text", value: "#ffffff" },
  personColor: { type: "color", label: "Person Color", value: "#00ff00" },
  scale: { type: "number", label: "Scale", value: 0.65, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.7, min: 0.5, max: 2, step: 0.1 },
  expandDuration: { type: "number", label: "Expand Duration", value: 20, min: 10, max: 40, step: 2 },
  showScanlines: { type: "boolean", label: "Show Scanlines", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const expandDur = SCENE_PARAMS.expandDuration.value;
  
  // Icon dimensions
  const iconSize = minDim * 0.1;
  const iconSpacingX = minDim * 0.14;
  const iconSpacingY = minDim * 0.16;
  const iconStartX = width * 0.08;
  const iconStartY = height * 0.05;
  
  // Desktop icons data
  const desktopIcons = [
    { name: "My Computer", icon: "computer", col: 0, row: 0 },
    { name: "Recycle Bin", icon: "recycle", col: 0, row: 1 },
    { name: "My Documents", icon: "folder", col: 0, row: 2 },
    { name: SCENE_PARAMS.windowTitle.value, icon: "camera", col: 0, row: 3 },
    { name: "Internet Explorer", icon: "internet", col: 0, row: 4 },
    { name: "Network", icon: "network", col: 0, row: 5 },
  ];
  
  // Camera icon position (for animation)
  const cameraIcon = desktopIcons.find(i => i.icon === "camera");
  const iconX = iconStartX + cameraIcon.col * iconSpacingX;
  const iconY = iconStartY + cameraIcon.row * iconSpacingY;
  
  // Window dimensions
  const windowWidth = width * 0.85;
  const windowHeight = height * 0.55;
  const windowX = (width - windowWidth) / 2;
  const windowY = (height - windowHeight) / 2 - minDim * 0.03;
  
  // Animation phases
  const clickFrame = 15;
  const expandStart = 25;
  const expandEnd = expandStart + expandDur;
  const contentStart = expandEnd + 10;
  
  // Mouse hover animation timing
  const menuHoverStart = contentStart + 30;
  const menuItems = ["File", "Edit", "View", "Help"];
  const hoverDuration = 20; // frames per menu item
  
  // Icon click animation
  const iconClick = adjustedFrame >= clickFrame && adjustedFrame < clickFrame + 8;
  const iconScale = iconClick ? 0.9 : 1;
  const cameraIconVisible = adjustedFrame < expandStart + 5;
  
  // Window expand animation
  const expandProgress = interpolate(
    adjustedFrame,
    [expandStart, expandEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Stepped expansion for Win98 feel
  const steps = 6;
  const steppedProgress = Math.floor(expandProgress * steps) / steps;
  
  const currentWidth = interpolate(steppedProgress, [0, 1], [iconSize, windowWidth]);
  const currentHeight = interpolate(steppedProgress, [0, 1], [iconSize, windowHeight]);
  const currentX = interpolate(steppedProgress, [0, 1], [iconX, windowX]);
  const currentY = interpolate(steppedProgress, [0, 1], [iconY, windowY]);
  
  // Content fade in
  const contentOpacity = interpolate(
    adjustedFrame,
    [contentStart, contentStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  // Viewfinder animation
  const viewfinderPulse = Math.sin(adjustedFrame * 0.15) * 0.5 + 0.5;
  
  // Person idle animation
  const breathe = Math.sin(adjustedFrame * 0.08) * 0.02;
  const headBob = Math.sin(adjustedFrame * 0.1) * 2;
  const armWave = Math.sin(adjustedFrame * 0.2) * 8;
  
  // Calculate which menu item is being hovered
  const getHoveredMenuIndex = () => {
    if (adjustedFrame < menuHoverStart) return -1;
    const hoverTime = adjustedFrame - menuHoverStart;
    const menuIndex = Math.floor(hoverTime / hoverDuration);
    if (menuIndex >= menuItems.length) return menuItems.length - 1;
    return menuIndex;
  };
  
  const hoveredMenuIndex = getHoveredMenuIndex();
  
  // Mouse cursor position
  const getMousePosition = () => {
    if (adjustedFrame < menuHoverStart) {
      return { x: windowX + windowWidth * 0.5, y: windowY + windowHeight * 0.5, visible: false };
    }
    
    const menuBarY = windowY + minDim * 0.045 + minDim * 0.0175;
    const menuStartX = windowX + minDim * 0.02;
    const menuSpacing = minDim * 0.06;
    
    const hoverTime = adjustedFrame - menuHoverStart;
    const currentMenuIndex = Math.min(Math.floor(hoverTime / hoverDuration), menuItems.length - 1);
    const progressInItem = (hoverTime % hoverDuration) / hoverDuration;
    
    let targetX, targetY;
    
    if (currentMenuIndex < menuItems.length - 1) {
      const startX = menuStartX + currentMenuIndex * menuSpacing;
      const endX = menuStartX + (currentMenuIndex + 1) * menuSpacing;
      targetX = interpolate(progressInItem, [0, 1], [startX, endX]);
    } else {
      targetX = menuStartX + currentMenuIndex * menuSpacing;
    }
    
    targetY = menuBarY;
    
    return { x: targetX, y: targetY, visible: true };
  };
  
  const mousePos = getMousePosition();
  
  // 3D button style
  const buttonStyle = (pressed) => ({
    backgroundColor: "#c0c0c0",
    border: pressed 
      ? "2px solid #808080" 
      : "2px outset #dfdfdf",
    borderTop: pressed ? "2px solid #808080" : "2px solid #ffffff",
    borderLeft: pressed ? "2px solid #808080" : "2px solid #ffffff",
    borderRight: pressed ? "2px solid #ffffff" : "2px solid #808080",
    borderBottom: pressed ? "2px solid #ffffff" : "2px solid #808080",
  });
  
  // Render icon based on type
  const renderIcon = (iconType, size) => {
    const s = size * 0.75;
    switch(iconType) {
      case "computer":
        return (
          <div style={{ width: s, height: s * 0.85, position: "relative" }}>
            <div style={{
              width: s * 0.9,
              height: s * 0.6,
              backgroundColor: "#c0c0c0",
              border: "3px solid #808080",
              borderRadius: 3,
              position: "absolute",
              top: 0,
              left: "5%",
            }}>
              <div style={{
                width: "75%",
                height: "70%",
                backgroundColor: "#000080",
                margin: "8%",
                border: "2px inset #404040",
              }} />
            </div>
            <div style={{
              width: s * 0.5,
              height: s * 0.12,
              backgroundColor: "#c0c0c0",
              border: "2px solid #808080",
              position: "absolute",
              bottom: 0,
              left: "25%",
              borderRadius: 2,
            }} />
          </div>
        );
      case "recycle":
        return (
          <div style={{ width: s, height: s * 0.9, position: "relative" }}>
            <div style={{
              width: s * 0.7,
              height: s * 0.75,
              backgroundColor: "#c0c0c0",
              border: "2px solid #808080",
              borderRadius: "0 0 5px 5px",
              position: "absolute",
              bottom: 0,
              left: "15%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  flex: 1,
                  borderBottom: i < 2 ? "1px solid #808080" : "none",
                }} />
              ))}
            </div>
            <div style={{
              width: s * 0.8,
              height: s * 0.15,
              backgroundColor: "#808080",
              border: "2px solid #606060",
              position: "absolute",
              top: 0,
              left: "10%",
              borderRadius: "3px 3px 0 0",
            }} />
          </div>
        );
      case "folder":
        return (
          <div style={{ width: s, height: s * 0.75, position: "relative" }}>
            <div style={{
              width: s * 0.4,
              height: s * 0.15,
              backgroundColor: "#ffff80",
              border: "2px solid #808000",
              borderBottom: "none",
              position: "absolute",
              top: 0,
              left: "5%",
              borderRadius: "3px 3px 0 0",
            }} />
            <div style={{
              width: s * 0.95,
              height: s * 0.6,
              backgroundColor: "#ffff80",
              border: "2px solid #808000",
              position: "absolute",
              bottom: 0,
              left: "2.5%",
              borderRadius: "0 3px 3px 3px",
            }} />
          </div>
        );
      case "camera":
        return (
          <div style={{
            width: s * 0.85,
            height: s * 0.65,
            backgroundColor: "#808080",
            borderRadius: minDim * 0.01,
            position: "relative",
            boxShadow: "inset -2px -2px 0 #404040, inset 2px 2px 0 #dfdfdf",
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: s * 0.35,
              height: s * 0.35,
              borderRadius: "50%",
              backgroundColor: "#000080",
              border: "3px solid #404040",
            }}>
              <div style={{
                position: "absolute",
                top: "20%",
                left: "20%",
                width: "30%",
                height: "30%",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.4)",
              }} />
            </div>
            <div style={{
              position: "absolute",
              top: "15%",
              right: "15%",
              width: s * 0.12,
              height: s * 0.08,
              backgroundColor: "#ffff00",
              borderRadius: minDim * 0.005,
            }} />
          </div>
        );
      case "internet":
        return (
          <div style={{ width: s, height: s * 0.85, position: "relative" }}>
            <div style={{
              width: s * 0.75,
              height: s * 0.75,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00a0ff 0%, #0060ff 50%, #004080 100%)",
              border: "2px solid #004080",
              position: "absolute",
              top: 0,
              left: "12.5%",
              overflow: "hidden",
            }}>
              {[0.3, 0.5, 0.7].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute",
                  top: pos * 100 + "%",
                  left: 0,
                  width: "100%",
                  height: 2,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }} />
              ))}
              <div style={{
                position: "absolute",
                top: 0,
                left: "48%",
                width: 2,
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.3)",
              }} />
            </div>
            <div style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              fontSize: s * 0.35,
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#ffcc00",
              textShadow: "1px 1px 0 #804000",
            }}>e</div>
          </div>
        );
      case "network":
        return (
          <div style={{ width: s, height: s * 0.8, position: "relative" }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                position: "absolute",
                left: i === 0 ? "5%" : "50%",
                top: i === 0 ? "10%" : "30%",
                width: s * 0.45,
                height: s * 0.4,
              }}>
                <div style={{
                  width: "90%",
                  height: "70%",
                  backgroundColor: "#c0c0c0",
                  border: "2px solid #808080",
                  borderRadius: 2,
                }}>
                  <div style={{
                    width: "60%",
                    height: "50%",
                    backgroundColor: "#000080",
                    margin: "10%",
                  }} />
                </div>
              </div>
            ))}
            <div style={{
              position: "absolute",
              top: "45%",
              left: "35%",
              width: s * 0.25,
              height: 3,
              backgroundColor: "#404040",
              transform: "rotate(25deg)",
            }} />
          </div>
        );
      default:
        return null;
    }
  };
  
  // Vector person component (retro wireframe style)
  const VectorPerson = ({ size, color }) => {
    const s = size;
    return (
      <div style={{
        width: s,
        height: s * 1.8,
        position: "relative",
        transform: `scale(${1 + breathe})`,
      }}>
        {/* Head */}
        <div style={{
          position: "absolute",
          top: headBob,
          left: "50%",
          transform: "translateX(-50%)",
          width: s * 0.35,
          height: s * 0.35,
          borderRadius: "50%",
          border: `3px solid ${color}`,
          backgroundColor: "transparent",
        }}>
          {/* Eyes */}
          <div style={{
            position: "absolute",
            top: "35%",
            left: "20%",
            width: s * 0.06,
            height: s * 0.06,
            borderRadius: "50%",
            backgroundColor: color,
          }} />
          <div style={{
            position: "absolute",
            top: "35%",
            right: "20%",
            width: s * 0.06,
            height: s * 0.06,
            borderRadius: "50%",
            backgroundColor: color,
          }} />
          {/* Smile */}
          <div style={{
            position: "absolute",
            bottom: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            width: s * 0.12,
            height: s * 0.06,
            borderBottom: `2px solid ${color}`,
            borderRadius: "0 0 50% 50%",
          }} />
        </div>
        
        {/* Neck */}
        <div style={{
          position: "absolute",
          top: s * 0.32 + headBob,
          left: "50%",
          transform: "translateX(-50%)",
          width: 3,
          height: s * 0.1,
          backgroundColor: color,
        }} />
        
        {/* Torso */}
        <div style={{
          position: "absolute",
          top: s * 0.4,
          left: "50%",
          transform: "translateX(-50%)",
          width: s * 0.45,
          height: s * 0.5,
          border: `3px solid ${color}`,
          borderRadius: s * 0.05,
          backgroundColor: "transparent",
        }} />
        
        {/* Left Arm */}
        <div style={{
          position: "absolute",
          top: s * 0.45,
          left: s * 0.08,
          width: 3,
          height: s * 0.35,
          backgroundColor: color,
          transformOrigin: "top center",
          transform: `rotate(${-15 + armWave}deg)`,
        }}>
          {/* Hand */}
          <div style={{
            position: "absolute",
            bottom: -s * 0.08,
            left: "50%",
            transform: "translateX(-50%)",
            width: s * 0.1,
            height: s * 0.1,
            borderRadius: "50%",
            border: `2px solid ${color}`,
          }} />
        </div>
        
        {/* Right Arm */}
        <div style={{
          position: "absolute",
          top: s * 0.45,
          right: s * 0.08,
          width: 3,
          height: s * 0.35,
          backgroundColor: color,
          transformOrigin: "top center",
          transform: `rotate(${15 - armWave * 0.5}deg)`,
        }}>
          {/* Hand */}
          <div style={{
            position: "absolute",
            bottom: -s * 0.08,
            left: "50%",
            transform: "translateX(-50%)",
            width: s * 0.1,
            height: s * 0.1,
            borderRadius: "50%",
            border: `2px solid ${color}`,
          }} />
        </div>
        
        {/* Left Leg */}
        <div style={{
          position: "absolute",
          top: s * 0.88,
          left: s * 0.32,
          width: 3,
          height: s * 0.5,
          backgroundColor: color,
          transformOrigin: "top center",
          transform: "rotate(-8deg)",
        }}>
          {/* Foot */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: -s * 0.04,
            width: s * 0.12,
            height: s * 0.05,
            backgroundColor: color,
            borderRadius: s * 0.02,
          }} />
        </div>
        
        {/* Right Leg */}
        <div style={{
          position: "absolute",
          top: s * 0.88,
          right: s * 0.32,
          width: 3,
          height: s * 0.5,
          backgroundColor: color,
          transformOrigin: "top center",
          transform: "rotate(8deg)",
        }}>
          {/* Foot */}
          <div style={{
            position: "absolute",
            bottom: 0,
            right: -s * 0.04,
            width: s * 0.12,
            height: s * 0.05,
            backgroundColor: color,
            borderRadius: s * 0.02,
          }} />
        </div>
      </div>
    );
  };
  
  // Windows 98 cursor
  const Win98Cursor = ({ x, y, visible }) => {
    if (!visible) return null;
    const cursorSize = minDim * 0.04;
    return (
      <div style={{
        position: "absolute",
        left: x,
        top: y,
        width: cursorSize,
        height: cursorSize * 1.4,
        zIndex: 1000,
        pointerEvents: "none",
      }}>
        {/* Arrow cursor */}
        <svg width={cursorSize} height={cursorSize * 1.4} viewBox="0 0 16 22" style={{ display: "block" }}>
          <polygon points="0,0 0,17 4,13 7,20 10,19 7,12 12,12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        </svg>
      </div>
    );
  };
  
  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      {/* Scanlines overlay */}
      {SCENE_PARAMS.showScanlines.value && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
          zIndex: 100,
        }} />
      )}
      
      {/* Desktop Icons */}
      {desktopIcons.map((icon, index) => {
        const ix = iconStartX + icon.col * iconSpacingX;
        const iy = iconStartY + icon.row * iconSpacingY;
        const isCamera = icon.icon === "camera";
        const shouldHide = isCamera && !cameraIconVisible;
        const isClicked = isCamera && iconClick;
        
        return (
          <div key={index} style={{
            position: "absolute",
            left: ix,
            top: iy,
            width: iconSize,
            height: iconSize + minDim * 0.04,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${isClicked ? 0.9 : 1})`,
            opacity: shouldHide ? interpolate(adjustedFrame, [expandStart, expandStart + 5], [1, 0], { extrapolateRight: "clamp" }) : 1,
          }}>
            {renderIcon(icon.icon, iconSize)}
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
              fontSize: minDim * 0.02,
              color: "#ffffff",
              textShadow: "1px 1px 0 #000000",
              marginTop: minDim * 0.01,
              textAlign: "center",
              maxWidth: iconSize * 1.3,
              lineHeight: 1.1,
            }}>
              {icon.name}
            </span>
          </div>
        );
      })}
      
      {/* Expanding Window */}
      {expandProgress > 0 && (
        <div style={{
          position: "absolute",
          left: currentX,
          top: currentY,
          width: currentWidth,
          height: currentHeight,
          backgroundColor: SCENE_PARAMS.windowBg.value,
          border: "3px outset #dfdfdf",
          boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff",
          display: "flex",
          flexDirection: "column",
          transform: `scale(${SCENE_PARAMS.scale.value})`,
          transformOrigin: "top left",
        }}>
          {/* Title Bar */}
          <div style={{
            height: minDim * 0.045,
            backgroundColor: SCENE_PARAMS.titleBarColor.value,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${minDim * 0.008}px`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: minDim * 0.01 }}>
              <div style={{
                width: minDim * 0.025,
                height: minDim * 0.02,
                backgroundColor: "#c0c0c0",
                borderRadius: 2,
              }} />
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
                fontSize: minDim * 0.028,
                fontWeight: "bold",
                color: SCENE_PARAMS.titleTextColor.value,
              }}>
                {SCENE_PARAMS.windowTitle.value}
              </span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {["_", "□", "×"].map((btn, i) => (
                <div key={i} style={{
                  width: minDim * 0.035,
                  height: minDim * 0.03,
                  ...buttonStyle(false),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Arial",
                  fontSize: minDim * 0.025,
                  fontWeight: "bold",
                  color: "#000000",
                }}>
                  {btn}
                </div>
              ))}
            </div>
          </div>
          
          {/* Menu Bar */}
          <div style={{
            height: minDim * 0.035,
            backgroundColor: SCENE_PARAMS.windowBg.value,
            borderBottom: "1px solid #808080",
            display: "flex",
            alignItems: "center",
            padding: `0 ${minDim * 0.01}px`,
            gap: minDim * 0.02,
            opacity: contentOpacity,
          }}>
            {menuItems.map((menu, i) => {
              const isHovered = hoveredMenuIndex === i;
              return (
                <span key={i} style={{
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
                  fontSize: minDim * 0.022,
                  color: isHovered ? "#ffffff" : "#000000",
                  backgroundColor: isHovered ? "#000080" : "transparent",
                  padding: `${minDim * 0.003}px ${minDim * 0.008}px`,
                  textDecoration: i === 0 && !isHovered ? "underline" : "none",
                }}>
                  {menu}
                </span>
              );
            })}
          </div>
          
          {/* Main Content Area */}
          <div style={{
            flex: 1,
            backgroundColor: "#000000",
            margin: minDim * 0.01,
            border: "2px inset #808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: contentOpacity,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Vector Person */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}>
              <VectorPerson size={minDim * 0.15} color={SCENE_PARAMS.personColor.value} />
            </div>
            
            {/* Viewfinder */}
            <div style={{
              width: "80%",
              height: "80%",
              border: `2px solid rgba(255, 255, 255, ${0.3 + viewfinderPulse * 0.3})`,
              position: "relative",
              zIndex: 2,
            }}>
              {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
                <div key={i} style={{
                  position: "absolute",
                  width: minDim * 0.04,
                  height: minDim * 0.04,
                  [x ? "right" : "left"]: -2,
                  [y ? "bottom" : "top"]: -2,
                  borderColor: "#00ff00",
                  borderStyle: "solid",
                  borderWidth: 0,
                  [y ? "borderBottom" : "borderTop"]: "3px solid #00ff00",
                  [x ? "borderRight" : "borderLeft"]: "3px solid #00ff00",
                }} />
              ))}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <div style={{
                  width: minDim * 0.06,
                  height: 2,
                  backgroundColor: `rgba(0, 255, 0, ${0.5 + viewfinderPulse * 0.5})`,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }} />
                <div style={{
                  width: 2,
                  height: minDim * 0.06,
                  backgroundColor: `rgba(0, 255, 0, ${0.5 + viewfinderPulse * 0.5})`,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }} />
              </div>
              <div style={{
                position: "absolute",
                top: minDim * 0.02,
                right: minDim * 0.02,
                display: "flex",
                alignItems: "center",
                gap: minDim * 0.01,
              }}>
                <div style={{
                  width: minDim * 0.015,
                  height: minDim * 0.015,
                  borderRadius: "50%",
                  backgroundColor: viewfinderPulse > 0.5 ? "#ff0000" : "#800000",
                }} />
                <span style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: minDim * 0.025,
                  color: "#ff0000",
                }}>
                  REC
                </span>
              </div>
            </div>
          </div>
          
          {/* Toolbar */}
          <div style={{
            height: minDim * 0.06,
            backgroundColor: SCENE_PARAMS.windowBg.value,
            borderTop: "1px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: minDim * 0.015,
            padding: `0 ${minDim * 0.02}px`,
            opacity: contentOpacity,
          }}>
            <div style={{
              width: minDim * 0.12,
              height: minDim * 0.045,
              ...buttonStyle(false),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
              fontSize: minDim * 0.022,
              color: "#000000",
            }}>
              📷 Capture
            </div>
            <div style={{
              width: minDim * 0.1,
              height: minDim * 0.045,
              ...buttonStyle(false),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
              fontSize: minDim * 0.022,
              color: "#000000",
            }}>
              Settings
            </div>
          </div>
          
          {/* Status Bar */}
          <div style={{
            height: minDim * 0.035,
            backgroundColor: SCENE_PARAMS.windowBg.value,
            borderTop: "2px inset #808080",
            display: "flex",
            alignItems: "center",
            padding: `0 ${minDim * 0.01}px`,
            opacity: contentOpacity,
          }}>
            <div style={{
              flex: 1,
              height: "70%",
              border: "1px inset #808080",
              display: "flex",
              alignItems: "center",
              paddingLeft: minDim * 0.008,
            }}>
              <span style={{
                fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
                fontSize: minDim * 0.02,
                color: "#000000",
              }}>
                {SCENE_PARAMS.statusText.value}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Mouse Cursor */}
      <Win98Cursor x={mousePos.x} y={mousePos.y} visible={mousePos.visible} />
      
      {/* Taskbar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: minDim * 0.055,
        backgroundColor: "#c0c0c0",
        borderTop: "2px outset #dfdfdf",
        display: "flex",
        alignItems: "center",
        padding: `0 ${minDim * 0.008}px`,
        gap: minDim * 0.008,
      }}>
        {/* Start Button */}
        <div style={{
          height: "80%",
          padding: `0 ${minDim * 0.015}px`,
          ...buttonStyle(false),
          display: "flex",
          alignItems: "center",
          gap: minDim * 0.008,
        }}>
          <div style={{
            width: minDim * 0.025,
            height: minDim * 0.025,
            background: "linear-gradient(135deg, #ff0000 25%, #00ff00 25%, #00ff00 50%, #0000ff 50%, #0000ff 75%, #ffff00 75%)",
          }} />
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
            fontSize: minDim * 0.022,
            fontWeight: "bold",
            color: "#000000",
          }}>
            Start
          </span>
        </div>
        
        {/* Active window button */}
        {expandProgress > 0.5 && (
          <div style={{
            height: "80%",
            padding: `0 ${minDim * 0.015}px`,
            ...buttonStyle(true),
            display: "flex",
            alignItems: "center",
            gap: minDim * 0.008,
            minWidth: minDim * 0.2,
          }}>
            <div style={{
              width: minDim * 0.02,
              height: minDim * 0.016,
              backgroundColor: "#808080",
              borderRadius: 2,
            }} />
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
              fontSize: minDim * 0.02,
              color: "#000000",
            }}>
              {SCENE_PARAMS.windowTitle.value}
            </span>
          </div>
        )}
        
        {/* System Tray */}
        <div style={{
          marginLeft: "auto",
          height: "80%",
          padding: `0 ${minDim * 0.015}px`,
          border: "1px inset #808080",
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: SCENE_PARAMS.fontFamily.value + ", Arial, sans-serif",
            fontSize: minDim * 0.02,
            color: "#000000",
          }}>
            {Math.floor(adjustedFrame / 30) % 12 + 1}:{String(Math.floor(adjustedFrame / 2) % 60).padStart(2, "0")} PM
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

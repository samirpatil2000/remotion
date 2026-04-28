// Template: typewriter
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  typedText: { type: "text", label: "Typed Text", value: "Hello World! This is a typewriter effect with animated keys and realistic paper movement." },
  fontFamily: { type: "font", label: "Font", value: "Courier New" },
  backgroundColor: { type: "color", label: "Background", value: "#2c1810" },
  typewriterColor: { type: "color", label: "Typewriter Body", value: "#1a1a1a" },
  typewriterAccent: { type: "color", label: "Typewriter Accent", value: "#2d2d2d" },
  keyColor: { type: "color", label: "Key Color", value: "#0a0a0a" },
  keyTextColor: { type: "color", label: "Key Text", value: "#d4d4d4" },
  paperColor: { type: "color", label: "Paper Color", value: "#f5f0e6" },
  inkColor: { type: "color", label: "Ink Color", value: "#1a1a1a" },
  accentColor: { type: "color", label: "Metal Accent", value: "#8b7355" },
  ribbonColor: { type: "color", label: "Ribbon Color", value: "#1a1a1a" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  typingSpeed: { type: "number", label: "Typing Speed (frames)", value: 8, min: 3, max: 15, step: 1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const typingSpeed = (props.typingSpeed ?? SCENE_PARAMS.typingSpeed.value);
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  const text = (props.typedText ?? SCENE_PARAMS.typedText.value);
  const charIndex = Math.floor(Math.max(0, adjustedFrame - 40) / typingSpeed);
  const displayedText = text.slice(0, Math.min(charIndex, text.length));
  const currentChar = charIndex < text.length ? text[charIndex] : null;
  const isTyping = charIndex < text.length && adjustedFrame > 40;
  
  const isPortrait = height > width;
  
  const charsPerLine = isPortrait ? 24 : 32;
  const currentLinePosition = charIndex % charsPerLine;
  const currentLineNumber = Math.floor(charIndex / charsPerLine);
  
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  const typewriterEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  const typewriterY = interpolate(typewriterEntrance, [0, 1], [height * 0.4, 0]);
  
  const typewriterWidth = isPortrait ? width * 0.95 : width * 0.65;
  const typewriterHeight = isPortrait ? height * 0.5 : height * 0.6;
  const keySize = isPortrait ? minDim * 0.055 : minDim * 0.048;
  const keyGap = keySize * 0.12;
  
  const paperWidth = typewriterWidth * 0.75;
  const paperHeight = isPortrait ? height * 0.35 : height * 0.32;
  
  const carriageX = interpolate(currentLinePosition, [0, charsPerLine - 1], [paperWidth * 0.35, -paperWidth * 0.35]);
  
  const paperScrollY = currentLineNumber * minDim * 0.035;
  
  const keyPressFrame = (adjustedFrame - 40) % typingSpeed;
  const hammerStrike = isTyping && keyPressFrame < typingSpeed * 0.4;
  const hammerProgress = hammerStrike ? interpolate(keyPressFrame, [0, typingSpeed * 0.2, typingSpeed * 0.4], [0, 1, 0], { extrapolateRight: "clamp" }) : 0;
  
  const carriageShake = isTyping ? Math.sin(adjustedFrame * 2) * 0.5 : 0;
  const typewriterVibrate = isTyping && keyPressFrame < 3 ? Math.sin(keyPressFrame * 20) * 0.5 : 0;
  
  const getKeyPress = (key) => {
    if (!currentChar || !isTyping) return 0;
    const normalizedCurrent = currentChar.toUpperCase();
    const normalizedKey = key === 'SPACE' ? ' ' : key;
    
    if (normalizedCurrent === normalizedKey || (normalizedCurrent === ' ' && key === 'SPACE')) {
      if (keyPressFrame < typingSpeed * 0.5) {
        return interpolate(keyPressFrame, [0, typingSpeed * 0.15, typingSpeed * 0.5], [0, 1, 0], { extrapolateRight: "clamp" });
      }
    }
    return 0;
  };
  
  const renderKey = (key, rowIndex, keyIndex) => {
    const press = getKeyPress(key);
    const isSpace = key === 'SPACE';
    const keyWidth = isSpace ? keySize * 4.5 : keySize;
    const pressY = press * (keySize * 0.25);
    const pressScale = interpolate(press, [0, 1], [1, 0.92]);
    
    return (
      <div
        key={key + rowIndex + keyIndex}
        style={{
          width: keyWidth,
          height: keySize,
          backgroundColor: (props.keyColor ?? SCENE_PARAMS.keyColor.value),
          borderRadius: keySize * 0.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: (props.keyTextColor ?? SCENE_PARAMS.keyTextColor.value),
          fontSize: isSpace ? keySize * 0.25 : keySize * 0.4,
          fontWeight: 500,
          fontFamily: "Georgia, serif",
          boxShadow: press > 0 
            ? "inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 #333"
            : "inset 0 -2px 4px rgba(0,0,0,0.5), 0 4px 0 #000, 0 6px 8px rgba(0,0,0,0.4)",
          transform: "translateY(" + pressY + "px) scale(" + pressScale + ")",
          border: "1px solid #333",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute",
          top: keySize * 0.08,
          left: "50%",
          transform: "translateX(-50%)",
          width: isSpace ? keyWidth * 0.9 : keySize * 0.7,
          height: keySize * 0.6,
          backgroundColor: "#1a1a1a",
          borderRadius: keySize * 0.3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #2a2a2a",
        }}>
          {isSpace ? "" : key}
        </div>
      </div>
    );
  };
  
  const textLines = [];
  for (let i = 0; i < displayedText.length; i += charsPerLine) {
    textLines.push(displayedText.slice(i, i + charsPerLine));
  }
  
  const bellRing = currentLinePosition === charsPerLine - 3 && isTyping;
  const bellOpacity = bellRing ? interpolate(keyPressFrame, [0, 3, 6], [1, 0.5, 1], { extrapolateRight: "clamp" }) : 0.3;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        pointerEvents: "none",
      }} />
      
      <div style={{ 
        transform: "scale(" + scaleValue + ") translateY(" + typewriterY + "px)", 
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: typewriterEntrance,
      }}>
        
        <div style={{
          width: typewriterWidth,
          position: "relative",
          transform: "translateX(" + typewriterVibrate + "px)",
        }}>
          
          <div style={{
            width: paperWidth,
            height: paperHeight,
            backgroundColor: (props.paperColor ?? SCENE_PARAMS.paperColor.value),
            position: "relative",
            margin: "0 auto",
            marginBottom: -minDim * 0.02,
            boxShadow: "0 5px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.03)",
            overflow: "hidden",
            transform: "translateX(" + carriageX + "px) translateX(" + carriageShake + "px)",
            zIndex: 10,
          }}>
            <div style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: -paperScrollY,
              padding: minDim * 0.03,
              paddingTop: minDim * 0.05,
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: minDim * 0.025,
                right: minDim * 0.025,
                bottom: 0,
                background: "repeating-linear-gradient(transparent, transparent " + (minDim * 0.033) + "px, #d4c5b0 " + (minDim * 0.033) + "px, #d4c5b0 " + (minDim * 0.034) + "px)",
                backgroundPositionY: minDim * 0.048,
                pointerEvents: "none",
                opacity: 0.4,
              }} />
              
              <div style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: minDim * 0.06,
                width: 2,
                backgroundColor: "#c9a8a8",
                opacity: 0.6,
              }} />
              
              <div style={{
                position: "relative",
                zIndex: 1,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", monospace",
                fontSize: minDim * 0.026,
                color: (props.inkColor ?? SCENE_PARAMS.inkColor.value),
                lineHeight: minDim * 0.035 + "px",
                whiteSpace: "pre",
                marginLeft: minDim * 0.04,
                letterSpacing: "0.05em",
              }}>
                {textLines.map((line, i) => (
                  <div key={i} style={{ minHeight: minDim * 0.035 }}>{line}</div>
                ))}
              </div>
            </div>
            
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: minDim * 0.02,
              background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
            }} />
          </div>
          
          <div style={{
            width: typewriterWidth,
            height: minDim * 0.08,
            backgroundColor: (props.typewriterAccent ?? SCENE_PARAMS.typewriterAccent.value),
            borderRadius: minDim * 0.01 + " " + minDim * 0.01 + " 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)",
            zIndex: 5,
          }}>
            <div style={{
              width: paperWidth + minDim * 0.04,
              height: minDim * 0.025,
              backgroundColor: "#0a0a0a",
              borderRadius: minDim * 0.003,
              position: "relative",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
            }}>
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translateX(" + carriageX + "px) translateY(-50%)",
                width: minDim * 0.015,
                height: minDim * 0.04,
                backgroundColor: "#333",
                borderRadius: minDim * 0.002,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}>
                <div style={{
                  position: "absolute",
                  bottom: -minDim * 0.02,
                  left: "50%",
                  transform: "translateX(-50%) rotate(" + (hammerProgress * -45) + "deg)",
                  transformOrigin: "top center",
                  width: minDim * 0.008,
                  height: minDim * 0.025,
                  backgroundColor: "#1a1a1a",
                  borderRadius: minDim * 0.001,
                }} />
              </div>
            </div>
            
            <div style={{
              position: "absolute",
              right: minDim * 0.03,
              top: "50%",
              transform: "translateY(-50%)",
              width: minDim * 0.025,
              height: minDim * 0.025,
              backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
              borderRadius: "50%",
              boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
              opacity: bellOpacity,
            }} />
            
            <div style={{
              position: "absolute",
              left: minDim * 0.02,
              top: minDim * 0.015,
              width: minDim * 0.12,
              height: minDim * 0.012,
              backgroundColor: (props.ribbonColor ?? SCENE_PARAMS.ribbonColor.value),
              borderRadius: minDim * 0.002,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
            }} />
            <div style={{
              position: "absolute",
              right: minDim * 0.02,
              top: minDim * 0.015,
              width: minDim * 0.12,
              height: minDim * 0.012,
              backgroundColor: (props.ribbonColor ?? SCENE_PARAMS.ribbonColor.value),
              borderRadius: minDim * 0.002,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
            }} />
          </div>
          
          <div style={{
            width: typewriterWidth,
            backgroundColor: (props.typewriterColor ?? SCENE_PARAMS.typewriterColor.value),
            borderRadius: "0 0 " + minDim * 0.02 + "px " + minDim * 0.02 + "px",
            padding: minDim * 0.02,
            paddingTop: minDim * 0.03,
            paddingBottom: minDim * 0.025,
            boxShadow: "0 15px 40px rgba(0,0,0,0.6), inset 0 1px 0 #333",
            position: "relative",
          }}>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: keyGap,
              alignItems: "center",
            }}>
              {keyboardRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: keyGap,
                    marginLeft: rowIndex === 1 ? keySize * 0.25 : rowIndex === 2 ? keySize * 0.5 : 0,
                  }}
                >
                  {row.map((key, keyIndex) => renderKey(key, rowIndex, keyIndex))}
                </div>
              ))}
              
              <div style={{
                display: "flex",
                gap: keyGap,
                marginTop: keyGap,
              }}>
                {renderKey('SPACE', 3, 0)}
              </div>
            </div>
            
            <div style={{
              position: "absolute",
              bottom: minDim * 0.008,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: minDim * 0.015,
            }}>
              <div style={{
                width: minDim * 0.05,
                height: minDim * 0.003,
                backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                borderRadius: minDim * 0.001,
              }} />
              <div style={{
                fontSize: minDim * 0.012,
                color: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                fontFamily: "Georgia, serif",
                letterSpacing: minDim * 0.004,
                fontWeight: 600,
              }}>
                REMINGTON
              </div>
              <div style={{
                width: minDim * 0.05,
                height: minDim * 0.003,
                backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                borderRadius: minDim * 0.001,
              }} />
            </div>
            
            <div style={{
              position: "absolute",
              left: minDim * 0.015,
              top: "50%",
              transform: "translateY(-50%)",
              width: minDim * 0.015,
              height: minDim * 0.08,
              backgroundColor: "#0a0a0a",
              borderRadius: minDim * 0.003,
              boxShadow: "inset 0 0 4px rgba(255,255,255,0.05)",
            }} />
            <div style={{
              position: "absolute",
              right: minDim * 0.015,
              top: "50%",
              transform: "translateY(-50%)",
              width: minDim * 0.015,
              height: minDim * 0.08,
              backgroundColor: "#0a0a0a",
              borderRadius: minDim * 0.003,
              boxShadow: "inset 0 0 4px rgba(255,255,255,0.05)",
            }} />
          </div>
          
          <div style={{
            position: "absolute",
            left: -minDim * 0.02,
            bottom: minDim * 0.05,
            width: minDim * 0.025,
            height: minDim * 0.15,
            backgroundColor: "#0a0a0a",
            borderRadius: minDim * 0.005,
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          }} />
          <div style={{
            position: "absolute",
            right: -minDim * 0.02,
            bottom: minDim * 0.05,
            width: minDim * 0.025,
            height: minDim * 0.15,
            backgroundColor: "#0a0a0a",
            borderRadius: minDim * 0.005,
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: 2026
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  displayText: { type: "text", label: "Display Text", value: "2026" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  blockSize: { type: "number", label: "ASCII Density", value: 14, min: 8, max: 25, step: 1 },
  transitionStart: { type: "number", label: "ASCII Transition Start", value: 50, min: 20, max: 100, step: 5 },
  transitionDuration: { type: "number", label: "Transition Length", value: 20, min: 5, max: 60, step: 5 },
  flickerEnabled: { type: "boolean", label: "Digital Flicker", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const text = (props.displayText ?? SCENE_PARAMS.displayText.value).slice(0, 4);
  
  // Split text into two rows for the "stacked" look
  const row1 = text.substring(0, 2);
  const row2 = text.substring(2, 4);
  
  const asciiPatterns = {
    '0': ['██████','██  ██','██  ██','██  ██','██  ██','██████'],
    '1': ['  ██  ','████  ','  ██  ','  ██  ','  ██  ','██████'],
    '2': ['██████','    ██','██████','██    ','██    ','██████'],
    '3': ['██████','    ██','██████','    ██','    ██','██████'],
    '4': ['██  ██','██  ██','██████','    ██','    ██','    ██'],
    '5': ['██████','██    ','██████','    ██','    ██','██████'],
    '6': ['██████','██    ','██████','██  ██','██  ██','██████'],
    '7': ['██████','    ██','   ██ ','  ██  ','  ██  ','  ██  '],
    '8': ['██████','██  ██','██████','██  ██','██  ██','██████'],
    '9': ['██████','██  ██','██████','    ██','    ██','██████'],
    ' ': ['      ','      ','      ','      ','      ','      '],
  };

  const transitionStart = (props.transitionStart ?? SCENE_PARAMS.transitionStart.value);
  const transitionDuration = (props.transitionDuration ?? SCENE_PARAMS.transitionDuration.value);
  
  const morphProgress = interpolate(
    adjustedFrame,
    [transitionStart, transitionStart + transitionDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const flicker = (props.flickerEnabled ?? SCENE_PARAMS.flickerEnabled.value) 
    ? interpolate(Math.sin(adjustedFrame * 0.8), [-1, 1], [0.92, 1]) 
    : 1;

  const renderBlockDigit = (char, index, isTopRow) => {
    const pattern = asciiPatterns[char] || asciiPatterns[' '];
    const size = (props.blockSize ?? SCENE_PARAMS.blockSize.value);
    const charDelay = (isTopRow ? 0 : 10) + (index * 5);
    
    const entrance = spring({
      frame: Math.max(0, adjustedFrame - charDelay),
      fps,
      config: { damping: 20, stiffness: 100 }
    });

    const entranceY = interpolate(entrance, [0, 1], [40, 0]);

    return (
      <div style={{
        position: 'relative',
        width: minDim * 0.4,
        height: minDim * 0.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: entrance * flicker,
        transform: `translateY(${entranceY}px)`,
        margin: `0 ${minDim * 0.02}px`,
      }}>
        {/* Standard High-Res Text Layer */}
        <div style={{
          position: 'absolute',
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ', system-ui, sans-serif',
          fontSize: minDim * 0.45,
          fontWeight: 900,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          opacity: 1 - morphProgress,
          zIndex: 2,
        }}>
          {char}
        </div>

        {/* Bold ASCII Layer */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          opacity: morphProgress,
          zIndex: 1,
        }}>
          {pattern.map((rowStr, rIdx) => (
            <div key={rIdx} style={{ display: 'flex' }}>
              {rowStr.split('').map((cell, cIdx) => (
                <div key={cIdx} style={{
                  width: size,
                  height: size,
                  backgroundColor: cell === '█' ? (props.textColor ?? SCENE_PARAMS.textColor.value) : 'transparent',
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: 'center', 
      alignItems: 'center', 
      overflow: 'hidden'
    }}>
      <div style={{
        transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: minDim * -0.05, // Tight stacking
      }}>
        {/* Row 1: Top digits */}
        <div style={{ display: 'flex' }}>
          {row1.split('').map((char, i) => renderBlockDigit(char, i, true))}
        </div>
        
        {/* Row 2: Bottom digits */}
        <div style={{ display: 'flex' }}>
          {row2.split('').map((char, i) => renderBlockDigit(char, i, false))}
        </div>
      </div>

      {/* Subtle scanline overlay to enhance the digital look */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 3px)',
        pointerEvents: 'none',
        zIndex: 10,
      }} />
    </AbsoluteFill>
  );
}

export default Scene;

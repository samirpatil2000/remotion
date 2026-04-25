// Template: charming-letting
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  messageText: { type: "text", label: "Message", value: "You're not behind, don't worry. You're just doing your things." },
  fontFamily: { type: "font", label: "Font", value: "Georgia" },
  backgroundColor: { type: "color", label: "Background", value: "#FFFFFF" },
  textColor: { type: "color", label: "Text", value: "#4A3728" },
  envelopeColor: { type: "color", label: "Envelope Color", value: "#e8dcc8" },
  envelopeDark: { type: "color", label: "Envelope Shadow", value: "#d4c4a8" },
  paperColor: { type: "color", label: "Paper Color", value: "#FFFEF8" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  stopMotionFrameRate: { type: "number", label: "Stop Motion Feel", value: 8, min: 3, max: 12, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const stopMotionRate = SCENE_PARAMS.stopMotionFrameRate.value;
  
  const quantizedFrame = Math.floor((frame * speed) / (fps / stopMotionRate)) * (fps / stopMotionRate);
  
  // Animation timeline (in frames at 30fps)
  // Step 1: Envelope closed with entrance (0-30)
  // Step 2: Flap opens (30-55)
  // Step 3: Paper peeks 10% (55-75)
  // Step 4: Paper peeks 30% (75-95)
  // Step 5: Paper rises and unfolds (95-140)
  // Step 6: Content reveals (140-170)
  // Hold (170+)
  
  const entranceEnd = 30;
  const flapOpenStart = 30;
  const flapOpenEnd = 55;
  const peek10Start = 55;
  const peek10End = 75;
  const peek30Start = 75;
  const peek30End = 95;
  const riseStart = 95;
  const riseEnd = 140;
  const contentStart = 140;
  const contentEnd = 170;
  
  // Envelope entrance
  const envelopeEntrance = interpolate(
    quantizedFrame,
    [0, entranceEnd],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const envelopeY = interpolate(envelopeEntrance, [0, 1], [height * 0.15, 0]);
  const envelopeOpacity = interpolate(quantizedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  // Flap rotation (180 = closed, 0 = open)
  const flapRotation = interpolate(
    quantizedFrame,
    [flapOpenStart, flapOpenEnd],
    [180, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Paper peek progress
  const peek10 = interpolate(
    quantizedFrame,
    [peek10Start, peek10End],
    [0, 0.1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  const peek30 = interpolate(
    quantizedFrame,
    [peek30Start, peek30End],
    [0.1, 0.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  const riseProgress = interpolate(
    quantizedFrame,
    [riseStart, riseEnd],
    [0.3, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Combined paper progress
  let paperProgress = 0;
  if (quantizedFrame >= peek10Start && quantizedFrame < peek30Start) {
    paperProgress = peek10;
  } else if (quantizedFrame >= peek30Start && quantizedFrame < riseStart) {
    paperProgress = peek30;
  } else if (quantizedFrame >= riseStart) {
    paperProgress = riseProgress;
  }
  
  // Content reveal
  const contentReveal = interpolate(
    quantizedFrame,
    [contentStart, contentEnd],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Paper fold amount (1 = fully folded, 0 = unfolded)
  const foldAmount = interpolate(
    quantizedFrame,
    [riseStart, riseEnd],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  
  // Sizing
  const envelopeWidth = minDim * 0.6;
  const envelopeHeight = envelopeWidth * 0.65;
  const flapHeight = envelopeHeight * 0.45;
  
  const paperWidth = envelopeWidth * 0.85;
  const paperFullHeight = paperWidth * 1.3;
  const paperFoldedHeight = paperFullHeight * 0.35;
  
  // Paper position
  const paperYOffset = interpolate(paperProgress, [0, 0.1, 0.3, 1], [
    envelopeHeight * 0.3,
    envelopeHeight * 0.15,
    -envelopeHeight * 0.1,
    -paperFullHeight * 0.75
  ]);
  
  // Paper scale for unfolding effect
  const paperScaleY = interpolate(foldAmount, [1, 0], [paperFoldedHeight / paperFullHeight, 1]);
  
  // Subtle rotation during rise
  const paperRotation = interpolate(paperProgress, [0.3, 0.6, 1], [0, -2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // Gentle float after settling
  const floatPhase = Math.max(0, quantizedFrame - contentEnd);
  const floatOffset = Math.sin(floatPhase * 0.05) * 4 * Math.min(1, floatPhase / 20);
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        
        {/* Paper card */}
        <div style={{
          position: "absolute",
          width: paperWidth,
          height: paperFullHeight,
          backgroundColor: SCENE_PARAMS.paperColor.value,
          borderRadius: minDim * 0.008,
          boxShadow: `0 ${4 + paperProgress * 12}px ${12 + paperProgress * 18}px rgba(0,0,0,${0.06 + paperProgress * 0.08})`,
          transform: `translateY(${paperYOffset + floatOffset}px) scaleY(${paperScaleY}) rotate(${paperRotation}deg)`,
          transformOrigin: "center bottom",
          opacity: paperProgress > 0 ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: minDim * 0.04,
          boxSizing: "border-box",
          zIndex: 1,
          overflow: "hidden",
        }}>
          {/* Paper texture lines */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,190,170,0.03) 3px, rgba(200,190,170,0.03) 4px)
            `,
            pointerEvents: "none",
          }} />
          
          {/* Fold line (visible when folded) */}
          {foldAmount > 0.1 && (
            <>
              <div style={{
                position: "absolute",
                top: "33%",
                left: "5%",
                right: "5%",
                height: 1,
                backgroundColor: `rgba(180,165,140,${foldAmount * 0.3})`,
              }} />
              <div style={{
                position: "absolute",
                top: "66%",
                left: "5%",
                right: "5%",
                height: 1,
                backgroundColor: `rgba(180,165,140,${foldAmount * 0.3})`,
              }} />
            </>
          )}
          
          {/* Message content */}
          <div style={{
            opacity: contentReveal,
            transform: `translateY(${interpolate(contentReveal, [0, 1], [15, 0])}px) scaleY(${1 / paperScaleY})`,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}>
            <p style={{
              fontFamily: `${SCENE_PARAMS.fontFamily.value}, Georgia, serif`,
              fontSize: minDim * 0.032,
              fontWeight: 400,
              color: SCENE_PARAMS.textColor.value,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "85%",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              {SCENE_PARAMS.messageText.value}
            </p>
            
            <span style={{
              display: "block",
              fontSize: minDim * 0.035,
              marginTop: minDim * 0.025,
              color: "#c9b896",
              opacity: interpolate(quantizedFrame, [contentEnd, contentEnd + 15], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              ✦
            </span>
          </div>
        </div>
        
        {/* Envelope body */}
        <div style={{
          position: "relative",
          width: envelopeWidth,
          height: envelopeHeight,
          transform: `translateY(${envelopeY + floatOffset}px)`,
          opacity: envelopeOpacity,
          zIndex: 2,
        }}>
          
          {/* Envelope back (behind flap) */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: SCENE_PARAMS.envelopeColor.value,
            borderRadius: minDim * 0.015,
            boxShadow: `0 4px 20px rgba(0,0,0,0.1)`,
          }}>
            {/* Envelope texture */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px)
              `,
              borderRadius: minDim * 0.015,
            }} />
            
            {/* Bottom fold lines */}
            <div style={{
              position: "absolute",
              bottom: "15%",
              left: "10%",
              width: 0,
              height: 0,
              borderLeft: `${envelopeWidth * 0.4}px solid transparent`,
              borderRight: `${envelopeWidth * 0.4}px solid transparent`,
              borderBottom: `${envelopeHeight * 0.3}px solid ${SCENE_PARAMS.envelopeDark.value}`,
              opacity: 0.3,
            }} />
          </div>
          
          {/* Envelope flap */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 0,
            height: 0,
            borderLeft: `${envelopeWidth * 0.5}px solid transparent`,
            borderRight: `${envelopeWidth * 0.5}px solid transparent`,
            borderTop: `${flapHeight}px solid ${SCENE_PARAMS.envelopeColor.value}`,
            transform: `translateX(-50%) rotateX(${flapRotation}deg)`,
            transformOrigin: "center top",
            filter: `brightness(${flapRotation > 90 ? 1 : 0.95})`,
            zIndex: flapRotation > 90 ? 3 : 0,
          }}>
            {/* Flap inner shadow when opening */}
            {flapRotation < 90 && (
              <div style={{
                position: "absolute",
                top: -flapHeight,
                left: -envelopeWidth * 0.5,
                width: envelopeWidth,
                height: flapHeight,
                background: `linear-gradient(to bottom, rgba(0,0,0,${0.05 * (1 - flapRotation/90)}) 0%, transparent 60%)`,
              }} />
            )}
          </div>
          
          {/* Front envelope pocket overlay */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60%",
            backgroundColor: SCENE_PARAMS.envelopeColor.value,
            borderRadius: `0 0 ${minDim * 0.015}px ${minDim * 0.015}px`,
            boxShadow: `inset 0 2px 8px rgba(0,0,0,0.05)`,
            zIndex: 2,
          }}>
            {/* Pocket texture */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px)
              `,
              borderRadius: `0 0 ${minDim * 0.015}px ${minDim * 0.015}px`,
            }} />
          </div>
          
          {/* Shadow under envelope */}
          <div style={{
            position: "absolute",
            bottom: -minDim * 0.04,
            left: "10%",
            width: "80%",
            height: minDim * 0.025,
            backgroundColor: "rgba(0,0,0,0.08)",
            borderRadius: "50%",
            filter: "blur(10px)",
          }} />
        </div>
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

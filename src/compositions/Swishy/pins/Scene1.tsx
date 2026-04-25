// Template: pins
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Letters for 'SWISHY'
  letter1: { type: "text", label: "Letter 1", value: "S" },
  letter2: { type: "text", label: "Letter 2", value: "W" },
  letter3: { type: "text", label: "Letter 3", value: "I" },
  letter4: { type: "text", label: "Letter 4", value: "S" },
  letter5: { type: "text", label: "Letter 5", value: "H" },
  letter6: { type: "text", label: "Letter 6", value: "Y" },

  // Stark Black and White palette
  ballColor: { type: "color", label: "Ball Color", value: "#000000" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "VT323" },
  
  // Animation Settings
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.2, min: 0.5, max: 2, step: 0.1 },
  stagger: { type: "number", label: "Stagger Frames", value: 8, min: 0, max: 20, step: 1 },
  gravityIntensity: { type: "number", label: "Gravity Bounce", value: 14, min: 5, max: 30, step: 1 },
};

function Scene() {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  // Defining the layout positions
  const balls = [
    { text: SCENE_PARAMS.letter1.value, x: 30, y: 25, rot: -15, delay: 0 },
    { text: SCENE_PARAMS.letter2.value, x: 65, y: 35, rot: 12, delay: 1 },
    { text: SCENE_PARAMS.letter3.value, x: 25, y: 55, rot: -5, delay: 2 },
    { text: SCENE_PARAMS.letter4.value, x: 75, y: 60, rot: 25, delay: 3 },
    { text: SCENE_PARAMS.letter5.value, x: 35, y: 82, rot: -10, delay: 4 },
    { text: SCENE_PARAMS.letter6.value, x: 70, y: 85, rot: 5, delay: 5 },
  ];

  const ballSize = minDim * 0.35;
  const letterSize = ballSize * 0.45;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value, overflow: "hidden" }}>
      <div style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center center"
      }}>
        {balls.map((ball, i) => {
          const staggerOffset = ball.delay * SCENE_PARAMS.stagger.value;
          const dropProgress = spring({
            frame: Math.max(0, adjustedFrame - staggerOffset),
            fps,
            config: { 
              damping: SCENE_PARAMS.gravityIntensity.value, 
              stiffness: 100 
            }
          });

          // Vertical start position
          const startY = -ballSize * 2;
          const targetY = (ball.y / 100) * height;
          const currentY = interpolate(dropProgress, [0, 1], [startY, targetY]);
          
          // Subtle sway for that 'swishy' feel
          const swayAmount = interpolate(dropProgress, [0, 0.5, 1], [0, 50 * (i % 2 === 0 ? 1 : -1), 0]);
          const currentX = (ball.x / 100) * width + swayAmount;

          const currentRot = interpolate(dropProgress, [0, 1], [ball.rot - 180, ball.rot]);
          const currentScale = interpolate(dropProgress, [0, 0.8, 1], [0.6, 1.1, 1]);
          const currentOpacity = interpolate(dropProgress, [0, 0.1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: currentX,
                top: currentY,
                width: ballSize,
                height: ballSize,
                marginLeft: -ballSize / 2,
                marginTop: -ballSize / 2,
                backgroundColor: SCENE_PARAMS.ballColor.value,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: currentOpacity,
                transform: `rotate(${currentRot}deg) scale(${currentScale})`,
                boxShadow: "0 20px 0px rgba(0,0,0,0.15)",
                border: `4px solid ${SCENE_PARAMS.backgroundColor.value === "#000000" ? "#ffffff" : "transparent"}`
              }}
            >
              <span style={{
                color: SCENE_PARAMS.textColor.value,
                fontSize: letterSize,
                fontWeight: 900,
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                userSelect: "none"
              }}>
                {ball.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

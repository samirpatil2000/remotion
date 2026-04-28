// Template: gravity-thought
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  centerWord: { type: "text", label: "Center Word", value: "play" },
  line1Left: { type: "text", label: "Line 1 Left", value: "I love to" },
  line1Right: { type: "text", label: "Line 1 Right", value: "at work" },
  line2Left: { type: "text", label: "Line 2 Left", value: "We need to" },
  line2Right: { type: "text", label: "Line 2 Right", value: "to learn" },
  line3Left: { type: "text", label: "Line 3 Left", value: "You have to" },
  line3Right: { type: "text", label: "Line 3 Right", value: "to grow" },
  line4Left: { type: "text", label: "Line 4 Left", value: "Always" },
  line4Right: { type: "text", label: "Line 4 Right", value: "to stay creative" },
  line5Left: { type: "text", label: "Line 5 Left", value: "Never stop to" },
  line5Right: { type: "text", label: "Line 5 Right", value: "and laugh" },
  line6Left: { type: "text", label: "Line 6 Left", value: "I rest to" },
  line6Right: { type: "text", label: "Line 6 Right", value: "even better" },
  line7Left: { type: "text", label: "Line 7 Left", value: "We need to" },
  line7Right: { type: "text", label: "Line 7 Right", value: "to feel alive" },
  line8Left: { type: "text", label: "Line 8 Left", value: "You have to" },
  line8Right: { type: "text", label: "Line 8 Right", value: "to win" },
  line9Left: { type: "text", label: "Line 9 Left", value: "It's time to" },
  line9Right: { type: "text", label: "Line 9 Right", value: "and learn" },
  line10Left: { type: "text", label: "Line 10 Left", value: "Never stop to" },
  line10Right: { type: "text", label: "Line 10 Right", value: "with your ideas" },
  fontFamily: { type: "font", label: "Font", value: "Playfair Display" },
  backgroundColor: { type: "color", label: "Background", value: "#0d0d0d" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  lineColor: { type: "color", label: "Line Color", value: "#ffffff" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const lines = [
    { left: (props.line1Left ?? SCENE_PARAMS.line1Left.value), right: (props.line1Right ?? SCENE_PARAMS.line1Right.value) },
    { left: (props.line2Left ?? SCENE_PARAMS.line2Left.value), right: (props.line2Right ?? SCENE_PARAMS.line2Right.value) },
    { left: (props.line3Left ?? SCENE_PARAMS.line3Left.value), right: (props.line3Right ?? SCENE_PARAMS.line3Right.value) },
    { left: (props.line4Left ?? SCENE_PARAMS.line4Left.value), right: (props.line4Right ?? SCENE_PARAMS.line4Right.value) },
    { left: (props.line5Left ?? SCENE_PARAMS.line5Left.value), right: (props.line5Right ?? SCENE_PARAMS.line5Right.value) },
    { left: (props.line6Left ?? SCENE_PARAMS.line6Left.value), right: (props.line6Right ?? SCENE_PARAMS.line6Right.value) },
    { left: (props.line7Left ?? SCENE_PARAMS.line7Left.value), right: (props.line7Right ?? SCENE_PARAMS.line7Right.value) },
    { left: (props.line8Left ?? SCENE_PARAMS.line8Left.value), right: (props.line8Right ?? SCENE_PARAMS.line8Right.value) },
    { left: (props.line9Left ?? SCENE_PARAMS.line9Left.value), right: (props.line9Right ?? SCENE_PARAMS.line9Right.value) },
    { left: (props.line10Left ?? SCENE_PARAMS.line10Left.value), right: (props.line10Right ?? SCENE_PARAMS.line10Right.value) },
  ];
  
  const totalLines = lines.length;
  const cycleFrames = 15;
  const totalCycleFrames = totalLines * cycleFrames;
  const loopedFrame = adjustedFrame % totalCycleFrames;
  
  const exactPosition = loopedFrame / cycleFrames;
  const currentLineIndex = Math.floor(exactPosition);
  const progressInCycle = exactPosition - currentLineIndex;
  
  const fontSize = minDim * 0.045;
  const centerFontSize = minDim * 0.12;
  const lineHeight = minDim * 0.065;
  const centerY = height * 0.5;
  const startY = centerY - (totalLines * lineHeight) / 2;
  
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  const easeOutBack = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  
  const easeInQuad = (t) => t * t;
  
  const movePhase = progressInCycle < 0.6 ? 0 : (progressInCycle - 0.6) / 0.4;
  const smoothMove = easeInOutCubic(movePhase);
  
  const currentLineY = startY + currentLineIndex * lineHeight + lineHeight * 0.3;
  const nextLineIndex = (currentLineIndex + 1) % totalLines;
  const nextLineY = startY + nextLineIndex * lineHeight + lineHeight * 0.3;
  
  const centerWordY = currentLineY + (nextLineY - currentLineY) * smoothMove;
  
  const velocityFactor = movePhase > 0 && movePhase < 1 
    ? Math.sin(movePhase * Math.PI) * 0.8
    : 0;
  
  const drawConnectingLines = () => {
    const lineElements = [];
    const boxSize = minDim * 0.018;
    const strokeWidth = 1.5;
    
    for (let i = 0; i < totalLines; i++) {
      const y = startY + i * lineHeight;
      const isActive = i === currentLineIndex;
      const isNext = i === nextLineIndex;
      
      let displacement = 0;
      
      if (isActive && progressInCycle < 0.6) {
        const expandProgress = easeOutBack(Math.min(progressInCycle / 0.3, 1));
        const settleProgress = progressInCycle > 0.3 ? easeInQuad((progressInCycle - 0.3) / 0.3) : 0;
        displacement = expandProgress * (1 - settleProgress * 0.3) * minDim * 0.08;
      } else if (isActive && progressInCycle >= 0.6) {
        const contractProgress = easeInQuad(movePhase);
        displacement = (1 - contractProgress) * minDim * 0.056;
      }
      
      if (isNext && progressInCycle >= 0.8) {
        const prepareProgress = (progressInCycle - 0.8) / 0.2;
        displacement = easeOutBack(prepareProgress) * minDim * 0.02;
      }
      
      const leftX = width * 0.15 - displacement;
      const rightX = width * 0.85 + displacement;
      
      lineElements.push(
        <rect
          key={"box-left-" + i}
          x={leftX - boxSize / 2}
          y={y - boxSize / 2}
          width={boxSize}
          height={boxSize}
          fill="none"
          stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
          strokeWidth={strokeWidth}
          opacity={0.6}
        />
      );
      
      lineElements.push(
        <rect
          key={"box-right-" + i}
          x={rightX - boxSize / 2}
          y={y - boxSize / 2}
          width={boxSize}
          height={boxSize}
          fill="none"
          stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
          strokeWidth={strokeWidth}
          opacity={0.6}
        />
      );
      
      if (i < totalLines - 1) {
        const nextY = startY + (i + 1) * lineHeight;
        lineElements.push(
          <line
            key={"vline-left-" + i}
            x1={leftX}
            y1={y + boxSize / 2}
            x2={width * 0.15}
            y2={nextY - boxSize / 2}
            stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
            strokeWidth={strokeWidth}
            opacity={0.4}
          />
        );
        lineElements.push(
          <line
            key={"vline-right-" + i}
            x1={rightX}
            y1={y + boxSize / 2}
            x2={width * 0.85}
            y2={nextY - boxSize / 2}
            stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
            strokeWidth={strokeWidth}
            opacity={0.4}
          />
        );
      }
      
      lineElements.push(
        <line
          key={"hline-left-" + i}
          x1={leftX + boxSize / 2}
          y1={y}
          x2={width * 0.35 - displacement * 0.5}
          y2={y}
          stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
          strokeWidth={strokeWidth}
          opacity={0.4}
        />
      );
      lineElements.push(
        <line
          key={"hline-right-" + i}
          x1={width * 0.65 + displacement * 0.5}
          y1={y}
          x2={rightX - boxSize / 2}
          y2={y}
          stroke={(props.lineColor ?? SCENE_PARAMS.lineColor.value)}
          strokeWidth={strokeWidth}
          opacity={0.4}
        />
      );
    }
    
    return lineElements;
  };
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative"
      }}>
        <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
          {drawConnectingLines()}
        </svg>
        
        {lines.map((line, i) => {
          const y = startY + i * lineHeight;
          const isActive = i === currentLineIndex;
          const isNext = i === nextLineIndex;
          
          let displacement = 0;
          let pushAway = 0;
          
          if (isActive && progressInCycle < 0.6) {
            const expandProgress = easeOutBack(Math.min(progressInCycle / 0.3, 1));
            const settleProgress = progressInCycle > 0.3 ? easeInQuad((progressInCycle - 0.3) / 0.3) : 0;
            displacement = expandProgress * (1 - settleProgress * 0.3) * minDim * 0.06;
          } else if (isActive && progressInCycle >= 0.6) {
            const contractProgress = easeInQuad(movePhase);
            displacement = (1 - contractProgress) * minDim * 0.042;
          }
          
          if (isNext && progressInCycle >= 0.8) {
            const prepareProgress = (progressInCycle - 0.8) / 0.2;
            displacement = easeOutBack(prepareProgress) * minDim * 0.015;
          }
          
          const distanceFromCenter = Math.abs(i - currentLineIndex - smoothMove);
          if (distanceFromCenter < 2 && velocityFactor > 0) {
            const proximity = 1 - distanceFromCenter / 2;
            pushAway = proximity * velocityFactor * minDim * 0.015;
          }
          
          return (
            <React.Fragment key={i}>
              <div style={{
                position: "absolute",
                right: width * 0.52 + displacement + pushAway,
                top: y - fontSize * 0.4,
                fontSize: fontSize,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", serif",
                fontStyle: "italic",
                color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                whiteSpace: "nowrap",
                textAlign: "right",
                transition: "none",
              }}>
                {line.left}
              </div>
              <div style={{
                position: "absolute",
                left: width * 0.52 + displacement + pushAway,
                top: y - fontSize * 0.4,
                fontSize: fontSize,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", serif",
                fontStyle: "italic",
                color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                whiteSpace: "nowrap",
              }}>
                {line.right}
              </div>
            </React.Fragment>
          );
        })}
        
        <div style={{
          position: "absolute",
          left: "50%",
          top: centerWordY,
          transform: "translate(-50%, -50%)",
          fontSize: centerFontSize,
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", serif",
          fontStyle: "italic",
          fontWeight: 400,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          whiteSpace: "nowrap",
          zIndex: 10,
        }}>
          {(props.centerWord ?? SCENE_PARAMS.centerWord.value)}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: flights-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Board Title", value: "ARRIVALS" },
  
  time1: { type: "text", label: "Flight 1 Time", value: "09:15" },
  dest1: { type: "text", label: "Flight 1 Destination", value: "TOKYO" },
  carrier1: { type: "text", label: "Flight 1 Carrier", value: "JL" },
  number1: { type: "text", label: "Flight 1 Number", value: "5021" },
  
  time2: { type: "text", label: "Flight 2 Time", value: "10:30" },
  dest2: { type: "text", label: "Flight 2 Destination", value: "PARIS" },
  carrier2: { type: "text", label: "Flight 2 Carrier", value: "AF" },
  number2: { type: "text", label: "Flight 2 Number", value: "1247" },
  
  time3: { type: "text", label: "Flight 3 Time", value: "11:45" },
  dest3: { type: "text", label: "Flight 3 Destination", value: "NEW YORK" },
  carrier3: { type: "text", label: "Flight 3 Carrier", value: "AA" },
  number3: { type: "text", label: "Flight 3 Number", value: "9876" },
  
  headingFont: { type: "font", label: "Title Font", value: "Oswald" },
  flipFont: { type: "font", label: "Flip Board Font", value: "Roboto Mono" },
  
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  tileColor: { type: "color", label: "Tile Color", value: "#1a1a1a" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  labelColor: { type: "color", label: "Label Color", value: "#cccccc" },
  borderColor: { type: "color", label: "Border Color", value: "#333333" },
  
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Row Stagger (frames)", value: 15, min: 5, max: 30, step: 1 },
  flipCycles: { type: "number", label: "Flip Cycles", value: 8, min: 3, max: 15, step: 1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  
  const padding = minDim * 0.05;
  const contentWidth = width - padding * 2;
  const contentHeight = height - padding * 2;
  
  const tileWidth = minDim * 0.038;
  const tileHeight = tileWidth * 1.4;
  const tileFontSize = tileWidth * 0.85;
  const tileGap = minDim * 0.004;
  
  const headerHeight = minDim * 0.12;
  const labelHeight = minDim * 0.04;
  const rowHeight = minDim * 0.075;
  const rowGap = minDim * 0.015;
  
  const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :-.";
  
  const flights = [
    { time: SCENE_PARAMS.time1.value, dest: SCENE_PARAMS.dest1.value, carrier: SCENE_PARAMS.carrier1.value, number: SCENE_PARAMS.number1.value },
    { time: SCENE_PARAMS.time2.value, dest: SCENE_PARAMS.dest2.value, carrier: SCENE_PARAMS.carrier2.value, number: SCENE_PARAMS.number2.value },
    { time: SCENE_PARAMS.time3.value, dest: SCENE_PARAMS.dest3.value, carrier: SCENE_PARAMS.carrier3.value, number: SCENE_PARAMS.number3.value },
    { time: "", dest: "", carrier: "", number: "" },
    { time: "", dest: "", carrier: "", number: "" }
  ];
  
  const timeChars = 5;
  const destChars = 10;
  const flightChars = 7;
  
  const FlipTile = ({ targetChar, delay, charIndex }) => {
    const flipDuration = 45;
    const cycleCount = SCENE_PARAMS.flipCycles.value + charIndex;
    const localFrame = Math.max(0, adjustedFrame - delay);
    
    const totalFlipTime = flipDuration;
    const progress = Math.min(1, localFrame / totalFlipTime);
    
    const targetIndex = allChars.indexOf(targetChar.toUpperCase());
    const finalIndex = targetIndex >= 0 ? targetIndex : allChars.length - 1;
    
    let displayChar = " ";
    
    if (localFrame > 0) {
      const cycleProgress = progress * cycleCount;
      const currentCycle = Math.floor(cycleProgress);
      const withinCycle = cycleProgress - currentCycle;
      
      if (progress >= 1) {
        displayChar = targetChar.toUpperCase();
      } else {
        const charPosition = Math.floor(withinCycle * allChars.length);
        displayChar = allChars[charPosition % allChars.length];
      }
    }
    
    const flipAngle = localFrame > 0 && progress < 1 
      ? Math.sin(localFrame * 0.8) * 15 
      : 0;
    
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: tileWidth,
        height: tileHeight,
        backgroundColor: SCENE_PARAMS.tileColor.value,
        color: SCENE_PARAMS.textColor.value,
        fontSize: tileFontSize,
        fontFamily: SCENE_PARAMS.flipFont.value + ", monospace",
        fontWeight: 700,
        borderRadius: minDim * 0.004,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        margin: "0 " + tileGap + "px",
        transform: "perspective(200px) rotateX(" + flipAngle + "deg)",
        transformStyle: "preserve-3d"
      }}>
        <span style={{ position: "relative", top: -tileFontSize * 0.02 }}>{displayChar}</span>
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 10,
          marginTop: -1
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.01))",
          borderBottom: "1px solid rgba(0,0,0,0.4)"
        }} />
      </div>
    );
  };
  
  const FlipRow = ({ text, maxChars, delay }) => {
    const paddedText = text.toUpperCase().padEnd(maxChars, " ").slice(0, maxChars);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {paddedText.split("").map((char, i) => (
          <FlipTile key={i} targetChar={char} delay={delay + i * 2} charIndex={i} />
        ))}
      </div>
    );
  };
  
  const headerProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const headerY = interpolate(headerProgress, [0, 1], [-30, 0]);
  
  const PlaneIcon = ({ rotation }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: minDim * 0.05, height: minDim * 0.05, transform: "rotate(" + rotation + "deg)" }}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
  
  const timeWidth = contentWidth * 0.2;
  const destWidth = contentWidth * 0.45;
  const flightWidth = contentWidth * 0.35;
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      fontFamily: SCENE_PARAMS.headingFont.value + ", sans-serif",
      color: "white"
    }}>
      <div style={{
        position: "absolute",
        top: padding,
        left: padding,
        width: contentWidth,
        height: contentHeight,
        display: "flex",
        flexDirection: "column",
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "top left"
      }}>
        {/* Header */}
        <div style={{
          height: headerHeight,
          backgroundColor: SCENE_PARAMS.backgroundColor.value,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "3px solid " + SCENE_PARAMS.borderColor.value,
          marginBottom: minDim * 0.018,
          opacity: headerProgress,
          transform: "translateY(" + headerY + "px)"
        }}>
          <div style={{ marginLeft: minDim * 0.01 }}>
            <PlaneIcon rotation={-45} />
          </div>
          <h1 style={{
            fontSize: minDim * 0.075,
            margin: 0,
            letterSpacing: minDim * 0.003,
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: SCENE_PARAMS.headingFont.value + ", sans-serif"
          }}>
            {SCENE_PARAMS.title.value}
          </h1>
          <div style={{ marginRight: minDim * 0.01 }}>
            <PlaneIcon rotation={45} />
          </div>
        </div>
        
        {/* Column Headers */}
        <div style={{
          display: "flex",
          height: labelHeight,
          alignItems: "center",
          fontSize: minDim * 0.024,
          fontWeight: 600,
          color: SCENE_PARAMS.labelColor.value,
          paddingBottom: minDim * 0.008,
          marginBottom: minDim * 0.008
        }}>
          <div style={{ width: timeWidth }}>TIME</div>
          <div style={{ flex: 1, paddingLeft: minDim * 0.01 }}>DESTINATION</div>
          <div style={{ width: flightWidth }}>FLIGHT</div>
        </div>
        
        {/* Flight Rows - 5 rows */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: rowGap
        }}>
          {flights.map((flight, rowIndex) => {
            const rowDelay = 10 + rowIndex * SCENE_PARAMS.staggerDelay.value;
            const rowProgress = spring({
              frame: Math.max(0, adjustedFrame - rowDelay),
              fps,
              config: { damping: 20, stiffness: 90 }
            });
            const rowY = interpolate(rowProgress, [0, 1], [15, 0]);
            
            const isEmpty = flight.time === "" && flight.dest === "" && flight.carrier === "" && flight.number === "";
            
            return (
              <div key={rowIndex} style={{
                height: rowHeight,
                display: "flex",
                alignItems: "center",
                opacity: rowProgress,
                transform: "translateY(" + rowY + "px)"
              }}>
                <div style={{ width: timeWidth }}>
                  <FlipRow text={isEmpty ? "     " : flight.time} maxChars={timeChars} delay={rowDelay + 5} />
                </div>
                <div style={{ flex: 1, paddingLeft: minDim * 0.01 }}>
                  <FlipRow text={isEmpty ? "          " : flight.dest} maxChars={destChars} delay={rowDelay + 8} />
                </div>
                <div style={{ width: flightWidth }}>
                  <FlipRow text={isEmpty ? "       " : (flight.carrier + " " + flight.number)} maxChars={flightChars} delay={rowDelay + 12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

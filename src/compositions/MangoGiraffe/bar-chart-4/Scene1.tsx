// Template: bar-chart-4
// Description: Editorial Split Asymmetric Bar Chart Variation
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  title: { type: "text", label: "Title", value: "Quarterly Results" },
  label1: { type: "text", label: "Label 1", value: "Q1" },
  label2: { type: "text", label: "Label 2", value: "Q2" },
  label3: { type: "text", label: "Label 3", value: "Q3" },
  label4: { type: "text", label: "Label 4", value: "Q4" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#050505" },
  textColor: { type: "color", label: "Text Color", value: "#FAFAFA" },
  labelColor: { type: "color", label: "Label Color", value: "#A1A1AA" },
  bar1Color: { type: "color", label: "Bar 1 Color", value: "#3B82F6" },
  bar2Color: { type: "color", label: "Bar 2 Color", value: "#8B5CF6" },
  bar3Color: { type: "color", label: "Bar 3 Color", value: "#EC4899" },
  bar4Color: { type: "color", label: "Bar 4 Color", value: "#F59E0B" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 6, min: 2, max: 20, step: 1 },
  
  // Style
  borderRadius: { type: "number", label: "Border Radius", value: 4, min: 0, max: 20, step: 2 },
};

// --- Components ---

const BackgroundWrapper: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: color, display: "flex", flexDirection: "row", padding: "10%" }}>
      {children}
    </AbsoluteFill>
  );
};

const TitleBlock: React.FC<{ text: string; color: string; delay: number; adjustedFrame: number; width: number }> = ({ text, color, delay, adjustedFrame, width }) => {
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: Math.max(0, adjustedFrame - delay),
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 }
  });
  
  const translateY = interpolate(progress, [0, 1], [150, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  
  return (
    <div style={{ width: "40%", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingRight: "5%" }}>
      <div style={{ overflow: "hidden" }}>
        <h1 style={{ 
          color, 
          fontSize: width * 0.07, 
          fontWeight: 700,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          margin: 0,
          transform: `translateY(${translateY}px)`,
          opacity
        }}>
          {text.split(" ").map((word, i) => (
             <span key={i} style={{ display: "block" }}>{word}</span>
          ))}
        </h1>
      </div>
    </div>
  );
};

const DividerLine: React.FC<{ delay: number; adjustedFrame: number; color: string }> = ({ delay, adjustedFrame, color }) => {
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: Math.max(0, adjustedFrame - delay),
    fps,
    config: { damping: 16, stiffness: 60 }
  });
  
  const heightProgress = interpolate(progress, [0, 1], [0, 100]);
  
  return (
    <div style={{
      width: 2,
      height: `${heightProgress}%`,
      backgroundColor: color,
      opacity: 0.3,
      alignSelf: "center",
      transformOrigin: "top"
    }} />
  );
};

interface BarItemProps {
  label: string;
  value: number; // 0 to 1
  color: string;
  labelColor: string;
  valueColor: string;
  delay: number;
  barHeight: number;
  maxBarWidth: number;
  borderRadius: number;
  adjustedFrame: number;
  fps: number;
  minDim: number;
}

const HorizontalBarRow: React.FC<BarItemProps> = ({ label, value, color, labelColor, valueColor, delay, barHeight, maxBarWidth, borderRadius, adjustedFrame, fps, minDim }) => {
  const barProgress = spring({ 
    frame: Math.max(0, adjustedFrame - delay), 
    fps, 
    config: { damping: 12, stiffness: 80, mass: 0.8 } 
  });
  
  const currentWidth = maxBarWidth * value * barProgress;
  const displayValue = Math.round(value * 100 * barProgress);
  
  const labelOpacity = interpolate(Math.max(0, adjustedFrame - delay - 5), [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelTranslateX = interpolate(Math.max(0, adjustedFrame - delay - 5), [0, 15], [-20, 0], { extrapolateRight: "clamp" });
  
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", marginBottom: minDim * 0.05 }}>
      {/* Label */}
      <div style={{
        width: "15%",
        color: labelColor,
        fontSize: minDim * 0.035,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 600,
        opacity: labelOpacity,
        transform: `translateX(${labelTranslateX}px)`,
        textAlign: "right",
        paddingRight: "5%"
      }}>
        {label}
      </div>
      
      {/* Bar */}
      <div style={{
        width: currentWidth,
        height: barHeight,
        backgroundColor: color,
        borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
        boxShadow: `0 8px 32px ${color}33`,
      }} />
      
      {/* Value Counter */}
      <div style={{
        marginLeft: "4%",
        color: valueColor,
        fontSize: minDim * 0.045,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 700,
        opacity: barProgress > 0.05 ? 1 : 0,
        fontVariantNumeric: "tabular-nums"
      }}>
        {displayValue}
      </div>
    </div>
  );
};

const ChartSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center",
      width: "60%",
      paddingLeft: "5%",
      height: "100%"
    }}>
      {children}
    </div>
  );
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const staggerDelay = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  
  const minDim = Math.min(width, height);
  const borderRadius = (props.borderRadius ?? SCENE_PARAMS.borderRadius.value);
  
  const barHeight = minDim * 0.06;
  const maxBarWidth = width * 0.6 * 0.6; // 60% of screen width, and max bar is 60% of that
  
  const data = [
    { label: (props.label1 ?? SCENE_PARAMS.label1.value), value: 0.65, color: (props.bar1Color ?? SCENE_PARAMS.bar1Color.value) },
    { label: (props.label2 ?? SCENE_PARAMS.label2.value), value: 0.85, color: (props.bar2Color ?? SCENE_PARAMS.bar2Color.value) },
    { label: (props.label3 ?? SCENE_PARAMS.label3.value), value: 0.55, color: (props.bar3Color ?? SCENE_PARAMS.bar3Color.value) },
    { label: (props.label4 ?? SCENE_PARAMS.label4.value), value: 1.0, color: (props.bar4Color ?? SCENE_PARAMS.bar4Color.value) },
  ];
  
  return (
    <BackgroundWrapper color={(props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value)}>
      <div style={{ 
        transform: `scale(${scaleValue})`, 
        transformOrigin: "center center", 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        flexDirection: "row" 
      }}>
        
        <TitleBlock 
          text={(props.title ?? SCENE_PARAMS.title.value)} 
          color={(props.textColor ?? SCENE_PARAMS.textColor.value)} 
          width={width}
          delay={5}
          adjustedFrame={adjustedFrame}
        />
        
        <DividerLine 
          delay={10} 
          adjustedFrame={adjustedFrame} 
          color={(props.labelColor ?? SCENE_PARAMS.labelColor.value)} 
        />
        
        <ChartSection>
          {data.map((item, i) => {
            const delay = 20 + i * staggerDelay;
            return (
              <HorizontalBarRow 
                key={i}
                label={item.label}
                value={item.value}
                color={item.color}
                labelColor={(props.labelColor ?? SCENE_PARAMS.labelColor.value)}
                valueColor={(props.textColor ?? SCENE_PARAMS.textColor.value)}
                delay={delay}
                barHeight={barHeight}
                maxBarWidth={maxBarWidth}
                borderRadius={borderRadius}
                minDim={minDim}
                adjustedFrame={adjustedFrame}
                fps={fps}
              />
            );
          })}
        </ChartSection>
        
      </div>
    </BackgroundWrapper>
  );
}

export default Scene;

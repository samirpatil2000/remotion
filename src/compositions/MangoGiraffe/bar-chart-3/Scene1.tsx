// Template variation: bar-chart-3
// Scene: Premium Apple-inspired dynamic bar chart

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Annual Growth" },
  label1: { type: "text", label: "Label 1", value: "2021" },
  label2: { type: "text", label: "Label 2", value: "2022" },
  label3: { type: "text", label: "Label 3", value: "2023" },
  label4: { type: "text", label: "Label 4", value: "2024" },
  
  value1: { type: "number", label: "Value 1", value: 42, min: 0, max: 100, step: 1 },
  value2: { type: "number", label: "Value 2", value: 68, min: 0, max: 100, step: 1 },
  value3: { type: "number", label: "Value 3", value: 54, min: 0, max: 100, step: 1 },
  value4: { type: "number", label: "Value 4", value: 89, min: 0, max: 100, step: 1 },

  backgroundColor: { type: "color", label: "Background", value: "#05070a" },
  textColor: { type: "color", label: "Text Color", value: "#f8fafc" },
  accentColor: { type: "color", label: "Accent Color", value: "#3b82f6" },
  barGradientStart: { type: "color", label: "Bar Start", value: "#3b82f6" },
  barGradientEnd: { type: "color", label: "Bar End", value: "#8b5cf6" },
  gridLineColor: { type: "color", label: "Grid Lines", value: "#1e293b" },
  
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 6, min: 2, max: 15, step: 1 },
};

type BarChart3Props = Record<string, any>;

const getProp = (props: BarChart3Props, key: keyof typeof SCENE_PARAMS) =>
  props[key] ?? SCENE_PARAMS[key].value;

const ValueCounter: React.FC<{
  value: number;
  frame: number;
  fps: number;
  color: string;
  delay: number;
}> = ({ value, frame, fps, color, delay }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  
  const currentValue = Math.round(value * progress);
  
  return (
    <div style={{
      color,
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 12,
      opacity: progress,
      transform: `translateY(${(1 - progress) * 10}px)`,
    }}>
      {currentValue}%
    </div>
  );
};

export const Scene1: React.FC<BarChart3Props> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const minDim = Math.min(width, height);
  const speed = getProp(props, "animationSpeed") as number;
  const adjustedFrame = frame * speed;
  const staggerDelay = getProp(props, "staggerDelay") as number;
  const scale = getProp(props, "scale") as number;

  const data = [
    { label: getProp(props, "label1"), value: getProp(props, "value1") },
    { label: getProp(props, "label2"), value: getProp(props, "value2") },
    { label: getProp(props, "label3"), value: getProp(props, "value3") },
    { label: getProp(props, "label4"), value: getProp(props, "value4") },
  ];

  const maxVal = 100;
  const barWidth = minDim * 0.14;
  const maxBarHeight = height * 0.45;
  const gap = minDim * 0.06;

  const introOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: getProp(props, "backgroundColor"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${getProp(props, "gridLineColor")} 1px, transparent 1px), linear-gradient(90deg, ${getProp(props, "gridLineColor")} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        opacity: 0.15 * introOpacity,
      }} />

      <div style={{
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        zIndex: 1,
      }}>
        {/* Title */}
        <h1 style={{
          color: getProp(props, "textColor"),
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: minDim * 0.08,
          fontWeight: 800,
          margin: "0 0 80px 0",
          letterSpacing: "-0.02em",
          opacity: introOpacity,
          transform: `translateY(${(1 - introOpacity) * -20}px)`,
        }}>
          {getProp(props, "title")}
        </h1>

        {/* Bars Container */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: gap,
        }}>
          {data.map((item, i) => {
            const delay = i * staggerDelay + 10;
            const barProgress = spring({
              frame: adjustedFrame - delay,
              fps,
              config: { damping: 14, stiffness: 80 },
            });

            const heightVal = (item.value / maxVal) * maxBarHeight * barProgress;

            return (
              <div key={i} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <ValueCounter
                  value={item.value}
                  frame={adjustedFrame}
                  fps={fps}
                  color={getProp(props, "textColor")}
                  delay={delay + 15}
                />
                
                <div style={{
                  width: barWidth,
                  height: heightVal,
                  background: `linear-gradient(180deg, ${getProp(props, "barGradientStart")} 0%, ${getProp(props, "barGradientEnd")} 100%)`,
                  borderRadius: "16px 16px 4px 4px",
                  boxShadow: `0 10px 40px -10px ${getProp(props, "barGradientStart")}80`,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Glassmorphism Inner Shine */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "30%",
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)",
                  }} />
                </div>

                <div style={{
                  marginTop: 24,
                  color: getProp(props, "textColor"),
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  opacity: barProgress,
                  transform: `translateY(${(1 - barProgress) * 10}px)`,
                }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Orbs */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: "40%",
        height: "40%",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${getProp(props, "barGradientStart")}20 0%, transparent 70%)`,
        filter: "blur(60px)",
        opacity: introOpacity,
      }} />
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "40%",
        height: "40%",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${getProp(props, "barGradientEnd")}20 0%, transparent 70%)`,
        filter: "blur(60px)",
        opacity: introOpacity,
      }} />
    </AbsoluteFill>
  );
};

export default Scene1;

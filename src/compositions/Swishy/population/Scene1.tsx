// Template: population
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Population aged 0-49, 50-59, 60-69, 70-79 and 80 years and over, Brazil: 1950-2100" },
  yLabel: { type: "text", label: "Y Axis Label", value: "Number of people (thousands)" },
  source: { type: "text", label: "Source", value: "Source: UN/ESA. World Population Prospects 2024 https://population.un.org/wpp/" },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Text", value: "#eb0000" },
  axisColor: { type: "color", label: "Axis", value: "#9ca3af" },
  green: { type: "color", label: "50-59", value: "#4f0de7" },
  purple: { type: "color", label: "60-69", value: "#7c3aed" },
  red: { type: "color", label: "70-79", value: "#ef4444" },
  yellow: { type: "color", label: "80+", value: "#f59e0b" },
  blue: { type: "color", label: "0-49", value: "#2563eb" },
  scale: { type: "number", label: "Scale", value: 0.85, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 2, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 6, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 10, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  const chartLeft = width * 0.12;
  const chartRight = width * 0.9;
  const chartTop = height * 0.22;
  const chartBottom = height * 0.78;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const years = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];

  const data = years.map((y, i) => {
    const t = i / (years.length - 1);
    const v50_59 = 6 + 18 * Math.sin(Math.PI * t) + 6 * t;
    const v60_69 = 4 + 20 * Math.sin(Math.PI * t) + 10 * t;
    const v70_79 = 2 + 16 * Math.sin(Math.PI * t) + 12 * t;
    const v80 = 1 + 12 * Math.sin(Math.PI * t) + 10 * t;
    const v0_49 = 50 + 110 * Math.sin(Math.PI * t) - 20 * t;
    return { year: y, v50_59, v60_69, v70_79, v80, v0_49 };
  });

  const maxY = 170;
  const barCount = data.length;
  const barGap = chartWidth * 0.005;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;

  const lineProgress = interpolate(adjustedFrame, [10, 60], [0, 1], { extrapolateRight: "clamp" });

  const buildLinePath = () => {
    return data
      .map((d, i) => {
        const x = chartLeft + i * (barWidth + barGap) + barWidth / 2;
        const y = chartBottom - (d.v0_49 / maxY) * chartHeight;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const labelOpacity = interpolate(adjustedFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{ transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", transformOrigin: "center center" }}>
        <div style={{
          position: "absolute",
          top: height * 0.06,
          left: width * 0.06,
          width: width * 0.88,
          fontSize: minDim * 0.032,
          fontWeight: 600,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          lineHeight: 1.2,
          opacity: labelOpacity
        }}>
          {(props.title ?? SCENE_PARAMS.title.value)}
        </div>

        <div style={{
          position: "absolute",
          left: width * 0.03,
          top: height * 0.34,
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
          fontSize: minDim * 0.024,
          fontWeight: 400,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          opacity: labelOpacity
        }}>
          {(props.yLabel ?? SCENE_PARAMS.yLabel.value)}
        </div>

        <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
          <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom} stroke={(props.axisColor ?? SCENE_PARAMS.axisColor.value)} strokeWidth={1} />
          <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} stroke={(props.axisColor ?? SCENE_PARAMS.axisColor.value)} strokeWidth={1} />

          {data.map((d, i) => {
            const barDelay = i * (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
            const progress = spring({ frame: Math.max(0, adjustedFrame - barDelay), fps, config: { damping: 20, stiffness: 90 } });
            const x = chartLeft + i * (barWidth + barGap);
            const h50_59 = (d.v50_59 / maxY) * chartHeight * progress;
            const h60_69 = (d.v60_69 / maxY) * chartHeight * progress;
            const h70_79 = (d.v70_79 / maxY) * chartHeight * progress;
            const h80 = (d.v80 / maxY) * chartHeight * progress;

            const y80 = chartBottom - h80;
            const y70 = y80 - h70_79;
            const y60 = y70 - h60_69;
            const y50 = y60 - h50_59;

            return (
              <g key={i}>
                <rect x={x} y={y50} width={barWidth} height={h50_59} fill={(props.green ?? SCENE_PARAMS.green.value)} />
                <rect x={x} y={y60} width={barWidth} height={h60_69} fill={(props.purple ?? SCENE_PARAMS.purple.value)} />
                <rect x={x} y={y70} width={barWidth} height={h70_79} fill={(props.red ?? SCENE_PARAMS.red.value)} />
                <rect x={x} y={y80} width={barWidth} height={h80} fill={(props.yellow ?? SCENE_PARAMS.yellow.value)} />
              </g>
            );
          })}

          <path
            d={buildLinePath()}
            stroke={(props.blue ?? SCENE_PARAMS.blue.value)}
            strokeWidth={3}
            fill="none"
            strokeDasharray={chartWidth * 2}
            strokeDashoffset={chartWidth * 2 * (1 - lineProgress)}
          />
        </svg>

        <div style={{
          position: "absolute",
          left: chartLeft,
          top: chartBottom + height * 0.02,
          width: chartWidth,
          display: "flex",
          justifyContent: "space-between",
          fontSize: minDim * 0.018,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          opacity: labelOpacity
        }}>
          {years.map((y, i) => (
            <span key={i} style={{ transform: "rotate(-60deg)", transformOrigin: "center" }}>{y}</span>
          ))}
        </div>

        <div style={{
          position: "absolute",
          left: chartLeft,
          top: chartBottom + height * 0.1,
          width: chartWidth,
          display: "flex",
          justifyContent: "center",
          gap: width * 0.03,
          fontSize: minDim * 0.022,
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          opacity: labelOpacity
        }}>
          <span style={{ color: (props.green ?? SCENE_PARAMS.green.value), fontWeight: 600 }}>50-59</span>
          <span style={{ color: (props.purple ?? SCENE_PARAMS.purple.value), fontWeight: 600 }}>60-69</span>
          <span style={{ color: (props.red ?? SCENE_PARAMS.red.value), fontWeight: 600 }}>70-79</span>
          <span style={{ color: (props.yellow ?? SCENE_PARAMS.yellow.value), fontWeight: 600 }}>80 years +</span>
          <span style={{ color: (props.blue ?? SCENE_PARAMS.blue.value), fontWeight: 600 }}>0-49 years</span>
        </div>

        <div style={{
          position: "absolute",
          left: width * 0.06,
          bottom: height * 0.05,
          fontSize: minDim * 0.02,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          opacity: labelOpacity
        }}>
          {(props.source ?? SCENE_PARAMS.source.value)}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

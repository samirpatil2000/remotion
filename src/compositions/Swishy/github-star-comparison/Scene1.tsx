// Template: github-star-comparison
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "Star History" },
  repo1Name: { type: "text", label: "Repo 1 Name", value: "openclaw/openclaw" },
  repo2Name: { type: "text", label: "Repo 2 Name", value: "torvalds/linux" },
  headingFont: { type: "font", label: "Title Font", value: "Caveat" },
  labelFont: { type: "font", label: "Label Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  linuxColor: { type: "color", label: "Linux Line", value: "#5bb4e5" },
  openclawColor: { type: "color", label: "Openclaw Line", value: "#c45a3b" },
  textColor: { type: "color", label: "Text", value: "#1a1a1a" },
  gridColor: { type: "color", label: "Grid", value: "#333333" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;

  const chartLeft = width * 0.22;
  const chartRight = width * 0.92;
  const chartTop = height * 0.15;
  const chartBottom = height * 0.82;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const years = ["2012", "2014", "2016", "2018", "2020", "2022", "2024", "2026"];
  const yLabels = ["50K", "100K", "150K", "200K"];

  // Linux data - smooth exponential curve ending at ~220K (y=1.0)
  const linuxData = [
    { x: 0, y: 0 }, { x: 0.05, y: 0.01 }, { x: 0.1, y: 0.02 }, { x: 0.15, y: 0.04 },
    { x: 0.2, y: 0.06 }, { x: 0.25, y: 0.08 }, { x: 0.3, y: 0.11 }, { x: 0.35, y: 0.14 },
    { x: 0.4, y: 0.17 }, { x: 0.45, y: 0.21 }, { x: 0.5, y: 0.26 }, { x: 0.55, y: 0.32 },
    { x: 0.6, y: 0.38 }, { x: 0.65, y: 0.46 }, { x: 0.7, y: 0.54 }, { x: 0.75, y: 0.64 },
    { x: 0.8, y: 0.74 }, { x: 0.85, y: 0.84 }, { x: 0.9, y: 0.92 }, { x: 0.95, y: 0.98 },
    { x: 1, y: 1.0 }
  ];

  // Openclaw data - starts late around 2025, rockets up past linux to ~240K (y=1.1)
  const openclawData = [
    { x: 0.88, y: 0 }, { x: 0.89, y: 0.05 }, { x: 0.90, y: 0.12 }, { x: 0.91, y: 0.22 },
    { x: 0.92, y: 0.35 }, { x: 0.93, y: 0.50 }, { x: 0.94, y: 0.65 }, { x: 0.95, y: 0.78 },
    { x: 0.96, y: 0.88 }, { x: 0.97, y: 0.96 }, { x: 0.98, y: 1.02 }, { x: 0.99, y: 1.07 },
    { x: 1, y: 1.1 }
  ];

  const titleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 22, stiffness: 80 } });
  const axisProgress = interpolate(adjustedFrame, [5, 30], [0, 1], { extrapolateRight: "clamp" });
  const linuxLineProgress = interpolate(adjustedFrame, [20, 90], [0, 1], { extrapolateRight: "clamp" });
  const openclawLineProgress = interpolate(adjustedFrame, [80, 130], [0, 1], { extrapolateRight: "clamp" });
  const legendProgress = spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 20, stiffness: 90 } });

  // Create smooth bezier curve path
  const createSmoothPath = (data, progress) => {
    const totalPoints = data.length;
    const visibleCount = Math.floor(totalPoints * progress);
    if (visibleCount < 2) return "";
    
    const points = data.slice(0, visibleCount).map(p => ({
      x: chartLeft + p.x * chartWidth,
      y: chartBottom - p.y * chartHeight
    }));
    
    let path = "M " + points[0].x + " " + points[0].y;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      path += " C " + cp1x + " " + cp1y + ", " + cp2x + " " + cp2y + ", " + p2.x + " " + p2.y;
    }
    
    return path;
  };

  const getLastVisiblePoint = (data, progress) => {
    const totalPoints = data.length;
    const visibleCount = Math.floor(totalPoints * progress);
    if (visibleCount < 1) return null;
    const p = data[visibleCount - 1];
    return {
      x: chartLeft + p.x * chartWidth,
      y: chartBottom - p.y * chartHeight
    };
  };

  const linuxEndPoint = getLastVisiblePoint(linuxData, linuxLineProgress);
  const openclawEndPoint = getLastVisiblePoint(openclawData, openclawLineProgress);

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center", width: "100%", height: "100%" }}>
        
        {/* Title */}
        <div style={{
          position: "absolute",
          top: height * 0.03,
          left: "50%",
          transform: "translateX(-50%) translateY(" + interpolate(titleProgress, [0, 1], [20, 0]) + "px)",
          fontSize: minDim * 0.055,
          fontWeight: 700,
          color: SCENE_PARAMS.textColor.value,
          fontFamily: SCENE_PARAMS.headingFont.value + ", cursive",
          opacity: titleProgress,
        }}>
          {SCENE_PARAMS.title.value}
        </div>

        {/* Legend box - moved to left side */}
        <div style={{
          position: "absolute",
          top: chartTop + height * 0.02,
          left: chartLeft + minDim * 0.02,
          border: "2px solid " + SCENE_PARAMS.textColor.value,
          borderRadius: minDim * 0.008,
          padding: minDim * 0.015,
          backgroundColor: SCENE_PARAMS.backgroundColor.value,
          opacity: legendProgress,
          transform: "translateY(" + interpolate(legendProgress, [0, 1], [10, 0]) + "px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: minDim * 0.01, marginBottom: minDim * 0.008 }}>
            <div style={{ width: minDim * 0.02, height: minDim * 0.02, backgroundColor: SCENE_PARAMS.openclawColor.value, borderRadius: minDim * 0.003 }} />
            <span style={{ fontSize: minDim * 0.022, fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif", color: SCENE_PARAMS.textColor.value }}>🦀 {SCENE_PARAMS.repo1Name.value}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: minDim * 0.01 }}>
            <div style={{ width: minDim * 0.02, height: minDim * 0.02, backgroundColor: SCENE_PARAMS.linuxColor.value, borderRadius: minDim * 0.003 }} />
            <span style={{ fontSize: minDim * 0.022, fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif", color: SCENE_PARAMS.textColor.value }}>🐧 {SCENE_PARAMS.repo2Name.value}</span>
          </div>
        </div>

        {/* SVG Chart */}
        <svg style={{ position: "absolute", width: "100%", height: "100%" }} viewBox={"0 0 " + width + " " + height}>
          {/* Y-axis */}
          <line
            x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom}
            stroke={SCENE_PARAMS.gridColor.value} strokeWidth={2}
            strokeDasharray={chartHeight}
            strokeDashoffset={chartHeight * (1 - axisProgress)}
          />
          {/* X-axis */}
          <line
            x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom}
            stroke={SCENE_PARAMS.gridColor.value} strokeWidth={2}
            strokeDasharray={chartWidth}
            strokeDashoffset={chartWidth * (1 - axisProgress)}
          />

          {/* Linux line - smooth curve */}
          <path
            d={createSmoothPath(linuxData, linuxLineProgress)}
            stroke={SCENE_PARAMS.linuxColor.value}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Openclaw line - smooth curve */}
          <path
            d={createSmoothPath(openclawData, openclawLineProgress)}
            stroke={SCENE_PARAMS.openclawColor.value}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Y-axis labels - positioned with more spacing from axis */}
        {yLabels.map((label, i) => {
          const y = chartBottom - ((i + 1) / 4) * chartHeight;
          const labelOpacity = interpolate(adjustedFrame, [10 + i * 5, 25 + i * 5], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              position: "absolute",
              right: width - chartLeft + minDim * 0.025,
              top: y,
              transform: "translateY(-50%)",
              fontSize: minDim * 0.025,
              fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif",
              color: SCENE_PARAMS.textColor.value,
              opacity: labelOpacity,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}>
              {label}
            </div>
          );
        })}

        {/* X-axis labels */}
        {years.map((year, i) => {
          const x = chartLeft + (i / (years.length - 1)) * chartWidth;
          const labelOpacity = interpolate(adjustedFrame, [15 + i * 3, 30 + i * 3], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              position: "absolute",
              left: x,
              top: chartBottom + minDim * 0.02,
              fontSize: minDim * 0.025,
              fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif",
              color: SCENE_PARAMS.textColor.value,
              opacity: labelOpacity,
              transform: "translateX(-50%)",
            }}>
              {year}
            </div>
          );
        })}

        {/* Axis titles - GitHub Stars with more spacing */}
        <div style={{
          position: "absolute",
          left: minDim * 0.01,
          top: (chartTop + chartBottom) / 2,
          transform: "rotate(-90deg) translateX(-50%)",
          transformOrigin: "center center",
          fontSize: minDim * 0.028,
          fontWeight: 600,
          fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif",
          color: SCENE_PARAMS.textColor.value,
          opacity: axisProgress,
          whiteSpace: "nowrap",
        }}>
          GitHub Stars
        </div>

        <div style={{
          position: "absolute",
          left: (chartLeft + chartRight) / 2,
          top: chartBottom + minDim * 0.07,
          fontSize: minDim * 0.028,
          fontWeight: 600,
          fontFamily: SCENE_PARAMS.labelFont.value + ", sans-serif",
          color: SCENE_PARAMS.textColor.value,
          opacity: axisProgress,
          transform: "translateX(-50%)",
        }}>
          Date
        </div>

        {/* Crab emoji at end of openclaw line */}
        {openclawEndPoint && openclawLineProgress > 0.1 && (
          <div style={{
            position: "absolute",
            left: openclawEndPoint.x - minDim * 0.02,
            top: openclawEndPoint.y - minDim * 0.055,
            fontSize: minDim * 0.04,
            opacity: 1,
          }}>
            🦀
          </div>
        )}

        {/* Penguin emoji at end of linux line */}
        {linuxEndPoint && linuxLineProgress > 0.1 && (
          <div style={{
            position: "absolute",
            left: linuxEndPoint.x - minDim * 0.02,
            top: linuxEndPoint.y - minDim * 0.055,
            fontSize: minDim * 0.04,
            opacity: 1,
          }}>
            🐧
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

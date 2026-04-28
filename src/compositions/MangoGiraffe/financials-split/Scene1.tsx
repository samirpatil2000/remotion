// Template variation: financials-split
// Scene: Asymmetric premium financial performance dashboard

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SCENE_PARAMS = {
  headline: { type: "text", label: "Headline", value: "Financial pulse" },
  subtitle: { type: "text", label: "Subtitle", value: "Q4 expense trajectory" },
  maxDollarAmount: { type: "number", label: "Max Dollar Amount", value: 2438, min: 100, max: 10000, step: 1 },
  tooltipLabel: { type: "text", label: "Tooltip Label", value: "Run rate" },
  comparisonLabel: { type: "text", label: "Comparison Label", value: "vs forecast" },
  comparisonValue: { type: "text", label: "Comparison Value", value: "+18.6%" },
  backgroundColor: { type: "color", label: "Background", value: "#070b0f" },
  panelColor: { type: "color", label: "Panel", value: "#101820" },
  textColorStart: { type: "color", label: "Text Gradient Start", value: "#f8fafc" },
  textColorEnd: { type: "color", label: "Text Gradient End", value: "#64748b" },
  gridLineColor: { type: "color", label: "Grid Lines", value: "#20303a" },
  curveColor: { type: "color", label: "Curve Color", value: "#12b981" },
  curveGlowColor: { type: "color", label: "Curve Glow", value: "#5eead4" },
  tooltipBg: { type: "color", label: "Tooltip Background", value: "#e8fff7" },
  tooltipTextColor: { type: "color", label: "Tooltip Text", value: "#07110d" },
  tooltipLabelColor: { type: "color", label: "Tooltip Label Color", value: "#4f6f65" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  backgroundTextOpacity: { type: "number", label: "Background Text Opacity", value: 0.16, min: 0.05, max: 0.4, step: 0.05 },
  gridLineCount: { type: "number", label: "Grid Line Count", value: 5, min: 3, max: 10, step: 1 },
};

type FinancialsSplitProps = Record<string, unknown>;

const getProp = (props: FinancialsSplitProps, key: keyof typeof SCENE_PARAMS) =>
  props[key] ?? SCENE_PARAMS[key].value;

const money = (value: number) => "$" + value.toLocaleString();

const buildLinePath = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 2) {
    return "";
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
};

const buildAreaPath = (
  points: Array<{ x: number; y: number }>,
  chartTop: number,
  chartHeight: number,
) => {
  if (points.length < 2) {
    return "";
  }

  const baseline = chartTop + chartHeight;
  const first = points[0];
  const last = points[points.length - 1];

  return `M ${first.x} ${baseline} L ${first.x} ${first.y} ${points
    .slice(1)
    .map((point) => `L ${point.x} ${point.y}`)
    .join(" ")} L ${last.x} ${baseline} Z`;
};

const MetricBlock: React.FC<{
  label: string;
  value: string;
  delay: number;
  align?: "left" | "right";
  mutedColor: string;
  textColor: string;
}> = ({ label, value, delay, align = "left", mutedColor, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - lift) * 16}px)`,
        textAlign: align,
      }}
    >
      <div
        style={{
          color: mutedColor,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 18,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: textColor,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 54,
          fontWeight: 780,
          letterSpacing: 0,
        }}
      >
        {value}
      </div>
    </div>
  );
};

function Scene(props: FinancialsSplitProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const minDim = Math.min(width, height);
  const speed = getProp(props, "animationSpeed") as number;
  const adjustedFrame = frame * speed;
  const maxAmount = getProp(props, "maxDollarAmount") as number;
  const gridLineCount = Math.round(getProp(props, "gridLineCount") as number);

  const contentInset = minDim * 0.075;
  const gap = minDim * 0.055;
  const leftWidth = width * 0.34;
  const chartLeft = contentInset + leftWidth + gap;
  const chartTop = height * 0.2;
  const chartWidth = width - chartLeft - contentInset;
  const chartHeight = height * 0.58;

  const intro = spring({ frame: adjustedFrame, fps, config: { damping: 18, stiffness: 90 } });
  const curveProgress = interpolate(adjustedFrame, [24, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentValue = Math.round(maxAmount * curveProgress);

  const bgTextOpacity = interpolate(
    adjustedFrame,
    [0, 36],
    [0, getProp(props, "backgroundTextOpacity") as number],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bgTextScale = interpolate(adjustedFrame, [0, 48], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rawPoints = [
    { x: 0, y: 0.78 },
    { x: 0.14, y: 0.7 },
    { x: 0.28, y: 0.64 },
    { x: 0.44, y: 0.47 },
    { x: 0.58, y: 0.52 },
    { x: 0.74, y: 0.28 },
    { x: 0.9, y: 0.22 },
    { x: 1, y: 0.14 },
  ];

  const visibleCount = Math.max(2, Math.ceil(rawPoints.length * curveProgress));
  const chartPoints = rawPoints.slice(0, visibleCount).map((point) => ({
    x: chartLeft + point.x * chartWidth,
    y: chartTop + point.y * chartHeight,
  }));
  const linePath = buildLinePath(chartPoints);
  const areaPath = buildAreaPath(chartPoints, chartTop, chartHeight);
  const lastPoint = chartPoints[chartPoints.length - 1] ?? {
    x: chartLeft,
    y: chartTop + chartHeight,
  };

  const tooltipOpacity = interpolate(adjustedFrame, [36, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = interpolate(Math.sin(adjustedFrame * 0.08), [-1, 1], [0.55, 1]);
  const dotPulse = interpolate(Math.sin(adjustedFrame * 0.12), [-1, 1], [0.92, 1.18]);

  const textStart = getProp(props, "textColorStart") as string;
  const textEnd = getProp(props, "textColorEnd") as string;
  const curveColor = getProp(props, "curveColor") as string;
  const curveGlowColor = getProp(props, "curveGlowColor") as string;
  const mutedText = "#86a095";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: getProp(props, "backgroundColor") as string,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: contentInset * 0.55,
          border: `1px solid ${getProp(props, "gridLineColor") as string}`,
          opacity: 0.42,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: chartTop,
          left: chartLeft,
          width: chartWidth,
          height: chartHeight,
          transform: `scale(${bgTextScale})`,
          transformOrigin: "center center",
          opacity: bgTextOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: Math.min(minDim * 0.27, chartWidth * 0.38),
          fontWeight: 820,
          letterSpacing: 0,
          lineHeight: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
          background: `linear-gradient(180deg, ${textStart} 0%, ${textEnd} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          userSelect: "none",
        }}
      >
        {money(currentValue)}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${getProp(props, "scale") as number})`,
          transformOrigin: "center center",
        }}
      >
        <section
          style={{
            position: "absolute",
            left: contentInset,
            top: height * 0.19,
            width: leftWidth,
            height: height * 0.62,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: interpolate(adjustedFrame, [0, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateX(${(1 - intro) * -28}px)`,
          }}
        >
          <div>
            <div
              style={{
                color: mutedText,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0,
                marginBottom: 18,
              }}
            >
              {getProp(props, "subtitle") as string}
            </div>
            <h1
              style={{
                margin: 0,
                color: textStart,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 82,
                lineHeight: 0.94,
                fontWeight: 820,
                letterSpacing: 0,
              }}
            >
              {getProp(props, "headline") as string}
            </h1>
          </div>

          <div
            style={{
              display: "grid",
              gap: 34,
              paddingTop: 34,
              borderTop: `1px solid ${getProp(props, "gridLineColor") as string}`,
            }}
          >
            <MetricBlock
              delay={28}
              label={getProp(props, "tooltipLabel") as string}
              value={money(currentValue)}
              mutedColor={mutedText}
              textColor={textStart}
            />
            <MetricBlock
              delay={42}
              label={getProp(props, "comparisonLabel") as string}
              value={getProp(props, "comparisonValue") as string}
              mutedColor={mutedText}
              textColor={curveGlowColor}
            />
          </div>
        </section>

        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="financialsSplitArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={curveGlowColor} stopOpacity={0.32 * glowPulse} />
              <stop offset="55%" stopColor={curveColor} stopOpacity={0.14 * glowPulse} />
              <stop offset="100%" stopColor={curveColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="financialsSplitLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={curveColor} />
              <stop offset="100%" stopColor={curveGlowColor} />
            </linearGradient>
            <filter id="financialsSplitGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect
            x={chartLeft - minDim * 0.022}
            y={chartTop - minDim * 0.04}
            width={chartWidth + minDim * 0.044}
            height={chartHeight + minDim * 0.09}
            rx={minDim * 0.025}
            fill={getProp(props, "panelColor") as string}
            opacity={interpolate(adjustedFrame, [10, 34], [0, 0.72], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />

          {Array.from({ length: gridLineCount }).map((_, index) => {
            const progress = gridLineCount === 1 ? 0 : index / (gridLineCount - 1);
            const x = chartLeft + progress * chartWidth;
            const lineOpacity = interpolate(adjustedFrame, [index * 5, index * 5 + 24], [0, 0.58], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <line
                key={`vertical-${index}`}
                x1={x}
                y1={chartTop}
                x2={x}
                y2={chartTop + chartHeight}
                stroke={getProp(props, "gridLineColor") as string}
                strokeWidth={1}
                strokeDasharray="8 8"
                opacity={lineOpacity}
              />
            );
          })}

          {Array.from({ length: 4 }).map((_, index) => {
            const y = chartTop + (index / 3) * chartHeight;
            return (
              <line
                key={`horizontal-${index}`}
                x1={chartLeft}
                y1={y}
                x2={chartLeft + chartWidth}
                y2={y}
                stroke={getProp(props, "gridLineColor") as string}
                strokeWidth={1}
                opacity={0.32}
              />
            );
          })}

          {areaPath && <path d={areaPath} fill="url(#financialsSplitArea)" />}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#financialsSplitLine)"
              strokeWidth={minDim * 0.011}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#financialsSplitGlow)"
            />
          )}

          {curveProgress > 0.05 && (
            <g>
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={minDim * 0.046 * glowPulse}
                fill={curveGlowColor}
                opacity={0.24}
              />
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={minDim * 0.018 * dotPulse}
                fill={curveGlowColor}
                filter="url(#financialsSplitGlow)"
              />
            </g>
          )}
        </svg>

        {curveProgress > 0.05 && (
          <div
            style={{
              position: "absolute",
              left: Math.min(lastPoint.x + minDim * 0.03, width - minDim * 0.28),
              top: Math.max(lastPoint.y - minDim * 0.065, minDim * 0.08),
              width: minDim * 0.24,
              padding: `${minDim * 0.023}px ${minDim * 0.026}px`,
              borderRadius: minDim * 0.022,
              background: getProp(props, "tooltipBg") as string,
              opacity: tooltipOpacity,
              transform: `translateY(${(1 - tooltipOpacity) * 12}px)`,
              boxShadow: `0 ${minDim * 0.018}px ${minDim * 0.05}px rgba(0,0,0,0.34)`,
              boxSizing: "border-box",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            <div
              style={{
                color: getProp(props, "tooltipLabelColor") as string,
                fontSize: minDim * 0.022,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0,
                marginBottom: minDim * 0.008,
              }}
            >
              {getProp(props, "tooltipLabel") as string}
            </div>
            <div
              style={{
                color: getProp(props, "tooltipTextColor") as string,
                fontSize: minDim * 0.043,
                lineHeight: 1,
                fontWeight: 820,
                letterSpacing: 0,
              }}
            >
              {money(currentValue)}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

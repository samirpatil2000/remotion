// Template: timeline
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  fontFamily: { type: "font", label: "Font", value: "Space Grotesk" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  primaryColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  highlightColor: { type: "color", label: "Highlight", value: "#ef4444" },
  playTriangleColor: { type: "color", label: "Play Triangle", value: "#ffffff" },
  lineThickness: { type: "number", label: "Line Thickness", value: 1, min: 0.6, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 1, min: 0, max: 2, step: 0.1 },
  dollarIcon: { type: "text", label: "Dollar Icon", value: "$" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  const lineDrawEnd = durationInFrames * 0.6;
  const drawProgress = interpolate(adjustedFrame, [0, lineDrawEnd], [0, 1], { extrapolateRight: "clamp" });

  const start = { x: width * 0.1, y: height * 0.7 };
  const p1 = { x: width * 0.32, y: height * 0.55 };
  const p2 = { x: width * 0.56, y: height * 0.46 };
  const p3 = { x: width * 0.76, y: height * 0.6 };
  const end = { x: width * 0.9, y: height * 0.46 };

  const pathD = `M ${start.x} ${start.y} C ${width * 0.18} ${height * 0.7}, ${width * 0.24} ${height * 0.58}, ${p1.x} ${p1.y} C ${width * 0.4} ${height * 0.52}, ${width * 0.46} ${height * 0.42}, ${p2.x} ${p2.y} C ${width * 0.62} ${height * 0.46}, ${width * 0.68} ${height * 0.6}, ${p3.x} ${p3.y} C ${width * 0.8} ${height * 0.66}, ${width * 0.84} ${height * 0.5}, ${end.x} ${end.y}`;

  const iconDelay = durationInFrames * 0.02;
  const iconFrame1 = lineDrawEnd * 0.25 + iconDelay;
  const iconFrame2 = lineDrawEnd * 0.5 + iconDelay;
  const iconFrame3 = lineDrawEnd * 0.75 + iconDelay;
  const finalFrame = lineDrawEnd * 0.95 + iconDelay;

  const iconProgress1 = spring({ frame: Math.max(0, adjustedFrame - iconFrame1), fps, config: { damping: 18, stiffness: 120 } });
  const iconProgress2 = spring({ frame: Math.max(0, adjustedFrame - iconFrame2), fps, config: { damping: 18, stiffness: 120 } });
  const iconProgress3 = spring({ frame: Math.max(0, adjustedFrame - iconFrame3), fps, config: { damping: 18, stiffness: 120 } });
  const finalProgress = spring({ frame: Math.max(0, adjustedFrame - finalFrame), fps, config: { damping: 20, stiffness: 110 } });

  const dotLight1 = interpolate(drawProgress, [0.2, 0.25], [0, 1], { extrapolateRight: "clamp" });
  const dotLight2 = interpolate(drawProgress, [0.45, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const dotLight3 = interpolate(drawProgress, [0.7, 0.75], [0, 1], { extrapolateRight: "clamp" });
  const dotLight4 = interpolate(drawProgress, [0.9, 0.95], [0, 1], { extrapolateRight: "clamp" });

  const strokeWidth = minDim * 0.003 * SCENE_PARAMS.lineThickness.value;
  const dotSize = minDim * 0.012;
  const iconSize = minDim * 0.05;

  const glow = SCENE_PARAMS.glowIntensity.value;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ width: "100%", height: "100%", transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", top: 0, left: 0 }}>
          <path
            d={pathD}
            fill="none"
            stroke={SCENE_PARAMS.primaryColor.value}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - drawProgress}
          />
        </svg>

        <div style={{ position: "absolute", left: p1.x, top: p1.y, transform: "translate(-50%, -50%)" }}>
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", backgroundColor: SCENE_PARAMS.highlightColor.value, opacity: dotLight1, boxShadow: `0 0 ${minDim * 0.01 * glow}px ${SCENE_PARAMS.highlightColor.value}` }} />
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" style={{ position: "absolute", left: "50%", top: "-140%", transform: `translate(-50%, 0) scale(${interpolate(iconProgress1, [0, 1], [0.6, 1], { extrapolateRight: "clamp" })})`, opacity: iconProgress1 }}>
            <path d="M6 3v7a6 6 0 0 0 12 0V3" fill="none" stroke={SCENE_PARAMS.primaryColor.value} strokeWidth="2" strokeLinecap="round" />
            <path d="M6 3h4M14 3h4" fill="none" stroke={SCENE_PARAMS.primaryColor.value} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ position: "absolute", left: p2.x, top: p2.y, transform: "translate(-50%, -50%)" }}>
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", backgroundColor: SCENE_PARAMS.highlightColor.value, opacity: dotLight2, boxShadow: `0 0 ${minDim * 0.01 * glow}px ${SCENE_PARAMS.highlightColor.value}` }} />
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" style={{ position: "absolute", left: "50%", top: "-140%", transform: `translate(-50%, 0) scale(${interpolate(iconProgress2, [0, 1], [0.6, 1], { extrapolateRight: "clamp" })})`, opacity: iconProgress2 }}>
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="none" stroke={SCENE_PARAMS.primaryColor.value} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ position: "absolute", left: p3.x, top: p3.y, transform: "translate(-50%, -50%)" }}>
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", backgroundColor: SCENE_PARAMS.highlightColor.value, opacity: dotLight3, boxShadow: `0 0 ${minDim * 0.01 * glow}px ${SCENE_PARAMS.highlightColor.value}` }} />
          <div style={{ position: "absolute", left: "50%", top: "-145%", transform: `translate(-50%, 0) scale(${interpolate(iconProgress3, [0, 1], [0.6, 1], { extrapolateRight: "clamp" })})`, opacity: iconProgress3, color: SCENE_PARAMS.primaryColor.value, fontSize: iconSize * 0.9, fontWeight: 700, fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif" }}>
            {SCENE_PARAMS.dollarIcon.value}
          </div>
        </div>

        <div style={{ position: "absolute", left: end.x, top: end.y, transform: "translate(-50%, -50%)" }}>
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", backgroundColor: SCENE_PARAMS.highlightColor.value, opacity: dotLight4, boxShadow: `0 0 ${minDim * 0.012 * glow}px ${SCENE_PARAMS.highlightColor.value}` }} />
          <div style={{ position: "absolute", left: "50%", top: "-135%", transform: `translate(-50%, 0) scale(${interpolate(finalProgress, [0, 1], [0.6, 1], { extrapolateRight: "clamp" })})`, opacity: finalProgress }}>
            <svg width={iconSize * 1.1} height={iconSize * 0.75} viewBox="0 0 48 32" style={{ filter: `drop-shadow(0 0 ${minDim * 0.008 * glow}px ${SCENE_PARAMS.highlightColor.value})` }}>
              <rect x="1" y="1" width="46" height="30" rx="6" fill={SCENE_PARAMS.highlightColor.value} stroke={SCENE_PARAMS.accentColor.value} strokeWidth="1.5" />
              <polygon points="20,9 34,16 20,23" fill={SCENE_PARAMS.playTriangleColor.value} />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: 3d-cube
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  title: { type: "text", label: "Title", value: "CSS 3D Transform" },
  frontLabel: { type: "text", label: "Front Label", value: "FRONT" },
  backLabel: { type: "text", label: "Back Label", value: "BACK" },
  rightLabel: { type: "text", label: "Right Label", value: "RIGHT" },
  leftLabel: { type: "text", label: "Left Label", value: "LEFT" },
  topLabel: { type: "text", label: "Top Label", value: "TOP" },
  bottomLabel: { type: "text", label: "Bottom Label", value: "BOTTOM" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#111827" },
  textColor: { type: "color", label: "Text Color", value: "#f3f4f6" },
  frontColor: { type: "color", label: "Front Color", value: "#3b82f6" },
  backColor: { type: "color", label: "Back Color", value: "#8b5cf6" },
  rightColor: { type: "color", label: "Right Color", value: "#ec4899" },
  leftColor: { type: "color", label: "Left Color", value: "#f59e0b" },
  topColor: { type: "color", label: "Top Color", value: "#10b981" },
  bottomColor: { type: "color", label: "Bottom Color", value: "#ef4444" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  rotationSpeedX: { type: "number", label: "Rotation Speed X", value: 1.5, min: 0.5, max: 4, step: 0.5 },
  rotationSpeedY: { type: "number", label: "Rotation Speed Y", value: 2, min: 0.5, max: 4, step: 0.5 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  const minDim = Math.min(width, height);
  const cubeSize = minDim * 0.2;
  const half = cubeSize / 2;
  
  const rotateX = (frame * (props.rotationSpeedX ?? SCENE_PARAMS.rotationSpeedX.value)) * Math.PI / 180;
  const rotateY = (frame * (props.rotationSpeedY ?? SCENE_PARAMS.rotationSpeedY.value)) * Math.PI / 180;
  
  const introScale = spring({ frame, fps, config: { damping: 10, stiffness: 60 } });
  
  const vertices = [
    [-half, -half, -half], [half, -half, -half], [half, half, -half], [-half, half, -half],
    [-half, -half, half], [half, -half, half], [half, half, half], [-half, half, half],
  ];
  
  const faces = [
    { verts: [4, 5, 6, 7], color: (props.frontColor ?? SCENE_PARAMS.frontColor.value), label: (props.frontLabel ?? SCENE_PARAMS.frontLabel.value) },
    { verts: [1, 0, 3, 2], color: (props.backColor ?? SCENE_PARAMS.backColor.value), label: (props.backLabel ?? SCENE_PARAMS.backLabel.value) },
    { verts: [5, 1, 2, 6], color: (props.rightColor ?? SCENE_PARAMS.rightColor.value), label: (props.rightLabel ?? SCENE_PARAMS.rightLabel.value) },
    { verts: [0, 4, 7, 3], color: (props.leftColor ?? SCENE_PARAMS.leftColor.value), label: (props.leftLabel ?? SCENE_PARAMS.leftLabel.value) },
    { verts: [7, 6, 2, 3], color: (props.topColor ?? SCENE_PARAMS.topColor.value), label: (props.topLabel ?? SCENE_PARAMS.topLabel.value) },
    { verts: [0, 1, 5, 4], color: (props.bottomColor ?? SCENE_PARAMS.bottomColor.value), label: (props.bottomLabel ?? SCENE_PARAMS.bottomLabel.value) },
  ];
  
  const cosX = Math.cos(rotateX), sinX = Math.sin(rotateX);
  const cosY = Math.cos(rotateY), sinY = Math.sin(rotateY);
  
  const project = (v) => {
    let [x, y, z] = v;
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;
    let y1 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;
    const perspective = minDim * 2;
    const s = perspective / (perspective + z2);
    return { x: x1 * s * introScale * scaleValue + width / 2, y: y1 * s * introScale * scaleValue + height / 2, z: z2, scale: s };
  };
  
  const faceData = faces.map((face) => {
    const projVerts = face.verts.map(vi => project(vertices[vi]));
    const avgZ = projVerts.reduce((sum, v) => sum + v.z, 0) / 4;
    const v0 = projVerts[0], v1 = projVerts[1], v2 = projVerts[2];
    const cross = (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x);
    return { ...face, projVerts, avgZ, visible: cross > 0 };
  });
  
  const sortedFaces = faceData.filter(f => f.visible).sort((a, b) => b.avgZ - a.avgZ);
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        top: height * 0.08,
        fontSize: minDim * 0.04,
        color: (props.textColor ?? SCENE_PARAMS.textColor.value),
        fontWeight: 600,
        fontFamily: "system-ui, sans-serif",
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        {(props.title ?? SCENE_PARAMS.title.value)}
      </div>
      
      <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
        {sortedFaces.map((face, i) => {
          const points = face.projVerts.map(v => v.x + "," + v.y).join(" ");
          const centerX = face.projVerts.reduce((s, v) => s + v.x, 0) / 4;
          const centerY = face.projVerts.reduce((s, v) => s + v.y, 0) / 4;
          const avgScale = face.projVerts.reduce((s, v) => s + v.scale, 0) / 4;
          return (
            <g key={i}>
              <polygon points={points} fill={face.color} stroke="rgba(255,255,255,0.3)" strokeWidth="2" opacity="0.9" />
              <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={minDim * 0.025 * avgScale} fontWeight="700" fontFamily="system-ui">{face.label}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
}

export default Scene;

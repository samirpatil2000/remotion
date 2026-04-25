// Template: search-box
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  searchLine1: { type: "text", label: "Line 1", value: "Website Design" },
  searchLine2: { type: "text", label: "Line 2", value: "Social Media Pages" },
  searchLine3: { type: "text", label: "Line 3", value: "Google Business Profile" },
  searchLine4: { type: "text", label: "Line 4", value: " Google Things to Do " },
  searchLine5: { type: "text", label: "Line 5", value: " Local SEO " },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundImage: { type: "image", label: "Background Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1772903542262-7ltmpm4/imageedit_1_4386550116.png" },
  textColor: { type: "color", label: "Text Color", value: "#bdbdbd" },
  cursorColor: { type: "color", label: "Cursor Color", value: "#bdbdbd" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  primaryColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  searchBoxX: { type: "number", label: "Search Box X (%)", value: 39, min: 0, max: 100, step: 1 },
  searchBoxY: { type: "number", label: "Search Box Y (%)", value: 50, min: 0, max: 100, step: 1 },
  searchBoxW: { type: "number", label: "Search Box Width (%)", value: 64, min: 10, max: 100, step: 1 },
  searchBoxH: { type: "number", label: "Search Box Height (%)", value: 9, min: 3, max: 20, step: 1 },
  paddingX: { type: "number", label: "Text Padding X (%)", value: 2.5, min: 0, max: 10, step: 0.5 },
  scale: { type: "number", label: "Scale", value: 0.9, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.8, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  const lines = [
    SCENE_PARAMS.searchLine1.value,
    SCENE_PARAMS.searchLine2.value,
    SCENE_PARAMS.searchLine3.value,
    SCENE_PARAMS.searchLine4.value,
    SCENE_PARAMS.searchLine5.value
  ];

  const animWindow = durationInFrames * 0.8;
  const segment = animWindow / lines.length;
  const typePortion = 0.7;

  const getTypedText = (i) => {
    const start = i * segment;
    const end = start + segment * typePortion;
    if (adjustedFrame < start) return "";
    if (adjustedFrame >= end) return lines[i];
    const p = interpolate(adjustedFrame, [start, end], [0, 1], { extrapolateRight: "clamp" });
    const count = Math.floor(p * lines[i].length);
    return lines[i].substring(0, count);
  };

  const currentIndex = Math.min(lines.length - 1, Math.floor(Math.min(adjustedFrame, animWindow - 1) / segment));
  const cursorBlink = interpolate(adjustedFrame % 20, [0, 10], [1, 0], { extrapolateRight: "clamp" });

  const leftPos = SCENE_PARAMS.searchBoxX.value + "%";
  const topPos = SCENE_PARAMS.searchBoxY.value + "%";
  const boxW = SCENE_PARAMS.searchBoxW.value + "%";
  const boxH = SCENE_PARAMS.searchBoxH.value + "%";
  const paddingX = (SCENE_PARAMS.paddingX.value / 100) * width;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <Img
        src={SCENE_PARAMS.backgroundImage.value}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{
        position: "absolute",
        left: leftPos,
        top: topPos,
        width: boxW,
        height: boxH,
        display: "flex",
        alignItems: "center",
        paddingLeft: paddingX,
        paddingRight: paddingX,
        boxSizing: "border-box",
        transform: "scale(" + SCENE_PARAMS.scale.value + ")",
        transformOrigin: "left center"
      }}>
        <span style={{
          fontSize: minDim * 0.032,
          fontWeight: 500,
          color: SCENE_PARAMS.textColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip"
        }}>
          {getTypedText(currentIndex)}
        </span>
        <span style={{
          fontSize: minDim * 0.032,
          color: SCENE_PARAMS.cursorColor.value,
          marginLeft: minDim * 0.004,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: cursorBlink
        }}>
          |
        </span>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

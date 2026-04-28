// Template: typing-effect
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  variableName: { type: "text", label: "Variable Name", value: "greeting" },
  typedText: { type: "text", label: "Typed Text", value: "Hello, World!" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#1e1e1e" },
  editorColor: { type: "color", label: "Editor Background", value: "#252626" },
  headerColor: { type: "color", label: "Header Background", value: "#3c3c3c" },
  keywordColor: { type: "color", label: "Keyword Color", value: "#c586c0" },
  variableColor: { type: "color", label: "Variable Color", value: "#9cdcfe" },
  stringColor: { type: "color", label: "String Color", value: "#ce9178" },
  cursorColor: { type: "color", label: "Cursor Color", value: "#ffffff" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  typingSpeed: { type: "number", label: "Typing Speed", value: 4, min: 2, max: 10, step: 1 },
  
  // Options
  showWindowButtons: { type: "boolean", label: "Show Window Buttons", value: true },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const typingSpeed = (props.typingSpeed ?? SCENE_PARAMS.typingSpeed.value);
  
  const minDim = Math.min(width, height);
  const editorScale = minDim * 0.0018;
  const editorWidth = Math.min(width * 0.85, 400 * editorScale);
  
  const text = (props.typedText ?? SCENE_PARAMS.typedText.value);
  const charsVisible = Math.floor(frame / typingSpeed);
  const displayText = text.substring(0, Math.min(charsVisible, text.length));
  
  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;
  const showCursor = charsVisible <= text.length;
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center", opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }) }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center" }}>
        <div style={{
          width: editorWidth,
          backgroundColor: (props.editorColor ?? SCENE_PARAMS.editorColor.value),
          borderRadius: 8 * editorScale,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}>
          {(props.showWindowButtons ?? SCENE_PARAMS.showWindowButtons.value) && (
            <div style={{
              height: 24 * editorScale,
              backgroundColor: (props.headerColor ?? SCENE_PARAMS.headerColor.value),
              display: "flex",
              alignItems: "center",
              paddingLeft: 10 * editorScale,
              gap: 6 * editorScale,
            }}>
              <div style={{ width: 10 * editorScale, height: 10 * editorScale, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
              <div style={{ width: 10 * editorScale, height: 10 * editorScale, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
              <div style={{ width: 10 * editorScale, height: 10 * editorScale, borderRadius: "50%", backgroundColor: "#27ca40" }} />
            </div>
          )}
          
          <div style={{ padding: 16 * editorScale }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: (props.keywordColor ?? SCENE_PARAMS.keywordColor.value), fontSize: 14 * editorScale, fontFamily: "monospace" }}>const</span>
              <span style={{ color: (props.variableColor ?? SCENE_PARAMS.variableColor.value), fontSize: 14 * editorScale, fontFamily: "monospace", marginLeft: 6 * editorScale }}>{(props.variableName ?? SCENE_PARAMS.variableName.value)}</span>
              <span style={{ color: "#d4d4d4", fontSize: 14 * editorScale, fontFamily: "monospace", marginLeft: 6 * editorScale }}>=</span>
              <span style={{ color: (props.stringColor ?? SCENE_PARAMS.stringColor.value), fontSize: 14 * editorScale, fontFamily: "monospace", marginLeft: 6 * editorScale }}>"{displayText}"</span>
              {showCursor && <span style={{ width: 2, height: 16 * editorScale, backgroundColor: (props.cursorColor ?? SCENE_PARAMS.cursorColor.value), opacity: cursorOpacity, marginLeft: 1 }} />}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

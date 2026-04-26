// Template: funnel-text-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  text: { type: "text", label: "Text", value: "SWISHY  " },
  fontFamily: { type: "font", label: "Font", value: "VT323" },
  backgroundColor: { type: "color", label: "Background", value: "#5634eb" },
  pathColor: { type: "color", label: "Path Color", value: "#ffffff" },
  textColor: { type: "color", label: "Text Color", value: "#000000" },
  pathThickness: { type: "number", label: "Path Thickness", value: 160, min: 50, max: 300, step: 10 },
  fontSize: { type: "number", label: "Font Size", value: 85, min: 20, max: 150, step: 5 },
  animationSpeed: { type: "number", label: "Slide Speed", value: 1.5, min: 0.1, max: 5, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  
  // Repeat text heavily to ensure it completely fills the long winding path seamlessly
  const fullText = (props.text ?? SCENE_PARAMS.text.value).repeat(150);

  // Calculate continuous sliding offset
  // Negative value makes it slide 'forward' along the path
  const offset = -(frame * speed * 6);

  // The core of this animation is the meticulously crafted SVG path 
  // that perfectly matches the loopy, swishy trajectory in the source image.
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div 
        style={{ 
          width: "100%", 
          height: "100%", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          transform: `scale(${(props.scale ?? SCENE_PARAMS.scale.value)})`,
          transformOrigin: "center center"
        }}
      >
        <svg 
          viewBox="0 0 1080 1920" 
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <path
            id="swishyPath"
            d="
              M 100, -50
              C 200, 120, 500, 150, 800, 150
              C 1050, 150, 1050, 500, 850, 700
              C 650, 900, 400, 700, 500, 450
              C 600, 200, 1050, 350, 850, 800
              C 650, 1250, 150, 950, 150, 1300
              C 150, 1650, 850, 1400, 850, 1600
              C 850, 1800, 500, 1650, 300, 1850
              C 100, 2050, 300, 2350, 550, 2250
              C 800, 2150, 700, 1800, 450, 1750
              C 200, 1700, 150, 2100, 200, 2400
            "
            fill="none"
            stroke={(props.pathColor ?? SCENE_PARAMS.pathColor.value)}
            strokeWidth={(props.pathThickness ?? SCENE_PARAMS.pathThickness.value)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            style={{
              fontFamily: `${(props.fontFamily ?? SCENE_PARAMS.fontFamily.value)}, system-ui, sans-serif`,
              fontSize: `${(props.fontSize ?? SCENE_PARAMS.fontSize.value)}px`,
              fontWeight: 900,
              fill: (props.textColor ?? SCENE_PARAMS.textColor.value),
              letterSpacing: "0.02em",
              textTransform: "uppercase"
            }}
          >
            <textPath
              href="#swishyPath"
              startOffset={`${offset}px`}
              dominantBaseline="middle"
            >
              {fullText}
            </textPath>
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

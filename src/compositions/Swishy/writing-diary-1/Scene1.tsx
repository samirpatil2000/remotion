// Template: writing-diary-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Content
  bodyText: { type: "multilineText", label: "Body Text", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nI have three dogs. One of them is called Downey, the other one is Mochi, youngest one's name is Pepper" },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "Roboto" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#e3e3e3" },
  paperColor: { type: "color", label: "Paper", value: "#f8fafc" },
  coverColor: { type: "color", label: "Cover", value: "#0f172a" },
  bindingColor: { type: "color", label: "Binding", value: "rgba(15, 23, 42, 0.06)" },
  textColor: { type: "color", label: "Text Color", value: "#334155" },

  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },

  // Animation Timing
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 2, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },

  // Style
  borderRadius: { type: "number", label: "Border Radius", value: 20, min: 0, max: 50, step: 2 },
  shadowIntensity: { type: "number", label: "Shadow", value: 0.25, min: 0, max: 1, step: 0.05 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;

  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const isPortrait = height > width;

  const bookWidth = width * (isPortrait ? 0.7 : 0.42);
  const bookHeight = bookWidth * 1.35;

  const bookEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const bookY = interpolate(bookEntrance, [0, 1], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });
  const bookOpacity = interpolate(bookEntrance, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" });

  const writingStart = 42;
  const wordGap = minDim * 0.006;

  const tokens = (props.bodyText ?? SCENE_PARAMS.bodyText.value).replace(/\n/g, " \n ").split(" ").filter((t) => t.length > 0);
  let wordIndex = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: "scale(" + scaleValue + ")", transformOrigin: "center center" }}>
        <div style={{ position: "relative", width: bookWidth, height: bookHeight, perspective: minDim * 2 }}>
          {/* Pages */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: (props.paperColor ?? SCENE_PARAMS.paperColor.value),
              borderRadius: (props.borderRadius ?? SCENE_PARAMS.borderRadius.value),
              boxShadow: (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value) > 0
                ? "0 " + (minDim * 0.012) + "px " + (minDim * 0.03) + "px rgba(0,0,0," + (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value) + ")"
                : "none",
              opacity: bookOpacity,
              transform: "translateY(" + bookY + "px) rotate(" + (props.rotation ?? SCENE_PARAMS.rotation.value) + "deg)",
              filter: "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)",
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Left binding strip */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "12%",
              height: "100%",
              backgroundColor: (props.bindingColor ?? SCENE_PARAMS.bindingColor.value),
            }} />

            {/* Handwritten Text (word-by-word reveal) */}
            <div style={{
              position: "absolute",
              left: "18%",
              top: "20%",
              width: "70%",
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.024,
              lineHeight: 1.5,
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
            }}>
              {tokens.map((token, i) => {
                if (token === "\n") {
                  return (
                    <div key={"br-" + i} style={{ flexBasis: "100%", height: minDim * 0.02 }} />
                  );
                }

                const delay = writingStart + wordIndex * (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
                const wordProgress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
                const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
                const wordY = interpolate(wordProgress, [0, 1], [6, 0], { extrapolateRight: "clamp" });
                const wordBlur = interpolate(wordProgress, [0, 1], [2, 0], { extrapolateRight: "clamp" });
                wordIndex += 1;

                return (
                  <span
                    key={i}
                    style={{
                      marginRight: wordGap,
                      opacity: wordOpacity,
                      transform: "translateY(" + wordY + "px)",
                      display: "inline-block",
                      filter: "blur(" + wordBlur + "px)",
                    }}
                  >
                    {token}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

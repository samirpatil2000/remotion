// Template: june
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  monthYear: { type: "text", label: "Month & Year", value: "June 2024" },
  dates: { type: "multilineText", label: "Dates (one per line)", value: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30" },
  fontFamily: { type: "font", label: "Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#f6f2ea" },
  calendarColor: { type: "color", label: "Calendar Body", value: "#ffffff" },
  headerColor: { type: "color", label: "Header", value: "#f4c06a" },
  borderColor: { type: "color", label: "Border", value: "#e5e7eb" },
  textColor: { type: "color", label: "Text", value: "#1f2937" },
  dateBubbleColor: { type: "color", label: "Date Bubble", value: "#dbeafe" },
  weekendBubbleColor: { type: "color", label: "Weekend Bubble", value: "#fde68a" },
  accentColor: { type: "color", label: "Accent 1", value: "#f472b6" },
  accentColor2: { type: "color", label: "Accent 2", value: "#60a5fa" },
  shadowColor: { type: "color", label: "Shadow", value: "rgba(0,0,0,0.18)" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  cornerRadius: { type: "number", label: "Corner Radius", value: 0.06, min: 0.02, max: 0.12, step: 0.01 },
  staggerDelay: { type: "number", label: "Date Stagger", value: 2, min: 1, max: 8, step: 0.5 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  const animationWindow = durationInFrames * 0.7;
  const normalizedFrame = (adjustedFrame / animationWindow) * 90;

  const cardProgress = spring({ frame: normalizedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const headerProgress = spring({ frame: Math.max(0, normalizedFrame - 12), fps, config: { damping: 18, stiffness: 120 } });
  const textProgress = spring({ frame: Math.max(0, normalizedFrame - 18), fps, config: { damping: 20, stiffness: 100 } });

  const cardScale = interpolate(cardProgress, [0, 1], [0.92, 1], { extrapolateRight: "clamp" });
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(headerProgress, [0, 1], [-12, 0], { extrapolateRight: "clamp" });
  const textReveal = interpolate(textProgress, [0, 1], [0, 100], { extrapolateRight: "clamp" });

  const calWidth = minDim * 0.78;
  const calHeight = calWidth * 1.1;
  const headerHeight = calHeight * 0.22;
  const radius = minDim * SCENE_PARAMS.cornerRadius.value;

  const gridCols = 7;
  const cellWidth = calWidth / gridCols;
  const cellHeight = (calHeight - headerHeight) / 5;

  const datesList = SCENE_PARAMS.dates.value.split("\n").map((d) => d.trim()).filter(Boolean);

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ width: "100%", height: "100%", transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <div
            style={{
              width: calWidth,
              height: calHeight,
              backgroundColor: SCENE_PARAMS.calendarColor.value,
              borderRadius: radius,
              border: "1px solid " + SCENE_PARAMS.borderColor.value,
              boxShadow: "0px 18px 40px " + SCENE_PARAMS.shadowColor.value,
              opacity: cardOpacity,
              transform: "scale(" + cardScale + ")",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: headerHeight,
                backgroundColor: SCENE_PARAMS.headerColor.value,
                transform: "translateY(" + headerY + "px)"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: headerHeight * 0.5,
                transform: "translate(-50%, -50%)",
                clipPath: "inset(0 " + (100 - textReveal) + "% 0 0)",
                whiteSpace: "nowrap"
              }}
            >
              <div
                style={{
                  fontSize: minDim * 0.06,
                  fontWeight: 700,
                  color: SCENE_PARAMS.textColor.value,
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                  letterSpacing: "0.01em"
                }}
              >
                {SCENE_PARAMS.monthYear.value}
              </div>
            </div>

            <div style={{ position: "absolute", left: 0, top: headerHeight, width: "100%", height: calHeight - headerHeight, display: "flex", flexWrap: "wrap" }}>
              {datesList.map((dateText, index) => {
                const dayNumber = parseInt(dateText, 10);
                const isAccent = dayNumber % 7 === 0;
                const isAccent2 = dayNumber % 5 === 0;
                const isWeekendStyle = dayNumber % 6 === 0;
                const bubbleColor = isAccent ? SCENE_PARAMS.accentColor.value : isAccent2 ? SCENE_PARAMS.accentColor2.value : isWeekendStyle ? SCENE_PARAMS.weekendBubbleColor.value : SCENE_PARAMS.dateBubbleColor.value;
                const bubbleOpacity = isAccent || isAccent2 || isWeekendStyle ? 0.95 : 0.35;
                const cellProgress = spring({ frame: Math.max(0, normalizedFrame - 20 - index * SCENE_PARAMS.staggerDelay.value), fps, config: { damping: 18, stiffness: 120 } });
                const cellY = interpolate(cellProgress, [0, 1], [12, 0], { extrapolateRight: "clamp" });
                const cellOpacity = interpolate(cellProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

                return (
                  <div
                    key={index}
                    style={{
                      width: cellWidth,
                      height: cellHeight,
                      borderRight: ((index + 1) % gridCols === 0) ? "none" : "1px solid " + SCENE_PARAMS.borderColor.value,
                      borderBottom: (index < gridCols * 4) ? "1px solid " + SCENE_PARAMS.borderColor.value : "none",
                      boxSizing: "border-box",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: cellOpacity,
                      transform: "translateY(" + cellY + "px)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: cellWidth * 0.55,
                        height: cellWidth * 0.55,
                        borderRadius: "50%",
                        backgroundColor: bubbleColor,
                        opacity: bubbleOpacity
                      }}
                    />
                    <div
                      style={{
                        fontSize: minDim * 0.028,
                        fontWeight: 600,
                        color: SCENE_PARAMS.textColor.value,
                        fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                        position: "relative"
                      }}
                    >
                      {dateText}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ position: "absolute", left: "12%", top: headerHeight * 0.1, width: "14%", height: headerHeight * 0.35, backgroundColor: SCENE_PARAMS.calendarColor.value, borderRadius: radius * 0.4, border: "1px solid " + SCENE_PARAMS.borderColor.value }} />
            <div style={{ position: "absolute", right: "12%", top: headerHeight * 0.1, width: "14%", height: headerHeight * 0.35, backgroundColor: SCENE_PARAMS.calendarColor.value, borderRadius: radius * 0.4, border: "1px solid " + SCENE_PARAMS.borderColor.value }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

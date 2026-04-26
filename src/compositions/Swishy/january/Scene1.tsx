// Template: january
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  month: { type: "text", label: "Month", value: "January" },
  year: { type: "text", label: "Year", value: "2026" },
  weekdays: { type: "multilineText", label: "Weekdays", value: "Sun\nMon\nTue\nWed\nThu\nFri\nSat" },
  daysInMonth: { type: "number", label: "Days in Month", value: 31, min: 28, max: 31, step: 1 },
  startDayIndex: { type: "number", label: "Start Day (0=Sun)", value: 4, min: 0, max: 6, step: 1 },
  highlightDay: { type: "number", label: "Highlight Day", value: 21, min: 1, max: 31, step: 1 },
  highlightScale: { type: "number", label: "Highlight Scale", value: 1.35, min: 1, max: 2, step: 0.05 },
  highlightDelay: { type: "number", label: "Highlight Pop Delay (frames)", value: 8, min: 0, max: 30, step: 1 },
  headingFont: { type: "font", label: "Heading Font", value: "Space Grotesk" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Text", value: "#111827" },
  secondaryColor: { type: "color", label: "Secondary", value: "#6b7280" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 4, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 18, min: 10, max: 50, step: 2 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const isPortrait = height > width;

  const weekdays = (props.weekdays ?? SCENE_PARAMS.weekdays.value).split("\n").slice(0, 7);
  const totalDays = Math.max(28, Math.min(31, Math.round((props.daysInMonth ?? SCENE_PARAMS.daysInMonth.value))));
  const startIndex = Math.max(0, Math.min(6, Math.round((props.startDayIndex ?? SCENE_PARAMS.startDayIndex.value))));
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const titleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const titleY = interpolate(titleProgress, [0, 1], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });

  const weekdayDelay = 10;
  const weekdaysProgress = spring({ frame: Math.max(0, adjustedFrame - weekdayDelay), fps, config: { damping: 20, stiffness: 90 } });
  const weekdaysY = interpolate(weekdaysProgress, [0, 1], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });

  const daysStartDelay = 20;

  const gridWidth = isPortrait ? width * 0.86 : width * 0.7;
  const gridLeft = (width - gridWidth) / 2;
  const gridTop = isPortrait ? height * 0.24 : height * 0.22;
  const cellGap = minDim * 0.018;

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ") rotate(" + (props.rotation ?? SCENE_PARAMS.rotation.value) + "deg)",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
      }}>
        <div style={{ position: "absolute", left: gridLeft, top: isPortrait ? height * 0.1 : height * 0.08 }}>
          <div style={{
            fontSize: minDim * 0.07,
            fontWeight: 700,
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontFamily: (props.headingFont ?? SCENE_PARAMS.headingFont.value) + ", system-ui, sans-serif",
            opacity: interpolate(titleProgress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" }),
            transform: "translateY(" + titleY + "px)",
            lineHeight: 1.05
          }}>{(props.month ?? SCENE_PARAMS.month.value)}</div>
          <div style={{
            fontSize: minDim * 0.035,
            fontWeight: 600,
            color: (props.secondaryColor ?? SCENE_PARAMS.secondaryColor.value),
            fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", system-ui, sans-serif",
            opacity: interpolate(titleProgress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" }),
            transform: "translateY(" + titleY + "px)",
            lineHeight: 1.2
          }}>{(props.year ?? SCENE_PARAMS.year.value)}</div>
        </div>

        <div style={{
          position: "absolute",
          left: gridLeft,
          top: gridTop,
          width: gridWidth,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: cellGap,
          opacity: interpolate(weekdaysProgress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" }),
          transform: "translateY(" + weekdaysY + "px)",
        }}>
          {weekdays.map((d, i) => (
            <div key={i} style={{
              fontSize: minDim * 0.022,
              fontWeight: 600,
              color: (props.secondaryColor ?? SCENE_PARAMS.secondaryColor.value),
              fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", system-ui, sans-serif",
              textAlign: "center",
              filter: (props.blur ?? SCENE_PARAMS.blur.value) > 0 ? "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)" : "none",
            }}>{d}</div>
          ))}
        </div>

        <div style={{
          position: "absolute",
          left: gridLeft,
          top: gridTop + minDim * 0.05,
          width: gridWidth,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: cellGap,
        }}>
          {Array.from({ length: startIndex }).map((_, i) => (
            <div key={"empty-" + i} style={{ height: minDim * 0.045 }} />
          ))}
          {daysArray.map((day, i) => {
            const delay = daysStartDelay + i * (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
            const progress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
            const slideY = interpolate(progress, [0, 1], [(props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value), 0], { extrapolateRight: "clamp" });
            const isHighlight = day === Math.round((props.highlightDay ?? SCENE_PARAMS.highlightDay.value));
            const popProgress = spring({
              frame: Math.max(0, adjustedFrame - delay - (props.highlightDelay ?? SCENE_PARAMS.highlightDelay.value)),
              fps,
              config: { damping: 18, stiffness: 120 }
            });
            const popScale = isHighlight
              ? interpolate(popProgress, [0, 1], [1, (props.highlightScale ?? SCENE_PARAMS.highlightScale.value)], { extrapolateRight: "clamp" })
              : 1;
            return (
              <div key={day} style={{
                fontSize: isHighlight ? minDim * 0.036 : minDim * 0.03,
                fontWeight: isHighlight ? 800 : 500,
                color: isHighlight ? (props.accentColor ?? SCENE_PARAMS.accentColor.value) : (props.textColor ?? SCENE_PARAMS.textColor.value),
                fontFamily: (props.bodyFont ?? SCENE_PARAMS.bodyFont.value) + ", system-ui, sans-serif",
                textAlign: "center",
                opacity: interpolate(progress, [0, 1], [0, (props.opacity ?? SCENE_PARAMS.opacity.value)], { extrapolateRight: "clamp" }),
                transform: "translateY(" + slideY + "px) scale(" + popScale + ")",
                filter: (props.blur ?? SCENE_PARAMS.blur.value) > 0 ? "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)" : "none",
                height: minDim * 0.045,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>{day}</div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

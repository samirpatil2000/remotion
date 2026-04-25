// Template: ad-spend
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  title: { type: "text", label: "Title", value: "AD spent" },
  amount: { type: "text", label: "Amount", value: "MAD 60,000.00" },
  toggleLeft: { type: "text", label: "Toggle Left", value: "Daily" },
  toggleRight: { type: "text", label: "Toggle Right", value: "Weekly" },
  tooltipText: { type: "text", label: "Tooltip", value: "Thursday – 50 Orders " },
  dayMon: { type: "text", label: "Mon", value: "Mon" },
  dayTue: { type: "text", label: "Tue", value: "Tue" },
  dayWed: { type: "text", label: "Wed", value: "Wed" },
  dayThu: { type: "text", label: "Thu", value: "Thu" },
  dayFri: { type: "text", label: "Fri", value: "Fri" },
  daySat: { type: "text", label: "Sat", value: "Sat" },
  daySun: { type: "text", label: "Sun", value: "Sun" },

  headingFont: { type: "font", label: "Heading Font", value: "Manrope" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },

  backgroundColor: { type: "color", label: "Background", value: "#0f0f0f" },
  cardColor: { type: "color", label: "Card", value: "#232323" },
  cardGlow: { type: "color", label: "Card Glow", value: "#2b2b2b" },
  textColor: { type: "color", label: "Text", value: "#f3f4f6" },
  secondaryText: { type: "color", label: "Secondary", value: "#a1a1aa" },
  gridColor: { type: "color", label: "Grid", value: "#2f2f2f" },
  barColor: { type: "color", label: "Bar", value: "#3a3a3a" },
  accentStart: { type: "color", label: "Accent Start", value: "#ff6a00" },
  accentEnd: { type: "color", label: "Accent End", value: "#ff3c00" },

  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  const isPortrait = height > width;

  const fadeIn = interpolate(adjustedFrame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const cardProgress = spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 20, stiffness: 90 } });
  const cardScale = interpolate(cardProgress, [0, 1], [0.98, 1], { extrapolateRight: "clamp" });
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const parallax = Math.sin(adjustedFrame / 120) * minDim * 0.01;

  const cardW = isPortrait ? width * 0.86 : width * 0.6;
  const cardH = isPortrait ? height * 0.52 : height * 0.62;
  const cardX = (width - cardW) / 2;
  const cardY = (height - cardH) / 2;

  const graphW = cardW * 0.78;
  const graphH = cardH * 0.45;
  const graphX = cardW * 0.12;
  const graphY = cardH * 0.38;

  const barValues = [22, 26, 24, 50, 34, 31, 33];
  const maxVal = 50;

  const gridOpacity = interpolate(adjustedFrame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const barsStart = 40;

  const thursdayDelay = barsStart + 3 * SCENE_PARAMS.staggerDelay.value;
  const thursdayProgress = spring({ frame: Math.max(0, adjustedFrame - thursdayDelay), fps, config: { damping: 20, stiffness: 90 } });
  const ceilingOpacity = interpolate(adjustedFrame, [thursdayDelay + 10, thursdayDelay + 25], [0, 1], { extrapolateRight: "clamp" });
  const tooltipOpacity = interpolate(adjustedFrame, [thursdayDelay + 20, thursdayDelay + 35], [0, 1], { extrapolateRight: "clamp" });

  const pulse = 0.5 + 0.5 * Math.sin(adjustedFrame / 8);

  const cursorOpacity = interpolate(adjustedFrame, [thursdayDelay + 18, thursdayDelay + 30], [0, 1], { extrapolateRight: "clamp" });
  const cursorHold = interpolate(adjustedFrame, [thursdayDelay + 30, thursdayDelay + 50], [1, 0], { extrapolateRight: "clamp" });
  const cursorAlpha = Math.min(cursorOpacity, cursorHold);

  const zoom = interpolate(adjustedFrame, [300, 360], [1, 1.03], { extrapolateRight: "clamp" });

  const columnW = graphW / 7;
  const barW = columnW * 0.55;
  const thuX = 3 * columnW + (columnW - barW) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        width: "100%",
        height: "100%",
        opacity: fadeIn,
        transform: "translateX(" + parallax + "px)",
      }}>
        <div style={{
          position: "absolute",
          left: cardX,
          top: cardY,
          width: cardW,
          height: cardH,
          backgroundColor: SCENE_PARAMS.cardColor.value,
          borderRadius: minDim * 0.035,
          boxShadow: "0 " + minDim * 0.02 + "px " + minDim * 0.08 + "px rgba(0,0,0,0.6), inset 0 0 " + minDim * 0.05 + "px rgba(255,255,255,0.02)",
          opacity: cardOpacity,
          transform: "scale(" + (cardScale * zoom * SCENE_PARAMS.scale.value) + ")",
          transformOrigin: "center center",
          backdropFilter: "blur(10px)",
        }}>
          <div style={{
            position: "absolute",
            left: cardW * 0.06,
            top: cardH * 0.08,
            color: SCENE_PARAMS.secondaryText.value,
            fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.02,
            fontWeight: 500,
          }}>
            {SCENE_PARAMS.title.value}
          </div>
          <div style={{
            position: "absolute",
            left: cardW * 0.06,
            top: cardH * 0.15,
            color: SCENE_PARAMS.textColor.value,
            fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.04,
            fontWeight: 700,
          }}>
            {SCENE_PARAMS.amount.value}
          </div>

          <div style={{
            position: "absolute",
            right: cardW * 0.06,
            top: cardH * 0.08,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2b2b2b",
            borderRadius: minDim * 0.02,
            padding: minDim * 0.005,
            gap: minDim * 0.008,
            fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.018,
            color: SCENE_PARAMS.secondaryText.value,
          }}>
            <div style={{ padding: minDim * 0.006 + "px " + minDim * 0.015 + "px" }}>{SCENE_PARAMS.toggleLeft.value}</div>
            <div style={{
              padding: minDim * 0.006 + "px " + minDim * 0.015 + "px",
              background: "linear-gradient(90deg, " + SCENE_PARAMS.accentStart.value + ", " + SCENE_PARAMS.accentEnd.value + ")",
              borderRadius: minDim * 0.018,
              color: "#ffffff",
              fontWeight: 600,
            }}>{SCENE_PARAMS.toggleRight.value}</div>
          </div>

          <div style={{ position: "absolute", left: graphX, top: graphY, width: graphW, height: graphH }}>
            {[0, 10, 20, 30, 40, 50].map((v, i) => {
              const y = graphH - (v / maxVal) * graphH;
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: 0,
                  top: y,
                  width: "100%",
                  height: 1,
                  backgroundColor: SCENE_PARAMS.gridColor.value,
                  opacity: gridOpacity,
                }} />
              );
            })}

            <div style={{
              position: "absolute",
              left: 0,
              top: graphH - (50 / maxVal) * graphH,
              width: "100%",
              height: 1,
              backgroundColor: SCENE_PARAMS.accentEnd.value,
              opacity: ceilingOpacity,
              boxShadow: "0 0 " + minDim * 0.01 + "px rgba(255,90,0,0.5)",
            }} />

            {barValues.map((val, i) => {
              const barDelay = barsStart + i * SCENE_PARAMS.staggerDelay.value;
              const barProgress = spring({ frame: Math.max(0, adjustedFrame - barDelay), fps, config: { damping: 20, stiffness: 90 } });
              const barH = barProgress * graphH * (val / maxVal);
              const x = i * columnW + (columnW - barW) / 2;
              const isThu = i === 3;
              const glow = isThu ? "0 0 " + minDim * 0.03 + "px rgba(255,90,0,0.4)" : "none";
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: x,
                  bottom: 0,
                  width: barW,
                  height: barH,
                  borderRadius: minDim * 0.015,
                  background: isThu
                    ? "linear-gradient(180deg, " + SCENE_PARAMS.accentStart.value + " 0%, " + SCENE_PARAMS.accentEnd.value + " 60%, #ffffff 100%)"
                    : SCENE_PARAMS.barColor.value,
                  boxShadow: glow,
                }} />
              );
            })}

            {thursdayProgress > 0 && (
              <div style={{
                position: "absolute",
                left: thuX + barW / 2 - minDim * 0.01,
                top: graphH - graphH * (50 / maxVal) - minDim * 0.01,
                width: minDim * 0.02,
                height: minDim * 0.02,
                borderRadius: minDim * 0.02,
                backgroundColor: SCENE_PARAMS.accentStart.value,
                opacity: 0.6 + 0.4 * pulse,
                boxShadow: "0 0 " + minDim * 0.03 + "px rgba(255,90,0,0.8)",
              }} />
            )}

            <div style={{
              position: "absolute",
              left: thuX + barW / 2,
              top: graphH - graphH * (50 / maxVal) - minDim * 0.085,
              transform: "translateX(-50%)",
              backgroundColor: "#2a2a2a",
              borderRadius: minDim * 0.015,
              padding: minDim * 0.012,
              opacity: tooltipOpacity,
              color: SCENE_PARAMS.textColor.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.018,
              boxShadow: "0 " + minDim * 0.01 + "px " + minDim * 0.04 + "px rgba(0,0,0,0.6)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}>
              {SCENE_PARAMS.tooltipText.value}
            </div>

            <svg style={{
              position: "absolute",
              left: thuX + barW / 2 + minDim * 0.02,
              top: graphH - graphH * (50 / maxVal) + minDim * 0.01,
              width: minDim * 0.03,
              height: minDim * 0.03,
              opacity: cursorAlpha,
            }} viewBox="0 0 24 24">
              <path d="M3 3 L21 12 L13 14 L11 21 Z" fill="#f3f4f6" />
            </svg>

            {[SCENE_PARAMS.dayMon.value, SCENE_PARAMS.dayTue.value, SCENE_PARAMS.dayWed.value, SCENE_PARAMS.dayThu.value, SCENE_PARAMS.dayFri.value, SCENE_PARAMS.daySat.value, SCENE_PARAMS.daySun.value].map((d, i) => (
              <div key={i} style={{
                position: "absolute",
                left: i * columnW + columnW / 2,
                bottom: -minDim * 0.045,
                transform: "translateX(-50%)",
                color: i === 3 ? SCENE_PARAMS.textColor.value : SCENE_PARAMS.secondaryText.value,
                fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.018,
              }}>{d}</div>
            ))}

            <div style={{
              position: "absolute",
              left: -minDim * 0.035,
              top: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: SCENE_PARAMS.secondaryText.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.018,
            }}>
              <div>50</div>
              <div>40</div>
              <div>30</div>
              <div>20</div>
              <div>10</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

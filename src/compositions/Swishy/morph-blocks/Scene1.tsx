// Template: morph-blocks
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  appTitle: { type: "text", label: "App Title", value: "NEXA AI" },
  cardTitle: { type: "text", label: "Main Card Title", value: "Launch Metrics" },
  cardSubtitle: { type: "text", label: "Main Card Subtitle", value: "Realtime performance" },
  statLabel: { type: "text", label: "Stat Label", value: "Active Nodes" },
  statValuePrefix: { type: "text", label: "Stat Prefix", value: "" },
  statValueSuffix: { type: "text", label: "Stat Suffix", value: "K" },
  statValueNumber: { type: "number", label: "Stat Value", value: 49.2, min: 0, max: 200, step: 0.1 },
  sideTitle: { type: "text", label: "Side Card Title", value: "Insights" },
  sideMetricLabel: { type: "text", label: "Side Metric Label", value: "Growth" },
  sideMetricPrefix: { type: "text", label: "Side Metric Prefix", value: "+" },
  sideMetricSuffix: { type: "text", label: "Side Metric Suffix", value: "%" },
  sideMetricNumber: { type: "number", label: "Side Metric Value", value: 18.4, min: 0, max: 100, step: 0.1 },
  toggleLabel: { type: "text", label: "Toggle Label", value: "Auto Sync" },
  bottomItem1Label: { type: "text", label: "Bottom Item 1 Label", value: "Uptime" },
  bottomItem1Value: { type: "text", label: "Bottom Item 1 Value", value: "99.98%" },
  bottomItem2Label: { type: "text", label: "Bottom Item 2 Label", value: "Latency" },
  bottomItem2Value: { type: "text", label: "Bottom Item 2 Value", value: "120ms" },
  bottomItem3Label: { type: "text", label: "Bottom Item 3 Label", value: "Errors" },
  bottomItem3Value: { type: "text", label: "Bottom Item 3 Value", value: "0.02%" },
  buttonLabel: { type: "text", label: "Button Label", value: "Request Access" },
  headingFont: { type: "font", label: "Heading Font", value: "Space Grotesk" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#0b1020" },
  midColor: { type: "color", label: "Mid Tone", value: "#0e1428" },
  glowColor: { type: "color", label: "Ambient Glow", value: "#111a33" },
  accentBlue: { type: "color", label: "Electric Sapphire", value: "#4f8dff" },
  platinum: { type: "color", label: "Platinum Edge", value: "#d5d8de" },
  graphite: { type: "color", label: "Graphite", value: "#6b7280" },
  textColor: { type: "color", label: "Text Color", value: "#f8fafc" },
  mutedText: { type: "color", label: "Muted Text", value: "#94a3b8" },
  glassTint: { type: "color", label: "Glass Tint", value: "rgba(255,255,255,0.06)" },
  glassBorder: { type: "color", label: "Glass Border", value: "rgba(213,216,222,0.32)" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 6, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 8, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 0.9, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  const isPortrait = height > width;

  const cameraProgress = interpolate(adjustedFrame, [0, 210], [0, 1], { extrapolateRight: "clamp" });
  const cameraZoom = interpolate(cameraProgress, [0, 1], [1, 1.08], { extrapolateRight: "clamp" });
  const cameraRotateY = interpolate(cameraProgress, [0, 1], [-3, 3.5], { extrapolateRight: "clamp" });
  const cameraRotateX = interpolate(cameraProgress, [0, 1], [2, -1.2], { extrapolateRight: "clamp" });
  const cameraPanX = interpolate(cameraProgress, [0, 1], [-width * 0.012, width * 0.018], { extrapolateRight: "clamp" });
  const cameraPanY = interpolate(cameraProgress, [0, 1], [height * 0.012, -height * 0.01], { extrapolateRight: "clamp" });

  const delayBase = SCENE_PARAMS.staggerDelay.value;

  const cardEntrance = (delay, depth) => {
    const progress = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
    const translateY = interpolate(progress, [0, 1], [SCENE_PARAMS.entranceOffset.value + depth, 0], { extrapolateRight: "clamp" });
    const translateZ = interpolate(progress, [0, 1], [depth * -1, 0], { extrapolateRight: "clamp" });
    const rotateX = interpolate(progress, [0, 1], [4, 0], { extrapolateRight: "clamp" });
    const rotateY = interpolate(progress, [0, 1], [-3, 0], { extrapolateRight: "clamp" });
    return { progress, translateY, translateZ, rotateX, rotateY };
  };

  const mainCard = cardEntrance(6, 30);
  const sideCard = cardEntrance(6 + delayBase, 40);
  const bottomCard = cardEntrance(6 + delayBase * 2, 50);
  const buttonCard = cardEntrance(6 + delayBase * 3, 60);

  const chartProgress = interpolate(adjustedFrame, [50, 110], [0, 1], { extrapolateRight: "clamp" });
  const chartEase = chartProgress * chartProgress * (3 - 2 * chartProgress);

  const toggleProgress = interpolate(adjustedFrame, [100, 135], [0, 1], { extrapolateRight: "clamp" });
  const toggleX = interpolate(toggleProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const scrollProgress = interpolate(adjustedFrame, [80, 170], [0, 1], { extrapolateRight: "clamp" });
  const scrollY = interpolate(scrollProgress, [0, 1], [0, -minDim * 0.06], { extrapolateRight: "clamp" });

  const buttonPulse = interpolate(adjustedFrame, [140, 190], [1, 1.04], { extrapolateRight: "clamp" });

  const appTitleProgress = spring({ frame: adjustedFrame, fps, config: { damping: 25, stiffness: 80 } });
  const titleY = interpolate(appTitleProgress, [0, 1], [18, 0], { extrapolateRight: "clamp" });

  const statProgress = interpolate(adjustedFrame, [45, 105], [0, 1], { extrapolateRight: "clamp" });
  const statEase = statProgress * statProgress * (3 - 2 * statProgress);
  const statValue = (SCENE_PARAMS.statValueNumber.value * statEase).toFixed(1);

  const sideProgress = interpolate(adjustedFrame, [70, 130], [0, 1], { extrapolateRight: "clamp" });
  const sideEase = sideProgress * sideProgress * (3 - 2 * sideProgress);
  const sideValue = (SCENE_PARAMS.sideMetricNumber.value * sideEase).toFixed(1);

  const glowShadow = "0 30px 80px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(213,216,222,0.2), inset 0 0 16px rgba(79,141,255,0.12)";

  const barHeights = [0.28, 0.52, 0.38, 0.68, 0.48, 0.82];

  const marginX = width * (isPortrait ? 0.08 : 0.1);
  const gapX = width * (isPortrait ? 0.05 : 0.04);
  const topY = height * 0.16;
  const rowGap = height * 0.04;
  const topRowHeight = height * 0.32;
  const bottomRowHeight = height * 0.22;
  const availableW = width - marginX * 2 - gapX;
  const leftW = availableW * 0.62;
  const rightW = availableW * 0.38;
  const bottomY = topY + topRowHeight + rowGap;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(120% 120% at 15% 0%, " + SCENE_PARAMS.glowColor.value + " 0%, " + SCENE_PARAMS.midColor.value + " 45%, " + SCENE_PARAMS.backgroundColor.value + " 100%)",
        filter: "blur(" + SCENE_PARAMS.blur.value + "px)",
        opacity: 0.85
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(80% 50% at 80% 10%, rgba(79,141,255,0.18) 0%, rgba(79,141,255,0) 60%)",
        opacity: 0.6
      }} />

      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: "scale(" + (SCENE_PARAMS.scale.value * cameraZoom) + ") translate(" + cameraPanX + "px," + cameraPanY + "px) perspective(1400px) rotateX(" + cameraRotateX + "deg) rotateY(" + cameraRotateY + "deg)",
        transformOrigin: "center center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          position: "absolute",
          top: height * 0.08,
          left: marginX,
          fontSize: minDim * 0.06,
          fontWeight: 700,
          color: SCENE_PARAMS.textColor.value,
          fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif",
          letterSpacing: 0.6,
          opacity: appTitleProgress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + titleY + "px)"
        }}>
          {SCENE_PARAMS.appTitle.value}
        </div>

        <div style={{
          position: "absolute",
          width: leftW,
          height: topRowHeight,
          top: topY,
          left: marginX,
          backgroundColor: SCENE_PARAMS.glassTint.value,
          borderRadius: minDim * 0.04,
          border: "1px solid " + SCENE_PARAMS.glassBorder.value,
          backdropFilter: "blur(16px)",
          boxShadow: glowShadow,
          opacity: mainCard.progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + mainCard.translateY + "px) translateZ(" + mainCard.translateZ + "px) rotateX(" + mainCard.rotateX + "deg) rotateY(" + mainCard.rotateY + "deg)",
          padding: minDim * 0.04,
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.015
        }}>
          <div style={{
            fontSize: minDim * 0.032,
            fontWeight: 600,
            color: SCENE_PARAMS.textColor.value,
            fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif"
          }}>
            {SCENE_PARAMS.cardTitle.value}
          </div>
          <div style={{
            fontSize: minDim * 0.022,
            fontWeight: 500,
            color: SCENE_PARAMS.mutedText.value,
            fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif"
          }}>
            {SCENE_PARAMS.cardSubtitle.value}
          </div>

          <div style={{ display: "flex", gap: minDim * 0.02, alignItems: "flex-end", height: "45%" }}>
            {barHeights.map((h, i) => {
              const barHeight = minDim * 0.18 * h * chartEase;
              return (
                <div key={i} style={{
                  width: "12%",
                  height: barHeight,
                  background: "linear-gradient(180deg, " + SCENE_PARAMS.platinum.value + " 0%, " + SCENE_PARAMS.accentBlue.value + " 100%)",
                  borderRadius: minDim * 0.02,
                  boxShadow: "0 10px 24px rgba(79,141,255,0.25)",
                  opacity: mainCard.progress
                }} />
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{
              fontSize: minDim * 0.022,
              color: SCENE_PARAMS.mutedText.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif"
            }}>
              {SCENE_PARAMS.statLabel.value}
            </div>
            <div style={{
              fontSize: minDim * 0.036,
              fontWeight: 700,
              color: SCENE_PARAMS.textColor.value,
              fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif"
            }}>
              {SCENE_PARAMS.statValuePrefix.value + statValue + SCENE_PARAMS.statValueSuffix.value}
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute",
          width: rightW,
          height: topRowHeight,
          top: topY,
          left: marginX + leftW + gapX,
          backgroundColor: SCENE_PARAMS.glassTint.value,
          borderRadius: minDim * 0.035,
          border: "1px solid " + SCENE_PARAMS.glassBorder.value,
          backdropFilter: "blur(16px)",
          boxShadow: glowShadow,
          opacity: sideCard.progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + sideCard.translateY + "px) translateZ(" + sideCard.translateZ + "px) rotateX(" + sideCard.rotateX + "deg) rotateY(" + sideCard.rotateY + "deg)",
          padding: minDim * 0.03,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div style={{
            fontSize: minDim * 0.026,
            fontWeight: 600,
            color: SCENE_PARAMS.textColor.value,
            fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif"
          }}>
            {SCENE_PARAMS.sideTitle.value}
          </div>

          <div style={{ height: "45%", display: "flex", flexDirection: "column", gap: minDim * 0.012 }}>
            <div style={{
              fontSize: minDim * 0.02,
              color: SCENE_PARAMS.mutedText.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif"
            }}>
              {SCENE_PARAMS.sideMetricLabel.value}
            </div>
            <div style={{
              fontSize: minDim * 0.03,
              fontWeight: 700,
              color: SCENE_PARAMS.accentBlue.value,
              fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif"
            }}>
              {SCENE_PARAMS.sideMetricPrefix.value + sideValue + SCENE_PARAMS.sideMetricSuffix.value}
            </div>
            <svg style={{ width: "100%", height: "40%" }} viewBox="0 0 100 40">
              <path
                d="M 0 30 Q 20 18 40 22 T 80 10 T 100 6"
                stroke={SCENE_PARAMS.accentBlue.value}
                strokeWidth={2}
                fill="none"
                strokeDasharray={200}
                strokeDashoffset={200 * (1 - chartEase)}
              />
            </svg>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: minDim * 0.02
          }}>
            <div style={{
              fontSize: minDim * 0.02,
              color: SCENE_PARAMS.mutedText.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif"
            }}>
              {SCENE_PARAMS.toggleLabel.value}
            </div>
            <div style={{
              width: minDim * 0.07,
              height: minDim * 0.035,
              background: "rgba(79,141,255,0.2)",
              borderRadius: minDim * 0.03,
              position: "relative",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.35)"
            }}>
              <div style={{
                position: "absolute",
                width: minDim * 0.03,
                height: minDim * 0.03,
                borderRadius: "50%",
                background: SCENE_PARAMS.textColor.value,
                top: minDim * 0.002,
                left: minDim * 0.004 + toggleX * (minDim * 0.03),
                boxShadow: "0 6px 14px rgba(0,0,0,0.5)"
              }} />
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute",
          width: leftW,
          height: bottomRowHeight,
          top: bottomY,
          left: marginX,
          backgroundColor: SCENE_PARAMS.glassTint.value,
          borderRadius: minDim * 0.035,
          border: "1px solid " + SCENE_PARAMS.glassBorder.value,
          backdropFilter: "blur(16px)",
          boxShadow: glowShadow,
          opacity: bottomCard.progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + (bottomCard.translateY + scrollY) + "px) translateZ(" + bottomCard.translateZ + "px) rotateX(" + bottomCard.rotateX + "deg) rotateY(" + bottomCard.rotateY + "deg)",
          padding: minDim * 0.03,
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.02
        }}>
          {[
            { title: SCENE_PARAMS.bottomItem1Label.value, value: SCENE_PARAMS.bottomItem1Value.value },
            { title: SCENE_PARAMS.bottomItem2Label.value, value: SCENE_PARAMS.bottomItem2Value.value },
            { title: SCENE_PARAMS.bottomItem3Label.value, value: SCENE_PARAMS.bottomItem3Value.value }
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: SCENE_PARAMS.textColor.value,
              fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui, sans-serif"
            }}>
              <div style={{ fontSize: minDim * 0.022, color: SCENE_PARAMS.mutedText.value }}>{item.title}</div>
              <div style={{ fontSize: minDim * 0.026, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{
          position: "absolute",
          width: rightW,
          height: bottomRowHeight,
          top: bottomY,
          left: marginX + leftW + gapX,
          background: "linear-gradient(135deg, rgba(79,141,255,0.2) 0%, rgba(213,216,222,0.6) 50%, rgba(79,141,255,0.2) 100%)",
          borderRadius: minDim * 0.03,
          boxShadow: "0 18px 50px rgba(79,141,255,0.25)",
          opacity: buttonCard.progress * SCENE_PARAMS.opacity.value,
          transform: "translateY(" + buttonCard.translateY + "px) translateZ(" + buttonCard.translateZ + "px) rotateX(" + buttonCard.rotateX + "deg) rotateY(" + buttonCard.rotateY + "deg) scale(" + buttonPulse + ")",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: SCENE_PARAMS.textColor.value,
          fontSize: minDim * 0.026,
          fontWeight: 700,
          fontFamily: SCENE_PARAMS.headingFont.value + ", system-ui, sans-serif",
          letterSpacing: 0.6
        }}>
          {SCENE_PARAMS.buttonLabel.value}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

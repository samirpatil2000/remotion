// Template: wins-vs-losses
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Text
  introTitle: { type: "text", label: "Intro Title", value: "NSE Market Highlights – 18 March 2026" },
  transitionTitle: { type: "text", label: "Transition Title", value: "Now the Declines" },
  outroTitle: { type: "text", label: "Outro Title", value: "Market Mixed Today" },
  gainersTitle: { type: "text", label: "Gainers Title", value: "Top Gainers" },
  losersTitle: { type: "text", label: "Losers Title", value: "Top Losers" },

  g1Name: { type: "text", label: "Gainer 1 Name", value: "Flame Tree Group" },
  g1ValueText: { type: "text", label: "Gainer 1 Value Text", value: "+5.93%" },
  g1ValueNum: { type: "number", label: "Gainer 1 Value", value: 5.9, min: 0, max: 10, step: 0.01 },

  g2Name: { type: "text", label: "Gainer 2 Name", value: "Africa Mega Agricorp" },
  g2ValueText: { type: "text", label: "Gainer 2 Value Text", value: "+4.99%" },
  g2ValueNum: { type: "number", label: "Gainer 2 Value", value: 4.9, min: 0, max: 10, step: 0.01 },

  g3Name: { type: "text", label: "Gainer 3 Name", value: "Kenya Airways" },
  g3ValueText: { type: "text", label: "Gainer 3 Value Text", value: "+3.00%" },
  g3ValueNum: { type: "number", label: "Gainer 3 Value", value: 3.0, min: 0, max: 10, step: 0.01 },

  g4Name: { type: "text", label: "Gainer 4 Name", value: "Uchumi Supermarket" },
  g4ValueText: { type: "text", label: "Gainer 4 Value Text", value: "+1.40%" },
  g4ValueNum: { type: "number", label: "Gainer 4 Value", value: 1.4, min: 0, max: 10, step: 0.01 },

  g5Name: { type: "text", label: "Gainer 5 Name", value: "Nairobi Business Ventures" },
  g5ValueText: { type: "text", label: "Gainer 5 Value Text", value: "+1.33%" },
  g5ValueNum: { type: "number", label: "Gainer 5 Value", value: 1.33, min: 0, max: 10, step: 0.01 },

  l1Name: { type: "text", label: "Loser 1 Name", value: "CIC Insurance" },
  l1ValueText: { type: "text", label: "Loser 1 Value Text", value: "-2.54%" },
  l1ValueNum: { type: "number", label: "Loser 1 Value", value: 2.54, min: 0, max: 10, step: 0.01 },

  l2Name: { type: "text", label: "Loser 2 Name", value: "Kenya Re" },
  l2ValueText: { type: "text", label: "Loser 2 Value Text", value: "-1.85%" },
  l2ValueNum: { type: "number", label: "Loser 2 Value", value: 1.85, min: 0, max: 10, step: 0.01 },

  l3Name: { type: "text", label: "Loser 3 Name", value: "Eveready East Africa" },
  l3ValueText: { type: "text", label: "Loser 3 Value Text", value: "-1.61%" },
  l3ValueNum: { type: "number", label: "Loser 3 Value", value: 1.61, min: 0, max: 10, step: 0.01 },

  l4Name: { type: "text", label: "Loser 4 Name", value: "Stanchart Kenya" },
  l4ValueText: { type: "text", label: "Loser 4 Value Text", value: "-1.48%" },
  l4ValueNum: { type: "number", label: "Loser 4 Value", value: 1.48, min: 0, max: 10, step: 0.01 },

  l5Name: { type: "text", label: "Loser 5 Name", value: "Britam Holdings" },
  l5ValueText: { type: "text", label: "Loser 5 Value Text", value: "-1.18%" },
  l5ValueNum: { type: "number", label: "Loser 5 Value", value: 1.18, min: 0, max: 10, step: 0.01 },

  // Font (single font)
  fontFamily: { type: "font", label: "Font", value: "Raleway" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  primaryColor: { type: "color", label: "Primary", value: "#111827" },
  accentColor: { type: "color", label: "Accent", value: "#070673" },
  gainColor: { type: "color", label: "Gain Color", value: "#1f7b40" },
  lossColor: { type: "color", label: "Loss Color", value: "#dc2626" },
  axisColor: { type: "color", label: "Axis Color", value: "#e5e7eb" },
  labelColor: { type: "color", label: "Label Color", value: "#6b7280" },
  gridColor: { type: "color", label: "Grid Color", value: "#e5e7eb66" },

  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },

  // Animation Timing
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames, fps } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const total = durationInFrames * speed;

  const introEnd = total * (2 / 18);
  const gainersStart = introEnd;
  const gainersEnd = total * (8 / 18);
  const transitionStart = gainersEnd;
  const transitionEnd = total * (9 / 18);
  const losersStart = transitionEnd;
  const losersEnd = total * (15 / 18);
  const outroStart = losersEnd;
  const outroEnd = total;

  const floatY = Math.sin(adjustedFrame / 18) * minDim * 0.003;
  const overallZoom = interpolate(adjustedFrame, [0, total], [1, 1.025], { extrapolateRight: "clamp" });

  const introIn = spring({ frame: Math.max(0, adjustedFrame), fps, config: { damping: 22, stiffness: 80 } });
  const introOut = interpolate(adjustedFrame, [introEnd * 0.7, introEnd], [1, 0], { extrapolateRight: "clamp" });
  const introOpacity = adjustedFrame <= introEnd ? introIn * introOut : 0;
  const introScale = interpolate(introIn, [0, 1], [0.98, 1], { extrapolateRight: "clamp" });

  const transitionIn = spring({ frame: Math.max(0, adjustedFrame - transitionStart), fps, config: { damping: 22, stiffness: 90 } });
  const transitionOut = interpolate(adjustedFrame, [transitionEnd - (transitionEnd - transitionStart) * 0.35, transitionEnd], [1, 0], { extrapolateRight: "clamp" });
  const transitionOpacity = adjustedFrame >= transitionStart && adjustedFrame <= transitionEnd ? transitionIn * transitionOut : 0;
  const transitionY = interpolate(transitionIn, [0, 1], [14, 0], { extrapolateRight: "clamp" });

  const outroIn = spring({ frame: Math.max(0, adjustedFrame - outroStart), fps, config: { damping: 24, stiffness: 75 } });
  const outroOpacity = adjustedFrame >= outroStart ? outroIn : 0;
  const outroScale = interpolate(outroIn, [0, 1], [0.985, 1.02], { extrapolateRight: "clamp" });

  const chartLeft = width * 0.08;
  const chartRight = width * 0.92;
  const chartTop = height * 0.2;
  const chartBottom = height * 0.78;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;
  const baselineY = chartTop + chartHeight * 0.55;
  const maxBarHeight = chartHeight * 0.4;
  const labelOffset = minDim * 0.015;

  const gainers = [
    { name: SCENE_PARAMS.g1Name.value, valueText: SCENE_PARAMS.g1ValueText.value, valueNum: SCENE_PARAMS.g1ValueNum.value },
    { name: SCENE_PARAMS.g2Name.value, valueText: SCENE_PARAMS.g2ValueText.value, valueNum: SCENE_PARAMS.g2ValueNum.value },
    { name: SCENE_PARAMS.g3Name.value, valueText: SCENE_PARAMS.g3ValueText.value, valueNum: SCENE_PARAMS.g3ValueNum.value },
    { name: SCENE_PARAMS.g4Name.value, valueText: SCENE_PARAMS.g4ValueText.value, valueNum: SCENE_PARAMS.g4ValueNum.value },
    { name: SCENE_PARAMS.g5Name.value, valueText: SCENE_PARAMS.g5ValueText.value, valueNum: SCENE_PARAMS.g5ValueNum.value }
  ];

  const losers = [
    { name: SCENE_PARAMS.l1Name.value, valueText: SCENE_PARAMS.l1ValueText.value, valueNum: SCENE_PARAMS.l1ValueNum.value },
    { name: SCENE_PARAMS.l2Name.value, valueText: SCENE_PARAMS.l2ValueText.value, valueNum: SCENE_PARAMS.l2ValueNum.value },
    { name: SCENE_PARAMS.l3Name.value, valueText: SCENE_PARAMS.l3ValueText.value, valueNum: SCENE_PARAMS.l3ValueNum.value },
    { name: SCENE_PARAMS.l4Name.value, valueText: SCENE_PARAMS.l4ValueText.value, valueNum: SCENE_PARAMS.l4ValueNum.value },
    { name: SCENE_PARAMS.l5Name.value, valueText: SCENE_PARAMS.l5ValueText.value, valueNum: SCENE_PARAMS.l5ValueNum.value }
  ];

  const maxGainer = Math.max(...gainers.map(g => g.valueNum));
  const maxLoser = Math.max(...losers.map(l => l.valueNum));

  const phaseOpacity = (start, end) => {
    const dur = end - start;
    if (adjustedFrame < start || adjustedFrame > end) return 0;
    const fadeIn = interpolate(adjustedFrame, [start, start + dur * 0.2], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(adjustedFrame, [end - dur * 0.2, end], [1, 0], { extrapolateRight: "clamp" });
    return fadeIn * fadeOut;
  };

  const renderBars = (data, phaseStart, phaseEnd, isNegative) => {
    const phaseDur = phaseEnd - phaseStart;
    const barAnimLen = Math.min(phaseDur * 0.35, 26);
    const stagger = barAnimLen * 0.4;
    const count = data.length;
    const barGap = chartWidth / (count * 2.2);
    const barWidth = (chartWidth - barGap * (count - 1)) / count;

    const chartOpacity = phaseOpacity(phaseStart, phaseEnd);

    return data.map((d, i) => {
      const animStart = phaseStart + i * stagger;
      const progress = spring({ frame: Math.max(0, adjustedFrame - animStart), fps, config: { damping: 20, stiffness: 90 } });
      const maxValue = isNegative ? maxLoser : maxGainer;
      const barHeight = (d.valueNum / maxValue) * maxBarHeight * progress;
      const x = chartLeft + i * (barWidth + barGap);
      const barTop = isNegative ? baselineY : baselineY - barHeight;
      const labelY = isNegative ? baselineY + barHeight + labelOffset : baselineY - barHeight - labelOffset * 2.2;
      const nameY = isNegative ? baselineY - minDim * 0.07 : baselineY + minDim * 0.035;
      const offsetY = interpolate(progress, [0, 1], [isNegative ? -6 : 6, 0], { extrapolateRight: "clamp" });

      return (
        <React.Fragment key={i}>
          <div style={{
            position: "absolute",
            left: x,
            top: barTop,
            width: barWidth,
            height: barHeight,
            backgroundColor: isNegative ? SCENE_PARAMS.lossColor.value : SCENE_PARAMS.gainColor.value,
            opacity: chartOpacity,
            transform: "translateY(" + offsetY + "px)"
          }} />
          <div style={{
            position: "absolute",
            left: x + barWidth / 2,
            top: labelY,
            transform: "translateX(-50%) translateY(" + offsetY + "px)",
            fontSize: minDim * 0.028,
            fontWeight: 700,
            color: isNegative ? SCENE_PARAMS.lossColor.value : SCENE_PARAMS.gainColor.value,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            opacity: chartOpacity
          }}>{d.valueText}</div>
          <div style={{
            position: "absolute",
            left: x + barWidth / 2,
            top: nameY,
            transform: "translateX(-50%) translateY(" + offsetY + "px)",
            width: barWidth * 1.9,
            textAlign: "center",
            fontSize: minDim * 0.022,
            fontWeight: 600,
            color: SCENE_PARAMS.labelColor.value,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            opacity: chartOpacity,
            whiteSpace: "normal",
            lineHeight: 1.15
          }}>{d.name}</div>
        </React.Fragment>
      );
    });
  };

  const baselineOpacity = Math.max(phaseOpacity(gainersStart, gainersEnd), phaseOpacity(losersStart, losersEnd));

  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      backgroundImage: "linear-gradient(to right, " + SCENE_PARAMS.gridColor.value + " 1px, transparent 1px), linear-gradient(to bottom, " + SCENE_PARAMS.gridColor.value + " 1px, transparent 1px)",
      backgroundSize: (minDim * 0.06) + "px " + (minDim * 0.06) + "px"
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: "scale(" + (overallZoom * SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center"
      }}>
        {/* Intro */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%) translateY(" + floatY + "px) scale(" + introScale + ")",
          opacity: introOpacity,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: minDim * 0.055,
            fontWeight: 800,
            color: SCENE_PARAMS.primaryColor.value,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
          }}>{SCENE_PARAMS.introTitle.value}</div>
        </div>

        {/* Transition */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%) translateY(" + (transitionY + floatY) + "px)",
          opacity: transitionOpacity,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: minDim * 0.05,
            fontWeight: 800,
            color: SCENE_PARAMS.primaryColor.value,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
          }}>{SCENE_PARAMS.transitionTitle.value}</div>
        </div>

        {/* Outro */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%) translateY(" + floatY + "px) scale(" + outroScale + ")",
          opacity: outroOpacity,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: minDim * 0.055,
            fontWeight: 800,
            color: SCENE_PARAMS.primaryColor.value,
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
          }}>{SCENE_PARAMS.outroTitle.value}</div>
        </div>

        {/* Baseline */}
        <div style={{
          position: "absolute",
          left: chartLeft,
          top: baselineY,
          width: chartWidth,
          height: 2,
          backgroundColor: SCENE_PARAMS.axisColor.value,
          opacity: baselineOpacity
        }} />

        {/* Gainers Chart */}
        {renderBars(gainers, gainersStart, gainersEnd, false)}

        {/* Losers Chart */}
        {renderBars(losers, losersStart, losersEnd, true)}

        {/* Bottom Titles */}
        <div style={{
          position: "absolute",
          left: "50%",
          bottom: "6%",
          transform: "translateX(-50%) translateY(" + floatY + "px)",
          fontSize: minDim * 0.045,
          fontWeight: 800,
          color: SCENE_PARAMS.primaryColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: phaseOpacity(gainersStart, gainersEnd)
        }}>{SCENE_PARAMS.gainersTitle.value}</div>

        <div style={{
          position: "absolute",
          left: "50%",
          bottom: "6%",
          transform: "translateX(-50%) translateY(" + floatY + "px)",
          fontSize: minDim * 0.045,
          fontWeight: 800,
          color: SCENE_PARAMS.primaryColor.value,
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
          opacity: phaseOpacity(losersStart, losersEnd)
        }}>{SCENE_PARAMS.losersTitle.value}</div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

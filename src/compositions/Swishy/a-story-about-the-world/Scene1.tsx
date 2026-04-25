// Template: a-story-about-the-world
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  scene1Word1: { type: "text", label: "Scene 1 - Line 1", value: "In the" },
  scene1Word2: { type: "text", label: "Scene 1 - Line 2", value: "beginning" },
  scene2Word1: { type: "text", label: "Scene 2 - Word", value: "SILENCE" },
  scene3Words: { type: "text", label: "Scene 3 - Grid Words", value: "then,came,LIGHT" },
  scene4Word: { type: "text", label: "Scene 4 - Single", value: "OCEANS" },
  scene5Word1: { type: "text", label: "Scene 5 - Flash", value: "LIFE" },
  scene5Word2: { type: "text", label: "Scene 5 - Reveal", value: "emerged" },
  scene6Words: { type: "text", label: "Scene 6 - Stack", value: "we,ARRIVED" },
  scene7Word1: { type: "text", label: "Scene 7 - Line 1", value: "and now" },
  scene7Word2: { type: "text", label: "Scene 7 - Line 2", value: "we wonder" },
  headingFont: { type: "font", label: "Heading Font", value: "Playfair Display" },
  bodyFont: { type: "font", label: "Body Font", value: "DM Sans" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  textColor: { type: "color", label: "Text", value: "#1e293b" },
  accentColor: { type: "color", label: "Accent", value: "#64748b" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  
  const scenes = [
    { start: 0, type: "centered-stack" },
    { start: 75, type: "typewriter-center" },
    { start: 150, type: "grid-cascade" },
    { start: 225, type: "giant-reveal" },
    { start: 300, type: "flash-sentence" },
    { start: 375, type: "corner-stack" },
    { start: 450, type: "orbit-text" },
  ];
  
  const sceneDuration = 75;
  
  const getCurrentScene = function() {
    for (var i = scenes.length - 1; i >= 0; i--) {
      if (adjustedFrame >= scenes[i].start) return i;
    }
    return 0;
  };
  
  const currentSceneIndex = getCurrentScene();
  const currentScene = scenes[currentSceneIndex];
  const sceneProgress = adjustedFrame - currentScene.start;
  
  const bgColors = ["#ffffff", "#0f172a", "#fef3c7", "#e0f2fe", "#ffffff", "#fef2f2", "#f8fafc"];
  const bgColor = bgColors[currentSceneIndex] || "#ffffff";
  const isDark = bgColor === "#0f172a";
  const textColor = isDark ? "#f8fafc" : SCENE_PARAMS.textColor.value;
  const fadedColor = isDark ? "#64748b" : SCENE_PARAMS.accentColor.value;
  
  var content = null;
  var graphics = [];
  
  // SCENE 1: Centered stack (original style - small text on top, big below)
  if (currentScene.type === "centered-stack") {
    var word1Progress = spring({ frame: Math.max(0, sceneProgress - 5), fps: fps, config: { damping: 22, stiffness: 85 } });
    var word2Progress = spring({ frame: Math.max(0, sceneProgress - 15), fps: fps, config: { damping: 20, stiffness: 90 } });
    var scale1 = interpolate(word1Progress, [0, 1], [0.8, 1]);
    var scale2 = interpolate(word2Progress, [0, 1], [0.6, 1]);
    
    for (var i = 0; i < 6; i++) {
      var starProgress = spring({ frame: Math.max(0, sceneProgress - 20 - i * 6), fps: fps, config: { damping: 25, stiffness: 80 } });
      var starX = 20 + Math.random() * 60;
      var starY = 15 + Math.random() * 70;
      var twinkle = Math.sin((adjustedFrame + i * 30) * 0.1) * 0.4 + 0.6;
      graphics.push(
        React.createElement("div", {
          key: "star" + i,
          style: { position: "absolute", left: starX + "%", top: starY + "%", width: minDim * 0.008, height: minDim * 0.008, backgroundColor: "#fbbf24", borderRadius: "50%", opacity: starProgress * twinkle * 0.7, transform: "scale(" + starProgress + ")", boxShadow: "0 0 " + (minDim * 0.01) + "px #fbbf24" }
        })
      );
    }
    
    content = React.createElement("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: minDim * 0.045, fontWeight: 400, color: fadedColor, fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui", opacity: word1Progress, transform: "scale(" + scale1 + ")", marginBottom: minDim * 0.01 } }, SCENE_PARAMS.scene1Word1.value),
      React.createElement("div", { style: { fontSize: minDim * 0.12, fontWeight: 700, color: textColor, fontFamily: SCENE_PARAMS.headingFont.value + ", serif", opacity: word2Progress, transform: "scale(" + scale2 + ")" } }, SCENE_PARAMS.scene1Word2.value)
    );
  }
  
  // SCENE 2: Typewriter effect - single word typing out letter by letter, centered
  if (currentScene.type === "typewriter-center") {
    var word = SCENE_PARAMS.scene2Word1.value;
    var charCount = word.length;
    var visibleChars = Math.floor(interpolate(sceneProgress, [10, 10 + charCount * 5], [0, charCount], { extrapolateRight: "clamp" }));
    var displayText = word.substring(0, visibleChars);
    var cursorBlink = Math.sin(adjustedFrame * 0.3) > 0;
    
    for (var j = 0; j < 4; j++) {
      var ringProgress = spring({ frame: Math.max(0, sceneProgress - 25 - j * 10), fps: fps, config: { damping: 30, stiffness: 50 } });
      var ringSize = interpolate(ringProgress, [0, 1], [0, minDim * (0.3 + j * 0.15)]);
      var ringOpacity = interpolate(ringProgress, [0, 1], [0.4, 0.1 - j * 0.02]);
      graphics.push(
        React.createElement("div", {
          key: "ring" + j,
          style: { position: "absolute", left: "50%", top: "50%", width: ringSize, height: ringSize, border: "1px solid #475569", borderRadius: "50%", transform: "translate(-50%, -50%)", opacity: ringOpacity }
        })
      );
    }
    
    content = React.createElement("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: minDim * 0.1, fontWeight: 700, color: "#f8fafc", fontFamily: SCENE_PARAMS.headingFont.value + ", serif", letterSpacing: minDim * 0.015 } }, 
        displayText,
        React.createElement("span", { style: { opacity: cursorBlink ? 1 : 0, marginLeft: 2 } }, "|")
      )
    );
  }
  
  // SCENE 3: Grid cascade - words slide in from different directions in a grid
  if (currentScene.type === "grid-cascade") {
    var gridWords = SCENE_PARAMS.scene3Words.value.split(",");
    var gridContent = [];
    var positions = [
      { x: "20%", y: "30%", fromX: -100, fromY: 0 },
      { x: "50%", y: "45%", fromX: 0, fromY: 100 },
      { x: "75%", y: "60%", fromX: 100, fromY: 0 }
    ];
    
    for (var k = 0; k < 12; k++) {
      var rayProgress = spring({ frame: Math.max(0, sceneProgress - 20 - k * 3), fps: fps, config: { damping: 20, stiffness: 90 } });
      var angle = k * 30;
      var rayLength = interpolate(rayProgress, [0, 1], [0, minDim * 0.35]);
      graphics.push(
        React.createElement("div", {
          key: "ray" + k,
          style: { position: "absolute", left: "50%", top: "50%", width: k % 2 === 0 ? 4 : 2, height: rayLength, background: "linear-gradient(to bottom, #fbbf24, transparent)", opacity: rayProgress * 0.5, transform: "translateX(-50%) rotate(" + angle + "deg)", transformOrigin: "center top" }
        })
      );
    }
    
    for (var g = 0; g < gridWords.length; g++) {
      var gridProgress = spring({ frame: Math.max(0, sceneProgress - 10 - g * 12), fps: fps, config: { damping: 18, stiffness: 100 } });
      var pos = positions[g];
      var slideX = interpolate(gridProgress, [0, 1], [pos.fromX, 0]);
      var slideY = interpolate(gridProgress, [0, 1], [pos.fromY, 0]);
      var isEmphasis = gridWords[g] === gridWords[g].toUpperCase();
      gridContent.push(
        React.createElement("div", {
          key: "grid" + g,
          style: { position: "absolute", left: pos.x, top: pos.y, transform: "translate(-50%, -50%) translate(" + slideX + "px, " + slideY + "px)", fontSize: isEmphasis ? minDim * 0.14 : minDim * 0.05, fontWeight: isEmphasis ? 900 : 500, color: isEmphasis ? "#92400e" : "#78716c", fontFamily: SCENE_PARAMS.headingFont.value + ", serif", opacity: gridProgress }
        }, gridWords[g])
      );
    }
    content = React.createElement("div", { style: { transform: "scale(" + SCENE_PARAMS.scale.value + ")", width: "100%", height: "100%", position: "relative" } }, gridContent);
  }
  
  // SCENE 4: Giant word reveal - huge word slides up from bottom, fills screen
  if (currentScene.type === "giant-reveal") {
    var giantProgress = spring({ frame: Math.max(0, sceneProgress - 5), fps: fps, config: { damping: 25, stiffness: 70 } });
    var giantY = interpolate(giantProgress, [0, 1], [height * 0.6, 0]);
    var giantScale = interpolate(giantProgress, [0, 1], [0.5, 1]);
    
    for (var w = 0; w < 8; w++) {
      var waveProgress = spring({ frame: Math.max(0, sceneProgress - 25 - w * 5), fps: fps, config: { damping: 28, stiffness: 55 } });
      var waveY = height * 0.7 + w * (minDim * 0.02);
      var wavePhase = (adjustedFrame + w * 25) * 0.04;
      var waveOffset = Math.sin(wavePhase) * (minDim * 0.01);
      graphics.push(
        React.createElement("div", {
          key: "wave" + w,
          style: { position: "absolute", left: "-5%", top: waveY + waveOffset, width: "110%", height: 4, background: "linear-gradient(90deg, transparent, #0ea5e9, #06b6d4, #0ea5e9, transparent)", opacity: waveProgress * (0.5 - w * 0.05), borderRadius: 4 }
        })
      );
    }
    
    content = React.createElement("div", { style: { position: "absolute", left: "50%", bottom: "15%", transform: "translateX(-50%) translateY(" + giantY + "px) scale(" + (SCENE_PARAMS.scale.value * giantScale) + ")", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: minDim * 0.22, fontWeight: 900, color: "#0c4a6e", fontFamily: SCENE_PARAMS.headingFont.value + ", serif", letterSpacing: minDim * 0.01, textTransform: "uppercase" } }, SCENE_PARAMS.scene4Word.value)
    );
  }
  
  // SCENE 5: Flash + sentence reveal - word flashes, then sentence fades in below
  if (currentScene.type === "flash-sentence") {
    var flashCount = Math.floor(sceneProgress / 8);
    var flashOn = flashCount < 4 && flashCount % 2 === 0;
    var flashOpacity = flashCount >= 4 ? 1 : (flashOn ? 1 : 0);
    var sentenceProgress = spring({ frame: Math.max(0, sceneProgress - 35), fps: fps, config: { damping: 20, stiffness: 90 } });
    var sentenceY = interpolate(sentenceProgress, [0, 1], [30, 0]);
    
    for (var d = 0; d < 10; d++) {
      var dnaProgress = spring({ frame: Math.max(0, sceneProgress - 20 - d * 4), fps: fps, config: { damping: 22, stiffness: 90 } });
      var dnaY = 15 + d * 8;
      var dnaPhase = (adjustedFrame + d * 20) * 0.06;
      var dnaX1 = 15 + Math.sin(dnaPhase) * 5;
      var dnaX2 = 85 - Math.sin(dnaPhase) * 5;
      graphics.push(
        React.createElement("div", { key: "dna1-" + d, style: { position: "absolute", left: dnaX1 + "%", top: dnaY + "%", width: minDim * 0.015, height: minDim * 0.015, backgroundColor: "#22c55e", borderRadius: "50%", opacity: dnaProgress * 0.6, transform: "scale(" + dnaProgress + ")" } }),
        React.createElement("div", { key: "dna2-" + d, style: { position: "absolute", left: dnaX2 + "%", top: dnaY + "%", width: minDim * 0.015, height: minDim * 0.015, backgroundColor: "#10b981", borderRadius: "50%", opacity: dnaProgress * 0.6, transform: "scale(" + dnaProgress + ")" } })
      );
    }
    
    content = React.createElement("div", { style: { position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: minDim * 0.18, fontWeight: 900, color: textColor, fontFamily: SCENE_PARAMS.headingFont.value + ", serif", opacity: flashOpacity, marginBottom: minDim * 0.03 } }, SCENE_PARAMS.scene5Word1.value),
      React.createElement("div", { style: { fontSize: minDim * 0.06, fontWeight: 400, color: fadedColor, fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui", opacity: sentenceProgress, transform: "translateY(" + sentenceY + "px)" } }, SCENE_PARAMS.scene5Word2.value)
    );
  }
  
  // SCENE 6: Corner stack - words positioned in bottom left, stacked vertically
  if (currentScene.type === "corner-stack") {
    var stackWords = SCENE_PARAMS.scene6Words.value.split(",");
    var stackContent = [];
    
    for (var h = 0; h < 6; h++) {
      var heartProgress = spring({ frame: Math.max(0, sceneProgress - 25 - h * 7), fps: fps, config: { damping: 18, stiffness: 110 } });
      var heartX = 55 + h * 8;
      var heartY = 25 + (h % 3) * 18;
      var heartPulse = 1 + Math.sin((adjustedFrame + h * 20) * 0.12) * 0.15;
      var heartSize = minDim * (0.025 + (h % 2) * 0.01);
      graphics.push(
        React.createElement("div", {
          key: "heart" + h,
          style: { position: "absolute", left: heartX + "%", top: heartY + "%", width: heartSize, height: heartSize, backgroundColor: "#f87171", borderRadius: "50% 50% 0 50%", transform: "rotate(-45deg) scale(" + (heartProgress * heartPulse) + ")", opacity: heartProgress * 0.5 }
        })
      );
    }
    
    for (var s = 0; s < stackWords.length; s++) {
      var stackProgress = spring({ frame: Math.max(0, sceneProgress - 10 - s * 10), fps: fps, config: { damping: 20, stiffness: 95 } });
      var stackX = interpolate(stackProgress, [0, 1], [-50, 0]);
      var isEmphasis2 = stackWords[s] === stackWords[s].toUpperCase();
      stackContent.push(
        React.createElement("div", {
          key: "stack" + s,
          style: { fontSize: isEmphasis2 ? minDim * 0.14 : minDim * 0.05, fontWeight: isEmphasis2 ? 900 : 500, color: isEmphasis2 ? "#991b1b" : "#9f1239", fontFamily: SCENE_PARAMS.headingFont.value + ", serif", opacity: stackProgress, transform: "translateX(" + stackX + "px)", lineHeight: 1.1 }
        }, stackWords[s])
      );
    }
    content = React.createElement("div", { style: { position: "absolute", left: "12%", bottom: "25%", transform: "scale(" + SCENE_PARAMS.scale.value + ")", textAlign: "left" } }, stackContent);
  }
  
  // SCENE 7: Orbit text with questions - text in center, questions orbit around
  if (currentScene.type === "orbit-text") {
    for (var q = 0; q < 8; q++) {
      var qProgress = spring({ frame: Math.max(0, sceneProgress - 20 - q * 6), fps: fps, config: { damping: 22, stiffness: 85 } });
      var qAngle = q * 45 + adjustedFrame * 0.5;
      var qRadius = minDim * 0.3;
      var qX = 50 + Math.cos(qAngle * Math.PI / 180) * (qRadius / width * 100);
      var qY = 50 + Math.sin(qAngle * Math.PI / 180) * (qRadius / height * 100);
      graphics.push(
        React.createElement("div", {
          key: "question" + q,
          style: { position: "absolute", left: qX + "%", top: qY + "%", fontSize: minDim * (0.035 + (q % 3) * 0.01), fontFamily: SCENE_PARAMS.headingFont.value + ", serif", color: "#94a3b8", opacity: qProgress * 0.5, transform: "translate(-50%, -50%)" }
        }, "?")
      );
    }
    
    var orbitProgress = spring({ frame: Math.max(0, sceneProgress - 15), fps: fps, config: { damping: 28, stiffness: 60 } });
    var orbitSize = interpolate(orbitProgress, [0, 1], [0, minDim * 0.55]);
    graphics.push(
      React.createElement("div", {
        key: "orbit",
        style: { position: "absolute", left: "50%", top: "50%", width: orbitSize, height: orbitSize, border: "1px dashed #cbd5e1", borderRadius: "50%", transform: "translate(-50%, -50%) rotate(" + (adjustedFrame * 0.3) + "deg)", opacity: orbitProgress * 0.4 }
      })
    );
    
    var line1Progress = spring({ frame: Math.max(0, sceneProgress - 5), fps: fps, config: { damping: 22, stiffness: 85 } });
    var line2Progress = spring({ frame: Math.max(0, sceneProgress - 18), fps: fps, config: { damping: 20, stiffness: 90 } });
    var line1Y = interpolate(line1Progress, [0, 1], [20, 0]);
    var line2Y = interpolate(line2Progress, [0, 1], [25, 0]);
    
    content = React.createElement("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")", textAlign: "center" } },
      React.createElement("div", { style: { fontSize: minDim * 0.04, fontWeight: 400, color: fadedColor, fontFamily: SCENE_PARAMS.bodyFont.value + ", system-ui", opacity: line1Progress, transform: "translateY(" + line1Y + "px)", marginBottom: minDim * 0.015 } }, SCENE_PARAMS.scene7Word1.value),
      React.createElement("div", { style: { fontSize: minDim * 0.11, fontWeight: 700, color: textColor, fontFamily: SCENE_PARAMS.headingFont.value + ", serif", opacity: line2Progress, transform: "translateY(" + line2Y + "px)", lineHeight: 1.1 } }, SCENE_PARAMS.scene7Word2.value.split(" ").join("\n"))
    );
  }
  
  return React.createElement(AbsoluteFill, { style: { backgroundColor: bgColor, overflow: "hidden" } },
    graphics,
    content,
    React.createElement("div", {
      style: { position: "absolute", bottom: height * 0.06, left: "50%", transform: "translateX(-50%)", display: "flex", gap: minDim * 0.012 }
    },
      scenes.map(function(sc, idx) {
        var dotActive = idx <= currentSceneIndex;
        return React.createElement("div", {
          key: "dot" + idx,
          style: { width: minDim * 0.01, height: minDim * 0.01, borderRadius: "50%", backgroundColor: dotActive ? (isDark ? "#f8fafc" : SCENE_PARAMS.textColor.value) : (isDark ? "#475569" : "#d1d5db"), transform: "scale(" + (dotActive ? 1 : 0.7) + ")", transition: "all 0.3s ease" }
        });
      })
    )
  );
}

export default Scene;

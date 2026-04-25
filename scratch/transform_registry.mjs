// Transforms compositionRegistry.ts:
// 1. Removes all static import { Scene as ... } statements
// 2. Replaces `component: XxxScene,` with React.lazy(() => import(...))
// 3. Inlines defaultProps for SpotifyPlayer, FutureOfDesign, GoodMood

import fs from "fs";

const FILE = "src/compositions/Gallery/compositionRegistry.ts";
let content = fs.readFileSync(FILE, "utf8");

// ── Step 1: Parse import mapping ──────────────────────────────────────────────
// Matches: import { Scene as XxxScene } from "../path/Scene";
// Also:    import { Scene as XxxScene, otherExport } from "../path/Scene";
const importMap = {};
const importRegex = /import \{ Scene as (\w+)(?:,\s*[^}]+)? \} from "([^"]+)";/g;
let match;
while ((match = importRegex.exec(content)) !== null) {
  importMap[match[1]] = match[2];
}

console.log(`Found ${Object.keys(importMap).length} Scene imports to transform`);

// ── Step 2: Remove all import lines, keep only React ─────────────────────────
const lines = content.split("\n");
const firstNonImportLine = lines.findIndex(
  (line, i) => i > 0 && !line.startsWith("import ") && line.trim() !== ""
);

let newContent = 'import React from "react";\n';
newContent += "\n" + lines.slice(firstNonImportLine).join("\n");

// ── Step 3: Replace component references with React.lazy ─────────────────────
for (const [sceneName, importPath] of Object.entries(importMap)) {
  const pattern = `component: ${sceneName},`;
  const replacement = `component: React.lazy(() => import("${importPath}").then(m => ({ default: m.Scene }))),`;
  newContent = newContent.replaceAll(pattern, replacement);
}

// ── Step 4: Inline defaultProps for the 3 non-Swishy compositions ────────────
// Replace imported defaultProps references with inline objects

newContent = newContent.replace(
  "defaultProps: defaultSpotifyPlayerProps as unknown as Record<string, unknown>,",
  `defaultProps: {
      trackTitle: "You've Got The Love (Jamie xx Rework feat. The xx)",
      artistName: "Florence + The Machine, The xx, Jamie xx",
      totalDuration: "5:42",
      vinylLabel: "https://picsum.photos/seed/vinyl/800/800",
      fontFamily: "JetBrains Mono",
      backgroundColor: "#121212",
      textColor: "#FFFFFF",
      secondaryTextColor: "#B3B3B3",
      accentColor: "#1DB954",
      progressBarColor: "#FFFFFF",
      progressTrackColor: "#4D4D4D",
      vinylColor: "#1A1A1A",
      scale: 1,
      animationSpeed: 1,
      rotationSpeed: 0.4,
      marqueeSpeed: 0.8,
      progressDuration: 300,
      showShuffleActive: true,
      showRepeatActive: false,
    },`
);

newContent = newContent.replace(
  "defaultProps: defaultFutureOfDesignProps as unknown as Record<string, unknown>,",
  `defaultProps: {
      smallText: "the",
      mainText: "future",
      subText: "of design",
      textColor: "#FFFFFF",
      glowColor: "#FFFFFF",
      backgroundColor: "#0f172a",
      scale: 1.45,
      animationSpeed: 0.6,
      blurAmount: 30,
      slideDistance: 400,
      glowIntensity: 6,
      letterSpacing: -2,
    },`
);

newContent = newContent.replace(
  "defaultProps: defaultGoodMoodProps as unknown as Record<string, unknown>,",
  `defaultProps: {
      scale: 0.9,
      colorO1: "#006eff",
      colorO2: "#ff1d1d",
      colorM: "#ffbd14",
      colorD: "#ff7fa1",
      topRowColor: "#ffffff",
      backgroundColor: "#000000",
      animationSpeed: 0.8,
      stretchIntensity: 0.28,
      fontFamily: "Bebas Neue, Impact, sans-serif",
    },`
);

// ── Step 5: Write the result ─────────────────────────────────────────────────
fs.writeFileSync(FILE, newContent);
console.log("✅ Registry transformed successfully");
console.log(`   - Removed ${Object.keys(importMap).length} static imports`);
console.log("   - Replaced with React.lazy() dynamic imports");
console.log("   - Inlined defaultProps for SpotifyPlayer, FutureOfDesign, GoodMood");

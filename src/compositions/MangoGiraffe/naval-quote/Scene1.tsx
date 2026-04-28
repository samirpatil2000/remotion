// Template: naval-quote
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  displayName: { type: "text", label: "Display Name", value: "Navl" },
  username: { type: "text", label: "Username", value: "@naval" },
  tweetLine1: { type: "text", label: "Tweet Line 1", value: "AI is the great automator, and to" },
  tweetLine2: { type: "text", label: "Tweet Line 2", value: "automate, it must first" },
  tweetLine3: { type: "text", label: "Tweet Line 3", value: "imitate." },
  tweetLine4: { type: "text", label: "Tweet Line 4", value: "The imitation fools" },
  tweetLine5: { type: "text", label: "Tweet Line 5", value: "people into" },
  highlightWord: { type: "text", label: "Highlight Word", value: "thinking" },
  avatarUrl: { type: "image", label: "Avatar", value: "" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f5" },
  cardBackground: { type: "color", label: "Card Background", value: "#ffffff" },
  textColor: { type: "color", label: "Text Color", value: "#0f1419" },
  usernameColor: { type: "color", label: "Username Color", value: "#536471" },
  verifiedColor: { type: "color", label: "Verified Badge", value: "#1d9bf0" },
  highlightColor: { type: "color", label: "Highlight Color", value: "#1d9bf0" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);

  // Card entrance animation
  const cardProgress = spring({ frame: adjustedFrame, fps, config: { damping: 22, stiffness: 85 } });
  const cardScale = interpolate(cardProgress, [0, 1], [0.92, 1]);
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);

  // Avatar entrance
  const avatarProgress = spring({ frame: Math.max(0, adjustedFrame - 8), fps, config: { damping: 20, stiffness: 90 } });
  const avatarScale = interpolate(avatarProgress, [0, 1], [0.8, 1]);

  // Name and username entrance
  const nameProgress = spring({ frame: Math.max(0, adjustedFrame - 12), fps, config: { damping: 20, stiffness: 90 } });
  const nameY = interpolate(nameProgress, [0, 1], [10, 0]);

  // Tweet text lines entrance with stagger
  const lines = [
    (props.tweetLine1 ?? SCENE_PARAMS.tweetLine1.value),
    (props.tweetLine2 ?? SCENE_PARAMS.tweetLine2.value),
    (props.tweetLine3 ?? SCENE_PARAMS.tweetLine3.value),
    "",
    (props.tweetLine4 ?? SCENE_PARAMS.tweetLine4.value),
    (props.tweetLine5 ?? SCENE_PARAMS.tweetLine5.value),
  ];

  const getLineProgress = (index) => {
    const delay = 20 + index * 6;
    return spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
  };

  // Highlight word animation (appears last with emphasis)
  const highlightDelay = 20 + 6 * 6;
  const highlightProgress = spring({ frame: Math.max(0, adjustedFrame - highlightDelay), fps, config: { damping: 18, stiffness: 100 } });

  // Card dimensions
  const cardWidth = minDim * 0.85;
  const cardPadding = minDim * 0.06;
  const avatarSize = minDim * 0.12;

  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) * cardScale + ")",
        opacity: cardOpacity,
        transformOrigin: "center center",
      }}>
        {/* Tweet Card */}
        <div style={{
          backgroundColor: (props.cardBackground ?? SCENE_PARAMS.cardBackground.value),
          borderRadius: minDim * 0.04,
          padding: cardPadding,
          width: cardWidth,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          {/* Header with avatar and name */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: minDim * 0.04 }}>
            {/* Avatar */}
            <div style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              backgroundColor: "#e8e8e8",
              overflow: "hidden",
              transform: "scale(" + avatarScale + ")",
              opacity: avatarProgress,
              marginRight: minDim * 0.03,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {/* Sketch-style avatar placeholder */}
              <svg width={avatarSize * 0.7} height={avatarSize * 0.7} viewBox="0 0 50 50">
                <ellipse cx="25" cy="18" rx="12" ry="14" fill="none" stroke="#999" strokeWidth="1.5"/>
                <line x1="18" y1="22" x2="18" y2="24" stroke="#999" strokeWidth="1"/>
                <line x1="32" y1="22" x2="32" y2="24" stroke="#999" strokeWidth="1"/>
                <line x1="25" y1="28" x2="25" y2="32" stroke="#999" strokeWidth="1"/>
                <line x1="20" y1="36" x2="30" y2="36" stroke="#999" strokeWidth="1"/>
                <line x1="25" y1="32" x2="25" y2="45" stroke="#999" strokeWidth="1"/>
                <line x1="15" y1="20" x2="25" y2="10" stroke="#999" strokeWidth="1"/>
                <line x1="35" y1="20" x2="25" y2="10" stroke="#999" strokeWidth="1"/>
              </svg>
            </div>
            
            {/* Name and username */}
            <div style={{
              opacity: nameProgress,
              transform: "translateY(" + nameY + "px)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: minDim * 0.015 }}>
                <span style={{
                  fontSize: minDim * 0.042,
                  fontWeight: 700,
                  color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                }}>
                  {(props.displayName ?? SCENE_PARAMS.displayName.value)}
                </span>
                {/* Verified badge */}
                <svg width={minDim * 0.045} height={minDim * 0.045} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill={(props.verifiedColor ?? SCENE_PARAMS.verifiedColor.value)}/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontSize: minDim * 0.036,
                color: (props.usernameColor ?? SCENE_PARAMS.usernameColor.value),
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              }}>
                {(props.username ?? SCENE_PARAMS.username.value)}
              </div>
            </div>
          </div>

          {/* Tweet content */}
          <div style={{
            fontSize: minDim * 0.058,
            color: (props.textColor ?? SCENE_PARAMS.textColor.value),
            fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
            lineHeight: 1.35,
            fontWeight: 400,
          }}>
            {lines.map((line, i) => {
              if (line === "") {
                return <div key={i} style={{ height: minDim * 0.04 }} />;
              }
              const progress = getLineProgress(i);
              const slideY = interpolate(progress, [0, 1], [15, 0]);
              return (
                <div key={i} style={{
                  opacity: progress,
                  transform: "translateY(" + slideY + "px)",
                }}>
                  {line}
                </div>
              );
            })}
            {/* Last line with highlight word */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{
                opacity: highlightProgress,
                transform: "translateY(" + interpolate(highlightProgress, [0, 1], [15, 0]) + "px)",
                color: (props.highlightColor ?? SCENE_PARAMS.highlightColor.value),
                background: "linear-gradient(90deg, " + (props.highlightColor ?? SCENE_PARAMS.highlightColor.value) + "22 0%, " + (props.highlightColor ?? SCENE_PARAMS.highlightColor.value) + "11 100%)",
                paddingLeft: minDim * 0.01,
                paddingRight: minDim * 0.01,
                borderRadius: minDim * 0.008,
              }}>
                {(props.highlightWord ?? SCENE_PARAMS.highlightWord.value)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

// Template: animated-app-list
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Profile Image
  profileImage: { type: "image", label: "Profile Image", value: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  profileSize: { type: "number", label: "Profile Size", value: 0.15, min: 0.08, max: 0.25, step: 0.01 },
  profileBorderWidth: { type: "number", label: "Border Width", value: 4, min: 0, max: 10, step: 1 },
  profileBorderColor: { type: "color", label: "Profile Border", value: "#ffffff" },
  
  // Card Content
  card1Title: { type: "text", label: "Card 1 Title", value: "Messages" },
  card1Subtitle: { type: "text", label: "Card 1 Subtitle", value: "3 new conversations" },
  card2Title: { type: "text", label: "Card 2 Title", value: "Calendar" },
  card2Subtitle: { type: "text", label: "Card 2 Subtitle", value: "2 upcoming events" },
  card3Title: { type: "text", label: "Card 3 Title", value: "Photos" },
  card3Subtitle: { type: "text", label: "Card 3 Subtitle", value: "128 memories" },
  card4Title: { type: "text", label: "Card 4 Title", value: "Music" },
  card4Subtitle: { type: "text", label: "Card 4 Subtitle", value: "Now playing" },
  card5Title: { type: "text", label: "Card 5 Title", value: "Fitness" },
  card5Subtitle: { type: "text", label: "Card 5 Subtitle", value: "Goal: 10,000 steps" },
  card6Title: { type: "text", label: "Card 6 Title", value: "Weather" },
  card6Subtitle: { type: "text", label: "Card 6 Subtitle", value: "Sunny, 72°F" },
  
  // Typography
  fontFamily: { type: "font", label: "Font", value: "Open Sans" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  cardBackground: { type: "color", label: "Card Background", value: "#ffffff" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  titleColor: { type: "color", label: "Title Color", value: "#0f172a" },
  subtitleColor: { type: "color", label: "Subtitle Color", value: "#64748b" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 80, min: 30, max: 150, step: 10 },
  scrollAmount: { type: "number", label: "Scroll Amount", value: 120, min: 50, max: 200, step: 10 },
  
  // Style
  borderRadius: { type: "number", label: "Card Radius", value: 16, min: 0, max: 30, step: 2 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.08, min: 0, max: 0.3, step: 0.02 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const stagger = SCENE_PARAMS.staggerDelay.value;
  const entranceOffset = SCENE_PARAMS.entranceOffset.value;
  const scrollAmount = SCENE_PARAMS.scrollAmount.value;
  const scaleValue = SCENE_PARAMS.scale.value;
  
  const isPortrait = height > width;
  const phoneWidth = isPortrait ? width * 0.85 : width * 0.35;
  const phoneHeight = isPortrait ? height * 0.8 : height * 0.9;
  
  const profileSize = minDim * SCENE_PARAMS.profileSize.value;
  
  const cards = [
    { icon: "💬", title: SCENE_PARAMS.card1Title.value, subtitle: SCENE_PARAMS.card1Subtitle.value, color: "#3b82f6" },
    { icon: "📅", title: SCENE_PARAMS.card2Title.value, subtitle: SCENE_PARAMS.card2Subtitle.value, color: "#ef4444" },
    { icon: "📷", title: SCENE_PARAMS.card3Title.value, subtitle: SCENE_PARAMS.card3Subtitle.value, color: "#f59e0b" },
    { icon: "🎵", title: SCENE_PARAMS.card4Title.value, subtitle: SCENE_PARAMS.card4Subtitle.value, color: "#ec4899" },
    { icon: "🏃", title: SCENE_PARAMS.card5Title.value, subtitle: SCENE_PARAMS.card5Subtitle.value, color: "#10b981" },
    { icon: "☀️", title: SCENE_PARAMS.card6Title.value, subtitle: SCENE_PARAMS.card6Subtitle.value, color: "#8b5cf6" },
  ];
  
  const cardHeight = minDim * 0.12;
  const cardGap = minDim * 0.02;
  const paddingHorizontal = minDim * 0.04;
  
  // Phone entrance animation
  const phoneEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 22, stiffness: 80 }
  });
  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.9, 1]);
  const phoneOpacity = interpolate(phoneEntrance, [0, 1], [0, 1]);
  
  // Profile image entrance animation
  const profileDelay = 10;
  const profileEntrance = spring({
    frame: Math.max(0, adjustedFrame - profileDelay),
    fps,
    config: { damping: 18, stiffness: 100 }
  });
  const profileScale = interpolate(profileEntrance, [0, 1], [0.5, 1]);
  const profileOpacity = interpolate(profileEntrance, [0, 1], [0, 1]);
  const profileY = interpolate(profileEntrance, [0, 1], [-20, 0]);
  
  // Scroll animation starts after all cards have appeared
  const scrollStartFrame = 15 + (cards.length * stagger) + 25;
  const scrollProgress = spring({
    frame: Math.max(0, adjustedFrame - scrollStartFrame),
    fps,
    config: { damping: 25, stiffness: 60 }
  });
  const scrollY = interpolate(scrollProgress, [0, 1], [0, -scrollAmount]);
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + scaleValue + ")",
        transformOrigin: "center center",
      }}>
        {/* Phone Frame */}
        <div style={{
          width: phoneWidth,
          height: phoneHeight,
          backgroundColor: SCENE_PARAMS.cardBackground.value,
          borderRadius: minDim * 0.06,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          transform: "scale(" + phoneScale + ")",
          opacity: phoneOpacity,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}>
          {/* Status Bar */}
          <div style={{
            height: minDim * 0.06,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 " + paddingHorizontal + "px",
          }}>
            <span style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.025,
              fontWeight: 600,
              color: SCENE_PARAMS.titleColor.value,
            }}>9:41</span>
            <div style={{
              display: "flex",
              gap: minDim * 0.015,
              alignItems: "center",
            }}>
              <div style={{ width: minDim * 0.035, height: minDim * 0.02, backgroundColor: SCENE_PARAMS.titleColor.value, borderRadius: 2 }} />
              <div style={{ width: minDim * 0.015, height: minDim * 0.015, backgroundColor: SCENE_PARAMS.titleColor.value, borderRadius: "50%" }} />
            </div>
          </div>
          
          {/* Profile Image - Top Middle */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: minDim * 0.02,
            paddingBottom: minDim * 0.02,
          }}>
            <div style={{
              width: profileSize,
              height: profileSize,
              borderRadius: "50%",
              border: SCENE_PARAMS.profileBorderWidth.value + "px solid " + SCENE_PARAMS.profileBorderColor.value,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              transform: "scale(" + profileScale + ") translateY(" + profileY + "px)",
              opacity: profileOpacity,
            }}>
              <Img
                src={SCENE_PARAMS.profileImage.value}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          
          {/* Header */}
          <div style={{
            padding: paddingHorizontal,
            paddingTop: minDim * 0.01,
            paddingBottom: minDim * 0.02,
          }}>
            <h1 style={{
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.055,
              fontWeight: 700,
              color: SCENE_PARAMS.titleColor.value,
              margin: 0,
            }}>Apps</h1>
          </div>
          
          {/* Scrollable Card List */}
          <div style={{
            flex: 1,
            overflow: "hidden",
            padding: "0 " + paddingHorizontal + "px",
          }}>
            <div style={{
              transform: "translateY(" + scrollY + "px)",
              display: "flex",
              flexDirection: "column",
              gap: cardGap,
            }}>
              {cards.map((card, i) => {
                const cardDelay = 20 + (i * stagger);
                const cardProgress = spring({
                  frame: Math.max(0, adjustedFrame - cardDelay),
                  fps,
                  config: { damping: 20, stiffness: 90 }
                });
                const cardY = interpolate(cardProgress, [0, 1], [entranceOffset, 0]);
                const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
                
                return (
                  <div
                    key={i}
                    style={{
                      height: cardHeight,
                      backgroundColor: SCENE_PARAMS.cardBackground.value,
                      borderRadius: SCENE_PARAMS.borderRadius.value,
                      boxShadow: "0 4px 15px rgba(0, 0, 0, " + SCENE_PARAMS.shadowIntensity.value + "), 0 1px 3px rgba(0, 0, 0, 0.04)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 " + (minDim * 0.03) + "px",
                      gap: minDim * 0.025,
                      transform: "translateY(" + cardY + "px)",
                      opacity: cardOpacity,
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {/* Icon Container */}
                    <div style={{
                      width: minDim * 0.08,
                      height: minDim * 0.08,
                      borderRadius: minDim * 0.02,
                      backgroundColor: card.color + "15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: minDim * 0.04,
                      flexShrink: 0,
                    }}>
                      {card.icon}
                    </div>
                    
                    {/* Text Content */}
                    <div style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: minDim * 0.005,
                    }}>
                      <span style={{
                        fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                        fontSize: minDim * 0.032,
                        fontWeight: 600,
                        color: SCENE_PARAMS.titleColor.value,
                      }}>{card.title}</span>
                      <span style={{
                        fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                        fontSize: minDim * 0.024,
                        fontWeight: 400,
                        color: SCENE_PARAMS.subtitleColor.value,
                      }}>{card.subtitle}</span>
                    </div>
                    
                    {/* Arrow */}
                    <div style={{
                      width: minDim * 0.015,
                      height: minDim * 0.015,
                      borderRight: "2px solid " + SCENE_PARAMS.subtitleColor.value,
                      borderBottom: "2px solid " + SCENE_PARAMS.subtitleColor.value,
                      transform: "rotate(-45deg)",
                      opacity: 0.5,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom Nav Bar */}
          <div style={{
            height: minDim * 0.1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: minDim * 0.02,
          }}>
            <div style={{
              width: minDim * 0.2,
              height: minDim * 0.008,
              backgroundColor: SCENE_PARAMS.titleColor.value,
              borderRadius: minDim * 0.004,
              opacity: 0.2,
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

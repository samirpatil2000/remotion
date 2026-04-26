// Template: app-video-showcase
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#ebebeb" },
  cardColor1: { type: "color", label: "Card 1 Color", value: "#1a1a1a" },
  cardColor2: { type: "color", label: "Card 2 Color", value: "#0a0a0a" },
  cardColor3: { type: "color", label: "Card 3 Color", value: "#ffffff" },
  cardColor4: { type: "color", label: "Card 4 Color", value: "#0f0f0f" },
  cardColor5: { type: "color", label: "Card 5 Color", value: "#000000" },
  accentLine: { type: "color", label: "Accent Line", value: "#8b5cf6" },
  scale: { type: "number", label: "Scale", value: 0.5, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.7, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 9, min: 2, max: 15, step: 1 },
  fanSpread: { type: "number", label: "Fan Spread", value: 7, min: 5, max: 25, step: 1 },
  cardOverlap: { type: "number", label: "Card Overlap", value: 0.5, min: 0.4, max: 0.85, step: 0.05 },
  showAccentLine: { type: "boolean", label: "Show Accent Line", value: false },
  video1: { type: "video", label: "Video 1", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/the_future_of_design_copy_1_.mp4" },
  video2: { type: "video", label: "Video 2", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo1.mp4" },
  video3: { type: "video", label: "Video 3", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo3.mp4" },
  video4: { type: "video", label: "Video 4", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo4.mp4" },
  video5: { type: "video", label: "Video 5", value: "blob:https://www.swishy.ai/99c2d426-33e8-4adb-af77-7a86c02b062a" },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const stagger = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  const fanSpread = (props.fanSpread ?? SCENE_PARAMS.fanSpread.value);
  const cardOverlap = (props.cardOverlap ?? SCENE_PARAMS.cardOverlap.value);
  
  const isPortrait = height > width;
  
  const cardHeight = isPortrait ? height * 0.55 : height * 0.7;
  const cardWidth = cardHeight * 0.56;
  const cardRadius = cardWidth * 0.06;
  
  const cards = [
    { color: (props.cardColor1 ?? SCENE_PARAMS.cardColor1.value), rotation: -fanSpread * 2, video: (props.video1 ?? SCENE_PARAMS.video1.value), content: "abstract" },
    { color: (props.cardColor2 ?? SCENE_PARAMS.cardColor2.value), rotation: -fanSpread, video: (props.video2 ?? SCENE_PARAMS.video2.value), content: "3d" },
    { color: (props.cardColor3 ?? SCENE_PARAMS.cardColor3.value), rotation: 0, video: (props.video3 ?? SCENE_PARAMS.video3.value), content: "portrait" },
    { color: (props.cardColor4 ?? SCENE_PARAMS.cardColor4.value), rotation: fanSpread, video: (props.video4 ?? SCENE_PARAMS.video4.value), content: "typo" },
    { color: (props.cardColor5 ?? SCENE_PARAMS.cardColor5.value), rotation: fanSpread * 2, video: (props.video5 ?? SCENE_PARAMS.video5.value), content: "logo" },
  ];
  
  const totalCardsWidth = cardWidth + (cards.length - 1) * cardWidth * cardOverlap;
  const startX = (width - totalCardsWidth) / 2;
  
  const lineProgress = interpolate(adjustedFrame, [50, 80], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
        transformOrigin: "center center",
        position: "relative",
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {cards.map((card, i) => {
          const delay = i * stagger;
          const entrance = spring({
            frame: Math.max(0, adjustedFrame - delay),
            fps,
            config: { damping: 22, stiffness: 85 },
          });
          
          const yOffset = interpolate(entrance, [0, 1], [height * 0.6, 0]);
          const rotationOffset = interpolate(entrance, [0, 1], [15, 0]);
          const opacityVal = interpolate(entrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
          
          const xPos = startX + i * cardWidth * cardOverlap + cardWidth / 2;
          const finalRotation = card.rotation + rotationOffset;
          
          const hoverFloat = Math.sin((adjustedFrame + i * 10) * 0.05) * 3;
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: xPos,
                top: "50%",
                width: cardWidth,
                height: cardHeight,
                backgroundColor: card.color,
                borderRadius: cardRadius,
                transform: "translate(-50%, -50%) translateY(" + (yOffset + hoverFloat) + "px) rotate(" + finalRotation + "deg)",
                opacity: opacityVal,
                boxShadow: "0 25px 60px rgba(0,0,0,0.35), 0 10px 20px rgba(0,0,0,0.2)",
                overflow: "hidden",
                zIndex: i,
              }}
            >
              {card.video ? (
                <Loop durationInFrames={fps * 10}>
                  <OffthreadVideo
                    src={card.video}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    muted
                  />
                </Loop>
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}>
                  {card.content === "abstract" && (
                    <div style={{
                      width: "70%",
                      height: "70%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <div style={{
                        width: cardWidth * 0.5,
                        height: cardWidth * 0.5,
                        borderRadius: "50%",
                        border: "2px solid #333",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                        <span style={{
                          color: "#444",
                          fontSize: cardWidth * 0.08,
                          fontWeight: 600,
                          letterSpacing: cardWidth * 0.02,
                          fontFamily: "system-ui, sans-serif",
                        }}>OSDI</span>
                      </div>
                    </div>
                  )}
                  {card.content === "3d" && (
                    <div style={{
                      width: "80%",
                      height: "80%",
                      background: "radial-gradient(ellipse at 30% 30%, #333 0%, #0a0a0a 60%)",
                      borderRadius: "40% 60% 50% 50%",
                      transform: "rotate(-15deg)",
                    }} />
                  )}
                  {card.content === "portrait" && (
                    <div style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(180deg, #e5e5e5 0%, #d4d4d4 50%, #a3a3a3 100%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}>
                      <div style={{
                        width: "60%",
                        height: "75%",
                        background: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 100%)",
                        borderRadius: "50% 50% 0 0",
                        marginBottom: "-5%",
                      }} />
                    </div>
                  )}
                  {card.content === "typo" && (
                    <div style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: cardWidth * 0.1,
                      boxSizing: "border-box",
                    }}>
                      <span style={{
                        color: "#fff",
                        fontSize: cardWidth * 0.15,
                        fontWeight: 800,
                        lineHeight: 1,
                        fontFamily: "system-ui, sans-serif",
                      }}>BOLD</span>
                      <span style={{
                        color: "#fff",
                        fontSize: cardWidth * 0.15,
                        fontWeight: 800,
                        lineHeight: 1,
                        fontFamily: "system-ui, sans-serif",
                      }}>TYPE</span>
                    </div>
                  )}
                  {card.content === "logo" && (
                    <div style={{
                      width: "60%",
                      height: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <svg viewBox="0 0 100 35" style={{ width: "100%", height: "100%" }}>
                        <path
                          d="M10 30 Q30 0 50 15 Q70 30 90 5"
                          stroke="#fff"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {(props.showAccentLine ?? SCENE_PARAMS.showAccentLine.value) && (
          <div style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            width: (90 * lineProgress) + "%",
            height: 4,
            backgroundColor: (props.accentLine ?? SCENE_PARAMS.accentLine.value),
            transform: "translateY(-50%)",
            zIndex: 10,
            opacity: lineProgress,
          }} />
        )}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

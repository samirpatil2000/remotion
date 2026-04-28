// Template: instagram-story-3-images
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  image1: { type: "image", label: "Image 1", value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  image2: { type: "image", label: "Image 2", value: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80" },
  image3: { type: "image", label: "Image 3", value: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  cardColor: { type: "color", label: "Card Color", value: "#ffffff" },
  shadowColor: { type: "color", label: "Shadow Color", value: "#64748b" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 15, min: 5, max: 30, step: 1 },
  cardBorderRadius: { type: "number", label: "Card Radius", value: 16, min: 0, max: 40, step: 2 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.15, min: 0, max: 0.5, step: 0.05 },
  cardSpacing: { type: "number", label: "Card Spacing", value: 24, min: 10, max: 50, step: 2 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const stagger = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  
  const cardWidth = width * 0.85;
  const cardHeight = height * 0.22;
  const spacing = (props.cardSpacing ?? SCENE_PARAMS.cardSpacing.value);
  const totalCardsHeight = (cardHeight * 3) + (spacing * 2);
  const startY = (height - totalCardsHeight) / 2;
  
  const slideDistance = width * 1.2;
  
  const cards = [
    { image: (props.image1 ?? SCENE_PARAMS.image1.value), fromLeft: true, delay: 0 },
    { image: (props.image2 ?? SCENE_PARAMS.image2.value), fromLeft: false, delay: stagger },
    { image: (props.image3 ?? SCENE_PARAMS.image3.value), fromLeft: true, delay: stagger * 2 },
  ];
  
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
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        {cards.map((card, index) => {
          const cardFrame = Math.max(0, adjustedFrame - card.delay);
          const progress = spring({ 
            frame: cardFrame, 
            fps, 
            config: { damping: 22, stiffness: 85 } 
          });
          
          const startX = card.fromLeft ? -slideDistance : slideDistance;
          const translateX = interpolate(progress, [0, 1], [startX, 0]);
          const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 1]);
          
          const cardY = startY + (index * (cardHeight + spacing));
          const shadowOpacity = (props.shadowIntensity ?? SCENE_PARAMS.shadowIntensity.value) * progress;
          
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: (width - cardWidth) / 2,
                top: cardY,
                width: cardWidth,
                height: cardHeight,
                borderRadius: (props.cardBorderRadius ?? SCENE_PARAMS.cardBorderRadius.value),
                backgroundColor: (props.cardColor ?? SCENE_PARAMS.cardColor.value),
                overflow: "hidden",
                transform: "translateX(" + translateX + "px)",
                opacity: opacity,
                boxShadow: "0 " + (8 * progress) + "px " + (32 * progress) + "px -8px rgba(" + 
                  parseInt((props.shadowColor ?? SCENE_PARAMS.shadowColor.value).slice(1, 3), 16) + ", " +
                  parseInt((props.shadowColor ?? SCENE_PARAMS.shadowColor.value).slice(3, 5), 16) + ", " +
                  parseInt((props.shadowColor ?? SCENE_PARAMS.shadowColor.value).slice(5, 7), 16) + ", " +
                  shadowOpacity + ")",
              }}
            >
              <Img
                src={card.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

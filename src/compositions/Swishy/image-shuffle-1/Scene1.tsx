// Template: image-shuffle-1
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  image1: { type: "image", label: "Card 1", value: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" },
  image2: { type: "image", label: "Card 2", value: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" },
  image3: { type: "image", label: "Card 3", value: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800" },
  image4: { type: "image", label: "Card 4", value: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800" },
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f5" },
  shadowColor: { type: "color", label: "Shadow Color", value: "#e3e3e3" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  cardSpacing: { type: "number", label: "Card Spacing", value: 8, min: 2, max: 20, step: 1 },
  borderRadius: { type: "number", label: "Border Radius", value: 28, min: 0, max: 60, step: 2 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const images = [
    (props.image1 ?? SCENE_PARAMS.image1.value),
    (props.image2 ?? SCENE_PARAMS.image2.value),
    (props.image3 ?? SCENE_PARAMS.image3.value),
    (props.image4 ?? SCENE_PARAMS.image4.value),
  ];
  
  const cardWidth = minDim * 0.65;
  const cardHeight = cardWidth * 1.2;
  const spacing = (props.cardSpacing ?? SCENE_PARAMS.cardSpacing.value);
  const borderRadius = (props.borderRadius ?? SCENE_PARAMS.borderRadius.value);
  
  // Animation timing
  const entranceEnd = 35;
  const holdAfterEntrance = 20;
  const exitStart = entranceEnd + holdAfterEntrance;
  const exitDuration = 25;
  const holdBetweenExits = 15;
  
  const renderCards = () => {
    const cards = [];
    
    for (let i = 3; i >= 0; i--) {
      const stackOffset = i * spacing;
      let zIndex = 4 - i;
      
      // Entrance animation - cards slide in from bottom with rotation
      const entranceDelay = (3 - i) * 5;
      const cardEntrance = spring({
        frame: Math.max(0, adjustedFrame - entranceDelay),
        fps,
        config: { damping: 20, stiffness: 90 }
      });
      
      const entranceY = interpolate(cardEntrance, [0, 1], [height * 0.6, 0]);
      const entranceOpacity = cardEntrance;
      const entranceRotate = interpolate(cardEntrance, [0, 1], [-20, 0]);
      
      // Exit animation - cards exit out the top in reverse order (top card first)
      const exitDelay = exitStart + i * (exitDuration + holdBetweenExits);
      const exitFrame = Math.max(0, adjustedFrame - exitDelay);
      
      let exitY = 0;
      let exitRotate = 0;
      let exitOpacity = 1;
      let exitScale = 1;
      
      if (adjustedFrame >= exitDelay) {
        const exitProgress = spring({
          frame: exitFrame,
          fps,
          config: { damping: 18, stiffness: 85 }
        });
        
        // Mirror the entrance animation - exit to top with rotation
        exitY = interpolate(exitProgress, [0, 1], [0, -height * 0.7]);
        exitRotate = interpolate(exitProgress, [0, 1], [0, 20]);
        exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], { extrapolateRight: "clamp" });
        exitScale = interpolate(exitProgress, [0, 1], [1, 0.95], { extrapolateRight: "clamp" });
      }
      
      // Combine entrance and exit transforms
      const totalY = stackOffset + entranceY + exitY;
      const totalRotate = entranceRotate + exitRotate;
      const totalOpacity = entranceOpacity * exitOpacity;
      
      cards.push(
        <div
          key={i}
          style={{
            position: "absolute",
            width: cardWidth,
            height: cardHeight,
            borderRadius: borderRadius,
            overflow: "hidden",
            boxShadow: "0 10px 30px " + (props.shadowColor ?? SCENE_PARAMS.shadowColor.value),
            transform: "translateY(" + totalY + "px) rotate(" + totalRotate + "deg) scale(" + exitScale + ")",
            opacity: totalOpacity,
            zIndex: zIndex,
          }}
        >
          <Img
            src={images[i]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: borderRadius,
            }}
          />
        </div>
      );
    }
    
    return cards;
  };
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
          transformOrigin: "center center",
          position: "relative",
          width: cardWidth,
          height: cardHeight + 3 * spacing * 2,
        }}
      >
        {renderCards()}
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

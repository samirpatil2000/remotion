// Template: photos-animation
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  photo1: { type: "image", label: "Photo 1", value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  photo2: { type: "image", label: "Photo 2", value: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop" },
  photo3: { type: "image", label: "Photo 3", value: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop" },
  photo4: { type: "image", label: "Photo 4", value: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop" },
  photo5: { type: "image", label: "Photo 5", value: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop" },
  backgroundColor: { type: "color", label: "Background", value: "#f8fafc" },
  shadowColor: { type: "color", label: "Shadow Color", value: "rgba(15, 23, 42, 0.15)" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 12, min: 5, max: 25, step: 1 },
  photoSize: { type: "number", label: "Photo Size", value: 0.15, min: 0.1, max: 0.3, step: 0.01 },
  photoGap: { type: "number", label: "Photo Gap", value: 0.02, min: 0.01, max: 0.05, step: 0.005 },
  borderRadius: { type: "number", label: "Border Radius", value: 12, min: 0, max: 30, step: 2 },
  shadowIntensity: { type: "number", label: "Shadow Intensity", value: 0.15, min: 0, max: 0.4, step: 0.05 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const stagger = SCENE_PARAMS.staggerDelay.value;
  
  const photos = [
    SCENE_PARAMS.photo1.value,
    SCENE_PARAMS.photo2.value,
    SCENE_PARAMS.photo3.value,
    SCENE_PARAMS.photo4.value,
    SCENE_PARAMS.photo5.value,
  ];
  
  const photoSize = minDim * SCENE_PARAMS.photoSize.value;
  const gap = minDim * SCENE_PARAMS.photoGap.value;
  const totalWidth = (photoSize * photos.length) + (gap * (photos.length - 1));
  const startX = (width - totalWidth) / 2;
  
  const scaleValue = SCENE_PARAMS.scale.value;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{ 
        transform: "scale(" + scaleValue + ")", 
        transformOrigin: "center center",
        position: "relative",
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {photos.map((photoUrl, i) => {
          const delay = 15 + (i * stagger);
          const progress = spring({
            frame: Math.max(0, adjustedFrame - delay),
            fps,
            config: { damping: 22, stiffness: 85 },
          });
          
          const targetX = startX + (i * (photoSize + gap));
          const startXPos = width + photoSize + (i * 50);
          const currentX = interpolate(progress, [0, 1], [startXPos, targetX], { extrapolateRight: "clamp" });
          
          const shadowOpacity = interpolate(progress, [0, 1], [0, SCENE_PARAMS.shadowIntensity.value], { extrapolateRight: "clamp" });
          const photoOpacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: currentX,
                top: (height - photoSize) / 2,
                width: photoSize,
                height: photoSize,
                borderRadius: SCENE_PARAMS.borderRadius.value,
                overflow: "hidden",
                opacity: photoOpacity,
                boxShadow: "0 " + (photoSize * 0.08) + "px " + (photoSize * 0.2) + "px rgba(15, 23, 42, " + shadowOpacity + ")",
              }}
            >
              <Img
                src={photoUrl}
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

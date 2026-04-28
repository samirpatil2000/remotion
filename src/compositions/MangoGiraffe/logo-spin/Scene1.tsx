// Template: logo-spin
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  logoImage: { type: "image", label: "Logo Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/17cef1e5-be63-4ec5-a952-8b8522239191/favicon.png" },
  title: { type: "text", label: "Title", value: "Welcome" },
  subtitle: { type: "text", label: "Subtitle", value: "Crafted with precision" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#0f172a" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  secondaryTextColor: { type: "color", label: "Secondary Text", value: "#94a3b8" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  logoSize: { type: "number", label: "Logo Size", value: 0.25, min: 0.1, max: 0.5, step: 0.05 },
  showGlow: { type: "boolean", label: "Show Glow Effect", value: true },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  rotationAmount: { type: "number", label: "Logo Rotation", value: 360, min: 0, max: 720, step: 45 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const logoSize = minDim * (props.logoSize ?? SCENE_PARAMS.logoSize.value);
  
  // Logo entrance - scale up with rotation
  const logoEntrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 18, stiffness: 80 }
  });
  
  const logoScale = interpolate(logoEntrance, [0, 1], [0, 1]);
  const logoRotation = interpolate(logoEntrance, [0, 1], [(props.rotationAmount ?? SCENE_PARAMS.rotationAmount.value), 0]);
  const logoOpacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Glow pulse animation
  const glowPulse = interpolate(
    Math.sin((adjustedFrame / fps) * Math.PI * 2 * 0.5),
    [-1, 1],
    [0.4, 1]
  );
  
  // Title entrance - slides up after logo settles
  const titleDelay = 25;
  const titleProgress = spring({
    frame: Math.max(0, adjustedFrame - titleDelay),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  
  // Subtitle entrance
  const subtitleDelay = 35;
  const subtitleProgress = spring({
    frame: Math.max(0, adjustedFrame - subtitleDelay),
    fps,
    config: { damping: 20, stiffness: 90 }
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);
  
  // Accent line
  const lineDelay = 45;
  const lineWidth = interpolate(adjustedFrame, [lineDelay, lineDelay + 25], [0, 100], { extrapolateRight: "clamp" });
  
  // Floating particles around logo
  const particles = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + (adjustedFrame / fps) * 0.5;
    const radius = logoSize * 0.8 + Math.sin(adjustedFrame / fps * 2 + i) * 10;
    const particleX = Math.cos(angle) * radius;
    const particleY = Math.sin(angle) * radius;
    const particleOpacity = interpolate(adjustedFrame, [15 + i * 3, 30 + i * 3], [0, 0.6], { extrapolateRight: "clamp" });
    const particleSize = minDim * 0.008;
    
    particles.push(
      React.createElement("div", {
        key: i,
        style: {
          position: "absolute",
          width: particleSize,
          height: particleSize,
          borderRadius: "50%",
          backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
          transform: "translate(" + particleX + "px, " + particleY + "px)",
          opacity: particleOpacity,
        }
      })
    );
  }
  
  return React.createElement(
    AbsoluteFill,
    {
      style: {
        backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
        justifyContent: "center",
        alignItems: "center",
      }
    },
    React.createElement(
      "div",
      {
        style: {
          transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")",
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: minDim * 0.04,
        }
      },
      // Logo container with glow and particles
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        },
        // Glow effect
        (props.showGlow ?? SCENE_PARAMS.showGlow.value) && React.createElement("div", {
          style: {
            position: "absolute",
            width: logoSize * 1.5,
            height: logoSize * 1.5,
            borderRadius: "50%",
            background: "radial-gradient(circle, " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "40 0%, transparent 70%)",
            opacity: logoEntrance * (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * glowPulse,
            transform: "scale(" + (1 + logoEntrance * 0.2) + ")",
          }
        }),
        // Particles
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          },
          particles
        ),
        // Logo image
        React.createElement(Img, {
          src: (props.logoImage ?? SCENE_PARAMS.logoImage.value),
          style: {
            width: logoSize,
            height: logoSize,
            borderRadius: minDim * 0.02,
            objectFit: "contain",
            transform: "scale(" + logoScale + ") rotate(" + logoRotation + "deg)",
            opacity: logoOpacity,
            boxShadow: (props.showGlow ?? SCENE_PARAMS.showGlow.value) 
              ? "0 0 " + (minDim * 0.05) + "px " + (props.accentColor ?? SCENE_PARAMS.accentColor.value) + "60"
              : "none",
          }
        })
      ),
      // Text container
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: minDim * 0.015,
          }
        },
        // Title
        React.createElement(
          "h1",
          {
            style: {
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.08,
              fontWeight: 700,
              color: (props.textColor ?? SCENE_PARAMS.textColor.value),
              margin: 0,
              opacity: titleProgress,
              transform: "translateY(" + titleY + "px)",
              letterSpacing: "-0.02em",
            }
          },
          (props.title ?? SCENE_PARAMS.title.value)
        ),
        // Accent line
        React.createElement("div", {
          style: {
            width: minDim * 0.15,
            height: 3,
            backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
            borderRadius: 2,
            transform: "scaleX(" + (lineWidth / 100) + ")",
            transformOrigin: "center",
          }
        }),
        // Subtitle
        React.createElement(
          "p",
          {
            style: {
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.035,
              fontWeight: 400,
              color: (props.secondaryTextColor ?? SCENE_PARAMS.secondaryTextColor.value),
              margin: 0,
              opacity: subtitleProgress,
              transform: "translateY(" + subtitleY + "px)",
              letterSpacing: "0.02em",
            }
          },
          (props.subtitle ?? SCENE_PARAMS.subtitle.value)
        )
      )
    )
  );
}

export default Scene;

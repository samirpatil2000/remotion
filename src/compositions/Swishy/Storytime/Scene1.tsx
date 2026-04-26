// Template: storytime
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  heroText1: { type: "text", label: "Day Label", value: "DAY 5" },
  fearQuote: { type: "text", label: "Fear Quote", value: "What will people think?" },
  openingLine: { type: "text", label: "Opening Line", value: "One thought keeps coming back…" },
  critic1: { type: "text", label: "Critic 1", value: "It’s a waste of time." },
  critic2: { type: "text", label: "Critic 2", value: "Just quit it." },
  critic3: { type: "text", label: "Critic 3", value: "They’ll laugh when they see it." },
  truthIntro: { type: "text", label: "Truth Intro", value: "But the truth is —" },
  truthMain: { type: "text", label: "Truth Main", value: "if I had never started because I feared people," },
  truthPunch: { type: "text", label: "Truth Punch", value: "I wouldn’t be here today." },
  dreamLine: { type: "text", label: "Dream Line", value: "Most dreams end with this one thought." },
  closingLine: { type: "text", label: "Closing Line", value: "I’m moving beyond that fear." },
  ctaIntro: { type: "text", label: "CTA Intro", value: "If you’ve ever stopped because of this fear," },
  ctaText: { type: "text", label: "CTA", value: "follow." },
  tagline: { type: "text", label: "Tagline", value: "The journey continues." },
  fontFamily: { type: "font", label: "Font", value: "Roboto" },
  backgroundColor1: { type: "color", label: "Background Dark", value: "#0A0A0B" },
  backgroundColor2: { type: "color", label: "Background Light", value: "#1A1A1E" },
  primaryColor: { type: "color", label: "Primary Text", value: "#FFFFFF" },
  emphasisColor: { type: "color", label: "Emphasis Text", value: "#F5E6D3" },
  mutedColor: { type: "color", label: "Muted Text", value: "#6B6B6B" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.6, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const smoothConfig = { damping: 20, stiffness: 90 };
  
  const TIMING = {
    day5: { start: 0, end: 18 },
    opening: { start: 20, end: 40 },
    fearQuote1: { start: 42, end: 62 },
    critics: { start: 64, end: 96 },
    truth: { start: 98, end: 136 },
    dreams: { start: 138, end: 156 },
    fearQuote2: { start: 158, end: 172 },
    closing: { start: 174, end: 188 },
    cta: { start: 190, end: 210 }
  };
  
  const fadeIn = (startFrame, duration = 12) => {
    return interpolate(adjustedFrame, [startFrame, startFrame + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  };
  
  const fadeOut = (endFrame, duration = 10) => {
    return interpolate(adjustedFrame, [endFrame - duration, endFrame], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  };
  
  const slideUp = (startFrame, distance = (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value)) => {
    const progress = spring({ frame: Math.max(0, adjustedFrame - startFrame), fps, config: smoothConfig });
    return interpolate(progress, [0, 1], [distance, 0], { extrapolateRight: "clamp" });
  };
  
  const getPhaseOpacity = (phase) => {
    const inPhase = adjustedFrame >= phase.start && adjustedFrame < phase.end;
    if (!inPhase) return 0;
    const enterOpacity = fadeIn(phase.start);
    const exitOpacity = fadeOut(phase.end);
    return Math.min(enterOpacity, exitOpacity) * (props.opacity ?? SCENE_PARAMS.opacity.value);
  };
  
  const isInPhase = (phase) => adjustedFrame >= phase.start && adjustedFrame < phase.end;
  const stagger = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  
  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at center, " + (props.backgroundColor2 ?? SCENE_PARAMS.backgroundColor2.value) + " 0%, " + (props.backgroundColor1 ?? SCENE_PARAMS.backgroundColor1.value) + " 70%)",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
      }} />
      
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ") rotate(" + (props.rotation ?? SCENE_PARAMS.rotation.value) + "deg)",
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: minDim * 0.08,
        boxSizing: "border-box",
        filter: "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)",
      }}>
        
        {isInPhase(TIMING.day5) && (
          <div style={{
            position: "absolute",
            opacity: getPhaseOpacity(TIMING.day5),
            transform: "translateY(" + slideUp(TIMING.day5.start, (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value) + 15) + "px)",
          }}>
            <h1 style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.2,
              fontWeight: 900,
              color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value),
              letterSpacing: minDim * 0.025,
              margin: 0,
              textTransform: "uppercase",
            }}>
              {(props.heroText1 ?? SCENE_PARAMS.heroText1.value)}
            </h1>
          </div>
        )}
        
        {isInPhase(TIMING.opening) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            opacity: getPhaseOpacity(TIMING.opening),
            transform: "translateY(" + slideUp(TIMING.opening.start) + "px)",
          }}>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.05,
              fontWeight: 300,
              color: (props.emphasisColor ?? SCENE_PARAMS.emphasisColor.value),
              letterSpacing: minDim * 0.002,
              lineHeight: 1.5,
              margin: 0,
            }}>
              {(props.openingLine ?? SCENE_PARAMS.openingLine.value)}
            </p>
          </div>
        )}
        
        {isInPhase(TIMING.fearQuote1) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            opacity: getPhaseOpacity(TIMING.fearQuote1),
          }}>
            <h2 style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.1,
              fontWeight: 700,
              color: (props.emphasisColor ?? SCENE_PARAMS.emphasisColor.value),
              margin: 0,
              transform: "translateY(" + slideUp(TIMING.fearQuote1.start, (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value) - 5) + "px)",
            }}>
              "{(props.fearQuote ?? SCENE_PARAMS.fearQuote.value)}"
            </h2>
          </div>
        )}
        
        {isInPhase(TIMING.critics) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: minDim * 0.035,
            opacity: getPhaseOpacity(TIMING.critics),
          }}>
            <div style={{
              opacity: fadeIn(TIMING.critics.start + 2),
              transform: "translateX(" + interpolate(spring({ frame: Math.max(0, adjustedFrame - TIMING.critics.start - 2), fps, config: smoothConfig }), [0, 1], [-30, 0], { extrapolateRight: "clamp" }) + "px)",
            }}>
              <p style={{
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                fontSize: minDim * 0.038,
                color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
                margin: 0,
              }}>
                Some will say — <span style={{ color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value), fontWeight: 500 }}>{(props.critic1 ?? SCENE_PARAMS.critic1.value)}</span>
              </p>
            </div>
            
            <div style={{
              opacity: fadeIn(TIMING.critics.start + stagger),
              transform: "translateX(" + interpolate(spring({ frame: Math.max(0, adjustedFrame - TIMING.critics.start - stagger), fps, config: smoothConfig }), [0, 1], [30, 0], { extrapolateRight: "clamp" }) + "px)",
            }}>
              <p style={{
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                fontSize: minDim * 0.038,
                color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
                margin: 0,
              }}>
                Others will say — <span style={{ color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value), fontWeight: 500 }}>{(props.critic2 ?? SCENE_PARAMS.critic2.value)}</span>
              </p>
            </div>
            
            <div style={{
              opacity: fadeIn(TIMING.critics.start + stagger * 2),
              transform: "translateX(" + interpolate(spring({ frame: Math.max(0, adjustedFrame - TIMING.critics.start - stagger * 2), fps, config: smoothConfig }), [0, 1], [-30, 0], { extrapolateRight: "clamp" }) + "px)",
            }}>
              <p style={{
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                fontSize: minDim * 0.038,
                color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
                margin: 0,
              }}>
                Some will just — <span style={{ color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value), fontWeight: 500 }}>{(props.critic3 ?? SCENE_PARAMS.critic3.value)}</span>
              </p>
            </div>
          </div>
        )}
        
        {isInPhase(TIMING.truth) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: minDim * 0.03,
            opacity: getPhaseOpacity(TIMING.truth),
            padding: "0 " + minDim * 0.05 + "px",
          }}>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.04,
              fontWeight: 400,
              color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
              margin: 0,
              opacity: fadeIn(TIMING.truth.start),
              transform: "translateY(" + slideUp(TIMING.truth.start) + "px)",
            }}>
              {(props.truthIntro ?? SCENE_PARAMS.truthIntro.value)}
            </p>
            
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.048,
              fontWeight: 500,
              color: (props.emphasisColor ?? SCENE_PARAMS.emphasisColor.value),
              margin: 0,
              lineHeight: 1.4,
              opacity: fadeIn(TIMING.truth.start + stagger),
              transform: "translateY(" + slideUp(TIMING.truth.start + stagger) + "px)",
            }}>
              {(props.truthMain ?? SCENE_PARAMS.truthMain.value)}
            </p>
            
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.06,
              fontWeight: 700,
              color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value),
              margin: 0,
              marginTop: minDim * 0.01,
              opacity: fadeIn(TIMING.truth.start + stagger * 2),
              transform: "translateY(" + slideUp(TIMING.truth.start + stagger * 2, (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value) - 5) + "px)",
            }}>
              {(props.truthPunch ?? SCENE_PARAMS.truthPunch.value)}
            </p>
          </div>
        )}
        
        {isInPhase(TIMING.dreams) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            opacity: getPhaseOpacity(TIMING.dreams),
            padding: "0 " + minDim * 0.06 + "px",
          }}>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.05,
              fontWeight: 500,
              color: (props.emphasisColor ?? SCENE_PARAMS.emphasisColor.value),
              margin: 0,
              lineHeight: 1.5,
              transform: "translateY(" + slideUp(TIMING.dreams.start) + "px)",
            }}>
              {(props.dreamLine ?? SCENE_PARAMS.dreamLine.value)}
            </p>
          </div>
        )}
        
        {isInPhase(TIMING.fearQuote2) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            opacity: getPhaseOpacity(TIMING.fearQuote2),
          }}>
            <h2 style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.085,
              fontWeight: 600,
              color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
              margin: 0,
              transform: "translateY(" + slideUp(TIMING.fearQuote2.start) + "px)",
            }}>
              "{(props.fearQuote ?? SCENE_PARAMS.fearQuote.value)}"
            </h2>
          </div>
        )}
        
        {isInPhase(TIMING.closing) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            opacity: getPhaseOpacity(TIMING.closing),
          }}>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.055,
              fontWeight: 600,
              color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value),
              margin: 0,
              lineHeight: 1.4,
              transform: "translateY(" + slideUp(TIMING.closing.start) + "px)",
            }}>
              {(props.closingLine ?? SCENE_PARAMS.closingLine.value)}
            </p>
          </div>
        )}
        
        {isInPhase(TIMING.cta) && (
          <div style={{
            position: "absolute",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: minDim * 0.03,
            opacity: getPhaseOpacity(TIMING.cta),
          }}>
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.038,
              fontWeight: 400,
              color: (props.mutedColor ?? SCENE_PARAMS.mutedColor.value),
              margin: 0,
              lineHeight: 1.5,
              opacity: fadeIn(TIMING.cta.start) * (props.opacity ?? SCENE_PARAMS.opacity.value),
              transform: "translateY(" + slideUp(TIMING.cta.start) + "px)",
            }}>
              {(props.ctaIntro ?? SCENE_PARAMS.ctaIntro.value)}
            </p>
            
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.075,
              fontWeight: 700,
              color: (props.emphasisColor ?? SCENE_PARAMS.emphasisColor.value),
              margin: 0,
              opacity: fadeIn(TIMING.cta.start + stagger) * (props.opacity ?? SCENE_PARAMS.opacity.value),
              transform: "translateY(" + slideUp(TIMING.cta.start + stagger, (props.entranceOffset ?? SCENE_PARAMS.entranceOffset.value) - 5) + "px)",
            }}>
              {(props.ctaText ?? SCENE_PARAMS.ctaText.value)}
            </p>
            
            <p style={{
              fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
              fontSize: minDim * 0.028,
              fontWeight: 400,
              color: (props.primaryColor ?? SCENE_PARAMS.primaryColor.value),
              margin: 0,
              marginTop: minDim * 0.015,
              opacity: fadeIn(TIMING.cta.start + stagger * 2) * 0.6 * (props.opacity ?? SCENE_PARAMS.opacity.value),
              letterSpacing: minDim * 0.006,
              textTransform: "uppercase",
            }}>
              {(props.tagline ?? SCENE_PARAMS.tagline.value)}
            </p>
          </div>
        )}
        
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

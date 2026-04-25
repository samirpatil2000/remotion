// Template: animated-blob
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#0a0a0a" },
  primaryColor: { type: "color", label: "Primary Color", value: "#4285f4" },
  secondaryColor: { type: "color", label: "Secondary Color", value: "#ea4335" },
  tertiaryColor: { type: "color", label: "Tertiary Color", value: "#fbbc04" },
  quaternaryColor: { type: "color", label: "Quaternary Color", value: "#34a853" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  blobComplexity: { type: "number", label: "Blob Complexity", value: 8, min: 4, max: 12, step: 1 },
  blobSize: { type: "number", label: "Blob Size", value: 0.4, min: 0.2, max: 0.6, step: 0.05 },
  morphIntensity: { type: "number", label: "Morph Intensity", value: 0.55, min: 0.1, max: 0.8, step: 0.05 },
  tensionAmount: { type: "number", label: "Tension Amount", value: 0.7, min: 0.3, max: 1, step: 0.1 },
  spikeFrequency: { type: "number", label: "Spike Frequency", value: 3, min: 1, max: 6, step: 1 },
  showGradient: { type: "boolean", label: "Show Gradient", value: true },
  showInnerGlow: { type: "boolean", label: "Show Inner Glow", value: true },
  showSpikes: { type: "boolean", label: "Show Spikes", value: true },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const blobSize = minDim * SCENE_PARAMS.blobSize.value;
  const complexity = SCENE_PARAMS.blobComplexity.value;
  const morphIntensity = SCENE_PARAMS.morphIntensity.value;
  const tension = SCENE_PARAMS.tensionAmount.value;
  const spikeFreq = SCENE_PARAMS.spikeFrequency.value;
  
  const colors = [
    SCENE_PARAMS.primaryColor.value,
    SCENE_PARAMS.secondaryColor.value,
    SCENE_PARAMS.tertiaryColor.value,
    SCENE_PARAMS.quaternaryColor.value,
  ];
  
  const entranceProgress = spring({ 
    frame: adjustedFrame, 
    fps, 
    config: { damping: 12, stiffness: 150 } 
  });
  
  const tensionEase = (t) => {
    const sharp = Math.pow(Math.abs(Math.sin(t * Math.PI)), 0.3) * Math.sign(Math.sin(t * Math.PI));
    return sharp;
  };
  
  const elasticPulse = (t, freq) => {
    const base = Math.sin(t * freq);
    const tension = Math.pow(Math.abs(base), 0.5) * Math.sign(base);
    const snap = Math.sin(t * freq * 3) * 0.3;
    return tension + snap;
  };
  
  const generateBlobPath = (time, offset = 0) => {
    const points = [];
    const numPoints = complexity;
    const baseRadius = blobSize / 2;
    
    const morphPhase = time * 0.025;
    const tensionPhase = time * 0.04;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      
      const tensionWave = tensionEase(morphPhase + i * 0.8 + offset) * morphIntensity * tension;
      const elasticWave = elasticPulse(tensionPhase + i * 0.5 + offset, 0.8) * morphIntensity * 0.6;
      
      const spikePhase = (time * 0.06 + i * spikeFreq + offset) % (Math.PI * 2);
      const spikeActive = SCENE_PARAMS.showSpikes.value && spikePhase < 0.8;
      const spike = spikeActive ? Math.pow(1 - spikePhase / 0.8, 2) * morphIntensity * 1.2 : 0;
      
      const jitter = Math.sin(time * 0.15 + i * 4.7) * 0.02 * tension;
      
      const combinedNoise = tensionWave + elasticWave + spike + jitter;
      const radius = baseRadius * (1 + combinedNoise);
      
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }
    
    let path = "M " + points[0].x + " " + points[0].y;
    
    for (let i = 0; i < numPoints; i++) {
      const current = points[i];
      const next = points[(i + 1) % numPoints];
      const prev = points[(i - 1 + numPoints) % numPoints];
      const nextNext = points[(i + 2) % numPoints];
      
      const tensionFactor = 0.15 + tension * 0.2;
      
      const cp1x = current.x + (next.x - prev.x) * tensionFactor;
      const cp1y = current.y + (next.y - prev.y) * tensionFactor;
      const cp2x = next.x - (nextNext.x - current.x) * tensionFactor;
      const cp2y = next.y - (nextNext.y - current.y) * tensionFactor;
      
      path += " C " + cp1x + " " + cp1y + ", " + cp2x + " " + cp2y + ", " + next.x + " " + next.y;
    }
    
    path += " Z";
    return path;
  };
  
  const colorCycleDuration = 180;
  const colorProgress = (adjustedFrame % colorCycleDuration) / colorCycleDuration;
  const colorIndex = Math.floor(colorProgress * colors.length);
  const colorT = (colorProgress * colors.length) % 1;
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  const lerpColor = (color1, color2, t) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const snapT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const r = Math.round(c1.r + (c2.r - c1.r) * snapT);
    const g = Math.round(c1.g + (c2.g - c1.g) * snapT);
    const b = Math.round(c1.b + (c2.b - c1.b) * snapT);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
  
  const currentColor = colors[colorIndex % colors.length];
  const nextColor = colors[(colorIndex + 1) % colors.length];
  const interpolatedColor = lerpColor(currentColor, nextColor, colorT);
  
  const blobPath = generateBlobPath(adjustedFrame);
  const innerBlobPath = generateBlobPath(adjustedFrame, Math.PI * 0.7);
  
  const floatPhase = adjustedFrame * 0.018;
  const floatY = Math.sin(floatPhase) * minDim * 0.02 + Math.sin(floatPhase * 2.3) * minDim * 0.008;
  const floatX = Math.cos(floatPhase * 0.7) * minDim * 0.015;
  
  const rotationBase = adjustedFrame * 0.08;
  const rotationJitter = Math.sin(adjustedFrame * 0.1) * 3 * tension;
  const rotation = rotationBase + rotationJitter;
  
  const pulseBase = Math.sin(adjustedFrame * 0.06);
  const pulseTension = Math.pow(Math.abs(pulseBase), 0.6) * Math.sign(pulseBase);
  const pulseScale = 1 + pulseTension * 0.05 * tension;
  
  const gradientId = "blobGradient";
  const glowId = "blobGlow";
  const turbulenceId = "turbulence";
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value, 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: blobSize * 3.5,
        height: blobSize * 3.5,
        borderRadius: "50%",
        background: "radial-gradient(circle, " + interpolatedColor + "20 0%, transparent 60%)",
        filter: "blur(" + (minDim * 0.06) + "px)",
        opacity: entranceProgress * 0.7,
        transform: "translate(" + floatX + "px, " + floatY + "px) scale(" + pulseScale + ")",
      }} />
      
      <div style={{
        transform: "scale(" + (SCENE_PARAMS.scale.value * entranceProgress * pulseScale) + ") translate(" + floatX + "px, " + floatY + "px)",
        transformOrigin: "center center",
      }}>
        <svg 
          width={blobSize * 2.5} 
          height={blobSize * 2.5} 
          viewBox={(-blobSize * 1.25) + " " + (-blobSize * 1.25) + " " + (blobSize * 2.5) + " " + (blobSize * 2.5)}
          style={{ overflow: "visible" }}
        >
          <defs>
            {SCENE_PARAMS.showGradient.value && (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentColor} />
                <stop offset="40%" stopColor={interpolatedColor} />
                <stop offset="100%" stopColor={nextColor} />
              </linearGradient>
            )}
            <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation={blobSize * 0.06} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g transform={"rotate(" + rotation + ")"}>
            <path
              d={blobPath}
              fill={SCENE_PARAMS.showGradient.value ? "url(#" + gradientId + ")" : interpolatedColor}
              filter={"url(#" + glowId + ")"}
              opacity={0.95}
            />
            
            {SCENE_PARAMS.showInnerGlow.value && (
              <path
                d={innerBlobPath}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={2.5}
                transform={"scale(0.65) rotate(" + (-rotation * 0.7) + ")"}
              />
            )}
            
            {SCENE_PARAMS.showInnerGlow.value && (
              <path
                d={generateBlobPath(adjustedFrame, Math.PI * 1.4)}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1.5}
                strokeDasharray="8 12"
                transform={"scale(0.45) rotate(" + (rotation * 0.4) + ")"}
              />
            )}
            
            <ellipse
              cx={-blobSize * 0.12}
              cy={-blobSize * 0.12}
              rx={blobSize * 0.2}
              ry={blobSize * 0.12}
              fill="rgba(255,255,255,0.25)"
              transform={"rotate(-35)"}
            />
          </g>
        </svg>
      </div>
      
      {[0, 1, 2, 3, 4].map((i) => {
        const particlePhase = adjustedFrame * 0.015 + i * 1.3;
        const particleRadiusBase = blobSize * (0.9 + i * 0.15);
        const particleRadiusPulse = Math.sin(adjustedFrame * 0.05 + i * 0.8) * blobSize * 0.15 * tension;
        const particleRadius = particleRadiusBase + particleRadiusPulse;
        const particleX = Math.cos(particlePhase) * particleRadius + floatX;
        const particleY = Math.sin(particlePhase) * particleRadius + floatY;
        
        const particleOpacityBase = 0.4 + Math.sin(adjustedFrame * 0.07 + i * 2) * 0.25;
        const particleOpacity = particleOpacityBase * (1 - i * 0.1);
        const particleSize = minDim * (0.02 - i * 0.002 + Math.sin(adjustedFrame * 0.08 + i) * 0.005 * tension);
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: particleSize,
              height: particleSize,
              borderRadius: "50%",
              backgroundColor: colors[(colorIndex + i) % colors.length],
              opacity: particleOpacity * entranceProgress,
              transform: "translate(" + particleX + "px, " + particleY + "px)",
              boxShadow: "0 0 " + (particleSize * 2.5) + "px " + colors[(colorIndex + i) % colors.length],
            }}
          />
        );
      })}
      
      {SCENE_PARAMS.showSpikes.value && [0, 1, 2].map((i) => {
        const burstPhase = (adjustedFrame * 0.03 + i * 2.5) % (Math.PI * 2);
        const burstActive = burstPhase < 0.6;
        const burstProgress = burstActive ? burstPhase / 0.6 : 0;
        const burstAngle = (adjustedFrame * 0.02 + i * 2.1);
        const burstDistance = blobSize * 0.6 * burstProgress;
        const burstX = Math.cos(burstAngle) * burstDistance;
        const burstY = Math.sin(burstAngle) * burstDistance;
        const burstOpacity = burstActive ? (1 - burstProgress) * 0.6 : 0;
        const burstSize = minDim * 0.015 * (1 - burstProgress * 0.5);
        
        return (
          <div
            key={"burst" + i}
            style={{
              position: "absolute",
              width: burstSize,
              height: burstSize,
              borderRadius: "50%",
              backgroundColor: colors[(colorIndex + i + 1) % colors.length],
              opacity: burstOpacity * entranceProgress,
              transform: "translate(" + burstX + "px, " + burstY + "px)",
              boxShadow: "0 0 " + (burstSize * 3) + "px " + colors[(colorIndex + i + 1) % colors.length],
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

export default Scene;

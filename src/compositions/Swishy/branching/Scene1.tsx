// Template: branching
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#000000" },
  barColor: { type: "color", label: "Bar Color", value: "#ffffff" },
  nodeColor: { type: "color", label: "Node Color", value: "#22c55e" },
  branchColor: { type: "color", label: "Branch Color", value: "#22c55e" },
  glowColor: { type: "color", label: "Glow Color", value: "#22c55e" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  barWidth: { type: "number", label: "Bar Width", value: 4, min: 2, max: 10, step: 1 },
  nodeSize: { type: "number", label: "Node Size", value: 10, min: 6, max: 20, step: 1 },
  nodeCount: { type: "number", label: "Node Count", value: 6, min: 3, max: 10, step: 1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.8, min: 0, max: 1, step: 0.1 },
  branchCurve: { type: "number", label: "Branch Curve", value: 40, min: 20, max: 80, step: 5 }
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const barHeight = height * 0.6;
  const barX = width * 0.5;
  const barTop = height * 0.2;
  const nodeCount = (props.nodeCount ?? SCENE_PARAMS.nodeCount.value);
  
  const barEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 30, stiffness: 60 } });
  const barGrowth = interpolate(adjustedFrame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const smoothBarGrowth = barGrowth * barGrowth * (3 - 2 * barGrowth);
  
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const yPos = barTop + barHeight * (1 - (i + 1) / (nodeCount + 1));
    nodes.push({
      x: barX,
      y: yPos,
      delay: 40 + i * 20,
      branchAngle: i % 2 === 0 ? 1 : -1,
      branchLength: minDim * (0.08 + (i % 3) * 0.02)
    });
  }
  
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  return (
    <AbsoluteFill style={{ backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value) }}>
      <div style={{ 
        transform: "scale(" + scaleValue + ")", 
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        position: "relative"
      }}>
        <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={(props.barColor ?? SCENE_PARAMS.barColor.value)} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={(props.barColor ?? SCENE_PARAMS.barColor.value)} stopOpacity="1"/>
            </linearGradient>
          </defs>
          
          <rect
            x={barX - (props.barWidth ?? SCENE_PARAMS.barWidth.value) / 2}
            y={barTop + barHeight * (1 - smoothBarGrowth * barEntrance)}
            width={(props.barWidth ?? SCENE_PARAMS.barWidth.value)}
            height={barHeight * smoothBarGrowth * barEntrance}
            fill="url(#barGradient)"
            rx={(props.barWidth ?? SCENE_PARAMS.barWidth.value) / 2}
          />
          
          {nodes.map((node, i) => {
            const branchFrame = Math.max(0, adjustedFrame - node.delay - 15);
            const branchProgress = spring({ frame: branchFrame, fps, config: { damping: 35, stiffness: 50 } });
            
            const barReachedNode = smoothBarGrowth * barEntrance >= (1 - (node.y - barTop) / barHeight);
            if (!barReachedNode) return null;
            
            const smoothBranch = branchProgress * branchProgress * (3 - 2 * branchProgress);
            
            const branchEndX = node.x + node.branchAngle * node.branchLength * smoothBranch;
            const branchEndY = node.y - node.branchLength * 0.6 * smoothBranch;
            const controlX = node.x + node.branchAngle * node.branchLength * 0.5;
            const controlY = node.y - (props.branchCurve ?? SCENE_PARAMS.branchCurve.value) * smoothBranch;
            
            const subBranchFrame = Math.max(0, branchFrame - 25);
            const subBranchProgress = spring({ frame: subBranchFrame, fps, config: { damping: 35, stiffness: 45 } });
            const smoothSubBranch = subBranchProgress * subBranchProgress * (3 - 2 * subBranchProgress);
            
            const subBranchLength = node.branchLength * 0.4;
            const subBranchEndX = branchEndX + node.branchAngle * subBranchLength * 0.3 * smoothSubBranch;
            const subBranchEndY = branchEndY - subBranchLength * smoothSubBranch;
            
            return (
              <React.Fragment key={i}>
                {smoothBranch > 0.01 && (
                  <>
                    <path
                      d={"M " + node.x + " " + node.y + " Q " + controlX + " " + controlY + " " + branchEndX + " " + branchEndY}
                      fill="none"
                      stroke={(props.branchColor ?? SCENE_PARAMS.branchColor.value)}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      opacity={smoothBranch * 0.9}
                    />
                    
                    {smoothSubBranch > 0.01 && (
                      <path
                        d={"M " + branchEndX + " " + branchEndY + " Q " + (branchEndX + node.branchAngle * subBranchLength * 0.2) + " " + (branchEndY - subBranchLength * 0.5) + " " + subBranchEndX + " " + subBranchEndY}
                        fill="none"
                        stroke={(props.branchColor ?? SCENE_PARAMS.branchColor.value)}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        opacity={smoothSubBranch * 0.7}
                      />
                    )}
                    
                    {smoothSubBranch > 0.3 && (
                      <circle
                        cx={subBranchEndX}
                        cy={subBranchEndY}
                        r={(props.nodeSize ?? SCENE_PARAMS.nodeSize.value) * 0.4 * smoothSubBranch}
                        fill={(props.nodeColor ?? SCENE_PARAMS.nodeColor.value)}
                        opacity={smoothSubBranch * 0.8}
                        filter="url(#glow)"
                      />
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </svg>
        
        {nodes.map((node, i) => {
          const nodeFrame = Math.max(0, adjustedFrame - node.delay);
          const nodeProgress = spring({ frame: nodeFrame, fps, config: { damping: 30, stiffness: 60 } });
          
          const barReachedNode = smoothBarGrowth * barEntrance >= (1 - (node.y - barTop) / barHeight);
          if (!barReachedNode) return null;
          
          const smoothNode = nodeProgress * nodeProgress * (3 - 2 * nodeProgress);
          
          const pulseFrame = Math.max(0, adjustedFrame - node.delay);
          const pulsePhase = (pulseFrame % 90) / 90;
          const pulseScale = 1 + Math.sin(pulsePhase * Math.PI * 2) * 0.08;
          const pulseOpacity = 0.4 + Math.sin(pulsePhase * Math.PI * 2) * 0.1;
          
          const size = (props.nodeSize ?? SCENE_PARAMS.nodeSize.value) * smoothNode;
          
          return (
            <React.Fragment key={i}>
              <div style={{
                position: "absolute",
                left: node.x - size * 2,
                top: node.y - size * 2,
                width: size * 4,
                height: size * 4,
                borderRadius: "50%",
                backgroundColor: (props.glowColor ?? SCENE_PARAMS.glowColor.value),
                opacity: (props.glowIntensity ?? SCENE_PARAMS.glowIntensity.value) * smoothNode * pulseOpacity,
                filter: "blur(" + (size * 1.5) + "px)",
                transform: "scale(" + pulseScale + ")",
                transition: "transform 0.3s ease-out"
              }} />
              
              <div style={{
                position: "absolute",
                left: node.x - size / 2,
                top: node.y - size / 2,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: (props.nodeColor ?? SCENE_PARAMS.nodeColor.value),
                boxShadow: "0 0 " + (size * 0.8) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + ", 0 0 " + (size * 1.5) + "px " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + "60",
                opacity: smoothNode,
              }} />
            </React.Fragment>
          );
        })}
        
        <div style={{
          position: "absolute",
          left: barX - minDim * 0.15,
          top: barTop - minDim * 0.2,
          width: minDim * 0.3,
          height: minDim * 0.3,
          background: "radial-gradient(circle, " + (props.glowColor ?? SCENE_PARAMS.glowColor.value) + "10 0%, transparent 70%)",
          opacity: interpolate(adjustedFrame, [120, 160], [0, 1], { extrapolateRight: "clamp" }),
          filter: "blur(" + (minDim * 0.03) + "px)",
        }} />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

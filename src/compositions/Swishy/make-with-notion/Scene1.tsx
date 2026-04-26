// Template: make-with-notion
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f3" },
  textColor: { type: "color", label: "Text Color", value: "#1a1a1a" },
  blueColor: { type: "color", label: "Blue Shape", value: "#3a8dde" },
  redColor: { type: "color", label: "Red Shape", value: "#e94e3c" },
  yellowColor: { type: "color", label: "Yellow Shape", value: "#f5a623" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1.4, min: 0.5, max: 2, step: 0.1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  
  const fontSize = minDim * 0.11;
  const shapeSize = fontSize * 0.65;
  
  const createOctagonPath = (size) => {
    const points = [];
    const sides = 8;
    const radius = size / 2;
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      points.push({
        x: radius + radius * Math.cos(angle),
        y: radius + radius * Math.sin(angle)
      });
    }
    return points.map((p, i) => (i === 0 ? "M" : "L") + p.x + "," + p.y).join(" ") + " Z";
  };
  
  const stagger = 4;
  
  const getLetterAnim = (index) => {
    const delay = index * stagger;
    const dominoTilt = 25;
    const tiltProgress = interpolate(adjustedFrame, [delay, delay + 8], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const settleProgress = interpolate(adjustedFrame, [delay + 8, delay + 16], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const shapeRotation = interpolate(tiltProgress, [0, 1], [-dominoTilt, dominoTilt]) * (1 - settleProgress);
    const showLetter = adjustedFrame >= delay + 12;
    const shapeVisible = adjustedFrame >= delay && adjustedFrame < delay + 14;
    return { shapeRotation, showLetter, shapeVisible, tiltProgress };
  };
  
  const LetterWithShape = ({ props, letter, index, shapeColor, shapeType }: any) => {
    const { shapeRotation, showLetter, shapeVisible, tiltProgress } = getLetterAnim(index);
    
    return (
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", height: fontSize }}>
        {shapeVisible && (
          <div style={{
            position: "absolute",
            transform: "rotate(" + shapeRotation + "deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center bottom",
          }}>
            {shapeType === "triangle" && (
              <svg width={shapeSize * 0.85} height={shapeSize * 0.75} viewBox="0 0 100 90">
                <polygon points="50,5 95,85 5,85" fill={shapeColor} />
              </svg>
            )}
            {shapeType === "octagon" && (
              <svg width={shapeSize * 0.7} height={shapeSize * 0.7} viewBox={"0 0 " + shapeSize + " " + shapeSize}>
                <path d={createOctagonPath(shapeSize)} fill={shapeColor} />
              </svg>
            )}
          </div>
        )}
        <span style={{
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          fontSize: fontSize,
          fontWeight: 700,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          opacity: showLetter ? 1 : 0,
          lineHeight: 1,
        }}>{letter}</span>
      </div>
    );
  };
  
  const PureShape = ({ props, index, shapeColor, shapeType, size }: any) => {
    const { shapeRotation, tiltProgress } = getLetterAnim(index);
    const delay = index * stagger;
    const shapeAppear = interpolate(adjustedFrame, [delay, delay + 6], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const actualSize = size || shapeSize;
    
    return (
      <div style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        height: fontSize,
        width: actualSize * 0.85,
        marginLeft: fontSize * 0.02,
        marginRight: fontSize * 0.02,
      }}>
        <div style={{
          opacity: shapeAppear,
          transform: "rotate(" + shapeRotation + "deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center bottom",
        }}>
          {shapeType === "triangle" && (
            <svg width={actualSize * 0.85} height={actualSize * 0.75} viewBox="0 0 100 90">
              <polygon points="50,5 95,85 5,85" fill={shapeColor} />
            </svg>
          )}
          {shapeType === "octagon" && (
            <svg width={actualSize * 0.7} height={actualSize * 0.7} viewBox={"0 0 " + actualSize + " " + actualSize}>
              <path d={createOctagonPath(actualSize)} fill={shapeColor} />
            </svg>
          )}
        </div>
      </div>
    );
  };
  
  const withDelay = 4 * stagger;
  const withShow = adjustedFrame >= withDelay + 12;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{ 
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ")", 
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <LetterWithShape props={props}  letter="M" index={0} shapeColor={(props.blueColor ?? SCENE_PARAMS.blueColor.value)} shapeType="octagon" />
        <PureShape props={props}  index={1} shapeColor={(props.redColor ?? SCENE_PARAMS.redColor.value)} shapeType="triangle" size={shapeSize * 1.1} />
        <LetterWithShape props={props}  letter="k" index={2} shapeColor={(props.yellowColor ?? SCENE_PARAMS.yellowColor.value)} shapeType="triangle" />
        <LetterWithShape props={props}  letter="e" index={3} shapeColor={(props.blueColor ?? SCENE_PARAMS.blueColor.value)} shapeType="octagon" />
        
        <span style={{
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
          fontSize: fontSize,
          fontWeight: 700,
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          opacity: withShow ? 1 : 0,
          lineHeight: 1,
          marginLeft: fontSize * 0.3,
          marginRight: fontSize * 0.3,
        }}>with</span>
        
        <LetterWithShape props={props}  letter="N" index={5} shapeColor={(props.redColor ?? SCENE_PARAMS.redColor.value)} shapeType="triangle" />
        <PureShape props={props}  index={6} shapeColor={(props.yellowColor ?? SCENE_PARAMS.yellowColor.value)} shapeType="octagon" size={shapeSize * 0.9} />
        <LetterWithShape props={props}  letter="t" index={7} shapeColor={(props.blueColor ?? SCENE_PARAMS.blueColor.value)} shapeType="triangle" />
        <LetterWithShape props={props}  letter="i" index={8} shapeColor={(props.redColor ?? SCENE_PARAMS.redColor.value)} shapeType="octagon" />
        <LetterWithShape props={props}  letter="o" index={9} shapeColor={(props.yellowColor ?? SCENE_PARAMS.yellowColor.value)} shapeType="triangle" />
        <LetterWithShape props={props}  letter="n" index={10} shapeColor={(props.blueColor ?? SCENE_PARAMS.blueColor.value)} shapeType="octagon" />
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

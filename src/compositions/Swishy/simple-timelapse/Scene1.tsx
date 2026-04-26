// Template: simple-timelapse
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Time inputs
  startTime: { type: "text", label: "Start Time", value: "09:00 AM" },
  endTime: { type: "text", label: "End Time", value: "06:57 PM" },
  
  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f5" },
  textColor: { type: "color", label: "Text Color", value: "#1a1a1a" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  
  // Parse time strings to minutes
  const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return 0;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3]?.toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };
  
  const startMinutes = parseTime((props.startTime ?? SCENE_PARAMS.startTime.value));
  const endMinutes = parseTime((props.endTime ?? SCENE_PARAMS.endTime.value));
  
  // Calculate current time based on animation progress
  const progress = frame / durationInFrames;
  const currentMinutes = startMinutes + (endMinutes - startMinutes) * progress;
  
  // Format time for display
  const totalMinutes = Math.floor(currentMinutes);
  let hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  const timeString = String(displayHours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ' ' + period;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ 
        transform: "scale(" + scaleValue + ")", 
        transformOrigin: "center center" 
      }}>
        <div style={{
          fontSize: minDim * 0.15,
          fontWeight: 400,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          letterSpacing: "-0.02em",
        }}>
          {timeString}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

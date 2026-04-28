// Template: simple-timelapse-2
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  // Time inputs
  startTime: { type: "text", label: "Start Time", value: "04:00 PM" },
  endTime: { type: "text", label: "End Time", value: "8:00 PM" },

  // Typography
  fontFamily: { type: "font", label: "Font", value: "Fredoka One" },

  // Colors
  backgroundColor: { type: "color", label: "Background", value: "#f5f5f5" },
  textColor: { type: "color", label: "Text Color", value: "#000000" },

  // Transform
  scale: { type: "number", label: "Scale", value: 1.35, min: 0.5, max: 2, step: 0.05 },

  // Animation Timing
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  holdDuration: { type: "number", label: "Hold at End (frames)", value: 10, min: 0, max: 90, step: 5 },

  // Style controls
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const minDim = Math.min(width, height);
  const scaleValue = (props.scale ?? SCENE_PARAMS.scale.value);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const holdFrames = (props.holdDuration ?? SCENE_PARAMS.holdDuration.value);

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
  const rawEndMinutes = parseTime((props.endTime ?? SCENE_PARAMS.endTime.value));
  const endMinutes = rawEndMinutes <= startMinutes ? rawEndMinutes + 1440 : rawEndMinutes;

  // Animation ends before the hold period
  const animationEndFrame = durationInFrames - holdFrames;

  // Animate time, stopping before the hold period
  const progress = interpolate(
    adjustedFrame,
    [0, Math.max(1, animationEndFrame - 1)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const currentMinutes = startMinutes + (endMinutes - startMinutes) * progress;

  // Format time for display
  const displayMinutesTotal = ((Math.floor(currentMinutes) % 1440) + 1440) % 1440;
  let hours = Math.floor(displayMinutesTotal / 60);
  const minutes = displayMinutesTotal % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  const timeString = String(displayHours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ' ' + period;

  return (
    <AbsoluteFill style={{
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value),
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + scaleValue + ") rotate(" + (props.rotation ?? SCENE_PARAMS.rotation.value) + "deg)",
        transformOrigin: "center center",
        filter: (props.blur ?? SCENE_PARAMS.blur.value) > 0 ? "blur(" + (props.blur ?? SCENE_PARAMS.blur.value) + "px)" : "none",
      }}>
        <div style={{
          fontSize: minDim * 0.15,
          fontWeight: 400,
          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, -apple-system, sans-serif",
          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
          letterSpacing: "-0.02em",
          opacity: (props.opacity ?? SCENE_PARAMS.opacity.value),
        }}>
          {timeString}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

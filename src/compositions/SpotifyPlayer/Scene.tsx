import { useCurrentFrame, useVideoConfig, AbsoluteFill, Img } from "remotion";

export const SCENE_PARAMS = {
  trackTitle: { type: "text", label: "Track Title", value: "You've Got The Love (Jamie xx Rework feat. The xx)" },
  artistName: { type: "text", label: "Artist Name", value: "Florence + The Machine, The xx, Jamie xx" },
  totalDuration: { type: "text", label: "Total Duration", value: "5:42" },
  vinylLabel: { type: "image", label: "Vinyl Label", value: "https://picsum.photos/seed/vinyl/800/800" }, 
  fontFamily: { type: "font", label: "Font", value: "JetBrains Mono" },
  backgroundColor: { type: "color", label: "Background", value: "#121212" },
  textColor: { type: "color", label: "Text Color", value: "#FFFFFF" },
  secondaryTextColor: { type: "color", label: "Secondary Text", value: "#B3B3B3" },
  accentColor: { type: "color", label: "Accent (Spotify Green)", value: "#1DB954" },
  progressBarColor: { type: "color", label: "Progress Bar", value: "#FFFFFF" },
  progressTrackColor: { type: "color", label: "Progress Track", value: "#4D4D4D" },
  vinylColor: { type: "color", label: "Vinyl Color", value: "#1A1A1A" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  rotationSpeed: { type: "number", label: "Vinyl Rotation Speed", value: 0.4, min: 0.1, max: 3, step: 0.1 },
  marqueeSpeed: { type: "number", label: "Marquee Speed", value: 0.8, min: 0.3, max: 2, step: 0.1 },
  progressDuration: { type: "number", label: "Progress Duration (frames)", value: 300, min: 60, max: 500, step: 10 },
  showShuffleActive: { type: "boolean", label: "Shuffle Active", value: true },
  showRepeatActive: { type: "boolean", label: "Repeat Active", value: false },
};

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  
  const isPortrait = height > width;
  const containerWidth = width * 0.88;
  const vinylSize = isPortrait ? containerWidth : height * 0.45;
  
  // Vinyl rotation - continuous smooth spin
  const rotationSpeed = SCENE_PARAMS.rotationSpeed.value;
  const degreesPerFrame = (360 / fps) * rotationSpeed * 0.3;
  const vinylRotation = (adjustedFrame * degreesPerFrame) % 360;
  
  // Progress calculation
  const progressDuration = SCENE_PARAMS.progressDuration.value;
  const playbackFrame = adjustedFrame;
  const progressPercent = Math.min(100, (playbackFrame / progressDuration) * 100);
  
  // Marquee calculation
  const titleContainerWidth = containerWidth;
  const charWidth = minDim * 0.018;
  const titleTextWidth = SCENE_PARAMS.trackTitle.value.length * charWidth;
  const needsMarquee = titleTextWidth > titleContainerWidth * 0.9;
  
  const marqueeSpeed = SCENE_PARAMS.marqueeSpeed.value;
  const gapWidth = titleContainerWidth * 0.3;
  const totalScrollDistance = titleTextWidth + gapWidth;
  const pixelsPerFrame = marqueeSpeed * 1.5;
  
  let marqueeOffset = 0;
  if (needsMarquee) {
    const rawOffset = adjustedFrame * pixelsPerFrame;
    marqueeOffset = -(rawOffset % totalScrollDistance);
  }
  
  // Scrubber pulse animation
  const pulsePhase = (adjustedFrame % 60) / 60;
  const scrubberScale = 1 + Math.sin(pulsePhase * Math.PI * 2) * 0.08;
  
  // Shuffle pulse
  const shufflePulse = SCENE_PARAMS.showShuffleActive.value 
    ? 0.85 + Math.sin((adjustedFrame % 45) / 45 * Math.PI * 2) * 0.15 
    : 1;
  
  // Control button sizes
  const controlSize = minDim * 0.055 * 1.518 * 1.3;
  const mainControlSize = minDim * 0.085 * 1.518 * 1.3;
  
  // Vinyl dimensions
  const labelSize = vinylSize * 0.65;
  const centerHoleSize = vinylSize * 0.08;
  
  return (
    <AbsoluteFill style={{
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: height * 0.08,
    }}>
      <div style={{
        transform: `scale(${SCENE_PARAMS.scale.value})`,
        transformOrigin: "center top",
        width: containerWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: minDim * 0.035,
      }}>
        
        {/* ── VINYL RECORD ── */}
        <div style={{
          width: vinylSize,
          height: vinylSize,
          borderRadius: "50%",
          backgroundColor: SCENE_PARAMS.vinylColor.value,
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
          transform: `rotate(${vinylRotation}deg)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>

          {/* Vinyl grooves */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(40,40,40,0.3) 2px, rgba(40,40,40,0.3) 3px)",
            pointerEvents: "none",
          }} />
          
          {/* Vinyl highlight/reflection */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
            pointerEvents: "none",
          }} />
          
          {/* Center Label */}
          <div style={{
            width: labelSize,
            height: labelSize,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
          }}>
            {SCENE_PARAMS.vinylLabel.value ? (
              <Img 
                src={SCENE_PARAMS.vinylLabel.value} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "serif",
                  fontSize: labelSize * 0.15,
                  fontStyle: "italic",
                  color: "#000000",
                }}>vinyl</span>
              </div>
            )}
            
            {/* Center Hole */}
            <div style={{
              position: "absolute",
              width: centerHoleSize,
              height: centerHoleSize,
              borderRadius: "50%",
              backgroundColor: SCENE_PARAMS.vinylColor.value,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
            }} />
          </div>
        </div>
        
        {/* ── TRACK INFO ── */}
        <div style={{
          width: "100%",
          marginTop: minDim * 0.02,
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.008,
        }}>
          
          {/* Track Title with Marquee */}
          <div style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            height: minDim * 0.065,
          }}>
            {needsMarquee && (
              <>
                {/* Left fade */}
                <div style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  width: minDim * 0.05,
                  background: `linear-gradient(to right, ${SCENE_PARAMS.backgroundColor.value}, transparent)`,
                  zIndex: 2,
                  opacity: marqueeOffset < 0 ? 1 : 0,
                }} />
                {/* Right fade */}
                <div style={{
                  position: "absolute",
                  right: 0, top: 0, bottom: 0,
                  width: minDim * 0.05,
                  background: `linear-gradient(to left, ${SCENE_PARAMS.backgroundColor.value}, transparent)`,
                  zIndex: 2,
                }} />
              </>
            )}
            
            <div style={{
              display: "flex",
              alignItems: "center",
              transform: needsMarquee ? `translateX(${marqueeOffset}px)` : "translateX(0)",
              whiteSpace: "nowrap",
              height: "100%",
            }}>
              <h1 style={{
                fontFamily: `${SCENE_PARAMS.fontFamily.value}, system-ui, sans-serif`,
                fontSize: minDim * 0.052,
                fontWeight: 700,
                color: SCENE_PARAMS.textColor.value,
                margin: 0,
                letterSpacing: "-0.01em",
                paddingRight: needsMarquee ? gapWidth : 0,
              }}>
                {SCENE_PARAMS.trackTitle.value}
              </h1>
              {/* Duplicate for seamless loop */}
              {needsMarquee && (
                <h1 style={{
                  fontFamily: `${SCENE_PARAMS.fontFamily.value}, system-ui, sans-serif`,
                  fontSize: minDim * 0.052,
                  fontWeight: 700,
                  color: SCENE_PARAMS.textColor.value,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}>
                  {SCENE_PARAMS.trackTitle.value}
                </h1>
              )}
            </div>
          </div>
          
          {/* Artist Name */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: minDim * 0.012,
          }}>
            <p style={{
              fontFamily: `${SCENE_PARAMS.fontFamily.value}, system-ui, sans-serif`,
              fontSize: minDim * 0.028,
              fontWeight: 400,
              color: SCENE_PARAMS.secondaryTextColor.value,
              margin: 0,
            }}>
              {SCENE_PARAMS.artistName.value}
            </p>
          </div>
        </div>
        
        {/* ── PROGRESS BAR ── */}
        <div style={{ width: "100%", marginTop: minDim * 0.04 }}>
          <div style={{
            width: "100%",
            height: minDim * 0.006,
            backgroundColor: SCENE_PARAMS.progressTrackColor.value,
            borderRadius: minDim * 0.003,
            position: "relative",
          }}>
            {/* Fill */}
            <div style={{
              position: "absolute",
              left: 0, top: 0,
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: SCENE_PARAMS.progressBarColor.value,
              borderRadius: minDim * 0.003,
            }} />
            {/* Scrubber dot */}
            <div style={{
              position: "absolute",
              left: `${progressPercent}%`,
              top: "50%",
              width: minDim * 0.018,
              height: minDim * 0.018,
              backgroundColor: SCENE_PARAMS.progressBarColor.value,
              borderRadius: "50%",
              transform: `translate(-50%, -50%) scale(${scrubberScale})`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }} />
          </div>
        </div>
        
        {/* ── PLAYBACK CONTROLS ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: minDim * 0.05,
          marginTop: minDim * 0.04,
        }}>
          {/* Shuffle */}
          <div style={{
            width: controlSize, height: controlSize,
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: shufflePulse,
          }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.7} height={controlSize * 0.7}
              fill={SCENE_PARAMS.showShuffleActive.value ? SCENE_PARAMS.accentColor.value : SCENE_PARAMS.secondaryTextColor.value}>
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </div>

          {/* Previous */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.85} height={controlSize * 0.85} fill={SCENE_PARAMS.textColor.value}>
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </div>

          {/* Play/Pause */}
          <div style={{
            width: mainControlSize, height: mainControlSize,
            borderRadius: "50%",
            backgroundColor: SCENE_PARAMS.textColor.value,
            display: "flex", justifyContent: "center", alignItems: "center",
          }}>
            <svg viewBox="0 0 24 24" width={mainControlSize * 0.45} height={mainControlSize * 0.45} fill={SCENE_PARAMS.backgroundColor.value}>
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </div>

          {/* Next */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.85} height={controlSize * 0.85} fill={SCENE_PARAMS.textColor.value}>
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </div>

          {/* Repeat */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.7} height={controlSize * 0.7}
              fill={SCENE_PARAMS.showRepeatActive.value ? SCENE_PARAMS.accentColor.value : SCENE_PARAMS.secondaryTextColor.value}>
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};

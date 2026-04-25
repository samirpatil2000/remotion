import { useCurrentFrame, useVideoConfig, AbsoluteFill, Img } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const spotifyPlayerSchema = z.object({
  trackTitle: z.string(),
  artistName: z.string(),
  totalDuration: z.string(),
  vinylLabel: z.string(),
  fontFamily: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  secondaryTextColor: zColor(),
  accentColor: zColor(),
  progressBarColor: zColor(),
  progressTrackColor: zColor(),
  vinylColor: zColor(),
  scale: z.number().min(0.5).max(2).step(0.05),
  animationSpeed: z.number().min(0.5).max(2).step(0.1),
  rotationSpeed: z.number().min(0.1).max(3).step(0.1),
  marqueeSpeed: z.number().min(0.3).max(2).step(0.1),
  progressDuration: z.number().min(60).max(500).step(10),
  showShuffleActive: z.boolean(),
  showRepeatActive: z.boolean(),
});

export const defaultSpotifyPlayerProps: z.infer<typeof spotifyPlayerSchema> = {
  trackTitle: "You've Got The Love (Jamie xx Rework feat. The xx)",
  artistName: "Florence + The Machine, The xx, Jamie xx",
  totalDuration: "5:42",
  vinylLabel: "https://picsum.photos/seed/vinyl/800/800",
  fontFamily: "JetBrains Mono",
  backgroundColor: "#121212",
  textColor: "#FFFFFF",
  secondaryTextColor: "#B3B3B3",
  accentColor: "#1DB954",
  progressBarColor: "#FFFFFF",
  progressTrackColor: "#4D4D4D",
  vinylColor: "#1A1A1A",
  scale: 1,
  animationSpeed: 1,
  rotationSpeed: 0.4,
  marqueeSpeed: 0.8,
  progressDuration: 300,
  showShuffleActive: true,
  showRepeatActive: false,
};

export const Scene: React.FC<z.infer<typeof spotifyPlayerSchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = props.animationSpeed;
  const adjustedFrame = frame * speed;
  
  const isPortrait = height > width;
  const containerWidth = width * 0.88;
  const vinylSize = isPortrait ? containerWidth : height * 0.45;
  
  // Vinyl rotation - continuous smooth spin
  const rotationSpeed = props.rotationSpeed;
  const degreesPerFrame = (360 / fps) * rotationSpeed * 0.3;
  const vinylRotation = (adjustedFrame * degreesPerFrame) % 360;
  
  // Progress calculation
  const progressDuration = props.progressDuration;
  const playbackFrame = adjustedFrame;
  const progressPercent = Math.min(100, (playbackFrame / progressDuration) * 100);
  
  // Marquee calculation
  const titleContainerWidth = containerWidth;
  const charWidth = minDim * 0.018;
  const titleTextWidth = props.trackTitle.length * charWidth;
  const needsMarquee = titleTextWidth > titleContainerWidth * 0.9;
  
  const marqueeSpeed = props.marqueeSpeed;
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
  const shufflePulse = props.showShuffleActive 
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
      backgroundColor: props.backgroundColor,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: height * 0.08,
    }}>
      <div style={{
        transform: `scale(${props.scale})`,
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
          backgroundColor: props.vinylColor,
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
            {props.vinylLabel ? (
              <Img 
                src={props.vinylLabel} 
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
              backgroundColor: props.vinylColor,
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
                  background: `linear-gradient(to right, ${props.backgroundColor}, transparent)`,
                  zIndex: 2,
                  opacity: marqueeOffset < 0 ? 1 : 0,
                }} />
                {/* Right fade */}
                <div style={{
                  position: "absolute",
                  right: 0, top: 0, bottom: 0,
                  width: minDim * 0.05,
                  background: `linear-gradient(to left, ${props.backgroundColor}, transparent)`,
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
                fontFamily: `${props.fontFamily}, system-ui, sans-serif`,
                fontSize: minDim * 0.052,
                fontWeight: 700,
                color: props.textColor,
                margin: 0,
                letterSpacing: "-0.01em",
                paddingRight: needsMarquee ? gapWidth : 0,
              }}>
                {props.trackTitle}
              </h1>
              {/* Duplicate for seamless loop */}
              {needsMarquee && (
                <h1 style={{
                  fontFamily: `${props.fontFamily}, system-ui, sans-serif`,
                  fontSize: minDim * 0.052,
                  fontWeight: 700,
                  color: props.textColor,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}>
                  {props.trackTitle}
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
              fontFamily: `${props.fontFamily}, system-ui, sans-serif`,
              fontSize: minDim * 0.028,
              fontWeight: 400,
              color: props.secondaryTextColor,
              margin: 0,
            }}>
              {props.artistName}
            </p>
          </div>
        </div>
        
        {/* ── PROGRESS BAR ── */}
        <div style={{ width: "100%", marginTop: minDim * 0.04 }}>
          <div style={{
            width: "100%",
            height: minDim * 0.006,
            backgroundColor: props.progressTrackColor,
            borderRadius: minDim * 0.003,
            position: "relative",
          }}>
            {/* Fill */}
            <div style={{
              position: "absolute",
              left: 0, top: 0,
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: props.progressBarColor,
              borderRadius: minDim * 0.003,
            }} />
            {/* Scrubber dot */}
            <div style={{
              position: "absolute",
              left: `${progressPercent}%`,
              top: "50%",
              width: minDim * 0.018,
              height: minDim * 0.018,
              backgroundColor: props.progressBarColor,
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
              fill={props.showShuffleActive ? props.accentColor : props.secondaryTextColor}>
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </div>

          {/* Previous */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.85} height={controlSize * 0.85} fill={props.textColor}>
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </div>

          {/* Play/Pause */}
          <div style={{
            width: mainControlSize, height: mainControlSize,
            borderRadius: "50%",
            backgroundColor: props.textColor,
            display: "flex", justifyContent: "center", alignItems: "center",
          }}>
            <svg viewBox="0 0 24 24" width={mainControlSize * 0.45} height={mainControlSize * 0.45} fill={props.backgroundColor}>
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </div>

          {/* Next */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.85} height={controlSize * 0.85} fill={props.textColor}>
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </div>

          {/* Repeat */}
          <div style={{ width: controlSize, height: controlSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" width={controlSize * 0.7} height={controlSize * 0.7}
              fill={props.showRepeatActive ? props.accentColor : props.secondaryTextColor}>
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};

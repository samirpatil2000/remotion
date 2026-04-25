// Template: outsidelands-poster
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  fridayLabel: { type: "text", label: "Friday Label", value: "FRIDAY" },
  saturdayLabel: { type: "text", label: "Saturday Label", value: "SATURDAY" },
  sundayLabel: { type: "text", label: "Sunday Label", value: "SUNDAY" },
  fridayH1: { type: "text", label: "Fri H1", value: "CHARLI XCX" },
  fridayH2: { type: "text", label: "Fri H2", value: "TURNSTILE" },
  fridayH3: { type: "text", label: "Fri H3", value: "GRiZTRONICS" },
  fridayH4: { type: "text", label: "Fri H4", value: "LABRINTH" },
  fridayBody: { type: "multilineText", label: "Fri Undercard", value: "GLORILLA\nGEESE • CLIPSE\nMODEST MOUSE\nWET LEG • TINASHE\nSIERRA FERRELL\nHYPERBEAM (ODD MOB + OMNOM)\nTHE STORY SO FAR\nYØU$UK€ • ¥UKIMAT$U • KI/KI\nDURAND BERNARR\nALLEYCVT • DIE SPITZ • MPH\nGOLDIE BOUTILIER • DYLAN BRADY\nTOBIAHS • BILLIE MARTEN\nFAOUZIA • BAD NERVES\nLUKE ALESSI • CHEZILE\nSAWYER HILL • NEZZA • VERTIGO" },
  saturdayH1: { type: "text", label: "Sat H1", value: "THE STROKES" },
  saturdayH2: { type: "text", label: "Sat H2", value: "THE XX" },
  saturdayH3: { type: "text", label: "Sat H3", value: "DJO | DIJON" },
  saturdayH4: { type: "text", label: "Sat H4", value: "PINKPANTHERESS" },
  saturdayBody: { type: "multilineText", label: "Sat Undercard", value: "ETHEL CAIN\nLUCY DACUS\nMALCOLM TODD • LANE 8\nSNOW STRIPPERS\nIT'S MURPH • AUDREY HOBERT\nBEN BÖHMER\nDJ TRIXIE MATTEL • ŁASZEWO\nSIENNA SPIRO\nSULTAN + SHEPARD | SILVANA ESTRADA\nHAUTE & FREDDY • YARD ACT\nWUNDERHORSE • CAMOUFLY\nBANDALOS CHINOS • AFTER\nRIO KOSTA • AUTOMATIC\nRACING MOUNT PLEASANT • BAD JUUJU\n1-800 GIRLS • RED LEATHER • RYMAN" },
  sundayH1: { type: "text", label: "Sun H1", value: "RÜFÜS DU SOL" },
  sundayH2: { type: "text", label: "Sun H2", value: "BABY KEEM" },
  sundayH3: { type: "text", label: "Sun H3", value: "EMPIRE OF THE SUN" },
  sundayH4: { type: "text", label: "Sun H4", value: "DEATH CAB FOR CUTIE" },
  sundayBody: { type: "multilineText", label: "Sun Undercard", value: "DISCO LINES\nMARIAH THE SCIENTIST\nNOT FOR BORIS • RADIO BREJCHA\nTHE TEMPER TRAP • JADE\nKWN • BOYS NOIZE\nDESTIN CONRAD • KINGFISHR\nBALU BRIGADA • FROST CHILDREN\nMISS MONIQUE • CARLITA\nAMBLE • MOMMA\nINFINITY SONG • SPORTS\nMARLON FUNAKI • NIGHT TAPES\nX CLUB • JIM LEGXACY • SOSOCAMO\nDAY WE RAN • CRUZ BECKHAM • BRITTON\nDEATH CAB FOR CUTIE ☀️/🌙" },
  fontFamily: { type: "font", label: "Font", value: "Archivo Black" },
  undercardSize: { type: "number", label: "Undercard Font Size", value: 0.028, min: 0.01, max: 0.05, step: 0.001 },
  undercardLineHeight: { type: "number", label: "Undercard Line Height", value: 1.35, min: 0.8, max: 2, step: 0.05 },
  undercardLetterSpacing: { type: "number", label: "Undercard Letter Spacing", value: -0.02, min: -0.1, max: 0.1, step: 0.01 },
  columnWidth: { type: "number", label: "Col Width (%)", value: 32, min: 20, max: 50, step: 1 },
  columnHeight: { type: "number", label: "Col Height (%)", value: 93, min: 50, max: 150, step: 1 },
  backgroundColor: { type: "color", label: "Background", value: "#f8f7eb" },
  backgroundImage: { type: "image", label: "Background Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774394857806-ghpezky/ol26_mainadmat_030226_bg_withlandsend_3.png" },
  bgOpacity: { type: "number", label: "Image Opacity", value: 1, min: 0, max: 1, step: 0.1 },
  headerImage: { type: "image", label: "Top Logo Image", value: "data:image/png;base64,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" },
  headerHeight: { type: "number", label: "Top Logo Height (%)", value: 10, min: 5, max: 50, step: 1 },
  headerTop: { type: "number", label: "Top Logo Padding (%)", value: 8, min: 0, max: 30, step: 1 },
  contentTop: { type: "number", label: "Columns Y Position (%)", value: 53, min: 20, max: 80, step: 1 },
  navyColor: { type: "color", label: "Navy", value: "#0d212c" },
  fridayColor: { type: "color", label: "Fri Accent", value: "#bef724" },
  saturdayColor: { type: "color", label: "Sat Accent", value: "#fac832" },
  sundayColor: { type: "color", label: "Sun Accent", value: "#f498c0" },
  colOpacity: { type: "number", label: "Column Opacity", value: 0.5, min: 0, max: 1, step: 0.1 },
  footerImage: { type: "image", label: "Bottom Overlay Image", value: "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774394857806-ghpezky/image_7.png" },
  footerHeight: { type: "number", label: "Bottom Image Height (%)", value: 18, min: 5, max: 40, step: 1 },
  footerOpacity: { type: "number", label: "Bottom Image Opacity", value: 1, min: 0, max: 1, step: 0.1 },
  scale: { type: "number", label: "Scale", value: 0.4, min: 0.2, max: 1.5, step: 0.05 },
  animationSpeed: { type: "number", label: "Speed", value: 0.9, min: 0.5, max: 2, step: 0.1 },
  stagger: { type: "number", label: "Day Stagger", value: 23, min: 5, max: 40, step: 1 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;

  const totalColWidth = SCENE_PARAMS.columnWidth.value * 3;
  const containerWidth = width * (totalColWidth / 40);
  const containerHeight = height * 1.3;

  const logoProgress = spring({
    frame: Math.max(0, adjustedFrame - 5),
    fps,
    config: { damping: 20, stiffness: 90 }
  });

  const footerProgress = spring({
    frame: Math.max(0, adjustedFrame - 20),
    fps,
    config: { damping: 20, stiffness: 90 }
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
    }}>
      {SCENE_PARAMS.backgroundImage.value && (
        <Img 
          src={SCENE_PARAMS.backgroundImage.value}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: SCENE_PARAMS.bgOpacity.value,
            zIndex: 0
          }}
        />
      )}

      {SCENE_PARAMS.headerImage.value && (
        <div style={{
          position: "absolute",
          top: SCENE_PARAMS.headerTop.value + "%",
          left: "50%",
          width: "80%",
          height: SCENE_PARAMS.headerHeight.value + "%",
          opacity: logoProgress,
          transform: "translate(-50%, " + interpolate(logoProgress, [0, 1], [-30, 0], { extrapolateRight: "clamp" }) + "px)",
          zIndex: 15,
          display: "flex",
          justifyContent: "center"
        }}>
          <Img 
            src={SCENE_PARAMS.headerImage.value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "top center"
            }}
          />
        </div>
      )}

      <div style={{
        width: containerWidth,
        height: containerHeight,
        position: "absolute",
        top: SCENE_PARAMS.contentTop.value + "%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(" + SCENE_PARAMS.scale.value + ")",
        display: "flex",
        flexDirection: "row",
        gap: minDim * 0.015,
        zIndex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
      }}>
        <DayColumn 
          index={0} 
          label={SCENE_PARAMS.fridayLabel.value} 
          heads={[SCENE_PARAMS.fridayH1.value, SCENE_PARAMS.fridayH2.value, SCENE_PARAMS.fridayH3.value, SCENE_PARAMS.fridayH4.value]} 
          body={SCENE_PARAMS.fridayBody.value} 
          color={SCENE_PARAMS.fridayColor.value} 
          adjustedFrame={adjustedFrame}
        />
        <DayColumn 
          index={1} 
          label={SCENE_PARAMS.saturdayLabel.value} 
          heads={[SCENE_PARAMS.saturdayH1.value, SCENE_PARAMS.saturdayH2.value, SCENE_PARAMS.saturdayH3.value, SCENE_PARAMS.saturdayH4.value]} 
          body={SCENE_PARAMS.saturdayBody.value} 
          color={SCENE_PARAMS.saturdayColor.value} 
          adjustedFrame={adjustedFrame}
        />
        <DayColumn 
          index={2} 
          label={SCENE_PARAMS.sundayLabel.value} 
          heads={[SCENE_PARAMS.sundayH1.value, SCENE_PARAMS.sundayH2.value, SCENE_PARAMS.sundayH3.value, SCENE_PARAMS.sundayH4.value]} 
          body={SCENE_PARAMS.sundayBody.value} 
          color={SCENE_PARAMS.sundayColor.value} 
          adjustedFrame={adjustedFrame}
        />
      </div>

      {SCENE_PARAMS.footerImage.value && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: SCENE_PARAMS.footerHeight.value + "%",
          opacity: SCENE_PARAMS.footerOpacity.value,
          transform: "translateY(" + interpolate(footerProgress, [0, 1], [100, 0], { extrapolateRight: "clamp" }) + "%)",
          zIndex: 10
        }}>
          <Img 
            src={SCENE_PARAMS.footerImage.value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "bottom center"
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
}

function DayColumn({ index, label, heads, body, color, adjustedFrame }) {
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const dayDelay = index * SCENE_PARAMS.stagger.value;
  
  const columnSpring = spring({
    frame: Math.max(0, adjustedFrame - dayDelay),
    fps,
    config: { damping: 20, stiffness: 100 }
  });

  const lines = body.split("\n");
  const hexToRgb = (hex) => {
    if (!hex || hex.charAt(0) !== '#') return '248, 247, 235';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return r + ", " + g + ", " + b;
  };

  return (
    <div style={{
      flex: "0 0 " + SCENE_PARAMS.columnWidth.value + "%",
      height: SCENE_PARAMS.columnHeight.value + "%",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      border: (minDim * 0.005) + "px solid " + SCENE_PARAMS.navyColor.value,
      borderRadius: minDim * 0.05,
      opacity: columnSpring,
      transform: "translateY(" + interpolate(columnSpring, [0, 1], [30, 0], { extrapolateRight: "clamp" }) + "px)",
      position: "relative",
      backgroundColor: "rgba(" + hexToRgb(SCENE_PARAMS.backgroundColor.value) + ", " + SCENE_PARAMS.colOpacity.value + ")",
      backdropFilter: "blur(8px)",
      overflow: "visible"
    }}>
      <div style={{
        position: "absolute",
        top: -minDim * 0.02,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: SCENE_PARAMS.navyColor.value,
        color: "white",
        padding: (minDim * 0.015) + "px " + (minDim * 0.07) + "px",
        borderRadius: minDim * 0.015,
        fontSize: minDim * 0.03,
        fontWeight: 900,
        letterSpacing: "0.25em",
        zIndex: 10,
        whiteSpace: "nowrap",
        fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {label}
      </div>

      <div style={{
        padding: (minDim * 0.1) + "px " + (minDim * 0.03) + "px " + (minDim * 0.04) + "px",
        display: "flex",
        flexDirection: "column",
        gap: minDim * 0.01,
        flex: 1
      }}>
        {heads.map((text, i) => {
          const isSunday = index === 2;
          const headSize = isSunday && i >= 2 ? 0.045 : (i === 0 ? 0.09 : i === 1 ? 0.07 : 0.055);
          return (
            <HeadlinerText 
              key={i} 
              text={text} 
              color={color} 
              size={headSize} 
              delay={dayDelay + 10 + i * 5} 
              frame={adjustedFrame} 
            />
          );
        })}

        <div style={{
          marginTop: minDim * 0.04,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: minDim * 0.003,
          flex: 1,
          justifyContent: "flex-start",
          fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
        }}>
          {lines.map((line, i) => {
            const lineOpacity = spring({
              frame: Math.max(0, adjustedFrame - (dayDelay + 30 + i * 2)),
              fps,
              config: { damping: 20, stiffness: 150 }
            });

            return (
              <div key={i} style={{
                fontSize: minDim * SCENE_PARAMS.undercardSize.value,
                color: SCENE_PARAMS.navyColor.value,
                fontWeight: 900,
                opacity: lineOpacity,
                transform: "scale(" + interpolate(lineOpacity, [0, 1], [0.98, 1], { extrapolateRight: "clamp" }) + ")",
                lineHeight: SCENE_PARAMS.undercardLineHeight.value,
                letterSpacing: SCENE_PARAMS.undercardLetterSpacing.value + "em",
                textTransform: "uppercase",
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                textAlign: "center",
                width: "100%",
                display: "block"
              }}>
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HeadlinerText({ text, color, size, delay, frame }) {
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const pop = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 180 }
  });
  const outlineColor = SCENE_PARAMS.navyColor.value;
  const shadowSize = minDim * 0.005;
  return (
    <div style={{
      textAlign: "center",
      opacity: pop,
      transform: "scale(" + interpolate(pop, [0, 1], [0.85, 1], { extrapolateRight: "clamp" }) + ")",
      margin: (minDim * 0.008) + "px 0",
      fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
    }}>
      <div style={{
        fontSize: minDim * size,
        lineHeight: 0.95,
        fontWeight: 900,
        color: color,
        textTransform: "uppercase",
        letterSpacing: "-0.05em",
        textShadow: (minDim * 0.003) + "px " + (minDim * 0.003) + "px 0 " + outlineColor + ", " + "-" + (minDim * 0.0015) + "px -" + (minDim * 0.0015) + "px 0 " + outlineColor + ", " + (minDim * 0.0015) + "px -" + (minDim * 0.0015) + "px 0 " + outlineColor + ", " + "-" + (minDim * 0.0015) + "px " + (minDim * 0.0015) + "px 0 " + outlineColor + ", " + shadowSize + "px " + shadowSize + "px 0 " + outlineColor,
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif"
      }}>
        {text}
      </div>
    </div>
  );
}

export default Scene;

Here's the full Remotion scene code extracted from this response:

```jsx
const SCENE_PARAMS = {
  // Text content
  smallText: { type: "text", label: "Small Text", value: "the" },
  mainText: { type: "text", label: "Main Text", value: "future" },
  subText: { type: "text", label: "Sub Text", value: "of design" },
  
  // Colors
  textColor: { type: "color", label: "Text Color", value: "#FFFFFF" },
  glowColor: { type: "color", label: "Glow Color", value: "#FFFFFF" },
  
  // Transform
  scale: { type: "number", label: "Scale", value: 1.45, min: 0.5, max: 2, step: 0.05 },
  
  // Animation
  animationSpeed: { type: "number", label: "Animation Speed", value: 0.6, min: 0.5, max: 2, step: 0.1 },
  blurAmount: { type: "number", label: "Initial Blur", value: 30, min: 0, max: 50, step: 5 },
  slideDistance: { type: "number", label: "Slide Distance", value: 400, min: 50, max: 400, step: 25 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 6, min: 0, max: 10, step: 1 },
  
  // Style
  letterSpacing: { type: "number", label: "Letter Spacing", value: -2, min: -20, max: 10, step: 2 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  
  // Main "future" text — blur + slide from left
  const mainProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 22, stiffness: 70 },
  });
  
  const mainX      = interpolate(mainProgress, [0, 1], [-SCENE_PARAMS.slideDistance.value, 0]);
  const mainBlur   = interpolate(mainProgress, [0, 0.6, 1], [SCENE_PARAMS.blurAmount.value, 5, 0]);
  const mainOpacity = interpolate(mainProgress, [0, 0.3, 1], [0, 0.8, 1]);
  
  // Secondary text ("the" + "of design") — delayed fade/slide
  const textDelay = 15;
  const secondaryProgress = spring({
    frame: Math.max(0, adjustedFrame - textDelay),
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  
  const secondaryY = interpolate(secondaryProgress, [0, 1], [20, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${scaleValue})`,
        transformOrigin: "center center",
        position: "relative",
        width: "100%",
        maxWidth: minDim * 0.8,
      }}>
        <div style={{ position: "relative" }}>

          {/* Small "the" — floats above the "u" in "future" */}
          <div style={{
            position: "absolute",
            color: SCENE_PARAMS.textColor.value,
            fontSize: minDim * 0.055,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            opacity: secondaryProgress * 0.8,
            transform: `translateY(${secondaryY}px)`,
            letterSpacing: 1,
            top: minDim * -0.04,
            left: "50%",
            marginLeft: minDim * -0.11,
          }}>
            {SCENE_PARAMS.smallText.value}
          </div>

          {/* Main "future" — italic serif, blur + slide in from left */}
          <h1 style={{
            color: SCENE_PARAMS.textColor.value,
            fontSize: minDim * 0.18,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            margin: 0,
            letterSpacing: `${SCENE_PARAMS.letterSpacing.value}px`,
            opacity: mainOpacity,
            transform: `translateX(${mainX}px)`,
            filter: `blur(${mainBlur}px) drop-shadow(0 0 ${SCENE_PARAMS.glowIntensity.value}px ${SCENE_PARAMS.glowColor.value})`,
            textShadow: `0 0 ${SCENE_PARAMS.glowIntensity.value * 0.5}px ${SCENE_PARAMS.glowColor.value}`,
            textAlign: "center",
          }}>
            {SCENE_PARAMS.mainText.value}
          </h1>

          {/* Sub text "of design" — slides up from below */}
          <div style={{
            color: SCENE_PARAMS.textColor.value,
            fontSize: minDim * 0.042,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            marginTop: minDim * -0.015,
            opacity: secondaryProgress * 0.9,
            transform: `translateY(${-secondaryY}px)`,
            letterSpacing: minDim * 0.008,
            textAlign: "center",
          }}>
            {SCENE_PARAMS.subText.value}
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
}
```

And the composition to wire it up:

```jsx
import { Composition } from "remotion";

export const RemotionRoot = () => (
  <Composition
    id="FutureOfDesign"
    component={Scene}
    durationInFrames={150}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      backgroundColor: "#0f172a",
    }}
  />
);
```

**Key differences from the Spotify template:**

- Much shorter — only **150 frames (5 seconds)** vs 300
- Uses Remotion's `spring()` and `interpolate()` for physics-based easing rather than manual frame math
- No images — pure typography only
- The main word slides in from the **left** with a blur dissolve
- "the" and "of design" animate on a **15-frame delay**, sliding in from opposite vertical directions
- Background is `#0f172a` (dark slate), scene itself has no background so it works as an **overlay**
- Used **3,978 times** — nearly 3× more popular than the Spotify one
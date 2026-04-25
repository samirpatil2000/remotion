// Template: notion-animated-hub
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  brandName: { type: "text", label: "Brand Name", value: "Notion" },
  pageTitle: { type: "text", label: "Page Title", value: "Project Hub" },
  subTitle: { type: "text", label: "Subtitle", value: "Everything your team needs in one place" },
  actionText: { type: "text", label: "Action Text", value: "Start with a template" },
  navItem1: { type: "text", label: "Nav Item 1", value: "Home" },
  navItem2: { type: "text", label: "Nav Item 2", value: "Docs" },
  navItem3: { type: "text", label: "Nav Item 3", value: "Tasks" },
  navItem4: { type: "text", label: "Nav Item 4", value: "Calendar" },
  navItem5: { type: "text", label: "Nav Item 5", value: "Settings" },

  logoImage: { type: "image", label: "Logo Image", value: "data:image/png;base64,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" },
  icon1: { type: "image", label: "Icon 1", value: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png" },
  icon2: { type: "image", label: "Icon 2", value: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png" },
  icon3: { type: "image", label: "Icon 3", value: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png" },
  icon4: { type: "image", label: "Icon 4", value: "https://cdn-icons-png.flaticon.com/512/747/747310.png" },
  icon5: { type: "image", label: "Icon 5", value: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png" },

  brandFont: { type: "font", label: "Brand Font", value: "Space Grotesk" },
  uiFont: { type: "font", label: "UI Font", value: "DM Sans" },

  backgroundColor: { type: "color", label: "Background", value: "#ffffff" },
  textColor: { type: "color", label: "Primary Text", value: "#111827" },
  secondaryColor: { type: "color", label: "Secondary Text", value: "#6b7280" },
  accentColor: { type: "color", label: "Accent", value: "#3b82f6" },

  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay (frames)", value: 8, min: 2, max: 20, step: 1 },
  entranceOffset: { type: "number", label: "Entrance Distance", value: 25, min: 10, max: 50, step: 5 },
  blur: { type: "number", label: "Blur Amount", value: 0, min: 0, max: 20, step: 1 },
  rotation: { type: "number", label: "Rotation", value: 0, min: -180, max: 180, step: 5 },
  opacity: { type: "number", label: "Max Opacity", value: 1, min: 0, max: 1, step: 0.05 }
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const minDim = Math.min(width, height);
  const adjustedFrame = frame * SCENE_PARAMS.animationSpeed.value;
  const isPortrait = height > width;

  const brandProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 90 } });
  const brandY = interpolate(brandProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const navItems = [
    { label: SCENE_PARAMS.navItem1.value, icon: SCENE_PARAMS.icon1.value },
    { label: SCENE_PARAMS.navItem2.value, icon: SCENE_PARAMS.icon2.value },
    { label: SCENE_PARAMS.navItem3.value, icon: SCENE_PARAMS.icon3.value },
    { label: SCENE_PARAMS.navItem4.value, icon: SCENE_PARAMS.icon4.value },
    { label: SCENE_PARAMS.navItem5.value, icon: SCENE_PARAMS.icon5.value }
  ];

  const titleProgress = spring({ frame: Math.max(0, adjustedFrame - 18), fps, config: { damping: 20, stiffness: 90 } });
  const titleY = interpolate(titleProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const subProgress = spring({ frame: Math.max(0, adjustedFrame - 26), fps, config: { damping: 20, stiffness: 90 } });
  const subY = interpolate(subProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const actionProgress = spring({ frame: Math.max(0, adjustedFrame - 34), fps, config: { damping: 20, stiffness: 90 } });
  const actionY = interpolate(actionProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const logoProgress = spring({ frame: Math.max(0, adjustedFrame - 6), fps, config: { damping: 20, stiffness: 90 } });
  const logoY = interpolate(logoProgress, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });

  const blurValue = (p) => "blur(" + ((1 - p) * SCENE_PARAMS.blur.value).toFixed(2) + "px)";

  const sidebarLeft = isPortrait ? width * 0.08 : width * 0.06;
  const contentLeft = isPortrait ? width * 0.33 : width * 0.28;

  return (
    <AbsoluteFill style={{ backgroundColor: SCENE_PARAMS.backgroundColor.value }}>
      <div style={{ transform: "scale(" + SCENE_PARAMS.scale.value + ")", transformOrigin: "center center" }}>
        <div style={{ position: "absolute", top: height * 0.08, left: sidebarLeft, display: "flex", alignItems: "center", gap: minDim * 0.015 }}>
          <Img
            src={SCENE_PARAMS.logoImage.value}
            style={{
              width: minDim * 0.06,
              height: minDim * 0.06,
              objectFit: "cover",
              opacity: logoProgress * SCENE_PARAMS.opacity.value,
              transform: "translateY(" + logoY + "px)",
              filter: blurValue(logoProgress)
            }}
          />
          <div style={{
            fontFamily: SCENE_PARAMS.brandFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.07,
            fontWeight: 700,
            color: SCENE_PARAMS.textColor.value,
            opacity: brandProgress * SCENE_PARAMS.opacity.value,
            transform: "translateY(" + brandY + "px) rotate(" + SCENE_PARAMS.rotation.value + "deg)",
            filter: blurValue(brandProgress)
          }}>
            {SCENE_PARAMS.brandName.value}
          </div>
        </div>

        <div style={{ position: "absolute", top: height * 0.20, left: sidebarLeft }}>
          {navItems.map((item, i) => {
            const delay = 12 + i * SCENE_PARAMS.staggerDelay.value;
            const p = spring({ frame: Math.max(0, adjustedFrame - delay), fps, config: { damping: 20, stiffness: 90 } });
            const y = interpolate(p, [0, 1], [SCENE_PARAMS.entranceOffset.value, 0], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: minDim * 0.015,
                marginBottom: minDim * 0.018,
                opacity: p * SCENE_PARAMS.opacity.value,
                transform: "translateY(" + y + "px)",
                filter: blurValue(p)
              }}>
                <Img
                  src={item.icon}
                  style={{
                    width: minDim * 0.028,
                    height: minDim * 0.028,
                    objectFit: "contain",
                    opacity: p * SCENE_PARAMS.opacity.value
                  }}
                />
                <div style={{
                  fontFamily: SCENE_PARAMS.uiFont.value + ", system-ui, sans-serif",
                  fontSize: minDim * 0.032,
                  fontWeight: 500,
                  color: i === 0 ? SCENE_PARAMS.textColor.value : SCENE_PARAMS.secondaryColor.value
                }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ position: "absolute", top: height * 0.26, left: contentLeft, right: width * 0.08 }}>
          <div style={{
            fontFamily: SCENE_PARAMS.uiFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.085,
            fontWeight: 700,
            color: SCENE_PARAMS.textColor.value,
            lineHeight: 1.05,
            opacity: titleProgress * SCENE_PARAMS.opacity.value,
            transform: "translateY(" + titleY + "px)",
            filter: blurValue(titleProgress)
          }}>
            {SCENE_PARAMS.pageTitle.value}
          </div>
          <div style={{
            marginTop: minDim * 0.025,
            fontFamily: SCENE_PARAMS.uiFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.04,
            fontWeight: 500,
            color: SCENE_PARAMS.secondaryColor.value,
            opacity: subProgress * SCENE_PARAMS.opacity.value,
            transform: "translateY(" + subY + "px)",
            filter: blurValue(subProgress)
          }}>
            {SCENE_PARAMS.subTitle.value}
          </div>
          <div style={{
            marginTop: minDim * 0.035,
            fontFamily: SCENE_PARAMS.uiFont.value + ", system-ui, sans-serif",
            fontSize: minDim * 0.038,
            fontWeight: 600,
            color: SCENE_PARAMS.accentColor.value,
            opacity: actionProgress * SCENE_PARAMS.opacity.value,
            transform: "translateY(" + actionY + "px)",
            filter: blurValue(actionProgress)
          }}>
            {SCENE_PARAMS.actionText.value}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;

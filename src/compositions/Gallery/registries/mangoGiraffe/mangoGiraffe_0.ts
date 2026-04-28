import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_0: CompositionDef[] = [
  {
    id: "MangoGiraffe2026",
    title: "2026",
    description: "A versatile and high-quality motion design composition featuring 2026.",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/2026/Scene").then(m => m.Scene),
    defaultProps: {
        "displayText": 2026,
        "fontFamily": "Inter",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "blockSize": 14,
        "transitionStart": 50,
        "transitionDuration": 20,
        "flickerEnabled": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "displayText",
            "label": "Display Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "blockSize",
            "label": "ASCII Density",
            "type": "number",
            "group": "General",
            "min": 8,
            "max": 25,
            "step": 1
        },
        {
            "key": "transitionStart",
            "label": "ASCII Transition Start",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 100,
            "step": 5
        },
        {
            "key": "transitionDuration",
            "label": "Transition Length",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 60,
            "step": 5
        },
        {
            "key": "flickerEnabled",
            "label": "Digital Flicker",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffe3dCube",
    title: "3d-cube",
    description: "A visually stunning abstract motion graphic showcasing 3d Cube.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/3d-cube/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "CSS 3D Transform",
        "frontLabel": "FRONT",
        "backLabel": "BACK",
        "rightLabel": "RIGHT",
        "leftLabel": "LEFT",
        "topLabel": "TOP",
        "bottomLabel": "BOTTOM",
        "backgroundColor": "#111827",
        "textColor": "#f3f4f6",
        "frontColor": "#3b82f6",
        "backColor": "#8b5cf6",
        "rightColor": "#ec4899",
        "leftColor": "#f59e0b",
        "topColor": "#10b981",
        "bottomColor": "#ef4444",
        "scale": 1,
        "rotationSpeedX": 1.5,
        "rotationSpeedY": 2
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "title",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "frontLabel",
            "label": "Front Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "backLabel",
            "label": "Back Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "rightLabel",
            "label": "Right Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "leftLabel",
            "label": "Left Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "topLabel",
            "label": "Top Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomLabel",
            "label": "Bottom Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "frontColor",
            "label": "Front Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backColor",
            "label": "Back Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "rightColor",
            "label": "Right Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "leftColor",
            "label": "Left Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "topColor",
            "label": "Top Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bottomColor",
            "label": "Bottom Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "rotationSpeedX",
            "label": "Rotation Speed X",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 4,
            "step": 0.5
        },
        {
            "key": "rotationSpeedY",
            "label": "Rotation Speed Y",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 4,
            "step": 0.5
        }
    ],
  },
  {
    id: "MangoGiraffeAStoryAboutTheWorld",
    title: "AStoryAboutTheWorld",
    description: "An engaging social media-inspired animation for A Story About The World.",
    color: "#505905",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/AStoryAboutTheWorld/Scene").then(m => m.Scene),
    defaultProps: {
        "scene1Word1": "In the",
        "scene1Word2": "beginning",
        "scene2Word1": "SILENCE",
        "scene3Words": "then,came,LIGHT",
        "scene4Word": "OCEANS",
        "scene5Word1": "LIFE",
        "scene5Word2": "emerged",
        "scene6Words": "we,ARRIVED",
        "scene7Word1": "and now",
        "scene7Word2": "we wonder",
        "headingFont": "Playfair Display",
        "bodyFont": "DM Sans",
        "backgroundColor": "#f8fafc",
        "textColor": "#1e293b",
        "accentColor": "#64748b",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "scene1Word1",
            "label": "Scene 1 - Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene1Word2",
            "label": "Scene 1 - Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene2Word1",
            "label": "Scene 2 - Word",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene3Words",
            "label": "Scene 3 - Grid Words",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene4Word",
            "label": "Scene 4 - Single",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene5Word1",
            "label": "Scene 5 - Flash",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene5Word2",
            "label": "Scene 5 - Reveal",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene6Words",
            "label": "Scene 6 - Stack",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene7Word1",
            "label": "Scene 7 - Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene7Word2",
            "label": "Scene 7 - Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headingFont",
            "label": "Heading Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "bodyFont",
            "label": "Body Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeAnimateCharacters",
    title: "AnimateCharacters",
    description: "A dynamic typography design featuring Animate Characters.",
    color: "#205b0d",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/AnimateCharacters/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Magic Horse",
        "subtitle": "A mystical journey",
        "fontFamily": "Roboto",
        "backgroundColor": "#0c0a1d",
        "accentColor": "#a855f7",
        "secondaryGlow": "#3b82f6",
        "horseColor": "#e2e8f0",
        "textColor": "#f8fafc",
        "scale": 1,
        "animationSpeed": 1,
        "sparkleIntensity": 1,
        "glowIntensity": 1,
        "showTitle": true,
        "showSparkles": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "title",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "subtitle",
            "label": "Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent/Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryGlow",
            "label": "Secondary Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "horseColor",
            "label": "Horse Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "sparkleIntensity",
            "label": "Sparkle Intensity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "showTitle",
            "label": "Show Title",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showSparkles",
            "label": "Show Sparkles",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeMotivational",
    title: "motivational",
    description: "A dynamic typography design featuring Motivational.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/Motivational/Scene").then(m => m.Scene),
    defaultProps: {
        "word1": "The",
        "word2": "Big",
        "word3": "Idea",
        "fontFamily": "Bebas Neue",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "accentColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 10,
        "entranceOffset": 22,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "word1",
            "label": "Word 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "word2",
            "label": "Word 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "word3",
            "label": "Word 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Primary",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeStorytime",
    title: "storytime",
    description: "An engaging social media-inspired animation for Storytime.",
    color: "#15414f",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/Storytime/Scene").then(m => m.Scene),
    defaultProps: {
        "heroText1": "DAY 5",
        "fearQuote": "What will people think?",
        "openingLine": "One thought keeps coming back…",
        "critic1": "It’s a waste of time.",
        "critic2": "Just quit it.",
        "critic3": "They’ll laugh when they see it.",
        "truthIntro": "But the truth is —",
        "truthMain": "if I had never started because I feared people,",
        "truthPunch": "I wouldn’t be here today.",
        "dreamLine": "Most dreams end with this one thought.",
        "closingLine": "I’m moving beyond that fear.",
        "ctaIntro": "If you’ve ever stopped because of this fear,",
        "ctaText": "follow.",
        "tagline": "The journey continues.",
        "fontFamily": "Roboto",
        "backgroundColor1": "#0A0A0B",
        "backgroundColor2": "#1A1A1E",
        "primaryColor": "#FFFFFF",
        "emphasisColor": "#F5E6D3",
        "mutedColor": "#6B6B6B",
        "scale": 1,
        "animationSpeed": 0.6,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "heroText1",
            "label": "Day Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fearQuote",
            "label": "Fear Quote",
            "type": "text",
            "group": "General"
        },
        {
            "key": "openingLine",
            "label": "Opening Line",
            "type": "text",
            "group": "General"
        },
        {
            "key": "critic1",
            "label": "Critic 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "critic2",
            "label": "Critic 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "critic3",
            "label": "Critic 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "truthIntro",
            "label": "Truth Intro",
            "type": "text",
            "group": "General"
        },
        {
            "key": "truthMain",
            "label": "Truth Main",
            "type": "text",
            "group": "General"
        },
        {
            "key": "truthPunch",
            "label": "Truth Punch",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dreamLine",
            "label": "Dream Line",
            "type": "text",
            "group": "General"
        },
        {
            "key": "closingLine",
            "label": "Closing Line",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ctaIntro",
            "label": "CTA Intro",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ctaText",
            "label": "CTA",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tagline",
            "label": "Tagline",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor1",
            "label": "Background Dark",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundColor2",
            "label": "Background Light",
            "type": "color",
            "group": "General"
        },
        {
            "key": "primaryColor",
            "label": "Primary Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "emphasisColor",
            "label": "Emphasis Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "mutedColor",
            "label": "Muted Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeAStormOfInfo",
    title: "a-storm-of-info",
    description: "A versatile and high-quality motion design composition featuring A Storm Of Info.",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/a-storm-of-info/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#ffffff",
        "accentColor": "#3b82f6",
        "candleGreen": "#22c55e",
        "candleRed": "#ef4444",
        "clockColor": "#94a3b8",
        "coinColor": "#fbbf24",
        "lineColor": "#64748b",
        "scale": 1,
        "animationSpeed": 1,
        "chaosIntensity": 1,
        "glowIntensity": 0.6
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "candleGreen",
            "label": "Bullish Candle",
            "type": "color",
            "group": "General"
        },
        {
            "key": "candleRed",
            "label": "Bearish Candle",
            "type": "color",
            "group": "General"
        },
        {
            "key": "clockColor",
            "label": "Clock Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "coinColor",
            "label": "Coin Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lineColor",
            "label": "Lines Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "chaosIntensity",
            "label": "Chaos Intensity",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 1.5,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 1,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeAStoryAboutTheWorld",
    title: "a-story-about-the-world",
    description: "An engaging social media-inspired animation for A Story About The World.",
    color: "#387c04",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/a-story-about-the-world/Scene").then(m => m.Scene),
    defaultProps: {
        "scene1Word1": "In the",
        "scene1Word2": "beginning",
        "scene2Word1": "SILENCE",
        "scene3Words": "then,came,LIGHT",
        "scene4Word": "OCEANS",
        "scene5Word1": "LIFE",
        "scene5Word2": "emerged",
        "scene6Words": "we,ARRIVED",
        "scene7Word1": "and now",
        "scene7Word2": "we wonder",
        "headingFont": "Playfair Display",
        "bodyFont": "DM Sans",
        "backgroundColor": "#f8fafc",
        "textColor": "#1e293b",
        "accentColor": "#64748b",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "scene1Word1",
            "label": "Scene 1 - Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene1Word2",
            "label": "Scene 1 - Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene2Word1",
            "label": "Scene 2 - Word",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene3Words",
            "label": "Scene 3 - Grid Words",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene4Word",
            "label": "Scene 4 - Single",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene5Word1",
            "label": "Scene 5 - Flash",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene5Word2",
            "label": "Scene 5 - Reveal",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene6Words",
            "label": "Scene 6 - Stack",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene7Word1",
            "label": "Scene 7 - Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "scene7Word2",
            "label": "Scene 7 - Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headingFont",
            "label": "Heading Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "bodyFont",
            "label": "Body Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeAdSpend",
    title: "ad-spend",
    description: "A versatile and high-quality motion design composition featuring Ad Spend.",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/ad-spend/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "AD spent",
        "amount": "MAD 60,000.00",
        "toggleLeft": "Daily",
        "toggleRight": "Weekly",
        "tooltipText": "Thursday – 50 Orders ",
        "dayMon": "Mon",
        "dayTue": "Tue",
        "dayWed": "Wed",
        "dayThu": "Thu",
        "dayFri": "Fri",
        "daySat": "Sat",
        "daySun": "Sun",
        "headingFont": "Manrope",
        "bodyFont": "DM Sans",
        "backgroundColor": "#0f0f0f",
        "cardColor": "#232323",
        "cardGlow": "#2b2b2b",
        "textColor": "#f3f4f6",
        "secondaryText": "#a1a1aa",
        "gridColor": "#2f2f2f",
        "barColor": "#3a3a3a",
        "accentStart": "#ff6a00",
        "accentEnd": "#ff3c00",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "title",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "amount",
            "label": "Amount",
            "type": "text",
            "group": "General"
        },
        {
            "key": "toggleLeft",
            "label": "Toggle Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "toggleRight",
            "label": "Toggle Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tooltipText",
            "label": "Tooltip",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dayMon",
            "label": "Mon",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dayTue",
            "label": "Tue",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dayWed",
            "label": "Wed",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dayThu",
            "label": "Thu",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dayFri",
            "label": "Fri",
            "type": "text",
            "group": "General"
        },
        {
            "key": "daySat",
            "label": "Sat",
            "type": "text",
            "group": "General"
        },
        {
            "key": "daySun",
            "label": "Sun",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headingFont",
            "label": "Heading Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "bodyFont",
            "label": "Body Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor",
            "label": "Card",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardGlow",
            "label": "Card Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryText",
            "label": "Secondary",
            "type": "color",
            "group": "General"
        },
        {
            "key": "gridColor",
            "label": "Grid",
            "type": "color",
            "group": "General"
        },
        {
            "key": "barColor",
            "label": "Bar",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentStart",
            "label": "Accent Start",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentEnd",
            "label": "Accent End",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeAlarmToggle1",
    title: "alarm-toggle-1",
    description: "A professional UI/UX animation showcasing Alarm Toggle 1.",
    color: "#9003ba",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/alarm-toggle-1/Scene").then(m => m.Scene),
    defaultProps: {
        "alarmTime": "9:40",
        "amPm": "AM",
        "alarmLabel": "Alarm",
        "fontFamily": "Open Sans",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "textOffColor": "#6b7280",
        "toggleOnColor": "#22c55e",
        "toggleOffColor": "#3f3f46",
        "toggleKnobColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1,
        "toggleStartFrame": 30
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "alarmTime",
            "label": "Alarm Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "amPm",
            "label": "AM/PM",
            "type": "text",
            "group": "General"
        },
        {
            "key": "alarmLabel",
            "label": "Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textOffColor",
            "label": "Text Off Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "toggleOnColor",
            "label": "Toggle On Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "toggleOffColor",
            "label": "Toggle Off Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "toggleKnobColor",
            "label": "Toggle Knob",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "toggleStartFrame",
            "label": "Toggle Start Frame",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 60,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeAnimateCharacters",
    title: "animate-characters",
    description: "A dynamic typography design featuring Animate Characters.",
    color: "#f280d8",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/animate-characters/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Magic Horse",
        "subtitle": "A mystical journey",
        "fontFamily": "Roboto",
        "backgroundColor": "#0c0a1d",
        "accentColor": "#a855f7",
        "secondaryGlow": "#3b82f6",
        "horseColor": "#e2e8f0",
        "textColor": "#f8fafc",
        "scale": 1,
        "animationSpeed": 1,
        "sparkleIntensity": 1,
        "glowIntensity": 1,
        "showTitle": true,
        "showSparkles": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "title",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "subtitle",
            "label": "Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent/Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryGlow",
            "label": "Secondary Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "horseColor",
            "label": "Horse Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "sparkleIntensity",
            "label": "Sparkle Intensity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "showTitle",
            "label": "Show Title",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showSparkles",
            "label": "Show Sparkles",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeAnimateNetflixLogo",
    title: "animate-netflix-logo",
    description: "An engaging social media-inspired animation for Animate Netflix Logo.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/animate-netflix-logo/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "NETFLIX",
        "fontFamily": "Oswald",
        "backgroundColor": "#000000",
        "primaryColor": "#e50914",
        "accentColor": "#e50914",
        "shadowColor": "#b20710",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "logoText",
            "label": "Logo Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "primaryColor",
            "label": "Primary",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shadowColor",
            "label": "Shadow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeAnimatedAppList",
    title: "animated-app-list",
    description: "A professional UI/UX animation showcasing Animated App List.",
    color: "#505905",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/animated-app-list/Scene").then(m => m.Scene),
    defaultProps: {
        "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        "profileSize": 0.15,
        "profileBorderWidth": 4,
        "profileBorderColor": "#ffffff",
        "card1Title": "Messages",
        "card1Subtitle": "3 new conversations",
        "card2Title": "Calendar",
        "card2Subtitle": "2 upcoming events",
        "card3Title": "Photos",
        "card3Subtitle": "128 memories",
        "card4Title": "Music",
        "card4Subtitle": "Now playing",
        "card5Title": "Fitness",
        "card5Subtitle": "Goal: 10,000 steps",
        "card6Title": "Weather",
        "card6Subtitle": "Sunny, 72°F",
        "fontFamily": "Open Sans",
        "backgroundColor": "#f8fafc",
        "cardBackground": "#ffffff",
        "accentColor": "#3b82f6",
        "titleColor": "#0f172a",
        "subtitleColor": "#64748b",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 80,
        "scrollAmount": 120,
        "borderRadius": 16,
        "shadowIntensity": 0.08
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "profileImage",
            "label": "Profile Image",
            "type": "image",
            "group": "General"
        },
        {
            "key": "profileSize",
            "label": "Profile Size",
            "type": "number",
            "group": "General",
            "min": 0.08,
            "max": 0.25,
            "step": 0.01
        },
        {
            "key": "profileBorderWidth",
            "label": "Border Width",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 1
        },
        {
            "key": "profileBorderColor",
            "label": "Profile Border",
            "type": "color",
            "group": "General"
        },
        {
            "key": "card1Title",
            "label": "Card 1 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card1Subtitle",
            "label": "Card 1 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card2Title",
            "label": "Card 2 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card2Subtitle",
            "label": "Card 2 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card3Title",
            "label": "Card 3 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card3Subtitle",
            "label": "Card 3 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card4Title",
            "label": "Card 4 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card4Subtitle",
            "label": "Card 4 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card5Title",
            "label": "Card 5 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card5Subtitle",
            "label": "Card 5 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card6Title",
            "label": "Card 6 Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "card6Subtitle",
            "label": "Card 6 Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardBackground",
            "label": "Card Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "titleColor",
            "label": "Title Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "subtitleColor",
            "label": "Subtitle Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 150,
            "step": 10
        },
        {
            "key": "scrollAmount",
            "label": "Scroll Amount",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 200,
            "step": 10
        },
        {
            "key": "borderRadius",
            "label": "Card Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 2
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.3,
            "step": 0.02
        }
    ],
  },
  {
    id: "MangoGiraffeAnimatedBlob",
    title: "animated-blob",
    description: "A visually stunning abstract motion graphic showcasing Animated Blob.",
    color: "#205b0d",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/animated-blob/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#0a0a0a",
        "primaryColor": "#4285f4",
        "secondaryColor": "#ea4335",
        "tertiaryColor": "#fbbc04",
        "quaternaryColor": "#34a853",
        "scale": 1,
        "animationSpeed": 1,
        "blobComplexity": 8,
        "blobSize": 0.4,
        "morphIntensity": 0.55,
        "tensionAmount": 0.7,
        "spikeFrequency": 3,
        "showGradient": true,
        "showInnerGlow": true,
        "showSpikes": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "primaryColor",
            "label": "Primary Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryColor",
            "label": "Secondary Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tertiaryColor",
            "label": "Tertiary Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "quaternaryColor",
            "label": "Quaternary Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "blobComplexity",
            "label": "Blob Complexity",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 12,
            "step": 1
        },
        {
            "key": "blobSize",
            "label": "Blob Size",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 0.6,
            "step": 0.05
        },
        {
            "key": "morphIntensity",
            "label": "Morph Intensity",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.8,
            "step": 0.05
        },
        {
            "key": "tensionAmount",
            "label": "Tension Amount",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "spikeFrequency",
            "label": "Spike Frequency",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 6,
            "step": 1
        },
        {
            "key": "showGradient",
            "label": "Show Gradient",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showInnerGlow",
            "label": "Show Inner Glow",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showSpikes",
            "label": "Show Spikes",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeAnimatedEmojiButton",
    title: "animated-emoji-button",
    description: "A professional UI/UX animation showcasing Animated Emoji Button.",
    color: "#63d2d2",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/animated-emoji-button/Scene").then(m => m.Scene),
    defaultProps: {
        "buttonText": "Hey",
        "emoji": "👋",
        "fontFamily": "Montserrat",
        "backgroundColor": "#c4d6e9",
        "buttonColor": "#3b82f6",
        "textColor": "#ffffff",
        "glowColor": "#3b82f6",
        "scale": 1.65,
        "animationSpeed": 1,
        "glowIntensity": 0.4,
        "tapFrame": 60
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "buttonText",
            "label": "Button Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "emoji",
            "label": "Emoji",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "buttonColor",
            "label": "Button Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "tapFrame",
            "label": "Tap Frame",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 90,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeAnimatedYear",
    title: "animated-year",
    description: "A versatile and high-quality motion design composition featuring Animated Year.",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/animated-year/Scene").then(m => m.Scene),
    defaultProps: {
        "yearText": 2026,
        "fontFamily": "Roboto",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "waveColor": "#22c55e",
        "glowColor": "#4ade80",
        "scale": 1,
        "animationSpeed": 1,
        "waveIntensity": 30,
        "glowIntensity": 0.6,
        "waveSpeed": 0.08
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "yearText",
            "label": "Year Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "waveColor",
            "label": "Wave Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "waveIntensity",
            "label": "Wave Intensity",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 60,
            "step": 5
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "waveSpeed",
            "label": "Wave Speed",
            "type": "number",
            "group": "General",
            "min": 0.02,
            "max": 0.15,
            "step": 0.01
        }
    ],
  },
  {
    id: "MangoGiraffeAppAnimation",
    title: "app-animation",
    description: "A professional UI/UX animation showcasing App Animation.",
    color: "#869810",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/app-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "dateLabel": "FRI, FEB 20",
        "greeting": "Good Afternoon, Olivia",
        "cardLabel": "VERSE OF THE DAY",
        "verseText": "The Lord is near to\\nthe brokenhearted\\nand saves the\\ncrushed in spirit.",
        "verseRef": "Psalm 34:18",
        "shareLabel": "Share",
        "streakLabel": "Streak",
        "streakValue": 6,
        "streakUnit": "days",
        "weekLabel": "This Week",
        "weekValue": "6/7",
        "navHome": "Home",
        "navJournal": "Journal",
        "navBible": "Bible",
        "navSermons": "Sermons",
        "navProgress": "Progress",
        "avatarUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb8AAAGxCAYAAADyGbgCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHhe7P3Zr2VbvueFfUY751zd7iLinDxNtlUXrikuFGWMMLYQCBuBDZgHhKAAlShboqmSKaugMNjiPPvN737yf2HJMhIITBW4qHtv3nsz82SePE2ciB27X+1sxxh++I219o4de0d34mTlvZk/ae291mzGHHPMMX+/8eu+P/X\n\n  headingFont: { type: ",
        "serifFont": "Lora",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "secondaryColor": "#6b7280",
        "accentColor": "#5b5ce2",
        "accentDeep": "#6d28d9",
        "cardTextColor": "#f8fafc",
        "mutedIcon": "#6b7280",
        "progressBlue": "#3b82f6",
        "progressOrange": "#f97316",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "dateLabel",
            "label": "Date",
            "type": "text",
            "group": "General"
        },
        {
            "key": "greeting",
            "label": "Greeting",
            "type": "text",
            "group": "General"
        },
        {
            "key": "cardLabel",
            "label": "Card Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "verseText",
            "label": "Verse",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "verseRef",
            "label": "Reference",
            "type": "text",
            "group": "General"
        },
        {
            "key": "shareLabel",
            "label": "Share",
            "type": "text",
            "group": "General"
        },
        {
            "key": "streakLabel",
            "label": "Streak",
            "type": "text",
            "group": "General"
        },
        {
            "key": "streakValue",
            "label": "Streak Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "streakUnit",
            "label": "Streak Unit",
            "type": "text",
            "group": "General"
        },
        {
            "key": "weekLabel",
            "label": "Week Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "weekValue",
            "label": "Week Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navHome",
            "label": "Nav Home",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navJournal",
            "label": "Nav Journal",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navBible",
            "label": "Nav Bible",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navSermons",
            "label": "Nav Sermons",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navProgress",
            "label": "Nav Progress",
            "type": "text",
            "group": "General"
        },
        {
            "key": "avatarUrl",
            "label": "Avatar",
            "type": "image",
            "group": "General"
        },
        {
            "key": "serifFont",
            "label": "Verse Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryColor",
            "label": "Secondary",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentDeep",
            "label": "Accent Deep",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardTextColor",
            "label": "Card Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "mutedIcon",
            "label": "Icon",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressBlue",
            "label": "Progress Blue",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressOrange",
            "label": "Progress Orange",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeAppVideoShowcase",
    title: "app-video-showcase",
    description: "A professional UI/UX animation showcasing App Video Showcase.",
    color: "#387c04",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/app-video-showcase/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#ebebeb",
        "cardColor1": "#1a1a1a",
        "cardColor2": "#0a0a0a",
        "cardColor3": "#ffffff",
        "cardColor4": "#0f0f0f",
        "cardColor5": "#000000",
        "accentLine": "#8b5cf6",
        "scale": 0.5,
        "animationSpeed": 1.7,
        "staggerDelay": 9,
        "fanSpread": 7,
        "cardOverlap": 0.5,
        "showAccentLine": false,
        "video1": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/the_future_of_design_copy_1_.mp4",
        "video2": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo1.mp4",
        "video3": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo3.mp4",
        "video4": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/demo4.mp4",
        "video5": "blob:https://www.mangogiraffe.ai/99c2d426-33e8-4adb-af77-7a86c02b062a"
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor1",
            "label": "Card 1 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor2",
            "label": "Card 2 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor3",
            "label": "Card 3 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor4",
            "label": "Card 4 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cardColor5",
            "label": "Card 5 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentLine",
            "label": "Accent Line",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 15,
            "step": 1
        },
        {
            "key": "fanSpread",
            "label": "Fan Spread",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 25,
            "step": 1
        },
        {
            "key": "cardOverlap",
            "label": "Card Overlap",
            "type": "number",
            "group": "General",
            "min": 0.4,
            "max": 0.85,
            "step": 0.05
        },
        {
            "key": "showAccentLine",
            "label": "Show Accent Line",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "video1",
            "label": "Video 1",
            "type": "video",
            "group": "General"
        },
        {
            "key": "video2",
            "label": "Video 2",
            "type": "video",
            "group": "General"
        },
        {
            "key": "video3",
            "label": "Video 3",
            "type": "video",
            "group": "General"
        },
        {
            "key": "video4",
            "label": "Video 4",
            "type": "video",
            "group": "General"
        },
        {
            "key": "video5",
            "label": "Video 5",
            "type": "video",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeAppleStyle30SecCounter1",
    title: "apple-style-30-sec-counter-1",
    description: "A professional UI/UX animation showcasing Apple Style 30 Sec Counter 1.",
    color: "#0981c2",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/apple-style-30-sec-counter-1/Scene").then(m => m.Scene),
    defaultProps: {
        "label": "",
        "startValue": 30,
        "countDuration": 900,
        "headingFont": "Manrope",
        "bodyFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "secondaryColor": "#6b7280",
        "accentColor": "#3b82f6",
        "barBackgroundColor": "#e5e7eb",
        "barFillColor": "#f73b3b",
        "scale": 0.85,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "label",
            "label": "Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "startValue",
            "label": "Start Value",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 120,
            "step": 1
        },
        {
            "key": "countDuration",
            "label": "Count Duration (frames)",
            "type": "number",
            "group": "General",
            "min": 300,
            "max": 1800,
            "step": 30
        },
        {
            "key": "headingFont",
            "label": "Number Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "bodyFont",
            "label": "Label Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Primary Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryColor",
            "label": "Secondary Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "barBackgroundColor",
            "label": "Bar Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "barFillColor",
            "label": "Bar Fill",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 5
        },
        {
            "key": "blur",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "rotation",
            "label": "Rotation",
            "type": "number",
            "group": "General",
            "min": -180,
            "max": 180,
            "step": 5
        },
        {
            "key": "opacity",
            "label": "Max Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeBarChart",
    title: "bar-chart",
    description: "A clear and dynamic data visualization of Bar Chart.",
    color: "#9003ba",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/bar-chart/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "barColor": "#ffffff",
        "accentColor": "#22c55e",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 6,
        "barCount": 7,
        "glowIntensity": 0.8,
        "pulseAmount": 0.08,
        "showConnectors": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "barColor",
            "label": "Bar Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent/Green",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 15,
            "step": 1
        },
        {
            "key": "barCount",
            "label": "Bar Count",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 12,
            "step": 1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "pulseAmount",
            "label": "Pulse Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.2,
            "step": 0.02
        },
        {
            "key": "showConnectors",
            "label": "Show Connectors",
            "type": "boolean",
            "group": "General"
        }
    ],
  }
];

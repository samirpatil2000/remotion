import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_1: CompositionDef[] = [
  {
    id: "MangoGiraffeBarChart1",
    title: "bar-chart-1",
    description: "A clear and dynamic data visualization of Bar Chart 1.",
    color: "#f280d8",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/bar-chart-1/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Quarterly Results",
        "label1": "Q1",
        "label2": "Q2",
        "label3": "Q3",
        "label4": "Q4",
        "backgroundColor": "#1e293b",
        "textColor": "#f1f5f9",
        "labelColor": "#94a3b8",
        "bar1Color": "#3b82f6",
        "bar2Color": "#8b5cf6",
        "bar3Color": "#ec4899",
        "bar4Color": "#f59e0b",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "borderRadius": 4
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
            "key": "label1",
            "label": "Label 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label2",
            "label": "Label 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label3",
            "label": "Label 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label4",
            "label": "Label 4",
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
            "key": "labelColor",
            "label": "Label Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar1Color",
            "label": "Bar 1 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar2Color",
            "label": "Bar 2 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar3Color",
            "label": "Bar 3 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar4Color",
            "label": "Bar 4 Color",
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
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeBarChart2",
    title: "bar-chart-2",
    description: "A clear and dynamic data visualization of Bar Chart 2.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/bar-chart-2/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Quarterly Results",
        "label1": "Q1",
        "label2": "Q2",
        "label3": "Q3",
        "label4": "Q4",
        "backgroundColor": "#1e293b",
        "textColor": "#f1f5f9",
        "labelColor": "#94a3b8",
        "bar1Color": "#3b82f6",
        "bar2Color": "#8b5cf6",
        "bar3Color": "#ec4899",
        "bar4Color": "#f59e0b",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "borderRadius": 4
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
            "key": "label1",
            "label": "Label 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label2",
            "label": "Label 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label3",
            "label": "Label 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label4",
            "label": "Label 4",
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
            "key": "labelColor",
            "label": "Label Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar1Color",
            "label": "Bar 1 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar2Color",
            "label": "Bar 2 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar3Color",
            "label": "Bar 3 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bar4Color",
            "label": "Bar 4 Color",
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
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeBarChart3",
    title: "bar-chart-3",
    description: "A premium, Apple-inspired dynamic bar chart visualization.",
    color: "#3b82f6",
    icon: "📊",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/bar-chart-3/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Annual Growth",
        "label1": "2021",
        "label2": "2022",
        "label3": "2023",
        "label4": "2024",
        "value1": 42,
        "value2": 68,
        "value3": 54,
        "value4": 89,
        "backgroundColor": "#05070a",
        "textColor": "#f8fafc",
        "accentColor": "#3b82f6",
        "barGradientStart": "#3b82f6",
        "barGradientEnd": "#8b5cf6",
        "gridLineColor": "#1e293b",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 6
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
            "key": "label1",
            "label": "Label 1",
            "type": "text",
            "group": "Labels"
        },
        {
            "key": "label2",
            "label": "Label 2",
            "type": "text",
            "group": "Labels"
        },
        {
            "key": "label3",
            "label": "Label 3",
            "type": "text",
            "group": "Labels"
        },
        {
            "key": "label4",
            "label": "Label 4",
            "type": "text",
            "group": "Labels"
        },
        {
            "key": "value1",
            "label": "Value 1",
            "type": "number",
            "group": "Values",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "value2",
            "label": "Value 2",
            "type": "number",
            "group": "Values",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "value3",
            "label": "Value 3",
            "type": "number",
            "group": "Values",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "value4",
            "label": "Value 4",
            "type": "number",
            "group": "Values",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "Colors"
        },
        {
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "Colors"
        },
        {
            "key": "barGradientStart",
            "label": "Bar Start",
            "type": "color",
            "group": "Colors"
        },
        {
            "key": "barGradientEnd",
            "label": "Bar End",
            "type": "color",
            "group": "Colors"
        },
        {
            "key": "gridLineColor",
            "label": "Grid Lines",
            "type": "color",
            "group": "Colors"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "Animation",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "Animation",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "Animation",
            "min": 2,
            "max": 20,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeBouncingImage",
    title: "bouncing-image",
    description: "A versatile and high-quality motion design composition featuring Bouncing Image.",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/bouncing-image/Scene").then(m => m.Scene),
    defaultProps: {
        "stickerImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/6112d168-263d-4d9d-ac9a-48bee9c47f5b_background_removed.png",
        "backgroundColor": "#f5b81c",
        "shadowColor": "#000000",
        "animationSpeed": 1,
        "scale": 1,
        "stickerSize": 0.7,
        "bounceIntensity": 1.2,
        "shadowOffset": 15,
        "enablePulse": true,
        "showParticles": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "stickerImage",
            "label": "Smashing Good Sticker",
            "type": "image",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shadowColor",
            "label": "Shadow Color",
            "type": "color",
            "group": "General"
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
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "stickerSize",
            "label": "Sticker Size",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "bounceIntensity",
            "label": "Bounce Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 1.5,
            "step": 0.05
        },
        {
            "key": "shadowOffset",
            "label": "Shadow Offset",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 30,
            "step": 1
        },
        {
            "key": "enablePulse",
            "label": "Enable Pulse Loop",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showParticles",
            "label": "Show Burst Particles",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeBranching",
    title: "branching",
    description: "A versatile and high-quality motion design composition featuring Branching.",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/branching/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "barColor": "#ffffff",
        "nodeColor": "#22c55e",
        "branchColor": "#22c55e",
        "glowColor": "#22c55e",
        "scale": 1,
        "animationSpeed": 1,
        "barWidth": 4,
        "nodeSize": 10,
        "nodeCount": 6,
        "glowIntensity": 0.8,
        "branchCurve": 40
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
            "key": "nodeColor",
            "label": "Node Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "branchColor",
            "label": "Branch Color",
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
            "key": "barWidth",
            "label": "Bar Width",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 10,
            "step": 1
        },
        {
            "key": "nodeSize",
            "label": "Node Size",
            "type": "number",
            "group": "General",
            "min": 6,
            "max": 20,
            "step": 1
        },
        {
            "key": "nodeCount",
            "label": "Node Count",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 10,
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
            "key": "branchCurve",
            "label": "Branch Curve",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeBrandSpinning",
    title: "brand-spinning",
    description: "A versatile and high-quality motion design composition featuring Brand Spinning.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/brand-spinning/Scene").then(m => m.Scene),
    defaultProps: {
        "word": "brand",
        "fontFamily": "Roboto",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "scale": 1.7,
        "animationSpeed": 0.8,
        "patternIntensity": 1.5,
        "spiralTightness": 0.9,
        "wordCount": 12,
        "letterSpacing": 0,
        "trailEffect": false
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "word",
            "label": "Word",
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
            "key": "patternIntensity",
            "label": "Pattern Intensity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "spiralTightness",
            "label": "Spiral Tightness",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "wordCount",
            "label": "Word Count",
            "type": "number",
            "group": "General",
            "min": 6,
            "max": 20,
            "step": 1
        },
        {
            "key": "letterSpacing",
            "label": "Letter Spacing",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.5,
            "step": 0.01
        },
        {
            "key": "trailEffect",
            "label": "Trail Effect",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeCalendarGridDrop",
    title: "calendar-grid-drop",
    description: "A visually stunning abstract motion graphic showcasing Calendar Grid Drop.",
    color: "#15414f",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/calendar-grid-drop/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "gridColor": "#ffffff",
        "checkmarkColor": "#22c55e",
        "glowColor": "#22c55e",
        "gridCount": 8,
        "scale": 1,
        "animationSpeed": 1,
        "gridOpacity": 0.85,
        "clutterIntensity": 1
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
            "key": "gridColor",
            "label": "Grid Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "checkmarkColor",
            "label": "Checkmark Color",
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
            "key": "gridCount",
            "label": "Grid Count",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 12,
            "step": 1
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
            "key": "gridOpacity",
            "label": "Grid Opacity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "clutterIntensity",
            "label": "Clutter Intensity",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 1.5,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeCarCrashStory",
    title: "car-crash-story",
    description: "An engaging social media-inspired animation for Car Crash Story.",
    color: "#869810",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/car-crash-story/Scene").then(m => m.Scene),
    defaultProps: {
        "sceneTitle": "A Moment in Time",
        "backgroundColor": "#0f172a",
        "skyGradientTop": "#1e3a5f",
        "skyGradientBottom": "#f97316",
        "buildingColor": "#1e293b",
        "streetColor": "#334155",
        "sidewalkColor": "#475569",
        "girlDressColor": "#f8fafc",
        "girlHairColor": "#78350f",
        "carColor": "#1f2937",
        "headlightColor": "#fbbf24",
        "lampLightColor": "#fcd34d",
        "accentColor": "#3b82f6",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "slowMotionIntensity": 0.15,
        "showTitle": true,
        "showVignette": true,
        "showLensFlare": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "sceneTitle",
            "label": "Scene Title",
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
            "key": "skyGradientTop",
            "label": "Sky Top",
            "type": "color",
            "group": "General"
        },
        {
            "key": "skyGradientBottom",
            "label": "Sky Bottom",
            "type": "color",
            "group": "General"
        },
        {
            "key": "buildingColor",
            "label": "Building Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "streetColor",
            "label": "Street Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sidewalkColor",
            "label": "Sidewalk Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "girlDressColor",
            "label": "Girl Dress",
            "type": "color",
            "group": "General"
        },
        {
            "key": "girlHairColor",
            "label": "Girl Hair",
            "type": "color",
            "group": "General"
        },
        {
            "key": "carColor",
            "label": "Car Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "headlightColor",
            "label": "Headlight",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lampLightColor",
            "label": "Lamp Light",
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
            "key": "slowMotionIntensity",
            "label": "Slow Motion Intensity",
            "type": "number",
            "group": "General",
            "min": 0.05,
            "max": 0.3,
            "step": 0.05
        },
        {
            "key": "showTitle",
            "label": "Show Title",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showVignette",
            "label": "Show Vignette",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showLensFlare",
            "label": "Show Lens Flare",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeCarRacing",
    title: "car-racing",
    description: "A versatile and high-quality motion design composition featuring Car Racing.",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/car-racing/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#0f172a",
        "roadColor": "#1e293b",
        "carBodyColor": "#3b82f6",
        "carWindowColor": "#60a5fa",
        "wheelColor": "#1e293b",
        "lineColor": "#fbbf24",
        "scale": 1,
        "animationSpeed": 1,
        "carBounce": 3,
        "showDust": true
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
            "key": "roadColor",
            "label": "Road Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "carBodyColor",
            "label": "Car Body",
            "type": "color",
            "group": "General"
        },
        {
            "key": "carWindowColor",
            "label": "Car Windows",
            "type": "color",
            "group": "General"
        },
        {
            "key": "wheelColor",
            "label": "Wheel Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lineColor",
            "label": "Road Lines",
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
            "key": "carBounce",
            "label": "Car Bounce",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 1
        },
        {
            "key": "showDust",
            "label": "Show Dust",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeCard",
    title: "card",
    description: "A versatile and high-quality motion design composition featuring Card.",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/card/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "panelColor": "#ffffff",
        "accentColor": "#39ff14",
        "glowColor": "#39ff14",
        "panelOpacity": 0.12,
        "scale": 1,
        "animationSpeed": 1,
        "convergenceFrame": 60,
        "particleCount": 24,
        "glowIntensity": 0.8
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
            "key": "panelColor",
            "label": "Panel Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Neon Accent",
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
            "key": "panelOpacity",
            "label": "Panel Opacity",
            "type": "number",
            "group": "General",
            "min": 0.05,
            "max": 0.3,
            "step": 0.01
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
            "key": "convergenceFrame",
            "label": "Convergence Frame",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 90,
            "step": 5
        },
        {
            "key": "particleCount",
            "label": "Particle Count",
            "type": "number",
            "group": "General",
            "min": 8,
            "max": 40,
            "step": 2
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeCharmingLetting",
    title: "charming-letting",
    description: "A versatile and high-quality motion design composition featuring Charming Letting.",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/charming-letting/Scene").then(m => m.Scene),
    defaultProps: {
        "messageText": "You're not behind, don't worry. You're just doing your things.",
        "fontFamily": "Georgia",
        "backgroundColor": "#FFFFFF",
        "textColor": "#4A3728",
        "envelopeColor": "#e8dcc8",
        "envelopeDark": "#d4c4a8",
        "paperColor": "#FFFEF8",
        "scale": 1,
        "animationSpeed": 1,
        "stopMotionFrameRate": 8
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "messageText",
            "label": "Message",
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
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "envelopeColor",
            "label": "Envelope Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "envelopeDark",
            "label": "Envelope Shadow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "paperColor",
            "label": "Paper Color",
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
            "key": "stopMotionFrameRate",
            "label": "Stop Motion Feel",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 12,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeChartWith",
    title: "chart-with",
    description: "A clear and dynamic data visualization of Chart With.",
    color: "#f280d8",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/chart-with/Scene").then(m => m.Scene),
    defaultProps: {
        "winRate": 78,
        "backgroundColor": "#ffffff",
        "accentColor": "#10b981",
        "gaugeTrackColor": "#e2e8f0",
        "candleGreen": "#22c55e",
        "curveColor": "#10b981",
        "dollarColor": "#fbbf24",
        "scale": 0.9,
        "animationSpeed": 2,
        "glowIntensity": 0.6,
        "showCheckmark": true,
        "showDollarSymbols": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "winRate",
            "label": "Win Rate %",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 100,
            "step": 1
        },
        {
            "key": "backgroundColor",
            "label": "Background",
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
            "key": "gaugeTrackColor",
            "label": "Gauge Track",
            "type": "color",
            "group": "General"
        },
        {
            "key": "candleGreen",
            "label": "Candle Green",
            "type": "color",
            "group": "General"
        },
        {
            "key": "curveColor",
            "label": "Equity Curve",
            "type": "color",
            "group": "General"
        },
        {
            "key": "dollarColor",
            "label": "Dollar Symbol",
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
            "key": "showCheckmark",
            "label": "Show Checkmark",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showDollarSymbols",
            "label": "Show Dollar Symbols",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeClickAnimation",
    title: "click-animation",
    description: "A professional UI/UX animation showcasing Click Animation.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/click-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "buttonText": "Click Me",
        "fontFamily": "Roboto",
        "backgroundColor": "#f8fafc",
        "buttonColor": "#3b82f6",
        "buttonTextColor": "#ffffff",
        "cursorColor": "#1e293b",
        "rippleColor": "#3b82f6",
        "scale": 1.95,
        "animationSpeed": 1,
        "cursorSize": 24,
        "buttonWidth": 180,
        "showRipple": true
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
            "key": "buttonTextColor",
            "label": "Button Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cursorColor",
            "label": "Cursor Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "rippleColor",
            "label": "Ripple Color",
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
            "key": "cursorSize",
            "label": "Cursor Size",
            "type": "number",
            "group": "General",
            "min": 16,
            "max": 40,
            "step": 2
        },
        {
            "key": "buttonWidth",
            "label": "Button Width",
            "type": "number",
            "group": "General",
            "min": 120,
            "max": 280,
            "step": 10
        },
        {
            "key": "showRipple",
            "label": "Show Ripple",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeClockAndText",
    title: "clock-and-text",
    description: "A dynamic typography design featuring Clock And Text.",
    color: "#505905",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/clock-and-text/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#e8a4c9",
        "clockFaceColor": "#000000",
        "handColor1": "#e8a44a",
        "handColor2": "#d4553a",
        "centerDotColor": "#d4553a",
        "pillBgColor": "#ffffff",
        "pillTextColor": "#1a1a1a",
        "word1": "present",
        "word2": "moment",
        "word3": "instant",
        "word4": "hour",
        "fontFamily": "Inter",
        "scale": 1,
        "animationSpeed": 1
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
            "key": "clockFaceColor",
            "label": "Clock Face",
            "type": "color",
            "group": "General"
        },
        {
            "key": "handColor1",
            "label": "Hand Color 1",
            "type": "color",
            "group": "General"
        },
        {
            "key": "handColor2",
            "label": "Hand Color 2",
            "type": "color",
            "group": "General"
        },
        {
            "key": "centerDotColor",
            "label": "Center Dot",
            "type": "color",
            "group": "General"
        },
        {
            "key": "pillBgColor",
            "label": "Pill Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "pillTextColor",
            "label": "Pill Text",
            "type": "color",
            "group": "General"
        },
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
            "key": "word4",
            "label": "Word 4",
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
    id: "MangoGiraffeComicStyle",
    title: "comic-style",
    description: "A versatile and high-quality motion design composition featuring Comic Style.",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/comic-style/Scene").then(m => m.Scene),
    defaultProps: {
        "text": "Testing",
        "fontFamily": "Bangers",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "outlineColor": "#5933b0",
        "shadowColor": "#1a1a2e",
        "scale": 1,
        "animationSpeed": 1,
        "bounceIntensity": 1.3,
        "showBurst": true,
        "burstColor": "#5933b0"
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "text",
            "label": "Text",
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
            "key": "outlineColor",
            "label": "Outline Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shadowColor",
            "label": "Shadow Color",
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
            "key": "bounceIntensity",
            "label": "Bounce Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "showBurst",
            "label": "Show Burst Lines",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "burstColor",
            "label": "Burst Color",
            "type": "color",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeConcertAnimation",
    title: "concert-animation",
    description: "A versatile and high-quality motion design composition featuring Concert Animation.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/concert-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "topText": "AUG 7-9 • 2026",
        "mainText": "OUTSIDE LANDS",
        "bottomText": "SAN FRANCISCO • GOLDEN GATE PARK",
        "fontFamily": "Archivo Black",
        "backgroundColor": "#0a2230",
        "topColor": "#ed86b6",
        "mainColor": "#fcee0a",
        "bottomColor": "#e36049",
        "scale": 0.6,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "topText",
            "label": "Top Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "mainText",
            "label": "Main Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomText",
            "label": "Bottom Text",
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
            "key": "topColor",
            "label": "Top Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "mainColor",
            "label": "Main Color",
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
    id: "MangoGiraffeCopyAndPaste",
    title: "copy-and-paste",
    description: "A versatile and high-quality motion design composition featuring Copy And Paste.",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/copy-and-paste/Scene").then(m => m.Scene),
    defaultProps: {
        "copies": 25,
        "gridColumns": 5,
        "staggerFrames": 3,
        "docSize": 0.17,
        "spacingScale": 0.085,
        "fontFamily": "Space Grotesk",
        "backgroundColor": "#121f45",
        "docColor": "#ffffff",
        "docStrokeColor": "#d1d5db",
        "docFoldColor": "#e5e7eb",
        "docLineColor": "#c7cdd6",
        "shadowColor": "#111827",
        "accentColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "copies",
            "label": "Copies",
            "type": "number",
            "group": "General",
            "min": 9,
            "max": 64,
            "step": 1
        },
        {
            "key": "gridColumns",
            "label": "Grid Columns",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 8,
            "step": 1
        },
        {
            "key": "staggerFrames",
            "label": "Stagger (Frames)",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 10,
            "step": 1
        },
        {
            "key": "docSize",
            "label": "Document Size",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.25,
            "step": 0.01
        },
        {
            "key": "spacingScale",
            "label": "Spacing",
            "type": "number",
            "group": "General",
            "min": 0.05,
            "max": 0.14,
            "step": 0.005
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
            "key": "docColor",
            "label": "Document",
            "type": "color",
            "group": "General"
        },
        {
            "key": "docStrokeColor",
            "label": "Outline",
            "type": "color",
            "group": "General"
        },
        {
            "key": "docFoldColor",
            "label": "Fold",
            "type": "color",
            "group": "General"
        },
        {
            "key": "docLineColor",
            "label": "Lines",
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
    id: "MangoGiraffeCreate",
    title: "create",
    description: "A versatile and high-quality motion design composition featuring Create.",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/create/Scene").then(m => m.Scene),
    defaultProps: {
        "coreText": "create",
        "fontFamily": "DM Sans",
        "backgroundColor": "#ffffff",
        "primaryColor": "#111827",
        "accentColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "coreText",
            "label": "Core Text",
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
    id: "MangoGiraffeEnergyText",
    title: "energy-text",
    description: "A dynamic typography design featuring Energy Text.",
    color: "#387c04",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/energy-text/Scene").then(m => m.Scene),
    defaultProps: {
        "beText": "BE",
        "theText": "THE",
        "mainWord": "ENERGY",
        "youText": "YOU",
        "wantText": "WANT",
        "toText": "TO",
        "attractText": "ATTRACT",
        "fontFamily": "Inter",
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "disintegrationIntensity": 120,
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "beText",
            "label": "Top Left Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "theText",
            "label": "Top Right Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "mainWord",
            "label": "Main Word",
            "type": "text",
            "group": "General"
        },
        {
            "key": "youText",
            "label": "Bottom 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "wantText",
            "label": "Bottom 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "toText",
            "label": "Bottom 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "attractText",
            "label": "Bottom 4",
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
            "label": "Background Color",
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
            "key": "disintegrationIntensity",
            "label": "Max Disintegration",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 300,
            "step": 10
        },
        {
            "key": "scale",
            "label": "Overall Scale",
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
    id: "MangoGiraffeErrorError",
    title: "error-error",
    description: "A versatile and high-quality motion design composition featuring Error Error.",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/error-error/Scene").then(m => m.Scene),
    defaultProps: {
        "fontFamily": "Open Sans",
        "backgroundColor": "#ffffff",
        "iconColor": "#FF0000",
        "glowColor": "#FF0000",
        "iconSize": 250,
        "glowIntensity": 30,
        "pulseSpeed": 1,
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
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
            "key": "iconColor",
            "label": "Icon Color",
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
            "key": "iconSize",
            "label": "Icon Size",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 400,
            "step": 10
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 60,
            "step": 5
        },
        {
            "key": "pulseSpeed",
            "label": "Pulse Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
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
    id: "MangoGiraffeExplainerSpheres",
    title: "explainer-spheres",
    description: "A visually stunning abstract motion graphic showcasing Explainer Spheres.",
    color: "#9003ba",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/explainer-spheres/Scene").then(m => m.Scene),
    defaultProps: {
        "circle1Text": "Well-balanced",
        "circle2Text": "Professional\\nstability",
        "circle3Text": "New Growth",
        "circle4Text": "Trustwothiness\\nmaturity",
        "fontFamily": "DM Sans",
        "backgroundStart": "#0b2e5b",
        "backgroundMid": "#0c3d73",
        "backgroundEnd": "#9fb0bf",
        "strokeColor": "#ffffff",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 10,
        "entranceOffset": 20,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "circle1Text",
            "label": "Circle 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "circle2Text",
            "label": "Circle 2",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "circle3Text",
            "label": "Circle 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "circle4Text",
            "label": "Circle 4",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundStart",
            "label": "Background Start",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundMid",
            "label": "Background Mid",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundEnd",
            "label": "Background End",
            "type": "color",
            "group": "General"
        },
        {
            "key": "strokeColor",
            "label": "Circle Stroke",
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
  }
];

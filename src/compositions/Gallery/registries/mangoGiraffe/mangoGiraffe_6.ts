import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_6: CompositionDef[] = [
  {
    id: "MangoGiraffeTheFutureOfDesign1",
    title: "the-future-of-design-1",
    description: "A dynamic typography design featuring The Future Of Design 1.",
    color: "#f280d8",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/the-future-of-design-1/Scene").then(m => m.Scene),
    defaultProps: {
        "smallText": "the",
        "mainText": "future",
        "subText": "of design",
        "textColor": "#FFFFFF",
        "glowColor": "#FFFFFF",
        "scale": 1.45,
        "animationSpeed": 0.6,
        "blurAmount": 30,
        "slideDistance": 400,
        "glowIntensity": 6,
        "letterSpacing": -2
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "smallText",
            "label": "Small Text",
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
            "key": "subText",
            "label": "Sub Text",
            "type": "text",
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
            "key": "blurAmount",
            "label": "Initial Blur",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 50,
            "step": 5
        },
        {
            "key": "slideDistance",
            "label": "Slide Distance",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 400,
            "step": 25
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 1
        },
        {
            "key": "letterSpacing",
            "label": "Letter Spacing",
            "type": "number",
            "group": "General",
            "min": -20,
            "max": 10,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeThinking",
    title: "thinking",
    description: "A versatile and high-quality motion design composition featuring Thinking.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/thinking/Scene").then(m => m.Scene),
    defaultProps: {
        "iconImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1772915423461-q80lzx6/prompt-1772851571161-screenshot_1447-09-17_at_21.46.02.png",
        "backgroundColor": "#000000",
        "glowColor": "#000000",
        "iconBackgroundColor": "#000000",
        "iconBackgroundRadius": 28,
        "iconBackgroundPadding": 18,
        "iconSize": 260,
        "widthScale": 1.8,
        "glowIntensity": 80,
        "glowSaturation": 1,
        "pulseAmount": 0.25,
        "scale": 2,
        "animationSpeed": 1,
        "fontFamily": "Open Sans"
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "iconImage",
            "label": "Icon Image",
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
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "iconBackgroundColor",
            "label": "Icon Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "iconBackgroundRadius",
            "label": "Icon Background Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 120,
            "step": 2
        },
        {
            "key": "iconBackgroundPadding",
            "label": "Icon Background Padding",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 80,
            "step": 2
        },
        {
            "key": "iconSize",
            "label": "Icon Size",
            "type": "number",
            "group": "General",
            "min": 180,
            "max": 520,
            "step": 10
        },
        {
            "key": "widthScale",
            "label": "Width Scale",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 1.8,
            "step": 0.05
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 80,
            "step": 5
        },
        {
            "key": "glowSaturation",
            "label": "Glow Saturation",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 3,
            "step": 0.1
        },
        {
            "key": "pulseAmount",
            "label": "Pulse Amount",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.5,
            "step": 0.05
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
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeTimeline",
    title: "timeline",
    description: "A functional and clean motion graphic for Timeline.",
    color: "#505905",
    icon: "🎬",
    category: "Utility",
    loadComponent: () => import("../../../MangoGiraffe/timeline/Scene").then(m => m.Scene),
    defaultProps: {
        "fontFamily": "Space Grotesk",
        "backgroundColor": "#ffffff",
        "primaryColor": "#111827",
        "accentColor": "#3b82f6",
        "highlightColor": "#ef4444",
        "playTriangleColor": "#ffffff",
        "lineThickness": 1,
        "glowIntensity": 1,
        "dollarIcon": "$",
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
            "key": "highlightColor",
            "label": "Highlight",
            "type": "color",
            "group": "General"
        },
        {
            "key": "playTriangleColor",
            "label": "Play Triangle",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lineThickness",
            "label": "Line Thickness",
            "type": "number",
            "group": "General",
            "min": 0.6,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "dollarIcon",
            "label": "Dollar Icon",
            "type": "text",
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
    id: "MangoGiraffeTypewriter",
    title: "typewriter",
    description: "A dynamic typography design featuring Typewriter.",
    color: "#205b0d",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/typewriter/Scene").then(m => m.Scene),
    defaultProps: {
        "typedText": "Hello World! This is a typewriter effect with animated keys and realistic paper movement.",
        "fontFamily": "Courier New",
        "backgroundColor": "#2c1810",
        "typewriterColor": "#1a1a1a",
        "typewriterAccent": "#2d2d2d",
        "keyColor": "#0a0a0a",
        "keyTextColor": "#d4d4d4",
        "paperColor": "#f5f0e6",
        "inkColor": "#1a1a1a",
        "accentColor": "#8b7355",
        "ribbonColor": "#1a1a1a",
        "scale": 1,
        "animationSpeed": 1,
        "typingSpeed": 8
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "typedText",
            "label": "Typed Text",
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
            "key": "typewriterColor",
            "label": "Typewriter Body",
            "type": "color",
            "group": "General"
        },
        {
            "key": "typewriterAccent",
            "label": "Typewriter Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keyColor",
            "label": "Key Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keyTextColor",
            "label": "Key Text",
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
            "key": "inkColor",
            "label": "Ink Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Metal Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "ribbonColor",
            "label": "Ribbon Color",
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
            "key": "typingSpeed",
            "label": "Typing Speed (frames)",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 15,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeTypingEffect",
    title: "typing-effect",
    description: "A versatile and high-quality motion design composition featuring Typing Effect.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/typing-effect/Scene").then(m => m.Scene),
    defaultProps: {
        "variableName": "greeting",
        "typedText": "Hello, World!",
        "backgroundColor": "#1e1e1e",
        "editorColor": "#252626",
        "headerColor": "#3c3c3c",
        "keywordColor": "#c586c0",
        "variableColor": "#9cdcfe",
        "stringColor": "#ce9178",
        "cursorColor": "#ffffff",
        "scale": 1,
        "typingSpeed": 4,
        "showWindowButtons": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "variableName",
            "label": "Variable Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "typedText",
            "label": "Typed Text",
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
            "key": "editorColor",
            "label": "Editor Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "headerColor",
            "label": "Header Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keywordColor",
            "label": "Keyword Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "variableColor",
            "label": "Variable Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "stringColor",
            "label": "String Color",
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
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "typingSpeed",
            "label": "Typing Speed",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 10,
            "step": 1
        },
        {
            "key": "showWindowButtons",
            "label": "Show Window Buttons",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeUpworkAd",
    title: "upwork-ad",
    description: "A versatile and high-quality motion design composition featuring Upwork Ad.",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/upwork-ad/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "Upwork",
        "percentageValue": "41%",
        "statLine1": "of top companies agree",
        "statLine2": "AI works best when humans lead.",
        "fontFamily": "Roboto",
        "backgroundColor": "#000000",
        "accentColor": "#14a800",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 12,
        "glowIntensity": 0.8
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
            "key": "percentageValue",
            "label": "Percentage",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statLine1",
            "label": "Stat Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statLine2",
            "label": "Stat Line 2",
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
            "label": "Accent Green",
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
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 25,
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
        }
    ],
  },
  {
    id: "MangoGiraffeViewCartAnimation1",
    title: "view-cart-animation-1",
    description: "A professional UI/UX animation showcasing View Cart Animation 1.",
    color: "#869810",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/view-cart-animation-1/Scene").then(m => m.Scene),
    defaultProps: {
        "buttonText": "View Cart",
        "fontFamily": "Roboto",
        "backgroundColor": "#f8fafc",
        "buttonColor": "#3b82f6",
        "buttonTextColor": "#ffffff",
        "glowColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1,
        "bounceIntensity": 1.08,
        "glowIntensity": 0.4,
        "shadowIntensity": 0.25,
        "tapScale": 0.92
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
            "key": "bounceIntensity",
            "label": "Bounce Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 1.2,
            "step": 0.02
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
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "tapScale",
            "label": "Tap Scale",
            "type": "number",
            "group": "General",
            "min": 0.8,
            "max": 1,
            "step": 0.02
        }
    ],
  },
  {
    id: "MangoGiraffeWebsiteReveal",
    title: "website-reveal",
    description: "A professional UI/UX animation showcasing Website Reveal.",
    color: "#387c04",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/website-reveal/Scene").then(m => m.Scene),
    defaultProps: {
        "websiteImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        "backgroundColor": "#f2f2f2",
        "browserFrameColor": "#080808",
        "accentColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1,
        "entranceOffset": 500,
        "maxBlur": 20,
        "shadowIntensity": 0.2,
        "borderRadius": 12
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "websiteImage",
            "label": "Website Screenshot",
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
            "key": "browserFrameColor",
            "label": "Browser Frame",
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
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 500,
            "step": 25
        },
        {
            "key": "maxBlur",
            "label": "Max Blur (px)",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 40,
            "step": 5
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeWeddingAnnouncement",
    title: "wedding-announcement",
    description: "A versatile and high-quality motion design composition featuring Wedding Announcement.",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/wedding-announcement/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Claudia & Ernesto",
        "fontFamily": "Playfair Display",
        "backgroundColor": "#0a1628",
        "skyBottom": "#1a3a5c",
        "textColor": "#ffffff",
        "accentColor": "#e8b84a",
        "buildingColor": "#0d1117",
        "windowColor": "#f5d76e",
        "starColor": "#fffacd",
        "swirlColor": "#f0d890",
        "scale": 1,
        "animationSpeed": 1,
        "starCount": 35,
        "swirlCount": 6,
        "windowFlicker": true
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
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Sky Top",
            "type": "color",
            "group": "General"
        },
        {
            "key": "skyBottom",
            "label": "Sky Bottom",
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
            "key": "accentColor",
            "label": "Accent Color",
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
            "key": "windowColor",
            "label": "Window Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "starColor",
            "label": "Star Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "swirlColor",
            "label": "Swirl Color",
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
            "key": "starCount",
            "label": "Star Count",
            "type": "number",
            "group": "General",
            "min": 15,
            "max": 60,
            "step": 5
        },
        {
            "key": "swirlCount",
            "label": "Swirl Count",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 12,
            "step": 1
        },
        {
            "key": "windowFlicker",
            "label": "Window Flicker",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeWellnessAppMoods",
    title: "wellness-app-moods",
    description: "A professional UI/UX animation showcasing Wellness App Moods.",
    color: "#9003ba",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/wellness-app-moods/Scene").then(m => m.Scene),
    defaultProps: {
        "happyScreen": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213193808-create_account_4_.jpg",
        "confusedScreen": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213198211-create_account_5_.jpg",
        "calmScreen": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213200436-create_account_6_.jpg",
        "stressedScreen": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774215623575-204525e/prompt-1774213206959-create_account_3_.jpg",
        "fontFamily": "Roboto",
        "backgroundColor": "#ffffff",
        "happyBg": "#fbe7a0",
        "confusedBg": "#f6c8b6",
        "calmBg": "#a9c8f3",
        "stressedBg": "#b7a6f5",
        "scale": 1.05,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "happyScreen",
            "label": "Happy Screen",
            "type": "image",
            "group": "General"
        },
        {
            "key": "confusedScreen",
            "label": "Confused Screen",
            "type": "image",
            "group": "General"
        },
        {
            "key": "calmScreen",
            "label": "Calm Screen",
            "type": "image",
            "group": "General"
        },
        {
            "key": "stressedScreen",
            "label": "Stressed Screen",
            "type": "image",
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
            "key": "happyBg",
            "label": "Happy BG",
            "type": "color",
            "group": "General"
        },
        {
            "key": "confusedBg",
            "label": "Confused BG",
            "type": "color",
            "group": "General"
        },
        {
            "key": "calmBg",
            "label": "Calm BG",
            "type": "color",
            "group": "General"
        },
        {
            "key": "stressedBg",
            "label": "Stressed BG",
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
    id: "MangoGiraffeWhatsappConvo",
    title: "whatsapp-convo",
    description: "A professional UI/UX animation showcasing Whatsapp Convo.",
    color: "#f280d8",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/whatsapp-convo/Scene").then(m => m.Scene),
    defaultProps: {
        "message1": "ready to do you?",
        "time1": "10:22 PM",
        "message2": "on my way",
        "emoji2": "🎨",
        "time2": "10:23 PM",
        "typingDots": "...",
        "fontFamily": "DM Sans",
        "backgroundColor": "#e6ddd5",
        "topBarColor": "#dcd4cb",
        "iconColor": "#4b5563",
        "bubbleGreen": "#d9fdd3",
        "bubbleWhite": "#ffffff",
        "textColor": "#1f2937",
        "timeColor": "#6b7280",
        "tickBlue": "#2f80ed",
        "typingPadding": 0.015,
        "fullPadding": 0.03,
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
            "key": "message1",
            "label": "Message 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "time1",
            "label": "Time 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "message2",
            "label": "Message 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "emoji2",
            "label": "Emoji",
            "type": "text",
            "group": "General"
        },
        {
            "key": "time2",
            "label": "Time 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "typingDots",
            "label": "Typing Dots",
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
            "key": "topBarColor",
            "label": "Top Bar",
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
            "key": "bubbleGreen",
            "label": "Green Bubble",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bubbleWhite",
            "label": "White Bubble",
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
            "key": "timeColor",
            "label": "Time Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tickBlue",
            "label": "Tick Blue",
            "type": "color",
            "group": "General"
        },
        {
            "key": "typingPadding",
            "label": "Typing Padding",
            "type": "number",
            "group": "General",
            "min": 0.005,
            "max": 0.03,
            "step": 0.002
        },
        {
            "key": "fullPadding",
            "label": "Full Padding",
            "type": "number",
            "group": "General",
            "min": 0.015,
            "max": 0.06,
            "step": 0.005
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
    id: "MangoGiraffeWiggleText",
    title: "wiggle-text",
    description: "A dynamic typography design featuring Wiggle Text.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/wiggle-text/Scene").then(m => m.Scene),
    defaultProps: {
        "topText": "Text",
        "bottomText": "title",
        "fontFamily": "Permanent Marker",
        "backgroundColor": "#121212",
        "gridColor": "#2A2A2E",
        "textColor": "#D4D4C8",
        "glowColor": "#D4D4C8",
        "scale": 1.1,
        "animationSpeed": 1.8,
        "glowIntensity": 4,
        "letterStagger": 3,
        "showGrid": true,
        "sketchyEffect": true
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
            "key": "gridColor",
            "label": "Grid Color",
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
            "max": 30,
            "step": 1
        },
        {
            "key": "letterStagger",
            "label": "Letter Stagger",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 8,
            "step": 1
        },
        {
            "key": "showGrid",
            "label": "Show Grid",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "sketchyEffect",
            "label": "Sketchy Effect",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeWindows98Style",
    title: "windows-98-style",
    description: "A professional UI/UX animation showcasing Windows 98 Style.",
    color: "#505905",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/windows-98-style/Scene").then(m => m.Scene),
    defaultProps: {
        "windowTitle": "Camera",
        "statusText": "Ready",
        "fontFamily": "MS Sans Serif",
        "backgroundColor": "#008080",
        "windowBg": "#c0c0c0",
        "titleBarColor": "#000080",
        "titleTextColor": "#ffffff",
        "personColor": "#00ff00",
        "scale": 0.65,
        "animationSpeed": 1.7,
        "expandDuration": 20,
        "showScanlines": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "windowTitle",
            "label": "Window Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statusText",
            "label": "Status Text",
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
            "label": "Desktop Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "windowBg",
            "label": "Window Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "titleBarColor",
            "label": "Title Bar",
            "type": "color",
            "group": "General"
        },
        {
            "key": "titleTextColor",
            "label": "Title Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "personColor",
            "label": "Person Color",
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
            "key": "expandDuration",
            "label": "Expand Duration",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 40,
            "step": 2
        },
        {
            "key": "showScanlines",
            "label": "Show Scanlines",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeWinsVsLosses",
    title: "wins-vs-losses",
    description: "A clear and dynamic data visualization of Wins Vs Losses.",
    color: "#205b0d",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/wins-vs-losses/Scene").then(m => m.Scene),
    defaultProps: {
        "introTitle": "NSE Market Highlights – 18 March 2026",
        "transitionTitle": "Now the Declines",
        "outroTitle": "Market Mixed Today",
        "gainersTitle": "Top Gainers",
        "losersTitle": "Top Losers",
        "g1Name": "Flame Tree Group",
        "g1ValueText": "+5.93%",
        "g1ValueNum": 5.9,
        "g2Name": "Africa Mega Agricorp",
        "g2ValueText": "+4.99%",
        "g2ValueNum": 4.9,
        "g3Name": "Kenya Airways",
        "g3ValueText": "+3.00%",
        "g3ValueNum": 3,
        "g4Name": "Uchumi Supermarket",
        "g4ValueText": "+1.40%",
        "g4ValueNum": 1.4,
        "g5Name": "Nairobi Business Ventures",
        "g5ValueText": "+1.33%",
        "g5ValueNum": 1.33,
        "l1Name": "CIC Insurance",
        "l1ValueText": "-2.54%",
        "l1ValueNum": 2.54,
        "l2Name": "Kenya Re",
        "l2ValueText": "-1.85%",
        "l2ValueNum": 1.85,
        "l3Name": "Eveready East Africa",
        "l3ValueText": "-1.61%",
        "l3ValueNum": 1.61,
        "l4Name": "Stanchart Kenya",
        "l4ValueText": "-1.48%",
        "l4ValueNum": 1.48,
        "l5Name": "Britam Holdings",
        "l5ValueText": "-1.18%",
        "l5ValueNum": 1.18,
        "fontFamily": "Raleway",
        "backgroundColor": "#ffffff",
        "primaryColor": "#111827",
        "accentColor": "#070673",
        "gainColor": "#1f7b40",
        "lossColor": "#dc2626",
        "axisColor": "#e5e7eb",
        "labelColor": "#6b7280",
        "gridColor": "#e5e7eb66",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "introTitle",
            "label": "Intro Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "transitionTitle",
            "label": "Transition Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "outroTitle",
            "label": "Outro Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "gainersTitle",
            "label": "Gainers Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "losersTitle",
            "label": "Losers Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g1Name",
            "label": "Gainer 1 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g1ValueText",
            "label": "Gainer 1 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g1ValueNum",
            "label": "Gainer 1 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "g2Name",
            "label": "Gainer 2 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g2ValueText",
            "label": "Gainer 2 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g2ValueNum",
            "label": "Gainer 2 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "g3Name",
            "label": "Gainer 3 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g3ValueText",
            "label": "Gainer 3 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g3ValueNum",
            "label": "Gainer 3 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "g4Name",
            "label": "Gainer 4 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g4ValueText",
            "label": "Gainer 4 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g4ValueNum",
            "label": "Gainer 4 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "g5Name",
            "label": "Gainer 5 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g5ValueText",
            "label": "Gainer 5 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "g5ValueNum",
            "label": "Gainer 5 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "l1Name",
            "label": "Loser 1 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l1ValueText",
            "label": "Loser 1 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l1ValueNum",
            "label": "Loser 1 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "l2Name",
            "label": "Loser 2 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l2ValueText",
            "label": "Loser 2 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l2ValueNum",
            "label": "Loser 2 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "l3Name",
            "label": "Loser 3 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l3ValueText",
            "label": "Loser 3 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l3ValueNum",
            "label": "Loser 3 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "l4Name",
            "label": "Loser 4 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l4ValueText",
            "label": "Loser 4 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l4ValueNum",
            "label": "Loser 4 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
        },
        {
            "key": "l5Name",
            "label": "Loser 5 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l5ValueText",
            "label": "Loser 5 Value Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "l5ValueNum",
            "label": "Loser 5 Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.01
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
            "key": "gainColor",
            "label": "Gain Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lossColor",
            "label": "Loss Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "axisColor",
            "label": "Axis Color",
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
            "key": "gridColor",
            "label": "Grid Color",
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
    id: "MangoGiraffeWorkingOnAComputer",
    title: "working-on-a-computer",
    description: "A versatile and high-quality motion design composition featuring Working On A Computer.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/working-on-a-computer/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#0f172a",
        "deskColor": "#1e293b",
        "monitorGlow": "#3b82f6",
        "terminalGreen": "#22c55e",
        "skinTone": "#d4a574",
        "sleeveColor": "#18181b",
        "keyboardColor": "#27272a",
        "scale": 1,
        "animationSpeed": 1,
        "typingSpeed": 3,
        "showScanlines": true,
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
            "key": "deskColor",
            "label": "Desk Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "monitorGlow",
            "label": "Monitor Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "terminalGreen",
            "label": "Terminal Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "skinTone",
            "label": "Skin Tone",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sleeveColor",
            "label": "Sleeve Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keyboardColor",
            "label": "Keyboard Color",
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
            "key": "typingSpeed",
            "label": "Typing Speed",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 6,
            "step": 1
        },
        {
            "key": "showScanlines",
            "label": "Show Scanlines",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffeWritingDiary1",
    title: "writing-diary-1",
    description: "A dynamic typography design featuring Writing Diary 1.",
    color: "#15414f",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/writing-diary-1/Scene").then(m => m.Scene),
    defaultProps: {
        "bodyText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\\n\\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\n\\nI have three dogs. One of them is called Downey, the other one is Mochi, youngest one's name is Pepper",
        "fontFamily": "Roboto",
        "backgroundColor": "#e3e3e3",
        "paperColor": "#f8fafc",
        "coverColor": "#0f172a",
        "bindingColor": "rgba(15, 23, 42, 0.06)",
        "textColor": "#334155",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 2,
        "entranceOffset": 25,
        "borderRadius": 20,
        "shadowIntensity": 0.25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "bodyText",
            "label": "Body Text",
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
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "paperColor",
            "label": "Paper",
            "type": "color",
            "group": "General"
        },
        {
            "key": "coverColor",
            "label": "Cover",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bindingColor",
            "label": "Binding",
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
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 50,
            "step": 2
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
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
    id: "MangoGiraffeYearsRollingText",
    title: "years-rolling-text",
    description: "A dynamic typography design featuring Years Rolling Text.",
    color: "#869810",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/years-rolling-text/Scene").then(m => m.Scene),
    defaultProps: {
        "startYear": 1990,
        "endYear": 2024,
        "label": "years",
        "numberFont": "Space Grotesk",
        "labelFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "accentColor": "#3b82f6",
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
            "key": "startYear",
            "label": "Start Year",
            "type": "text",
            "group": "General"
        },
        {
            "key": "endYear",
            "label": "End Year",
            "type": "text",
            "group": "General"
        },
        {
            "key": "label",
            "label": "Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "numberFont",
            "label": "Number Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "labelFont",
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
    id: "MangoGiraffeYoutubeSubscribeButton",
    title: "youtube-subscribe-button",
    description: "A professional UI/UX animation showcasing Youtube Subscribe Button.",
    color: "#387c04",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/youtube-subscribe-button/Scene").then(m => m.Scene),
    defaultProps: {
        "buttonText": "Subscribe",
        "fontFamily": "Roboto",
        "backgroundColor": "#ffffff",
        "buttonColor": "#CD201F",
        "buttonClickedColor": "#171717",
        "textColor": "#ffffff",
        "cursorColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "clickFrame": 45
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
            "key": "buttonClickedColor",
            "label": "Clicked Color",
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
            "key": "cursorColor",
            "label": "Cursor Color",
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
            "key": "clickFrame",
            "label": "Click Frame",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 80,
            "step": 5
        }
    ],
  }
];

import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_5: CompositionDef[] = [
  {
    id: "MangoGiraffeRetroPhone",
    title: "retro-phone",
    description: "Mango Giraffe template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/retro-phone/Scene").then(m => m.Scene),
    defaultProps: {
        "message1": "hi there",
        "message2": "yea wassup",
        "message3": "wanna hang l8r?",
        "message4": "totally! 😎",
        "person1Emoji": "😊",
        "person2Emoji": "🤔",
        "backgroundColor": "#fafafa",
        "gradientColor": "#fcfcfc",
        "phoneColor": "#121212",
        "phoneBorder": "#1a1a2e",
        "screenColor": "#4a5d23",
        "textColor": "#b8ff00",
        "keypadColor": "#333333",
        "keypadBorder": "#555555",
        "keypadText": "#cccccc",
        "antennaColor": "#666666",
        "callButtonColor": "#4a7c59",
        "endButtonColor": "#a03e3e",
        "brandColor": "#666666",
        "animationSpeed": 1,
        "messageDelay": 20
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
            "key": "message2",
            "label": "Message 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "message3",
            "label": "Message 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "message4",
            "label": "Message 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "person1Emoji",
            "label": "Person 1 Emoji",
            "type": "text",
            "group": "General"
        },
        {
            "key": "person2Emoji",
            "label": "Person 2 Emoji",
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
            "key": "gradientColor",
            "label": "Gradient Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "phoneColor",
            "label": "Phone Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "phoneBorder",
            "label": "Phone Border",
            "type": "color",
            "group": "General"
        },
        {
            "key": "screenColor",
            "label": "Screen Color",
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
            "key": "keypadColor",
            "label": "Keypad Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keypadBorder",
            "label": "Keypad Border",
            "type": "color",
            "group": "General"
        },
        {
            "key": "keypadText",
            "label": "Keypad Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "antennaColor",
            "label": "Antenna Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "callButtonColor",
            "label": "Call Button",
            "type": "color",
            "group": "General"
        },
        {
            "key": "endButtonColor",
            "label": "End Button",
            "type": "color",
            "group": "General"
        },
        {
            "key": "brandColor",
            "label": "Brand Text",
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
            "key": "messageDelay",
            "label": "Message Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 40,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeSaasSecurity",
    title: "saas-security",
    description: "Mango Giraffe template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/saas-security/Scene").then(m => m.Scene),
    defaultProps: {
        "titleText": "Continuous Attack Surface Monitoring",
        "ctaLine1": "Scan smarter.",
        "ctaLine2": "Fix faster.",
        "fontFamily": "Inter",
        "backgroundColor": "#0a1628",
        "accentColor": "#22d3ee",
        "secondaryAccent": "#3b82f6",
        "textColor": "#ffffff",
        "cardColor": "#1e293b",
        "criticalColor": "#ef4444",
        "highColor": "#f97316",
        "mediumColor": "#eab308",
        "scale": 1,
        "animationSpeed": 1,
        "glowIntensity": 0.6,
        "particleCount": 12
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "titleText",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ctaLine1",
            "label": "CTA Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ctaLine2",
            "label": "CTA Line 2",
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
            "label": "Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryAccent",
            "label": "Secondary Accent",
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
            "key": "cardColor",
            "label": "Card Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "criticalColor",
            "label": "Critical Badge",
            "type": "color",
            "group": "General"
        },
        {
            "key": "highColor",
            "label": "High Badge",
            "type": "color",
            "group": "General"
        },
        {
            "key": "mediumColor",
            "label": "Medium Badge",
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
            "key": "particleCount",
            "label": "Particle Count",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 25,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeScatteredText",
    title: "scattered-text",
    description: "Mango Giraffe template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/scattered-text/Scene").then(m => m.Scene),
    defaultProps: {
        "phrase": "HIP-HOP IN THE HOLY LAND",
        "rowCount": 12,
        "backgroundColor": "#f0f0f0",
        "textColor": "#000000",
        "fontFamily": "Inter",
        "fontSize": 1,
        "animationSpeed": 1,
        "scale": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "phrase",
            "label": "Phrase",
            "type": "text",
            "group": "General"
        },
        {
            "key": "rowCount",
            "label": "Row Count",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 20,
            "step": 1
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
            "key": "fontFamily",
            "label": "Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "fontSize",
            "label": "Font Size Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "animationSpeed",
            "label": "Animation Speed",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "scale",
            "label": "Global Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeScienceClub",
    title: "science-club",
    description: "Mango Giraffe template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/science-club/Scene").then(m => m.Scene),
    defaultProps: {
        "mainText": "International Day for Women and Girls in Science",
        "fontFamily": "Playfair Display",
        "backgroundColor": "#0c4a6e",
        "oceanBlue": "#0284c7",
        "coralPink": "#f472b6",
        "sunsetOrange": "#fb923c",
        "palmGreen": "#22c55e",
        "sandGold": "#fbbf24",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 6,
        "waveIntensity": 1,
        "showMotifs": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "mainText",
            "label": "Main Text",
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
            "key": "oceanBlue",
            "label": "Ocean Blue",
            "type": "color",
            "group": "General"
        },
        {
            "key": "coralPink",
            "label": "Coral Pink",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sunsetOrange",
            "label": "Sunset Orange",
            "type": "color",
            "group": "General"
        },
        {
            "key": "palmGreen",
            "label": "Palm Green",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sandGold",
            "label": "Sand Gold",
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
            "label": "Word Stagger",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 15,
            "step": 1
        },
        {
            "key": "waveIntensity",
            "label": "Wave Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "showMotifs",
            "label": "Show Pacific Motifs",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeSearchBox",
    title: "search-box",
    description: "Mango Giraffe template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/search-box/Scene").then(m => m.Scene),
    defaultProps: {
        "searchLine1": "Website Design",
        "searchLine2": "Social Media Pages",
        "searchLine3": "Google Business Profile",
        "searchLine4": " Google Things to Do ",
        "searchLine5": " Local SEO ",
        "fontFamily": "Roboto",
        "backgroundImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1772903542262-7ltmpm4/imageedit_1_4386550116.png",
        "textColor": "#bdbdbd",
        "cursorColor": "#bdbdbd",
        "backgroundColor": "#ffffff",
        "primaryColor": "#111827",
        "accentColor": "#3b82f6",
        "searchBoxX": 39,
        "searchBoxY": 50,
        "searchBoxW": 64,
        "searchBoxH": 9,
        "paddingX": 2.5,
        "scale": 0.9,
        "animationSpeed": 0.8
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "searchLine1",
            "label": "Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "searchLine2",
            "label": "Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "searchLine3",
            "label": "Line 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "searchLine4",
            "label": "Line 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "searchLine5",
            "label": "Line 5",
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
            "key": "backgroundImage",
            "label": "Background Image",
            "type": "image",
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
            "key": "searchBoxX",
            "label": "Search Box X (%)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "searchBoxY",
            "label": "Search Box Y (%)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "searchBoxW",
            "label": "Search Box Width (%)",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 100,
            "step": 1
        },
        {
            "key": "searchBoxH",
            "label": "Search Box Height (%)",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 20,
            "step": 1
        },
        {
            "key": "paddingX",
            "label": "Text Padding X (%)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 10,
            "step": 0.5
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
    id: "MangoGiraffeSentenceReveal",
    title: "sentence-reveal",
    description: "Mango Giraffe template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/sentence-reveal/Scene").then(m => m.Scene),
    defaultProps: {
        "word1": "ui-design-system",
        "word2": "interface-design",
        "word3": "swiftui-ui-patterns",
        "word4": "interaction-design",
        "word5": "ui-ux-pro-max",
        "word6": "web-design-guidelines",
        "word7": "frontend-design",
        "fontFamily": "Roboto",
        "backgroundColor": "#fcfcfc",
        "mutedTextColor": "#999999",
        "activeTextColor": "#1a1a1a",
        "scale": 1.2,
        "animationSpeed": 1,
        "cycleFrames": 50,
        "fontSize": 0.042,
        "lineSpacing": 2.2,
        "curveIntensity": 300,
        "blurAmount": 5
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
            "key": "word4",
            "label": "Word 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "word5",
            "label": "Word 5",
            "type": "text",
            "group": "General"
        },
        {
            "key": "word6",
            "label": "Word 6",
            "type": "text",
            "group": "General"
        },
        {
            "key": "word7",
            "label": "Word 7",
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
            "key": "mutedTextColor",
            "label": "Muted Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "activeTextColor",
            "label": "Active Text",
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
            "key": "cycleFrames",
            "label": "Frames Per Word",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 90,
            "step": 5
        },
        {
            "key": "fontSize",
            "label": "Font Size",
            "type": "number",
            "group": "General",
            "min": 0.025,
            "max": 0.08,
            "step": 0.005
        },
        {
            "key": "lineSpacing",
            "label": "Line Spacing",
            "type": "number",
            "group": "General",
            "min": 1.5,
            "max": 3.5,
            "step": 0.1
        },
        {
            "key": "curveIntensity",
            "label": "Curve Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 300,
            "step": 10
        },
        {
            "key": "blurAmount",
            "label": "Blur Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeSimpleChart",
    title: "simple-chart",
    description: "Mango Giraffe template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/simple-chart/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Chart",
        "metric": "74%",
        "headingFont": "Space Grotesk",
        "bodyFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "accentColor": "#3b82f6",
        "secondaryColor": "#6b7280",
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
            "key": "metric",
            "label": "Metric",
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
            "label": "Primary Text",
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
            "key": "secondaryColor",
            "label": "Secondary",
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
    id: "MangoGiraffeSimpleTimelapse",
    title: "simple-timelapse",
    description: "Mango Giraffe template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/simple-timelapse/Scene").then(m => m.Scene),
    defaultProps: {
        "startTime": "09:00 AM",
        "endTime": "06:57 PM",
        "backgroundColor": "#f5f5f5",
        "textColor": "#1a1a1a",
        "scale": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "startTime",
            "label": "Start Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "endTime",
            "label": "End Time",
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
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffeSimpleTimelapse2",
    title: "simple-timelapse-2",
    description: "Mango Giraffe template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/simple-timelapse-2/Scene").then(m => m.Scene),
    defaultProps: {
        "startTime": "04:00 PM",
        "endTime": "8:00 PM",
        "fontFamily": "Fredoka One",
        "backgroundColor": "#f5f5f5",
        "textColor": "#000000",
        "scale": 1.35,
        "animationSpeed": 1,
        "holdDuration": 10,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "startTime",
            "label": "Start Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "endTime",
            "label": "End Time",
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
            "key": "holdDuration",
            "label": "Hold at End (frames)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 90,
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
    id: "MangoGiraffeSimulationTerminated",
    title: "simulation-terminated",
    description: "Mango Giraffe template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/simulation-terminated/Scene").then(m => m.Scene),
    defaultProps: {
        "mainText": "Simulation terminated",
        "fontFamily": "JetBrains Mono",
        "backgroundColor": "#0a0a0f",
        "primaryColor": "#00ff88",
        "secondaryColor": "#00d4ff",
        "glowColor": "#00ff88",
        "scale": 1,
        "animationSpeed": 1,
        "glitchIntensity": 1,
        "scanlineOpacity": 0.15,
        "showCursor": true,
        "showGrid": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "mainText",
            "label": "Main Text",
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
            "label": "Primary (Green)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryColor",
            "label": "Secondary (Blue)",
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
            "key": "glitchIntensity",
            "label": "Glitch Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "scanlineOpacity",
            "label": "Scanline Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "showCursor",
            "label": "Show Cursor",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showGrid",
            "label": "Show Grid",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeSpillWord",
    title: "spill-word",
    description: "Mango Giraffe template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/spill-word/Scene").then(m => m.Scene),
    defaultProps: {
        "text": "Spill",
        "fontFamily": "ROTHEFIGHT",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "accentColor": "#EE82EE",
        "scale": 1,
        "animationSpeed": 1,
        "entranceDuration": 30,
        "holdDuration": 45,
        "fallStagger": 17,
        "fallDistance": 750,
        "blurIntensity": 16,
        "trailOpacity": 0.45,
        "anticipationAmount": 18,
        "maxRotation": 24
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
            "key": "accentColor",
            "label": "Accent (Dot)",
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
            "key": "entranceDuration",
            "label": "Entrance Duration",
            "type": "number",
            "group": "General",
            "min": 15,
            "max": 60,
            "step": 5
        },
        {
            "key": "holdDuration",
            "label": "Hold Duration",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        },
        {
            "key": "fallStagger",
            "label": "Fall Stagger",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 20,
            "step": 1
        },
        {
            "key": "fallDistance",
            "label": "Fall Distance",
            "type": "number",
            "group": "General",
            "min": 200,
            "max": 800,
            "step": 50
        },
        {
            "key": "blurIntensity",
            "label": "Blur Intensity",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 25,
            "step": 1
        },
        {
            "key": "trailOpacity",
            "label": "Trail Opacity",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.6,
            "step": 0.05
        },
        {
            "key": "anticipationAmount",
            "label": "Anticipation Amount",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 20,
            "step": 1
        },
        {
            "key": "maxRotation",
            "label": "Max Rotation",
            "type": "number",
            "group": "General",
            "min": 8,
            "max": 35,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeSpinningVinylPlayer1",
    title: "spinning-vinyl-player-1",
    description: "Mango Giraffe template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/spinning-vinyl-player-1/Scene").then(m => m.Scene),
    defaultProps: {
        "recordImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1770879874733-mqhzj5x/f3c464b6-b031-4b03-b728-8f7286edfe16.png",
        "backgroundColor": "#e8ffbd",
        "turntableColor": "#e2e8f0",
        "platteColor": "#cbd5e1",
        "tonearmColor": "#1e293b",
        "labelColor": "#0f172a",
        "highlightColor": "#ffffff",
        "rotationSpeed": 1,
        "highlightIntensity": 0.25,
        "shadowIntensity": 0.15,
        "showTonearm": true,
        "scale": 1,
        "animationSpeed": 1,
        "tonearmAngle": -28
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "recordImage",
            "label": "Record Image",
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
            "key": "turntableColor",
            "label": "Turntable Base",
            "type": "color",
            "group": "General"
        },
        {
            "key": "platteColor",
            "label": "Platter Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tonearmColor",
            "label": "Tonearm Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "labelColor",
            "label": "Center Label",
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
            "key": "rotationSpeed",
            "label": "Rotation Speed",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 3,
            "step": 0.1
        },
        {
            "key": "highlightIntensity",
            "label": "Highlight Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.6,
            "step": 0.05
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.4,
            "step": 0.05
        },
        {
            "key": "showTonearm",
            "label": "Show Tonearm",
            "type": "boolean",
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
            "key": "tonearmAngle",
            "label": "Tonearm Angle",
            "type": "number",
            "group": "General",
            "min": -45,
            "max": -15,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeSpotifyPlayerAnimation1",
    title: "spotify-player-animation-1",
    description: "Mango Giraffe template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/spotify-player-animation-1/Scene").then(m => m.Scene),
    defaultProps: {
        "trackTitle": "You've Got The Love (Jamie xx Rework feat. The xx)",
        "artistName": "Florence + The Machine, The xx, Jamie xx",
        "totalDuration": "5:42",
        "vinylLabel": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QDWRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAEAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAWgAAAAAAAAABAAAAAQAAAAEAAAABAAaQAAAHAAAABDAyMzKQAwACAAAAFAAAAKiRAQAHAAAABAECAwCShgAHAAAAEgAAALygAAAHAAAABDAxMDCgAQADAAAAAf\n  fontFamily: { type: ",
        "backgroundColor": "#121212",
        "textColor": "#FFFFFF",
        "secondaryTextColor": "#B3B3B3",
        "accentColor": "#1DB954",
        "progressBarColor": "#FFFFFF",
        "progressTrackColor": "#4D4D4D",
        "vinylColor": "#1A1A1A",
        "scale": 1,
        "animationSpeed": 1,
        "rotationSpeed": 0.4,
        "marqueeSpeed": 0.8,
        "progressDuration": 300,
        "showShuffleActive": true,
        "showRepeatActive": false
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "trackTitle",
            "label": "Track Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "artistName",
            "label": "Artist Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "totalDuration",
            "label": "Total Duration",
            "type": "text",
            "group": "General"
        },
        {
            "key": "vinylLabel",
            "label": "Vinyl Label",
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
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "secondaryTextColor",
            "label": "Secondary Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent (Spotify Green)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressBarColor",
            "label": "Progress Bar",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressTrackColor",
            "label": "Progress Track",
            "type": "color",
            "group": "General"
        },
        {
            "key": "vinylColor",
            "label": "Vinyl Color",
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
            "key": "rotationSpeed",
            "label": "Vinyl Rotation Speed",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 3,
            "step": 0.1
        },
        {
            "key": "marqueeSpeed",
            "label": "Marquee Speed",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "progressDuration",
            "label": "Progress Duration (frames)",
            "type": "number",
            "group": "General",
            "min": 60,
            "max": 500,
            "step": 10
        },
        {
            "key": "showShuffleActive",
            "label": "Shuffle Active",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "showRepeatActive",
            "label": "Repeat Active",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeStickyNotes",
    title: "sticky-notes",
    description: "Mango Giraffe template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/sticky-notes/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "Sticky",
        "fontFamily": "Inter",
        "backgroundColor": "#f5f5f5",
        "noteColor1": "#fef08a",
        "noteColor2": "#a5f3fc",
        "noteColor3": "#fca5a5",
        "noteColor4": "#d9f99d",
        "noteColor5": "#f5d0fe",
        "accentColor": "#fef08a",
        "textColor": "#0f172a",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 4,
        "noteCount": 12,
        "noteSize": 0.12
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
            "key": "noteColor1",
            "label": "Note Color 1",
            "type": "color",
            "group": "General"
        },
        {
            "key": "noteColor2",
            "label": "Note Color 2",
            "type": "color",
            "group": "General"
        },
        {
            "key": "noteColor3",
            "label": "Note Color 3",
            "type": "color",
            "group": "General"
        },
        {
            "key": "noteColor4",
            "label": "Note Color 4",
            "type": "color",
            "group": "General"
        },
        {
            "key": "noteColor5",
            "label": "Note Color 5",
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
            "key": "staggerDelay",
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 12,
            "step": 1
        },
        {
            "key": "noteCount",
            "label": "Note Count",
            "type": "number",
            "group": "General",
            "min": 6,
            "max": 20,
            "step": 1
        },
        {
            "key": "noteSize",
            "label": "Note Size",
            "type": "number",
            "group": "General",
            "min": 0.08,
            "max": 0.2,
            "step": 0.01
        }
    ],
  },
  {
    id: "MangoGiraffeStickyNotesAnimation",
    title: "sticky-notes-animation",
    description: "Mango Giraffe template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/sticky-notes-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "note1Text": "Don't forget!",
        "note2Text": "Call Mom ♥",
        "note3Text": "Buy milk",
        "fontFamily": "Caveat",
        "backgroundColor": "#e8dcc8",
        "note1Color": "#fef08a",
        "note2Color": "#fda4af",
        "note3Color": "#93c5fd",
        "textColor": "#1e293b",
        "scale": 1,
        "animationSpeed": 1,
        "noteDelay": 45,
        "writingSpeed": 1,
        "showShadow": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "note1Text",
            "label": "Note 1 Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "note2Text",
            "label": "Note 2 Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "note3Text",
            "label": "Note 3 Text",
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
            "label": "Desk Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "note1Color",
            "label": "Note 1 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "note2Color",
            "label": "Note 2 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "note3Color",
            "label": "Note 3 Color",
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
            "key": "noteDelay",
            "label": "Note Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        },
        {
            "key": "writingSpeed",
            "label": "Writing Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "showShadow",
            "label": "Show Shadow",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeSystem",
    title: "system",
    description: "Mango Giraffe template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/system/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "blockColor": "#ffffff",
        "lineColor": "#ffffff",
        "accentColor": "#22c55e",
        "scale": 1,
        "animationSpeed": 1,
        "blockOpacity": 0.9,
        "glowIntensity": 0.8,
        "reorganizeDelay": 45
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
            "key": "blockColor",
            "label": "Block Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lineColor",
            "label": "Line Color",
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
            "key": "blockOpacity",
            "label": "Block Opacity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "reorganizeDelay",
            "label": "Reorganize Start",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeTechYoutube1",
    title: "tech-youtube-1",
    description: "Mango Giraffe template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/tech-youtube-1/Scene").then(m => m.Scene),
    defaultProps: {
        "profileImage": "",
        "accountName": "YOUR NAME",
        "buttonText": "Subscribe",
        "fontFamily": "Roboto",
        "backgroundColor": "#ffffff",
        "buttonColor": "#CD201F",
        "buttonClickedColor": "#171717",
        "textColor": "#ffffff",
        "accountTextColor": "#0f0f0f",
        "cursorColor": "#ffffff",
        "profileBorderColor": "#CD201F",
        "imageOffsetX": 0,
        "imageOffsetY": 0,
        "imageZoom": 1,
        "scale": 1,
        "animationSpeed": 1,
        "clickFrame": 45
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "profileImage",
            "label": "Profile Picture",
            "type": "image",
            "group": "General"
        },
        {
            "key": "accountName",
            "label": "Account Name",
            "type": "text",
            "group": "General"
        },
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
            "key": "accountTextColor",
            "label": "Account Text Color",
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
            "key": "profileBorderColor",
            "label": "Profile Border",
            "type": "color",
            "group": "General"
        },
        {
            "key": "imageOffsetX",
            "label": "Image X Offset",
            "type": "number",
            "group": "General",
            "min": -50,
            "max": 50,
            "step": 1
        },
        {
            "key": "imageOffsetY",
            "label": "Image Y Offset",
            "type": "number",
            "group": "General",
            "min": -50,
            "max": 50,
            "step": 1
        },
        {
            "key": "imageZoom",
            "label": "Image Zoom",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
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
            "key": "clickFrame",
            "label": "Click Frame",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 80,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffeTerminalShowcase",
    title: "terminal-showcase",
    description: "Mango Giraffe template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/terminal-showcase/Scene").then(m => m.Scene),
    defaultProps: {
        "command": "npx skills add link-dev/skills",
        "promptSymbol": "~",
        "outputBody": "◇  Source: https://github.com/link-dev/skills.git\\n│\\n◇  Repository cloned\\n│\\n◇  Found 1 skill\\n│\\n●  Skill: link-best-practices\\n│\\n│  Best practices for link\\n│\\n◇  Detected 2 agents\\n│\\n└  Installation complete",
        "fontFamily": "Inter",
        "backgroundColor": "#f8fafc",
        "terminalBg": "#ffffff",
        "titleBarBg": "#f6f6f6",
        "textColor": "#333333",
        "promptColor": "#2ecc71",
        "accentColor": "#3d9970",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1,
        "typingSpeed": 15,
        "rotationAmount": 10,
        "showOutput": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "command",
            "label": "Command",
            "type": "text",
            "group": "General"
        },
        {
            "key": "promptSymbol",
            "label": "Prompt Symbol",
            "type": "text",
            "group": "General"
        },
        {
            "key": "outputBody",
            "label": "Output Body",
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
            "key": "terminalBg",
            "label": "Terminal Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "titleBarBg",
            "label": "Title Bar",
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
            "key": "promptColor",
            "label": "Prompt Color",
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
            "key": "typingSpeed",
            "label": "Typing Speed (chars/sec)",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 30,
            "step": 1
        },
        {
            "key": "rotationAmount",
            "label": "Rotation Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 2
        },
        {
            "key": "showOutput",
            "label": "Show Output",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeTerminalTyping",
    title: "terminal-typing",
    description: "Mango Giraffe template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/terminal-typing/Scene").then(m => m.Scene),
    defaultProps: {
        "variableName": "greeting",
        "typedText": "hello world",
        "fontFamily": "JetBrains Mono",
        "backgroundColor": "#1ca7e3",
        "editorColor": "#0a0a0a",
        "headerColor": "#d4d4d4",
        "keywordColor": "#c586c0",
        "variableColor": "#9cdcfe",
        "stringColor": "#ce9178",
        "operatorColor": "#d4d4d4",
        "cursorColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
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
            "key": "operatorColor",
            "label": "Operator Color",
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
            "key": "typingSpeed",
            "label": "Typing Speed (frames per char)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 15,
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
    id: "MangoGiraffeTextIntro",
    title: "text-intro",
    description: "Mango Giraffe template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/text-intro/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Welcome",
        "subtitle": "Demo Animation Scene",
        "backgroundColor": "#0f172a",
        "accentColor": "#3b82f6",
        "textColor": "#f8fafc",
        "subtitleColor": "#94a3b8",
        "scale": 1,
        "animationSpeed": 1,
        "entranceOffset": 30,
        "showLine": true
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
            "key": "textColor",
            "label": "Text Color",
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
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 60,
            "step": 5
        },
        {
            "key": "showLine",
            "label": "Show Line",
            "type": "boolean",
            "group": "General"
        }
    ],
  }
];

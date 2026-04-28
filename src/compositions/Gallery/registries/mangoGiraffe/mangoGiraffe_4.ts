import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_4: CompositionDef[] = [
  {
    id: "MangoGiraffeMoneyyyy",
    title: "moneyyyy",
    description: "A versatile and high-quality motion design composition featuring Moneyyyy.",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/moneyyyy/Scene").then(m => m.Scene),
    defaultProps: {
        "symbol": "$",
        "fontFamily": "Montserrat",
        "backgroundColor": "#ffffff",
        "accentColor": "#40ff1a",
        "circleRadius": 200,
        "strokeWidth": 12,
        "glowIntensity": 20,
        "symbolSize": 320,
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "symbol",
            "label": "Symbol",
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
            "label": "Accent Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "circleRadius",
            "label": "Circle Radius",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 400,
            "step": 10
        },
        {
            "key": "strokeWidth",
            "label": "Stroke Width",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 24,
            "step": 2
        },
        {
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 50,
            "step": 5
        },
        {
            "key": "symbolSize",
            "label": "Symbol Size",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 500,
            "step": 20
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
    id: "MangoGiraffeMorphBlocks",
    title: "morph-blocks",
    description: "A visually stunning abstract motion graphic showcasing Morph Blocks.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/morph-blocks/Scene").then(m => m.Scene),
    defaultProps: {
        "appTitle": "NEXA AI",
        "cardTitle": "Launch Metrics",
        "cardSubtitle": "Realtime performance",
        "statLabel": "Active Nodes",
        "statValuePrefix": "",
        "statValueSuffix": "K",
        "statValueNumber": 49.2,
        "sideTitle": "Insights",
        "sideMetricLabel": "Growth",
        "sideMetricPrefix": "+",
        "sideMetricSuffix": "%",
        "sideMetricNumber": 18.4,
        "toggleLabel": "Auto Sync",
        "bottomItem1Label": "Uptime",
        "bottomItem1Value": "99.98%",
        "bottomItem2Label": "Latency",
        "bottomItem2Value": "120ms",
        "bottomItem3Label": "Errors",
        "bottomItem3Value": "0.02%",
        "buttonLabel": "Request Access",
        "headingFont": "Space Grotesk",
        "bodyFont": "DM Sans",
        "backgroundColor": "#0b1020",
        "midColor": "#0e1428",
        "glowColor": "#111a33",
        "accentBlue": "#4f8dff",
        "platinum": "#d5d8de",
        "graphite": "#6b7280",
        "textColor": "#f8fafc",
        "mutedText": "#94a3b8",
        "glassTint": "rgba(255,255,255,0.06)",
        "glassBorder": "rgba(213,216,222,0.32)",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 6,
        "entranceOffset": 25,
        "blur": 8,
        "rotation": 0,
        "opacity": 0.9
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "appTitle",
            "label": "App Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "cardTitle",
            "label": "Main Card Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "cardSubtitle",
            "label": "Main Card Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statLabel",
            "label": "Stat Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statValuePrefix",
            "label": "Stat Prefix",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statValueSuffix",
            "label": "Stat Suffix",
            "type": "text",
            "group": "General"
        },
        {
            "key": "statValueNumber",
            "label": "Stat Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 200,
            "step": 0.1
        },
        {
            "key": "sideTitle",
            "label": "Side Card Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sideMetricLabel",
            "label": "Side Metric Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sideMetricPrefix",
            "label": "Side Metric Prefix",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sideMetricSuffix",
            "label": "Side Metric Suffix",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sideMetricNumber",
            "label": "Side Metric Value",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 100,
            "step": 0.1
        },
        {
            "key": "toggleLabel",
            "label": "Toggle Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem1Label",
            "label": "Bottom Item 1 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem1Value",
            "label": "Bottom Item 1 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem2Label",
            "label": "Bottom Item 2 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem2Value",
            "label": "Bottom Item 2 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem3Label",
            "label": "Bottom Item 3 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bottomItem3Value",
            "label": "Bottom Item 3 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "buttonLabel",
            "label": "Button Label",
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
            "key": "midColor",
            "label": "Mid Tone",
            "type": "color",
            "group": "General"
        },
        {
            "key": "glowColor",
            "label": "Ambient Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentBlue",
            "label": "Electric Sapphire",
            "type": "color",
            "group": "General"
        },
        {
            "key": "platinum",
            "label": "Platinum Edge",
            "type": "color",
            "group": "General"
        },
        {
            "key": "graphite",
            "label": "Graphite",
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
            "key": "mutedText",
            "label": "Muted Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "glassTint",
            "label": "Glass Tint",
            "type": "color",
            "group": "General"
        },
        {
            "key": "glassBorder",
            "label": "Glass Border",
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
    id: "MangoGiraffeNavalQuote",
    title: "naval-quote",
    description: "A dynamic typography design featuring Naval Quote.",
    color: "#505905",
    icon: "🎬",
    category: "Typography",
    loadComponent: () => import("../../../MangoGiraffe/naval-quote/Scene").then(m => m.Scene),
    defaultProps: {
        "displayName": "Navl",
        "username": "@naval",
        "tweetLine1": "AI is the great automator, and to",
        "tweetLine2": "automate, it must first",
        "tweetLine3": "imitate.",
        "tweetLine4": "The imitation fools",
        "tweetLine5": "people into",
        "highlightWord": "thinking",
        "avatarUrl": "",
        "fontFamily": "Inter",
        "backgroundColor": "#f5f5f5",
        "cardBackground": "#ffffff",
        "textColor": "#0f1419",
        "usernameColor": "#536471",
        "verifiedColor": "#1d9bf0",
        "highlightColor": "#1d9bf0",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "displayName",
            "label": "Display Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "username",
            "label": "Username",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tweetLine1",
            "label": "Tweet Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tweetLine2",
            "label": "Tweet Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tweetLine3",
            "label": "Tweet Line 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tweetLine4",
            "label": "Tweet Line 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tweetLine5",
            "label": "Tweet Line 5",
            "type": "text",
            "group": "General"
        },
        {
            "key": "highlightWord",
            "label": "Highlight Word",
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
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "usernameColor",
            "label": "Username Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "verifiedColor",
            "label": "Verified Badge",
            "type": "color",
            "group": "General"
        },
        {
            "key": "highlightColor",
            "label": "Highlight Color",
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
    id: "MangoGiraffeNewspaperAnimation",
    title: "newspaper-animation",
    description: "A versatile and high-quality motion design composition featuring Newspaper Animation.",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/newspaper-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "tag": "VOX STYLE EXPLAINER",
        "section": "MYSURU DASARA FESTIVAL",
        "title": "Mysuru Dasara: A Royal City in Ritual",
        "subtitle": "A 10‑day celebration where palace, procession, and public memory move as one.",
        "tagDetail": "From the torchlit Palace illumination to the grand Jamboo Savari, Dasara turns Mysuru into a living documentary of power, devotion, and civic choreography.",
        "byline": "Explainer Desk",
        "date": 2024,
        "bodyCol1": "The Wodeyar dynasty shaped Dasara as a civic ritual of legitimacy.\\nNine nights honor the goddess Chamundeshwari on the hill above the city.\\nEvery day has a theme — from royal court to folk arts.\\nMarkets, craft bazaars, and food streets act as parallel stages.\\nSecurity, transport, and sanitation become a temporary mega‑city.",
        "bodyCol2": "The Jamboo Savari procession is the cinematic climax.\\nA golden howdah carries the idol through a choreographed route.\\nHundreds of artists, elephants, and cavalry fill the frame.\\nIlluminations sync the palace to nightly crowds and drone shots.\\nTourism peaks, but the ritual remains intensely local.",
        "pullQuote": "Dasara is not just a festival — it is a live broadcast of heritage, power, and public space.",
        "stat1Value": "10 DAYS",
        "stat1Label": "Ritual Sequence",
        "stat2Value": "200+",
        "stat2Label": "Cultural Performances",
        "stat3Value": "1 CITY",
        "stat3Label": "Transformed Nightly",
        "fontFamily": "Inter",
        "backgroundColor": "#f2e6d4",
        "textColor": "#2a2219",
        "subtitleColor": "#6a5f54",
        "highlightColor": "#d6b15b",
        "gridColor": "#cdbfae",
        "quoteBgColor": "#eadfc8",
        "quoteTextColor": "#3a3128",
        "statBgColor": "#efe2c6",
        "gridOpacity": 0.14,
        "gridSize": 64,
        "gridLineWidth": 1,
        "vignetteColor": "#1f1a15",
        "vignetteOpacity": 0.2,
        "lightSweepColor": "#f6e7be",
        "lightSweepOpacity": 0.06,
        "grainOpacity": 0.12,
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "tag",
            "label": "Tag",
            "type": "text",
            "group": "General"
        },
        {
            "key": "section",
            "label": "Section",
            "type": "text",
            "group": "General"
        },
        {
            "key": "title",
            "label": "Headline",
            "type": "text",
            "group": "General"
        },
        {
            "key": "subtitle",
            "label": "Subhead",
            "type": "text",
            "group": "General"
        },
        {
            "key": "tagDetail",
            "label": "Deck",
            "type": "text",
            "group": "General"
        },
        {
            "key": "byline",
            "label": "Byline",
            "type": "text",
            "group": "General"
        },
        {
            "key": "date",
            "label": "Date",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bodyCol1",
            "label": "Body Column 1",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "bodyCol2",
            "label": "Body Column 2",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "pullQuote",
            "label": "Pull Quote",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat1Value",
            "label": "Stat 1 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat1Label",
            "label": "Stat 1 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat2Value",
            "label": "Stat 2 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat2Label",
            "label": "Stat 2 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat3Value",
            "label": "Stat 3 Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "stat3Label",
            "label": "Stat 3 Label",
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
            "key": "subtitleColor",
            "label": "Secondary Text",
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
            "key": "gridColor",
            "label": "Grid",
            "type": "color",
            "group": "General"
        },
        {
            "key": "quoteBgColor",
            "label": "Quote Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "quoteTextColor",
            "label": "Quote Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "statBgColor",
            "label": "Stat Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "gridOpacity",
            "label": "Grid Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "gridSize",
            "label": "Grid Size",
            "type": "number",
            "group": "General",
            "min": 24,
            "max": 140,
            "step": 2
        },
        {
            "key": "gridLineWidth",
            "label": "Grid Line Width",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 3,
            "step": 0.5
        },
        {
            "key": "vignetteColor",
            "label": "Vignette Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "vignetteOpacity",
            "label": "Vignette Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "lightSweepColor",
            "label": "Light Sweep",
            "type": "color",
            "group": "General"
        },
        {
            "key": "lightSweepOpacity",
            "label": "Light Sweep Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.3,
            "step": 0.02
        },
        {
            "key": "grainOpacity",
            "label": "Grain Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.4,
            "step": 0.02
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
    id: "MangoGiraffeNightStreetMarket",
    title: "night-street-market",
    description: "A versatile and high-quality motion design composition featuring Night Street Market.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/night-street-market/Scene").then(m => m.Scene),
    defaultProps: {
        "line1": "NIGHT",
        "line2": "STREET",
        "line3": "MARKET",
        "blockColor": "#111111",
        "textColor": "#ffffff",
        "accentColor": "#ff0055",
        "bulbColor": "#ffcc00",
        "backgroundDark": "#050505",
        "backgroundLight": "#1a0b12",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 15,
        "glowIntensity": 1,
        "showStringLights": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "line1",
            "label": "Line 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line2",
            "label": "Line 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line3",
            "label": "Line 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "blockColor",
            "label": "Block Color",
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
            "label": "Neon Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "bulbColor",
            "label": "Bulb Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundDark",
            "label": "Background Dark",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundLight",
            "label": "Background Light",
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
            "max": 30,
            "step": 1
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
            "key": "showStringLights",
            "label": "Show String Lights",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeNotepad",
    title: "notepad",
    description: "A functional and clean motion graphic for Notepad.",
    color: "#15414f",
    icon: "🎬",
    category: "Utility",
    loadComponent: () => import("../../../MangoGiraffe/notepad/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Note",
        "description": "Creating compelling video content requires a deep understanding of your audience. Start by identifying the core message you want to convey, then build a narrative structure that keeps viewers engaged from start to finish.",
        "cursorChar": "|",
        "headingFont": "Space Grotesk",
        "bodyFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "gridColor": "#e5e7eb",
        "panelColor": "#1c1c1c",
        "textColor": "#f8fafc",
        "accentColor": "#d95000",
        "macRed": "#ff5f57",
        "macYellow": "#febc2e",
        "macGreen": "#28c840",
        "macButtonSize": 0.018,
        "macButtonGap": 0.011,
        "macRowOffset": 0.01,
        "gridSize": 80,
        "skewX": -7,
        "skewY": 2,
        "panelWidth": 0.66,
        "panelHeight": 0.7,
        "shadowOpacity": 0.25,
        "shadowBlur": 40,
        "shadowOffset": 18,
        "cursorBlinkSpeed": 1.9,
        "typingSpeed": 1.5,
        "scale": 1,
        "animationSpeed": 1.3,
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
            "label": "Headline",
            "type": "text",
            "group": "General"
        },
        {
            "key": "description",
            "label": "Long Description",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "cursorChar",
            "label": "Cursor",
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
            "key": "gridColor",
            "label": "Grid Color",
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
            "key": "textColor",
            "label": "Text Color",
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
            "key": "macRed",
            "label": "Mac Red",
            "type": "color",
            "group": "General"
        },
        {
            "key": "macYellow",
            "label": "Mac Yellow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "macGreen",
            "label": "Mac Green",
            "type": "color",
            "group": "General"
        },
        {
            "key": "macButtonSize",
            "label": "Mac Button Size",
            "type": "number",
            "group": "General",
            "min": 0.01,
            "max": 0.04,
            "step": 0.002
        },
        {
            "key": "macButtonGap",
            "label": "Mac Button Gap",
            "type": "number",
            "group": "General",
            "min": 0.005,
            "max": 0.03,
            "step": 0.002
        },
        {
            "key": "macRowOffset",
            "label": "Mac Row Offset",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.05,
            "step": 0.002
        },
        {
            "key": "gridSize",
            "label": "Grid Size",
            "type": "number",
            "group": "General",
            "min": 40,
            "max": 140,
            "step": 5
        },
        {
            "key": "skewX",
            "label": "Skew X",
            "type": "number",
            "group": "General",
            "min": -15,
            "max": 15,
            "step": 1
        },
        {
            "key": "skewY",
            "label": "Skew Y",
            "type": "number",
            "group": "General",
            "min": -10,
            "max": 10,
            "step": 1
        },
        {
            "key": "panelWidth",
            "label": "Panel Width",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 0.95,
            "step": 0.01
        },
        {
            "key": "panelHeight",
            "label": "Panel Height",
            "type": "number",
            "group": "General",
            "min": 0.25,
            "max": 0.7,
            "step": 0.01
        },
        {
            "key": "shadowOpacity",
            "label": "Shadow Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.05
        },
        {
            "key": "shadowBlur",
            "label": "Shadow Blur",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 80,
            "step": 2
        },
        {
            "key": "shadowOffset",
            "label": "Shadow Offset",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 60,
            "step": 2
        },
        {
            "key": "cursorBlinkSpeed",
            "label": "Cursor Blink Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 3,
            "step": 0.1
        },
        {
            "key": "typingSpeed",
            "label": "Typing Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 4,
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
    id: "MangoGiraffeNotionAnimatedHub",
    title: "notion-animated-hub",
    description: "A professional UI/UX animation showcasing Notion Animated Hub.",
    color: "#869810",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/notion-animated-hub/Scene").then(m => m.Scene),
    defaultProps: {
        "brandName": "Notion",
        "pageTitle": "Project Hub",
        "subTitle": "Everything your team needs in one place",
        "actionText": "Start with a template",
        "navItem1": "Home",
        "navItem2": "Docs",
        "navItem3": "Tasks",
        "navItem4": "Calendar",
        "navItem5": "Settings",
        "logoImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACzMPSIAAAA/3RSTlMAARMmOUtecYOWqbu9zNvd6e729evZyLakhmZHJAodL0JWaXuOobPG2P7xwZAUAxYoO01gc4WYrL/R5Pf9z4gzDR9GWWx+kaPJ79ogBhgrPVBjdYmcr9Tn+bIJGjyAosTV5ggbLkBTeoyfsdf80lFVb8cLHjBDV2p8j7TsAg40Wn+33PDCEXccqvpdRJn7BRcqT2J0h5uuwNP4McUiEmvq4D8HSpXOTPK687kMinY+GWSLteg4fVgyIZ2BBPThvKgngiWweFItpmUV49CXhHJfOm7Ww555EJJtSDUP5Y1oVEHfy7ilk1tJNqtO7Sm+4kXKLDenZ61wmiPeXJSgYc3kGc5fAAAgVElEQVR42u2deUAWRf/AB0U0ERFFLcwjDwwVUdI8QPDEG8rX1Hg4vV4PCsqyTLwF8QXUtHzTULzNI9HMLDXvo9S0TM0rNcvSrEx786dZ7e/hgU1B4NnZ/c7O7O7387cyM9/vZ+fZmd2dLyEIBC6lSruWcStb7qHy7hU8PCp6VvKqLElSFS/vqtWqP/yIT41HXXj3EIGmZq3adR6rW69+A9+Gj3v7SU5o1LjJY/68u4xoo2lAs+aBT7Ro+WSr1m3aBjlL+YMEtwsJ5T0GhI72HUI7durcJaxr9W4Vu9On/EF6lOvJe0xIifTqHR7x1NN9/tX3mcb9+g+AyHnheeDZGnhDIBaRtvCoQJ/osBjf2Lj4YAY5L0w/t6a8x2xxBg4aPGSoz7+HDR8RO7JSgg4pL8xzz/MOgeXIvcwTk/Ivcw4pL8wLrrwjYnpeHPXSy6NfeXVMg9deqDqWd74fJHh4AO8ImY9IW2igW95l7qlinaYz3ZOSeQfM+IzrOb7GhM4Twx6e1G3yFN4ZpWZqM97xMyIp9nv2vMvcI57FOk1PglJxElBAgXWa011XY+E+jXd0hWSgLf8yT7OnfDrvJDFlyn94B1sQ7Jd5uptA6zT9SCvFO/b8Uu64zDNyU57JOw0c6V+Gdyr0YsbMWVGvz57zxptz\n  icon1: { type: ",
        "icon2": "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
        "icon3": "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
        "icon4": "https://cdn-icons-png.flaticon.com/512/747/747310.png",
        "icon5": "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
        "brandFont": "Space Grotesk",
        "uiFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "secondaryColor": "#6b7280",
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
            "key": "brandName",
            "label": "Brand Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "pageTitle",
            "label": "Page Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "subTitle",
            "label": "Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "actionText",
            "label": "Action Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navItem1",
            "label": "Nav Item 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navItem2",
            "label": "Nav Item 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navItem3",
            "label": "Nav Item 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navItem4",
            "label": "Nav Item 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "navItem5",
            "label": "Nav Item 5",
            "type": "text",
            "group": "General"
        },
        {
            "key": "logoImage",
            "label": "Logo Image",
            "type": "image",
            "group": "General"
        },
        {
            "key": "icon2",
            "label": "Icon 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "icon3",
            "label": "Icon 3",
            "type": "image",
            "group": "General"
        },
        {
            "key": "icon4",
            "label": "Icon 4",
            "type": "image",
            "group": "General"
        },
        {
            "key": "icon5",
            "label": "Icon 5",
            "type": "image",
            "group": "General"
        },
        {
            "key": "brandFont",
            "label": "Brand Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "uiFont",
            "label": "UI Font",
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
    id: "MangoGiraffeOnOffToggle",
    title: "on-off-toggle",
    description: "A professional UI/UX animation showcasing On Off Toggle.",
    color: "#387c04",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/on-off-toggle/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#f8fafc",
        "offColor": "#cbd5e1",
        "onColor": "#22c55e",
        "knobColor": "#ffffff",
        "glowColor": "#22c55e",
        "scale": 1,
        "animationSpeed": 1,
        "toggleWidth": 120,
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
            "key": "offColor",
            "label": "Off Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "onColor",
            "label": "On Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "knobColor",
            "label": "Knob Color",
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
            "key": "toggleWidth",
            "label": "Toggle Width",
            "type": "number",
            "group": "General",
            "min": 80,
            "max": 200,
            "step": 10
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
    id: "MangoGiraffeOutsidelandsPoster",
    title: "outsidelands-poster",
    description: "A versatile and high-quality motion design composition featuring Outsidelands Poster.",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/outsidelands-poster/Scene").then(m => m.Scene),
    defaultProps: {
        "fridayLabel": "FRIDAY",
        "saturdayLabel": "SATURDAY",
        "sundayLabel": "SUNDAY",
        "fridayH1": "CHARLI XCX",
        "fridayH2": "TURNSTILE",
        "fridayH3": "GRiZTRONICS",
        "fridayH4": "LABRINTH",
        "fridayBody": "GLORILLA\\nGEESE • CLIPSE\\nMODEST MOUSE\\nWET LEG • TINASHE\\nSIERRA FERRELL\\nHYPERBEAM (ODD MOB + OMNOM)\\nTHE STORY SO FAR\\nYØU$UK€ • ¥UKIMAT$U • KI/KI\\nDURAND BERNARR\\nALLEYCVT • DIE SPITZ • MPH\\nGOLDIE BOUTILIER • DYLAN BRADY\\nTOBIAHS • BILLIE MARTEN\\nFAOUZIA • BAD NERVES\\nLUKE ALESSI • CHEZILE\\nSAWYER HILL • NEZZA • VERTIGO",
        "saturdayH1": "THE STROKES",
        "saturdayH2": "THE XX",
        "saturdayH3": "DJO | DIJON",
        "saturdayH4": "PINKPANTHERESS",
        "saturdayBody": "ETHEL CAIN\\nLUCY DACUS\\nMALCOLM TODD • LANE 8\\nSNOW STRIPPERS\\nIT'S MURPH • AUDREY HOBERT\\nBEN BÖHMER\\nDJ TRIXIE MATTEL • ŁASZEWO\\nSIENNA SPIRO\\nSULTAN + SHEPARD | SILVANA ESTRADA\\nHAUTE & FREDDY • YARD ACT\\nWUNDERHORSE • CAMOUFLY\\nBANDALOS CHINOS • AFTER\\nRIO KOSTA • AUTOMATIC\\nRACING MOUNT PLEASANT • BAD JUUJU\\n1-800 GIRLS • RED LEATHER • RYMAN",
        "sundayH1": "RÜFÜS DU SOL",
        "sundayH2": "BABY KEEM",
        "sundayH3": "EMPIRE OF THE SUN",
        "sundayH4": "DEATH CAB FOR CUTIE",
        "sundayBody": "DISCO LINES\\nMARIAH THE SCIENTIST\\nNOT FOR BORIS • RADIO BREJCHA\\nTHE TEMPER TRAP • JADE\\nKWN • BOYS NOIZE\\nDESTIN CONRAD • KINGFISHR\\nBALU BRIGADA • FROST CHILDREN\\nMISS MONIQUE • CARLITA\\nAMBLE • MOMMA\\nINFINITY SONG • SPORTS\\nMARLON FUNAKI • NIGHT TAPES\\nX CLUB • JIM LEGXACY • SOSOCAMO\\nDAY WE RAN • CRUZ BECKHAM • BRITTON\\nDEATH CAB FOR CUTIE ☀️/🌙",
        "fontFamily": "Archivo Black",
        "undercardSize": 0.028,
        "undercardLineHeight": 1.35,
        "undercardLetterSpacing": -0.02,
        "columnWidth": 32,
        "columnHeight": 93,
        "backgroundColor": "#f8f7eb",
        "backgroundImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774394857806-ghpezky/ol26_mainadmat_030226_bg_withlandsend_3.png",
        "bgOpacity": 1,
        "headerImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoIAAACPCAYAAABu8briAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAL51JREFUeAHtnQ+QVNWd78/tQf7LDIJGEXCMPE1AYNzaXR8W6KRiVvIglZf3FNyYV2IebqKxKhirEjTuIrtJ5Fnlv3qIuxsTx9pohFgbLfCJL2YzIgWl721sQIymMI4zmKCCzvBPRWbunu+9fWZunz73X3ff7tu3v5+qhpme27fvPf9+3/P7/c65liiDCR2dHfbQ0Jcty+q0hWgX7osQQsrCEiIvx5IeOaY8dSzf3SUIIYTUBCvOwWM7OttbbPthOWB3CkIISYYeYdtdx3dvWysIIYQkSmQhOG7epd+Ws/U75I9tghBCkqdntGV9rj/f3SMIIYQkQiQhOH7epWuEKwIJIaSWUAwSQkiChApBikBCSJ2hGCSEkITIBf0ROYEUgYSQOtP+iW0/LAghhFSdQCHYwsGXEJICsEBtYkdnpyCEEFJVRvn9wdkixrY7RUKcM2mKWHT2Bb5/f+Ht34u3Dh8MOoXzeZwn7ueCrmHgxIdi8xsvB35u0fQLxLyp0+Xnp4rW0eOc/3UGPj4u3jpyyLmWPQf3i93v9Yl++V45LD3vItEmv6dSNv8h71xXrWgbM17MPX2GOOfUKWKmLGv87wVljfLpPfK+Uz5R663W4D5Q5zNPPW24zr2o+4hbzzjv0k93iHmyjPzaEc67+2Cfc+5t+18XUVFlj3baKn82lT2uU11znLKPUh7lnjsIOR6tkf91C0IIIVVjVMDfVogEue0vvyS+9tlLfP/+s9/tEN94rksE8bXZC8TXPlN8jqv/z4bIhqd19HjxT5evKHoPQtIkBGH8vtXxeXHj/M87P5cD7ulHL22JbRjvWnSVNORTRaVs/udVohZAJHxf1u+is8+P9bndUjg8kH/OKac0UO59hNVznPN6j4G42iLFfNC5Mbn5X4uWO5+L007Dyh7nuuazC8SXPn1R7PJ46/Ahec2bK65XeAXbOjrbmStICCHVwz80bNuXiYSAhytIBAL8/dIAj6EfAx99GP3YE9E8N/OmzhB7r/2RI17LFYEA97Tz6tud89WDWngDb7v4S2LrV26JLRYAvFcQ5q9ee6fRO1ZLKrkP1POrsr2Y2vhdly4v+7xoe6oNmc6NdrXj6r+VYq0jdjtVZf99ed/G8/717XJCsrys64Y49Tt3XD4W4r8KQgghVcPXIyhn3x0iIeDh0vnuto2OkfTyj9J4zH7kVlFPYMSe+W+3BBpWhIB1EMptNXwG7/3TF1aIBT\n  headerHeight: { type: ",
        "headerTop": 8,
        "contentTop": 53,
        "navyColor": "#0d212c",
        "fridayColor": "#bef724",
        "saturdayColor": "#fac832",
        "sundayColor": "#f498c0",
        "colOpacity": 0.5,
        "footerImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1774394857806-ghpezky/image_7.png",
        "footerHeight": 18,
        "footerOpacity": 1,
        "scale": 0.4,
        "animationSpeed": 0.9,
        "stagger": 23
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "fridayLabel",
            "label": "Friday Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "saturdayLabel",
            "label": "Saturday Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sundayLabel",
            "label": "Sunday Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fridayH1",
            "label": "Fri H1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fridayH2",
            "label": "Fri H2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fridayH3",
            "label": "Fri H3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fridayH4",
            "label": "Fri H4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "fridayBody",
            "label": "Fri Undercard",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "saturdayH1",
            "label": "Sat H1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "saturdayH2",
            "label": "Sat H2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "saturdayH3",
            "label": "Sat H3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "saturdayH4",
            "label": "Sat H4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "saturdayBody",
            "label": "Sat Undercard",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "sundayH1",
            "label": "Sun H1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sundayH2",
            "label": "Sun H2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sundayH3",
            "label": "Sun H3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sundayH4",
            "label": "Sun H4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "sundayBody",
            "label": "Sun Undercard",
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
            "key": "undercardSize",
            "label": "Undercard Font Size",
            "type": "number",
            "group": "General",
            "min": 0.01,
            "max": 0.05,
            "step": 0.001
        },
        {
            "key": "undercardLineHeight",
            "label": "Undercard Line Height",
            "type": "number",
            "group": "General",
            "min": 0.8,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "undercardLetterSpacing",
            "label": "Undercard Letter Spacing",
            "type": "number",
            "group": "General",
            "min": -0.1,
            "max": 0.1,
            "step": 0.01
        },
        {
            "key": "columnWidth",
            "label": "Col Width (%)",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 50,
            "step": 1
        },
        {
            "key": "columnHeight",
            "label": "Col Height (%)",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 150,
            "step": 1
        },
        {
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "backgroundImage",
            "label": "Background Image",
            "type": "image",
            "group": "General"
        },
        {
            "key": "bgOpacity",
            "label": "Image Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "headerImage",
            "label": "Top Logo Image",
            "type": "image",
            "group": "General"
        },
        {
            "key": "headerTop",
            "label": "Top Logo Padding (%)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 1
        },
        {
            "key": "contentTop",
            "label": "Columns Y Position (%)",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 1
        },
        {
            "key": "navyColor",
            "label": "Navy",
            "type": "color",
            "group": "General"
        },
        {
            "key": "fridayColor",
            "label": "Fri Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "saturdayColor",
            "label": "Sat Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sundayColor",
            "label": "Sun Accent",
            "type": "color",
            "group": "General"
        },
        {
            "key": "colOpacity",
            "label": "Column Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "footerImage",
            "label": "Bottom Overlay Image",
            "type": "image",
            "group": "General"
        },
        {
            "key": "footerHeight",
            "label": "Bottom Image Height (%)",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 40,
            "step": 1
        },
        {
            "key": "footerOpacity",
            "label": "Bottom Image Opacity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 1.5,
            "step": 0.05
        },
        {
            "key": "animationSpeed",
            "label": "Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "stagger",
            "label": "Day Stagger",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 40,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeParticleExplosion",
    title: "particle-explosion",
    description: "A visually stunning abstract motion graphic showcasing Particle Explosion.",
    color: "#9003ba",
    icon: "🎬",
    category: "3D & Abstract",
    loadComponent: () => import("../../../MangoGiraffe/particle-explosion/Scene").then(m => m.Scene),
    defaultProps: {
        "centerText": "BOOM",
        "backgroundColor": "#0a0a0a",
        "centerGradient1": "#667eea",
        "centerGradient2": "#764ba2",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "particleCount": 40,
        "particleSpeed": 0.3
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "centerText",
            "label": "Center Text",
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
            "key": "centerGradient1",
            "label": "Center Gradient 1",
            "type": "color",
            "group": "General"
        },
        {
            "key": "centerGradient2",
            "label": "Center Gradient 2",
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
            "key": "particleCount",
            "label": "Particle Count",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 80,
            "step": 5
        },
        {
            "key": "particleSpeed",
            "label": "Particle Speed",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.8,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffePhoneMessages",
    title: "phone-messages",
    description: "An engaging social media-inspired animation for Phone Messages.",
    color: "#f280d8",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/phone-messages/Scene").then(m => m.Scene),
    defaultProps: {
        "contactName": "John",
        "message1": "Hey!",
        "message2": "Hi there!",
        "message3": "How are you?",
        "message4": "Doing great!",
        "backgroundColor": "#1a1a1a",
        "phoneColor": "#f2f2f7",
        "sentBubbleColor": "#007aff",
        "receivedBubbleColor": "#e5e5ea",
        "scale": 1,
        "animationSpeed": 1,
        "messageDelay": 20
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "contactName",
            "label": "Contact Name",
            "type": "text",
            "group": "General"
        },
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
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "phoneColor",
            "label": "Phone Screen",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sentBubbleColor",
            "label": "Sent Bubble",
            "type": "color",
            "group": "General"
        },
        {
            "key": "receivedBubbleColor",
            "label": "Received Bubble",
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
            "key": "messageDelay",
            "label": "Message Delay",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 40,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffePhoneMessages1",
    title: "phone-messages-1",
    description: "An engaging social media-inspired animation for Phone Messages 1.",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/phone-messages-1/Scene").then(m => m.Scene),
    defaultProps: {
        "contactName": "John",
        "message1": "Hey!",
        "message2": "Hi there!",
        "message3": "How are you?",
        "message4": "Doing great!",
        "backgroundColor": "#1a1a1a",
        "phoneColor": "#f2f2f7",
        "sentBubbleColor": "#007aff",
        "receivedBubbleColor": "#e5e5ea",
        "scale": 1,
        "animationSpeed": 1,
        "messageDelay": 20
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "contactName",
            "label": "Contact Name",
            "type": "text",
            "group": "General"
        },
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
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "phoneColor",
            "label": "Phone Screen",
            "type": "color",
            "group": "General"
        },
        {
            "key": "sentBubbleColor",
            "label": "Sent Bubble",
            "type": "color",
            "group": "General"
        },
        {
            "key": "receivedBubbleColor",
            "label": "Received Bubble",
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
            "key": "messageDelay",
            "label": "Message Delay",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 40,
            "step": 5
        }
    ],
  },
  {
    id: "MangoGiraffePhoneNotificationPopUp",
    title: "phone-notification-pop-up",
    description: "A professional UI/UX animation showcasing Phone Notification Pop Up.",
    color: "#505905",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/phone-notification-pop-up/Scene").then(m => m.Scene),
    defaultProps: {
        "notificationMessage": "hi how are you",
        "senderName": "Sarah",
        "appName": "Messages",
        "fontFamily": "Open Sans",
        "backgroundColor": "#ffffff",
        "phoneColor": "#1e293b",
        "screenColor": "#0f172a",
        "notificationBg": "#ffffff",
        "accentColor": "#3b82f6",
        "scale": 1.25,
        "animationSpeed": 1,
        "notificationDelay": 15,
        "showTime": true,
        "vibrationIntensity": 0.5,
        "glowIntensity": 0.6
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "notificationMessage",
            "label": "Notification Message",
            "type": "text",
            "group": "General"
        },
        {
            "key": "senderName",
            "label": "Sender Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "appName",
            "label": "App Name",
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
            "key": "phoneColor",
            "label": "Phone Color",
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
            "key": "notificationBg",
            "label": "Notification Background",
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
            "key": "notificationDelay",
            "label": "Notification Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 15,
            "max": 60,
            "step": 5
        },
        {
            "key": "showTime",
            "label": "Show Time",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "vibrationIntensity",
            "label": "Vibration Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        },
        {
            "key": "glowIntensity",
            "label": "Screen Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        }
    ],
  },
  {
    id: "MangoGiraffePhotoboothAnimation1",
    title: "photobooth-animation-1",
    description: "A versatile and high-quality motion design composition featuring Photobooth Animation 1.",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/photobooth-animation-1/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#eabec9",
        "slotColor": "#E8E8E8",
        "paperColor": "#FAFAFA",
        "textColor": "#1a1a1a",
        "scale": 1,
        "animationSpeed": 1,
        "verticalPosition": 0.19,
        "dateText": "01.15.2024",
        "timeText": "14:32",
        "photo1": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1770879986061-p6x5t5j/photo4_2.png",
        "photo2": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/template-1770879986061-p6x5t5j/photo4_3.png",
        "photo3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfEAAALVCAYAAADQ59jAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAA008SURBVHgBlP0J0hzJdp3tosASO0mUSfOfiMakvqFESjzA/R3GVfbUWztxdN3sQ2ZGeLP7vbyJwC\n  showStripes: { type: "
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
            "key": "slotColor",
            "label": "Slot Frame",
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
            "key": "verticalPosition",
            "label": "Vertical Position",
            "type": "number",
            "group": "General",
            "min": 0.05,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "dateText",
            "label": "Date",
            "type": "text",
            "group": "General"
        },
        {
            "key": "timeText",
            "label": "Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "photo1",
            "label": "Photo 1",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo2",
            "label": "Photo 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo3",
            "label": "Photo 3",
            "type": "image",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffePhotosAnimation",
    title: "photos-animation",
    description: "A versatile and high-quality motion design composition featuring Photos Animation.",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/photos-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "photo1": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        "photo2": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
        "photo3": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
        "photo4": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
        "photo5": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
        "backgroundColor": "#f8fafc",
        "shadowColor": "rgba(15, 23, 42, 0.15)",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 12,
        "photoSize": 0.15,
        "photoGap": 0.02,
        "borderRadius": 12,
        "shadowIntensity": 0.15
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "photo1",
            "label": "Photo 1",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo2",
            "label": "Photo 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo3",
            "label": "Photo 3",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo4",
            "label": "Photo 4",
            "type": "image",
            "group": "General"
        },
        {
            "key": "photo5",
            "label": "Photo 5",
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
            "min": 5,
            "max": 25,
            "step": 1
        },
        {
            "key": "photoSize",
            "label": "Photo Size",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.3,
            "step": 0.01
        },
        {
            "key": "photoGap",
            "label": "Photo Gap",
            "type": "number",
            "group": "General",
            "min": 0.01,
            "max": 0.05,
            "step": 0.005
        },
        {
            "key": "borderRadius",
            "label": "Border Radius",
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
            "max": 0.4,
            "step": 0.05
        }
    ],
  },
  {
    id: "MangoGiraffePhotoshopAnimation1",
    title: "photoshop-animation-1",
    description: "A professional UI/UX animation showcasing Photoshop Animation 1.",
    color: "#15414f",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/photoshop-animation-1/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "Ps",
        "backgroundColor": "#121212",
        "logoBackgroundColor": "#001E36",
        "logoTextColor": "#31A8FF",
        "glowColor": "#31A8FF",
        "scale": 1,
        "animationSpeed": 1,
        "glowIntensity": 0.6,
        "pulseIntensity": 0.03,
        "entranceOffset": 25,
        "opacity": 1
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
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "logoBackgroundColor",
            "label": "Logo Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "logoTextColor",
            "label": "Logo Text Color",
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
            "key": "pulseIntensity",
            "label": "Pulse Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.1,
            "step": 0.01
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
    id: "MangoGiraffePins",
    title: "pins",
    description: "A versatile and high-quality motion design composition featuring Pins.",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/pins/Scene").then(m => m.Scene),
    defaultProps: {
        "letter1": "S",
        "letter2": "W",
        "letter3": "I",
        "letter4": "S",
        "letter5": "H",
        "letter6": "Y",
        "ballColor": "#000000",
        "backgroundColor": "#ffffff",
        "textColor": "#ffffff",
        "fontFamily": "VT323",
        "scale": 1,
        "animationSpeed": 1.2,
        "stagger": 8,
        "gravityIntensity": 14
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "letter1",
            "label": "Letter 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "letter2",
            "label": "Letter 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "letter3",
            "label": "Letter 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "letter4",
            "label": "Letter 4",
            "type": "text",
            "group": "General"
        },
        {
            "key": "letter5",
            "label": "Letter 5",
            "type": "text",
            "group": "General"
        },
        {
            "key": "letter6",
            "label": "Letter 6",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ballColor",
            "label": "Ball Color",
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
            "key": "stagger",
            "label": "Stagger Frames",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 20,
            "step": 1
        },
        {
            "key": "gravityIntensity",
            "label": "Gravity Bounce",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 30,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffePopUpMessageBubble",
    title: "pop-up-message-bubble",
    description: "An engaging social media-inspired animation for Pop Up Message Bubble.",
    color: "#387c04",
    icon: "🎬",
    category: "Social & Media",
    loadComponent: () => import("../../../MangoGiraffe/pop-up-message-bubble/Scene").then(m => m.Scene),
    defaultProps: {
        "brandText": "MANGO GIRAFFE",
        "fontFamily": "Inter",
        "backgroundColor": "#f3f4f6",
        "badgeColor": "#000000",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "borderRadius": 32,
        "paddingHorizontal": 120,
        "paddingVertical": 64
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "brandText",
            "label": "Brand Text",
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
            "key": "badgeColor",
            "label": "Badge Color",
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
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 60,
            "step": 4
        },
        {
            "key": "paddingHorizontal",
            "label": "Padding Horizontal",
            "type": "number",
            "group": "General",
            "min": 40,
            "max": 200,
            "step": 10
        },
        {
            "key": "paddingVertical",
            "label": "Padding Vertical",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 120,
            "step": 8
        }
    ],
  },
  {
    id: "MangoGiraffePopulation",
    title: "population",
    description: "A clear and dynamic data visualization of Population.",
    color: "#0981c2",
    icon: "🎬",
    category: "Data & Charts",
    loadComponent: () => import("../../../MangoGiraffe/population/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Population aged 0-49, 50-59, 60-69, 70-79 and 80 years and over, Brazil: 1950-2100",
        "yLabel": "Number of people (thousands)",
        "source": "Source: UN/ESA. World Population Prospects 2024 https://population.un.org/wpp/",
        "fontFamily": "Roboto",
        "backgroundColor": "#ffffff",
        "textColor": "#eb0000",
        "axisColor": "#9ca3af",
        "green": "#4f0de7",
        "purple": "#7c3aed",
        "red": "#ef4444",
        "yellow": "#f59e0b",
        "blue": "#2563eb",
        "scale": 0.85,
        "animationSpeed": 2,
        "staggerDelay": 6,
        "entranceOffset": 10,
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
            "key": "yLabel",
            "label": "Y Axis Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "source",
            "label": "Source",
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
            "key": "axisColor",
            "label": "Axis",
            "type": "color",
            "group": "General"
        },
        {
            "key": "green",
            "label": "50-59",
            "type": "color",
            "group": "General"
        },
        {
            "key": "purple",
            "label": "60-69",
            "type": "color",
            "group": "General"
        },
        {
            "key": "red",
            "label": "70-79",
            "type": "color",
            "group": "General"
        },
        {
            "key": "yellow",
            "label": "80+",
            "type": "color",
            "group": "General"
        },
        {
            "key": "blue",
            "label": "0-49",
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
    id: "MangoGiraffePremiereProAnimation",
    title: "premiere-pro-animation",
    description: "A professional UI/UX animation showcasing Premiere Pro Animation.",
    color: "#9003ba",
    icon: "🎬",
    category: "UI & App",
    loadComponent: () => import("../../../MangoGiraffe/premiere-pro-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "Pr",
        "fontFamily": "Source Sans Pro",
        "backgroundColor": "#0a0a12",
        "logoBoxColor": "#00005B",
        "logoTextColor": "#9999FF",
        "glowColor": "#7c3aed",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 8,
        "entranceOffset": 25,
        "blur": 0,
        "rotation": 0,
        "opacity": 1,
        "glowIntensity": 0.6
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
            "key": "logoBoxColor",
            "label": "Logo Box",
            "type": "color",
            "group": "General"
        },
        {
            "key": "logoTextColor",
            "label": "Logo Text",
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
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 1,
            "step": 0.1
        }
    ],
  }
];

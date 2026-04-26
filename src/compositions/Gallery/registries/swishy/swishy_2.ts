import { CompositionDef } from "../../types";

export const SWISHY_REGISTRY_2: CompositionDef[] = [
  {
    id: "SwishyExtend",
    title: "extend",
    description: "Swishy template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/extend/Scene").then(m => m.Scene),
    defaultProps: {
        "text": "EXTEND",
        "fontFamily": "Bebas Neue",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "stretchIntensity": 3,
        "diagonalAngle": 15
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
            "key": "stretchIntensity",
            "label": "Stretch Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 8,
            "step": 0.5
        },
        {
            "key": "diagonalAngle",
            "label": "Diagonal Angle",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 45,
            "step": 1
        }
    ],
  },
  {
    id: "SwishyFinancials",
    title: "financials",
    description: "Swishy template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/financials/Scene").then(m => m.Scene),
    defaultProps: {
        "maxDollarAmount": 1696,
        "tooltipLabel": "Expenses",
        "backgroundColor": "#0a0a0a",
        "textColorStart": "#ffffff",
        "textColorEnd": "#404040",
        "gridLineColor": "#1a1a1a",
        "curveColor": "#cc0000",
        "curveGlowColor": "#ff0033",
        "tooltipBg": "#2d2d2d",
        "tooltipTextColor": "#ffffff",
        "tooltipLabelColor": "#a0a0a0",
        "scale": 1,
        "animationSpeed": 1,
        "backgroundTextOpacity": 0.35,
        "gridLineCount": 6
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "maxDollarAmount",
            "label": "Max Dollar Amount",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 10000,
            "step": 1
        },
        {
            "key": "tooltipLabel",
            "label": "Tooltip Label",
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
            "key": "textColorStart",
            "label": "Text Gradient Start",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColorEnd",
            "label": "Text Gradient End",
            "type": "color",
            "group": "General"
        },
        {
            "key": "gridLineColor",
            "label": "Grid Lines",
            "type": "color",
            "group": "General"
        },
        {
            "key": "curveColor",
            "label": "Curve Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "curveGlowColor",
            "label": "Curve Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tooltipBg",
            "label": "Tooltip Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tooltipTextColor",
            "label": "Tooltip Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "tooltipLabelColor",
            "label": "Tooltip Label Color",
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
            "key": "backgroundTextOpacity",
            "label": "Background Text Opacity",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "gridLineCount",
            "label": "Grid Line Count",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 10,
            "step": 1
        }
    ],
  },
  {
    id: "SwishyFintechDashboard",
    title: "fintech-dashboard",
    description: "Swishy template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/fintech-dashboard/Scene").then(m => m.Scene),
    defaultProps: {
        "cardTitle": "Portfolio Value",
        "mainValue": "$127,482",
        "percentChange": "+12.4%",
        "periodLabel": "vs last month",
        "fontFamily": "Inter",
        "backgroundColor": "#0f172a",
        "cardBackground": "#1e293b",
        "accentColor": "#3b82f6",
        "neonGlow": "#60a5fa",
        "positiveColor": "#10b981",
        "textColor": "#f8fafc",
        "secondaryText": "#94a3b8",
        "scale": 1,
        "animationSpeed": 1,
        "skeletonDuration": 35,
        "chartDrawDuration": 40,
        "glassBlur": 12,
        "borderRadius": 16
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "cardTitle",
            "label": "Card Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "mainValue",
            "label": "Main Value",
            "type": "text",
            "group": "General"
        },
        {
            "key": "percentChange",
            "label": "Change %",
            "type": "text",
            "group": "General"
        },
        {
            "key": "periodLabel",
            "label": "Period",
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
            "key": "neonGlow",
            "label": "Neon Glow",
            "type": "color",
            "group": "General"
        },
        {
            "key": "positiveColor",
            "label": "Positive",
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
            "label": "Secondary Text",
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
            "key": "skeletonDuration",
            "label": "Skeleton Duration",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 60,
            "step": 5
        },
        {
            "key": "chartDrawDuration",
            "label": "Chart Draw Duration",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 60,
            "step": 5
        },
        {
            "key": "glassBlur",
            "label": "Glass Blur",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 2
        },
        {
            "key": "borderRadius",
            "label": "Border Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 40,
            "step": 2
        }
    ],
  },
  {
    id: "SwishyFlightProgress",
    title: "flight-progress",
    description: "Swishy template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/flight-progress/Scene").then(m => m.Scene),
    defaultProps: {
        "departureCode": "YYZ",
        "departureCity": "Toronto",
        "departureTime": "MON, 6:14 PM",
        "arrivalCode": "HND",
        "arrivalCity": "Tokyo",
        "arrivalTime": "TUE, 7:14 AM",
        "etaTime": "ETA 2:15 PM",
        "etaTimezone": "Tokyo Time",
        "etaEvent": "DINNER IN 2:34H",
        "flightProgress": 65,
        "timeRemaining": "-2H 48M",
        "backgroundColor": "#e0e0e0",
        "cardBackground": "#0f0f12",
        "accentColor": "#7cff01",
        "arrowColor": "#ff7b00",
        "textColor": "#ffffff",
        "mutedColor": "#888888",
        "codeFont": "Codystar",
        "bodyFont": "Inter",
        "monoFont": "Roboto Mono",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "departureCode",
            "label": "Departure Code",
            "type": "text",
            "group": "General"
        },
        {
            "key": "departureCity",
            "label": "Departure City",
            "type": "text",
            "group": "General"
        },
        {
            "key": "departureTime",
            "label": "Departure Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "arrivalCode",
            "label": "Arrival Code",
            "type": "text",
            "group": "General"
        },
        {
            "key": "arrivalCity",
            "label": "Arrival City",
            "type": "text",
            "group": "General"
        },
        {
            "key": "arrivalTime",
            "label": "Arrival Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "etaTime",
            "label": "ETA Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "etaTimezone",
            "label": "ETA Timezone",
            "type": "text",
            "group": "General"
        },
        {
            "key": "etaEvent",
            "label": "Event Countdown",
            "type": "text",
            "group": "General"
        },
        {
            "key": "flightProgress",
            "label": "Flight Progress %",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 100,
            "step": 1
        },
        {
            "key": "timeRemaining",
            "label": "Time Remaining",
            "type": "text",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Page Background",
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
            "label": "Accent Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "arrowColor",
            "label": "Arrow Color",
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
            "key": "mutedColor",
            "label": "Muted Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "codeFont",
            "label": "Airport Code Font",
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
            "key": "monoFont",
            "label": "Mono Font",
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
    id: "SwishyFlightsAnimation",
    title: "flights-animation",
    description: "Swishy template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/flights-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "ARRIVALS",
        "time1": "09:15",
        "dest1": "TOKYO",
        "carrier1": "JL",
        "number1": 5021,
        "time2": "10:30",
        "dest2": "PARIS",
        "carrier2": "AF",
        "number2": 1247,
        "time3": "11:45",
        "dest3": "NEW YORK",
        "carrier3": "AA",
        "number3": 9876,
        "headingFont": "Oswald",
        "flipFont": "Roboto Mono",
        "backgroundColor": "#000000",
        "tileColor": "#1a1a1a",
        "textColor": "#ffffff",
        "labelColor": "#cccccc",
        "borderColor": "#333333",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 15,
        "flipCycles": 8
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "title",
            "label": "Board Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "time1",
            "label": "Flight 1 Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dest1",
            "label": "Flight 1 Destination",
            "type": "text",
            "group": "General"
        },
        {
            "key": "carrier1",
            "label": "Flight 1 Carrier",
            "type": "text",
            "group": "General"
        },
        {
            "key": "number1",
            "label": "Flight 1 Number",
            "type": "text",
            "group": "General"
        },
        {
            "key": "time2",
            "label": "Flight 2 Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dest2",
            "label": "Flight 2 Destination",
            "type": "text",
            "group": "General"
        },
        {
            "key": "carrier2",
            "label": "Flight 2 Carrier",
            "type": "text",
            "group": "General"
        },
        {
            "key": "number2",
            "label": "Flight 2 Number",
            "type": "text",
            "group": "General"
        },
        {
            "key": "time3",
            "label": "Flight 3 Time",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dest3",
            "label": "Flight 3 Destination",
            "type": "text",
            "group": "General"
        },
        {
            "key": "carrier3",
            "label": "Flight 3 Carrier",
            "type": "text",
            "group": "General"
        },
        {
            "key": "number3",
            "label": "Flight 3 Number",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headingFont",
            "label": "Title Font",
            "type": "font",
            "group": "General"
        },
        {
            "key": "flipFont",
            "label": "Flip Board Font",
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
            "key": "tileColor",
            "label": "Tile Color",
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
            "key": "borderColor",
            "label": "Border Color",
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
            "label": "Row Stagger (frames)",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 30,
            "step": 1
        },
        {
            "key": "flipCycles",
            "label": "Flip Cycles",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 15,
            "step": 1
        }
    ],
  },
  {
    id: "SwishyFolderGallery1",
    title: "folder-gallery-1",
    description: "Swishy template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/folder-gallery-1/Scene").then(m => m.Scene),
    defaultProps: {
        "folderName": "untitled",
        "image1": "",
        "image2": "",
        "image3": "",
        "image4": "",
        "backgroundColor": "#ffe5e5",
        "folderColor": "#99c0ff",
        "folderDarkColor": "#86b4fd",
        "windowColor": "#1e293b",
        "textColor": "#1a1a1a",
        "cursorFill": "#ffffff",
        "cursorOutline": "#000000",
        "accentColor": "#3b82f6",
        "placeholderColor": "#e2e8f0",
        "scale": 1,
        "animationSpeed": 1,
        "hoverDelay": 30,
        "clickDelay": 75,
        "pixelSize": 4,
        "initialPeekAmount": 55,
        "imageSpacing": 25
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "folderName",
            "label": "Folder Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "image1",
            "label": "Image 1",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image2",
            "label": "Image 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image3",
            "label": "Image 3",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image4",
            "label": "Image 4",
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
            "key": "folderColor",
            "label": "Folder Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "folderDarkColor",
            "label": "Folder Dark",
            "type": "color",
            "group": "General"
        },
        {
            "key": "windowColor",
            "label": "Window Color",
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
            "key": "cursorFill",
            "label": "Cursor Fill",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cursorOutline",
            "label": "Cursor Outline",
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
            "key": "placeholderColor",
            "label": "Placeholder Color",
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
            "key": "hoverDelay",
            "label": "Hover Start (frames)",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 60,
            "step": 5
        },
        {
            "key": "clickDelay",
            "label": "Click Start (frames)",
            "type": "number",
            "group": "General",
            "min": 40,
            "max": 120,
            "step": 5
        },
        {
            "key": "pixelSize",
            "label": "Cursor Pixel Size",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 8,
            "step": 1
        },
        {
            "key": "initialPeekAmount",
            "label": "Initial Peek Amount",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 80,
            "step": 5
        },
        {
            "key": "imageSpacing",
            "label": "Image Spacing",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 40,
            "step": 2
        }
    ],
  },
  {
    id: "SwishyFriendshipBeads1",
    title: "friendship-beads-1",
    description: "Swishy template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/friendship-beads-1/Scene").then(m => m.Scene),
    defaultProps: {
        "word": "subscribe",
        "backgroundColor": "#E5E0D8",
        "beadColor": "#F8F6F2",
        "letterColor": "#1A1A1A",
        "shadowColor": "#8B8680",
        "scale": 0.9,
        "animationSpeed": 1,
        "beadSize": 0.1,
        "scatterAmount": 1,
        "stopMotionSteps": 8
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
            "key": "backgroundColor",
            "label": "Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "beadColor",
            "label": "Bead Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "letterColor",
            "label": "Letter Color",
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
            "key": "beadSize",
            "label": "Bead Size",
            "type": "number",
            "group": "General",
            "min": 0.06,
            "max": 0.18,
            "step": 0.01
        },
        {
            "key": "scatterAmount",
            "label": "Scatter Amount",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        },
        {
            "key": "stopMotionSteps",
            "label": "Stop Motion Steps",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 15,
            "step": 1
        }
    ],
  },
  {
    id: "SwishyFunnelTextAnimation",
    title: "funnel-text-animation",
    description: "Swishy template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/funnel-text-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "text": "SWISHY  ",
        "fontFamily": "VT323",
        "backgroundColor": "#5634eb",
        "pathColor": "#ffffff",
        "textColor": "#000000",
        "pathThickness": 160,
        "fontSize": 85,
        "animationSpeed": 1.5,
        "scale": 1
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
            "key": "pathColor",
            "label": "Path Color",
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
            "key": "pathThickness",
            "label": "Path Thickness",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 300,
            "step": 10
        },
        {
            "key": "fontSize",
            "label": "Font Size",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 150,
            "step": 5
        },
        {
            "key": "animationSpeed",
            "label": "Slide Speed",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 5,
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
        }
    ],
  },
  {
    id: "SwishyGenerateAiVoiceAnimation",
    title: "generate-ai-voice-animation",
    description: "Swishy template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/generate-ai-voice-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Generate AI Voice",
        "subtitle": "Instant speech from any script",
        "cta": "Try it now",
        "voiceoverText": "Generate AI voice from your text with natural tone and clarity.",
        "fontFamily": "Space Grotesk",
        "backgroundColor": "#0b1020",
        "primaryColor": "#e2e8f0",
        "secondaryColor": "#94a3b8",
        "accentColor": "#22d3ee",
        "glowColor": "#7c3aed",
        "scale": 1,
        "animationSpeed": 1,
        "barCount": 18
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
            "key": "cta",
            "label": "CTA",
            "type": "text",
            "group": "General"
        },
        {
            "key": "voiceoverText",
            "label": "AI Voice Script",
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
            "key": "primaryColor",
            "label": "Primary",
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
            "key": "glowColor",
            "label": "Glow",
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
            "key": "barCount",
            "label": "Bar Count",
            "type": "number",
            "group": "General",
            "min": 8,
            "max": 30,
            "step": 1
        }
    ],
  },
  {
    id: "SwishyGithubStarComparison",
    title: "github-star-comparison",
    description: "Swishy template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/github-star-comparison/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Star History",
        "repo1Name": "openclaw/openclaw",
        "repo2Name": "torvalds/linux",
        "headingFont": "Caveat",
        "labelFont": "Inter",
        "backgroundColor": "#ffffff",
        "linuxColor": "#5bb4e5",
        "openclawColor": "#c45a3b",
        "textColor": "#1a1a1a",
        "gridColor": "#333333",
        "scale": 1,
        "animationSpeed": 1
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
            "key": "repo1Name",
            "label": "Repo 1 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "repo2Name",
            "label": "Repo 2 Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headingFont",
            "label": "Title Font",
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
            "key": "linuxColor",
            "label": "Linux Line",
            "type": "color",
            "group": "General"
        },
        {
            "key": "openclawColor",
            "label": "Openclaw Line",
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
            "key": "gridColor",
            "label": "Grid",
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
    id: "SwishyGithubStars1",
    title: "github-stars-1",
    description: "Swishy template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/github-stars-1/Scene").then(m => m.Scene),
    defaultProps: {
        "repoName": "Swishy/create",
        "targetStars": 27500,
        "backgroundColor": "#ffffff",
        "lineColor": "#e85d3b",
        "textColor": "#1a1a1a",
        "gridColor": "#e5e5e5",
        "secondaryTextColor": "#666666",
        "scale": 1,
        "animationSpeed": 1,
        "fontFamily": "Inter"
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "repoName",
            "label": "Repository Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "targetStars",
            "label": "Target Stars",
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
            "key": "lineColor",
            "label": "Line Color",
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
            "key": "gridColor",
            "label": "Grid Color",
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
    id: "SwishyGoals",
    title: "goals",
    description: "Swishy template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/goals/Scene").then(m => m.Scene),
    defaultProps: {
        "item1": "New Year",
        "item2": "New Goals",
        "item3": "New Energy",
        "fontFamily": "Roboto",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "accentColor": "#22c55e",
        "scale": 1,
        "animationSpeed": 1,
        "itemDelay": 40,
        "entranceOffset": 80
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "item1",
            "label": "Item 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "item2",
            "label": "Item 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "item3",
            "label": "Item 3",
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
            "label": "Accent (Green)",
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
            "key": "itemDelay",
            "label": "Item Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 60,
            "step": 5
        },
        {
            "key": "entranceOffset",
            "label": "Entrance Distance",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 150,
            "step": 10
        }
    ],
  },
  {
    id: "SwishyGoodMood",
    title: "good-mood",
    description: "Swishy template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/good-mood/Scene").then(m => m.Scene),
    defaultProps: {
        "fontFamily": "Roboto",
        "backgroundColor": "#000000",
        "topRowColor": "#ffffff",
        "colorM": "#ffbd14",
        "colorO1": "#006eff",
        "colorO2": "#ff1d1d",
        "colorD": "#ff7fa1",
        "scale": 0.9,
        "animationSpeed": 0.8,
        "stretchIntensity": 0.28
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
            "key": "topRowColor",
            "label": "Top Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "colorM",
            "label": "M (Yellow)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "colorO1",
            "label": "O1 (Blue)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "colorO2",
            "label": "O2 (Red)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "colorD",
            "label": "D (Pink)",
            "type": "color",
            "group": "General"
        },
        {
            "key": "scale",
            "label": "Scale",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 1.5,
            "step": 0.05
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
            "key": "stretchIntensity",
            "label": "Stretch Intensity",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.45,
            "step": 0.01
        }
    ],
  },
  {
    id: "SwishyGravityThought",
    title: "gravity-thought",
    description: "Swishy template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/gravity-thought/Scene").then(m => m.Scene),
    defaultProps: {
        "centerWord": "play",
        "line1Left": "I love to",
        "line1Right": "at work",
        "line2Left": "We need to",
        "line2Right": "to learn",
        "line3Left": "You have to",
        "line3Right": "to grow",
        "line4Left": "Always",
        "line4Right": "to stay creative",
        "line5Left": "Never stop to",
        "line5Right": "and laugh",
        "line6Left": "I rest to",
        "line6Right": "even better",
        "line7Left": "We need to",
        "line7Right": "to feel alive",
        "line8Left": "You have to",
        "line8Right": "to win",
        "line9Left": "It's time to",
        "line9Right": "and learn",
        "line10Left": "Never stop to",
        "line10Right": "with your ideas",
        "fontFamily": "Playfair Display",
        "backgroundColor": "#0d0d0d",
        "textColor": "#ffffff",
        "lineColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "centerWord",
            "label": "Center Word",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line1Left",
            "label": "Line 1 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line1Right",
            "label": "Line 1 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line2Left",
            "label": "Line 2 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line2Right",
            "label": "Line 2 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line3Left",
            "label": "Line 3 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line3Right",
            "label": "Line 3 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line4Left",
            "label": "Line 4 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line4Right",
            "label": "Line 4 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line5Left",
            "label": "Line 5 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line5Right",
            "label": "Line 5 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line6Left",
            "label": "Line 6 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line6Right",
            "label": "Line 6 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line7Left",
            "label": "Line 7 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line7Right",
            "label": "Line 7 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line8Left",
            "label": "Line 8 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line8Right",
            "label": "Line 8 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line9Left",
            "label": "Line 9 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line9Right",
            "label": "Line 9 Right",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line10Left",
            "label": "Line 10 Left",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line10Right",
            "label": "Line 10 Right",
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
            "key": "lineColor",
            "label": "Line Color",
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
    id: "SwishyHeartCrushButton",
    title: "heart-crush-button",
    description: "Swishy template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/heart-crush-button/Scene").then(m => m.Scene),
    defaultProps: {
        "heartColor": "#e63950",
        "backgroundColor": "#ffffff",
        "circleBackground": "#ffc0cb",
        "accentColor": "#f5a3b0",
        "scale": 1,
        "animationSpeed": 1,
        "pulseIntensity": 1.08,
        "toggleFrame": 40,
        "separationDistance": 35
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "heartColor",
            "label": "Heart Color",
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
            "key": "circleBackground",
            "label": "Circle Background",
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
            "key": "pulseIntensity",
            "label": "Pulse Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 1.3,
            "step": 0.02
        },
        {
            "key": "toggleFrame",
            "label": "Toggle Frame",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 90,
            "step": 5
        },
        {
            "key": "separationDistance",
            "label": "Separation Distance",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        }
    ],
  },
  {
    id: "SwishyIWantASmoothAnimationWhereTheTextWith2Li",
    title: "i-want-a-smooth-animation-where-the-text-with-2-li",
    description: "Swishy template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/i-want-a-smooth-animation-where-the-text-with-2-li/Scene").then(m => m.Scene),
    defaultProps: {
        "line1Text1": "Swishy",
        "line2Text1": "Design",
        "line1Text2": "Creative",
        "line2Text2": "Motion",
        "fontFamily": "Inter",
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "jiggleIntensity": 3
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "line1Text1",
            "label": "Line 1 (First)",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line2Text1",
            "label": "Line 2 (First)",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line1Text2",
            "label": "Line 1 (Second)",
            "type": "text",
            "group": "General"
        },
        {
            "key": "line2Text2",
            "label": "Line 2 (Second)",
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
            "key": "jiggleIntensity",
            "label": "Jiggle Intensity",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 10,
            "step": 0.5
        }
    ],
  },
  {
    id: "SwishyImageShuffle1",
    title: "image-shuffle-1",
    description: "Swishy template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/image-shuffle-1/Scene").then(m => m.Scene),
    defaultProps: {
        "image1": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        "image2": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        "image3": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
        "image4": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
        "backgroundColor": "#f5f5f5",
        "shadowColor": "#e3e3e3",
        "scale": 1,
        "animationSpeed": 1,
        "cardSpacing": 8,
        "borderRadius": 28
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "image1",
            "label": "Card 1",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image2",
            "label": "Card 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image3",
            "label": "Card 3",
            "type": "image",
            "group": "General"
        },
        {
            "key": "image4",
            "label": "Card 4",
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
            "key": "cardSpacing",
            "label": "Card Spacing",
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
            "max": 60,
            "step": 2
        }
    ],
  },
  {
    id: "SwishyInstagramLogoAnimation",
    title: "instagram-logo-animation",
    description: "Swishy template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/instagram-logo-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#0a0a0a",
        "glowIntensity": 0.4,
        "pulseAmount": 0.03,
        "animationSpeed": 1,
        "scale": 1,
        "logoSize": 0.35,
        "staggerDelay": 8,
        "entranceOffset": 30,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
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
            "key": "glowIntensity",
            "label": "Glow Intensity",
            "type": "number",
            "group": "General",
            "min": 0.3,
            "max": 1.5,
            "step": 0.1
        },
        {
            "key": "pulseAmount",
            "label": "Pulse Amount",
            "type": "number",
            "group": "General",
            "min": 0.01,
            "max": 0.08,
            "step": 0.01
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
            "key": "logoSize",
            "label": "Logo Size",
            "type": "number",
            "group": "General",
            "min": 0.2,
            "max": 0.5,
            "step": 0.05
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
    id: "SwishyInstagramProfile",
    title: "instagram-profile",
    description: "Swishy template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/instagram-profile/Scene").then(m => m.Scene),
    defaultProps: {
        "profileImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmSdkQA9QICwPUB0LIGepSKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAABxjcHJ0AAABDAAAAAx3dHB0AAABGAAAABRyWFlaAAABLAAAABRnWFlaAAABQAAAABRiWFlaAAABVAAAABRyVFJDAAABaAAAAGBnVFJDAAABaAAAAGBiVFJDAAABaAAAAGBkZXNjAAAAAAAAAAV1UkdCAAAAAAAAAAAAAAAAdGV4dAAAAABDQzAAWFlaIAAAAAAAAPNUAAEAAAABFslYWVogAAAAAAAAb6AAADjyAAADj1hZWiAAAAAAAABilgAAt4kAABjaWFlaIAAAAAAAACSgAAAPhQAAtsRjdXJ2AAAAAAAAACoAAAB8APgBnAJ1A4MEyQZOCBIKGAxiDvQRzxT2GGocLiBDJKwpai5+M+s5sz/WRldNNlR2XBdkHWyGdVZ+jYgskjacq6eMstu+mcrH12Xkd/H5\n  profileName: { type: ",
        "posts": 178,
        "followers": "143K",
        "following": 275,
        "bio": "Helping you make better content\\nEditing tips / tutorials and social media",
        "fontFamily": "Inter",
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "secondaryColor": "#737373",
        "accentColor": "#3b82f6",
        "buttonBgColor": "#e5e5e5",
        "scale": 0.95,
        "animationSpeed": 1,
        "staggerDelay": 6
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
            "key": "posts",
            "label": "Posts",
            "type": "text",
            "group": "General"
        },
        {
            "key": "followers",
            "label": "Followers",
            "type": "text",
            "group": "General"
        },
        {
            "key": "following",
            "label": "Following",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bio",
            "label": "Bio",
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
            "key": "textColor",
            "label": "Text",
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
            "label": "Follow Button",
            "type": "color",
            "group": "General"
        },
        {
            "key": "buttonBgColor",
            "label": "Button Background",
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
        }
    ],
  },
  {
    id: "SwishyInstagramStories",
    title: "instagram-stories",
    description: "Swishy template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../Swishy/instagram-stories/Scene").then(m => m.Scene),
    defaultProps: {
        "profileImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/screenshot_2026-02-04_at_4.19.41_pm.png",
        "username": "toolandtea",
        "timestamp": "3h",
        "bgImage1": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/47c96aeb353842642601de6459054fb3.jpg",
        "bgImage2": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/2f985369-7661-48a2-a549-e5f8345565ee/76f96bdfddf8be13c40778bec4c906b5.jpg",
        "bgImage3": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/87922316-72f9-483c-96b3-9d69034eaadc/screenshot_2026-02-05_at_1.01.17_am.png",
        "backgroundColor": "#000000",
        "progressBarBg": "rgba(255,255,255,0.3)",
        "progressBarFill": "#ffffff",
        "textColor": "#ffffff",
        "profilePlaceholderColor": "#9DC5A7",
        "scale": 1,
        "slideDuration": 60,
        "barHeight": 8,
        "barGap": 4
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
            "key": "username",
            "label": "Username",
            "type": "text",
            "group": "General"
        },
        {
            "key": "timestamp",
            "label": "Timestamp",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bgImage1",
            "label": "Background 1",
            "type": "image",
            "group": "General"
        },
        {
            "key": "bgImage2",
            "label": "Background 2",
            "type": "image",
            "group": "General"
        },
        {
            "key": "bgImage3",
            "label": "Background 3",
            "type": "image",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Fallback Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressBarBg",
            "label": "Progress Bar Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "progressBarFill",
            "label": "Progress Bar Fill",
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
            "key": "profilePlaceholderColor",
            "label": "Profile Placeholder",
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
            "key": "slideDuration",
            "label": "Slide Duration (frames)",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 120,
            "step": 5
        },
        {
            "key": "barHeight",
            "label": "Bar Height",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 16,
            "step": 1
        },
        {
            "key": "barGap",
            "label": "Bar Gap",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 10,
            "step": 1
        }
    ],
  }
];

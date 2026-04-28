import { CompositionDef } from "../../types";

export const MANGO_GIRAFFE_REGISTRY_3: CompositionDef[] = [
  {
    id: "MangoGiraffeInstagramStory3Images",
    title: "instagram-story-3-images",
    description: "Mango Giraffe template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/instagram-story-3-images/Scene").then(m => m.Scene),
    defaultProps: {
        "image1": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "image2": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        "image3": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
        "backgroundColor": "#f8fafc",
        "cardColor": "#ffffff",
        "shadowColor": "#64748b",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 15,
        "cardBorderRadius": 16,
        "shadowIntensity": 0.15,
        "cardSpacing": 24
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
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
            "key": "backgroundColor",
            "label": "Background",
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
            "label": "Stagger Delay",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 30,
            "step": 1
        },
        {
            "key": "cardBorderRadius",
            "label": "Card Radius",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 40,
            "step": 2
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "cardSpacing",
            "label": "Card Spacing",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 50,
            "step": 2
        }
    ],
  },
  {
    id: "MangoGiraffeInstagramUpdateNotificationAnimation",
    title: "instagram-update-notification-animation",
    description: "Mango Giraffe template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/instagram-update-notification-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "title": "Instagram",
        "subtitle": "Update available",
        "badgeText": 1,
        "iconImage": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        "fontFamily": "DM Sans",
        "backgroundColor": "#44ff00",
        "primaryColor": "#ffffff",
        "secondaryTextColor": "#b4b4c6",
        "cardColor": "#16161d",
        "subtleStroke": "#2a2a36",
        "brandGradientStart": "#f58529",
        "brandGradientEnd": "#dd2a7b",
        "badgeTextColor": "#ffffff",
        "shadowColor": "rgba(0,0,0,0.45)",
        "scale": 1.1,
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
            "key": "subtitle",
            "label": "Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "badgeText",
            "label": "Badge Text",
            "type": "text",
            "group": "General"
        },
        {
            "key": "iconImage",
            "label": "Icon Image",
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
            "key": "primaryColor",
            "label": "Primary",
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
            "key": "cardColor",
            "label": "Card",
            "type": "color",
            "group": "General"
        },
        {
            "key": "subtleStroke",
            "label": "Stroke",
            "type": "color",
            "group": "General"
        },
        {
            "key": "brandGradientStart",
            "label": "Brand Gradient Start",
            "type": "color",
            "group": "General"
        },
        {
            "key": "brandGradientEnd",
            "label": "Brand Gradient End",
            "type": "color",
            "group": "General"
        },
        {
            "key": "badgeTextColor",
            "label": "Badge Text",
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
        }
    ],
  },
  {
    id: "MangoGiraffeInteractivePixelArtWaves",
    title: "interactive-pixel-art-waves",
    description: "Mango Giraffe template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/interactive-pixel-art-waves/Scene").then(m => m.Scene),
    defaultProps: {
        "displayFont": "Space Grotesk",
        "backgroundColor": "#f8fafc",
        "primaryColor": "#1e40af",
        "deepColor": "#1e3a8a",
        "accentColor": "#93c5fd",
        "pixelScale": 0.028,
        "waveAmplitude": 0.14,
        "waveSpeed": 2.4,
        "layerCount": 10,
        "layerGap": 0.055,
        "bandScale": 0.03,
        "scale": 1,
        "animationSpeed": 1.4,
        "staggerDelay": 17,
        "entranceOffset": 10,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "displayFont",
            "label": "Display Font",
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
            "key": "deepColor",
            "label": "Deep Color",
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
            "key": "pixelScale",
            "label": "Pixel Size",
            "type": "number",
            "group": "General",
            "min": 0.015,
            "max": 0.06,
            "step": 0.005
        },
        {
            "key": "waveAmplitude",
            "label": "Wave Amplitude",
            "type": "number",
            "group": "General",
            "min": 0.05,
            "max": 0.2,
            "step": 0.01
        },
        {
            "key": "waveSpeed",
            "label": "Wave Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 3,
            "step": 0.1
        },
        {
            "key": "layerCount",
            "label": "Wave Layers",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 16,
            "step": 1
        },
        {
            "key": "layerGap",
            "label": "Layer Gap",
            "type": "number",
            "group": "General",
            "min": 0.03,
            "max": 0.1,
            "step": 0.005
        },
        {
            "key": "bandScale",
            "label": "Band Height",
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
    id: "MangoGiraffeIosNotification",
    title: "ios-notification",
    description: "Mango Giraffe template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/ios-notification/Scene").then(m => m.Scene),
    defaultProps: {
        "appName": "Messages",
        "notificationTitle": "Reminder",
        "notificationMessage": "Have a good day! ☀️",
        "timeAgo": "now",
        "fontFamily": "Poppins",
        "backgroundColor": "#f7f7f7",
        "notificationBg": "#ffffff",
        "titleColor": "#1c1c1e",
        "messageColor": "#3a3a3c",
        "subtleColor": "#8e8e93",
        "iconColor": "#34c759",
        "scale": 1,
        "animationSpeed": 1,
        "entranceOffset": 80,
        "showAppIcon": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "appName",
            "label": "App Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "notificationTitle",
            "label": "Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "notificationMessage",
            "label": "Message",
            "type": "text",
            "group": "General"
        },
        {
            "key": "timeAgo",
            "label": "Time",
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
            "key": "notificationBg",
            "label": "Notification Background",
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
            "key": "messageColor",
            "label": "Message Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "subtleColor",
            "label": "Subtle Text",
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
            "min": 30,
            "max": 150,
            "step": 10
        },
        {
            "key": "showAppIcon",
            "label": "Show App Icon",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeJanuary",
    title: "january",
    description: "Mango Giraffe template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/january/Scene").then(m => m.Scene),
    defaultProps: {
        "month": "January",
        "year": 2026,
        "weekdays": "Sun\\nMon\\nTue\\nWed\\nThu\\nFri\\nSat",
        "daysInMonth": 31,
        "startDayIndex": 4,
        "highlightDay": 21,
        "highlightScale": 1.35,
        "highlightDelay": 8,
        "headingFont": "Space Grotesk",
        "bodyFont": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "secondaryColor": "#6b7280",
        "accentColor": "#3b82f6",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 4,
        "entranceOffset": 18,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "month",
            "label": "Month",
            "type": "text",
            "group": "General"
        },
        {
            "key": "year",
            "label": "Year",
            "type": "text",
            "group": "General"
        },
        {
            "key": "weekdays",
            "label": "Weekdays",
            "type": "multilineText",
            "group": "General"
        },
        {
            "key": "daysInMonth",
            "label": "Days in Month",
            "type": "number",
            "group": "General",
            "min": 28,
            "max": 31,
            "step": 1
        },
        {
            "key": "startDayIndex",
            "label": "Start Day (0=Sun)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 6,
            "step": 1
        },
        {
            "key": "highlightDay",
            "label": "Highlight Day",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 31,
            "step": 1
        },
        {
            "key": "highlightScale",
            "label": "Highlight Scale",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 2,
            "step": 0.05
        },
        {
            "key": "highlightDelay",
            "label": "Highlight Pop Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 30,
            "step": 1
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
            "step": 2
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
    id: "MangoGiraffeJune",
    title: "june",
    description: "Mango Giraffe template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/june/Scene").then(m => m.Scene),
    defaultProps: {
        "monthYear": "June 2024",
        "dates": "1\\n2\\n3\\n4\\n5\\n6\\n7\\n8\\n9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30",
        "fontFamily": "DM Sans",
        "backgroundColor": "#f6f2ea",
        "calendarColor": "#ffffff",
        "headerColor": "#f4c06a",
        "borderColor": "#e5e7eb",
        "textColor": "#1f2937",
        "dateBubbleColor": "#dbeafe",
        "weekendBubbleColor": "#fde68a",
        "accentColor": "#f472b6",
        "accentColor2": "#60a5fa",
        "shadowColor": "rgba(0,0,0,0.18)",
        "scale": 1,
        "animationSpeed": 1,
        "cornerRadius": 0.06,
        "staggerDelay": 2
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "monthYear",
            "label": "Month & Year",
            "type": "text",
            "group": "General"
        },
        {
            "key": "dates",
            "label": "Dates (one per line)",
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
            "key": "calendarColor",
            "label": "Calendar Body",
            "type": "color",
            "group": "General"
        },
        {
            "key": "headerColor",
            "label": "Header",
            "type": "color",
            "group": "General"
        },
        {
            "key": "borderColor",
            "label": "Border",
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
            "key": "dateBubbleColor",
            "label": "Date Bubble",
            "type": "color",
            "group": "General"
        },
        {
            "key": "weekendBubbleColor",
            "label": "Weekend Bubble",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor",
            "label": "Accent 1",
            "type": "color",
            "group": "General"
        },
        {
            "key": "accentColor2",
            "label": "Accent 2",
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
        },
        {
            "key": "cornerRadius",
            "label": "Corner Radius",
            "type": "number",
            "group": "General",
            "min": 0.02,
            "max": 0.12,
            "step": 0.01
        },
        {
            "key": "staggerDelay",
            "label": "Date Stagger",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 8,
            "step": 0.5
        }
    ],
  },
  {
    id: "MangoGiraffeLifeLineAnimation",
    title: "life-line-animation",
    description: "Mango Giraffe template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/life-line-animation/Scene").then(m => m.Scene),
    defaultProps: {
        "scale": 1,
        "animationSpeed": 1,
        "backgroundColor": "#000000",
        "lineColor": "#004cff",
        "glowColor": "#0055ff",
        "strokeWidth": 4,
        "glowIntensity": 10,
        "waveAmplitude": 200,
        "waveFrequency": 0.015,
        "heartbeatCount": 5,
        "showDot": true,
        "dotSize": 6,
        "fontFamily": "Open Sans"
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
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
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "strokeWidth",
            "label": "Line Thickness",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 10,
            "step": 0.5
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
            "key": "waveAmplitude",
            "label": "Wave Height",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 400,
            "step": 10
        },
        {
            "key": "waveFrequency",
            "label": "Wave Frequency",
            "type": "number",
            "group": "General",
            "min": 0.005,
            "max": 0.05,
            "step": 0.001
        },
        {
            "key": "heartbeatCount",
            "label": "Heartbeat Count",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 10,
            "step": 1
        },
        {
            "key": "showDot",
            "label": "Show Tracking Dot",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "dotSize",
            "label": "Dot Size",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 15,
            "step": 1
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
    id: "MangoGiraffeLike",
    title: "like",
    description: "Mango Giraffe template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/like/Scene").then(m => m.Scene),
    defaultProps: {
        "likeCount": 1,
        "bubbleColor": "#ed4956",
        "heartColor": "#ffffff",
        "backgroundColor": "#fafafa",
        "glowColor": "#ed4956",
        "floatingHeartColor": "#ed4956",
        "scale": 1,
        "animationSpeed": 1,
        "slideDistance": 300,
        "glowIntensity": 0.8,
        "heartCount": 8
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "likeCount",
            "label": "Like Count",
            "type": "text",
            "group": "General"
        },
        {
            "key": "bubbleColor",
            "label": "Bubble Color",
            "type": "color",
            "group": "General"
        },
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
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "floatingHeartColor",
            "label": "Floating Hearts",
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
            "key": "slideDistance",
            "label": "Slide Distance",
            "type": "number",
            "group": "General",
            "min": 100,
            "max": 500,
            "step": 50
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
            "key": "heartCount",
            "label": "Floating Hearts",
            "type": "number",
            "group": "General",
            "min": 4,
            "max": 15,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeListOfThings",
    title: "list-of-things",
    description: "Mango Giraffe template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/list-of-things/Scene").then(m => m.Scene),
    defaultProps: {
        "venue1Icon": "🏨",
        "venue1Label": "Hotels",
        "venue2Icon": "💍",
        "venue2Label": "Wedding Venues",
        "venue3Icon": "🏝️",
        "venue3Label": "Resorts",
        "venue4Icon": "💆",
        "venue4Label": "Spas",
        "fontFamily": "DM Sans",
        "backgroundColor": "#ffffff",
        "textColor": "#111827",
        "accentColor": "#3b82f6",
        "secondaryColor": "#6b7280",
        "scale": 2,
        "animationSpeed": 1,
        "staggerDelay": 20,
        "entranceOffset": 20,
        "blur": 0,
        "rotation": 0,
        "opacity": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "venue1Icon",
            "label": "Venue 1 Icon",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue1Label",
            "label": "Venue 1 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue2Icon",
            "label": "Venue 2 Icon",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue2Label",
            "label": "Venue 2 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue3Icon",
            "label": "Venue 3 Icon",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue3Label",
            "label": "Venue 3 Label",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue4Icon",
            "label": "Venue 4 Icon",
            "type": "text",
            "group": "General"
        },
        {
            "key": "venue4Label",
            "label": "Venue 4 Label",
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
    id: "MangoGiraffeLoading",
    title: "loading",
    description: "Mango Giraffe template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/loading/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#000000",
        "dotColor": "#ffffff",
        "accentColor": "#22c55e",
        "dotCount": 40,
        "dotSize": 14,
        "orbitRadius": 0.28,
        "animationSpeed": 1,
        "scale": 1
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
            "key": "dotColor",
            "label": "Dot Color",
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
            "key": "dotCount",
            "label": "Dot Count",
            "type": "number",
            "group": "General",
            "min": 20,
            "max": 80,
            "step": 5
        },
        {
            "key": "dotSize",
            "label": "Dot Size",
            "type": "number",
            "group": "General",
            "min": 6,
            "max": 24,
            "step": 1
        },
        {
            "key": "orbitRadius",
            "label": "Orbit Radius",
            "type": "number",
            "group": "General",
            "min": 0.15,
            "max": 0.45,
            "step": 0.02
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
        }
    ],
  },
  {
    id: "MangoGiraffeLocationPopUp",
    title: "location-pop-up",
    description: "Mango Giraffe template",
    color: "#f280d8",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/location-pop-up/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#fafafa",
        "pinColor": "#ff0000",
        "popupBgColor": "#fffbf5",
        "popupTextColor": "#030303",
        "accentColor": "#3b82f6",
        "glowColor": "#ef4444",
        "locationName": "San Francisco",
        "locationDetail": "California, USA",
        "fontFamily": "Inter",
        "scale": 1,
        "animationSpeed": 1,
        "pinSize": 1,
        "glowIntensity": 0.6,
        "showPulse": true
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
            "key": "pinColor",
            "label": "Pin Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "popupBgColor",
            "label": "Popup Background",
            "type": "color",
            "group": "General"
        },
        {
            "key": "popupTextColor",
            "label": "Popup Text",
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
            "key": "glowColor",
            "label": "Glow Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "locationName",
            "label": "Location Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "locationDetail",
            "label": "Location Detail",
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
        },
        {
            "key": "pinSize",
            "label": "Pin Size",
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
            "key": "showPulse",
            "label": "Show Pulse",
            "type": "boolean",
            "group": "General"
        }
    ],
  },
  {
    id: "MangoGiraffeLogoCode",
    title: "logo-code",
    description: "Mango Giraffe template",
    color: "#5d5e9d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/logo-code/Scene").then(m => m.Scene),
    defaultProps: {
        "mainWord": "Mango Giraffe",
        "fontFamily": "Space Mono",
        "backgroundColor": "#0a0a0a",
        "textColor": "#ffffff",
        "scale": 1,
        "animationSpeed": 1,
        "scrambleCycles": 8,
        "letterStagger": 6,
        "cycleSpeed": 3
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "mainWord",
            "label": "Main Word",
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
            "key": "scrambleCycles",
            "label": "Scramble Cycles",
            "type": "number",
            "group": "General",
            "min": 3,
            "max": 15,
            "step": 1
        },
        {
            "key": "letterStagger",
            "label": "Letter Stagger (frames)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 15,
            "step": 1
        },
        {
            "key": "cycleSpeed",
            "label": "Cycle Speed (frames)",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 6,
            "step": 1
        }
    ],
  },
  {
    id: "MangoGiraffeLogoReveal1",
    title: "logo-reveal-1",
    description: "Mango Giraffe template",
    color: "#505905",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/logo-reveal-1/Scene").then(m => m.Scene),
    defaultProps: {
        "logoText": "V",
        "companyName": "VENTURE STUDIO",
        "backgroundColor": "#fafafa",
        "shapeColor": "#18181b",
        "textColor": "#ffffff",
        "companyTextColor": "#18181b",
        "scale": 1,
        "animationSpeed": 1,
        "rotationSpeed": 2,
        "shapeSize": 0.2,
        "finalBorderRadius": 0.5,
        "shadowIntensity": 0.25,
        "logoEntranceDelay": 70,
        "springDamping": 8,
        "springStiffness": 100,
        "logoFontSize": 0.08,
        "companyFontSize": 0.04,
        "letterSpacing": 0.008,
        "showCompanyName": true,
        "enableRotation": true,
        "showShadow": true
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "logoText",
            "label": "Logo Letter",
            "type": "text",
            "group": "General"
        },
        {
            "key": "companyName",
            "label": "Company Name",
            "type": "text",
            "group": "General"
        },
        {
            "key": "backgroundColor",
            "label": "Background Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shapeColor",
            "label": "Shape Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "textColor",
            "label": "Logo Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "companyTextColor",
            "label": "Company Text Color",
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
            "label": "Rotation Speed",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 5,
            "step": 0.1
        },
        {
            "key": "shapeSize",
            "label": "Shape Size",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.4,
            "step": 0.02
        },
        {
            "key": "finalBorderRadius",
            "label": "Final Roundness",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "shadowIntensity",
            "label": "Shadow Intensity",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "logoEntranceDelay",
            "label": "Logo Delay (frames)",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 100,
            "step": 5
        },
        {
            "key": "springDamping",
            "label": "Spring Damping",
            "type": "number",
            "group": "General",
            "min": 5,
            "max": 20,
            "step": 1
        },
        {
            "key": "springStiffness",
            "label": "Spring Stiffness",
            "type": "number",
            "group": "General",
            "min": 50,
            "max": 200,
            "step": 10
        },
        {
            "key": "logoFontSize",
            "label": "Logo Font Size",
            "type": "number",
            "group": "General",
            "min": 0.04,
            "max": 0.12,
            "step": 0.01
        },
        {
            "key": "companyFontSize",
            "label": "Company Font Size",
            "type": "number",
            "group": "General",
            "min": 0.02,
            "max": 0.06,
            "step": 0.005
        },
        {
            "key": "letterSpacing",
            "label": "Letter Spacing",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 0.02,
            "step": 0.002
        },
        {
            "key": "showCompanyName",
            "label": "Show Company Name",
            "type": "boolean",
            "group": "General"
        },
        {
            "key": "enableRotation",
            "label": "Enable Rotation",
            "type": "boolean",
            "group": "General"
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
    id: "MangoGiraffeLogoSpin",
    title: "logo-spin",
    description: "Mango Giraffe template",
    color: "#205b0d",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/logo-spin/Scene").then(m => m.Scene),
    defaultProps: {
        "logoImage": "https://miuzeaacksoumruaqxfv.supabase.co/storage/v1/object/public/input/17cef1e5-be63-4ec5-a952-8b8522239191/favicon.png",
        "title": "Welcome",
        "subtitle": "Crafted with precision",
        "fontFamily": "Inter",
        "backgroundColor": "#0f172a",
        "accentColor": "#3b82f6",
        "textColor": "#ffffff",
        "secondaryTextColor": "#94a3b8",
        "scale": 1,
        "animationSpeed": 1,
        "logoSize": 0.25,
        "showGlow": true,
        "glowIntensity": 0.6,
        "rotationAmount": 360
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "logoImage",
            "label": "Logo Image",
            "type": "image",
            "group": "General"
        },
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
            "key": "logoSize",
            "label": "Logo Size",
            "type": "number",
            "group": "General",
            "min": 0.1,
            "max": 0.5,
            "step": 0.05
        },
        {
            "key": "showGlow",
            "label": "Show Glow Effect",
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
        },
        {
            "key": "rotationAmount",
            "label": "Logo Rotation",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 720,
            "step": 45
        }
    ],
  },
  {
    id: "MangoGiraffeMakeWithNotion",
    title: "make-with-notion",
    description: "Mango Giraffe template",
    color: "#63d2d2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/make-with-notion/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#f5f5f3",
        "textColor": "#1a1a1a",
        "blueColor": "#3a8dde",
        "redColor": "#e94e3c",
        "yellowColor": "#f5a623",
        "fontFamily": "Inter",
        "scale": 1,
        "animationSpeed": 1.4
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
            "key": "textColor",
            "label": "Text Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "blueColor",
            "label": "Blue Shape",
            "type": "color",
            "group": "General"
        },
        {
            "key": "redColor",
            "label": "Red Shape",
            "type": "color",
            "group": "General"
        },
        {
            "key": "yellowColor",
            "label": "Yellow Shape",
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
        }
    ],
  },
  {
    id: "MangoGiraffeMakinBank",
    title: "makin-bank",
    description: "Mango Giraffe template",
    color: "#15414f",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/makin-bank/Scene").then(m => m.Scene),
    defaultProps: {
        "label": "Total Amount",
        "targetAmount": 99999,
        "currencySymbol": "$",
        "fontFamily": "Roboto",
        "backgroundColor": "#00c203",
        "cardColor": "#ffffff",
        "borderColor": "#202028",
        "textColor": "#202028",
        "scale": 1,
        "animationSpeed": 0.8,
        "countDuration": 90
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
            "key": "targetAmount",
            "label": "Target Amount",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 99999,
            "step": 1
        },
        {
            "key": "currencySymbol",
            "label": "Currency Symbol",
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
            "key": "cardColor",
            "label": "Card Color",
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
            "key": "countDuration",
            "label": "Count Duration (frames)",
            "type": "number",
            "group": "General",
            "min": 30,
            "max": 180,
            "step": 10
        }
    ],
  },
  {
    id: "MangoGiraffeMap",
    title: "map",
    description: "Mango Giraffe template",
    color: "#869810",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/map/Scene").then(m => m.Scene),
    defaultProps: {
        "fromCity": "America",
        "toCity": "Dubai",
        "fontFamily": "DM Sans",
        "mapImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png",
        "backgroundColor": "#e5ecff",
        "textColor": "#ffffff",
        "routeColor": "#3b82f6",
        "cityDotColor": "#60a5fa",
        "planeColor": "#ffffff",
        "dotGlowColor": "rgba(59,130,246,0.5)",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "fromCity",
            "label": "From City",
            "type": "text",
            "group": "General"
        },
        {
            "key": "toCity",
            "label": "To City",
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
            "key": "mapImage",
            "label": "Map Image",
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
            "label": "Text",
            "type": "color",
            "group": "General"
        },
        {
            "key": "routeColor",
            "label": "Route",
            "type": "color",
            "group": "General"
        },
        {
            "key": "cityDotColor",
            "label": "City Dot",
            "type": "color",
            "group": "General"
        },
        {
            "key": "planeColor",
            "label": "Plane",
            "type": "color",
            "group": "General"
        },
        {
            "key": "dotGlowColor",
            "label": "Dot Glow",
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
    id: "MangoGiraffeMarioGame",
    title: "mario-game",
    description: "Mango Giraffe template",
    color: "#387c04",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/mario-game/Scene").then(m => m.Scene),
    defaultProps: {
        "backgroundColor": "#8B4513",
        "laptopColor": "#2d3748",
        "screenColor": "#87CEEB",
        "marioRed": "#E52521",
        "marioBlue": "#049CD8",
        "coinColor": "#FFD700",
        "mugColor": "#f5f5f5",
        "stickyColor": "#FFEB3B",
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
            "key": "laptopColor",
            "label": "Laptop Color",
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
            "key": "marioRed",
            "label": "Mario Red",
            "type": "color",
            "group": "General"
        },
        {
            "key": "marioBlue",
            "label": "Mario Blue",
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
            "key": "mugColor",
            "label": "Mug Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "stickyColor",
            "label": "Sticky Note",
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
    id: "MangoGiraffeMobileBookshelf",
    title: "mobile-bookshelf",
    description: "Mango Giraffe template",
    color: "#0981c2",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/mobile-bookshelf/Scene").then(m => m.Scene),
    defaultProps: {
        "headerSubtitle": "My Favourite",
        "headerTitle": "BOOKS",
        "category1": "Design",
        "category1Count": "16 books",
        "category2": "Psychology",
        "category2Count": "3 books",
        "category3": "Novels",
        "category3Count": "8 books",
        "ctaText": "Add Books",
        "fontFamily": "Inter",
        "backgroundColor": "#F5F5F5",
        "phoneColor": "#1A1A1A",
        "shelf1Color": "#F5A623",
        "shelf2Color": "#6B9FD4",
        "shelf3Color": "#2D5A45",
        "accentColor": "#D4AF37",
        "textColor": "#1A1A1A",
        "referenceImage": "blob:https://www.mangogiraffe.ai/af95cdef-19ea-4320-8959-d08206db3710",
        "scale": 1,
        "animationSpeed": 1,
        "staggerDelay": 5
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "headerSubtitle",
            "label": "Header Subtitle",
            "type": "text",
            "group": "General"
        },
        {
            "key": "headerTitle",
            "label": "Header Title",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category1",
            "label": "Category 1",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category1Count",
            "label": "Category 1 Count",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category2",
            "label": "Category 2",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category2Count",
            "label": "Category 2 Count",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category3",
            "label": "Category 3",
            "type": "text",
            "group": "General"
        },
        {
            "key": "category3Count",
            "label": "Category 3 Count",
            "type": "text",
            "group": "General"
        },
        {
            "key": "ctaText",
            "label": "CTA Button",
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
            "label": "Phone Frame",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shelf1Color",
            "label": "Shelf 1 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shelf2Color",
            "label": "Shelf 2 Color",
            "type": "color",
            "group": "General"
        },
        {
            "key": "shelf3Color",
            "label": "Shelf 3 Color",
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
            "key": "referenceImage",
            "label": "Reference Image",
            "type": "image",
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
    id: "MangoGiraffeMoneyFalling",
    title: "money-falling",
    description: "Mango Giraffe template",
    color: "#9003ba",
    icon: "🎬",
    category: "Miscellaneous",
    loadComponent: () => import("../../../MangoGiraffe/money-falling/Scene").then(m => m.Scene),
    defaultProps: {
        "itemCount": 40,
        "driftAmount": 20,
        "minFallDuration": 2,
        "maxFallDuration": 4,
        "itemSize": 0.05,
        "flashColor": "#FFD700",
        "fontFamily": "Open Sans",
        "backgroundColor": "transparent",
        "scale": 1,
        "animationSpeed": 1
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
        {
            "key": "itemCount",
            "label": "Element Count",
            "type": "number",
            "group": "General",
            "min": 10,
            "max": 100,
            "step": 1
        },
        {
            "key": "driftAmount",
            "label": "Drift (px)",
            "type": "number",
            "group": "General",
            "min": 0,
            "max": 100,
            "step": 5
        },
        {
            "key": "minFallDuration",
            "label": "Min Duration (s)",
            "type": "number",
            "group": "General",
            "min": 1,
            "max": 5,
            "step": 0.1
        },
        {
            "key": "maxFallDuration",
            "label": "Max Duration (s)",
            "type": "number",
            "group": "General",
            "min": 2,
            "max": 8,
            "step": 0.1
        },
        {
            "key": "itemSize",
            "label": "Icon Size",
            "type": "number",
            "group": "General",
            "min": 0.01,
            "max": 0.1,
            "step": 0.01
        },
        {
            "key": "flashColor",
            "label": "Flash Color",
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
            "key": "backgroundColor",
            "label": "Background",
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
            "label": "Speed",
            "type": "number",
            "group": "General",
            "min": 0.5,
            "max": 2,
            "step": 0.1
        }
    ],
  }
];

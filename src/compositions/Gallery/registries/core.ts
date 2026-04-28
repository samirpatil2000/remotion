import { CompositionDef } from "../types";
import { Scene as SpotifyScene, defaultSpotifyPlayerProps } from "../../SpotifyPlayer/Scene";
import { Scene as FutureScene, defaultFutureOfDesignProps } from "../../FutureOfDesign/Scene";
import { Scene as GoodMoodScene, defaultGoodMoodProps } from "../../GoodMood/Scene";

import { Scene as EditorialScene, defaultEditorialDesignProps } from "../../EditorialDesign/Scene";

export const CORE_REGISTRY: CompositionDef[] = [
  {
    id: "EditorialDesign",
    title: "Editorial Minimalist",
    description: "Premium asymmetric layout with masked reveals and tracking animations.",
    color: "#000000",
    icon: "📖",
    category: "Miscellaneous",
    loadComponent: () => Promise.resolve(EditorialScene),
    defaultProps: defaultEditorialDesignProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "smallText", label: "Small Text", type: "text", group: "Content" },
      { key: "mainText",  label: "Main Text",  type: "text", group: "Content" },
      { key: "subText",   label: "Sub Text",   type: "text", group: "Content" },

      { key: "backgroundColor", label: "Background", type: "color", group: "Colors" },
      { key: "textColor",       label: "Text",       type: "color", group: "Colors" },

      { key: "scale",         label: "Scale",          type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",label: "Animation Speed",type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SpotifyPlayer",
    title: "Spotify Player",
    description: "Vinyl record animation with marquee text and playback controls.",
    color: "#1DB954",
    icon: "🎵",
    category: "Social & Media",
    loadComponent: () => Promise.resolve(SpotifyScene),
    defaultProps: defaultSpotifyPlayerProps as unknown as Record<string, unknown>,
    durationInFrames: 300,
    fps: 30,
    controls: [
      { key: "trackTitle",    label: "Track Title",              type: "text",    group: "Content" },
      { key: "artistName",    label: "Artist",                   type: "text",    group: "Content" },
      { key: "totalDuration", label: "Duration",                 type: "text",    group: "Content" },
      { key: "vinylLabel",    label: "Vinyl Label (image URL)",  type: "url",     group: "Content" },
      { key: "fontFamily",    label: "Font Family",              type: "font",    group: "Content" },

      { key: "backgroundColor",    label: "Background",     type: "color", group: "Colors" },
      { key: "textColor",          label: "Text",           type: "color", group: "Colors" },
      { key: "secondaryTextColor", label: "Secondary Text", type: "color", group: "Colors" },
      { key: "accentColor",        label: "Accent",         type: "color", group: "Colors" },
      { key: "progressBarColor",   label: "Progress Bar",   type: "color", group: "Colors" },
      { key: "progressTrackColor", label: "Progress Track", type: "color", group: "Colors" },
      { key: "vinylColor",         label: "Vinyl",          type: "color", group: "Colors" },

      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "rotationSpeed",    label: "Vinyl Rotation",   type: "number", group: "Animation", min: 0.1, max: 3,   step: 0.1  },
      { key: "marqueeSpeed",     label: "Marquee Speed",    type: "number", group: "Animation", min: 0.3, max: 2,   step: 0.1  },
      { key: "progressDuration", label: "Progress (frames)",type: "number", group: "Animation", min: 60,  max: 500, step: 10   },

      { key: "showShuffleActive", label: "Shuffle Active", type: "boolean", group: "Playback" },
      { key: "showRepeatActive",  label: "Repeat Active",  type: "boolean", group: "Playback" },
    ],
  },
  {
    id: "FutureOfDesign",
    title: "Future of Design",
    description: "Physics-based typography animation with blur and glow effects.",
    color: "#6366f1",
    icon: "✨",
    category: "Miscellaneous",
    loadComponent: () => Promise.resolve(FutureScene),
    defaultProps: defaultFutureOfDesignProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "smallText", label: "Small Text", type: "text", group: "Content" },
      { key: "mainText",  label: "Main Text",  type: "text", group: "Content" },
      { key: "subText",   label: "Sub Text",   type: "text", group: "Content" },

      { key: "backgroundColor", label: "Background", type: "color", group: "Colors" },
      { key: "textColor",       label: "Text",       type: "color", group: "Colors" },
      { key: "glowColor",       label: "Glow",       type: "color", group: "Colors" },

      { key: "scale",         label: "Scale",          type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",label: "Animation Speed",type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "blurAmount",    label: "Blur Amount",    type: "number", group: "Animation", min: 0,   max: 50,  step: 5    },
      { key: "slideDistance", label: "Slide Distance", type: "number", group: "Animation", min: 50,  max: 400, step: 25   },
      { key: "glowIntensity", label: "Glow Intensity", type: "number", group: "Animation", min: 0,   max: 10,  step: 1    },
      { key: "letterSpacing", label: "Letter Spacing", type: "number", group: "Animation", min: -20, max: 10,  step: 2    },
    ],
  },
  {
    id: "GoodMood",
    title: "Good Mood",
    description: "Vibrant high-contrast typography with elastic spring-based animations.",
    color: "#ff1d1d",
    icon: "😊",
    category: "Typography",
    loadComponent: () => Promise.resolve(GoodMoodScene),
    defaultProps: defaultGoodMoodProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
    width: 1080,
    height: 1080,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.1, max: 2,   step: 0.1  },
      { key: "stretchIntensity", label: "Stretch Intensity",type: "number", group: "Animation", min: 0,   max: 0.5, step: 0.01 },
      
      { key: "topRowColor",    label: "Top Row Color",    type: "color", group: "Colors" },
      { key: "colorO1",        label: "Color O1",         type: "color", group: "Colors" },
      { key: "colorO2",        label: "Color O2",         type: "color", group: "Colors" },
      { key: "colorM",         label: "Color M",          type: "color", group: "Colors" },
      { key: "colorD",         label: "Color D",          type: "color", group: "Colors" },
      { key: "backgroundColor",label: "Background",       type: "color", group: "Colors" },
      
      { key: "wordTop",        label: "Top Word",         type: "text",  group: "Content" },
      { key: "wordBottom",     label: "Bottom Word",      type: "text",  group: "Content" },
      { key: "fontFamily",     label: "Font Family",      type: "font",  group: "Content" },
    ],
  },
];

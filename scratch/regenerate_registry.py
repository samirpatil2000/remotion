import os
import re

def regenerate_registry(swishy_dir, registry_path):
    # 1. Start with the core boilerplate
    core_imports = [
        'import React from "react";',
        'import { Scene as SpotifyScene, defaultSpotifyPlayerProps } from "../SpotifyPlayer/Scene";',
        'import { Scene as FutureScene, defaultFutureOfDesignProps } from "../FutureOfDesign/Scene";',
        'import { Scene as GoodMoodScene, defaultGoodMoodProps } from "../GoodMood/Scene";',
    ]
    
    # 2. Get all Swishy folders
    folders = sorted([f for f in os.listdir(swishy_dir) if os.path.isdir(os.path.join(swishy_dir, f))])
    
    # 3. Define some special mappings for the first 4 (manual ones)
    special_mappings = {
        'Motivational': ('MotivationalScene', 'SwishyMotivational'),
        'Storytime': ('StorytimeScene', 'SwishyStorytime'),
        'AStoryAboutTheWorld': ('WorldStoryScene', 'SwishyWorldStory'),
        'AnimateCharacters': ('AnimateCharactersScene', 'SwishyAnimateCharacters'),
    }
    
    swishy_imports = []
    swishy_entries = []
    
    seen_slugs = {
        'spotifyplayer', 'futureofdesign', 'goodmood',
        'motivational', 'storytime', 'astoryabouttheworld', 'animatecharacters'
    }
    seen_ids = {
        'SpotifyPlayer', 'FutureOfDesign', 'GoodMood',
        'SwishyMotivational', 'SwishyStorytime', 'SwishyWorldStory', 'SwishyAnimateCharacters'
    }
    
    def to_camel_case(text):
        text = re.sub(r'[^a-zA-Z0-9]', ' ', text)
        words = text.split()
        res = ''.join(word.capitalize() for word in words)
        if res and res[0].isdigit():
            res = 'N' + res
        return res

    # Add the special 4 first
    for folder, (comp_name, entry_id) in special_mappings.items():
        if os.path.exists(os.path.join(swishy_dir, folder, 'Scene.tsx')):
            swishy_imports.append(f'import {{ Scene as {comp_name} }} from "../Swishy/{folder}/Scene";')
            seen_slugs.add(folder.lower().replace('-', '').replace('_', ''))
            seen_ids.add(entry_id)
            # We'll use the hardcoded entries for these 4 later
            
    # Add the rest
    for folder in folders:
        if folder in special_mappings: continue
        if not os.path.exists(os.path.join(swishy_dir, folder, 'Scene.tsx')): continue
        
        norm_slug = folder.lower().replace('-', '').replace('_', '')
        if norm_slug in seen_slugs: continue
        seen_slugs.add(norm_slug)
        
        comp_name = to_camel_case(folder) + "Scene"
        entry_id = "Swishy" + to_camel_case(folder)
        
        if entry_id in seen_ids: continue
        seen_ids.add(entry_id)
        
        swishy_imports.append(f'import {{ Scene as {comp_name} }} from "../Swishy/{folder}/Scene";')
        
        entry = f"""  {{
    id: "{entry_id}",
    title: "{folder}",
    description: "Swishy template",
    color: "#{os.urandom(3).hex()}",
    icon: "🎬",
    component: {comp_name},
    defaultProps: {{
      scale: 1,
      animationSpeed: 1,
    }},
    durationInFrames: 150,
    fps: 30,
    controls: [
      {{ key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 }},
      {{ key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  }},
    ],
  }},"""
        swishy_entries.append(entry)

    # Hardcoded entries for the first 4
    hardcoded_4 = [
        """  {
    id: "SwishyMotivational",
    title: "Motivational",
    description: "Multi-scene kinetic typography for motivational stories and insights.",
    color: "#f97316",
    icon: "🔥",
    component: MotivationalScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#3b82f6",
      fontFamily: "Bebas Neue",
      staggerDelay: 10,
    },
    durationInFrames: 340,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "fontFamily",       label: "Font Family",      type: "font",   group: "Content" },
    ],
  },""",
        """  {
    id: "SwishyStorytime",
    title: "Storytime",
    description: "Condensed editorial text sequence with premium typography.",
    color: "#8b5cf6",
    icon: "📖",
    component: StorytimeScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#000000",
      textColor: "#ffffff",
      fontFamily: "Playfair Display",
    },
    durationInFrames: 350,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "fontFamily",       label: "Font Family",      type: "font",   group: "Content" },
    ],
  },""",
        """  {
    id: "SwishyWorldStory",
    title: "World Story",
    description: "Diverse kinetic typography sequence exploring creation and discovery.",
    color: "#0ea5e9",
    icon: "🌍",
    component: WorldStoryScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#f8fafc",
      textColor: "#1e293b",
      accentColor: "#64748b",
      headingFont: "Playfair Display",
      bodyFont: "DM Sans",
    },
    durationInFrames: 510,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "headingFont",      label: "Heading Font",     type: "font",   group: "Content" },
      { key: "bodyFont",         label: "Body Font",        type: "font",   group: "Content" },
    ],
  },""",
        """  {
    id: "SwishyAnimateCharacters",
    title: "Animate Characters",
    description: "Magical character animations with glowing effects and mystical forests.",
    color: "#a855f7",
    icon: "🦄",
    component: AnimateCharactersScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#0c0a1d",
      accentColor: "#a855f7",
      textColor: "#f8fafc",
    },
    durationInFrames: 300,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
    ],
  },""",
    ]

    # Combine
    final_content = "\n".join(core_imports) + "\n" + "\n".join(swishy_imports) + "\n\n"
    final_content += """export type ControlType = "color" | "text" | "url" | "number" | "boolean" | "font";

export interface Control {
  key: string;
  label: string;
  type: ControlType;
  group: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CompositionDef {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  defaultProps: Record<string, unknown>;
  durationInFrames: number;
  fps: number;
  controls: Control[];
}

export const REGISTRY: CompositionDef[] = [
  {
    id: "SpotifyPlayer",
    title: "Spotify Player",
    description: "Vinyl record animation with marquee text and playback controls.",
    color: "#1DB954",
    icon: "🎵",
    component: SpotifyScene,
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
    component: FutureScene,
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
    component: GoodMoodScene,
    defaultProps: defaultGoodMoodProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
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
      
      { key: "fontFamily",     label: "Font Family",      type: "font",  group: "Content" },
    ],
  },
"""
    final_content += "\n".join(hardcoded_4) + "\n"
    final_content += "\n".join(swishy_entries) + "\n"
    final_content += "];\n"
    
    with open(registry_path, 'w') as f:
        f.write(final_content)

if __name__ == "__main__":
    regenerate_registry('src/compositions/Swishy', 'src/compositions/Gallery/compositionRegistry.ts')

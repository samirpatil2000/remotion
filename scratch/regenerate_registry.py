import os
import re
import json

def parse_scene_params(file_path):
    if not os.path.exists(file_path):
        return [], {}
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find SCENE_PARAMS block
    match = re.search(r'const SCENE_PARAMS = \{(.*?)\};', content, re.DOTALL)
    if not match:
        return [], {}
    
    block = match.group(1)
    
    # Regex to extract params
    # Group 1: key, Group 2: type, Group 3: label, Group 4: value
    # value can be "string", 123, true/false
    param_pattern = re.compile(r'(\w+):\s*\{\s*type:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*value:\s*([^,}]+)')
    
    controls = []
    default_props = {}
    
    # We want to keep track of groups if they exist as comments
    # Swishy files often have // Content, // Colors etc.
    current_group = "General"
    
    lines = block.split('\n')
    for line in lines:
        group_match = re.search(r'//\s*(.*)', line)
        if group_match:
            current_group = group_match.group(1).strip()
            continue
        
        m = param_pattern.search(line)
        if m:
            key = m.group(1)
            ptype = m.group(2)
            label = m.group(3)
            raw_value = m.group(4).strip()
            
            # Parse value
            value = raw_value
            if raw_value.startswith('"') or raw_value.startswith("'"):
                value = raw_value.strip('"\'')
            elif raw_value.lower() == 'true':
                value = True
            elif raw_value.lower() == 'false':
                value = False
            else:
                try:
                    if '.' in raw_value:
                        value = float(raw_value)
                    else:
                        value = int(raw_value)
                except:
                    pass
            
            default_props[key] = value
            
            control = {
                "key": key,
                "label": label,
                "type": ptype,
                "group": current_group
            }
            
            # Add min/max/step if present
            for extra in ['min', 'max', 'step']:
                extra_match = re.search(fr'{extra}:\s*([^,}}]+)', line)
                if extra_match:
                    try:
                        val = float(extra_match.group(1).strip())
                        control[extra] = val
                    except:
                        pass
            
            controls.append(control)
            
    return controls, default_props

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
        
        # Parse params from Scene1.tsx
        scene1_path = os.path.join(swishy_dir, folder, 'Scene1.tsx')
        controls, default_props = parse_scene_params(scene1_path)
        
        # If no controls found, use defaults
        if not controls:
            controls = [
                {"key": "scale", "label": "Scale", "type": "number", "group": "Animation", "min": 0.5, "max": 2, "step": 0.05},
                {"key": "animationSpeed", "label": "Animation Speed", "type": "number", "group": "Animation", "min": 0.5, "max": 2, "step": 0.1}
            ]
            default_props = {"scale": 1, "animationSpeed": 1}
        
        # Format JSON-like strings
        controls_str = json.dumps(controls, indent=6)[6:-1]
        default_props_str = json.dumps(default_props, indent=6)[6:-1]
        
        # Calculate duration
        template_json_path = os.path.join(swishy_dir, folder, 'template.json')
        name = folder
        desc = "Swishy template"
        duration = 150
        if os.path.exists(template_json_path):
            with open(template_json_path, 'r') as f:
                data = json.load(f)
                name = data.get('name', folder)
                desc = data.get('description', "Swishy template") or "Swishy template"
                duration = sum(s.get('duration_frames', 150) for s in data.get('scenes', []))

        entry = f"""  {{
    id: "{entry_id}",
    title: "{name}",
    description: "{desc}",
    color: "#{os.urandom(3).hex()}",
    icon: "🎬",
    component: {comp_name},
    defaultProps: {{{default_props_str}}},
    durationInFrames: {duration},
    fps: 30,
    controls: [{controls_str}],
  }},"""
        swishy_entries.append(entry)

    # Hardcoded entries for the first 4
    # (Same as before, but I'll skip them here for brevity and just use what's in the file)
    # Actually, I'll just keep the hardcoded_4 logic from the previous file.
    
    # Let's read the old hardcoded_4 from the existing file to preserve them
    with open(os.path.join(os.getcwd(), 'scratch/regenerate_registry.py'), 'r') as f:
        old_content = f.read()
    
    hardcoded_match = re.search(r'hardcoded_4 = \[(.*?)\]', old_content, re.DOTALL)
    hardcoded_4_str = hardcoded_match.group(1) if hardcoded_match else ""

    # Combine
    final_content = "\n".join(core_imports) + "\n" + "\n".join(swishy_imports) + "\n\n"
    final_content += """export type ControlType = "color" | "text" | "url" | "number" | "boolean" | "font" | "video";

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
    final_content += hardcoded_4_str + "\n"
    final_content += "\n".join(swishy_entries) + "\n"
    final_content += "];\n"
    
    with open(registry_path, 'w') as f:
        f.write(final_content)

if __name__ == "__main__":
    regenerate_registry('src/compositions/Swishy', 'src/compositions/Gallery/compositionRegistry.ts')

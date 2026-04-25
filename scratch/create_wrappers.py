import os
import json

def create_index_files(root_dir):
    for slug in os.listdir(root_dir):
        dir_path = os.path.join(root_dir, slug)
        if not os.path.isdir(dir_path):
            continue
        
        # Check if Scene1.tsx exists
        scene1_path = os.path.join(dir_path, 'Scene1.tsx')
        if not os.path.exists(scene1_path):
            continue
            
        # Count scenes (excluding the wrapper itself)
        scenes = [f for f in os.listdir(dir_path) if f.startswith('Scene') and f.endswith('.tsx') and f != 'Scene.tsx']
        # Sort numerically
        scenes.sort(key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0)
        
        # Load template.json if available to get durations
        template_json_path = os.path.join(dir_path, 'template.json')
        durations = []
        if os.path.exists(template_json_path):
            try:
                with open(template_json_path, 'r') as f:
                    data = json.load(f)
                    for scene in data.get('scenes', []):
                        durations.append(scene.get('duration_frames', 150))
            except:
                pass
        
        # Default duration if not found or mismatch
        if len(durations) != len(scenes):
            durations = [150] * len(scenes)
            
        # Create Scene.tsx (the wrapper)
        with open(os.path.join(dir_path, 'Scene.tsx'), 'w') as out:
            for i in range(len(scenes)):
                out.write(f'import Scene{i+1} from "./Scene{i+1}";\n')
            out.write('import { TemplateWrapper } from "../TemplateWrapper";\n')
            out.write('import React from "react";\n\n')
            out.write('export const Scene: React.FC<any> = (props) => {\n')
            out.write('  const scenes = [\n')
            for i in range(len(scenes)):
                d = durations[i]
                out.write(f'    {{ component: Scene{i+1}, durationInFrames: {d} }},\n')
            out.write('  ];\n\n')
            out.write('  return <TemplateWrapper scenes={scenes} props={props} />;\n')
            out.write('};\n')
        
        print(f"Fixed Scene.tsx for {slug}")

if __name__ == "__main__":
    import re
    create_index_files('src/compositions/Swishy')

import re
import sys
import os
import json

def unescape_js(code):
    try:
        # Wrap in quotes and use json.loads to unescape
        return json.loads('"' + code + '"')
    except:
        # Fallback if it fails
        code = code.replace('\\"', '"').replace('\\\\', '\\')
        code = code.replace('\\u0026', '&').replace('\\u003c', '<').replace('\\u003e', '>')
        code = code.replace('\\u0027', "'").replace('\\u0022', '"')
        return code

def extract_metadata(content):
    # Look for the template object
    matches = re.findall(r'(\{\"template\":\{.*?\}\}\}\}\]\])', content)
    if not matches:
        matches = re.findall(r'(\{\"template\":\{.*?\})', content)
    
    for match in matches:
        unescaped = match.replace('\\"', '"').replace('\\\\', '\\')
        try:
            start = unescaped.find('{"template":')
            brace_count = 0
            end = -1
            for i in range(start, len(unescaped)):
                if unescaped[i] == '{': brace_count += 1
                elif unescaped[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end = i + 1
                        break
            if end != -1:
                data = json.loads(unescaped[start:end])
                return data['template']
        except:
            continue
    return None

def extract_scenes(html_file, output_root):
    with open(html_file, 'r') as f:
        content = f.read()
    
    template = extract_metadata(content)
    name = template['name'] if template else os.path.basename(html_file)
    desc = (template['description'] if template else "No description available") or "No description available"
    slug = template['slug'] if template else os.path.splitext(os.path.basename(html_file))[0]
    
    # 1. Standard next-f push blocks
    matches = re.findall(r'self\.__next_f\.push\(\[1,"(const SCENE_PARAMS = .*?)"\]\)', content, re.DOTALL)
    
    # 2. Try iframe srcDoc if no matches (e.g. logo-reveal)
    if not matches:
        # Find all srcDoc contents
        srcdocs = re.findall(r'srcDoc="(.*?)"', content, re.DOTALL)
        for doc in srcdocs:
            unescaped_doc = doc.replace('&quot;', '"').replace('&#x27;', "'").replace('&lt;', '<').replace('&gt;', '>')
            # Find const SCENE_PARAMS in there
            sub_matches = re.findall(r'(const SCENE_PARAMS = .*?)(?=</script>|$)', unescaped_doc, re.DOTALL)
            matches.extend(sub_matches)

    output_dir = os.path.join(output_root, slug)
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Processing {slug}: Found {len(matches)} scenes")
    
    for i, match in enumerate(matches):
        print(f"  Scene {i+1} match length: {len(match)}")
        code = unescape_js(match)
        
        # Strip potential garbage at the end
        if 'export default Scene' in code:
            code = code.split('export default Scene')[0]
        
        scene_file = os.path.join(output_dir, f'Scene{i+1}.tsx')
        with open(scene_file, 'w') as out:
            out.write(f'// Template: {name}\n')
            out.write(f'// Description: {desc}\n')
            out.write('// Scene: ' + (template["scenes"][i]["name"] if template and i < len(template["scenes"]) else f"Scene {i+1}") + '\n\n')
            out.write('import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";\n')
            out.write('import React from "react";\n\n')
            out.write(code)
            out.write('\n\nexport default Scene;\n')
            
    if template:
        with open(os.path.join(output_dir, 'template.json'), 'w') as out:
            json.dump(template, out, indent=2)

if __name__ == "__main__":
    output_root = 'src/compositions/Swishy'
    files = sys.argv[1:]
    for f in files:
        if os.path.isfile(f):
            extract_scenes(f, output_root)

import re
import sys
import os

def extract_scenes(html_file):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Find all SCENE_PARAMS + Scene() function blocks
    # They are usually in self.__next_f.push([1,"const SCENE_PARAMS = ... function Scene() { ... }"])
    # We need to handle the escaped quotes and newlines
    
    # Pattern to match the script block containing SCENE_PARAMS
    # We look for the literal "const SCENE_PARAMS =" inside the push call
    matches = re.findall(r'self\.__next_f\.push\(\[1,"(const SCENE_PARAMS = .*?function Scene\(.*?\n\})"]\)', content, re.DOTALL)
    
    if not matches:
        # Try a different pattern if the above fails
        # Sometimes it might not have the newline at the end
        matches = re.findall(r'self\.__next_f\.push\(\[1,"(const SCENE_PARAMS = .*?function Scene\(.*?\})"]\)', content, re.DOTALL)

    base_name = os.path.splitext(os.path.basename(html_file))[0]
    os.makedirs(f'extracted/{base_name}', exist_ok=True)
    
    print(f"Found {len(matches)} scenes in {html_file}")
    
    for i, match in enumerate(matches):
        # Unescape the string
        code = match.replace('\\"', '"').replace('\\\\', '\\').replace('\\n', '\n').replace('\\u003c', '<').replace('\\u003e', '>')
        
        with open(f'extracted/{base_name}/Scene{i+1}.tsx', 'w') as out:
            # Add necessary imports
            out.write('import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";\n')
            out.write('import React from "react";\n\n')
            out.write(code)
            out.write('\n\nexport default Scene;\n')
            
        print(f"  Extracted Scene {i+1} to extracted/{base_name}/Scene{i+1}.tsx")

if __name__ == "__main__":
    os.makedirs('extracted', exist_ok=True)
    for arg in sys.argv[1:]:
        extract_scenes(arg)

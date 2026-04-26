import os
import re
import glob

def refactor_scene_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Update component signature
    # Handle both 'function Scene() {' and 'function Scene(){'
    content = re.sub(r'function Scene\(\)\s*\{', 'function Scene(props: any) {', content)

    # 2. Replace SCENE_PARAMS usage
    # We want to replace SCENE_PARAMS.key.value with (props.key ?? SCENE_PARAMS.key.value)
    # But only if it hasn't been replaced already.
    # We look for SCENE_PARAMS.something.value but NOT preceded by '?? '
    
    # Simple regex to find the keys
    # Pattern: SCENE_PARAMS\.(\w+)\.value
    # Replacement: (props.\1 ?? SCENE_PARAMS.\1.value)
    
    # To avoid double replacement, we can first check if '(props.' is already in the file near SCENE_PARAMS
    # Or just use a negative lookbehind if supported, but Python's re has some limitations.
    # Let's just do a safe replacement.
    
    def replacement(match):
        key = match.group(1)
        # If the match is already inside (props.key ?? ...), skip it.
        # This is a bit tricky with regex alone. 
        # However, since I'm running this once, it's safer.
        return f'(props.{key} ?? SCENE_PARAMS.{key}.value)'

    # We need to make sure we don't replace inside the SCENE_PARAMS definition itself!
    # The SCENE_PARAMS definition looks like: title: { type: "text", ..., value: "..." }
    # So it doesn't match SCENE_PARAMS\.(\w+)\.value.
    
    # Actually, let's use a more robust regex that avoids already-replaced ones.
    # We search for SCENE_PARAMS\.(\w+)\.value but make sure it doesn't start with 'props.'
    content = re.sub(r'(?<!props\.)SCENE_PARAMS\.(\w+)\.value', replacement, content)

    with open(file_path, 'w') as f:
        f.write(content)

def main():
    swishy_dir = 'src/compositions/Swishy'
    # Find all Scene1.tsx, Scene2.tsx, etc.
    scene_files = glob.glob(os.path.join(swishy_dir, '*', 'Scene*.tsx'))
    
    print(f"Found {len(scene_files)} scene files to refactor.")
    
    for file_path in scene_files:
        # Skip the wrapper
        if 'TemplateWrapper.tsx' in file_path:
            continue
        try:
            refactor_scene_file(file_path)
            print(f"Refactored: {file_path}")
        except Exception as e:
            print(f"Error refactoring {file_path}: {e}")

if __name__ == "__main__":
    main()

import os
import re

def fix_missing_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') and 'Scene' in file:
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                needed = []
                if '<Loop' in content and 'Loop' not in content.split('import')[1].split('}')[0]:
                    needed.append('Loop')
                if '<OffthreadVideo' in content and 'OffthreadVideo' not in content.split('import')[1].split('}')[0]:
                    needed.append('OffthreadVideo')
                
                if needed:
                    print(f"Fixing {path} adding {needed}")
                    # Find the remotion import line
                    remotion_import_match = re.search(r'import \{ (.*) \} from "remotion";', content)
                    if remotion_import_match:
                        existing = remotion_import_match.group(1).split(', ')
                        for n in needed:
                            if n not in existing:
                                existing.append(n)
                        new_import = 'import { ' + ', '.join(sorted(list(set(existing)))) + ' } from "remotion";'
                        content = content.replace(remotion_import_match.group(0), new_import)
                        with open(path, 'w') as f:
                            f.write(content)

if __name__ == "__main__":
    fix_missing_imports('src/compositions/Swishy')

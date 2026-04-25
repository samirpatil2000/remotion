import os
import re

def verify_imports(registry_path):
    with open(registry_path, 'r') as f:
        content = f.read()
    
    imports = re.findall(r'from "(.*)"', content)
    base_dir = os.path.dirname(registry_path)
    
    missing = []
    for imp in imports:
        if imp.startswith('.'):
            full_path = os.path.normpath(os.path.join(base_dir, imp + ".tsx"))
            if not os.path.exists(full_path):
                # Try .ts
                full_path_ts = os.path.normpath(os.path.join(base_dir, imp + ".ts"))
                if not os.path.exists(full_path_ts):
                    # Try directory/index.tsx
                    full_path_index = os.path.normpath(os.path.join(base_dir, imp, "index.tsx"))
                    if not os.path.exists(full_path_index):
                        missing.append(imp)
                        
    if missing:
        print("Missing imports:")
        for m in missing:
            print(m)
    else:
        print("All imports verified.")

if __name__ == "__main__":
    verify_imports('src/compositions/Gallery/compositionRegistry.ts')

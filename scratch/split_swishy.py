
import os
import re

source_path = '/Users/samirpatil/Desktop/Dev/remotion/src/compositions/Gallery/compositionRegistry.ts'
output_dir = '/Users/samirpatil/Desktop/Dev/remotion/src/compositions/Gallery/registries/swishy'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(source_path, 'r') as f:
    lines = f.readlines()

# SWISHY starts around line 264 (0-indexed)
swishy_lines = lines[264:]
content = "".join(swishy_lines)

# Remove the ending "];" and any trailing noise
if "];" in content:
    content = content[:content.rfind("];")]

# Split by the "id:" field
parts = re.split(r'(?=\s+id: "Swishy)', content)

registry_entries = []
for part in parts:
    part = part.strip()
    if not part:
        continue
    
    # Remove trailing comma if it exists
    if part.endswith(","):
        part = part[:-1]
    
    # Ensure it's wrapped in braces
    obj_str = "{\n    " + part + "\n  }"
    
    # Fix loadComponent to use dynamic import
    title_match = re.search(r'title: "([^"]+)"', obj_str)
    if title_match:
        title = title_match.group(1)
        obj_str = re.sub(r'loadComponent: \(\) => Promise\.resolve\([^)]+\)', 
                         f'loadComponent: () => import("../../../Swishy/{title}/Scene").then(m => m.Scene)', 
                         obj_str)
    
    registry_entries.append(obj_str)

chunk_size = 20
chunks = [registry_entries[i:i + chunk_size] for i in range(0, len(registry_entries), chunk_size)]

registry_files = []
for i, chunk in enumerate(chunks):
    filename = f"swishy_{i}.ts"
    registry_files.append(filename)
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w') as f:
        f.write('import { CompositionDef } from "../../types";\n\n')
        f.write(f'export const SWISHY_REGISTRY_{i}: CompositionDef[] = [\n')
        for j, entry in enumerate(chunk):
            f.write(f"  {entry}")
            if j < len(chunk) - 1:
                f.write(",")
            f.write("\n")
        f.write('];\n')

index_path = os.path.join(output_dir, 'index.ts')
with open(index_path, 'w') as f:
    for i, filename in enumerate(registry_files):
        f.write(f'import {{ SWISHY_REGISTRY_{i} }} from "./swishy_{i}";\n')
    
    f.write('\nexport const SWISHY_REGISTRY = [\n')
    for i in range(len(chunks)):
        f.write(f'  ...SWISHY_REGISTRY_{i},\n')
    f.write('];\n')

print(f"Successfully split into {len(chunks)} files in {output_dir}")

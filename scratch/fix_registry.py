
import os

filepath = 'src/compositions/Gallery/compositionRegistry.ts'
core_path = 'src/compositions/Gallery/registries/core.ts'
swishy_path = 'src/compositions/Gallery/registries/swishy.ts'

if not os.path.exists('src/compositions/Gallery/registries'):
    os.makedirs('src/compositions/Gallery/registries')

with open(filepath, 'r') as f:
    lines = f.readlines()

# CORE: Lines 171 to 262 (1-indexed) -> index 170 to 261
core_content = lines[170:262]

# SWISHY: Lines 265 to 17423 (1-indexed) -> index 264 to 17423
swishy_content = lines[264:17423]

# Write core.ts
with open(core_path, 'w') as f:
    f.write('import { CompositionDef } from "../types";\n\n')
    f.write('export const CORE_REGISTRY: CompositionDef[] = [\n')
    f.writelines(core_content)
    f.write('];\n')

# Write swishy.ts
with open(swishy_path, 'w') as f:
    f.write('import { CompositionDef } from "../types";\n\n')
    f.write('export const SWISHY_REGISTRY: CompositionDef[] = [\n')
    f.writelines(swishy_content)
    f.write('];\n')

print(f"Successfully split into {core_path} and {swishy_path}")

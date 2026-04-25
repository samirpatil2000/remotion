import re

def cleanup_registry(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    imports = []
    other_top = []
    registry_entries = []
    other_bottom = []
    
    in_registry = False
    current_entry = []
    
    import_pattern = re.compile(r'^import .* from ".*";')
    id_pattern = re.compile(r'id: "(.*)"')
    
    for line in lines:
        if import_pattern.match(line):
            imports.append(line)
        elif 'export const REGISTRY: CompositionDef[] = [' in line:
            in_registry = True
            other_top.append(line)
        elif in_registry:
            if line.strip() == '];':
                in_registry = False
                other_bottom.append(line)
            else:
                current_entry.append(line)
                if line.strip() == '},':
                    registry_entries.append("".join(current_entry))
                    current_entry = []
        else:
            if not imports and not other_top:
                other_top.append(line)
            elif not in_registry:
                if 'export type' in line or 'export interface' in line or '//' in line:
                   other_top.append(line)
                else:
                   other_bottom.append(line)

    # Deduplicate imports by the imported name
    seen_imports = {}
    unique_imports = []
    for imp in imports:
        match = re.search(r'import \{.* as (.*) \} from', imp)
        if match:
            name = match.group(1)
            if name not in seen_imports:
                seen_imports[name] = imp
                unique_imports.append(imp)
        else:
            # Handle other imports
            unique_imports.append(imp)
            
    # Deduplicate registry entries by id
    seen_ids = set()
    unique_entries = []
    for entry in registry_entries:
        match = id_pattern.search(entry)
        if match:
            entry_id = match.group(1)
            if entry_id not in seen_ids:
                seen_ids.add(entry_id)
                unique_entries.append(entry)
        else:
            unique_entries.append(entry)
            
    # Reconstruct the file
    # This is a bit complex because of the "other" parts.
    # Let's try a simpler approach: just find the boundaries.
    
    content = "".join(lines)
    # Split into: Imports, Middle (types etc), Registry, Bottom
    
    # Actually, let's just write a new file structure
    new_content = "".join(unique_imports) + "\n"
    # Find the part between imports and REGISTRY
    # ...
    
    # Simple fix: just use the deduplicated lists for now
    # Wait, I'll just manually fix the file with multi_replace because it's safer than a buggy script.
    
if __name__ == "__main__":
    # cleanup_registry('src/compositions/Gallery/compositionRegistry.ts')
    pass

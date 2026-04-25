import json
import re
import sys
import os

def extract_template_json(html_file):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Look for the template object inside the push call
    # It usually starts with {"template":{...}}
    # We want the one that has "id", "name", "scenes"
    
    # Look for the JSON part
    matches = re.findall(r'(\{\"template\":\{.*?\}\}\}\}\]\])', content)
    
    if not matches:
        # Try a broader search for {"template":
        matches = re.findall(r'(\{\"template\":\{.*?\})', content)

    base_name = os.path.splitext(os.path.basename(html_file))[0]
    
    for match in matches:
        # Unescape and try to parse
        unescaped = match.replace('\\"', '"').replace('\\\\', '\\')
        try:
            # Find the start of the object
            start = unescaped.find('{"template":')
            # Balance braces to find the end
            brace_count = 0
            end = -1
            for i in range(start, len(unescaped)):
                if unescaped[i] == '{':
                    brace_count += 1
                elif unescaped[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end = i + 1
                        break
            
            if end != -1:
                json_str = unescaped[start:end]
                data = json.loads(json_str)
                with open(f'extracted/{base_name}/template.json', 'w') as out:
                    json.dump(data['template'], out, indent=2)
                print(f"Extracted template JSON for {base_name}")
                return
        except Exception as e:
            continue

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        extract_template_json(arg)

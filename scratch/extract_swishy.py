import json
import re
import sys

def extract_swishy_data(html_file):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Look for the JSON blob in the Next.js payload
    # It usually starts with self.__next_f.push([1,"...
    # We want the part that contains the template data
    matches = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"]\)', content)
    
    for match in matches:
        # Unescape the string
        unescaped = match.replace('\\"', '"').replace('\\\\', '\\')
        if 'template' in unescaped and 'scenes' in unescaped:
            print(f"Found template data in {html_file}")
            # Try to find the JSON part
            try:
                # Find the first { and last }
                start = unescaped.find('{')
                end = unescaped.rfind('}') + 1
                json_str = unescaped[start:end]
                data = json.loads(json_str)
                with open(html_file.replace('.html', '.json'), 'w') as out:
                    json.dump(data, out, indent=2)
                print(f"Extracted JSON to {html_file.replace('.html', '.json')}")
            except Exception as e:
                print(f"Failed to parse JSON: {e}")

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        extract_swishy_data(arg)

import os
import re
import glob

def refactor_scene_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Ensure main Scene component takes props
    content = re.sub(r'function Scene\s*\(([^)]*)\)\s*\{', r'function Scene(props: any) {', content)

    # 2. Find other components (Capitalized functions or arrows) and make them accept props
    
    def process_args(args):
        args = args.strip()
        if args.startswith('{') and args.endswith('}'):
            inner = args[1:-1].strip()
            if 'props' not in inner:
                return '{ props, ' + inner + ' }'
        elif not args:
            return '{ props }'
        elif 'props' not in args:
             return '{ props, ...rest }'
        return args

    # function SomeComponent({ ... }) {
    content = re.sub(r'function ([A-Z]\w+)\s*\(([^)]*)\)\s*\{', 
                     lambda m: f'function {m.group(1)}({process_args(m.group(2))}: any) {{', 
                     content)
    
    # const SomeComponent = ({ ... }) => {
    content = re.sub(r'const ([A-Z]\w+)\s*=\s*\(([^)]*)\)\s*=>', 
                     lambda m: f'const {m.group(1)} = ({process_args(m.group(2))}: any) =>', 
                     content)

    # 3. Find component call sites and pass props={props}
    reserved = {'AbsoluteFill', 'Img', 'Sequence', 'Loop', 'OffthreadVideo', 'Audio', 'Series', 'Video', 'Composition', 'Player', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'ol', 'svg', 'g', 'path', 'rect', 'circle', 'polygon', 'text', 'tspan', 'defs', 'linearGradient', 'stop', 'filter', 'feGaussianBlur', 'feColorMatrix', 'feOffset', 'feMerge', 'feMergeNode', 'foreignObject', 'feDropShadow', 'ellipse', 'line'}
    
    def component_call_repl(match):
        name = match.group(1)
        attrs = match.group(2)
        
        if name in reserved or name.islower():
            return match.group(0)
            
        if 'props={props}' in attrs or 'props={' in attrs:
            return match.group(0)
            
        return f'<{name} props={{props}} {attrs}'

    content = re.sub(r'<([A-Z]\w+)(\s+[^>]*\/?>)', component_call_repl, content)

    with open(file_path, 'w') as f:
        f.write(content)

def main():
    swishy_dir = 'src/compositions/Swishy'
    scene_files = glob.glob(os.path.join(swishy_dir, '*', 'Scene*.tsx'))
    
    for file_path in scene_files:
        if 'TemplateWrapper.tsx' in file_path:
            continue
        try:
            refactor_scene_file(file_path)
        except Exception as e:
            print(f"Error fixing {file_path}: {e}")

if __name__ == "__main__":
    main()

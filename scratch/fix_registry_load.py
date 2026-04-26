import re

path = 'src/compositions/Gallery/compositionRegistry.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace component: SomeScene with loadComponent: () => Promise.resolve(SomeScene)
# We need to be careful with the spacing
content = re.sub(r'component:\s*(\w+),', r'loadComponent: () => Promise.resolve(\1),', content)

with open(path, 'w') as f:
    f.write(content)

print("Done")

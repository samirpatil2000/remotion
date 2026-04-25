import os

def normalize(slug):
    return slug.lower().replace('_', '-').replace(' ', '-')

with open('all_slugs.txt', 'r') as f:
    all_slugs = [line.strip() for line in f if line.strip()]

processed = set()
for d in os.listdir('src/compositions/Swishy'):
    if os.path.isdir(os.path.join('src/compositions/Swishy', d)):
        processed.add(normalize(d))

# Also add the ones that were just processed but might not be normalized in the list
# (though I should have normalized them)

pending = [s for s in all_slugs if normalize(s) not in processed]

print(f"Total: {len(all_slugs)}")
print(f"Processed: {len(processed)}")
print(f"Pending: {len(pending)}")

with open('pending_slugs_v2.txt', 'w') as f:
    for s in pending:
        f.write(s + '\n')

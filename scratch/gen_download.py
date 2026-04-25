import sys

with open('batch2_slugs.txt', 'r') as f:
    slugs = [line.strip() for line in f if line.strip()]

with open('download_batch2.sh', 'w') as f:
    f.write('mkdir -p swishy_html\n')
    f.write('cd swishy_html\n')
    for slug in slugs:
        f.write(f'curl -L -O https://www.swishy.ai/templates/{slug}\n')

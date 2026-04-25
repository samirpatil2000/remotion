import subprocess
import os

def download_slugs(slugs_file, output_dir):
    with open(slugs_file, 'r') as f:
        slugs = [line.strip() for line in f if line.strip()]
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for i, slug in enumerate(slugs):
        print(f"[{i+1}/{len(slugs)}] Downloading {slug}...")
        url = f"https://www.swishy.ai/templates/{slug}"
        output_path = os.path.join(output_dir, slug)
        if os.path.exists(output_path):
            print(f"Skipping {slug}, already exists.")
            continue
            
        try:
            subprocess.run(['curl', '-L', url, '-o', output_path], timeout=15)
        except subprocess.TimeoutExpired:
            print(f"Timeout downloading {slug}")
        except Exception as e:
            print(f"Error downloading {slug}: {e}")

if __name__ == "__main__":
    download_slugs('remaining_slugs.txt', 'swishy_html')

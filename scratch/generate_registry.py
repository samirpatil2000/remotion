import os
import json
import re

def to_camel_case(text):
    text = re.sub(r'[^a-zA-Z0-9]', ' ', text)
    words = text.split()
    res = ''.join(word.capitalize() for word in words)
    if res and res[0].isdigit():
        res = 'N' + res
    return res

def generate_registry_entries(root_dir):
    entries = []
    imports = []
    
    # Slugs already in the first 26 entries
    skip_slugs = {
        'motivational', 'storytime', 'a-story-about-the-world', 'animate-characters',
        '3d-cube', 'animated-blob', 'app-video-showcase', 'apple-style-30-sec-counter-1',
        'funnel-text-animation', 'heart-crush-button', 'i-want-a-smooth-animation-where-the-text-with-2-li',
        'interactive-pixel-art-waves', 'logo-code', 'logo-spin', 'mobile-bookshelf',
        'phone-notification-pop-up', 'pins', 'pop-up-message-bubble', 'saas-security',
        'simple-timelapse-2', 'thinking', 'whatsapp-convo', 'years-rolling-text'
    }
    
    # IDs already registered (to avoid duplicate imports/IDs)
    registered_ids = {
        'SpotifyPlayer', 'FutureOfDesign', 'GoodMood',
        'SwishyMotivational', 'SwishyStorytime', 'SwishyWorldStory', 'SwishyAnimateCharacters',
        'SwishyThreeDCube', 'SwishyAnimatedBlob', 'SwishyAppVideoShowcase', 'SwishyAppleStyle30SecCounter1',
        'SwishyFunnelTextAnimation', 'SwishyHeartCrushButton', 'SwishyIWantASmoothAnimationWhereTheTextWith2Li',
        'SwishyInteractivePixelArtWaves', 'SwishyLogoCode', 'SwishyLogoSpin', 'SwishyMobileBookshelf',
        'SwishyPhoneNotificationPopUp', 'SwishyPins', 'SwishyPopUpMessageBubble', 'SwishySaasSecurity',
        'SwishySimpleTimelapse2', 'SwishyThinking', 'SwishyWhatsappConvo', 'SwishyYearsRollingText'
    }
    
    for slug in sorted(os.listdir(root_dir)):
        dir_path = os.path.join(root_dir, slug)
        if not os.path.isdir(dir_path): continue
        if not os.path.exists(os.path.join(dir_path, 'Scene.tsx')): continue
        
        # Normalize slug
        norm_slug = slug.lower().replace('_', '-').replace(' ', '-')
        if norm_slug in skip_slugs: continue
        
        comp_name = to_camel_case(slug)
        full_id = f"Swishy{comp_name}"
        
        if full_id in registered_ids: continue
        
        imports.append(f'import {{ Scene as {comp_name}Scene }} from "../Swishy/{slug}/Scene";')
        
        # Load template.json for metadata
        template_json_path = os.path.join(dir_path, 'template.json')
        name = slug
        desc = "Swishy template"
        duration = 150
        if os.path.exists(template_json_path):
            with open(template_json_path, 'r') as f:
                data = json.load(f)
                name = data.get('name', slug)
                desc = data.get('description', "Swishy template") or "Swishy template"
                duration = sum(s.get('duration_frames', 150) for s in data.get('scenes', []))
        
        entry = f"""  {{
    id: "{full_id}",
    title: "{name}",
    description: "{desc}",
    color: "#{os.urandom(3).hex()}",
    icon: "🎬",
    component: {comp_name}Scene,
    defaultProps: {{
      scale: 1,
      animationSpeed: 1,
    }},
    durationInFrames: {duration},
    fps: 30,
    controls: [
      {{ key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 }},
      {{ key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  }},
    ],
  }},"""
        entries.append(entry)
        
    print("\n".join(imports))
    print("\n// --- ENTRIES ---\n")
    print("\n".join(entries))

if __name__ == "__main__":
    generate_registry_entries('src/compositions/Swishy')

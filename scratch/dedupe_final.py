import re

def deduplicate_final(registry_path):
    with open(registry_path, 'r') as f:
        lines = f.readlines()
    
    seen_names = set()
    seen_ids = set()
    
    final_lines = []
    in_registry = False
    current_entry = []
    
    # Pre-populate with existing ones from Batch 1
    existing_names = {'SpotifyScene', 'FutureScene', 'GoodMoodScene', 'MotivationalScene', 'StorytimeScene', 'WorldStoryScene', 'AnimateCharactersScene', 'ThreeDCubeScene', 'AnimatedBlobScene', 'AppVideoShowcaseScene', 'AppleStyle30SecCounter1Scene', 'FunnelTextAnimationScene', 'HeartCrushButtonScene', 'IWantASmoothAnimationWhereTheTextWith2LiScene', 'InteractivePixelArtWavesScene', 'LogoCodeScene', 'LogoSpinScene', 'MobileBookshelfScene', 'PhoneNotificationPopUpScene', 'PinsScene', 'PopUpMessageBubbleScene', 'SaasSecurityScene', 'SimpleTimelapse2Scene', 'ThinkingScene', 'WhatsappConvoScene', 'YearsRollingTextScene'}
    existing_ids = {'SpotifyPlayer', 'FutureOfDesign', 'GoodMood', 'SwishyMotivational', 'SwishyStorytime', 'SwishyWorldStory', 'SwishyAnimateCharacters', 'SwishyThreeDCube', 'SwishyAnimatedBlob', 'SwishyAppVideoShowcase', 'SwishyAppleStyle30SecCounter1', 'SwishyFunnelTextAnimation', 'SwishyHeartCrushButton', 'SwishyIWantASmoothAnimationWhereTheTextWith2Li', 'SwishyInteractivePixelArtWaves', 'SwishyLogoCode', 'SwishyLogoSpin', 'SwishyMobileBookshelf', 'SwishyPhoneNotificationPopUp', 'SwishyPins', 'SwishyPopUpMessageBubble', 'SwishySaasSecurity', 'SwishySimpleTimelapse2', 'SwishyThinking', 'SwishyWhatsappConvo', 'SwishyYearsRollingText'}
    
    seen_names.update(existing_names)
    seen_ids.update(existing_ids)
    
    # Process imports
    new_imports = []
    for line in lines[:100]: # Look at the top
        if 'import { Scene as' in line:
            match = re.search(r'as (.*) \}', line)
            if match:
                name = match.group(1)
                if name not in seen_names:
                    seen_names.add(name)
                    new_imports.append(line)
                    
    # Process registry
    new_entries = []
    for line in lines:
        if 'id: "' in line:
            match = re.search(r'id: "(.*)"', line)
            if match:
                entry_id = match.group(1)
                if entry_id not in seen_ids:
                    # Collect the whole entry
                    # This is hard because we don't know where it starts.
                    pass
                    
    # Let's just do a simpler thing: replace the file with a clean one.
    # I'll construct it from scratch.

if __name__ == "__main__":
    pass

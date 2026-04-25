import React from "react";
import { Scene as SpotifyScene, defaultSpotifyPlayerProps } from "../SpotifyPlayer/Scene";
import { Scene as FutureScene, defaultFutureOfDesignProps } from "../FutureOfDesign/Scene";
import { Scene as GoodMoodScene, defaultGoodMoodProps } from "../GoodMood/Scene";
import { Scene as MotivationalScene } from "../Swishy/Motivational/Scene";
import { Scene as StorytimeScene } from "../Swishy/Storytime/Scene";
import { Scene as WorldStoryScene } from "../Swishy/AStoryAboutTheWorld/Scene";
import { Scene as AnimateCharactersScene } from "../Swishy/AnimateCharacters/Scene";
import { Scene as N2026Scene } from "../Swishy/2026/Scene";
import { Scene as N3dCubeScene } from "../Swishy/3d-cube/Scene";
import { Scene as AStormOfInfoScene } from "../Swishy/a-storm-of-info/Scene";
import { Scene as AdSpendScene } from "../Swishy/ad-spend/Scene";
import { Scene as AlarmToggle1Scene } from "../Swishy/alarm-toggle-1/Scene";
import { Scene as AnimateNetflixLogoScene } from "../Swishy/animate-netflix-logo/Scene";
import { Scene as AnimatedAppListScene } from "../Swishy/animated-app-list/Scene";
import { Scene as AnimatedBlobScene } from "../Swishy/animated-blob/Scene";
import { Scene as AnimatedEmojiButtonScene } from "../Swishy/animated-emoji-button/Scene";
import { Scene as AnimatedYearScene } from "../Swishy/animated-year/Scene";
import { Scene as AppAnimationScene } from "../Swishy/app-animation/Scene";
import { Scene as AppVideoShowcaseScene } from "../Swishy/app-video-showcase/Scene";
import { Scene as AppleStyle30SecCounter1Scene } from "../Swishy/apple-style-30-sec-counter-1/Scene";
import { Scene as BarChartScene } from "../Swishy/bar-chart/Scene";
import { Scene as BarChart1Scene } from "../Swishy/bar-chart-1/Scene";
import { Scene as BarChart2Scene } from "../Swishy/bar-chart-2/Scene";
import { Scene as BouncingImageScene } from "../Swishy/bouncing-image/Scene";
import { Scene as BranchingScene } from "../Swishy/branching/Scene";
import { Scene as BrandSpinningScene } from "../Swishy/brand-spinning/Scene";
import { Scene as CalendarGridDropScene } from "../Swishy/calendar-grid-drop/Scene";
import { Scene as CarCrashStoryScene } from "../Swishy/car-crash-story/Scene";
import { Scene as CarRacingScene } from "../Swishy/car-racing/Scene";
import { Scene as CardScene } from "../Swishy/card/Scene";
import { Scene as CharmingLettingScene } from "../Swishy/charming-letting/Scene";
import { Scene as ChartWithScene } from "../Swishy/chart-with/Scene";
import { Scene as ClickAnimationScene } from "../Swishy/click-animation/Scene";
import { Scene as ClockAndTextScene } from "../Swishy/clock-and-text/Scene";
import { Scene as ComicStyleScene } from "../Swishy/comic-style/Scene";
import { Scene as ConcertAnimationScene } from "../Swishy/concert-animation/Scene";
import { Scene as CopyAndPasteScene } from "../Swishy/copy-and-paste/Scene";
import { Scene as CreateScene } from "../Swishy/create/Scene";
import { Scene as EnergyTextScene } from "../Swishy/energy-text/Scene";
import { Scene as ErrorErrorScene } from "../Swishy/error-error/Scene";
import { Scene as ExplainerSpheresScene } from "../Swishy/explainer-spheres/Scene";
import { Scene as ExtendScene } from "../Swishy/extend/Scene";
import { Scene as FinancialsScene } from "../Swishy/financials/Scene";
import { Scene as FintechDashboardScene } from "../Swishy/fintech-dashboard/Scene";
import { Scene as FlightProgressScene } from "../Swishy/flight-progress/Scene";
import { Scene as FlightsAnimationScene } from "../Swishy/flights-animation/Scene";
import { Scene as FolderGallery1Scene } from "../Swishy/folder-gallery-1/Scene";
import { Scene as FriendshipBeads1Scene } from "../Swishy/friendship-beads-1/Scene";
import { Scene as FunnelTextAnimationScene } from "../Swishy/funnel-text-animation/Scene";
import { Scene as GenerateAiVoiceAnimationScene } from "../Swishy/generate-ai-voice-animation/Scene";
import { Scene as GithubStarComparisonScene } from "../Swishy/github-star-comparison/Scene";
import { Scene as GithubStars1Scene } from "../Swishy/github-stars-1/Scene";
import { Scene as GoalsScene } from "../Swishy/goals/Scene";
import { Scene as GravityThoughtScene } from "../Swishy/gravity-thought/Scene";
import { Scene as HeartCrushButtonScene } from "../Swishy/heart-crush-button/Scene";
import { Scene as IWantASmoothAnimationWhereTheTextWith2LiScene } from "../Swishy/i-want-a-smooth-animation-where-the-text-with-2-li/Scene";
import { Scene as ImageShuffle1Scene } from "../Swishy/image-shuffle-1/Scene";
import { Scene as InstagramLogoAnimationScene } from "../Swishy/instagram-logo-animation/Scene";
import { Scene as InstagramProfileScene } from "../Swishy/instagram-profile/Scene";
import { Scene as InstagramStoriesScene } from "../Swishy/instagram-stories/Scene";
import { Scene as InstagramStory3ImagesScene } from "../Swishy/instagram-story-3-images/Scene";
import { Scene as InstagramUpdateNotificationAnimationScene } from "../Swishy/instagram-update-notification-animation/Scene";
import { Scene as InteractivePixelArtWavesScene } from "../Swishy/interactive-pixel-art-waves/Scene";
import { Scene as IosNotificationScene } from "../Swishy/ios-notification/Scene";
import { Scene as JanuaryScene } from "../Swishy/january/Scene";
import { Scene as JuneScene } from "../Swishy/june/Scene";
import { Scene as LifeLineAnimationScene } from "../Swishy/life-line-animation/Scene";
import { Scene as LikeScene } from "../Swishy/like/Scene";
import { Scene as ListOfThingsScene } from "../Swishy/list-of-things/Scene";
import { Scene as LoadingScene } from "../Swishy/loading/Scene";
import { Scene as LocationPopUpScene } from "../Swishy/location-pop-up/Scene";
import { Scene as LogoCodeScene } from "../Swishy/logo-code/Scene";
import { Scene as LogoReveal1Scene } from "../Swishy/logo-reveal-1/Scene";
import { Scene as LogoSpinScene } from "../Swishy/logo-spin/Scene";
import { Scene as MakeWithNotionScene } from "../Swishy/make-with-notion/Scene";
import { Scene as MakinBankScene } from "../Swishy/makin-bank/Scene";
import { Scene as MapScene } from "../Swishy/map/Scene";
import { Scene as MarioGameScene } from "../Swishy/mario-game/Scene";
import { Scene as MobileBookshelfScene } from "../Swishy/mobile-bookshelf/Scene";
import { Scene as MoneyFallingScene } from "../Swishy/money-falling/Scene";
import { Scene as MoneyyyyScene } from "../Swishy/moneyyyy/Scene";
import { Scene as MorphBlocksScene } from "../Swishy/morph-blocks/Scene";
import { Scene as NavalQuoteScene } from "../Swishy/naval-quote/Scene";
import { Scene as NewspaperAnimationScene } from "../Swishy/newspaper-animation/Scene";
import { Scene as NightStreetMarketScene } from "../Swishy/night-street-market/Scene";
import { Scene as NotepadScene } from "../Swishy/notepad/Scene";
import { Scene as NotionAnimatedHubScene } from "../Swishy/notion-animated-hub/Scene";
import { Scene as OnOffToggleScene } from "../Swishy/on-off-toggle/Scene";
import { Scene as OutsidelandsPosterScene } from "../Swishy/outsidelands-poster/Scene";
import { Scene as ParticleExplosionScene } from "../Swishy/particle-explosion/Scene";
import { Scene as PhoneMessagesScene } from "../Swishy/phone-messages/Scene";
import { Scene as PhoneMessages1Scene } from "../Swishy/phone-messages-1/Scene";
import { Scene as PhoneNotificationPopUpScene } from "../Swishy/phone-notification-pop-up/Scene";
import { Scene as PhotoboothAnimation1Scene } from "../Swishy/photobooth-animation-1/Scene";
import { Scene as PhotosAnimationScene } from "../Swishy/photos-animation/Scene";
import { Scene as PhotoshopAnimation1Scene } from "../Swishy/photoshop-animation-1/Scene";
import { Scene as PinsScene } from "../Swishy/pins/Scene";
import { Scene as PopUpMessageBubbleScene } from "../Swishy/pop-up-message-bubble/Scene";
import { Scene as PopulationScene } from "../Swishy/population/Scene";
import { Scene as PremiereProAnimationScene } from "../Swishy/premiere-pro-animation/Scene";
import { Scene as RetroPhoneScene } from "../Swishy/retro-phone/Scene";
import { Scene as SaasSecurityScene } from "../Swishy/saas-security/Scene";
import { Scene as ScatteredTextScene } from "../Swishy/scattered-text/Scene";
import { Scene as ScienceClubScene } from "../Swishy/science-club/Scene";
import { Scene as SearchBoxScene } from "../Swishy/search-box/Scene";
import { Scene as SentenceRevealScene } from "../Swishy/sentence-reveal/Scene";
import { Scene as SimpleChartScene } from "../Swishy/simple-chart/Scene";
import { Scene as SimpleTimelapseScene } from "../Swishy/simple-timelapse/Scene";
import { Scene as SimpleTimelapse2Scene } from "../Swishy/simple-timelapse-2/Scene";
import { Scene as SimulationTerminatedScene } from "../Swishy/simulation-terminated/Scene";
import { Scene as SpillWordScene } from "../Swishy/spill-word/Scene";
import { Scene as SpinningVinylPlayer1Scene } from "../Swishy/spinning-vinyl-player-1/Scene";
import { Scene as SpotifyPlayerAnimation1Scene } from "../Swishy/spotify-player-animation-1/Scene";
import { Scene as StickyNotesScene } from "../Swishy/sticky-notes/Scene";
import { Scene as StickyNotesAnimationScene } from "../Swishy/sticky-notes-animation/Scene";
import { Scene as SystemScene } from "../Swishy/system/Scene";
import { Scene as TechYoutube1Scene } from "../Swishy/tech-youtube-1/Scene";
import { Scene as TerminalShowcaseScene } from "../Swishy/terminal-showcase/Scene";
import { Scene as TerminalTypingScene } from "../Swishy/terminal-typing/Scene";
import { Scene as TextIntroScene } from "../Swishy/text-intro/Scene";
import { Scene as TheFutureOfDesign1Scene } from "../Swishy/the-future-of-design-1/Scene";
import { Scene as ThinkingScene } from "../Swishy/thinking/Scene";
import { Scene as TimelineScene } from "../Swishy/timeline/Scene";
import { Scene as TypewriterScene } from "../Swishy/typewriter/Scene";
import { Scene as TypingEffectScene } from "../Swishy/typing-effect/Scene";
import { Scene as UpworkAdScene } from "../Swishy/upwork-ad/Scene";
import { Scene as ViewCartAnimation1Scene } from "../Swishy/view-cart-animation-1/Scene";
import { Scene as WebsiteRevealScene } from "../Swishy/website-reveal/Scene";
import { Scene as WeddingAnnouncementScene } from "../Swishy/wedding-announcement/Scene";
import { Scene as WellnessAppMoodsScene } from "../Swishy/wellness-app-moods/Scene";
import { Scene as WhatsappConvoScene } from "../Swishy/whatsapp-convo/Scene";
import { Scene as WiggleTextScene } from "../Swishy/wiggle-text/Scene";
import { Scene as Windows98StyleScene } from "../Swishy/windows-98-style/Scene";
import { Scene as WinsVsLossesScene } from "../Swishy/wins-vs-losses/Scene";
import { Scene as WorkingOnAComputerScene } from "../Swishy/working-on-a-computer/Scene";
import { Scene as WritingDiary1Scene } from "../Swishy/writing-diary-1/Scene";
import { Scene as YearsRollingTextScene } from "../Swishy/years-rolling-text/Scene";
import { Scene as YoutubeSubscribeButtonScene } from "../Swishy/youtube-subscribe-button/Scene";

export type ControlType = "color" | "text" | "url" | "number" | "boolean" | "font";

export interface Control {
  key: string;
  label: string;
  type: ControlType;
  group: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CompositionDef {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  defaultProps: Record<string, unknown>;
  durationInFrames: number;
  fps: number;
  controls: Control[];
}

export const REGISTRY: CompositionDef[] = [
  {
    id: "SpotifyPlayer",
    title: "Spotify Player",
    description: "Vinyl record animation with marquee text and playback controls.",
    color: "#1DB954",
    icon: "🎵",
    component: SpotifyScene,
    defaultProps: defaultSpotifyPlayerProps as unknown as Record<string, unknown>,
    durationInFrames: 300,
    fps: 30,
    controls: [
      { key: "trackTitle",    label: "Track Title",              type: "text",    group: "Content" },
      { key: "artistName",    label: "Artist",                   type: "text",    group: "Content" },
      { key: "totalDuration", label: "Duration",                 type: "text",    group: "Content" },
      { key: "vinylLabel",    label: "Vinyl Label (image URL)",  type: "url",     group: "Content" },
      { key: "fontFamily",    label: "Font Family",              type: "font",    group: "Content" },

      { key: "backgroundColor",    label: "Background",     type: "color", group: "Colors" },
      { key: "textColor",          label: "Text",           type: "color", group: "Colors" },
      { key: "secondaryTextColor", label: "Secondary Text", type: "color", group: "Colors" },
      { key: "accentColor",        label: "Accent",         type: "color", group: "Colors" },
      { key: "progressBarColor",   label: "Progress Bar",   type: "color", group: "Colors" },
      { key: "progressTrackColor", label: "Progress Track", type: "color", group: "Colors" },
      { key: "vinylColor",         label: "Vinyl",          type: "color", group: "Colors" },

      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "rotationSpeed",    label: "Vinyl Rotation",   type: "number", group: "Animation", min: 0.1, max: 3,   step: 0.1  },
      { key: "marqueeSpeed",     label: "Marquee Speed",    type: "number", group: "Animation", min: 0.3, max: 2,   step: 0.1  },
      { key: "progressDuration", label: "Progress (frames)",type: "number", group: "Animation", min: 60,  max: 500, step: 10   },

      { key: "showShuffleActive", label: "Shuffle Active", type: "boolean", group: "Playback" },
      { key: "showRepeatActive",  label: "Repeat Active",  type: "boolean", group: "Playback" },
    ],
  },
  {
    id: "FutureOfDesign",
    title: "Future of Design",
    description: "Physics-based typography animation with blur and glow effects.",
    color: "#6366f1",
    icon: "✨",
    component: FutureScene,
    defaultProps: defaultFutureOfDesignProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "smallText", label: "Small Text", type: "text", group: "Content" },
      { key: "mainText",  label: "Main Text",  type: "text", group: "Content" },
      { key: "subText",   label: "Sub Text",   type: "text", group: "Content" },

      { key: "backgroundColor", label: "Background", type: "color", group: "Colors" },
      { key: "textColor",       label: "Text",       type: "color", group: "Colors" },
      { key: "glowColor",       label: "Glow",       type: "color", group: "Colors" },

      { key: "scale",         label: "Scale",          type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",label: "Animation Speed",type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "blurAmount",    label: "Blur Amount",    type: "number", group: "Animation", min: 0,   max: 50,  step: 5    },
      { key: "slideDistance", label: "Slide Distance", type: "number", group: "Animation", min: 50,  max: 400, step: 25   },
      { key: "glowIntensity", label: "Glow Intensity", type: "number", group: "Animation", min: 0,   max: 10,  step: 1    },
      { key: "letterSpacing", label: "Letter Spacing", type: "number", group: "Animation", min: -20, max: 10,  step: 2    },
    ],
  },
  {
    id: "GoodMood",
    title: "Good Mood",
    description: "Vibrant high-contrast typography with elastic spring-based animations.",
    color: "#ff1d1d",
    icon: "😊",
    component: GoodMoodScene,
    defaultProps: defaultGoodMoodProps as unknown as Record<string, unknown>,
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.1, max: 2,   step: 0.1  },
      { key: "stretchIntensity", label: "Stretch Intensity",type: "number", group: "Animation", min: 0,   max: 0.5, step: 0.01 },
      
      { key: "topRowColor",    label: "Top Row Color",    type: "color", group: "Colors" },
      { key: "colorO1",        label: "Color O1",         type: "color", group: "Colors" },
      { key: "colorO2",        label: "Color O2",         type: "color", group: "Colors" },
      { key: "colorM",         label: "Color M",          type: "color", group: "Colors" },
      { key: "colorD",         label: "Color D",          type: "color", group: "Colors" },
      { key: "backgroundColor",label: "Background",       type: "color", group: "Colors" },
      
      { key: "fontFamily",     label: "Font Family",      type: "font",  group: "Content" },
    ],
  },
  {
    id: "SwishyMotivational",
    title: "Motivational",
    description: "Multi-scene kinetic typography for motivational stories and insights.",
    color: "#f97316",
    icon: "🔥",
    component: MotivationalScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#3b82f6",
      fontFamily: "Bebas Neue",
      staggerDelay: 10,
    },
    durationInFrames: 340,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "fontFamily",       label: "Font Family",      type: "font",   group: "Content" },
    ],
  },
  {
    id: "SwishyStorytime",
    title: "Storytime",
    description: "Condensed editorial text sequence with premium typography.",
    color: "#8b5cf6",
    icon: "📖",
    component: StorytimeScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#000000",
      textColor: "#ffffff",
      fontFamily: "Playfair Display",
    },
    durationInFrames: 350,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "fontFamily",       label: "Font Family",      type: "font",   group: "Content" },
    ],
  },
  {
    id: "SwishyWorldStory",
    title: "World Story",
    description: "Diverse kinetic typography sequence exploring creation and discovery.",
    color: "#0ea5e9",
    icon: "🌍",
    component: WorldStoryScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#f8fafc",
      textColor: "#1e293b",
      accentColor: "#64748b",
      headingFont: "Playfair Display",
      bodyFont: "DM Sans",
    },
    durationInFrames: 510,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "headingFont",      label: "Heading Font",     type: "font",   group: "Content" },
      { key: "bodyFont",         label: "Body Font",        type: "font",   group: "Content" },
    ],
  },
  {
    id: "SwishyAnimateCharacters",
    title: "Animate Characters",
    description: "Magical character animations with glowing effects and mystical forests.",
    color: "#a855f7",
    icon: "🦄",
    component: AnimateCharactersScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
      backgroundColor: "#0c0a1d",
      accentColor: "#a855f7",
      textColor: "#f8fafc",
    },
    durationInFrames: 300,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
      { key: "backgroundColor",  label: "Background",       type: "color",  group: "Colors" },
      { key: "accentColor",      label: "Accent",           type: "color",  group: "Colors" },
      { key: "textColor",        label: "Text",             type: "color",  group: "Colors" },
    ],
  },
  {
    id: "SwishyN2026",
    title: "2026",
    description: "Swishy template",
    color: "#f13443",
    icon: "🎬",
    component: N2026Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyN3dCube",
    title: "3d-cube",
    description: "Swishy template",
    color: "#c88f39",
    icon: "🎬",
    component: N3dCubeScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAStormOfInfo",
    title: "a-storm-of-info",
    description: "Swishy template",
    color: "#e7abdd",
    icon: "🎬",
    component: AStormOfInfoScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAdSpend",
    title: "ad-spend",
    description: "Swishy template",
    color: "#93c1a4",
    icon: "🎬",
    component: AdSpendScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAlarmToggle1",
    title: "alarm-toggle-1",
    description: "Swishy template",
    color: "#77c6e5",
    icon: "🎬",
    component: AlarmToggle1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAnimateNetflixLogo",
    title: "animate-netflix-logo",
    description: "Swishy template",
    color: "#999d61",
    icon: "🎬",
    component: AnimateNetflixLogoScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAnimatedAppList",
    title: "animated-app-list",
    description: "Swishy template",
    color: "#1b8061",
    icon: "🎬",
    component: AnimatedAppListScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAnimatedBlob",
    title: "animated-blob",
    description: "Swishy template",
    color: "#4ffc4b",
    icon: "🎬",
    component: AnimatedBlobScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAnimatedEmojiButton",
    title: "animated-emoji-button",
    description: "Swishy template",
    color: "#b88d79",
    icon: "🎬",
    component: AnimatedEmojiButtonScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAnimatedYear",
    title: "animated-year",
    description: "Swishy template",
    color: "#573ca7",
    icon: "🎬",
    component: AnimatedYearScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAppAnimation",
    title: "app-animation",
    description: "Swishy template",
    color: "#11dd7c",
    icon: "🎬",
    component: AppAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAppVideoShowcase",
    title: "app-video-showcase",
    description: "Swishy template",
    color: "#68d4f1",
    icon: "🎬",
    component: AppVideoShowcaseScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyAppleStyle30SecCounter1",
    title: "apple-style-30-sec-counter-1",
    description: "Swishy template",
    color: "#312664",
    icon: "🎬",
    component: AppleStyle30SecCounter1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBarChart",
    title: "bar-chart",
    description: "Swishy template",
    color: "#c66ffc",
    icon: "🎬",
    component: BarChartScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBarChart1",
    title: "bar-chart-1",
    description: "Swishy template",
    color: "#3cd6d3",
    icon: "🎬",
    component: BarChart1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBarChart2",
    title: "bar-chart-2",
    description: "Swishy template",
    color: "#48abb3",
    icon: "🎬",
    component: BarChart2Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBouncingImage",
    title: "bouncing-image",
    description: "Swishy template",
    color: "#a1e723",
    icon: "🎬",
    component: BouncingImageScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBranching",
    title: "branching",
    description: "Swishy template",
    color: "#ea29e9",
    icon: "🎬",
    component: BranchingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyBrandSpinning",
    title: "brand-spinning",
    description: "Swishy template",
    color: "#206538",
    icon: "🎬",
    component: BrandSpinningScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCalendarGridDrop",
    title: "calendar-grid-drop",
    description: "Swishy template",
    color: "#b11f4d",
    icon: "🎬",
    component: CalendarGridDropScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCarCrashStory",
    title: "car-crash-story",
    description: "Swishy template",
    color: "#a6f125",
    icon: "🎬",
    component: CarCrashStoryScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCarRacing",
    title: "car-racing",
    description: "Swishy template",
    color: "#7ac827",
    icon: "🎬",
    component: CarRacingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCard",
    title: "card",
    description: "Swishy template",
    color: "#85269b",
    icon: "🎬",
    component: CardScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCharmingLetting",
    title: "charming-letting",
    description: "Swishy template",
    color: "#fca01b",
    icon: "🎬",
    component: CharmingLettingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyChartWith",
    title: "chart-with",
    description: "Swishy template",
    color: "#5e9bc4",
    icon: "🎬",
    component: ChartWithScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyClickAnimation",
    title: "click-animation",
    description: "Swishy template",
    color: "#410e6b",
    icon: "🎬",
    component: ClickAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyClockAndText",
    title: "clock-and-text",
    description: "Swishy template",
    color: "#7bc3b5",
    icon: "🎬",
    component: ClockAndTextScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyComicStyle",
    title: "comic-style",
    description: "Swishy template",
    color: "#f98bd3",
    icon: "🎬",
    component: ComicStyleScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyConcertAnimation",
    title: "concert-animation",
    description: "Swishy template",
    color: "#967521",
    icon: "🎬",
    component: ConcertAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCopyAndPaste",
    title: "copy-and-paste",
    description: "Swishy template",
    color: "#ae7980",
    icon: "🎬",
    component: CopyAndPasteScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyCreate",
    title: "create",
    description: "Swishy template",
    color: "#cf16cd",
    icon: "🎬",
    component: CreateScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyEnergyText",
    title: "energy-text",
    description: "Swishy template",
    color: "#cf1361",
    icon: "🎬",
    component: EnergyTextScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyErrorError",
    title: "error-error",
    description: "Swishy template",
    color: "#de8cbb",
    icon: "🎬",
    component: ErrorErrorScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyExplainerSpheres",
    title: "explainer-spheres",
    description: "Swishy template",
    color: "#94c6a2",
    icon: "🎬",
    component: ExplainerSpheresScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyExtend",
    title: "extend",
    description: "Swishy template",
    color: "#fe60a1",
    icon: "🎬",
    component: ExtendScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFinancials",
    title: "financials",
    description: "Swishy template",
    color: "#9412f5",
    icon: "🎬",
    component: FinancialsScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFintechDashboard",
    title: "fintech-dashboard",
    description: "Swishy template",
    color: "#5a7c52",
    icon: "🎬",
    component: FintechDashboardScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFlightProgress",
    title: "flight-progress",
    description: "Swishy template",
    color: "#02c9b6",
    icon: "🎬",
    component: FlightProgressScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFlightsAnimation",
    title: "flights-animation",
    description: "Swishy template",
    color: "#41db23",
    icon: "🎬",
    component: FlightsAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFolderGallery1",
    title: "folder-gallery-1",
    description: "Swishy template",
    color: "#0b7d1f",
    icon: "🎬",
    component: FolderGallery1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFriendshipBeads1",
    title: "friendship-beads-1",
    description: "Swishy template",
    color: "#ac6dc1",
    icon: "🎬",
    component: FriendshipBeads1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyFunnelTextAnimation",
    title: "funnel-text-animation",
    description: "Swishy template",
    color: "#ef48f2",
    icon: "🎬",
    component: FunnelTextAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyGenerateAiVoiceAnimation",
    title: "generate-ai-voice-animation",
    description: "Swishy template",
    color: "#9cd8f4",
    icon: "🎬",
    component: GenerateAiVoiceAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyGithubStarComparison",
    title: "github-star-comparison",
    description: "Swishy template",
    color: "#a44c49",
    icon: "🎬",
    component: GithubStarComparisonScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyGithubStars1",
    title: "github-stars-1",
    description: "Swishy template",
    color: "#58344f",
    icon: "🎬",
    component: GithubStars1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyGoals",
    title: "goals",
    description: "Swishy template",
    color: "#b42946",
    icon: "🎬",
    component: GoalsScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyGravityThought",
    title: "gravity-thought",
    description: "Swishy template",
    color: "#067f59",
    icon: "🎬",
    component: GravityThoughtScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyHeartCrushButton",
    title: "heart-crush-button",
    description: "Swishy template",
    color: "#4265ff",
    icon: "🎬",
    component: HeartCrushButtonScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyIWantASmoothAnimationWhereTheTextWith2Li",
    title: "i-want-a-smooth-animation-where-the-text-with-2-li",
    description: "Swishy template",
    color: "#1162a8",
    icon: "🎬",
    component: IWantASmoothAnimationWhereTheTextWith2LiScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyImageShuffle1",
    title: "image-shuffle-1",
    description: "Swishy template",
    color: "#0db218",
    icon: "🎬",
    component: ImageShuffle1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInstagramLogoAnimation",
    title: "instagram-logo-animation",
    description: "Swishy template",
    color: "#5c3291",
    icon: "🎬",
    component: InstagramLogoAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInstagramProfile",
    title: "instagram-profile",
    description: "Swishy template",
    color: "#62e1c5",
    icon: "🎬",
    component: InstagramProfileScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInstagramStories",
    title: "instagram-stories",
    description: "Swishy template",
    color: "#b581b6",
    icon: "🎬",
    component: InstagramStoriesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInstagramStory3Images",
    title: "instagram-story-3-images",
    description: "Swishy template",
    color: "#dd8107",
    icon: "🎬",
    component: InstagramStory3ImagesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInstagramUpdateNotificationAnimation",
    title: "instagram-update-notification-animation",
    description: "Swishy template",
    color: "#3cb2d7",
    icon: "🎬",
    component: InstagramUpdateNotificationAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyInteractivePixelArtWaves",
    title: "interactive-pixel-art-waves",
    description: "Swishy template",
    color: "#e96a83",
    icon: "🎬",
    component: InteractivePixelArtWavesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyIosNotification",
    title: "ios-notification",
    description: "Swishy template",
    color: "#1bbdaa",
    icon: "🎬",
    component: IosNotificationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyJanuary",
    title: "january",
    description: "Swishy template",
    color: "#322c6d",
    icon: "🎬",
    component: JanuaryScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyJune",
    title: "june",
    description: "Swishy template",
    color: "#2296ca",
    icon: "🎬",
    component: JuneScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLifeLineAnimation",
    title: "life-line-animation",
    description: "Swishy template",
    color: "#1d29f2",
    icon: "🎬",
    component: LifeLineAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLike",
    title: "like",
    description: "Swishy template",
    color: "#63b759",
    icon: "🎬",
    component: LikeScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyListOfThings",
    title: "list-of-things",
    description: "Swishy template",
    color: "#f2a4ae",
    icon: "🎬",
    component: ListOfThingsScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLoading",
    title: "loading",
    description: "Swishy template",
    color: "#697e21",
    icon: "🎬",
    component: LoadingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLocationPopUp",
    title: "location-pop-up",
    description: "Swishy template",
    color: "#e2de0a",
    icon: "🎬",
    component: LocationPopUpScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLogoCode",
    title: "logo-code",
    description: "Swishy template",
    color: "#2d790a",
    icon: "🎬",
    component: LogoCodeScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLogoReveal1",
    title: "logo-reveal-1",
    description: "Swishy template",
    color: "#b8a975",
    icon: "🎬",
    component: LogoReveal1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyLogoSpin",
    title: "logo-spin",
    description: "Swishy template",
    color: "#4179d7",
    icon: "🎬",
    component: LogoSpinScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMakeWithNotion",
    title: "make-with-notion",
    description: "Swishy template",
    color: "#623efa",
    icon: "🎬",
    component: MakeWithNotionScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMakinBank",
    title: "makin-bank",
    description: "Swishy template",
    color: "#825156",
    icon: "🎬",
    component: MakinBankScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMap",
    title: "map",
    description: "Swishy template",
    color: "#e088d4",
    icon: "🎬",
    component: MapScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMarioGame",
    title: "mario-game",
    description: "Swishy template",
    color: "#dae3ac",
    icon: "🎬",
    component: MarioGameScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMobileBookshelf",
    title: "mobile-bookshelf",
    description: "Swishy template",
    color: "#613933",
    icon: "🎬",
    component: MobileBookshelfScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMoneyFalling",
    title: "money-falling",
    description: "Swishy template",
    color: "#237c24",
    icon: "🎬",
    component: MoneyFallingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMoneyyyy",
    title: "moneyyyy",
    description: "Swishy template",
    color: "#03abf0",
    icon: "🎬",
    component: MoneyyyyScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyMorphBlocks",
    title: "morph-blocks",
    description: "Swishy template",
    color: "#22ccb4",
    icon: "🎬",
    component: MorphBlocksScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyNavalQuote",
    title: "naval-quote",
    description: "Swishy template",
    color: "#636db2",
    icon: "🎬",
    component: NavalQuoteScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyNewspaperAnimation",
    title: "newspaper-animation",
    description: "Swishy template",
    color: "#0428e7",
    icon: "🎬",
    component: NewspaperAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyNightStreetMarket",
    title: "night-street-market",
    description: "Swishy template",
    color: "#d5d146",
    icon: "🎬",
    component: NightStreetMarketScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyNotepad",
    title: "notepad",
    description: "Swishy template",
    color: "#e4f6ac",
    icon: "🎬",
    component: NotepadScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyNotionAnimatedHub",
    title: "notion-animated-hub",
    description: "Swishy template",
    color: "#ed1976",
    icon: "🎬",
    component: NotionAnimatedHubScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyOnOffToggle",
    title: "on-off-toggle",
    description: "Swishy template",
    color: "#c233f9",
    icon: "🎬",
    component: OnOffToggleScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyOutsidelandsPoster",
    title: "outsidelands-poster",
    description: "Swishy template",
    color: "#622c2f",
    icon: "🎬",
    component: OutsidelandsPosterScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyParticleExplosion",
    title: "particle-explosion",
    description: "Swishy template",
    color: "#c30869",
    icon: "🎬",
    component: ParticleExplosionScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhoneMessages",
    title: "phone-messages",
    description: "Swishy template",
    color: "#5b2284",
    icon: "🎬",
    component: PhoneMessagesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhoneMessages1",
    title: "phone-messages-1",
    description: "Swishy template",
    color: "#18f2fa",
    icon: "🎬",
    component: PhoneMessages1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhoneNotificationPopUp",
    title: "phone-notification-pop-up",
    description: "Swishy template",
    color: "#899ac0",
    icon: "🎬",
    component: PhoneNotificationPopUpScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhotoboothAnimation1",
    title: "photobooth-animation-1",
    description: "Swishy template",
    color: "#6e2811",
    icon: "🎬",
    component: PhotoboothAnimation1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhotosAnimation",
    title: "photos-animation",
    description: "Swishy template",
    color: "#e5167c",
    icon: "🎬",
    component: PhotosAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPhotoshopAnimation1",
    title: "photoshop-animation-1",
    description: "Swishy template",
    color: "#706690",
    icon: "🎬",
    component: PhotoshopAnimation1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPins",
    title: "pins",
    description: "Swishy template",
    color: "#c5412a",
    icon: "🎬",
    component: PinsScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPopUpMessageBubble",
    title: "pop-up-message-bubble",
    description: "Swishy template",
    color: "#4e2173",
    icon: "🎬",
    component: PopUpMessageBubbleScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPopulation",
    title: "population",
    description: "Swishy template",
    color: "#e28dc0",
    icon: "🎬",
    component: PopulationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyPremiereProAnimation",
    title: "premiere-pro-animation",
    description: "Swishy template",
    color: "#da3d8b",
    icon: "🎬",
    component: PremiereProAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyRetroPhone",
    title: "retro-phone",
    description: "Swishy template",
    color: "#d10c0f",
    icon: "🎬",
    component: RetroPhoneScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySaasSecurity",
    title: "saas-security",
    description: "Swishy template",
    color: "#80ae91",
    icon: "🎬",
    component: SaasSecurityScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyScatteredText",
    title: "scattered-text",
    description: "Swishy template",
    color: "#383bcc",
    icon: "🎬",
    component: ScatteredTextScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyScienceClub",
    title: "science-club",
    description: "Swishy template",
    color: "#0e9830",
    icon: "🎬",
    component: ScienceClubScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySearchBox",
    title: "search-box",
    description: "Swishy template",
    color: "#635bf6",
    icon: "🎬",
    component: SearchBoxScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySentenceReveal",
    title: "sentence-reveal",
    description: "Swishy template",
    color: "#664393",
    icon: "🎬",
    component: SentenceRevealScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySimpleChart",
    title: "simple-chart",
    description: "Swishy template",
    color: "#d4d7cd",
    icon: "🎬",
    component: SimpleChartScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySimpleTimelapse",
    title: "simple-timelapse",
    description: "Swishy template",
    color: "#eec07f",
    icon: "🎬",
    component: SimpleTimelapseScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySimpleTimelapse2",
    title: "simple-timelapse-2",
    description: "Swishy template",
    color: "#34d8cb",
    icon: "🎬",
    component: SimpleTimelapse2Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySimulationTerminated",
    title: "simulation-terminated",
    description: "Swishy template",
    color: "#0fc531",
    icon: "🎬",
    component: SimulationTerminatedScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySpillWord",
    title: "spill-word",
    description: "Swishy template",
    color: "#2b29bd",
    icon: "🎬",
    component: SpillWordScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySpinningVinylPlayer1",
    title: "spinning-vinyl-player-1",
    description: "Swishy template",
    color: "#23052b",
    icon: "🎬",
    component: SpinningVinylPlayer1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySpotifyPlayerAnimation1",
    title: "spotify-player-animation-1",
    description: "Swishy template",
    color: "#f08fc0",
    icon: "🎬",
    component: SpotifyPlayerAnimation1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyStickyNotes",
    title: "sticky-notes",
    description: "Swishy template",
    color: "#8f7997",
    icon: "🎬",
    component: StickyNotesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyStickyNotesAnimation",
    title: "sticky-notes-animation",
    description: "Swishy template",
    color: "#188faa",
    icon: "🎬",
    component: StickyNotesAnimationScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishySystem",
    title: "system",
    description: "Swishy template",
    color: "#5af5f0",
    icon: "🎬",
    component: SystemScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTechYoutube1",
    title: "tech-youtube-1",
    description: "Swishy template",
    color: "#c934e7",
    icon: "🎬",
    component: TechYoutube1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTerminalShowcase",
    title: "terminal-showcase",
    description: "Swishy template",
    color: "#6547e0",
    icon: "🎬",
    component: TerminalShowcaseScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTerminalTyping",
    title: "terminal-typing",
    description: "Swishy template",
    color: "#45f0f0",
    icon: "🎬",
    component: TerminalTypingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTextIntro",
    title: "text-intro",
    description: "Swishy template",
    color: "#0c850f",
    icon: "🎬",
    component: TextIntroScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTheFutureOfDesign1",
    title: "the-future-of-design-1",
    description: "Swishy template",
    color: "#91fe33",
    icon: "🎬",
    component: TheFutureOfDesign1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyThinking",
    title: "thinking",
    description: "Swishy template",
    color: "#df399e",
    icon: "🎬",
    component: ThinkingScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTimeline",
    title: "timeline",
    description: "Swishy template",
    color: "#a4a2af",
    icon: "🎬",
    component: TimelineScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTypewriter",
    title: "typewriter",
    description: "Swishy template",
    color: "#7adaff",
    icon: "🎬",
    component: TypewriterScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyTypingEffect",
    title: "typing-effect",
    description: "Swishy template",
    color: "#18f983",
    icon: "🎬",
    component: TypingEffectScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyUpworkAd",
    title: "upwork-ad",
    description: "Swishy template",
    color: "#ff60af",
    icon: "🎬",
    component: UpworkAdScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyViewCartAnimation1",
    title: "view-cart-animation-1",
    description: "Swishy template",
    color: "#277000",
    icon: "🎬",
    component: ViewCartAnimation1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWebsiteReveal",
    title: "website-reveal",
    description: "Swishy template",
    color: "#beccf6",
    icon: "🎬",
    component: WebsiteRevealScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWeddingAnnouncement",
    title: "wedding-announcement",
    description: "Swishy template",
    color: "#4e1c7d",
    icon: "🎬",
    component: WeddingAnnouncementScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWellnessAppMoods",
    title: "wellness-app-moods",
    description: "Swishy template",
    color: "#c7389c",
    icon: "🎬",
    component: WellnessAppMoodsScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWhatsappConvo",
    title: "whatsapp-convo",
    description: "Swishy template",
    color: "#35a7da",
    icon: "🎬",
    component: WhatsappConvoScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWiggleText",
    title: "wiggle-text",
    description: "Swishy template",
    color: "#35dfa1",
    icon: "🎬",
    component: WiggleTextScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWindows98Style",
    title: "windows-98-style",
    description: "Swishy template",
    color: "#68be42",
    icon: "🎬",
    component: Windows98StyleScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWinsVsLosses",
    title: "wins-vs-losses",
    description: "Swishy template",
    color: "#830a74",
    icon: "🎬",
    component: WinsVsLossesScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWorkingOnAComputer",
    title: "working-on-a-computer",
    description: "Swishy template",
    color: "#2982e2",
    icon: "🎬",
    component: WorkingOnAComputerScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyWritingDiary1",
    title: "writing-diary-1",
    description: "Swishy template",
    color: "#627879",
    icon: "🎬",
    component: WritingDiary1Scene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyYearsRollingText",
    title: "years-rolling-text",
    description: "Swishy template",
    color: "#36a003",
    icon: "🎬",
    component: YearsRollingTextScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
  {
    id: "SwishyYoutubeSubscribeButton",
    title: "youtube-subscribe-button",
    description: "Swishy template",
    color: "#9fc038",
    icon: "🎬",
    component: YoutubeSubscribeButtonScene,
    defaultProps: {
      scale: 1,
      animationSpeed: 1,
    },
    durationInFrames: 150,
    fps: 30,
    controls: [
      { key: "scale",            label: "Scale",            type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.05 },
      { key: "animationSpeed",   label: "Animation Speed",  type: "number", group: "Animation", min: 0.5, max: 2,   step: 0.1  },
    ],
  },
];

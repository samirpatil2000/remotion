import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

const COMPOSITIONS = [
  {
    id: "SpotifyPlayer",
    title: "Spotify Player",
    description: "Vinyl record animation with marquee text and playback controls.",
    color: "#1DB954",
    icon: "🎵",
  },
  {
    id: "FutureOfDesign",
    title: "Future of Design",
    description: "Physics-based typography animation with blur and glow effects.",
    color: "#0f172a",
    icon: "✨",
  },
  {
    id: "ComingSoon1",
    title: "Cinematic Titles",
    description: "Dynamic text animations with cinematic lighting effects.",
    color: "#E50914",
    icon: "🎬",
  },
  {
    id: "ComingSoon2",
    title: "Data Visualization",
    description: "Interactive charts and graphs for video dashboards.",
    color: "#007AFF",
    icon: "📊",
  },
];

const Card: React.FC<{
  title: string;
  description: string;
  color: string;
  icon: string;
  index: number;
}> = ({ title, description, color, icon, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - index * 5,
    fps,
    config: { damping: 12 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = entrance;
  const yOffset = interpolate(entrance, [0, 1], [50, 0]);

  // Subtle hover-like pulse animation
  const pulse = Math.sin(frame / 20 + index) * 0.02;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale + pulse}) translateY(${yOffset}px)`,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: 32,
        padding: 40,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          backgroundColor: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 32,
          boxShadow: `0 8px 16px ${color}44`,
        }}
      >
        {icon}
      </div>
      <div>
        <h2 style={{ color: "white", fontSize: 32, margin: 0, fontWeight: 700 }}>{title}</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, margin: "8px 0 0 0", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050505",
        padding: 60,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(29, 185, 84, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <header style={{ marginBottom: 60, opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)` }}>
          <h1 style={{ color: "white", fontSize: 64, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            Remotion <span style={{ color: "#1DB954" }}>Studio</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 24, marginTop: 12 }}>
            Select a template to begin creating.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32,
          }}
        >
          {COMPOSITIONS.map((comp, i) => (
            <Card key={comp.id} {...comp} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom Footer Decor */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: 60,
        color: "rgba(255,255,255,0.2)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }}>
        v1.0.0 • Powered by Remotion
      </div>
    </AbsoluteFill>
  );
};

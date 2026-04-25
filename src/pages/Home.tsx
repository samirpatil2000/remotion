import { useNavigate } from "react-router-dom";

export const COMPOSITIONS = [
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
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] p-8 md:p-16 relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(29, 185, 84, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">
            Remotion <span className="text-[#1DB954]">Dashboard</span>
          </h1>
          <p className="text-white/50 text-xl mt-4">
            Select a template to begin editing.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPOSITIONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/editor/${comp.id}`)}
              className="group cursor-pointer bg-white/5 backdrop-blur-xl rounded-[32px] p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 shadow-2xl hover:-translate-y-2 flex flex-col gap-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex justify-center items-center text-3xl shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: comp.color, boxShadow: `0 8px 16px ${comp.color}44` }}
              >
                {comp.icon}
              </div>
              <div>
                <h2 className="text-white text-3xl font-bold m-0">{comp.title}</h2>
                <p className="text-white/60 text-lg mt-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 md:left-16 text-white/20 text-sm font-medium tracking-widest uppercase">
        v1.0.0 • Powered by Remotion
      </div>
    </div>
  );
}

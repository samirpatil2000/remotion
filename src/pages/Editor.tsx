import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import { ArrowLeft } from "lucide-react";

// Import compositions and their props
import { Scene as SpotifyPlayer, defaultSpotifyPlayerProps } from "../compositions/SpotifyPlayer";
import { Scene as FutureOfDesign, defaultFutureOfDesignProps } from "../compositions/FutureOfDesign";

const TEMPLATES = {
  SpotifyPlayer: {
    component: SpotifyPlayer,
    defaultProps: defaultSpotifyPlayerProps,
    durationInFrames: 300,
    fps: 30,
    width: 1080,
    height: 1920,
    title: "Spotify Player",
  },
  FutureOfDesign: {
    component: FutureOfDesign,
    defaultProps: defaultFutureOfDesignProps,
    durationInFrames: 150,
    fps: 30,
    width: 1080,
    height: 1920,
    title: "Future of Design",
  },
};

export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  
  const template = TEMPLATES[templateId as keyof typeof TEMPLATES];
  
  if (!template) {
    return <div className="p-8 text-red-500">Template not found.</div>;
  }

  // We keep a local state of the props so we can edit them
  const [inputProps, setInputProps] = useState<any>(template.defaultProps);

  const handlePropChange = (key: string, value: any) => {
    setInputProps((prev: any) => ({ ...prev, [key]: value }));
  };

  // Dynamically generate inputs based on the default props
  const renderInputs = () => {
    return Object.entries(inputProps).map(([key, value]) => {
      const isColor = key.toLowerCase().includes("color");
      const isNumber = typeof value === "number";
      const isBoolean = typeof value === "boolean";
      
      return (
        <div key={key} className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-white/70 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          
          {isBoolean ? (
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handlePropChange(key, e.target.checked)}
              className="w-5 h-5 accent-[#1DB954]"
            />
          ) : isColor ? (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value as string}
                onChange={(e) => handlePropChange(key, e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={value as string}
                onChange={(e) => handlePropChange(key, e.target.value)}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-1.5 text-white flex-1 text-sm focus:outline-none focus:border-[#1DB954]"
              />
            </div>
          ) : isNumber ? (
            <input
              type="number"
              value={value as number}
              onChange={(e) => handlePropChange(key, parseFloat(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1DB954]"
              step={key.toLowerCase().includes("speed") || key.toLowerCase().includes("scale") ? 0.1 : 1}
            />
          ) : (
            <input
              type="text"
              value={value as string}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1DB954]"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden font-sans">
      
      {/* Left Sidebar / Header */}
      <div className="absolute top-0 left-0 p-6 z-20 flex items-center gap-4">
        <button 
          onClick={() => navigate("/")}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">{template.title}</h1>
      </div>

      {/* Center Canvas (Player) */}
      <div className="flex-1 flex justify-center items-center p-8 pt-24 bg-gradient-to-br from-[#050505] to-[#121212]">
        <div className="shadow-2xl rounded-2xl overflow-hidden border border-white/10" style={{ height: "80vh", aspectRatio: "9/16" }}>
          <Player
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            component={template.component as any}
            inputProps={inputProps}
            durationInFrames={template.durationInFrames}
            fps={template.fps}
            compositionWidth={template.width}
            compositionHeight={template.height}
            style={{ width: "100%", height: "100%" }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>

      {/* Right Sidebar (Controls) */}
      <div className="w-[350px] bg-[#111] border-l border-white/10 flex flex-col h-full shadow-2xl relative z-10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white text-lg font-semibold tracking-wide">Properties</h2>
          <p className="text-white/40 text-sm mt-1">Live edit the template values</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderInputs()}
        </div>
        
        <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
          <button className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-xl transition-colors shadow-lg">
            Export Video
          </button>
        </div>
      </div>
      
    </div>
  );
}

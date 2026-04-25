import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#1DB954] selection:text-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:templateId" element={<Editor />} />
      </Routes>
    </div>
  );
}

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Editor = lazy(() => import("./pages/Editor"));
const CustomEditor = lazy(() => import("./pages/CustomEditor"));

function PageLoader() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#050505",
    }}>
      <div style={{
        width: 24,
        height: 24,
        border: "2px solid rgba(255,255,255,0.08)",
        borderTopColor: "rgba(255,255,255,0.5)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#1DB954] selection:text-black">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:templateId" element={<Editor />} />
          <Route path="/editor/custom" element={<CustomEditor />} />
        </Routes>
      </Suspense>
    </div>
  );
}

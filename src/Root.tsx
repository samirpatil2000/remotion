import "./index.css";
import { Composition } from "remotion";
import { Scene } from "./compositions/SpotifyPlayer";
import { Home } from "./compositions/Gallery";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Home"
        component={Home}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SpotifyPlayer"
        component={Scene}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

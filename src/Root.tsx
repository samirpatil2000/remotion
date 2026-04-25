import "./index.css";
import { Composition } from "remotion";
import { Scene as SpotifyPlayer } from "./compositions/SpotifyPlayer";
import { Home } from "./compositions/Gallery";
import { Scene as FutureOfDesign } from "./compositions/FutureOfDesign";

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
        component={SpotifyPlayer}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FutureOfDesign"
        component={FutureOfDesign}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

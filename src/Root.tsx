import "./index.css";
import { Composition } from "remotion";
import { Scene as SpotifyPlayer, spotifyPlayerSchema, defaultSpotifyPlayerProps } from "./compositions/SpotifyPlayer";
import { Home } from "./compositions/Gallery";
import { Scene as FutureOfDesign, futureOfDesignSchema, defaultFutureOfDesignProps } from "./compositions/FutureOfDesign";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Home"
        component={Home}
        durationInFrames={300}
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
        schema={spotifyPlayerSchema}
        defaultProps={defaultSpotifyPlayerProps}
      />
      <Composition
        id="FutureOfDesign"
        component={FutureOfDesign}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        schema={futureOfDesignSchema}
        defaultProps={defaultFutureOfDesignProps}
      />
    </>
  );
};

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

export interface MangoGiraffeSceneDef {
  component: React.ComponentType<any>;
  durationInFrames: number;
}

export const TemplateWrapper: React.FC<{
  scenes: MangoGiraffeSceneDef[];
  props: any;
}> = ({ scenes, props }) => {
  let currentFrameOffset = 0;
  
  return (
    <AbsoluteFill>
      {scenes.map((scene, i) => {
        const startFrame = currentFrameOffset;
        currentFrameOffset += scene.durationInFrames;
        
        return (
          <Sequence
            key={i}
            from={startFrame}
            durationInFrames={scene.durationInFrames}
          >
            <scene.component {...props} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

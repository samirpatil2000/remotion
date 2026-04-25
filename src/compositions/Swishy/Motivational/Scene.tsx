import React from "react";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import { TemplateWrapper } from "../TemplateWrapper";

export const Scene: React.FC<any> = (props) => {
  const scenes = [
    { component: Scene1, durationInFrames: 70 },
    { component: Scene2, durationInFrames: 100 },
    { component: Scene3, durationInFrames: 90 },
    { component: Scene4, durationInFrames: 80 },
  ];

  return <TemplateWrapper scenes={scenes} props={props} />;
};

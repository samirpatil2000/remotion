import React from "react";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import { TemplateWrapper } from "../TemplateWrapper";

export const Scene: React.FC<any> = (props) => {
  const scenes = [
    { component: Scene1, durationInFrames: 120 },
    { component: Scene2, durationInFrames: 180 },
  ];

  return <TemplateWrapper scenes={scenes} props={props} />;
};

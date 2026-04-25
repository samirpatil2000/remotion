import React from "react";
import Scene1 from "./Scene1";
import { TemplateWrapper } from "../TemplateWrapper";

export const Scene: React.FC<any> = (props) => {
  const scenes = [
    { component: Scene1, durationInFrames: 350 },
  ];

  return <TemplateWrapper scenes={scenes} props={props} />;
};

import Scene1 from "./Scene1";
import { TemplateWrapper } from "../TemplateWrapper";
import React from "react";

export const Scene: React.FC<any> = (props) => {
  const scenes = [
    { component: Scene1, durationInFrames: 150 },
  ];

  return <TemplateWrapper scenes={scenes} props={props} />;
};

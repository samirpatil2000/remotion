import React from "react";
import Scene1 from "./Scene1";
import { TemplateWrapper } from "../TemplateWrapper";

type FinancialsSplitProps = Record<string, unknown>;

export const Scene: React.FC<FinancialsSplitProps> = (props) => {
  const scenes = [
    { component: Scene1, durationInFrames: 150 },
  ];

  return <TemplateWrapper scenes={scenes} props={props} />;
};

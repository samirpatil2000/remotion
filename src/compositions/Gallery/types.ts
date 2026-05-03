import React from "react";

export type ControlType = "color" | "text" | "url" | "number" | "boolean" | "font" | "video" | "multilineText" | "image";

export interface Control {
  key: string;
  label: string;
  type: ControlType;
  group: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CompositionDef {
  id: string;
  category?: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadComponent: () => Promise<React.ComponentType<any>>;
  defaultProps: Record<string, unknown>;
  durationInFrames: number;
  fps: number;
  width?: number;
  height?: number;
  controls: Control[];
}

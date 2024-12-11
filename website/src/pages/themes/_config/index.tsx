import React from "react";

export type ControlConfig = {
  label: string;
  content?: (props: any) => React.ReactNode;
  controls?: ControlConfig[];
  hasVictoryChart?: boolean;
} & (
  | {
      type: "section" | "colorPalette" | "accordion";
    }
  | {
      type: "colorScale";
      path: string | string[];
    }
  | {
      type: "slider" | "select" | "colorPicker";
      path: string | string[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      options?: { label: string; value: string }[];
    }
);

export type OptionsPanelConfig = {
  title: string;
  description?: string;
  hasVictoryChart?: boolean;
  controls: ControlConfig[];
};

export { default as paletteOptionsConfig } from "./palette";
export { default as globalOptionsConfig } from "./global";
export { default as axisOptionsConfig } from "./axis";
export { default as chartOptionsConfig } from "./chart";

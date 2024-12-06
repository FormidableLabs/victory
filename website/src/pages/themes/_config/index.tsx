import React from "react";

export type ControlConfig = {
  label: string;
  content?: (props: any) => React.ReactNode;
  controls?: ControlConfig[];
} & (
  | {
      type: "section" | "colorScale" | "accordion";
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

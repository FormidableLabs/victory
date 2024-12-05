import React from "react";

export type ThemeBuilderFieldConfig =
  | {
      type: "section" | "colorScale";
      label: string;
      fields?: ThemeBuilderFieldConfig[];
    }
  | {
      type: "slider" | "select" | "colorPicker";
      label: string;
      path: string | string[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      options?: { label: string; value: string }[];
    };

export type ThemeBuilderOptionsConfig = {
  title: string;
  hasVictoryChart?: boolean;
  content?: (props: any) => React.ReactNode;
  fields: ThemeBuilderFieldConfig[];
}[];

export { default as paletteOptionsConfig } from "./palette";
export { default as globalOptionsConfig } from "./global";
export { default as axisOptionsConfig } from "./axis";
export { default as chartOptionsConfig } from "./chart";

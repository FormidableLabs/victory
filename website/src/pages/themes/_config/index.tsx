import { ExampleConfig } from "../_components/examples";

export type ControlConfig = {
  label: string;
  content?: ExampleConfig[];
  controls?: ControlConfig[];
} & (
  | {
      type: "accordion" | "colorScalePreview";
    }
  | {
      type: "section";
      description?: string;
    }
  | {
      type: "colorPalette";
      colorScaleType: string;
      value: string;
    }
  | {
      type: "colorScale";
      path: string | string[];
      showDefaultToggle?: boolean;
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

export type ChartPanelConfig = {
  title: string;
  description?: string;
  selectLabel: string;
  types: Record<string, ControlConfig>;
};

export { default as paletteOptionsConfig } from "./palette";
export { default as globalOptionsConfig } from "./global";
export { default as axisOptionsConfig } from "./axis";
export { default as chartOptionsConfig } from "./chart";

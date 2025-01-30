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
      value: string;
      path: string | string[];
    }
  | {
      type: "colorScale";
      path: string | string[];
      showDefaultToggle?: boolean;
    }
  | {
      type: "slider";
      path: string | string[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
      default?: number;
    }
  | {
      type: "select" | "colorPicker";
      path: string | string[];
      options?: { label: string; value: string }[];
    }
  | {
      type: "colorPicker";
      path: string | string[];
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

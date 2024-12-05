import { VictoryThemeDefinition } from "victory-core";
import { ThemeBuilderFieldConfig } from "./_config";
import { colorScaleOptions } from "./_components/color-scale-options";

export const setNestedConfigValue = (
  config: VictoryThemeDefinition,
  paths: string | string[],
  value: unknown,
) => {
  const updatedConfig = { ...config };
  const pathsArray = Array.isArray(paths) ? paths : [paths];

  pathsArray.forEach((path) => {
    const pathArray = path.split(".");
    pathArray.reduce((acc, key, i) => {
      if (i === pathArray.length - 1) {
        acc[key] = value;
      } else {
        acc[key] = { ...acc[key] };
      }
      return acc[key];
    }, updatedConfig);
  });

  return updatedConfig;
};

export const getConfigValue = (
  config: VictoryThemeDefinition,
  path: string | string[],
  defaultValue?: unknown,
) => {
  const pathString = Array.isArray(path) ? path[0] : path;
  if (!pathString) return undefined;
  const pathArray = pathString.split(".");
  return pathArray.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : defaultValue;
  }, config);
};

// Config helpers
export enum StrokeProps {
  STROKE = "Stroke",
  STROKE_WIDTH = "Stroke Width",
  STROKE_DASH_ARRAY = "Stroke Dash Array",
  STROKE_LINE_CAP = "Stroke Line Cap",
  STROKE_LINE_JOIN = "Stroke Line Join",
}

export const getPath = (basePath: string | string[], key: string) => {
  if (Array.isArray(basePath)) {
    return basePath.map((p) => `${p}.${key}`);
  }
  return `${basePath}.${key}`;
};

export const getNestedColorScaleConfig = (
  basePath: string | string[],
): ThemeBuilderFieldConfig[] => [
  {
    type: "select",
    label: "Color Scale",
    options: colorScaleOptions,
    path: getPath(basePath, "colorScale"),
  },
];

export const getBaseStrokeConfig = (
  basePath: string | string[],
  includedStrokeProps: StrokeProps[] = [],
): ThemeBuilderFieldConfig[] => {
  const config = [
    {
      type: "colorPicker",
      label: StrokeProps.STROKE,
      path: getPath(basePath, "stroke"),
    },
    {
      type: "slider",
      label: StrokeProps.STROKE_WIDTH,
      min: 0,
      max: 5,
      unit: "px",
      path: getPath(basePath, "strokeWidth"),
    },
    {
      type: "slider",
      label: StrokeProps.STROKE_DASH_ARRAY,
      min: 0,
      max: 10,
      path: getPath(basePath, "strokeDasharray"),
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_CAP,
      options: [
        { label: "Round", value: "round" },
        { label: "Square", value: "square" },
        { label: "Butt", value: "butt" },
      ],
      path: getPath(basePath, "strokeLinecap"),
    },
    {
      type: "select",
      label: StrokeProps.STROKE_LINE_JOIN,
      options: [
        { label: "Round", value: "round" },
        { label: "Bevel", value: "bevel" },
        { label: "Miter", value: "miter" },
      ],
      path: getPath(basePath, "strokeLinejoin"),
    },
  ] as ThemeBuilderFieldConfig[];
  return includedStrokeProps.length
    ? config.filter((field) =>
        includedStrokeProps.includes(field.label as StrokeProps),
      )
    : config;
};

export const getBaseLabelsConfig = (
  basePath: string | string[],
): ThemeBuilderFieldConfig[] => [
  {
    type: "slider",
    label: "Font Size",
    min: 10,
    max: 24,
    unit: "px",
    path: getPath(basePath, "fontSize"),
  },
  {
    type: "slider",
    label: "Text Padding",
    min: 0,
    max: 50,
    unit: "px",
    path: getPath(basePath, "padding"),
  },
  {
    type: "colorPicker",
    label: "Font Color",
    path: getPath(basePath, "fill"),
  },
];

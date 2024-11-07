import { VictoryThemeDefinition } from "victory-core";

export const setNestedConfigValue = (
  config: VictoryThemeDefinition,
  path: string,
  value: unknown,
) => {
  const pathArray = path.split(".");
  const updatedConfig = { ...config };
  pathArray.reduce((acc, key, i) => {
    if (i === pathArray.length - 1) {
      acc[key] = value;
    } else {
      acc[key] = { ...acc[key] };
    }
    return acc[key];
  }, updatedConfig);

  return updatedConfig;
};

export const getConfigValue = (
  config: VictoryThemeDefinition,
  path: string,
) => {
  const pathArray = path.split(".");
  return pathArray.reduce((acc, key) => acc[key], config);
};

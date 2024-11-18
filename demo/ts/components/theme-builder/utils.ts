import { VictoryThemeDefinition } from "victory";

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
  defaultValue?: unknown,
) => {
  if (!path) return undefined;
  const pathArray = path.split(".");
  return pathArray.reduce((acc, key) => {
    return acc && acc[key] ? acc[key] : defaultValue || undefined;
  }, config);
};

import { VictoryThemeDefinition } from "victory-core";

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

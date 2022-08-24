import { VictoryProviderProps } from "victory-core/lib/v37";
import { getData } from "victory-core/lib/v37/victory-state/helpers/get-data";
import { getDomain } from "victory-core/lib/v37/victory-state/helpers/get-domain";
import { DataSelector } from "./data-selector";

export const selectNormalizedData = (s: DataSelector) =>
  s.propsAs<VictoryProviderProps>().map((props) => {
    const normalizedData = getData(props);
    return {
      ...props,
      data: normalizedData,
      normalizedData,
    };
  });

export const selectDomains = (s: DataSelector) =>
  s.select(selectNormalizedData).map((props) => {
    return {
      x: getDomain(props, "x"),
      y: getDomain(props, "y"),
    };
  });

export const selectDomain = (s: DataSelector) => {
  const domains = s.select(selectDomains);
  return {
    x: [
      Math.min(...domains.map((d) => d.x[0] as number)),
      Math.max(...domains.map((d) => d.x[1] as number)),
    ],
    y: [
      Math.min(...domains.map((d) => d.y[0] as number)),
      Math.max(...domains.map((d) => d.y[1] as number)),
    ],
  };
};

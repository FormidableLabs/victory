import { makeNestable } from "./vic-nestable";
import {
  selectDomain,
  selectNormalizedData,
  selectRanges,
  selectScales,
} from "../utils/selectors";

export function withNormalData(config, Component) {
  return makeNestable(
    {
      displayName: config.displayName,
      normalizedProps: {
        data: selectNormalizedData,
      },
      aggregateProps: {
        domain: selectDomain,
        scale: selectScales,
        range: selectRanges,
      },
      getNormalizedProps(props) {
        const normData = selectNormalizedData(null);
        const normProps = config.getNormalizedProps(props);
        return {
          ...props,
          ...normProps,
          data: normData,
        };
      },
      getAggregateProps(props) {
        return {
          domain: null,
          scale: null,
          range: null,
        };
      },
    },
    Component,
  );
}

const VicLine = makeNestable(
  {
    displayName: "VicLine",
    defaultProps: {
      curve: "linear",
    },
    normalizeProps: {
      curve: evalCurve,
      foo: evalFoo,
      bar: evalCallback,
    },
    aggregateProps: {
      polar: (allComponents, props) =>
        props.polar || allComponents.some((c) => c.props.polar),
    },
  },
  (props) => {
    return <line {...props} />;
  },
);
const VicChart = makeNestable({ displayName: "VicChart" }, (props) => {
  return <chart>{props.children}</chart>;
});

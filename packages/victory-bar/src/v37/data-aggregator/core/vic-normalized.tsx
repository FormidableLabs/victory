import PropTypes from "prop-types";
import { getData } from "victory-core/lib/v37/victory-state/helpers/get-data";
import { makeNestable } from "./vic-nestable";
import { selectDomain, selectRanges, selectScales } from "../utils/selectors";

export function createVictoryComponent(config, Component) {
  return makeNestable(
    {
      displayName: config.displayName,
      defaultProps: config.defaultProps,
      propTypes: config.propTypes,
      getNormalizedProps(props) {
        const normData = getData(props);
        return {
          ...props,
          ...config.getNormalizedProps?.({
            ...props,
            data: normData,
          }),
        };
      },
      getAggregateProps(props, allProps, select) {
        return {
          domain: select(selectDomain),
          scale: select(selectScales),
          range: select(selectRanges),
          ...config.getAggregateProps?.(allProps, select),
        };
      },
    },
    Component,
  );
}

const VicChart = createVictoryComponent(
  {
    displayName: "VicChart",
    defaultProps: {},
    normalizeProps: {
      //
    },
    aggregateProps: {
      //
    },
  },
  (props) => {
    return <chart>{props.children}</chart>;
  },
);

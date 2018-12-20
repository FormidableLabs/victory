/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";

const getChartDecorator = (props) => {
  return (story) => {
    return <VictoryChart {...props}>{story()}</VictoryChart>;
  };
};

const getPolarChartDecorator = (props) => {
  return (story) => {
    return (
      <VictoryChart polar theme={VictoryTheme.material} {...props}>
        {story()}
        <VictoryPolarAxis />
      </VictoryChart>
    );
  };
};

export { getChartDecorator, getPolarChartDecorator };

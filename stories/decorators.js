/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryPolarAxis } from "victory-polar-axis";
import { VictoryTheme } from "victory-core";

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

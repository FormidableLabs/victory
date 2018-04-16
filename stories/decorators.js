
/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart, VictoryPolarAxis } from "../src/index";
import { VictoryTheme } from "victory-core";

const getChartDecorator = (props) => {
  return (story) => {
    return (
      <VictoryChart {...props}>
        {story()}
      </VictoryChart>
    );
  };
};

const getPolarChartDecorator = (props) => {
  return (story) => {
    return (
      <VictoryChart polar theme={VictoryTheme.material} {...props}>
        {story()}
        <VictoryPolarAxis/>
      </VictoryChart>
    );
  };
};

const ignoredDecorator = (story) => {
  return (
    <div className="chromatic-ignore">
      {story()}
    </div>
  );
};

export { getChartDecorator, getPolarChartDecorator, ignoredDecorator };

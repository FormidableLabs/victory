/*eslint-disable react/no-multi-comp*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { startCase } from "lodash";
import { VictoryLegend } from "../packages/victory-legend/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import VictoryAxis from "../packages/victory-axis/src/victory-axis";
import LineSegment from "../packages/victory-core/src/victory-primitives/line-segment";

const getBlankChartDecorator = (props) => {
  const blankAxisStyle = {
    axis: { stroke: "none" },
    tickLabels: { fill: "none" },
  };

  return (story) => {
    return (
      <VictoryChart {...props}>
        <VictoryAxis style={blankAxisStyle}/>
        <VictoryAxis dependentAxis style={blankAxisStyle}/>
        {story()}
      </VictoryChart>
    );
  };
};

const loremText = (
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut" +
  " labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
  " laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in" +
  " voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat" +
  " cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
);

const getLoremLegendData = (num) => loremText
  .split(" ")
  .slice(0, num)
  .map((word) => ({
    name: startCase(word.replace(/[.,]/g, ""))
  }));

const legendWidthDemonstrationStyle = {
  labels: { fontSize: 8 },
  border: { stroke: "black" }
};

const LegendMaxWidthIndicator = (props) => {
  //eslint-disable-next-line react/prop-types
  const { width, height, orientation, legendWidth } = props;
  const isHorizontal = orientation === "horizontal";
  const geometryProps = isHorizontal ?
  {
    x1: legendWidth,
    x2: legendWidth,
    y1: 0,
    y2: height
  } : {
    x1: 0,
    x2: width,
    y1: legendWidth,
    y2: legendWidth
  };

  return <LineSegment {...props} {...geometryProps} style={{ strokeDasharray: "5,5" }}/>;
};
LegendMaxWidthIndicator.defaultProps = {
  orientation: "vertical"
};

const LegendWidthTester = (props) => (
  <React.Fragment>
    <LegendMaxWidthIndicator {...props}/>
    <VictoryLegend {...props} style={legendWidthDemonstrationStyle} />
  </React.Fragment>
);

storiesOf("VictoryLegend.legendWidth", module)
  .addDecorator(getBlankChartDecorator())
  .add("vertical", () => <LegendWidthTester legendWidth={200} data={getLoremLegendData(18)}/>)
  .add("vertical - title top", () => (
    <LegendWidthTester
      legendWidth={200}
      title={'Title'}
      data={getLoremLegendData(18)}
    />
  ))
  .add("vertical - title left", () => (
    <LegendWidthTester
      legendWidth={200}
      title={'Title'}
      titleOrientation={'left'}
      data={getLoremLegendData(18)}
    />
  ))
  .add("horizontal", () => (
    <LegendWidthTester orientation="horizontal" legendWidth={200} data={getLoremLegendData(18)}/>
  ))
  .add("horizontal - title top", () => (
    <LegendWidthTester
      orientation="horizontal"
      legendWidth={200}
      title={'Title'}
      data={getLoremLegendData(18)}
    />
  ))
  .add("horizontal - title left", () => (
    <LegendWidthTester
      orientation="horizontal"
      legendWidth={200}
      title={'Title'}
      titleOrientation={'left'}
      data={getLoremLegendData(18)}
    />
  ));

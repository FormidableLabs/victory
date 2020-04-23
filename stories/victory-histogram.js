/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryHistogram } from "../packages/victory-histogram/src/index";
// import { VictoryChart } from "../packages/victory-chart/src/index";
// import _ from "lodash";

// import { VictoryTheme } from "../packages/victory-core/src/index";
// import { getChartDecorator } from "./decorators";
const data = Array.from({ length: 60 }, () => ({
  x: Math.floor(Math.random() * 100)
}));

storiesOf("VictoryHistogram", module).add("default rendering", () => <VictoryHistogram />);

storiesOf("VictoryHistogram.chart", module)
  .add("custom bar width (20)", () => <VictoryHistogram barWidth={20} />)
  .add("custom bar width (2)", () => <VictoryHistogram barWidth={5} />)

  .add("custom bar spacing (10)", () => <VictoryHistogram barSpacing={10} />)

  .add("bin - bin count (2)", () => <VictoryHistogram bins={2} />)
  .add("bin - bin count (100)", () => <VictoryHistogram bins={100} />)

  .add("bin - custom edges", () => <VictoryHistogram bins={[0, 30, 50, 100]} />)
  .add("bin - custom edges - 2", () => <VictoryHistogram bins={[0, 20, 30, 70, 100]} />)

  .add("styles - custom styles", () => (
    <VictoryHistogram style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }} />
  ));

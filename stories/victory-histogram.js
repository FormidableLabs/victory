/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryHistogram } from "../packages/victory-histogram/src/index";
// import { VictoryChart } from "../packages/victory-chart/src/index";
// import _ from "lodash";

import { VictoryTheme } from "../packages/victory-core/src/index";
import { getChartDecorator } from "./decorators";

const data = [
  {
    x: 18
  },
  {
    x: 85
  },
  {
    x: 27
  },
  {
    x: 62
  },
  {
    x: 26
  },
  {
    x: 90
  },
  {
    x: 85
  },
  {
    x: 60
  },
  {
    x: 85
  },
  {
    x: 21
  },
  {
    x: 86
  },
  {
    x: 89
  },
  {
    x: 60
  },
  {
    x: 82
  },
  {
    x: 70
  },
  {
    x: 22
  },
  {
    x: 68
  },
  {
    x: 79
  },
  {
    x: 18
  },
  {
    x: 76
  },
  {
    x: 32
  },
  {
    x: 26
  },
  {
    x: 18
  },
  {
    x: 63
  },
  {
    x: 71
  },
  {
    x: 98
  },
  {
    x: 91
  },
  {
    x: 22
  },
  {
    x: 25
  },
  {
    x: 91
  },
  {
    x: 18
  },
  {
    x: 49
  },
  {
    x: 18
  },
  {
    x: 79
  },
  {
    x: 56
  },
  {
    x: 18
  },
  {
    x: 18
  },
  {
    x: 28
  },
  {
    x: 79
  },
  {
    x: 44
  }
];

storiesOf("VictoryHistogram", module).add("default rendering", () => <VictoryHistogram />);

/* VERTICAL */
storiesOf("VictoryHistogram.vertical.barSpacing", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bar spacing = 10", () => <VictoryHistogram barSpacing={10} />)
  .add("bar spacing = 5", () => <VictoryHistogram barSpacing={5} />);

storiesOf("VictoryHistogram.vertical.bins", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => <VictoryHistogram bins={[0, 30, 50, 100]} />)
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram bins={[0, 20, 30, 70, 100]} />
  ));

storiesOf("VictoryHistogram.vertical.styles", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with styles", () => (
    <VictoryHistogram style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }} />
  ));

/* HORIZONTAL */
storiesOf("VictoryHistogram.horizontal.barSpacing", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bar spacing = 10", () => <VictoryHistogram horizontal barSpacing={10} />)
  .add("bar spacing = 5", () => <VictoryHistogram horizontal barSpacing={5} />);

storiesOf("VictoryHistogram.horizontal.bins", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram horizontal bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram horizontal bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => (
    <VictoryHistogram horizontal bins={[0, 30, 50, 100]} />
  ))
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram horizontal bins={[0, 20, 30, 70, 100]} />
  ));

storiesOf("VictoryHistogram.horizontal.styles", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with styles", () => (
    <VictoryHistogram
      horizontal
      style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }}
    />
  ));

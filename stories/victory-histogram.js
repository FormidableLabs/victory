/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryHistogram } from "../packages/victory-histogram/src";
import { VictoryAxis } from "../packages/victory-axis/src";

import { VictoryTheme } from "../packages/victory-core/src";
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

const timeData = Array.from({ length: 500 }, () => ({
  x: new Date(
    Math.floor(Math.random() * 12 + 2010),
    Math.floor(Math.random() * 11),
    Math.floor(Math.random() * 27 + 1)
  )
}));

storiesOf("VictoryHistogram", module).add("default rendering", () => <VictoryHistogram />);

/* VERTICAL */
storiesOf("VictoryHistogram.vertical.barSpacing", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bar spacing = 10", () => <VictoryHistogram barSpacing={10} />)
  .add("bar spacing = 5", () => <VictoryHistogram barSpacing={5} />);

storiesOf("VictoryHistogram.data.dates", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale, tickCount: 3 }))
  .add("default", () => <VictoryHistogram data={timeData} />)
  .add("with custom bins = [01/01/2020, 01/06/2020, 01/01/2021]", () => (
    <VictoryHistogram
      data={timeData}
      bins={[new Date(2020, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
    />
  ))
  .add("numeric bins = 2", () => <VictoryHistogram data={timeData} bins={2} />)
  .add("numeric bins = 10", () => <VictoryHistogram data={timeData} bins={10} />)
  .add("day bins", () => <VictoryHistogram data={timeData} bins="day" />)
  .add("month bins", () => <VictoryHistogram data={timeData} bins="month" />)
  .add("year bins", () => <VictoryHistogram data={timeData} bins="year" />)
  .add("default", () => <VictoryHistogram data={timeData} />);

storiesOf("VictoryHistogram.vertical.bins", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => <VictoryHistogram bins={[0, 30, 50, 100]} />)
  .add("custom bins/edges = [0, 30, 50]", () => <VictoryHistogram bins={[0, 30, 50]} />)
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram bins={[0, 20, 30, 70, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 70, 100, 130]", () => (
    <VictoryHistogram bins={[0, 30, 70, 100, 130]} />
  ))
  .add("custom bins/edges = [0, 10, 30, 70, 150]", () => (
    <VictoryHistogram bins={[0, 10, 30, 70, 150]} />
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

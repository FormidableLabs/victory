/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryHistogram } from "../packages/victory-histogram/src";
import { VictoryLine } from "../packages/victory-line/src";
import { VictoryScatter } from "../packages/victory-scatter/src";
import { VictoryTooltip } from "../packages/victory-tooltip/src";
import { VictoryStack } from "../packages/victory-stack/src";
import { VictoryTheme } from "../packages/victory-core/src";
import { getChartDecorator } from "./decorators";
import { getData } from "./data";
import { data, timeData } from "./victory-histogram-data";

import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3Time from "d3-time";

storiesOf("VictoryHistogram", module)
  .add("default rendering", () => <VictoryHistogram />)
  .add("default rendering with data", () => <VictoryHistogram data={data} />);

/* binSpacing */
storiesOf("VictoryHistogram.binSpacing.vertical", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bin spacing = 10", () => <VictoryHistogram data={data} binSpacing={10} />)
  .add("bin spacing = 5", () => <VictoryHistogram data={data} binSpacing={5} />);

storiesOf("VictoryHistogram.binSpacing.horizontal", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bin spacing = 10", () => <VictoryHistogram data={data} horizontal binSpacing={10} />)
  .add("bin spacing = 5", () => <VictoryHistogram data={data} horizontal binSpacing={5} />);

/* data */
storiesOf("VictoryHistogram.data.dates", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("date data from 2015-2020", () => <VictoryHistogram data={timeData} />)
  .add("date data from 2020", () => {
    const newTimeData = timeData.map(({ x }) => {
      const newDate = new Date(x);

      newDate.setFullYear(2020);
      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  })
  .add("date data from Jan-June 2020", () => {
    const newTimeData = timeData.map(({ x }, index) => {
      const newDate = new Date(x);

      newDate.setFullYear(2020);

      newDate.setMonth(Math.ceil(index / 100));
      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  })
  .add("data date from May 2020", () => {
    const newTimeData = timeData.map(({ x }) => {
      const newDate = new Date(x);

      newDate.setMonth(4);
      newDate.setFullYear(2020);

      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  });

storiesOf("VictoryHistogram.data", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with data accessors", () => (
    <VictoryHistogram data={data.map(({ x }) => ({ value: x }))} x={({ value }) => value} />
  ))
  .add("with time data accessors", () => (
    <VictoryHistogram
      bins="year"
      data={timeData.map(({ x }) => ({ value: x }))}
      x={({ value }) => value}
    />
  ))
  .add("with empty data", () => <VictoryHistogram data={[]} />)
  .add("with empty data and numeric bins", () => <VictoryHistogram data={[]} bins={2} />)
  .add("with empty data and explicit bins", () => (
    <VictoryHistogram data={[]} bins={[0, 30, 100, 150]} />
  ))
  .add("with empty data and explicit date bins", () => (
    <VictoryHistogram
      scale={{ x: "time" }}
      data={[]}
      bins={[new Date(2020, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
    />
  ));

/* bins */
storiesOf("VictoryHistogram.bins.dates", module)
  .add("with custom bins = [01/01/2020, 01/06/2020, 01/01/2021]", () => (
    <VictoryHistogram
      data={timeData}
      bins={[new Date(2020, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
    />
  ))
  .add("numeric bins = 2", () => <VictoryHistogram data={timeData} bins={2} />)
  .add("numeric bins = 10", () => <VictoryHistogram data={timeData} bins={10} />)
  .add("day bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcDay);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("month bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcMonth);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("year bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcYear);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("default", () => <VictoryHistogram data={timeData} />);

storiesOf("VictoryHistogram.bins.vertical", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram data={data} bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram data={data} bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram data={data} bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => (
    <VictoryHistogram data={data} bins={[0, 30, 50, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 50]", () => <VictoryHistogram data={data} bins={[0, 30, 50]} />)
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram data={data} bins={[0, 20, 30, 70, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 70, 100, 130]", () => (
    <VictoryHistogram data={data} bins={[0, 30, 70, 100, 130]} />
  ))
  .add("custom bins/edges = [0, 10, 30, 70, 150]", () => (
    <VictoryHistogram data={data} bins={[0, 10, 30, 70, 150]} />
  ))
  .add("custom bins/edges = [30, 70, 150]", () => (
    <VictoryHistogram data={data} bins={[30, 70, 150]} />
  ));

storiesOf("VictoryHistogram.bins.horizontal", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram data={data} horizontal bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram data={data} horizontal bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram data={data} horizontal bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 50, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 50]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 50]} />
  ))
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 20, 30, 70, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 70, 100, 130]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 70, 100, 130]} />
  ))
  .add("custom bins/edges = [0, 10, 30, 70, 150]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 10, 30, 70, 150]} />
  ))
  .add("custom bins/edges = [30, 70, 150]", () => (
    <VictoryHistogram data={data} horizontal bins={[30, 70, 150]} />
  ));

/* styles */
storiesOf("VictoryHistogram.styles", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with styles", () => (
    <VictoryHistogram
      data={data}
      style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryHistogram
      horizontal
      data={data}
      style={{
        labels: {
          fill: ({ datum }) =>
            datum.binnedData.some(({ x }) => x === 22) ? "palevioletred" : "black"
        },
        data: {
          stroke: ({ datum }) => (datum.y > 3 ? "red" : "transparent"),
          strokeWidth: 3,
          opacity: ({ datum }) => (datum.y > 3 ? 1 : 0.4)
        }
      }}
      labels={["one", "two", "three", "four", "five"]}
    />
  ));

/* theme */
storiesOf("VictoryHistogram.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryHistogram data={data} />);

storiesOf("VictoryHistogram.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryHistogram data={data} />);

/* corner radius */
storiesOf("VictoryHistogram.cornerRadius", module)
  .addDecorator(getChartDecorator())
  .add("cornerRadius = 1", () => <VictoryHistogram data={data} cornerRadius={1} />)
  .add("cornerRadius = 5", () => <VictoryHistogram data={data} cornerRadius={5} />)
  .add("cornerRadius = 7", () => <VictoryHistogram data={data} cornerRadius={7} />)
  .add("cornerRadius = 5 (horizontal)", () => (
    <VictoryHistogram horizontal data={data} cornerRadius={5} />
  ));

/* getPath */
storiesOf("VictoryHistogram.getPath", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("custom bar path (vertical)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y0}
        L ${(x1 + x0) / 2}, ${y1}
        L ${x1}, ${y0}
        z`;
    };
    return <VictoryHistogram data={data} getPath={getPathFn} />;
  })
  .add("custom bar path (horizontal)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y1}
        L ${x1}, ${(y0 + y1) / 2}
        L ${x0}, ${y0}
        z`;
    };
    return <VictoryHistogram data={data} horizontal getPath={getPathFn} />;
  });

/* labels */
storiesOf("VictoryHistogram.labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryHistogram data={data} labels={({ datum }) => `${datum.x0} - ${datum.x1}`} />
  ))
  .add("function labels (horizontal)", () => (
    <VictoryHistogram horizontal data={data} labels={({ datum }) => `${datum.x0} - ${datum.x1}`} />
  ))
  .add("array labels", () => (
    <VictoryHistogram data={data} labels={["", "", "three", "four", 5, "six"]} />
  ));

/* tooltips */
storiesOf("VictoryHistogram.tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryHistogram
      data={data.map(({ x }) => ({ value: x }))}
      labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
      labelComponent={<VictoryTooltip active />}
      x="value"
    />
  ))
  .add("tooltips (horizontal)", () => (
    <VictoryHistogram
      horizontal
      data={data}
      labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("array tooltips with long and short strings", () => (
    <VictoryHistogram
      data={data}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active />}
    />
  ));

/* scale */
storiesOf("VictoryHistogram.scale", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("time scale", () => <VictoryHistogram bins="month" data={timeData} />)
  .add("time scale with labels", () => (
    <VictoryHistogram
      binSpacing={10}
      data={timeData}
      bins="year"
      labels={({ datum }) => `${datum.x0.getFullYear()} - ${datum.x1.getFullYear()}`}
    />
  ))
  .add("horizontal time scale with labels", () => (
    <VictoryHistogram
      horizontal
      binSpacing={10}
      data={timeData}
      bins="year"
      labels={({ datum }) => `${datum.x0.getFullYear()} - ${datum.x1.getFullYear()}`}
    />
  ));

storiesOf("VictoryHistogram.scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" }, domainPadding: 25 }))
  .add("log scale", () => <VictoryHistogram data={data} />)
  .add("horizontal log scale", () => <VictoryHistogram horizontal data={data} />);

storiesOf("VictoryHistogram.with other charts", module)
  .addDecorator(getChartDecorator({ domainPadding: 25, theme: VictoryTheme.material }))
  .add("with line", () => [
    <VictoryHistogram key="histogram" data={data} />,
    <VictoryLine
      key="line"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ])
  .add("with scatter", () => [
    <VictoryHistogram key="histogram" data={data} />,
    <VictoryScatter
      key="scatter"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ])
  .add("with line horizontal", () => [
    <VictoryHistogram horizontal key="histogram" data={data} />,
    <VictoryLine
      horizontal
      key="line"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ]);

const stackedData = [
  ...[50, 30, 100, 32, 50, 10, 49, 78, 20].map((count) => getData(count, count, 100)),
  [{ x: 1 }, { x: 3 }, { x: 1 }, { x: 2 }]
];

storiesOf("VictoryHistogram.stacked", module)
  .addDecorator(getChartDecorator())
  .add("stacked histogram with explicit bins passed to stack", () => (
    <VictoryStack colorScale="qualitative" bins={[0, 20, 100]}>
      {stackedData.map((d, index) => (
        <VictoryHistogram data={d} key={index} />
      ))}
    </VictoryStack>
  ))
  .add("stacked histogram with numeric bins passed to stack", () => (
    <VictoryStack colorScale="qualitative" bins={2}>
      {stackedData.map((d, index) => (
        <VictoryHistogram data={d} key={index} />
      ))}
    </VictoryStack>
  ))
  .add("stacked histogram with bins passed to first child", () => (
    <VictoryStack colorScale="qualitative">
      {stackedData.map((d, index) => (
        <VictoryHistogram data={d} key={index} bins={index === 0 ? [0, 20, 100] : undefined} />
      ))}
    </VictoryStack>
  ))
  .add("stacked histogram", () => (
    <VictoryStack colorScale="qualitative">
      {stackedData.map((d, index) => (
        <VictoryHistogram binSpacing={10} data={d} key={index} />
      ))}
    </VictoryStack>
  ))
  .add("stacked histogram with nested data", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryHistogram data={data.map(({ x }) => ({ a: { b: { c: x } } }))} x="a.b.c" />
      {stackedData.map((d, index) => (
        <VictoryHistogram data={d} key={index} />
      ))}
    </VictoryStack>
  ));

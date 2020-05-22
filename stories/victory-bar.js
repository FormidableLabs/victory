/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryGroup } from "../packages/victory-group/src/index";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryBar } from "../packages/victory-bar/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { getChartDecorator, getPolarChartDecorator } from "./decorators";
import {
  getData,
  getStackedData,
  getMixedData,
  getTimeData,
  getLogData,
  getDescendingSmallData
} from "./data";
import * as d3Shape from "d3-shape";
import { fromJS } from "immutable";

storiesOf("VictoryBar", module).add("default rendering", () => <VictoryBar />);

storiesOf("VictoryBar.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryBar data={getData(8)} />)
  .add("material theme stacked", () => (
    <VictoryStack labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(8)} />
      <VictoryBar data={getData(8, "seed-1")} />
      <VictoryBar data={getData(8, "seed-2")} />
      <VictoryBar data={getData(8, "seed-3")} />
      <VictoryBar data={getData(8, "seed-4")} />
    </VictoryStack>
  ));
storiesOf("VictoryBar.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryBar data={getData(8)} />)
  .add("grayscale (default) stacked", () => (
    <VictoryStack labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(8)} />
      <VictoryBar data={getData(8, "seed-1")} />
      <VictoryBar data={getData(8, "seed-2")} />
      <VictoryBar data={getData(8, "seed-3")} />
      <VictoryBar data={getData(8, "seed-4")} />
    </VictoryStack>
  ));

storiesOf("VictoryBar.alignment", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("start", () => <VictoryBar data={getData(7)} alignment="start" />)
  .add("middle", () => <VictoryBar data={getData(7)} alignment="middle" />)
  .add("end", () => <VictoryBar data={getData(7)} alignment="end" />)
  .add("start (negative values)", () => <VictoryBar data={getMixedData(5)} alignment="start" />)
  .add("end (negative values)", () => <VictoryBar data={getMixedData(5)} alignment="end" />)
  .add("start (horizontal)", () => <VictoryBar data={getData(7)} horizontal alignment="start" />)
  .add("end (horizontal)", () => <VictoryBar data={getData(7)} horizontal alignment="end" />);

storiesOf("VictoryBar.barRatio", module)
  .addDecorator(getChartDecorator())
  .add("barRatio = 0.01", () => <VictoryBar data={getData(7)} barRatio={0.01} />)
  .add("barRatio = 0.25", () => <VictoryBar data={getData(7)} barRatio={0.25} />)
  .add("barRatio = 0.5", () => <VictoryBar data={getData(7)} barRatio={0.5} />)
  .add("barRatio = 0.75", () => <VictoryBar data={getData(7)} barRatio={0.75} />)
  .add("barRatio = 1", () => <VictoryBar data={getData(7)} barRatio={1} />)
  .add("barRatio = 0.5 (single bar)", () => <VictoryBar data={getData(1)} barRatio={0.5} />)
  .add("barRatio = 0.01 (horizontal)", () => (
    <VictoryBar horizontal data={getData(7)} barRatio={0.01} />
  ))
  .add("barRatio = 0.5 (horizontal)", () => (
    <VictoryBar horizontal data={getData(7)} barRatio={0.5} />
  ))
  .add("barRatio = 1 (horizontal)", () => <VictoryBar horizontal data={getData(7)} barRatio={1} />)
  .add("barRatio = 0.5 (horizontal, single bar)", () => (
    <VictoryBar horizontal data={getData(1)} barRatio={0.5} />
  ))
  .add("barRatio = 0.01 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={0.01} />)
  .add("barRatio = 0.5 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={0.5} />)
  .add("barRatio = 1 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={1} />);

storiesOf("VictoryBar.barWidth", module)
  .addDecorator(getChartDecorator())
  .add("numeric bar width = 5", () => <VictoryBar data={getData(7)} barWidth={5} />)
  .add("numeric bar width = 10", () => <VictoryBar data={getData(7)} barWidth={10} />)
  .add("numeric bar width = 20", () => <VictoryBar data={getData(7)} barWidth={20} />)
  .add("functional bar width (2 * datum.x)", () => (
    <VictoryBar
      data={getData(7)}
      barWidth={({ datum }) => {
        return datum.x * 2;
      }}
    />
  ));

storiesOf("VictoryBar.categories", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("string categories", () => {
    return (
      <VictoryBar
        categories={{ x: ["Bird", "Fish", "Cat", "Dog"] }}
        data={[
          { x: "Cat", y: 45 },
          { x: "Dog", y: 85 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 15 }
        ]}
      />
    );
  });

storiesOf("VictoryBar.cornerRadius", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("cornerRadius = 1", () => <VictoryBar data={getData(7)} cornerRadius={1} />)
  .add("cornerRadius = 5", () => <VictoryBar data={getData(7)} cornerRadius={5} />)
  .add("cornerRadius = 7", () => <VictoryBar data={getData(7)} cornerRadius={7} />)
  .add("cornerRadius = 5 (horizontal)", () => (
    <VictoryBar horizontal data={getData(7)} cornerRadius={5} />
  ))
  .add("cornerRadius = 5 (negative values)", () => (
    <VictoryBar data={getMixedData(5)} cornerRadius={5} />
  ))
  .add("cornerRadius = 5 (horizontal negative values)", () => (
    <VictoryBar horizontal data={getMixedData(5)} cornerRadius={5} />
  ))
  .add("cornerRadius = 3 (20 bars)", () => <VictoryBar data={getData(20)} cornerRadius={3} />)
  .add("cornerRadius = mixed", () => (
    <VictoryBar
      data={getDescendingSmallData()}
      cornerRadius={{ topLeft: 5, topRight: 2, bottomLeft: 7, bottomRight: 3 }}
    />
  ))
  .add("cornerRadius = mixed (horizontal)", () => (
    <VictoryBar
      horizontal
      data={getDescendingSmallData()}
      cornerRadius={{ topLeft: 5, topRight: 2, bottomLeft: 7, bottomRight: 3 }}
    />
  ));

storiesOf("VictoryBar.cornerRadius", module).add("cornerRadius = mixed (polar)", () => (
  <VictoryChart polar theme={VictoryTheme.material} domain={{ x: [0, 360] }} innerRadius={60}>
    <VictoryPolarAxis labelPlacement="parallel" tickValues={[0, 45, 90, 135, 180, 225, 270, 315]} />
    <VictoryBar
      cornerRadius={{ topRight: 1, topLeft: 10, bottomRight: 5, bottomLeft: 0 }}
      style={{ data: { fill: "tomato", width: 20 } }}
      data={[
        { x: 45, y: 20 },
        { x: 90, y: 30 },
        { x: 135, y: 65 },
        { x: 180, y: 50 },
        { x: 270, y: 40 },
        { x: 315, y: 30 }
      ]}
    />
  </VictoryChart>
));

storiesOf("VictoryBar.getPath", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("custom bar path (vertical)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y0}
        L ${(x1 + x0) / 2}, ${y1}
        L ${x1}, ${y0}
        z`;
    };
    return <VictoryBar data={getData(7)} getPath={getPathFn} />;
  })
  .add("custom bar path (horizontal)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y1}
        L ${x1}, ${(y0 + y1) / 2}
        L ${x0}, ${y0}
        z`;
    };
    return <VictoryBar data={getData(4)} horizontal getPath={getPathFn} />;
  });

storiesOf("VictoryBar.getPath", module)
  .addDecorator(getPolarChartDecorator())
  .add("custom bar path (polar)", () => {
    const getPathFn = (props) => {
      const { datum, startAngle, endAngle, r1, r2 } = props;
      const pathFunction = d3Shape
        .arc()
        .innerRadius(r1)
        .outerRadius(r2)
        .startAngle(endAngle)
        .endAngle(startAngle)
        .cornerRadius(0);
      const path = pathFunction();
      const coords = path.split(/[A-Z]/).slice(1);
      // add a star symbol to the end of each bar
      const star = d3Shape
        .symbol()
        .size(datum.y * 20)
        .type(d3Shape.symbolStar)();
      const movesStar = star.match(/[A-Z]/g);
      const coordsStar = star.split(/[A-Z]/).slice(1);
      const [x0, y0] = coords[0].split(",").map(Number);
      const [x1, y1] = coords[1]
        .split(",")
        .slice(coords[1].split(",").length - 2)
        .map(Number);
      const [xOrigin, yOrigin] = [(x0 + x1) / 2, (y0 + y1) / 2];
      const adjustedCoordsStar = coordsStar.map((coord) => {
        if (coord.length === 0) {
          return "";
        }
        const [x, y] = coord.split(",").map(Number);
        return [x + xOrigin, y + yOrigin].join(",");
      });
      const adjustedStar = movesStar.map((m, i) => m + adjustedCoordsStar[i]).join();
      return adjustedStar + pathFunction();
    };
    return (
      <VictoryBar
        alignment={"middle"}
        polar
        width={0}
        data={getData(7)}
        style={{ data: { width: 10 } }}
        getPath={getPathFn}
      />
    );
  });

storiesOf("VictoryBar.data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with data accessors", () => {
    return (
      <VictoryBar
        data={[
          { animal: "Cat", pet: 45, wild: 17 },
          { animal: "Dog", pet: 85, wild: 6 },
          { animal: "Fish", pet: 55, wild: 0 },
          { animal: "Bird", pet: 15, wild: 40 }
        ]}
        x={"animal"}
        y={(data) => data.pet + data.wild}
      />
    );
  })
  .add("with y0", () => <VictoryBar data={getData(8)} y0={(d) => d.y - d.x} />)
  .add("with nested data accessors", () => {
    return (
      <VictoryBar
        data={[
          { a: { b: { c: 1, d: 1 } } },
          { a: { b: { c: 2, d: 3 } } },
          { a: { b: { c: 3, d: 2 } } }
        ]}
        x={"a.b.c"}
        y={"a.b.d"}
      />
    );
  })
  .add("with immutable data", () => (
    <VictoryBar
      data={fromJS([
        { x: 1, y: 2, label: "cat" },
        { x: 2, y: 5, label: "dog" },
        { x: 3, y: 3, label: "dog" },
        { x: 4, y: -2, label: "bird" },
        { x: 5, y: -5, label: "cat" }
      ])}
    />
  ));

storiesOf("VictoryBar.labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryBar data={getData(7)} labels={({ datum }) => `x: ${datum.x}`} />
  ))
  .add("array labels", () => (
    <VictoryBar data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
  ))
  .add("data labels", () => (
    <VictoryBar
      data={[
        { x: 1, y: 2, label: "cat" },
        { x: 2, y: 5, label: "dog" },
        { x: 3, y: 3, label: "dog" },
        { x: 4, y: -2, label: "bird" },
        { x: 5, y: -5, label: "cat" }
      ]}
    />
  ));

storiesOf("VictoryBar.tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryBar
      data={getData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (negative)", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (horizontal)", () => (
    <VictoryBar
      horizontal
      data={getData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (negative horizontal)", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryBar
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active />}
    />
  ));

storiesOf("VictoryBar.style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryBar
      labels={({ datum }) => datum.y}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryBar
      style={{
        labels: {
          fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
        },
        data: {
          stroke: ({ datum }) => (datum.y > 75 ? "red" : "transparent"),
          strokeWidth: 3,
          opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
        }
      }}
      labels={({ datum }) => datum.x}
      data={[{ x: "Cat", y: 62 }, { x: "Dog", y: 91 }, { x: "Fish", y: 55 }, { x: "Bird", y: 55 }]}
    />
  ));

storiesOf("VictoryBar.stacked", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("stacked bars", () => (
    <VictoryStack>
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("stacked bars with mixed lengths", () => (
    <VictoryStack>
      <VictoryBar data={getData(9)} />
      <VictoryBar data={getData(5, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryStack>
  ))
  .add("stacked bars with mixed lengths (perf)", () => (
    <VictoryStack>
      <VictoryBar data={getData(90)} />
      <VictoryBar data={getData(50, "seed-1")} />
      <VictoryBar data={getData(200, "seed-2")} />
      <VictoryBar data={getData(30, "seed-3")} />
      <VictoryBar data={getData(200, "seed-4")} />
      <VictoryBar data={getData(100, "seed-5")} />
      <VictoryBar data={getData(200, "seed-6")} />
      <VictoryBar data={getData(190, "seed-7")} />
    </VictoryStack>
  ))
  .add("stacked bars with labels", () => (
    <VictoryStack labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("stacked negative bars", () => (
    <VictoryStack labels={({ datum }) => datum.x}>
      <VictoryBar data={getMixedData(7)} />
      <VictoryBar data={getMixedData(7, "seed-1")} />
      <VictoryBar data={getMixedData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("horizontal stacked bars", () => (
    <VictoryStack horizontal labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("horizontal stacked bars with mixed lengths", () => (
    <VictoryStack horizontal>
      <VictoryBar data={getData(9)} />
      <VictoryBar data={getData(5, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryStack>
  ))
  .add("horizontal stacked negative bars", () => (
    <VictoryStack horizontal labels={({ datum }) => datum.x}>
      <VictoryBar data={getMixedData(7)} />
      <VictoryBar data={getMixedData(7, "seed-1")} />
      <VictoryBar data={getMixedData(7, "seed-2")} />
    </VictoryStack>
  ));

storiesOf("VictoryBar.grouped", module)
  .addDecorator(getChartDecorator())
  .add("grouped bars (offset = 20)", () => (
    <VictoryGroup offset={20}>
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("grouped negative bars", () => (
    <VictoryGroup offset={20}>
      <VictoryBar data={getMixedData(3)} />
      <VictoryBar data={getMixedData(3, "seed-1")} />
      <VictoryBar data={getMixedData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("grouped bars with labels", () => (
    <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("grouped bars with tooltips", () => (
    <VictoryGroup
      offset={20}
      labels={({ datum }) => datum.x}
      labelComponent={<VictoryTooltip active />}
    >
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("grouped negative bars with tooltips", () => (
    <VictoryGroup
      offset={20}
      labels={({ datum }) => datum.x}
      labelComponent={<VictoryTooltip active />}
    >
      <VictoryBar data={getMixedData(3)} />
      <VictoryBar data={getMixedData(3, "seed-1")} />
      <VictoryBar data={getMixedData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("grouped stacks", () => (
    <VictoryGroup offset={20} style={{ data: { width: 15 } }} labels={({ datum }) => datum.x}>
      <VictoryStack colorScale="red">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-1")} />
        <VictoryBar data={getData(3, "seed-2")} />
      </VictoryStack>
      <VictoryStack colorScale="green">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-3")} />
        <VictoryBar data={getData(3, "seed-4")} />
      </VictoryStack>
      <VictoryStack colorScale="blue">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-5")} />
        <VictoryBar data={getData(3, "seed-6")} />
      </VictoryStack>
    </VictoryGroup>
  ))
  .add("grouped negative stacks", () => (
    <VictoryGroup offset={20} style={{ data: { width: 15 } }} labels={({ datum }) => datum.x}>
      <VictoryStack colorScale="red">
        <VictoryBar data={getMixedData(3)} />
        <VictoryBar data={getMixedData(3, "seed-1")} />
        <VictoryBar data={getMixedData(3, "seed-2")} />
      </VictoryStack>
      <VictoryStack colorScale="green">
        <VictoryBar data={getMixedData(3)} />
        <VictoryBar data={getMixedData(3, "seed-3")} />
        <VictoryBar data={getMixedData(3, "seed-4")} />
      </VictoryStack>
      <VictoryStack colorScale="blue">
        <VictoryBar data={getMixedData(3)} />
        <VictoryBar data={getMixedData(3, "seed-5")} />
        <VictoryBar data={getMixedData(3, "seed-6")} />
      </VictoryStack>
    </VictoryGroup>
  ))
  .add("horizontal grouped bars (offset = 20)", () => (
    <VictoryGroup offset={20} horizontal>
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("horizontal grouped negative bars", () => (
    <VictoryGroup horizontal offset={20}>
      <VictoryBar data={getMixedData(3)} />
      <VictoryBar data={getMixedData(3, "seed-1")} />
      <VictoryBar data={getMixedData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("horizontal grouped bars with labels", () => (
    <VictoryGroup offset={20} horizontal labels={({ datum }) => datum.x}>
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add(" horizontal grouped negative bars with tooltips", () => (
    <VictoryGroup
      horizontal
      offset={20}
      labels={({ datum }) => datum.x}
      labelComponent={<VictoryTooltip active />}
    >
      <VictoryBar data={getMixedData(3)} />
      <VictoryBar data={getMixedData(3, "seed-1")} />
      <VictoryBar data={getMixedData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("horizontal grouped bars with tooltips", () => (
    <VictoryGroup
      horizontal
      offset={20}
      labels={({ datum }) => datum.x}
      labelComponent={<VictoryTooltip active />}
    >
      <VictoryBar data={getData(3)} />
      <VictoryBar data={getData(3, "seed-1")} />
      <VictoryBar data={getData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add("horizontal grouped stacks", () => (
    <VictoryGroup
      horizontal
      offset={20}
      style={{ data: { width: 15 } }}
      labels={({ datum }) => datum.x}
    >
      <VictoryStack colorScale="red">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-1")} />
        <VictoryBar data={getData(3, "seed-2")} />
      </VictoryStack>
      <VictoryStack colorScale="green">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-3")} />
        <VictoryBar data={getData(3, "seed-4")} />
      </VictoryStack>
      <VictoryStack colorScale="blue">
        <VictoryBar data={getData(3)} />
        <VictoryBar data={getData(3, "seed-5")} />
        <VictoryBar data={getData(3, "seed-6")} />
      </VictoryStack>
    </VictoryGroup>
  ));

storiesOf("VictoryBar.scale", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("time scale", () => <VictoryBar data={getTimeData(5)} />)
  .add("time scale with labels", () => (
    <VictoryBar data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
  ))
  .add("stacked time scale with labels", () => (
    <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
      <VictoryBar data={getTimeData(5)} />
      <VictoryBar data={getTimeData(5, "seed-1")} />
      <VictoryBar data={getTimeData(5, "seed-2")} />
    </VictoryStack>
  ))
  .add("grouped time scale with labels", () => (
    <VictoryGroup offset={20} labels={({ datum }) => datum.x.getFullYear()}>
      <VictoryBar data={getTimeData(3)} />
      <VictoryBar data={getTimeData(3, "seed-1")} />
      <VictoryBar data={getTimeData(3, "seed-2")} />
    </VictoryGroup>
  ))
  .add(" horizontal time scale with labels", () => (
    <VictoryBar horizontal data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
  ))
  .add("horizontal stacked time scale with labels", () => (
    <VictoryStack horizontal labels={({ datum }) => datum.x.getFullYear()}>
      <VictoryBar data={getTimeData(5)} />
      <VictoryBar data={getTimeData(5, "seed-1")} />
      <VictoryBar data={getTimeData(5, "seed-2")} />
    </VictoryStack>
  ))
  .add("horizontal grouped time scale with labels", () => (
    <VictoryGroup horizontal offset={20} labels={({ datum }) => datum.x.getFullYear()}>
      <VictoryBar data={getTimeData(3)} />
      <VictoryBar data={getTimeData(3, "seed-1")} />
      <VictoryBar data={getTimeData(3, "seed-2")} />
    </VictoryGroup>
  ));

storiesOf("VictoryBar.scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" }, domainPadding: 25 }))
  .add("log scale", () => <VictoryBar data={getLogData(7)} />)
  .add(" horizontal log scale", () => <VictoryBar horizontal data={getLogData(7)} />);

storiesOf("VictoryBar.polar", module)
  .add("Polar bar", () => <VictoryBar polar theme={VictoryTheme.material} data={getData(7)} />)
  .add("Polar bar with width", () => (
    <VictoryBar
      polar
      theme={VictoryTheme.material}
      style={{ data: { width: 20 } }}
      data={getData(7)}
    />
  ));

storiesOf("VictoryBar.polar", module)
  .addDecorator(getPolarChartDecorator())
  .add("Polar bar chart", () => <VictoryBar data={getData(7)} />)
  .add("Polar bar chart with alignment", () => <VictoryBar alignment="end" data={getData(7)} />)
  .add("Polar bar chart and width", () => (
    <VictoryBar data={getData(7)} style={{ data: { width: 20 } }} />
  ))
  .add("Polar bar chart with cornerRadius", () => (
    <VictoryBar cornerRadius={10} data={getData(7)} />
  ))
  .add("Polar bar chart with cornerRadius and width", () => (
    <VictoryBar cornerRadius={10} data={getData(7)} style={{ data: { width: 20 } }} />
  ))
  .add("Polar bar chart with categorical data", () => (
    <VictoryBar
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 },
        { x: "Frog", y: 75 }
      ]}
    />
  ))
  .add("Polar stacked bar chart", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("Polar stacked bar chart with width", () => (
    <VictoryStack colorScale="qualitative" style={{ data: { width: 20 } }}>
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("Polar grouped bar chart with width", () => (
    <VictoryGroup offset={25} colorScale="qualitative" style={{ data: { width: 15 } }}>
      <VictoryBar data={getData(5)} />
      <VictoryBar data={getData(5, "seed-1")} />
      <VictoryBar data={getData(5, "seed-2")} />
    </VictoryGroup>
  ));
storiesOf("VictoryBar.polar", module)
  .addDecorator(getPolarChartDecorator({ innerRadius: 50 }))
  .add("Polar bar with innerRadius", () => <VictoryBar data={getData(7)} />)
  .add("Polar stacked bar with innerRadius", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryBar data={getData(7)} />
      <VictoryBar data={getData(7, "seed-1")} />
      <VictoryBar data={getData(7, "seed-2")} />
    </VictoryStack>
  ));
storiesOf("VictoryBar.regressions", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("sorting horizontal bars (ascending)", () => (
    <VictoryBar
      horizontal
      data={[
        { x: "low", y: 1, sort: 1 },
        { x: "med", y: 2, sort: 2 },
        { x: "high", y: 3, sort: 3 }
      ]}
      sortKey={"sort"}
    />
  ))
  .add("sorting horizontal bars (descending)", () => (
    <VictoryBar
      horizontal
      data={[
        { x: "low", y: 1, sort: 3 },
        { x: "med", y: 2, sort: 2 },
        { x: "high", y: 3, sort: 1 }
      ]}
      sortKey={"sort"}
    />
  ))
  .add("horizontal stacked grouped bars with categorical data", () => (
    <VictoryGroup offset={20} style={{ data: { width: 10 } }}>
      <VictoryStack colorScale={"red"}>
        {getStackedData(5, 3, "useStrings").map((data, index) => {
          return <VictoryBar horizontal key={index} data={data} />;
        })}
      </VictoryStack>
      <VictoryStack colorScale={"green"}>
        {getStackedData(5, 3, "useStrings").map((data, index) => {
          return <VictoryBar horizontal key={index} data={data} />;
        })}
      </VictoryStack>
      <VictoryStack colorScale={"blue"}>
        {getStackedData(5, 3, "useStrings").map((data, index) => {
          return <VictoryBar horizontal key={index} data={data} />;
        })}
      </VictoryStack>
    </VictoryGroup>
  ));

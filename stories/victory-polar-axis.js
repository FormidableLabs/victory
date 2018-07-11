/*eslint-disable no-magic-numbers*/
import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { storiesOf } from "@storybook/react";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";

const getTimeValues = (num) => {
  const current = 1523389495000;
  return range(num).map((v) => {
    return new Date((current / (num)) * (v + 1));
  });
};

const getValues = (num, min, step) => {
  min = min || 0;
  step = step || 1;
  return range(num).map((v) => v * step + min);
};

const getRandomValues = (num, seed) => {
  seed = seed || "random";
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(baseSeed.quick() * 100);
  const result = range(num).map(() => rand());
  return result.sort((a, b) => a - b);
};

storiesOf("VictoryPolarAxis", module)
  .add("default rendering", () => <VictoryPolarAxis/>);

storiesOf("VictoryPolarAxis.theme", module)
  .add("material theme", () => <VictoryPolarAxis theme={VictoryTheme.material}/>)
  .add("chart axes material theme", () => <VictoryChart polar theme={VictoryTheme.material}/>)
  .add("grayscale (default) theme", () => <VictoryPolarAxis theme={VictoryTheme.grayscale}/>)
  .add("chart axes grayscale theme", () => <VictoryChart polar theme={VictoryTheme.grayscale}/>);

storiesOf("VictoryPolarAxis.tickValues", module)
  .add("numeric tickValues", () => <VictoryPolarAxis tickValues={getValues(5)}/>)
  .add("random numeric tickValues", () => <VictoryPolarAxis tickValues={getRandomValues(5)}/>)
  .add("string tickValues", () => <VictoryPolarAxis tickValues={["one", "two", "three", "four"]}/>)
  .add("numeric tickValues (dependentAxis)", () => (
    <VictoryPolarAxis dependentAxis tickValues={getValues(5)} theme={VictoryTheme.material}/>
  ))
  .add("random numeric tickValues (dependentAxis)", () => (
    <VictoryPolarAxis dependentAxis tickValues={getRandomValues(5)} theme={VictoryTheme.material}/>
  ))
  .add("string tickValues (dependentAxis)", () => (
    <VictoryPolarAxis dependentAxis theme={VictoryTheme.material}
      tickValues={["one", "two", "three", "four"]}
    />
  ));

storiesOf("VictoryPolarAxis.tickFormat", module)
  .add("as an array of strings", () => (
    <VictoryPolarAxis
      tickValues={getValues(5)}
      tickFormat={["one", "two", "three", "four", "five"]}
    />
  ))
  .add("as a function", () => (
    <VictoryPolarAxis tickValues={getValues(5)} tickFormat={(t) => `#${t}`}/>
  ));

storiesOf("VictoryPolarAxis.domain", module)
  .add("without tickValues", () => <VictoryPolarAxis domain={[-10, 10]}/>)
  .add("with tickValues", () => <VictoryPolarAxis domain={[-10, 10]} tickValues={getValues(5)}/>)
  .add("with overflowing tickValues", () => (
    <VictoryPolarAxis domain={[-10, 10]} tickValues={[8, 9, 10, 11, 12, 13]}/>
  ))
  .add("with overflowing string tickValues", () => (
    <VictoryPolarAxis domain={[-2, 2]} tickValues={["cat", "dog", "bird"]}/>
  ));

storiesOf("VictoryPolarAxis.axisAngle", module)
  .add("axisAngle = 45", () => (
    <VictoryPolarAxis dependentAxis axisAngle={45} theme={VictoryTheme.material}/>
  ))
  .add("axisAngle = 315", () => (
    <VictoryPolarAxis dependentAxis axisAngle={315} theme={VictoryTheme.material}/>
  ))
  .add("axisAngle = 45, endAngle = 180", () => (
    <VictoryPolarAxis dependentAxis axisAngle={45} endAngle={180} theme={VictoryTheme.material}/>
  ));

storiesOf("VictoryPolarAxis.axisValue", module)
  .add("axisValue when used with chart", () => (
    <VictoryChart polar theme={VictoryTheme.material}>
      <VictoryPolarAxis dependentAxis axisValue={1.5} tickValues={getValues(3)}/>
      <VictoryPolarAxis tickValues={getValues(5)}/>
    </VictoryChart>
  ));

storiesOf("VictoryPolarAxis.startAngle and endAngle", module)
  .add("startAngle = 45", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} startAngle={45}/>
  ))
  .add("endAngle = 90", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} endAngle={90}/>
  ))
  .add("rotating the start position", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} startAngle={45} endAngle={360 + 45}/>
  ))
  .add("reversing tickValues", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} startAngle={360 + 180} endAngle={360 - 180}/>
  ));

storiesOf("VictoryPolarAxis.innerRadius", module)
  .add("innerRadius = 50", () => (
    <VictoryChart polar innerRadius={50} theme={VictoryTheme.material}>
      <VictoryPolarAxis dependentAxis tickValues={getValues(5)}/>
      <VictoryPolarAxis tickValues={getValues(5)}/>
    </VictoryChart>
  ));

storiesOf("VictoryPolarAxis.labelPlacement", module)
  .add("parallel", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} labelPlacement="parallel"/>
  ))
  .add("perpendicular", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} labelPlacement="perpendicular"/>
  ))
  .add("vertical", () => (
    <VictoryPolarAxis theme={VictoryTheme.material} labelPlacement="vertical"/>
  ))
  .add("parallel (dependentAxis)", () => (
    <VictoryPolarAxis dependentAxis theme={VictoryTheme.material}
      labelPlacement="parallel" axisAngle={45}
    />
  ))
  .add("perpendicular (dependentAxis)", () => (
    <VictoryPolarAxis dependentAxis theme={VictoryTheme.material}
      labelPlacement="perpendicular" axisAngle={45}
    />
  ))
  .add("vertical (dependentAxis) ", () => (
    <VictoryPolarAxis dependentAxis theme={VictoryTheme.material}
      labelPlacement="vertical" axisAngle={45}
    />
  ));

storiesOf("VictoryPolarAxis.style", module)
  .add("functional styles", () => (
    <VictoryPolarAxis
      label="Label"
      style={{
        axis: { stroke: "#756f6a" },
        axisLabel: { fontSize: 20, padding: 30 },
        grid: { stroke: (t) => t > 0.5 ? "red" : "grey" },
        ticks: { stroke: "grey", size: 5 },
        tickLabels: { fontSize: 15, padding: 5 }
      }}
    />
  ));

storiesOf("VictoryPolarAxis.scale", module)
  .add("time", () => <VictoryPolarAxis tickValues={getTimeValues(5)} scale="time"/>)
  .add("log", () => (
    <VictoryPolarAxis scale="log" tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]}/>
  ));


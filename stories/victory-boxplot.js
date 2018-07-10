/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryBoxPlot } from "../packages/victory-boxplot/src/index";
import { VictoryTooltip, VictoryTheme } from "../packages/victory-core/src/index";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { getArrayData } from "./data";
import { getChartDecorator } from "./decorators";

const getRepeatData = (num, samples, horizontal) => {
  const seed = "getRepeatData";
  samples = samples || 10;
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).reduce((memo, curr) => {
    const sampleData = range(samples).map(() => ({
      x: horizontal ? rand() : curr + 1, y: horizontal ? curr + 1 : rand()
    }));
    return memo.concat(sampleData);
  }, []);
};

const getData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(1 + baseSeed.quick() * 5);
  return range(num).map((v) => {
    const min = rand();
    const q1 = min + rand();
    const median = q1 + rand();
    const q3 = median + rand();
    const max = q3 + rand();
    return { x: v + 1, y: v + 1, min, q1, median, q3, max };
  });
};

storiesOf("VictoryBoxPlot", module)
  .add("default rendering", () => <VictoryBoxPlot/>);

storiesOf("VictoryBoxPlot.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryBoxPlot data={getData(5)}/>);
storiesOf("VictoryBoxPlot.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryBoxPlot data={getData(5)}/>);

storiesOf("VictoryBoxPlot.boxWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("narrow boxWidth", () => <VictoryBoxPlot data={getData(5)} boxWidth={5}/>)
  .add("narrow boxWidth (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getData(5)} boxWidth={5}/>
  ))
  .add("wide boxWidth", () => <VictoryBoxPlot data={getData(5)} boxWidth={35}/>)
  .add("wide boxWidth (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getData(5)} boxWidth={35}/>
  ))
  .add("separate boxWidth and whiskerWidth", () => (
    <VictoryBoxPlot data={getData(5)} boxWidth={35} whiskerWidth={0}/>
  ));

storiesOf("VictoryBoxPlot.whiskerWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("zero whiskerWidth", () => <VictoryBoxPlot data={getData(5)} whiskerWidth={0}/>)
  .add("zero whiskerWidth (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getData(5)} whiskerWidth={0}/>
  ))
  .add("wide whiskerWidth", () => <VictoryBoxPlot data={getData(5)} whiskerWidth={45}/>)
  .add("wide whiskerWidth (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getData(5)} whiskerWidth={45}/>
  ));

storiesOf("VictoryBoxPlot.data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("preprocessed data", () => <VictoryBoxPlot data={getData(5)}/>)
  .add("preprocessed data (horizontal)", () => <VictoryBoxPlot horizontal data={getData(5)}/>)
  .add("data accessors and preprocessed data", () => (
    <VictoryBoxPlot
      data={[
        { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
        { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
        { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 }
      ]}
      x="type" min="Min" max="Max" median="Median" q1="Q1" q3="Q3"
    />
  ))
  .add("data accessors and preprocessed data (horizontal)", () => (
    <VictoryBoxPlot horizontal
      data={[
        { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
        { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
        { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 }
      ]}
      y="type" min="Min" max="Max" median="Median" q1="Q1" q3="Q3"
    />
  ))
  .add("array data", () => <VictoryBoxPlot data={getArrayData(5, 10)}/>)
  .add("array data (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getArrayData(5, 10, "horizontal")}/>
  ))
  .add("repeat data", () => <VictoryBoxPlot data={getRepeatData(5, 10)}/>)
  .add("repeat data (horizontal)", () => (
    <VictoryBoxPlot horizontal data={getRepeatData(5, 10, "horizontal")}/>
  ));


storiesOf("VictoryBoxPlot.labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("global boolean labels", () => <VictoryBoxPlot data={getData(5)} labels/>)
  .add("boolean minLabels", () => <VictoryBoxPlot data={getData(5)} minLabels/>)
  .add("boolean q1Labels", () => <VictoryBoxPlot data={getData(5)} q1Labels/>)
  .add("boolean medianLabels", () => <VictoryBoxPlot data={getData(5)} medianLabels/>)
  .add("boolean q3Labels", () => <VictoryBoxPlot data={getData(5)} q3Labels/>)
  .add("boolean maxLabels", () => <VictoryBoxPlot data={getData(5)} maxLabels/>)
  .add("function minLabels", () => (
    <VictoryBoxPlot horizontal data={getData(5)} minLabels={(d) => `min: ${d.min}`}/>
  ))
  .add("function q1Labels", () => (
    <VictoryBoxPlot horizontal data={getData(5)} q1Labels={(d) => `q1: ${d.q1}`}/>
  ))
  .add("function medianLabels", () => (
    <VictoryBoxPlot horizontal data={getData(5)} medianLabels={(d) => `median: ${d.median}`}/>
  ))
  .add("function q3Labels", () => (
    <VictoryBoxPlot horizontal data={getData(5)} q3Labels={(d) => `q3: ${d.q3}`}/>
  ))
  .add("function maxLabels", () => (
    <VictoryBoxPlot horizontal data={getData(5)} maxLabels={(d) => `max: ${d.max}`}/>
  ));

storiesOf("VictoryBoxPlot.tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("minLabels tooltips", () => (
    <VictoryBoxPlot horizontal
      data={getData(5)}
      minLabels minLabelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("q1Labels tooltips", () => (
    <VictoryBoxPlot horizontal
      data={getData(5)}
      q1Labels q1LabelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("medianLabels tooltips", () => (
    <VictoryBoxPlot horizontal
      data={getData(5)}
      medianLabels medianLabelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("q3Labels tooltips", () => (
    <VictoryBoxPlot horizontal
      data={getData(5)}
      q3Labels q3LabelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("maxLabels tooltips", () => (
    <VictoryBoxPlot horizontal
      data={getData(5)}
      maxLabels maxLabelComponent={<VictoryTooltip active/>}
    />
  ));


storiesOf("VictoryBoxPlot.style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryBoxPlot
      data={getData(4)}
      labels
      style={{
        min: { stroke: "#FF530D", strokeWidth: 2 },
        max: { stroke: "#2bbee0", strokeWidth: 2 },
        q1: { fill: "#FF530D", fillOpacity: 0.5 },
        q3: { fill: "#2bbee0", fillOpacity: 0.5 },
        median: { stroke: "#fff", strokeWidth: 2 },
        minLabels: { fill: "#FF530D", padding: 10 },
        maxLabels: { fill: "#2bbee0", padding: 10 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryBoxPlot
      data={getData(4)}
      labels
      style={{
        min: { stroke: "#FF530D", strokeWidth: 2 },
        max: { stroke: "#2bbee0", strokeWidth: 2 },
        q1: { fill: "#FF530D", fillOpacity: (d) => d.q1 < 10 ? 1 : 0.5 },
        q3: { fill: "#2bbee0", fillOpacity: (d) => d.q3 > 15 ? 1 : 0.5 },
        median: { stroke: "#fff", strokeWidth: 2 },
        minLabels: { fill: "#FF530D", padding: 10 },
        maxLabels: { fill: "#2bbee0", padding: 10 }
      }}
    />
  ));


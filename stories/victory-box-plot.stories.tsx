import styled from "styled-components";
import { Meta } from "@storybook/react";
import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";

import { VictoryBoxPlot } from "../packages/victory-box-plot";
import { VictoryChart } from "../packages/victory-chart";
import { VictoryTooltip } from "../packages/victory-tooltip";
import { VictoryGroup } from "../packages/victory-group";
import {
  VictoryTheme,
  Box,
  Whisker,
  LineSegment,
} from "../packages/victory-core";
import { getArrayData } from "./data";
import { storyContainer } from "./decorators";

const meta: Meta = {
  title: "Victory Charts/SVG Container/VictoryBoxPlot",
  component: VictoryBoxPlot,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const getRepeatData = (num, samples = 10) => {
  const seed = "getRepeatData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).reduce((memo, curr) => {
    const sampleData = range(samples).map(() => ({
      x: curr + 1,
      y: rand(),
    }));
    return memo.concat(sampleData);
  }, [] as any);
};

const getData = (num, seed = "getData") => {
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

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const defaultChartProps = {
  style: parentStyle,
  domainPadding: 25,
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryBoxPlot style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryBoxPlot data={getData(8)} />
      </VictoryChart>
      <VictoryBoxPlot style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryBoxPlot data={getData(8)} />
      </VictoryChart>
    </>
  );
};

export const BoxWidth = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} boxWidth={5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getData(5)} boxWidth={5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} boxWidth={35} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getData(5)} boxWidth={35} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} boxWidth={35} whiskerWidth={0} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} boxWidth={0} />
      </VictoryChart>
    </>
  );
};

export const WhiskerWidth = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} whiskerWidth={0} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getData(5)} whiskerWidth={0} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(5)} whiskerWidth={45} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getData(5)} whiskerWidth={45} />
      </VictoryChart>
    </>
  );
};

export const Data = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot
          data={[
            { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
            { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
            { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 },
          ]}
          x="type"
          min="Min"
          max="Max"
          median="Median"
          q1="Q1"
          q3="Q3"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot
          data={[
            { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
            { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
            { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 },
          ]}
          x="type"
          min="Min"
          max="Max"
          median="Median"
          q1="Q1"
          q3="Q3"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getArrayData(5, 10)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getArrayData(5, 10)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getRepeatData(5, 10)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getRepeatData(5, 10)} />
      </VictoryChart>
    </>
  );
};

export const Labels = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(3)} labels />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot data={getData(3)} labels />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(3)} minLabels maxLabels medianLabels />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot data={getData(3)} q1Labels q3Labels />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot
          data={getData(3)}
          minLabels={({ datum }) => `min: ${datum.min}`}
          maxLabels={({ datum }) => `max: ${datum.max}`}
          medianLabels={({ datum }) => `med: ${datum.median}`}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot
          data={getData(3)}
          q1Labels={({ datum }) => `q1: ${datum.q1}`}
          q3Labels={({ datum }) => `q3: ${datum.q3}`}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot
          data={getData(3)}
          labels
          labelOrientation={{
            q1: "left",
            q3: "left",
            min: "right",
            max: "right",
            median: "right",
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot
          data={getData(3)}
          labels
          labelOrientation={{
            q1: "top",
            q3: "top",
            min: "bottom",
            max: "bottom",
            median: "bottom",
          }}
        />
      </VictoryChart>
    </>
  );
};

export const Tooltips = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBoxPlot
          data={getData(3)}
          labels
          minLabelComponent={<VictoryTooltip active />}
          q3LabelComponent={<VictoryTooltip active />}
          labelOrientation={{
            q1: "left",
            q3: "left",
            min: "right",
            max: "right",
            median: "right",
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot
          data={getData(3)}
          labels
          minLabelComponent={<VictoryTooltip active />}
          q3LabelComponent={<VictoryTooltip active />}
          labelOrientation={{
            q1: "top",
            q3: "top",
            min: "bottom",
            max: "bottom",
            median: "bottom",
          }}
        />
      </VictoryChart>
    </>
  );
};

export const Style = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
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
            maxLabels: { fill: "#2bbee0", padding: 10 },
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBoxPlot
          data={getData(4)}
          labels
          style={{
            min: { stroke: "#FF530D", strokeWidth: 2 },
            max: { stroke: "#2bbee0", strokeWidth: 2 },
            q1: {
              fill: "#FF530D",
              fillOpacity: ({ datum }) => (datum.q1 < 10 ? 1 : 0.5),
            },
            q3: {
              fill: "#2bbee0",
              fillOpacity: ({ datum }) => (datum.q3 > 15 ? 1 : 0.5),
            },
            median: { stroke: "#fff", strokeWidth: 2 },
            minLabels: { fill: "#FF530D", padding: 10 },
            maxLabels: { fill: "#2bbee0", padding: 10 },
          }}
        />
      </VictoryChart>
    </>
  );
};

export const Domain = () => {
  return (
    <>
      <VictoryBoxPlot
        style={parentStyle}
        data={getArrayData(5, 10)}
        domain={{ x: [3, 5.5], y: [0, 10] }}
      />
      <VictoryChart {...defaultChartProps} domain={{ x: [3, 5.5], y: [0, 10] }}>
        <VictoryBoxPlot data={getArrayData(5, 10)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} minDomain={{ y: 2 }}>
        <VictoryBoxPlot data={getArrayData(5, 10)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} maxDomain={{ x: 4 }}>
        <VictoryBoxPlot data={getArrayData(5, 10)} />
      </VictoryChart>
    </>
  );
};

const StyledBox = styled(Box)`
  fill: blueviolet;
`;

const StyledWhisker = styled(Whisker)`
  stroke: aqua;
`;

const StyledLineSegment = styled(LineSegment)`
  stroke: lavender;
`;

export const DisableInlineStyles = () => {
  return (
    <>
      <VictoryChart style={parentStyle}>
        <VictoryBoxPlot disableInlineStyles data={getData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryBoxPlot
          data={getData(8)}
          q1Component={<StyledBox disableInlineStyles />}
          q3Component={<StyledBox disableInlineStyles />}
          maxComponent={<StyledWhisker disableInlineStyles />}
          minComponent={<StyledWhisker disableInlineStyles />}
          medianComponent={<StyledLineSegment disableInlineStyles />}
        />
      </VictoryChart>
    </>
  );
};

export const VictoryGroupAsParent = () => {
  return (
    <VictoryGroup style={parentStyle}>
      <VictoryBoxPlot
        minLabels
        maxLabels
        data={[
          { x: 1, y: [1, 2, 3, 5] },
          { x: 2, y: [3, 2, 8, 10] },
          { x: 3, y: [2, 8, 6, 5] },
          { x: 4, y: [1, 3, 2, 9] },
        ]}
        style={{
          min: { stroke: "tomato" },
          max: { stroke: "orange" },
          q1: { fill: "tomato" },
          q3: { fill: "orange" },
          median: { stroke: "white", strokeWidth: 2 },
          minLabels: { fill: "tomato" },
          maxLabels: { fill: "orange" },
        }}
      />
    </VictoryGroup>
  );
};

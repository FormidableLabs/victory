/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryChart } from "victory-chart";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryTheme, Box, Whisker, LineSegment } from "victory-core";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { getArrayData } from "./data";
import styled from "styled-components";

const getRepeatData = (num, samples) => {
  const seed = "getRepeatData";
  samples = samples || 10;
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).reduce((memo, curr) => {
    const sampleData = range(samples).map(() => ({
      x: curr + 1,
      y: rand(),
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

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const defaultChartProps = {
  style: parentStyle,
  domainPadding: 25,
};

export default {
  title: "VictoryBoxPlot",
  component: VictoryBoxPlot,
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryBoxPlot style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryBoxPlot data={getData(8)} />
      </VictoryChart>
      <VictoryBoxPlot style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryBoxPlot data={getData(8)} />
      </VictoryChart>
    </div>
  );
};

export const BoxWidth = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const WhiskerWidth = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Data = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Tooltips = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Style = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Domain = () => {
  return (
    <div style={containerStyle}>
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
    </div>
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
    <div style={containerStyle}>
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
    </div>
  );
};

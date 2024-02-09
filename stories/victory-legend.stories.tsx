import React from "react";
import { VictoryStyleInterface } from "../packages/victory-core";
import { VictoryAxis } from "../packages/victory-axis";
import { VictoryChart, VictoryChartProps } from "../packages/victory-chart";
import { VictoryLegend } from "../packages/victory-legend";
import { range } from "lodash";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryLegend> = {
  title: "Victory Charts/SVG Container/VictoryLegend",
  component: VictoryLegend,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  data: { fill: "gold", width: 20 },
};

const defaultChartProps: VictoryChartProps = {
  style,
  width: 300,
  height: 300,
  domain: [0, 10],
};

const legendStyle: VictoryStyleInterface = {
  labels: { fontSize: 14, fontFamily: "Arial" },
  border: { fill: "pink", opacity: 0.4 },
};

const getData = (num) => {
  return range(num).map((v) => ({
    name: `Series ${v + 1}`,
    symbol: {
      size: 5,
      type: "circle",
      fill: undefined,
    },
  }));
};

const Wrapper = ({ children }) => {
  return (
    <VictoryChart {...defaultChartProps}>
      <VictoryAxis />
      {children}
    </VictoryChart>
  );
};

export const DefaultRendering = () => {
  return (
    <>
      <Wrapper>
        <VictoryLegend />
      </Wrapper>
      <Wrapper>
        <VictoryLegend orientation="horizontal" />
      </Wrapper>
    </>
  );
};

export const LineHeight = () => {
  return (
    <>
      <Wrapper>
        <VictoryLegend
          orientation="vertical"
          rowGutter={0}
          style={{
            labels: { lineHeight: 0.275 },
          }}
          data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          orientation="vertical"
          rowGutter={0}
          style={{
            labels: { lineHeight: 0.75 },
          }}
          data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        />
      </Wrapper>
    </>
  );
};

export const Title = () => {
  return (
    <>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
          itemsPerRow={3}
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
          style={{ ...legendStyle, title: { padding: 20 } }}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          style={legendStyle}
          titleOrientation="bottom"
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          style={legendStyle}
          titleOrientation="left"
          centerTitle
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          titleOrientation="right"
          style={{ ...legendStyle, title: { padding: 20 } }}
        />
      </Wrapper>
    </>
  );
};

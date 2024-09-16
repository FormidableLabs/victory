import React from "react";
import { VictoryStyleInterface } from "../packages/victory-core";
import { VictoryAxis } from "../packages/victory-axis";
import { VictoryChart, VictoryChartProps } from "../packages/victory-chart";
import { VictoryLegend } from "../packages/victory-legend";
import { range } from "lodash";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";
import { FaSun, FaMoon, FaFootballBall } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

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

const CustomIconSun = (props) => {
  const x = props.x - 11;
  const y = props.y - 11;
  return <FaSun {...props} size={20} x={x} y={y} />;
};

const CustomIconMoon = (props) => {
  const x = props.x - 8;
  const y = props.y - 8;
  return <FaMoon {...props} fill={"orange"} x={x} y={y} size={15} />;
};

const CustomIconEarth = (props) => {
  const x = props.x - 7;
  const y = props.y - 7;
  return <FaEarthAmericas {...props} x={x} y={y} size={14} />;
};

export const CustomIcon = () => {
  return (
    <Wrapper>
      <VictoryLegend
        orientation="vertical"
        rowGutter={0}
        style={{
          labels: { lineHeight: 0.275 },
        }}
        symbolSpacer={18}
        data={[
          { name: "One", symbol: { type: <CustomIconSun />, fill: "red" } },
          { name: "Two", symbol: { type: <CustomIconMoon /> } },
          { name: "Three", symbol: { type: "star", fill: "brown", size: 6 } },
          { name: "Four", symbol: { type: <CustomIconEarth /> } },
          {
            name: "Five",
            symbol: {
              type: (props) => {
                const x = props.x - 8;
                const y = props.y - 10;
                return <FaFootballBall {...props} x={x} y={y} size={15} />;
              },
              fill: "red",
            },
          },
        ]}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: () => ({ symbol: "star" }),
                  },
                ];
              },
            },
          },
        ]}
      />
    </Wrapper>
  );
};

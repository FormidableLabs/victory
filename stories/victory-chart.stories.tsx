import React from "react";

import { VictoryChart } from "../packages/victory-chart";
import { VictoryAxis } from "../packages/victory-axis";
import { VictoryBar } from "../packages/victory-bar";
import { VictoryBrushContainer } from "../packages/victory-brush-container";
import { VictoryCursorContainer } from "../packages/victory-cursor-container";
import { VictoryGroup } from "../packages/victory-group";
import { VictoryScatter } from "../packages/victory-scatter";
import { VictoryLine } from "../packages/victory-line";
import { VictoryBoxPlot } from "../packages/victory-box-plot";
import { VictoryPolarAxis } from "../packages/victory-polar-axis";
import { VictoryStack } from "../packages/victory-stack";
import { VictoryTheme } from "../packages/victory-core";
import { VictoryZoomContainer } from "../packages/victory-zoom-container";

import { getData, getFourQuadrantData, getArrayData } from "./data";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryChart> = {
  title: "Victory Charts/SVG Container/VictoryChart",
  component: VictoryChart,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const dependentAxisTheme = {
  ...VictoryTheme.material,
  ...{ dependentAxis: { orientation: "right" } },
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryChart style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryLine data={getFourQuadrantData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine data={getFourQuadrantData(8)} />
      </VictoryChart>
    </>
  );
};

export const Axes = () => {
  return (
    <>
      <VictoryChart style={parentStyle}>
        <VictoryAxis />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryAxis dependentAxis />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryAxis />
        <VictoryAxis orientation="top" />
        <VictoryAxis dependentAxis />
        <VictoryAxis dependentAxis orientation="right" />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={dependentAxisTheme}>
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </>
  );
};

export const DomainPadding = () => {
  return (
    <>
      <VictoryChart style={parentStyle} domainPadding={25}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal domainPadding={25}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} domainPadding={{ x: [25, 0], y: 25 }}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        style={parentStyle}
        horizontal
        domainPadding={{ x: [25, 0], y: 25 }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        style={parentStyle}
        domainPadding={{ x: 100 }}
        singleQuadrantDomainPadding={false}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        horizontal
        style={parentStyle}
        domainPadding={{ x: 100 }}
        singleQuadrantDomainPadding={false}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
    </>
  );
};

export const Domain = () => {
  return (
    <>
      <VictoryChart style={parentStyle} domain={[0, 10]}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal domain={[0, 10]}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} domain={{ x: [0, 6], y: [0, 10] }}>
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        style={parentStyle}
        horizontal
        domain={{ x: [0, 6], y: [0, 10] }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} minDomain={1} maxDomain={7}>
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal minDomain={1} maxDomain={7}>
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart
        style={parentStyle}
        minDomain={{ x: 50 }}
        maxDomain={{ y: 7 }}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart
        style={parentStyle}
        horizontal
        minDomain={{ x: 50 }}
        maxDomain={{ y: 7 }}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
    </>
  );
};

export const DomainFromData = () => {
  return (
    <>
      <VictoryChart style={parentStyle}>
        <VictoryScatter size={5} symbol="plus" data={getData(10)} />
        <VictoryScatter
          size={5}
          symbol="triangleUp"
          data={getFourQuadrantData(10)}
        />
        <VictoryLine
          samples={100}
          y={(d) => 10 * Math.sin(13 * Math.PI * d.x)}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryScatter size={5} symbol="plus" data={getData(10)} />
        <VictoryScatter
          size={5}
          symbol="triangleUp"
          data={getFourQuadrantData(10)}
        />
        <VictoryLine
          samples={100}
          y={(d) => 10 * Math.sin(13 * Math.PI * d.x)}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryAxis tickValues={[-10, -5, 5, 10]} />
        <VictoryAxis dependentAxis tickValues={[-5, 5]} />
        <VictoryScatter data={getData(10)} />
        <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryAxis tickValues={[-10, -5, 5, 10]} />
        <VictoryAxis dependentAxis tickValues={[-5, 5]} />
        <VictoryScatter data={getData(10)} />
        <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          size={6}
          symbol="star"
          data={[
            { x: "cat", y: 2 },
            { x: "dog", y: 3 },
            { x: "bird", y: 1 },
            { x: "frog", y: 4 },
          ]}
        />
        <VictoryScatter
          size={6}
          symbol="square"
          data={[
            { x: "cat", y: 3 },
            { x: "mouse", y: 3 },
            { x: "bird", y: 5 },
            { x: "frog", y: 7 },
            { x: "dog", y: 1 },
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryScatter
          size={6}
          symbol="star"
          data={[
            { x: "cat", y: 2 },
            { x: "dog", y: 3 },
            { x: "bird", y: 1 },
            { x: "frog", y: 4 },
          ]}
        />
        <VictoryScatter
          size={6}
          symbol="square"
          data={[
            { x: "cat", y: 3 },
            { x: "mouse", y: 3 },
            { x: "bird", y: 5 },
            { x: "frog", y: 7 },
            { x: "dog", y: 1 },
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryBoxPlot data={getArrayData(5)} />
        <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryBoxPlot data={getArrayData(5)} />
        <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
      </VictoryChart>
    </>
  );
};

export const Style = () => {
  return (
    <>
      <VictoryChart
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
        }}
      />
      <VictoryChart
        polar
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
        }}
      >
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      />
      <VictoryChart
        polar
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        horizontal
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryGroup
          labels={["a", "b", "c"]}
          offset={20}
          colorScale={"qualitative"}
        >
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart
        polar
        domainPadding={{ y: 30 }}
        innerRadius={30}
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryGroup
          labels={["a", "b", "c"]}
          offset={20}
          colorScale={"qualitative"}
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        domainPadding={{ x: 17 }}
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryStack labels={["a", "b", "c"]} colorScale={"qualitative"}>
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        polar
        domainPadding={{ y: 30 }}
        style={{
          parent: {
            border: "5px solid #000",
            margin: "2%",
            maxWidth: "40%",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryStack
          labels={["a", "b", "c"]}
          colorScale={"qualitative"}
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  );
};

export const Orientations = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        padding={{ left: 20, right: 30, top: 15, bottom: 40 }}
      >
        <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
        <VictoryAxis
          orientation="left"
          dependentAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8]}
        />
        <VictoryAxis
          orientation="right"
          dependentAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 7 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 2 },
          ]}
        />
      </VictoryChart>
    </>
  );
};

export const VictoryBrushContainerDefault = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        containerComponent={<VictoryBrushContainer />}
      />
    </>
  );
};

export const VictoryBrushContainerWithDomain = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        containerComponent={
          <VictoryBrushContainer brushDomain={{ x: [0, 0.5], y: [0.5, 1] }} />
        }
      />
    </>
  );
};

export const VictoryBrushContainerWithDomainHorizontal = () => {
  return (
    <>
      <VictoryChart
        horizontal
        style={parentStyle}
        containerComponent={
          <VictoryBrushContainer brushDomain={{ x: [0, 0.5], y: [0.5, 1] }} />
        }
      />
    </>
  );
};

export const VictoryBrushContainerWithBrushStyle = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        containerComponent={
          <VictoryBrushContainer
            brushStyle={{ fill: "teal", stroke: "teal", fillOpacity: 0.2 }}
          />
        }
      />
    </>
  );
};

export const VictoryCursorContainerDefault = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => datum.x}
            defaultCursorValue={{ x: 0.25, y: 0.75 }}
          />
        }
      />
    </>
  );
};

export const VictoryCursorContainerHorizontal = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        horizontal
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => datum.x}
            defaultCursorValue={{ x: 0.25, y: 0.75 }}
          />
        }
      />
    </>
  );
};

export const VictoryZoomContainerDefault = () => {
  return (
    <>
      <VictoryChart
        style={parentStyle}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={{ x: [new Date(1993, 1, 1), new Date(2005, 1, 1)] }}
            dimension="x"
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "red", strokeWidth: 5 },
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 },
          ]}
        />
      </VictoryChart>
    </>
  );
};

/* eslint-disable no-magic-numbers*/
/* eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryGroup } from "victory-group";
import { VictoryScatter } from "victory-scatter";
import { VictoryLine } from "victory-line";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryPolarAxis } from "victory-polar-axis";
import { VictoryStack } from "victory-stack";
import { VictoryTheme } from "victory-core";
import { getData, getFourQuadrantData, getArrayData } from "./data";

const dependentAxisTheme = {
  ...VictoryTheme.material,
  ...{ dependentAxis: { orientation: "right" } },
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

export default {
  title: "VictoryChart",
  component: VictoryChart,
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryLine data={getFourQuadrantData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine data={getFourQuadrantData(8)} />
      </VictoryChart>
    </div>
  );
};

export const Axes = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const DomainPadding = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Domain = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const DomainFromData = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Style = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Orientations = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

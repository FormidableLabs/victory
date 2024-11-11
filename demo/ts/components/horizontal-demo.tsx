 

import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryScatter } from "victory-scatter";
import { VictoryLine } from "victory-line";
import { VictoryArea } from "victory-area";
import { VictoryCandlestick } from "victory-candlestick";
import { VictoryErrorBar } from "victory-errorbar";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryAxis } from "victory-axis";
import { VictoryBrushContainer } from "victory-brush-container";
import { range, random } from "lodash";
import { VictoryTheme } from "victory-core";

const errorData = [
  { x: 1, y: 10, errorX: [1, 0.5], errorY: 1 },
  { x: 2, y: 20, errorX: [0.5, 3], errorY: 1 },
  { x: 3, y: 30, errorX: [1, 3], errorY: [2, 3] },
  { x: 4, y: 20, errorX: [1, 0], errorY: 2 },
  { x: 5, y: 10, errorX: [1, 0.5], errorY: 2 },
];

const themeColors = VictoryTheme.clean.palette?.colors || {};

class App extends React.Component {
  getBarData() {
    return range(5).map(() => {
      return [
        { x: "cat", y: random(10) },
        { x: "dog", y: random(10) },
        { x: "bird", y: random(10) },
      ];
    });
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };
    return (
      <div style={containerStyle}>
        <VictoryChart
          horizontal
          scale={{ y: "log" }}
          style={chartStyle}
          theme={VictoryTheme.clean}
          domainPadding={20}
        >
          <VictoryBar
            style={{
              data: {
                fill: themeColors.green,
              },
            }}
            data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 0 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          scale={{ y: "log" }}
          style={chartStyle}
          theme={VictoryTheme.clean}
        >
          <VictoryArea
            data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 0 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          theme={VictoryTheme.clean}
          style={chartStyle}
          domainPadding={20}
        >
          <VictoryBar
            style={{
              data: {
                fill: themeColors.orange,
              },
            }}
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 3, sort: 3 },
            ]}
            sortKey={"sort"}
            labels={() => "hi"}
          />
          <VictoryLine
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 4, sort: 3 },
            ]}
            sortKey={"sort"}
          />
          <VictoryScatter
            style={{
              data: {
                fill: themeColors.cyan,
              },
            }}
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 4, sort: 3 },
            ]}
            sortKey={"sort"}
          />
        </VictoryChart>
        <VictoryChart
          style={chartStyle}
          theme={VictoryTheme.clean}
          domainPadding={20}
        >
          <VictoryBar
            style={{
              data: {
                fill: themeColors.red,
              },
            }}
            horizontal
            data={[
              { x: "low", y: 1, sort: 3 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 3, sort: 1 },
            ]}
            sortKey={"sort"}
          />
        </VictoryChart>

        <VictoryChart style={chartStyle} theme={VictoryTheme.clean}>
          <VictoryBar
            style={{
              data: {
                fill: themeColors.yellow,
              },
            }}
            horizontal
            alignment="start"
            data={[
              { x: 2, y: "Echo" },
              { x: 6, y: "Foxtrot" },
              { x: 3, y: "Golf" },
              { x: 4, y: "Hotel" },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          style={chartStyle}
          domainPadding={{ x: 30 }}
          theme={VictoryTheme.clean}
        >
          <VictoryGroup offset={20}>
            <VictoryStack colorScale={"red"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"green"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"blue"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart
          horizontal
          style={chartStyle}
          theme={VictoryTheme.clean}
          domainPadding={20}
        >
          <VictoryStack labels={["a", "b", "c"]} colorScale={"qualitative"}>
            <VictoryBar
              data={[
                { x: "a", y: 1 },
                { x: "b", y: 2 },
                { x: "c", y: 5 },
              ]}
            />
            <VictoryBar
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 1 },
                { x: "c", y: 7 },
              ]}
            />
            <VictoryBar
              data={[
                { x: "a", y: 3 },
                { x: "b", y: 4 },
                { x: "c", y: 9 },
              ]}
            />
          </VictoryStack>
        </VictoryChart>

        <VictoryChart horizontal style={chartStyle} theme={VictoryTheme.clean}>
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

        <VictoryGroup
          horizontal
          style={chartStyle}
          labels={["a", "b", "c"]}
          offset={20}
          theme={VictoryTheme.clean}
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

        <VictoryArea
          theme={VictoryTheme.clean}
          horizontal
          style={{
            parent: chartStyle.parent,
            data: { fill: themeColors.green },
          }}
          labels={() => "yo"}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: null },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 },
          ]}
        />
        <VictoryChart
          horizontal
          style={chartStyle}
          scale={{ x: "time" }}
          theme={VictoryTheme.clean}
        >
          <VictoryLine
            data={[
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: null },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 },
            ]}
          />
        </VictoryChart>
        <VictoryBar
          theme={VictoryTheme.clean}
          horizontal
          style={{
            ...chartStyle,
            data: { fill: themeColors.red },
          }}
          labels={() => "yo"}
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
        <VictoryChart horizontal style={chartStyle} theme={VictoryTheme.clean}>
          <VictoryStack>
            <VictoryArea
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 4 },
                { x: 3, y: 5 },
                { x: 4, y: 7 },
                { x: 5, y: 5 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 2 },
                { x: 3, y: 6 },
                { x: 4, y: 2 },
                { x: 5, y: 6 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
          </VictoryStack>
        </VictoryChart>

        <VictoryChart
          style={chartStyle}
          horizontal
          theme={VictoryTheme.clean}
          domainPadding={20}
        >
          <VictoryCandlestick
            labels={() => "yo"}
            data={[
              { x: new Date(2014, 6, 1), open: 9, close: 30, high: 56, low: 7 },
              {
                x: new Date(2015, 6, 2),
                open: 80,
                close: 40,
                high: 120,
                low: 10,
              },
              {
                x: new Date(2016, 6, 3),
                open: 50,
                close: 80,
                high: 90,
                low: 20,
              },
              {
                x: new Date(2017, 6, 4),
                open: 70,
                close: 22,
                high: 70,
                low: 5,
              },
              {
                x: new Date(2018, 6, 5),
                open: 20,
                close: 35,
                high: 50,
                low: 10,
              },
              {
                x: new Date(2019, 6, 6),
                open: 35,
                close: 30,
                high: 40,
                low: 3,
              },
              {
                x: new Date(2020, 6, 7),
                open: 30,
                close: 90,
                high: 95,
                low: 30,
              },
              {
                x: new Date(2021, 6, 8),
                open: 80,
                close: 81,
                high: 83,
                low: 75,
              },
            ]}
          />
        </VictoryChart>

        <VictoryChart horizontal style={chartStyle} theme={VictoryTheme.clean}>
          <VictoryErrorBar data={errorData} labels={() => "yo"} />
          <VictoryScatter data={errorData} />
          <VictoryAxis dependentAxis />
          <VictoryAxis crossAxis={false} />
        </VictoryChart>

        <VictoryChart horizontal style={chartStyle} theme={VictoryTheme.clean}>
          <VictoryLine
            y={(d) => Math.sin(2 * Math.PI * d.x)}
            samples={25}
            style={{
              data: {
                stroke: themeColors.green,
              },
            }}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          style={chartStyle}
          domain={{ y: [100, 550] }}
          theme={VictoryTheme.clean}
          domainPadding={20}
        >
          <VictoryBar
            labels={() => "yo"}
            data={[
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: null },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          style={chartStyle}
          horizontal
          categories={{ y: ["E", "F", "G", "H"] }}
          theme={VictoryTheme.clean}
        >
          <VictoryLine
            style={{
              data: { stroke: themeColors.teal },
            }}
            data={[
              { x: 6, y: "E" },
              { x: 2, y: "F" },
              { x: 7, y: "G" },
              { x: 3, y: "H" },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          style={chartStyle}
          domainPadding={20}
          theme={VictoryTheme.clean}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            boxWidth={10}
            data={[
              { x: new Date(1980, 1, 1), y: [5, 10, 9, 2] },
              { x: new Date(1990, 1, 1), y: [1, 15, 6, 8] },
              { x: new Date(2000, 1, 1), y: [3, 5, 6, 9] },
              { x: new Date(2010, 1, 1), y: [5, 20, 8, 12] },
              { x: new Date(2020, 1, 1), y: [2, 11, 12, 13] },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          style={chartStyle}
          theme={VictoryTheme.clean}
          containerComponent={
            <VictoryBrushContainer brushDomain={{ x: [2, 4], y: [-2, 2] }} />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: themeColors.teal },
            }}
            data={[
              { x: 1, y: -5 },
              { x: 2, y: 4 },
              { x: 3, y: 2 },
              { x: 4, y: 3 },
              { x: 5, y: 1 },
              { x: 6, y: -3 },
              { x: 7, y: 3 },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: themeColors.purple },
            }}
            data={[
              { x: 1, y: -3 },
              { x: 2, y: 5 },
              { x: 3, y: 3 },
              { x: 4, y: 0 },
              { x: 5, y: -2 },
              { x: 6, y: -2 },
              { x: 7, y: 5 },
            ]}
          />
          <VictoryLine
            data={[
              { x: 1, y: 5 },
              { x: 2, y: -4 },
              { x: 3, y: -2 },
              { x: 4, y: -3 },
              { x: 5, y: -1 },
              { x: 6, y: 3 },
              { x: 7, y: -3 },
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;

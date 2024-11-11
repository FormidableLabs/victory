import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryCandlestick } from "victory-candlestick";
import { VictoryTheme } from "victory-core";

interface VictoryCandlestickDemoState {
  data: {
    x?: number;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
    size?: number;
    fill?: string;
    opacity?: number;
  }[];
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const style: { [key: string]: React.CSSProperties } = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const data = [
  { x: new Date(2016, 6, 1), open: 9, close: 30, high: 56, low: 7 },
  { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
  { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 },
  { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 },
];

export default class VictoryCandlestickDemo extends React.Component<
  any,
  VictoryCandlestickDemoState
> {
  render() {
    return (
      <div className="demo" style={containerStyle}>
        <VictoryCandlestick
          theme={VictoryTheme.clean}
          style={{ data: { width: 10 }, parent: style.parent }}
          labels={({ datum }) => `x: ${datum.x.getDate()}`}
          labelOrientation={{ low: "bottom", high: "top" }}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          lowLabels={({ datum }) => datum.low}
          highLabels={({ datum }) => datum.high}
          data={data}
          size={8}
          events={[
            {
              target: "highLabels",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style.labels, {
                            fill: "orange",
                          }),
                        };
                      },
                    },
                  ];
                },
              },
            },
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: "blue",
                          }),
                        };
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        <VictoryCandlestick
          horizontal
          style={{ parent: style.parent }}
          labels={({ datum }) => `x: ${datum.x.getDate()}`}
          labelOrientation={{ low: "left", high: "right" }}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          lowLabels={({ datum }) => datum.low}
          highLabels={({ datum }) => datum.high}
          data={data}
          theme={VictoryTheme.clean}
          size={8}
          events={[
            {
              target: "labels",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style.labels, {
                            fill: "orange",
                          }),
                        };
                      },
                    },
                  ];
                },
              },
            },
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: "blue",
                          }),
                        };
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        <VictoryChart
          scale={{ x: "time" }}
          style={style}
          domainPadding={{ x: [20, 50] }}
          theme={VictoryTheme.clean}
        >
          <VictoryCandlestick
            candleColors={{
              positive: VictoryTheme.clean?.palette?.colors?.green,
              negative: VictoryTheme.clean?.palette?.colors?.red,
            }}
            data={data}
            style={{ data: { stroke: "none" } }}
            size={8}
          />
        </VictoryChart>

        <VictoryChart
          scale={{ x: "time" }}
          style={style}
          domainPadding={{ x: [20, 50] }}
          theme={VictoryTheme.clean}
        >
          <VictoryCandlestick
            candleColors={{
              positive: VictoryTheme.clean?.palette?.colors?.green,
              negative: VictoryTheme.clean?.palette?.colors?.red,
            }}
            data={data}
            style={{ data: { stroke: "none" }, closeLabels: { fill: "blue" } }}
            size={8}
            openLabels={({ datum }) => datum.open}
            closeLabels={({ datum }) => datum.close}
            lowLabels={({ datum }) => datum.low}
            highLabels={({ datum }) => datum.high}
            labelOrientation={{ open: "top", high: "top" }}
          />
        </VictoryChart>

        <VictoryCandlestick style={style} size={1} theme={VictoryTheme.clean} />
      </div>
    );
  }
}

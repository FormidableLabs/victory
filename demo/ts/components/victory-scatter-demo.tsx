/* eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { random, range } from "lodash";
import { VictoryScatter } from "victory-scatter";
import {
  ScatterSymbolType,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
} from "victory-core";
import bubbleData from "./bubble-data";
import symbolData from "./symbol-data";

type DataType = {
  x?: string | number;
  y?: string | number;
  label?: string;
  fill?: string;
  size?: number;
  symbol?: string;
}[];

interface VictoryScatterDemoState {
  hoverStyle: {
    fill: string;
  };
  data: DataType;
}

interface CatPointInterface {
  symbol: string;
  x: number;
  y: number;
}

const getData = () => {
  const colors = [
    "violet",
    "cornflowerblue",
    "gold",
    "orange",
    "turquoise",
    "tomato",
    "greenyellow",
  ];
  const symbols = [
    "circle",
    "star",
    "square",
    "triangleUp",
    "triangleDown",
    "diamond",
    "plus",
  ];
  // symbol: symbols[scaledIndex],
  return range(100).map((index) => {
    const scaledIndex = Math.floor(index % 7);
    return {
      x: random(600),
      y: random(600),
      size: random(15) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[random(0, 6)],
      opacity: random(0.3, 1),
    };
  });
};

const style: { [key: string]: React.CSSProperties } = {
  parent: {
    border: "1px solid #ccc",
    margin: "2%",
    maxWidth: "40%",
  },
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const symbolStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
  data: {
    fill: "red",
  },
  labels: {
    padding: 15,
    fontSize: 15,
    fill: "grey",
  },
};

class CatPoint extends React.Component<any, CatPointInterface> {
  static propTypes = {
    symbol: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static symbolMap = {
    circle: 0x1f431,
    diamond: 0x1f638,
    plus: 0x1f639,
    square: 0x1f63a,
    star: 0x1f63b,
    triangleDown: 0x1f63c,
    triangleUp: 0x1f63d,
  };

  renderSymbol(symbol: ScatterSymbolType): string {
    const codePointHigh = (point: number) =>
      Math.floor((point - 0x10000) / 0x400) + 0xd800;
    const codePointLow = (point: number) =>
      ((point - 0x10000) % 0x400) + 0xdc00;
    const symbolCode = CatPoint.symbolMap[symbol];

    return String.fromCharCode(
      codePointHigh(symbolCode),
      codePointLow(symbolCode),
    );
  }

  render() {
    const { x, y, symbol } = this.props;

    return (
      <text x={x} y={y} fontSize={40}>
        {this.renderSymbol(symbol)}
      </text>
    );
  }
}

export default class VictoryScatterDemo extends React.Component<
  any,
  VictoryScatterDemoState
> {
  setStateInterval?: number = undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      hoverStyle: { fill: "gold" },
      data: props.data,
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: getData(),
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    return (
      <div className="demo" style={containerStyle}>
        <VictoryScatter
          style={style}
          width={500}
          height={500}
          domain={[0, 600]}
          animate={{ duration: 2000 }}
          data={this.state.data}
          dataComponent={<CatPoint />}
          containerComponent={
            <VictoryContainer
              title="Scatter Chart"
              desc="This is a scatter chart with cat data points!"
              style={Object.assign({}, style.parent, { border: "1px solid red" })}
            />
          }
        />

        <VictoryScatter
          style={{
            parent: style.parent,
            data: {
              fill: ({ datum }) => datum.fill,
              opacity: ({ datum }) => datum.opacity,
            },
          }}
          width={500}
          height={500}
          domain={[0, 600]}
          animate={{ duration: 2000 }}
          data={this.state.data}
        />

        <VictoryScatter
          style={{
            parent: style.parent,
            data: { fill: ({ datum }) => (datum.y > 0 ? "red" : "blue") },
          }}
          width={500}
          height={500}
          symbol={({ datum }) => (datum.y > 0 ? "triangleUp" : "triangleDown")}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={25}
        />

        <VictoryScatter
          style={symbolStyle}
          width={500}
          height={500}
          padding={50}
          labelComponent={<VictoryLabel style={{ fill: "red" }} />}
          data={symbolData}
        />

        <VictoryScatter
          style={{
            parent: style.parent,
            data: { fill: "blue", opacity: 0.7 },
          }}
          width={500}
          height={500}
          bubbleProperty="z"
          maxBubbleSize={20}
          data={bubbleData}
        />

        <svg style={style} width={500} height={300}>
          <VictoryScatter style={style} standalone={false} />
        </svg>

        <VictoryScatter
          style={{ parent: style.parent, data: this.state.hoverStyle }}
          labels={() => ""}
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
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, { fill: "orange" }),
                          symbol: "circle",
                        };
                      },
                    },
                    {
                      target: "labels",
                      mutation: () => {
                        return { text: "hey" };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          symbol={"star"}
          size={8}
        />

        <VictoryScatter
          style={style}
          theme={VictoryTheme.clean}
          width={350}
          height={350}
          data={range(0, 200).map((i) => {
            return {
              a: { b: [{ y: i * Math.sin(i * 0.3) }], x: Math.cos(i * 0.3) },
            };
          })}
          x="a.x"
          y="a.b[0]y"
        />
      </div>
    );
  }
}

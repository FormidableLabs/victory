import React from "react";
import { random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryLine, Curve } from "victory-line";
import { VictoryContainer, VictoryTheme, Point } from "victory-core";

interface PointedLineProps {
  index?: string | number;
  data?: {
    _x: number;
    _y: number;
  }[];
  scale?: any;
}

class PointedLine extends React.Component<PointedLineProps> {
  renderLine(props: PointedLineProps) {
    return <Curve {...props} />;
  }

  renderPoints(props: PointedLineProps) {
    const { index, data = [], scale } = props;
    return data.map((datum, pointIndex) => {
      const { _x, _y } = datum;

      const position = {
        x: scale.x(_x),
        y: scale.y(_y),
      };

      return (
        <Point
          style={{ fill: VictoryTheme.clean.palette?.colors?.purple }}
          symbol="circle"
          size={2}
          key={`line-${index}-point-${pointIndex}`}
          index={parseFloat(`${index}.${pointIndex}`)}
          datum={datum}
          {...position}
        />
      );
    });
  }

  render() {
    const { index } = this.props;

    return (
      <g key={`line-point-group-${index}`}>
        {this.renderLine(this.props)}
        {this.renderPoints(this.props)}
      </g>
    );
  }
}

interface VictoryLineDemoState {
  data: {
    x: number;
    y: number;
  }[];
  transitionData: {
    x: number;
    y: number;
  }[];
  arrayData: number[][];
  style: React.CSSProperties;
}

export default class VictoryLineDemo extends React.Component<
  any,
  VictoryLineDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: VictoryTheme.clean.line?.colorScale?.[0] ?? "blue",
      },
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles(),
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line) => {
      return { x: line, y: random(2, 10) };
    });
  }

  getData() {
    return range(100).map((i) => {
      return {
        x: i,
        y: Math.random(),
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = VictoryTheme.clean.line?.colorScale ?? [
      "red",
      "orange",
      "cyan",
      "green",
      "blue",
      "purple",
    ];
    return {
      stroke: colors[random(0, 5)],
    };
  }

  render() {
    const parentStyle = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%",
    };
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryLine
          style={{ parent: parentStyle }}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={25}
          theme={VictoryTheme.clean}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: { stroke: VictoryTheme.clean.palette?.colors?.orange },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            stroke: "orange",
                          }),
                        };
                      },
                    },
                    {
                      target: "labels",
                      eventKey: 99,
                      mutation: () => {
                        return { text: "hey" };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          data={range(0, 100)}
          y={(d) => d * d}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          y={1}
          dataComponent={<PointedLine />}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: { stroke: VictoryTheme.clean.palette?.colors?.red },
          }}
          data={this.state.arrayData}
          x={0}
          y={1}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          labels={(d: any) => Math.round(d.y)}
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

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: { stroke: VictoryTheme.clean.palette?.colors?.teal },
          }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 2 },
            { x: 5, y: null },
            { x: 6, y: null },
            { x: 7, y: 6 },
            { x: 8, y: 7 },
            { x: 9, y: 8 },
            { x: 10, y: 12 },
          ]}
        />

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          scale={{ x: "linear", y: "log" }}
        >
          <VictoryLine />
        </VictoryChart>

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          y={1}
        />

        <VictoryChart
          style={{ parent: parentStyle }}
          theme={VictoryTheme.clean}
        >
          <VictoryLine data={this.state.arrayData} x={0} y={1} />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          height={450}
          scale={{
            x: "time",
          }}
        >
          <VictoryLine
            data={[
              { x: new Date(1960, 1, 1), y: 125 },
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

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 2 },
            { x: 5, y: null },
            { x: 6, y: null },
            { x: 7, y: 6 },
            { x: 8, y: 7 },
            { x: 9, y: 8 },
            { x: 10, y: 12 },
          ]}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          scale={{ x: "linear", y: "log" }}
        />

        <VictoryLine
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          domain={{ x: [0, 100] }}
          y={1}
        />

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryLine
            style={{ parent: parentStyle, data: this.state.style }}
            data={this.state.transitionData}
            animate={{ duration: 1500 }}
            containerComponent={
              <VictoryContainer
                title="Line Chart"
                desc="This is a line chart for displaying data."
              />
            }
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryLine style={{ parent: parentStyle }} data={[]} />
        </VictoryChart>
      </div>
    );
  }
}

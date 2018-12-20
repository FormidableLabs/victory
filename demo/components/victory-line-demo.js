/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { merge, random, range } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryLine, Curve } from "../../packages/victory-line/src/index";
import { VictoryContainer, VictoryTheme, Point } from "../../packages/victory-core/src/index";

class PointedLine extends React.Component {
  static propTypes = {
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  renderLine(props) {
    return <Curve {...props} />;
  }

  renderPoints(props) {
    const { index, data, scale } = props;
    return data.map((datum, pointIndex) => {
      const { _x, _y } = datum;

      const position = {
        x: scale.x(_x),
        y: scale.y(_y)
      };

      return (
        <Point
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: "blue",
        strokeWidth: 2
      }
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles()
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
        y: Math.random()
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryLine
          style={{ parent: parentStyle, data: { stroke: "blue" } }}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          sample={25}
        />

        <VictoryLine
          style={{
            parent: parentStyle,
            data: { stroke: "red", strokeWidth: 6 }
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return { style: merge({}, props.style, { stroke: "orange" }) };
                      }
                    },
                    {
                      target: "labels",
                      eventKey: 99,
                      mutation: () => {
                        return { text: "hey" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
          data={range(0, 100)}
          y={(d) => d * d}
        />

        <VictoryLine
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          y={1}
          dataComponent={<PointedLine />}
        />

        <VictoryLine style={{ parent: parentStyle }} data={this.state.arrayData} x={0} y={1} />

        <VictoryLine
          style={{ parent: parentStyle }}
          labels={(d) => Math.round(d.y)}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 }
          ]}
        />

        <VictoryLine
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
            { x: 10, y: 12 }
          ]}
        />

        <VictoryChart style={{ parent: parentStyle }} scale={{ x: "linear", y: "log" }}>
          <VictoryLine />
        </VictoryChart>

        <VictoryLine
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          y={1}
          theme={VictoryTheme.grayscale}
        />

        <VictoryChart style={{ parent: parentStyle }} theme={VictoryTheme.grayscale}>
          <VictoryLine data={this.state.arrayData} x={0} y={1} />
        </VictoryChart>

        <VictoryChart
          style={{ parent: parentStyle }}
          height={450}
          scale={{
            x: "time"
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
              { x: new Date(2015, 1, 1), y: 470 }
            ]}
          />
        </VictoryChart>

        <VictoryLine
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
            { x: 10, y: 12 }
          ]}
        />

        <VictoryLine style={{ parent: parentStyle }} scale={{ x: "linear", y: "log" }} />

        <VictoryLine
          style={{ parent: parentStyle }}
          data={this.state.arrayData}
          x={0}
          domainPadding={{ x: [0, 100] }}
          y={1}
          theme={VictoryTheme.material}
        />

        <VictoryChart style={{ parent: parentStyle }} theme={VictoryTheme.material}>
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

        <VictoryChart style={{ parent: parentStyle }} theme={VictoryTheme.material}>
          <VictoryLine style={{ parent: parentStyle }} data={[]} />
        </VictoryChart>

        <VictoryLine
          style={{ parent: parentStyle }}
          data={range(0, 2 * Math.PI, 0.01).map((t) => ({ t }))}
          sortKey={"t"}
          x={({ t }) => Math.sin(3 * t + 2 * Math.PI)}
          y={({ t }) => Math.sin(2 * t)}
        />
      </div>
    );
  }
}

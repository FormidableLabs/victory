/*global window:false */
import React from "react";
import { merge, random, range } from "lodash";
import {VictoryLine, VictoryChart} from "../../src/index";
import LineSegment from "../../src/components/victory-line/line-segment";
import Point from "../../src/components/victory-scatter/point";
import { VictoryContainer, VictoryTheme } from "victory-core";

class PointedLine extends React.Component {
  static propTypes = {
    ...LineSegment.propTypes,
    index: React.PropTypes.number
  };

  renderLine(props) {
    return <LineSegment {...props} />;
  }

  renderPoints(props) {
    const {index, data, scale} = props;
    return (data.map(
      (datum, pointIndex) => {
        const {x, y} = datum;

        const position = {
          x: scale.x(x),
          y: scale.y(y)
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
      })
    );
  }

  render() {
    const {index} = this.props;

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

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line) => {
      return {x: line, y: random(2, 10)};
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
    return range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
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
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const parentStyle = {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"};
    return (
      <div className="demo">
        <h1>VictoryLine</h1>

        <VictoryLine
          style={{parent: parentStyle, data: this.state.style}}
          data={this.state.transitionData}
          animate={{duration: 800}}
          containerComponent={
            <VictoryContainer
              title="Line Chart"
              desc="This is a line chart for displaying data."
            />
          }
        />

        <VictoryLine
          style={{parent: parentStyle, data: this.state.style}}
          data={this.state.data}
          label={"label\none"}
          animate={{duration: 1500}}
        />

        <VictoryLine
          style={{parent: parentStyle, data: {stroke: "blue"}}}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          sample={25}
        />

        <VictoryLine
          style={{
            parent: parentStyle,
            data: {stroke: "red", strokeWidth: 6}
          }}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {style: merge({}, props.style, {stroke: "orange"})};
                    }
                  }, {
                    target: "labels",
                    mutation: () => {
                      return {text: "hey"};
                    }
                  }
                ];
              }
            }
          }]}
          label={this.state.label}
          data={range(0, 100)}
          x={null}
          y={(d) => d * d}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          data={this.state.arrayData}
          x={0}
          y={1}
          dataComponent={<PointedLine />}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          data={this.state.arrayData}
          x={0}
          y={1}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          data={[
            {x: new Date(1982, 1, 1), y: 125},
            {x: new Date(1987, 1, 1), y: 257},
            {x: new Date(1993, 1, 1), y: 345},
            {x: new Date(1997, 1, 1), y: 515},
            {x: new Date(2001, 1, 1), y: 132},
            {x: new Date(2005, 1, 1), y: 305},
            {x: new Date(2011, 1, 1), y: 270},
            {x: new Date(2015, 1, 1), y: 470}
          ]}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          data={[
            {x: 1, y: 1},
            {x: 2, y: 3},
            {x: 3, y: 5},
            {x: 4, y: 2},
            {x: 5, y: null},
            {x: 6, y: null},
            {x: 7, y: 6},
            {x: 8, y: 7},
            {x: 9, y: 8},
            {x: 10, y: 12}
          ]}
        />

        <VictoryChart
          scale={{x: "linear", y: "log"}}
        >
        <VictoryLine
          style={{parent: parentStyle}}
        />
        </VictoryChart>

        <VictoryLine
          style={{parent: parentStyle}}
          data={this.state.arrayData}
          label="Hello"
          x={0}
          y={1}
          theme={VictoryTheme.grayscale}
        />

        <VictoryChart
          theme={VictoryTheme.grayscale}
        >
          <VictoryLine
            style={{parent: parentStyle}}
            data={this.state.arrayData}
            label="Hello"
            x={0}
            y={1}
          />
      </VictoryChart>

      <VictoryChart
        height={450}
        scale={{
          x: "time"
        }}
      >
        <VictoryLine
          data={[
            {x: new Date(1960, 1, 1), y: 125},
            {x: new Date(1987, 1, 1), y: 257},
            {x: new Date(1993, 1, 1), y: 345},
            {x: new Date(1997, 1, 1), y: 515},
            {x: new Date(2001, 1, 1), y: 132},
            {x: new Date(2005, 1, 1), y: 305},
            {x: new Date(2011, 1, 1), y: 270},
            {x: new Date(2015, 1, 1), y: 470}
          ]}
        />
      </VictoryChart>

        <VictoryLine
          style={{parent: parentStyle}}
          data={[
            {x: 1, y: 1},
            {x: 2, y: 3},
            {x: 3, y: 5},
            {x: 4, y: 2},
            {x: 5, y: null},
            {x: 6, y: null},
            {x: 7, y: 6},
            {x: 8, y: 7},
            {x: 9, y: 8},
            {x: 10, y: 12}
          ]}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          scale={{x: "linear", y: "log"}}
        />

        <VictoryLine
          style={{parent: parentStyle}}
          data={this.state.arrayData}
          label="Hello"
          x={0}
          domainPadding={{x: [0, 100]}}
          y={1}
          theme={VictoryTheme.material}
        />

        <VictoryChart
          style={{parent: parentStyle}}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{parent: parentStyle, data: this.state.style}}
            data={this.state.transitionData}
            animate={{duration: 1500}}
            containerComponent={
              <VictoryContainer
                title="Line Chart"
                desc="This is a line chart for displaying data."
              />
            }
          />
        </VictoryChart>

        <VictoryChart
          style={{parent: parentStyle}}
          theme={VictoryTheme.material}
        >
            <VictoryLine
              style={{parent: parentStyle}}
              data={[]}
            />
        </VictoryChart>
      </div>
    );
  }
}

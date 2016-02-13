/*global window:false */
import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryScatter} from "../../src/index";
import {VictoryLabel} from "victory-label";
import bubbleData from "./bubble-data.js";
import symbolData from "./symbol-data.js";

const getData = () => {
  const colors =
    ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
  const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
  // symbol: symbols[scaledIndex],
  return _.map(_.range(100), (index) => {
    const scaledIndex = _.floor(index % 7);
    return {
      x: _.random(600),
      y: _.random(600),
      size: _.random(15) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[_.random(0, 6)],
      opacity: _.random(0.3, 1)
    };
  });
};

const style = {
  parent: {
    border: "1px solid #ccc",
    margin: 20
  }
};

const symbolStyle = {
  parent: {
    border: "1px solid #ccc",
    margin: 20
  },
  data: {
    fill: "red"
  },
  labels: {
    padding: 25,
    fontSize: 15,
    fill: "grey"
  }
};

@Radium
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <VictoryScatter
          style={style}
          width={500}
          height={500}
          domain={[0, 600]}
          animate={{velocity: 0.03}}
          data={this.state.data}
        />

        <VictoryScatter
          style={_.merge(
            {},
            style,
            {data: {fill: (data) => data.y > 0 ? "red" : "blue"}}
          )}
          width={500}
          height={500}
          symbol={(data) => data.y > 0 ? "triangleUp" : "triangleDown"}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          sample={25}
        />

        <VictoryScatter
          width={500}
          height={500}
          padding={50}
          labelComponent={<VictoryLabel style={{fill: "red"}}/>}
          style={symbolStyle}
          data={symbolData}
        />

        <VictoryScatter
          style={_.merge(
            {},
            style,
            {data: {fill: "blue", opacity: 0.7}}
          )}
          width={500}
          height={500}
          bubbleProperty="z"
          maxBubbleSize={20}
          showLabels={false}
          data={bubbleData}
        />

        <svg style={_.merge({width: 500, height: 300}, style.parent)}>
          <VictoryScatter
            width={500}
            height={300}
            style={style}
            containerElement="g"
          />
        </svg>

        <VictoryScatter
          style={style}
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

        <VictoryScatter
          data={_.range(0, 50)}
          x={null}
          y={(d) => d * d * Math.random()}
        />

        <VictoryScatter
          data={_.range(0, 100).map((i) => [i, i * 3287 % 100])}
          x={0}
          y={1}
        />

        <VictoryScatter
          data={_.range(0, 200).map((i) => {
            return {a: {b: [{y: i * Math.sin(i * .3)}], x: Math.cos(i * .3)}};
          })}
          x="a.x"
          y="a.b[0]y"
        />
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object)
};

App.defaultProps = {
  data: getData()
};

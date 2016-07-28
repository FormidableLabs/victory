/*global window:false */
import React from "react";
import { merge, random, range } from "lodash";
import {VictoryScatter, VictoryChart} from "../../src/index";
import {VictoryLabel} from "victory-core";
import bubbleData from "./bubble-data.js";
import symbolData from "./symbol-data.js";
import { VictoryContainer, VictoryTheme } from "victory-core";

const getData = () => {
  const colors =
    ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
  const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
  // symbol: symbols[scaledIndex],
  return range(50).map((index) => {
    const scaledIndex = Math.floor(index % 7);
    return {
      x: random(600),
      y: random(600),
      size: random(15) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[random(0, 6)],
      opacity: random(0.3, 1)
    };
  });
};

const style = {
  parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
};

const symbolStyle = {
  parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"},
  data: {
    fill: "red"
  },
  labels: {
    padding: 15,
    fontSize: 15,
    fill: "grey"
  }
};

class CatPoint extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    symbol: React.PropTypes.string
  };

  render() {
    const {x, y, symbol} = this.props;

    return (
      <text x={x} y={y} fontSize={40}>
        {this.renderSymbol(symbol)}
      </text>
    );
  }

  static symbolMap = {
    "circle": 0x1F431,
    "diamond": 0x1F638,
    "plus": 0x1F639,
    "square": 0x1F63A,
    "star": 0x1F63B,
    "triangleDown": 0x1F63C,
    "triangleUp": 0x1F63D
  };

  renderSymbol(symbol) {
    return String.fromCodePoint(CatPoint.symbolMap[symbol]);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverStyle: {fill: "gold"},
      data: props.data
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    return (
      <div className="demo">
      <VictoryContainer />
        <h1>VictoryScatter</h1>
        <VictoryScatter
          style={style}
          width={500}
          height={500}
          domain={[0, 600]}
          animate={{duration: 2000}}
          data={this.state.data}
          dataComponent={<CatPoint />}
          containerComponent={
            <VictoryContainer
              title="Scatter Chart"
              desc="This is a scatter chart with cat data points!"
              style={Object.assign({}, style.parent, {border: "1px solid red"})}
            />
          }
        />

        <VictoryScatter
          style={style}
          width={500}
          height={500}
          domain={[0, 600]}
          animate={{duration: 2000}}
          data={this.state.data}
        />

        <VictoryScatter
          style={{
            parent: style.parent,
            data: {fill: (data) => data.y > 0 ? "red" : "blue"}
          }}
          width={500}
          height={500}
          symbol={(d) => d.y > 0 ? "triangleUp" : "triangleDown"}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          sample={25}
        />

        <VictoryScatter
          style={symbolStyle}
          width={500}
          height={500}
          padding={50}
          labelComponent={<VictoryLabel style={{fill: "red"}}/>}
          data={symbolData}
        />

        <VictoryScatter
          style={{
            parent: style.parent,
            data: {fill: "blue", opacity: 0.7}
          }}
          width={500}
          height={500}
          bubbleProperty="z"
          maxBubbleSize={20}
          showLabels={false}
          data={bubbleData}
        />

      <svg style={style} width={500} height={300}>
          <VictoryScatter
            style={style}
            standalone={false}
          />
        </svg>

        <VictoryScatter
          style={{parent: style.parent, data: this.state.hoverStyle}}
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
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, {fill: "orange"}),
                        symbol: "circle"
                      };
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
          symbol={"star"}
          size={8}

        />

        <VictoryScatter
          style={style}
          data={range(0, 50)}
          x={null}
          y={(d) => d * d * Math.random()}
          domainPadding={200}
        />

        <VictoryChart
          style={style}
          theme={VictoryTheme.material}
        >
          <VictoryScatter
            style={style}
            data={range(0, 100).map((i) => [i, i * 3287 % 100])}
            x={0}
            y={1}
          />
        </VictoryChart>

        <VictoryScatter
          style={style}
          theme={VictoryTheme.material}
          data={range(0, 200).map((i) => {
            return {a: {b: [{y: i * Math.sin(i * 0.3)}], x: Math.cos(i * 0.3)}};
          })}
          x="a.x"
          y="a.b[0]y"
        />

        <VictoryChart>
          <VictoryScatter
            style={style}
            theme={VictoryTheme.material}
            data={[]}
          />
        </VictoryChart>

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

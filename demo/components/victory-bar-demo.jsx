/*global window:false*/
import _ from "lodash";
import React from "react";
import {VictoryBar, VictoryChart} from "../../src/index";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      barData: this.getBarData(),
      numericBarData: this.getNumericBarData()
    };
  }

  getBarData() {
    return _.map(_.range(5), () => {
      return [
        {
          x: "rabbits",
          y: _.random(1, 5)
        },
        {
          x: "cats",
          y: _.random(1, 10)
        },
        {
          x: "dogs",
          y: _.random(0, 15)
        }
      ];
    });
  }

  getNumericBarData() {
    return _.map(_.range(5), () => {
      return [
        {
          x: _.random(1, 3),
          y: _.random(1, 5)
        },
        {
          x: _.random(4, 7),
          y: _.random(1, 10)
        },
        {
          x: _.random(9, 11),
          y: _.random(0, 15)
        }
      ];
    });
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        barData: this.getBarData(),
        numericBarData: this.getNumericBarData()
      });
    }, 4000);
  }

  render() {
    return (
      <div className="demo">
        <h1>Victory Bar</h1>

        <ChartWrap>
          <VictoryBar
            stacked
            data={_.times(5, () => _.range(32))}
            x={null}
            y={(d) => Math.sin(d * 0.2)}
            colorScale="warm"
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            colorScale={"cool"}
            stacked
            height={250}
            data={this.getBarData()}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            grouped
            colorScale={"qualitative"}
            height={250}
            data={this.getBarData()}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            stacked
            colorScale={"qualitative"}
            height={250}
            data={this.getNumericBarData()}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            data={[[0, 1], [2, 3], [4, 5]]}
            x={0}
            y={1}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            height={250}
            data={[["a", 1], ["b", 3], ["c", 5]]}
            x={0}
            y={1}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            height={250}
            data={[{a: {b: {c: 1, d: 1}}}, {a: {b: {c: 2, d: 3}}}]}
            x={"a.b.c"}
            y={"a.b.d"}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            stacked
            data={[[["a", 1], ["b", 2], ["c", 3]], [["b", 1], ["c", 2], ["d", 3]]]}
            x={0}
            y={1}
            colorScale="qualitative"
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            stacked
            data={[
              [
                {x: "a", y: 2},
                {x: "b", y: 3},
                {x: "c", y: 4}
              ],
              [
                {x: "c", y: 2},
                {x: "d", y: 3},
                {x: "e", y: 4}
              ]
            ]}
            colorScale="warm"
          />
        </ChartWrap>
      </div>
    );
  }
}

class ChartWrap extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    children: React.PropTypes.any
  };
  static defaultProps = {
    width: 350,
    height: 250
  };
  // renders both a standalone chart, and a version wrapped in VictoryChart,
  // to test both cases at once
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
        <VictoryChart {...this.props}>{this.props.children}</VictoryChart>
      </div>
    );
  }
}

/*global window:false*/
import _ from "lodash";
import React from "react";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryStack} from "../../src/index";

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

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        barData: this.getBarData(),
        numericBarData: this.getNumericBarData()
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const parentStyle = {
      border: "1px solid #ccc",
      margin: 20
    };

    return (
      <div className="demo">
        <h1>VictoryBar</h1>

        <VictoryGroup
          style={{parent: parentStyle}} offset={18}
          colorScale={"qualitative"}
          animate={{duration: 2000}}
          labels={["a", "b", "c"]}
        >
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data}/>;
          })}
        </VictoryGroup>

        <VictoryGroup horizontal style={{parent: parentStyle}} offset={8} colorScale={"cool"} animate={{duration: 2000}}>
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data}/>;
          })}
        </VictoryGroup>

        <VictoryGroup style={{parent: parentStyle}} offset={15} animate={{duration: 2000}}>
          <VictoryStack colorScale={"red"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data}/>;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"green"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data}/>;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"blue"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data}/>;
            })}
          </VictoryStack>
        </VictoryGroup>

        <VictoryStack
          style={{parent: parentStyle}}
          animate={{duration: 2000}}
          colorScale={"warm"}
          labels={["one", "two", "three"]}
        >
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data}/>;
          })}
        </VictoryStack>
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

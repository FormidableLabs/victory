/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryPie } from "Packages/victory-pie/src/index";

export default class App extends React.Component {
  setStateInterval = undefined;

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
      });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    // const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryPie
        height="250"
        width="350"
        role="group"
          data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 }
          ]}
        />
      </div>
    );
  }
}

class ChartWrap extends React.Component {
  static defaultProps = {
    height: 250,
    width: 350
  };
  // renders both a standalone chart, and a version wrapped in VictoryChart,
  // to test both cases at once
  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    return (
      <div style={parentStyle}>
        {React.cloneElement(this.props.children)}
        <VictoryChart {...this.props}>{this.props.children}</VictoryChart>
      </div>
    );
  }
}

import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryBar } from "@packages/victory-bar";


export default class VictoryAccessibilityDemo extends React.Component<any, any> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
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

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <ChartWrap>
          <VictoryBar
            cornerRadius={4}
            scale={{ y: "log", x: "linear" }}
            horizontal
            data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 0 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 }
            ]}
          />
        </ChartWrap>
      </div>
    );
  }
}

interface ChartWrapProps {
  children?: any;
  height?: number;
  weight?: number;
}

class ChartWrap extends React.Component<ChartWrapProps> {
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

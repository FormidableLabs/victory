import React from "react";
import { VictoryLegend } from "../../src/index";

export default class App extends React.Component {
  render() {
    const svgStyle = { border: "1px solid #ccc", padding: 20 };
    const legendSize = {
      width: 500,
      height: 300
    };
    const data = [{
      name: "Seria 1",
      color: "green",
      symbol: "rect"
    }, {
      name: "Long Seria Name",
      color: "blue",
      symbol: "circle"
    }, {
      name: "Seria 3",
      color: "black"
    }, {
      name: "Seria 4",
      color: "red",
      symbol: "circle"
    }];

    return (
      <div className="demo">
        <svg {...legendSize} style={svgStyle}>
            <VictoryLegend {...legendSize} data={data} font={{ fontSize: 35 }} />
        </svg>
        <svg {...legendSize} style={svgStyle}>
          <VictoryLegend {...legendSize} orientation="horizontal" data={data} />
        </svg>
      </div>
    );
  }
}

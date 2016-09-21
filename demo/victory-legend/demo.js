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
      name: "Series 1",
      label: {
        fontSize: 10
      },
      symbol: {
        type: "circle"
      }
    }, {
      name: "Long Series Name",
      label: {
        fontSize: 12
      },
      symbol: {
        type: "triangleUp",
        style: {
          fill: "blue"
        }
      }
    }, {
      name: "Series 3",
      label: {
        fontSize: 14
      },
      symbol: {
        type: "diamond",
        style: {
          fill: "pink"
        }
      }
    }, {
      name: "Series 4",
      label: {
        fontSize: 16
      },
      symbol: {
        type: "plus"
      }
    }, {
      name: "Series 5",
      label: {
        fontSize: 18
      },
      symbol: {
        type: "star",
        style: {
          fill: "red"
        }
      }
    }];

    return (
      <div className="demo">
        <VictoryLegend {...legendSize} data={data} style={svgStyle} />
        <svg {...legendSize} style={svgStyle}>
          <VictoryLegend {...legendSize} orientation="horizontal" data={data} standalone={false}/>
        </svg>
      </div>
    );
  }
}

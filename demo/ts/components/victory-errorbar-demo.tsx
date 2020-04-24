import React from "react";
import { merge, random, range } from "lodash";
import {
  VictoryChart,
  VictoryErrorBar,
  ErrorBar,
  VictoryScatter,
  VictoryContainer,
  VictoryTheme
} from "@packages/victory-core";

const getData = () => {
  return range(4).map(() => {
    return {
      x: random(6),
      y: random(6),
      errorX: [random(1, true), random(3, true)],
      errorY: [random(2, true), random(2, true)]
    };
  });
};

const basicData = [
  { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
  { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
  { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
  { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
  { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 }
];

// this.state = {
//   hoverStyle: { stroke: "gold" },
//   data: props.data
// };
export default class VictoryErrorBarDemo extends React.Component<any> {
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
      <div
        className="demo"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <VictoryChart
          style={{ parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } }}
        >
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryChart
          horizontal
          style={{ parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } }}
        >
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryErrorBar
          style={{ parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } }}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          data={this.state.data}
          dataComponent={<ErrorBar />}
          containerComponent={
            <VictoryContainer
              title="ErrorBar Chart"
              desc="This is a errorbar chart with data points!"
              style={{ border: "1px solid red", margin: "2%", maxWidth: "40%" }}
            />
          }
        />

        <VictoryErrorBar
          horizontal
          style={{ parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } }}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          borderWidth={30}
          data={this.state.data}
        />

        <VictoryErrorBar
          style={{
            parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
            data: { fill: ({ datum }) => (datum.y > 0 ? "red" : "blue") }
          }}
          width={500}
          height={500}
        />

        <VictoryErrorBar
          style={{
            parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
            data: { stroke: "blue", opacity: 0.7, strokeWidth: 3 }
          }}
          width={500}
          height={500}
          data={this.state.data}
        />

        <svg style={style} width={500} height={300}>
          <VictoryErrorBar style={style} standalone={false} />
        </svg>

        <VictoryErrorBar
          style={{ parent: style.parent, data: this.state.hoverStyle }}
          data={this.state.data}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: ({ style }) => {
                        return {
                          style: merge({}, style, { stroke: "orange" })
                        };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />

        <VictoryChart style={style} theme={VictoryTheme.material}>
          <VictoryErrorBar style={style} data={this.state.data} />
        </VictoryChart>

        <VictoryChart style={style} theme={VictoryTheme.material}>
          <VictoryErrorBar style={style} data={[]} />
        </VictoryChart>
      </div>
    );
  }
}

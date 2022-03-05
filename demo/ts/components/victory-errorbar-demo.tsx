import React from "react";
import { merge, random, range } from "lodash";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryScatter } from "@packages/victory-scatter";
import { ErrorType, VictoryErrorBar } from "@packages/victory-errorbar";
import { VictoryContainer, VictoryTheme } from "@packages/victory-core";

const basicData = [
  { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
  { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
  { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
  { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
  { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 }
];

const style = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

type dataType = {
  x?: string | number;
  y?: string | number;
  errorX?: ErrorType;
  errorY?: ErrorType;
};

interface VictoryErrorBarState {
  hoverStyle: { stroke: string };
  data: dataType[];
}

export default class VictoryErrorBarDemo extends React.Component<
  any,
  VictoryErrorBarState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      data: this.getData(),
      hoverStyle: { stroke: "gold " }
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData = () => {
    return range(4).map(() => {
      return {
        x: random(6),
        y: random(6),
        errorX: [random(1, true), random(3, true)],
        errorY: [random(2, true), random(2, true)]
      };
    });
  };

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
        <VictoryChart style={style}>
          <VictoryErrorBar
            data={basicData}
            data-test-variable="TESTING 123"
            aria-label="Victory ErrorBar with Victory Chart wrapper"
          />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryChart horizontal style={style}>
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

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

        <svg style={style.parent} width={500} height={300}>
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
                      mutation: (props: any) => {
                        return {
                          style: merge({}, props.style, { stroke: "orange" })
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

        <VictoryErrorBar
          style={style}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          data={this.state.data}
          containerComponent={
            <VictoryContainer
              title="ErrorBar Chart"
              desc="This is a errorbar chart with data points!"
              style={{ border: "1px solid red", margin: "2%", maxWidth: "40%" }}
            />
          }
          data-test-variable="TESTING 123"
          aria-label="Victory ErrorBar Inside VictoryContainer"
        />
        <VictoryErrorBar
          horizontal
          style={style}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          borderWidth={30}
          data={this.state.data}
          data-test-variable="TESTING 123"
          aria-label="Victory ErrorBar Standalone"
        />
      </div>
    );
  }
}

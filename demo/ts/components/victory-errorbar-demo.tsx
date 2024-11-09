import React from "react";
import { random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryScatter } from "victory-scatter";
import { ErrorType, VictoryErrorBar } from "victory-errorbar";
import { VictoryContainer, VictoryTheme } from "victory-core";

const basicData = [
  { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
  { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
  { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
  { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
  { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
];

const style = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const themeColors = VictoryTheme.clean.palette?.colors || {};

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
      hoverStyle: { stroke: themeColors.green || "green" },
    };
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
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
        errorY: [random(2, true), random(2, true)],
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
          justifyContent: "center",
        }}
      >
        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryChart horizontal style={style} theme={VictoryTheme.clean}>
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryErrorBar
          style={style}
          theme={VictoryTheme.clean}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          data={this.state.data}
          containerComponent={
            <VictoryContainer
              title="ErrorBar Chart"
              desc="This is a errorbar chart with data points!"
              style={{ ...style.parent }}
            />
          }
        />

        <VictoryErrorBar
          theme={VictoryTheme.clean}
          horizontal
          style={style}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          data={this.state.data}
        />

        <VictoryErrorBar
          theme={VictoryTheme.clean}
          animate={{ duration: 2000 }}
          style={{
            parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
            data: {
              stroke: ({ datum }) =>
                datum.y > 0
                  ? themeColors.red || "red"
                  : themeColors.blue || "blue",
            },
          }}
          width={500}
          height={500}
        />

        <VictoryErrorBar
          theme={VictoryTheme.clean}
          style={{
            parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
            data: {
              stroke: themeColors.purple,
            },
          }}
          width={500}
          height={500}
          data={this.state.data}
        />

        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryErrorBar style={style} standalone={false} />
        </VictoryChart>

        <VictoryErrorBar
          theme={VictoryTheme.clean}
          style={{ ...style, data: this.state.hoverStyle }}
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
                          style: Object.assign({}, props.style, {
                            stroke: themeColors.orange || "orange",
                          }),
                        };
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryErrorBar style={style} data={this.state.data} />
        </VictoryChart>

        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryErrorBar style={style} data={[]} />
        </VictoryChart>
      </div>
    );
  }
}

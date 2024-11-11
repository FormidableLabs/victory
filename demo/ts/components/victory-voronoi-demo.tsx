 
import React from "react";
import { VictoryVoronoi } from "victory-voronoi";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryChart } from "victory-chart";
import { VictoryScatter } from "victory-scatter";
import { range, random } from "lodash";
import { VictoryTheme } from "victory-core";

type dataType = {
  x: number;
  y: number;
  i: number;
}[];

interface VoronoiDemoStateProps {
  data: dataType;
}

class VoronoiDemo extends React.Component<any, VoronoiDemoStateProps> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData() {
    return range(20).map((i: number) => {
      return {
        x: random(600),
        y: random(600),
        i,
      };
    });
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const parentStyle: React.CSSProperties = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%",
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryVoronoi
            theme={VictoryTheme.material}
            style={{ parent: parentStyle }}
          />

          <VictoryVoronoi
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
            ]}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: () => {
                          return {
                            style: {
                              fill: VictoryTheme.clean.palette?.colors?.orange,
                            },
                          };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <VictoryVoronoi
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            size={40}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
            ]}
          />

          <VictoryVoronoi
            theme={VictoryTheme.clean}
            labels={({ datum }) => `#${datum.i}`}
            labelComponent={<VictoryTooltip />}
            animate={{ duration: 2000 }}
            style={{ parent: parentStyle }}
            size={20}
            data={this.state.data}
          />

          <VictoryChart
            horizontal
            style={{ parent: parentStyle }}
            theme={VictoryTheme.clean}
          >
            <VictoryVoronoi
              labels={({ datum }) => `#${datum.i}`}
              labelComponent={<VictoryTooltip />}
              size={20}
              style={{ parent: parentStyle }}
              data={this.state.data}
            />
            <VictoryScatter data={this.state.data} />
          </VictoryChart>

          <VictoryChart
            horizontal
            style={{ parent: parentStyle }}
            theme={VictoryTheme.clean}
          >
            <VictoryVoronoi
              labels={({ datum }) => `#${datum.i}`}
              labelComponent={<VictoryTooltip />}
              style={{ parent: parentStyle }}
              data={this.state.data}
            />
            <VictoryScatter data={this.state.data} />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default VoronoiDemo;

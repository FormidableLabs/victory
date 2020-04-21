/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryVoronoi } from "@packages/victory-voronoi";
import { VictoryTooltip } from "@packages/victory-tooltip";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryScatter } from "@packages/victory-scatter";
import { range, random } from "lodash";

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
      data: this.getData()
    };
  }

  getData() {
    return range(20).map((i: number) => {
      return {
        x: random(600),
        y: random(600),
        i
      };
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
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
      justifyContent: "center"
    };

    const parentStyle: React.CSSProperties = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%"
    };

    const visible: React.CSSProperties = {
      fill: "gray",
      opacity: 0.1,
      stroke: "black",
      strokeWidth: 2
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryVoronoi style={{ parent: parentStyle, data: visible }} />

          <VictoryVoronoi
            style={{ parent: parentStyle, data: visible }}
            data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 1 }]}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: () => {
                          return { style: { fill: "orange" } };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />

          <VictoryVoronoi
            style={{ parent: parentStyle, data: visible }}
            size={40}
            data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 1 }]}
          />

          <VictoryVoronoi
            labels={({ datum }) => `#${datum.i}`}
            labelComponent={<VictoryTooltip />}
            animate={{ duration: 2000 }}
            style={{ parent: parentStyle, data: visible }}
            size={20}
            data={this.state.data}
          />

          <VictoryChart horizontal style={{ parent: parentStyle }}>
            <VictoryVoronoi
              labels={({ datum }) => `#${datum.i}`}
              labelComponent={<VictoryTooltip />}
              size={20}
              style={{ parent: parentStyle, data: visible }}
              data={this.state.data}
            />
            <VictoryScatter data={this.state.data} />
          </VictoryChart>

          <VictoryChart horizontal style={{ parent: parentStyle }}>
            <VictoryVoronoi
              labels={({ datum }) => `#${datum.i}`}
              labelComponent={<VictoryTooltip />}
              style={{ parent: parentStyle, data: visible }}
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

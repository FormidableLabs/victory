import React from "react";
import { random, range } from "lodash";
import { VictoryPie } from "victory-pie";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryTheme, Helpers } from "victory-core";

interface VictoryPieDemoState {
  data: {
    x: string;
    y: number;
    label?: string;
    fill?: string;
  }[];
  transitionData: {
    x: number;
    y: number;
    label: string;
  }[];
  colorScale: string[];
  sliceWidth: number;
  style: {
    [key: string]: React.CSSProperties;
  };
  padding: number;
}

export default class VictoryPieDemo extends React.Component<
  any,
  VictoryPieDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      colorScale: [
        "#D85F49",
        "#F66D3B",
        "#D92E1D",
        "#D73C4C",
        "#FFAF59",
        "#E28300",
        "#F6A57F",
      ],
      sliceWidth: 60,
      style: {
        parent: {
          backgroundColor: "#f7f7f7",
          border: "1px solid #ccc",
          margin: "2%",
          maxWidth: "40%",
        },
      },
      padding: 0,
    };
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getTransitionData() {
    const data = random(6, 9);
    return range(data).map((datum) => {
      return {
        x: datum,
        y: random(2, 9),
        label: `#${datum}`,
      };
    });
  }

  getData() {
    const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);
    return [
      { x: "<5", y: rand(), label: "A", fill: "grey" },
      { x: "5-13", y: rand() },
      { x: "14-17", y: rand() },
      { x: "18-24", y: rand() },
      { x: "25-44", y: rand() },
      { x: "45-64", y: rand() },
      { x: "≥65", y: rand() },
    ];
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
      <div>
        <h1>VictoryPie Demo</h1>

        <div style={containerStyle}>
          <VictoryPie
            startAngle={90}
            endAngle={-90}
            theme={VictoryTheme.clean}
            style={{
              parent: parentStyle,
            }}
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{
              parent: parentStyle,
              labels: {
                fill: "white",
              },
            }}
            labelRadius={({ datum }) => datum.radius - 20}
            width={400}
            height={200}
            radius={({ datum }) => datum.radius}
            data={[
              { x: 1, y: 1, radius: 50 },
              { x: 2, y: 3, radius: 60 },
              { x: 3, y: 5, radius: 80 },
              { x: 4, y: 2, radius: 90 },
              { x: 5, y: 3, radius: 70 },
            ]}
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            labelPosition="endAngle"
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            labelPosition="startAngle"
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            categories={{ x: ["E", "A", "D", "C", "B"] }}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            categories={{ x: ["E", "A", "C"] }}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            animate={{ duration: 1000 }}
            style={{
              parent: parentStyle,
            }}
            data={this.state.transitionData}
          />

          <VictoryPie
            style={{ parent: parentStyle }}
            theme={VictoryTheme.clean}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => ({
                    mutation: (props) => ({
                      radius: 110,
                      sliceStartAngle: Helpers.radiansToDegrees(
                        props.slice.startAngle + 0.05,
                      ),
                      sliceEndAngle: Helpers.radiansToDegrees(
                        props.slice.endAngle - 0.05,
                      ),
                    }),
                  }),
                  onMouseOut: () => ({
                    mutation: () => null,
                  }),
                },
              },
            ]}
          />

          <VictoryPie
            style={{ parent: parentStyle }}
            theme={VictoryTheme.clean}
            events={[
              {
                target: "parent",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => {
                          return { text: "parent click" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <VictoryPie
            labelComponent={<VictoryTooltip />}
            theme={VictoryTheme.clean}
            colorScale="grayscale"
            style={{
              parent: parentStyle,
            }}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{
              ...this.state.style,
              labels: {
                fill: "white",
              },
            }}
            labelRadius={115}
            innerRadius={140}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ ...this.state.style, labels: { fontSize: 0 } }}
            data={this.state.data}
            innerRadius={50}
            padding={10}
            animate={{ duration: 2000 }}
            colorScale="warm"
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{
              ...this.state.style,
              labels: { padding: 0, fill: "white" },
            }}
            data={this.state.data}
            innerRadius={50}
            labelRadius={100}
            padding={10}
            animate={{ duration: 2000 }}
            colorScale="cool"
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={{
              parent: parentStyle,
            }}
            endAngle={90}
            innerRadius={80}
            padAngle={5}
            startAngle={-90}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            animate={{ duration: 2000 }}
            style={{
              ...this.state.style,
            }}
            colorScale="warm"
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            style={{ parent: parentStyle }}
            animate={{ duration: 2000 }}
          />

          <VictoryPie
            theme={VictoryTheme.clean}
            style={this.state.style}
            data={range(0, 2).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            labels={[]}
            cornerRadius={20}
            startAngle={-6}
            animate={{ duration: 2000 }}
            innerRadius={140}
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            radius={80}
            labelPosition="startAngle"
            labelPlacement="parallel"
            labels={({ datum }) => `${datum.l}\ndegrees`}
            data={[
              { x: 1, y: 1, l: 0 },
              { x: 2, y: 1, l: 45 },
              { x: 3, y: 1, l: 90 },
              { x: 4, y: 1, l: 135 },
              { x: 5, y: 1, l: 180 },
              { x: 6, y: 1, l: 225 },
              { x: 7, y: 1, l: 270 },
              { x: 8, y: 1, l: 315 },
            ]}
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            radius={100}
            labelPosition="startAngle"
            labelPlacement="perpendicular"
            labels={({ datum }) => `${datum.l}\ndegrees`}
            data={[
              { x: 1, y: 1, l: 0 },
              { x: 2, y: 1, l: 45 },
              { x: 3, y: 1, l: 90 },
              { x: 4, y: 1, l: 135 },
              { x: 5, y: 1, l: 180 },
              { x: 6, y: 1, l: 225 },
              { x: 7, y: 1, l: 270 },
              { x: 8, y: 1, l: 315 },
            ]}
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            labelIndicator
            colorScale="heatmap"
          />
          <VictoryPie
            theme={VictoryTheme.clean}
            style={{ parent: parentStyle }}
            labelIndicator
            labelIndicatorInnerOffset={45}
            labelIndicatorOuterOffset={10}
            colorScale="red"
          />
        </div>
      </div>
    );
  }
}

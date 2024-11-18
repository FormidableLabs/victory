import React from "react";
import { VictoryChart } from "victory";
import { VictoryStack } from "victory";
import { VictoryArea } from "victory";
import { VictoryBar, VictoryBarTTargetType } from "victory";
import { VictoryLine } from "victory";
import { VictoryTheme, VictoryLabel, VictoryThemePalette } from "victory";

class EventsDemo extends React.Component {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };
    const barTarget: VictoryBarTTargetType = "data";
    const themeColors: VictoryThemePalette =
      VictoryTheme.clean.palette?.colors || {};

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryBar
            theme={VictoryTheme.clean}
            style={{
              parent: chartStyle.parent,
            }}
            labels={["a", "b", "c", "d", "e"]}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3, label: "click me" },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
            ]}
            events={[
              {
                target: barTarget,
                eventKey: [1, 2],
                eventHandlers: {
                  onClick: (evt) => {
                    evt.stopPropagation();
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: { ...props.style, fill: themeColors.teal },
                          };
                        },
                      },
                      {
                        target: "labels",
                        eventKey: 3,
                        mutation: (props) => {
                          return { ...props.style, text: "now click me" };
                        },
                      },
                    ];
                  },
                },
              },
              {
                target: "parent",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: {
                              ...props.style,
                              fill: themeColors.red,
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

          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            domainPadding={{ x: 30, y: 30 }}
            events={[
              {
                childName: "bar",
                target: "data",
                eventKey: [1, 2],
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        eventKey: [3, 4, 5],
                        mutation: () => {
                          return { text: "o shit" };
                        },
                      },
                      {
                        childName: "line",
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: { ...props.style, stroke: themeColors.teal },
                          };
                        },
                      },
                      {
                        childName: "line",
                        target: "labels",
                        mutation: (props) => {
                          return {
                            style: { ...props.style, fill: themeColors.purple },
                            text: "waddup",
                          };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryBar
              name="bar"
              labels={() => null}
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 2 },
                { x: 5, y: 1 },
                { x: 6, y: 2 },
                { x: 7, y: 3 },
                { x: 8, y: 2 },
                { x: 9, y: 1 },
                { x: 10, y: 2 },
                { x: 11, y: 3 },
                { x: 12, y: 2 },
                { x: 13, y: 1 },
              ]}
            />
            <VictoryLine
              name="line"
              y={() => 0.5}
              style={{ data: { stroke: themeColors.purple } }}
            />
          </VictoryChart>

          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            domainPadding={20}
            events={[
              {
                childName: "bar",
                target: "data",
                eventHandlers: {
                  onClick: (evt) => {
                    evt.stopPropagation();
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: { ...props.style, fill: themeColors.yellow },
                          };
                        },
                      },
                    ];
                  },
                },
              },
              {
                target: "parent",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: "bar",
                        target: "labels",
                        mutation: () => {
                          return { text: "o shit" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryLabel
              text="Parent Events"
              y={50}
              x={150}
              style={{ ...VictoryTheme.clean.label, fontSize: 18 }}
            />
            <VictoryBar name="bar" labels={() => null} />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.clean}
            events={[
              {
                childName: ["area-1", "area-2"],
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: ["area-3", "area-4"],
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === themeColors.yellow
                            ? null
                            : {
                                style: {
                                  ...props.style,
                                  fill: themeColors.yellow,
                                },
                              };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryStack>
              <VictoryArea
                name="area-1"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ]}
              />
              <VictoryArea
                name="area-2"
                data={[
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 },
                ]}
              />
              <VictoryArea
                name="area-3"
                data={[
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 },
                ]}
              />
              <VictoryArea
                name="area-4"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ]}
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default EventsDemo;

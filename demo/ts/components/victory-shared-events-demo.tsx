import React from "react";
import { VictoryBar } from "victory";
import { VictoryTheme } from "victory";
import { VictorySharedEvents } from "victory";

const themeColors = VictoryTheme.clean.palette?.colors || {};
export default class VictorySharedEventsDemo extends React.Component<any, {}> {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div className="demo" style={containerStyle}>
        <svg width={800} height={500}>
          <VictorySharedEvents
            events={[
              {
                childName: "firstBar",
                target: "data",
                eventKey: 1,
                eventHandlers: {
                  onClick: () => {
                    return {
                      childName: "secondBar",
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: themeColors.blue,
                          }),
                        };
                      },
                    };
                  },
                },
              },
              {
                childName: "secondBar",
                target: "data",
                eventKey: 0,
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: "firstBar",
                        mutation: (props) => {
                          return props.style.fill === themeColors.cyan
                            ? null
                            : {
                                style: Object.assign({}, props.style, {
                                  fill: themeColors.cyan,
                                }),
                              };
                        },
                      },
                      {
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: themeColors.orange,
                            }),
                          };
                        },
                      },
                      {
                        target: "labels",
                        eventKey: 1,
                        mutation: () => {
                          return { text: "CLICKED" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryBar
              theme={VictoryTheme.clean}
              name="firstBar"
              standalone={false}
              style={{
                data: { width: 25, fill: themeColors.yellow },
              }}
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 4 },
              ]}
            />
            <VictoryBar
              theme={VictoryTheme.clean}
              name={"secondBar"}
              standalone={false}
              labels={({ datum }) => datum.y}
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 4 },
              ]}
            />
          </VictorySharedEvents>
        </svg>
      </div>
    );
  }
}

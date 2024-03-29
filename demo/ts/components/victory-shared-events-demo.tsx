import React from "react";
import { VictoryBar } from "victory-bar";
import { VictorySharedEvents } from "victory-shared-events";

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
        <svg width={500} height={300}>
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
                          style: Object.assign({}, props.style, { fill: "blue" }),
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
                          return props.style.fill === "cyan"
                            ? null
                            : {
                                style: Object.assign({}, props.style, { fill: "cyan" }),
                              };
                        },
                      },
                      {
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, { fill: "orange" }),
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
              name="firstBar"
              style={{
                data: { width: 25, fill: "gold" },
              }}
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 4 },
              ]}
            />
            <VictoryBar
              name={"secondBar"}
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

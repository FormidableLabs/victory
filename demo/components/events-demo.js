/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryArea, VictoryStack, VictoryBar, VictoryLine
} from "../../packages/victory-chart/src/index";
import { VictoryTheme, VictoryLabel } from "../../packages/victory-core/src/index";
import { merge } from "lodash";


class App extends React.Component {

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };

    return (
      <div className="demo">
        <div style={containerStyle}>
        <VictoryBar
          style={{
            parent: chartStyle.parent,
            data: { fill: "blue", width: 20 },
            labels: { fontSize: 20 }
          }}
          labels={[
            "a", "b", "c", "d", "e"
          ]}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3, label: "click me" },
            { x: 4, y: 2 },
            { x: 5, y: 1 }
          ]}
          events={[
            {
              target: "data",
              eventKey: [1, 2],
              eventHandlers: {
                onClick: (evt) => {
                  evt.stopPropagation();
                  return [
                    {
                      mutation: () => {
                        return { style: { fill: "orange", width: 20 } };
                      }
                    },
                    {
                      target: "labels",
                      eventKey: 3,
                      mutation: () => {
                        return { text: "now click me" };
                      }
                    }
                  ];
                }
              }
            }, {
              target: "parent",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => {
                        return { style: { fill: "tomato", width: 10 } };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />

        <VictoryChart style={chartStyle} domainPadding={{ x: 30, y: 30 }}
          events={[{
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
                    }
                  }, {
                    childName: "line",
                    target: "data",
                    mutation: (props) => {
                      return { style: merge({}, props.style, { stroke: "lime" }) };
                    }
                  }, {
                    childName: "line",
                    target: "labels",
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, { fill: "green" }),
                        text: "waddup"
                      };
                    }
                  }
                ];
              }
            }
          }]}
        >
          <VictoryBar name="bar"
            labels={() => null}
            style={{ data: { width: 15, fill: "green" } }}
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
              { x: 13, y: 1 }
            ]}
          />
          <VictoryLine name="line"
            y={() => 0.5}
            style={{ data: { stroke: "blue", strokeWidth: 5 } }}
          />
        </VictoryChart>


        <VictoryChart style={chartStyle}
          events={[
            {
              childName: "bar",
              target: "data",
              eventHandlers: {
                onClick: (evt) => {
                  evt.stopPropagation();
                  return [
                    {
                      mutation: () => {
                        return { style: { fill: "orange" } };
                      }
                    }
                  ];
                }
              }
            }, {
              target: "parent",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: "bar",
                      target: "labels",
                      mutation: () => {
                        return { text: "o shit" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        >
            <VictoryLabel text="Parent Events" y={50} x={150}/>
            <VictoryBar name="bar" labels={() => null}/>
          </VictoryChart>

          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            events={[{
              childName: ["area-1", "area-2"],
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: ["area-3", "area-4"],
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style.fill;
                        return fill === "gold" ? null : { style: { fill: "gold" } };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryStack>
              <VictoryArea name="area-1"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
              <VictoryArea name="area-2"
                data={[
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 }
                ]}
              />
              <VictoryArea name="area-3"
                data={[
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 }
                ]}
              />
              <VictoryArea name="area-4"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;

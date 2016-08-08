import React from "react";
import { VictoryChart, VictoryArea, VictoryStack } from "../../src/index";
import { VictoryTheme } from "victory-core";


class App extends React.Component {

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = {parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}};

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            events={[{
              childName: "all",
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: "area-2",
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style.fill;
                        return fill === "gold" ? null : {style: {fill: "gold"}};
                      }
                    }, {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style.fill;
                        return fill === "orange" ? null : {style: {fill: "orange"}};
                      }
                    }, {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style.fill;
                        return fill === "red" ? null : {style: {fill: "red"}};
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
                  {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}, {x: "e", y: 7}
                ]}
              />
              <VictoryArea name="area-2"
                data={[
                  {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}, {x: "e", y: 5}
                ]}
              />
              <VictoryArea name="area-3"
                data={[
                  {x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}, {x: "d", y: 2}, {x: "e", y: 6}
                ]}
              />
              <VictoryArea name="area-4"
                data={[
                  {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 3}, {x: "d", y: 4}, {x: "e", y: 7}
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

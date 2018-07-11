/*eslint-disable no-magic-numbers*/
import React from "react";
import {
  VictoryAxis,
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryScatter,
  VictoryStack,
  VictoryGroup,
  VictorySelectionContainer,
  createContainer
} from "../../packages/victory/src/index";
import { range, random } from "lodash";

export default class App extends React.Component {
  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
    };
    console.log(createContainer)
    // const CustomContainer = createContainer("voronoi", "zoom");
    // const data = range(100).map((x) => ({ x, y: 100 + x + random(10) }));

    return (
      <div className="demo">
        <h1>Victory Demo</h1>


        <h2>Composites</h2>

        <h3>VictoryPie</h3>
        <p>Default props</p>
        <VictoryPie style={style}/>

        <h3>VictoryChart</h3>
        <p>Line chart of function <code>y = x^2</code></p>

        <VictoryChart style={style}>
          <VictoryLine y={(data) => data.x * data.x}/>
        </VictoryChart>

        <VictoryChart style={style}
          domainPadding={{ x: 30, y: 30 }}
          height={600}
          width={600}
          events={[{
            childName: "bar",
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "labels",
                    mutation: () => {
                      return { text: "o shit" };
                    }
                  },
                  {
                    childName: "line",
                    eventKey: "all",
                    target: "data",
                    mutation: () => {
                      return { style: { stroke: "lime" } };
                    }
                  },
                  {
                    childName: "line",
                    eventKey: 0,
                    target: "labels",
                    mutation: () => {
                      return {
                        style: { fill: "green" },
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
            labels={["LINE"]}
          />
        </VictoryChart>

        <h3>VictoryChart</h3>
        <p>Custom axes and tickformats; Bar + line chart</p>
        <VictoryChart style={style} domainPadding={{ x: 30, y: 30 }}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            tickFormat={(x) => `${x}\ntick`}
            style={{
              axis: { stroke: "black", strokeWidth: 2 },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "black" }
            }}
          />
          <VictoryAxis label="y axis" dependentAxis
            tickValues={[0, 1.5, 3, 4.5]}
            style={{
              grid: { strokeWidth: 1 },
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent", padding: 15 }
            }}
          />
          <VictoryBar style={{ data: { width: 15, fill: "orange" } }}
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
          <VictoryLine y={() => 0.5}
            style={{ data: { stroke: "gold", strokeWidth: 3 } }}
            labels={["LINE"]}
          />
        </VictoryChart>

        <h2>Primitives</h2>

        <h3>VictoryAxis</h3>
        <p>Default props</p>
        <VictoryAxis style={style}/>

        <h3>VictoryBar</h3>
        <p>Default props</p>
        <VictoryBar style={style}/>

        <h3>VictoryLine</h3>
        <p>Default props</p>
        <VictoryLine style={style}/>

        <h3>VictoryScatter</h3>
        <p>Default props</p>
        <VictoryScatter style={style}/>

          <h3>VictoryArea</h3>
          <p>Default props</p>
          <VictoryArea style={style}/>

          <h3>VictorySelectionContainer</h3>

          <VictoryGroup style={style}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryScatter
              style={{
                data: { fill: "tomato" }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
              ]}
            />
            <VictoryScatter
              style={{
                data: { fill: "blue" }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            />
            <VictoryScatter
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
              ]}
              size={(datum, active) => active ? 5 : 3}
            />
          </VictoryGroup>

          <VictoryStack style={style}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryBar
              style={{
                data: {
                  fill: "tomato",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "orange",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "gold",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
              ]}
            />
          </VictoryStack>
      </div>
    );
  }
}

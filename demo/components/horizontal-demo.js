/*eslint-disable no-magic-numbers */

import React from "react";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryScatter} from "../../packages/victory-scatter/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryArea } from "../../packages/victory-area/src/index";
import { range, random } from "lodash";

class App extends React.Component {
  getBarData() {
    return range(5).map(() => {
      return [
        { x: "cat", y: random(10) },
        { x: "dog", y: random(10) },
        { x: "bird", y: random(10) }
      ];
    });
  }

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
      <div style={containerStyle}>
        <VictoryChart horizontal style={chartStyle} >
          <VictoryBar
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 3, sort: 3 }
            ]}
            sortKey={"sort"}
            labels={() => "hi"}
          />
          <VictoryScatter
            style={{ data: { fill: "tomato" }}}
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 4, sort: 3 }
            ]}
            sortKey={"sort"}
          />
          <VictoryLine
            style={{ data: { stroke: "tomato" }}}
            data={[
              { x: "low", y: 1, sort: 1 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 4, sort: 3 }
            ]}
            sortKey={"sort"}
          />
        </VictoryChart>
        <VictoryChart style={chartStyle}>
          <VictoryBar
            horizontal
            data={[
              { x: "low", y: 1, sort: 3 },
              { x: "med", y: 2, sort: 2 },
              { x: "high", y: 3, sort: 1 }
            ]}
            sortKey={"sort"}
          />
        </VictoryChart>

        <VictoryChart style={chartStyle}>
          <VictoryBar
            horizontal
            alignment="start"
            data={[
              { x: 2, y: "Echo" },
              { x: 6, y: "Foxtrot" },
              { x: 3, y: "Golf" },
              { x: 4, y: "Hotel" }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={chartStyle} domainPadding={{ y: 30 }}>
          <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
            <VictoryStack colorScale={"red"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"green"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"blue"}>
              {this.getBarData().map((data, index) => {
                return <VictoryBar horizontal key={index} data={data} />;
              })}
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart style={chartStyle}>
          <VictoryGroup>
            <VictoryStack
              labels={["a", "b", "c"]}
              horizontal
              offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar data={[{ x: "a", y: 1 }, { x: "b", y: 2 }, { x: "c", y: 5 }]} />
              <VictoryBar data={[{ x: "a", y: 2 }, { x: "b", y: 1 }, { x: "c", y: 7 }]} />
              <VictoryBar data={[{ x: "a", y: 3 }, { x: "b", y: 4 }, { x: "c", y: 9 }]} />
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>
        <VictoryChart style={chartStyle}>
          <VictoryGroup labels={["a", "b", "c"]} horizontal offset={20} colorScale={"qualitative"}>
            <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
            <VictoryBar data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
            <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
          </VictoryGroup>
        </VictoryChart>

        <VictoryArea horizontal
          style={{
            parent: chartStyle.parent,
            data: { stroke: "red", strokeWidth: 2 }
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: null },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 }
          ]}
        />

        <VictoryLine horizontal
          style={{
            parent: chartStyle.parent,
            data: { stroke: "red", strokeWidth: 2 }
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: null },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 }
          ]}
        />
        <VictoryBar horizontal
          style={chartStyle}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 }
          ]}
        />
        <VictoryChart horizontal style={chartStyle}>
          <VictoryStack>
            <VictoryArea
              data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 7 }]}
            />
            <VictoryArea
              data={[{ x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 7 }, { x: 5, y: 5 }]}
            />
            <VictoryArea
              data={[{ x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 6 }, { x: 4, y: 2 }, { x: 5, y: 6 }]}
            />
            <VictoryArea
              data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 7 }]}
            />
          </VictoryStack>
        </VictoryChart>

      </div>
    );
  }
}

export default App;

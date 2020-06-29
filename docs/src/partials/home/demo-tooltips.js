import React from "react";
import {
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryChart,
  VictoryLine,
  VictoryAxis
} from "victory";

import importedTheme from "../../styles/theme";

export default class App extends React.Component {
  getStyles() {
    return {
      parent: {
        boxSizing: "border-box",
        display: "block",
        margin: "0 auto",
        padding: 0
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <VictoryChart
        style={styles}
        domainPadding={{ y: 2 }}
        width={450}
        height={350}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                cornerRadius={0}
                flyoutStyle={{ fill: importedTheme.color.white }}
              />
            }
          />
        }
      >
        <VictoryAxis />
        <VictoryLine
          data={[
            {
              x: 1,
              y: 5,
              l: "one"
            },
            {
              x: 1.5,
              y: 5,
              l: "one point five"
            },
            {
              x: 2,
              y: 4,
              l: "two"
            },
            {
              x: 3,
              y: -2,
              l: "three"
            }
          ]}
          style={{
            data: {
              stroke: importedTheme.color.red,
              strokeWidth: ({ active }) => (active ? 5 : 3)
            },
            labels: { fill: importedTheme.color.red }
          }}
        />

        <VictoryLine
          data={[
            {
              x: 1,
              y: -3,
              l: "red"
            },
            {
              x: 2,
              y: 5,
              l: "green"
            },
            {
              x: 3,
              y: 3,
              l: "blue"
            }
          ]}
          style={{
            data: {
              stroke: importedTheme.color.gray,
              strokeWidth: ({ active }) => (active ? 5 : 3)
            },
            labels: { fill: importedTheme.color.gray }
          }}
        />

        <VictoryLine
          data={[
            {
              x: 1,
              y: 5,
              l: "cat"
            },
            {
              x: 2,
              y: -4,
              l: "dog"
            },
            {
              x: 3,
              y: -2,
              l: "bird"
            }
          ]}
          style={{
            data: {
              stroke: importedTheme.color.black,
              strokeWidth: ({ active }) => (active ? 5 : 3)
            },
            labels: { fill: importedTheme.color.black }
          }}
        />
      </VictoryChart>
    );
  }
}

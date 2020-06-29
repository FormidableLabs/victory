/* global window:false */

import React from "react";
import { VictoryScatter, VictoryChart } from "victory";
import { range, random } from "lodash";

import importedTheme from "../../styles/theme";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    if (typeof window !== "undefined") {
      this.setStateInterval = window.setInterval(() => {
        this.setState({
          scatterData: this.getScatterData()
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.clearInterval(this.setStateInterval);
    }
  }

  getScatterData() {
    const colors = [
      ...importedTheme.color.homeCharts,
      importedTheme.color.red,
      importedTheme.color.accentBrown
    ];
    const symbols = [
      "circle",
      "star",
      "square",
      "triangleUp",
      "triangleDown",
      "diamond",
      "plus"
    ];
    return range(25).map(index => {
      const scaledIndex = Math.floor(index % 7);
      return {
        x: random(10, 50),
        y: random(2, 100),
        size: random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[random(0, 6)]
      };
    });
  }

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
        style={{ parent: styles.parent }}
        width={450}
        height={350}
        animate={{ duration: 2000 }}
      >
        <VictoryScatter
          data={this.state.scatterData}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
              opacity: 0.6
            }
          }}
        />
      </VictoryChart>
    );
  }
}

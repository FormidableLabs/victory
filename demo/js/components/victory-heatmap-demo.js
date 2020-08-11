/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { merge, random, range } from "lodash";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryHeatmap } from "Packages/victory-heatmap/src/index";
import { VictoryLine } from "Packages/victory-line/src/index";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import { VictoryTheme } from "Packages/victory-core/src/index";
import { VictoryTooltip } from "Packages/victory-tooltip/src/index";
import { VictoryStack } from "Packages/victory-stack/src/index";
import { VictoryVoronoiContainer } from "Packages/victory-voronoi-container/src/index";

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getData = ({ length = 100, min = 0, max = 10, dates = false } = {}) => {
  const randomDataFunc = dates ? randomDate : random;
  return range(length).map(() => ({
    x: randomDataFunc(min, max),
    y: randomDataFunc(min, max)
  }));
};

export default class App extends React.Component {
  data = getData();
  data2 = getData({ max: 100 });
  dateData = getData({ dates: true, min: new Date(2012, 0, 1), max: new Date(2014, 0, 1) });

  constructor() {
    super();
    this.state = {
      dataLoadedInWithBins: {
        data: undefined,
        bins: [0, 25, 50, 100]
      },

      dataLoadedInWithoutBins: {
        data: undefined,
        bins: undefined
      },

      dynamicBinsBasedOnData: {
        data: getData({ max: 100 }),
        bins: undefined
      },

      dynamicBins: {
        data: getData({ max: 100 }),
        bins: range(0, 100, 20)
      },

      dateDataLoadedInWithBins: {
        data: undefined,
        bins: [new Date(2012, 0, 1), new Date(2013, 0, 1), new Date(2014, 0, 1)]
      },

      dateDataLoadedInWithoutBins: {
        data: undefined,
        bins: [new Date(2012, 0, 1), new Date(2013, 0, 1)]
      },

      dateDynamicBinsBasedOnData: {
        data: getData({ dates: true, min: new Date(2012, 2, 1), max: new Date(2015, 1, 1) }),
        bins: undefined
      },

      dateDynamicBins: {
        data: getData({ dates: true, min: new Date(2012, 0, 1), max: new Date(2012, 12, 1) }),
        bins: range(random(1, 12)).map((i) => new Date(2012, i, 1))
      },

      style: this.getStyles()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      const randomValue = random(300);

      this.setState({
        dataLoadedInWithBins: {
          data: getData({ max: 100 }),
          bins: [0, 25, 50, 100]
        },

        dataLoadedInWithoutBins: {
          data: getData({ max: 100 }),
          bins: undefined
        },

        dynamicBinsBasedOnData: {
          data: getData({ max: random(100) }),
          bins: undefined
        },

        dynamicBins: {
          data: getData({ max: randomValue }),
          bins: range(0, randomValue, 10)
        },

        dateDataLoadedInWithBins: {
          data: getData({ dates: true, min: new Date(2012, 0, 1), max: new Date(2014, 0, 1) }),
          bins: [new Date(2012, 0, 1), new Date(2013, 0, 1), new Date(2014, 0, 1)]
        },

        dateDataLoadedInWithoutBins: {
          data: getData({ dates: true, min: new Date(2012, 0, 1), max: new Date(2014, 0, 1) }),
          bins: undefined
        },

        dateDynamicBinsBasedOnData: {
          data: getData({
            dates: true,
            min: new Date(2012, 2, 1),
            max: new Date(random(2013, 2020), 1, 1)
          }),
          bins: undefined
        },

        dateDynamicBins: {
          data: getData({ dates: true, min: new Date(2012, 0, 1), max: new Date(2012, 12, 1) }),
          bins: range(random(1, 12)).map((i) => new Date(2012, i, 1))
        },

        style: this.getStyles()
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getStyles() {
    const colors = ["palevioletred", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>

        <VictoryHeatmap
          style={{
            parent: parentStyle,
            data: { stroke: "#1f4068", strokeWidth: 4, fill: "#e43f5a" }
          }}
          data={this.data}
        />

      </div>
    );
  }
}

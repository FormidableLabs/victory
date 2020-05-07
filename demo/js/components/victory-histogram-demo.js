/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { merge, random, range } from "lodash";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryHistogram } from "Packages/victory-histogram/src/index";
import { VictoryLine } from "Packages/victory-line/src/index";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import { VictoryContainer, VictoryTheme } from "Packages/victory-core/src/index";
import { VictoryTooltip } from "Packages/victory-tooltip/src/index";

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getData = ({ length = 100, min = 0, max = 10, dates = false } = {}) => {
  const randomDataFunc = dates ? randomDate : random;
  return range(length).map(() => ({
    x: randomDataFunc(min, max)
  }));
};

export default class App extends React.Component {
  data = getData();
  data2 = getData({ max: 100 });

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

      style: {
        stroke: "blue",
        strokeWidth: 2
      }
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
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
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
        <VictoryHistogram style={{ parent: parentStyle }} data={this.data} />

        <VictoryHistogram
          horizontal
          style={{
            parent: parentStyle,
            data: { stroke: "#1f4068", strokeWidth: 4, fill: "#e43f5a" }
          }}
          data={this.data}
        />

        <VictoryHistogram
          horizontal
          cornerRadius={10}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data}
        />

        <VictoryHistogram
          barSpacing={5}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
        />

        <VictoryHistogram
          barSpacing={50}
          style={{
            parent: parentStyle,
            data: this.state.style
          }}
          animate={{ duration: 400 }}
          data={this.data2}
        />

        <VictoryHistogram
          bins={3}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
        />

        <VictoryHistogram
          bins={100}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
        />

        <VictoryHistogram
          horizontal
          bins={100}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
        />

        <VictoryHistogram
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
        />

        <VictoryHistogram
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 1, fill: "#355c7d" }
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return { style: merge({}, props.style, { fill: "pink" }) };
                      }
                    },
                    {
                      target: "labels",
                      eventKey: 99,
                      mutation: () => {
                        return { text: "hey" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
          data={this.data2}
        />

        <VictoryHistogram
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
          labels={({ datum }) => `${datum.x} - ${datum.end}`}
        />

        <VictoryHistogram
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
          labels={({ datum }) => `${datum.x} - ${datum.end}`}
          labelComponent={<VictoryTooltip active />}
        />

        <VictoryHistogram
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
          }}
          data={this.data2}
          labels={({ datum }) =>
            `${datum.binnedDatums.length} data points were grouped into this bin`
          }
          labelComponent={<VictoryTooltip active />}
        />

        <VictoryChart style={{ parent: parentStyle }}>
          <VictoryHistogram
            bins={[0, 20, 50, 70, 100]}
            style={{
              data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
            }}
            data={this.data2}
          />
          <VictoryLine
            style={{ data: { stroke: "red" } }}
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 50 },
              { x: 120, y: 8 }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }}>
          <VictoryHistogram
            bins={[0, 20, 50, 70, 100]}
            style={{
              data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
            }}
            data={this.data2}
          />
          <VictoryScatter
            style={{ data: { fill: "red" } }}
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 12 },
              { x: 120, y: 8 }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }}>
          <VictoryHistogram
            horizontal
            bins={[0, 20, 50, 70, 100]}
            style={{
              data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
            }}
            data={this.data2}
          />
          <VictoryLine
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 50 },
              { x: 120, y: 8 }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }} animate={{ duration: 500 }}>
          <VictoryHistogram
            barSpacing={20}
            data={this.state.dataLoadedInWithBins.data}
            bins={this.state.dataLoadedInWithBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }} animate={{ duration: 500 }}>
          <VictoryHistogram
            data={this.state.dataLoadedInWithoutBins.data}
            bins={this.state.dataLoadedInWithoutBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }}>
          <VictoryHistogram
            barSpacing={5}
            data={this.state.dynamicBins.data}
            bins={this.state.dynamicBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }}>
          <VictoryHistogram
            data={this.state.dynamicBinsBasedOnData.data}
            bins={this.state.dynamicBinsBasedOnData.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
          scale={{ x: "time" }}
        >
          <VictoryHistogram
            data={this.state.dateDataLoadedInWithBins.data}
            bins={this.state.dateDataLoadedInWithBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
          scale={{ x: "time" }}
        >
          <VictoryHistogram
            data={this.state.dateDataLoadedInWithoutBins.data}
            bins={this.state.dateDataLoadedInWithoutBins.bins}
            animate={{ duration: 1000 }}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }} animate={{ duration: 500 }}>
          <VictoryHistogram
            data={this.state.dateDynamicBinsBasedOnData.data}
            bins={this.state.dateDynamicBinsBasedOnData.bins}
            animate={{ duration: 1000 }}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }} animate={{ duration: 500 }}>
          <VictoryHistogram
            data={this.state.dateDynamicBins.data}
            bins={this.state.dateDynamicBins.bins}
            animate={{ duration: 500 }}
          />
        </VictoryChart>
      </div>
    );
  }
  j;
}

/*
basic example
basic example horizontal
example with scatter
example where data is animating + style
*/

/*
- styling
- animations
- labels
- scale
- dates
- multi chart
- clicking to alter fill
*/

/*
static bins animating

data loading in without preexisting bins

data loading in with preexisting bins

bins changing
*/

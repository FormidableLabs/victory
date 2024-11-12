import React from "react";
import { random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryHistogram } from "victory-histogram";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryTheme } from "victory-core";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryStack } from "victory-stack";
import { VictoryVoronoiContainer } from "victory-voronoi-container";

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const getData = ({
  length = 100,
  min = 0,
  max = 10,
  dates = false,
}: {
  length?: number;
  min?: number | Date | any;
  max?: number | Date | any;
  dates?: boolean;
} = {}) => {
  const randomDataFunc = dates ? randomDate : random;
  return range(length).map(() => ({
    x: randomDataFunc(min, max),
  }));
};

type HistogramData = {
  data: { x: any }[] | undefined;
  bins: any;
};

interface VictoryBarDemoState {
  dataLoadedInWithBins: HistogramData;
  dataLoadedInWithoutBins: HistogramData;
  dynamicBinsBasedOnData: HistogramData;
  dynamicBins: HistogramData;
  dateDataLoadedInWithBins: HistogramData;
  dateDataLoadedInWithoutBins: HistogramData;
  dateDynamicBinsBasedOnData: HistogramData;
  dateDynamicBins: HistogramData;
  style: {
    fill: string;
  };
}

export default class App extends React.Component<{}, VictoryBarDemoState> {
  setStateInterval?: number = undefined;

  data = getData();
  data2 = getData({ max: 100 });
  dateData = getData({
    dates: true,
    min: new Date(2012, 0, 1),
    max: new Date(2014, 0, 1),
  });

  constructor(props: any) {
    super(props);
    this.state = {
      dataLoadedInWithBins: {
        data: undefined,
        bins: [0, 25, 50, 100],
      },

      dataLoadedInWithoutBins: {
        data: undefined,
        bins: undefined,
      },

      dynamicBinsBasedOnData: {
        data: getData({ max: 100 }),
        bins: undefined,
      },

      dynamicBins: {
        data: getData({ max: 100 }),
        bins: range(0, 100, 20),
      },

      dateDataLoadedInWithBins: {
        data: undefined,
        bins: [
          new Date(2012, 0, 1),
          new Date(2013, 0, 1),
          new Date(2014, 0, 1),
        ],
      },

      dateDataLoadedInWithoutBins: {
        data: undefined,
        bins: [new Date(2012, 0, 1), new Date(2013, 0, 1)],
      },

      dateDynamicBinsBasedOnData: {
        data: getData({
          dates: true,
          min: new Date(2012, 2, 1),
          max: new Date(2015, 1, 1),
        }),
        bins: undefined,
      },

      dateDynamicBins: {
        data: getData({
          dates: true,
          min: new Date(2012, 0, 1),
          max: new Date(2012, 12, 1),
        }),
        bins: range(random(1, 12)).map((i) => new Date(2012, i, 1)),
      },

      style: this.getStyles(),
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      const randomValue = random(300);

      this.setState({
        dataLoadedInWithBins: {
          data: getData({ max: 100 }),
          bins: [0, 25, 50, 100],
        },

        dataLoadedInWithoutBins: {
          data: getData({ max: 100 }),
          bins: undefined,
        },

        dynamicBinsBasedOnData: {
          data: getData({ max: random(100) }),
          bins: undefined,
        },

        dynamicBins: {
          data: getData({ max: randomValue }),
          bins: range(0, randomValue, 10),
        },

        dateDataLoadedInWithBins: {
          data: getData({
            dates: true,
            min: new Date(2012, 0, 1),
            max: new Date(2014, 0, 1),
          }),
          bins: [
            new Date(2012, 0, 1),
            new Date(2013, 0, 1),
            new Date(2014, 0, 1),
          ],
        },

        dateDataLoadedInWithoutBins: {
          data: getData({
            dates: true,
            min: new Date(2012, 0, 1),
            max: new Date(2014, 0, 1),
          }),
          bins: undefined,
        },

        dateDynamicBinsBasedOnData: {
          data: getData({
            dates: true,
            min: new Date(2012, 2, 1),
            max: new Date(random(2013, 2020), 1, 1),
          }),
          bins: undefined,
        },

        dateDynamicBins: {
          data: getData({
            dates: true,
            min: new Date(2012, 0, 1),
            max: new Date(2012, 12, 1),
          }),
          bins: range(random(1, 12)).map((i) => new Date(2012, i, 1)),
        },

        style: this.getStyles(),
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getStyles() {
    const colors = VictoryTheme.clean.palette?.qualitative ?? [
      "palevioletred",
      "orange",
      "cyan",
      "green",
      "blue",
      "purple",
    ];
    return {
      fill: colors[random(0, colors.length - 1)],
    };
  }

  render() {
    const parentStyle = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%",
    };
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryHistogram
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          data={this.data}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => [
                  {
                    mutation: (props) => {
                      return {
                        style: {
                          ...props.style,
                          fill: VictoryTheme.clean.palette?.colors?.orange,
                        },
                      };
                    },
                  },
                ],
                onMouseOut: () => ({
                  mutation: () => null,
                }),
              },
            },
          ]}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          horizontal
          style={{
            parent: parentStyle,
            data: {
              fill: VictoryTheme.clean.palette?.colors?.purple,
            },
          }}
          data={this.data.map(({ x }) => ({ value: x }))}
          x="value"
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: {
              fill: VictoryTheme.clean.palette?.colors?.green,
            },
          }}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: this.state.style,
          }}
          animate={{ duration: 800 }}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          bins={30}
          style={{
            parent: parentStyle,
          }}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          horizontal
          bins={100}
          style={{
            parent: parentStyle,
            data: {
              fill: VictoryTheme.clean.palette?.colors?.orange,
            },
          }}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: {
              fill: VictoryTheme.clean.palette?.colors?.blue,
            },
          }}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          style={{
            parent: parentStyle,
            data: {
              fill: VictoryTheme.clean.palette?.colors?.red,
            },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: VictoryTheme.clean.palette?.colors?.purple,
                          }),
                        };
                      },
                    },
                    {
                      target: "labels",
                      eventKey: 99,
                      mutation: () => {
                        return { text: "hey" };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          data={this.data2}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { fill: VictoryTheme.clean.palette?.colors?.green },
          }}
          data={this.data2}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { fill: VictoryTheme.clean.palette?.colors?.red },
          }}
          data={this.data2}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
          labelComponent={<VictoryTooltip active />}
        />

        <VictoryHistogram
          theme={VictoryTheme.clean}
          bins={[0, 20, 50, 500]}
          style={{
            parent: parentStyle,
            data: { fill: VictoryTheme.clean.palette?.colors?.yellow },
          }}
          data={this.data2}
          labels={({ datum }) =>
            `${datum.binnedData.length} data points were grouped into this bin`
          }
          labelComponent={<VictoryTooltip active />}
        />

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={() => "hi"}
              voronoiDimension="x"
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          <VictoryHistogram
            bins={[0, 20, 50, 70, 100]}
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.teal },
            }}
            data={this.data2}
          />
          <VictoryLine
            style={{
              data: { stroke: VictoryTheme.clean.palette?.colors?.purple },
            }}
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 50 },
              { x: 120, y: 8 },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={() => "hi"}
              voronoiDimension="x"
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.orange },
            }}
            data={this.dateData}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={() => "hi"}
              voronoiDimension="x"
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          <VictoryHistogram
            horizontal
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.red },
            }}
            data={this.dateData}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram bins={[0, 20, 50, 70, 100]} data={this.data2} />
          <VictoryScatter
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 12 },
              { x: 120, y: 8 },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram
            horizontal
            bins={[0, 20, 50, 70, 100]}
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.yellow },
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
              { x: 120, y: 8 },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
        >
          <VictoryHistogram
            data={this.state.dataLoadedInWithBins.data}
            bins={this.state.dataLoadedInWithBins.bins}
            animate={{ duration: 1500 }}
            style={{ data: { fill: VictoryTheme.clean.palette?.colors?.red } }}
          />
          <VictoryLine
            style={{
              data: { stroke: VictoryTheme.clean.palette?.colors?.yellow },
            }}
            data={[
              { x: 0, y: 5 },
              { x: 10, y: 5 },
              { x: 20, y: 2 },
              { x: 30, y: 9 },
              { x: 50, y: 2 },
              { x: 60, y: 4 },
              { x: 80, y: 50 },
              { x: 120, y: 8 },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
        >
          <VictoryHistogram
            data={this.state.dataLoadedInWithoutBins.data}
            bins={this.state.dataLoadedInWithoutBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram
            data={this.state.dynamicBins.data}
            bins={this.state.dynamicBins.bins}
            animate={{ duration: 1500 }}
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.green },
            }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.blue },
            }}
            horizontal
            data={this.state.dynamicBinsBasedOnData.data}
            bins={this.state.dynamicBinsBasedOnData.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
          scale={{ x: "time" }}
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.purple },
            }}
            data={this.state.dateDataLoadedInWithBins.data}
            bins={this.state.dateDataLoadedInWithBins.bins}
            animate={{ duration: 1500 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 500 }}
          scale={{ x: "time" }}
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.orange },
            }}
            data={this.state.dateDataLoadedInWithoutBins.data}
            bins={this.state.dateDataLoadedInWithoutBins.bins}
            animate={{ duration: 1000 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.yellow },
            }}
            data={this.state.dateDynamicBinsBasedOnData.data}
            bins={this.state.dateDynamicBinsBasedOnData.bins}
            animate={{ duration: 1000 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
        >
          <VictoryHistogram
            style={{
              data: { fill: VictoryTheme.clean.palette?.colors?.red },
            }}
            data={this.state.dateDynamicBins.data}
            bins={this.state.dateDynamicBins.bins}
            animate={{ duration: 500 }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          scale={{ x: "time" }}
        >
          <VictoryStack colorScale="qualitative">
            <VictoryHistogram
              data={this.state.dateDynamicBins.data}
              bins={this.state.dateDynamicBins.bins}
              animate={{ duration: 500 }}
            />
            <VictoryHistogram
              data={this.state.dateDynamicBins.data}
              bins={this.state.dateDynamicBins.bins}
              animate={{ duration: 500 }}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

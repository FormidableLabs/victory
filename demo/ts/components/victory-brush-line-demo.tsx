import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryBrushLine } from "victory-brush-line";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryLabel, VictoryTheme } from "victory-core";
import { DomainPropType, EventCallbackInterface } from "victory-core";
import _ from "lodash";

type DataType = {
  name: string;
  strength: number;
  intelligence: number;
  speed: number;
  luck: number;
}[];

interface DataSet {
  name?: string;
  data?: { x: string; y: number }[];
}

const data: DataType = [
  { name: "Adrien", strength: 5, intelligence: 30, speed: 500, luck: 3 },
  { name: "Brice", strength: 1, intelligence: 13, speed: 550, luck: 2 },
  { name: "Casey", strength: 4, intelligence: 15, speed: 80, luck: 1 },
  { name: "Drew", strength: 3, intelligence: 25, speed: 600, luck: 5 },
  { name: "Erin", strength: 9, intelligence: 50, speed: 350, luck: 4 },
  { name: "Francis", strength: 2, intelligence: 40, speed: 200, luck: 2 },
];

const themeColors = VictoryTheme.clean.palette?.colors || {};

interface BrushLineDemoState {
  maximumValues: number[];
  datasets: DataSet[];
  filters: {} | { key: any };
  activeDatasets: string[] | DataSet[];
  isFiltered: boolean;
  externalMutation: EventCallbackInterface<string, string>[] | undefined;
}

const attributes: [string, string, string, string] = [
  "strength",
  "intelligence",
  "speed",
  "luck",
];
const height = 500;
const width = 500;
const padding: { [key: string]: number } = {
  top: 100,
  left: 50,
  right: 50,
  bottom: 50,
};

class App extends React.Component<any, BrushLineDemoState> {
  constructor(props: any) {
    super(props);

    this.state = {
      maximumValues: this.getMaximumValues(),
      datasets: this.normalizeData(this.getMaximumValues()),
      filters: {},
      activeDatasets: [],
      isFiltered: false,
      externalMutation: undefined,
    };
  }

  getMaximumValues() {
    return attributes.map((attribute: string) => {
      return data.reduce((memo, datum) => {
        return datum[attribute] > memo ? datum[attribute] : memo;
      }, -Infinity);
    });
  }

  normalizeData(maximumValues: number[]) {
    // construct normalized datasets by dividing the value for each attribute by the maximum value
    return data.map((datum) => ({
      name: datum.name,
      data: attributes.map((attribute, i) => ({
        x: attribute,
        y: datum[attribute] / maximumValues[i],
      })),
    }));
  }

  addNewFilters(domain: DomainPropType, props: any) {
    const filters = this.state.filters || {};
    const extent = domain && Math.abs(domain[1] - domain[0]);
    const minVal = 1 / Number.MAX_VALUE;
    filters[props.name] = extent <= minVal ? undefined : domain;

    return filters;
  }

  getActiveDatasets(filters: {}): string[] {
    // Return the names from all datasets that have values within all filters
    const isActive = (dataset: DataSet): (string | null | undefined)[] => {
      return _.keys(filters).reduce((memo: any, name) => {
        if (!memo || !Array.isArray(filters[name])) {
          return memo;
        }
        const point = _.find(dataset.data, (d) => d.x === name);
        return (
          point &&
          Math.max(...filters[name]) >= point.y &&
          Math.min(...filters[name]) <= point.y
        );
      }, true);
    };

    return this.state.datasets
      .map((dataset) => (isActive(dataset) ? dataset.name : null) || "")
      .filter(Boolean);
  }

  onDomainChange(domain: DomainPropType, props: any) {
    const filters = this.addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered
      ? this.getActiveDatasets(filters)
      : this.state.datasets;
    this.setState({ activeDatasets, filters, isFiltered });
  }

  isActive(dataset: any) {
    // Determine whether a given dataset is active
    return !this.state.isFiltered
      ? true
      : _.includes(this.state.activeDatasets, dataset.name);
  }

  getAxisOffset(index: number) {
    const step =
      (width - padding.left - padding.right) / (attributes.length - 1);
    return step * index + padding.left;
  }

  removeMutation() {
    this.setState({
      externalMutation: undefined,
    });
  }

  clearMutation() {
    const callback = this.removeMutation.bind(this);

    this.setState({
      filters: {},
      activeDatasets: [],
      isFiltered: false,
      externalMutation: [
        {
          childName: attributes,
          target: "axis",
          eventKey: "all",
          mutation: () => {
            return { brushDomain: [0, 1 / Number.MAX_VALUE] };
          },
          callback,
        },
      ],
    });
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const max = this.state.maximumValues || [];

    const chartStyle: { [key: string]: React.CSSProperties } = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    return (
      <div className="demo">
        <h1>VictoryBrushLine</h1>
        <div style={containerStyle}>
          <button onClick={this.clearMutation.bind(this)}>reset domain</button>
          <VictoryChart
            theme={VictoryTheme.clean}
            style={{ parent: { maxWidth: "50%" } }}
            domain={{ y: [0, 1.1] }}
            height={height}
            width={width}
            padding={padding}
          >
            <VictoryAxis
              tickLabelComponent={<VictoryLabel y={padding.top - 40} />}
            />
            {this.state.datasets.map((dataset: DataSet) => (
              <VictoryLine
                key={dataset.name}
                name={dataset.name}
                data={dataset.data}
                groupComponent={<g />}
              />
            ))}
            {attributes.map((attribute, index) => (
              <VictoryAxis
                dependentAxis
                name={attribute}
                key={index}
                externalEventMutations={this.state.externalMutation}
                axisComponent={
                  <VictoryBrushLine
                    name={attribute}
                    width={20}
                    onBrushDomainChange={this.onDomainChange.bind(this)}
                  />
                }
                offsetX={this.getAxisOffset(index)}
                tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                tickFormat={(tick) => Math.round(tick * max[index])}
              />
            ))}
          </VictoryChart>

          <button onClick={this.clearMutation.bind(this)}>reset domain</button>
          <VictoryChart style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryBar
              data={[
                { x: "one", y: 4 },
                { x: "two", y: 5 },
                { x: "three", y: 6 },
              ]}
            />
            <VictoryAxis
              axisComponent={<VictoryBrushLine brushWidth={20} />}
              externalEventMutations={this.state.externalMutation}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.clean}
            domainPadding={{ x: 50 }}
          >
            <VictoryBar
              style={{
                data: {
                  fill: themeColors.purple,
                },
              }}
              data={[
                { x: "one", y: 4 },
                { x: "two", y: 5 },
                { x: "three", y: 6 },
              ]}
            />
            <VictoryAxis
              dependentAxis
              axisComponent={
                <VictoryBrushLine brushWidth={20} brushDomain={[2, 3]} />
              }
            />
          </VictoryChart>
          <VictoryChart style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryScatter
              data={[
                { x: "one", y: 0 },
                { x: "two", y: 2 },
                { x: "three", y: 4 },
              ]}
            />
            <VictoryAxis gridComponent={<VictoryBrushLine brushWidth={20} />} />
          </VictoryChart>
          <VictoryChart style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryScatter
              data={[
                { x: "one", y: 0 },
                { x: "two", y: 2 },
                { x: "three", y: 4 },
              ]}
            />
            <VictoryAxis
              dependentAxis
              crossAxis={false}
              gridComponent={<VictoryBrushLine brushWidth={20} />}
            />
          </VictoryChart>

          <VictoryAxis
            style={chartStyle}
            theme={VictoryTheme.clean}
            gridComponent={
              <VictoryBrushLine brushWidth={20} brushDomain={[0, 10]} />
            }
          />
        </div>
      </div>
    );
  }
}

export default App;

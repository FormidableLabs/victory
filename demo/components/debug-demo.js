/*eslint-disable no-magic-numbers */

import React from "react";
import {
  VictoryChart, VictoryAxis, VictoryLine, VictoryBrushLine
} from "../../src/index";
import { VictoryLabel } from "victory-core";
import _ from "lodash";

const data = [
  { name: "Adrien", strength: 5, intelligence: 30, speed: 500, luck: 3 },
  { name: "Brice", strength: 1, intelligence: 13, speed: 550, luck: 2 },
  { name: "Casey", strength: 4, intelligence: 15, speed: 80, luck: 1 },
  { name: "Drew", strength: 3, intelligence: 25, speed: 600, luck: 5 },
  { name: "Erin", strength: 9, intelligence: 50, speed: 350, luck: 4 },
  { name: "Francis", strength: 2, intelligence: 40, speed: 200, luck: 2 }
];

const attributes = ["strength", "intelligence", "speed", "luck"];
const height = 500;
const width = 500;
const padding = { top: 100, left: 50, right: 50, bottom: 50 };

class App extends React.Component {
  constructor() {
    super();
    const maximumValues = this.getMaximumValues();
    const datasets = this.normalizeData(maximumValues);
    this.state = {
      maximumValues,
      datasets,
      filters: {},
      activeDatasets: [],
      isFiltered: false,
      externalMutation: undefined
    };
  }

  getMaximumValues() {
    return attributes.map((attribute) => {
      return data.reduce((memo, datum) => {
        return datum[attribute] > memo ? datum[attribute] : memo;
      }, -Infinity);
    });
  }

  normalizeData(maximumValues) {
    // construct normalized datasets by dividing the value for each attribute by the maximum value
    return data.map((datum) => ({
      name: datum.name,
      data: attributes.map((attribute, i) => ({
        x: attribute,
        y: datum[attribute] / maximumValues[i]
      }))
    }));
  }

  addNewFilters(domain, props) {
    const filters = this.state.filters || {};
    const extent = domain && Math.abs(domain[1] - domain[0]);
    const minVal = 1 / Number.MAX_SAFE_INTEGER;
    filters[props.name] = extent <= minVal ? undefined : domain;
    return filters;
  }

  getActiveDatasets(filters) {
    // Return the names from all datasets that have values within all filters
    const isActive = (dataset) => {
      return _.keys(filters).reduce((memo, name) => {
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
      .map((dataset) => {
        return isActive(dataset, filters) ? dataset.name : null;
      })
      .filter(Boolean);
  }

  onDomainChange(domain, props) {
    const filters = this.addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered
      ? this.getActiveDatasets(filters)
      : this.state.datasets;
    this.setState({ activeDatasets, filters, isFiltered });
  }

  isActive(dataset) {
    // Determine whether a given dataset is active
    return !this.state.isFiltered
      ? true
      : _.includes(this.state.activeDatasets, dataset.name);
  }

  getAxisOffset(index) {
    const step =
      (width - padding.left - padding.right) / (attributes.length - 1);
    return step * index + padding.left;
  }

  removeMutation() {
    this.setState({
      externalMutation: undefined
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
            return { brushDomain: [0, 1 / Number.MAX_SAFE_INTEGER] };
          },
          callback
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.clearMutation.bind(this)}>reset domain</button>
        <VictoryChart style={{ parent: { maxWidth: "50%" } }}
          domain={{ y: [0, 1.1] }}
          height={height}
          width={width}
          padding={padding}
        >
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 20 },
              axis: { stroke: "none" }
            }}
            tickLabelComponent={<VictoryLabel y={padding.top - 40} />}
          />
          {this.state.datasets.map((dataset) => (
            <VictoryLine
              key={dataset.name}
              name={dataset.name}
              data={dataset.data}
              groupComponent={<g />}
              style={{
                data: {
                  stroke: "tomato",
                  opacity: this.isActive(dataset) ? 1 : 0.2
                }
              }}
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
              style={{
                tickLabels: { fontSize: 15, padding: 15, pointerEvents: "none" }
              }}
              tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
              tickFormat={(tick) =>
                Math.round(tick * this.state.maximumValues[index])
              }
            />
          ))}
        </VictoryChart>
      </div>
    );
  }
}

export default App;

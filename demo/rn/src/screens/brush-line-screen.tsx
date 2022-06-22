import * as React from "react";
import { Dimensions, ScrollView } from "react-native";
import {
  VictoryAxis,
  VictoryBrushLine,
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryLabel,
  VictoryBar,
  VictoryContainer,
} from "victory-native";
import { DomainTuple } from "victory-core";
import _ from "lodash";

import viewStyles from "../styles/view-styles";
import { VictoryBrushLineProps } from "victory-brush-line";

type DataType = {
  name: string;
  strength: number;
  intelligence: number;
  speed: number;
  luck: number;
}[];

interface DataSet {
  name: string;
  data: { x: string; y: number }[];
}

const data: DataType = [
  { name: "Adrien", strength: 5, intelligence: 30, speed: 500, luck: 3 },
  { name: "Brice", strength: 1, intelligence: 13, speed: 550, luck: 2 },
  { name: "Casey", strength: 4, intelligence: 15, speed: 80, luck: 1 },
  { name: "Drew", strength: 3, intelligence: 25, speed: 600, luck: 5 },
  { name: "Erin", strength: 9, intelligence: 50, speed: 350, luck: 4 },
  { name: "Francis", strength: 2, intelligence: 40, speed: 200, luck: 2 },
];

type Attribute = "strength" | "intelligence" | "speed" | "luck";
const attributes: Attribute[] = ["strength", "intelligence", "speed", "luck"];

type Filter = Record<Attribute, number[] | undefined>;

const width = Dimensions.get("window").width;
const padding: { [key: string]: number } = {
  top: 100,
  left: 50,
  right: 50,
  bottom: 50,
};

function normalizeData(maximumValues: number[]) {
  // construct normalized datasets by dividing the value for each attribute by the maximum value
  return data.map((datum) => ({
    name: datum.name,
    data: attributes.map((attribute, i) => ({
      x: attribute,
      y: datum[attribute] / maximumValues[i],
    })),
  }));
}

function getMaximumValues() {
  return attributes.map((attribute) => {
    return data.reduce((memo, datum) => {
      return datum[attribute] > memo ? datum[attribute] : memo;
    }, -Infinity);
  });
}

function getAxisOffset(index: number) {
  const step = (width - padding.left - padding.right) / (attributes.length - 1);
  return step * index + padding.left;
}

export const BrushLineScreen: React.FC = () => {
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [maximumValues] = React.useState(getMaximumValues());
  const [datasets] = React.useState<DataSet[]>(normalizeData(maximumValues));
  const [filters, setFilters] = React.useState<Filter>({
    intelligence: undefined,
    strength: undefined,
    luck: undefined,
    speed: undefined,
  });
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [activeDatasets, setActiveDatasets] = React.useState<string[]>([]);

  const onDomainChange = (
    domain: DomainTuple,
    props: VictoryBrushLineProps | undefined,
  ) => {
    const filters = addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered
      ? getActiveDatasets(filters)
      : datasets.map((x) => x.name);
    setFilters(filters);
    setIsFiltered(isFiltered);
    setActiveDatasets(activeDatasets);
  };

  const addNewFilters = (
    domain: DomainTuple,
    props: VictoryBrushLineProps | undefined,
  ): Filter => {
    if (!domain) return filters;
    if (typeof domain[0] != "number") return filters;
    if (typeof domain[1] != "number") return filters;
    if (!props) return filters;

    const dm = domain as [number, number];
    const currentFilters = filters;
    const extent = dm && Math.abs(dm[1] - dm[0]);
    const minVal = 1 / Number.MAX_VALUE;

    currentFilters[props.name as Attribute] = extent <= minVal ? undefined : dm;

    return currentFilters;
  };

  const getActiveDatasets = (filters: Filter): string[] => {
    // Return the names from all datasets that have values within all filters
    const isActive = (dataset: DataSet): (string | null | undefined)[] => {
      return Object.keys(filters).reduce((memo: any, name) => {
        let filter = name as keyof Filter;

        if (!memo || !Array.isArray(filters[filter])) {
          return memo;
        }
        const point = _.find(dataset.data, (d) => d.x === filter);
        let tuple = filters[filter];
        return (
          point &&
          tuple &&
          Math.max(...tuple) >= point.y &&
          Math.min(...tuple) <= point.y
        );
      }, true);
    };

    return datasets
      .map((dataset) => (isActive(dataset) ? dataset.name : null))
      .filter(Boolean) as string[];
  };

  const isActive = (dataset: DataSet): boolean => {
    // Determine whether a given dataset is active
    return !isFiltered ? true : _.includes(activeDatasets, dataset.name);
  };

  const max = maximumValues || [];

  return (
    <ScrollView scrollEnabled={scrollEnabled} style={viewStyles.container}>
      <VictoryChart
        containerComponent={
          <VictoryContainer
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />
        }
        domain={{ y: [0, 1.1] }}
        width={width}
        padding={padding}
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 20 },
            axis: { stroke: "none" },
          }}
          tickLabelComponent={<VictoryLabel y={padding.top - 40} />}
        />
        {datasets.map((dataset: DataSet) => (
          <VictoryLine
            key={dataset.name}
            name={dataset.name}
            data={dataset.data}
            style={{
              data: {
                stroke: "tomato",
                opacity: isActive(dataset) ? 1 : 0.2,
              },
            }}
          />
        ))}
        {attributes.map((attribute, index) => (
          <VictoryAxis
            dependentAxis
            name={attribute}
            key={index}
            axisComponent={
              <VictoryBrushLine
                name={attribute}
                width={20}
                onTouchStart={() => setScrollEnabled(false)}
                onTouchEnd={() => setScrollEnabled(true)}
                onBrushDomainChange={onDomainChange}
              />
            }
            offsetX={getAxisOffset(index)}
            style={{
              tickLabels: {
                fontSize: 15,
                padding: 15,
                pointerEvents: "none",
              },
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(tick) => Math.round(tick * max[index])}
          />
        ))}
      </VictoryChart>
      <VictoryChart>
        <VictoryScatter
          data={[
            { x: "one", y: 0 },
            { x: "two", y: 2 },
            { x: "three", y: 4 },
          ]}
        />
        <VictoryAxis
          gridComponent={
            <VictoryBrushLine
              onTouchStart={() => setScrollEnabled(false)}
              onTouchEnd={() => setScrollEnabled(true)}
              brushWidth={20}
            />
          }
        />
      </VictoryChart>
      <VictoryChart domainPadding={{ x: 80 }}>
        <VictoryBar
          data={[
            { x: "one", y: 4 },
            { x: "two", y: 5 },
            { x: "three", y: 6 },
          ]}
        />
        <VictoryAxis
          dependentAxis
          axisComponent={
            <VictoryBrushLine
              onTouchStart={() => setScrollEnabled(false)}
              onTouchEnd={() => setScrollEnabled(true)}
              brushWidth={20}
              brushDomain={[2, 3]}
            />
          }
        />
      </VictoryChart>
      <VictoryChart domainPadding={50}>
        <VictoryScatter
          size={4}
          style={{ data: { fill: "tomato" } }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 4 },
          ]}
        />
        <VictoryAxis
          tickValues={[1, 2, 3]}
          gridComponent={
            <VictoryBrushLine
              onTouchStart={() => setScrollEnabled(false)}
              onTouchEnd={() => setScrollEnabled(true)}
              width={30}
            />
          }
        />
      </VictoryChart>

      <VictoryAxis
        standalone
        gridComponent={
          <VictoryBrushLine
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
            brushWidth={10}
            brushDomain={[0, 10]}
          />
        }
      />
    </ScrollView>
  );
};

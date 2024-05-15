---
id: 0
title: Parallel Brush Axes
---

```playground_norender
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
const width = 700;
const padding = { top: 100, left: 50, right: 50, bottom: 50 };

function getMaximumValues() {
  // Find the maximum value for each axis. This will be used to normalize data and re-scale axis ticks
  return attributes.map((attribute) => {
    return data.reduce((memo, datum) => {
      return datum[attribute] > memo ? datum[attribute] : memo;
    }, -Infinity);
  });
}

function normalizeData(maximumValues) {
  // construct normalized datasets by dividing the value for each attribute by the maximum value
  return data.map((datum) => ({
    name: datum.name,
    data: attributes.map((attribute, i) => (
      { x: attribute, y: datum[attribute] / maximumValues[i] }
    ))
  }));
}

function App() {
  const maximumValues = getMaximumValues();
  const datasets = normalizeData(maximumValues);

  const [state, setState] = React.useState({
    maximumValues, datasets, filters: {}, activeDatasets: [], isFiltered: false
  });

  function addNewFilters(domain, props) {
    const filters = state.filters || {};
    const extent = domain && Math.abs(domain[1] - domain[0]);
    const minVal = 1 / Number.MAX_SAFE_INTEGER;
    filters[props.name] = extent <= minVal ? undefined : domain;
    return filters;
  }

  function getActiveDatasets(filters) {
    // Return the names from all datasets that have values within all filters
    const isActive = (dataset) => {
      return _.keys(filters).reduce((memo, name) => {
        if (!memo || !Array.isArray(filters[name])) {
          return memo;
        }
        const point = _.find(dataset.data, (d) => d.x === name);
        return point &&
          Math.max(...filters[name]) >= point.y && Math.min(...filters[name]) <= point.y;
      }, true);
    };

    return state.datasets.map((dataset) => {
      return isActive(dataset, filters) ? dataset.name : null;
    }).filter(Boolean);
  }

  function onDomainChange(domain, props) {
    const filters = addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered ? getActiveDatasets(filters) : state.datasets;
    setState({ activeDatasets, filters, isFiltered });
  }

  function isActive(dataset) {
    // Determine whether a given dataset is active
    return !state.isFiltered ? true : _.includes(state.activeDatasets, dataset.name);
  }

  function getAxisOffset(index) {
    const step = (width - padding.left - padding.right) / (attributes.length - 1);
    return step * index + padding.left;
  }

  return (
    <VictoryChart domain={{ y: [0, 1.1] }}
      height={height} width={width} padding={padding}
    >
      <VictoryAxis
        style={{
          tickLabels: { fontSize: 20 }, axis: { stroke: "none" }
        }}
        tickLabelComponent={<VictoryLabel y={padding.top - 40}/>}
      />
      {state.datasets.map((dataset) => (
        <VictoryLine
          key={dataset.name} name={dataset.name} data={dataset.data}
          groupComponent={<g/>}
          style={{ data: {
            stroke: "tomato",
            opacity: isActive(dataset) ? 1 : 0.2
          } }}
        />
      ))}
      {attributes.map((attribute, index) => (
        <VictoryAxis dependentAxis
          key={index}
          axisComponent={
            <VictoryBrushLine name={attribute}
              width={20}
              onBrushDomainChange={onDomainChange.bind(this)}
            />
          }
          offsetX={getAxisOffset(index)}
          style={{
            tickLabels: { fontSize: 15, padding: 15, pointerEvents: "none" },
          }}
          tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
          tickFormat={(tick) => Math.round(tick * state.maximumValues[index])}
        />
      ))}
    </VictoryChart>
  );
}

render(<App/>);
```

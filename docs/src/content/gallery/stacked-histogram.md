---
id: 22
title: Stacked Histogram
scope:
  - listeningData
---

```playground_norender
const groupedData = _.groupBy(listeningData, ({ genre }) => genre);

const sharedAxisStyles = {
  tickLabels: {
    fontSize: 13
  },
  axisLabel: {
    padding: 39,
    fontSize: 13,
    fontStyle: "italic"
  }
};

const App = () => {
  return (
    <VictoryChart
      height={450}
      scale={{ x: "time" }}
      containerComponent={
        <VictoryVoronoiContainer
          style={{}}
          labels={({ datum }) =>
            datum.y > 0 ? `${datum.y} ${datum.binnedData[0].genre} songs` : null
          }
        />
      }
    >
      <VictoryLabel
        x={225}
        y={25}
        textAnchor="middle"
        text="Songs listened to in 2020"
      />

      <VictoryStack
        colorScale={[
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600"
        ]}
      >
        {Object.entries(groupedData).map(([key, dataGroup]) => {
          return (
            <VictoryHistogram
              data={dataGroup}
              x="day"
              binSpacing={8}
              style={{
                data: { strokeWidth: 0 }
              }}
            />
          );
        })}
      </VictoryStack>

      <VictoryAxis
        tickCount={12}
        tickFormat={date => date.toLocaleString("default", { month: "short" })}
        style={sharedAxisStyles}
      />

      <VictoryAxis
        dependentAxis
        label="Total # of Songs"
        style={sharedAxisStyles}
      />
    </VictoryChart>
  );
};

ReactDOM.render(<App/>, mountNode);
```

---
title: Data Accessors
category: guides
scope:
  - assign
  - range
---
# Data Accessors


Most Victory components expect data in the form of an array of data objects with values specified for `x` and `y`. Victory components expose data accessor props that may be used when data is not readily available in this format. Data accessor props may be used to specify how a data prop should be used, process a elements in a data array, or to plot math functions even when no data prop is given.


## Specifying x and y data


Some Victory components like `VictoryCandlestick` and `VictoryErrorBar` have unusual accessor props that match their expected data formats, but most Victory components expose standard `x` and `y` data accessor props. These props may be used to specify which properties or elements of the data array should be plotted on the x and y axes.


When given as strings, these accessors will specify which properties of a data object to plot. The following example will plot employees on the x axis and salaries on the y axis:


```jsx
<VictoryBar
  data={[
    {employee: "Jane Doe", salary: 65000},
    {employee: "John Doe", salary: 62000}
    ...
  ]}
  x="employee"
  y="salary"
/>
```


If data is given as an array of arrays, data accessors may be given as integers to specify the index of the nested array that should be plotted.


```jsx
<VictoryBar
  data={[[0, 1], [1, 1], [2, 3], [3, 1]]}
  x={0}
  y={1}
/>
```


Data accessors may also be given as path strings or arrays to specify deeply nested data.


```jsx
<VictoryBar
  data={[
    {
      employee: { firstName: "Jane", lastName: "Doe" },
      salary: { base: 65000, bonus: 2000 }
    },
    {
      employee: { firstName: "John", lastName: "Doe" },
      salary: { base: 62000, bonus: 6000 }
    },
    ...
  ]}
  x="employee.firstName"
  y={["salary", "base"]}
/>
```


## Processing data


Data accessor props may be given as functions and used to process data, as in the following example.


```jsx live
  <VictoryChart
    domainPadding={{x: 40}}
  >
    <VictoryBar
      data={[
        { experiment: "trial 1", expected: 3.75, actual: 3.21 },
        { experiment: "trial 2", expected: 3.75, actual: 3.38 },
        { experiment: "trial 3", expected: 3.75, actual: 2.05 },
        { experiment: "trial 4", expected: 3.75, actual: 3.71 }
      ]}
      x="experiment"
      y={(d) => (d.actual / d.expected) * 100}
    />
    <VictoryAxis
      label="experiment"
      style={{
        axisLabel: { padding: 30 }
      }}
    />
    <VictoryAxis dependentAxis
      label="percent yield"
      style={{
        axisLabel: { padding: 40 }
      }}
    />
</VictoryChart>
```


## Sorting data


Sorting can be applied to the final data via the sortKey prop. This prop
corresponds to the lodash [sortBy][] function.

This prop can be provided as a string, function, or array of either.

```jsx live
  <VictoryLine
    data={_.range(0, 2 * Math.PI, 0.01).map((t) => ({t}))}
    sortKey="t"
    x={({t}) => Math.sin(3 * t + (2 * Math.PI))}
    y={({t}) => Math.sin(2 * t)}
  />
```


## Plotting functions

If data is not given, data accessor props may be used to plot math functions. In this scenarios, initial data will be generated based on the domain and number of samples. Alter the `samples` and `domain` props to change how functions are plotted.

```jsx live
  <VictoryChart>
    <VictoryLine
      samples={50}
      style={{data:
        {stroke: "red", strokeWidth: 4}
      }}
      y={(data) => Math.sin(2 * Math.PI * data.x)}
    />

    <VictoryLine
      samples={10}
      style={{data:
        {stroke: "blue", strokeWidth: 4}
      }}
      y={(data) => Math.cos(2 * Math.PI * data.x)}
    />
  </VictoryChart>
```

[sortBy]: https://lodash.com/docs/4.17.4#sortBy

VictoryGroup
=============

`VictoryGroup` is a helper for composing other victory components. It is useful for grouping several components together when they need to operate as a set. `VictoryGroup` provides some of the same functionality as `VictoryChart`-- reconciling the domain and range of its children, and coordiating shared events and animations. `VictoryGroup` also makes it convenient to create several components with the same data or shared styles. Grouped components may be used with `VictoryChart` and can be stacked as a set when nested within `VictoryStack`

## Example: Grouped Bars

Use `VictoryGroup` to group several `VictoryBar` components by x value. The `offset` prop on `VictoryGroup` controls the spacing between each series of bars in a group. Use the `colorScale` prop to automatically differentiate between each series.

```playground
<VictoryChart>
  <VictoryGroup
    offset={20}
    colorScale={[
      "tomato",
      "gold",
      "cyan"
    ]}
  >
    <VictoryBar
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 1}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 2}
      ]}
    />
  </VictoryGroup>
</VictoryChart>
```


## Example: Sharing Data and Styles

`VictoryGroup` can be used to pass data and shared styles to several components. In the example below `VictoryLine` with `VictoryScatter` are used together to create a line with data markers and labels. `VictoryGroup` provides data and coordinates the domain and range of its two children.

```playground
<VictoryGroup
  style={{
    data: {
      strokeWidth: 3,
    }  
  }}
  data={[
    {x: 1, y: 3},
    {x: 2, y: 2},      
    {x: 3, y: 4},
    {x: 4, y: 3},
    {x: 5, y: 5}
  ]}
>
  <VictoryLine
    interpolation={"cardinal"}
    style={{
      data: {
        stroke: "#822722"
      }  
  }} 
  />
  <VictoryScatter
    style={{
      data: {
        stroke: "white",
        fill: "#822722"
      },
      labels: {
        fill: "#822722",
        fontSize: 18,
        padding: 12
      }
    }}
    size={6}
    labels={[
     "a", "b", "c", "d", "e"
    ]}
  />
</VictoryGroup>
```

## Example: Stacking Sets of Components

`VictoryGroup` can also be used within `VictoryStack`, allowing sets of components to be stacked together. In the example below, each stack contains `VictoryLine` and `VictoryBar` components

```playground
<VictoryStack
  style={{
    data: {strokeDasharray: "10, 5"}
  }}
  colorScale="qualitative"
>
  <VictoryGroup
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  >
    <VictoryBar/>
    <VictoryLine/>
  </VictoryGroup>
  <VictoryGroup
    data={[
      {x: 1, y: 4},
      {x: 2, y: 5},
      {x: 3, y: 1}
    ]}
  >
    <VictoryBar/>
    <VictoryLine/>
  </VictoryGroup>
  <VictoryGroup
    data={[
      {x: 1, y: 3},
      {x: 2, y: 2},
      {x: 3, y: 5}
    ]}
  >
    <VictoryBar/>
    <VictoryLine/>
  </VictoryGroup>
</VictoryStack>
```


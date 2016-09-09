VictoryTooltip and VictoryVoronoiTooltip
=============

`VictoryTooltip` is a label component with default `onMouseOver` and `onMouseOut` behaviors. It renders a customizeable flyout container as well as
a `VictoryLabel` component. `VictoryTooltip` can be used with any Victory component by setting the `labelComponent` prop like so `labelComponent={<VictoryTooltip/>`

`VictoryVoronoiTooltip` attaches the `VictoryTooltip` label component to an invisible `VictoryVoronoi` data component. `VictoryVoronoi` tooltip is useful for adding tooltips to elements that do not have individual data elements, like `VictoryLine`, or adding tooltips to any element that is too small to hover over effectively. 

## Example: Bars with tooltips

The example below using `VictoryTooltip` as the label component of a bar chart.

```playground
<VictoryChart
  domain={{
    x: [0, 10],
    y: [-10, 10]
  }}
>
  <VictoryBar
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 2, y: 5, label: "right-side-up"},
      {x: 4, y: -6, label: "upside-down"},
      {x: 6, y: 4, label: "tiny"},
      {x: 8, y: -5, label: "or a little \n BIGGER"},
      {x: 10, y: 7, label: "automatically"}
    ]}
    style={{
      data: {fill: "tomato"}
    }}
  /> 
</VictoryChart> 
```

## Customizing Tooltips

Tooltips can be customized directly on the the `VictoryTooltip` component

```playground
<VictoryChart
  domain={{
    x: [0, 10],
    y: [-10, 10]
  }}
>
  <VictoryBar
    labelComponent={
      <VictoryTooltip
        cornerRadius={(d) => d.x > 6 ? 0 : 20}
        pointerLength={(d) => d.y > 0 ? 5 : 20}
        flyoutStyle={{
          stroke: (d) => d.x === 10 ? 
            "tomato" : "black"
        }}
      />
    }
    data={[
      {x: 2, y: 5, label: "right-side-up"},
      {x: 4, y: -6, label: "upside-down"},
      {x: 6, y: 4, label: "tiny"},
      {x: 8, y: -5, label: "or a little \n BIGGER"},
      {x: 10, y: 7, label: "automatically"}
    ]}
    style={{
      data: {fill: "tomato"}
    }}
  /> 
</VictoryChart> 
```

## Voronoi Tooltip

`VictoryVoronoiTooltip` renders a transparent voronoi diagram with `VictoryTooltip` attached. In the example below the voronoi diagram has been colored to be visible

```playground
<VictoryVoronoiTooltip
  size={30}
  data={
    range(20).map((i) => {
      return {
        x: random(600),
        y: random(600),
        label: `label-${i}`
      };
    })
  }
  style={{
    data: {
      fill: "grey", 
      opacity: 0.2
    }
  }}
/>  
```

## Example: Voronoi Tooltips on a Line

Use `VictoryGroup` to group to provide the same data and styles to several components. This is especially useful when adding voronoi tooltips to a component, as the data required by the tooltip, should be identical to the data required by the other components.

```playground
<VictoryChart
  domain={{y: [-25, 25]}}
>
  <VictoryGroup
    data={
      range(10).map((i) => {
        return {
          x: i,
          y: random(-20, 20)
        };
      })
    }
  >
    <VictoryLine/>
    <VictoryVoronoiTooltip
      labels={(d) => `x: ${d.x} \n y: ${d.y}`}
    />
  </VictoryGroup>
</VictoryChart>
```

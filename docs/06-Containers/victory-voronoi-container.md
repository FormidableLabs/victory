---
id: 29
title: VictoryVoronoiContainer
category: containers
type: docs
scope:
  - round
slug: /docs/victory-voronoi-container
---

# VictoryVoronoiContainer

`VictoryVoronoiContainer` adds the ability to associate a mouse position with the data point(s)
closest to it. When this container is added to a chart, changes in mouse position will add the `active`
prop to data and label components closest to the current mouse position. The closeness of data
points to a given position is determined by calculating a [voronoi diagram][] based on the data of
every child `VictoryVoronoiContainer` renders. This container is useful for adding hover interactions,
like tooltips, to small data points, or charts with dense or overlapping data. See
[this example][] to learn how to use `VictoryVoronoiContainer` with tooltips.

`VictoryVoronoiContainer` may be used with any Victory component that works with an x-y coordinate
system, and should be added as the `containerComponent` of the top-level component.
However, the component that uses it must be standalone
(`standalone={true}`), which is the default for all top-level Victory components.

```jsx live
<VictoryChart domainPadding={{ y: 10 }}
  containerComponent={
    <VictoryVoronoiContainer
      labels={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
    />
  }
>
  <VictoryLine
    y={(datum) => Math.sin(2 * Math.PI * datum.x)}
  />
</VictoryChart>
```

`VictoryVoronoiContainer` uses a superset of props used by [VictoryContainer][]. All props are optional.

## activateData

`type: boolean`

When the `activateData` prop is set to true, the `active` prop will be set to true on all data components within a voronoi area. When this prop is set to false, the `onActivated` and `onDeactivated` callbacks will still fire, but no mutations to data components will occur via Victory's event system.

_default:_ `activateData={true}`

## activateLabels

`type: boolean`

When the `activateLabels` prop is set to true, the `active` prop will be set to true on all labels corresponding to points within a voronoi area. When this prop is set to false, the `onActivated` and `onDeactivated` callbacks will still fire, but no mutations to label components will occur via Victory's event system. Labels defined directly on `VictoryVoronoiContainer` via the `labels` prop will still appear when this prop is set to false.

_default:_ `activateLabels={true}`

## disable

`type: boolean`

When the `disable` prop is set to `true`, `VictoryVoronoiContainer` events will not fire.

## labels

`type: function`

When a `labels` prop is provided to `VictoryVoronoiContainer` it will render a label component
rather than activating labels on the child components it renders. This is useful for creating multi-
point tooltips. This prop should be given as a function which will be called once for each active point. The `labels` function will be called with the the props that correspond to the active label.

_example:_ `labels={({ datum }) => "y: " + datum.y}`

## labelComponent

`type: element`

The `labelComponent` prop specified the component that will be rendered when `labels` are defined
on `VictoryVoronoiContainer`. If the `labels` prop is omitted, no label component will be rendered.

_default:_ `labelComponent={<VictoryTooltip centerOffset={{ x: 5 }} />}`

```jsx live
<VictoryChart domain={{ y: [0, 6] }}
  containerComponent={
    <VictoryVoronoiContainer
      labels={() => "Long, verbose labels"}
      labelComponent={
        <VictoryTooltip  dy={-7} constrainToVisibleArea />
      }
    />
  }
>
  <VictoryScatter
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[
      { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 5 }
    ]}
  />
  <VictoryScatter
    data={[
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 4 }, { x: 8, y: 5 }
    ]}
  />
</VictoryChart>
```

## mouseFollowTooltips

`type: boolean`

When the `mouseFollowTooltip` prop is set on `VictoryVoronoiContainer`, The position of the center of the tooltip follows the position of the mouse.

```jsx live
<VictoryChart domain={{ y: [0, 6] }}
  containerComponent={
    <VictoryVoronoiContainer
      mouseFollowTooltips
      voronoiDimension="x"
      labels={({ datum }) => `y: ${datum.y}`}
    />
  }
>
  <VictoryScatter
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[
      { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 5 }
    ]}
  />
  <VictoryScatter
    data={[
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 4 }, { x: 8, y: 5 }
    ]}
  />
</VictoryChart>
```

## onActivated

`type: function`

The `onActivated` prop accepts a function to be called whenever new data points are activated.
The function is called with the parameters `points` (an array of active data objects) and `props` (the props used by `VictoryVoronoiContainer`).

_example:_ `onActivated={(points, props) => filterList(points, props)}`

## onDeactivated

`type: function`

The `onDeactivated` prop accepts a function to be called whenever points are deactivated.
The function is called with the parameters `points` (an array of the newly-deactivated data objects) and `props` (the props used by `VictoryVoronoiContainer`).

_example:_ `onDeactivated={(points, props) => removeFromList(points, props)}`

## radius

`type: number`

When the `radius` prop is set, the voronoi areas associated with each data point will be no larger
than the given radius. This prop should be given as a number.

_example:_ `radius={25}`

## voronoiBlacklist

`type: array[string]`

The `voronoiBlacklist` prop is used to specify a list of components to ignore when calculating a shared voronoi diagram. Components with a `name` prop matching an element in the `voronoiBlacklist` array will be ignored by `VictoryVoronoiContainer`. Ignored components will never be flagged as active, and will not contribute date to shared tooltips or labels.

_example:_ `voronoiBlacklist={["redPoints"]}`

```jsx live
<VictoryChart domain={{ y: [0, 6] }}
  containerComponent={
    <VictoryVoronoiContainer
      voronoiBlacklist={["redPoints"]}
      labels={({ datum }) => `y: ${datum.y}`}
    />
  }
>
  <VictoryScatter name="redPoints"
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[
      { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 5 }
    ]}
  />
  <VictoryScatter
    data={[
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 4 }, { x: 8, y: 5 }
    ]}
  />
</VictoryChart>
```

## voronoiDimension

`type: "x" || "y"`

When the `voronoiDimension` prop is set, voronoi selection will only take the given dimension into account.
For example, when `dimension` is set to "x", all data points matching a particular x mouse position
will be activated regardless of y value. When this prop is not given, voronoi selection is
determined by both x any y values.

_example:_ `voronoiDimension="x"`

```jsx live
<VictoryChart domain={{ y: [0, 6] }}
  containerComponent={
    <VictoryVoronoiContainer
      voronoiDimension="x"
      labels={({ datum }) => `y: ${datum.y}`}
    />
  }
>
  <VictoryScatter
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[
      { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 5 }
    ]}
  />
  <VictoryScatter
    data={[
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 4 }, { x: 8, y: 5 }
    ]}
  />
</VictoryChart>
```

## voronoiPadding

`type: number`

When the `voronoiPadding` prop is given, the area of the chart that will trigger voronoi events is
reduced by the given padding on every side. By default, no padding is applied, and the entire range
of a given chart may trigger voronoi events. This prop should be given as a number.

_example:_ `voronoiPadding={5}`

[victorycontainer]: /docs/victory-container
[voronoi diagram]: https://github.com/d3/d3-voronoi
[this example]: /gallery/voronoi-tooltips-with-grouped-components

---
id: 10
title: Tooltips
category: guides
scope: null
---
# Tooltips

[`VictoryTooltip`][] is a label component with `defaultEvents` It renders a customizable flyout container as well as a `VictoryLabel` component. `VictoryTooltip` can be used with any Victory component by setting the `labelComponent` prop like so `labelComponent={<VictoryTooltip/>`

This guide discusses customization and advanced usage of tooltips in Victory

## Simple tooltips

The simplest way to add tooltips to a chart is to use `VictoryTooltip` as a `labelComponent` as in the example below:

```playground
<VictoryChart
  domain={{ x: [0, 11], y: [-10, 10] }}
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
      data: {fill: "tomato", width: 20}
    }}
  />
</VictoryChart>
```


When tooltips are added to a chart in this way, `defaultEvents` on `VictoryTooltip` are automatically added to the component using them, in this case `VictoryBar`. By default, `VictoryTooltip` will adjust its position, orientation, and the width and height of its container to match the corresponding data and labels.

## Customizing Tooltips

Tooltips can be customized directly on the `VictoryTooltip` component

```playground
<VictoryChart
  domain={{ x: [0, 11], y: [-10, 10] }}
>
  <VictoryBar
    labelComponent={
      <VictoryTooltip
        cornerRadius={({ datum }) => datum.x > 6 ? 0 : 20}
        pointerLength={({ datum }) => datum.y > 0 ? 5 : 20}
        flyoutStyle={{
          stroke: ({ datum }) => datum.x === 10
            ? "tomato"
            : "black"
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
      data: {fill: "tomato", width: 20}
    }}
  />
</VictoryChart>
```

`VictoryTooltip` is composed of [`VictoryLabel`][] and the primitive [`Flyout`][] component. Both of these components are highly configurable, but may also be replaced if necessary.

```playground_norender
class CustomFlyout extends React.Component {
  render() {
    const {x, y, orientation} = this.props;
    const newY = orientation === "bottom" ? y - 35 : y + 35;
    return (
      <g>
        <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none"/>
        <circle cx={x} cy={newY} r="25" stroke="orange" fill="none"/>
        <circle cx={x} cy={newY} r="30" stroke="gold" fill="none"/>
      </g>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart
          domain={{ x: [0, 11], y: [-10, 10] }}
        >
          <VictoryBar
            labelComponent={
              <VictoryTooltip
                flyoutComponent={<CustomFlyout/>}
              />
            }
            data={[
              {x: 2, y: 5, label: "A"},
              {x: 4, y: -6, label: "B"},
              {x: 6, y: 4, label: "C"},
              {x: 8, y: -5, label: "D"},
              {x: 10, y: 7, label: "E"}
            ]}
            style={{
              data: {fill: "tomato", width: 20},
              labels: { fill: "tomato"}
            }}
          />
        </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

## Tooltips with VictoryVoronoiContainer

Voronoi tooltips are useful for adding tooltips to a line, or adding tooltips to data points that
are too small to hover over effectively. `VictoryVoronoiContainer` calculates a voronoi diagram
based on the data of every child component it renders. The voronoi data is used to associate a
mouse position with its nearest data point(s). When `VictoryVoronoiContainer` is added as the
`containerComponent` of your chart, changes in mouse position will add and remove the `active` prop
on appropriate data and label elements.


```playground
<VictoryChart
  domain={{x: [0, 5], y: [-5, 5]}}
  containerComponent={<VictoryVoronoiContainer/>}
>
  <VictoryScatter
    style={{
      data: {fill: "tomato"}, labels: {fill: "tomato"}
    }}
    size={({ active }) => active ? 5 : 3}
    labels={({ datum }) => datum.y}
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 1, y: -4},
      {x: 2, y: 4},
      {x: 3, y: 2},
      {x: 4, y: 1}
    ]}
  />
  <VictoryScatter
    style={{
      data: {fill: "blue"}, labels: {fill: "blue"}
    }}
    size={(datum, active) => active ? 5 : 3}
    labels={({ datum }) => datum.y}
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 1, y: -3},
      {x: 2, y: 3},
      {x: 3, y: 3},
      {x: 4, y: 0}
    ]}
  />
  <VictoryScatter
    data={[
      {x: 1, y: 4},
      {x: 2, y: -4},
      {x: 3, y: -2},
      {x: 4, y: -3}
    ]}
    labels={({ datum }) => datum.y}
    labelComponent={<VictoryTooltip/>}
    size={({ active }) => active ? 5 : 3}
  />
</VictoryChart>
```

## Multi-point Tooltips with VictoryVoronoiContainer

`VictoryVoronoiContainer` can also be used to create multi-point labels when the `labels` prop is
provided. In the example below the `voronoiDimension` prop indicates that the voronoi diagram
will only be specific to the x dimension. For a given mouse position, all data matching the
associated x value will be activated regardless of y value. In the following example, this leads to
several tooltips being active at the same time. Provide a `labels` and (optionally) a
`labelComponent` prop to configure multi-point labels.

```playground
<VictoryChart
  containerComponent={
    <VictoryVoronoiContainer voronoiDimension="x"
      labels={({ datum }) => `y: ${datum.y}`}
      labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
    />
  }
>
  <VictoryAxis/>
  <VictoryLine
    data={[
      {x: 1, y: 5, l: "one"},
      {x: 1.5, y: 5, l: "one point five"},
      {x: 2, y: 4, l: "two"},
      {x: 3, y: -2, l: "three"}
    ]}
    style={{
      data: { stroke: "tomato", strokeWidth: ({ active }) => active ? 4 : 2},
      labels: {fill: "tomato"}
    }}
  />

  <VictoryLine
    data={[
      {x: 1, y: -3, l: "red"},
      {x: 2, y: 5, l: "green"},
      {x: 3, y: 3, l: "blue"}
    ]}
    style={{
      data: { stroke: "blue", strokeWidth: ({ active }) => active ? 4 : 2},
      labels: {fill: "blue"}
    }}
  />

  <VictoryLine
    data={[
      {x: 1, y: 5, l: "cat"},
      {x: 2, y: -4, l: "dog"},
      {x: 3, y: -2, l: "bird"}
    ]}
    style={{
      data: { stroke: "black", strokeWidth: ({ active }) => active ? 4 : 2},
      labels: {fill: "black"}
    }}
  />
</VictoryChart>
```

`VictoryVoronoiContainer` also has a `mouseFollowTooltips` boolean prop that works with single point and multi-point tooltip labels.

```playground
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


## Tooltips with Other Events

`VictoryTooltip` automatically attaches events to data components. When events of the same type are specified for data components, it is necessary to reconcile events so that tooltips still work. For web, the default tooltip events are:

```jsx
static defaultEvents = [{
  target: "data",
  eventHandlers: {
    onMouseOver: () => {
      return {
        target: "labels",
        mutation: () => ({ active: true })
      };
    },
    onMouseOut: () => {
      return {
        target: "labels",
        mutation: () => ({ active: false })
      };
    }
  }
}];
```

When other `onMouseOver` and `onMouseOut` events are specified for data, the event returns described above must be added to the events for tooltips to continue to work properly.

```playground
<VictoryChart
  domain={{ x: [0, 11], y: [-10, 10] }}
>
  <VictoryBar
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 2, y: 5, label: "A"},
      {x: 4, y: -6, label: "B"},
      {x: 6, y: 4, label: "C"},
      {x: 8, y: -5, label: "D"},
      {x: 10, y: 7, label: "E"}
    ]}
    style={{
      data: {fill: "tomato", width: 20}
    }}
    events={[{
      target: "data",
      eventHandlers: {
        onMouseOver: () => {
          return [
            {
              target: "data",
              mutation: () => ({style: {fill: "gold", width: 30}})
            }, {
              target: "labels",
              mutation: () => ({ active: true })
            }
          ];
        },
        onMouseOut: () => {
          return [
            {
              target: "data",
              mutation: () => {}
            }, {
              target: "labels",
              mutation: () => ({ active: false })
            }
          ];
        }
      }
    }]}
  />
</VictoryChart>
```

## Wrapping VictoryTooltip

The events that control `VictoryTooltip` are stored on the static `defaultEvents` property. Wrapped instances of `VictoryTooltip` will need to replicate or hoist this property in order to add automatic events to the components that use them.


```playground_norender
class CustomTooltip extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents
  render() {
    const {x, y} = this.props;
    const rotation = `rotate(45 ${x} ${y})`
    return (
      <g transform={rotation}>
        <VictoryTooltip {...this.props} renderInPortal={false}/>
      </g>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart
          domain={{ x: [0, 11], y: [-10, 10] }}
        >
          <VictoryBar
            labelComponent={<CustomTooltip/>}
            data={[
              {x: 2, y: 5, label: "A"},
              {x: 4, y: -6, label: "B"},
              {x: 6, y: 4, label: "C"},
              {x: 8, y: -5, label: "D"},
              {x: 10, y: 7, label: "E"}
            ]}
            style={{
              data: {fill: "tomato", width: 20}
            }}
          />
        </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

## Victory Native
In Victory Native tooltips are much more reliable when using `VictoryVoronoiContainer`. Using `VictoryVoronoiContainer` registers all touch events on the container itself, which mitigates interference with other chart element, which can be a problem on some platforms. Showing the closest data point with `VictoryVoronoiContainer` also increases the tap targets for the tooltip, which can otherwise be quite small. Set `VictoryVoronoiContainer` as the `containerComponent` prop on the outermost Victory component.

```jsx
<VictoryChart containerComponent={<VictoryVoronoiContainer />} >
  <VictoryScatter
    labelComponent={<VictoryTooltip />}
    labels={({ datum }) => datum.y}
    style={{ data: { fill: ({ datum }) => datum.fill } }}
    data={[
      { x: 1, y: 3 },
      { x: 3, y: 5 }
    ]}
  />
</VictoryChart>
```

[`VictoryTooltip`]: /docs/victory-tooltip
[`VictoryLabel`]: /docs/victory-label
[`Flyout`]: /docs/victory-primitives#flyout

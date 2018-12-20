# createContainer

`victory-create-container@^30.0.0` exports `createContainer`, `combineContainerMixins` and `makeCreateContainerFunction`

View these docs at https://formidable.com/open-source/victory/docs/create-container to see live examples.

`createContainer` makes a container component with multiple behaviors. It allows you to effectively
combine any two of the following containers: `VictoryBrushContainer`,
`VictoryCursorContainer`, `VictorySelectionContainer`, `VictoryVoronoiContainer`, or `VictoryZoomContainer`.

```js
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
```

## Arguments

The function takes two `behavior` arguments as strings:

```js
createContainer(behaviorA, behaviorB);
```

### Behavior

Each `behavior` must be one of the following strings:
`"brush"`, `"cursor"`, `"selection"`, `"voronoi"`, and `"zoom"`.
The resulting container uses the events from both behaviors.
For example, if both behaviors use the click event (like zoom and selection) the combined container
will trigger both behaviors' events on each click.

**Note**: Order of the behaviors matters in a few cases.
It is recommended to use `"zoom"` before any other behaviors: for example,
`createContainer("zoom", "voronoi")` instead of `createContainer("voronoi", "zoom")`.

### Example

The following example creates a custom container that combines `VictoryVoronoiContainer` and
`VictoryZoomContainer`. Hovering over the chart will use Voronoi to highlight data points,
while scrolling and dragging will zoom and pan.

```playground_norender
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
const data = range(100).map((x) => ({x, y: 100 + x + random(10)}));

const App = () => (
  <VictoryChart
    containerComponent={
      <VictoryZoomVoronoiContainer
        labels={(d) => `${d.x}, ${d.y}`}
      />
    }>
    <VictoryScatter data={data} />
  </VictoryChart>
);

ReactDOM.render(<App/>, mountNode);
```

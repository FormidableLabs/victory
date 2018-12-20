# VictorySelectionContainer

`victory-selection-container@^30.0.0` exports `VictorySelectionContainer`, `selectionContainerMixin` and `SelectionHelpers`

View these docs at https://formidable.com/open-source/victory/docs/victory-selection-container to see live examples.

`VictorySelectionContainer` is used to enable selecting data points within a highlighted region.
Clicking and dragging will select an x-y region, and add the `active` prop to any elements
corresponding to data points within the region. Create a select-box control by tying the set of
selected data points to other elements, such as filtered table.

`VictorySelectionContainer` is similar to `VictoryBrushContainer`. `VictoryBrushContainer` may be
used to identify the domain of a selected region, whereas `VictorySelectionContainer` may be used to
identify a list of data points within a selected region. `VictoryBrushContainer` will also create
persistent highlighted regions, whereas regions created by `VictorySelectionContainer`
disappear after `onMouseUp` events.

`VictorySelectionContainer` may be used with any Victory component that works with an x-y coordinate
system, and should be added as the `containerComponent` of the top-level component.
However, the component that uses it must be standalone
(`standalone={true}`), which is the default for all top-level Victory components.

```playground
<VictoryChart containerComponent={<VictorySelectionContainer/>}>
  <VictoryScatter
    style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
  />
</VictoryChart>
```

## Props

`VictorySelectionContainer` uses a superset of props used by [VictoryContainer][]. All props are optional.

### activateSelectedData

`type: boolean`

When the `activateSelectedData` prop is set to true, the `active` prop will be set to true on all selected data points. When this prop is set to false, the `onSelection` and `onSelectionCleared` callbacks will still fire, but no mutations will occur via Victory's event system.

_default:_ `activateSelectedData={true}`

### disable

`type: boolean`

When the `disable` prop is set to `true`, `VictorySelectionContainer` events will not fire.

### onSelection

`type: function`

The `onSelection` prop accepts a function to be called whenever new data points are selected. The
function is called with the parameters `points` (an array of objects with `childName`, `eventKey`,
and `data`), `bounds` (an object with min / max arrays specified for `x` and `y`), and `props` (the props used by `VictorySelectionContainer`)

_example:_ `onSelection={(points, bounds, props) => handleSelection(points, bounds, props)}`

### onSelectionCleared

`type: function`

The `onSelectionCleared` prop accepts a function to be called whenever the selection is cleared. The function is called with the props used by `VictorySelectionContainer`

_example:_ `onSelectionCleared={(props) => handleSelectionCleared(props)}`

### selectionBlacklist

`type: array[string]`

The `selectionBlacklist` prop is used to exclude data from potential selections. This prop should be given as an array of strings that match the `name` prop of Victory component that should be excluded from selection.

_example:_ `selectionBlackList={["first-line", "second-line"]}`

### selectionComponent

`type: element`

The `selectionComponent` prop specifies the element to be rendered for the selected area. When
this prop is not specified, a `<rect/>` will be rendered. This component will be supplied with the
following props: `x`, `y`, `width`, `height`, and `style`.

_default:_ `selectionComponent={<rect/>}`

### selectionDimension

`type: "x" || "y"`

When the `selectionDimension` prop is set, the selection will only take the given dimension into account.
For example, when `dimension` is set to "x", the selected area will cover the entire y domain
regardless of mouse position.

_example:_ `selectionDimension="x"`

```playground
<VictoryChart
  containerComponent={
    <VictorySelectionContainer selectionDimension="x"/>
  }
>
  <VictoryScatter
    style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
  />
</VictoryChart>
```

### selectionStyle

`type: object`

The `selectionStyle` prop should be given as an object of style attributes to be applied to the
`selectionComponent`

_default:_ `selectionStyle={{stroke: "transparent", fill: "black", fillOpacity: 0.1}}`

```playground
<VictoryChart
  containerComponent={
    <VictorySelectionContainer
      selectionStyle={{
        fill: "tomato", fillOpacity: 0.5,
        stroke: "tomato", strokeWidth: 2
      }}
    />
  }
>
  <VictoryScatter
    style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
  />
</VictoryChart>
```

[victorycontainer]: https://formidable.com/open-source/victory/docs/victory-container

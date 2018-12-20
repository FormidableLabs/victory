# VictoryBrushContainer

`victory-brush-container@^30.0.0` exports `VictoryBrushContainer`, `brushContainerMixin` and `BrushHelpers`

View these docs at https://formidable.com/open-source/victory/docs/victory-brush-container to see live examples.

`VictoryBrushContainer` adds the ability to highlight a region of a chart, and interact with
highlighted regions, either by moving the region, expanding the region, or selecting a new region.
`VictoryBrushContainer` is useful for selecting a region of a larger dataset by domain. Create a
brush control by tying the domain of the selected region to the domain of a separate chart.
See the [brush and zoom guide][] for an example of using `VictoryBrushContainer` to create a brush
control.

`VictoryBrushContainer` is similar to `VictorySelectionContainer`. `VictoryBrushContainer` may be
used to identify the domain of a selected region, whereas `VictorySelectionContainer` may be used to
identify a list of data points within a selected region. `VictoryBrushContainer` will also create
persistent highlighted regions, whereas regions created by `VictorySelectionContainer`
disappear after `onMouseUp` events.

`VictoryBrushContainer` may be used with any Victory component that works with an x-y coordinate
system, and should be added as the `containerComponent` of the top-level component.
However, the component that uses it must be standalone
(`standalone={true}`), which is the default for all top-level Victory components.

```playground
<VictoryChart
  containerComponent={
    <VictoryBrushContainer
      brushDimension="x"
      brushDomain={{x: [0.1, 0.3]}}
    />
  }
>
  <VictoryLine />
</VictoryChart>
```

## Props

`VictoryBrushContainer` uses a superset of props used by [VictoryContainer][]. All props are optional.

### allowDrag

`type: boolean`

The optional `allowDrag` prop accepts a boolean that enables dragging behavior for the highlighted brush area. Resizing will still be enabled when the `allowDrag` prop is set to false.

_default:_ `allowDrag={true}`

### allowResize

`type: boolean`

The optional `allowResize` prop accepts a boolean that enables resizing the highlighted brush area. Dragging will still be enabled when the `allowResize` prop is set to false, but the dimensions of the brush area will be fixed.

_default:_ `allowResize={true}`

### brushComponent

`type: element`

The `brushComponent` prop specifies the component to be rendered for the highlighted area.
This component will be supplied with the following props: x, y, width, height, and style.
When this prop is not specified, a `<rect/>` will be rendered.

_default:_ `brushComponent={<rect/>}`

### brushDimension

`type: "x" || "y"`

When the `brushDimension` prop is set, brushing will only be specific to the to the given dimension
(either "x" or "y"), and the entire domain of the other dimension will be highlighted. When this prop
is not specified, highlighting will occur along both dimensions.

_example:_ `brushDimension="x"`

### brushDomain

`type: { x: [low, high], y: [low, high] }`

The optional `brushDomain` prop describes the highlighted state. This prop is an object that
specifies separate arrays for `x` and `y`. Each array is a tuple that describes the minimum and maximum
values to render. If this prop is not provided initially, the chart will render with the entire
domain highlighted. When this prop changes, the chart will render with a new highlighted domain.

_example:_ `brushDomain={{x: [50, 100], y: [0, 100]}`

### brushStyle

`type: object`

The `brushStyle` adds custom styles to the `brushComponent`. This prop should be given as
an object of SVG style attributes.

_default:_ `brushStyle={{stroke: "transparent", fill: "black", fillOpacity: 0.1}}

### defaultBrushArea

`type: "all", "none", "disable"`

The `defaultBrushArea` prop specifies how the container will behave when a region outside the active brush is clicked without selecting a new area. When the prop is set to "all", the entire domain will be selected. When the prop is set to "none", no new region will be selected, and any existing active brush will be cleared. When the prop is set to "disable" the new selected region will default to the current active brush.

```playground
<VictoryChart
  containerComponent={
    <VictoryBrushContainer
      defaultBrushArea="disable"
      brushDomain={{x: [0.1, 0.3]}}
    />
  }
>
  <VictoryLine />
</VictoryChart>
```

### disable

`type: boolean`

When the `disable` prop is set to `true`, `VictoryBrushContainer` events will not fire.

### handleComponent

`type: element`

The `handleComponent` prop specifies the component to be rendered for each handle for the highlighted
area. This component will be supplied with the following props: `x`, `y`, `width`, `height`, `cursor`, and `style`.
When this prop is not specified, a `<rect/>` will be rendered.

_default:_ `handleComponent={<rect/>}`

### handleStyle

`type: object`

The `handleStyle` adds custom styles to the `handleComponents`. This prop should be given as
an object of SVG style attributes.

Handles refer to the region on each highlighted area where the area may be
expanded. Only handles relevant to the given `dimension` will be rendered. For example, when
`brushDimension="x"` only "left" and "right" handles will be rendered. Handles are automatically styled
with cursors appropriate to their orientation.

_default:_ `handleStyle={{stroke: "transparent", fill: "transparent"}}

### onBrushDomainChange

`type: function`

The optional `onBrushDomainChange` prop accepts a function to be called on each update to the highlighted domain. The function accepts the parameters of `domain` (the updated domain), and `props` (the props used by `VictoryBrushContainer`).

_example:_ `onBrushDomainChange={(domain, props) => handleDomainChange(domain, props)}`

## onBrushDomainChangeEnd

`type: function`

The optional `onBrushDomainChangeEnd` prop accepts a function to be called on the last update to the highlighted domain. The function accepts the parameters of `domain` (the updated domain), and `props` (the props used by `VictoryBrushContainer`).

_example:_ `onBrushDomainChangeEnd={(domain, props) => handleDomainChangeEnd(domain, props)}`

[brush and zoom guide]: https://formidable.com/open-source/victory/guides/brush-and-zoom
[victorycontainer]: https://formidable.com/open-source/victory/docs/victory-container

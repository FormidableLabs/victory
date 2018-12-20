# VictoryBrushLine

`victory-brush-line@^30.0.0` exports `VictoryBrushLine`

View these docs at https://formidable.com/open-source/victory/docs/victory-brush-line to see live examples.

`VictoryBrushLine` renders a brush component centered around a line. It may be used in place of the default `axisComponent` or `gridComponent` within `VictoryAxis`. Use `VictoryBrushLine` instead of [`VictoryBrushContainer`][] in charts that require multiple brushes.

```playground
<VictoryChart domainPadding={50}>
  <VictoryScatter
    size={4}
    style={{ data: { fill: "tomato" }}}
    data={[
      { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 4 }
    ]}
  />
  <VictoryAxis
    tickValues={[1, 2, 3]}
    gridComponent={<VictoryBrushLine width={30}/>}
  />
</VictoryChart>
```

## Props

### allowDrag

`type: boolean`

The optional `allowDrag` prop accepts a boolean that enables dragging behavior for the highlighted brush area. Resizing will still be enabled when the `allowDrag` prop is set to false.

_default:_ `allowDrag={true}`

### allowResize

`type: boolean`

The optional `allowResize` prop accepts a boolean that enables resizing the highlighted brush area. Dragging will still be enabled when the `allowResize` prop is set to false, but the dimensions of the brush area will be fixed.

_default:_ `allowResize={true}`

### brushAreaComponent

`type: element`

The `brushAreaComponent` prop specifies the component to be rendered for the interactive brush region.
This component will be supplied with the following props: x, y, width, height, and style.
When this prop is not specified, a [`Box`][] component will be rendered.

_default:_ `brushAreaComponent={<Box/>}`

### brushAreaStyle

`type: object`

The `brushAreaStyle` prop adds custom styles to the `brushAreaComponent`. This prop should be given as
an object of SVG style attributes. Styles supplied to `brushAreaStyle` are assigned to the following default styles:

```js
{
  stroke: "none",
  fill: "black",
  opacity: (d, a) => a ? 0.2 : 0.1
}
```

**Note:** `cursor` styles should not be applied via this prop, as they are dynamically assigned

### brushAreaWidth

`type: number`

The `brushAreaWidth` prop is used to specify the width of the interactive brush region. If this prop is not supplied, the `width` prop will be used.

### brushComponent

`type: element`

The `brushComponent` prop specifies the component to be rendered for active brush.
This component will be supplied with the following props: x, y, width, height, and style.
When this prop is not specified, a [`Box`][] component will be rendered.

_default:_ `brushComponent={<Box/>}`

### brushDomain

`type: array[low, high]`

The optional `brushDomain` prop describes the highlighted state. This prop should be given as an array of the minimum and maximum values of the highlighted region.

_example:_ `brushDomain={[50, 100]}`

### brushStyle

`type: object`

The `brushStyle` prop adds custom styles to the `brushComponent`. This prop should be given as
an object of SVG style attributes. Styles supplied to `brushStyle` are assigned to the following default styles:

```js
{
  pointerEvents: "none",
  stroke: "none",
  fill: "black",
  opacity: (d, a) => a ? 0.4 : 0.3
}
```

### brushWidth

`type: number`

The `brushWidth` prop is used to specify the width of the active brush. If this prop is not supplied, the `width` prop will be used.

### className

`type: string`

This prop specifies the class name that will be applied to the rendered element

### dimension

`type: "x" || "y"`

The `dimension` prop specified whether the brush will be vertical ("y"), or horizontal ("x")

### disable

`type: boolean`

When the `disable` prop is set to `true`, `VictoryBrushLine` events will not fire.

### events

`type: object`

The `events` prop specifies a set of events that will be attached to the brush component group. This prop should not be set manually.

### groupComponent

`type: element`

This prop specifies the element used to group rendered elements

_default:_ `<g/>`

### handleComponent

`type: element`

The `handleComponent` prop specifies the component to be rendered for each handle.
This component will be supplied with the following props: x, y, width, height, and style.
When this prop is not specified, a [`Box`][] component will be rendered.

_default:_ `handleComponent={<Box/>}`

### handleStyle

`type: object`

The `handleStyle` props adds custom styles to the `handleComponent`. This prop should be given as
an object of SVG style attributes. Styles supplied to `handleStyle` are assigned to the following default styles:

```js
{
  pointerEvents: "none",
  stroke: "none",
  fill: "none"
}
```

### handleWidth

`type: number`

The `handleWidth` prop is used to specify the width of each handle component.

_default:_ `handleWidth={10}`

### lineComponent

`type: element`

The `lineComponent` prop specifies the component to render for the underlying axis or grid line.
This component will be supplied with the following props: x1, y1, x2, y2 and style.
When this prop is not specified, an [`Axis`][] component will be rendered.

_default:_ `lineComponent={<Axis/>}`

### onBrushDomainChange

`type: function`

The `onBrushDomainChange` prop specifies a callback function which will be called whenever the brush domain changes. The callback provided will be called with the following arguments:

- `currentDomain`: The current brush domain
- `props`: the current set of props for `VictoryBrushLine`

### scale

`type: object`

This prop specifies `scale` of the parent chart with `domain` and `range` applied. This prop should not be set manually.

### style

`type: object`

The `style` prop specifies the styles that will be applied to the `lineComponent`. This prop should be given as
an object of SVG style attributes.

### type

`type: string`

The `type` is used to specify which event target a particular `VictoryBrushLine` belongs to. When `VictoryBrushLine` is used by `VictoryAxis` as its `axisComponent` or `gridComponent`, this prop will be set automatically to "axis" or "grid" as appropriate.

### width

`type: number`

The `width` prop specified the width of both the `brush` and `brushArea`. When `brushWidth` or `brushAreaWidth` are specified, this prop will not be used

_default:_ `width={10}`

[`victorybrushcontainer`]: https://formidable.com/open-source/victory/docs/victory-brush-container
[`box`]: https://formidable.com/open-source/victory/docs/victory-primitives#box
[`axis`]: https://formidable.com/open-source/victory/docs/victory-primitives#axis

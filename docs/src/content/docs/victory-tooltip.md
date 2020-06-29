---
id: 27
title: VictoryTooltip
category: more
type: docs
scope:
  - sampleData
---

# VictoryTooltip

`VictoryTooltip` renders a tooltip component with a set of default events. When `VictoryTooltip` is used as a label component for any Victory component that renders data, it will attach events to rendered data components that will activate the tooltip when hovered. `VictoryTooltip` renders text as well as a configurable [Flyout][] container.

## active

`type: boolean`

The `active` prop specifies whether the tooltip component should be displayed.

## activateData

`type: boolean`

When true, tooltip events will set the `active` prop on both data and label elements.

_default:_ `activateData={false}`

## angle

`type: number`

The `angle` prop specifies the angle to rotate the tooltip around its origin point.

## center

`type: { x: number, y: number }`

The `center` prop determines the position of the center of the tooltip flyout. This prop should be given as an object that describes the desired x and y svg coordinates of the center of the tooltip. This prop is useful for positioning the flyout of a tooltip _independent from_ the pointer. When `VictoryTooltip` is used with `VictoryVoronoiContainer`, the `center` prop is what enables the `mouseFollowTooltips` option. When this prop is set, non-zero `pointerLength` values will no longer be respected.

```playground
<VictoryBar
  data={sampleData}
  labels={() => "HELLO"}
  labelComponent={
    <VictoryTooltip
      center={{ x: 225, y: 30 }}
      pointerOrientation="bottom"
      flyoutWidth={150}
      flyoutHeight={50}
      pointerWidth={150}
      cornerRadius={0}
    />
  }
/>
```

## centerOffset

`type: { x: number || function, y: number || function }`

The `centerOffset` prop determines the position of the center of the tooltip flyout _in relation to_ the flyout pointer. This prop should be given as an object of x and y, where each is either a numeric offset value or a function that returns a numeric value. When this prop is set, non-zero `pointerLength` values will no longer be respected.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
  labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
/>
```

## constrainToVisibleArea

`type: boolean`

The `constrainToVisibleArea` prop determines whether to coerce tooltips so that they fit within the visible area of the chart. When this prop is set to true, tooltip pointers will still point to the correct data point, but the center of the tooltip will be shifted to fit within the overall width and height of the svg Victory renders.

```playground
<VictoryBar
  data={sampleData}
  labels={() => "These labels just go on, and on, and on..."}
  labelComponent={<VictoryTooltip constrainToVisibleArea />}
/>
```

## cornerRadius

`type: number || function`

The `cornerRadius` prop determines corner radius of the flyout container. This prop may be given as a positive number or a function of datum.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={<VictoryTooltip  cornerRadius={({ datum }) => datum.x * 2} />}
/>
```

## data

`type: array[object]`

Victory components can pass a `data` prop to their label component. This can be useful in custom components that need to make use of the entire dataset.

## datum

`type: object`

Victory components can pass a `datum` prop to their label component. This can
be used to calculate functional styles, and determine text.

## dx

`type: number || function`

The `dx` prop defines a horizontal shift from the `x` coordinate.

## dy

`type: number || function`

The `dy` prop defines a vertical shift from the `y` coordinate.

## events

`type: object`

The `events` prop attaches arbitrary event handlers to the label component. This prop should be given as an object of event names and corresponding event handlers. When events are provided via Victory's event system, event handlers will be called with the event, the props of the component is attached to, and an eventKey.

_examples:_ `events={{onClick: (evt) => alert("x: " + evt.clientX)}}`

## flyoutHeight

`type: number || function`

The `flyoutHeight` prop defines the height of the tooltip flyout. This prop may be given as a positive number or a function of datum. If this prop is not set, `flyoutHeight` will be determined based on an [approximate text size][] calculated from the `text` and `style` props provided to `VictoryTooltip`.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={<VictoryTooltip  flyoutHeight={60} />}
/>
```

## flyoutStyle

`type: object`

The `style` prop applies SVG style properties to the rendered flyout container. These props will be passed to the `flyoutComponent`.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={
    <VictoryTooltip
      flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
    />
  }
/>
```

## flyoutWidth

`type: number || function`

The `flyoutWidth` prop defines the width of the tooltip flyout. This prop may be given as a positive number or a function of datum. If this prop is not set, `flyoutWidth` will be determined based on an [approximate text size][] calculated from the `text` and `style` props provided to `VictoryTooltip`.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={<VictoryTooltip  flyoutWidth={90} />}
/>
```

## flyoutComponent

`type: element`

The `flyoutComponent` prop takes a component instance which will be used to create the flyout path for each tooltip. The new element created from the passed `flyoutComponent` will be supplied with the following properties: x, y, dx, dy, index, datum, cornerRadius, pointerLength, pointerWidth, width, height, orientation, style, and events. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `flyoutComponent` is omitted, a default [Flyout][] component will be created with props described above.

_examples:_ `flyoutComponent={<Flyout x={50} y={50}/>}`, `flyoutComponent={<MyCustomFlyout/>}`

_default:_ `<Flyout/>`

## groupComponent

`type: element`

The `groupComponent` prop takes a component instance which will be used to create group elements for use within container elements. This prop defaults to a `<g>` tag.

_default:_ `groupComponent={<g/>}`

## height

`type: number`

This prop refers to the height of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually. In versions before `^33.0.0` this prop referred to the height of the tooltip flyout. Please use `flyoutHeight` instead**

## horizontal

`type: boolean`

The `horizontal` prop determines whether to plot the flyouts to the left / right of the (x, y) coordinate rather than top / bottom. This is useful when an orientation prop is not provided, and data will determine the default orientation. _i.e._ negative values result in a left orientation and positive values will result in a right orientation by default.

## index

`type: number || string`

The `index` prop represents the index of the datum in the data array.

## labelComponent

`type: element`

The `labelComponent` prop takes a component instance which will be used to render each tooltip label. The new element created from the passed `labelComponent` will be supplied with the following properties: x, y, index, datum, verticalAnchor, textAnchor, style, text, and events. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `labelComponent` is omitted, a new [VictoryLabel][] will be created with the props described above.

_examples:_ `labelComponent={<VictoryLabel dy={20}/>}`, `labelComponent={<MyCustomLabel/>}`

_default:_ `<VictoryLabel/>`

## orientation

`type: function || "top" || "bottom" || "left" || "right"`

The `orientation` prop determines which side of the (x, y) coordinate the tooltip should be rendered on. This prop can be given as "top", "bottom", "left", "right", or as a function of datum that returns one of these values. If this prop is not provided it will be determined from the sign of the `datum`, and the value of the `horizontal` prop.

## pointerLength

`type: number || function`

The `pointerLength` prop determines the length of the triangular pointer extending from the flyout. This prop may be given as a positive number or a function of datum. **Note: When `center`, `centerOffset` or `constrainToVisibleArea` props are used, non-zero `pointerLength` values are not guaranteed.**

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={<VictoryTooltip  pointerLength={20} />}
/>
```

## pointerOrientation

`type: "top", "bottom", "left", "right" || function`

This prop determines which side of the tooltip flyout the pointer should originate on. When this prop is not set, it will be determined based on the overall `orientation` of the flyout in relation to its data point, and any `center` or `centerOffset` values.

```playground
// Try changing `pointerOrientation` to "bottom"
<VictoryBar
  barWidth={20}
  data={sampleData}
  labels={({ datum }) => datum.y}
  labelComponent={
    <VictoryTooltip
      pointerOrientation="right"
      dy={0}
      dx={-12}
      pointerWidth={25}
      flyoutHeight={25}
      flyoutWidth={25}
      cornerRadius={0}
      centerOffset={{ x: -50 }}
      />
  }
/>
```

## pointerWidth

`type: number || function`

The `pointerWidth` prop determines the width of the base of the triangular pointer extending from the flyout. This prop may be given as a positive number or a function of datum.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={<VictoryTooltip  pointerWidth={20} />}
/>
```

## renderInPortal

`type: boolean`

When `renderInPortal` is true, rendered tooltips will be wrapped in [VictoryPortal][] and rendered within the [Portal][] element within [VictoryContainer][]. _Note:_ This prop should _not_ be set to true when using a custom container element.

## style

`type: object`

The `style` prop applies SVG style properties to the rendered `<text>` element.

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
  labelComponent={
    <VictoryTooltip
      style={{ fill: "tomato" }}
    />
  }
/>
```

## text

`type: string || number || function || array[string || number]`

The `text` prop defines the text `VictoryTooltip` will render. The `text` prop may be given as a string, number, or function of `datum`. When [VictoryLabel][] is used as the `labelComponent`, strings may include newline characters, which VictoryLabel will split in to separate `<tspan/>` elements.

## width

`type: number`

This prop refers to the width of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually. In versions before `^33.0.0` this prop referred to the width of the tooltip flyout. Please use `flyoutWidth` instead**

## x

`type: number`

The `x` prop defines the x coordinate to use as a basis for positioning the tooltip element.

## y

`type: number`

The `y` prop defines the y coordinate to use as a basis for positioning the tooltip element.

[flyout]: /docs/victory-primitives#flyout
[victorylabel]: /docs/victory-label
[victoryportal]: /docs/victory-portal
[victorycontainer]: /docs/victory-container
[portal]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-portal/portal.js
[approximate text size]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-util/textsize.js

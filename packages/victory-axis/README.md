# VictoryAxis

`victory-axis@^30.0.0` exports `VictoryAxis` component

View these docs at https://formidable.com/open-source/victory/docs/victory-axis to see live examples.

VictoryAxis renders a single axis which can be used on its own or composed with [`VictoryChart`][].

```playground
<svg width={400} height={400}>
  <VictoryAxis crossAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    theme={VictoryTheme.material}
    offsetY={200}
    standalone={false}
  />
  <VictoryAxis dependentAxis crossAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    theme={VictoryTheme.material}
    offsetX={200}
    standalone={false}
  />
</svg>
```

## Props

### animate

`type: boolean || object`

`VictoryAxis` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations

```jsx
animate={{
  duration: 2000,
  easing: "bounce"
}}
```

### axisComponent

`type: element`

The `axisComponent` prop takes a component instance which will be responsible for rendering an axis line. The new element created from the passed `axisComponent` will be provided with the following props calculated by `VictoryAxis`: `x1`, `y1`, `x2`, `y2`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If an `axisComponent` is not provided, `VictoryAxis` will use its default [Line component][].

_default:_ `axisComponent={<Line type={"axis"}/>}`

```jsx
axisComponent={<Line events={{ onClick: handleClick }}/>}
```

### axisLabelComponent

`type: element`

The `axisLabelComponent` prop takes a component instance which will be used to render the axis label. The new element created from the passed `axisLabelComponent` will be supplied with the following props: `x`, `y`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `axisLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

_default:_ `axisLabelComponent={<VictoryLabel/>}`

```jsx
axisLabelComponent={<VictoryLabel dy={20}/>}
```

### containerComponent

`type: element`

`VictoryAxis` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryZoomContainer zoomDimension="x"/>}
```

### crossAxis

`type: boolean`

The `crossAxis` boolean prop specifies whether a given axis is intended to cross another axis. When this prop is true, zeroes will be removed from the array of ticks so that they do not clutter the origin of the chart. When `VictoryAxis` is nested within `VictoryChart`, `VictoryChart` will determine a value for the `crossAxis` prop based on domain, but this prop may be overridden by supplying a `crossAxis` prop directly to the `VictoryAxis` child component.

_default:_ `crossAxis={false}`

### dependentAxis

`type: boolean`

The `dependentAxis` boolean prop specifies whether the axis corresponds to the dependent variable (usually y). This prop is useful when composing `VictoryAxis` with other components to form a chart.

_default:_ `dependentAxis={false}`

```playground
<VictoryAxis dependentAxis />
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryAxis` uses the standard `domain` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryAxis` uses the standard `domainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### events

`type array[object]`

`VictoryAxis` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

**note:** valid event targets for `VictoryAxis` are "axis", "axisLabel", "grid", "ticks", and "tickLabels".
Targets that correspond to only one element {"axis" and "axisLabel") should use the special eventKey "all".

### externalEventMutations

`type: array[object]`

`VictoryAxis` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### fixLabelOverlap

`type: boolean`

When true, this prop reduces the number of tick labels to fit the length of the axis. Labels are
removed at approximately even intervals from the original array of labels. This feature only works
well for labels that are approximately evenly spaced.

_default:_ `fixLabelOverlap={false}`

### gridComponent

`type: element`

The `gridComponent` prop takes a component instance which will be responsible for rendering a grid element. The new element created from the passed `gridComponent` will be provided with the following props calculated by `VictoryAxis`: `x1`, `y1`, `x2`, `y2`, `tick`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `gridComponent` is not provided, `VictoryAxis` will use its default [Line component][].

_default:_ `gridComponent={<Line type={"grid"}/>}`

```jsx
gridComponent={<Line events={{ onClick: handleClick }}/>}
```

### groupComponent

`type: element`

`VictoryAxis` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryAxis` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### invertAxis

`type: boolean`

The `invertAxis` boolean prop specifies whether the domain for a given axis should be inverted. By default, axes will be displayed with lower values on the bottom / left, and higher values on the top / right regardless of orientation.

_default:_ `invertAxis={false}`

### label

`type: string`

The `label` prop defines the label that will appear with the axis. This prop should be given as a string.

```playground
<VictoryAxis
  label="Time (ms)"
/>
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryAxis` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryAxis
  tickValues={[2, 3, 4, 5]}
  maxDomain={{ x: 3 }}
/>
```

### minDomain

`type: number || { x: number, y: number }`

`VictoryAxis` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryAxis
  tickValues={[2, 3, 4, 5]}
  minDomain={{ x: 0 }}
/>
```

### name

`type: string`

`VictoryAxis` uses the standard `name` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#name)

```jsx
name = "series-1";
```

### offsetX

`type: number`

The `offsetX` prop defines how far from the edge of its permitted area an axis should be offset in the x direction. If this prop is not given, the offset will be calculated based on font size, axis orientation, and label padding. When `VictoryAxis` is used with `VictoryChart`, `VictoryChart` will determine a value for `offsetX` that makes the axes line up correctly, but this value may be overridden by supplying an `offsetX` prop directly to the `VictoryAxis` child component.

**note:** The `offsetX` prop is relative to the edge corresponding to the orientation of the axis, _e.g._ the left edge when `orientation="left"`.

```playground
<VictoryAxis dependentAxis
  offsetX={225}
/>
```

### offsetY

`type: number`

The `offsetY` prop defines how far from the edge of its permitted area an axis should be offset in the y direction. If this prop is not given, the offset will be calculated based on font size, axis orientation, and label padding. When `VictoryAxis` is used with `VictoryChart`, `VictoryChart` will determine a value for `offsetY` that makes the axes line up correctly, but this value may be overridden by supplying an `offsetY` prop directly to the `VictoryAxis` child component.

**note:** The `offsetY` prop is relative to the edge corresponding to the orientation of the axis, _e.g._ the bottom edge when `orientation="bottom"`.

```playground
<VictoryAxis
  offsetY={150}
/>
```

### orientation

`type: "top" || "bottom" || "left" || "right"`

The `orientation` prop specifies the position and orientation of your axis. Options are "top", "bottom", "left", and "right".

```playground
<VictoryAxis
  orientation="top"
/>
```

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryAxis` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](https://formidable.com/open-source/victory/docs/common-props#range)

### scale

`type: scale || { x: scale, y: scale }`

`VictoryAxis` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

**note:** Though `VictoryAxis` can take a `scale` prop with scales defined for both `x` and `y`, only the scale that corresponds the given axis will be used.

_default:_ `scale="linear"`

```jsx
scale={{ x: "time" }}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryAxis` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### standalone

`type: boolean`

`VictoryAxis` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryAxis` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={400} height={400}>
  <VictoryAxis crossAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    theme={VictoryTheme.material}
    offsetY={200}
    standalone={false}
  />
  <VictoryAxis dependentAxis crossAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    theme={VictoryTheme.material}
    offsetX={200}
    standalone={false}
  />
</svg>
```

### style

`type: { axis: object, axisLabel: object, grid: object, ticks: object, tickLabels: object }`

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `parent`, `axis`, `axisLabel`, `grid`, `ticks`, and `tickLabels`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart. Functional styles may be defined for `grid`, `tick`, and `tickLabel` style properties, and they will be evaluated with each tick.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties may be included in `labels` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryAxis
  label="Label"
  style={{
    axis: {stroke: "#756f6a"},
    axisLabel: {fontSize: 20, padding: 30},
    grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
    ticks: {stroke: "grey", size: 5},
    tickLabels: {fontSize: 15, padding: 5}
  }}
/>
```

### theme

`type: object`

`VictoryAxis` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

_Note:_ Use the `dependentAxis` and `independentAxis` namespaces to theme axes by type. These namespaces will be merged with any props and styles supplied in the `axis` namespace.

```jsx
theme={VictoryTheme.material}
```

### tickComponent

`type: element`

The `tickComponent` prop takes a component instance which will be responsible for rendering a tick element. The new element created from the passed `tickComponent` will be provided with the following props calculated by `VictoryAxis`: `x1`, `y1`, `x2`, `y2`, `tick`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `tickComponent` is not provided, `VictoryAxis` will use its default [Line component][].

_default:_ `tickComponent={<Line type={"tick"}/>}`

```jsx
tickComponent={<Line events={{ onClick: handleClick }}/>}
```

### tickCount

`type: number`

The `tickCount` prop specifies approximately how many ticks should be drawn on the axis. If an array of ticks is supplied in `tickValues` or `tickFormat`, the `tickCount` prop will be used to _downsample_ the provided array to the specified length. If `tickValues` are not explicitly provided, this value is used by [d3Scale][] to calculate an _approximate_ number of ticks. [d3Scale][] prioritizes returning "nice" values and evenly spaced ticks over an exact number of ticks. This prop must be given as a positive integer.

### tickFormat

`type: array || function`

The `tickFormat` prop specifies how tick values should be labeled. The `tickFormat` prop can be given as an array of values to display for each tick, or as a function to be applied to every `tickValue`. When given as a function, `tickFormat` will be called with the following arguments: `tick` - the individual tick value, `index` - the index of the tick in the array, and `ticks` - the entire array of ticks.

```playground
  <VictoryAxis
    tickValues={[2.11, 3.9, 6.1, 8.05]}
    tickFormat={(t) => `${Math.round(t)}k`}
  />
```

### tickLabelComponent

`type: element`

The `tickLabelComponent` prop takes a component instance which will be used to render the axis label. The new element created from the passed `tickLabelComponent` will be supplied with the following props: `x`, `y`, `text`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `tickLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

_default:_ `tickLabelComponent={<VictoryLabel/>}`

```jsx
tickLabelComponent={<VictoryLabel dy={20}/>}
```

### tickValues

`type: array`

The `tickValues` prop explicitly specifies a set of tick values to draw on the axis. This prop should be given as an array of unique values of the same type (_i.e.,_ all numbers). The `tickValues` prop is used to specify the _values_ of each tick, so numeric values are typically appropriate. An array of strings or dates may be supplied for categorical and time series data respectively. Use the [tickFormat][] prop to specify how ticks should be labeled. _Note:_ `tickValues` should be given as a unique array.

```playground
  <VictoryAxis tickValues={[2, 4, 6, 8]}/>
```

### width

`type: number`

`VictoryAxis` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[`victorychart`]: https://formidable.com/open-source/victory/docs/victory-chart
[tickformat]: https://formidable.com/open-source/victory/docs/victory-axis#tickformat
[d3scale]: https://github.com/d3/d3-scale
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js
[line component]: https://formidable.com/open-source/victory/docs/victory-primitives#line
[`victorylabel`]: https://formidable.com/open-source/victory/docs/victory-label

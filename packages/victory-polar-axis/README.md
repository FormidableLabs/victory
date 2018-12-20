# VictoryPolarAxis

`victory-polar-axis@^30.0.0` exports `VictoryPolarAxis`

View these docs at https://formidable.com/open-source/victory/docs/victory-polar-axis to see live examples.

VictoryPolarAxis renders a single axis which can be used on its own or composed with [`VictoryChart`][].

```playground
<svg width={400} height={400}>
  <VictoryPolarAxis
    width={400}
    height={400}
    theme={VictoryTheme.material}
    standalone={false}
  />
  <VictoryPolarAxis dependentAxis
    width={400}
    height={400}
    domain={[0, 10]}
    theme={VictoryTheme.material}
    standalone={false}
  />
</svg>
```

## Props

### animate

`type: boolean || object`

`VictoryPolarAxis` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations

```jsx
animate={{
  duration: 2000,
  easing: "bounce"
}}
```

### axisAngle

`type: number`

The `axisAngle` prop is used to position the dependent axis. This prop should be given in degrees. Degrees are defined as starting at the 3 o'clock position, and proceeding counterclockwise. This prop only affects the dependent axis.

_default:_ `axisAngle={0}`

```playground
<VictoryPolarAxis dependentAxis
  theme={VictoryTheme.material}
  axisAngle={45}
/>
```

### axisComponent

`type: element`

The `axisComponent` prop takes a component instance which will be responsible for rendering an axis line for the dependent axis. The independent axis renders a `circularAxisComponent`. The new element created from the passed `axisComponent` will be provided with the following props calculated by `VictoryPolarAxis`: `x1`, `y1`, `x2`, `y2`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If an `axisComponent` is not provided, `VictoryPolarAxis` will use its default [Line component][].

_default:_ `axisComponent={<Line type={"axis"}/>}`

```jsx
axisComponent={<Line events={{ onClick: handleClick }}/>}
```

### axisLabelComponent

`type: element`

The `axisLabelComponent` prop takes a component instance which will be used to render the axis label. The new element created from the passed `axisLabelComponent` will be supplied with the following props: `x`, `y`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `axisLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

**Note:** Axis labels are only rendered with the dependent axis in polar charts.

_default:_ `axisLabelComponent={<VictoryLabel/>}`

```jsx
axisLabelComponent={<VictoryLabel dy={20}/>}
```

### axisValue

`type: number`

The `axisValue` prop may be used instead of `axisAngle` to position the dependent axis. This prop is useful when dependent axes should line up with values on the independent axis.

```playground
 <VictoryChart polar
  theme={VictoryTheme.material}
>
  {
    ["intelligence", "strength", "speed", "stealth", "charisma"].map((d, i) => {
      return (
        <VictoryPolarAxis dependentAxis
          key={i}
          label={d}
          labelPlacement="perpendicular"
          style={{ tickLabels: { fill: "none" } }}
          axisValue={i}
        />
      );
    })
  }
  <VictoryBar
    style={{ data: { fill: "tomato", width: 25 } }}
    data={[
      { x: 0, y: 10 },
      { x: 1, y: 25 },
      { x: 2, y: 40 },
      { x: 3, y: 50 },
      { x: 4, y: 50 }
    ]}
  />
</VictoryChart>
```

### circularAxisComponent

`type: element`

The `circularAxisComponent` prop takes a component instance which will be responsible for rendering an axis arc for the independent axis. The dependent axis renders an `axisComponent`. The new element created from the passed `circularAxisComponent` will be provided with the following props calculated by `VictoryPolarAxis`: `style`, `events`,
`cx`, `cy`, `r`, `startAngle`, and `endAngle`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `circularAxisComponent` is not provided, `VictoryPolarAxis` will use its default [Arc component][].

_default:_ `circularAxisComponent={<Arc type={"axis"}/>}`

```jsx
circularAxisComponent={<Arc r={300}/>}
```

### circularGridComponent

`type: element`

The `circularGridComponent` prop takes a component instance which will be responsible for rendering a grid element. The new element created from the passed `circularGridComponent` will be provided with the following props calculated by `VictoryPolarAxis`: `x1`, `y1`, `x2`, `y2`, `tick`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `circularGridComponent` is not provided, `VictoryPolarAxis` will use its default [Arc component][].

_default:_ `circularGridComponent={<Arc type={"grid"}/>}`

```jsx
circularGridComponent={<Arc r={300}/>}
```

### containerComponent

`type: element`

`VictoryPolarAxis` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

The following victory containers work with polar charts:
`VictoryContainer`, `VictorySelectionContainer`, `VictoryVoronoiContainer` and `VictoryZoomContainer`

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### dependentAxis

`type: boolean`

The `dependentAxis` boolean prop specifies whether the axis corresponds to the dependent variable (usually y, or the radial dimension on a polar chart). This prop is useful when composing `VictoryPolarAxis` with other components to form a chart.

_default:_ `dependentAxis={false}`

```playground
<div style={{ display: "flex" }}>
  <VictoryPolarAxis dependentAxis theme={VictoryTheme.material} />
  <VictoryPolarAxis theme={VictoryTheme.material} />
</div>
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryPolarAxis` uses the standard `domain` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryPolarAxis` uses the standard `domainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### endAngle

`type: number`

The `endAngle` props defines the overall end angle of the axis in degrees. This prop is used in conjunction with `startAngle` to create an axis that spans only a segment of a circle, or to change overall rotation of the axis. This prop should be given as a number of degrees. Degrees are defined as starting at the 3 o'clock position, and proceeding counterclockwise.

_default:_ `endAngle={360}`

```playground
<div style={{ display: "flex" }}>
<VictoryPolarAxis
  startAngle={90}
  endAngle={450}
  tickValues={[0, 90, 180, 270]}
  labelPlacement="vertical"
/>
<VictoryPolarAxis
  startAngle={0}
  endAngle={180}
  tickValues={[0, 45, 90, 135, 180]}
/>
</div>
```

### events

`type: array[objects]`

`VictoryPolarAxis` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][]for more information on defining events.

**note:** valid event targets for `VictoryPolarAxis` are "axis", "axisLabel", "grid", "ticks", and "tickLabels".
Targets that correspond to only one element {"axis" and "axisLabel") should use the special eventKey "all".

### externalEventMutations

`type: array[object]`

`VictoryPolarAxis` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### gridComponent

`type: element`

The `gridComponent` prop takes a component instance which will be responsible for rendering a grid element. The new element created from the passed `gridComponent` will be provided with the following props calculated by `VictoryPolarAxis`: `x1`, `y1`, `x2`, `y2`, `tick`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `gridComponent` is not provided, `VictoryPolarAxis` will use its default [Line component][].

_default:_ `gridComponent={<Line type={"grid"}/>}`

```jsx
gridComponent={<Line events={{ onClick: handleClick }}/>}
```

### groupComponent

`type: element`

`VictoryPolarAxis` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryPolarAxis` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### innerRadius

`type: number`

When the `innerRadius` prop is set, polar axes will be hollow rather than circular.

```playground
<VictoryPolarAxis theme={VictoryTheme.material} innerRadius={50}/>
```

### invertAxis

`type: boolean`

The `invertAxis` boolean prop specifies whether the domain for a given axis should be inverted. By default, axes will be displayed with lower values on the bottom / left, and higher values on the top / right regardless of orientation.

_default:_ `invertAxis={false}`

### label

`type: string`

The `label` prop defines the label that will appear with a dependent axis. Labels will not appear with independent polar axes. This prop should be given as a string.

```playground
<VictoryPolarAxis dependentAxis
  theme={VictoryTheme.material}
  label="wind speed"
  labelPlacement="perpendicular"
/>
```

### labelPlacement

`type: "parallel" || "perpendicular" || "vertical"`

The `labelPlacement` prop specifies how tick labels should be placed relative to the angular tick values. Options for this prop are "vertical", "parallel", and "perpendicular".

_default:_ `labelPlacement="parallel"`

```playground
<VictoryPolarAxis
  labelPlacement="perpendicular"
  theme={VictoryTheme.material}
/>
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryPolarAxis` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryPolarAxis
  dependentAxis
  tickValues={[1, 2, 3]}
  maxDomain={5}
/>
```

### minDomain

`type: number || { x: number, y: number }`

`VictoryPolarAxis` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryPolarAxis
  dependentAxis
  tickValues={[2, 3, 4, 5]}
  minDomain={0}
/>
```

### name

`type: string`

`VictoryPolarAxis` uses the standard `name` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#name)

```jsx
name = "series-1";
```

### origin

`type: { x: number, y: number }`

**The `origin` prop is only used by polar charts, and is usually controlled by `VictoryChart`. It will not typically be necessary to set an `origin` prop manually**

[Read about the `origin` prop in detail](https://formidable.com/open-source/victory/docs/common-props#origin)

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryPolarAxis` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

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

`VictoryPolarAxis` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

**note:** Though `VictoryPolarAxis` can take a `scale` prop with scales defined for both `x` and `y`, only the scale that corresponds the given axis will be used.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryPolarAxis` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### standalone

`type: boolean`

`VictoryPolarAxis` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryPolarAxis` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={350} height={350}>
  <VictoryPolarAxis
    theme={VictoryTheme.material}
    standalone={false}
  />
  <VictoryPolarAxis dependentAxis
    axisAngle={45}
    labelPlacement="vertical"
    theme={VictoryTheme.material}
    standalone={false}
  />
</svg>
```

### startAngle

`type: number`

The `startAngle` props defines the overall end angle of the axis in degrees. This prop is used in conjunction with `endAngle` to create an axis that spans only a segment of a circle, or to change overall rotation of the axis. This prop should be given as a number of degrees. Degrees are defined as starting at the 3 o'clock position, and proceeding counterclockwise.

_default:_ `startAngle={0}`

```playground
<div style={{ display: "flex" }}>
  <VictoryPolarAxis
    startAngle={90}
    endAngle={450}
    tickValues={[0, 90, 180, 270]}
    labelPlacement="vertical"
  />
  <VictoryPolarAxis
    startAngle={0}
    endAngle={180}
    tickValues={[0, 45, 90, 135, 180]}
  />
</div>
```

### style

`type: { axis: object, axisLabel: object, grid: object, ticks: object, tickLabels: object }`

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `parent`, `axis`, `axisLabel`, `grid`, `ticks`, and `tickLabels`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart. Functional styles may be defined for `grid`, `tick`, and `tickLabel` style properties, and they will be evaluated with each tick.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties may be included in `labels` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryPolarAxis
  style={{
    axis: {stroke: "black"},
    grid: {stroke: (t) => t > 0.5 ? "red" : "blue"},
    tickLabels: {fontSize: 15, padding: 15}
  }}
/>
```

### theme

`type: object`

`VictoryPolarAxis` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

_Note:_ Use the `dependentAxis` and `independentAxis` namespaces to theme axes by type. These namespaces will be merged with any props and styles supplied in the `axis` namespace.

```jsx
theme={VictoryTheme.material}
```

### tickComponent

`type: element`

The `tickComponent` prop takes a component instance which will be responsible for rendering a tick element. The new element created from the passed `tickComponent` will be provided with the following props calculated by `VictoryPolarAxis`: `x1`, `y1`, `x2`, `y2`, `tick`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `tickComponent` is not provided, `VictoryPolarAxis` will use its default [Line component][].

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
<VictoryPolarAxis
  tickValues={[2.11, 3.9, 6.1, 8.05]}
  labelPlacement="vertical"
  tickFormat={(t) => `${Math.round(t)}k`}
/>
```

### tickLabelComponent

`type: element`

The `tickLabelComponent` prop takes a component instance which will be used to render the axis label. The new element created from the passed `tickLabelComponent` will be supplied with the following props: `x`, `y`, `tick`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `tickLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

_default:_ `tickLabelComponent={<VictoryLabel/>}`

```jsx
tickLabelComponent={<VictoryLabel dy={20}/>}
```

### tickValues

`type: array`

The `tickValues` prop explicitly specifies a set of tick values to draw on the axis. This prop should be given as an array of unique values of the same type (_i.e.,_ all numbers). The `tickValues` prop is used to specify the _values_ of each tick, so numeric values are typically appropriate. An array of strings or dates may be supplied for categorical and time series data respectively. Use the [tickFormat][] prop to specify how ticks should be labeled. _Note:_ `tickValues` should be given as a unique array.

```playground
<VictoryPolarAxis
  labelPlacement="vertical"
  tickValues={[2, 4, 6, 8]}
/>
```

### width

`type: number`

`VictoryPolarAxis` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

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
[arc component]: https://formidable.com/open-source/victory/docs/victory-primitives#arc
[`victorylabel`]: https://formidable.com/open-source/victory/docs/victory-label

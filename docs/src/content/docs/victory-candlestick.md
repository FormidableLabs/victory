---
id: 8
title: VictoryCandlestick
category: charts
type: docs
scope:
  - sampleDataDates
---

# VictoryCandlestick

VictoryCandlestick renders a dataset as a series of candlesticks. VictoryCandlestick can be composed with [`VictoryChart`][] to create candlestick charts.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ x: 25 }}
  scale={{ x: "time" }}
>
<VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
<VictoryAxis dependentAxis/>
<VictoryCandlestick
  candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
  data={sampleDataDates}
/>
</VictoryChart>
```

## animate

`type: boolean || object`

`VictoryCandlestick` uses the standard `animate` prop. [Read about it here](/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

## candleColors

`type: { positive: string, negative: string }`

Candle colors are significant in candlestick charts, with colors indicating whether a market closed higher than it opened (positive), or closed lower than it opened (negative). The `candleColors` prop should be given as an object with color strings specified for positive and negative.

_default (provided by default theme):_ `candleColors={{positive: "white", negative: "black"}}`

```playground
<VictoryCandlestick
  candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
  data={sampleDataDates}
/>
```

## candleRatio

`type: number`

The `candleRatio` prop specifies an _approximate_ ratio between candle widths and spaces between candles. When width is not specified via the `candleWidth` prop or in candle styles, the `candleRatio` prop will be used to calculate a default width for each candle given the total number of candles in the data series and the overall width of the chart.

```playground
<VictoryCandlestick
  candleRatio={0.8}
  data={sampleDataDates}
/>
```

## candleWidth

`type: number || function`

The `candleWidth` prop is used to specify the width of each candle. This prop may be given as a number of pixels or as a function that returns a number. When this prop is given as a function, it will be evaluated with a single argument: an object containing all the props passed to the `Candle` component. When this value is not given, a default value will be calculated based on the overall dimensions of the chart, and the number of candles.

_Note:_ It is still possible to define candle width via the style prop with the `width` attribute, but `candleWidth` will take precedence.

```playground
<VictoryCandlestick
  candleWidth={55}
  data={sampleDataDates}
/>
```

## categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryCandlestick` uses the standard `categories` prop. [Read about it here](/docs/common-props#categories)

```jsx
categories={{ x: ["dogs", "cats", "mice"] }}
```

## close

`type: string || integer || array[string] || function`

Use `close` data accessor prop to define the close value of a candle.

**string:** specify which property in an array of data objects should be used as the close value

_examples:_ `close="closing_value"`

**function:** use a function to translate each element in a data array into a close value

_examples:_ `close={() => 10}`

**array index:** specify which index of an array should be used as a close value when data is given as an array of arrays

_examples:_ `close={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a close value

_examples:_ `close="bonds.close"`, `close={["bonds", "close"]}`

## closeLabelComponent

`type: element`

The `closeLabelComponent` prop takes a component instance which will be used to render the label corresponding to the close value for each candle. The new element created from the passed `closeLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `closeLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `closeLabelComponent={<VictoryLabel/>}`

```jsx
closeLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryCandlestick
  data={sampleDataDates}
  closeLabels
  closeLabelComponent={
    <VictoryLabel
      dx={-30}
      textAnchor="middle"
    />
  }
/>
```

## closeLabels

`type: array || function || boolean`

The `closeLabels` prop defines the labels that will correspond to the close value for each candle. This prop should be given as a boolean, an array or as a function of the props corresponding to that label. When given as a boolean value, the max value of each datum will be used for the label.

_examples:_

- `closeLabels`
- `closeLabels={["first", "second", "third"]}`
- `closeLabels={({ datum }) => Math.round(datum.close)}`

## containerComponent

`type: element`

`VictoryCandlestick` uses the standard `containerComponent` prop. [Read about it here](/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

## data

`type: array[object]`

Specify data via the `data` prop. By default, `VictoryCandlestick` expects data as an array of objects with `x`, `open`, `close`, `high`, and `low` keys. Use the [`x`][], [`open`][], [`close`][], [`high`][], and [`low`][] data accessor props to specify custom data formats. Refer to the [Data Accessors Guide][] for more detail.

```playground
<VictoryCandlestick
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
    {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5}
  ]}
/>
```

## dataComponent

`type: element`

`VictoryCandlestick` uses the standard `dataComponent` prop. [Read about it here](/docs/common-props#datacomponent)

`VictoryCandlestick` supplies the following props to its `dataComponent`: `data`, `datum`, `index`, `padding`, `polar`, `origin`, `scale`, `style`, `candleHeight`, `x1`, `y1`, `y2`, `x2`

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Candle/>`

```jsx
dataComponent={<Candle events={{ onClick: handleClick }}/>}
```

## domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryCandlestick` uses the standard `domain` prop. [Read about it here](/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

## domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryCandlestick` uses the standard `domainPadding` prop. [Read about it here](/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

## eventKey

`type: string || integer || array[string] || function`

`VictoryCandlestick` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

## events

`type: array[object]`

`VictoryCandlestick` uses the standard `events` prop. [Read about it here](/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryCandlestick
    events={[{
      target: "data",
      eventHandlers: {
        onClick: () => {
          return [
            {
              target: "data",
              mutation: (props) => {
                const fill = props.style && props.style.fill;
                return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
              }
            }
          ];
        }
      }
    }]}
    data={sampleDataDates}
  />
</div>
```

## groupComponent

`type: element`

`VictoryCandlestick` uses the standard `groupComponent` prop. [Read about it here](/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

## height

`type: number`

`VictoryCandlestick` uses the standard `height` prop. [Read about it here](/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

## high

`type: string || integer || array[string] || function`

Use `high` data accessor prop to define the high value of a candle.

**string:** specify which property in an array of data objects should be used as the high value

_examples:_ `high="highest_value"`

**function:** use a function to translate each element in a data array into a high value

_examples:_ `high={() => 10}`

**array index:** specify which index of an array should be used as a high value when data is given as an array of arrays

_examples:_ `high={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a high value

_examples:_ `high="bonds.high"`, `high={["bonds", "high"]}`

## highLabelComponent

`type: element`

The `highLabelComponent` prop takes a component instance which will be used to render the label corresponding to the highest value for each candle. The new element created from the passed `highLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `highLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `highLabelComponent={<VictoryLabel/>}`

```jsx
highLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryCandlestick
  data={sampleDataDates}
  highLabels
  highLabelComponent={
    <VictoryLabel
      dx={-10}
      textAnchor="middle"
    />
  }
/>
```

## highLabels

`type: array || function || boolean`

The `highLabels` prop defines the labels that will correspond to the high value for each candle. This prop should be given as a boolean, an array or as a function of the props corresponding to that label. When given as a boolean value, the max value of each datum will be used for the label.

_examples:_

- `highLabels`
- `highLabels={["first", "second", "third"]}`
- `highLabels={({ datum }) => Math.round(datum.high)}`

## horizontal

`type: boolean`

`VictoryCandlestick` uses the standard `horizontal` prop. [Read about it in detail](/docs/common-props#horizontal)

```playground
<VictoryCandlestick horizontal
  data={sampleDataDates}
/>
```

## labelComponent

`type: element`

`VictoryCandlestick` uses the standard `labelComponent` prop. [Read about it here](/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryCandlestick
  data={sampleDataDates}
  labels={({ datum }) => datum.open}
  style={{
  	labels: {
    	fill: ({ datum}) => datum.close > datum.open
        	? "black"
            : "white"
      }
  }}
  labelComponent={
  	<VictoryLabel
    	dx={({ text }) => text[0].length === 1 ? -4 : -8}
    />
  }
/>
```

## labelOrientation

`type: "top", "bottom", "left", "right" || { open, close, low, high }`

The `labelOrientation` prop determines where a label should be placed in relation to the candle it corresponds to. This prop may be given as "top", "bottom", "left", "right", or as an object with an option defined for some or all of the labels.

```playground
<VictoryCandlestick
  data={sampleDataDates}
  closeLabels={() => "close"}
  highLabels={() => "high"}
  lowLabels={() => "low"}
  openLabels={() => "open"}
  style={{ labels: { padding: 4 } }}
  labelOrientation={{
    close: "right",
    open: "right",
    high: "top",
    low: "bottom"
  }}
/>
```

## labels

`type: array || function`

`VictoryCandlestick` uses the standard `labels` prop. [Read about it here](/docs/common-props#labels)

```playground
<VictoryCandlestick
  data={sampleDataDates}
  labels={({ datum }) => `open: ${datum.open}`}
/>
```

## low

`type: string || integer || array[string] || function`

Use `low` data accessor prop to define the low value of a candle.

**string:** specify which property in an array of data objects should be used as the low value

_examples:_ `low="lowest_value"`

**function:** use a function to translate each element in a data array into a low value

_examples:_ `low={() => 10}`

**array index:** specify which index of an array should be used as a low value when data is given as an array of arrays

_examples:_ `low={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a low value

_examples:_ `low="bonds.low"`, `low={["bonds", "low"]}`

## lowLabelComponent

`type: element`

The `lowLabelComponent` prop takes a component instance which will be used to render the label corresponding to the lowest value for each candle. The new element created from the passed `lowLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `lowLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `lowLabelComponent={<VictoryLabel/>}`

```jsx
lowLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryCandlestick
  data={sampleDataDates}
  lowLabels
  lowLabelComponent={<VictoryTooltip pointerLength={0}/>}
  events={[{
  	target: "data",
    eventHandlers: {
      onMouseOver: () => ({
        target: "lowLabels", mutation: () => ({ active: true })
      }),
      onMouseOut: () => ({
        target: "lowLabels", mutation: () => ({ active: false })
      })
    }
  }]}
/>
```

## lowLabels

`type: array || function || boolean`

The `lowLabels` prop defines the labels that will correspond to the low value for each candle. This prop should be given as a boolean, an array or as a function of the props corresponding to that label. When given as a boolean value, the max value of each datum will be used for the label.

_examples:_

- `lowLabels`
- `lowLabels={["first", "second", "third"]}`
- `lowLabels={({ datum }) => Math.round(datum.low)}`

## maxDomain

`type: number || { x: number, y: number }`

`VictoryCandlestick` uses the standard `maxDomain` prop. [Read about it in detail](/docs/common-props#maxDomain)

```playground
<VictoryChart
  maxDomain={{ y: 30 }}
  scale={{ x: "time" }}
>
  <VictoryCandlestick
    data={sampleDataDates}
  />
</VictoryChart>
```

## minDomain

`type: number || { x: number, y: number }`

`VictoryCandlestick` uses the standard `minDomain` prop. [Read about it in detail](/docs/common-props#minDomain)

```playground
<VictoryChart
  minDomain={{ y: 0 }}
  scale={{ x: "time" }}
>
  <VictoryCandlestick
    data={sampleDataDates}
  />
</VictoryChart>
```

## name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

```jsx
name = "series-1";
```

## open

`type: string || integer || array[string] || function`

Use `open` data accessor prop to define the open value of a candle.

**string:** specify which property in an array of data objects should be used as the open value

_examples:_ `open="opening_value"`

**function:** use a function to translate each element in a data array into a open value

_examples:_ `open={() => 10}`

**array index:** specify which index of an array should be used as a open value when data is given as an array of arrays

_examples:_ `open={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a open value

_examples:_ `open="bonds.open"`, `open={["bonds", "open"]}`

## openLabelComponent

`type: element`

The `openLabelComponent` prop takes a component instance which will be used to render the label corresponding to the open value for each candle. The new element created from the passed `openLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `openLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `openLabelComponent={<VictoryLabel/>}`

```jsx
openLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryCandlestick
  data={sampleDataDates}
  openLabels
  openLabelComponent={
    <VictoryLabel
      dx={-30}
      textAnchor="middle"
    />
  }
/>
```

## openLabels

`type: array || function || boolean`

The `openLabels` prop defines the labels that will correspond to the open value for each candle. This prop should be given as a boolean, an array or as a function of the props corresponding to that label. When given as a boolean value, the max value of each datum will be used for the label.

_examples:_

- `openLabels`
- `openLabels={["first", "second", "third"]}`
- `openLabels={({ datum }) => Math.round(datum.open)}`

## origin

`type: { x: number, y: number }`

**The `origin` prop is only used by polar charts, and is usually controlled by `VictoryChart`. It will not typically be necessary to set an `origin` prop manually**

[Read about the `origin` prop in detail](/docs/common-props#origin)

## padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryCandlestick` uses the standard `padding` prop. [Read about it here](/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

## polar

`type: boolean`

`VictoryCandlestick` uses the standard `polar` prop. [Read about it here](/docs/common-props#polar)

**Note:** Polar Charts are not yet supported for `VictoryCandlestick`

## range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](/docs/common-props#range)

## samples

`type: number`

`VictoryCandlestick` uses the standard `samples` prop. [Read about it here](/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

## scale

`type: scale || { x: scale, y: scale }`

`VictoryCandlestick` uses the standard `scale` prop. [Read about it here](/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

## sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

## singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryCandlestick` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](/docs/common-props#singlequadrantdomainpadding)

## sortKey

`type: string || integer || array[string] || function`

`VictoryCandlestick` uses the standard `sortKey` prop. [Read about it here](/docs/common-props#sortkey)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
sortKey = "x";
```

## sortOrder

`type: "ascending" || "descending"`

The `sortOrder` prop specifies whether sorted data should be returned in ascending or descending order.

_default:_ `sortOrder="ascending"`

## standalone

`type: boolean`

`VictoryCandlestick` uses the standard `standalone` prop. [Read about it here](/docs/common-props#standalone)

**note:** When `VictoryCandlestick` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryCandlestick
    standalone={false}
    width={300} height={300}
    data={sampleDataDates}
  />
</svg>
```

## style

```
type: {
  parent: object,
  data: object,
  labels: object,
  closeLabels: object,
  highLabels: object,
  lowLabels: object,
  openLabels: object
}
```

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `parent`, `data`, `labels`, `closeLabels`, `highLabels`,`lowLabels`, and `openLabels`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart. Functional styles may be defined for style properties, and they will be evaluated with the props corresponding to each element.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties may be included in `labels` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryCandlestick
  data={sampleDataDates}
  labels={() => "labels"}
  closeLabels={() => "close"}
  highLabels={() => "high"}
  lowLabels={() => "low"}
  openLabels={() => "open"}
  style={{
    data: {
      fill: "#c43a31", fillOpacity: 0.7, stroke: "#c43a31", strokeWidth: 3
    },
    labels: { fill: "tomato", padding: 2 },
    closeLabels: { fill: "orange", padding: 2 },
    highLabels: { fill: "blue", padding: 2 },
    lowLabels: { fill: "teal", padding: 2 },
    openLabels: { fill: "green", padding: 2 },
  }}
/>
```

## theme

`type: object`

`VictoryCandlestick` uses the standard `theme` prop. [Read about it here](/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

## wickStrokeWidth

`type: number`

When the `wickStrokeWidth` prop is set, this value will be used to determine the stroke width for the candle wick. When this prop is not set, the `strokeWidth` set by the `style` prop will apply to both the candle and the wick.

## width

`type: number`

`VictoryCandlestick` uses the standard `width` prop. [Read about it here](/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

## x

`type: string || integer || array[string] || function`

`VictoryCandlestick` uses the standard `x` data accessor prop. [Read about it here](/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x={(datum) => new Date(datum.day)}
```

[animations guide]: /guides/animations
[data accessors guide]: /guides/data-accessors
[custom components guide]: /guides/custom-components
[events guide]: /guides/events
[themes guide]: /guides/themes
[`victorychart`]: /docs/victory-chart
[`x`]: /docs/victory-candlestick#x
[`open`]: /docs/victory-candlestick#open
[`close`]: /docs/victory-candlestick#close
[`high`]: /docs/victory-candlestick#high
[`low`]: /docs/victory-candlestick#low
[grayscale theme]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/grayscale.js

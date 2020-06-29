---
id: 35
title: VictoryHistogram
category: charts
type: docs
scope:
  - sampleHistogramData
  - sampleHistogramDateData
  - d3Scale
  - d3Time
  - d3Array
---

# VictoryHistogram

VictoryHistogram renders a dataset as series of bars representing "bins", allowing the ability to view distribution of the data. The data passed in will be "binned" according to the `bin` prop that is provided (if any), allowing for flexibility in how these bins are determined. VictoryHistogram can be composed with [`VictoryChart`][] to create histogram charts.

`VictoryHistogram` is intended to be used with quantitative data. Please use [`VictoryBar`][] for qualitative or categorical data.

```playground
<VictoryChart
  domainPadding={10}
>
  <VictoryHistogram
    style={{ data: { fill: "#c43a31" } }}
    data={sampleHistogramData}
  />
</VictoryChart>
```

## animate

`type: boolean || object`

`VictoryHistogram` uses the standard `animate` prop. [Read about it here](/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

## bins

`type: number || array[numbers] || array[dates]`

_default:_ `undefined`

**`VictoryHistogram` uses [`d3.bin`](https://observablehq.com/@d3/d3-bin) to do binning.**

The `bins` prop is used to specify how the data will be binned. There are a few options for this, the first being passing no value, ie the default behavior, which is letting `d3.bin` generate the buckets based on the data. The second is passing a number, which specifies _approximately_ the number of bins to generate, this is not a guarantee (see `d3.bin` for more details). The last options are passing an array of numbers or dates (depending on the data), this array represents an array of thresholds. So for example if the bin prop provided is `[0, 10, 20, 35]`, this would result in 3 bins, that would look like [0, 10) , [10, 20), \[20, 35\].

This prop allows for a lot of flexibility in how the data is displayed. For example it is possible to have uneven sized bins if so desired. It is also possible to group the data by days, weeks, or years.

```playground
<VictoryChart
  domainPadding={{ x: 20 }}
>
  <VictoryHistogram
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleHistogramData}
    bins={[0, 3, 7, 10]}
    // bins={5}
  />
</VictoryChart>
```

```playground
<VictoryChart
  domainPadding={{ x: 20 }}
>
  <VictoryHistogram
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleHistogramDateData}
    bins={[
      new Date(2020, 1, 1),
      new Date(2020, 4, 1),
      new Date(2020, 8, 1),
      new Date(2020, 11, 1)
    ]}
  />
</VictoryChart>
```

```playground_norender
const App = () => {
  const niceTimeScale = d3Scale
    .scaleTime()
    .domain(d3Array.extent(sampleHistogramDateData, ({ x }) => x))
    .nice();

  // get thresholds to bin data by months
  const bins = niceTimeScale.ticks(d3Time.utcMonth); // try utcDay

  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
    >
      <VictoryHistogram
        style={{
          data: { fill: "#c43a31" }
        }}
        data={sampleHistogramDateData}
        bins={bins}
      />
    </VictoryChart>
  );
}

ReactDOM.render(<App/>, mountNode);
```

## binSpacing

`type: number`

The `binSpacing` prop is used to specify space between each bin. `binSpacing` represents the number of pixels that will be between each bin (including at the beginning and end of the bins). By default, bins are rendered with no spacing.

```playground
<VictoryChart
  domainPadding={{ x: 20 }}
>
  <VictoryHistogram
    binSpacing={20}
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleHistogramData}
  />
</VictoryChart>
```

## containerComponent

`type: element`

`VictoryHistogram` uses the standard `containerComponent` prop. [Read about it here](/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

## cornerRadius

`type: function || number || { top, bottom, topLeft, topRight, bottomLeft, bottomRight }`

The `cornerRadius` prop specifies a radius to apply to each bar. If this prop is given as a single number, the radius will only be applied to the _top_ of each bar. When this prop is given as a function, it will be evaluated for each bar with the props object corresponding to that bar.

```playground
<VictoryChart
  domainPadding={{ x: 15 }}
>
  <VictoryHistogram
    cornerRadius={{ topLeft: ({ datum }) => datum.y * 4 }}
    style={{
      data: {
        fill: "#c43a31",
        width: 25
      }
    }}
    data={sampleHistogramData}
  />
</VictoryChart>
```

## data

`type: array[object]`

`VictoryHistogram` uses the standard `data` prop, except for it only expects each object within the array to have `x` properties. The `x` data accessor prop can be used to defined a custom data format. [Read about it here](/docs/common-props#data)

Because each bar represents a bin rather than a particular data point (like with `VictoryScatter` for example), when accessing `datum` via a prop that passes `datum` such as `style`, datum will have properties `x`, `x0`, `x1`, `y`, and `binnedData`. `x` is the midpoint between the bin, `x0` is the beginning of the bin, `x1` is the end of the bin, `y` is the aggregate amount of data points within that bin, and `binnedData` is an array of the original data points that were grouped into this bin.

`VictoryHistogram` is intended to be used with quantitative data. Please use [`VictoryBar`][] for qualitative or categorical data.

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```playground
<VictoryHistogram
  data={[
    { x: 1 },
    { x: 2 },
    { x: 2 },
    { x: 4 },
    { x: 4 },
    { x: 5 }
  ]}
/>
```

## dataComponent

`type: element`

`VictoryHistogram` uses the standard `dataComponent` prop. [Read about it here](/docs/common-props#datacomponent)

`VictoryHistogram` supplies the following props to its `dataComponent`: `barWidth`, `cornerRadius`, `data`, `datum`, `horizontal`, `index`, `padding`, `origin`, `scale`, `style`, `width`, `height`, `x`, `y`, `y0`, `x0`.

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Bar />`

```jsx
dataComponent={<Bar events={{ onClick: handleClick }}/>}
```

## domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryHistogram` uses the standard `domain` prop. [Read about it here](/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

## domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryHistogram` uses the standard `domainPadding` prop. [Read about it here](/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

## eventKey

`type: string || integer || array[string] || function`

`VictoryHistogram` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

## events

`type: array[object]`

`VictoryHistogram` uses the standard `events` prop. [Read about it here](/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryHistogram
    style={{
      data: { fill: "#c43a31" }
    }}
    events={[{
      target: "data",
      eventHandlers: {
        onClick: () => {
          return [
            {
              target: "data",
              mutation: (props) => {
                const fill = props.style && props.style.fill;
                return fill === "black" ? null : { style: { fill: "black" } };
              }
            }
          ];
        }
      }
    }]}
    data={sampleHistogramData}
  />
</div>
```

## externalEventMutations

`type: array[object]`

`VictoryHistogram` uses the standard `externalEventMutations` prop. [Read about it in detail](/docs/common-props#externalEventsMutations)

## groupComponent

`type: element`

`VictoryHistogram` uses the standard `groupComponent` prop. [Read about it here](/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

## height

`type: number`

`VictoryHistogram` uses the standard `height` prop. [Read about it here](/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

## horizontal

`type: boolean`

The horizontal prop determines whether the bins will be laid vertically or horizontally. The bins will be vertical if this prop is false or unspecified, or horizontal if the prop is set to true.

_default:_ horizontal={false}

```playground
<VictoryChart
  domainPadding={{ x: 10 }}
>
  <VictoryHistogram horizontal
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleHistogramData}
  />
</VictoryChart>
```

## labelComponent

`type: element`

`VictoryHistogram` uses the standard `labelComponent` prop. [Read about it here](/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryHistogram
  data={sampleHistogramData}
  labels={({ datum }) => datum.y}
  style={{ labels: { fill: "white" } }}
  labelComponent={<VictoryLabel dy={30}/>}
/>
```

## labels

`type: array || function`

`VictoryHistogram` uses the standard `labels` prop. [Read about it here](/docs/common-props#labels)

```playground
<VictoryHistogram
  data={sampleHistogramData}
  labels={({ datum }) => `Bin count:\n ${datum.y}`}
/>
```

## maxDomain

`type: number || { x: number, y: number }`

`VictoryHistogram` uses the standard `maxDomain` prop. [Read about it in detail](/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={{ x: 3 }}>
  <VictoryHistogram data={sampleHistogramData}/>
</VictoryChart>
```

## minDomain

`type: number || { x: number, y: number }`

`VictoryHistogram` uses the standard `minDomain` prop. [Read about it in detail](/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={{ x: 2 }}>
  <VictoryHistogram data={sampleHistogramData}/>
</VictoryChart>
```

## name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

```jsx
name = "series-1";
```

## padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryHistogram` uses the standard `padding` prop. [Read about it here](/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

## polar

`type: boolean`

**Note:** Polar Charts are not yet supported for `VictoryHistogram`

## range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](/docs/common-props#range)

## scale

`type: scale || { x: scale, y: scale }`

`VictoryHistogram` uses the standard `scale` prop. [Read about it here](/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

## sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

## singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryHistogram` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](/docs/common-props#singlequadrantdomainpadding)

## sortKey

`type: string || integer || array[string] || function`

`VictoryHistogram` uses the standard `sortKey` prop. [Read about it here](/docs/common-props#sortkey)

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

`VictoryHistogram` uses the standard `standalone` prop. [Read about it here](/docs/common-props#standalone)

**note:** When `VictoryHistogram` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryHistogram
    standalone={false}
    width={300} height={300} padding={{left: 10, right: 10}}
    data={sampleHistogramData}
  />
</svg>
```

## style

`type: { parent: object, data: object, labels: object }`

`VictoryHistogram` uses the standard `style` prop. [Read about it here](/docs/common-props#style)

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
  <VictoryHistogram
    style={{
      data: {
        fill: ({ datum }) => datum.y === 3 ? "#000000" : "#c43a31",
        stroke: ({ index }) => +index % 2 === 0  ? "#000000" : "#c43a31",
        fillOpacity: 0.7,
        strokeWidth: 3
      },
      labels: {
        fontSize: 15,
        fill: ({ datum }) => datum.y === 3 ? "#000000" : "#c43a31"
      }
    }}
    data={sampleHistogramData}
    labels={({ datum }) => datum.y}
  />
```

## theme

`type: object`

`VictoryHistogram` uses the standard `theme` prop. [Read about it here](/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

## width

`type: number`

`VictoryHistogram` uses the standard `width` prop. [Read about it here](/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

## x

`type: string || integer || array[string] || function`

`VictoryHistogram` uses the standard `x` data accessor prop. [Read about it here](/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

[animations guide]: /guides/animations
[data accessors guide]: /guides/data-accessors
[custom components guide]: /guides/custom-components
[events guide]: /guides/events
[themes guide]: /guides/themes
[`victorychart`]: /docs/victory-chart
[`victorybar`]: /docs/victory-bar
[grayscale theme]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/grayscale.js

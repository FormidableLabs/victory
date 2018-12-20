# VictoryBar

`victory-bar@^30.0.0` exports `VictoryBar` and `Bar` components

View these docs at https://formidable.com/open-source/victory/docs/victory-bar to see live examples.

VictoryBar renders a dataset as series of bars. VictoryBar can be composed with [`VictoryChart`][] to create bar charts.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={10}
>
  <VictoryBar
    style={{ data: { fill: "#c43a31" } }}
    data={sampleData}
  />
</VictoryChart>
```

## Props

### alignment

`type: "start" || "middle" || "end"`

The `alignment` prop specifies how bars should be aligned relative to their data points. This prop may be given as "start", "middle" or "end". When this prop is not specified, bars will have "middle" alignment relative to their data points.

```playground
<VictoryChart
  theme={VictoryTheme.material}
>
  <VictoryBar
    style={{ data: { fill: "#c43a31" } }}
    alignment="start"
    data={sampleData}
  />
</VictoryChart>
```

### animate

`type: boolean || object`

`VictoryBar` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

### barRatio

`type: number`

The `barRatio` prop specifies an _approximate_ ratio between bar widths and spaces between bars. When width is not specified in bar styles, the `barRatio` prop will be used to calculate a default width for each bar given the total number of bars in the data series and the overall width of the chart.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ x: 15 }}
>
  <VictoryBar
    barRatio={0.8}
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleData}
  />
</VictoryChart>
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryBar` uses the standard `categories` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#categories)

```jsx
categories={{ x: ["dogs", "cats", "mice"] }}
```

### containerComponent

`type: element`

`VictoryBar` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### cornerRadius

`type: function || number || { top: number || function, bottom: number || function }`

The `cornerRadius` prop specifies a radius to apply to each bar. If this prop is given as a single number, the radius will only be applied to the _top_ of each bar. When this prop is given as a function, it will be evaluated with the arguments `datum`, and `active`.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ x: 15 }}
>
  <VictoryBar
    cornerRadius={10}
    style={{
      data: {
        fill: "#c43a31",
        width: 25
      }
    }}
    data={sampleData}
  />
</VictoryChart>
```

### data

`type: array[object]`

`VictoryBar` uses the standard `data` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#data)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

In addition to svg style properties and `label`, `VictoryBar` will also preferentially use `width` properties supplied via data objects

```playground
<VictoryBar
  data={[
    { x: 1, y: 2, y0: 1 },
    { x: 2, y: 3, y0: 2 },
    { x: 3, y: 5, y0: 2 },
    { x: 4, y: 4, y0: 3 },
    { x: 5, y: 6, y0: 3 }
  ]}
/>
```

### dataComponent

`type: element`

`VictoryBar` uses the standard `dataComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#datacomponent)

`VictoryBar` supplies the following props to its `dataComponent`: `data`, `datum`, `horizontal`, `index`, `padding`, `polar`, `origin`, `scale`, `style`, `width`, `height`, `x`, `y`, `y0`, `x0`

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Bar/>`

```jsx
dataComponent={<Bar events={{ onClick: handleClick }}/>}
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryBar` uses the standard `domain` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryBar` uses the standard `domainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryBar` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryBar` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryBar
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
    data={sampleData}
  />
</div>
```

### externalEventMutations

`type: array[object]`

`VictoryBar` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryBar` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryBar` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### horizontal

`type: boolean`

The horizontal prop determines whether the bars will be laid vertically or horizontally. The bars will be vertical if this prop is false or unspecified, or horizontal if the prop is set to true.

_default:_ horizontal={false}

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ y: 10 }}
>
  <VictoryBar horizontal
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleData}
  />
</VictoryChart>
```

### labelComponent

`type: element`

`VictoryBar` uses the standard `labelComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryBar
  data={sampleData}
  labels={(d) => d.y}
  style={{ labels: { fill: "white" } }}
  labelComponent={<VictoryLabel dy={30}/>}
/>
```

### labels

`type: array || function`

`VictoryBar` uses the standard `labels` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labels)

```playground
<VictoryBar
  data={sampleData}
  labels={(d) => `y: ${d.y}`}
/>
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryBar` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={{ x: 3 }}>
  <VictoryBar data={sampleData}/>
</VictoryChart>
```

### minDomain

`type: number || { x: number, y: number }`

`VictoryBar` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={{ x: 2 }}>
  <VictoryBar data={sampleData}/>
</VictoryChart>
```

### name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

```jsx
name = "series-1";
```

### origin

`type: { x: number, y: number }`

**The `origin` prop is only used by polar charts, and is usually controlled by `VictoryChart`. It will not typically be necessary to set an `origin` prop manually**

[Read about the `origin` prop in detail](https://formidable.com/open-source/victory/docs/common-props#origin)

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryBar` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### polar

`type: boolean`

`VictoryBar` uses the standard `polar` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#polar)

```playground
<VictoryChart polar
  theme={VictoryTheme.material}
>
  <VictoryPolarAxis dependentAxis
    style={{ axis: { stroke: "none" } }}
    tickFormat={() => null}
  />
  <VictoryPolarAxis/>
  <VictoryBar
    data={sampleData}
    style={{
      data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }
    }}
  />
</VictoryChart>
```

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](https://formidable.com/open-source/victory/docs/common-props#range)

### samples

`type: number`

`VictoryBar` uses the standard `samples` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

### scale

`type: scale || { x: scale, y: scale }`

`VictoryBar` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryBar` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### sortKey

`type: string || integer || array[string] || function`

`VictoryBar` uses the standard `sortKey` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
sortKey = "x";
```

### sortOrder

`type: "ascending" || "descending"`

The `sortOrder` prop specifies whether sorted data should be returned in ascending or descending order.

_default:_ `sortOrder="ascending"`

### standalone

`type: boolean`

`VictoryBar` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryBar` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryBar
    standalone={false}
    width={300} height={300} padding={{left: 10, right: 10}}
    data={sampleData}
  />
</svg>
```

### style

`type: { parent: object, data: object, labels: object }`

`VictoryBar` uses the standard `style` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#style)

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
  <VictoryBar
    style={{
      data: {
        fill: (d) => d.x === 3 ? "#000000" : "#c43a31",
        stroke: (d) => d.x === 3 ? "#000000" : "#c43a31",
        fillOpacity: 0.7,
        strokeWidth: 3
      },
      labels: {
        fontSize: 15,
        fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
      }
    }}
    data={sampleData}
    labels={(d) => d.x}
  />
```

### theme

`type: object`

`VictoryBar` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryBar` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryBar` uses the standard `x` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

### y

`type: string || integer || array[string] || function`

`VictoryBar` uses the standard `y` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

### y0

`type: string || integer || array[string] || function`

`VictoryBar` uses the standard `y0` data accessor prop to set a baseline. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y0)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```playground
<VictoryChart domainPadding={30}>
  <VictoryBar
    data={sampleData}
    y0={(d) => d.y - 1}
  />
</VictoryChart>
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[`victorychart`]: https://formidable.com/open-source/victory/docs/victory-chart
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js

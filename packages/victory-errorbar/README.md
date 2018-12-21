# VictoryErrorBar

`victory-errorbar@^30.0.0` exports `VictoryErrorBar` and `ErrorBar` components

View these docs at https://formidable.com/open-source/victory/docs/victory-errorbar to see live examples.

`VictoryErrorBar` renders a dataset as a series of error bars. `VictoryErrorBar` can be composed with other components to add x and y error bars to data.

```playground
<VictoryChart
  domainPadding={15}
  theme={VictoryTheme.material}
>
  <VictoryErrorBar
    data={[
      {x: 15, y: 35000, error: 0.2},
      {x: 20, y: 42000, error: 0.05},
      {x: 25, y: 30000, error: 0.1},
      {x: 30, y: 35000, error: 0.2},
      {x: 35, y: 22000, error: 0.15}
    ]}
    errorX={(datum) => datum.error * datum.x}
    errorY={(datum) => datum.error * datum.y}
  />
</VictoryChart>
```

## Props

### animate

`type: boolean || object`

`VictoryErrorBar` uses the standard `animate` prop. [Read about it https://formidable.com/open-source/victoryhere](/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

### borderWidth

`type: number`

The `borderWidth` prop sets the border width of the error bars. `borderWidth` will set both x and y error bar width.

```jsx
borderWidth={10}
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryErrorBar` uses the standard `categories` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#categories)

```jsx
categories={{ x: ["dogs", "cats", "mice"] }}
```

### containerComponent

`type: element`

`VictoryErrorBar` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### data

`type: array[object]`

Specify data via the `data` prop. By default, `VictoryErrorBar` expects data as an array of objects with `x`, `y`, `errorX` and `errorY` keys. Use the [`x`][], [`y`][], [`errorX`][] and [`errorY`][] data accessor props to specify custom data formats. Refer to the [Data Accessors Guide][] for more detail.

```playground
<VictoryErrorBar
  data={[
    {x: 15, y: 35, errorX: 1, errorY: 3},
    {x: 20, y: 42, errorX: 3, errorY: 2},
    {x: 25, y: 30, errorX: 5, errorY: 5},
    {x: 30, y: 35, errorX: 5, errorY: 3},
    {x: 35, y: 22, errorX: 8, errorY: 2}
  ]}
/>
```

### dataComponent

`type: element`

`VictoryErrorBar` uses the standard `dataComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#datacomponent)

`VictoryErrorBar` supplies the following props to its `dataComponent`: `data`, `datum`, `index`, `padding`, `polar`, `origin`, `scale`, `style`, `borderWidth`, `x`, `y`, `errorX`, `errorY`

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<ErrorBar/>`

```jsx
dataComponent={<ErrorBar events={{ onClick: handleClick }}/>}
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryErrorBar` uses the standard `domain` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryErrorBar` uses the standard `domainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### errorX

`type: string || integer || array[string] || function`

Use `errorX` data accessor prop to define the x error bar.

**string:** specify which property in an array of data objects should be used as the errorX value

_examples:_ `errorX="uncertainty"`

**function:** use a function to translate each element in a data array into a errorX value

_examples:_ `errorX={() => 10}`

**array index:** specify which index of an array should be used as a errorX value when data is given as an array of arrays

_examples:_ `errorX={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a errorX value

_examples:_ `errorX="measurement.uncertainty"`, `errorX={["measurement", "uncertainty"]}`

### errorY

`type: string || integer || array[string] || function`

Use `errorY` data accessor prop to define the y error bar.

**string:** specify which property in an array of data objects should be used as the errorY value

_examples:_ `errorY="uncertainty"`

**function:** use a function to translate each element in a data array into a errorY value

_examples:_ `errorY={() => 10}`

**array index:** specify which index of an array should be used as a errorY value when data is given as an array of arrays

_examples:_ `errorY={1}`

**path string or path array:** specify which property in an array of nested data objects should be used as a errorY value

_examples:_ `errorY="measurement.uncertainty"`, `errorY={["measurement", "uncertainty"]}`

### eventKey

`type: string || integer || array[string] || function`

`VictoryErrorBar` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryErrorBar` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryErrorBar
    style={{
      data: { strokeWidth: 5}
    }}
    events={[{
      target: "data",
      eventHandlers: {
        onClick: () => {
          return [
            {
              target: "data",
              mutation: (props) => {
                const stroke = props.style && props.style.stroke;
                return stroke === "#c43a31" ? null : { style: { stroke: "#c43a31", strokeWidth: 7 } };
              }
            }
          ];
        }
      }
    }]}
    data={[
      {x: 15, y: 35, errorX: 1, errorY: 3},
      {x: 20, y: 42, errorX: 3, errorY: 2},
      {x: 25, y: 30, errorX: 5, errorY: 5},
      {x: 30, y: 35, errorX: 5, errorY: 3},
      {x: 35, y: 22, errorX: 8, errorY: 2}
    ]}
  />
</div>
```

### groupComponent

`type: element`

`VictoryErrorBar` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryErrorBar` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### labelComponent

`type: element`

`VictoryErrorBar` uses the standard `labelComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryErrorBar
  data={sampleErrorData}
  labels={(d) => d.y}
  labelComponent={<VictoryLabel dx={-20} dy={18}/>}
/>
```

### labels

`type: array || function`

`VictoryErrorBar` uses the standard `labels` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labels)

```playground
<VictoryErrorBar
  data={sampleErrorData}
  labels={(d) => d.y}
/>
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryErrorBar` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={8}>
  <VictoryErrorBar data={sampleErrorData}/>
</VictoryChart>
```

### minDomain

`type: number || { x: number, y: number }`

`VictoryErrorBar` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={0}>
  <VictoryErrorBar data={sampleErrorData}/>
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

[Read about the `origin` prop in detailhttps://formidable.com/open-source/victory](/docs/common-props#origin)

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryErrorBar` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### polar

`type: boolean`

`VictoryErrorBar` uses the standard `polar` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#polar)

**Note:** Polar Charts are not yet supported for `VictoryErrorBar`

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detailhttps://formidable.com/open-source/victory](/docs/common-props#range)

### samples

`type: number`

`VictoryErrorBar` uses the standard `samples` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

### scale

`type: scale || { x: scale, y: scale }`

`VictoryErrorBar` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryErrorBar` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### sortKey

`type: string || integer || array[string] || function`

`VictoryErrorBar` uses the standard `sortKey` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

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

`VictoryErrorBar` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryErrorBar` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryErrorBar
    standalone={false}
    width={300} height={300} padding={20}
    data={sampleErrorData}
  />
</svg>
```

### style

`type: { parent: object, data: object, labels: object }`

`VictoryErrorBar` uses the standard `style` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#style)

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
  <VictoryErrorBar
    style={{
      data: {
        stroke: "#c43a31", strokeWidth: 5
      },
      labels: {
        fontSize: 15, fill: "#c43a31"
      }
    }}
    data={sampleData}
    labels={(d) => d.x}
  />
```

### theme

`type: object`

`VictoryErrorBar` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryErrorBar` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryErrorBar` uses the standard `x` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x={(datum) => new Date(datum.day)}
```

### y

`type: string || integer || array[string] || function`

`VictoryErrorBar` uses the standard `y` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[`x`]: https://formidable.com/open-source/victory/docs/victory-candlestick#x
[`y`]: https://formidable.com/open-source/victory/docs/victory-candlestick#y
[`errorx`]: https://formidable.com/open-source/victory/docs/victory-candlestick#errorX
[`errory`]: https://formidable.com/open-source/victory/docs/victory-candlestick#errorY
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js

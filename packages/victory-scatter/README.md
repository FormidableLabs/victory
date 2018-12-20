# VictoryScatter

`victory-scatter@^30.0.0` exports `VictoryScatter`

View these docs at https://formidable.com/open-source/victory/docs/victory-scatter to see live examples.

VictoryScatter renders a dataset as a series of points. VictoryScatter can be composed with [`VictoryChart`][] to create scatter plots.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domain={{ x: [0, 5], y: [0, 7] }}
>
  <VictoryScatter
    style={{ data: { fill: "#c43a31" } }}
    size={7}
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]}
  />
</VictoryChart>
```

## Props

### animate

`type: boolean || object`

`VictoryScatter` uses the standard `animate` prop. [Read about it herhttps://formidable.com/open-source/victorye](/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

### bubbleProperty

`type: string`

The `bubbleProperty` prop indicates which property of the data object should be used to scale data points in a bubble chart. If a `bubbleProperty` is given, `size` and `symbol` props will be ignored. Bubble charts always render circular points.

_default:_ `bubbleProperty="z"`

```playground
<VictoryScatter
  style={{ data: { fill: "#c43a31" } }}
  bubbleProperty="amount"
  maxBubbleSize={25}
  minBubbleSize={5}
  data={[
    { x: 1, y: 2, amount: 30 },
    { x: 2, y: 3, amount: 40 },
    { x: 3, y: 5, amount: 25 },
    { x: 4, y: 4, amount: 10 },
    { x: 5, y: 7, amount: 45 }
  ]}
/>
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryScatter` uses the standard `categories` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#categories)

```jsx
categories={{ x: ["dogs", "cats", "mice"] }}
```

### containerComponent

`type: element`

`VictoryScatter` uses the standard `containerComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### data

`type: array[object]`

`VictoryScatter` uses the standard `data` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#data)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

In addition to svg style properties and `label`, `VictoryScatter` will also preferentially use `symbol` and `size` properties supplied via data objects.

```playground
<VictoryScatter
  data={[
    { x: 1, y: 2, symbol: "star", size: 5 },
    { x: 2, y: 3, symbol: "square", size: 7 },
    { x: 3, y: 5, symbol: "diamond", size: 3 },
    { x: 4, y: 4, symbol: "circle", size: 8 },
    { x: 5, y: 6, symbol: "triangleUp", size: 4 }
  ]}
/>
```

### dataComponent

`type: element`

`VictoryScatter` uses the standard `dataComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#datacomponent)

`VictoryScatter` supplies the following props to its `dataComponent`: `data`, `datum`, `index`, `origin`, `polar`,`scale`, `size`, `style`, `symbol`, `x`, `y`

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Point/>`

```playground_norender
class CatPoint extends React.Component {
  render() {
    const {x, y, datum} = this.props; // VictoryScatter supplies x, y and datum
    const cat = datum._y >= 0 ? "😻" : "😹";
    return (
      <text x={x} y={y} fontSize={30}>
        {cat}
      </text>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryScatter
          dataComponent={<CatPoint/>}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={15}
        />
      </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryScatter` uses the standard `domain` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryScatter` uses the standard `domainPadding` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryScatter` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryScatter` uses the standard `events` prop. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryScatter
    style={{ data: { fill: "#c43a31" } }}
    size={9}
    labels={() => null}
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
            }, {
              target: "labels",
              mutation: (props) => {
                return props.text === "clicked" ?
                  null : { text: "clicked" };
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

`VictoryScatter` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryScatter` uses the standard `groupComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```playground
<VictoryChart>
  <VictoryScatter
    groupComponent={<VictoryClipContainer/>}
    data={sampleData}
    size={20}
  />
</VictoryChart>
```

### height

`type: number`

`VictoryScatter` uses the standard `height` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### labelComponent

`type: element`

`VictoryScatter` uses the standard `labelComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryScatter
  data={sampleData}
  size={20}
  style={{ labels: { fill: "white", fontSize: 18} }}
  labels={(datum) => datum.y}
  labelComponent={<VictoryLabel dy={18}/>}
/>
```

### labels

`type: array || function`

`VictoryScatter` uses the standard `labels` prop to define labels for each point. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#labels)

```playground
<VictoryScatter
  data={sampleData}
  labels={(datum) => `y: ${datum.y}`}
/>
```

### maxBubbleSize

`type: number`

The `maxBubbleSize` prop sets an upper limit for scaling data points in a bubble chart. If not given, this prop will be calculated based on the `width`, `height`, and `padding` of the component.

For more information on bubble charts, see [`bubbleProperty`][]

```jsx
maxBubbleSize={25}
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryScatter` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={8}>
  <VictoryScatter data={sampleData}/>
</VictoryChart>
```

### minBubbleSize

`type: number`

The `minBubbleSize` prop sets a lower limit for scaling data points in a bubble chart. If not given, this prop will be calculated based on the calculated `maxBubbleSize`.

For more information on bubble charts, see [`bubbleProperty`][]

```jsx
minBubbleSize={5}
```

### minDomain

`type: number || { x: number, y: number }`

`VictoryScatter` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={0}>
  <VictoryScatter data={sampleData}/>
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

`VictoryScatter` uses the standard `padding` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### polar

`type: boolean`

`VictoryScatter` uses the standard `polar` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#polar)

```playground
<VictoryChart polar
  domain={{ y: [0, 7] }}
  theme={VictoryTheme.material}
>
  <VictoryPolarAxis dependentAxis
    style={{ axis: { stroke: "none" } }}
    tickFormat={() => null}
  />
  <VictoryPolarAxis/>
  <VictoryScatter
    data={sampleData}
    style={{
      data: { fill: "#c43a31" }
    }}
    size={5}
  />
</VictoryChart>
```

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](https://formidable.com/open-source/victory/docs/common-props#range)

### samples

`type: integer`

`VictoryScatter` uses the standard `samples` prop to generate data when plotting functions. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

### scale

`type: scale || { x: scale, y: scale }`

`VictoryScatter` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryScatter` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### size

`type: number || function`

The `size` prop determines how to scale each data point. This prop may also be given as a function of data. If `size` is not specified, it will default to 1. `size` may also be set directly on each data object.

```playground
<VictoryScatter
  size={(datum) => datum.y + 2 }
  data={sampleData}
/>
```

### sortKey

`type: string || integer || array[string] || function`

`VictoryScatter` uses the standard `sortKey` prop to determine how data should be ordered. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

```jsx
sortKey = "x";
```

### sortOrder

`type: "ascending" || "descending"`

The `sortOrder` prop specifies whether sorted data should be returned in ascending or descending order.

_default:_ `sortOrder="ascending"`

### standalone

`type: boolean`

`VictoryScatter` uses the standard `standalone` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryScatter` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryScatter
    standalone={false}
    width={300} height={300} padding={10}
    data={sampleData}
    size={7}
  />
</svg>
```

### style

`type: { parent: object, data: object, labels: object }`

`VictoryScatter` uses the standard `style` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#style)

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryScatter
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
  size={9}
  data={sampleData}
  labels={(datum) => datum.x}
/>
```

### symbol

`type: function || options`

The `symbol` prop determines which symbol should be drawn to represent data points. Options are: "circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp". This prop may also be given as a function of data. If no `symbol` prop is specified, a circle will be rendered. `symbol` may also be set directly on each data object.

_default:_ `symbol="circle"`

```playground
<VictoryScatter
  symbol={(datum) => datum.y > 3 ? "triangleUp" : "triangleDown"}
  size={7}
  data={sampleData}
/>
```

### theme

`type: object`

`VictoryScatter` uses the standard `theme` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryScatter` uses the standard `width` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryScatter` uses the standard `x` data accessor prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

### y

`type: string || integer || array[string] || function`

`VictoryScatter` uses the standard `y` data accessor prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

### y0

`type: string || integer || array[string] || function`

**It is not common to set a `y0` prop with `VictoryScatter`, as baselines for `VictoryScatter` are only relevant for stacked charts.** [Read more about the `y0` prop here](https://formidable.com/open-source/victory/docs/common-props#y0)

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[`bubbleproperty`]: https://formidable.com/open-source/victory/docs/victory-scatter#bubbleproperty
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[`victorychart`]: https://formidable.com/open-source/victory/docs/victory-chart
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js

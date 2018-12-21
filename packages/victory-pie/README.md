# VictoryPie

`victory-pie@^30.0.0` exports `VictoryPie` and `Slice` components

View these docs at https://formidable.com/open-source/victory/docs/victory-pie to see live examples.

`VictoryPie` renders a dataset as a pie chart.

```playground
<VictoryPie
  data={[
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 }
  ]}
/>
```

## Props

### animate

`type: boolean || object`

`VictoryPie` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000
}}
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryPie` uses the standard `categories` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#categories)

```jsx
categories={{ x: ["dogs", "cats", "mice"] }}
```

### colorScale

`type: array[string]`

The `colorScale` prop defines a color scale to be applied to each slice of `VictoryPie`. This prop should be given as an array of CSS colors, or as a string corresponding to one of the built in color scales: "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue". `VictoryPie` will assign a color to each slice by index, unless they are explicitly specified in the data object. Colors will repeat when there are more slices than colors in the provided `colorScale`.

_default (provided by default theme):_ `colorScale="grayscale"`

```playground
<VictoryPie
  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
  data={sampleData}
/>
```

### containerComponent

`type: element`

`VictoryPie` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

**Note:** `VictoryPie` only works with the `VictoryContainer` component

_default:_ `containerComponent={<VictoryContainer/>}`

```jsx
containerComponent={<VictoryContainer responsive={false}/>}
```

### cornerRadius

`type: number`

The `cornerRadius` prop specifies the corner radius of the slices rendered in the pie chart.

```playground
<VictoryPie
  cornerRadius={25}
  data={sampleData}
/>
```

### data

`type: array[object]`

`VictoryPie` uses the standard `data` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#data)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```playground
<VictoryPie
  data={[
    { x: 1, y: 2, label: "one" },
    { x: 2, y: 3, label: "two" },
    { x: 3, y: 5, label: "three" }
  ]}
/>
```

### dataComponent

`type: element`

`VictoryPie` uses the standard `dataComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#datacomponent)

`VictoryPie` supplies the following props to its `dataComponent`: `data`, `datum`, `events`, `index`, `pathFunction`, `slice`, `style`

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Slice/>`

```jsx
dataComponent={<Slice events={{ onClick: handleClick }}/>}
```

### endAngle

`type: number`

The `endAngle` props defines the overall end angle of the pie in degrees. This prop is used in conjunction with `startAngle` to create a pie that spans only a segment of a circle, or to change overall rotation of the pie. This prop should be given as a number of degrees. Degrees are defined as starting at the 12 o'clock position, and proceeding clockwise.

_default:_ `endAngle={360}`

```playground
<div>
<VictoryPie
  startAngle={90}
  endAngle={450}
  data={sampleData}
/>
<VictoryPie
  startAngle={90}
  endAngle={-90}
  data={sampleData}
/>
</div>
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryPie` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryPie` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryPie
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
            }, {
              target: "labels",
              mutation: (props) => {
                return props.text === "clicked" ? null : { text: "clicked" };
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

`VictoryPie` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryPie` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="rotate(90)" />}
```

### height

`type: number`

`VictoryPie` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={400}`

```jsx
height={400}
```

### innerRadius

`type: number`

The `innerRadius` prop determines the number of pixels between the center of the chart and the inner edge of a donut chart. When this prop is set to zero a regular pie chart is rendered.

```playground
<VictoryPie
  innerRadius={100}
  data={sampleData}
/>
```

### labelComponent

`type: element`

`VictoryPie` uses the standard `labelComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryPie
  data={sampleData}
  labels={(d) => d.y}
  labelComponent={<VictoryLabel angle={45}/>}
/>
```

### labelPosition

`type: "centroid" || "startAngle" || "endAngle"`

The `labelPosition` prop defines the position inside the arc that will be used for positioning each slice label. If this props is not set, the label position will default to the centroid of the arc itself.

_default:_ `"centroid"`

```playground
<VictoryPie
  data={sampleData}
  labelPosition="endAngle"
  style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
/>
```

### labelRadius

`type: number`

The `labelRadius` prop defines the radius of the arc that will be used for positioning each slice label. If this prop is not set, the label radius will default to the radius of the pie + label padding.

```playground
<VictoryPie
  data={sampleData}
  labelRadius={90}
  style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
/>
```

### labels

`type: array || function`

`VictoryPie` uses the standard `labels` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labels)

```playground
<VictoryPie
  data={sampleData}
  labels={(d) => `y: ${d.y}`}
/>
```

### name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

```jsx
name = "series-1";
```

### origin

`type: { x: number, y: number }`

The `origin` prop specifies coordinates for the center of the pie. When this prop is not given, the origin will be calculated based on the `width`, `height`, and `padding` props.

```playground
<VictoryPie
  origin={{ y: 250 }}
  padding={100}
  data={sampleData}
/>
```

### padAngle

`type: number`

The `padAngle` prop defines the amount of separation between adjacent data slices in number of degrees.

```playground
<VictoryPie
  padAngle={3}
  innerRadius={100}
  data={sampleData}
/>
```

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryPie` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### radius

`type: number`

The `radius` prop specifies the radius of the pie. When this prop is not given, it will be calculated base on the `width`, `height`, and `padding` props.

```playground
<VictoryPie
  radius={100}
  data={sampleData}
/>
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### sortKey

`type: string || integer || array[string] || function`

`VictoryPie` uses the standard `sortKey` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

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

`VictoryPie` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={50} fill="#c43a31"/>
  <VictoryPie
    standalone={false}
    width={300} height={300}
    innerRadius={75}
    data={sampleData}
  />
</svg>
```

### startAngle

`type: number`

The `startAngle` props defines the overall start angle of the pie in degrees. This prop is used in conjunction with `endAngle` to create a pie that spans only a segment of a circle, or to change overall rotation of the pie. This prop should be given as a number of degrees. Degrees are defined as starting at the 12 o'clock position, and proceeding clockwise.

_default:_ `endAngle={0}`

```playground
<div>
<VictoryPie
  startAngle={90}
  endAngle={450}
  data={sampleData}
/>
<VictoryPie
  startAngle={90}
  endAngle={-90}
  data={sampleData}
/>
</div>
```

### style

`type: { parent: object, data: object, labels: object }`

`VictoryPie` uses the standard `style` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#style)

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
  <VictoryPie
    style={{
      data: {
        fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3
      },
      labels: {
        fontSize: 25, fill: "#c43a31"
      }
    }}
    data={sampleData}
  />
```

### theme

`type: object`

`VictoryPie` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryPie` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={400}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryPie` uses the standard `x` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

### y

`type: string || integer || array[string] || function`

`VictoryPie` uses the standard `y` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js

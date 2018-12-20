# VictoryGroup

`victory-group@^30.0.0` exports `VictoryGroup`

View these docs at https://formidable.com/open-source/victory/docs/victory-group to see live examples.

`VictoryGroup` is a wrapper component that renders a given set of children with some shared props. `VictoryGroup` reconciles the domain and layout for all its children, and coordinates animations and shared events. `VictoryGroup` may also be used to supply common data and styles to all its children. This is especially useful when adding markers to a line, or adding voronoi tooltips to data. `VictoryGroup` may also be used to apply an offset to a group of children, as with grouped bar charts, or may be used to stack several components on the same level, _e.g.,_ stacked area charts with data markers.

`VictoryGroup` should not have `VictoryAxis` components as children

`VictoryGroup` works with:
[VictoryArea][], [VictoryBar][], [VictoryCandlestick][], [VictoryErrorBar][], [VictoryLine][], [VictoryScatter][], [VictoryStack][], and [VictoryVoronoi][].

```playground
<VictoryChart>
  <VictoryGroup offset={20}
    colorScale={"qualitative"}
  >
    <VictoryBar
      data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
    />
    <VictoryBar
      data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
    />
    <VictoryBar
      data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
    />
  </VictoryGroup>
</VictoryChart>
```

## Props

### animate

`type: boolean || object`

`VictoryGroup` uses the standard `animate` prop. [Read about it herhttps://formidable.com/open-source/victorye](/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

**note: `VictoryGroup` controls the `animate` prop of its children when set**

```jsx
  animate={{
    duration: 2000,
    onLoad: { duration: 1000 }
  }}
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryGroup` uses the standard `categories` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#categories)

**note: When this prop is set, `VictoryGroup` controls the `categories` prop of its children.**

```jsx
categories={["dogs", "cats", "mice"]}
```

### children

`type: element || array[element]`

`VictoryGroup` works with any combination of the following children: [VictoryArea][], [VictoryBar][], [VictoryCandlestick][], [VictoryErrorBar][], [VictoryLine][], [VictoryScatter][], [VictoryStack][], and [VictoryVoronoi][]. Children supplied to `VictoryGroup` will be cloned and rendered with new props so that all children share common props such as `domain` and `scale`.

### color

`type: string`

The `color` prop is an optional prop that defines a single color to be applied to the children of `VictoryGroup`. The `color` prop will override colors specified via `colorScale`.

```playground
<VictoryGroup
  data={sampleData}
  color="blue"
>
  <VictoryLine/>
  <VictoryScatter size={6} symbol="star"/>
</VictoryGroup>
```

### colorScale

`type: array[string]`

The `colorScale` prop is an optional prop that defines a color scale to be applied to the children of `VictoryGroup`. This prop should be given as an array of CSS colors, or as a string corresponding to one of the built in color scales: "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue". `VictoryGroup` will assign colors to its children by index, unless they are explicitly specified in styles. Colors will repeat when there are more children than colors in the provided `colorScale`.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryGroup
  offset={25}
  colorScale={["tomato", "orange", "gold"]}
>
  <VictoryBar
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
</VictoryGroup>
```

### containerComponent

`type: element`

`VictoryGroup` uses the standard `containerComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### data

`type: array[object]`

`VictoryGroup` uses the standard `data` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#data)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

When `data` is provided for `VictoryGroup` it will be passed to every child in the group. Use this as a convenience in cases where all components should have identical data, for example, adding data points to a line, or adding voronoi tooltips to data. Omit this prop when child components should not share data. By default, Victory components expect data as an array of objects with `x` and `y` props. Use the [x][] and [y][] data accessor props to define a custom data format. The `data` prop must be given as an array.

```playground
<VictoryChart>
  <VictoryGroup data={sampleData}>
    <VictoryLine/>
    <VictoryScatter/>
  </VictoryGroup>
</VictoryChart>

```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryGroup` uses the standard `domain` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domain)

**note: `VictoryGroup` controls the `domain` prop of its children.**

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryGroup` uses the standard `domainPadding` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

**note: `VictoryGroup` controls the `domainPadding` prop of its children.**

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryGroup` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryGroup` uses the standard `events` prop. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

**Note: `VictoryGroup` coordinates events between children using the `VictorySharedEvents` and the `sharedEvents` prop**

```playground
<VictoryGroup
  offset={20}
  events={[{
    childName: "all",
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            childName: "bar-2",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "gold" }) })
          }, {
            childName: "bar-3",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "orange" }) })
          }, {
            childName: "bar-4",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "red" }) })
          }
        ];
      }
    }
  }]}
>
  <VictoryBar name="bar-1"
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar name="bar-2"
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar name="bar-3"
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
  <VictoryBar name="bar-4"
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 3}]}
  />
</VictoryGroup>
```

### externalEventMutations

`type: array[object]`

`VictoryGroup` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryGroup` uses the standard `groupComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryGroup` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### horizontal

`type: boolean`

The `horizontal` prop determines whether the bars of any `VictoryBar` children supplied to `VictoryGroup` will be laid out vertically or horizontally. The bars will be vertical if this prop is false or unspecified, or horizontal if the prop is set to true.

### labels

`type: array || function`

The `labels` prop defines labels that will appear above each group of data. This prop should be given as an array of values or as a function of data. If given as an array, the number of elements in the array should be equal to the length of the data array. Group labels will appear above the center series of the group, and will override the `labels` prop of child components. Omit this prop, and set `labels` props on children for individual labels.

```jsx
labels={["spring", "summer", "fall", "winter"]}`, `labels={(datum) => datum.title}
```

### labelComponent

`type: element`

The `labelComponent` prop takes a component instance which will be used to render labels for each group. The new element created from the passed `labelComponent` will be supplied with the following props: `x`, `y`, `index`, `datum`, `verticalAnchor`, `textAnchor`, `angle`, `style`, `text`, and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `labelComponent` is omitted, a new [VictoryLabel][] will be created with the props described above.

_default:_ `<VictoryLabel/>`

```jsx
labelComponent={<VictoryLabel dy={20}/>}
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryGroup` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

### minDomain

`type: number || { x: number, y: number }`

`VictoryGroup` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

### name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

```jsx
name = "series-1";
```

### offset

`type: number`

The `offset` prop determines the number of pixels each element in a group should be offset from its original position of the on the independent axis. In the case of groups of bars, this number should be equal to the width of the bar plus the desired spacing between bars.

```playground
<VictoryGroup
  offset={25}
>
  <VictoryBar
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
</VictoryGroup>
```

### origin

`type: { x: number, y: number }`

**The `origin` prop is only used by polar charts, and is usually controlled by `VictoryChart`. It will not typically be necessary to set an `origin` prop manually**

[Read about the `origin` prop in detail](https://formidable.com/open-source/victory/docs/common-props#origin)

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryGroup` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### polar

`type: boolean`

`VictoryGroup` uses the standard `polar` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#polar)

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](https://formidable.com/open-source/victory/docs/common-props#range)

### samples

`type: integer`

`VictoryGroup` uses the standard `samples` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

### scale

`type: scale || { x: scale, y: scale }`

`VictoryGroup` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

**note: `VictoryGroup` controls the `scale` prop of its children.**

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryGroup` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### sortKey

`type: string || integer || array[string] || function`

`VictoryGroup` uses the standard `sortKey` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

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

`VictoryGroup` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryGroup` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

### style

`type: { parent: object, data: object, labels: object }`

`VictoryGroup` uses the standard `style` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#style)

Styles on children of `VictoryGroup` will override styles set on the `VictoryGroup` component.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryGroup
  offset={25}
  style={{
    data: {
      fillOpacity: 0.7, stroke: "black", strokeWidth: 3
    }
  }}
>
  <VictoryBar
    style={{ data: { stroke: "#c43a31" }}}
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
</VictoryGroup>
```

### theme

`type: object`

`VictoryGroup` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryGroup` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryGroup` uses the standard `x` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

### y

`type: string || integer || array[string] || function`

`VictoryGroup` uses the standard `y` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

### y0

`type: string || integer || array[string] || function`

`VictoryGroup` uses the standard `y0` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y0)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y0={() => 10}
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js
[victoryarea]: https://formidable.com/open-source/victory/docs/victory-area
[victorybar]: https://formidable.com/open-source/victory/docs/victory-bar
[victorycandlestick]: https://formidable.com/open-source/victory/docs/victory-candlestick
[victoryerrorbar]: https://formidable.com/open-source/victory/docs/victory-errorbar
[victoryline]: https://formidable.com/open-source/victory/docs/victory-line
[victoryscatter]: https://formidable.com/open-source/victory/docs/victory-scatter
[victorystack]: https://formidable.com/open-source/victory/docs/victory-stack
[victoryvoronoi]: https://formidable.com/open-source/victory/docs/victory-voronoi
[victorylabel]: https://formidable.com/open-source/victory/docs/victory-label
[x]: https://formidable.com/open-source/victory/docs/common-props#x
[y]: https://formidable.com/open-source/victory/docs/common-props#y

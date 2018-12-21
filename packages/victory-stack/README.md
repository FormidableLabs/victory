# VictoryStack

`victory-stack@^30.0.0` exports `VictoryStack`

View these docs at https://formidable.com/open-source/victory/docs/victory-stack to see live examples.

`VictoryStack` is a wrapper component that renders a given set of children in a stacked layout. Like other wrapper components, `VictoryStack` also reconciles the domain and layout for all its children, and coordinates animations and shared events.

`VictoryStack` should not be used with `VictoryAxis` children

`VictoryStack` works with:
[VictoryArea][], [VictoryBar][], [VictoryCandlestick][], [VictoryErrorBar][], [VictoryGroup][],[VictoryLine][], and [VictoryScatter][]

```playground
<VictoryStack>
  <VictoryArea
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryArea
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryArea
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
</VictoryStack>
```

## Props

### animate

`type: boolean || object`

`VictoryStack` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

**note: `VictoryStack` controls the `animate` prop of its children when set**

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

### categories

`type: array[string] || { x: array[string], y: array[string] }`

`VictoryStack` uses the standard `categories` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#categories)

**note: When this prop is set, `VictoryGroup` controls the `categories` prop of its children.**

```jsx
categories={["dogs", "cats", "mice"]}
```

### children

`type: element || array[element]`

`VictoryStack` works with any combination of the following children: [VictoryArea][], [VictoryBar][], [VictoryCandlestick][], [VictoryErrorBar][], [VictoryGroup][], [VictoryLine][], [VictoryScatter][], [VictoryStack][], and [VictoryVoronoi][]. Children supplied to `VictoryGroup` will be cloned and rendered with new props so that all children share common props such as `domain` and `scale`.

### colorScale

`type: array[string]`

The `colorScale` prop is an optional prop that defines a color scale to be applied to the children of `VictoryStack`. This prop should be given as an array of CSS colors, or as a string corresponding to one of the built in color scales: "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue". `VictoryGroup` will assign colors to its children by index, unless they are explicitly specified in styles. Colors will repeat when there are more children than colors in the provided `colorScale`.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryStack
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
</VictoryStack>
```

### containerComponent

`type: element`

`VictoryStack` uses the standard `containerComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

```jsx
containerComponent={<VictoryVoronoiContainer/>}
```

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryStack` uses the standard `domain` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domain)

**note: `VictoryStack` controls the `domain` prop of its children.**

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryStack` uses the standard `domainPadding` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

**note: `VictoryStack` controls the `domainPadding` prop of its children.**

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryStack` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryStack` uses the standard `events` prop. [Read about it in more detail here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

**Note: `VictoryStack` coordinates events between children using the `VictorySharedEvents` and the `sharedEvents` prop**

```playground
<VictoryStack
  events={[{
    childName: "all",
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            childName: "area-2",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "gold" }) })
          }, {
            childName: "area-3",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "orange" }) })
          }, {
            childName: "area-4",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "red" }) })
          }
        ];
      }
    }
  }]}
>
  <VictoryArea name="area-1" data={sampleData}/>
  <VictoryArea name="area-2" data={sampleData}/>
  <VictoryArea name="area-3" data={sampleData}/>
  <VictoryArea name="area-4" data={sampleData}/>
</VictoryStack>
```

### externalEventMutations

`type: array[object]`

`VictoryStack` uses the standard `externalEventMutations` prop. [Read about it in detailhttps://formidable.com/open-source/victory](/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryStack` uses the standard `groupComponent` prop. [Read about it in detail here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryStack` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### horizontal

`type: boolean`

The `horizontal` prop determines whether the bars of any `VictoryBar` children supplied to `VictoryStack` will be laid out vertically or horizontally. The bars will be vertical if this prop is false or unspecified, or horizontal if the prop is set to true.

### labelComponent

`type: element`

The `labelComponent` prop takes a component instance which will be used to render labels for each stack. The new element created from the passed `labelComponent` will be supplied with the following props: `x`, `y`, `index`, `datum`, `verticalAnchor`, `textAnchor`, `angle`, `style`, `text`, and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `labelComponent` is omitted, a new [VictoryLabel][] will be created with the props described above.

_default:_ `<VictoryLabel/>`

```jsx
labelComponent={<VictoryLabel dy={20}/>}
```

### labels

`type: array || function`

The `labels` prop defines labels that will appear above each stack of data. This prop should be given as an array of values or as a function of data. If given as an array, the number of elements in the array should be equal to the length of the data array. Group labels will appear above the center series of the group, and will override the `labels` prop of child components. Omit this prop, and set `labels` props on children for individual labels.

```jsx
labels={["spring", "summer", "fall", "winter"]}`, `labels={(datum) => datum.title}
```

### maxDomain

`type: number || { x: number, y: number }`

`VictoryStack` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

### minDomain

`type: number || { x: number, y: number }`

`VictoryStack` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

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

`VictoryStack` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### polar

`type: boolean`

`VictoryStack` uses the standard `polar` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#polar)

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detailhttps://formidable.com/open-source/victory](/docs/common-props#range)

### scale

`type: scale || { x: scale, y: scale }`

`VictoryStack` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

**note: `VictoryStack` controls the `scale` prop of its children.**

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryStack` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### standalone

`type: boolean`

`VictoryStack` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryGroup` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

### style

`type: { parent: object, data: object, labels: object }`

`VictoryStack` uses the standard `style` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#style)

Styles on children of `VictoryGroup` will override styles set on the `VictoryGroup` component.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryStack
  style={{
    data: { stroke: "black", strokeWidth: 3 }
  }}
>
  <VictoryBar
    style={{ data: { fill: "#c43a31" } }}
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
</VictoryStack>
```

### theme

`type: object`

`VictoryStack` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### width

`type: number`

`VictoryStack` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### xOffset

`type: number`

The `xOffset` prop is used for grouping stacks of bars. This prop will be set by the `VictoryGroup` component wrapper, or can be set manually.

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js
[victoryarea]: https://formidable.com/open-source/victory/docs/victory-area
[victorybar]: https://formidable.com/open-source/victory/docs/victory-bar
[victorycandlestick]: https://formidable.com/open-source/victory/docs/victory-candlestick
[victoryerrorbar]: https://formidable.com/open-source/victory/docs/victory-errorbar
[victorygroup]: https://formidable.com/open-source/victory/docs/victory-group
[victoryline]: https://formidable.com/open-source/victory/docs/victory-line
[victoryscatter]: https://formidable.com/open-source/victory/docs/victory-scatter
[victorystack]: https://formidable.com/open-source/victory/docs/victory-stack
[victoryvoronoi]: https://formidable.com/open-source/victory/docs/victory-voronoi
[victorylabel]: https://formidable.com/open-source/victory/docs/victory-label

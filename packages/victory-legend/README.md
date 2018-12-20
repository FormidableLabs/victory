# VictoryLegend

`victory-legend@^30.0.0` exports `VictoryLegend`

View these docs at https://formidable.com/open-source/victory/docs/victory-legend to see live examples.

`VictoryLegend` renders a chart legend component.

```playground
<VictoryChart domain={[0, 10]}>
  <VictoryLegend x={125} y={50}
  	title="Legend"
    centerTitle
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
    data={[
      { name: "One", symbol: { fill: "tomato", type: "star" } },
      { name: "Two", symbol: { fill: "orange" } },
      { name: "Three", symbol: { fill: "gold" } }
    ]}
  />
  <VictoryBar
      data={[
      { x: 2, y: 6, fill: "tomato" },
      { x: 4, y: 4, fill: "orange" },
      { x: 6, y: 2, fill: "gold" },
      { x: 8, y: 4, fill: "tomato" },
    ]}
  />
</VictoryChart>
```

## Props

### borderComponent

`type: element`

The `borderComponent` prop takes a component instance which will be responsible for rendering a border around the legend. The new element created from the passed `borderComponent` will be provided with the following properties calculated by `VictoryLegend`: `x`, `y`, `width`, `height`, and `style`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `borderComponent` is not provided, `VictoryLegend` will use its default [Border component][]. Please note that the default width and height calculated for the border component is based on _approximated_ text measurements, and may need to be adjusted.

_default:_ `<Border/>`

```jsx
borderComponent={<Border width={300}/>}
```

### borderPadding

`type: number || { top: number, bottom: number, left: number, right: number }`

The `borderPadding` specifies the amount of padding that should be added between the legend items and the border. This prop may be given as a number, or as an object with values specified for `top`, `bottom`, `left`, and `right`. Please note that the default width and height calculated for the border component is based on _approximated_ text measurements, so padding may need to be adjusted.

```jsx
borderPadding={{ top: 20, bottom: 10 }}
```

### centerTitle

`type: boolean`

The `centerTitle` boolean prop specifies whether a legend title should be centered.

```playground
<VictoryLegend x={125} y={10}
  title="Legend"
  centerTitle
  orientation="horizontal"
  gutter={20}
  style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### colorScale

`type: array[string]`

The `colorScale` prop defines a color scale to be applied to each data symbol in `VictoryLegend`. This prop should be given as an array of CSS colors, or as a string corresponding to one of the built in color scales: "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue". `VictoryLegend` will assign a color to each symbol by index, unless they are explicitly specified in the data object. Colors will repeat when there are more symbols than colors in the provided `colorScale`.

```playground
<VictoryLegend x={125} y={10}
  orientation="horizontal"
  gutter={20}
  style={{ border: { stroke: "black" } }}
  colorScale={[ "navy", "blue", "cyan" ]}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### containerComponent

`type: element`

`VictoryLegend` uses the standard `containerComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#containercomponent)

**Note:** `VictoryLegend` only works with the `VictoryContainer` component

_default:_ `containerComponent={<VictoryContainer/>}`

```jsx
containerComponent={<VictoryContainer responsive={false}/>}
```

### data

`type: array[{ name, symbol, labels }]`

Specify data via the `data` prop. `VictoryLegend` expects data as an array of objects with `name` (required), `symbol`, and `labels` properties. The `data` prop must be given as an array.

_default:_ `data={[{ name: "Series 1" }, { name: "Series 2" }]}`

```playground
<VictoryLegend x={125} y={50}
  orientation="horizontal"
  gutter={20}
  style={{ border: { stroke: "black" } }}
  data={[
    { name: "One", symbol: { fill: "tomato", type: "star" } },
    { name: "Two", symbol: { fill: "orange" }, labels: { fill: "orange" } },
    { name: "Three", symbol: { fill: "gold" } }
  ]}
/>
```

### dataComponent

`type: element`

`VictoryLegend` uses the standard `dataComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#datacomponent)

`VictoryLegend` supplies the following props to its `dataComponent`: `data`, `datum`, `events`, `index`, `x`, `y`, `size`, `style`, and `symbol`. `VictoryLegend` renders a [Point component][] by default.

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_default:_ `<Point/>`

```jsx
dataComponent={<Point events={{ onClick: handleClick }}/>}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryLegend` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type: array[object]`

`VictoryLegend` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

```playground
<div>
  <h3>Click Me</h3>
  <VictoryLegend
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
    data={[
      { name: "One" }, { name: "Two" }, { name: "Three" }
    ]}
  />
</div>
```

### externalEventMutations

`type: array[object]`

`VictoryLegend` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryLegend` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="rotate(90)" />}
```

### gutter

`type: number || { left: number, right: number }`

The `gutter` prop defines the number of pixels between legend columns. This prop may be given as a number, or as an object with values specified for "left" and "right" gutters. To set spacing between rows, use the `rowGutter` prop.

_default:_ `gutter={10}`

```playground
<VictoryLegend x={125} y={50}
  orientation="horizontal"
  gutter={50}
  style={{ border: { stroke: "black" } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### height

`type: number`

`VictoryLegend` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={400}`

```jsx
height={400}
```

### itemsPerRow

`type: number`

The `itemsPerRow` prop determines how many items to render in each row of a horizontal legend, or in each column of a vertical legend. This prop should be given as an integer. When this prop is not given, legend items will be rendered in a single row or column.

```playground
<VictoryLegend x={125} y={50}
  orientation="horizontal"
  itemsPerRow={3}
  gutter={20}
  style={{ border: { stroke: "black" } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }, { name: "Four" }
  ]}
/>
```

### labelComponent

`type: element`

`VictoryLegend` uses the standard `labelComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#labelcomponent)

_default:_ `<VictoryLabel/>`

```playground
<VictoryLegend
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
  labelComponent={<VictoryLabel angle={45}/>}
/>
```

### orientation

`type: "vertical" || "horizontal"`

The `orientation` prop takes a string that defines whether legend data are displayed in a row or column. When `orientation` is `"horizontal"`, legend items will be displayed in rows. When `orientation` is `"vertical"`, legend items will be displayed in columns.

_default:_ `orientation="vertical"`

### padding

`type: number || { top: number, bottom: number, left: number, right: number }`

`VictoryLegend` uses the standard `padding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#padding)

_default (provided by default theme):_ `padding={50}`

```jsx
padding={{ top: 20, bottom: 60 }}
```

### rowGutter

`type: number || { top: number, bottom: number }`

The `rowGutter` prop defines the number of pixels between legend rows. This prop may be given as a number, or as an object with values specified for "top" and "bottom" gutters. To set spacing between columns, use the `gutter` prop.

```playground
<VictoryLegend x={125} y={50}
  orientation="vertical"
  orientation="vertical"
  gutter={20}
  rowGutter={{ top: 0, bottom: 10 }}
  style={{ border: { stroke: "black" } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### standalone

`type: boolean`

The `standalone` props specifies whether the component should be rendered in an independent `<svg>` element or in a `<g>` tag. This prop defaults to true, and renders an `svg`.

_default:_ `standalone={true}`

### style

`type: { border: object, data: object, labels: object, parent: object, title: object }`

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `parent`, `data`, `labels`, `title`, and `border`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart. Functional styles may be defined for `data`, and `labels` style properties, and they will be evaluated with each datum.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties may be included in `labels` and `title` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryLegend x={125} y={50}
  title="Legend"
  centerTitle
  orientation="horizontal"
  gutter={20}
  style={{
    data: { fill: "blue", stroke: "navy", strokeWidth: 2 },
    labels: { fill: "navy" },
    border: { stroke: "black" },
    title: {fontSize: 20 }
  }}
  data={[
    { name: "One", symbol: { fill: "tomato" } },
    { name: "Two", labels: { fill: "orange" } },
    { name: "Three" }
  ]}
/>
```

### symbolSpacer

`type: number`

The `symbolSpacer` prop defines the number of pixels between data components and label components. When a `symbolSpacer` is not defined, spacing is calculated based on symbol size and label font size.

```playground
<VictoryLegend x={125} y={50}
  orientation="horizontal"
  symbolSpacer={5}
  gutter={20}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### theme

`type: object`

The `theme` prop specifies a theme to use for determining styles and layout properties for a component. Any styles or props defined in `theme` may be overridden by props specified on the component instance. By default, components use a [grayscale theme][]. [Read more about themes here][].

_default:_ `theme={VictoryTheme.grayscale}`

### title

`type: string || array[string]`

The `title` prop specifies a title to render with the legend. This prop should be given as a string, or an array of strings for multi-line titles.

```playground
<VictoryLegend x={125} y={50}
  title="Legend Title"
  gutter={20}
  orientation="horizontal"
  style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### titleComponent

`type: element`

The `titleComponent` prop takes a component instance which will be used to render a title for the component. The new element created from the passed `labelComponent` will be supplied with the following properties: `x`, `y`, `index`, `data`, `datum`, `verticalAnchor`, `textAnchor`, `style`, `text`, and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `labelComponent` is omitted, a new [VictoryLabel][] will be created with the props described above.

_default:_ `<VictoryLabel/>`

```playground
<VictoryLegend x={125} y={50}
  title={["Legend Title", "subtitle"]}
  gutter={20}
  orientation="horizontal"
  style={{ border: { stroke: "black" } }}
  titleComponent={<VictoryLabel style={[{ fontSize: 20 }, { fontSize: 12 }]}/>}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### titleOrientation

`type: "top" || "bottom" || "left" || "right"`

The `titleOrientation` prop specifies where the a title should be rendered in relation to the rest of the legend. Possible values for this prop are "top", "bottom", "left", and "right".

_default (provided by default theme):_ `titleOrientation="top"`

```playground
<VictoryLegend x={50} y={50}
  title="Legend Title"
  titleOrientation="left"
  gutter={20}
  orientation="horizontal"
  style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
  data={[
    { name: "One" }, { name: "Two" }, { name: "Three" }
  ]}
/>
```

### width

`type: number`

`VictoryLegend` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={400}`

```jsx
width={400}
```

### x

`type: number`

The `x` prop defines the x coordinate corresponding to the upper left corner of the legend.

### y

`type: number`

The `y` prop defines the y coordinate corresponding to the upper left corner of the legend.

[victorylabel]: https://formidable.com/open-source/victory/docs/victory-label
[point component]: https://formidable.com/open-source/victory/docs/victory-primitives#point
[border component]: https://formidable.com/open-source/victory/docs/victory-primitives#border
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js
[read more about themes here]: https://formidable.com/open-source/victory/guides/themes
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events

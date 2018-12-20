# VictoryBoxPlot

`victory-box-plot@^30.0.0` exports `VictoryBoxPlot` component

View these docs at https://formidable.com/open-source/victory/docs/victory-boxplot to see live examples.

`VictoryBoxPlot` renders a box plot to describe the distribution of a set of data. Data for `VictoryBoxPlot` may be given with summary statistics pre-calculated (`min`, `median`, `max`, `q1`, `q3`), or as an array of raw data. VictoryBoxPlot can be composed with [`VictoryChart`][] to create box plot charts.

```playground
<VictoryChart domainPadding={20}>
  <VictoryBoxPlot
    boxWidth={20}
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
  />
</VictoryChart>
```

## Props

### animate

`type: boolean || object`

`VictoryBoxPlot` uses the standard `animate` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#animate)

See the [Animations Guide][] for more detail on animations and transitions

```jsx
animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
```

### boxWidth

`type: number`

The `boxWidth` prop specifies how wide each box should be. If the `whiskerWidth` prop is not set, this prop will also determine the width of the whisker crosshair.

```playground
<VictoryChart domainPadding={10}>
  <VictoryBoxPlot
    boxWidth={10}
    whiskerWidth={5}
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
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

### data

`type: array[object]`

The `data` prop for `VictoryBoxPlot` may be given in a a variety of formats:

- As an array of standard data objects with values specified for `x` and `y`
  When given in this format, repeated values for either `x`or `y` will be used for calculating summary statistics

```jsx
data={[
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 1, y: 5 },
  { x: 2, y: 1 },
  { x: 2, y: 4 },
  { x: 2, y: 5 },
  ...
]}
```

- As an array of data objects where _either_ `x` _or_ `y` is given as an array of values
  When given in this format, array values are used for calculating summary statistics.

```jsx
data={[
  { x: 1, y: [1, 2, 3, 5] },
  { x: 2, y: [3, 2, 8, 10] },
  { x: 3, y: [2, 8, 6, 5] },
  { x: 4, y: [1, 3, 2, 9] }
]}
```

- As an array of data objects with pre-calculated summary statistics(`min`, `median`, `max`, `q1`, `q3`)
  When given in this format, `VictoryBoxPlot` _will not_ preform statistical analysis. Pre-calculating summary statistics for large datasets will improve performance.

```jsx
data={[
  { x: 1, min: 2, median: 5, max: 10, q1: 3, q3: 7 },
  { x: 2, min: 1, median: 4, max: 9, q1: 3, q3: 6 },
  { x: 3, min: 1, median: 6, max: 12, q1: 4, q3: 10 },
```

Use the [`x`][], [`y`][], [`min`][], [`max`][], [`median`][], [`q1`][], and [`q3`][] data accessor props to specify custom data formats. Refer to the [Data Accessors Guide][] for more detail.

### domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

`VictoryBoxPlot` uses the standard `domain` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domain)

```jsx
domain={{x: [0, 100], y: [0, 1]}}
```

### domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

`VictoryBoxPlot` uses the standard `domainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#domainpadding)

```jsx
domainPadding={{x: [10, -10], y: 5}}
```

### eventKey

`type: string || integer || array[string] || function`

`VictoryBoxPlot` uses the standard `eventKey` prop to specify how event targets are addressed. **This prop is not commonly used.** [Read about the `eventKey` prop in more detail here](https://formidable.com/open-source/victory/docs/common-props#eventkey)

```jsx
eventKey = "x";
```

### events

`type array[object]`

`VictoryBoxPlot` uses the standard `events` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#events)

See the [Events Guide][] for more information on defining events.

**note:** valid event targets for `VictoryBoxPlot` are:
"min", "minLabels", "grid", "ticks", and "tickLabels".

```playground
<div>
  <h3>Click Me</h3>
  <VictoryBoxPlot
    medianLabels={() => null}
    events={[{
      target: "q3",
      eventHandlers: {
        onClick: () => {
          return [
            {
              mutation: (props) => {
                return { style: Object.assign(props.style, { fill: "tomato" }) };
              }
            }
          ];
        }
      }
    }]}
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
  />
</div>
```

### externalEventMutations

`type: array[object]`

`VictoryBoxPlot` uses the standard `externalEventMutations` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#externalEventsMutations)

### groupComponent

`type: element`

`VictoryBoxPlot` uses the standard `groupComponent` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#groupcomponent)

_default:_ `<g/>`

```jsx
groupComponent={<g transform="translate(10, 10)" />}
```

### height

`type: number`

`VictoryBoxPlot` uses the standard `height` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#height)

_default (provided by default theme):_ `height={300}`

```jsx
height={400}
```

### horizontal

`type: boolean`

The horizontal prop determines whether boxes will be laid vertically or horizontally. The boxes will be vertical if this prop is false or unspecified, or horizontal if the prop is set to true.

_Note: Data should be flipped when `horizontal` is true_

```playground
<VictoryChart domainPadding={20}>
  <VictoryBoxPlot horizontal
    data={[
      { y: 1, x: [1, 2, 3, 5] },
      { y: 2, x: [3, 2, 8, 10] },
      { y: 3, x: [2, 8, 6, 5] },
      { y: 4, x: [1, 3, 2, 9] }
    ]}
  />
</VictoryChart>
```

### labelOrientation

`type: "top" || "bottom" || "left" || "right"`

The `labelOrientation` prop determines where labels are placed relative to their corresponding data. If this prop is not set, it will be set to "top" for horizontal charts, and "right" for vertical charts.

```playground
<VictoryChart domainPadding={20}>
  <VictoryBoxPlot horizontal
    labels
    labelOrientation="top"
    data={[
      { y: 1, x: [1, 2, 3, 5] },
      { y: 2, x: [3, 2, 8, 10] },
      { y: 3, x: [2, 8, 6, 5] },
      { y: 4, x: [1, 3, 2, 9] }
    ]}
  />
</VictoryChart>
```

### labels

`type: boolean`

When the boolean `labels` prop is set to `true`, the values for `min`, `max`, `median`, `q1`, and `q3` will be displayed for each box. For more granular label control, use the individual [`minLabels`][], [`maxLabels`][], [`medianLabels`][], [`q1Labels`][], and [`q3Labels`][] props.

### max

`type: string || array[string] || function`

Use the `max` data accessor prop to define the max value of a box plot.

**string:** specify which property in an array of data objects should be used as the max value

_examples:_ `max="max_value"`

**function:** use a function to translate each element in a data array into a max value

_examples:_ `max={() => 10}`

**path string or path array:** specify which property in an array of nested data objects should be used as a max value

_examples:_ `max="bonds.max"`, `max={["bonds", "max"]}`

### maxComponent

`type: element`

The `maxComponent` prop takes a component instance which will be responsible for rendering an element to represent the maximum value of the box plot. The new element created from the passed `maxComponent` will be provided with the following props calculated by `VictoryBoxPlot`: `datum`, `index`, `scale`, `style`, `events`, `majorWhisker` and `minorWhisker`. The `majorWhisker` and `minorWhisker` props are given as objects with values for `x1`, `y1`, `x2` and `y2` that describes the lines that make up the major and minor whisker. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `maxComponent` is not provided, `VictoryBoxPlot` will use its default [Whisker component][].

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `maxComponent={<Whisker/>}`

```jsx
maxComponent={<Whisker events={{ onClick: handleClick }}/>}
```

### maxLabelComponent

`type: element`

The `maxLabelComponent` prop takes a component instance which will be used to render the label corresponding to the maximum value for each box. The new element created from the passed `maxLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `maxLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `maxLabelComponent={<VictoryLabel/>}`

```jsx
maxLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryBoxPlot
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  maxLabels
  maxLabelComponent={
    <VictoryLabel
      dx={-10} dy={-10}
      textAnchor="middle"
    />
  }
/>
```

### maxLabels

`type: array || function || boolean`

The `maxLabels` prop defines the labels that will appear above each point. This prop should be given as a boolean, an array or as a function of data. When given as a boolean value, the max value of each datum will be used for the label.

_examples:_

- `maxLabels`
- `maxLabels={["first", "second", "third"]}`
- `maxLabels={(d) => Math.round(d.max)}`

### maxDomain

`type: number || { x: number, y: number }`

`VictoryBoxPlot` uses the standard `maxDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#maxDomain)

```playground
<VictoryChart maxDomain={{ x: 3 }}>
  <VictoryBoxPlot
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
  />
</VictoryChart>
```

### median

`type: string || array[string] || function`

Use the `median` data accessor prop to define the median value of a box plot.

**string:** specify which property in an array of data objects should be used as the median value

_examples:_ `median="median_value"`

**function:** use a function to translate each element in a data array into a median value

_examples:_ `median={() => 10}`

**path string or path array:** specify which property in an array of nested data objects should be used as a median value

_examples:_ `median="bonds.median"`, `median={["bonds", "median"]}`

### medianComponent

`type: element`

The `medianComponent` prop takes a component instance which will be responsible for rendering an element to represent the median value of the box plot. The new element created from the passed `medianComponent` will be provided with the following props calculated by `VictoryBoxPlot`: `datum`, `index`, `scale`, `style`, `events`, `x1`, `y1`, `x2` and `y2` Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `medianComponent` is not provided, `VictoryBoxPlot` will use its default [Line component][].

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `medianComponent={<Line/>}`

```jsx
medianComponent={<Line events={{ onClick: handleClick }}/>}
```

### medianLabelComponent

`type: element`

The `medianLabelComponent` prop takes a component instance which will be used to render the label corresponding to the median value for each box. The new element created from the passed `medianLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `medianLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `medianLabelComponent={<VictoryLabel/>}`

```jsx
medianLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryBoxPlot
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  medianLabels
  medianLabelComponent={
    <VictoryLabel
      dx={-10} dy={-10}
      textAnchor="middle"
    />
  }
/>
```

### medianLabels

`type: array || function || boolean`

The `medianLabels` prop defines the labels that will appear above each point. This prop should be given as a boolean, an array or as a function of data. When given as a boolean value, the median value of each datum will be used for the label.

_examples:_

- `medianLabels`
- `medianLabels={["first", "second", "third"]}`
- `medianLabels={(d) => Math.round(d.median)}`

### min

`type: string || array[string] || function`

Use the `min` data accessor prop to define the min value of a box plot.

**string:** specify which property in an array of data objects should be used as the min value

_examples:_ `min="min_value"`

**function:** use a function to translate each element in a data array into a min value

_examples:_ `min={() => 10}`

**path string or path array:** specify which property in an array of nested data objects should be used as a min value

_examples:_ `min="bonds.min"`, `min={["bonds", "min"]}`

### minComponent

`type: element`

The `minComponent` prop takes a component instance which will be responsible for rendering an element to represent the minimum value of the box plot. The new element created from the passed `minComponent` will be provided with the following props calculated by `VictoryBoxPlot`: `datum`, `index`, `scale`, `style`, `events`, `majorWhisker` and `minorWhisker`. The `majorWhisker` and `minorWhisker` props are given as objects with values for `x1`, `y1`, `x2` and `y2` that describes the lines that make up the major and minor whisker. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `minComponent` is not provided, `VictoryBoxPlot` will use its default [Whisker component][].

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `minComponent={<Whisker/>}`

```jsx
minComponent={<Whisker events={{ onClick: handleClick }}/>}
```

### minLabelComponent

`type: element`

The `minLabelComponent` prop takes a component instance which will be used to render the label corresponding to the minimum value for each box. The new element created from the passed `minLabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `minLabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `minLabelComponent={<VictoryLabel/>}`

```jsx
minLabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryBoxPlot
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  minLabels
  minLabelComponent={
    <VictoryLabel
      dx={-10} dy={10}
      textAnchor="middle"
    />
  }
/>
```

### minLabels

`type: array || function || boolean`

The `minLabels` prop defines the labels that will appear above each point. This prop should be given as a boolean, an array or as a function of data. When given as a boolean value, the min value of each datum will be used for the label.

_examples:_

- `minLabels`
- `minLabels={["first", "second", "third"]}`
- `minLabels={(d) => Math.round(d.min)}`

### minDomain

`type: number || { x: number, y: number }`

`VictoryBoxPlot` uses the standard `minDomain` prop. [Read about it in detail](https://formidable.com/open-source/victory/docs/common-props#minDomain)

```playground
<VictoryChart minDomain={{ y: 0 }}>
  <VictoryBoxPlot
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
  />
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

`VictoryBoxPlot` uses the standard `polar` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#polar)

**Note:** Polar Charts are not yet supported for `VictoryBoxPlot`

### q1

`type: string || array[string] || function`

Use the `q1` data accessor prop to define the q1 value of a box plot.

**string:** specify which property in an array of data objects should be used as the q1 value

_examples:_ `q1="q1_value"`

**function:** use a function to translate each element in a data array into a q1 value

_examples:_ `q1={() => 10}`

**path string or path array:** specify which property in an array of nested data objects should be used as a q1 value

_examples:_ `q1="bonds.q1"`, `q1={["bonds", "q1"]}`

### q1Component

`type: element`

The `q1Component` prop takes a component instance which will be responsible for rendering an element to represent the q1 value of the box plot. The new element created from the passed `q1Component` will be provided with the following props calculated by `VictoryBoxPlot`: `datum`, `index`, `scale`, `style`, `events`, `x`, `y`, `width` and `height` Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `q1Component` is not provided, `VictoryBoxPlot` will use its default [Box component][].

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `q1Component={<Box/>}`

```jsx
q1Component={<Box events={{ onClick: handleClick }}/>}
```

### q1LabelComponent

`type: element`

The `q1LabelComponent` prop takes a component instance which will be used to render the label corresponding to the q1 value for each box. The new element created from the passed `q1LabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `q1LabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `q1LabelComponent={<VictoryLabel/>}`

```jsx
q1LabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryBoxPlot
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  q1Labels
  q1LabelComponent={
    <VictoryLabel
      dx={5} dy={5}
    />
  }
/>
```

### q1Labels

`type: array || function || boolean`

The `q1Labels` prop defines the labels that will appear above each point. This prop should be given as a boolean, an array or as a function of data. When given as a boolean value, the q1 value of each datum will be used for the label.

_examples:_

- `q1Labels`
- `q1Labels={["first", "second", "third"]}`
- `q1Labels={(d) => Math.round(d.q1)}`

### q3

`type: string || array[string] || function`

Use the `q3` data accessor prop to define the q3 value of a box plot.

**string:** specify which property in an array of data objects should be used as the q3 value

_examples:_ `q3="q3_value"`

**function:** use a function to translate each element in a data array into a q3 value

_examples:_ `q3={() => 10}`

**path string or path array:** specify which property in an array of nested data objects should be used as a q3 value

_examples:_ `q3="bonds.q3"`, `q3={["bonds", "q3"]}`

### q3Component

`type: element`

The `q3Component` prop takes a component instance which will be responsible for rendering an element to represent the q3 value of the box plot. The new element created from the passed `q3Component` will be provided with the following props calculated by `VictoryBoxPlot`: `datum`, `index`, `scale`, `style`, `events`, `x`, `y`, `width` and `height` Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `q3Component` is not provided, `VictoryBoxPlot` will use its default [Box component][].

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `q3Component={<Box/>}`

```jsx
q3Component={<Box events={{ onClick: handleClick }}/>}
```

### q3LabelComponent

`type: element`

The `q3LabelComponent` prop takes a component instance which will be used to render the label corresponding to the q3 value for each box. The new element created from the passed `q3LabelComponent` will be supplied with the following props: `x`, `y`, `datum`, `index`, `scale`, `verticalAnchor`, `textAnchor`, `angle`, `transform`, `style` and `events`. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `q3LabelComponent` is omitted, a new [`VictoryLabel`][] will be created with props described above.

See the [Custom Components Guide][] for more detail on creating your own components

_default:_ `q3LabelComponent={<VictoryLabel/>}`

```jsx
q3LabelComponent={<VictoryLabel dy={20}/>}
```

```playground
<VictoryBoxPlot
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  q3Labels
  q3LabelComponent={
    <VictoryLabel
      dx={5} dy={5}
    />
  }
/>
```

### q3Labels

`type: array || function || boolean`

The `q3Labels` prop defines the labels that will appear above each point. This prop should be given as a boolean, an array or as a function of data. When given as a boolean value, the q3 value of each datum will be used for the label.

_examples:_

- `q3Labels`
- `q3Labels={["first", "second", "third"]}`
- `q3Labels={(d) => Math.round(d.q3)}`

### range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

**The `range` prop is usually controlled by `VictoryChart`. It will not typically be necessary to set a `range` prop manually**

[Read about the `range` prop in detail](https://formidable.com/open-source/victory/docs/common-props#range)

### samples

`type: number`

`VictoryBoxPlot` uses the standard `samples` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#samples)

_default:_ `samples={50}`

```jsx
samples={100}
```

### scale

`type: scale || { x: scale, y: scale }`

`VictoryBoxPlot` uses the standard `scale` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#scale)
Options for scale include "linear", "time", "log", "sqrt" and the `d3-scale` functions that correspond to these options.

_default:_ `scale="linear"`

```jsx
scale={{x: "linear", y: "log"}}
```

### sharedEvents

**The `sharedEvents` prop is used internally to coordinate events between components. It should not be set manually.**

### singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

`VictoryBoxPlot` uses the standard `singleQuadrantDomainPadding` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#singlequadrantdomainpadding)

### sortKey

`type: string || integer || array[string] || function`

`VictoryBoxPlot` uses the standard `sortKey` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#sortkey)

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

`VictoryBoxPlot` uses the standard `standalone` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#standalone)

**note:** When `VictoryBar` is nested within a component like `VictoryChart`, this prop will be set to `false`

_default:_ `standalone={true}`

### style

```
type: {
  parent: object,
  max: object,
  maxLabels: object,
  min: object,
  minLabels: object,
  median: object,
  medianLabels: object,
  q1: object,
  q1Labels: object,
  q3: object,
  q3Labels: object
}
```

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `parent`, `max`, `maxLabels`, `min`, `minLabels`,`median`, `medianLabels`,`q1`, `q1Labels`,`q3`, `q3Labels`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart. Functional styles may be defined for style properties, and they will be evaluated with each datum.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties may be included in `labels` styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryBoxPlot
  minLabels
  maxLabels
  data={[
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]}
  style={{
    min: { stroke: "tomato" },
    max: { stroke: "orange" },
    q1: { fill: "tomato" },
    q3: { fill: "orange" },
    median: { stroke: "white", strokeWidth: 2 },
    minLabels: { fill: "tomato" },
    maxLabels: { fill: "orange" }
  }}
/>
```

### theme

`type: object`

`VictoryBoxPlot` uses the standard `theme` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#theme)

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

### whiskerWidth

`type: number`

The `whiskerWidth` prop specifies how wide each whisker crosshair should be. If the `whiskerWidth` prop is not set, the width of the whisker crosshair will match the width of the box.

```playground
<VictoryChart domainPadding={10}>
  <VictoryBoxPlot
    boxWidth={10}
    whiskerWidth={5}
    data={[
      { x: 1, y: [1, 2, 3, 5] },
      { x: 2, y: [3, 2, 8, 10] },
      { x: 3, y: [2, 8, 6, 5] },
      { x: 4, y: [1, 3, 2, 9] }
    ]}
  />
</VictoryChart>
```

### width

`type: number`

`VictoryBoxPlot` uses the standard `width` prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#width)

_default (provided by default theme):_ `width={450}`

```jsx
width={400}
```

### x

`type: string || integer || array[string] || function`

`VictoryBoxPlot` uses the standard `x` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#x)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
x = "employee.name";
```

### y

`type: string || integer || array[string] || function`

`VictoryBoxPlot` uses the standard `y` data accessor prop. [Read about it here](https://formidable.com/open-source/victory/docs/common-props#y)

See the [Data Accessors Guide][] for more detail on formatting and processing data.

```jsx
y={(d) => d.value + d.error}
```

[animations guide]: https://formidable.com/open-source/victory/guides/animations
[data accessors guide]: https://formidable.com/open-source/victory/guides/data-accessors
[custom components guide]: https://formidable.com/open-source/victory/guides/custom-components
[events guide]: https://formidable.com/open-source/victory/guides/events
[themes guide]: https://formidable.com/open-source/victory/guides/themes
[`victorychart`]: https://formidable.com/open-source/victory/docs/victory-chart
[grayscale theme]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/grayscale.js
[`x`]: https://formidable.com/open-source/victory/docs/victory-boxplot#x
[`y`]: https://formidable.com/open-source/victory/docs/victory-boxplot#y
[`max`]: https://formidable.com/open-source/victory/docs/victory-boxplot#max
[`maxlabels`]: https://formidable.com/open-source/victory/docs/victory-boxplot#maxlabels
[`min`]: https://formidable.com/open-source/victory/docs/victory-boxplot#min
[`minlabels`]: https://formidable.com/open-source/victory/docs/victory-boxplot#minlabels
[`median`]: https://formidable.com/open-source/victory/docs/victory-boxplot#median
[`medianlabels`]: https://formidable.com/open-source/victory/docs/victory-boxplot#medianlabels
[`q1`]: https://formidable.com/open-source/victory/docs/victory-boxplot#q1
[`q1labels`]: https://formidable.com/open-source/victory/docs/victory-boxplot#q1labels
[`q3`]: https://formidable.com/open-source/victory/docs/victory-boxplot#q3
[`q3labels`]: https://formidable.com/open-source/victory/docs/victory-boxplot#q3labels
[whisker component]: https://formidable.com/open-source/victory/docs/victory-primitives#whisker
[box component]: https://formidable.com/open-source/victory/docs/victory-primitives#box
[line component]: https://formidable.com/open-source/victory/docs/victory-primitives#line
[`victorylabel`]: https://formidable.com/open-source/victory/docs/victory-label

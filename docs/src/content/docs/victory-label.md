---
id: 15
title: VictoryLabel
category: more
type: docs
scope: null
---

# VictoryLabel

VictoryLabel renders the label components that are used across all of Victory.

## active

`type: boolean`

The `active` prop specifies whether the label is active or not. The `active` prop is set by `defaultEvents` in components like `VictoryTooltip` and `VictorySelectionContainer`. The `active` prop is used when evaluating functional styles and props.

## angle

`type: string || number`

The `angle` prop specifies the angle to rotate the text around its anchor point.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels="This is a label"
  labelComponent={
    <VictoryLabel angle={-45} textAnchor="end"/>
  }
/>
```

## backgroundComponent

`type: element`

The `backgroundComponent` prop takes a component instance which will be used to create backgrounds for labels. The new element created from the passed `backgroundComponent` will be supplied with the following properties: x, y, height, width, style, and transform. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `backgroundComponent` is omitted, a default [Rect][] component will be created with props described above. `backgroundComponent` is only rendered when a `backgroundStyle` prop is added to `VictoryLabel`.

_examples:_ `backgroundComponent={<Rect height={50}/>}`

_default:_ `<Rect/>`

## backgroundPadding

`type: number || array || { top: number, bottom: number, left: number, right: number }`

The `backgroundPadding` prop adds padding around background elements. This prop may be given as a number or an object with values for "top", "bottom", "left", and "right". In the case of multi-line, multi-background labels, this prop may be given as an array.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      dy={-20}
      textAnchor="start"
      backgroundPadding={[
      	3,
      	{ left: 20, right: 20 },
        { left: 20}
      ]}
      backgroundStyle={[
        { fill: "red", opacity: 0.2 },
        { fill: "green", opacity: 0.2 },
        { fill: "blue", opacity: 0.2 }
      ]}
    />
  }
/>
```

## backgroundStyle

`type: object || array`

The `backgroundStyle` prop defines a set of SVG style properties that will be applied to the rendered
background element(s). This prop should be given as an object, or array of objects. When this prop is
given as an array of objects _and_ there are multi-line labels, multiple background elements will be rendered, and styled individually. When this prop is given as an object, a single background element will be rendered for the entire label.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      backgroundStyle={{ fill: "pink" }}
      backgroundPadding={3}
    />
  }
/>
```


## capHeight

`type: string || number || function`

The `capHeight` prop defines a text metric for the font being used: the expected height of capital letters. This is necessary because of SVG, which (a) positions the _bottom_ of the text at `y`, and (b) has no notion of line height. This prop should be given as a number of ems.

## className

`type: string`

The `className` prop specifies a class name that will be applied to the rendered text element.

_example:_ `className="myLabel"`

## curvedLabelTransform

type: string || object || function`

The `curvedLabelTransform` prop applies a transform to the rendered `<g>` element. This prop may be supplied as a string or an object containing transform definitions.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labelComponent={
    <VictoryLabel
      curvedLabelTransform={"translate(150,150)"}
      labelPlacement="curved"
      labelRadius={90}
      text={["Victory is awesome."]}
    />
  }
/>
```

## data

`type: array[object]`

Victory components can pass a `data` prop to their label component. This can be useful in custom components that need to make use of the entire dataset.

## datum

`type: object`

Victory components can pass a `datum` prop to their label component. This can be used to calculate functional styles, and determine text. If `x` and `y` are not specified, `datum` will be used to determine label position.

## desc

`type: string`

The `desc` prop specifies the description of the chart/SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers.

## direction

`type: "rtl" || "ltr" || "inherit"`

The `direction` prop determines which text direction to apply to the rendered `text` element

_default:_ `direction="inherit"`

## dx

`type: string || number || function`

The `dx` prop defines a horizontal shift from the `x` coordinate.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  style={{ labels: { padding: 0 } }}
  labelComponent={
    <VictoryLabel
      dx={20}
      textAnchor="start"
      verticalAnchor="middle"
    />
  }
/>
```

## dy

`type: string || number || function`

The `dy` prop defines a vertical shift from the `y` coordinate. This prop is affected by `capHeight`, `lineHeight`, and `verticalAnchor`, and the number of lines of text that make up the label.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  style={{ labels: { padding: 0 } }}
  labelComponent={
    <VictoryLabel
      dy={20}
      textAnchor="end"
      verticalAnchor="start"
    />
  }
/>
```

## events

`type: object`

The `events` prop attaches arbitrary event handlers to the label component. This prop should be given as an object of event names and corresponding event handlers. When events are provided via Victory's event system, event handlers will be called with the event, the props of the component it is attached to, and an `eventKey`.

_example:_ `events={{onClick: (evt) => alert("x: " + evt.clientX)}}`

## groupComponent

`type: element`

The `groupComponent` prop takes a component instance which will be used to create group elements when `VictoryLabel` renders both labels and backgrounds.

_default:_ `<g/>`

## height

`type: number`

This prop refers to the height of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually.**

## id

`type: string || number || function`

The `id` prop specifies a HTML ID that will be applied to the rendered text element.

## index

`type: string || number`

The `index` prop represents the index of the datum in the data array. **This prop should not be set manually.**

## inline

`type: boolean`

When the `text` property contains an array of strings, the `inline` property lets the `<tspan />` elements lay out next to each other. If this property is not specified, the `<tspan />` elements will stack vertically instead.

_default:_ `false`

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      inline
      style={[
        { fill: "red" },
        { fill: "green" },
        { fill: "blue" }
      ]}
    />
  }
/>
```
## labelRadius

`type: number || function`

The `labelRadius` prop defines the radius of the arc that will be used for positioning each curved label.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labelComponent={
    <VictoryLabel
      curvedLabelTransform={"translate(150,150)"}
      labelPlacement="curved"
      labelRadius={90}
      text={["Victory is awesome."]}
    />
  }
/>
```

## labelPlacement

`type: "parallel" || "perpendicular" || "vertical" || "curved"`

The `labelPlacement` prop is used to specify the placement of labels relative to the data point they represent. This prop may be given as "vertical", "parallel" or "perpendicular". This props is particularly useful in polar charts, where it may be desirable to position a label either parallel or perpendicular to its corresponding angle. When this prop is not set, perpendicular label placement will be used for polar charts, and vertical label placement will be used for cartesian charts.

## labelEndAngle

`type: number`

The `labelEndAngle` props defines the overall end angle of the curved label in degrees. This prop is used in conjunction with `labelStartAngle`.

_default:_ `90`

```playground
  <VictoryScatter
    domain={[-10, 10]}
    data={[{ x: 0, y: 0 }]}
    labelComponent={
      <VictoryLabel
        curvedLabelTransform={"translate(150,150)"}
        labelPlacement="curved"
        labelRadius={90}
        labelEndAngle={180}
        text={["Victory is awesome."]}
      />
    }
  />
```

## labelStartAngle

`type: number`

The `labelStartAngle` props defines the overall start angle of the curved label in degrees. This prop is used in conjunction with `labelEndAngle`.

_default:_ `0`

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labelComponent={
    <VictoryLabel
      curvedLabelTransform={"translate(150,150)"}
      labelPlacement="curved"
      labelRadius={90}
      labelStartAngle={180}
      text={["Victory is awesome."]}
    />
  }
/>
```

## lineHeight

`type: string || number || function || array`

The `lineHeight` prop defines how much space a single line of text should take up. Note that SVG has no notion of line-height, so the positioning may differ slightly from what you would expect with CSS, but the result is similar: a roughly equal amount of extra space is distributed above and below the line of text. This prop should be given as a number of ems.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      lineHeight={[1, 1, 3]}
      style={[
        { fill: "red" },
        { fill: "green" },
        { fill: "blue" }
      ]}
    />
  }
/>
```

## origin

`type: { x: number, y: number }`

Victory components will pass an `origin` prop is to define the center point in svg coordinates for polar charts. **This prop should not be set manually.**

## polar

`type: boolean`

Victory components can pass a boolean `polar` prop to specify whether a label is part of a polar chart. **This prop should not be set manually.**

## renderInPortal

`type: boolean`

The `renderInPortal` prop specifies whether `VictoryLabel` should render text in place or within a `VictoryPortal`. Setting `renderInPortal` to true is equivalent to wrapping `VictoryLabel` in a `VictoryPortal`. This prop is false by default.

## scale

`type: { x: scale, y: scale }`

Victory components can pass a `scale` prop to their label component. This can be used to calculate the position of label elements from `datum`. **This prop should not be set manually.**

## startOffset

`type: number || string`

The `startOffset` prop defines an offset from the start of the path for curved labels. Using this we can move the curved label along the path. This can be percentage or a number.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labelComponent={
    <VictoryLabel
      curvedLabelTransform={"translate(150,150)"}
      labelPlacement="curved"
      labelRadius={90}
      startOffset={"50%"}
      textAnchor="middle"
      text={["Victory is awesome."]}
    />
  }
/>
```

## style

`type: object || array`

The `style` prop defines a set of SVG style properties that will be applied to the rendered
`<text/>` element. This prop should be given as an object, or array of objects. When this prop is
given as an array of objects, each style object in the array will be applied to the corresponding
`<tspan/>` in multi-line labels. When this prop is given as an array with fewer elements than there are `<tspan/>` elements, the _first_ element of the style array will be applied to extra lines.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      style={[
        { fill: "red", fontSize: 25 },
        { fill: "green", fontFamily: "monospace" }
      ]}
    />
  }
/>
```

## tabIndex

`type: number || function`

The `tabIndex` prop specifies the `tabIndex` that will be applied to the rendered label. This prop may be given as a number or as a function that returns a number.


## text

`type: string || number || function || array`

The `text` prop defines the text `VictoryLabel` will render. The `text` prop may be given as a
string, number, a function of `datum`, or an array of any of these. Strings may include newline
characters, which `VictoryLabel` will split into separate `<tspan/>` elements. When `text` is given
as an array, separate `<tspan/>` elements will be created for each element in the array.

_examples:_ `text={(datum) => "x: " + datum.x}`, `text="Apples\n(green)"`, `text={["first line", "second line"]}`

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={true}
  labelComponent={
    <VictoryLabel
      text={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
    />
  }
/>
```

## textComponent

`type: element`

The `textComponent` prop takes a component instance which will be used to create text elements when `VictoryLabel` renders labels.

_default:_ `<Text />`

## textPathComponent

`type: element`

The `textPathComponent` prop takes a component instance which will be used to create textPath elements when `VictoryLabel` renders curved labels.

_default:_ `<TextPath />`

## textAnchor

`type: "start" || "middle" || "end" || "inherit" || function`

The `textAnchor` prop defines how the text is horizontally positioned relative to the given `x` and `y` coordinates. Options are "start", "middle", "end", and "inherit". This prop may also be given as a function that returns one of these options.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      textAnchor={({ text }) => text.length > 1 ? "start" : "middle"}
    />
  }
/>
```

## transform

`type: string || object || function`

The `transform` prop applies a transform to the rendered `<text>` element. This prop may be supplied as a string or an object containing transform definitions.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      transform="skewX(30)"
    />
  }
/>
```

## verticalAnchor

`type: "start" || "middle" || "end"`

The `verticalAnchor` prop defines how the text is vertically positioned relative to the given `x` and `y` coordinates. Options are "start", "middle" and "end". This prop may also be given as a function that returns one of these options.

```playground
<VictoryScatter
  domain={[-10, 10]}
  data={[{ x: 0, y: 0 }]}
  labels={() => ["This is a", "multi-line", "label"]}
  labelComponent={
    <VictoryLabel
      verticalAnchor={({ text }) => text.length > 1 ? "start" : "middle"}
    />
  }
/>
```

## width

`type: number`

This props refers to the width of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually.**

## x

`type: number`

The `x` prop defines the x coordinate to use as a basis for positioning the label element. Please note that this prop should be given in terms of `svg` coordinates, not data coordinates. To add a label annotation to a chart that is fixed to a specific _data_ coordinate, please use the `scale` prop that `VictoryChart` provides to its children to transform data coordinates into `svg` coordinates.

```playground_norender
  const DataLabel = props => {
    const x = props.scale.x(props.x);
    const y = props.scale.y(props.y);
    return <VictoryLabel {...props} x={x} y={y}/>
  };

  const MyChart = () => {
    return (
      <VictoryChart domain={ [0, 10]}>
        <VictoryLine />
        <VictoryScatter data={[{ x: 5, y: 5 }]} />
        <DataLabel
          x={5}
          y={5}
          dy={10}
          text="a custom data coordinate label"
        />
        <VictoryLabel
          x={55}
          y={50}
          text="an svg coordinate label"
        />
      </VictoryChart>
    );
  };


ReactDOM.render(<MyChart/>, mountNode);
```

## y

`type: number`

The `y` prop defines the y coordinate to use as a basis for positioning the label element. Please note that this prop should be given in terms of `svg` coordinates, not data coordinates.

[Rect]: /docs/victory-primitives#rect

---
id: 21
title: VictoryPrimitives
category: more
type: docs
scope: null
---

# Victory Primitives

Victory is built around a set of simple, stateless components. Along with [VictoryContainer][], [VictoryClipContainer][], and [VictoryLabel][], the following list represents every simple element a Victory component might render. These simple components are responsible for supplying props to primitive components. Victory maintains a small subset of primitive components with additional logic in place to prevent unnecessary rendering. Extracting every rendered element into its own component allows Victory to support both web and React Native applications with very little additional code, as only a few components need to be modified to render [react-native-svg][] elements rather than SVG elements. These primitives are also exposed for users to wrap, extend or reference when creating their own custom rendered components.

## Primitive Components

Each of these primitive components renders SVG elements. The following components are the only Victory components that render SVG elements with the exception of `VictoryContainer` and `VictoryPortal`. These elements are used by other simple components such as `Bar` and `Area`.

### Circle

Used by `Background`, `VictoryClipContainer`, and `Voronoi`

```jsx
const Circle = (props) => <circle vectorEffect="non-scaling-stroke" {...props} />;
```

### ClipPath

Used by `VictoryClipContainer` and `Voronoi`

```jsx
const ClipPath = (props) => (
  <defs>
    <clipPath id={props.clipId}>{props.children}</clipPath>
  </defs>
);
```

### Line

Used by `Axis`, `Candle`, and `ErrorBar`

```jsx
const Line = (props) => <line vectorEffect="non-scaling-stroke" {...props} />;
```

### Path

Used by `Arc`, `Area`, `Bar`, `Curve`, `Flyout`, `Point`, `Slice`, and `Voronoi`

```jsx
const Path = (props) => <path {...props} />;
```

### Rect

Used by `VictoryClipPath`, `Background`, `Border`, and `Candle`

```jsx
const Rect = (props) => <rect vectorEffect="non-scaling-stroke" {...props} />;
```

### Text

Used by `VictoryLabel`

```jsx
const Text = (props) => {
  const { children, title, desc, ...rest } = props;
  return (
    <text {...rest}>
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      {children}
    </text>
  );
};
```

### TSpan

Used by `VictoryLabel`

```jsx
const TSpan = (props) => <tspan {...props} />;
```

## Simple Components

### Arc

[VictoryPolarAxis][] uses the `Arc` primitive to draw circular axes and grid lines. `Arc` renders a `<Path>` element. [View the source][arc]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Arc`
- `className` _string_ the class name that will be applied to the rendered path
- `closedPath` _boolean_ a flag signifying whether this arc is should render a closed path
- `cx` _number_ the x coordinate of the center of the arc path
- `cy` _number_ the y coordinate of the center of the arc path
- `datum` _any_ the data point or tick corresponding to this arc
- `endAngle` _number_ the end angle of the arc given in degrees
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the element used to group rendered elements _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `r` _number_ the radius of the arc
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `startAngle` _number_ the start angle of the arc given in degrees
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Arc`
- `transform` _string_ a transform that will be supplied to elements this component renders

### Area

[VictoryArea][] uses `Area` to represent an entire dataset. `Area` renders a `<Path/>` element, or a group of paths if the stroke of the area should be rendered in a different style from the filled section of the area. [View the source][area]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Area`
- `className` _string_ the class name that will be applied to the rendered path
- `data` _array_ the entire dataset used to define the area
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the element used to group rendered elements _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `interpolation` _string or function_ the interpolation to use when calculating a path
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ that will be applied to rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Area`
- `transform` _string_ a transform that will be supplied to elements this component renders

### LineSegment

The `LineSegment` component renders straight lines. This component is used to render grids, ticks, and axis lines in [VictoryAxis][]. [View the source][axis]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered lineComponent. When this prop is given as a function it will be called with the rest of the props supplied to `LineSegment`
- `className` _string_ the class name that will be applied to the rendered element
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this line
- `events` _object_ events to attach to the rendered element
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this line within the dataset
- `lineComponent` _element_ the rendered line element _default_ `<Line/>`
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered elements
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or funciton_ will be applied to the rendered lineComponent. When this prop is given as a function it will be called with the rest of the props supplied to `LineSegment`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `x1` _number_ the x coordinate of the beginning of the line
- `x2` _number_ the x coordinate of the end of the line
- `y1` _number_ the y coordinate of the beginning of the line
- `y2` _number_ the y coordinate of the end of the line

### Background

The `Background` component is used to render an SVG background on VictoryChart. `Background` will render a `<Circle>` for charts with `polar={true}` and a `<Rect>` element for all other charts. [View the source][background]

**Props**

- `className` _string_ the class name that will be applied to the rendered path
- `circleComponent` _element_ the rendered circle element _default_ `<Circle/>`
- `events` _object_ events to attach to the rendered element
- `height` _number_ the height of the `<rect/>` element
- `id` _string or number_ an id to apply to the rendered component
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `rectComponent` _element_ the rendered rect element _default_ `<Rect/>`
- `role` _string_ the aria role to assign to the element
- `rx` _number_ the x radius of the rendered `<rect/>` element
- `ry` _number_ the y radius of the rendered `<rect/>` element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `style` _object_ the styles to apply to the rendered element
- `width` _number_ the width of the `<rect/>` element
- `x` _number_ the x coordinate of the upper-left corner of the background for non-polar charts and center of the background for polar charts
- `y` _number_ the y coordinate of the top of the background

### Bar

[VictoryBar][] uses `Bar` to represent a single data point as a bar extending horizontally or vertically from the independent axis. `Bar` renders a `<Path>` element. It is also used by [VictoryHistogram][] to represent "bins" of data. [View the source][bar]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `alignment` \*"start", "middle", or "end" specifies how a bar path should be aligned in relation to its data point
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Bar`
- `barRatio` _number_ a number between zero and one that will be used to calculate bar width when an explicit width is not given
- `barWidth` _number or function_ A prop defining the width of the bar. When this prop is given as a function, it will be called with the rest of the props supplied to `Bar`.
- `className` _string_ the class name that will be applied to the rendered path
- `cornerRadius` _number, function or object_ the number of pixels of corner radius to apply when calculating a bar path. When this prop is given as a function, it will be called with the rest of the props supplied to `Bar`. When given as an object, this prop may include values for top, bottom, topLeft, topRight, bottomLeft and bottomRight, with more specific values overriding less specific values
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this bar
- `events` _object_ events to attach to the rendered element
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this bar within the dataset
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ number applied to rendered path. When given as a function it will be called with the rest of the props supplied to `Bar`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `width` _number_ the width of parent chart (used to calculate default bar width `style.width` is not supplied)
- `x` _number_ the x coordinate of the top of the bar
- `y0` _number_ the y coordinate of the baseline of the bar
- `y` _number_ the y coordinate of the top of the bar

### Box

[VictoryLegend][] uses the `Box` component to draw a border around a legend area. `Box` renders a `<Rect/>` element. [View the source][border]

_note_ `Box` also exported as `Border`

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop that controls the a propcontrollings the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Box`
- `className` _string_ the class name that will be applied to the rendered element
- `events` _object_ events to attach to the rendered element
- `height` _number_ the height of the `<rect/>` element
- `id` _string or number_ an id to apply to the rendered component
- `rectComponent` _element_ the rendered path element _default_ `<Rect/>`
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered element
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ will be applied to the rendered path. When given as a function it will be called with the rest of the props supplied to `Box`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `width` _number_ the width of the `<rect/>` element
- `x` _number_ the x coordinate of the upper-left corner of the `<rect/>` element
- `y` _number_ the y coordinate of the upper-left corner of the `<rect/>` element

### Candle

[VictoryCandlestick][] uses `Candle` to represent a single data point as a candle. `Candle` renders a group with `<Rect>` and `<Line>` elements. [View the source][candlestick]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered `<Rect>` and `<Line>` elements. When this prop is given as a function it will be called with the rest of the props supplied to `Candle`
- `candleRatio` _number_ a number between zero and one that will be used to calculate candle width when an explicit width is not given
- `candleWidth` _number or function_ A prop defining the width of the candle. When this prop is given as a function, it will be called with the rest of the props supplied to `Candle`.
- `className` _string_ the class name that will be applied to the rendered element
- `close` _number_ the y coordinate of the closing value
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this candle
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the element used to group rendered elements _default_ `<g/>`
- `high` _number_ the y coordinate of the high value
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this candle within the dataset
- `lineComponent` _element_ the rendered line element _default_ `<Line/>`
- `low` _number_ the y coordinate of the low value
- `open` _number_ the y coordinate of the opening value
- `rectComponent` _element_ the rendered path element _default_ `<Rect/>`
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered elements
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ a prop controlling the aria-label that will be applied to the rendered `<Rect>` and `<Line>` elements. When given as a function it will be called with the rest of the props supplied to `Candle`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `width` _number_ the width of parent chart (used to calculate default candle width `style.width` is not supplied)
- `widthStrokeWidth` _number_ the stroke width of the candle wick. (style.strokeWidth will be used when this value is not given)
- `x` _number_ the x coordinate of the candle

### Curve

[VictoryLine][] uses `Curve` to represent an entire dataset as a line or curve. `Curve` renders a `<Path>` element. [View the source][curve]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Curve`
- `className` _string_ the class name that will be applied to the rendered element
- `data` _array_ the entire dataset used to define the curve
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the element used to group rendered elements _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `interpolation` _string or function_ the interpolation to use when calculating a path
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ will be applied to the rendered path. When given as a function it will be called with the rest of the props supplied to `Curve`
- `transform` _string_ a transform that will be supplied to elements this component renders

### ErrorBar

[VictoryErrorBar][] uses `ErrorBar` to render x and y error bars. `ErrorBar` renders a group of `<Line>` elements. [View the source][errorbar]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the group, `g`, containing the rendered `<Line>` elements. When this prop is given as a function it will be called with the rest of the props supplied to `ErrorBar`
- `borderWidth` _number_ the width of the cross-hairs on the end of each error bar _default: 10_
- `className` _string_ the class name that will be applied to the rendered element
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this error bar
- `errorX` _number, array, or boolean_ errors in the x dimension.
- `errorY` _number, array, or boolean_ errors in the y dimension.
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the element used to group rendered elements _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this error bar within the dataset
- `lineComponent` _element_ the rendered line element _default_ `<Line/>`
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered elements
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ applies to the group, `g`, containing the `<Line>` elements. When this prop is given as a function it will be called with the rest of the props supplied to `ErrorBar`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `x` _number_ the x coordinate of the center of the error bar
- `y` _number_ the y coordinate of the center of the error bar

### Flyout

[VictoryTooltip][] uses `Flyout` to render a flyout style path around text. `Flyout` renders `<Path>` element. [View the source][flyout]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `center` _object_ the center coordinates of the flyout
- `className` _string_ the class name that will be applied to the rendered element
- `cornerRadius` _number_ the corner radius of the flyout
- `data` _array_ the entire dataset if applicable
- `datum` _object_ the data point corresponding to this flyout if applicable
- `dx` _number_ offset in the x dimension.
- `dy` _number_ offset in the y dimension.
- `events` _object_ events to attach to the rendered element
- `height` _number_ the height of the flyout
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this flyout within the dataset
- `orientation` _"top", "bottom", "left", "right"_
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `pointerLength` _number_ the length of the triangular pointer
- `pointerWidth` _number_ the width of the base of the triangular pointer
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered elements
- `style` _object_ the styles to apply to the rendered element
- `transform` _string_ a transform that will be supplied to elements this component renders
- `width` _number_ the width of the flyout
- `x` _number_ the x coordinate of data point associated with this flyout
- `y` _number_ the y coordinate of data point associated with this flyout

### Point

[VictoryScatter][] uses `Point` to render each point in a scatter plot. `Point` renders a `<Path>` element. [View the source][point]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Point`
- `className` _string_ the class name that will be applied to the rendered element
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this point
- `events` _object_ events to attach to the rendered element
- `getPath` _function_ a function of `x`, `y`, and `size` that returns a path string. When this optional function is provided, it will be used to calculate a path, rather than one of the path functions corresponding to the `symbol`s supported by `Point`.
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this point within the dataset
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `size` _number or function_ the size of the point. When this prop is given as a function, it will be called with the rest of the props supplied to `Point`.
- `style` _object_ the styles to apply to the rendered element
- `symbol` _"circle", "cross", "diamond", "plus", "minus", "square", "star", "triangleDown", "triangleUp"_ , which symbol the point should render.It also supports "custom react icons". 
This prop may also be given as a function that returns one of the above options. When this prop is given as a function, it will be called with the rest of the props supplied to `Point`.
- `tabIndex` _number or function_ number will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Point`
- `transform` _string_ a transform that will be supplied to elements this component renders
- `x` _number_ the x coordinate of the center of the point
- `y` _number_ the y coordinate of the center of the point

### Slice

[VictoryPie][] uses `Slice` to render each slice in a pie chart. `Slice` renders a `<Path>` element. [View the source][slice]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`
- `className` _string_ the class name that will be applied to the rendered element
- `cornerRadius` _number or function_ the corner radius to apply to this slice. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this slice
- `events` _object_ events to attach to the rendered element
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this slice within the dataset
- `innerRadius` _number or function_ the inner radius of the slice. When this prop is given as a function it will be called with `datum` and `active`.
- `padAngle` _number or function_ the angular padding to add to the slice. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `pathFunction` _function_ a function that calculates the path of a given slice. When given, this prop will be called with the `slice` object
- `radius` _number or function_ the outer radius of the slice. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `slice` _object_ an object specifying the startAngle, endAngle, padAngle, and data of the slice
- `sliceEndAngle` _number or function_ the end angle the slice. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `sliceStartAngle` _number or function_ the start angle of the slice. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ number will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Slice`.
- `transform` _string_ a transform that will be supplied to elements this component renders

### Voronoi

[VictoryVoronoi][] uses `Voronoi` to render voronoi polygons. `Voronoi` renders either a `<Path>` element corresponding to a voronoi polygon, or a `<Circle/>` clipped with a `<ClipPath>` defined by the path of the polygon. [View the source][voronoi]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Voronoi`
- `circleComponent` _element_ the rendered circle element _default_ `<Circle/>`
- `className` _string_ the class name that will be applied to the rendered element
- `clipPathComponent` _element_ the rendered clipPath element _default_ `<ClipPath/>`
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this voronoi polygon
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the rendered group element _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `index` _number_ the index of this voronoi polygon within the dataset
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `pathComponent` _element_ the rendered path element _default_ `<Path/>`
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `polygon` _array_ an array of points defining the polygon
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered path
- `size` _number_ the maximum size of the voronoi polygon
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ will be applied to the rendered path. When this prop is given as a function it will be called with the rest of the props supplied to `Voronoi`
- `transform` _string_ a transform that will be supplied to elements this component renders.
- `x` _number_ the x coordinate of the data point
- `y` _number_ the y coordinate of the data point

### Whisker

[VictoryBoxPlot][] uses the `Whisker` component to draw whiskers for the minimum and maximum values in a box plot. `Whisker` renders a group of `<Line/>` elements. [View the source][whisker]

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `ariaLabel` _string or function_ a prop controlling the aria-label that will be applied to the rendered `<Line>` elements. When this prop is given as a function it will be called with the rest of the props supplied to `Whisker`
- `className` _string_ the class name that will be applied to the rendered element
- `events` _object_ events to attach to the rendered element
- `groupComponent` _element_ the rendered group element _default_ `<g/>`
- `id` _string or number_ an id to apply to the rendered component
- `lineComponent` _element_ the rendered line element _default_ `<Line/>`
- `majorWhisker` _object_ an object with values `x1`, `x2`, `y1`, `y2` describing the major whisker line
- `minorWhisker` _object_ an object with values `x1`, `x2`, `y1`, `y2` describing the minor whisker line
- `role` _string_ the aria role to assign to the element
- `shapeRendering` _string_ the shape rendering attribute to apply to the rendered element
- `style` _object_ the styles to apply to the rendered element
- `tabIndex` _number or function_ will be applied to the rendered `<Line>`. When this prop is given as a function it will be called with the rest of the props supplied to `Whisker`
- `transform` _string_ a transform that will be supplied to elements this component renders.

[victorycontainer]: /docs/victory-container
[victoryclipcontainer]: /docs/victory-clip-container
[victorylabel]: /docs/victory-label
[react-native-svg]: https://github.com/react-native-community/react-native-svg
[arc]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-primitives/arc.tsx
[victorypolaraxis]: /docs/victory-polar-axis
[area]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-area/src/area.tsx
[victoryarea]: /docs/victory-area
[background]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-primitives/background.tsx
[bar]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-bar/src/bar.tsx 
[border]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-primitives/border.tsx
[victorybar]: /docs/victory-bar
[candlestick]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-candlestick/src/victory-candlestick.tsx 
[victorycandlestick]: /docs/victory-candlestick
[curve]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-line/src/curve.tsx 
[victoryline]: /docs/victory-line
[errorbar]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-errorbar/src/error-bar.tsx
[victoryerrorbar]: /docs/victory-errorbar
[flyout]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-tooltip/src/flyout.tsx
[victorytooltip]: /docs/victory-tooltip
[victoryaxis]: /docs/victory-axis
[axis]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-axis/src/victory-axis.tsx
[point]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-primitives/point.tsx
[slice]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-pie/src/slice.tsx
[whisker]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-primitives/whisker.tsx
[victorypie]: /docs/victory-pie
[voronoi]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-voronoi/src/voronoi.tsx
[victoryvoronoi]: /docs/victory-voronoi
[victoryscatter]: /docs/victory-scatter
[victorylegend]: /docs/victory-legend
[victoryboxplot]: /docs/victory-boxplot
[victoryhistogram]: /docs/victory-histogram

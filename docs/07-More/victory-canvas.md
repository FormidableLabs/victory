---
id: 36
title: VictoryCanvas
category: more
type: docs
scope: null
---

# Victory Canvas

The `victory-canvas` package currently provides a set of experimental primitive components that will allow Victory to render data in a Canvas container rather than as an SVG.

## Container Components

### CanvasGroup

This component is designed to be used as the `groupComponent` for any chart type to enable Canvas rendering. This component will create a `<canvas />` HTML component, and allow other child components to access the Canvas context via React context.

```jsx
const MyLine = (props) => (
  <VictoryLine groupComponent={<CanvasGroup />} {...props} />
);
```

## Primitive Components

Each of these primitive components depends on the Canvas context that it gets through the `useCanvasContext` React hook. Rather than returning a React component, they render elements to the screen through the Canvas context.

### CanvasPoint

Designed to be used with `VictoryScatter`, this component mimics the behavior of `Point`.

```jsx
const MyScatter = (props) => (
  <VictoryScatter
    groupComponent={<CanvasGroup />}
    dataComponent={<CanvasPoint />}
    {...props}
  />
);
```

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this point
- `events` _object_ events to attach to the rendered element
- `getPath` _function_ a function of `x`, `y`, and `size` that returns a path string. When this optional function is provided, it will be used to calculate a path, rather than one of the path functions corresponding to the `symbol`s supported by `Point`.
- `index` _number_ the index of this point within the dataset
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `size` _number or function_ the size of the point. When this prop is given as a function, it will be called with the rest of the props supplied to `Point`.
- `style` _object_ the styles to apply to the rendered element
- `symbol` _"circle", "cross", "diamond", "plus", "minus", "square", "star", "triangleDown", "triangleUp"_ which symbol the point should render. This prop may also be given as a function that returns one of the above options. When this prop is given as a function, it will be called with the rest of the props supplied to `Point`.
- `transform` _string_ a transform that will be supplied to elements this component renders
- `x` _number_ the x coordinate of the center of the point
- `y` _number_ the y coordinate of the center of the point

### CanvasCurve

Designed to be used with [VictoryLine][], this component mimics the behavior of `Curve`.

```jsx
const MyLine = (props) => (
  <VictoryLine
    groupComponent={<CanvasGroup />}
    dataComponent={<CanvasLine />}
    {...props}
  />
);
```

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `data` _array_ the entire dataset used to define the curve
- `events` _object_ events to attach to the rendered element
- `interpolation` _string or function_ the interpolation to use when calculating a path
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `role` _string_ the aria role to assign to the element
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `style` _object_ the styles to apply to the rendered element
- `transform` _string_ a transform that will be supplied to elements this component renders

### CanvasBar

Designed to be used with `VictoryBar`, this component mimics the behavior of `Bar`.

```jsx
const Bar = (props) => (
  <VictoryBar
    groupComponent={<CanvasGroup />}
    dataComponent={<CanvasBar />}
    {...props}
  />
);
```

**Props**

- `active` _boolean_ a flag signifying whether the component is active
- `alignment` \*"start", "middle", or "end" specifies how a bar path should be aligned in relation to its data point
- `barRatio` _number_ a number between zero and one that will be used to calculate bar width when an explicit width is not given
- `barWidth` _number or function_ A prop defining the width of the bar. When this prop is given as a function, it will be called with the rest of the props supplied to `Bar`.
- `cornerRadius` _number, function or object_ the number of pixels of corner radius to apply when calculating a bar path. When this prop is given as a function, it will be called with the rest of the props supplied to `Bar`. When given as an object, this prop may include values for top, bottom, topLeft, topRight, bottomLeft and bottomRight, with more specific values overriding less specific values
- `data` _array_ the entire dataset
- `datum` _object_ the data point corresponding to this bar
- `events` _object_ events to attach to the rendered element
- `index` _number_ the index of this bar within the dataset
- `origin` _object_ the svg coordinates of the center point of a polar chart
- `polar` _boolean_ a flag specifying whether the component is part of a polar chart
- `scale` _object_ the x and y scale of the parent chart with `domain` and `range` applied
- `style` _object_ the styles to apply to the rendered element
- `transform` _string_ a transform that will be supplied to elements this component renders
- `width` _number_ the width of parent chart (used to calculate default bar width `style.width` is not supplied)
- `x` _number_ the x coordinate of the top of the bar
- `y0` _number_ the y coordinate of the baseline of the bar
- `y` _number_ the y coordinate of the top of the bar

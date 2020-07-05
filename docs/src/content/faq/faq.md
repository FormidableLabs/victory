---
id: 1
title: FAQs
category: support
type: docs
scope: null
slug: faq
---
# Frequently Asked Questions (FAQ)

Thanks for trying Victory! The FAQs below are based on issues and questions from our [support channel](https://spectrum.chat/victory). You can find more examples in [our gallery](/gallery). Can't find what you're looking for? Help us improve these docs by [opening an issue](https://github.com/FormidableLabs/victory-docs/issues/new).

## Styles

### How can I change the colors of lines and other elements in Victory?

Most components in Victory use a standard `style` prop with style namespaces for "data" and "labels". Any styles added to the "data" namespace will be applied to all the svg elements rendered for a given dataset.

```playground
<VictoryChart domain={{ x: [0, 4] }}>
  <VictoryBar
    style={{ data: { fill: "red" } }}
    data={[
      { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }
    ]}
  />
  <VictoryLine
    style={{ data: { stroke: "blue", strokeWidth: 5 } }}
    y={(d) => d.x}
  />
</VictoryChart>
```

### How can I change the color of an individual point or bar?

Individual elements in Victory can be styled by adding style attributes directly to your data object and using functional styles and props as in the example below. Functions are called with all the props that correspond to the element they render.

```playground
<VictoryChart>
  <VictoryBar
    style={{
      data: {
        fill: ({ datum }) => datum.fill,
      }
    }}
    data={[
      { x: 1, y: 2, fill: "red" },
      { x: 2, y: 4 , fill: "orange" },
      { x: 3, y: 6, fill: "gold" }
    ]}
  />
  <VictoryScatter
    style={{ data: {
      fill: ({ index }) => +index % 2 === 0 ? "blue" : "grey",
      stroke: ({ datum }) => datum.y < 6 ? "red" : "black",
      strokeWidth: 2
    } }}
    symbol={({ datum }) => datum.x > 1 ? "plus" : "square"}
    size={({ datum }) => datum.y + 2}
    data={[
       { x: 0, y: 2 }, { x: 1, y: 4 }, { x: 2, y: 6 }, { x: 3, y: 8 }, { x: 4, y: 10 }
    ]}
  />
</VictoryChart>
```
Note that continuous data types such as `VictoryLine` and `VictoryArea` cannot be styled in this way, as they only render a single element for a given dataset.

### How can I use gradient fills in Victory?

Create a gradient def as usual and then reference it by id in your style object. Gradients can be used to give continuous charts (_i.e._ line or area charts) the appearance of discrete data elements and hover states. A more complex example is given [here](/gallery/area-hover-styles).

```playground
<div>
  <svg style={{ height: 0 }}>
    <defs>
      <linearGradient id="myGradient">
        <stop offset="0%" stopColor="red"/>
        <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/>
        <stop offset="100%" stopColor="green"/>
      </linearGradient>
    </defs>
  </svg>
  <VictoryChart>
    <VictoryArea
      style={{
        data: {fill: "url(#myGradient)"}
      }}
      data={[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 7 },
        { x: 4, y: 4 },
        { x: 5, y: 5 }
      ]}
    />
  </VictoryChart>
</div>
```

## Annotations

### How can I add arbitrary labels to my charts?

Use `VictoryLabel` to as a child of `VictoryChart` to add arbitrary labels. Labels can be positioned with the `x` and `y` props, or with `datum` when used within `VictoryChart` or `VictoryGroup`.

```playground
<VictoryChart domain={[0, 10]}>
  <VictoryLabel text="Chart Title" x={225} y={30} textAnchor="middle"/>
  <VictoryLine
    style={{ data: { stroke: "blue", strokeWidth: 5 } }}
    y={(d) => d.x}
  />
  <VictoryLabel text="Annotation" datum={{ x: 4, y: 6 }} textAnchor="middle"/>
</VictoryChart>
```


### How can I annotate my charts with lines and markers?

Victory doesn't have specific components for annotations. Instead, use standard component such as `VictoryLine` and `VictoryScatter` to add lines and markers to your chart.

```playground
<VictoryChart domain={[0, 10]}>
  <VictoryLine
    style={{ data: { stroke: "blue", strokeWidth: 3 } }}
    y={(d) => d.x}
  />
  <VictoryLine
    style={{
      data: { stroke: "red", strokeWidth: 2 },
      labels: { angle: -90, fill: "red", fontSize: 20 }
    }}
    labels={["Important"]}
    labelComponent={<VictoryLabel y={100}/>}
    x={() => 5}
  />
  <VictoryScatter
    symbol="star"
    size={8}
    style={{ data: { fill: "red" }}}
    data={[{ x: 5, y: 5 }]}
  />
</VictoryChart>
```

## Axes

### How do I turn off the axes on VictoryChart?

`VictoryChart` uses default axes. If you want to plot data without using any axes, use `VictoryGroup` instead.

```playground
<VictoryGroup>
  <VictoryBar
    style={{ data: { fill: "red" } }}
    data={[
      { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }
    ]}
  />
  <VictoryLine domain={{ x: [0, 4] }}
    style={{ data: { stroke: "blue", strokeWidth: 5 } }}
    y={(d) => d.x}
  />
</VictoryGroup>
```

### Why is VictoryChart rendering only one axis?

When no axes are supplied to `VictoryChart` it will render pair of default axes. If any axes are supplied as children to `VictoryChart` it will render _only_ those axes.

```playground
<div style={{ display: "flex", flexWrap: "wrap" }}>
  <VictoryChart>
    <VictoryLabel text="Default Axes" x={225} y={30} textAnchor="middle"/>
    <VictoryLine/>
  </VictoryChart>
  <VictoryChart>
    <VictoryLabel text="Two VictoryAxis Children" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis/>
    <VictoryAxis dependentAxis/>
    <VictoryLine/>
  </VictoryChart>
  <VictoryChart>
    <VictoryLabel text="Single Dependent Axis" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis dependentAxis/>
    <VictoryLine/>
  </VictoryChart>
  <VictoryChart>
    <VictoryLabel text="Single Independent Axis" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis/>
    <VictoryLine/>
  </VictoryChart>
</div>
```

### Can I make a chart with multiple dependent axes?

`VictoryChart` will render any number of axes, but all children rendered by `VictoryChart` will be forced to use the same domain. To create a single chart with the appearance of several different domains, you can either compose components manually without the aid of `VictoryChart`, as described in [this guide](/guides/custom-charts), or normalize all of your data, and re-scale your axis tick labels to give the appearance of separate domains as in [this example](/gallery/multiple-dependent-axes).

### How can I change the position of my axis?

`VictoryChart` automatically aligns axes so that they cross at their origin. Use the `offsetX` and `offsetY` props on `VictoryAxis` to alter this default behavior. *Note:* Axes that typically cross at zero will not display ticks or tick labels at zero. To change this behavior, set the `crossAxis` prop to false.
[Read more about VictoryAxis](/docs/victory-axis).

```playground
<VictoryChart domain={{ y: [-10, 10] }}>
  <VictoryAxis offsetY={50}/>
  <VictoryAxis dependentAxis offsetX={50} crossAxis={false}/>
  <VictoryLine/>
</VictoryChart>
```

### How can I format my axis labels?

Axis tick labels are controlled via two props. `tickValues` controls the _positions_ of ticks along the axis, and `tickFormat` controls how labels are displayed. Use the `tickFormat` prop to customize axis labels. This prop can be given as an array of strings, or as a function that returns a string. Functions provided to `tickFormat` are called with the following arguments: `tickValue`, `index` and `tickArray`.
[Read more about VictoryAxis](/docs/victory-axis).

```playground
<VictoryChart domain={[0, 5]}>
  <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={["first", "second", "third", "fourth"]}/>
  <VictoryAxis dependentAxis tickFormat={(tick) => `$${Math.round(tick)}M`}/>
  <VictoryLine/>
</VictoryChart>
```

### My axis labels are cut off. How can I fix them?

Long axis labels can be problematic. There are several ways to address the issue. The best solution will depend on the specific requirements of your project. The following examples demonstrate:
- Altering `padding`
- Splitting labels onto multiple lines
- Allowing labels to overflow the container with VictoryPortal
- Using angled labels

```playground
<div style={{ display: "flex", flexWrap: "wrap" }}>
  <VictoryChart
    padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
  >
    <VictoryLabel text="Altering padding" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis dependentAxis
      tickFormat={[
        "first label",
        "second label",
        "third label",
        "forth label",
        "fifth label"
      ]}
    />
    <VictoryAxis/>
    <VictoryLine/>
  </VictoryChart>

  <VictoryChart>
    <VictoryLabel text="Multi-line labels" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis dependentAxis
      tickFormat={[
        `first\nlabel`,
        `second\nlabel`,
        `third\nlabel`,
        `forth\nlabel`,
        `fifth\nlabel`
      ]}
    />
    <VictoryAxis/>
    <VictoryLine/>
  </VictoryChart>

  <VictoryChart>
    <VictoryLabel text="Angled labels" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis dependentAxis
      style={{ tickLabels: { angle: -60 } }}
      tickFormat={[
        "first label",
        "second label",
        "third label",
        "forth label",
        "fifth label"
      ]}
    />
    <VictoryAxis/>
    <VictoryLine/>
  </VictoryChart>

  <VictoryChart>
    <VictoryLabel text="overflowing labels with VictoryPortal" x={225} y={30} textAnchor="middle"/>
    <VictoryAxis dependentAxis
      tickLabelComponent={<VictoryPortal><VictoryLabel/></VictoryPortal>}
      tickFormat={[
        "first label",
        "second label",
        "third label",
        "forth label",
        "fifth label"
      ]}
    />
    <VictoryAxis/>
    <VictoryLine/>
  </VictoryChart>

</div>
```

### My axis labels are showing very small numbers. How do I fix this?

When a dataset only has a single value, or when all values on an axis have the same value, the single-point domain for that axis will be converted to a two-point domain.
Victory does this by offsetting the domain value by a very small number.
To solve this, you will need to manually set sensible defaults on the `domain` of your chart.

```playground
  <VictoryChart
        domain={{x: [0,2]}}
       >
      <VictoryBar
        data={[{x: 1, y: 1}]}
      />
    </VictoryChart>
```

## Labels and Tooltips

### How can I add tooltips to a line?

`VictoryLine` only renders a single element to represent an entire dataset, so replacing its `labelComponent` with `VictoryTooltip` wont work as expected, since there will be only a single event trigger. Voronoi tooltips can be used to add tooltips and other interactions components without unique event triggers, or with event triggers that are too small, or too close together to be useful. Use `VictoryVoronoiContainer` to associate mouse position with the nearest data points. [Read more about Voronoi Tooltips](/guides/tooltips#tooltips-with-victoryvoronoicontainer) and [`VictoryVoronoiContainer`](/docs/victory-voronoi-container).


### How can I add my own events when I'm using VictoryTooltip?

`VictoryTooltip` uses `defaultEvents` which are prepended onto any events array provided in props. When `events` container `onMouseOver` and `onMouseOut` events, they will interfere with the `defaultEvents` on `VictoryTooltip` to correct this, your events prop will need to return the same mutations as `defaultEvents`. [Read about tooltip events here](/guides/tooltips).

## Layout

### Why are the bars in my bar chart overlapping with the axis?

Bars in `VictoryBar` are centered around their corresponding value by default. You can move your bars away from your axis by setting a new domain, adding a `domainPadding`, or changing how bars are aligned relative to their values with the `alignment` prop on `VictoryBar`.

```playground
<div style={{ display: "flex", flexWrap: "wrap" }}>
  <VictoryChart
    domainPadding={{ x: 15 }}
  >
    <VictoryLabel text="domainPadding" x={225} y={30} textAnchor="middle"/>
    <VictoryBar
      style={{ data: { fill: "gold", width: 30 } }}
    />
  </VictoryChart>
  <VictoryChart>
    <VictoryLabel text="alignment" x={225} y={30} textAnchor="middle"/>
    <VictoryBar
      alignment="start"
      style={{ data: { fill: "gold" } }}
    />
  </VictoryChart>
</div>
```


### How can I change the size of my chart?

By default Victory components are rendered within responsive SVGs that preserve the aspect ratio set by the `width` and `height` props. Charts will automatically scale to fit within parent elements while maintaining a set aspect ratio. The size of your chart may be changed by rendering it within a smaller container. The aspect ratio of the chart may be changed by altering the width and height props. The default responsive behavior may also be disabled by setting `responsive={false}` on any Victory container.

```playground
<div style={{ display: "flex", flexWrap: "wrap" }}>
  <VictoryChart style={{ parent: { maxWidth: "50%" } }}>
    <VictoryLabel text="Default Sizing" x={225} y={30} textAnchor="middle"/>
    <VictoryLine/>
  </VictoryChart>
  <VictoryChart style={{ parent: { maxWidth: "50%" } }}
    width={600} height={200}
  >
    <VictoryLabel text="New Aspect Ratio" x={225} y={30} textAnchor="middle"/>
    <VictoryLine/>
  </VictoryChart>
  <VictoryChart
    width={600} height={200}
    containerComponent={<VictoryContainer responsive={false}/>}
  >
    <VictoryLabel text="Non-responsive" x={225} y={30} textAnchor="middle"/>
    <VictoryLine/>
  </VictoryChart>
</div>
```

## Containers and Behaviors

### How can I use containers in Victory?

Victory renders charts into top-level container components. The most basic container is `VictoryContainer`. It is responsible for rendering children into a responsive svg, and providing a portal component for rendering tooltips, or any other elements that should be rendered above everything else. Other Victory container, such as `VictoryZoomContainer` and `VictoryCursorContainer` provide an interactive layer for the chart. These containers perform all the same functions as `VictoryContainer` in addition to their specialized functions.

- [`VictoryZoomContainer`](/docs/victory-zoom-container): Adds pan and zoom functionality to a chart
- [`VictoryVoronoiContainer`](/docs/victory-voronoi-container): Associates mouse position with the nearest data points, and is useful for tooltips and other hover interactions
- [`VictorySelectionContainer`](/docs/victory-selection-container): Adds the ability to select points within a region
- [`VictoryBrushContainer`](/docs/victory-brush-container): Adds a moveable highlighted region to charts
- [`VictoryCursorContainer`](/docs/victory-cursor-container): Renders a cursor line and label that follows mouse position.

To use one of these containers, change the `containerComponent` prop on your _top-level_ Victory component. *Note:* Containers are not rendered when `standalone` is set to `false`.

```playground
<VictoryChart
  domainPadding={{ y: 10 }}
  containerComponent={
    <VictoryZoomContainer/>
  }
>
  <VictoryScatter
    y={(datum) => Math.sin(2 * Math.PI * datum.x)}
  />
</VictoryChart>
```

### How can I make a chart with voronoi tooltips that can also zoom?

Victory includes a `createContainer` helper that is used to create hybrid containers. `createContainer` can be used to create a new container with behaviors from two existing Victory containers. [Read more about `createContainer` here](/docs/create-container).




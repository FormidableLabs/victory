[![Travis Status][trav_img]][trav_site]

VictoryChart
=============

VictoryChart is an intelligent, flexible charting component for React. VictoryChart makes it easy to plot several datasets on the same chart, plot pure math functions, and overlay several types of charts. It relies on d3 for some of the math, but leaves all of the rendering to React. This component is built from several other components on the Victory ecosystem, including [VictoryAxis](http://github.com/formidablelabs/victory-axis), [VictoryLine](http://github.com/formidablelabs/victory-line), [VictoryScatter](http://github.com/formidablelabs/victory-scatter), and [VictoryBar](http://github.com/formidablelabs/victory-bar).  More chart types coming soon!

## API

There are several configuration options for Victory Scatter, but if only the `data` is prop is provided, a sensible scatter will still be rendered.

### Props

All props are optional, but you wont get very far without passing in some data.

### chartType

This prop specifies how data should be plotted. Currently supported types are 
"line", "scatter", "bar", and "stackedBar".  This "global" chart type can be overridden by passing a different type in with the `dataAttributes` or `yAttributes` props

#### data

The data prop specifies the data to be plotted. Data should be in the form of an array of data points, or an array of arrays of data points for multiple datasets. Each data point should be an object with x and y properties. Other properties may be added to the data point object, such as label, color, size, symbol or opacity. These properties will be interpreted and applied to the individual data point in chart types that support them.

examples:

```
data={[
  {x: new Date(1982, 1, 1), y: 125, color: "red", symbol: "plus"},
  {x: new Date(1987, 1, 1), y: 257, color: "blue", symbol: "star"},
  {x: new Date(1993, 1, 1), y: 345, color: "green", symbol: "circle"},
]}

data={[
  [{x: 5, y: 3}, {x: 4, y: 2}, {x: 3, y: 1}],
  [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}],
  [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
]}
```

### dataAttributes

The dataAttributes prop describes how a data set should be plotted and styled.
This prop can be given as an object, or an array of objects. If this prop is
given as an array of objects, the properties of each object in the array will
be applied to the data points in the corresponding array of the data prop.

examples:

```
dataAttributes={{type: "scatter", symbol: "square", color: "blue"}}

dataAttributes={[
  {type: "line", stroke: "green", width: 3}, 
  {type: "bar", color: "orange"}
]}

```

### x

The x prop provides another way to supply data for chart to plot. This prop can be given as an array of values or an array of arrays, and it will be plotted against whatever y prop is provided. If no props are provided for y, the values in x will be plotted as the identity function (x) => x.

examples: 

```
x={["apples", "oranges", "bananas"]} 

x={[
  [1, 2, 3], 
  [2, 3, 4], 
  [4, 5, 6]
]}
```

### y

The y prop provides another way to supply data for chart to plot. This prop can be given as a function of x, or an array of values, or an array of functions and / or values. If x props are given, they will be used in plotting (x, y) data points. If x props are not provided, a set of x values evenly spaced across the x domain will be calculated, and used for plotting data points.

examples:

```
y={(x) => x + 5} 

y={[1, 2, 3]}

y={[
  (x) => x, 
  [2, 3, 4], 
  (x) => Math.sin(x)
]}
```

### yAttributes
The yAttributes prop describes how a data set should be plotted and styled.
This prop behaves identically to the dataAttributes prop, but is applied to
any data provided via the y prop

examples:

```
yAttributes={{type: "scatter", symbol: "square", color: "blue"}}

yAttributes={[
  {type: "line", stroke: "green", width: 3}, 
  {type: "bar", color: "orange"}
]}
```

### samples

The samples prop specifies how many individual points to plot when plotting
y as a function of x. Samples is ignored if x props are provided instead.

### interpolation

The interpolation prop determines how data points should be connected when plotting a line. Supported options are: "linear", "linear-closed", "step", "step-before", "step-after", "basis", "basis-open", "basis-closed", "bundle", "cardinal", "cardinal-open", "cardinal-closed", and "monotone"
 
### scale

The scale prop determines which scales your chart should use. This prop can be
given as a function, or as an object that specifies separate functions for x and y. Supported scales are d3 linear scales, time scales, power scales, and log scales. d3 ordinal scales are not supported, but non-numeric data is automatically handled and range band like behavior is supported via the `categories` prop.

examples:

```
scale={() => d3.time.scale()}

scale={{x: () => d3.scale.linear(), y: () => d3.scale.log()}}
```

### domain

The domain prop describes the range of values your chart will include. This prop can be given as a array of the minimum and maximum expected values for your chart, or as an object that specifies separate arrays for x and y.
If this prop is not provided, a domain will be calculated from data, or other available information.

examples:

```
domain={[-1, 1]}

domain={{x: [0, 100], y: [0, 1]}}
```

### range

The range prop describes the range of pixels your chart will cover. This prop can begiven as a array of the minimum and maximum expected values for your chart, or as an object that specifies separate arrays for x and y.
If this prop is not provided, a range will be calculated based on the height,
width, and margin provided in the style prop, or in default styles. It is usually a good idea to let the chart component calculate its own range.

examples:

```
range={[0, 500]} 

range={{x: [0, 500], y: [500, 300]}}
```

### containerElement

The containerElement prop specifies which element the compnent will render.
For standalone charts, the containerElement prop should be "svg". If you need to compose a chart with some other svg element, the containerElement prop should be "g", and will need to be rendered within an svg tag.

### style

The style prop specifies styles for your chart. Victory Chart relies on Radium,
so valid Radium style objects should work for this prop, however height, width, and margin are used to calculate range, and need to be expressed as a number of pixels

example:

```
style={{fontSize: 15, fontFamily: "helvetica", width: 500, height: 300}}
```

### axisLabels

The axisLabels prop specifies the labels for your axes. It should be given as
an object with x and y properties.

example: `{x: "years", y: "cats"}`

### axisOrentation

The axisOrientation prop specifies the layout of your axes. It should be given asan object with x and y properties. Currently, Victory Chart only suppotys vertical y axes and horizontal x axes

example: `{x: "bottom", y: "right"}`

### showGridLines

The showGridLines prop specifies whether or not to draw grid lines for a particular axis. It should be given as an object with x and y properties.
Note: grid lines for a particular axis extend perpendicularly from that axis.

example: `{x: false, y: true}`

### tickValues

The tickValues prop explicity specifies which ticks values to draw on each axis. This prop should be given as an object with arrays specified for x and y

example: `{x: ["apples", "bananas", "oranges"] y: [2, 4, 6, 8]}`

### tickFormat

The tickFormat prop specifies how tick values should be expressed visually.
This prop should be given as an object with functions specified for x and y

example: `{x: () => d3.time.format("%Y"), y: (x) => x.toPrecision(2)}`

### tickCount

The tickCount prop specifies how many ticks should be drawn on each axis if
ticksValues are not explicitly provided. This prop shouls be given as an object
with numbers specified for x and y

@example `{x: 7, y: 5}`

### axisStyle

The axisStyle prop specifies styles scoped only to the axis lines. Victory Chart relies on Radium, so valid Radium style objects should work for this prop.

example: `{strokeWidth: 2, stroke: "black"}`

### tickStyle

The tickStyle prop specifies styles scoped only to the axis ticks. Victory Chart relies on Radium, so valid Radium style objects should work for this prop.

example: `{fontSize: 15, fontFamily: "helvetica"}``

### gridStyle

The gridStyle prop specifies styles scoped only to the grid lines. Victory Chart relies on Radium, so valid Radium style objects should work for this prop.
example: `{strokeWidth: 1, stroke: "#c9c5bb"}`

### barWidth

The barWidth prop specifies the width in number of pixels for bars rendered in a bar chart.

### barPadding

The barPadding prop specifies the padding in number of pixels between bars
rendered in a bar chart.

### domainPadding

The domainPadding prop specifies a number of pixels of padding to add to the beginning and end of a domain. This prop is useful for explicitly spacing ticks farther from the origin to prevent crowding. This prop should be given as an object with numbers specified for x and y.

example: `{x: 20, y: 0}`

### categories

The barCategories prop specifies the categories for a bar chart. This prop should be given as an array of string values, numeric values, or arrays. When this prop is given as an array of arrays, the minimum and maximum values of the arrays define range bands, allowing numeric data to be grouped into segments.

examples:

```
categories={["dogs", "cats", "mice"]}

categories={[
  [0, 5], 
  [5, 10], 
  [10, 15]
]}
```

### animate
The animate prop determines whether the chart should animate with changing data. This prop can be given as a boolean, or an object with boolean values specified for each supported chart type.

example: `{line: true, scatter: true, axis: false, bar: true}`

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/formidableLabs/victory-chart.svg
[trav_site]: https://travis-ci.org/formidableLabs/victory-chart


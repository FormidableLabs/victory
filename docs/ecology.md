Victory Pie
=============

`victory-pie` draws an SVG pie or donut chart with [React](https://github.com/facebook/react) and [D3](https://github.com/mbostock/d3). Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [victory-animation](https://github.com/FormidableLabs/victory-animation).

## Examples

The plain component has baked-in sample data, style, angle, and sort defaults, so rendering the pie with no custom properties, like so:

``` playground
<VictoryPie/>
```

Labels, by default, are placed at the centroid of each pie slice, which can look a little strange sometimes. Apply `padding` and `labelPadding` like so:

``` playground
<VictoryPie
  labelPadding={180}
  padding={30}/>
```

But really, who wants a pie chart? Specify an `innerRadius` greater than 0 to turn the pie into a donut:

``` playground
<VictoryPie innerRadius={140}/>
```

All default styles (`borderColor`, `borderWidth`, `fontColor`, `fontFamily`, `fontSize`, `fontWeight`, `height`,  `innerRadius`, `labelPadding`, `padding`, `sliceColors`, `width`), angles (`startAngle`, `endAngle`, `padAngle`) and sorting (`sort`) can be overridden by specifying your own props:

``` playground
<VictoryPie
  fontSize={16}
  fontWeight={200}
  innerRadius={80}/>
```

Similarly,

``` playground
<VictoryPie
  borderWidth={2}
  fontColor="white"
  innerRadius={140}/>
```

Want a half donut? Specify a `startAngle` and `endAngle`:

``` playground
<VictoryPie
  borderWidth={2}
  endAngle={90}
  fontColor="white"
  innerRadius={140}
  startAngle={-90}/>
```

Specify a `padAngle` to add space between adjacent slices:

``` playground
<VictoryPie
  borderWidth={2}
  endAngle={90}
  fontColor="white"
  innerRadius={140}
  padAngle={5}
  startAngle={-90}/>
```

Custom data (age vs population) and colors:

``` playground
<VictoryPie
  borderWidth={2}
  data={[
    {x: "<5", y: 6279},
    {x: "5-13", y: 9182},
    {x: "14-17", y: 5511},
    {x: "18-24", y: 7164},
    {x: "25-44", y: 6716},
    {x: "45-64", y: 4263},
    {x: "≥65", y: 7502}
  ]}
  fontColor="white"
  fontWeight={200}
  innerRadius={150}
  sliceColors={[
    "#D85F49",
    "#F66D3B",
    "#D92E1D",
    "#D73C4C",
    "#FFAF59",
    "#E28300",
    "#F6A57F"
  ]}/>
```

Set the `sort` prop to `"ascending"`, `"descending"`, or your own comparator:

``` playground
<VictoryPie
  borderWidth={2}
  data={[
    { x: "<5", y: 4577 },
    { x: "5-13", y: 5661 },
    { x: "14-17", y: 3038 },
    { x: "18-24", y: 8151 },
    { x: "25-44", y: 7785 },
    { x: "45-64", y: 1911 },
    { x: "≥65", y: 7665 }
  ]}
  fontColor="white"
  fontWeight={200}
  innerRadius={150}
  sliceColors={[
    "#D85F49",
    "#F66D3B",
    "#D92E1D",
    "#D73C4C",
    "#FFAF59",
    "#E28300",
    "#F6A57F"
  ]}
  sort="descending"/>
```

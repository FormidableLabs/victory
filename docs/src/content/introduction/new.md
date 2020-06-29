---
id: 1
title: New Features
category: introduction
slug: new
type: docs
scope:
  - range
  - sampleData
---

# New Features

Victory is actively developed. You can read about some of our newest feature here. For more information on improvements and bug fixes, check out our [changelog](https://github.com/FormidableLabs/victory/blob/master/CHANGELOG.md).

## VictoryHistogram

We've added a new charting component to allow you to easily create histogram charts. With [`VictoryHistogram`](/docs/victory-histogram) you can create beautiful and interactive histograms.

```playground
<VictoryChart>
  <VictoryHistogram
    style={{ data: { fill: '#F1737F' }}}
    cornerRadius={3}
    data={[
      { x: 0 },
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 2 },
      { x: 2 },
      { x: 3 },
      { x: 4 },
      { x: 7 },
      { x: 7 },
      { x: 10 }
    ]}
  />
</VictoryChart>
```

Using the [`bins`](/docs/victory-histogram#bins) prop, you have flexibility in how your data is binned, allowing you to specify specific bin ranges, or an approximate count of how many bins you want.

```playground
<VictoryChart>
  <VictoryHistogram
    style={{ data: { fill: '#F1737F' }}}
    cornerRadius={3}
    bins={[0, 2, 8, 15]}
    data={[
      { x: 0 },
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 1 },
      { x: 2 },
      { x: 2 },
      { x: 3 },
      { x: 4 },
      { x: 7 },
      { x: 7 },
      { x: 10 }
    ]}
  />
</VictoryChart>
```

You can stack `VictoryHistogram` too, just wrap it in [`VictoryStack`](/docs/victory-stack)!

```playground
<VictoryChart>
  <VictoryStack colorScale="qualitative">
    <VictoryHistogram
      data={[
        { x: 0 },
        { x: 1 },
        { x: 1 },
        { x: 1 },
        { x: 1 },
        { x: 2 },
        { x: 2 },
        { x: 3 },
        { x: 4 },
        { x: 7 },
        { x: 7 },
        { x: 10 }
      ]}
    />

    <VictoryHistogram
      cornerRadius={3}
      data={[
        { x: 0 },
        { x: 1 },
        { x: 1 },
        { x: 1 },
        { x: 2 },
        { x: 2 },
        { x: 3 },
        { x: 4 },
        { x: 5 },
        { x: 7 },
        { x: 8 }
      ]}
    />
  </VictoryStack>
</VictoryChart>
```

## Backgrounds for VictoryChart

We wanted to make it easier to style the chart backgrounds, so we added a [`backgroundComponent`](/docs/victory-chart#backgroundcomponent) for `VictoryChart`. Now, when you include `background` styles, `VictoryChart` will render [`Background`](/docs/victory-primitives#background), a styled element that fills the area between your axes.

Try it out!

```playground
<VictoryChart
  style={{
    background: { fill: "lavender" }
  }}
>
  <VictoryScatter />
</VictoryChart>
```

Polar charts are also supported, with `Background` rendering a `circle` instead of a `rect` element`:

```playground
<div>
  <svg>
    <defs>
      <radialGradient id="radial_gradient">
        <stop offset="10%" stopColor="red" />
        <stop offset="95%" stopColor="gold" />
        />
      </radialGradient>
    </defs>
  </svg>

  <VictoryChart
    polar
    style={{
      background: { fill: "url(#radial_gradient)" }
    }}
  >
    <VictoryScatter />
    <VictoryPolarAxis
      style={{
        tickLabels: { angle: 0 }
      }}
    	tickValues={[0, 90, 180, 270]}
    />
  </VictoryChart>
</div>
```

As with other components Victory renders, you can add props directly to `Background`, or create your own custom `backgroundComponent`.

```playground_norender
const CustomBackground = props => {
  return (
    <image
      href={"https://i.picsum.photos/id/906/525/300.jpg"}
      {...props}
    />
  );
};

const Matterhorn = props => {
  return (
    <VictoryChart
      domain={{ y: [2000, 5000]}}
      style={{ background: { opacity: 0.8} }}
      backgroundComponent={<CustomBackground />}
    >
      <VictoryLine
      	data={[
        	{ x: 0, y: 2500 },
          { x: 1.25, y: 2600 },
          { x: 1.8, y: 3000 },
          { x: 2.7, y: 3300 },
          { x: 3.1, y: 3800 },
          { x: 3.25, y: 4000 },
          { x: 3.5, y: 4000 },
          { x: 4, y: 4478, label: "4,478m" },
          { x: 4.5, y: 4300. },
          { x: 5.1, y: 4200 },
          { x: 6.3, y: 3500 },
          { x: 6.75, y: 3400 },
          { x: 7, y: 3300 },
          { x: 7.25, y: 3200 },
          { x: 9, y: 2900 },
          { x: 12, y: 2000 }
        ]}
        style={{
         data: { strokeWidth: 4 }
       }}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  )
};

ReactDOM.render(<Matterhorn/>, mountNode);
```

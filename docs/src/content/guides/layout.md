---
id: 7
title: Layout
category: guides
scope: null
---
# Layout

## Default Layout

Victory components have default `width`, `height`, and `padding` props defined in the default [grayscale theme][].

Victory renders components into responsive `svg` containers by default. Responsive containers will have a `viewBox` attribute set to `viewBox={"0 0 width, height"}` and styles `width: "100%" height: "auto"` in addition to any styles provided via props. Because Victory renders responsive containers, the `width` and `height` props do not determine the width and height of the chart in number of pixels, but instead define an aspect ratio for the chart. The exact number of pixels will depend on the size of the container the chart is rendered into.

## SVG Render Order

Victory renders svg elements, so there is no concept of z-index. Instead the render order of components determines which elements will appear above others. Changing the order of rendered components can significantly alter the appearance of a chart. Compare the following charts. The only difference between the two is the order of the children in `VictoryChart`.

```playground
  <div>
    <VictoryChart>
      <VictoryScatter
        y={(data) => Math.sin(2 * Math.PI * data.x)}
        samples={25}
        size={5}
        style={{ data: { fill: "tomato" }}}
      />
      <VictoryLine
        style={{ data: { stroke: "orange" }}}
        y={(data) => Math.sin(2 * Math.PI * data.x)}
      />
      <VictoryAxis/>
      <VictoryAxis dependentAxis/>
    </VictoryChart>

    <VictoryChart>
      <VictoryAxis/>
      <VictoryAxis dependentAxis/>
      <VictoryLine
        style={{ data: { stroke: "orange" }}}
        y={(data) => Math.sin(2 * Math.PI * data.x)}
      />
      <VictoryScatter
        y={(data) => Math.sin(2 * Math.PI * data.x)}
        samples={25}
        size={5}
        style={{ data: { fill: "tomato" }}}
      />
    </VictoryChart>
  </div>
```


## VictoryPortal

Some components, such as tooltips, should _always_ render above others. Use [`VictoryPortal`][] to render components in a top level container so that they appear above all other elements. `VictoryTooltip` uses `VictoryPortal`, by default, but any component may be wrapped in `VictoryPortal` to alter its rendering.

*caveats:* `VictoryPortal` will not work with components that are not rendered within `VictoryContainer`.

```playground
  <VictoryChart domainPadding={40}>
    <VictoryStack
      colorScale={["gold", "orange", "tomato"]}
      style={{
        data: { width: 30 },
        labels: { padding: -20 }
      }}
      labelComponent={
        <VictoryPortal>
          <VictoryLabel/>
        </VictoryPortal>
      }
    >
      <VictoryBar
        data={[
          {x: 1, y: 3, label: "C"},
          {x: 2, y: 4, label: "C"},
          {x: 3, y: 2, label: "C"}
        ]}
      />
      <VictoryBar
        data={[
          {x: 1, y: 3, label: "B"},
          {x: 2, y: 4, label: "B"},
          {x: 3, y: 2, label: "B"}
        ]}
      />
      <VictoryBar
        data={[
          {x: 1, y: 3, label: "A"},
          {x: 2, y: 4, label: "A"},
          {x: 3, y: 2, label: "A"}
        ]}
      />
    </VictoryStack>
    <VictoryAxis/>
  </VictoryChart>
```


## Altering VictoryContainer

Responsive containers are not appropriate for every application, so Victory provides a couple of options for rendering static containers. The easiest way to render a static container rather than a responsive one is by setting the `responsive` prop to false directly on the `containerComponent` instance.

```playground

<VictoryChart height={200} width={300}
  containerComponent={<VictoryContainer responsive={false}/>}
>
  <VictoryLine y={(data) => Math.sin(2 * Math.PI * data.x)}/>
</VictoryChart>

```


## Rendering components in custom containers

To render a Victory component in a custom container set the `standalone` prop on the component to false. The component will render a `g` tag rather than an `svg` tag.

```playground
<svg viewBox="0 0 400 400" >
  <VictoryPie
    standalone={false}
    width={400} height={400}
    data={[
      {x: "A", y: 33},
      {x: "B", y: 33},
      {x: "C", y: 33}
    ]}
    innerRadius={70} labelRadius={100}
    style={{ labels: { fontSize: 20, fill: "white"}}}
  />
  <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3}/>
  <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3}/>
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={200} y={200}
    style={{fontSize: 30}}
    text="Label"
  />
</svg>
```

*caveats:* `VictoryPortal` will not work with components that are not rendered within `VictoryContainer`.

[grayscale theme]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/grayscale.js
[`VictoryPortal`]: /docs/victory-portal

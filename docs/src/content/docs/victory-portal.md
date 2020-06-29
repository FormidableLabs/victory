---
id: 20
title: VictoryPortal
category: more
type: docs
scope: null
---

# VictoryPortal

`VictoryPortal` is a wrapper component that renders a child in a top-level [Portal][] element within [VictoryContainer][]. This is useful in instances where elements should always be rendered above others, like tooltips and labels. If a Portal element is not found, `VictoryPortal` will render its child in place.

## children

`type: element`

`VictoryPortal` takes a single `children`, and renders it in a top level portal element. Any additional props passed to `VictoryPortal` will be spread onto the child. In the following example, the `labelComponent` passed to the first series of bars has been wrapped in `VictoryPortal`. The resulting labels will be rendered in a top-level portal container, and will not be overlapped by subsequent data series, as they otherwise would have.

```playground
<VictoryChart domainPadding={{ x: 50 }}>
  <VictoryGroup offset={15}>
    <VictoryBar
      labels={["apples", "bananas", "cherries"]}
      style={{
        labels: { fontSize: 20, fill: "tomato" }
      }}
      labelComponent={<VictoryPortal><VictoryLabel/></VictoryPortal>}
      data={[{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 5}]}
    />
    <VictoryBar
      data={[{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 7}]}
    />
    <VictoryBar
      data={[{x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 9}]}
    />
  </VictoryGroup>
</VictoryChart>

```

## groupComponent

`type: element`

The `groupComponent` prop takes a component instance which will be used to create a group element for `VictoryPortal` to render its child component into. This prop defaults to a `<g>` tag.

[victorycontainer]: /docs/victory-container
[portal]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-portal/portal.js

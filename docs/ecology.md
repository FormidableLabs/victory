VictoryLabel
============

VictoryLabel is a text component that provides several enhancements over SVG’s `<text>` element.

## Features

### Optional Props

By default, VictoryLabel behaves just like any other text element you’re used to.

```playground
<svg>
  <VictoryLabel verticalAnchor="start">
    Welcome!
  </VictoryLabel>
</svg>
```

### Multiline Labels

Multiple lines are positioned how you’d expect and account for the given `lineHeight`. Note that since JSX (like HTML) collapses whitespace, you’ll need to wrap your string in `{` and `}` so that your newlines come through.

```playground
<svg>
  <VictoryLabel x={50} y={10}
    textAnchor="middle"
    verticalAnchor="start"
    lineHeight={1.5}>
    {"data viz \n is \n fun!"}
  </VictoryLabel>
</svg>
```

### Flexible Positioning

In addition to `textAnchor`, VictoryLabel also supports `verticalAnchor`. We use this to position the text relative to `y`, unlike SVG which (inconveniently) always puts the baseline of the text at `y`.

```playground
<svg width="210" height="210">
  <circle cx={10} cy={10} r={3} fill="red"/>
  <VictoryLabel x={10} y={10}
    textAnchor="start"
    verticalAnchor="start">
    top left
  </VictoryLabel>

  <circle cx={100} cy={100} r={3} fill="red"/>
  <VictoryLabel x={100} y={100}
    textAnchor="middle"
    verticalAnchor="middle">
    center
  </VictoryLabel>

  <circle cx={200} cy={200} r={3} fill="red"/>
  <VictoryLabel x={200} y={200}
    textAnchor="end"
    verticalAnchor="end">
    bottom right
  </VictoryLabel>
</svg>
```

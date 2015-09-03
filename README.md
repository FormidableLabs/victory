[![Travis Status][trav_img]][trav_site]

##TODO: write an actual README!

These are the props
```
style: React.PropTypes.node,
  data: React.PropTypes.oneOfType([ // maybe this should just be "node"
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        x: React.PropTypes.any,
        y: React.PropTypes.any
      })
    ),
    React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.shape({
          x: React.PropTypes.any,
          y: React.PropTypes.any
        })
      )
    )
  ]),
  dataAttributes: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.arrayOf(React.PropTypes.object)
  ]),
  x: React.PropTypes.array,
  y: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func
  ]),
  yAttributes: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.arrayOf(React.PropTypes.object)
  ]),
  domain: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({
      x: React.PropTypes.array,
      y: React.PropTypes.array
    })
  ]),
  range: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({
      x: React.PropTypes.arrayOf(React.PropTypes.number),
      y: React.PropTypes.arrayOf(React.PropTypes.number)
    })
  ]),
  scale: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.shape({
      x: React.PropTypes.func,
      y: React.PropTypes.func
    })
  ]),
  samples: React.PropTypes.number,
  interpolation: React.PropTypes.oneOf([
    "linear",
    "linear-closed",
    "step",
    "step-before",
    "step-after",
    "basis",
    "basis-open",
    "basis-closed",
    "bundle",
    "cardinal",
    "cardinal-open",
    "cardinal-closed",
    "monotone"
  ]),
  axisOrientation: React.PropTypes.shape({
    x: React.PropTypes.oneOf(["top", "bottom"]),
    y: React.PropTypes.oneOf(["left", "right"])
  }),
  showGridLines: React.PropTypes.shape({
    x: React.PropTypes.bool,
    y: React.PropTypes.bool
  }),
  tickValues: React.PropTypes.shape({
    x: React.PropTypes.arrayOf(React.PropTypes.any),
    y: React.PropTypes.arrayOf(React.PropTypes.any)
  }),
  tickFormat: React.PropTypes.shape({
    x: React.PropTypes.func,
    y: React.PropTypes.func
  }),
  tickCount: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  axisStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  tickStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  gridStyle: React.PropTypes.shape({
    x: React.PropTypes.node,
    y: React.PropTypes.node
  }),
  animate: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({
      line: React.PropTypes.bool,
      scatter: React.PropTypes.bool,
      axis: React.PropTypes.bool
    })
  ]),
  containerElement: React.PropTypes.oneOf(["svg", "g"])
```

Victory Chart
=============

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/formidableLabs/victory-chart.svg
[trav_site]: https://travis-ci.org/formidableLabs/victory-chart


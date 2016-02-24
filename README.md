[![Travis Status][trav_img]][trav_site]
![](https://badge-size.herokuapp.com/FormidableLabs/victory-chart/master/dist/victory-chart.min.js?compression=gzip)

VictoryChart
=============

A flexible charting component for React. VictoryChart composes other victory components into reusable charts. Acting as a coordinator rather than a stand-alone component, VictoryChart reconciles props such as `domain` and `scale` for child components, and provides a set of sensible defaults.

This component works with:

- [VictoryAxis](http://github.com/formidablelabs/victory-axis)
- [VictoryLine](http://github.com/formidablelabs/victory-line)
- [VictoryScatter](http://github.com/formidablelabs/victory-scatter)
- [VictoryBar](http://github.com/formidablelabs/victory-bar)
- _More chart types coming soon!_


## API Documentation
Detailed documentation and interactive examples can be found at http://victory.formidable.com/docs/victory-chart/

## Development

```sh
# Run the demo app server
$ npm start

# Open the demo app
$ open http://localhost:3000

# Run tests
$ npm test
```

For more on the development environment, see [DEVELOPMENT](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/DEVELOPMENT.md) in the project builder archetype.

## Contributing

Please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/CONTRIBUTING.md) in the project builder archetype.

## _IMPORTANT_

This project is in a pre-release state. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-chart.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-chart

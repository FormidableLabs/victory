[![Travis Status][trav_img]][trav_site]
![](https://badge-size.herokuapp.com/FormidableLabs/victory-chart/master/dist/victory-chart.min.js?compression=gzip)

VictoryChart
=============

A flexible charting component for React. VictoryChart composes other victory components into reusable charts. Acting as a coordinator rather than a stand-alone component, VictoryChart reconciles props such as `domain` and `scale` for child components, and provides a set of sensible defaults.

VictoryChart includes:

- [VictoryAxis](http://formidable.com/open-source/victory/docs/victory-axis)
- [VictoryArea](http://formidable.com/open-source/victory/docs/victory-area)
- [VictoryBar](http://formidable.com/open-source/victory/docs/victory-bar)
- [VictoryCandlestick](http://formidable.com/open-source/victory/docs/victory-candlestick)
- [VictoryErrorBar](http://formidable.com/open-source/victory/docs/victory-errorbar)
- [VictoryLine](http://formidable.com/open-source/victory/docs/victory-line)
- [VictoryScatter](http://formidable.com/open-source/victory/docs/victory-scatter)

## API Documentation
Detailed documentation and interactive examples can be found at http://formidable.com/open-source/victory/docs/victory-chart

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

Please review our [Code of Conduct](https://github.com/FormidableLabs/builder-victory-component/blob/master/CONTRIBUTING.md#contributor-covenant-code-of-conduct) before contributing.

For a detailed contribution guide, please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/CONTRIBUTING.md) in the project builder archetype.

## Caveats

Victory requires npm v3 and Node > 0.10 for development and git installs

## _IMPORTANT_

This project is in a pre-release state. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-chart.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-chart

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

## Requirements
Projects using Victory should also depend on [React][] and [prop-types][].

## Issues
To make it easier to manage issues across all of Victory, we have disabled issues on this repo. [Please open issues in the main victory repo instead](https://github.com/FormidableLabs/victory/issues). You can track our progress on issues [here](https://github.com/FormidableLabs/victory/projects/1)


## Development

```sh
# Run the demo app server
$ npm start

# Open the demo app
$ open http://localhost:3000

# Run tests
$ npm test
```

### Multi-repo development

Victory uses [`lank`](https://github.com/FormidableLabs/lank) for multi-repo development. Use a lank workflow to test changes in victory dependencies. Here's an example of setting up lank to test changes in `victory-core` from `victory-chart`

**First, make sure that all of your Victory repos are _siblings_ in the same directory**

```sh
# Install lank globally
$ npm install -g lank
```
Victory repos are already configured with appropriate `.lankrc` and lank scripts. To test changes in `victory-core` from `victory-chart`:

```sh
# Run all commands from the root of `victory-chart`
$ cd victory-chart

# Run `lank link` to remove `victory-core` from node_modules
$ lank link

# Watch for changes to lanked repos. Leave this process running in its own terminal window
$ npm run lank-watch

# Run a dev server with your lanked repos. In a new terminal window...
$ npm run lank-run
```

Refresh your browser to pick up changes.

For more on the development environment, see [DEVELOPMENT](https://github.com/FormidableLabs/builder-victory-component-dev/blob/master/DEVELOPMENT.md) in the project builder archetype.

## Contributing

Please review our [Code of Conduct](https://github.com/FormidableLabs/builder-victory-component/blob/master/CONTRIBUTING.md#contributor-covenant-code-of-conduct) before contributing.

For a detailed contribution guide, please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component-dev/blob/master/CONTRIBUTING.md) in the project builder archetype.

**Caveats** git installs using npm 2 may fail in postinstall. If you are consuming Victory via git installs please use npm >=3.0.0

## _IMPORTANT_

This project is in a pre-release state. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!
[React]: https://facebook.github.io/react/
[prop-types]: https://github.com/reactjs/prop-types
[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-chart.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-chart

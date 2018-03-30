[![Travis Status][trav_img]][trav_site]
![](https://badge-size.herokuapp.com/FormidableLabs/victory-pie/master/dist/victory-pie.min.js?compression=gzip)

VictoryPie
=============

`VictoryPie` draws an SVG pie or donut chart with [React][]. Styles and data can be customized by passing in your own values as properties to the component.

## Requirements
Projects using Victory should also depend on [React][] and [prop-types][].

## API Documentation
Detailed documentation and interactive examples can be found at http://formidable.com/open-source/victory/docs/victory-pie.

## Issues
To make it easier to manage issues across all of Victory, we have disabled issues for this repo. [Please open issues in the main victory repo instead](https://github.com/FormidableLabs/victory/issues). You can track our progress on issues [here](https://github.com/FormidableLabs/victory/projects/1)

## Development

```sh
# Run the demo app server
$ npm start

# Open the demo app
$ open http://localhost:3000

# Run tests
$ npm test
```

## Chromatic

Victory uses Chromatic for visual testing. A summary of visual changes is compiled with each PR. Please check for visual changes before merging.

### Multi-repo development

Victory uses [`lank`](https://github.com/FormidableLabs/lank) for multi-repo development. Use a lank workflow to test changes in victory dependencies. Here's an example of setting up lank to test changes in `victory-core` from `victory-pie`

**First, make sure that all of your Victory repos are _siblings_ in the same directory**

```sh
# Install lank globally
$ npm install -g lank
```
Victory repos are already configured with appropriate `.lankrc` and lank scripts. To test changes in `victory-core` from `victory-pie`:

```sh
# Run all commands from the root of `victory-pie`
$ cd victory-pie

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

## _IMPORTANT_

This project is in a pre-release state. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!

**Caveats** git installs using npm 2 may fail in postinstall. If you are consuming Victory via git installs please use npm >=3.0.0

[React]: https://facebook.github.io/react/
[prop-types]: https://github.com/reactjs/prop-types
[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-pie.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-pie

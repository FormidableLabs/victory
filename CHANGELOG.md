# VictoryPie Changelog

## 3.0.0 (2016-05-13)

 - improves consistency for `labelComponent` and `dataComponent` props. Replaces a custom `SliceLabel` component with `VictoryLabel` to make the api more consistent and predictable. **This is a breaking change for custom label components**, as `VictoryLabel` expects a different set of props than the previous `SliceLabel` component. See [VictoryLabel](http://formidable.com/open-source/victory/docs/victory-label) for more detail.

- Functional styles and props are now all evaluated before they are passed as props to `labelComponent` or `dataComponent`, so that custom components will have access to the final values.

- events are bound and partially applied prior to being passed as props to `labelComponent` or `dataComponent`

- it is now possible to specify `angle` and `verticalAnchor` props for` VictoryLabel` via the style object

- event return values are stored differently on state to facilitate interaction between data and labels. **This is a breaking change for events** as event handlers must now return an object with with `data` and/or `labels` keys so that these values may be applied appropriately to data and label elements respectively.

- improved integration tests

## 2.1.0 (2016-04-15)

- Add support for custom data components
- Add support for enter and exit transitions, and add default transitions

## 2.0.0 (2016-03-15)

- Add event handling via an `events` prop
- Update to lodash 4
- Update `d3-shape` to the latest version
- Updates via `builder-victory-component` to support Babel 6
- Provide label text via a `text` prop rather than children

## 1.1.0 (2016-03-01)

- Move Radium to devDependencies
- Fix unmount problems with Demo
- Add `npm start` and `npm test` scripts
- Don't publish source maps to npm
- Don't publish built docs to npm

## 1.0.1 (2016-02-12)

- Use minified file path for gzip size badge
- Update victory-util and victory-label versions

## 1.0.0 (2016-01-30)

- Supports data accessor functions!
[more detail](https://github.com/FormidableLabs/victory/issues/84)
- Application dependencies like `radium` and `lodash` now live in components, not in the Builder archetype. This is a breaking change. https://github.com/FormidableLabs/victory/issues/176
- Extracted shared code into `victory-util`

## 0.3.0 (2016-01-26)

- Upgrade to Radium 0.16.2. This is a breaking change if you're using media queries or keyframes in your components. Please review upgrade guide at https://github.com/FormidableLabs/radium/blob/master/docs/guides/upgrade-v0.16.x.md

## 0.2.0 Alpha (2015-12-16)

Functional styles for data (each pie slice) and labels. Styles may be given as a function of `data`, where data is each data object in the array provided to `props.data`

using d3-modules instead of all of d3

Basic code coverage.

We make no promises about any code prior to this release.

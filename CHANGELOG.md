# VictoryPie Changelog

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

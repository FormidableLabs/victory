# VictoryUtil Changelog

## 4.0.0 (2016-01-29)
- Application dependencies like `lodash` now live in components, not in the Builder archetype. This is a breaking change. https://github.com/FormidableLabs/victory/issues/176

## 3.0.0 (2016-01-29)

- Supports data accessor functions!
[more detail](https://github.com/FormidableLabs/victory/issues/84)

Data
 - `Data.consolidateData(props)` -> `Data.formatDatasets(props)`
 - `Data.createAccessor(key)`

PropTypes
  - `integer`
  - `allOfType` - runs a given prop through an array of validators

## 2.1.0 (2016-1-15)

This tag adds shared methods to VictoryUtil to reduce code repetition in all of the chart ecosystem components (VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter)

Public methods added:

Scale
  - `Scale.getBaseScale(props, axis)`
  - `Scale.getScaleType(props, axis)`
  - `Scale.getScaleFromProps(props, axis)`
  - `Scale.getScaleTypeFromData(props, axis)`

This collection of methods:
  - replaces the `getScale` methods that were used in the chart ecosystem repos
  - adds scale type checking via duck typing d3 scale methods
  - adds support for passing in the scale type as a string _i.e._` "linear"` instead of `d3Scale.linear()`

Domain
  - `Domain.getDomain(props, axis)`
  - `Domain.getDomainFromProps(props, axis)`
  - `Domain.getDomainFromData(dataset, axis)`
  - `Domain.padDomain(domain, props, axis)`

This collection of methods:
- replaces the `getDomain` method in single data series components (VictoryScatter, VictoryLine)
- Adds domain helpers for the more complicated components

Data
 - `Data.getData(props)`
 - `Data.consolidateData(props)`
 - `Data.createStringMap(props, axis)`
 - `Data.getStringsFromCategories(props, axis)`
 - `Data.getStringsFromAxes(props, axis)`
 - `Data.getStringsFromData(props, axis)`
 - `Data.getStringsFromXY(props, axis)`

This collection of methods:
- replaces the `getData` method in single data series components (VictoryScatter, VictoryLine)
- replaces the `consolidateData` method in multi-series data components (VictoryBar)
- replaces the `createStringMap` method for components
- adds string helpers for creating a shared stringMap in VictoryChart

Chart
 - `getPadding(props)`
 - `getRange(props, axis)`
 - `getStyles(props, defaultStyles)`
 - `evaluateProp(prop, data)`
 - `evaluateStyle(style, data)`

This collection of methods:
 - replaces `getRange` and `getPadding` methods across all chart ecosystem components
 - replaces `getStyle` method in components that take style objects in the following form
```
style={{
  parent: {...},
  data: {...},
  labels: {...}
}}
```
- replaces functional style and functional prop support methods `evaluateProp` and  `evaluateStyle` across all chart components

## 2.0.3 Alpha (2015-12-16)

We make no promises about any code prior to this release.

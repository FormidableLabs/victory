# Victory Changelog

## 0.21.5 (2017-08-17)

VictoryCore

- [289](https://github.com/FormidableLabs/victory-core/pull/289) Bugfix: createContainer + containerId
- [287](https://github.com/FormidableLabs/victory-core/pull/287) Allow users to override `touchAction` style in containers
- [286](https://github.com/FormidableLabs/victory-core/pull/286) bugfix: tooltip positioning with `dx` and `dy`

VictoryChart
- [510](https://github.com/FormidableLabs/victory-chart/pull/510) Render axis line under other axis elements

VictoryPie
- [153](https://github.com/FormidableLabs/victory-pie/pull/153) Bugfix for axymmetric padding


## 0.21.4 (2017-08-07)

VictoryCore
- [285](https://github.com/FormidableLabs/victory-core/pull/285) bugfix: tooltips with `activateData`
- [278](https://github.com/FormidableLabs/victory-core/pull/278) Support touch events
- [280](https://github.com/FormidableLabs/victory-core/pull/280) Fix tooltip rendering in VictoryPortal
- [281](https://github.com/FormidableLabs/victory-core/pull/281) bugfix: functional label padding
- [282](https://github.com/FormidableLabs/victory-core/pull/282) bugfix: fix "unknown props on `<g>` tag" warning
- [283](https://github.com/FormidableLabs/victory-core/pull/283) Allow boolean value for animate prop
- [284](https://github.com/FormidableLabs/victory-core/pull/284) Sort arrays by "key" when animating. See [#684](https://github.com/FormidableLabs/victory/issues/684)
- [274](https://github.com/FormidableLabs/victory-core/pull/274) Fixes automatic bar width calculation for horizontal bars
- [275](https://github.com/FormidableLabs/victory-core/pull/275) Adds an optional `containerId` prop for all Victory containers
- [276](https://github.com/FormidableLabs/victory-core/pull/276) Adds `downsample` method for `Data`

VictoryChart
- [504](https://github.com/FormidableLabs/victory-chart/pull/504) bugfix: padding bug in `VictoryCursorContainer`
- [505](https://github.com/FormidableLabs/victory-chart/pull/505) Support touch events on all containers
- [506](https://github.com/FormidableLabs/victory-chart/pull/506) Add `props` argument for `VictoryVoronoiContainer` callbacks
- [507](https://github.com/FormidableLabs/victory-chart/pull/507) bugfix: Support array styles for `VictoryLabel` when it is used as a direct child of `VictoryChart` or other wrappers
- [508](https://github.com/FormidableLabs/victory-chart/pull/508) Add support for `animate` as a boolean prop
- [509](https://github.com/FormidableLabs/victory-chart/pull/509) Add `props` as the last argument for all container callbacks
- [502](https://github.com/FormidableLabs/victory-chart/pull/502) Fix bug in `VictoryZoomContainer`
- [503](https://github.com/FormidableLabs/victory-chart/pull/503) Add downsample option for `VictoryZoomContainer`
- [504](https://github.com/FormidableLabs/victory-chart/pull/504) Fix padding bug in `VictoryCursorContainer`

VictoryPie
- [151](https://github.com/FormidableLabs/victory-pie/pull/151) bugfix: support functional padding for labels
- [152](https://github.com/FormidableLabs/victory-pie/pull/152) Support boolean animate prop

## 0.21.3 (2017-07-24)

VictoryCore
  - [267](https://github.com/FormidableLabs/victory-core/pull/267) Correct single-point domain logic
  - [268](https://github.com/FormidableLabs/victory-core/pull/268) Correct stacked domain logic
  - [269](https://github.com/FormidableLabs/victory-core/pull/269) `VictoryLabel` accepts percentage values for `x` and `y`
  - [270](https://github.com/FormidableLabs/victory-core/pull/270) `VictoryLegend` supports events. Also enforces consistent parent styles as other Victory components. **Breaking style change for VictoryLegend**
  - [272](https://github.com/FormidableLabs/victory-core/pull/272) Aggressive `shouldComponentUpdate` logic for evented Victory components **Breaking change for some components using `addEvents`**

VictoryChart
  - [496](https://github.com/FormidableLabs/victory-chart/pull/496) `VictoryZoomContainer` improvements for real-time, updating data
  - [497](https://github.com/FormidableLabs/victory-chart/pull/497) bugfix: apply `domainPadding` to explicit domains
  - [498](https://github.com/FormidableLabs/victory-chart/pull/498) `VictoryAxis` determines its own default `tickFormat`
  - [499](https://github.com/FormidableLabs/victory-chart/pull/499) Fix label prop merge order for `VictoryVoronoiContainer` labels
  - [500](https://github.com/FormidableLabs/victory-chart/pull/500) Support performance improvements for evented components _e.g._ `VictoryArea`, `VictoryBar` ...

## 0.21.2 (2017-07-13)

Victory:
  - [651](https://github.com/FormidableLabs/victory/pull/651) Support Webpack 3 and ES6 exports

VictoryCore:
  - [266](https://github.com/FormidableLabs/victory-core/pull/266) Support Webpack 3 and ES6 exports
  - [265](https://github.com/FormidableLabs/victory-core/pull/265) Translates `Slice` when an `origin` prop is given

VictoryChart:
  - [495](https://github.com/FormidableLabs/victory-chart/pull/495) Support Webpack 3 and ES6 exports
  - [494](https://github.com/FormidableLabs/victory-chart/pull/494) Ensure that `tickFormat` has access to `tick`, `index`, and `ticks`
  - [491](https://github.com/FormidableLabs/victory-chart/pull/491) Corrects dependent axis for `innerRadius`
  - [490](https://github.com/FormidableLabs/victory-chart/pull/490) Fixes a bug in domain calculation for polar axes
  - [488](https://github.com/FormidableLabs/victory-chart/pull/488) `VictoryZoomContainer` only updates the domain in the dimension it controls
  - [489](https://github.com/FormidableLabs/victory-chart/pull/489) Adds support for `innerRadius` on polar charts

VictoryPie:
  - [149](https://github.com/FormidableLabs/victory-pie/pull/149) Support Webpack 3 and ES6 exports
  - [148](https://github.com/FormidableLabs/victory-pie/pull/148) Translates individual slices rather than an entire group translation for pie and labels

## 0.21.1 (2017-06-29)

Minor bug fixes:

VictoryCore
  - [victory-core/255](https://github.com/FormidableLabs/victory-core/pull/255) style typo
  - [victory-core/257](https://github.com/FormidableLabs/victory-core/pull/257) single point domain calculation bug
  - [victory-core/259](https://github.com/FormidableLabs/victory-core/pull/259) Area render bug
  - [victory-core/260](https://github.com/FormidableLabs/victory-core/pull/260) Area render order
  - [victory-core/515](https://github.com/FormidableLabs/victory/issues/515) Bugfix for ARIA title and desc. Now both have unique IDs.
  - [victory-core/262](https://github.com/FormidableLabs/victory-core/pull/262) Consistent widths for polar bars. **This change may require style adjustments to maintain visual continuity**

VictoryChart
  - [victory-chart/482](https://github.com/FormidableLabs/victory-chart/pull/482) Add `minBubbleSize` prop to `VictoryScatter`
  - [victory-chart/484](https://github.com/FormidableLabs/victory-chart/pull/484) Remove inappropriate interpolation options for `VictoryArea` and `VictoryLine`
  - [victory-chart/487](https://github.com/FormidableLabs/victory-chart/pull/487) Fix a bug in `VictoryPolarAxis` domain calculation




## 0.21.0 (2017-06-06)

  - [victory-core/240](https://github.com/FormidableLabs/victory-core/pull/240) Polar Charts
  - [victory-chart/466](https://github.com/FormidableLabs/victory-chart/pull/466) Polar Charts
  - [victory-chart/475](https://github.com/FormidableLabs/victory-chart/pull/475) Brush and Zoom fixes
  - [victory-chart/476](https://github.com/FormidableLabs/victory-chart/pull/476) Zoom Improvements

**Breaking Changes**
  - Removes default bar width from themes
  - Changes how default bar widths are calculated
  - Changes render methods for `Area`, `Bar` and `Curve` primitives (Breaking change for `victory-native` and others extending primitives)
  - Changes function sigintures for `Selection.getDomainCoordinates` and `Selection.getDataCoordinates` (Breaking change for `victory-native`)

**Overview**
 - Supports polar charts by adding the `polar` prop to charts.
 - Polar charts are supported for `VictoryArea`, `VictoryChart`, `VictoryGroup`, `VictoryLine`, `VictoryScatter` `VictoryStack` and `VictoryVoronoi`
 - Polar charts are supported for `VictoryBar`, but horizontal (radial) bars are not yet supported
 - Polar charts work with `VictoryVoronoiContainer`
 - Polar charts work with `VictorySelectionContainer`, but the dimension prop is not supported for polar selections
 - Polar charts work with `VictoryZoomContainer`, but zooming is limited to centered radial zooming. Panning has no effect.
 - Polar-specific default animations for `VictoryLine` and `VictoryArea`
 - *horizontal polar charts are not yet supported*
 - *`VictoryCandlestick` and `VictoryErrorBar` do not yet work with polar charts*
 - *`VictoryCursorContainer` does not yet work with polar charts*
 - *`VictoryBrushContainer` does not work with polar charts*
 - *`VictoryZoomContainer` has limitations for polar charts*

**Planned additional work**
  - Support for radial bars
  - Support for spider charts (i.e. linear grid lines rather than arcs on polar charts)
  - Support separate theming for polar charts (at least axes)
  - Support for a polar version of `VictoryCursorContainer`
  - Minimal support for polar versions of `VictoryCandleStick` and `VictoryErrorBar` (Elements will be correctly positioned and angled, but path elements will not be altered to reflect curvature, _i.e._ candles will still be `rects` rather than arc paths)
  - Investigate hollow polar charts

**Details**
  - Adds `VictoryPolarAxis` with new props: `axisAngle` `startAngle`, `endAngle`, and `labelPlacement`
  - Adds `polar`, `startAngle`, `endAngle`, and `defaultPolarAxes` props for `VictoryChart`
  - Adds `polar`, `origin`, and `range` props to all chart types.
  - Adds `defaultPolarTransitions` static methods to `VictoryLine` and `VictoryArea`
  - Uses `LabelHelpers` to simplify all `helper-methods`
  - Adds a new `Arc` primitive which is used for polar axes and grid lines
  - Adds `polar` and `origin` props to rendered components (primitives, `VictoryLabel`, `VictoryClipContainer` `VictoryContainer`)
  - Supports radial areas for `Area` and `Curve`. These props have no effect for cartesian charts
  - Adds an `openPath` prop for `Curve`. This prop is used to determine whether radial curves should be closed. Curves are closed by default, but when this prop is set to true they will not be. This prop has no effect for cartesian charts
  - Supports polar bars in the `Bar` primitive. (Angular bars only, radial bars are not yet supported)
  - Adds a `labelPlacement` prop to `VictoryLabel` and `VictoryTooltip`. Values are "parallel", "perpendicular", and "vertical". These flags help to appropriately position labels in polar charts. Polar charts will use "parallel" label placement by default. Cartesian charts will only use "'vertical" placement.
  - Adds support for circular clipPath
  - Adds support for polar animation transitions for continuous chart types. During `onLoad`, all points grow from zero. During `onEnter` and `onExit` new points are added / removed at the location of an adjacent point to keep path interpolation as smooth as possible. This implementation obviates the need for radial clip-path animations for these chart types.
  - `before` and `after` callbacks for `onLoad`, `onEnter` and `onExit` are now called with `datum`, `index`, and `data` instead of only `datum`.
  - Adds `LabelHelpers`
  - Adds helper methods for polar charts


## 0.20.0 (2017-05-24)

**Breaking Changes**
-[victory-chart/471](https://github.com/FormidableLabs/victory-chart/pull/471) Passes the string value of ticks to the `tickFormat` function rather than the associated index. *This may be a breaking change for users who are using categorical data and formatting tick values by index*

**New Features**
-[victory-chart/474](https://github.com/FormidableLabs/victory-chart/pull/474) Adds support for a y0 accessor so that users can have granular control over the baseline of components like `VictoryArea`
-[victory-core/246](https://github.com/FormidableLabs/victory-core/pull/246) Adds an `itemsPerRow` prop to `VictoryLegend` to support automatic legend wrapping

**Minor Changes**
-[victory-chart/472](https://github.com/FormidableLabs/victory-chart/pull/472) Fixes a bug that was causing `VictoryGroup` to override styles on any independent `VictoryLabel` children
-[victory-core/244](https://github.com/FormidableLabs/victory-core/pull/244) Passes missing `datum` and `index` props to `Flyout`
-[victory-chart/250](https://github.com/FormidableLabs/victory-core/pull/250) Audits `shouldComponentUpdate` logic for all primitive components so that changes to optional props like `className` will cause components to re-render.
-[victory-pie/146](https://github.com/FormidableLabs/victory-pie/pull/146) Rounds label positions for `VictoryPie`


## 0.19.1 (2017-05-12)

- [victory-chart/469](https://github.com/FormidableLabs/victory-chart/pull/469) Adds `VictoryCursorContainer`
- [victory-core/241](https://github.com/FormidableLabs/victory-core/pull/241) Adds optional `title` an `desc` props to `VictoryLabel`
- [victory-core/243](https://github.com/FormidableLabs/victory-core/pull/243) Impovements to `VictoryContainer`
  - Automatic `overflow: "visible"` for elements rendered in `VictoryPortal` (tooltips)
  - `VictoryContainer` no longer renders `g` tags (this was causing confusion with evented containers)
  - Default responsive styles are now `width: "100%"` `height: "100%"` (fixes a bug in safari)
  - Changes the merge order for responsive styles so that `width` and `height` attrs may be overridden
- [victory-core/244](https://github.com/FormidableLabs/victory-core/pull/244) adds missing `index` and `datum` props to `Flyout`
- [victory-core/245](https://github.com/FormidableLabs/victory-core/pull/245) fixes `dy` calculation in `VictoryLabel`


## 0.19.0 (2017-05-02)

**BREAKING CHANGE**
- Updates to `react@^15.5.0`
- Uses separate `prop-types` package
- Projects using Victory must also depend on `prop-types`
- Removes `VictoryVoronoiTooltip`

## 0.18.4 (2017-04-04)

- Supports combining container behaviors with the `createContainer` method.
- Individual `combineContainerMixins` are also exported.
- For more detail, see [victory-chart/453](https://github.com/FormidableLabs/victory-chart/pull/453)

## 0.18.3 (2017-03-21)

[victory-chart/447](https://github.com/FormidableLabs/victory-chart/pull/447) Improves performance for container components
- Fixes [#511](https://github.com/FormidableLabs/victory/issues/511)
- Fixes [#526](https://github.com/FormidableLabs/victory/issues/526)

## 0.18.2 (2017-03-15)

Minor bug fixes
-[508](https://github.com/FormidableLabs/victory/issues/508)
-[509](https://github.com/FormidableLabs/victory/issues/509)
-[510](https://github.com/FormidableLabs/victory/issues/510)
-[517](https://github.com/FormidableLabs/victory/issues/517)
-[520](https://github.com/FormidableLabs/victory/issues/520)

## 0.18.1 (2017-03-14)

[518](https://github.com/FormidableLabs/victory/pull/518)
  - Support multi-repo tooling

## 0.18.0 (2017-02-27)
**(VictoryVoronoiContainer)**

**BREAKING CHANGES**
  - `VictoryTooltip` no longer automatically adds the `active` prop to data when hovered. To turn this behavior on, set the new `activateData` boolean prop on `VictoryTooltip`
  - Deprecates `label` in favor of `labels` in `VictoryLine` and `VictoryArea`, allowing individual data labels for these components like in other Victory components. This will be a breaking change for anyone using the `label` prop in `VictoryLine` or `VictoryArea`. Series labels will need to be configured manually.
  - `VictoryZoomContainer` now zooms both x and y dimensions, use the prop `dimension="x"` to return to the old behavior
  - `VictoryZoomContainer` now centers zoom behavior on the mouse position rather than the center of the chart
  - `VictoryZoomContainer` has a minimum zoom level of the extent of the domain / 1000. Set a custom minimum with the `minimumZoom` prop, which takes an object with numeric values for x and/ or y.
  - `VictoryBrushContainer` no longer has `dimension="x"` as the default value.

**Deprecation Notice**
`VictoryVoronoi` and `VictoryVoronoiTooltip` have been replaced by `VictoryVoronoiContainer` and will be deprecated in version 0.20.0

[victory-core/196](https://github.com/FormidableLabs/victory-core/pull/196)
- `VictoryTooltip` no longer automatically adds the `active` prop to data when hovered. To turn this behavior on, set the new `activateData` boolean prop on `VictoryTooltip`
- Adds a `theme` prop to `VictoryContainer` so that custom containers may pick up themes from their parents
- Removes default `title` and `desc` props from `VictoryContainer`
- Adds support for providing `text` as an array for `VictoryLabel`
- Adds support for providing `style` as an array for `VictoryLabel` so that each line of a multi-line label may be styled independently
- Changes how null data values are handled by `Area` and `Curve` primitives
- Adds a `reduceChildren` method to `Helpers` to ensure order consistency when working with nested children

[victory-core/201](https://github.com/FormidableLabs/victory-core/pull/201)
- implements data sorting for all components with a `sortKey` props

[victory-chart/432](https://github.com/FormidableLabs/victory-chart/pull/432)
- Adds `VictoryVoronoiContainer` for hover events (tooltips). `VictoryVoronoiContainer` has several benefits over `VictoryVoronoi` and `VictoryVoronoiTooltip`
  - Supports multi-dataset voronoi
  - Much better performance (voronoi polygons are not actually rendered, so the number of nodes rendered is dramatically lower)
  - Supports multi-data tooltips
  - Supports rectangular selections with a dimension prop
    _i.e._ `dimension="x"` creates vertical hover areas for every unique x value in all child data
- Deprecates `label` in favor of `labels` in `VictoryLine` and `VictoryArea`, allowing individual data labels for these components like in other Victory components. This will be a breaking change for anyone using the `label` prop in `VictoryLine` or `VictoryArea`. Series labels will need to be configured manually
- Changes how null values are handled in `VictoryArea`, and groups all line and area segments (i.e. split by null values) into the same `eventKey`, so that they operate as a single line for the purposes of events.

[victory-chart/438](https://github.com/FormidableLabs/victory-chart/pull/438)
- Supports x and y dimension zooming in `VictoryZoomContainer`
- Adds a `minimumZoom` prop for `VictoryZoomContainer`
- Zooming centers on mouse position rather than in the center of the chart

[victory-core/207](https://github.com/FormidableLabs/victory-core/pull/207)
- Adds a `translateY` prop for `ClipPath` to support x, y zoom behavior
- Removes default `clipPadding` in `ClipPath`

## 0.17.0 (2017-02-05)

- [victory-core/195](https://github.com/FormidableLabs/victory-core/pull/195)
  - Fixes null event state bug
- [victory-chart/431](https://github.com/FormidableLabs/victory-chart/pull/431)
  - Sets a maximum amount of scale per zoom event for smoother interaction with fast onWheel events

## 0.16.1 (2017-02-03)

- [victory-chart/429](https://github.com/FormidableLabs/victory-chart/pull/429)
- Throttles `onWheel` and `onMouseMove` events on Victory container components
- Exports container event helpers

## 0.16.0 (2017-01-30)

**This release includes major breaking changes related to `VictoryZoom`**

- [victory-core/189](https://github.com/FormidableLabs/victory-core/pull/189) and [191](https://github.com/FormidableLabs/victory-core/pull/190)
  - Adds `VictoryLegend` component
- [victory-core/190](https://github.com/FormidableLabs/victory-core/pull/190)
  - Allows `VictoryContainer` to render either `<g>` or `<svg>` depending on the value of the standalone prop
  - Passes a timer down in context for `VictorySharedEvents`
  - Event handlers have access to the context they are being called from via an argument
    - _i.e._ `onClick: (event, targetProps, eventKey, context) => {...}`
  - Enhances `addEvents` so that evented components can pick up "parentControllerProps" from parent state
    - useful for `VictoryZoomContainer`
  - Adds the ability to define callbacks in the events prop that will be called after `setState`
    - useful for allowing `VictoryZoomContainer` to call methods like `resumeAnimation`
- [victory-chart/427](https://github.com/FormidableLabs/victory-chart/pull/427)
  - Adds `VictoryBrushContainer`
  - Adds `VictoryZoomContainer` to replace `VictoryZoom`
  - [See pull request for examples](https://github.com/FormidableLabs/victory-chart/pull/427)
  - **Deprecates `VictoryZoom`**
  - Changes default styles for `VictorySelectionContainer`
  - Adds override-able `selectionComponent` for `VictorySelectionContainer`
  - Adds `domain` and `standalone` to list of props that get stored in parent state
  - Simplifies and standardizes container rendering across components.



## 0.15.0 (2017-01-03)

- Adds `VictorySelectionContainer`
- Changes when functional styles and props are evaluated (this may be a breaking change)
  Functional styles and props are now evaluated in the primitive components (`Point`, `Bar` etc.)
- Supports an `active` prop on all primitive components that is used when evaluating functional styles and props
- Tooltips now trigger `active: true` on both labels and data components
- `defaultEvents` are supported for `containerComponents`

## 0.14.2 (2016-12-13)

- Fixes date handling in VictoryZoom
- Adds support for className in primitive components

## 0.14.1 (2016-12-12)

- Fixes minor animation bugs
- Fixes bugs in VictoryZoom
- Adds `pointerEvent: "none"` to tooltip

## 0.14.0 (2016-12-02)

*This may be a breaking change for animating VictoryArea and VictoryLine. Animation behavior is changed.*
- Change how animations behave for continuous data _i.e._ VictoryArea and VictoryLine
  - clipPath curtain will never be smaller than the range except during `onLoad`
- Simplify transitions code
- Ensure that animations and transitions use the global timer passed in context or create their own
- Fix `bypassAnimation` bug
- Ensure that clipPath width and height are never negative

## 0.13.7 (2016-11-09)

- Fix timer issues and export VictoryZoom

## 0.13.6 (2016-11-09)

- Temporarily revert global animation timer and VictoryZoom changes

## 0.13.5 (2016-11-09)

- Export VictoryZoom

## 0.13.4 (2016-11-09)

- Add global animation timer
- Add VictoryZoom

## 0.13.3 (2016-10-31)

- Stricter npmignore

## 0.13.2 (2016-10-28)

- Uses `publishr` to reduce npm installed package size [#413](https://github.com/FormidableLabs/victory/issues/413)
- Fixes a bug where label padding was not being applied to tick labels [#408](https://github.com/FormidableLabs/victory/issues/408)
- Removes default tick padding in themes
- Changes how the domain is calculated when there is only one data point, or when the minimum and maximum of the data is equal in a given dimension [#407](https://github.com/FormidableLabs/victory/issues/407)
- Removes hard-coded `<g>` from `VictorySharedEvents` [#402](https://github.com/FormidableLabs/victory/issues/402)
- Ensures that ticks array is not empty after filtering zeroes for crossed axes
- Fixes naming for "stack" and "group" roles

## 0.13.1 (2016-10-26)

- Allows npm 2 installs
- Fixes incorrect Aria roles

## 0.13.0 (2016-10-13)

- Removes support for `children` for VictoryLabel. Use `text` instead
- Upgrades all d3 packages
- Greater consistency of props for props passed to primitive components
- Adds `VictoryPortal` which renders any child elments in a top level portal container if it exists
- `VictoryTooltip` uses `VictoryPortal` by default
- Adds `VictoryClipContainer` which renders children in a group container with a `clipPath` if `clipPath` props exist. This component is used for animatiing continuous data types like `VictoryLine`. It should not be used for custom clipPaths.
- `VictoryArea` and `VictoryLine` use `VictoryClipContainer` as their `groupComponent`
- Removes `clipPath` properties from `VictoryLine` and `VictoryArea`
- Extracts event logic into a new inverted inheritance higher order component `addEvents` which is used by all chart components
- Fixes a bug in `VictoryTransition` that was causing unnecessary rerendering
- Exposes `Data`, `Domain`, `Scale`, and other helpers
- Fixes date related domain bugs
- Fixes stacking for time scale data
- Supports separate theming for x and y axes

## 0.12.1 (2016-09-05)

- Fixes ordering for stacked and grouped data
- Fixes broken tooltips in Safari
- Fixes tooltip fill bug
- Corrects `propTypes` in `VictoryTooltip`
- Removes unused `flyoutProps` prop in `VictoryVoronoiTooltip`

## 0.12.0 (2016-09-09)

**This is a breaking change for label placement in VictoryPie**

- Adds support for `VictoryTooltip`
- Adds `VictoryVoronoi` component
- Adds `VictoryVoronoiTooltip`
- Moves all primitive rendered components to `victory-core` where they are exported for external use
- Enhances `VictoryGroup` so that it can accept a `data` prop which it will pass to all children. This also allows groups of components to be stacked as one
- Adds support for `defaultEvents` in any primitive component (_i.e._ `dataComponent`, `labelComponent`)
- Adds `onLoad` animations
- Adds a `sortKey` prop to `VictoryLine` to allow sorting by fields other than "x"
- Adds a `fixLabelOverlap` boolean prop to `VictoryAxis`. When enables, this feature renders a smaller subset of ticks when the full set of ticks would cause overlapping labels. This feature is currently limited to evenly spaced labels.
- Fixes a bug related to `bubbleProperty` in `VictoryScatter`
- Allows string data in `VictoryCandlestick` and `VictoryErrorBar`
- Performance optimizations

## 0.11.0 (2016-08-18)

**This is a breaking change for themes across all components and for label placement in VictoryPie**

-  Updates VictoryTheme API, uses `VictoryTheme.grayscale` for default styling
- Alters label placement in VictoryPie so that when label styles include padding, the `innerRadius` of the pie does not effect label placement.
- Adds a `displayName` to all components for ease of debugging
- Improves animation for continuous data components (_i.e._ VictoryLine, VictoryArea) using clipPath
- Improves performance by simplifying scale type checking for VictoryBar and VictoryArea
- Supports for arrays of `childName` in events
- Fixes a bug related to bar width

## 0.10.4 (2016-08-05)

- Fix PropType warnings in React 15.3+
- Add animationInfo as 2nd argument to victory-animation child function call

## 0.10.3 (2016-08-04)

- Fixes minor domainPadding bugs for stacked and grouped charts
- Fixes a bug in generated data

## 0.10.2 (2016-08-02)

- Fix animation and style bugs for VictoryCandlestick
- Fix layout bug effecting negative axes in VictoryChart
- Update docs

## 0.10.1 (2016-08-01)

- Fix minor error bar bug
- Fix minor axis style bugs

## 0.10.0 (2016-07-29)

**Breaking Changes**
- Default styles and some default props have changed across all components in this release.

*VictoryTheme*
- All Victory components support a `theme` prop that can be used to define styles and props across different component types.
- `victory-core` includes the [material theme](https://github.com/FormidableLabs/victory-core/blob/master/src/victory-theme/material.js)

*VictoryCandlestick*
- The new `VictoryCandlestick` component may be used standalone or in conjunction with `VictoryChart`. It has an idential API and feature set as other chart compatible components with the exception of the `data` and data accessor props. `VictoryCandlestick` expects `data` in the form `[{x: value, high: NUMBER, low: NUMBER, open: NUMBER, close: NUMBER}...]`, and includes data sccessor props `x`, `high`, `low`, `open`, and `close`.

*VictoryErrorBar*
- The new `VictoryErrorBar` component may be used standalone or in conjunction with `VictoryChart`. It has an idential API and feature set as other chart compatible components with the exception of the `data` and data accessor props. `VictoryErrorBar` expects `data` in the form `[{x: value, y: value, errorX: ERR, errorY: ERR}...]`, Where `ERR` is a number or a two value array for asymmetric errors. `VictoryErrorBar` also includes data accessor props `errorX` and `errorY`.

*VictoryNative*
- Changes have been made across all components in order to support [victory-native](https://github.com/FormidableLabs/victory-native). `VictoryNative` has an identical API to `Victory`, and reuses most of the code. Changes made to `Victory` to support `VictoryNative` are all non-breaking, and minimal. They include the addition of a `groupComponent` prop in all components (which defaults to `<g>`), removing svg transforms whenever possible in favor of absolute positioning, and code reorganization.

*Performance improvements*
- Low-hanging performance improvements included in this release:
  - Replace `Object.assign` with lodash `assign`
  - Replace `map` / `reduce` array methods with length-cached `for` loops in methods responsible for rendering elements

*Misc*
- Improvements for `domainPadding`
  - `domainPadding` is supported in all components compatible with `VictoryChart`
  - Negative and asymmetric `domainPadding` is supported. Example: `domainPadding={{x: [-20, 20], y: 50}}`
  - Grouped bar charts get automatic `domainPadding` so that bars wont overflow axes in most cases.
- Adds Aria roles for all rendered elements
- Fixes [bugs related to log scales](https://github.com/FormidableLabs/victory-chart/pull/317)
- Fixes [a bug related to time scales](https://github.com/FormidableLabs/victory-chart/pull/318)
- Improves consistency for charts with empty and single value data arrays
- Removes `reduce-calc-css` as a dependency


## 0.9.0 (2016-06-17)

*Events enhancements*
- Supports events on parent containers (_i.e._ top level `<svg>`) via the `parent` namespace in the `events` prop
- In VictoryChart, `parent` events have access to `width`, `height`, `style` and the calculated `scale` (with `domain` and `range` already applied). Where applicable `parent` events also have access to `data`
- in VictoryPie `parent` events have access to `width`, `height`, `style` and the calculated `slices` and the calculated `pathFuncton`
- When mutating elements via the return from event handlers, mutation objects may now take arrays for `eventKey` to target several individual elements, or the special value "all" to apply changes to all elements of a particular target type
- Associates parent events with child events via a `container` prop on `VictorySharedEvents`. This is useful where shared events are automatic as in `VictoryChart`, `VictoryStack` and `VictoryGroup`

*VictoryContainer*
- Supports a custom `containerComponent` in all chart types.
- `containerComponent` defaults to the new `VictoryContainer` which renders an `<svg>` with default `title` and `description` aria roles

*Full support for horizontal bar charts*
- Fixes bugs related to axis layout of horizontal bar charts

*Misc improvements*
- Adds `vectorEffect: "non-scaling-stroke"` where applicable for improved readability in responsive charts
- Increases default `fontSizes` for improved readability
- Removes parent transform from `VictoryAxis` so that custom elements can be absolutely positioned more easily
- Alters `VictoryAxis` render order to that grids are rendered _under_ labels
- Alters the render order of _default_ axes in `VictoryChart` so that default axes will render under data. Explicitly defined axes will still render in whatever order they are defined
- Adds a `cornerRadius` prop to `VictoryPie` to enable pie slices with rounded corners. Thanks @judikdavid!
- Renders all pie slices _before_ labels to prevent slices from overlapping labels

*Bug fixes*
- Fixes a bug related to transforms for `VictoryLabel`
- Fixes a bug in `VictoryGroup` that was causing custom `labelComponents` in its children to be overridden.
- Fixes a bug related to incorrect an incorrect default `tickFormat` being applied to dates

## 0.8.0 (2016-06-01)

- Upgrades to React 15
- Supports wrapped components in `VictoryChart`
- Adds `VictorySharedEvents` wrapper for coordinating events between supported Victory Components. An annotated example of the new events API:

```
<VictorySharedEvents
  events={[
    {
      childName: "firstBar", // if a child name is not provided, event will be attached to all children.
      target: "data", // what type of element to attach to. Matches the style namespaces
      eventKey: 1, // What event key of element to attach to. Defaults to the index in data.
      eventHandlers: {
        onClick: () => {
          return {
            childName: "secondBar", // the child to be modified
            // props here are the props that define the targeted component i.e. what is passed to an individual bar
            mutation: (props) => {
              return {style: merge({}, props.style, {fill: "blue"})}; // Whatever is returned here will override the existing props
            }
          };
        }
      }
    }, {
      childName: "secondBar",
      target: "data",
      eventKey: 0,
      eventHandlers: {
        onClick: () => { // event handlers can return an array of mutation objects with different targeted elements
          return [
            {
              childName: "firstBar",
              mutation: (props) => {
                return {style: merge({}, props.style, {fill: "cyan"})};
              }
            }, {
              mutation: (props) => { // the default target element is whatever element the handler is attached to
                return {style: merge({}, props.style, {fill: "orange"})};
              }
            }, {
              target: "labels",
              eventKey: 1,
              mutation: () => {
                return {text: "CLICKED"};
              }
            }
          ];
        }
      }
    }
  ]}
>
  <VictoryBar
    name="firstBar" // if children don't have name props they can be referenced by index in shared events
    style={{
      data: {width: 25, fill: "gold"}
    }}
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 4}]}
  />
  <VictoryBar
    name="secondBar"
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 4}]}
  />
</VictorySharedEvents>
```

## 0.7.0 (2016-05-13)

 - improves consistency for `labelComponent` and `dataComponent` props. Replaces a custom label components with `VictoryLabel` to make the api more consistent and predictable. **This is a breaking change for custom label components**, as `VictoryLabel` expects a different set of props than the previous label components. See [VictoryLabel](http://formidable.com/open-source/victory/docs/victory-label) for more detail.

 - Custom components are now supported for all rendered axis elements (axis, axisLabel, grid, ticks, tickLabels)

 - All data and label components now have access to scale so that they can create correctly scaled elements from data i.e. error bars.

- Functional styles and props are now all evaluated before they are passed as props to `labelComponent` or `dataComponent`, so that custom components will have access to the final values.

- events are bound and partially applied prior to being passed as props to `labelComponent` or `dataComponent`

- it is now possible to specify `angle` and `verticalAnchor` props for` VictoryLabel` via the style object

- event return values are stored differently on state to facilitate interaction between data and labels. **This is a breaking change for events** as event handlers must now return an object with with `data` and/or `labels` keys so that these values may be applied appropriately to data and label elements respectively.

## 0.6.1 (2016-04-19)

- Fixes a bug in VictoryChart, VictoryGroup and VictoryStack, which was causing null animation props to be ignored.

## 0.6.0 (2016-04-15)

**BREAKING CHANGES**

- VictoryBar and VictoryArea no longer support multiple datasets.
- VictoryStack and VictoryGroup define stacked and grouped layouts for their children
- Custom data components supported on for VictoryBar, VictoryLine, VictoryScatter,
  VictoryArea, and VictoryPie via the `dataComponent` prop
- Enter and exit transitions animate. Enter and exit transition defaults defined
  VictoryBar, VictoryArea, VictoryScatter, VictoryLine and VictoryPie. Custom transitions may be
  defined via the `onExit` and `onEnter` properties of the `animation` prop
- Top level svgs are all responsive by default (using svg viewBox). To render a fixed size
  component, set the `standalone` prop to false and render the component inside an svg tag

## 0.5.0 (2016-03-15)

- Adds VictoryArea as a data type compatible with VictoryChart.
- Supports custom label components
- Upgrades all repos to lodash 4

## 0.4.1 (2016-03-01)

- Remove dependency on Radium
- Many performance improvements via memoization and replacing expensive merge operations
- Ignore source maps for smaller NPM installation
- Add `npm start` and `npm test` scripts for easier contribution dev workflow
- Show gzipped size for minified distribution file
- Code reorganization
- Update roadmap

## 0.4.0 (2016-01-31)

- Data Accessors are supported on all relevant components
- Shared code has been factored into VictoryUtil

Breaking Changes:
  - VictoryLine and VictoryScatter:
    - plotting functions via the `y` prop must now be expressed as functions of
      data rather than functions of x. _i.e._ `y={(data) => Math.sin(data.x)}`
  - VictoryBar:
    - the domain of the dependent axis will automatically include zero unless a domain is specified via props
    - automatic alphabetic data sorting has been removed
    - automatic 1% domain padding has been removed
  - VictoryChart:
    - automatic 1% domain padding has been removed
    - default line data has been removed, so `<VictoryChart/>` with no additional props will now only render a set of
      axes with no data

## 0.3.0 (2016-01-26)

- Demo application now works with hot reloading.
- Application dependencies like `radium` and `lodash` now live in components, not in the Builder archetype. This is a breaking change. https://github.com/FormidableLabs/victory/issues/176

## 0.2.0 (2016-01-15)

- Upgrade to Radium 0.16.2. This is a breaking change if you're using media queries or keyframes in your components. Please review upgrade guide at https://github.com/FormidableLabs/radium/blob/master/docs/guides/upgrade-v0.16.x.md

## 0.1.3 (2015-12-30)

- Fix build

## 0.1.2 (2015-12-30)

- Add Cumulative min and max
- Fix Firefox date issue

## 0.1.1 (2015-12-29)

- Fix issue with exported `dist` file. You can now include Victory via `npmcdn`: `https://npmcdn.com/victory/dist/victory.min.js`

## 0.1.0 (2015-12-18)

The following components documented and ready to use; API subject to change:

- victory-animation
- victory-axis
- victory-bar
- victory-chart
- victory-label
- victory-line
- victory-pie
- victory-scatter

Functional styles and functional props (where appropriate) are implemented for all the data primitives (VictoryBar, VictoryLine etc.) and VictoryAxis

Components use d3-modules

Basic code coverage across all Victory components.

We make no promises about any code prior to this release. From this point on, you can expect a regular release schedule (~every two weeks) with detailed release notes. Check out our roadmap for upcoming features

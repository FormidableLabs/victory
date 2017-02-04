# Victory Changelog

## 0.16.1 (2017-02-03)

- [429](https://github.com/FormidableLabs/victory-chart/pull/429)
- Throttles `onWheel` and `onMouseMove` events on Victory container components
- Exports container event helpers

## 0.16.0 (2017-01-30)

**This release includes major breaking changes related to `VictoryZoom`**

- [189](https://github.com/FormidableLabs/victory-core/pull/189) and [191](https://github.com/FormidableLabs/victory-core/pull/190)
  - Adds `VictoryLegend` component
- [190](https://github.com/FormidableLabs/victory-core/pull/190)
  - Allows `VictoryContainer` to render either `<g>` or `<svg>` depending on the value of the standalone prop
  - Passes a timer down in context for `VictorySharedEvents`
  - Event handlers have access to the context they are being called from via an argument
    - _i.e._ `onClick: (event, targetProps, eventKey, context) => {...}`
  - Enhances `addEvents` so that evented components can pick up "parentControllerProps" from parent state
    - useful for `VictoryZoomContainer`
  - Adds the ability to define callbacks in the events prop that will be called after `setState`
    - useful for allowing `VictoryZoomContainer` to call methods like `resumeAnimation`
- [427](https://github.com/FormidableLabs/victory-chart/pull/427)
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

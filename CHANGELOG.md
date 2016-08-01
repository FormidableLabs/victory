# VictoryChart Changelog

## 10.2.4 (2016-08-01)

- Fix label style bug

## 10.2.3 (2016-08-01)

- Fix minor errorbar bug

## 10.2.2 (2016-07-29)

- Fix tick style bug

## 10.2.1 (2016-07-29)

- Update `victory-core`
- Removes `reduce-calc-css`

## 10.2.0 (2016-07-29)

- Performance improvements across all components
- Supports asymmetric `domainPadding`
- Supports `domainPadding` on all child components
- Adds automatic `domainPadding` for grouped bars
- Fixes [bugs related to log scales](https://github.com/FormidableLabs/victory-chart/pull/317)
- Fixes [a bug related to time scales](https://github.com/FormidableLabs/victory-chart/pull/318) 
- Improves consistency for charts with empty and single value data arrays

## 10.1.0 (2016-07-15)

- Adds VictoryErrorBar
- Changes default styles to the greyscale theme
- Auto-width enhancement for VictoryBar
- Aria roles for all rendered elements
- Supports negative domain padding

## 10.0.0 (2016-07-07)

- Adds support for Victory Native 
  - Adds `containerComponent` and `groupComponent` props to all components

## 9.2.1 (2016-06-30)

- Changes helper methods to make horizontal bar chart behavior more intuitive

## 9.2.0 (2016-06-17)

- Supports events on the parent element via the `parent` namespace in the `events` prop.
- `parent` events have access to `width`, `height`, `style` and the calculated `scale` (with `domain` and `range` already applied). Where applicable `parent` events also have access to `data`
- Shared `parent` events are automatically supported in components that use `VictorySharedEvents` by default (_i.e._ VictoryChart, VictoryGroup, VictoryStack)
- When mutating elements via the return from event handlers, mutation objects may now take arrays for `eventKey` to target several individual elements, or the special value "all" to apply changes to all elements of a particular target type
- Fixes a bug related to an incorrect default `tickFormat` for dates
- FIxes a bug related to incorrect axis label placement

## 9.1.3 (2016-06-14)

- Alters the render order for children of `VictoryChart` so that _default_ axes are always rendered before other children. When axes are explicitly defined children of `VictoryChart` will  still be rendered in the order they are defined.
- Alters the render order of elements within `VictoryAxis` so that grid elements are rendered before ticks and tick labels
- Fixes a bug in `VictoryGroup` that was causing custom `labelComponents` of its children to be overridden.

## 9.1.2 (2016-06-13)

- Pre-calculates and applies VictoryAxis transform to individual elements. This allows custom axis components (_i.e._ `tickLabelComponent`) to be absolutely positioned by overriding position props

## 9.1.1 (2016-06-13)

- Custom component props get precedence over calculated props

## 9.1.0 (2016-06-13)

- Fixes bugs related to horizontal bar charts
- Fixes bugs related to label transfroms
- Increases default font sizes for readability
- Adds basic aria roles
- Adds support for custom container elements
- Adds vectorEffect non-scaling-stroke to support responsive charts

## 9.0.0 (2016-06-01) 

- Upgrades to React 15
- Supports wrapped components
- Updates the events API to support shared events **This is a breaking change for events**

## 8.0.0 (2016-05-13)

 - improves consistency for `labelComponent` and `dataComponent` props. Replaces a custom `SliceLabel` component with `VictoryLabel` to make the api more consistent and predictable. **This is a breaking change for custom label components**, as `VictoryLabel` expects a different set of props than the previous `SliceLabel` component. See [VictoryLabel](http://formidable.com/open-source/victory/docs/victory-label) for more detail.

 - Custom components are now supported for all rendered axis elements (axis, axisLabel, grid, ticks, tickLabels)

 - All data and label components now have access to scale so that they can create correctly scaled elements from data i.e. error bars.

- Functional styles and props are now all evaluated before they are passed as props to `labelComponent` or `dataComponent`, so that custom components will have access to the final values.

- events are bound and partially applied prior to being passed as props to `labelComponent` or `dataComponent`

- it is now possible to specify `angle` and `verticalAnchor` props for` VictoryLabel` via the style object

- event return values are stored differently on state to facilitate interaction between data and labels. **This is a breaking change for events** as event handlers must now return an object with with `data` and/or `labels` keys so that these values may be applied appropriately to data and label elements respectively.

## 7.0.0 (2016-04-15)

- VictoryBar and VictoryArea no longer support multiple datasets.
- VictoryStack and VictoryGroup define stacked and grouped layouts for their children
- Custom data components supported on for VictoryBar, VictoryLine, VictoryScatter,
  VictoryArea via the `dataComponent` prop
- Enter and exit transitions animate. Enter and exit transition defaults defined
  VictoryBar, VictoryArea, VictoryScatter, and VictoryLine. Custom transitions may be
  defined via the `onExit` and `onEnter` properties of the `animation` prop
- Top level svgs are all responsive by default (using svg viewBox). To render a fixed size
  component, set the `standalone` prop to false and render the component inside an svg tag

## 6.0.0 (2016-03-14)

- Add VictoryArea component
- Add event handling via an `events` prop
- Update to lodash 4
- Update `d3-shape` to the latest version (minor breaking changes on interpolation types)
- Updates via `builder-victory-component` to support Babel 6
- Provide label text via a `text` prop rather than children

## 5.0.2 (2016-03-04)

- Add validation of length for `dataAttributes` prop
- Remove source-maps from git
- Various documentation fixes

## 5.0.1 (2016-03-01)

- Provide datum to victory-line custom label
- Upgrade to `victory-core@1.0.0`

## 5.0.0 (2016-02-26)

- VictoryBar, VictoryLine, VictoryScatter, and VictoryAxis are now all part of the VictoryChart repo.
- VictoryChart depends on VictoryCore instead of VictoryUtil, VictoryLabel, and VictoryAnimation individually.
- VictoryChart no longer depends on Radium
- Significant rendering performance improvements

## 4.0.0 (2016-01-30)

- Supports data accessor functions!
[more detail](https://github.com/FormidableLabs/victory/issues/84)
- Application dependencies like `radium` and `lodash` now live in components, not in the Builder archetype. This is a breaking change. https://github.com/FormidableLabs/victory/issues/176

## 3.0.0 (2016-01-26)

- Upgrade to Radium 0.16.2. This is a breaking change if you're using media queries or keyframes in your components. Please review upgrade guide at https://github.com/FormidableLabs/radium/blob/master/docs/guides/upgrade-v0.16.x.md

## 2.2.0 (2016-1-21)

- Extracted shared code into `victory-util`
- Increased unit test coverage to ~75%

## 2.1.3 (2015-12-30)

- update archetype

## 2.1.2 (2015-12-30)

- Fixed a bug in `victory-bar` that was causing the cumulative max on stacked bar charts to be overestimated
- Fixed a bug related to date formatting in Firefox

## 2.1.1 Alpha (2015-12-18)

Functional styles and functional props (where appropriate) for child components

using `d3-modules` instead of all of `d3`

Basic code coverage.

We make no promises about any code prior to this release.

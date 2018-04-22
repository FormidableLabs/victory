# VictoryPie Changelog

## 15.0.0 (2018-04-21)

**Breaking Changes**

-[176](https://github.com/FormidableLabs/victory-pie/pull/176) Disable styles on data

This change deprecates Victory's ability to automatically pick up style attributes from the data object. This change will improve performance, but will be a breaking change for many users. Fortunately the upgrade path is simple:

If your data object looks like
```
data={[
  { x: 1, y: 1, fill: "red", opacity: 0.2 },
  ...
]}
```
Add the following functional styles:
```
style={{ data:  { fill: (d) => d.fill, opacity: (d) => d.opacity } }}
```
and everything will work as before.

Other changes:
-[177](https://github.com/FormidableLabs/victory-pie/pull/177) Audit lodash methods

## 14.0.2 (2018-03-27)

-[168](https://github.com/FormidableLabs/victory-pie/pull/168) Refactor helper method exports

## 14.0.1 (2018-02-05)

- [167](https://github.com/FormidableLabs/victory-pie/pull/167) Add `sideEffects: false`

## 14.0.0 (2018-02-04)

-[166](https://github.com/FormidableLabs/victory-pie/pull/166) Update Victory primitives
**This is a breaking change**
Internal methods for _all_ Victory primitive components have changed. This will be a breaking change for users who are extending primitive components, including `victory-native`.

## 13.3.1 (2018-01-08)

-[164](https://github.com/FormidableLabs/victory-pie/pull/164) Correct typo

## 13.3.0 (2018-01-02)

- [163](https://github.com/FormidableLabs/victory-pie/pull/163)
- [victory-core/324](https://github.com/FormidableLabs/victory-core/pull/324) Adds support for external event mutations
  - Adds `externalEventMutations` prop to `VictorySharedEvents` and all components enhanced with the `add-events` HOC
  - `externalEventMutations` prop format:
  ```
externalEventMutations: PropTypes.arrayOf(PropTypes.shape({
  callback: PropTypes.function,
  childName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  eventKey: PropTypes.oneOfType([
    PropTypes.array,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string
  ]),
  mutation: PropTypes.function,
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}))
```
*Note:* `eventKey` and `target` must be specified for externalEventMutations. When using `extenalEventMutations` with shared events (_i.e._ events on VictoryChart etc), `childName` is also required.

*Note:* The `callback` supplied to `externalEventMutations` should be used for clearing mutations. This is crucial for animating charts

## 13.2.0 (2017-12-17)

- [160](https://github.com/FormidableLabs/victory-pie/pull/160) Add `sortOrder` prop

## 13.1.0 (2017-11-07)

- [158](https://github.com/FormidableLabs/victory-pie/pull/158) Update infrastructure for React 16

## 13.0.1 (2017-10-19)

Update to `victory-core@20.0.0`

## 13.0.0 (2017-09-30)

**BREAKING CHANGES:**

**[victory-core/299](https://github.com/FormidableLabs/victory-core/pull/299) Containers are now rendered in parent divs.** This may be a breaking change for parent styles.

## 12.0.0 (2017-09-09)

- Updates to `victory-core@18.0.0` which includes breaking changes for `VictoryTooltip` styling.

## 11.4.2 (2017-08-14)

- [153](https://github.com/FormidableLabs/victory-pie/pull/153) Bugfix for axymmetric padding

## 11.4.1 (2017-08-07)

- [151](https://github.com/FormidableLabs/victory-pie/pull/151) bugfix: support functional padding for labels
- [152](https://github.com/FormidableLabs/victory-pie/pull/152) Support boolean animate prop

## 11.4.0 (2017-07-24)

- [150](https://github.com/FormidableLabs/victory-pie/pull/150) aggressive `shouldComponentUpdate` for evented components like `VictoryPie`

## 11.3.0 (2017-07-13)

- [149](https://github.com/FormidableLabs/victory-pie/pull/149) Support Webpack 3 and ES6 exports

## 11.2.0 (2017-07-12)

- [148](https://github.com/FormidableLabs/victory-pie/pull/148) Translates individual slices rather than an entire group translation for pie and labels

## 11.1.2 (2017-06-06)

- updates `victory-core`

## 11.1.1 (2017-05-24)

-[146](https://github.com/FormidableLabs/victory-pie/pull/146) Rounds label positions

## 11.1.0 (2017-05-12)

- [victory-core/243](https://github.com/FormidableLabs/victory-core/pull/243) Impovements to `VictoryContainer`
  - Automatic `overflow: "visible"` for elements rendered in `VictoryPortal` (tooltips)
  - `VictoryContainer` no longer renders `g` tags (this was causing confusion with evented containers)
  - Default responsive styles are now `width: "100%"` `height: "100%"` (fixes a bug in safari)
  - Changes the merge order for responsive styles so that `width` and `height` attrs may be overridden

## 11.0.0 (2017-05-02)

**BREAKING CHANGE**
- Updates to `react@^15.5.0`
- Uses separate `prop-types` package
- Projects using Victory must also depend on `prop-types`

## 10.3.0 (2017-04-04)

- Support `victory-native`

## 10.2.3 (2017-03-21)

- Updates `victory-core`
- Code consistency with other Victory components

## 10.2.2 (2017-03-14)

- Removes unnecessary props from groupComponent

## 10.2.1 (2017-03-14)

[132](https://github.com/FormidableLabs/victory-pie/pull/132)
- support multi-repo tooling

## 10.2.0 (2017-02-25)

Updates `victory-core` to include the following changes:
- Removes default `title` and `desc` props from `VictoryContainer`
- Adds support for providing `text` as an array for `VictoryLabel`
- Adds support for providing `style` as an array for `VictoryLabel` so that each line of a multi-line label may be styled independently
- `VictoryTooltip` no longer automatically adds the `active` prop to data when hovered. To turn this behavior on, set the new `activateData` boolean prop on `VictoryTooltip`

## 10.1.0 (2017-01-30)

- [128](https://github.com/FormidableLabs/victory-pie/pull/128)
  - Updates `victory-core`
  - Code consistency with other Victory components

## 10.0.0 (2017-01-16)

- Uses "_x" and "_y" for internal data format rather than "x" and "y". Though "x" and "y" will
still appear in the data object, they are no longer the source of truth for data values. This may be
a breaking change for custom transitions, functional props, and functional styles.

- Fixes functional style evaluation for enter and exit transitions

## 9.0.0 (2017-01-03)

- Changes when functional styles and props are evaluated.
  - They are now evaluated on the primitive components
- Updates victory-core
- Supports `defaultEvents` on `containerComponents`

## 8.0.0 (2016-12-20)

- Changes how the positioning of the Pie is calculated so that VictoryPie is centered when padding is equal
https://github.com/FormidableLabs/victory-pie/pull/125

- This may be a breaking change for VictoryPie components where height != width.

## 7.2.0 (2016-12-02)

- Ensure that animations and transitions use the global timer passed in context or create their own

## 7.1.2 (2016-11-11)

- Fix tooltip bug. Force `renderInPortal={false}` for VictoryPie tooltips

## 7.1.1 (2016-10-31)

- Stricter npmignore

## 7.1.0 (2016-10-28)

- Uses `publishr` to reduce npm installed package size [#413](https://github.com/FormidableLabs/victory/issues/413)

## 7.0.1 (2016-10-26)

- allow npm 2 install
- add shouldAnimate check for victory-native compatibility

## 7.0.0 (2016-10-13)
    - Upgrades all d3 packages
    - Greater consistency of props for props passed to primitive components
    - Adds `VictoryPortal` which renders any child elments in a top level portal container if it exists
    - Removes `clipPath` properties from `VictoryLine` and `VictoryArea`
    - Extracts event logic into a new inverted inheritance higher order component `addEvents` which is used by all chart components

## 6.0.0 (2016-09-09)

**This release includes breaking changes for themes and label styles**
- Adds support for `VictoryTooltip`
- Adds a `labelRadius` prop used to position labels rather than relying only on `style.labels.padding`
- Calculates default `textAnchor` and `verticalAnchor` for labels depending on which quadrant of the pie they appear in
- Uses `Slice` component exported from `victory-core`
- Performance improvements

## 5.0.0 (2016-08-18)

**This release includes breaking changes for themes and label styles**
- Updates VictoryTheme API, uses `VictoryTheme.grayscale` for default styling
- Alters label placement so that when label styles include padding, the `innerRadius` of the pie does not effect label placement.
- Adds a `displayName` for ease of debugging
- Updates documentation to reflect changes

## 4.3.1 (2016-08-02)

- Update documentation

## 4.3.0 (2016-07-29)

- Performance improvements
- Update `victory-core` to remove `reduce-calc-css`

## 4.2.0 (2016-07-02)

- Adds support for themes
- Adds support for Victory Native

## 4.1.0 (2016-06-17)

- Supports events on the parent element via the `parent` namespace in the `events` prop.
- `parent` events have access to `width`, `height`, `style` and the calculated `slices` and the calculated `pathFuncton`
- When mutating elements via the return from event handlers, mutation objects may now take arrays for `eventKey` to target several individual elements, or the special value "all" to apply changes to all elements of a particular target type
- Supports a custom `containerComponent` prop, which defaults to `VictoryContainer`
- Adds default aria roles via `VictoryContainer`
- Adds support for a `cornerRadius` prop. Thanks @judikdavid!
- Renders all slices _before_ labels so that labels are not overlapped.


## 4.0.0 (2016-06-01)

- Upgrades to React 15
- Updates the events API to support shared events **This is a breaking change for events**

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

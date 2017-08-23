VictoryCore Changelog
=====================

## 17.2.7 (2017-08-22)

- [291](https://github.com/FormidableLabs/victory-core/pull/291) Domain should include negative y0 values
- [292](https://github.com/FormidableLabs/victory-core/pull/292) Fix single point domain logic for dates

## 17.2.6 (2017-08-19)

- [290](https://github.com/FormidableLabs/victory-core/pull/290) Bugfix: VictoryPortal with VictoryZoomContainer

## 17.2.5 (2017-08-14)

- [289](https://github.com/FormidableLabs/victory-core/pull/289) Bugfix: createContainer + containerId

## 17.2.4 (2017-08-13)

- [288](https://github.com/FormidableLabs/victory-core/pull/288) Bugfix: containerId

## 17.2.3 (2017-08-09)

- [287](https://github.com/FormidableLabs/victory-core/pull/287) Allow users to override `touchAction` style in containers

## 17.2.2 (2017-08-08)

- [286](https://github.com/FormidableLabs/victory-core/pull/286) bugfix: tooltip positioning with `dx` and `dy`

## 17.2.1 (2017-08-07)

-[285](https://github.com/FormidableLabs/victory-core/pull/285) bugfix: tooltips with `activateData`

## 17.2.0 (2017-08-07)

- [278](https://github.com/FormidableLabs/victory-core/pull/278) Support touch events
- [280](https://github.com/FormidableLabs/victory-core/pull/280) Fix tooltip rendering in VictoryPortal
- [281](https://github.com/FormidableLabs/victory-core/pull/281) bugfix: functional label padding
- [282](https://github.com/FormidableLabs/victory-core/pull/282) bugfix: fix "unknown props on `<g>` tag" warning
- [283](https://github.com/FormidableLabs/victory-core/pull/283) Allow boolean value for animate prop
- [284](https://github.com/FormidableLabs/victory-core/pull/284) Sort arrays by "key" when animating. See [#684](https://github.com/FormidableLabs/victory/issues/684)

## 17.1.0 (2017-08-02)

- [274](https://github.com/FormidableLabs/victory-core/pull/274) Fixes automatic bar width calculation for horizontal bars
- [275](https://github.com/FormidableLabs/victory-core/pull/275) Adds an optional `containerId` prop for all Victory containers
- [276](https://github.com/FormidableLabs/victory-core/pull/276) Adds `downsample` method for `Data`

## 17.0.0 (2017-07-24)

- [267](https://github.com/FormidableLabs/victory-core/pull/267) Correct single-point domain logic
- [268](https://github.com/FormidableLabs/victory-core/pull/268) Correct stacked domain logic
- [269](https://github.com/FormidableLabs/victory-core/pull/269) `VictoryLabel` accepts percentage values for `x` and `y`
- [270](https://github.com/FormidableLabs/victory-core/pull/270) `VictoryLegend` supports events
- [272](https://github.com/FormidableLabs/victory-core/pull/272) Aggressive `shouldComponentUpdate` logic for evented Victory components *Breaking change for some components using `addEvents`

## 16.3.0 (2017-07-13)

- [266](https://github.com/FormidableLabs/victory-core/pull/266) Support Webpack 3 and ES6 exports

## 16.2.0 (2017-07-12)

- [265](https://github.com/FormidableLabs/victory-core/pull/265) Translates `Slice` when an `origin` prop is given

## 16.1.1 (2017-07-02)

- [263](https://github.com/FormidableLabs/victory-core/pull/263) Removes commas prior to interpolating strings

## 16.1.0 (2017-06-29)

- [262](https://github.com/FormidableLabs/victory-core/pull/262) Consistent widths for polar bars.
**This change may require style adjustments to maintain visual continuity**

## 16.0.4 (2017-06-28)

- [515](https://github.com/FormidableLabs/victory/issues/515) Bugfix for ARIA title and desc. Now both have unique IDs.

## 16.0.3 (2017-06-27)

Minor bug fixes:
  - [255](https://github.com/FormidableLabs/victory-core/pull/255)
  - [257](https://github.com/FormidableLabs/victory-core/pull/257)
  - [259](https://github.com/FormidableLabs/victory-core/pull/259)
  - [260](https://github.com/FormidableLabs/victory-core/pull/260)

## 16.0.2 (2017-06-12)

-[254](https://github.com/FormidableLabs/victory-core/pull/254) Generalize label angle helper

## 16.0.1 (2017-06-06)

-[251](https://github.com/FormidableLabs/victory-core/pull/251) Adds an optional `clipId` prop to `VictoryClipContainer`
-[252](https://github.com/FormidableLabs/victory-core/pull/252) Changes domain calculation for single data point components so that domains aren't forced to include zero

## 16.0.0 (2017-06-06)

-[240](https://github.com/FormidableLabs/victory-core/pull/240) Polar Charts

*Breaking Changes*
  - Removes default bar width from themes
  - Changes how default bar widths are calculated
  - Changes render methods for `Area`, `Bar` and `Curve` primitives (Breaking change for `victory-native` and others extending primitives)
  - Changes function sigintures for `Selection.getDomainCoordinates` and `Selection.getDataCoordinates` (Breaking change for `victory-native`)

*Features*
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

## 15.2.0 (2017-05-22)

-[244](https://github.com/FormidableLabs/victory-core/pull/244) Passes missing `datum` and `index` props to `Flyout`
-[246](https://github.com/FormidableLabs/victory-core/pull/246) Adds an `itemsPerRow` prop to `VictoryLegend` to support automatic legend wrapping
-[249](https://github.com/FormidableLabs/victory-core/pull/249) Adds support for a y0 accessor so that users can have granular control over the baseline of components like `VictoryArea`
-[250](https://github.com/FormidableLabs/victory-core/pull/250) Audits `shouldComponentUpdate` logic for all primitive components so that changes to optional props like `className` will cause components to re-render.


## 15.1.0 (2017-05-12)

- [241](https://github.com/FormidableLabs/victory-core/pull/241) Adds optional `title` an `desc` props to `VictoryLabel`
- [243](https://github.com/FormidableLabs/victory-core/pull/243) Impovements to `VictoryContainer`
  - Automatic `overflow: "visible"` for elements rendered in `VictoryPortal` (tooltips)
  - `VictoryContainer` no longer renders `g` tags (this was causing confusion with evented containers)
  - Default responsive styles are now `width: "100%"` `height: "100%"` (fixes a bug in safari)
  - Changes the merge order for responsive styles so that `width` and `height` attrs may be overridden
- [244](https://github.com/FormidableLabs/victory-core/pull/244) adds missing `index` and `datum` props to `Flyout`
- [245](https://github.com/FormidableLabs/victory-core/pull/245) fixes `dy` calculation in `VictoryLabel`

## 15.0.0 (2017-05-02)

**BREAKING CHANGE**
- Updates to `react@^15.5.0`
- Uses separate `prop-types` package
- Projects using Victory must also depend on `prop-types`

## 14.1.1 (2017-04-20)

- Add `victory-native` support to getSVGEventCoordinates

## 14.1.0 (2017-04-04)

- Remove default container theme
- Fix clipWidth bug
- Support `victory-native` upgrade

## 14.0.7 (2017-03-21)

- Fixes a bug in `shouldComponentUpdate` logic in `Candle`
- Adds static roles for `VictoryContainer`, `VictoryClipContainer`, and `VictoryLabel`
- Fixes a bug in `VictoryClipContainer`
- Prevents unknown prop `clipWidth` on `<g>` tags

## 14.0.6 (2017-03-15)

- Fixes clipPath bugs
- FIxes VictoryLegend bugs

## 14.0.5 (2017-03-14)

[217](https://github.com/FormidableLabs/victory-core/pull/217)
- Adds support for multi-repo tooling

[215](https://github.com/FormidableLabs/victory-core/pull/215)
- Rounds path values to prevent sub-pixel rendering

## 14.0.4 (2017-03-10)

[214](https://github.com/FormidableLabs/victory-core/pull/214)
- Allows simple events directly on container components

## 14.0.3 (2017-03-03)

[210](https://github.com/FormidableLabs/victory-core/pull/210)
- Support `VictoryClipContainer` for all x, y components

## 14.0.2 (2017-02-28)

[208](https://github.com/FormidableLabs/victory-core/pull/208)
  - Add `clipPadding` prop to `VictoryClipContainer` to match the prop on `ClipPath`

## 14.0.1 (2017-02-26)

[207](https://github.com/FormidableLabs/victory-core/pull/207)
  - Adds a `translateY` prop for clipPath to support x, y zoom behavior
  - Removes default clipPadding

## 14.0.0 (2017-02-24)

- Adds a `theme` prop to `VictoryContainer` so that custom containers may pick up themes from their parents
- Removes default `title` and `desc` props from `VictoryContainer`
- Adds support for providing `text` as an array for `VictoryLabel`
- Adds support for providing `style` as an array for `VictoryLabel` so that each line of a multi-line label may be styled independently
- Changes how null data values are handled by `Area` and `Curve` primitives
- Adds a `reduceChildren` method to `Helpers` to ensure order consistency when working with nested children
- `VictoryTooltip` no longer automatically adds the `active` prop to data when hovered. To turn this behavior on, set the new `activateData` boolean prop on `VictoryTooltip`

## 13.0.4 (2017-02-21)

- Supports sorting data with a `sortKey` prop.
- Styles gridlines with `pointerEvents: "none"` in all themes

## 13.0.3 (2017-02-09)

-[198](https://github.com/FormidableLabs/victory-core/pull/198)
  - Fixes a regression in `VictoryPortal`. Only top level containers should register and render portals

## 13.0.2 (2017-02-05)

- [195](https://github.com/FormidableLabs/victory-core/pull/195)
  - Fixes null event state bug

## 13.0.1 (2017-01-30)

- [193](https://github.com/FormidableLabs/victory-core/pull/193)
  - Removes the default `standalone: true` from VictoryContainer so that parents can set the value

## 13.0.0 (2017-01-30)

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

## 12.0.2 (2017-01-14)

- [188](https://github.com/FormidableLabs/victory-core/pull/188)
- Retains "x" and "y" in addition to "_x" and "_y" in formatted data. See PR for rationale and details.

## 12.0.1 (2017-01-13)

- [187](https://github.com/FormidableLabs/victory-core/pull/187)
- Fix a bug in voronoi themes
- Fix a bug in logic related to filtering data on selection.

## 12.0.0 (2017-01-12)

- [183](https://github.com/FormidableLabs/victory-core/pull/183) Adds `shouldComponentUpdate` logic to all primitive components
- [184](https://github.com/FormidableLabs/victory-core/pull/184) Fixes a bugs related to tooltip themes
  - Fixes [471](https://github.com/FormidableLabs/victory/issues/471)
- [185](https://github.com/FormidableLabs/victory-core/pull/185) Uses "_x" and "_y" instead of "x" and "y" for storing formatted data on data objects
  - Fixes [451](https://github.com/FormidableLabs/victory/issues/451)
  - Fixes [350](https://github.com/FormidableLabs/victory/issues/350)
  - **This is a breaking change for anyone using data accessors and functional styles / props that reference datum.x, datum.y**
- [186](https://github.com/FormidableLabs/victory-core/pull/186) Adds a custom interpolator for objects so that properties are correctly interpolated
  - Fixes [460](https://github.com/FormidableLabs/victory/issues/460)

## 11.0.1 (2017-01-05)

- Fixes a bug in VictorySharedEvents

## 11.0.0 (2017-01-03)

- Adds support for `active` boolean prop on all primitive components
- Tooltips trigger `active` on both data and label components
- Adds selection helpers to support `VictorySelectionContainer`
- Changes when functional styles / props are evaluated
  - they will now be evaluated from the primitive components so they can be evaluated with `active`
- Better support for `defaultEvents` on container components

## 10.0.3 (2016-12-13)

- Add support for `className` on all primitive components

## 10.0.2 (2016-12-12)

- Add `pointerEvents: "none"` to tooltip themes

## 10.0.1 (2016-12-09)

- Fix bug related to duplicate keys in shared event children

## 10.0.0 (2016-12-01)

- Change how continuous animations behave
  - clipPath curtain will never be smaller than the range except onLoad
- Simplify transitions code
- Ensure that animations and transitions use the global timer passed in context or create their own
- Fix `bypassAnimation` bug
- Ensure that clipPath width and height are never negative

## 9.2.4 (2016-11-21)

- Change how data is generated for accessors to handle edge cases like https://github.com/FormidableLabs/victory/issues/397

## 9.2.3 (2016-11-21)

- Fix Transition domain bug

## 9.2.2 (2016-11-09)

- Create timer only when needed

## 9.2.1 (2016-11-09)

- Code style consistency

## 9.2.0 (2016-11-09)

- Adds a global animation timer (non-breaking change)

## 9.1.1 (2016-10-31)

- Stricter npmignore

## 9.1.0 (2016-10-28)

- Uses `publishr` to reduce npm installed package size [#413](https://github.com/FormidableLabs/victory/issues/413)
- Fixes a bug where label padding was not being applied to tick labels [#408](https://github.com/FormidableLabs/victory/issues/408)
- Removes default tick padding in themes
- Changes how the domain is calculated when there is only one data point, or when the minimum and maximum of the data is equal in a given dimension [#407](https://github.com/FormidableLabs/victory/issues/407)
- Removes hard-codes `<g>` from `VictorySharedEvents` [#402](https://github.com/FormidableLabs/victory/issues/402)

## 9.0.3 (2016-10-26)

- Fix aria role bug
- Allow npm 2 install

## 9.0.2 (2016-10-18)

- Refactor rendered components for ease of native versions
- Fix bugs in exit transitions for continuous data components (line, area)
- Fix `dx` bug in `VictoryLabel` Thanks to @gcedo

## 9.0.1 (2016-10-12)

- Simplify cleanData so accessors are called only once

## 9.0.0 (2016-10-12)

- removes support for `children` for VictoryLabel. Use `text` instead
- upgrades all d3 packages
- renames `VictoryGroupContainer` -> `VictoryClipContainer`
- refactors `VictoryClipContainer` for ease of native implementation
- consistency of props for primitive components and VictoryLabel
- refactors ErrorBar primitive for clarity and ease of native implementation
- fixes a 0/falsey bug in transitions to allow for durations of 0 rather than falling back to defaults
- Fixes date related  domain bugs

## 8.0.1 (2016-10-07)

- Adds fallbacks to `formatData` so that data accessor props are optional

## 8.0.0 (2016-10-06)

- Adds `VictoryPortal` which renders a single child in a top level portal container if it exists. Thanks to @nfcampos
- Adds `VictoryGroupContainer` which renders children in a group container with a `clipPath` if clipPath props exist
- Removes `clipPath` properties from `Curve` and `Area` primitives
- `VictoryTransition` only passes `clipPath` props to continuous children (_i.e._ `VictoryLine`, `VictoryArea`)
- Adds an aggressive `shouldComponentUpdate` check to `VictoryTransition` to prevent unnecessary rendering
- Extracts event logic into a new inverted inheritance higher order component `addEvents`
- Moves `Data`, `Domain`, and `Scale` helpers from `victory-chart` to `victory-core`

## 7.0.2 (2016-09-18)

- Minor changes in VictoryTooltip to support native version

## 7.0.1 (2016-09-15)

- Fixes minor bugs related to tooltips

## 7.0.0 (2016-09-09)

**Breaking Changes for `VictoryPie` themes**

- This PR alters the label padding for `VictoryPie` in themes to work with the new `labelRadius` prop.

## 6.1.1 (2016-09-08)

- Fix axis themes

## 6.1.0 (2016-09-07)

- Adds `Flyout` and `Voronoi` primitives
- Adds `VictoryTooltip` a component with `defaultEvents` that renders a label within a flyout when `active={true}` and renders nothing when `active={false}`
- Events now add `this.componentEvents` to the set of events for a component instance
- Adds `getComponentEvents` helper to `Events`
- Padding consistency and small stylistic changes in `VictoryTheme`

## 6.0.2 (2016-09-01)

- Fix `onEnd` animation callback

## 6.0.1 (2016-09-01)

- Add `translateX` prop to `ClipPath`

## 6.0.0 (2016-08-31)

- Adds support for `onLoad` animations
- Adds an `animating` state for `VictoryTransition` so that the global `onEnd` callback is only called after all other transitions have finished
- Fixes a bug in `onExit` clipPath transitions
- Fixes a stylistic bug in the default `grayscale` theme [#117](https://github.com/FormidableLabs/victory-core/issues/117)
- Adds a `TextSize` utility for calculating the size of a text element without needing to render it. Thanks @nightwolfdu!
- Exports all basic svg components from VictoryCore (_i.e._ `Bar`, `Point`, `Slice` etc.)

## 5.1.2 (2016-08-22)

- VictoryLabel: minor changes to support `victory-core-native`

## 5.1.1 (2016-08-18)

- VictoryLabel: Adds a check for `fontSize` given as a string, and strips "px" when present

## 5.1.0 (2016-08-18)

- Updates `builder-victory-component` to fix problems caused by missing lodash methods. Incomplete feature sets using `lodash-webpack-plugin`

## 5.0.2 (2016-08-17)

- Fixes a minor bug in VictoryTheme.material

## 5.0.1 (2016-08-17)

- Fixes a minor bug for VictoryTransition

## 5.0.0 (2016-08-17)

** This is a breaking change for themes **
- Alters the `VictoryTheme` API to match props.
- Adds `VictoryTheme.grayscale`

## 4.6.1 (2016-08-11)

- Fixes a bug for clipPath animations with parentState

## 4.6.0 (2016-08-10)

- Adds `displayName` to components for debugging
- Adds array support for `childName` properties on event objects (attachment and mutation)
- Enhances `onExit` and `onExit` transitions with support for clipPath curtain effect

## 4.5.1 (2016-08-5)

- Fix PropType warnings in React 15.3+
- Add animationInfo as 2nd argument to victory-animation child function call

## 4.5.0 (2016-07-29)

- Remove `reduce-calc-css` dependency.

## 4.4.2 (2016-7-26)

- Creates new getMinValue and getMaxValue array methods in order to maintain dates for domains.

## 4.4.1 (2016-7-12)

- Adjusting the props passed to the text element of VictoryLabel to eliminate error messages

## 4.4.0 (2016-7-11)

- Adding a new propType to validate numbers greater than zero

## 4.3.0 (2016-7-02)

- Supports Victory Native

## 4.2.1 (2016-06-22)

- Fixes a bug that prevented axis labels from displaying properly for vertical axes.

## 4.2.1 (2016-06-21)

- Adds the modifyProps method, which merges component props with theme props and/or fallback props. Helps to further support theme implementation.

## 4.2.0 (2016-06-18)

- Adds VictoryTheme, which allows users to import themes and custom themes into their VictoryChart and VictoryPie components
- Adds a minimalist grayscale theme compatible with all VictoryChart components and VictoryPie

## 4.1.1 (2016-06-16)

- Fixes a bug related to event specificity

## 4.1.0 (2016-06-16)

- Supports events on parent containers via the `parent` namespace in the event prop
- Adds support for an "all" `eventKey` that will apply mutations to all elements of given `childName` and `target`. `parent` events automatically target "all" unless an `eventKey` is given.
- Adds support for applying mutations to arrays of `eventKeys` _i.e._ `[0, 2, 4]`
- Associates parent events with child events via a `container` prop on `VictorySharedEvents`. This is useful where shared events are implicit as in `VictoryChart` and `VictoryStack`

## 4.0.0 (2016-06-12)

- Removes logic related to inverted chart types (i.e. horizontal bars) from the `getRange` method. This is a breaking change for horizontal bars

- Fixes a bug related to VictoryLabel transforms. Transforms provided via styles will now be applied instead of only transforms provided via the `transform` prop

## 3.2.0 (2016-06-09)

- Adds VictoryContainer wrapper for all Victory components via the containerComponent prop. This is added by default
  unless the child component standalone prop is set to true. Helps add roles and optional titles/descriptions to make
  Victory charts more accessible to users using screen readers.

## 3.0.0 (2016-06-01)

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

## 2.1.0 (2016-05-26)

- Upgrades to React 15
- Alters transitions to support wrapped components

## 2.0.1 (2016-05-13)

- Uses `.js` file extension rather than `.jsx`.
- Updates import syntax for `lodash`

## 2.0.0 (2016-05-05)

- Changes how events are stored on state to facilitate interactions between elements
- This is a breaking change, as it will require the namespace to be returned with any other props from the event handler like so:
```
events: {
 data: {
  onClick: () => {
   return { data: { style: {fill: "red"} }, labels: { style: {fill: "black"} } };
  }
 }
}
```

## 1.4.0 (2016-04-14)

- Adds a VictoryTransition wrapper to facilitate enter and exit transitions for any components with an array `data` prop.
- Supports coordinating transitions for deeply nested children (i.e. stacked bar charts)
- Modifies array interpolation so that the interpolated array is never longer than the end array. See https://github.com/d3/d3-interpolate/pull/19

## 1.3.0 (2016-03-28)

- Adds initial enter and exit transition support
- Adds a `labelAngle` prop to VictoryLabel
- Improves transformations

## 1.2.1 (2016-03-15)

- Upgrades to builder 2.9.1 for lodash 4 support

## 1.2.0 (2016-03-11)

- Adds event helper methods
- Adds an events prop to VictoryLabel
- Updates to Babel 6
- Updates to Lodash 4

## 1.1.0 (2016-03-02)

- Add matchDataLength custom proptype

## 1.0.0 (2016-03-01)

- Merge `victory-label@1.0.1`, `victory-util@5.0.0`, `victory-animation@0.1.0` to `victory-core`
- Don't publish source maps to npm or git
- Don't publish `docs/build` directory to npm
- Add `npm start` and `npm test` scripts

### VictoryLabel

- Add support for providing label text as a prop

### VictoryAnimation

- 	Retire `velocity` in favor of `duration` in milliseconds.

Deprecated Subcomponents
========================

Below are the histories of individual subcomponents before they were merged into `victory-core`.

## VictoryLabel

### 1.0.1

- Update victory-util version
- Fix README title
- Use minified file path for gzip size badge

### 1.0.0 (2016-01-29)

- Update `victory-util` for victory archetype bump.
- Remove react peerDependency

### 0.3.1 (2016-01-29)

Update `victory-util` for data accessor feature bump

### 0.3.0 (2016-01-29)

- Update builder and victory archetypes.
- Move lodash and radium dependencies from the archetype to the package

### 0.2.0 (2016-1-26)

Refactor to use shared methods from `victory-util`

### 0.1.9 Alpha (2015-12-17)

We make no promises about any code prior to this release.


## VictoryUtil

### 5.0.0
- 	Remove chart specific methods, consolidate others

### 4.0.0 (2016-01-29)
- Application dependencies like `lodash` now live in components, not in the Builder archetype. This is a breaking change. https://github.com/FormidableLabs/victory/issues/176

### 3.0.0 (2016-01-29)

- Supports data accessor functions!
[more detail](https://github.com/FormidableLabs/victory/issues/84)

Data
 - `Data.consolidateData(props)` -> `Data.formatDatasets(props)`
 - `Data.createAccessor(key)`

PropTypes
  - `integer`
  - `allOfType` - runs a given prop through an array of validators

### 2.1.0 (2016-1-15)

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

### 2.0.3 Alpha (2015-12-16)

We make no promises about any code prior to this release.

# victory-core

## 37.3.6

## 37.3.5

## 37.3.4

## 37.3.3

### Patch Changes

- Upgrade typescript to 5.7.2 ([#2997](https://github.com/FormidableLabs/victory/pull/2997))

* Remove deprecated babel-plugin-lodash plugin ([#2965](https://github.com/FormidableLabs/victory/pull/2965))

- Improve types in victory-core helpers ([#2999](https://github.com/FormidableLabs/victory/pull/2999))

* Zoomed bar graph items will no longer be culled from the view when more than 50% of width or height is outside of the clipping parent. Instead they will be clipped once 100% outside" ([#2970](https://github.com/FormidableLabs/victory/pull/2970))

- fix hydration error using victory line with nextjs ([#2973](https://github.com/FormidableLabs/victory/pull/2973))

## 37.3.2

### Patch Changes

- Fix regression to touchAction override in VictoryContainer ([#2953](https://github.com/FormidableLabs/victory/pull/2953))

## 37.3.1

### Patch Changes

- Remove duplicate types from interfaces ([#2940](https://github.com/FormidableLabs/victory/pull/2940))

## 37.3.0

### Minor Changes

- Clean theme color updates and other minor adjustments ([#2920](https://github.com/FormidableLabs/victory/pull/2920))

* Fix VictoryPortal id changing for every render ([#2929](https://github.com/FormidableLabs/victory/pull/2929))

### Patch Changes

- fix categories array of strings ([#2919](https://github.com/FormidableLabs/victory/pull/2919))

## 37.2.0

### Minor Changes

- Minor updates for clean theme ([#2909](https://github.com/FormidableLabs/victory/pull/2909))

* more minor updates to clean theme ([#2915](https://github.com/FormidableLabs/victory/pull/2915))

### Patch Changes

- replace useId for backwards compatibility ([#2916](https://github.com/FormidableLabs/victory/pull/2916))

## 37.1.2

### Patch Changes

- Fix victory-native container styles ([`eae3fe5dd`](https://github.com/FormidableLabs/victory/commit/eae3fe5dde175e68e146576655cb2e8054ad6456))

## 37.1.1

## 37.1.0

### Minor Changes

- Refactor containers and portal to function components ([#2799](https://github.com/FormidableLabs/victory/pull/2799))

* Pin all internal victory package versions ([#2876](https://github.com/FormidableLabs/victory/pull/2876))

## 37.0.2

### Patch Changes

- Ensure undefined props do not overwrite defaults ([#2852](https://github.com/FormidableLabs/victory/pull/2852))

## 37.0.1

## 37.0.0

### Major Changes

- Upgrade babel dependencies and build target to modern browsers ([#2804](https://github.com/FormidableLabs/victory/pull/2804))

## 36.9.2

### Patch Changes

- Replace lodash keys with native code ([#2811](https://github.com/FormidableLabs/victory/pull/2811))

* Replace lodash identity with native code ([#2829](https://github.com/FormidableLabs/victory/pull/2829))

- Refactor victory-accessible-group to a function component ([#2777](https://github.com/FormidableLabs/victory/pull/2777))

* Convert victory-animation to function component ([#2788](https://github.com/FormidableLabs/victory/pull/2788))

- Replace lodash.invert with native code ([#2830](https://github.com/FormidableLabs/victory/pull/2830))

* Replace lodash difference with native code ([#2828](https://github.com/FormidableLabs/victory/pull/2828))

- Replace lodash array utils with native code ([#2810](https://github.com/FormidableLabs/victory/pull/2810))

* allow VictoryBoxPlot childStyles to override VictoryGroup parent styles ([#2824](https://github.com/FormidableLabs/victory/pull/2824))

- Replace lodash values and mapValues with native code ([#2808](https://github.com/FormidableLabs/victory/pull/2808))

* Replace lodash isNil and isNan with native code ([#2800](https://github.com/FormidableLabs/victory/pull/2800))

- Replace lodash isFunction with native code ([#2802](https://github.com/FormidableLabs/victory/pull/2802))

## 36.9.1

## 36.9.0

### Minor Changes

- Remove prop-types definitions and dependency ([#2758](https://github.com/FormidableLabs/victory/pull/2758))

## 36.8.6

### Patch Changes

- Migrate victory-native to TypeScript ([#2739](https://github.com/FormidableLabs/victory/pull/2739))

## 36.8.5

### Patch Changes

- Replace instances of lodash.assign with Object.assign ([#2757](https://github.com/FormidableLabs/victory/pull/2757))

* Replace instances of lodash.range with equivalent native code ([#2760](https://github.com/FormidableLabs/victory/pull/2760))

## 36.8.4

## 36.8.3

### Patch Changes

- Fix incorrect typescript props ([#2745](https://github.com/FormidableLabs/victory/pull/2745))

* Refactor param reassignments ([#2724](https://github.com/FormidableLabs/victory/pull/2724))

- Migrate victory-shared-events to TypeScript ([#2733](https://github.com/FormidableLabs/victory/pull/2733))

* Migrate victory-tooltip to typescript ([#2725](https://github.com/FormidableLabs/victory/pull/2725))

## 36.8.2

### Patch Changes

- Fix the label background position when using dy fns ([#2720](https://github.com/FormidableLabs/victory/pull/2720))

* Migrate victory-legend to TypeScript ([#2712](https://github.com/FormidableLabs/victory/pull/2712))

## 36.8.1

### Patch Changes

- Correctly type props in Victory Primitives ([#2695](https://github.com/FormidableLabs/victory/pull/2695))

## 36.8.0

### Minor Changes

- Remove v37 experimental code ([#2697](https://github.com/FormidableLabs/victory/pull/2697))

### Patch Changes

- Remove usage of defaultProps from components ([#2679](https://github.com/FormidableLabs/victory/pull/2679))

* Fixed issue where VictoryChart would throw an unhandled exception when passed non-element children (fixes [#2391](https://github.com/FormidableLabs/victory/issues/2391)) ([#2536](https://github.com/FormidableLabs/victory/pull/2536))

- Fix text label measurements after SSR hydration mismatch ([#2626](https://github.com/FormidableLabs/victory/pull/2626))

## 36.7.0

### Minor Changes

- added ref forwarding for path and bar components ([#2673](https://github.com/FormidableLabs/victory/pull/2673))

## 36.6.12

### Patch Changes

- Add aria-hidden flag to svg for textsize util to fix accessibility issue ([#2661](https://github.com/FormidableLabs/victory/pull/2661))

## 36.6.11

### Patch Changes

- Fix text size regression when using line-height ([#2615](https://github.com/FormidableLabs/victory/pull/2615))

## 36.6.10

### Patch Changes

- Setup NPM Provenance ([#2590](https://github.com/FormidableLabs/victory/pull/2590))

## 36.6.9

### Patch Changes

- Lint fixes. ([#2497](https://github.com/FormidableLabs/victory/pull/2497))

* Setup NPM Provenance ([#2587](https://github.com/FormidableLabs/victory/pull/2587))

- Improve accuracy of text size measurements (fixes [#2475](https://github.com/FormidableLabs/victory/issues/2475)) ([#2505](https://github.com/FormidableLabs/victory/pull/2505))

## 36.6.8

### Patch Changes

- Updated dependencies []:
  - victory-vendor@36.6.8

## 36.6.7

### Patch Changes

- Updated dependencies []:
  - victory-vendor@36.6.7

## 36.6.6

### Patch Changes

- Updated dependencies []:
  - victory-vendor@36.6.6

## 36.6.5

### Patch Changes

- Manually included types for Immutable (fixes [#2439](https://github.com/FormidableLabs/victory/issues/2439)) ([#2440](https://github.com/FormidableLabs/victory/pull/2440))

- Updated dependencies [[`6f4972123`](https://github.com/FormidableLabs/victory/commit/6f49721238332bb5ee879571a45b34a04e44d416)]:
  - victory-vendor@36.6.5

## 36.6.4

### Patch Changes

- Allow data accessors to accept any data types (fixes [#2360](https://github.com/FormidableLabs/victory/issues/2360)) ([#2436](https://github.com/FormidableLabs/victory/pull/2436))

- Updated dependencies [[`9a6319cff`](https://github.com/FormidableLabs/victory/commit/9a6319cffbc480711b8c286dcae00575081170f0)]:
  - victory-vendor@36.6.4

## 36.6.3

### Patch Changes

- Do not generate \*.js.map sourcemaps (fixes [#2346](https://github.com/FormidableLabs/victory/issues/2346)) ([#2432](https://github.com/FormidableLabs/victory/pull/2432))

- Updated dependencies [[`4bfc65df5`](https://github.com/FormidableLabs/victory/commit/4bfc65df5a10aa6a10084882ed5c6d0d894dec6f)]:
  - victory-vendor@36.6.3

## 36.6.2

### Patch Changes

- Updated dependencies []:
  - victory-vendor@36.6.2

## 36.6.1

### Patch Changes

- - Removed Template Literal Types to increase TS compatibility (fixes [#2418](https://github.com/FormidableLabs/victory/issues/2418)) ([#2420](https://github.com/FormidableLabs/victory/pull/2420))
  - Improved type for `VictoryLabelProps["textAnchor"]` (fixes [#2361](https://github.com/FormidableLabs/victory/issues/2361))
  - Fixed exported types for `VictoryAxis`, `VictoryBoxPlot`, `VictoryErrorBar`, and `VictoryScatter` (fixes [#2411](https://github.com/FormidableLabs/victory/issues/2411))
  - Migrate `victory-cursor-container` to TS (fixes [#2402](https://github.com/FormidableLabs/victory/issues/2402))
- Updated dependencies []:
  - victory-vendor@36.6.1

## 36.6.0

### Minor Changes

- Migration of victory-errorbar to TypeScript ([#2395](https://github.com/FormidableLabs/victory/pull/2395))

### Patch Changes

- Update source code with minor lint-based improvements (see [#2236](https://github.com/FormidableLabs/victory/issues/2236)). ([#2403](https://github.com/FormidableLabs/victory/pull/2403))

- Updated dependencies [[`a2f48555a`](https://github.com/FormidableLabs/victory/commit/a2f48555adfed15bdb004dc0793f197d90c950a2)]:
  - victory-vendor@36.6.0

## 36.5.3 and earlier

Change history for version 36.5.3 and earlier can be found in our root [CHANGELOG.md](https://github.com/FormidableLabs/victory/blob/main/CHANGELOG.md).

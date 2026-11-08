# victory-canvas

## 38.0.1

No changes in this release.

## 38.0.0

### Major Changes

- [#3138](https://github.com/FormidableLabs/victory/pull/3138) [`b7ebc3e`](https://github.com/FormidableLabs/victory/commit/b7ebc3e316d05740f11d4e8b8072d420db6ccfad) - Require React 18 or later: the `react` peer dependency is now `>=18` (was `>=16.6.0`). If you're on React 16 or 17, stay on Victory 37.x until you upgrade React.

- [#3107](https://github.com/FormidableLabs/victory/pull/3107) [`4c436bd`](https://github.com/FormidableLabs/victory/commit/4c436bd47b835e795e96bc205cdf9c590fe92ddb) - Remove the UMD bundles (`dist/<package>.js` and `dist/<package>.min.js`). To use Victory in the browser without a build step, import it as ESM from a CDN with an import map; see [Using Victory in the browser](https://commerce.nearform.com/open-source/victory/docs/introduction/browser).

- [#3108](https://github.com/FormidableLabs/victory/pull/3108) [`8f16467`](https://github.com/FormidableLabs/victory/commit/8f1646767d6059d764541118284cf71cc1da5c95) - Packages are now built with tsdown and published from `dist/`, with an `exports` map:
  
  - ESM is `dist/*.mjs` and CommonJS is `dist/*.cjs`, with matching `.d.mts`/`.d.cts` types. `main`, `module` and `types` still point at them for older tooling.
  - Only the package root (and `package.json`) can be imported. Deep imports into `lib/`, `es/` or `src/` no longer resolve; import from the package root instead (for example `import { Helpers } from "victory-core"`).
  - The output targets ES2022 and is no longer down-leveled further. If you support older browsers, transpile `node_modules` in your bundler.
  - `src/` is no longer published.

### Patch Changes

- [#3115](https://github.com/FormidableLabs/victory/pull/3115) [`1864919`](https://github.com/FormidableLabs/victory/commit/18649193d7c8d42a8f5f58ade9c63288af68a7f8) - Fix `VictoryLabel`'s default `fontFamily`: an invisible soft hyphen inside `'Seravek'` meant that font never matched. Remove the unused `lodash` dependency from `victory-canvas`, `victory-histogram` and `victory-scatter`.

## 37.4.1

No changes in this release.

## 37.4.0

No changes in this release.

## 37.3.6

## 37.3.5

## 37.3.4

## 37.3.3

## 37.3.2

## 37.3.1

## 37.3.0

## 37.2.0

## 37.1.2

### Patch Changes

- Fix victory-native container styles ([`eae3fe5dd`](https://github.com/FormidableLabs/victory/commit/eae3fe5dde175e68e146576655cb2e8054ad6456))

## 37.1.1

## 37.1.0

### Minor Changes

- Pin all internal victory package versions ([#2876](https://github.com/FormidableLabs/victory/pull/2876))

## 37.0.2

## 37.0.1

## 37.0.0

### Major Changes

- Upgrade babel dependencies and build target to modern browsers ([#2804](https://github.com/FormidableLabs/victory/pull/2804))

## 36.9.2

## 36.9.1

## 36.9.0

### Minor Changes

- Remove prop-types definitions and dependency ([#2758](https://github.com/FormidableLabs/victory/pull/2758))

## 36.8.6

## 36.8.5

### Patch Changes

- Replace instances of lodash.assign with Object.assign ([#2757](https://github.com/FormidableLabs/victory/pull/2757))

## 36.8.4

## 36.8.3

### Patch Changes

- Fix incorrect typescript props ([#2745](https://github.com/FormidableLabs/victory/pull/2745))

## 36.8.2

### Patch Changes

- Migrate victory-canvas to TypeScript ([#2710](https://github.com/FormidableLabs/victory/pull/2710))

## 36.8.1

## 36.8.0

## 36.7.0

## 36.6.12

## 36.6.11

## 36.6.10

### Patch Changes

- Setup NPM Provenance ([#2590](https://github.com/FormidableLabs/victory/pull/2590))

## 36.6.9

### Patch Changes

- Setup NPM Provenance ([#2587](https://github.com/FormidableLabs/victory/pull/2587))

## 36.6.8

### Patch Changes

- Updated dependencies []:
  - victory-bar@36.6.8
  - victory-core@36.6.8

## 36.6.7

### Patch Changes

- Updated dependencies []:
  - victory-bar@36.6.7
  - victory-core@36.6.7

## 36.6.6

### Patch Changes

- Updated dependencies []:
  - victory-bar@36.6.6
  - victory-core@36.6.6

## 36.6.5

### Patch Changes

- Updated dependencies [[`6f4972123`](https://github.com/FormidableLabs/victory/commit/6f49721238332bb5ee879571a45b34a04e44d416)]:
  - victory-core@36.6.5
  - victory-bar@36.6.5

## 36.6.4

### Patch Changes

- Added explicit `any` type defs (fixes [#2358](https://github.com/FormidableLabs/victory/issues/2358)) ([`57ed0fe30`](https://github.com/FormidableLabs/victory/commit/57ed0fe304dbc8753da1126a02d44de8004e96aa))

* Allow data accessors to accept any data types (fixes [#2360](https://github.com/FormidableLabs/victory/issues/2360)) ([#2436](https://github.com/FormidableLabs/victory/pull/2436))

* Updated dependencies [[`9a6319cff`](https://github.com/FormidableLabs/victory/commit/9a6319cffbc480711b8c286dcae00575081170f0)]:
  - victory-core@36.6.4
  - victory-bar@36.6.4

## 36.6.3

### Patch Changes

- Do not generate \*.js.map sourcemaps (fixes [#2346](https://github.com/FormidableLabs/victory/issues/2346)) ([#2432](https://github.com/FormidableLabs/victory/pull/2432))

- Updated dependencies [[`4bfc65df5`](https://github.com/FormidableLabs/victory/commit/4bfc65df5a10aa6a10084882ed5c6d0d894dec6f)]:
  - victory-bar@36.6.3
  - victory-core@36.6.3

## 36.6.2

### Patch Changes

- Updated dependencies []:
  - victory-bar@36.6.2
  - victory-core@36.6.2

## 36.6.1

### Patch Changes

- Updated dependencies [[`d1f281104`](https://github.com/FormidableLabs/victory/commit/d1f281104c7598c43e220dafd57546ab03daeeb5)]:
  - victory-core@36.6.1
  - victory-bar@36.6.1

## 36.6.0

### Patch Changes

- Update source code with minor lint-based improvements (see [#2236](https://github.com/FormidableLabs/victory/issues/2236)). ([#2403](https://github.com/FormidableLabs/victory/pull/2403))

- Updated dependencies [[`fed5a5072`](https://github.com/FormidableLabs/victory/commit/fed5a507299b337846eed3d873ec7eb91bc69668), [`a2f48555a`](https://github.com/FormidableLabs/victory/commit/a2f48555adfed15bdb004dc0793f197d90c950a2)]:
  - victory-core@36.6.0
  - victory-bar@36.6.0

## 36.5.3 and earlier

Change history for version 36.5.3 and earlier can be found in our root [CHANGELOG.md](https://github.com/FormidableLabs/victory/blob/main/CHANGELOG.md).

#VictoryCanvas

This is an experimental set of primitive components that can be used in place of the default Victory primitives to render data to a Canvas container rather than SVG.

The current version of this package includes components for line, bar, and scatter charts.

Example usage:

```jsx
<VictoryLine
  groupComponent={<CanvasGroup />}
  dataComponent={<CanvasCurve />}
  data={data}
/>
```

```jsx
<VictoryBar
  groupComponent={<CanvasGroup />}
  dataComponent={<CanvasBar />}
  data={data}
/>
```

```jsx
<VictoryScatter
  groupComponent={<CanvasGroup />}
  dataComponent={<CanvasPoint />}
  data={data}
/>
```

This package currently exports:

- `CanvasGroup`
- `CanvasCurve`
- `CanvasPoint`
- `CanvasBar`

Please visit our documentation site to read more about these components
https://formidable.com/open-source/victory

To suggest an addition or correction to this documentation please see https://github.com/FormidableLabs/victory/blob/main/docs/src/content/docs

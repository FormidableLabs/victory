---
id: 26
title: VictoryTheme
category: more
type: docs
scope: null
---
# VictoryTheme

Implement themes for your Victory charts. `VictoryTheme` allows you to create a consistent look across all of your chart elements, either by using one of the included themes or by creating your own. `VictoryTheme` and custom themes are supported by all Victory components. By default, Victory components use the [grayscale theme][].

[See all Victory Themes here][].

To create your own theme, create an object with props and styles specified for any combination of the following namespaces:

*Note:* The `dependentAxis` and `independentAxis`, `polarDependentAxis`, and `polarIndependentAxis` will be merged with any props and styles supplied in the `axis` namespace.

```js
{
  area: {...props},
  axis: {...props},
  dependentAxis: {...props},
  independentAxis: {...props},
  polarDependentAxis: {...props},
  polarIndependentAxis: {...props},
  bar: {...props},
  candlestick: {...props},
  chart: {...props},
  errorbar: {...props},
  histogram: {...props},
  group: {...props},
  legend: {...props},
  line: {...props},
  pie: {...props},
  scatter: {...props},
  stack: {...props},
  tooltip: {...props},
  voronoi: {...props}
}
```

[grayscale theme]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-theme/grayscale.js
[See all Victory Themes here]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-theme

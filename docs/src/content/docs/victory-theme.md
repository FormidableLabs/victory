---
id: 26
title: VictoryTheme
category: more
type: docs
scope: null
---
# VictoryTheme

Implement themes for your Victory charts. `VictoryTheme` allows you to create a consistent look across all of your chart elements, either by using one of the included themes or by creating your own. `VictoryTheme` and custom themes are supported by all Victory components. By default, Victory components use the [grayscale theme][].

[Read more about themes here][].

To create your own theme, create an object with props and styles specified for any combination of the following namespaces:

*Note:* The `dependentAxis` and `independentAxis` will be merged with any props and styles supplied in the `axis` namespace.

```js
{
  area: {...props},
  axis: {...props},
  dependentAxis: {...props},
  independentAxis: {...props},
  bar: {...props},
  candlestick: {...props},
  chart: {...props},
  errorbar: {...props},
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

[grayscale theme]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/grayscale.js
[Read more about themes here]: /guides/themes

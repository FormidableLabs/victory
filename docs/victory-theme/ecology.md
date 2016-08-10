VictoryTheme
=============

Implement themes for your Victory charts. VictoryTheme allows you to create a consistent look across all of your chart elements, either using the included Material theme (more themes coming - stay tuned) or by creating your own. VictoryTheme and custom themes are supported by all Victory components, including [VictoryPie][].

## Features

### Material Theme

Using VictoryTheme.material for a component's ```theme``` prop applies a clean, bright style to your charts.

VictoryTheme works across all component types - it can be applied to chart components themselves.

``` playground
<svg style={{width: "100%", height: "100%"}} viewBox="0 25 350 300">
  <VictoryAxis
    theme={VictoryTheme.material}
    standalone={false}
  />
  <VictoryCandlestick
    theme={VictoryTheme.material}
    standalone={false}
    domainPadding={5}
  />
</svg>
```

It can be applied to VictoryStack or VictoryGroup, and then passed down to wrapped chart components.

```playground
<VictoryStack theme={VictoryTheme.material}>
  {range(6).map((index) => {return <VictoryArea key={index}/>})}
</VictoryStack>
```

It can even be applied to [VictoryChart][] and passed down to all subsequent child components.

```playground
<VictoryChart theme={VictoryTheme.material}>
  <VictoryGroup
    height={500}
    offset={20}
  >
    <VictoryBar
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 1}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 2}
      ]}
    />
  </VictoryGroup>
</VictoryChart>
```

### Create Your Own Custom Theme Object

Most chart types only need styles from a theme object, like [VictoryScatter][] and [VictoryLine][], below.

```playground_norender
class App extends React.Component {
  render() {
    const myTheme = {
      scatter: {
        data: {
          fill: "red"
        },
        labels: {
          padding: -25,
          fontFamily: "Garamond"
        },
        // even if one of the subobjects isn't being utilized,
        // it needs to exist for the theme to be supported
        parent: {}
      },
      line: {
        data: {
          stroke: "red",
          fill: "none"
        },
        labels: {
          padding: 15,
          fontFamily: "Garamond"
        },
        parent: {}
      }
    };

    const data = [
      {x: 1, y: 1},
      {x: 2, y: 4},
      {x: 3, y: 2},
      {x: 4, y: 6},
      {x: 5, y: 5},
      {x: 6, y: 9}
    ];

    return (
      <svg style={{width: "100%", height: "100%"}} viewBox="0 25 350 300">
        <VictoryScatter
          data={data}
          size={7}
          theme={myTheme}
          labels={["1", "2", "3", "4", "5", "6"]}
        />
        <VictoryLine
          data={data}
          theme={myTheme}
          label="Hello"
        />
      </svg>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

[VictoryCandlestick][] has a special theme object with both style and props sub-objects. This is how you alter VictoryCandlestick's ```candleColors``` prop within a theme.

```playground_norender
class App extends React.Component {
  render() {
    const myTheme = {
      candlestick: {
        style: {
          data: {
            stroke: "none"
          },
          labels: {},
          parent: {}
        },  
        props: {
          candleColors: {
            positive: "aqua",
            negative: "black"
          }
        }
      }  
    };

    const data = [
      {x: 1, open: 10, close: 4, high: 11, low: 1},
      {x: 2, open: 5, close: 7, high: 10, low: 4},
      {x: 3, open: 7, close: 3, high: 7, low: 2},
      {x: 4, open: 7, close: 10, high: 15, low: 6},
      {x: 5, open: 10, close: 12, high: 18, low: 5},
      {x: 6, open: 12, close: 9, high: 13, low: 9}
    ];

    return (
        <VictoryCandlestick
          theme={myTheme}
          data={data}
        />
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

If you want to set a custom chart width and height across all components using the theme, or set a theme-wide ```colorScale```, you can use the props sub-object within the theme.

```playground_norender
class App extends React.Component {
  render() {
    const myTheme = {
      bar: {
        data: {},
        labels: {},
        parent: {}
      },
      props: {
        colorScale: ["red", "orange", "yellow", "green", "blue", "purple"],
        height: 400,
        width: 400
      }  
    };

    return (
        <VictoryStack theme={myTheme}>
          {range(6).map((index) => {return <VictoryBar key={index}/>})}
        </VictoryStack>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

Want to create a full theme object like Victory's Material theme? Here's the skeleton structure for that: 

```
{
  area: {
    data: {},
    labels: {},
    parent: {}
  },
  axis: {
    axis: {},
    axisLabel: {},
    grid: {},
    ticks: {},
    tickLabels: {}
  },
  bar: {
    data: {},
    labels: {},
    parent: {}
  },
  candlestick: {
    data: {},
    labels: {},
    parent: {},
    props: {}
  },
  errorbar: {
    data: {},
    labels: {},
    parent: {}
  },
  line: {
    data: {},
    labels: {},
    parent: {}
  },
  pie: {
    props: {},
    style: {
      data: {},
      labels: {},
      parent: {}
    }
  },
  scatter: {
    data: {},
    labels: {},
    parent: {}
  },
  props: {}
};

```

### Flexible and Overrideable

Any aspect of a theme can be overriden via direct props on a component.

Styles passed to a chart component via the ```style``` prop take precedence over styles that may be passed from a theme.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={15}
>
  <VictoryBar
    style={{data: {fill: "purple"}}}
    data={[
      {x: 1, y: 2},
      {x: 2, y: 3},
      {x: 3, y: 4},
      {x: 4, y: 5},
      {x: 5, y: 6}
    ]}
  />
</VictoryChart>
```

Color scales can also be overridden by child elements when a theme is passed into a wrapper element.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={20}
>
  <VictoryStack colorScale={"red"}>
    {range(5).map((index) => {return <VictoryBar key={index}/>})}
  </VictoryStack>
</VictoryChart>
```

[VictoryLine]: http://formidable.com/open-source/victory/docs/victory-line
[VictoryChart]: http://formidable.com/open-source/victory/docs/victory-chart
[VictoryScatter]: http://formidable.com/open-source/victory/docs/victory-scatter
[VictoryPie]: http://formidable.com/open-source/victory/docs/victory-pie
[VictoryLine]: http://formidable.com/open-source/victory/docs/victory-line
[VictoryCandlestick]: http://formidable.com/open-source/victory/docs/victory-candlestick

VictoryTheme
=============

Implement themes for your Victory charts. VictoryTheme allows you to create a consistent look across all of your chart elements, either by using one of the included themes or by creating your own. VictoryTheme and custom themes are supported by all Victory components.

## Grayscale Theme

All victory components use the `grayscale` theme by default. This theme is built to be as simple and unobtrusive as possible

```playground
<VictoryChart>
  <VictoryStack
    height={500}
  >
    <VictoryArea
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3}
      ]}
    />
    <VictoryArea
      data={[
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 1}
      ]}
    />
    <VictoryArea
      data={[
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 2}
      ]}
    />
  </VictoryStack>
</VictoryChart>
```



But it can easily be extended with `style` and other props, like `colorScale`

```playground
<VictoryChart>
  <VictoryStack
    height={500}
    colorScale={[
      "black", "tomato", "orange"
    ]}
    style={{
      data: {opacity: 0.6}
    }}
  >
    <VictoryArea
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3}
      ]}
    />
    <VictoryArea
      data={[
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 1}
      ]}
    />
    <VictoryArea
      data={[
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 2}
      ]}
    />
  </VictoryStack>
</VictoryChart>
```

### Material Theme

Using `VictoryTheme.material` for a component's `theme` prop applies a clean, bright style to your charts.

``` playground
<VictoryChart theme={VictoryTheme.material}>
  <VictoryLine
    interpolation="natural"
    y={(data) =>
      Math.sin(2 * Math.PI * data.x) + 1
    }
  />
  <VictoryScatter 
    y={(data) =>
      Math.sin(2 * Math.PI * data.x) + 1
    }
    samples={15}
  />
</VictoryChart>
```

Themes may be supplied to wrapper components like [VictoryChart][] or [VictoryStack][], and they will be applied to all child components as well.

```playground
<VictoryChart theme={VictoryTheme.material}>
  <VictoryStack>
    {
      range(6).map((index) => {
        return <VictoryArea key={index}/>
      })
    }
  </VictoryStack>
</VictoryChart>
```

### Create Your Own Custom Theme Object

Theme objects may be provided with `style` and any other props related to layout such as `width` and `height`, and even props like `symbol` and `size` as in [VictoryScatter][] below.

```playground_norender
class App extends React.Component {
  render() {
    const myTheme = {
      scatter: {
        style: {
          data: {
            fill: "red"
          },
          labels: {
            padding: -25,
            fontFamily: "Garamond"
          }
        },
        symbol: "star",
        size: 7
      },
      line: {
        style: {
          data: {
            stroke: "red",
            strokeWidth: 3,
            fill: "none"
          }
        }
      }
    };

    return (
      <VictoryGroup
        data={[
          {x: 1, y: 1},
          {x: 2, y: 4},
          {x: 3, y: 2},
          {x: 4, y: 6},
          {x: 5, y: 5},
          {x: 6, y: 9}
        ]}
        theme={myTheme}
      >
        <VictoryLine/>
        <VictoryScatter
          labels={["1", "2", "3", "4", "5", "6"]}
        />
      </VictoryGroup>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

Want to create a full theme object like Victory's Material theme? Just start adding props to the following namespaces, just as you would if you were providing props to corresponding Victory components. Please note that only props that affect layout and appearance are supported. `data`, `scale`, etc. as well as any custom components should still be provided via props rather than themes.

You can try editting the Victory themes and creating your own in the interactive [Theme Park](https://formidable.com/open-source/victory/recipes/theme-park).

```
{
  area: {
    
  },
  axis: {
    
  },
  bar: {
    
  },
  candlestick: {
    
  },
  chart: {

    },
  errorbar: {
    
  },
  group: {

  },
  line: {
    
  },
  pie: {
    
  },
  scatter: {
    
  },
  stack: {

  }
};

```

### Flexible and Overrideable

Any aspect of a theme can be overriden via direct props on a component.

Styles passed to a chart component via the `style` prop take precedence over styles that may be passed from a theme.

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

Props such as `colorScale` can also be overridden by child elements when a theme is passed into a wrapper element.

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
[VictoryCandlestick]: http://formidable.com/open-source/victory/docs/victory-candlestick

VictoryTheme
=============

Implement themes for your Victory charts. VictoryTheme allows you to create a consistent look across all of your chart elements, either using the included Material theme (more themes coming - stay tuned) or by creating your own. VictoryTheme and custom themes are supported by all Victory components.

## Material Theme

### A Consistent Look for Your Charts

Using VictoryTheme.material for a component's ```theme``` prop applies a clean, bright style to your charts.

``` playground
<VictoryChart/>
```

VictoryTheme works across all component types - it can be applied to chart components themselves.

```playground
<VictoryChart>
  <VictoryLine
    y={(data) => 0.5 * data.x * data.x}/>
</VictoryChart>
```

It can be applied to VictoryStack or VictoryGroup, and then passed down to wrapped chart components.

```playground
<VictoryChart>
  <VictoryLine
    y={(data) => 0.5 * data.x * data.x}/>
</VictoryChart>
```

It can also be applied to VictoryChart, and then passed down to all child components including VictoryAxis, VictoryStack, VictoryGroup, and whatever the core chart components may be.

### Create Your Own Custom Theme Object

Example of a partial custom theme object for two combined charts (scatter and line maybe)

Example of a partial custom theme object for candlestick or errorbar which use props

Example of a partial custom theme object for stack or group which uses main props

Link to the overall structure of the theme object?

```playground_norender
class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryScatter
          data={this.context.dataset}
        />
      </VictoryChart>
    );
  }
}

App.contextTypes = {
  dataset: React.PropTypes.array
};

ReactDOM.render(<DatasetDropdown dataset={dataset}><App/></DatasetDropdown>, mountNode);
```

### Flexible and Overrideable

Colorscale can be overridden if a VictoryStack is passed in

Data color can be overridden

Everything can be overridden omg - props.style is prioritized


```playground
<VictoryChart>
  <VictoryLine
    style={{data:
      {stroke: "red", strokeWidth: 4}
    }}
    y={(data) =>
      Math.sin(2 * Math.PI * data.x)
    }
  />
  <VictoryLine
    style={{data:
      {stroke: "blue", strokeWidth: 4}
    }}
    y={(data) =>
      Math.cos(2 * Math.PI * data.x)
    }
  />
</VictoryChart>
```

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
[VictoryAxis]: http://formidable.com/open-source/victory/docs/victory-axis
[VictoryArea]: http://formidable.com/open-source/victory/docs/victory-area
[VictoryLine]: http://formidable.com/open-source/victory/docs/victory-line
[VictoryErrorBar]: http://formidable.com/open-source/victory/docs/victory-errorbar
[VictoryScatter]: http://formidable.com/open-source/victory/docs/victory-scatter
[VictoryBar]: http://formidable.com/open-source/victory/docs/victory-bar
[VictoryCandlestick]: http://formidable.com/open-source/victory/docs/victory-candlestick

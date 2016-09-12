VictoryVoronoi
=============

`VictoryVoronoi` divides the usable `svg` area into polygons based on data. Each polygon represents the area of the `svg` that is closest to a given data point. Transparent voronoi overlays are useful for attaching events to data, as they provide a larger interactive area than a point or a line might. Because of this intended use, `VictoryVoronoi` is transparent by default. `VictoryVoronoiTooltip` is a modification of `VictoryVoronoi` that uses `VictoryTooltip` and default events. 

## Voronoi Polygons

An example of a voronoi diagram is shown below. The regions have been colored in this example, but they are styled transparent by default.


```playground
<VictoryVoronoi
  data={
    range(20).map(() => {
      return {
        x: random(600),
        y: random(600)
      };
    })
  }
  style={{
    data: {
      fill: "grey", 
      strokeWidth: 2,
      stroke: "black"
    }
  }}
/>  
```


## Voronoi ClipPath

When it isn't appropriate for voronoi polygons to fill the entire `svg` area, their size can be limited with the `size` prop. Circular sections of radius `size` will be drawn for each point, and restricted to their voronoi areas via clipPath

```playground
<VictoryVoronoi
  size={30}
  data={
    range(20).map(() => {
      return {
        x: random(600),
        y: random(600)
      };
    })
  }
  style={{
    data: {
      fill: "grey", 
      strokeWidth: 2
    }
  }}
/>  
```

## Fully Featured

`VictoryVoronoi` supports the same set of features as other victory components. Animation and events are included.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData() {
    return range(20).map(() => {
      return {
        x: random(100),
        y: random(100)
      };
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryVoronoi
        animate={{ duration: 2000 }}
        data={this.getData()}
        style={{
          data: {
            fill: "grey", 
            strokeWidth: 2, 
            stroke: "black"
          }
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: () => {
                      return {style: {fill: "black"}};
                    }
                  }
                ];
              }
            }
          }
        ]}
      />
    );
  }
}
ReactDOM.render(<App/>, mountNode);

```
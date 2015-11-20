# Victory

Victory is a collection of composable React components you can use to build interactive data visualizations.

### Overarching benefits and motivations

1. Bridge the gap between beginners (more likely to use Chart.js or Highcharts) and experts (more likely to use D3)
  a. Provide a gradient of customization, from none (just pass in data) to full (build your own visualization features)
  b. Provide interactive documentation to help developers get visualizations into their projects (see [ecology.js](https://github.com/FormidableLabs/ecology)) see [victory-chart](projects.formidablelabs.com/victory-chart/) for an example
  c. Provide better developer UX generally, for both instantiating data visualizations and creating them
2. Leverage the power of React to handle DOM, component lifecycle, state, computed styles, etc.
3. Make data visualizations first class citizens in the open source community
  a. Repos rather than gists
  b. forking / issues for continual improvement
  c. `package.json` for dependencies
  d. minified dists / umd builds for CDN
  e. Babel for ES6
  f. Webpack for builds
  g. `propTypes` for input validation
  h. Hot Reloading
  i. sourcemaps
  j. `eslintrc`
  k. Tests

### Using Victory

Victory components can be dropped into your project in seconds. Here's an example, using `victory-pie`.

In your terminal:

`$ npm install victory-pie`

In a view in your React app...

`import {VictoryPie} from "victory-pie";

...

```
render() {
  <VictoryPie/>
}

```

...will render a victory component with default data. The data visualization can then be configured with props...

```
<VictoryPie
  endAngle={90}
  startAngle={-90}
  innerRadius={140}
  style={{
    labels: {
      padding: -70
    },
    data: {
      stroke: "transparent",
      opacity: 0.3
    }
  }}
  data={[
    { x: "Cats", y: 400 },
    { x: "Dogs", y: 350 },
    { x: "Frogs", y: 25 },
    { x: "Turtles", y: 55 },
    { x: "Chimps", y: 5 }
  ]}/>
```

...and completely overridden with child components:

```
/* where VictoryLabel is your custom label component */

<VictoryPie>
  <VictoryLabel/>
</VictoryPie>
```

### Why React made Victory possible

* React's DOM model makes D3's DOM model unnecessary
* React's component lifecycle management makes D3's data binding API's unnecessary
* Components are composable
* Radium means components own their styles and style events
* Components handle their own state, making it easier to share stateful visualizations (such as collapsible trees)
* [Component playground](http://projects.formidablelabs.com/component-playground/) is the basis for [ecology.js](https://github.com/FormidableLabs/ecology)
* React components are a unit of code that can be installed via `npm`

### How Victory compares to D3

Victory relies on React, or reimplements, the following APIs:

```
.selectAll()
.select()
.data()
.enter()
.exit()
.update()
.transition()
.axis()
.brush()
```

Here's an example of markup in D3:

```
var node = svg.selectAll(".node")
  .data(graph.nodes)
  .enter().append("circle")
  .attr("class", "node")
  .attr("r", 5)
  .style("fill", function (d) {
    return color(d.group);
  })
```
In Victory, this is just SVG markup:

```
<g>
  <circle
    r={5}
    fill={datum.group)}
    style={{
      fill: datum.value > 5 ? "red" : "blue"
    }}/>
  <text> {datum.label} </text>
</g>
```
Because while D3 requires the chain of functions to accomodate its data binding API:

```
.data(data)
.enter()
.append("g")
```

Victory does not!

```
let nodesSVG = arrayOfNodes.map((node)=>{
  return (
    /* markup */
  )
})
```

Here's an example of handling state in a collapsible tree in D3 - a minimal implementation that mutates:

```
// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
```

State in Victory uses React's component API, which allows every node in a tree to manage its own state and the state of its child nodes, assuming it is instantiated recursively:

```
  this.setState({showChildrenOfThisNode: false})
```

If you'd like to check out the difference in the animation models, head over to [victory-animation](https://github.com/FormidableLabs/victory-animation)

### Where to go from here

Go check out the docs! http://victory.formidable.com

# Victory

Victory is a collection of composable React components you can use to build interactive data visualizations.

### Overarching benefits and motivations

We built Victory because we wanted to bridge the gap between beginners (more likely to use Chart.js or Highcharts) and experts (more likely to use D3). This meant that we had to provide a gradient of customization, from none (just pass in data) to full (build your own visualization features). It also meant focusing on developer UX generally, and led us to provide interactive documentation to help developers get visualizations into their projects (see [ecology.js](https://github.com/FormidableLabs/ecology)) see [victory-chart](projects.formidablelabs.com/victory-chart/) for an example.

Thanks to React's expressiveness this had the lovely byproduct of making data visualizations first class citizens in the open source ecosystem. Victory components *each* have:
  * Repos rather than gists
      * forking / issues / prs for continual improvement
  * `package.json` for dependencies
  * minified dists / umd builds for CDN
  * Babel for ES6
  * Webpack for builds
  * `propTypes` for input validation
  * Hot Reloading
  * sourcemaps
  * `eslintrc`
  * Tests

### Why React made Victory possible

* React's DOM model makes D3's DOM model unnecessary
* React's component lifecycle management makes D3's data binding API's unnecessary
* React allows encapsulation of state + style + behavior in a reusable component
* JSX syntax is awesome for component composition
* Radium means components own their styles and style events, can compute them based on data
* Components handle their own state, making it easier to share stateful visualizations (such as collapsible trees)
* [Component playground](http://projects.formidablelabs.com/component-playground/) is the basis for [ecology.js](https://github.com/FormidableLabs/ecology)

If you'd like to check out the difference in the animation models, head over to [victory-animation](https://github.com/FormidableLabs/victory-animation)

### Where to go from here

Go check out the docs! http://victory.formidable.com

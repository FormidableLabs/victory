---
id: 11
title: Zoom on Large Datasets
category: guides
scope:
  - _
---
# Zoom on Large Datasets

Victory can handle hundreds of data points, but what if you'd like chart thousands of points?
[VictoryZoomContainer][] can be useful here, allowing the user to focus on the subset of data they are most interested in.

By default Victory will render all data points in a dataset.
For large datasets this behavior can be overridden, and this guide will show you how.
If you haven't used it before, read about the [VictoryZoomContainer][] first, then come back to this guide.

In a hurry? [Skip to the demo][].

## Basic scenario: time-series data

In this guide, we'll be working with time-series data. We'll make a few basic assumptions:

1.  zooming will be done only on the x (or time) dimension,
2.  our data will be ordered by x, from earliest to latest, and
3.  the dataset is static - no new data will arrive while the user is interacting with the chart.

These just serve to simplify the example. We'll start with a simple chart:

```js
class CustomChart extends React.Component {
	render() {
  	return (
      <VictoryChart containerComponent={<VictoryZoomContainer/>}
        <VictoryScatter data={this.props.data} />
      </VictoryChart>
    );
  }
}

ReactDOM.render(<CustomChart data={allData}/>, mountNode);
```

## Render only visible points

Rather than passing all our data to the `data` prop, we'll first remove any data that isn't currently visible.
To do this, we must keep track of the chart's visible domain;
[VictoryZoomContainer][] has an `onZoomDomainChange` prop that will allow us to do exactly that:

```js
<VictoryChart
  containerComponent={<VictoryZoomContainer
    onZoomDomainChange={this.onDomainChange.bind(this)}
  />}
>
  <VictoryScatter data={this.getData()} />
</VictoryChart>
```

Update the state every time the domain changes (note that we are only keeping track of the `x` dimension):

```js
onDomainChange(domain) {
  this.setState({
    zoomedXDomain: domain.x,
  });
}
```

Use this `zoomedXDomain` state to filter out all data that isn't currently visible.
Here we're making a simple `getData` method; note the data array's `filter` function:

```js
getData() {
  const { zoomedXDomain } = this.state;
  const { data } = this.props;
  return data.filter(
    // is d "between" the ends of the visible x-domain?
    (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));
}
```

Because we are dynamically changing the `data` prop on [VictoryChart][],
we must also explicitly set its `domain`.
By default `VictoryChart` will calculate a domain from `data`;
in this case that would mean that the chart would "forget" about the rest of the data as the user zoomed in.
In fact, there would be no way to zoom back out!

To remedy this, we must calculate the domain of the entire dataset:

```js
getEntireDomain(props) {
  const { data } = props;
  return {
    y: [_.minBy(data, d => d.y).y, _.maxBy(data, d => d.y).y],
    x: [ data[0].x, _.last(data).x ]
  };
}
```

We use [Lodash][]'s `minBy` and `maxBy` functions to find the domain of `y`.
Because we assume that the data is ordered by `x`, we can use the first and last points for the `x` domain.

Because we are assuming the data is static we just need to call this function once, in the constructor of `CustomChart`.
The calculated `x` domain will also be used as the initial value for `state.zoomedXDomain`:

```js
constructor(props) {
  super();
  this.entireDomain = this.getEntireDomain(props);
  this.state = {
    zoomedXDomain: this.entireDomain.x,
  };
}
```

The static value `this.entireDomain` can then be used by `VictoryChart`:
```js
<VictoryChart
  domain={this.entireDomain}
  containerComponent={<VictoryZoomContainer
    zoomDimension="x"
    onZoomDomainChange={this.onDomainChange.bind(this)}
  />}
>
  <VictoryScatter data={this.getData()} />
</VictoryChart>
```

Now we are only rendering the visible points, but this step isn't nearly enough:
when the chart is zoomed out we still render all of the data points!

## Render a small sample of points

There are a number of possible methods to reducing the number of visible data points rendered.
We'll use the simplest method: selecting only every `k`th point, and discarding all others.
`k` is determined simply:
if there are 5,000 points and we only want to show 100, then `k` is 50.

We'll add a `maxPoints` prop to `CustomChart`
which will determine the maximum number of points returned by `getData`.
All of the existing logic in `getData` will stay
and another `filter` will be added afterwards:

```js
getData() {
  const { zoomedXDomain } = this.state;
  const { data, maxPoints } = this.props;
  const filtered = data.filter(
    (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));

  // new code here...
  if (filtered.length > maxPoints ) {
    const k = Math.ceil(filtered.length / maxPoints);
    return filtered.filter(
      (d, i) => ((i % k) === 0)
    );
  }
  return filtered;
}
```

Now the chart will always render at most `maxPoints`,
no matter the zoom level.

## Demo

```playground_norender
// 10000 points (10 / 0.001 = 10000) - see what happens when you render 50k or 100k
const allData = _.range(0, 10, 0.001).map(x => ({
	x: x,
  y: Math.sin(Math.PI*x/2) * x / 10
}));

class CustomChart extends React.Component {
  constructor(props) {
  	super();
    this.entireDomain = this.getEntireDomain(props);
   	this.state = {
    	zoomedXDomain: this.entireDomain.x,
    };
  }
	onDomainChange(domain) {
  	this.setState({
    	zoomedXDomain: domain.x,
    });
  }
  getData() {
  	const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
  	const filtered = data.filter(
    	(d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));

    if (filtered.length > maxPoints ) {
      const k = Math.ceil(filtered.length / maxPoints);
    	return filtered.filter(
      	(d, i) => ((i % k) === 0)
      );
    }
    return filtered;
  }
  getEntireDomain(props) {
  	const { data } = props;
    return {
    	y: [_.minBy(data, d => d.y).y, _.maxBy(data, d => d.y).y],
      x: [ data[0].x, _.last(data).x ]
    };
  }
  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return _.round(factor, factor < 3 ? 1 : 0);
  }
	render() {
    const renderedData = this.getData();
  	return (
    	<div>
        <VictoryChart
          domain={this.entireDomain}
          containerComponent={<VictoryZoomContainer
            zoomDimension="x"
            onZoomDomainChange={this.onDomainChange.bind(this)}
            minimumZoom={{x: 1/10000}}
          />}
        >
          <VictoryScatter data={renderedData} />
        </VictoryChart>
        <div>
          {this.getZoomFactor()}x zoom;
          rendering {renderedData.length} of {this.props.data.length}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<CustomChart data={allData} maxPoints={120} />, mountNode);
```

## Extending this Demo

This guide serves a start, but you might have some questions:

* _How big should `maxPoints` be?_ For most situations between 50 and 150 is ideal.
* _What if I want to render millions of data points?_ This concept can be extended to millions of points, but you'll need the help of a library to handle the sampling. Try [Crossfilter][].
* _Can I remove the "flicker" of points as I zoom in?_ Yes, but `getData()` will have to be a little more complex.
This apparent movement of the points while zooming happens because different points are chosen to be displayed.
Here is an example that reduces flicker by reliably choosing the same data points to display:

```js
getData() {
	const { zoomedXDomain } = this.state;
	const { data, maxPoints } = this.props;

	const startIndex = data.findIndex((d) => d.x >= zoomedXDomain[0]);
	const endIndex = data.findIndex((d) => d.x > zoomedXDomain[1]);
	const filtered = data.slice(startIndex, endIndex);

	if (filtered.length > maxPoints ) {
		// limit k to powers of 2, e.g. 64, 128, 256
		// so that the same points will be chosen reliably, reducing flicker
		const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)));
		return filtered.filter(
			// ensure modulo is always calculated from same reference: i + startIndex
			(d, i) => (((i + startIndex) % k) === 0)
		);
	}
	return filtered;
}
```

[VictoryZoomContainer]: /docs/victory-zoom-container
[VictoryChart]: /docs/victory-chart
[Skip to the demo]: /guides/zoom-large-data#demo
[Lodash]: https://lodash.com/
[Crossfilter]: http://square.github.io/crossfilter/

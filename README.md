[![Travis Status][trav_img]][trav_site]

Victory Animation
=============

`victory-animation` is a [React](https://github.com/facebook/react) wrapper component that uses the [D3](https://github.com/mbostock/d3) `interpolate` and `ease` libraries to provide transitions between prop sets.

##Examples

The most basic set up you can use will require supplying a `data` prop and rendering a functional child, as shown below:

``` javascript
<VictoryAnimation data={x: 500}>
  {(data) => {
    return <div style={{left: data.x}}/>
  }}
</VictoryAnimation>
```

The way `victory-animation` works is, when you supply the initial value for the data prop, the functional child gets called and your child/children are rendered with that data. Any subsequent data supplied via the data prop is interpolated against the original or current value, and the child is rerendered along a transition sequence until it reaches its final value, which is the prop that was supplied.

For example, lets check out a simple example using a button to toggle between `data` prop values:

``` javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      x: 0
    };
  }
  clickHandler() {
    this.setState({
      x: this.state.x === 0 ? 150 : 0
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.clickHandler}>Toggle X</button>
        <VictoryAnimation data={{x: this.state.x}}>
          {(data) => {
            return (
              <div style={{left: data.x}} />
            );
          }}
        </VictoryAnimation>
      </div>
    );
  }
}
```

We can expand on this by adding multiple values, as `VictoryAnimation` supports object interpolation with interpolation of any properties contained using any type supported by `d3-interpolate`:

``` javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      x: 0,
      w: 500,
      h: 500,
      br: 0,
      color: "#3498db",
      rotate: 0
    };
  }
  clickHandler() {
    this.setState({
      x: this.state.x === 0 ? 150 : 0,
      w: this.state.w === 500 ? 200 : 500,
      h: this.state.h === 500 ? 200 : 500,
      br: this.state.br === 500 ? 0 : 500,
      color: this.state.color === "#3498db" ? "#2ecc71" : "#3498db",
      rotate: this.state.rotate === 0 ? 360 : 0
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.clickHandler}>Toggle X</button>
        <VictoryAnimation data={
          {
            x: this.state.x,
            w: this.state.w,
            h: this.state.h,
            color: this.state.color,
            br: this.state.br,
            rotate: this.state.rotate
          }}>
          {(data) => {
            return (
              <div style={
                {
                  position: "relative",
                  left: data.x,
                  width: data.w,
                  height: data.h,
                  backgroundColor: data.color,
                  color: "white",
                  fontFamily: "Lucida Grande",
                  padding: 40,
                  borderRadius: data.br,
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  fontSize: 40,
                  transform: "rotate(" + data.rotate + "deg)"
                }}>
                <div style={{textAlign: "center", width: "100%"}}>Test</div>
              </div>
            );
          }}
        </VictoryAnimation>
      </div>
    );
  }
}
```

Check out the result below:

![simple example](http://i.imgur.com/1td3wFj.gif)

We can even take this a step further, as `VictoryAnimation` supports arrays of objects as a type for `data`. This results in chained ordered animations between multiple sets of properties:

``` javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      data: [
        {
          x: 0,
          y: 0
        }
      ]
    };
  }
  clickHandler() {
    this.setState({
      data: [
        {
          x: 0,
          y: 0
        },
        {
          x: 250,
          y: 0
        },
        {
          x: 250,
          y: 250
        },
        {
          x: 0,
          y: 250
        },
        {
          x: 0,
          y: 0
        }
      ]
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.clickHandler}>Toggle X</button>
        <VictoryAnimation data={this.state.data}>
          {(data) => {
            return (
              <div style={
                {
                  position: "relative",
                  left: data.x,
                  top: data.y,
                  width: 200,
                  height: 200,
                  backgroundColor: "#2ecc71",
                  borderRadius: 500
                }}>
              </div>
            );
          }}
        </VictoryAnimation>
      </div>
    );
  }
}
```

The resulting render looks like:

![array demo](http://i.imgur.com/zuLvSnu.gif)

## The API

### Props

The following props are supported:

####**data**

*An Object or an Array.* This is the data you want to transition between when this prop is updated.

*Default value:* `{}`

####**delay**

*A Number.* This value (in milliseconds) is the delay before the transition starts. For array based transitions, this delay occurs before each step.

*Default value:* `0`

####**easing**

*A String.* This value controls the easing of your transition. Valid values can be found in the [d3-ease README](https://github.com/d3/d3-ease).

*Default value:* `poly-in-out`

####**velocity**

*A Float.* This value controls the speed of your transitions

*Default value:* `0.02`

####**onEnd**

*A Function.* This function gets called when the current animation is complete. If the animation is interrupted with new values, it fires after all values have been traversed.

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-animation.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-animation

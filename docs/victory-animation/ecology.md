VictoryAnimation
================

VictoryAnimation animates prop changes for any [React](https://github.com/facebook/react) component. Just use a child function inside VictoryAnimation that accepts an object of tweened values and returns a component to render.

## Features

### Animation Queue

When given an array of values, VictoryAnimation will use it as an animation queue.

```playground
<VictoryAnimation data={[
  { color: "red" },
  { color: "green" },
  { color: "blue" },
  { color: "yellow" },
  { color: "purple" }
]} delay={3000}>
  {(style) =>
    <span style={style}>Hello!</span>
  }
</VictoryAnimation>
```

### Animate Any Component

Anything can be animated! Your function can return any React component, and it’s up to you to decide how to use the latest tweened values. A common pattern is to pass them all down to your component as props.

```playground
<svg onClick={() => {
  const state = this.state || {};
  this.setState({ x: state.x ? 0 : 100 });
}}>
  <VictoryAnimation data={
    this.state || { x: 0 }
  }>
    {(props) => (
      <text { ...props } y={50}>
        Click me!
      </text>
    )}
  </VictoryAnimation>
</svg>
```

### Animation progress

A second argument is passed into your function, giving you `progress` and `animating`
```js
{
  progress: 0.479, // 0 to 1
  animating: true // true or false
}
```
On intial render, `progress` is `0` and `animating` is `false`.

```playground
<svg onClick={() => {
  const state = this.state || {};
  this.setState({ x: state.x ? 0 : 100 });
}}>
  <VictoryAnimation data={
    this.state || { x: 0 }
  }>
    {(props, animationInfo) => (
      <text { ...props } color={animationInfo.animating ? "green" : "orange"} y={50}>
        Click me! {animationInfo.progress}
      </text>
    )}
  </VictoryAnimation>
</svg>
```

### Props

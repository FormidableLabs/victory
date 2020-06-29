---
id: 3
title: VictoryAnimation
category: more
scope: null
type: docs
---

# VictoryAnimation

`VictoryAnimation` animates prop changes for any React component. To animate prop changes, define a child function that accepts an object of tweened values and other animation information and returns a component to render.

```jsx
<VictoryAnimation {...animationProps} data={myComponentProps}>
  {(tweenedProps, animationInfo) => {
    if (animationInfo.animating && animationInfo.progress < 1) {
      return <MyComponent {...tweenedProps} />;
    }
  }}
</VictoryAnimation>
```

## children

`type: function`

`VictoryAnimation` takes a single child, which should be given as a function of a tweened props object and an animation information object. The child function should return a component to render.

## data

`type: object || array`

The `data` prop specifies a set of values to tween between. When this prop changes, `VictoryAnimation` will begin animating between the current and next values. This prop should be given as an array or an object. `VictoryAnimation` uses [d3-interpolate][] to tween between values, with some [slight modifications][].

_examples:_ `data={this.props}`

## duration

`type: number`

The `duration` prop determines the number of milliseconds the animation should take to complete. This prop should be given as a number.

_default:_ `duration={1000}`

## delay

`type: number`

The `delay` prop specifies a delay in milliseconds before the start of an animation, or between each animation in the queue. This prop should be given as a number.

_default:_ `delay={0}`

## easing

`type: options`

The `easing` prop specifies the type of easing to use for an animation. The supported types of easing are: _"back", "backIn", "backOut", "backInOut", "bounce", "bounceIn", "bounceOut", "bounceInOut", "circle", "circleIn", "circleOut", "circleInOut", "linear", "linearIn", "linearOut", "linearInOut", "cubic", "cubicIn", "cubicOut", "cubicInOut", "elastic", "elasticIn", "elasticOut", "elasticInOut", "exp", "expIn", "expOut", "expInOut", "poly", "polyIn", "polyOut", "polyInOut", "quad", "quadIn", "quadOut", "quadInOut", "sin", "sinIn", "sinOut", "sinInOut"_.

_default:_ `easing="quadInOut"`

## onEnd

`type: function`

The `onEnd` prop specifies a function that will be called when the animation ends. If there are multiple animations in the queue, the `onEnd` function will be called after the last animation in the queue completes.

[d3-interpolate]: https://github.com/d3/d3-interpolate
[slight modifications]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-animation/util.js

---
id: 28
title: VictoryTransition
category: more
type: docs
scope: null
---

# VictoryTransition

`VictoryTransition` wraps a single child component in `VictoryAnimation`. In addition to animating the child component, it will also handle transitions for any entering and exiting nodes via the `onEnter` and `onExit` and `onLoad` transitions defined on its `animate` prop.

## children

`type: element`

`VictoryTransition` adds transitions to a single child.

## animate

`type: object || boolean`

The `animate` prop specifies props for VictoryAnimation and VictoryTransition to use. The animate prop may be used to specify the duration, delay and easing of an animation as well as the behavior of `onEnter` and `onExit` and `onLoad` transitions. Each Victory component defines its own default transitions, but these may be modified, or overwritten with the `animate` prop.

_examples:_ `animate={{duration: 2000, onLoad: {duration: 1000}, onEnter: {duration: 500, before: () => ({y: 0})}}}`

## animationWhitelist

`type: array[string]`

The `animationWhitelist` defines a list of props to animate on the child. This prop should be given as an array of strings.

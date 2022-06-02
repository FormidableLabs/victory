---
id: 10
title: VictoryClipContainer
category: more
type: docs
scope: null
---

# VictoryClipContainer

`VictoryClipContainer` is a specialized group container that enables curtain-style transitions for continuous data types like `VictoryLine` and `VictoryArea`. `VictoryClipContainer` will render its children either in a regular `<g>` element, or in a `<g>` element clipped by a rectangular clip path when a `clipWidth` is supplied.

## children

`type: element || array[element]`

`VictoryClipContainer` renders a single child, or an array of children in group element.

## circleComponent

`type: element`

The `circleComponent` prop specifies the element to use when a `VictoryClipContainer` renders a circular clip path. By default, `VictoryClipContainer` uses the [Circle component][].

_default:_ `<Circle/>`

## className

`type: string`

The `className` prop specifies a class name that will be applied to the rendered element.

_example:_ `className="myClipPath"`

## clipHeight

`type: number`

The `clipHeight` prop determines the base height of the rectangular clip path. This prop should be
given as a number. If this prop is not given, it will be calculated based on the height and padding
of the parent chart.

## clipId

`type: string || number`

The `clipId` prop may be used to set a deterministic id for the container. When a `containerId` is not manually set, a unique id will be generated. It is usually necessary to set deterministic ids for automated testing.

## clipPadding

`type: { top: number, bottom: number, left: number, right: number }`

The `clipPadding` prop is used when the clipped area should be larger than the range of a chart.
This prop should be given as an object with `top`, `bottom`, `left`, and `right` properties. Set
the `clipPadding` prop is useful for extending the visible area of a chart in some dimension so
that data or labels are not cut off.

## clipPathComponent

`type: element`

The `clipPathComponent` prop specifies the clip path to apply to the rendered group when appropriate. By default, `VictoryClipContainer` uses the [ClipPath component][].

_default:_ `<ClipPath/>`

## clipWidth

`type: number`

The `clipWidth` prop determines the base width of the rectangular clip path. This prop should be
given as a number. If this prop is not given, it will be calculated based on the width and padding
of the parent chart.

## events

`type: object`

The `events` prop attaches arbitrary event handlers to the group element. This prop should be given as an object of event names and corresponding event handlers. When events are provided via Victory's event system, event handlers will be called with the event, the props of the component it is attached to, and an `eventKey` when applicable.

_examples:_ `events={{onClick: (evt) => alert("x: " + evt.clientX)}}`

## groupComponent

`type: element`

`VictoryClipContainer` uses the standard `groupComponent` prop. [Read about it here](/docs/common-props#groupcomponent)

_default:_ `<g/>`

## origin

`type: { x: number, y: number }`

Victory components will pass an `origin` prop is to define the center point in svg coordinates for polar charts. **This prop should not be set manually.**

## polar

`type: boolean`

Victory components can pass a boolean `polar` prop to specify whether a label is part of a polar chart. **This prop should not be set manually.**

## radius

`type: number`

The `radius` prop determines the radius of the circular clip path used for polar charts. This prop should be
given as a number. If this prop is not given, it will be calculated based on the dimensions and padding
of the parent chart.

## rectComponent

`type: element`

The `rectComponent` prop specifies the element to use when a `VictoryClipContainer` renders a rectangular clip path. By default, `VictoryClipContainer` uses the [Rect component][].

_default:_ `<Rect/>`

## translateX

`type: number`

The `translateX` prop determines the offset of the clip path from the base x coordinate. This prop
should be given as a number. If this prop is not given, it will be calculated based on the padding
of the parent chart.

## translateY

`type: number`

The `translateY` prop determines the offset of the clip path from the base y coordinate. This prop
should be given as a number. If this prop is not given, it will be calculated based on the padding
of the parent chart.

[clippath component]: /docs/victory-primitives#clippath
[circle component]: /docs/victory-primitives#circle
[rect component]: /docs/victory-primitives#rect

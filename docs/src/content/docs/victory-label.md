---
id: 15
title: VictoryLabel
category: more
type: docs
scope: null
---

# VictoryLabel

VictoryLabel renders the label components that are used across all of Victory.

## active

`type: boolean`

The `active` prop specifies whether the label is active or not. The `active` prop is set by `defaultEvents` in components like `VictoryTooltip` and `VictorySelectionContainer`. The `active` prop is used when evaluating functional styles and props.

## angle

`type: string || number`

The `angle` prop specifies the angle to rotate the text around its anchor point.

## capHeight

`type: string || number || function`

The `capHeight` prop defines a text metric for the font being used: the expected height of capital letters. This is necessary because of SVG, which (a) positions the _bottom_ of the text at `y`, and (b) has no notion of line height. This prop should be given as a number of ems.

## className

`type: string`

The `className` prop specifies a class name that will be applied to the rendered text element.

_example:_ `className="myLabel"`

## data

`type: array[object]`

Victory components can pass a `data` prop to their label component. This can be useful in custom components that need to make use of the entire dataset.

## datum

`type: object`

Victory components can pass a `datum` prop to their label component. This can be used to calculate functional styles, and determine text. If `x` and `y` are not specified, `datum` will be used to determine label position.

## desc

`type: string`

The `desc` prop specifies the description of the chart/SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers.

## direction

`type: "rtl" || "ltr" || "inherit"`

The `direction` prop determines which text direction to apply to the rendered `text` element

_default:_ `direction="inherit"`

## dx

`type: string || number || function`

The `dx` prop defines a horizontal shift from the `x` coordinate.

## dy

`type: string || number || function`

The `dy` prop defines a vertical shift from the `y` coordinate. This prop is affected by `capHeight`, `lineHeight`, and `verticalAnchor`, and the number of lines of text that make up the label.

## events

`type: object`

The `events` prop attaches arbitrary event handlers to the label component. This prop should be given as an object of event names and corresponding event handlers. When events are provided via Victory's event system, event handlers will be called with the event, the props of the component it is attached to, and an `eventKey`.

_example:_ `events={{onClick: (evt) => alert("x: " + evt.clientX)}}`

## height

`type: number`

This prop refers to the height of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually.**

## id

`type: string || number || function`

The `id` prop specifies a HTML ID that will be applied to the rendered text element.

## index

`type: string || number`

The `index` prop represents the index of the datum in the data array. **This prop should not be set manually.**

## inline

`type: boolean`

When the `text` property contains an array of strings, the `inline` property lets the `<tspan />` elements lay out next to each other. If this property is not specified, the `<tspan />` elements will stack vertically instead.

_default:_ `false`

## labelPlacement

`type: "parallel" || "perpendicular" || "vertical"`

The `labelPlacement` prop is used to specify the placement of labels relative to the data point they represent. This prop may be given as "vertical", "parallel" or "perpendicular". This props is particularly useful in polar charts, where it may be desireable to position a label either parallel or perpendicular to its corresponding angle. When this prop is not set, perpendicular label placement will be used for polar charts, and vertical label placement will be used for cartesian charts.

## lineHeight

`type: string || number || function`

The `lineHeight` prop defines how much space a single line of text should take up. Note that SVG has no notion of line-height, so the positioning may differ slightly from what you would expect with CSS, but the result is similar: a roughly equal amount of extra space is distributed above and below the line of text. This prop should be given as a number of ems.

## origin

`type: { x: number, y: number }`

Victory components will pass an `origin` prop is to define the center point in svg coordinates for polar charts. **This prop should not be set manually.**

## polar

`type: boolean`

Victory components can pass a boolean `polar` prop to specify whether a label is part of a polar chart. **This prop should not be set manually.**

## renderInPortal

`type: boolean`

The `renderInPortal` prop specifies whether `VictoryLabel` should render text in place or within a `VictoryPortal`. Setting `renderInPortal` to true is equivalent to wrapping `VictoryLabel` in a `VictoryPortal`. This prop is false by default.

## scale

`type: { x: scale, y: scale }`

Victory components can pass a `scale` prop to their label component. This can be used to calculate the position of label elements from `datum`. **This prop should not be set manually.**

## style

`type: object`

The `style` prop defines a set of SVG style properties that will be applied to the rendered
`<text/>` element. This prop should be given as an object, or array of objects. When this prop is
given as an array of objects, each style object in the array will be applied to the corresponding
`<tspan/>` in multi-line labels.

## text

`type: string || number || function || array`

The `text` prop defines the text `VictoryLabel` will render. The `text` prop may be given as a
string, number, a function of `datum`, or an array of any of these. Strings may include newline
characters, which `VictoryLabel` will split into separate `<tspan/>` elements. When `text` is given
as an array, separate `<tspan/>` elements will be created for each element in the array.

_examples:_ `text={(datum) => "x: " + datum.x}`, `text="Apples\n(green)"`, `text={["first line", "second line"]}`

## textAnchor

`type: "start" || "middle" || "end" || "inherit"`

The `textAnchor` prop defines how the text is horizontally positioned relative to the given `x` and `y` coordinates. Options are "start", "middle", "end", and "inherit".

## transform

`type: string || object || function`

The `transform` prop applies a transform to the rendered `<text>` element. This prop may be supplied as a string or an object containing transform definitions.

## verticalAnchor

`type: "start" || "middle" || "end"`

The `verticalAnchor` prop defines how the text is vertically positioned relative to the given `x` and `y` coordinates. Options are "start", "middle" and "end".

## width

`type: number`

This props refers to the width of the `svg` that `VictoryLabel` is rendered within. **This prop is passed from parents of `VictoryLabel`, and should not be set manually.**

## x

`type: number`

The `x` prop defines the x coordinate to use as a basis for positioning the label element.

## y

`type: number`

The `y` prop defines the y coordinate to use as a basis for positioning the label element.

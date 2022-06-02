---
id: 2
title: VictoryAccessibleGroup
category: more
sidebar: true
type: docs
scope: null
---

# VictoryAccessibleGroup

`VictoryAccessibleGroup` is a specialized group container that enables users to assign `aria-label`s, `desc`s and other props specified below which allow for improved access by screen readers. `VictoryAccessibleGroup` can be used as any `groupComponent` prop value. `VictoryAccessibleGroup` will render its children in a `<g>` element and includes a `desc` tag if provided as a prop.

## aria-describedby

`type: string`

The `aria-describedby` prop applies to the `g` element rendered by `VictoryAccessibleGroup` as well as `descId` if a `desc` is provided. This prop should be given as a string corresponding to the id of an element that describes the chart.

## aria-label

`type: string`

The `aria-label` prop applies to the `g` element rendered by `VictoryAccessibleGroup`.

## children

`type: element || array[element]`

`VictoryAccessibleGroup` renders a single child, or an array of children in the group element.

## className

`type: string`

The `className` prop specifies a className that will be applied to the `g` element rendered by `VictoryAccessibleGroup`. If this prop is not set, the className will default to "VictoryAccessibleGroup".

_example:_ `className="myChartAccessibleGroup"`

## desc

`type: string`

The `desc` prop specifies the description of the chart/SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers.

_example:_ `desc="Golden retrievers make up 30%, Labs make up 25%, and other dog breeds are not represented above 5% each."`

## tabIndex

`type: number`

The `tabIndex` will be applied to the `g` element.

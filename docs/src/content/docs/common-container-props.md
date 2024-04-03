---
id: 33
title: Common Container Props
category: containers
sidebar: true
scope: null
type: docs
---

# Common Container Props

##  aria-describedby

`type: string`

The `aria-describedby` prop applies to the `svg` element rendered by `VictoryContainer`. This prop should be given as a string corresponding to the id of an element that describes the chart. If the `desc` prop is set on `VictoryContainer`, the `aria-describedby` prop applied to `VictoryContainer`'s `svg` will correspond to the id of the `desc` tag `VictoryContainer` renders.

##  aria-labelledby

`type: string`

The `aria-labelledby` prop applies to the `svg` element rendered by `VictoryContainer`. This prop should be given as a string corresponding to the id of an element that labels the chart. If the `title` prop is set on `VictoryContainer`, the `aria-labelledby` prop applied to `VictoryContainer`'s `svg` will correspond to the id of the `title` tag `VictoryContainer` renders.

## children

`type: element || array[element]`

The `children` prop specifies the child or children that will be rendered within the container. This prop should not be set manually. It will be set by whatever Victory component is rendering the container.

## className

`type: string`

The `className` prop specifies a className that will be applied to the outer-most div rendered by `VictoryContainer` if this prop is not set, the className will default to "VictoryContainer"

_example:_ `className="myChart"`

## containerId

`type: number || string`

The `containerId` prop may be used to set a deterministic id for the container. When a `containerId` is not manually set, a unique id will be generated. It is usually necessary to set deterministic ids for automated testing.

## containerRef

`type: function`

The `containerRef` prop may be used to attach a ref to the outermost element rendered by the container. This prop should be given as a function.

_example:_ `containerRef={(ref) => { this.chartRef = ref; }}`

## desc

`type: string`

The `desc` prop specifies the description of the chart/SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers.

_example:_ `desc="Golden retrievers make up 30%, Labs make up 25%, and other dog breeds are not represented above 5% each."`

## events

`type: object`

The `events` prop attaches arbitrary event handlers to the container element. This prop should be
given as an object of event names and corresponding [React event handlers][]. Events defined directly
via this prop will be masked by `defaultEvents` on `VictorySelectionContainer` (`onMouseDown`,
`onMouseUp`, and `onMouseMove`), and by any events defined through Victory's event
system that target parent elements.

_example:_ `events={{onClick: (evt) => alert("x: " + evt.clientX)}}`

## height

`type: number`

The `height` prop determines the height of the containing `<svg>`. By default VictoryContainer renders responsive containers with the `viewBox` attribute set to `viewBox="0, 0, width, height"` and `width="100%"`, `height="100%"`. In responsive containers, the `width` and `height` props affect the _aspect ratio_ of the rendered component, while the absolute width and height are determined by the container. To render a static container, set `responsive={false}`

_example:_ `height={350}`

## ouiaId

`type: number || string`

The `ouiaId` prop outputs an id attribute called `data-ouia-component-id`, which must be unique within the surrounding context of the component.

This prop is used by the Open UI Automation 1.0-RC spec to help maintain automated testing environments. Components that are OUIA compliant must provide the following props; `ouiaId`, `ouiaSafe`, and `ouiaType`.

## ouiaSafe

`type: boolean`

The `ouiaSafe` outputs an attribute called `data-ouia-safe`, which indicates that the component is in a static state.

This prop is used by the Open UI Automation 1.0-RC spec to help maintain automated testing environments. Components that are OUIA compliant must provide the following props; `ouiaId`, `ouiaSafe`, and `ouiaType`.

_default:_ `ouiaId={true}`

## ouiaType

`type: string`

The `ouiaType` prop outputs an attribute called `data-ouia-component-type`, which specifies a unique name identifying the root level HTML element.

This prop is used by the Open UI Automation 1.0-RC spec to help maintain automated testing environments. Components that are OUIA compliant must provide the following props; `ouiaId`, `ouiaSafe`, and `ouiaType`.

_example:_ A page that has a special container could choose to name that container as `FrameworkA/CustomContainer`.

## portalComponent

`type: element`

The `portalComponent` prop takes a component instance which will be used as a container for children that should render inside a top-level container so that they will always appear above other elements. [VictoryTooltip][] renders inside a portal so that tooltips always render above data. [VictoryPortal][] is used to define elements that should render in the portal container. This prop defaults to [Portal][], and should only be overridden when changing rendered elements from SVG to another type of element _e.g.,_ [react-native-svg][] elements.

_default:_ `portalComponent={<Portal/>}`

## portalZIndex

`type: number`

The `portalZIndex` prop determines the z-index of the div enclosing the portal component. If a `portalZIndex` prop is not set, the z-index of the enclosing div will be set to 99.

## preserveAspectRatio

`type: string`

The `preserveAspectRatio` prop applies to the `svg` elements rendered by `VictoryContainer` to give users more control over how responsive svgs are positioned and scaled. When the `responsive` prop on `VictoryContainer` is set to `false`, this prop has no effect.

```playground
<div style={{ width: "400px", height: "400px"}}>
  <VictoryChart
    height={300}
    width={400}
    style={{ parent: { border: "1px solid black" } }}
    containerComponent={
      <VictoryContainer
        preserveAspectRatio="none"
      />
    }
  >
    <VictoryLine/>
  </VictoryChart>
</div>
```

## responsive

`type: boolean`

The `responsive` prop specifies whether the rendered container should be a responsive container with a `viewBox` attribute, or a static container with absolute width and height.

_default:_ `responsive={true}`

## role

`type: string`

The `role` prop specifies the role attribute that will be applied to the `svg` element rendered by `VictoryContainer`

_default:_ `role="img"`

## style

`type: object`

The `style` prop defines the style of the container, and should be given as an object of style attributes.
The `width` and `height` should be specified via props instead of style attributes as they determine
relative layout for components.

_example:_ `style={{border: "1px solid #ccc"}}`

_default (provided by default theme):_ VictoryTheme.grayscale. See [VictoryTheme][] for more detail.

## tabIndex

`type: number`

The `tabIndex` prop applies to the `svg` element rendered by `VictoryContainer` to allow users to focus on the chart container via keyboard navigation. This prop should be given as a number.

## theme

`type: object`

The `theme` prop specifies a theme to use for determining styles and layout props for a
component. Any styles or props defined in `theme` may be overridden by props specified on the
component instance. By default, components use a [grayscale theme][]. [Read more about themes here][].

_example:_ `theme={VictoryTheme.material}`

## title

`type: string`

The `title` prop specifies the title to be applied to the SVG to assist with accessibility for screen readers. The more descriptive this title is, the more useful it will be for people using screen readers

_example:_ `title="Popularity of Dog Breeds by Percentage"`

## width

`type: number`

The `width` prop determines the width of the containing `<svg>`. By default VictoryContainer renders responsive containers with the `viewBox` attribute set to `viewBox="0, 0, width, height"` and `width="100%"`, `height="auto"`. In responsive containers, the `width` and `height` props affect the _aspect ratio_ of the rendered component, while the absolute width and height are determined by the container. To render a static container, set `responsive={false}`

_example:_ `width={350}`

## Native-Only Props

## onTouchStart

`type: function`

The optional `onTouchStart` prop takes a function that is called on every touch event on the chart (when using `victory-native`). The most common use of `onTouchStart` is to prevent the chart's parent `ScrollView` from scrolling, so that the chart and container can be interacted with unencumbered. The function accepts a single parameter, `event`, a React Native [Synthetic Event][]. Also see `onTouchEnd`.

_example:_

```jsx
<ScrollView scrollEnabled={this.state.scrollEnabled}>
  <VictoryChart
    containerComponent={
      <VictoryContainer
        onTouchStart={() => this.setState({ scrollEnabled: false })}
        onTouchEnd={() => this.setState({ scrollEnabled: true })}
      />
    }
  >
    <VictoryBar />
  </VictoryChart>
</ScrollView>
```

## onTouchEnd

`type: function`

The optional `onTouchEnd` prop takes a function that is called at the conclusion of every touch event on the chart (when using `victory-native`). The most common use of `onTouchEnd` is to prevent the chart's parent `ScrollView` from scrolling, so that the chart and container can be interacted with unencumbered. The function accepts a single parameter, `event`, a React Native [Synthetic Event][]. Also see `onTouchStart`.

[victoryportal]: /docs/victory-portal
[portal]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-portal/portal.tsx
[react-native-svg]: https://github.com/react-native-community/react-native-svg
[victorytheme]: /docs/victory-theme
[victorytooltip]: /docs/victory-tooltip
[grayscale theme]: https://github.com/FormidableLabs/victory/blob/main/packages/victory-core/src/victory-theme/grayscale.tsx
[read more about themes here]: /guides/themes
[synthetic event]: https://facebook.github.io/react-native/docs/gesture-responder-system.html#responder-lifecycle
[react event handlers]: https://reactjs.org/docs/handling-events.html

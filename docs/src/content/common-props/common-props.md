---
id: 2
title: Common Props
category: documentation
type: docs
scope:
  - range
  - sampleData
---

# Common Props

Not every component uses all of these props. These are all common to things like `VictoryBar`, `VictoryScatter`, but other components like `VictoryStack` use only some of them.

The props explanations given here are general. Each component docs page should be considered as the the source of truth for a component's props, and any caveats will be listed there.

## animate

`type: boolean || object`

The `animate` prop specifies props for [VictoryAnimation][] and [VictoryTransition][] to use. The animate prop may be used to specify the duration, delay, and easing of an animation as well as the behavior of `onEnter` and `onExit` and `onLoad` transitions. Each Victory component defines its own default transitions, be these may be modified, or overwritten with the `animate` prop. An `animationWhitelist` may also be specified on the `animate` prop. When given, only props specified in the whitelist will animate.

See the [Animations Guide][] for more detail on animations and transitions

_example:_ `animate={{ duration: 2000 }}`

```playground_norender
class App extends React.Component {

  render() {
    return (
      <VictoryChart
      	domain={{ y: [0, 1] }}
      	animate={{ duration: 2000 }}
      >
        <VictoryScatter
          size={this.state.size}
          data={this.state.data}
          style={{ data: { opacity: ({ datum }) => datum.opacity || 1 } }}
          animate={{
            animationWhitelist: ["style", "data", "size"], // Try removing "size"
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 })
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({ opacity: 1, _y: datum._y })
            }
          }}
        />
      </VictoryChart>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
       data: this.getData(),
       size: this.getSize()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        size: this.getSize()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const num = Math.floor(10 * Math.random() + 5);
    const points = new Array(num).fill(1);
    return points.map((point, index) => {
      return { x: index + 1, y: Math.random() };
    });
  }

  getSize() {
    return Math.random() * 10
  }
}

ReactDOM.render(<App/>, mountNode)
```

## categories

`type: array[string] || { x: array[string], y: array[string] }`

The `categories` prop specifies how categorical data for a chart should be ordered. This prop should be given as an array of string values, or an object with these arrays of values specified for x and y. If this prop is not set, categorical data will be plotted in the order it was given in the data array.

_note:_ The `x` value supplied to the `categories` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_example:_ `categories={{ x: ["apples", "oranges", "bananas"] }}`

```playground
<VictoryChart domainPadding={25}>
  <VictoryBar
    categories={{
      x: ["birds", "cats", "dogs", "fish", "frogs"]
    }}
    data={[
      {x: "cats", y: 1},
      {x: "dogs", y: 2},
      {x: "birds", y: 3},
      {x: "fish", y: 2},
      {x: "frogs", y: 1}
    ]}
  />
</VictoryChart>
```

## containerComponent

`type: element`

The `containerComponent` prop takes a component instance which will be used to create a container element for standalone charts. If a `containerComponent` is not provided, the default `VictoryContainer` component will be used. Other Victory container components include:

- [VictoryBrushContainer][]
- [VictoryCursorContainer][]
- [VictorySelectionContainer][]
- [VictoryVoronoiContainer][]
- [VictoryZoomContainer][]
- hybrid containers may be created using the [createContainer][] helper

Victory container components all support `title` and `desc` props, which are intended to add accessibility to Victory components. The more descriptive these props are, the more accessible your data will be for people using screen readers. These props may be set by passing them directly to the supplied component. By default, all Victory container components render responsive `svg` elements using the `viewBox` attribute. To render a static container, set `responsive={false}` directly on the container instance supplied via the `containerComponent` prop. All Victory container components also render a `Portal` element that may be used in conjunction with [VictoryPortal][] to force components to render above other children.

Container components are supplied with the following props:

- `domain`
- `height`
- `horizontal`
- `origin` (for polar charts)
- `padding`
- `polar`
- `scale`
- `standalone`
- `style`
- `theme`
- `width`

_default:_ `containerComponent={<VictoryContainer/>}`

```playground
<VictoryScatter
  containerComponent={
    <VictoryCursorContainer
      cursorLabel={({ datum }) => `${datum.x.toPrecision(2)}, ${datum.y.toPrecision(2)}`}
    />
  }
/>
```

## data

`type: array[object]`

Specify data via the `data` prop. By default, Victory components expect data as an array of objects with `x` and `y` properties. Use the [x][] and [y][] data accessor props to define a custom data format. The `data` prop must be given as an array. Data objects may also include information about ~~styles~~, labels, and props that may be applied to individual data components.

**Note:** All values stored on the data object will be interpolated during animation. Do not store functions on data objects.

**Note:** As of `victory@0.26.0` styles provided via the `data` prop are no longer automatically applied. To use styles from the data object, add functional styles as in the example below.

```playground
<VictoryScatter
  size={7}
  data={[
    { x: 1, y: 1, label: "first", symbol: "star", opacity: 0.5, fill: "blue" },
    { x: 2, y: 2, label: "second", symbol: "circle", opacity: 0.8, fill: "red" },
    { x: 3, y: 3, label: "third", symbol: "square", fill: "gold" },
    { x: 4, y: 4, label: "fourth", symbol: "diamond", fill: "green" }
  ]}
  style={{
    data: {
      fill: ({ datum }) => datum.fill,
      opacity: ({ datum }) => datum.opacity
    }
  }}
/>
```

## dataComponent

`type: element`

The `dataComponent` prop takes a component instance which will be responsible for rendering a data element. The new element created from the passed `dataComponent` will be provided with all the props it needs to render. These props will always include `data`, `events`, `scale` and `style`. Individual components will supply additional props expected by their default `dataComponents`. See individual api docs for complete props lists. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If a `dataComponent` is not provided, each component will use its own default `dataComponent`.

See the [Custom Components Guide][] for more detail on creating your own `dataComponents`

_examples:_ `dataComponent={<Area/>}`

```playground_norender
class CatPoint extends React.Component {
  render() {
    const {x, y, datum} = this.props; // VictoryScatter supplies x, y and datum
    const cat = datum._y >= 0 ? "😻" : "😹";
    return (
      <text x={x} y={y} fontSize={30}>
        {cat}
      </text>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryScatter
          dataComponent={<CatPoint/>}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={15}
        />
      </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

## domain

`type: array[low, high] || { x: [low, high], y: [low, high] }`

The `domain` prop describes the range of data the component will include. This prop can be given as a array of the minimum and maximum expected values of the data or as an object that specifies separate arrays for x and y. If this prop is not provided, a domain will be calculated from data, or other available information.

_note:_ The `x` value supplied to the `domain` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_examples:_

- `domain={[-1, 1]}`
- `domain={{x: [0, 100], y: [0, 1]}}`

```playground
<VictoryChart
   domain={{ x: [0.5, 5.5], y: [0, 10] }}
>
  <VictoryBar data={sampleData}/>
</VictoryChart>
```

## domainPadding

`type: number || array[left, right] || { x: [left, right], y: [bottom, top] }`

The `domainPadding` prop specifies a number of pixels of padding to add the beginning or end of a domain. This prop is useful for explicitly spacing data elements farther from the beginning or end of a domain to prevent axis crowding. When given as a single number, `domainPadding` will be applied to the upper and lower bound of both the x and y domains. This prop may also be given as an object with numbers or two-element arrays specified for x and y. When specifying arrays for `domainPadding`, the first element of the array will specify the padding to be applied to domain minimum, and the second element will specify padding the be applied to domain maximum.

_note:_ The `x` value supplied to the `domainPadding` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_examples:_

- `domainPadding={20}`
- `domainPadding={{x: [20, 0]}}`

**note:** Values supplied for `domainPadding` will be coerced so that padding a domain will never result in charts including an additional quadrant. For example, if an original domain included only positive values, `domainPadding` will be coerced so that the resulted padded domain will not include negative values.

```playground
<VictoryChart
   domainPadding={{ x: 100 }}
>
  <VictoryBar data={sampleData}/>
</VictoryChart>
```

## eventKey

`type: string || integer || array[string] || function`

The `eventKey` prop is used to assign eventKeys to data. This prop operates identically to the [x][] and [y][] data accessor props. By default, the eventKey of each datum will be equal to its index in the data array. **This prop is not commonly used.**

See the [Events Guide][] for more information on defining events and using event keys.

## events

`type: array[object]`

The `events` prop takes an array of event objects. Event objects are composed of identifying properties, and `eventHandlers`.

Identifying properties include:

- `childName`: the name of the component the event should be attached to. When events are specified in `VictorySharedEvents` or on a component that renders several Victory components as children (_i.e._ `VictoryChart`, `VictoryGroup`, `VictoryStack`), it is necessary to specify which child events should apply to. The given `childName` should match the `name` prop of a child component. This identifier can be given as a string, an array of strings, or as "all".

- `target`: the type of element the event should be attached to. Valid targets for most Victory components will be `"parent"`, `"data"`, and `"labels"`. Events with the "parent" target will be attached to to the top level svg. Events with `"data"` and `"labels"` targets will be attached to `dataComponent` and `labelComponent` elements respectively. Some components, like `VictoryAxis` use non-standard targets like `"grid"`. Refer to individual API docs for additional caveats.

- `eventKey`: the specific element to be targeted. Events may be attached to specific elements by `eventKey`. By default, `eventKey` corresponds to the index in the `data` array (or `tickValues` array) corresponding to a rendered element. This value may be given as a single string or number, an array of strings or numbers, or as "all". It is not typically necessary to specify an individual `eventKey` for attaching events. When no `eventKey` is given, events will be attached to all elements that match a given `childName` and `target`. Some components like `VictoryArea` and `VictoryLine` render only a single element for an entire series of data. For these, the `eventKey` should be "all".

`eventHandlers` should be given as an object whose keys are standard event names (_e.g.,_ `onClick`) and whose values are event callbacks. Callbacks are called with the props of the individual element that triggered the event. For example, when a click event occurs on a bar, the props object supplied to the `onClick` handler will include props specific to that individual bar, such as `datum`, `index`, `style`, etc. Return values from event handler callbacks may be used to mutate other elements.

Event returns should be given as an array of objects composed of identifying properties for specifying the element(s) to be modified and a `mutation` function. Identifying properties include `childName`, `target`, and `eventKey`. When these values are not provided, the identifiers of the element that triggered the event will be used, including the specific `eventKey`. The `mutation` function will be called with the calculated props for each element that should be modified (_e.g.,_ a bar label), and the object returned from the mutation function will override the props of that element via object assignment.

```playground
<VictoryChart
  events={[{
    childName: "all",
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            childName: "area-2",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "gold" }) })
          }, {
            childName: "area-3",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "orange" }) })
          }, {
            childName: "area-4",
            target: "data",
            mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "red" }) })
          }
        ];
      }
    }
  }]}
>
  <VictoryStack>
    <VictoryArea name="area-1" data={sampleData}/>
    <VictoryArea name="area-2" data={sampleData}/>
    <VictoryArea name="area-3" data={sampleData}/>
    <VictoryArea name="area-4" data={sampleData}/>
  </VictoryStack>
</VictoryChart>
```

## externalEventMutations

`type: array[object]`

Occasionally is it necessary to trigger events in Victory's event system from some external element such as a button or a form field. Use the `externalEventMutation` prop to specify a set of mutations to apply to a given chart. The `externalEventMutations` should be given in the following form:

```jsx
externalEventMutations: PropTypes.arrayOf(
  PropTypes.shape({
    callback: PropTypes.function,
    childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    eventKey: PropTypes.oneOfType([
      PropTypes.array,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative
      ]),
      PropTypes.string
    ]),
    mutation: PropTypes.function,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  })
);
```

The `target`, `eventKey`, and `childName` (when applicable) must always be specified. The `mutation` function will be called with the current props of the element specified by the `target`, `eventKey` and `childName` provided. The mutation function should return a mutation object for that element. The `callback` prop should be used to clear the `externalEventMutations` prop once the mutation has been applied. Clearing `externalEventMutations` is crucial for charts that animate.

```playground_norender
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      externalMutations: undefined
    };
  }
  removeMutation() {
    this.setState({
      externalMutations: undefined
    });
  }

  clearClicks() {
    this.setState({
      externalMutations: [
        {
          childName: "Bar-1",
          target: ["data"],
          eventKey: "all",
          mutation: () => ({ style: undefined }),
          callback: this.removeMutation.bind(this)
        }
      ]
    });
  }

  render() {
    const buttonStyle = {
      backgroundColor: "black",
      color: "white",
      padding: "10px",
      marginTop: "10px"
    };
    return (
      <div>
        <button
          onClick={this.clearClicks.bind(this)}
          style={buttonStyle}
        >
          Reset
        </button>
        <VictoryChart domain={{ x: [0, 5 ] }}
          externalEventMutations={this.state.externalMutations}
          events={[
            {
              target: "data",
              childName: "Bar-1",
              eventHandlers: {
                onClick: () => ({
                  target: "data",
                  mutation: () => ({ style: { fill: "orange" } })
                })
              }
            }
          ]}
        >
          <VictoryBar name="Bar-1"
            style={{ data: { fill: "grey"} }}
            labels={() => "click me!"}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 4 },
              { x: 3, y: 1 },
              { x: 4, y: 5 }
            ]}
          />
        </VictoryChart>
      </div>
    )
  }
}

ReactDOM.render(<App/>, mountNode)
```

_Note_ External mutations are applied to the same state object that is used to control events in Victory, so depending on the order in which they are triggered, external event mutations may override mutations caused by internal Victory events or vice versa.

## groupComponent

`type: element`

The `groupComponent` prop takes a component instance which will be used to create group elements for use within container elements. For most components, this prop defaults to a `<g>` tag. Continuous data components like `VictoryLine` and `VictoryArea` use [VictoryClipContainer][] a component which renders a `<g>` tag with a `clipPath` `def`. This allows continuous data components to transition smoothly when new data points enter and exit. `VictoryClipContainer` may also be used with components like `VictoryScatter` to prevent data from overflowing the chart area.

```playground
<VictoryChart>
  <VictoryScatter
    data={sampleData}
    size={20}
    groupComponent={<VictoryClipContainer/>}
  />
</VictoryChart>
```

## height

`type: number`

The `height` prop determines the height of the containing `<svg>`. By default Victory components render responsive containers with the `viewBox` attribute set to `viewBox="0, 0, width, height"` and `width="100%"`, `height="auto"`. In responsive containers, the `width` and `height` props affect the _aspect ratio_ of the rendered component, while the absolute width and height are determined by the container. To render a static container, pass `responsive={false}` to the `containerComponent` like `containerComponent={<VictoryContainer responsive={false}/>}`, or set `standalone={false}` and render the resulting `<g>` tag in your own `<svg>` container. When a component is nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` setting the `height` prop on the child component will have no effect.

_default (provided by default theme):_ `height={300}`

```playground
<div>
  <VictoryBar height={500} />
  <VictoryBar height={500}
    containerComponent={<VictoryContainer responsive={false}/>}
  />
</div>
```

## horizontal

`type: boolean`

The horizontal prop determines whether data will be plotted horizontally. When this prop is set to true, the independent variable will be plotted on the y axis and the dependent variable will be plotted on the x axis.

```playground
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ x: 10 }}
>
  <VictoryBar horizontal
    style={{
      data: { fill: "#c43a31" }
    }}
    data={sampleData}
  />
</VictoryChart>
```

## labelComponent

`type: element`

The `labelComponent` prop takes a component instance which will be used to render labels for the component. The new element created from the passed `labelComponent` will be supplied with the following properties: x, y, index, data, datum, verticalAnchor, textAnchor, angle, style, text, and events. Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within the custom component itself. If `labelComponent` is omitted, a new [VictoryLabel][] will be created with the props described above. [VictoryTooltip][] is commonly used as a `labelComponent`

_examples:_

- `labelComponent={<VictoryLabel dy={20}/>}`
- `labelComponent={<VictoryTooltip/>}`

_default:_ `<VictoryLabel/>`

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => datum.y}
  style={{ labels: { fill: "white" } }}
  labelComponent={<VictoryLabel dy={30} />}
/>
```

## labels

`type: array || function`

The `labels` prop defines the labels that will appear above each point. This prop should be given as an array or as a function. When given as a function, `labels` will be called with a single argument: an object containing all the props supplied to the label component. A full list of props that will be passed to `VictoryLabel` is given [here](/docs/victory-label).

_examples:_

- `labels={["first", "second", "third"]}`
- `labels={({ datum }) => datum.y}`

```playground
<VictoryBar
  data={sampleData}
  labels={({ datum }) => `y: ${datum.y}`}
/>
```

## maxDomain

`type: number || { x: number, y: number }`

The `maxDomain` prop defines a maximum domain value for a chart. This prop is useful in situations where the maximum domain of a chart is static, while the minimum value depends on data or other variable information. If the `domain` prop is set in addition to `maximumDomain`, `domain` will be used.

_note:_ The `x` value supplied to the `maxDomain` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_examples:_

- `maxDomain={0}`
- `maxDomain={{ y: 0 }}`

```playground
<VictoryChart maxDomain={{ y: 0 }}>
  <VictoryLine
    data={[
      { x: 1, y: -2 },
      { x: 2, y: 1 },
      { x: 3, y: -1 },
      { x: 4, y: -3 }
    ]}
  />
</VictoryChart>
```

## minDomain

`type: number || { x: number, y: number }`

The `minDomain` prop defines a minimum domain value for a chart. This prop is useful in situations where the minimum domain of a chart is static, while the maximum value depends on data or other variable information. If the `domain` prop is set in addition to `minimumDomain`, `domain` will be used.

_note:_ The `x` value supplied to the `minDomain` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_examples:_

- `minDomain={0}`
- `minDomain={{ y: 0 }}`

```playground
<VictoryChart minDomain={{ y: 0 }}>
  <VictoryLine
    data={[
      { x: 1, y: 2 },
      { x: 2, y: -1 },
      { x: 3, y: 1 },
      { x: 4, y: 3 }
    ]}
  />
</VictoryChart>
```

## name

`type: string`

The `name` prop is used to reference a component instance when defining shared events.

_example:_ `name="series-1"`

## origin

`type: { x: number, y: number }`

The origin prop is used to define the center point in svg coordinates for polar charts. All children within a polar chart must share the same origin, so setting this prop on children nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` will have no effect. When this prop is not set, it will be calculated based on the `width`, `height` and `padding` of the chart. **This prop is usually not set manually.**

## padding

`type: number || { top: number, bottom: number, left: number, right: number }`

The `padding` prop specifies the amount of padding in number of pixels between the edge of the chart and any rendered child components. This prop can be given as a number or as an object with padding specified for top, bottom, left and right. As with [width][] and [height][], the absolute padding will depend on whether the component is rendered in a responsive container. When a component is nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` setting `padding` on the child component will have no effect.

_examples:_

- `padding={{top: 20, bottom: 60}}`
- `padding={40}`

_default (provided by default theme):_ `padding={50}`

```playground
<VictoryChart
  padding={{ top: 40, bottom: 80, left: 40, right: 80 }}
>
<VictoryLine data={sampleData} />
</VictoryChart>
```

## polar

`type: boolean`

The boolean `polar` prop specifies whether a chart should be plotted on a polar coordinate system. All components in a given chart must share the same coordinate system, so setting this prop on children nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` will have no effect.

```playground
<div>
<VictoryBar polar
  data={sampleData}
  labels={(d) => d.x.toFixed(0)}
  width={400} height={400}
  domain={{ x: [0, 7], y: [0, 7] }}
  style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 } }}
/>
<VictoryBar
  data={sampleData}
  labels={(d) => d.x.toFixed(0)}
  width={400} height={400}
  domain={{ x: [0, 7], y: [0, 7] }}
  style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 } }}
/>
</div>
```

## range

`type: array[low, high] || { x: [low, high], y: [low, high] }`

The `range` prop describes the dimensions over which data may be plotted. For cartesian coordinate systems, this corresponds to minimum and maximum svg coordinates in the x and y dimension. In polar coordinate systems this corresponds to a range of angles and radii. When this value is not given it will be calculated from the `width`, `height`, and `padding`, or from the `startAngle` and `endAngle` in the case of polar charts. All components in a given chart must share the same range, so setting this prop on children nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` will have no effect. **This prop is usually not set manually.**

_examples:_

- Cartesian: `range={{ x: [50, 250], y: [50, 250] }}`
- Polar: `range={{ x: [0, 360], y: [0, 250] }}`

## samples

`type: number`

The `samples` prop specifies how many individual points to plot when plotting
y as a function of x. The `samples` prop is ignored if `data` is supplied in props.

_default:_ `samples={50}`

```playground
<VictoryChart>
  <VictoryLine
    samples={25}
    y={(d) => Math.sin(5 * Math.PI * d.x)}
  />
  <VictoryLine
    samples={100}
    style={{ data: { stroke: "red" } }}
    y={(d) => Math.cos(5 * Math.PI * d.x)}
  />
</VictoryChart>
```

## scale

`type: scale || { x: scale, y: scale }`

The `scale` prop determines which scales your chart should use. This prop can be given as a string specifying a supported scale ("linear", "time", "log", "sqrt"), or as an object with scales specified for x and y. For "time" scales, data points should be `Date` objects or `getTime()` instances.

_note:_ The `x` value supplied to the `scale` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_default:_ `scale="linear"`

_examples:_

- `scale="time"`
- `scale={{x: "linear", y: "log"}}`

```playground
<VictoryChart
  scale={{ x: "linear", y: "log" }}
>
  <VictoryLine
    style={{ data: { stroke: "red" } }}
    domain={{ x: [0, 5] }}
    y={(d) => Math.pow(1 - d.x, 10)}
  />
</VictoryChart>
```

## sharedEvents

The `sharedEvents` prop is used to coordinate events between Victory components using `VictorySharedEvents`. **This prop should not be set manually.**

## singleQuadrantDomainPadding

`type: boolean || { x: boolean, y: boolean }`

By default `domainPadding` is coerced to existing quadrants. This means that if a given domain only includes positive values, no amount of padding applied by `domainPadding` will result in a domain with negative values. This is the desired behavior in most cases. For users that need to apply padding without regard to quadrant, the `singleQuadrantDomainPadding` prop may be used. This prop may be given as a boolean or an object with boolean values specified for "x" and/or "y". When this prop is false (or false for a given dimension), padding will be applied without regard to quadrant. If this prop is not specified, `domainPadding` will be coerced to existing quadrants.

_note:_ The `x` value supplied to the `singleQuadrantDomainPadding` prop refers to the _independent_ variable, and the `y` value refers to the _dependent_ variable. This may cause confusion in horizontal charts, as the independent variable will corresponds to the y axis.

_examples:_

- `singleQuadrantDomainPadding={false}`
- `singleQuadrantDomainPadding={{ x: false }}`

```playground
<VictoryChart
  singleQuadrantDomainPadding={{ x: false }}
  domainPadding={100}
>
  <VictoryBar data={sampleData}/>
  <VictoryAxis crossAxis={false}/>
</VictoryChart>
```

## sortKey

`type: string || integer || array[string] || function`

Use the `sortKey` prop to indicate how data should be sorted. This prop is
given directly to the lodash [sortBy][] function to be executed on the final
dataset.

This prop can be provided in a variety of formats

**string:** specify which property in a data object to sort the data array by

```jsx
sortKey = "x";
```

**function:** use a function to determine how to sort data elements in an array

```jsx
sortKey={(datum) => datum.xValue + datum.error}
```

**array index:** specify which index of an array should be used to sort data when data is given as an array of arrays

```jsx
sortKey={0}
```

**array:** specify multiple properties to sort by

```jsx
sortKey={["age", "height"]}
```

```playground
<VictoryLine
  data={range(0, 2 * Math.PI, 0.01).map((t) => ({ t }))}
  sortKey="t"
  x={(d) => Math.sin(3 * d.t + (2 * Math.PI))}
  y={(d) => Math.sin(2 * d.t)}
/>
```

## sortOrder

`type: "ascending" || "descending"`

The `sortOrder` prop specifies whether sorted data should be returned in ascending or descending order.

_default:_ `sortOrder="ascending"`

## standalone

`type: boolean`

The `standalone` props specifies whether the component should be rendered in a independent `<svg>` element or in a `<g>` tag. This prop defaults to true, and renders an `svg`, however, wrapper components like `VictoryChart`, `VictoryStack`, and `VictoryGroup` force children to use `standalone={false}`.

_default:_ `standalone={true}`

```playground
<svg width={300} height={300}>
  <circle cx={150} cy={150} r={150} fill="#c43a31"/>
  <VictoryArea
    standalone={false}
    width={300} height={300} padding={0}
    data={sampleData}
  />
</svg>
```

## style

`type: object`

The `style` prop defines the style of the component. The style prop should be given as an object with styles defined for `data`, `labels` and `parent`. Any valid svg styles are supported, but `width`, `height`, and `padding` should be specified via props as they determine relative layout for components in VictoryChart.

```jsx
style={{
  data: { fill: "tomato", opacity: 0.7 },
  labels: { fontSize: 12 },
  parent: { border: "1px solid #ccc" }
}}
```

Any style attribute may also be defined as a function of the props for whatever element it applies to. For example:

```jsx
style={{
  data: { fill: ({ datum }) => datum.y > 0 ? "green" : "red" },
  labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
  parent: { border: "1px solid #ccc" }
}}
```

**note:** The `style` prop used by `VictoryAxis` has a different format than the standard `style` prop.

**note:** When a component is rendered as a child of another Victory component, or within a custom `<svg>` element with `standalone={false}` parent styles will be applied to the enclosing `<g>` tag. Many styles that can be applied to a parent `<svg>` will not be expressed when applied to a `<g>`.

**note:** custom `angle` and `verticalAnchor` properties maybe included in labels styles.

_default (provided by default theme):_ See [grayscale theme][] for more detail

```playground
<VictoryScatter
  style={{
    parent: {
      border: "1px solid #ccc"
    },
    data: {
      fill: "#c43a31", fillOpacity: 0.6, stroke: "#c43a31", strokeWidth: 3
    },
    labels: {
      fontSize: 15, fill: "#c43a31", padding: 15
    }
  }}
  size={9}
  data={sampleData}
  labels={({ datum }) => datum.x}
/>
```

## theme

`type: object`

The `theme` prop specifies a theme to use for determining styles and layout properties for a component. Any styles or props defined in `theme` may be overwritten by props specified on the component instance. By default, components use a [grayscale theme][].

See the [Themes Guide][] for information about creating custom themes.

_default:_ `theme={VictoryTheme.grayscale}`

```jsx
theme={VictoryTheme.material}
```

## width

`type: number`

The `width` prop determines the width of the containing `<svg>`. By default Victory components render responsive containers with the `viewBox` attribute set to `viewBox="0, 0, width, height"` and `width="100%"`, `height="auto"`. In responsive containers, the `width` and `height` props affect the _aspect ratio_ of the rendered component, while the absolute width and height are determined by the container. To render a static container, pass `responsive={false}` to the `containerComponent` like `containerComponent={<VictoryContainer responsive={false}/>}`, or set `standalone={false}` and render the resulting `<g>` tag in your own `<svg>` container. When a component is nested within `VictoryChart`, `VictoryStack`, or `VictoryGroup` setting `width` prop on the child component will have no effect.

_default (provided by default theme):_ `width={450}`

```playground
<div>
  <VictoryBar width={1200}/>
  <VictoryBar width={1200}
    containerComponent={<VictoryContainer responsive={false}/>}
  />
</div>
```

## x

`type: string || integer || array[string] || function`

Use the `x` data accessor prop to determine how the component defines data in the x dimension. This prop may be given in a variety of formats:

**string:** specify which property in an array of data objects should be used as the x value

```jsx
x = "month";
```

**function:** use a function to translate each element in a data array into an x value

```jsx
x={(datum) => datum.xValue + datum.error}
```

**array index:** specify which index of an array should be used as an x value when data is given as an array of arrays

```jsx
x={0}
```

**path string or path array:** specify which property in an array of nested data objects should be used as an x value

```jsx
x="employees.name"`, `x={["employees", "name"]}
```

See the [Data Accessors Guide][] for more detail on formatting and processing data.

## y

`type: string || integer || array[string] || function`

Use `y` data accessor prop to determine how the component defines data in the y dimension. This prop may be given in a variety of formats:

**string:** specify which property in an array of data objects should be used as the y value

```jsx
y = "profit";
```

**function:** use a function to translate each element in a data array into a y value

```jsx
y={(datum) => Math.sin(2 * Math.PI * datum.x)}
```

**array index:** specify which index of an array should be used as a y value when data is given as an array of arrays

```jsx
y={1}
```

**path string or path array:** specify which property in an array of nested data objects should be used as a y value

```jsx
y="employees.salary"`, `y={["employees", "salary"]}
```

See the [Data Accessors Guide][] for more detail on formatting and processing data.

## y0

`type: string || integer || array[string] || function`

Use `y0` data accessor prop to determine how the component defines the baseline y0 data. This prop is useful for defining custom baselines for components like `VictoryBar` or `VictoryArea`. This prop may be given in a variety of formats.

**string:** specify which property in an array of data objects should be used as the y0 value

```jsx
y0 = "last_quarter_profit";
```

**function:** use a function to translate each element in a data array into a y0 value

```jsx
y0={() => 10}
```

**array index:** specify which index of an array should be used as a y0 value when data is given as an array of arrays

```jsx
y0={1}
```

**path string or path array:** specify which property in an array of nested data objects should be used as a y0 value

```jsx
y0="employees.salary"`, `y={["employees", "salary"]}
```

See the [Data Accessors Guide][] for more detail on formatting and processing data.

[x]: #x
[y]: #y
[grayscale theme]: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/grayscale.js
[width]: #width
[height]: #height
[victorylabel]: /docs/victory-label
[victorytooltip]: /docs/victory-tooltip
[victoryportal]: /docs/victory-portal
[victoryclipcontainer]: /docs/victory-clip-container
[victorybrushcontainer]: /docs/victory-brush-container
[victorycursorcontainer]: /docs/victory-cursor-container
[victoryselectioncontainer]: /docs/victory-selection-container
[victoryvoronoicontainer]: /docs/victory-voronoi-container
[victoryzoomcontainer]: /docs/victory-zoom-container
[createcontainer]: /docs/create-container
[victoryanimation]: /docs/victory-animation
[victorytransition]: /docs/victory-transition
[sortby]: https://lodash.com/docs/4.17.4#sortBy
[animations guide]: /guides/animations
[data accessors guide]: /guides/data-accessors
[custom components guide]: /guides/custom-components
[events guide]: /guides/events
[themes guide]: /guides/themes

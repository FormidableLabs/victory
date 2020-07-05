---
id: 6
title: Events
category: guides
scope:
  - assign
---
# Events

Victory uses a flexible event system that is agnostic of event type. Browser events like `onClick` are handled identically to mobile touch events like `onPressIn`.  Victory's event system allows users to attach events to any rendered element, and trigger mutations on any other rendered element.


This guide will demonstrate how to use Victory's event system within a single component, between several components nested within wrapper components like `VictoryChart` or `VictoryGroup`, and between several components using the `VictorySharedEvents` wrapper. This guide will also explain how to bypass Victory's event system entirely, and attach simple events directly to rendered components.


## Single Component Events


Events within a single component like `VictoryBar` may be defined by the `events` prop of the component. The component will be responsible for storing event-driven mutations on its state object. The `events` prop should be given as an array of event objects. Each object defines an event or set of events to attach to a particular target element, or set of target elements.


Target elements are specified by the `target` and `eventKey` properties. Valid `target` properties match the namespaces of the style element of any given component. For most components valid target properties are "data", "labels", and "parent". The `target` property is required. The optional `eventKey` property may be given as a value or array of values.


Events are defined by the `eventHandlers` property which should be given as an object whose properties are named events such as `onClick`, and whose values are event handlers. Event handlers are called with the event, the props defining the element that triggered the event, and the event key of the element that triggered the event.


Return values from event handlers are used to define mutations affecting rendered elements. Return values from event handlers should be given as an array of mutation objects. Mutation objects may have `target` and `eventKey` properties to specify an element to mutate. If these properties are not given, the mutation will effect the element that triggered the event. Mutation objects should also have a `mutation` property whose value is a function. The mutation function will be called with the event, the props defining the element that will be mutated, and the event key of the element that will be mutated. The mutation function should return an object of props to be modified, and the new values for those props.


In the example below, clicking on any of the bars will trigger a change in the text of the corresponding labels.


```playground
  <VictoryBar
    data={[
      {x: 1, y: 2, label: "A"},
      {x: 2, y: 4, label: "B"},
      {x: 3, y: 7, label: "C"},
      {x: 4, y: 3, label: "D"},
      {x: 5, y: 5, label: "E"},
    ]}
    events={[
      {
        target: "data",
        eventHandlers: {
          onClick: () => {
            return [{
              target: "labels",
              mutation: (props) => {
                return props.text === "clicked" ?
                  null : { text: "clicked" }
              }
            }];
          }
        }
      }
    ]}
  />
```

## Nested Component Events


Wrapper components like `VictoryChart`, `VictoryGroup`, and `VictoryStack` may define events for their children. Component events defined by wrappers operate much the same as single component events, except that the events are defined on the parent component, and event-driven mutations are stored in the parent's state. Events on child components are specified with the `childName` property. Components that have a `name` prop specified will be referenced by name. If child components do not have a `name` specified they will be referenced by index. In the example below, clicking on either of the bottom two areas in the stack will change the color of the top area.


```playground
<VictoryChart
  events={[{
    childName: ["area-1", "area-2"],
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [{
          childName: "area-4",
          mutation: (props) => {
            const fill = props.style.fill;
            return fill === "tomato" ? null : {style: {fill: "tomato"}};
          }
        }];
      }
    }
  }]}
>
  <VictoryStack>
    <VictoryArea name="area-1"
      data={[
        {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}
      ]}
    />
    <VictoryArea name="area-2"
      data={[
        {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}
      ]}
    />
    <VictoryArea name="area-3"
      data={[
        {x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}, {x: "d", y: 2}
      ]}
    />
    <VictoryArea name="area-4"
      data={[
        {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 3}, {x: "d", y: 4}
      ]}
    />
  </VictoryStack>
</VictoryChart>
```


## VictorySharedEvents


Components like `VictoryChart` use the `VictorySharedEvents` wrapper automatically, but the wrapper may also be used on its own. Nest child components within the `VictorySharedEvents` wrapper, and reference them as you would when using `VictoryChart`


```playground
<svg viewBox="0 0 450 350">
  <VictorySharedEvents
    events={[{
      childName: ["pie", "bar"],
      target: "data",
      eventHandlers: {
        onMouseOver: () => {
          return [{
            childName: ["pie", "bar"],
            mutation: (props) => {
              return {
                style: Object.assign({}, props.style, {fill: "tomato"})
              };
            }
          }];
        },
        onMouseOut: () => {
          return [{
            childName: ["pie", "bar"],
            mutation: () => {
              return null;
            }
          }];
        }
      }
    }]}
  >
    <g transform={"translate(150, 50)"}>
      <VictoryBar name="bar"
        width={300}
        standalone={false}
        style={{
          data: { width: 20 },
          labels: {fontSize: 25}
        }}
        data={[
          {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}
        ]}
        labels={["a", "b", "c", "d"]}
        labelComponent={<VictoryLabel y={290}/>}
      />
    </g>
    <g transform={"translate(0, -75)"}>
      <VictoryPie name="pie"
        width={250}
        standalone={false}
        style={{ labels: {fontSize: 25, padding: 10}}}
        data={[
          {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}
        ]}
      />
    </g>
  </VictorySharedEvents>
</svg>
```

## External Event Mutations

Occasionally is it necessary to trigger events in Victory's event system from some external element such as a button or a form field. Use the `externalEventMutation` prop to specify a set of mutations to apply to a given chart. The `externalEventMutations` should be given in the following form:

```jsx
externalEventMutations: PropTypes.arrayOf(PropTypes.shape({
  callback: PropTypes.function,
  childName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  eventKey: PropTypes.oneOfType([
    PropTypes.array,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string
  ]),
  mutation: PropTypes.function,
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}))
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

*Note* External mutations are applied to the same state object that is used to control events in Victory, so depending on the order in which they are triggered, external event mutations may override mutations caused by internal Victory events or vice versa.

## Simple Events


For simple events, it may be desireable to bypass Victory's event system. To do so, specify `events` props directly on primitive components rather than using the `events` prop on Victory components. The simple `events` prop should be given as an object whose properties are event names like `onClick`, and whose values are event handlers. Events specified this way will only be called with the standard event objects.

```playground
  <VictoryBar
    data={[
      {x: 1, y: 2},
      {x: 2, y: 4},
      {x: 3, y: 7},
      {x: 4, y: 3},
      {x: 5, y: 5},
    ]}
    dataComponent={
      <Bar
        events={{
          onClick: (evt) => alert(`(${evt.clientX}, ${evt.clientY})`)
        }}
      />
    }
  />
```

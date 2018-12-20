# VictorySharedEvents

`victory-shared-events@^30.0.0` exports `VictorySharedEvents`

View these docs at https://formidable.com/open-source/victory/docs/victory-shared-events to see live examples.

The `VictorySharedEvents` wrapper coordinates events between its child components. Specify a set of events on the `VictorySharedEvents` wrapper to target children. [VictoryChart][], [VictoryGroup][], and [VictoryStack][] all use `VictorySharedEvents`, but it may also be used on its own.

## Props

### children

`type: array[element]`

`VictorySharedEvents` renders an array of children with new `sharedEvents` props which define a set of events, and a shared state accessor.

### events

`type: array[object]`

The `events` prop takes an array of event objects. Event objects are composed of a `target`, an `eventKey`, a `childName` and `eventHandlers`. Targets may be any valid style namespace for a given component, so "data" and "labels" are valid targets for this components like `VictoryBar`. `eventKey` may be given as a single value, or as an array of values to specify individual targets. If `eventKey` is not specified, the given `eventHandlers` will be attached to all elements of the specified `target` type. The `childName` property may be given as a string or an array of strings to target multiple children. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `target`, `childName` and `eventKey` keys for specifying the element(s) to be modified, and a `mutation` key whose value is a function. The `target` and `eventKey` keys will default to those corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for each element that should be modified (i.e. a bar label), and the object returned from the mutation function will override the props of that element via object assignment.

_examples:_

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
        labelComponent={<VictoryLabel y={280}/>}
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

### eventKey

`type: string || integer || array[string] || function`

The `eventKey` prop is used to assign eventKeys to data. This prop operates identically to the `x` and `y` data accessor props. By default, the eventKey of each datum will be equal to its index in the data array. `eventKey` may also be defined directly on each data object.

### externalEventMutations

`type: array[object]`

Occasionally is it necessary to trigger events in Victory's event system from some external element such as a button or a form field. Use the `externalEventMutation` prop to specify a set of mutations to apply to a given chart. The `externalEventMutations` should be given in the following form:

```jsx
externalEventMutations: PropTypes.arrayOf(
  PropTypes.shape({
    callback: PropTypes.function,
    childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    eventKey: PropTypes.oneOfType([
      PropTypes.array,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
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
          childName: ["bar", "pie"],
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
        <svg viewBox="0 0 450 350">
          <VictorySharedEvents
            externalEventMutations={this.state.externalMutations}
            events={[{
              childName: ["pie", "bar"],
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [{
                    childName: ["pie", "bar"],
                    mutation: (props) => {
                      return {
                        style: Object.assign({}, props.style, {fill: "tomato"})
                      };
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
                labelComponent={<VictoryLabel y={280}/>}
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
      </div>
    )
  }
}

ReactDOM.render(<App/>, mountNode)
```

_Note_ External mutations are applied to the same state object that is used to control events in Victory, so depending on the order in which they are triggered, external event mutations may override mutations caused by internal Victory events or vice versa.

[victorychart]: https://formidable.com/open-source/victory/docs/victory-chart
[victorygroup]: https://formidable.com/open-source/victory/docs/victory-group
[victorystack]: https://formidable.com/open-source/victory/docs/victory-stack

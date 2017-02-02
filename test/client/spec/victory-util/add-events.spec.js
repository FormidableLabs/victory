/* eslint no-unused-expressions: 0 */
/* global sinon */

import React from "react";
import { defaults, forEach, get, reduce, map, memoize } from "lodash";
import { mount } from "enzyme";
import { Data, addEvents } from "src/index";

describe("victory-util/add-events", () => {
  class MockDataComponent extends React.Component {
    static displayName = "MockDataComponent";
    static role = "dataComponent";

    render() {
      const { datum: { x, y }, events, style } = this.props;
      return (
        <p style={style} {...events}>
          `${x}: ${y}`
        </p>
      );
    }
  }

  class MockLabel extends React.Component {
    static displayName = "MockLabel";
    static role = "label";

    render() {
      const { text } = this.props;

      return (
        <p>`${text}`</p>
      );
    }
  }

  class MockChart extends React.Component {
    static displayName = "MockChart";
    static role = "chart";

    static defaultProps = {
      dataComponent: <MockDataComponent/>,
      labelComponent: <MockLabel text='label'/>,
      groupComponent: <div/>
    };

    static getBaseProps = (props) => {
      const data = Data.getData(props.data);
      const childProps = reduce(data, (accum, datum, index) => {
        return defaults({}, accum, {
          [index]: {
            data: {
              index,
              datum,
              data
            }
          }
        });
      }, {});

      return childProps;
    };

    render() {
      const props = defaults({}, this.props, this.defaultProps);
      const { dataComponent, labelComponent, groupComponent } = props;

      const dataComponents = map(this.dataKeys, (_key, index) => {
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        return React.cloneElement(dataComponent, dataProps);
      });

      const labelComponents = map(this.dataKeys, (_key, index) => {
        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        return get(labelProps, 'text') ? React.cloneElement(labelComponent, labelProps) : undefined;
      });

      return React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents);
    }
  }

  it.only("do stuff", () => {
    const EventedMockChart = addEvents(MockChart);

    const wrapper = mount(
      <EventedMockChart
        data={[{ x: 1, y: 2 }, { x: 3, y: 4 }]}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "data",
                  mutation: (props) => {
                    return { style: { fill: 'tomato' } };
                  }
                }];
              }
            }
          }
        ]}
      />
    );

    const findDataComponentByIndex = memoize((eventKey) => {
      return wrapper.find(MockDataComponent).filterWhere((node) => {
        return node.props().datum.eventKey === eventKey;
      });
    });

    const expectEventTriggeredOn = (component, expectation) => {
      expect(get(component.props(), 'style.fill') === 'tomato').to.eql(expectation);
    };

    expectEventsTriggered = (expectations) => {
      forEach(expectations, (expectation, index) => {
        const dataComponent = findDataComponentByIndex(index);
        expectEventTriggeredOn(dataComponent, expectation);
      });
    };

    expectEventsTriggered([false, false]);
    findDataComponentByIndex(0).simulate('click');
    expectEventsTriggered([true, false]);
    findDataComponentByIndex(1).simulate('click');
    expectEventsTriggered([true, true]);
  });
});

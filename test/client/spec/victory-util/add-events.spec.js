/* eslint no-unused-expressions: 0 */
/* global sinon */

import React from "react";
import { forEach, get, memoize } from "lodash";
import { mount } from "enzyme";
import { addEvents } from "src/index";
import { MockChart, MockLabel, MockDataComponent } from "../mock-components";

describe("victory-util/add-events", () => {
  const EventedMockChart = addEvents(MockChart);

  const findDataComponentByIndex = memoize((index, wrapper) => {
    return wrapper.find(MockDataComponent).filterWhere((node) => {
      return node.props().index === index;
    });
  });

  const expectEventsTriggered = (testFn, expectations, wrapper) => {
    forEach(expectations, (expectation, index) => {
      const dataComponent = findDataComponentByIndex(index, wrapper);
      testFn(dataComponent, expectation);
    });
  };

  it.only("should set up events on data components", () => {
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

    const expectPropsMutation = (component, expectation) => {
      expect(get(component.props(), 'style.fill') === 'tomato').to.eql(expectation);
    };

    expectEventsTriggered(expectPropsMutation, [false, false], wrapper);
    findDataComponentByIndex(0).simulate('click');
    expectEventsTriggered(expectPropsMutation, [true, false], wrapper);
    findDataComponentByIndex(1).simulate('click');
    expectEventsTriggered(expectPropsMutation, [true, true], wrapper);
  });
});

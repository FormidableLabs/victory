/* eslint no-unused-expressions: 0 */
/* global sinon */

import React from "react";
import { forEach, get, memoize } from "lodash";
import { mount } from "enzyme";
import { addEvents } from "src/index";
import { MockChart, MockLabel, MockDataComponent } from "../mock-components";

describe("victory-util/add-events", () => {
  it.only("should set up events on data components", () => {
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

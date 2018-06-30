/* eslint max-params: 0 */

import React from "react";
import { get } from "lodash";
import { mount } from "enzyme";
import { addEvents } from "packages/victory-core/src/index";
import { MockVictoryComponent, MockLabel, MockDataComponent } from "../../../../mock-components";

describe("victory-util/add-events", () => {
  const EventedMockVictoryComponent = addEvents(MockVictoryComponent);

  const expectEventsTriggered = (getComponentsToTest, testFn, expectations, wrapper) => {
    expect(getComponentsToTest(wrapper).map(testFn)).to.eql(expectations);
  };

  const getDataComponents = (wrapper) => {
    return wrapper.find(MockDataComponent);
  };

  const getLabelComponents = (wrapper) => {
    return wrapper.find(MockLabel);
  };

  it("should set up events on data components to target themselves", () => {
    const wrapper = mount(
      <EventedMockVictoryComponent
        data={[{ x: 1, y: 2 }, { x: 3, y: 4 }]}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "data",
                  mutation: () => {
                    return { style: { fill: "tomato" } };
                  }
                }];
              }
            }
          }
        ]}
      />
    );

    const dataComponentIsAltered = (dataComponent) => {
      return get(dataComponent.props(), "style.fill") === "tomato";
    };

    expectEventsTriggered(getDataComponents, dataComponentIsAltered, [false, false], wrapper);
    getDataComponents(wrapper).at(0).simulate("click");
    expectEventsTriggered(getDataComponents, dataComponentIsAltered, [true, false], wrapper);
    getDataComponents(wrapper).at(1).simulate("click");
    expectEventsTriggered(getDataComponents, dataComponentIsAltered, [true, true], wrapper);
  });

  it("should set up events on data components to target labels", () => {
    const wrapper = mount(
      <EventedMockVictoryComponent
        data={[{ x: 1, y: 2 }, { x: 3, y: 4 }]}
        labelComponent={<MockLabel text="unaffected"/>}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "labels",
                  mutation: () => {
                    return { text: "altered" };
                  }
                }];
              }
            }
          }
        ]}
      />
    );

    const labelComponentIsAltered = (labelComponent) => {
      return get(labelComponent.props(), "text") === "altered";
    };

    expectEventsTriggered(getLabelComponents, labelComponentIsAltered, [false, false], wrapper);
    getDataComponents(wrapper).at(0).simulate("click");
    expectEventsTriggered(getLabelComponents, labelComponentIsAltered, [true, false], wrapper);
    getDataComponents(wrapper).at(1).simulate("click");
    expectEventsTriggered(getLabelComponents, labelComponentIsAltered, [true, true], wrapper);
  });
});

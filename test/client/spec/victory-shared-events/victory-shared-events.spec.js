/**
 * Client tests
 */
import { assign, forEach } from "lodash";
import { mount } from "enzyme";
import React from "react";
import { addEvents } from "packages/victory-core/src/index";
import { VictorySharedEvents } from "packages/victory-shared-events/src/index";
import { MockVictoryComponent, MockDataComponent } from "../mock-components";

describe("components/victory-shared-events", () => {
  const EventedMockVictoryComponent = addEvents(MockVictoryComponent);

  const findComponentByName = (name, component) => {
    // workaround for nonfunctional prop selector on mounted components
    // https://github.com/airbnb/enzyme/issues/534
    return component.findWhere((node) => {
      return node.prop("name") === name;
    });
  };

  const expectOnDataComponents = (expectationMatrix, testFn, component) => {
    forEach(expectationMatrix, (dataComponentExpectations, parentComponentName) => {
      const dataComponentTests = findComponentByName(parentComponentName, component)
        .find(MockDataComponent)
        .map(testFn);

      expect(dataComponentTests).to.eql(dataComponentExpectations);
    });
  };

  const findDataComponent = (parentName, index, component) => {
    return findComponentByName(parentName, component)
      .find(MockDataComponent)
      .at(index);
  };

  it("should trigger shared events exclusively on selected children", () => {
    const data = [
      { x: "a", y: 2 },
      { x: "b", y: 3 },
      { x: "c", y: 5 },
      { x: "d", y: 4 }
    ];
    const wrapper = mount(
      <svg>
        <VictorySharedEvents
          events={[{
            childName: ["one", "two"],
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  childName: ["one", "three"],
                  mutation: (props) => {
                    return {
                      style: assign({}, props.style, { fill: "tomato" })
                    };
                  }
                }];
              }
            }
          }]}
        >
          <EventedMockVictoryComponent name="one" data={data} />
          <EventedMockVictoryComponent name="two" data={data} />
          <EventedMockVictoryComponent name="three" data={data} />
        </VictorySharedEvents>
      </svg>
    );

    const componentReceivedChange = (component) => {
      return component.prop("style").fill === "tomato";
    };

    // Expect no events triggered at beginning.
    expectOnDataComponents({
      one: [false, false, false, false],
      two: [false, false, false, false],
      three: [false, false, false, false]
    }, componentReceivedChange, wrapper);

    findDataComponent("one", 0, wrapper).simulate("click");

    // First child data components trigger effects on first and third
    expectOnDataComponents({
      one: [true, false, false, false],
      two: [false, false, false, false],
      three: [true, false, false, false]
    }, componentReceivedChange, wrapper);

    findDataComponent("two", 1, wrapper).simulate("click");

    // Second child data components trigger effects on first and third
    expectOnDataComponents({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, componentReceivedChange, wrapper);

    findDataComponent("three", 2, wrapper).simulate("click");

    // Third child data components do not trigger effects
    expectOnDataComponents({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, componentReceivedChange, wrapper);
  });
});

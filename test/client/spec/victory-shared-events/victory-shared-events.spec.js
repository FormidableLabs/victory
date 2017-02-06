/**
 * Client tests
 */
import { memoize, forEach } from "lodash";
import { mount } from "enzyme";
import React from "react";
import { addEvents } from "src/index";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { MockVictoryComponent, MockLabel, MockDataComponent } from "../mock-components";

describe("components/victory-shared-events", () => {
  const EventedMockVictoryComponent = addEvents(MockVictoryComponent);

  it.only("should trigger shared events exclusively on selected children", () => {
    const data = [
      {x: "a", y: 2},
      {x: "b", y: 3},
      {x: "c", y: 5},
      {x: "d", y: 4}
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
                      style: Object.assign({}, props.style, {fill: "tomato"})
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

    const findDataComponent = memoize((name, index, component) => {
      return component
        .find(EventedMockVictoryComponent)
        .filterWhere((victoryComponent) => {
          return victoryComponent.props().name === name;
        })
        .find(MockDataComponent)
        .filterWhere((dataComponent) => {
          return dataComponent.props().index === index;
        });
    }, (name, index) => {
      return name + index;
    });

    const expectEventEffects = (expectationMatrix, component) => {
      forEach(expectationMatrix, (dataComponents, parentComponentName) => {
        forEach(dataComponents, (eventExpectation, index) => {
          const node = findDataComponent(parentComponentName, index, component);
          const eventTriggeredOnComponent = node.props().style.fill === "tomato";

          expect(eventTriggeredOnComponent).to.eql(eventExpectation);
        });
      });
    };

    // Expect no events triggered at beginning.
    expectEventEffects({
      one: [false, false, false, false],
      two: [false, false, false, false],
      three: [false, false, false, false]
    }, wrapper);

    findDataComponent('one', 0, wrapper).simulate("click");

    // Pie triggers effects on pie and scatter plot
    expectEventEffects({
      one: [true, false, false, false],
      two: [false, false, false, false],
      three: [true, false, false, false]
    }, wrapper);

    findDataComponent('two', 1, wrapper).simulate("click");

    // Bar triggers effects on pie and scatter plot
    expectEventEffects({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, wrapper);

    findDataComponent('three', 2, wrapper).simulate("click");

    // Scatter does not trigger effects
    expectEventEffects({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, wrapper);
  });
});

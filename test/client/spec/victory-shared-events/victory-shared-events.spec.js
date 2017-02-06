/**
 * Client tests
 */
import { curry, flow, forEach } from "lodash";
import { mount } from "enzyme";
import React from "react";
import { addEvents } from "src/index";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { MockVictoryComponent, MockLabel, MockDataComponent } from "../mock-components";

describe("components/victory-shared-events", () => {
  const EventedMockVictoryComponent = addEvents(MockVictoryComponent);

  it("should trigger shared events exclusively on selected children", () => {
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

    const findVictoryComponentByName = curry((name, component) => {
      return component
        .find(EventedMockVictoryComponent)
        .filterWhere((victoryComponent) => {
          return victoryComponent.props().name === name;
        })
    });

    const findDataComponents = (component) => {
      return component.find(MockDataComponent);
    };

    const findByIndex = curry((index, component) => {
      return component.at(index);
    });

    const mapToEventEffects = curry((testFn, components) => {
      return components.map(testFn);
    });

    const expectEqual = curry((expectation, data) => {
      expect(data).to.eql(expectation);
    });

    const expectEventEffects = (expectationMatrix, testFn, component) => {
      forEach(expectationMatrix, (dataComponentExpectations, parentComponentName) => {
        flow([
          findVictoryComponentByName(parentComponentName),
          findDataComponents,
          mapToEventEffects(testFn),
          expectEqual(dataComponentExpectations)
        ])(component);
      });
    };

    const eventTriggeredOnComponent = (component) => {
      return component.props().style.fill === "tomato";
    }

    const findDataComponent = (parentName, index, component) => {
      return flow([
        findVictoryComponentByName(parentName),
        findDataComponents,
        findByIndex(index)
      ])(component);
    };

    // Expect no events triggered at beginning.
    expectEventEffects({
      one: [false, false, false, false],
      two: [false, false, false, false],
      three: [false, false, false, false]
    }, eventTriggeredOnComponent, wrapper);

    findDataComponent('one', 0, wrapper).simulate("click");

    // First child data components trigger effects on first and third
    expectEventEffects({
      one: [true, false, false, false],
      two: [false, false, false, false],
      three: [true, false, false, false]
    }, eventTriggeredOnComponent, wrapper);

    findDataComponent('two', 1, wrapper).simulate("click");

    // Second child data components trigger effects on first and third
    expectEventEffects({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, eventTriggeredOnComponent, wrapper);

    findDataComponent('three', 2, wrapper).simulate("click");

    // Third child data components do not trigger effects
    expectEventEffects({
      one: [true, true, false, false],
      two: [false, false, false, false],
      three: [true, true, false, false]
    }, eventTriggeredOnComponent, wrapper);
  });
});

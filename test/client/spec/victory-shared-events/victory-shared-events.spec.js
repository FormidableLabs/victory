/**
 * Client tests
 */
import { memoize, forEach } from "lodash";
import { mount } from "enzyme";
import React from "react";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { VictoryPie } from "victory-pie";
import { VictoryBar, VictoryScatter } from "victory-chart";
import { Slice, Bar, Point } from "src/victory-primitives";

describe("components/victory-shared-events", () => {
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
            childName: ["pie", "bar"],
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  childName: ["pie", "scatter"],
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
          <VictoryBar name="bar"
            data={data}
            dataComponent= {< Bar />}
          />
          <VictoryPie name="pie"
            data={data}
            dataComponent={< Slice />}
          />
          <VictoryScatter name="scatter"
            data={data}
            dataComponent={< Point />}
          />
        </VictorySharedEvents>
      </svg>
    );

    const findDataComponent = memoize((type, index, component) => {
      return component.find(type).filterWhere((dataComponent) => {
        return dataComponent.props().index === index;
      });
    }, (type, index) => {
      return type + index;
    });

    const expectEventEffects = (expectationMatrix, component) => {
      forEach(expectationMatrix, (dataComponents, dataComponentType) => {
        forEach(dataComponents, (eventExpectation, index) => {
          const node = findDataComponent(dataComponentType, index, component);
          const eventTriggeredOnComponent = node.props().style.fill === "tomato";

          expect(eventTriggeredOnComponent).to.eql(eventExpectation);
        });
      });
    };

    // Expect no events triggered at beginning.
    expectEventEffects({
      Slice: [false, false, false, false],
      Bar: [false, false, false, false],
      Point: [false, false, false, false]
    }, wrapper);

    findDataComponent(Slice, 0, wrapper).simulate("click");

    // Pie triggers effects on pie and scatter plot
    expectEventEffects({
      Slice: [true, false, false, false],
      Bar: [false, false, false, false],
      Point: [true, false, false, false]
    }, wrapper);

    findDataComponent(Bar, 1, wrapper).simulate("click");

    // Bar triggers effects on pie and scatter plot
    expectEventEffects({
      Slice: [true, true, false, false],
      Bar: [false, false, false, false],
      Point: [true, true, false, false]
    }, wrapper);

    findDataComponent(Point, 2, wrapper).simulate("click");

    // Scatter does not trigger effects
    expectEventEffects({
      Slice: [true, true, false, false],
      Bar: [false, false, false, false],
      Point: [true, true, false, false]
    }, wrapper);
  });
});

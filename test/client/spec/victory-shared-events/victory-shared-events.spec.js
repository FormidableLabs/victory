/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { curry, forEach, get, map } from "lodash";
import { mount } from "enzyme";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { VictoryPie } from "victory-pie";
import { VictoryBar, VictoryScatter } from "victory-chart";
import { Slice, Bar, Point } from "src/victory-primitives";

describe("components/victory-shared-events", () => {
  it.only("should trigger shared events on selected children", () => {
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

    const findDataComponent = (type, index, wrapper) => {
      return wrapper.find(type).filterWhere((dataComponent) => {
        return get(dataComponent.props(), "index") === index;
      });
    };

    const expectEventEffects = (componentMatrix) => {
      forEach(componentMatrix, (dataComponents, dataComponentType) => {
        forEach(dataComponents, (eventExpectation, index) => {
          const node = findDataComponent(dataComponentType, index, wrapper);
          const eventTriggeredOnComponent = node.props().style.fill === 'tomato';

          expect(eventTriggeredOnComponent).to.eql(eventExpectation);
        });
      });
    };

    expectEventEffects({
      Slice: [false, false, false, false],
      Bar: [false, false, false, false],
      Point: [false, false, false, false]
    });

    findDataComponent(Slice, 0, wrapper).simulate("click");

    expectEventEffects({
      Slice: [true, false, false, false],
      Bar: [true, false, false, false],
      Point: [false, false, false, false]
    });

    findDataComponent(Bar, 1, wrapper).simulate("click");

    expectEventEffects({
      Slice: [true, true, false, false],
      Bar: [true, true, false, false],
      Point: [false, false, false, false]
    });

    findDataComponent(Point, 2, wrapper).simulate("click");

    expectEventEffects({
      Slice: [true, true, false, false],
      Bar: [true, true, false, false],
      Point: [false, false, false, false]
    });
  });
});

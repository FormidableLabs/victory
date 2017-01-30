/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { get, curry } from "lodash";
import { mount } from "enzyme";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { VictoryPie } from "victory-pie";
import { VictoryBar } from "victory-chart";
import { Slice, Bar } from "src/victory-primitives";

describe("components/victory-shared-events", () => {
  it("should trigger shared events on children", () => {
    const clickHandler = sinon.spy();
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
                    clickHandler();
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
            data={[
              {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}
            ]}
            dataComponent= {< Bar />}
          />
          <VictoryPie name="pie"
            data={[
              {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}
            ]}
            dataComponent={< Slice />}
          />
        </VictorySharedEvents>
      </svg>
    );

    const findDataComponent = (type, xName, wrapper) => {
      return wrapper.find(type).filterWhere((dataComponent) => {
        return get(dataComponent.props(), "datum.xName") === xName;
      });
    };

    const sliceA = findDataComponent(Slice, "a", wrapper);
    const barA = findDataComponent(Bar, "a", wrapper);
    const sliceB = findDataComponent(Slice, "b", wrapper);
    const barB = findDataComponent(Bar, "b", wrapper);

    expect(barA.props().style.fill).not.to.eql('tomato');
    sliceA.simulate("click");
    expect(barA.props().style.fill).to.eql('tomato');

    expect(sliceB.props().style.fill).not.to.eql('tomato');
    barB.simulate("click");
    expect(sliceB.props().style.fill).to.eql('tomato');
  });
});

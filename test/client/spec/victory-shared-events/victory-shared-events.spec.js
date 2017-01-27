/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { mount } from "enzyme";
import VictorySharedEvents from "src/victory-shared-events/victory-shared-events";
import { VictoryPie } from "victory-pie";
import { VictoryBar } from "victory-chart";
import { Slice, Bar } from "src/victory-primitives";

describe("components/victory-shared-events", () => {
  it.only("should trigger shared events on children", () => {
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
          />
          <VictoryPie name="pie"
            data={[
              {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}
            ]}
          />
        </VictorySharedEvents>
      </svg>
    );

    const Slices = wrapper.find(VictoryPie).find(Slice);

    console.log(Slices.length);
    //   const initialProps = Slices.at(index).props();
    //   node.simulate("click");
    //   expect(clickHandler.called).to.equal(false);
    //   // the first argument is the standard evt object
    //   expect(omit(clickHandler.args[index][1], ["events", "key"]))
    //     .to.eql(omit(initialProps, ["events", "key"]));
    //   expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
    // });



  });
});

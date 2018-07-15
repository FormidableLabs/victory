/* eslint no-unused-expressions: 0 */
/* global sinon */

import { Events } from "packages/victory-core/src/index";

describe("victory-util/events", () => {
  describe("getPartialEvents", () => {
    it("returns a set of new event functions with partially applied arguments", () => {
      const events = {
        onClick: (evt, childProps, index) => {
          return { evt, childProps, index };
        }
      };
      const index = 0;
      const childProps = { style: { fill: "green" } };
      const result = Events.getPartialEvents(events, index, childProps);
      expect(result).to.have.keys(["onClick"]);
      expect(result.onClick()).to.have.keys(["evt", "childProps", "index"]);
      expect(result.onClick().index).to.eql(index);
      expect(result.onClick().childProps).to.eql(childProps);
    });
  });

  describe("getEvents", () => {
    let sandbox;
    let fake;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      fake = {
        props: {
          events: [{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return {
                  mutation: () => {
                    return { foo: "foo" };
                  }
                };
              }
            }
          }]
        },
        baseProps: { 0: {
          data: { foo: "bar" }
        } },
        setState: (x) => x,
        state: {}
      };
      sandbox.spy(fake, "setState");
    });

    afterEach(() => {
      sandbox.reset();
    });

    it("returns new functions that call set state", () => {
      const getScopedEvents = Events.getScopedEvents.bind(fake);
      const getBoundEvents = Events.getEvents.bind(fake);
      const index = 0;
      const result = getBoundEvents(fake.props, "data", index, getScopedEvents);
      expect(result).to.have.keys(["onClick"]);
      const partialEvents = Events.getPartialEvents(result, index, {});
      expect(partialEvents).to.have.keys(["onClick"]);
      partialEvents.onClick();
      expect(fake.setState).returned({
        [index]: {
          data: { foo: "foo" }
        }
      });
    });
  });
});

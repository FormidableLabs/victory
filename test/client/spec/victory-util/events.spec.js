/* eslint no-unused-expressions: 0 */
/* global sinon */

import { Events } from "src/index";

describe("helpers/events", () => {
  describe("getPartialEvents", () => {
    it("returns a set of new event functions with partially applied arguments", () => {
      const events = {
        onClick: (evt, childProps, index) => {
          return {evt, childProps, index};
        }
      };
      const index = 0;
      const childProps = {style: {fill: "green"}};
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
          events: {
            data: {
              onClick: () => { return {data: "foo"}; }
            }
          }
        },
        setState: (x) => x,
        state: {}
      };
      sandbox.spy(fake, "setState");
    });

    afterEach(() => {
      sandbox.reset();
    });

    it("returns new functions that call set state", () => {
      const getBoundEvents = Events.getEvents.bind(fake);
      const result = getBoundEvents(fake.props.events.data, "data");
      const index = 0;
      const partialEvents = Events.getPartialEvents(result, index, {});
      expect(partialEvents).to.have.keys(["onClick"]);
      partialEvents.onClick();
      expect(fake.setState).calledWith({
        [index]: {
          data: "foo"
        }
      });
    });
  });
});

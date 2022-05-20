import { Events } from "victory-core";

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
      expect(Object.keys(result)).toEqual(expect.arrayContaining(["onClick"]));
      expect(Object.keys(result.onClick())).toEqual(
        expect.arrayContaining(["evt", "childProps", "index"])
      );
      expect(result.onClick().index).toEqual(index);
      expect(result.onClick().childProps).toEqual(childProps);
    });
  });

  describe("getEvents", () => {
    let fake;
    beforeEach(() => {
      fake = {
        props: {
          events: [
            {
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
            }
          ]
        },
        baseProps: {
          0: {
            data: { foo: "bar" }
          }
        },
        setState: (x) => x,
        state: {}
      };
      jest.spyOn(fake, "setState");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns new functions that call set state", () => {
      const getScopedEvents = Events.getScopedEvents.bind(fake);
      const getBoundEvents = Events.getEvents.bind(fake);
      const index = 0;
      const result = getBoundEvents(fake.props, "data", index, getScopedEvents);
      expect(Object.keys(result)).toEqual(expect.arrayContaining(["onClick"]));
      const partialEvents = Events.getPartialEvents(result, index, {});
      expect(Object.keys(partialEvents)).toEqual(
        expect.arrayContaining(["onClick"])
      );
      partialEvents.onClick();
      expect(fake.setState).toReturnWith({
        [index]: {
          data: { foo: "foo" }
        }
      });
    });
  });
});

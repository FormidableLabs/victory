import { Transitions } from "victory-core";
import React from "react";

describe("getInitialTransitionState", () => {
  const makeChild = (data) => {
    return React.createElement("div", { data });
  };

  it("returns a 'falsey' transition object if children are not given", () => {
    const result = Transitions.getInitialTransitionState(null, null);
    expect(result).toEqual({
      childrenTransitions: [],
      nodesWillExit: false,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions entering and exiting false for identical data", () => {
    const child = makeChild([
      { x: 1, y: 1 },
      { x: 2, y: 3 }
    ]);
    const result = Transitions.getInitialTransitionState(child, child);
    expect(result).toEqual({
      childrenTransitions: [{ entering: false, exiting: false }],
      nodesWillExit: false,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions with exiting data", () => {
    const child1 = makeChild([
      { x: 1, y: 1 },
      { x: 2, y: 3 }
    ]);
    const child2 = makeChild([{ x: 1, y: 1 }]);
    const result = Transitions.getInitialTransitionState(child1, child2);
    expect(result).toEqual({
      childrenTransitions: [{ entering: false, exiting: { 1: true } }],
      nodesWillExit: true,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions with entering data", () => {
    const child1 = makeChild([{ x: 1, y: 1 }]);
    const child2 = makeChild([
      { x: 1, y: 1 },
      { x: 2, y: 3 }
    ]);
    const result = Transitions.getInitialTransitionState(child1, child2);
    expect(result).toEqual({
      childrenTransitions: [{ entering: { 1: true }, exiting: false }],
      nodesWillExit: false,
      nodesWillEnter: true,
      nodesShouldEnter: false
    });
  });
});

describe("getTransitionPropsFactory", () => {
  const toZero = jest.fn().mockImplementation(() => ({ y: 0 }));
  const makeChild = (data) => {
    return {
      type: {
        defaultTransitions: {
          onExit: { duration: 1, before: toZero },
          onEnter: { duration: 2, before: toZero }
        }
      },
      props: { data, animate: { duration: 0 } }
    };
  };

  const callback = jest.fn();

  it("returns a function that describes data exiting", () => {
    const exitingState = {
      childrenTransitions: [{ entering: false, exiting: { 1: true } }],
      nodesWillExit: true,
      nodesWillEnter: false,
      nodesShouldEnter: false,
      nodesShouldLoad: true,
      nodesDoneLoad: true
    };
    const result = Transitions.getTransitionPropsFactory(
      {},
      exitingState,
      callback
    );
    const child = makeChild([
      { x: 1, y: 1 },
      { x: 2, y: 3 }
    ]);
    const calledResult = result(child);
    expect(result).toBeInstanceOf(Function);
    expect(Object.keys(calledResult)).toEqual(
      expect.arrayContaining(["animate", "data"])
    );
    expect(calledResult.data).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ]);
    expect(calledResult.animate.duration).toEqual(
      child.type.defaultTransitions.onExit.duration
    );
  });

  it("returns a function that describes data entering", () => {
    const enteringState = {
      childrenTransitions: [{ entering: { 1: true }, exiting: false }],
      nodesWillExit: false,
      nodesWillEnter: true,
      nodesShouldEnter: false,
      nodesShouldLoad: true,
      nodesDoneLoad: true
    };
    const result = Transitions.getTransitionPropsFactory(
      {},
      enteringState,
      callback
    );
    const child = makeChild([
      { x: 1, y: 1 },
      { x: 2, y: 3 }
    ]);
    const calledResult = result(child);
    expect(result).toBeInstanceOf(Function);
    expect(calledResult).toBeInstanceOf(Object);
    expect(calledResult).toBeInstanceOf(Object);
    expect(Object.keys(calledResult)).toEqual(
      expect.arrayContaining(["animate", "data"])
    );

    expect(calledResult.data).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ]);
  });
});

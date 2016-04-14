/* eslint no-unused-expressions: 0 */
/* global sinon */
import { Transitions } from "src/index";

describe("getInitialTransitionState", () => {
  const makeChild = (data) => {
    return {
      props: {data}
    };
  };

  it("returns a 'falsey' transition object if children are not given", () => {
    const result = Transitions.getInitialTransitionState([], []);
    expect(result).to.eql({
      childrenTransitions: [],
      nodesWillExit: false,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions entering and exiting false for identical data", () => {
    const child = makeChild([{x: 1, y: 1}, {x: 2, y: 3}]);
    const result = Transitions.getInitialTransitionState([child], [child]);
    expect(result).to.eql({
      childrenTransitions: [{entering: false, exiting: false}],
      nodesWillExit: false,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions with exiting data", () => {
    const child1 = makeChild([{x: 1, y: 1}, {x: 2, y: 3}]);
    const child2 = makeChild([{x: 1, y: 1}]);
    const result = Transitions.getInitialTransitionState([child1], [child2]);
    expect(result).to.eql({
      childrenTransitions: [{entering: false, exiting: {1: true}}],
      nodesWillExit: true,
      nodesWillEnter: false,
      nodesShouldEnter: false
    });
  });

  it("it returns childTransitions with entering data", () => {
    const child1 = makeChild([{x: 1, y: 1}]);
    const child2 = makeChild([{x: 1, y: 1}, {x: 2, y: 3}]);
    const result = Transitions.getInitialTransitionState([child1], [child2]);
    expect(result).to.eql({
      childrenTransitions: [{entering: {1: true}, exiting: false}],
      nodesWillExit: false,
      nodesWillEnter: true,
      nodesShouldEnter: false
    });
  });
});

describe("getTransitionPropsFactory", () => {
  it("returns a function that describes props entering", () => {
    const enteringState = {
      childrenTransitions: [{entering: {1: true}, exiting: false}],
      nodesWillExit: false,
      nodesWillEnter: true,
      nodesShouldEnter: false
    };
    const callback = sinon.stub();
    const result = Transitions.getTransitionPropsFactory({}, enteringState, callback);
    expect(result).to.be.a("function");
  });

});

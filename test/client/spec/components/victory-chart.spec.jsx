/**
 * Client tests
 */
import React from "react/addons";
import Component from "src/components/victory-chart";

// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
const TestUtils = React.addons.TestUtils;

describe("components/victory-chart", function () {
  it("has expected content with shallow render", function () {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("svg");
  });
});

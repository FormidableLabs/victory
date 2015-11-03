/**
 * Client tests
 */
import React from "react";
import Component from "src/components/victory-label";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

describe("components/victory-label", () => {

  it("has expected content with deep render", () => {
    // This is a "deep" render that renders children + all into an actual
    // browser DOM node.
    //
    // https://facebook.github.io/react/docs/test-utils.html#renderintodocument
    const rendered = TestUtils.renderIntoDocument(<Component />);

    // This is a real DOM node to assert on.
    const divNode = TestUtils
      .findRenderedDOMComponentWithTag(rendered, "div");

    expect(divNode).to.have.property("innerHTML", "Edit me!");
  });

  it("has expected content with shallow render", () => {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("div");
    expect(output.props.children).to.contain("Edit me");
  });
});

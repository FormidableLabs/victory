/**
 * Client tests
 */
import React from "react";
import VictoryLabel from "src/components/victory-label";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

describe("components/victory-label", () => {

  it("has expected content with deep render", () => {
    // This is a "deep" render that renders children + all into an actual
    // browser DOM node.
    //
    // https://facebook.github.io/react/docs/test-utils.html#renderintodocument
    const rendered = TestUtils.renderIntoDocument(
      <VictoryLabel>An Accurate Label</VictoryLabel>
    );

    // This is a real DOM node to assert on.
    const textNode = TestUtils
      .findRenderedDOMComponentWithTag(rendered, "text");

    const spanNode = textNode.childNodes[0];

    expect(spanNode).to.have.property("innerHTML", "An Accurate Label");
  });

  it("has expected content with shallow render", () => {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<VictoryLabel>time (ms)</VictoryLabel>);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("text");
    expect(output.props.children[0].props.children).to.contain("time (ms)");
  });
});

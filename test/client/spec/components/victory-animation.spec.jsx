/**
 * Client tests
 */
import React from "react/addons";
import Component from "src/components/victory-animation";

// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
const TestUtils = React.addons.TestUtils;

describe("components/victory-animation", function () {

  it("has expected content with deep render", function () {
    // This is a "deep" render that renders children + all into an actual
    // browser DOM node.
    //
    // https://facebook.github.io/react/docs/test-utils.html#renderintodocument
    const rendered = TestUtils.renderIntoDocument(
      <Component data={{test: true}}>
        {()=> {
          return <div>I rendered!</div>;
        }}
      </Component>
    );

    // This is a real DOM node to assert on.
    const divNode = TestUtils
      .findRenderedDOMComponentWithTag(rendered, "div")
      .getDOMNode();

    expect(divNode).to.have.property("innerHTML", "I rendered!");
  });

  it("has expected content with shallow render", function () {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Component data={{test: true}}>
        {()=> {
          return <div>I rendered!</div>;
        }}
      </Component>
    );
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("div");
    expect(output.props.children).to.contain("I rendered!");
  });
});

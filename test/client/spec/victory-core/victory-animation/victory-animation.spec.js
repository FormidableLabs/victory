/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";
import { VictoryAnimation } from "victory-core";

describe("components/victory-animation", () => {
  it("has expected content with shallow render", () => {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const wrapper = shallow(
      <VictoryAnimation data={{ test: true }}>
        {() => {
          return <div>I rendered!</div>;
        }}
      </VictoryAnimation>
    );
    const output = wrapper.find("div");
    expect(output.prop("children")).to.contain("I rendered!");
  });
});

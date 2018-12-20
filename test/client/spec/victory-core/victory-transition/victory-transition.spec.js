/**
 * Client tests
 */
import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import VictoryTransition from "packages/victory-core/src/victory-transition/victory-transition";

class TestComponent extends React.Component {
  render() {
    return <text className="foo">{this.props.message[0]}</text>;
  }
}

TestComponent.propTypes = {
  message: PropTypes.array
};

describe("components/victory-transition", () => {
  it("renders a child component", () => {
    const wrapper = mount(
      <VictoryTransition animate={{ duration: 0 }} animationWhitelist={["data"]}>
        <TestComponent animate={{ duration: 0 }} message={["HELLO"]} />
      </VictoryTransition>
    );
    const output = wrapper.find(".foo");
    expect(output.length).to.equal(1);
    expect(output.text()).to.equal("HELLO");
  });
});

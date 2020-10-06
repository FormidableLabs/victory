import React from "react";
import { shallow, mount } from "enzyme";
import VictoryAccessibilityGroup from "packages/victory-core/src/victory-accessibility-group/victory-accessibility-group";
import { wrap } from "lodash";

describe("components/victory-accessibility-group", () => {
  it("renders an g with an aria-label", () => {
    const wrapper = mount(<VictoryAccessibilityGroup aria-label="test-aria-label" />);
    expect(wrapper.find("g")).to.have.length(1);
    expect(wrapper.find("g").prop("aria-label")).to.equal("test-aria-label");
  });

  it("renders an g with a tabIndex and className", () => {
    const wrapper = mount(<VictoryAccessibilityGroup tabIndex={5} className="accessibility" />);
    expect(wrapper.find("g").prop("tabIndex")).to.equal(5);
    expect(wrapper.find("g").prop("className")).to.equal("accessibility");
  });

  it("renders an g with a desc node if given", () => {
    const wrapper = mount(
      <VictoryAccessibilityGroup
        desc="test description"
        aria-describedby="test description aria"
        descId="test-desc"
      />
    );
    expect(wrapper.find("desc").text()).to.equal("test description");
    expect(wrapper.find("desc").prop("aria-describedby")).to.equal("test description aria");
    expect(wrapper.find("desc").prop("id")).to.equal("test-desc");
  });
});

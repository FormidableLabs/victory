/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";
import VictoryContainer from "src/victory-container/victory-container";

describe("components/victory-container", () => {
  it("renders an svg with a role of img", () => {
    const wrapper = shallow(
      <VictoryContainer />
    );
    const output = wrapper.find("svg");
    expect(output.prop("role")).to.contain("img");
  });

  it("renders an svg with a default title node", () => {
    const wrapper = shallow(
      <VictoryContainer />
    );
    const output = wrapper.find("title");
    expect(output.html()).to.contain("Victory Chart");
  });

  it("renders an svg with a desc node", () => {
    const wrapper = shallow(
      <VictoryContainer desc="description"/>
    );
    const output = wrapper.find("desc");
    expect(output.html()).to.contain("description");
  });
});

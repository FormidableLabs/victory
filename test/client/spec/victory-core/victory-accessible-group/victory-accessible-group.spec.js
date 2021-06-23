/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow } from "enzyme";
import VictoryAccessibleGroup from "packages/victory-core/src/victory-accessible-group/victory-accessible-group";

describe("components/victory-accessible-group", () => {
  it("renders an g with an aria-label", () => {
    const wrapper = shallow(
      <VictoryAccessibleGroup aria-label="test-aria-label" />
    );
    expect(wrapper.find("g")).to.have.length(1);
    expect(wrapper.find("g").prop("aria-label")).to.equal("test-aria-label");
  });

  it("renders an g with a tabIndex and className", () => {
    const wrapper = shallow(
      <VictoryAccessibleGroup tabIndex={5} className="accessibility" />
    );
    expect(wrapper.find("g").prop("tabIndex")).to.equal(5);
    expect(wrapper.find("g").prop("className")).to.equal("accessibility");
  });

  it("renders an g with a desc node if given", () => {
    const wrapper = shallow(
      <VictoryAccessibleGroup
        aria-label="desc node tests"
        desc="test description"
        aria-describedby="describes group"
      />
    );
    expect(wrapper.find("g").prop("aria-describedby")).to.equal(
      "describes group"
    );
    expect(wrapper.find("desc").text()).to.equal("test description");
    expect(wrapper.find("desc").props().id).to.equal("describes group");
  });

  it("uses the desc prop value for descId and aria-describedby if no aria-describedby prop value", () => {
    const wrapper = shallow(
      <VictoryAccessibleGroup
        aria-label="desc node tests"
        desc="applies to both aria-describeby and descId"
      />
    );
    expect(wrapper.find("desc").text()).to.equal(
      "applies to both aria-describeby and descId"
    );
    expect(wrapper.find("g").prop("aria-describedby")).to.equal(
      "applies-to-both-aria-describeby-and-descId"
    );
    expect(wrapper.find("desc").props().id).to.equal(
      "applies-to-both-aria-describeby-and-descId"
    );
  });
});

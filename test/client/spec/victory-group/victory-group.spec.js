/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */

import React from "react";
import { mount } from "enzyme";
import { VictoryGroup } from "victory-group/src/index";
import { VictoryBar } from "victory-bar/src/index";

describe("components/victory-group", () => {
  it("has a static role", () => {
    expect(VictoryGroup.role).to.equal("group");
  });

  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryGroup>
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryGroup>
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("accepts user props", () => {
      const wrapper = mount(
        <VictoryGroup data-testid="victory-group" aria-label="Group">
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>
      );

      const svgNode = wrapper.find("svg").at(0).getDOMNode();
      expect(svgNode.getAttribute("data-testid")).to.equal("victory-group");
      expect(svgNode.getAttribute("aria-label")).to.equal("Group");
    });
  });
});

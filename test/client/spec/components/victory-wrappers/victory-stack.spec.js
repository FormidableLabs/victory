/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */

import React from "react";
import { mount } from "enzyme";
import VictoryStack from "src/components/victory-stack/victory-stack";
import VictoryBar from "src/components/victory-bar/victory-bar";

describe("components/victory-stack", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryStack>
          <VictoryBar/>
          <VictoryBar/>
        </VictoryStack>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryStack>
          <VictoryBar/>
          <VictoryBar/>
        </VictoryStack>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });
});

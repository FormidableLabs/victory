/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */

import React from "react";
import { shallow } from "enzyme";
import VictoryStack from "src/components/victory-stack/victory-stack";
import VictoryBar from "src/components/victory-bar/victory-bar";

describe("components/victory-stack", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryStack>
          <VictoryBar/>
          <VictoryBar/>
        </VictoryStack>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = shallow(
        <VictoryStack>
          <VictoryBar/>
          <VictoryBar/>
        </VictoryStack>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${VictoryStack.defaultProps.width} ${VictoryStack.defaultProps.height}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });
});

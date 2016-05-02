/*eslint-disable max-nested-callbacks,no-unused-expressions,max-len */
import React from "react";
import { shallow } from "enzyme";
import { VictoryLabel } from "victory-core";
import SliceLabel from "src/components/slice-label";

describe("components/slice-label", () => {
  describe("rendering", () => {
    it("renders a victory label with coordinates determined by the result of `props.positionFunction` called with `props.slice`", () => {
      const slice = {x: 1, y: 1};
      const positionFunction = (sli) => {
        return [sli.x - 1, sli.y + 1];
      };

      const wrapper = shallow(
        <SliceLabel
          positionFunction={positionFunction}
          slice={slice}
          datum={{}}
        />
      );

      const victoryLabel = wrapper.find(VictoryLabel);
      expect(victoryLabel).to.have.prop("x", positionFunction(slice)[0]);
      expect(victoryLabel).to.have.prop("y", positionFunction(slice)[1]);
    });
  });
});

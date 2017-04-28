/*eslint-disable max-nested-callbacks,no-unused-expressions,max-len */
import React from "react";
import { shallow } from "enzyme";
import { Slice } from "src/victory-primitives";

describe("victory-primitives/slice", () => {
  describe("rendering", () => {
    it("renders a path with attribute `d` equal to the result of `props.pathFunction` called with `props.slice`", () => {
      const EXPECTED_D_ATTR = "M1,1";
      const slice = { x: 1, y: 1 };
      const pathFunction = (sli) => {
        expect(sli, "The path function is called with `props.slice`").to.eql(slice);

        return EXPECTED_D_ATTR;
      };

      const wrapper = shallow(
        <Slice
          pathFunction={pathFunction}
          slice={slice}
        />
      );

      expect(wrapper.html()).to.eql(`<path d="${EXPECTED_D_ATTR}" role="presentation" shape-rendering="auto"></path>` // eslint-disable-line max-len
      );
    });
  });
});

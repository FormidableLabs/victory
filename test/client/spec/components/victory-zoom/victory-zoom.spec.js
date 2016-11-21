/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow } from "enzyme";
import VictoryZoom from "src/components/victory-zoom/victory-zoom";
import VictoryChart from "src/components/victory-chart/victory-chart";

describe("components/victory-zoom", () => {
  describe("allowZoom property", () => {
    it("should allow or disallow zooming on the chart", () => {
      const wrapper = shallow(
        <VictoryZoom>
          <VictoryChart />
        </VictoryZoom>
      );
      const getHandlersList = (chart) => Object.keys(chart.props().events[0].eventHandlers);

      const zoomableChart = wrapper.find(VictoryChart);
      expect(getHandlersList(zoomableChart).indexOf("onWheel") !== -1).to.equal(true);

      wrapper.setProps({allowZoom: false});
      const nonZoomableChart = wrapper.find(VictoryChart);
      expect(getHandlersList(nonZoomableChart).indexOf("onWheel") === -1).to.equal(true);
    });
  });
});

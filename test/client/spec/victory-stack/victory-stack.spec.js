/**
 * Client tests
 */
/* global sinon:false, console */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */

import React from "react";
import { mount } from "enzyme";
import { VictoryStack } from "victory-stack";
import { VictoryBar } from "victory-bar";
import { VictoryHistogram } from "victory-histogram";

describe("components/victory-stack", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryStack>
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryStack>
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("accepts user props", () => {
      const wrapper = mount(
        <VictoryStack data-testid="victory-stack" aria-label="Stack">
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>
      );

      const svgNode = wrapper.find("svg").at(0).getDOMNode();
      expect(svgNode.getAttribute("data-testid")).to.equal("victory-stack");
      expect(svgNode.getAttribute("aria-label")).to.equal("Stack");
    });
  });

  describe("warnings", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(console, "warn");
    });

    afterEach(() => {
      console.warn.restore();
      sandbox.reset();
    });

    it("should warn when histogram children are mixed with non-histogram children", () => {
      mount(
        <VictoryStack>
          <VictoryHistogram />
          <VictoryBar />
        </VictoryStack>
      );

      expect(console.warn.callCount).to.equal(1);
    });

    it("should not warn when only histogram children are passed", () => {
      mount(
        <VictoryStack>
          <VictoryHistogram />
          <VictoryHistogram />
        </VictoryStack>
      );

      expect(console.warn.callCount).to.equal(0);
    });
  });
});

/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import DomainHelpers from "src/components/victory-chart/domain-helpers";
import { VictoryLine } from "src/index";
import Domain from "src/helpers/domain";

describe("domain-helpers", () => {
  describe("getDomain", () => {
    const lineProps = {domain: [0, 3]};
    const victoryLine = React.createElement(VictoryLine, lineProps);
    const orientations = {x: "bottom", y: "left"};
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(DomainHelpers, "orientDomain");
      sandbox.spy(Domain, "padDomain");
      sandbox.spy(victoryLine.type, "getDomain");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("calculates a domain from props", () => {
      const props = {domain: {x: [1, 2], y: [2, 3]}};
      const domainResultX = DomainHelpers.getDomain(props, [victoryLine], orientations, "x");
      expect(Domain.padDomain).calledWith([1, 2], props, "x").and.returned([1, 2]);
      expect(DomainHelpers.orientDomain).calledWith([1, 2], orientations, "x")
        .and.returned([1, 2]);
      expect(victoryLine.type.getDomain).notCalled;
      expect(domainResultX).to.eql([1, 2]);
    });

    it("calculates a domain child components", () => {
      const props = {};
      const domainResultX = DomainHelpers.getDomain(props, [victoryLine], orientations, "x");
      expect(victoryLine.type.getDomain).calledWith(victoryLine.props, "x");
      expect(Domain.padDomain).calledWith(victoryLine.props.domain, props, "x")
        .and.returned(victoryLine.props.domain);
      expect(DomainHelpers.orientDomain).calledWith(victoryLine.props.domain, orientations, "x")
        .and.returned(victoryLine.props.domain);
      expect(domainResultX).to.eql(victoryLine.props.domain);
    });
  });

  describe("orientDomain", () => {
    const domain = [0, 10];
    const reversedDomain = [10, 0];
    it("returns a domain for standard orientations", () => {
      const orientations = {x: "bottom", y: "left"};
      const domainResult = DomainHelpers.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(domain);
    });

    it("reverses a domain for non-standard orientations", () => {
      const orientations = {x: "top", y: "right"};
      const domainResult = DomainHelpers.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(reversedDomain);
    });

    it("reverses a domain for flipped axes", () => {
      const orientations = {x: "right", y: "bottom"};
      const domainResult = DomainHelpers.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(reversedDomain);
    });
  });
});

/* eslint no-unused-expressions: 0 */
/* global sinon */
import { getDomain, getScale, getAxis } from "src/components/victory-axis/helper-methods";
import { Helpers, Domain, Scale } from "victory-core";

describe("victory-axis/helper-methods", () => {
  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromTickValues");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("determines a domain from props", () => {
      const props = { domain: [1, 2] };
      const domainResult = getDomain(props);
      expect(Domain.getDomainFromTickValues).notCalled;
      expect(domainResult).to.eql([1, 2]);
    });

    it("calculates a domain from tickValues", () => {
      const props = { tickValues: [1, 2, 3, 4] };
      const domainResult = getDomain(props);
      expect(Domain.getDomainFromTickValues).calledWith(props)
        .and.returned([1, 4]);
      expect(domainResult).to.eql([1, 4]);
    });

    it("does not calculate a domain from too few tick values", () => {
      const props = { tickValues: [0] };
      const domainResult = getDomain(props);
      expect(Domain.getDomainFromTickValues).not.called;
      expect(domainResult).to.equal(undefined);
    });

    it("returns undefined if the given axis doesn't match this axis", () => {
      const props = { domain: [1, 3] };
      const domainResultX = getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = getDomain(props, "y");
      expect(domainResultY).to.be.undefined;
    });
  });

  describe("getAxis", () => {
    it("determines the axis based on orientation prop", () => {
      expect(getAxis({ orientation: "top" })).to.equal("x");
      expect(getAxis({ orientation: "bottom" })).to.equal("x");
      expect(getAxis({ orientation: "left" })).to.equal("y");
      expect(getAxis({ orientation: "right" })).to.equal("y");
    });

    it("determines the axis based on type (dependent / independent)", () => {
      expect(getAxis({ dependentAxis: true })).to.equal("y");
      expect(getAxis({})).to.equal("x");
    });

    it("determines the axis based on type when flipped", () => {
      expect(getAxis({ dependentAxis: true }, true)).to.equal("x");
      expect(getAxis({}, true)).to.equal("y");
    });
  });

  describe("getScale", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Scale, "getBaseScale");
      const fakeGetRange = () => [0, 100];
      sandbox.stub(Helpers, "getRange", fakeGetRange);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a scale", () => {
      const props = { domain: [0, 10] };
      const scaleResult = getScale(props);
      expect(Scale.getBaseScale).calledWith(props, "x");
      expect(Helpers.getRange).calledWith(props, "x").and.returned([0, 100]);
      expect(scaleResult.domain()).to.eql([0, 10]);
      expect(scaleResult.range()).to.eql([0, 100]);
    });
  });
});

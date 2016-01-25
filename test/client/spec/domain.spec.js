/* eslint no-unused-expressions: 0 */
/* global sinon */

import Domain from "src/domain";
import Data from "src/data";

describe("domain", () => {
  describe("padDomain", () => {
    const baseProps = {width: 100, height: 100, padding: 0};
    it("returns the domain when no domain padding is specified", () => {
      const domain = [0, 1];
      const paddedDomain = Domain.padDomain(domain, baseProps, "x");
      expect(paddedDomain).to.eql(domain);
    });

    it("pads the domain a particular number of pixels", () => {
      const domain = [0, 100];
      const domainPadding = {x: 10};
      const props = {...baseProps, domainPadding};
      const paddedDomain = Domain.padDomain(domain, props, "x");
      expect(paddedDomain).to.eql([0, 110]);
    });
  });

  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromProps");
      sandbox.spy(Domain, "getDomainFromData");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("gets the domain from props if they exist", () => {
      const props = {domain: [1, 2]};
      const resultDomain = Domain.getDomain(props, "x");
      expect(Domain.getDomainFromProps).calledWith(props, "x").and.returned(props.domain);
      expect(Domain.getDomainFromData).not.called;
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from data if props don't exist for a particular axis", () => {
      const props = {x: "x", y: "y", domain: {y: [1, 2]}, data: [{x: 1, y: 3}, {x: 3, y: 5}]};
      const resultDomain = Domain.getDomain(props, "x");
      const dataset = Data.getData(props);
      expect(Domain.getDomainFromProps).calledWith(props, "x").and.returned(undefined);
      expect(Domain.getDomainFromData).calledWith(dataset, "x").and.returned([1, 3]);
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getDomainFromProps", () => {
    it("gets the domain from a domain array", () => {
      const props = {domain: [1, 2]};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from a domain object", () => {
      const props = {domain: {x: [1, 2]}};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain.x);
    });

    it("returns undefined if the domain props is not given", () => {
      expect(Domain.getDomainFromProps({}, "x")).to.eql(undefined);
    });

    it("returns undefined if the domain for a given axis is not defined", () => {
      const props = {domain: {y: [1, 2]}};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(undefined);
    });
  });

  describe("getDomainFromData", () => {
    it("returns a domain from a dataset", () => {
      const dataset = [{x: 1, y: 3}, {x: 3, y: 5}];
      const resultDomain = Domain.getDomainFromData(dataset, "x");
      expect(resultDomain).to.eql([1, 3]);
    });
  });
});

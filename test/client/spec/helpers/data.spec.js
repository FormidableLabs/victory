/* eslint no-unused-expressions: 0 */
/* global sinon */

import Data from "src/helpers/data";
import { Helpers } from "victory-core";

describe("helpers/data", () => {
  describe("createStringMap", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "getStringsFromAxes");
      sandbox.spy(Data, "getStringsFromCategories");
      sandbox.spy(Helpers, "getStringsFromData");
    });
    afterEach(() => {
      sandbox.restore();
    });

    const tickValues = ["one", "two", "three"];
    const categories = ["red", "green", "blue"];
    const data = [{x: "one", y: 1}, {x: "red", y: 2}, {x: "cat", y: 3}];
    it("returns a string map from strings in tickValues", () => {
      const props = {tickValues};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromAxes).calledWith(props, "x");
      expect(Data.getStringsFromAxes).to.have.returned(["one", "two", "three"]);
      expect(stringMap).to.eql({ one: 1, two: 2, three: 3 });
    });

    it("returns a string map from strings in categories", () => {
      const props = {categories};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromCategories).calledWith(props, "x");
      expect(Data.getStringsFromCategories).to.have.returned(["red", "green", "blue"]);
      expect(stringMap).to.eql({ red: 1, green: 2, blue: 3 });
    });

    it("returns a string map from strings in data", () => {
      const props = {data};
      const stringMap = Data.createStringMap(props, "x");
      expect(Helpers.getStringsFromData).calledWith(props, "x");
      expect(Helpers.getStringsFromData).to.have.returned(["one", "red", "cat"]);
      expect(stringMap).to.eql({ one: 1, red: 2, cat: 3 });
    });

    it("a unique set of values is returned from multiple sources", () => {
      const props = {tickValues, data};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromAxes).to.have.returned(["one", "two", "three"]);
      expect(Helpers.getStringsFromData).to.have.returned(["one", "red", "cat"]);
      expect(stringMap).to.eql({ one: 1, two: 2, three: 3, red: 4, cat: 5 });
    });
  });


  describe("getStringsFromAxes", () => {
    it("returns an array of strings when tickValues is an array", () => {
      const props = {tickValues: [1, "three", 5]};
      expect(Data.getStringsFromAxes(props, "x")).to.eql(["three"]);
    });

    it("returns an array of strings when tickValues is an object", () => {
      const props = {tickValues: { x: [1, "three", 5] }};
      expect(Data.getStringsFromAxes(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when a given axis is not defined", () => {
      const props = {tickValues: { y: [1, "three", 5] }};
      expect(Data.getStringsFromAxes(props, "x")).to.eql([]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {tickValues: [1, 3, 5]};
      expect(Data.getStringsFromAxes(props, "x")).to.eql([]);
    });

    it("returns an empty array when the tickValues prop is undefined", () => {
      expect(Data.getStringsFromAxes({}, "x")).to.eql([]);
    });
  });

  describe("getStringsFromCategories", () => {
    it("returns an empty array when no strings are present", () => {
      const props = {categories: [1, 3, 5]};
      expect(Data.getStringsFromCategories(props, "x")).to.eql([]);
    });

    it("returns an empty array when the category prop is undefined", () => {
      expect(Data.getStringsFromCategories({}, "x")).to.eql([]);
    });
  });

  describe("formatData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "cleanData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("formats a single dataset", () => {
      const dataset = [{x: 1, y: 3}, {x: 2, y: 5}];
      const props = {};
      const formatted = Data.formatData(dataset, props);
      expect(Data.cleanData).called.and.returned(dataset);
      expect(formatted).to.be.an.array;
      expect(formatted[0]).to.have.keys(["x", "y"]);
    });
  });

  describe("getData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "formatData");
      sandbox.spy(Data, "generateData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("formats and returns the data prop", () => {
      const data = [{x: "kittens", y: 3}, {x: "cats", y: 5}];
      const props = {data, x: "x", y: "y"};
      const expectedReturn = [{x: 1, xName: "kittens", y: 3}, {x: 2, xName: "cats", y: 5}];
      const returnData = Data.getData(props);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });

    it("generates a dataset from domain", () => {
      const expectedReturn = [{x: 0, y: 0}, {x: 10, y: 10}];
      const props = {x: "x", y: "y", domain: {x: [0, 10], y: [0, 10]}};
      const returnData = Data.getData(props);
      expect(Data.generateData).calledOnce.and.returned(expectedReturn);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });

    it("generates a dataset from domain and samples", () => {
      const expectedReturn = [{x: 0, y: 0}, {x: 5, y: 5}, {x: 10, y: 10}];
      const props = {x: "x", y: "y", domain: {x: [0, 10], y: [0, 10]}, samples: 2};
      const returnData = Data.getData(props);
      expect(Data.generateData).calledOnce.and.returned(expectedReturn);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });
  });
});

/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */

import { LabelHelpers, VictoryLabel } from "packages/victory-core/src/index";
import { assign } from "lodash";
import React from "react";
import * as d3Scale from "d3-scale";

const scale = { x: d3Scale.scaleLinear(), y: d3Scale.scaleLinear() };
const data = [{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }];
const labelComponent = <VictoryLabel />;
const style = { labels: { fontSize: 8 } };

const basicProps = { scale, data, labelComponent, style };

describe("victory-util/label-helpers", () => {
  describe("getProps", () => {
    it("returns the correct positions given a set of props an and index", () => {
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(basicProps, index);
        expect(labelProps.x).to.equal(datum.x);
        expect(labelProps.y).to.equal(datum.y);
      });
    });
    it("returns the correct label text from a labels array", () => {
      const labels = ["one", "two"];
      const props = assign({ labels }, basicProps);
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.text).to.equal(labels[index]);
      });
    });
    it("returns the correct label text from datum", () => {
      const dataWithLabels = [{ x: 0, y: 0, label: "one" }, { x: 0.5, y: 0.5, label: "two" }];
      const props = assign({}, basicProps, { data: dataWithLabels });
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.text).to.equal(dataWithLabels[index].label);
      });
    });
    it("returns the correct positions for polar labels", () => {
      const polarScale = {
        x: d3Scale.scaleLinear().range([0, Math.PI * 2]),
        y: d3Scale.scaleLinear()
      };
      data.forEach((datum, index) => {
        const props = assign({}, basicProps, { scale: polarScale, polar: true });
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.x).to.equal(datum.y * Math.cos(datum.x * Math.PI * 2));
        expect(labelProps.y).to.equal(-datum.y * Math.sin(datum.x * Math.PI * 2));
      });
    });
  });

  describe("getPolarAngle", () => {
    it("returns zero when labelPlacement is vertical", () => {
      const angle = LabelHelpers.getPolarAngle({ labelPlacement: "vertical" });
      expect(angle).to.equal(0);
    });
    it("returns angles corresponding to perpendicular labelPlacement", () => {
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 15)).to.equal(75);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 45)).to.equal(45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 90)).to.equal(0);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 135)).to.equal(-45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 180)).to.equal(90);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 225)).to.equal(45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 270)).to.equal(0);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 315)).to.equal(-45);
    });
    it("returns angles corresponding to parallel labelPlacement", () => {
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 15)).to.equal(-15);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 45)).to.equal(-45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 90)).to.equal(-90);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 135)).to.equal(45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 180)).to.equal(0);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 225)).to.equal(-45);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 270)).to.equal(-90);
      expect(LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 315)).to.equal(45);
    });
  });
});

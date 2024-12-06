/* eslint max-nested-callbacks: 0 */
import React from "react";
import * as d3Scale from "d3-scale";

import * as LabelHelpers from "./label-helpers";
import { VictoryLabel } from "../victory-label/victory-label";

const scale = { x: d3Scale.scaleLinear(), y: d3Scale.scaleLinear() };
const data = [
  { x: 0, y: 0 },
  { x: 0.5, y: 0.5 },
];
const labelComponent = <VictoryLabel />;
const style = { labels: { fontSize: 8 } };

const basicProps = { scale, data, labelComponent, style };

describe("victory-util/label-helpers", () => {
  describe("getProps", () => {
    it("returns the correct positions given a set of props an and index", () => {
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(basicProps, index);
        expect(labelProps.x).toEqual(datum.x);
        expect(labelProps.y).toEqual(datum.y);
      });
    });
    it("returns the correct label text from a labels array", () => {
      const labels = ["one", "two"];
      const props = Object.assign({ labels }, basicProps);
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.text).toEqual(labels[index]);
      });
    });
    it("returns the correct label text from datum", () => {
      const dataWithLabels = [
        { x: 0, y: 0, label: "one" },
        { x: 0.5, y: 0.5, label: "two" },
      ];
      const props = Object.assign({}, basicProps, { data: dataWithLabels });
      data.forEach((datum, index) => {
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.text).toEqual(dataWithLabels[index].label);
      });
    });
    it("returns the correct positions for polar labels", () => {
      const polarScale = {
        x: d3Scale.scaleLinear().range([0, Math.PI * 2]),
        y: d3Scale.scaleLinear(),
      };
      data.forEach((datum, index) => {
        const props = Object.assign({}, basicProps, {
          scale: polarScale,
          polar: true,
        });
        const labelProps = LabelHelpers.getProps(props, index);
        expect(labelProps.x).toEqual(datum.y * Math.cos(datum.x * Math.PI * 2));
        // We need Math.abs here because 0 does not equal -0 :(
        expect(Math.abs(labelProps.y)).toEqual(
          Math.abs(-datum.y * Math.sin(datum.x * Math.PI * 2)),
        );
      });
    });
  });

  describe("getPolarAngle", () => {
    it("returns zero when labelPlacement is vertical", () => {
      const angle = LabelHelpers.getPolarAngle({ labelPlacement: "vertical" });
      expect(angle).toEqual(0);
    });
    it("returns angles corresponding to perpendicular labelPlacement", () => {
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 15),
      ).toEqual(75);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 45),
      ).toEqual(45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 90),
      ).toEqual(0);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 135),
      ).toEqual(-45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 180),
      ).toEqual(90);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 225),
      ).toEqual(45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 270),
      ).toEqual(0);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "perpendicular" }, 315),
      ).toEqual(-45);
    });
    it("returns angles corresponding to parallel labelPlacement", () => {
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 15),
      ).toEqual(-15);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 45),
      ).toEqual(-45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 90),
      ).toEqual(-90);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 135),
      ).toEqual(45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 180),
      ).toEqual(0);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 225),
      ).toEqual(-45);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 270),
      ).toEqual(-90);
      expect(
        LabelHelpers.getPolarAngle({ labelPlacement: "parallel" }, 315),
      ).toEqual(45);
    });
  });
});

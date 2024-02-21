import * as TextSize from "./textsize";

const approximate = (text, style?) =>
  TextSize._approximateTextSizeInternal.impl(text, style, true);

const testString = "ABC";

describe("victory-util/textsize", () => {
  describe("convertLengthToPixels", () => {
    it("translate pixels as number of pixels", () => {
      expect(TextSize.convertLengthToPixels("20px")).toEqual(20);
    });
    it("translate absolute measurement length units to particular number of pixels", () => {
      expect(TextSize.convertLengthToPixels("10pt")).toEqual(13.3);
    });
    it("translate relative measurement length units to particular number of pixels", () => {
      expect(TextSize.convertLengthToPixels("1.5em", 16)).toEqual(24);
    });
  });

  describe("approximateWidth", () => {
    it("return zero width when no style", () => {
      expect(approximate(testString).width).toEqual(0);
    });
    it("return correct width with signed angle", () => {
      expect(
        approximate(testString, {
          angle: -45,
          fontSize: 14,
        }).width.toFixed(2),
      ).toEqual("31.71");
    });
    it("return correct width with pixel fontsize", () => {
      expect(
        approximate(testString, {
          fontSize: "14px",
        }).width.toFixed(2),
      ).toEqual("28.74");
    });
    it("return appropriate width with defined fontSize", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
        }).width.toFixed(2),
      ).toEqual("24.64");
    });
    it("consider font", () => {
      expect(
        approximate(testString, {
          fontSize: 16,
        }).width.toFixed(2),
      ).toEqual("32.85");
    });
    it("consider letterSpacing", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          letterSpacing: "1px",
        }).width.toFixed(2),
      ).toEqual("26.64");
    });
    it("consider angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          angle: 30,
        }).width.toFixed(2),
      ).toEqual("28.24");
    });
    it("not consider lineHeight without angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          lineHeight: 2,
        }).width.toFixed(2),
      ).toEqual("24.64");
    });
    it("consider lineHeight with angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          lineHeight: 2,
          angle: 30,
        }).width.toFixed(2),
      ).toEqual("35.14");
    });
    it("return width of widest string in text", () => {
      expect(
        approximate("ABC\nDEFGH\nIJK", {
          fontSize: 12,
        }).width.toFixed(2),
      ).toEqual("41.94");
    });

    it("returns width of widest string in array if array has an empty string", () => {
      expect(
        approximate(["06-14-20", ""], {
          fontSize: 12,
        }).width.toFixed(2),
      ).toEqual("47.93");
    });
  });

  describe("approximateHeight", () => {
    it("return zero width when no style", () => {
      expect(approximate(testString).height).toEqual(0);
    });
    it("return correct height with signed angle", () => {
      expect(
        approximate(testString, {
          angle: -45,
          fontSize: 14,
        }).height.toFixed(2),
      ).toEqual("33.29");
    });
    it("return correct height with pixel fontsize", () => {
      expect(
        approximate(testString, {
          fontSize: "14px",
        }).height.toFixed(2),
      ).toEqual("16.90");
    });
    it("return appropriate height with expected precision", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
        }).height.toFixed(2),
      ).toEqual("14.49");
    });
    it("consider font", () => {
      expect(
        approximate(testString, {
          fontSize: 16,
        }).height.toFixed(2),
      ).toEqual("19.32");
    });
    it("consider angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          angle: 30,
        }).height.toFixed(2),
      ).toEqual("25.48");
    });
    it("not consider letterSpacing without angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          letterSpacing: "1px",
        }).height.toFixed(2),
      ).toEqual("14.49");
    });
    it("consider letterSpacing with angle", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          angle: 30,
          letterSpacing: "1px",
        }).height.toFixed(2),
      ).toEqual("26.53");
    });
    it("consider lineHeight", () => {
      expect(
        approximate(testString, {
          fontSize: 12,
          lineHeight: 2,
        }).height.toFixed(2),
      ).toEqual("28.98");
    });
    it("consider multiLines text", () => {
      expect(
        approximate(`ABC\n${"DBCDEFG"}\n123`, {
          fontSize: 12,
        }).height.toFixed(2),
      ).toEqual("43.47");
    });
  });
});

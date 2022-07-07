import { TextSize } from "victory-core";

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
      expect(TextSize.approximateTextSize(testString, undefined, true).width).toEqual(0);
    });
    it("return correct width with signed angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          angle: -45,
          fontSize: 14,
        }, true).width.toFixed(2),
      ).toEqual("31.71");
    });
    it("return correct width with pixel fontsize", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: "14px",
        }, true).width.toFixed(2),  
      ).toEqual("28.74");
    });
    it("return appropriate width with defined fontSize", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
        }, true).width.toFixed(2),
      ).toEqual("24.64");
    });
    it("consider font", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 16,
        }, true).width.toFixed(2),
      ).toEqual("32.85");
    });
    it("consider letterSpacing", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          letterSpacing: "1px",
        }, true).width.toFixed(2),
      ).toEqual("26.64");
    });
    it("consider angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          angle: 30,
        }, true).width.toFixed(2),
      ).toEqual("28.24");
    });
    it("not consider lineHeight without angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          lineHeight: 2,
        }, true).width.toFixed(2),
      ).toEqual("24.64");
    });
    it("consider lineHeight with angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          lineHeight: 2,
          angle: 30,
        }, true).width.toFixed(2),
      ).toEqual("35.14");
    });
    it("return width of widest string in text", () => {
      expect(
        TextSize.approximateTextSize("ABC\nDEFGH\nIJK", {
          fontSize: 12,
        }, true).width.toFixed(2),
      ).toEqual("41.94");
    });

    it("returns width of widest string in array if array has an empty string", () => {
      expect(
        TextSize.approximateTextSize(["06-14-20", ""], {
          fontSize: 12,
        }, true).width.toFixed(2),
      ).toEqual("47.93");
    });
  });

  describe("approximateHeight", () => {
    it("return zero width when no style", () => {
      expect(TextSize.approximateTextSize(testString, undefined, true).height).toEqual(0);
    });
    it("return correct height with signed angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          angle: -45,
          fontSize: 14,
        }, true).height.toFixed(2),
      ).toEqual("33.29");
    });
    it("return correct height with pixel fontsize", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: "14px",
        }, true).height.toFixed(2),
      ).toEqual("16.90");
    });
    it("return appropriate height with expected precision", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
        }, true).height.toFixed(2),
      ).toEqual("14.49");
    });
    it("consider font", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 16,
        }, true).height.toFixed(2),
      ).toEqual("19.32");
    });
    it("consider angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          angle: 30,
        }, true).height.toFixed(2),
      ).toEqual("25.48");
    });
    it("not consider letterSpacing without angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          letterSpacing: "1px",
        }, true).height.toFixed(2),
      ).toEqual("14.49");
    });
    it("consider letterSpacing with angle", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          angle: 30,
          letterSpacing: "1px",
        }, true).height.toFixed(2),
      ).toEqual("26.53");
    });
    it("consider lineHeight", () => {
      expect(
        TextSize.approximateTextSize(testString, {
          fontSize: 12,
          lineHeight: 2,
        }, true).height.toFixed(2),
      ).toEqual("28.98");
    });
    it("consider multiLines text", () => {
      expect(
        TextSize.approximateTextSize(`ABC\n${"DBCDEFG"}\n123`, {
          fontSize: 12,
        }, true).height.toFixed(2),
      ).toEqual("43.47");
    });
  });

  describe("dom measurement", () => {
    const createSpy = jest.spyOn(document, "createElement");

    it('should append and remove a div to the body', () => {
      TextSize.approximateTextSize(testString, {
        fontSize: 12,
        lineHeight: 2,
      });

      expect(createSpy).toHaveBeenCalled();
    });
  });
});

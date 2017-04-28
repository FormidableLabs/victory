/* eslint no-unused-expressions: 0 */

import { TextSize } from "src/index";
describe("helpers/textsize", () => {
  describe("convertLengthToPixels", () => {
    it("translate pixels as number of pixels", () => {
      expect(TextSize.convertLengthToPixels("20px")).to.eql(20);
    });
    it("translate absolute measurement length units to particular number of pixels", () => {
      expect(TextSize.convertLengthToPixels("10pt")).to.eql(13.3);
    });
    it("translate relative measurement length units to particular number of pixels", () => {
      expect(TextSize.convertLengthToPixels("1.5em", 16)).to.eql(24);
    });
  });

  describe("approximateWidth", () => {
    it("return zero width when no style", () => {
      expect(TextSize.approximateTextSize("abc").width).to.eql(0);
    });
    it("return correct width with signed angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { angle: -45, fontSize: 14 }).width.toFixed(2)
      ).to.be.eql("31.36");
    });
    it("return correct width with pixel fontsize", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: "14px" }).width.toFixed(2)
      ).to.be.eql("24.22");
    });
    it("return appropriate width with defined fontSize", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12 }).width.toFixed(2)
      ).to.be.eql("20.76");
    });
    it("consider font", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 16 }).width.toFixed(2)
      ).to.be.eql("27.68");
    });
    it("consider letterSpacing", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, letterSpacing: "1px" }).width.toFixed(2)
      ).to.be.eql("23.26");
    });
    it("consider angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, angle: 30 }).width.toFixed(2)
      ).to.be.eql("26.60");
    });
    it("not consider lineHeight without angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, lineHeight: 2 }).width.toFixed(2)
      ).to.eql("20.76");
    });
    it("consider lineHeight with angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, lineHeight: 2, angle: 30 }
		).width.toFixed(2)
      ).to.eql("35.23");
    });
    it("return width of widest string in text", () => {
      expect(
        TextSize.approximateTextSize("abc\ndefgh\nijk", { fontSize: 12 }).width.toFixed(2)
      ).to.eql("34.60");
    });
  });

  describe("approximateHeight", () => {
    it("return zero width when no style", () => {
      expect(TextSize.approximateTextSize("abc").height).to.eql(0);
    });
    it("return correct height with signed angle", () => {
      expect(
        TextSize.approximateTextSize("abc",
          { angle: -45, fontSize: 14 }).height.toFixed(2)
      ).to.be.eql("26.34");
    });
    it("return correct height with pixel fontsize", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: "14px" }).height.toFixed(2)
      ).to.be.eql("16.90");
    });
    it("return appropriate height with expected precision", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12 }).height.toFixed(2)
      ).to.be.eql("14.49");
    });
    it("consider font", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 16 }).height.toFixed(2)
      ).to.be.eql("19.32");
    });
    it("consider angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, angle: 30 }).height.toFixed(2)
      ).to.be.eql("21.27");
    });
    it("not consider letterSpacing without angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, letterSpacing: "1px" })
          .height.toFixed(2)
      ).to.eql("14.49");
    });
    it("consider letterSpacing with angle", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, angle: 30, letterSpacing: "1px" })
          .height.toFixed(2)
      ).to.be.eql("22.32");
    });
    it("consider lineHeight", () => {
      expect(
        TextSize.approximateTextSize("abc", { fontSize: 12, lineHeight: 2 }).height.toFixed(2)
      ).to.be.eql("28.98");
    });
    it("consider multiLines text", () => {
      expect(
        TextSize.approximateTextSize(`abc\n${"dbcdefg"}\n123`, { fontSize: 12 }).height.toFixed(2)
      ).to.be.eql("48.51");
    });
  });
});

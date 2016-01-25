import Chart from "src/chart";
describe("chart", () => {
  describe("evaluateProp", () => {
    const data = {x: 3, y: 2};
    it("evaluates functional props", () => {
      const testProp = (datum) => datum.y > 0 ? "red" : "blue";
      expect(Chart.evaluateProp(testProp, data)).to.equal("red");
    });
    it("doesn't alter non-functional props", () => {
      const testProp = "blue";
      expect(Chart.evaluateProp(testProp, data)).to.equal("blue");
    });
  });

  describe("evaluateStyle", () => {
    const data = {x: 3, y: 2};
    it("evaluates functional styles, without altering others", () => {
      const style = {
        color: (datum) => datum.y > 0 ? "red" : "blue",
        size: 5
      };
      expect(Chart.evaluateStyle(style, data)).to.deep.equal({color: "red", size: 5});
    });
  });

  describe("getRange", () => {
    const props = {
      width: 100,
      height: 200,
      padding: 0
    };
    it("returns a range based on props and axis", () => {
      expect(Chart.getRange(props, "x")).to.be.an("array")
        .and.to.have.length(2)
        .and.to.include.members([0, 100]);
      expect(Chart.getRange(props, "y")).to.be.an("array")
        .and.to.have.length(2)
        .and.to.include.members([0, 200]);
    });
  });

  describe("getStyles", () => {
    const defaultStyles = {
      parent: {border: "black"},
      data: {fill: "blue", stroke: "black"},
      labels: {fontSize: 10, fontFamily: "Helvetica"}
    };
    it("merges styles", () => {
      const style = {data: {fill: "red"}, labels: {fontSize: 12}};
      const props = {style, width: 500, height: 500};
      const styles = Chart.getStyles(props, defaultStyles);
      expect(styles.parent).to.deep.equal({border: "black", width: 500, height: 500});
      expect(styles.data).to.deep.equal({fill: "red", stroke: "black"});
      expect(styles.labels).to.deep.equal({fontSize: 12, fontFamily: "Helvetica"});
    });

    it("does not include invisible styles", () => {
      const style = {data: {fill: "red", stroke: "transparent"}, labels: {fontSize: 12}};
      const props = {style, width: 500, height: 500};
      const styles = Chart.getStyles(props, defaultStyles);
      expect(styles.parent).to.deep.equal({border: "black", width: 500, height: 500});
      expect(styles.data).to.deep.equal({fill: "red"});
      expect(styles.labels).to.deep.equal({fontSize: 12, fontFamily: "Helvetica"});
    });
  });

  describe("getPadding", () => {
    it("sets padding from a single number", () => {
      const props = {padding: 40};
      expect(Chart.getPadding(props)).to.deep.equal({top: 40, bottom: 40, left: 40, right: 40});
    });
    it("sets padding from a complete object", () => {
      const props = {
        padding: {top: 20, bottom: 40, left: 60, right: 80}
      };
      expect(Chart.getPadding(props)).to.deep.equal(props.padding);
    });
    it("fills missing values with 0", () => {
      const props = {
        padding: {top: 40, bottom: 40}
      };
      expect(Chart.getPadding(props)).to.deep.equal({top: 40, bottom: 40, left: 0, right: 0});
    });
  });
});

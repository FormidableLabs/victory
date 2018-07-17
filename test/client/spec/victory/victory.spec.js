/**
 * Client tests
 */
import * as Victory from "packages/victory/src/index";

describe("victory", () => { // eslint-disable-line max-statements
  describe("exports victory components", () => { // eslint-disable-line max-statements
    it("exports VictoryAnimation", () => {
      expect(Victory.VictoryAnimation).not.to.equal(undefined);
    });
    it("exports VictoryArea", () => {
      expect(Victory.VictoryArea).not.to.equal(undefined);
    });
    it("exports VictoryAxis", () => {
      expect(Victory.VictoryAxis).not.to.equal(undefined);
    });
    it("exports VictoryBar", () => {
      expect(Victory.VictoryBar).not.to.equal(undefined);
    });
    it("exports VictoryBoxPlot", () => {
      expect(Victory.VictoryBoxPlot).not.to.equal(undefined);
    });
    it("exports VictoryBrushContainer", () => {
      expect(Victory.VictoryBrushContainer).not.to.equal(undefined);
    });
    it("exports VictoryBrushLine", () => {
      expect(Victory.VictoryBrushLine).not.to.equal(undefined);
    });
    it("exports VictoryCandlestick", () => {
      expect(Victory.VictoryCandlestick).not.to.equal(undefined);
    });
    it("exports VictoryChart", () => {
      expect(Victory.VictoryChart).not.to.equal(undefined);
    });
    it("exports VictoryClipContainer", () => {
      expect(Victory.VictoryClipContainer).not.to.equal(undefined);
    });
    it("exports VictoryContainer", () => {
      expect(Victory.VictoryContainer).not.to.equal(undefined);
    });
    it("exports VictoryCursorContainer", () => {
      expect(Victory.VictoryCursorContainer).not.to.equal(undefined);
    });
    it("exports VictoryErrorBar", () => {
      expect(Victory.VictoryErrorBar).not.to.equal(undefined);
    });
    it("exports VictoryGroup", () => {
      expect(Victory.VictoryGroup).not.to.equal(undefined);
    });
    it("exports VictoryLabel", () => {
      expect(Victory.VictoryLabel).not.to.equal(undefined);
    });
    it("exports VictoryLegend", () => {
      expect(Victory.VictoryLegend).not.to.equal(undefined);
    });
    it("exports VictoryLine", () => {
      expect(Victory.VictoryLine).not.to.equal(undefined);
    });
    it("exports VictoryPie", () => {
      expect(Victory.VictoryPie).not.to.equal(undefined);
    });
    it("exports VictoryPolarAxis", () => {
      expect(Victory.VictoryPolarAxis).not.to.equal(undefined);
    });
    it("exports VictoryPortal", () => {
      expect(Victory.VictoryPortal).not.to.equal(undefined);
    });
    it("exports VictoryScatter", () => {
      expect(Victory.VictoryScatter).not.to.equal(undefined);
    });
    it("exports VictorySelectionContainer", () => {
      expect(Victory.VictorySelectionContainer).not.to.equal(undefined);
    });
    it("exports VictorySharedEvents", () => {
      expect(Victory.VictorySharedEvents).not.to.equal(undefined);
    });
    it("exports VictoryStack", () => {
      expect(Victory.VictoryStack).not.to.equal(undefined);
    });
    it("exports VictoryTheme", () => {
      expect(Victory.VictoryTheme).not.to.equal(undefined);
    });
    it("exports VictoryTransition", () => {
      expect(Victory.VictoryTransition).not.to.equal(undefined);
    });
    it("exports VictoryTooltip", () => {
      expect(Victory.VictoryTooltip).not.to.equal(undefined);
    });
    it("exports VictoryVoronoi", () => {
      expect(Victory.VictoryVoronoi).not.to.equal(undefined);
    });
    it("exports VictoryVoronoiContainer", () => {
      expect(Victory.VictoryVoronoiContainer).not.to.equal(undefined);
    });
    it("exports VictoryZoomContainer", () => {
      expect(Victory.VictoryZoomContainer).not.to.equal(undefined);
    });
  });
  describe("exports primitive components", () => { // eslint-disable-line max-statements
    it("exports Area", () => {
      expect(Victory.Area).not.to.equal(undefined);
    });
    it("exports Bar", () => {
      expect(Victory.Bar).not.to.equal(undefined);
    });
    it("exports Border", () => {
      expect(Victory.Border).not.to.equal(undefined);
    });
    it("exports Candle", () => {
      expect(Victory.Candle).not.to.equal(undefined);
    });
    it("exports Circle", () => {
      expect(Victory.Circle).not.to.equal(undefined);
    });
    it("exports ClipPath", () => {
      expect(Victory.ClipPath).not.to.equal(undefined);
    });
    it("exports Curve", () => {
      expect(Victory.Curve).not.to.equal(undefined);
    });
    it("exports ErrorBar", () => {
      expect(Victory.ErrorBar).not.to.equal(undefined);
    });
    it("exports Flyout", () => {
      expect(Victory.Flyout).not.to.equal(undefined);
    });
    it("exports GridLine", () => {
      expect(Victory.GridLine).not.to.equal(undefined);
    });
    it("exports Line", () => {
      expect(Victory.Line).not.to.equal(undefined);
    });
    it("exports Path", () => {
      expect(Victory.Path).not.to.equal(undefined);
    });
    it("exports Point", () => {
      expect(Victory.Point).not.to.equal(undefined);
    });
    it("exports Rect", () => {
      expect(Victory.Rect).not.to.equal(undefined);
    });
    it("exports Slice", () => {
      expect(Victory.Slice).not.to.equal(undefined);
    });
    it("exports Text", () => {
      expect(Victory.Text).not.to.equal(undefined);
    });
    it("exports TSpan", () => {
      expect(Victory.TSpan).not.to.equal(undefined);
    });
    it("exports Voronoi", () => {
      expect(Victory.Voronoi).not.to.equal(undefined);
    });
    it("exports Whisker", () => {
      expect(Victory.Whisker).not.to.equal(undefined);
    });
  });
  describe("exports helper components", () => { // eslint-disable-line max-statements
    it("exports addEvents", () => {
      expect(Victory.addEvents).not.to.equal(undefined);
    });
    it("exports Axis", () => {
      expect(Victory.Axis).not.to.equal(undefined);
    });
    it("exports brushContainerMixin", () => {
      expect(Victory.brushContainerMixin).not.to.equal(undefined);
    });
    it("exports BrushHelpers", () => {
      expect(Victory.BrushHelpers).not.to.equal(undefined);
    });
    it("exports Collection", () => {
      expect(Victory.Collection).not.to.equal(undefined);
    });
    it("exports combineContainerMixins", () => {
      expect(Victory.combineContainerMixins).not.to.equal(undefined);
    });
    it("exports createContainer", () => {
      expect(Victory.createContainer).not.to.equal(undefined);
    });
    it("exports cursorContainerMixin", () => {
      expect(Victory.cursorContainerMixin).not.to.equal(undefined);
    });
    it("exports CursorHelpers", () => {
      expect(Victory.CursorHelpers).not.to.equal(undefined);
    });
    it("exports Data", () => {
      expect(Victory.Data).not.to.equal(undefined);
    });
    it("exports DefaultTransitions", () => {
      expect(Victory.DefaultTransitions).not.to.equal(undefined);
    });
    it("exports Domain", () => {
      expect(Victory.Domain).not.to.equal(undefined);
    });
    it("exports Events", () => {
      expect(Victory.Events).not.to.equal(undefined);
    });
    it("exports Helpers", () => {
      expect(Victory.Helpers).not.to.equal(undefined);
    });
    it("exports LabelHelpers", () => {
      expect(Victory.LabelHelpers).not.to.equal(undefined);
    });
    it("exports Log", () => {
      expect(Victory.Log).not.to.equal(undefined);
    });
    it("exports makeCreateContainerFunction", () => {
      expect(Victory.makeCreateContainerFunction).not.to.equal(undefined);
    });
    it("exports Portal", () => {
      expect(Victory.Portal).not.to.equal(undefined);
    });
    it("exports PropTypes", () => {
      expect(Victory.PropTypes).not.to.equal(undefined);
    });
    it("exports RawZoomHelpers", () => {
      expect(Victory.RawZoomHelpers).not.to.equal(undefined);
    });
    it("exports Scale", () => {
      expect(Victory.Scale).not.to.equal(undefined);
    });
    it("exports Selection", () => {
      expect(Victory.Selection).not.to.equal(undefined);
    });
    it("exports selectionContainerMixin", () => {
      expect(Victory.selectionContainerMixin).not.to.equal(undefined);
    });
    it("exports SelectionHelpers", () => {
      expect(Victory.SelectionHelpers).not.to.equal(undefined);
    });
    it("exports Style", () => {
      expect(Victory.Style).not.to.equal(undefined);
    });
    it("exports TextSize", () => {
      expect(Victory.TextSize).not.to.equal(undefined);
    });
    it("exports Transitions", () => {
      expect(Victory.Transitions).not.to.equal(undefined);
    });
    it("exports voronoiContainerMixin", () => {
      expect(Victory.voronoiContainerMixin).not.to.equal(undefined);
    });
    it("exports VoronoiHelpers", () => {
      expect(Victory.VoronoiHelpers).not.to.equal(undefined);
    });
    it("exports Wrapper", () => {
      expect(Victory.Wrapper).not.to.equal(undefined);
    });
    it("exports zoomContainerMixin", () => {
      expect(Victory.zoomContainerMixin).not.to.equal(undefined);
    });
    it("exports ZoomHelpers", () => {
      expect(Victory.ZoomHelpers).not.to.equal(undefined);
    });
  });
});

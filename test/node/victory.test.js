/**
 * Client tests
 */
const Victory = require("victory");

describe("victory", () => {
  // eslint-disable-line max-statements
  describe("exports victory components", () => {
    it("exports VictoryAnimation", () => {
      expect(Victory.VictoryAnimation).toBeDefined();
    });
    it("exports VictoryArea", () => {
      expect(Victory.VictoryArea).toBeDefined();
    });
    it("exports VictoryAxis", () => {
      expect(Victory.VictoryAxis).toBeDefined();
    });
    it("exports VictoryBar", () => {
      expect(Victory.VictoryBar).toBeDefined();
    });
    it("exports VictoryBoxPlot", () => {
      expect(Victory.VictoryBoxPlot).toBeDefined();
    });
    it("exports VictoryBrushContainer", () => {
      expect(Victory.VictoryBrushContainer).toBeDefined();
    });
    it("exports VictoryBrushLine", () => {
      expect(Victory.VictoryBrushLine).toBeDefined();
    });
    it("exports VictoryCandlestick", () => {
      expect(Victory.VictoryCandlestick).toBeDefined();
    });
    it("exports VictoryChart", () => {
      expect(Victory.VictoryChart).toBeDefined();
    });
    it("exports VictoryClipContainer", () => {
      expect(Victory.VictoryClipContainer).toBeDefined();
    });
    it("exports VictoryContainer", () => {
      expect(Victory.VictoryContainer).toBeDefined();
    });
    it("exports VictoryCursorContainer", () => {
      expect(Victory.VictoryCursorContainer).toBeDefined();
    });
    it("exports VictoryErrorBar", () => {
      expect(Victory.VictoryErrorBar).toBeDefined();
    });
    it("exports VictoryGroup", () => {
      expect(Victory.VictoryGroup).toBeDefined();
    });
    it("exports VictoryLabel", () => {
      expect(Victory.VictoryLabel).toBeDefined();
    });
    it("exports VictoryLegend", () => {
      expect(Victory.VictoryLegend).toBeDefined();
    });
    it("exports VictoryLine", () => {
      expect(Victory.VictoryLine).toBeDefined();
    });
    it("exports VictoryPie", () => {
      expect(Victory.VictoryPie).toBeDefined();
    });
    it("exports VictoryPolarAxis", () => {
      expect(Victory.VictoryPolarAxis).toBeDefined();
    });
    it("exports VictoryPortal", () => {
      expect(Victory.VictoryPortal).toBeDefined();
    });
    it("exports VictoryScatter", () => {
      expect(Victory.VictoryScatter).toBeDefined();
    });
    it("exports VictorySelectionContainer", () => {
      expect(Victory.VictorySelectionContainer).toBeDefined();
    });
    it("exports VictorySharedEvents", () => {
      expect(Victory.VictorySharedEvents).toBeDefined();
    });
    it("exports VictoryStack", () => {
      expect(Victory.VictoryStack).toBeDefined();
    });
    it("exports VictoryTheme", () => {
      expect(Victory.VictoryTheme).toBeDefined();
    });
    it("exports VictoryTransition", () => {
      expect(Victory.VictoryTransition).toBeDefined();
    });
    it("exports VictoryTooltip", () => {
      expect(Victory.VictoryTooltip).toBeDefined();
    });
    it("exports VictoryVoronoi", () => {
      expect(Victory.VictoryVoronoi).toBeDefined();
    });
    it("exports VictoryVoronoiContainer", () => {
      expect(Victory.VictoryVoronoiContainer).toBeDefined();
    });
    it("exports VictoryZoomContainer", () => {
      expect(Victory.VictoryZoomContainer).toBeDefined();
    });
  });
  describe("exports primitive components", () => {
    // eslint-disable-line max-statements
    it("exports Area", () => {
      expect(Victory.Area).toBeDefined();
    });
    it("exports Bar", () => {
      expect(Victory.Bar).toBeDefined();
    });
    it("exports Border", () => {
      expect(Victory.Border).toBeDefined();
    });
    it("exports Candle", () => {
      expect(Victory.Candle).toBeDefined();
    });
    it("exports Circle", () => {
      expect(Victory.Circle).toBeDefined();
    });
    it("exports ClipPath", () => {
      expect(Victory.ClipPath).toBeDefined();
    });
    it("exports Curve", () => {
      expect(Victory.Curve).toBeDefined();
    });
    it("exports ErrorBar", () => {
      expect(Victory.ErrorBar).toBeDefined();
    });
    it("exports Flyout", () => {
      expect(Victory.Flyout).toBeDefined();
    });
    it("exports LineSegment", () => {
      expect(Victory.LineSegment).toBeDefined();
    });
    it("exports Line", () => {
      expect(Victory.Line).toBeDefined();
    });
    it("exports Path", () => {
      expect(Victory.Path).toBeDefined();
    });
    it("exports Point", () => {
      expect(Victory.Point).toBeDefined();
    });
    it("exports Rect", () => {
      expect(Victory.Rect).toBeDefined();
    });
    it("exports Slice", () => {
      expect(Victory.Slice).toBeDefined();
    });
    it("exports Text", () => {
      expect(Victory.Text).toBeDefined();
    });
    it("exports TSpan", () => {
      expect(Victory.TSpan).toBeDefined();
    });
    it("exports Voronoi", () => {
      expect(Victory.Voronoi).toBeDefined();
    });
    it("exports Whisker", () => {
      expect(Victory.Whisker).toBeDefined();
    });
  });
  describe("exports helper components", () => {
    // eslint-disable-line max-statements
    it("exports addEvents", () => {
      expect(Victory.addEvents).toBeDefined();
    });
    it("exports Axis", () => {
      expect(Victory.Axis).toBeDefined();
    });
    it("exports brushContainerMixin", () => {
      expect(Victory.brushContainerMixin).toBeDefined();
    });
    it("exports BrushHelpers", () => {
      expect(Victory.BrushHelpers).toBeDefined();
    });
    it("exports Collection", () => {
      expect(Victory.Collection).toBeDefined();
    });
    it("exports combineContainerMixins", () => {
      expect(Victory.combineContainerMixins).toBeDefined();
    });
    it("exports createContainer", () => {
      expect(Victory.createContainer).toBeDefined();
    });
    it("exports cursorContainerMixin", () => {
      expect(Victory.cursorContainerMixin).toBeDefined();
    });
    it("exports CursorHelpers", () => {
      expect(Victory.CursorHelpers).toBeDefined();
    });
    it("exports Data", () => {
      expect(Victory.Data).toBeDefined();
    });
    it("exports DefaultTransitions", () => {
      expect(Victory.DefaultTransitions).toBeDefined();
    });
    it("exports Domain", () => {
      expect(Victory.Domain).toBeDefined();
    });
    it("exports Events", () => {
      expect(Victory.Events).toBeDefined();
    });
    it("exports Helpers", () => {
      expect(Victory.Helpers).toBeDefined();
    });
    it("exports LabelHelpers", () => {
      expect(Victory.LabelHelpers).toBeDefined();
    });
    it("exports Log", () => {
      expect(Victory.Log).toBeDefined();
    });
    it("exports makeCreateContainerFunction", () => {
      expect(Victory.makeCreateContainerFunction).toBeDefined();
    });
    it("exports Portal", () => {
      expect(Victory.Portal).toBeDefined();
    });
    it("exports PropTypes", () => {
      expect(Victory.PropTypes).toBeDefined();
    });
    it("exports RawZoomHelpers", () => {
      expect(Victory.RawZoomHelpers).toBeDefined();
    });
    it("exports Scale", () => {
      expect(Victory.Scale).toBeDefined();
    });
    it("exports Selection", () => {
      expect(Victory.Selection).toBeDefined();
    });
    it("exports selectionContainerMixin", () => {
      expect(Victory.selectionContainerMixin).toBeDefined();
    });
    it("exports SelectionHelpers", () => {
      expect(Victory.SelectionHelpers).toBeDefined();
    });
    it("exports Style", () => {
      expect(Victory.Style).toBeDefined();
    });
    it("exports TextSize", () => {
      expect(Victory.TextSize).toBeDefined();
    });
    it("exports Transitions", () => {
      expect(Victory.Transitions).toBeDefined();
    });
    it("exports voronoiContainerMixin", () => {
      expect(Victory.voronoiContainerMixin).toBeDefined();
    });
    it("exports VoronoiHelpers", () => {
      expect(Victory.VoronoiHelpers).toBeDefined();
    });
    it("exports Wrapper", () => {
      expect(Victory.Wrapper).toBeDefined();
    });
    it("exports zoomContainerMixin", () => {
      expect(Victory.zoomContainerMixin).toBeDefined();
    });
    it("exports ZoomHelpers", () => {
      expect(Victory.ZoomHelpers).toBeDefined();
    });
  });
});

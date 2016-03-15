(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["VictoryPie"] = factory(require("react"));
	else
		root["VictoryPie"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VictoryPie = undefined;
	
	var _victoryPie = __webpack_require__(1);
	
	var _victoryPie2 = _interopRequireDefault(_victoryPie);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.VictoryPie = _victoryPie2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Shape = __webpack_require__(3);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _assign = __webpack_require__(39);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _pick = __webpack_require__(44);
	
	var _pick2 = _interopRequireDefault(_pick);
	
	var _victoryCore = __webpack_require__(49);
	
	var _slice = __webpack_require__(175);
	
	var _slice2 = _interopRequireDefault(_slice);
	
	var _sliceLabel = __webpack_require__(187);
	
	var _sliceLabel2 = _interopRequireDefault(_sliceLabel);
	
	var _lruMemoize = __webpack_require__(188);
	
	var _lruMemoize2 = _interopRequireDefault(_lruMemoize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    padding: 5,
	    stroke: "white",
	    strokeWidth: 1
	  },
	  labels: {
	    padding: 10,
	    fill: "black",
	    strokeWidth: 0,
	    stroke: "transparent",
	    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	    fontSize: 10,
	    textAnchor: "middle"
	  }
	};
	
	var degreesToRadians = function degreesToRadians(degrees) {
	  return degrees * (Math.PI / 180);
	};
	
	var getRadius = function getRadius(props, padding) {
	  return Math.min(props.width - padding.left - padding.right, props.height - padding.top - padding.bottom) / 2;
	};
	
	var getLabelPosition = function getLabelPosition(props, style, radius) {
	  // TODO: better label positioning
	  var innerRadius = props.innerRadius ? props.innerRadius + style.labels.padding : style.labels.padding;
	  return _d3Shape2.default.arc().outerRadius(radius).innerRadius(innerRadius);
	};
	
	var VictoryPie = function (_React$Component) {
	  _inherits(VictoryPie, _React$Component);
	
	  function VictoryPie() {
	    _classCallCheck(this, VictoryPie);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryPie).apply(this, arguments));
	  }
	
	  _createClass(VictoryPie, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.state = {
	        dataState: {},
	        labelsState: {}
	      };
	      this.memoized = {
	        // Provide performant, multiple-argument memoization with LRU cache-size of 1.
	        getStyles: (0, _lruMemoize2.default)(1, true)(_victoryCore.Helpers.getStyles)
	      };
	    }
	  }, {
	    key: "renderSlice",
	    value: function renderSlice(slice, index, calculatedProps) {
	      var style = calculatedProps.style;
	      var colorScale = calculatedProps.colorScale;
	      var makeSlicePath = calculatedProps.makeSlicePath;
	      var labelPosition = calculatedProps.labelPosition;
	
	      var fill = colorScale[index % colorScale.length];
	      var sliceStyle = (0, _defaults2.default)({}, { fill: fill }, style.data);
	      var getBoundEvents = _victoryCore.Helpers.getEvents.bind(this);
	      return _react2.default.createElement(
	        "g",
	        { key: index },
	        _react2.default.createElement(_slice2.default, _extends({
	          index: index,
	          events: getBoundEvents(this.props.events.data, "data"),
	          slice: slice,
	          pathFunction: makeSlicePath,
	          style: sliceStyle,
	          datum: slice.data
	        }, this.state.dataState[index])),
	        _react2.default.createElement(_sliceLabel2.default, _extends({
	          index: index,
	          events: getBoundEvents(this.props.events.labels, "labels"),
	          labels: this.props.labels,
	          style: style.labels,
	          positionFunction: labelPosition.centroid,
	          slice: slice,
	          datum: slice.data
	        }, this.state.labelsState[index]))
	      );
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props, calculatedProps) {
	      var _this2 = this;
	
	      var _calculatedProps = calculatedProps;
	      var style = _calculatedProps.style;
	      var radius = _calculatedProps.radius;
	
	      var data = _victoryCore.Helpers.getData(props);
	      var labelPosition = getLabelPosition(props, style, radius);
	      var colorScale = Array.isArray(props.colorScale) ? props.colorScale : _victoryCore.Style.getColorScale(props.colorScale);
	      var makeSlicePath = _d3Shape2.default.arc().outerRadius(radius).innerRadius(this.props.innerRadius);
	
	      calculatedProps = (0, _assign2.default)(calculatedProps, { data: data, colorScale: colorScale, makeSlicePath: makeSlicePath, labelPosition: labelPosition });
	
	      var pie = _d3Shape2.default.pie().sort(null).startAngle(degreesToRadians(props.startAngle)).endAngle(degreesToRadians(props.endAngle)).padAngle(degreesToRadians(props.padAngle)).value(function (datum) {
	        return datum.y;
	      });
	      var slices = pie(data);
	
	      return _react2.default.createElement(
	        "g",
	        null,
	        slices.map(function (slice, index) {
	          return _this2.renderSlice(slice, index, calculatedProps);
	        })
	      );
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var animateData = (0, _pick2.default)(this.props, ["data", "endAngle", "height", "innerRadius", "padAngle", "padding", "colorScale", "startAngle", "style", "width"]);
	        return _react2.default.createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2.default.createElement(VictoryPie, _extends({}, _this3.props, props, { animate: null }));
	          }
	        );
	      }
	
	      var style = this.memoized.getStyles(this.props.style, defaultStyles, this.props.height, this.props.width);
	      var padding = _victoryCore.Helpers.getPadding(this.props);
	      var radius = getRadius(this.props, padding);
	      var parentStyle = style.parent;
	      var xOffset = radius + padding.left;
	      var yOffset = radius + padding.top;
	
	      var group = _react2.default.createElement(
	        "g",
	        { style: parentStyle, transform: "translate(" + xOffset + ", " + yOffset + ")" },
	        this.renderData(this.props, { style: style, padding: padding, radius: radius })
	      );
	
	      return this.props.standalone ? _react2.default.createElement(
	        "svg",
	        _extends({ style: parentStyle }, this.props.events.parent),
	        group
	      ) : group;
	    }
	  }]);
	
	  return VictoryPie;
	}(_react2.default.Component);
	
	VictoryPie.propTypes = {
	  /**
	   * The animate prop specifies props for victory-animation to use. If this prop is
	   * not given, the pie chart will not tween between changing data / style props.
	   * Large datasets might animate slowly due to the inherent limits of svg rendering.
	   * @examples {velocity: 0.02, onEnd: () => alert("done!")}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The colorScale prop is an optional prop that defines the color scale the pie
	   * will be created on. This prop should be given as an array of CSS colors, or as a string
	   * corresponding to one of the built in color scales. VictoryPie will automatically assign
	   * values from this color scale to the pie slices unless colors are explicitly provided in the
	   * data object
	   */
	  colorScale: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.oneOf(["greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"])]),
	  /**
	   * Objects in the data array must be of the form { x: <x-val>, y: <y-val> }, where <x-val>
	   * is the slice label (string or number), and <y-val> is the corresponding number
	   * used to calculate arc length as a proportion of the pie's circumference.
	   * If the data prop is omitted, the pie will render sample data.
	   */
	
	  /**
	   * The data prop specifies the data to be plotted,
	   * where data X-value is the slice label (string or number),
	   * and Y-value is the corresponding number value represented by the slice
	   * Data should be in the form of an array of data points.
	   * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
	   * but by default, an object with x and y properties is expected.
	   * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
	   * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
	   */
	  data: _react.PropTypes.array,
	  /**
	   * The overall end angle of the pie in degrees. This prop is used in conjunction with
	   * startAngle to create a pie that spans only a segment of a circle.
	   */
	  endAngle: _react.PropTypes.number,
	  /**
	   * The events prop attaches arbitrary event handlers to data and label elements
	   * Event handlers are called with their corresponding events, corresponding component props,
	   * and their index in the data array, and event name. The return value of event handlers
	   * will be stored by unique index on the state object of VictoryPie
	   * i.e. `this.state.dataState[dataIndex] = {style: {fill: "red"}...}`, and will be
	   * applied by index to the appropriate child component. Event props on the
	   * parent namespace are just spread directly on to the top level svg of VictoryPie
	   * if one exists. If VictoryPie is set up to render g elements i.e. when it is
	   * rendered within chart, or when `standalone={false}` parent events will not be applied.
	   *
	   * @examples {data: {
	   *  onClick: () => onClick: () => return {style: {fill: "green"}}
	   *}}
	   */
	  events: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The height props specifies the height of the chart container element in pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * When creating a donut chart, this prop determines the number of pixels between
	   * the center of the chart and the inner edge of a donut. When this prop is set to zero
	   * a regular pie chart is rendered.
	   */
	  innerRadius: _victoryCore.PropTypes.nonNegative,
	  /**
	   * This prop specifies the labels that will be applied to your data. This prop can be
	   * passed in as an array of values, in the same order as your data, or as a function
	   * to be applied to each data point. If this prop is not specified, the x value
	   * of each data point will be used as a label. An array of custom components may also
	   * be passed in.
	   */
	  labels: _react.PropTypes.element,
	  /**
	   * The padAngle prop determines the amount of separation between adjacent data slices
	   * in number of degrees
	   */
	  padAngle: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The padding props specifies the amount of padding in number of pixels between
	   * the edge of the chart and any rendered child components. This prop can be given
	   * as a number or as an object with padding specified for top, bottom, left
	   * and right.
	   */
	  padding: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
	    top: _react.PropTypes.number,
	    bottom: _react.PropTypes.number,
	    left: _react.PropTypes.number,
	    right: _react.PropTypes.number
	  })]),
	  /**
	   * The standalone prop determines whether VictoryPie should render as a standalone
	   * svg, or in a g tag to be included in an svg
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The overall start angle of the pie in degrees. This prop is used in conjunction with
	   * endAngle to create a pie that spans only a segment of a circle.
	   */
	  startAngle: _react.PropTypes.number,
	  /**
	   * The style prop specifies styles for your pie. VictoryPie relies on Radium,
	   * so valid Radium style objects should work for this prop. Height, width, and
	   * padding should be specified via the height, width, and padding props.
	   * @examples {data: {stroke: "black"}, label: {fontSize: 10}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the chart container element in pixels
	   */
	  width: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The x prop specifies how to access the X value of each data point.
	   * If given as a function, it will be run on each data point, and returned value will be used.
	   * If given as an integer, it will be used as an array index for array-type data points.
	   * If given as a string, it will be used as a property key for object-type data points.
	   * If given as an array of strings, or a string containing dots or brackets,
	   * it will be used as a nested object property path (for details see Lodash docs for _.get).
	   * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
	   * @examples 0, 'x', 'x.value.nested.1.thing', 'x[2].also.nested', null, d => Math.sin(d)
	   */
	  x: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  /**
	   * The y prop specifies how to access the Y value of each data point.
	   * If given as a function, it will be run on each data point, and returned value will be used.
	   * If given as an integer, it will be used as an array index for array-type data points.
	   * If given as a string, it will be used as a property key for object-type data points.
	   * If given as an array of strings, or a string containing dots or brackets,
	   * it will be used as a nested object property path (for details see Lodash docs for _.get).
	   * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
	   * @examples 0, 'y', 'y.value.nested.1.thing', 'y[2].also.nested', null, d => Math.sin(d)
	   */
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)])
	};
	VictoryPie.defaultProps = {
	  data: [{ x: "A", y: 1 }, { x: "B", y: 2 }, { x: "C", y: 3 }, { x: "D", y: 1 }, { x: "E", y: 2 }],
	  endAngle: 360,
	  events: {},
	  height: 400,
	  innerRadius: 0,
	  padAngle: 0,
	  padding: 30,
	  colorScale: ["#75C776", "#39B6C5", "#78CCC4", "#62C3A4", "#64A8D1", "#8C95C8", "#3BAF74"],
	  startAngle: 0,
	  standalone: true,
	  width: 400,
	  x: "x",
	  y: "y"
	};
	exports.default = VictoryPie;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(4)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3_shape = global.d3_shape || {}),global.d3_path));
	}(this, function (exports,d3Path) { 'use strict';
	
	  var version = "0.6.0";
	
	  function constant(x) {
	    return function constant() {
	      return x;
	    };
	  }
	
	  var epsilon = 1e-12;
	  var pi = Math.PI;
	  var halfPi = pi / 2;
	  var tau = 2 * pi;
	
	  function arcInnerRadius(d) {
	    return d.innerRadius;
	  }
	
	  function arcOuterRadius(d) {
	    return d.outerRadius;
	  }
	
	  function arcStartAngle(d) {
	    return d.startAngle;
	  }
	
	  function arcEndAngle(d) {
	    return d.endAngle;
	  }
	
	  function arcPadAngle(d) {
	    return d && d.padAngle; // Note: optional!
	  }
	
	  function asin(x) {
	    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	  }
	
	  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	    var x10 = x1 - x0, y10 = y1 - y0,
	        x32 = x3 - x2, y32 = y3 - y2,
	        t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	    return [x0 + t * x10, y0 + t * y10];
	  }
	
	  // Compute perpendicular offset line of length rc.
	  // http://mathworld.wolfram.com/Circle-LineIntersection.html
	  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	    var x01 = x0 - x1,
	        y01 = y0 - y1,
	        lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
	        ox = lo * y01,
	        oy = -lo * x01,
	        x11 = x0 + ox,
	        y11 = y0 + oy,
	        x10 = x1 + ox,
	        y10 = y1 + oy,
	        x00 = (x11 + x10) / 2,
	        y00 = (y11 + y10) / 2,
	        dx = x10 - x11,
	        dy = y10 - y11,
	        d2 = dx * dx + dy * dy,
	        r = r1 - rc,
	        D = x11 * y10 - x10 * y11,
	        d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
	        cx0 = (D * dy - dx * d) / d2,
	        cy0 = (-D * dx - dy * d) / d2,
	        cx1 = (D * dy + dx * d) / d2,
	        cy1 = (-D * dx + dy * d) / d2,
	        dx0 = cx0 - x00,
	        dy0 = cy0 - y00,
	        dx1 = cx1 - x00,
	        dy1 = cy1 - y00;
	
	    // Pick the closer of the two intersection points.
	    // TODO Is there a faster way to determine which intersection to use?
	    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	    return {
	      cx: cx0,
	      cy: cy0,
	      x01: -ox,
	      y01: -oy,
	      x11: cx0 * (r1 / r - 1),
	      y11: cy0 * (r1 / r - 1)
	    };
	  }
	
	  function arc() {
	    var innerRadius = arcInnerRadius,
	        outerRadius = arcOuterRadius,
	        cornerRadius = constant(0),
	        padRadius = null,
	        startAngle = arcStartAngle,
	        endAngle = arcEndAngle,
	        padAngle = arcPadAngle,
	        context = null;
	
	    function arc() {
	      var buffer,
	          r,
	          r0 = +innerRadius.apply(this, arguments),
	          r1 = +outerRadius.apply(this, arguments),
	          a0 = startAngle.apply(this, arguments) - halfPi,
	          a1 = endAngle.apply(this, arguments) - halfPi,
	          da = Math.abs(a1 - a0),
	          cw = a1 > a0;
	
	      if (!context) context = buffer = d3Path.path();
	
	      // Ensure that the outer radius is always larger than the inner radius.
	      if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	      // Is it a point?
	      if (!(r1 > epsilon)) context.moveTo(0, 0);
	
	      // Or is it a circle or annulus?
	      else if (da > tau - epsilon) {
	        context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
	        context.arc(0, 0, r1, a0, a1, !cw);
	        if (r0 > epsilon) {
	          context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
	          context.arc(0, 0, r0, a1, a0, cw);
	        }
	      }
	
	      // Or is it a circular or annular sector?
	      else {
	        var a01 = a0,
	            a11 = a1,
	            a00 = a0,
	            a10 = a1,
	            da0 = da,
	            da1 = da,
	            ap = padAngle.apply(this, arguments) / 2,
	            rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
	            rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	            rc0 = rc,
	            rc1 = rc,
	            t0,
	            t1;
	
	        // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	        if (rp > epsilon) {
	          var p0 = asin(rp / r0 * Math.sin(ap)),
	              p1 = asin(rp / r1 * Math.sin(ap));
	          if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	          else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	          if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	          else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	        }
	
	        var x01 = r1 * Math.cos(a01),
	            y01 = r1 * Math.sin(a01),
	            x10 = r0 * Math.cos(a10),
	            y10 = r0 * Math.sin(a10);
	
	        // Apply rounded corners?
	        if (rc > epsilon) {
	          var x11 = r1 * Math.cos(a11),
	              y11 = r1 * Math.sin(a11),
	              x00 = r0 * Math.cos(a00),
	              y00 = r0 * Math.sin(a00);
	
	          // Restrict the corner radius according to the sector angle.
	          if (da < pi) {
	            var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	                ax = x01 - oc[0],
	                ay = y01 - oc[1],
	                bx = x11 - oc[0],
	                by = y11 - oc[1],
	                kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
	                lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	            rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	            rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	          }
	        }
	
	        // Is the sector collapsed to a line?
	        if (!(da1 > epsilon)) context.moveTo(x01, y01);
	
	        // Does the sector’s outer ring have rounded corners?
	        else if (rc1 > epsilon) {
	          t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	          t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	          context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	          // Have the corners merged?
	          if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	          // Otherwise, draw the two corners and the ring.
	          else {
	            context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	            context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	            context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	          }
	        }
	
	        // Or is the outer ring just a circular arc?
	        else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	        // Is there no inner ring, and it’s a circular sector?
	        // Or perhaps it’s an annular sector collapsed due to padding?
	        if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);
	
	        // Does the sector’s inner ring (or point) have rounded corners?
	        else if (rc0 > epsilon) {
	          t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	          t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	          context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	          // Have the corners merged?
	          if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);
	
	          // Otherwise, draw the two corners and the ring.
	          else {
	            context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	            context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	            context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	          }
	        }
	
	        // Or is the inner ring just a circular arc?
	        else context.arc(0, 0, r0, a10, a00, cw);
	      }
	
	      context.closePath();
	
	      if (buffer) return context = null, buffer + "" || null;
	    }
	
	    arc.centroid = function() {
	      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	      return [Math.cos(a) * r, Math.sin(a) * r];
	    };
	
	    arc.innerRadius = function(_) {
	      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
	    };
	
	    arc.outerRadius = function(_) {
	      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
	    };
	
	    arc.cornerRadius = function(_) {
	      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
	    };
	
	    arc.padRadius = function(_) {
	      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
	    };
	
	    arc.startAngle = function(_) {
	      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
	    };
	
	    arc.endAngle = function(_) {
	      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
	    };
	
	    arc.padAngle = function(_) {
	      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
	    };
	
	    arc.context = function(_) {
	      return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	    };
	
	    return arc;
	  }
	
	  function Linear(context) {
	    this._context = context;
	  }
	
	  Linear.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; // proceed
	        default: this._context.lineTo(x, y); break;
	      }
	    }
	  };
	
	  function curveLinear(context) {
	    return new Linear(context);
	  }
	
	  function pointX(p) {
	    return p[0];
	  }
	
	  function pointY(p) {
	    return p[1];
	  }
	
	  function area() {
	    var x0 = pointX,
	        x1 = null,
	        y0 = constant(0),
	        y1 = pointY,
	        defined = constant(true),
	        context = null,
	        curve = curveLinear,
	        output = null;
	
	    function area(data) {
	      var i,
	          j,
	          k,
	          n = data.length,
	          d,
	          defined0 = false,
	          buffer,
	          x0z = new Array(n),
	          y0z = new Array(n);
	
	      if (context == null) output = curve(buffer = d3Path.path());
	
	      for (i = 0; i <= n; ++i) {
	        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	          if (defined0 = !defined0) {
	            j = i;
	            output.areaStart();
	            output.lineStart();
	          } else {
	            output.lineEnd();
	            output.lineStart();
	            for (k = i - 1; k >= j; --k) {
	              output.point(x0z[k], y0z[k]);
	            }
	            output.lineEnd();
	            output.areaEnd();
	          }
	        }
	        if (defined0) {
	          x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	          output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	        }
	      }
	
	      if (buffer) return output = null, buffer + "" || null;
	    }
	
	    area.x = function(_) {
	      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
	    };
	
	    area.x0 = function(_) {
	      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
	    };
	
	    area.x1 = function(_) {
	      return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
	    };
	
	    area.y = function(_) {
	      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
	    };
	
	    area.y0 = function(_) {
	      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
	    };
	
	    area.y1 = function(_) {
	      return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
	    };
	
	    area.defined = function(_) {
	      return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
	    };
	
	    area.curve = function(_) {
	      return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	    };
	
	    area.context = function(_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	    };
	
	    return area;
	  }
	
	  function line() {
	    var x = pointX,
	        y = pointY,
	        defined = constant(true),
	        context = null,
	        curve = curveLinear,
	        output = null;
	
	    function line(data) {
	      var i,
	          n = data.length,
	          d,
	          defined0 = false,
	          buffer;
	
	      if (context == null) output = curve(buffer = d3Path.path());
	
	      for (i = 0; i <= n; ++i) {
	        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	          if (defined0 = !defined0) output.lineStart();
	          else output.lineEnd();
	        }
	        if (defined0) output.point(+x(d, i, data), +y(d, i, data));
	      }
	
	      if (buffer) return output = null, buffer + "" || null;
	    }
	
	    line.x = function(_) {
	      return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
	    };
	
	    line.y = function(_) {
	      return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
	    };
	
	    line.defined = function(_) {
	      return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
	    };
	
	    line.curve = function(_) {
	      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	    };
	
	    line.context = function(_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	    };
	
	    return line;
	  }
	
	  function descending(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  }
	
	  function identity(d) {
	    return d;
	  }
	
	  function pie() {
	    var value = identity,
	        sortValues = descending,
	        sort = null,
	        startAngle = constant(0),
	        endAngle = constant(tau),
	        padAngle = constant(0);
	
	    function pie(data) {
	      var i,
	          n = data.length,
	          j,
	          k,
	          sum = 0,
	          index = new Array(n),
	          arcs = new Array(n),
	          a0 = +startAngle.apply(this, arguments),
	          da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	          a1,
	          p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	          pa = p * (da < 0 ? -1 : 1),
	          v;
	
	      for (i = 0; i < n; ++i) {
	        if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	          sum += v;
	        }
	      }
	
	      // Optionally sort the arcs by previously-computed values or by data.
	      if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	      else if (sort !== null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	      // Compute the arcs! They are stored in the original data's order.
	      for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	        j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	          data: data[j],
	          index: i,
	          value: v,
	          startAngle: a0,
	          endAngle: a1,
	          padAngle: p
	        };
	      }
	
	      return arcs;
	    }
	
	    pie.value = function(_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
	    };
	
	    pie.sortValues = function(_) {
	      return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	    };
	
	    pie.sort = function(_) {
	      return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	    };
	
	    pie.startAngle = function(_) {
	      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
	    };
	
	    pie.endAngle = function(_) {
	      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
	    };
	
	    pie.padAngle = function(_) {
	      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
	    };
	
	    return pie;
	  }
	
	  function Radial(curve) {
	    this._curve = curve;
	  }
	
	  Radial.prototype = {
	    areaStart: function() {
	      this._curve.areaStart();
	    },
	    areaEnd: function() {
	      this._curve.areaEnd();
	    },
	    lineStart: function() {
	      this._curve.lineStart();
	    },
	    lineEnd: function() {
	      this._curve.lineEnd();
	    },
	    point: function(a, r) {
	      this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	    }
	  };
	
	  function curveRadial(curve) {
	
	    function radial(context) {
	      return new Radial(curve(context));
	    }
	
	    radial._curve = curve;
	
	    return radial;
	  }
	
	  function radialArea() {
	    var a = area(),
	        c = a.curve;
	
	    a.angle = a.x, delete a.x;
	    a.startAngle = a.x0, delete a.x0;
	    a.endAngle = a.x1, delete a.x1;
	    a.radius = a.y, delete a.y;
	    a.innerRadius = a.y0, delete a.y0;
	    a.outerRadius = a.y1, delete a.y1;
	
	    a.curve = function(_) {
	      return arguments.length ? c(curveRadial(_)) : c()._curve;
	    };
	
	    return a.curve(curveLinear);
	  }
	
	  function radialLine() {
	    var l = line(),
	        c = l.curve;
	
	    l.angle = l.x, delete l.x;
	    l.radius = l.y, delete l.y;
	
	    l.curve = function(_) {
	      return arguments.length ? c(curveRadial(_)) : c()._curve;
	    };
	
	    return l.curve(curveLinear);
	  }
	
	  var circle = {
	    draw: function(context, size) {
	      var r = Math.sqrt(size / pi);
	      context.moveTo(r, 0);
	      context.arc(0, 0, r, 0, tau);
	    }
	  };
	
	  var cross = {
	    draw: function(context, size) {
	      var r = Math.sqrt(size / 5) / 2;
	      context.moveTo(-3 * r, -r);
	      context.lineTo(-r, -r);
	      context.lineTo(-r, -3 * r);
	      context.lineTo(r, -3 * r);
	      context.lineTo(r, -r);
	      context.lineTo(3 * r, -r);
	      context.lineTo(3 * r, r);
	      context.lineTo(r, r);
	      context.lineTo(r, 3 * r);
	      context.lineTo(-r, 3 * r);
	      context.lineTo(-r, r);
	      context.lineTo(-3 * r, r);
	      context.closePath();
	    }
	  };
	
	  var tan30 = Math.sqrt(1 / 3);
	  var tan30_2 = tan30 * 2;
	  var diamond = {
	    draw: function(context, size) {
	      var y = Math.sqrt(size / tan30_2),
	          x = y * tan30;
	      context.moveTo(0, -y);
	      context.lineTo(x, 0);
	      context.lineTo(0, y);
	      context.lineTo(-x, 0);
	      context.closePath();
	    }
	  };
	
	  var ka = 0.89081309152928522810;
	  var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	  var kx = Math.sin(tau / 10) * kr;
	  var ky = -Math.cos(tau / 10) * kr;
	  var star = {
	    draw: function(context, size) {
	      var r = Math.sqrt(size * ka),
	          x = kx * r,
	          y = ky * r;
	      context.moveTo(0, -r);
	      context.lineTo(x, y);
	      for (var i = 1; i < 5; ++i) {
	        var a = tau * i / 5,
	            c = Math.cos(a),
	            s = Math.sin(a);
	        context.lineTo(s * r, -c * r);
	        context.lineTo(c * x - s * y, s * x + c * y);
	      }
	      context.closePath();
	    }
	  };
	
	  var square = {
	    draw: function(context, size) {
	      var w = Math.sqrt(size),
	          x = -w / 2;
	      context.rect(x, x, w, w);
	    }
	  };
	
	  var sqrt3 = Math.sqrt(3);
	
	  var triangle = {
	    draw: function(context, size) {
	      var y = -Math.sqrt(size / (sqrt3 * 3));
	      context.moveTo(0, y * 2);
	      context.lineTo(-sqrt3 * y, -y);
	      context.lineTo(sqrt3 * y, -y);
	      context.closePath();
	    }
	  };
	
	  var c = -0.5;
	  var s = Math.sqrt(3) / 2;
	  var k = 1 / Math.sqrt(12);
	  var a = (k / 2 + 1) * 3;
	  var wye = {
	    draw: function(context, size) {
	      var r = Math.sqrt(size / a),
	          x0 = r / 2,
	          y0 = r * k,
	          x1 = x0,
	          y1 = r * k + r,
	          x2 = -x1,
	          y2 = y1;
	      context.moveTo(x0, y0);
	      context.lineTo(x1, y1);
	      context.lineTo(x2, y2);
	      context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	      context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	      context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	      context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	      context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	      context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	      context.closePath();
	    }
	  };
	
	  var symbols = [
	    circle,
	    cross,
	    diamond,
	    square,
	    star,
	    triangle,
	    wye
	  ];
	
	  function symbol() {
	    var type = constant(circle),
	        size = constant(64),
	        context = null;
	
	    function symbol() {
	      var buffer;
	      if (!context) context = buffer = d3Path.path();
	      type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	      if (buffer) return context = null, buffer + "" || null;
	    }
	
	    symbol.type = function(_) {
	      return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
	    };
	
	    symbol.size = function(_) {
	      return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
	    };
	
	    symbol.context = function(_) {
	      return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	    };
	
	    return symbol;
	  }
	
	  function noop() {}
	
	  function point(that, x, y) {
	    that._context.bezierCurveTo(
	      (2 * that._x0 + that._x1) / 3,
	      (2 * that._y0 + that._y1) / 3,
	      (that._x0 + 2 * that._x1) / 3,
	      (that._y0 + 2 * that._y1) / 3,
	      (that._x0 + 4 * that._x1 + x) / 6,
	      (that._y0 + 4 * that._y1 + y) / 6
	    );
	  }
	
	  function Basis(context) {
	    this._context = context;
	  }
	
	  Basis.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 =
	      this._y0 = this._y1 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 3: point(this, this._x1, this._y1); // proceed
	        case 2: this._context.lineTo(this._x1, this._y1); break;
	      }
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	        default: point(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };
	
	  function basis(context) {
	    return new Basis(context);
	  }
	
	  function BasisClosed(context) {
	    this._context = context;
	  }
	
	  BasisClosed.prototype = {
	    areaStart: noop,
	    areaEnd: noop,
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	      this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 1: {
	          this._context.moveTo(this._x2, this._y2);
	          this._context.closePath();
	          break;
	        }
	        case 2: {
	          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	          this._context.closePath();
	          break;
	        }
	        case 3: {
	          this.point(this._x2, this._y2);
	          this.point(this._x3, this._y3);
	          this.point(this._x4, this._y4);
	          break;
	        }
	      }
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	        case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	        case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	        default: point(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };
	
	  function basisClosed(context) {
	    return new BasisClosed(context);
	  }
	
	  function BasisOpen(context) {
	    this._context = context;
	  }
	
	  BasisOpen.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 =
	      this._y0 = this._y1 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	        case 3: this._point = 4; // proceed
	        default: point(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };
	
	  function basisOpen(context) {
	    return new BasisOpen(context);
	  }
	
	  function Bundle(context, beta) {
	    this._basis = new Basis(context);
	    this._beta = beta;
	  }
	
	  Bundle.prototype = {
	    lineStart: function() {
	      this._x = [];
	      this._y = [];
	      this._basis.lineStart();
	    },
	    lineEnd: function() {
	      var x = this._x,
	          y = this._y,
	          j = x.length - 1;
	
	      if (j > 0) {
	        var x0 = x[0],
	            y0 = y[0],
	            dx = x[j] - x0,
	            dy = y[j] - y0,
	            i = -1,
	            t;
	
	        while (++i <= j) {
	          t = i / j;
	          this._basis.point(
	            this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	            this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	          );
	        }
	      }
	
	      this._x = this._y = null;
	      this._basis.lineEnd();
	    },
	    point: function(x, y) {
	      this._x.push(+x);
	      this._y.push(+y);
	    }
	  };
	
	  var bundle = (function custom(beta) {
	
	    function bundle(context) {
	      return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	    }
	
	    bundle.beta = function(beta) {
	      return custom(+beta);
	    };
	
	    return bundle;
	  })(0.85);
	
	  function point$1(that, x, y) {
	    that._context.bezierCurveTo(
	      that._x1 + that._k * (that._x2 - that._x0),
	      that._y1 + that._k * (that._y2 - that._y0),
	      that._x2 + that._k * (that._x1 - x),
	      that._y2 + that._k * (that._y1 - y),
	      that._x2,
	      that._y2
	    );
	  }
	
	  function Cardinal(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }
	
	  Cardinal.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 =
	      this._y0 = this._y1 = this._y2 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 2: this._context.lineTo(this._x2, this._y2); break;
	        case 3: point$1(this, this._x1, this._y1); break;
	      }
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	        case 2: this._point = 3; // proceed
	        default: point$1(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var cardinal = (function custom(tension) {
	
	    function cardinal(context) {
	      return new Cardinal(context, tension);
	    }
	
	    cardinal.tension = function(tension) {
	      return custom(+tension);
	    };
	
	    return cardinal;
	  })(0);
	
	  function CardinalClosed(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }
	
	  CardinalClosed.prototype = {
	    areaStart: noop,
	    areaEnd: noop,
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	      this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 1: {
	          this._context.moveTo(this._x3, this._y3);
	          this._context.closePath();
	          break;
	        }
	        case 2: {
	          this._context.lineTo(this._x3, this._y3);
	          this._context.closePath();
	          break;
	        }
	        case 3: {
	          this.point(this._x3, this._y3);
	          this.point(this._x4, this._y4);
	          this.point(this._x5, this._y5);
	          break;
	        }
	      }
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	        case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	        case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	        default: point$1(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var cardinalClosed = (function custom(tension) {
	
	    function cardinal(context) {
	      return new CardinalClosed(context, tension);
	    }
	
	    cardinal.tension = function(tension) {
	      return custom(+tension);
	    };
	
	    return cardinal;
	  })(0);
	
	  function CardinalOpen(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }
	
	  CardinalOpen.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 =
	      this._y0 = this._y1 = this._y2 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	        case 3: this._point = 4; // proceed
	        default: point$1(this, x, y); break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var cardinalOpen = (function custom(tension) {
	
	    function cardinal(context) {
	      return new CardinalOpen(context, tension);
	    }
	
	    cardinal.tension = function(tension) {
	      return custom(+tension);
	    };
	
	    return cardinal;
	  })(0);
	
	  function point$2(that, x, y) {
	    var x1 = that._x1,
	        y1 = that._y1,
	        x2 = that._x2,
	        y2 = that._y2;
	
	    if (that._l01_a > epsilon) {
	      var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	          n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	      x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	      y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	    }
	
	    if (that._l23_a > epsilon) {
	      var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	          m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	      x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	      y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	    }
	
	    that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	  }
	
	  function CatmullRom(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }
	
	  CatmullRom.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 =
	      this._y0 = this._y1 = this._y2 = NaN;
	      this._l01_a = this._l12_a = this._l23_a =
	      this._l01_2a = this._l12_2a = this._l23_2a =
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 2: this._context.lineTo(this._x2, this._y2); break;
	        case 3: this.point(this, this._x2, this._y2); break;
	      }
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	
	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }
	
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; // proceed
	        default: point$2(this, x, y); break;
	      }
	
	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var catmullRom = (function custom(alpha) {
	
	    function catmullRom(context) {
	      return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	    }
	
	    catmullRom.alpha = function(alpha) {
	      return custom(+alpha);
	    };
	
	    return catmullRom;
	  })(0.5);
	
	  function CatmullRomClosed(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }
	
	  CatmullRomClosed.prototype = {
	    areaStart: noop,
	    areaEnd: noop,
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	      this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	      this._l01_a = this._l12_a = this._l23_a =
	      this._l01_2a = this._l12_2a = this._l23_2a =
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 1: {
	          this._context.moveTo(this._x3, this._y3);
	          this._context.closePath();
	          break;
	        }
	        case 2: {
	          this._context.lineTo(this._x3, this._y3);
	          this._context.closePath();
	          break;
	        }
	        case 3: {
	          this.point(this._x3, this._y3);
	          this.point(this._x4, this._y4);
	          this.point(this._x5, this._y5);
	          break;
	        }
	      }
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	
	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }
	
	      switch (this._point) {
	        case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	        case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	        case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	        default: point$2(this, x, y); break;
	      }
	
	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var catmullRomClosed = (function custom(alpha) {
	
	    function catmullRom(context) {
	      return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	    }
	
	    catmullRom.alpha = function(alpha) {
	      return custom(+alpha);
	    };
	
	    return catmullRom;
	  })(0.5);
	
	  function CatmullRomOpen(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }
	
	  CatmullRomOpen.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 = this._x2 =
	      this._y0 = this._y1 = this._y2 = NaN;
	      this._l01_a = this._l12_a = this._l23_a =
	      this._l01_2a = this._l12_2a = this._l23_2a =
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	
	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }
	
	      switch (this._point) {
	        case 0: this._point = 1; break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	        case 3: this._point = 4; // proceed
	        default: point$2(this, x, y); break;
	      }
	
	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };
	
	  var catmullRomOpen = (function custom(alpha) {
	
	    function catmullRom(context) {
	      return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	    }
	
	    catmullRom.alpha = function(alpha) {
	      return custom(+alpha);
	    };
	
	    return catmullRom;
	  })(0.5);
	
	  function LinearClosed(context) {
	    this._context = context;
	  }
	
	  LinearClosed.prototype = {
	    areaStart: noop,
	    areaEnd: noop,
	    lineStart: function() {
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (this._point) this._context.closePath();
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      if (this._point) this._context.lineTo(x, y);
	      else this._point = 1, this._context.moveTo(x, y);
	    }
	  };
	
	  function linearClosed(context) {
	    return new LinearClosed(context);
	  }
	
	  function sign(x) {
	    return x < 0 ? -1 : 1;
	  }
	
	  // Calculate the slopes of the tangents (Hermite-type interpolation) based on
	  // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	  // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	  // NOV(II), P. 443, 1990.
	  function slope3(that, x2, y2) {
	    var h0 = that._x1 - that._x0,
	        h1 = x2 - that._x1,
	        s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	        s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	        p = (s0 * h1 + s1 * h0) / (h0 + h1);
	    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	  }
	
	  // Calculate a one-sided slope.
	  function slope2(that, t) {
	    var h = that._x1 - that._x0;
	    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	  }
	
	  // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	  // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	  // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	  function point$3(that, t0, t1) {
	    var x0 = that._x0,
	        y0 = that._y0,
	        x1 = that._x1,
	        y1 = that._y1,
	        dx = (x1 - x0) / 3;
	    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	  }
	
	  function MonotoneX(context) {
	    this._context = context;
	  }
	
	  MonotoneX.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x0 = this._x1 =
	      this._y0 = this._y1 =
	      this._t0 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      switch (this._point) {
	        case 2: this._context.lineTo(this._x1, this._y1); break;
	        case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	      }
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      var t1 = NaN;
	
	      x = +x, y = +y;
	      if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; break;
	        case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	        default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	      }
	
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	      this._t0 = t1;
	    }
	  }
	
	  function MonotoneY(context) {
	    this._context = new ReflectContext(context);
	  }
	
	  (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	    MonotoneX.prototype.point.call(this, y, x);
	  };
	
	  function ReflectContext(context) {
	    this._context = context;
	  }
	
	  ReflectContext.prototype = {
	    moveTo: function(x, y) { this._context.moveTo(y, x); },
	    closePath: function() { this._context.closePath(); },
	    lineTo: function(x, y) { this._context.lineTo(y, x); },
	    bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	  };
	
	  function monotoneX(context) {
	    return new MonotoneX(context);
	  }
	
	  function monotoneY(context) {
	    return new MonotoneY(context);
	  }
	
	  function Natural(context) {
	    this._context = context;
	  }
	
	  Natural.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x = [];
	      this._y = [];
	    },
	    lineEnd: function() {
	      var x = this._x,
	          y = this._y,
	          n = x.length;
	
	      if (n) {
	        this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	        if (n === 2) {
	          this._context.lineTo(x[1], y[1]);
	        } else {
	          var px = controlPoints(x),
	              py = controlPoints(y);
	          for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	            this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	          }
	        }
	      }
	
	      if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	      this._x = this._y = null;
	    },
	    point: function(x, y) {
	      this._x.push(+x);
	      this._y.push(+y);
	    }
	  };
	
	  // See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	  function controlPoints(x) {
	    var i,
	        n = x.length - 1,
	        m,
	        a = new Array(n),
	        b = new Array(n),
	        r = new Array(n);
	    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	    for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	    for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	    a[n - 1] = r[n - 1] / b[n - 1];
	    for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	    b[n - 1] = (x[n] + a[n - 1]) / 2;
	    for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	    return [a, b];
	  }
	
	  function natural(context) {
	    return new Natural(context);
	  }
	
	  function Step(context, t) {
	    this._context = context;
	    this._t = t;
	  }
	
	  Step.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x = this._y = NaN;
	      this._point = 0;
	    },
	    lineEnd: function() {
	      if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; // proceed
	        default: {
	          var t = x > this._x ? this._t : 1 - this._t;
	          if (t <= 0) {
	            this._context.lineTo(this._x, y);
	            this._context.lineTo(x, y);
	          } else if (t >= 1) {
	            this._context.lineTo(x, this._y);
	            this._context.lineTo(x, y);
	          } else {
	            var x1 = (this._x + x) * t;
	            this._context.lineTo(x1, this._y);
	            this._context.lineTo(x1, y);
	          }
	          break;
	        }
	      }
	      this._x = x, this._y = y;
	    }
	  };
	
	  function step(context) {
	    return new Step(context, 0.5);
	  }
	
	  function stepBefore(context) {
	    return new Step(context, 0);
	  }
	
	  function stepAfter(context) {
	    return new Step(context, 1);
	  }
	
	  var slice = Array.prototype.slice;
	
	  function none(series, order) {
	    if (!((n = series.length) > 1)) return;
	    for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	      s0 = s1, s1 = series[order[i]];
	      for (var j = 0; j < m; ++j) {
	        s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	      }
	    }
	  }
	
	  function none$1(series) {
	    var n = series.length, o = new Array(n);
	    while (--n >= 0) o[n] = n;
	    return o;
	  }
	
	  function stackValue(d, key) {
	    return d[key];
	  }
	
	  function stack() {
	    var keys = constant([]),
	        order = none$1,
	        offset = none,
	        value = stackValue;
	
	    function stack(data) {
	      var kz = keys.apply(this, arguments),
	          i,
	          m = data.length,
	          n = kz.length,
	          sz = new Array(n),
	          oz;
	
	      for (i = 0; i < n; ++i) {
	        for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	          si[j] = sij = [0, +value(data[j], ki, j, data)];
	          sij.data = data[j];
	        }
	        si.key = ki;
	      }
	
	      for (i = 0, oz = order(sz); i < n; ++i) {
	        sz[oz[i]].index = i;
	      }
	
	      offset(sz, oz);
	      return sz;
	    }
	
	    stack.keys = function(_) {
	      return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
	    };
	
	    stack.value = function(_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
	    };
	
	    stack.order = function(_) {
	      return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
	    };
	
	    stack.offset = function(_) {
	      return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	    };
	
	    return stack;
	  }
	
	  function expand(series, order) {
	    if (!((n = series.length) > 0)) return;
	    for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	      for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	      if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	    }
	    none(series, order);
	  }
	
	  function silhouette(series, order) {
	    if (!((n = series.length) > 0)) return;
	    for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	      for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	      s0[j][1] += s0[j][0] = -y / 2;
	    }
	    none(series, order);
	  }
	
	  function wiggle(series, order) {
	    if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	    for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	      for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	        var si = series[order[i]],
	            sij0 = si[j][1] || 0,
	            sij1 = si[j - 1][1] || 0,
	            s3 = (sij0 - sij1) / 2;
	        for (var k = 0; k < i; ++k) {
	          var sk = series[order[k]],
	              skj0 = sk[j][1] || 0,
	              skj1 = sk[j - 1][1] || 0;
	          s3 += skj0 - skj1;
	        }
	        s1 += sij0, s2 += s3 * sij0;
	      }
	      s0[j - 1][1] += s0[j - 1][0] = y;
	      if (s1) y -= s2 / s1;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    none(series, order);
	  }
	
	  function ascending(series) {
	    var sums = series.map(sum);
	    return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	  }
	
	  function sum(series) {
	    var s = 0, i = -1, n = series.length, v;
	    while (++i < n) if (v = +series[i][1]) s += v;
	    return s;
	  }
	
	  function descending$1(series) {
	    return ascending(series).reverse();
	  }
	
	  function insideOut(series) {
	    var n = series.length,
	        i,
	        j,
	        sums = series.map(sum),
	        order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	        top = 0,
	        bottom = 0,
	        tops = [],
	        bottoms = [];
	
	    for (i = 0; i < n; ++i) {
	      j = order[i];
	      if (top < bottom) {
	        top += sums[j];
	        tops.push(j);
	      } else {
	        bottom += sums[j];
	        bottoms.push(j);
	      }
	    }
	
	    return bottoms.reverse().concat(tops);
	  }
	
	  function reverse(series) {
	    return none$1(series).reverse();
	  }
	
	  exports.version = version;
	  exports.arc = arc;
	  exports.area = area;
	  exports.line = line;
	  exports.pie = pie;
	  exports.radialArea = radialArea;
	  exports.radialLine = radialLine;
	  exports.symbol = symbol;
	  exports.symbols = symbols;
	  exports.symbolCircle = circle;
	  exports.symbolCross = cross;
	  exports.symbolDiamond = diamond;
	  exports.symbolSquare = square;
	  exports.symbolStar = star;
	  exports.symbolTriangle = triangle;
	  exports.symbolWye = wye;
	  exports.curveBasisClosed = basisClosed;
	  exports.curveBasisOpen = basisOpen;
	  exports.curveBasis = basis;
	  exports.curveBundle = bundle;
	  exports.curveCardinalClosed = cardinalClosed;
	  exports.curveCardinalOpen = cardinalOpen;
	  exports.curveCardinal = cardinal;
	  exports.curveCatmullRomClosed = catmullRomClosed;
	  exports.curveCatmullRomOpen = catmullRomOpen;
	  exports.curveCatmullRom = catmullRom;
	  exports.curveLinearClosed = linearClosed;
	  exports.curveLinear = curveLinear;
	  exports.curveMonotoneX = monotoneX;
	  exports.curveMonotoneY = monotoneY;
	  exports.curveNatural = natural;
	  exports.curveStep = step;
	  exports.curveStepAfter = stepAfter;
	  exports.curveStepBefore = stepBefore;
	  exports.stack = stack;
	  exports.stackOffsetExpand = expand;
	  exports.stackOffsetNone = none;
	  exports.stackOffsetSilhouette = silhouette;
	  exports.stackOffsetWiggle = wiggle;
	  exports.stackOrderAscending = ascending;
	  exports.stackOrderDescending = descending$1;
	  exports.stackOrderInsideOut = insideOut;
	  exports.stackOrderNone = none$1;
	  exports.stackOrderReverse = reverse;
	
	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_path = global.d3_path || {})));
	}(this, function (exports) { 'use strict';
	
	  var pi = Math.PI;
	  var tau = 2 * pi;
	  var epsilon = 1e-6;
	  var tauEpsilon = tau - epsilon;
	  function Path() {
	    this._x0 = this._y0 = // start of current subpath
	    this._x1 = this._y1 = null; // end of current subpath
	    this._ = [];
	  }
	
	  function path() {
	    return new Path;
	  }
	
	  Path.prototype = path.prototype = {
	    constructor: Path,
	    moveTo: function(x, y) {
	      this._.push("M", this._x0 = this._x1 = +x, ",", this._y0 = this._y1 = +y);
	    },
	    closePath: function() {
	      if (this._x1 !== null) {
	        this._x1 = this._x0, this._y1 = this._y0;
	        this._.push("Z");
	      }
	    },
	    lineTo: function(x, y) {
	      this._.push("L", this._x1 = +x, ",", this._y1 = +y);
	    },
	    quadraticCurveTo: function(x1, y1, x, y) {
	      this._.push("Q", +x1, ",", +y1, ",", this._x1 = +x, ",", this._y1 = +y);
	    },
	    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	      this._.push("C", +x1, ",", +y1, ",", +x2, ",", +y2, ",", this._x1 = +x, ",", this._y1 = +y);
	    },
	    arcTo: function(x1, y1, x2, y2, r) {
	      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	      var x0 = this._x1,
	          y0 = this._y1,
	          x21 = x2 - x1,
	          y21 = y2 - y1,
	          x01 = x0 - x1,
	          y01 = y0 - y1,
	          l01_2 = x01 * x01 + y01 * y01;
	
	      // Is the radius negative? Error.
	      if (r < 0) throw new Error("negative radius: " + r);
	
	      // Is this path empty? Move to (x1,y1).
	      if (this._x1 === null) {
	        this._.push(
	          "M", this._x1 = x1, ",", this._y1 = y1
	        );
	      }
	
	      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	      else if (!(l01_2 > epsilon));
	
	      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	      // Equivalently, is (x1,y1) coincident with (x2,y2)?
	      // Or, is the radius zero? Line to (x1,y1).
	      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	        this._.push(
	          "L", this._x1 = x1, ",", this._y1 = y1
	        );
	      }
	
	      // Otherwise, draw an arc!
	      else {
	        var x20 = x2 - x0,
	            y20 = y2 - y0,
	            l21_2 = x21 * x21 + y21 * y21,
	            l20_2 = x20 * x20 + y20 * y20,
	            l21 = Math.sqrt(l21_2),
	            l01 = Math.sqrt(l01_2),
	            l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	            t01 = l / l01,
	            t21 = l / l21;
	
	        // If the start tangent is not coincident with (x0,y0), line to.
	        if (Math.abs(t01 - 1) > epsilon) {
	          this._.push(
	            "L", x1 + t01 * x01, ",", y1 + t01 * y01
	          );
	        }
	
	        this._.push(
	          "A", r, ",", r, ",0,0,", +(y01 * x20 > x01 * y20), ",", this._x1 = x1 + t21 * x21, ",", this._y1 = y1 + t21 * y21
	        );
	      }
	    },
	    arc: function(x, y, r, a0, a1, ccw) {
	      x = +x, y = +y, r = +r;
	      var dx = r * Math.cos(a0),
	          dy = r * Math.sin(a0),
	          x0 = x + dx,
	          y0 = y + dy,
	          cw = 1 ^ ccw,
	          da = ccw ? a0 - a1 : a1 - a0;
	
	      // Is the radius negative? Error.
	      if (r < 0) throw new Error("negative radius: " + r);
	
	      // Is this path empty? Move to (x0,y0).
	      if (this._x1 === null) {
	        this._.push(
	          "M", x0, ",", y0
	        );
	      }
	
	      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	        this._.push(
	          "L", x0, ",", y0
	        );
	      }
	
	      // Is this arc empty? We’re done.
	      if (!r) return;
	
	      // Is this a complete circle? Draw two arcs to complete the circle.
	      if (da > tauEpsilon) {
	        this._.push(
	          "A", r, ",", r, ",0,1,", cw, ",", x - dx, ",", y - dy,
	          "A", r, ",", r, ",0,1,", cw, ",", this._x1 = x0, ",", this._y1 = y0
	        );
	      }
	
	      // Otherwise, draw an arc!
	      else {
	        if (da < 0) da = da % tau + tau;
	        this._.push(
	          "A", r, ",", r, ",0,", +(da >= pi), ",", cw, ",", this._x1 = x + r * Math.cos(a1), ",", this._y1 = y + r * Math.sin(a1)
	        );
	      }
	    },
	    rect: function(x, y, w, h) {
	      this._.push("M", this._x0 = this._x1 = +x, ",", this._y0 = this._y1 = +y, "h", +w, "v", +h, "h", -w, "Z");
	    },
	    toString: function() {
	      return this._.join("");
	    }
	  };
	
	  var version = "0.1.5";
	
	  exports.version = version;
	  exports.path = path;
	
	}));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(6),
	    assignInDefaults = __webpack_require__(7),
	    assignInWith = __webpack_require__(9),
	    rest = __webpack_require__(21);
	
	/**
	 * Assigns own and inherited enumerable properties of source objects to the
	 * destination object for all destination properties that resolve to `undefined`.
	 * Source objects are applied from left to right. Once a property is set,
	 * additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var defaults = rest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}
	
	module.exports = assignInDefaults;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(10),
	    createAssigner = __webpack_require__(12),
	    keysIn = __webpack_require__(24);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer` which
	 * is invoked to produce the assigned values. If `customizer` returns `undefined`
	 * assignment is handled by the method instead. The `customizer` is invoked
	 * with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObjectWith(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(11);
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObjectWith;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(13),
	    rest = __webpack_require__(21);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8),
	    isArrayLike = __webpack_require__(14),
	    isIndex = __webpack_require__(20),
	    isObject = __webpack_require__(18);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(15),
	    isFunction = __webpack_require__(17),
	    isLength = __webpack_require__(19);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(16);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(6),
	    toInteger = __webpack_require__(22);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(23);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(17),
	    isObject = __webpack_require__(18);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(25),
	    indexKeys = __webpack_require__(31),
	    isIndex = __webpack_require__(20),
	    isPrototype = __webpack_require__(38);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(26),
	    iteratorToArray = __webpack_require__(30);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(29);
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module), (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	module.exports = iteratorToArray;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(32),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(36),
	    isLength = __webpack_require__(19),
	    isString = __webpack_require__(37);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(34);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(14),
	    isObjectLike = __webpack_require__(35);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(36),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(11),
	    copyObject = __webpack_require__(40),
	    createAssigner = __webpack_require__(12),
	    isArrayLike = __webpack_require__(14),
	    isPrototype = __webpack_require__(38),
	    keys = __webpack_require__(41);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(10);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	module.exports = copyObject;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(42),
	    baseKeys = __webpack_require__(43),
	    indexKeys = __webpack_require__(31),
	    isArrayLike = __webpack_require__(14),
	    isIndex = __webpack_require__(20),
	    isPrototype = __webpack_require__(38);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.exports = baseHas;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(45),
	    basePick = __webpack_require__(47),
	    rest = __webpack_require__(21);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to pick, specified
	 *  individually or in arrays.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = rest(function(object, props) {
	  return object == null ? {} : basePick(object, baseFlatten(props, 1));
	});
	
	module.exports = pick;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(46),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(36),
	    isArrayLikeObject = __webpack_require__(34);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && isArrayLikeObject(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(48);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property names.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return arrayReduce(props, function(result, key) {
	    if (key in object) {
	      result[key] = object[key];
	    }
	    return result;
	  }, {});
	}
	
	module.exports = basePick;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VictoryLabel = exports.VictoryAnimation = exports.Style = exports.PropTypes = exports.Log = exports.Helpers = exports.Collection = undefined;
	
	var _collection = __webpack_require__(50);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	var _helpers = __webpack_require__(51);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _log = __webpack_require__(158);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _style = __webpack_require__(160);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _propTypes = __webpack_require__(165);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _victoryAnimation = __webpack_require__(166);
	
	var _victoryAnimation2 = _interopRequireDefault(_victoryAnimation);
	
	var _victoryLabel = __webpack_require__(172);
	
	var _victoryLabel2 = _interopRequireDefault(_victoryLabel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Collection = _collection2.default;
	exports.Helpers = _helpers2.default;
	exports.Log = _log2.default;
	exports.PropTypes = _propTypes2.default;
	exports.Style = _style2.default;
	exports.VictoryAnimation = _victoryAnimation2.default;
	exports.VictoryLabel = _victoryLabel2.default;

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  isNonEmptyArray: function isNonEmptyArray(collection) {
	    return Array.isArray(collection) && collection.length > 0;
	  },
	  containsStrings: function containsStrings(collection) {
	    return Array.isArray(collection) && collection.some(function (value) {
	      return typeof value === "string";
	    });
	  },
	  containsDates: function containsDates(collection) {
	    return Array.isArray(collection) && collection.some(function (value) {
	      return value instanceof Date;
	    });
	  },
	  containsOnlyStrings: function containsOnlyStrings(collection) {
	    return this.isNonEmptyArray(collection) && collection.every(function (value) {
	      return typeof value === "string";
	    });
	  },
	  isArrayOfArrays: function isArrayOfArrays(collection) {
	    return this.isNonEmptyArray(collection) && collection.every(Array.isArray);
	  },
	  removeUndefined: function removeUndefined(arr) {
	    return arr.filter(function (el) {
	      return el !== undefined;
	    });
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _isFunction = __webpack_require__(17);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _property = __webpack_require__(52);
	
	var _property2 = _interopRequireDefault(_property);
	
	var _partial = __webpack_require__(61);
	
	var _partial2 = _interopRequireDefault(_partial);
	
	var _set = __webpack_require__(97);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _merge = __webpack_require__(99);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports.default = {
	  getPadding: function getPadding(props) {
	    var padding = typeof props.padding === "number" ? props.padding : 0;
	    var paddingObj = _typeof(props.padding) === "object" ? props.padding : {};
	    return {
	      top: paddingObj.top || padding,
	      bottom: paddingObj.bottom || padding,
	      left: paddingObj.left || padding,
	      right: paddingObj.right || padding
	    };
	  },
	  getStyles: function getStyles(style, defaultStyles, height, width) {
	    // eslint-disable-line max-params
	    if (!style) {
	      return (0, _defaults2.default)({ parent: { height: height, width: width } }, defaultStyles);
	    }
	
	    var data = style.data;
	    var labels = style.labels;
	    var parent = style.parent;
	
	    return {
	      parent: (0, _defaults2.default)({ height: height, width: width }, parent, defaultStyles.parent),
	      labels: (0, _defaults2.default)({}, labels, defaultStyles.labels),
	      data: (0, _defaults2.default)({}, data, defaultStyles.data)
	    };
	  },
	  evaluateProp: function evaluateProp(prop, data) {
	    return (0, _isFunction2.default)(prop) ? prop(data) : prop;
	  },
	  evaluateStyle: function evaluateStyle(style, data) {
	    var _this = this;
	
	    if (!Object.keys(style).some(function (value) {
	      return (0, _isFunction2.default)(style[value]);
	    })) {
	      return style;
	    }
	    return Object.keys(style).reduce(function (prev, curr) {
	      prev[curr] = _this.evaluateProp(style[curr], data);
	      return prev;
	    }, {});
	  },
	  getRange: function getRange(props, axis) {
	    // determine how to lay the axis and what direction positive and negative are
	    var horizontal = props.horizontal;
	
	    var isVertical = horizontal && axis === "x" || !horizontal && axis !== "x";
	    var isDependent = horizontal && !isVertical || !horizontal && isVertical;
	    var padding = this.getPadding(props);
	    if (isVertical) {
	      var bottomToTop = [props.height - padding.bottom, padding.top];
	      return isDependent ? bottomToTop : bottomToTop.reverse();
	    }
	    return [padding.left, props.width - padding.right];
	  },
	
	
	  // for components that take single datasets
	  getData: function getData(props) {
	    if (props.data) {
	      return this.formatData(props.data, props);
	    }
	  },
	  formatData: function formatData(dataset, props, stringMap) {
	    if (!dataset) {
	      return [];
	    }
	    stringMap = stringMap || {
	      x: this.createStringMap(props, "x"),
	      y: this.createStringMap(props, "y")
	    };
	    var accessor = {
	      x: this.createAccessor(props.x),
	      y: this.createAccessor(props.y)
	    };
	
	    return dataset.map(function (datum) {
	      var x = accessor.x(datum);
	      var y = accessor.y(datum);
	      var xName = typeof x === "string" ? { xName: x } : undefined;
	      var yName = typeof y === "string" ? { yName: y } : undefined;
	      return (0, _defaults2.default)({
	        // map string data to numeric values, and add names
	        x: typeof x === "string" ? stringMap.x[x] : x,
	        y: typeof y === "string" ? stringMap.y[y] : y
	      }, xName, yName, datum);
	    });
	  },
	  createStringMap: function createStringMap(props, axis) {
	    var stringsFromData = this.getStringsFromData(props, axis);
	    if (stringsFromData.length) {
	      return stringsFromData.reduce(function (acc, string, index) {
	        acc[string] = index + 1;
	        return acc;
	      }, {});
	    }
	    return null;
	  },
	  getStringsFromData: function getStringsFromData(props, axis) {
	    if (!props.data) {
	      return [];
	    }
	    var key = typeof props[axis] === "undefined" ? axis : props[axis];
	    var accessor = this.createAccessor(key);
	    var dataStrings = props.data.map(function (datum) {
	      return accessor(datum);
	    }).filter(function (datum) {
	      return typeof datum === "string";
	    });
	    // return a unique set of strings
	    return dataStrings.reduce(function (prev, curr) {
	      if (typeof curr !== "undefined" && curr !== null && prev.indexOf(curr) === -1) {
	        prev.push(curr);
	      }
	      return prev;
	    }, []);
	  },
	  createAccessor: function createAccessor(key) {
	    // creates a data accessor function
	    // given a property key, path, array index, or null for identity.
	    if ((0, _isFunction2.default)(key)) {
	      return key;
	    } else if (key === null || typeof key === "undefined") {
	      // null/undefined means "return the data item itself"
	      return function (x) {
	        return x;
	      };
	    }
	    // otherwise, assume it is an array index, property key or path (_.property handles all three)
	    return (0, _property2.default)(key);
	  },
	  getPartialEvents: function getPartialEvents(events, index, childProps) {
	    return events ? Object.keys(events).reduce(function (memo, eventName) {
	      /* eslint max-params: 0 */
	      memo[eventName] = (0, _partial2.default)(events[eventName], _partial2.default.placeholder, // evt will still be the first argument for event handlers
	      childProps, // event handlers will have access to data component props, including data
	      index, // used in setting a unique state property
	      eventName // used in setting a unique state property
	      );
	      return memo;
	    }, {}) : {};
	  },
	  getEvents: function getEvents(events, namespace) {
	    var _this2 = this;
	
	    var stateName = namespace + "State";
	    var onEvent = function onEvent(evt, childProps, index, eventName) {
	      if (_this2.props.events[namespace] && _this2.props.events[namespace][eventName]) {
	        _this2.setState(_defineProperty({}, stateName, (0, _merge2.default)({}, _this2.state[stateName], (0, _set2.default)({}, index, _this2.props.events[namespace][eventName](evt, childProps, index)))));
	      }
	    };
	
	    return events ? Object.keys(this.props.events[namespace]).reduce(function (memo, event) {
	      memo[event] = onEvent;
	      return memo;
	    }, {}) : {};
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(16),
	    basePropertyDeep = __webpack_require__(53),
	    isKey = __webpack_require__(60);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(54);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(55),
	    isKey = __webpack_require__(60);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(36),
	    stringToPath = __webpack_require__(56);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = baseCastPath;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(57);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = stringToPath;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58),
	    isSymbol = __webpack_require__(59);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toString;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(36);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}
	
	module.exports = isKey;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(62),
	    getPlaceholder = __webpack_require__(92),
	    replaceHolders = __webpack_require__(94),
	    rest = __webpack_require__(21);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with `partial` arguments prepended
	 * to those provided to the new function. This method is like `_.bind` except
	 * it does **not** alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * var greet = function(greeting, name) {
	 *   return greeting + ' ' + name;
	 * };
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // Partially applied with placeholders.
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = rest(function(func, partials) {
	  var holders = replaceHolders(partials, getPlaceholder(partial));
	  return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partial.placeholder = {};
	
	module.exports = partial;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(63),
	    createBaseWrapper = __webpack_require__(70),
	    createCurryWrapper = __webpack_require__(73),
	    createHybridWrapper = __webpack_require__(74),
	    createPartialWrapper = __webpack_require__(95),
	    getData = __webpack_require__(83),
	    mergeData = __webpack_require__(96),
	    setData = __webpack_require__(90),
	    toInteger = __webpack_require__(22);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;
	
	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;
	
	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func);
	
	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];
	
	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] == null
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);
	
	  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == BIND_FLAG) {
	    var result = createBaseWrapper(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurryWrapper(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartialWrapper(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybridWrapper.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setter(result, newData);
	}
	
	module.exports = createWrapper;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(64),
	    metaMap = __webpack_require__(65);
	
	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};
	
	module.exports = baseSetData;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap = __webpack_require__(66);
	
	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;
	
	module.exports = metaMap;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(67),
	    root = __webpack_require__(27);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(68);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(17),
	    isHostObject = __webpack_require__(69),
	    isObjectLike = __webpack_require__(35);
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var createCtorWrapper = __webpack_require__(71),
	    root = __webpack_require__(27);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBaseWrapper(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}
	
	module.exports = createBaseWrapper;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(72),
	    isObject = __webpack_require__(18);
	
	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtorWrapper(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors.
	    // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);
	
	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}
	
	module.exports = createCtorWrapper;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	
	/** Built-in value references. */
	var objectCreate = Object.create;
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}
	
	module.exports = baseCreate;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(6),
	    createCtorWrapper = __webpack_require__(71),
	    createHybridWrapper = __webpack_require__(74),
	    createRecurryWrapper = __webpack_require__(78),
	    getPlaceholder = __webpack_require__(92),
	    replaceHolders = __webpack_require__(94),
	    root = __webpack_require__(27);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getPlaceholder(wrapper);
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);
	
	    length -= holders.length;
	    if (length < arity) {
	      return createRecurryWrapper(
	        func, bitmask, createHybridWrapper, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createCurryWrapper;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(75),
	    composeArgsRight = __webpack_require__(76),
	    countHolders = __webpack_require__(77),
	    createCtorWrapper = __webpack_require__(71),
	    createRecurryWrapper = __webpack_require__(78),
	    getPlaceholder = __webpack_require__(92),
	    reorder = __webpack_require__(93),
	    replaceHolders = __webpack_require__(94),
	    root = __webpack_require__(27);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    ARY_FLAG = 128,
	    FLIP_FLAG = 512;
	
	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtorWrapper(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        index = length,
	        args = Array(length);
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getPlaceholder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurryWrapper(
	        func, bitmask, createHybridWrapper, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;
	
	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtorWrapper(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}
	
	module.exports = createHybridWrapper;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;
	
	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}
	
	module.exports = composeArgs;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;
	
	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}
	
	module.exports = composeArgsRight;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;
	
	  while (length--) {
	    if (array[length] === placeholder) {
	      result++;
	    }
	  }
	  return result;
	}
	
	module.exports = countHolders;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(79),
	    isLaziable = __webpack_require__(80),
	    setData = __webpack_require__(90);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
	      newArgPos = argPos ? copyArray(argPos) : undefined,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;
	
	  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
	
	  if (!(bitmask & CURRY_BOUND_FLAG)) {
	    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	  }
	  var newData = [
	    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	    newHoldersRight, newArgPos, ary, arity
	  ];
	
	  var result = wrapFunc.apply(undefined, newData);
	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return result;
	}
	
	module.exports = createRecurryWrapper;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = copyArray;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    getData = __webpack_require__(83),
	    getFuncName = __webpack_require__(85),
	    lodash = __webpack_require__(87);
	
	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];
	
	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}
	
	module.exports = isLaziable;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(72),
	    baseLodash = __webpack_require__(82);
	
	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;
	
	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}
	
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;
	
	module.exports = LazyWrapper;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype all chaining wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}
	
	module.exports = baseLodash;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(65),
	    noop = __webpack_require__(84);
	
	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};
	
	module.exports = getData;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(86);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;
	
	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}
	
	module.exports = getFuncName;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};
	
	module.exports = realNames;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    LodashWrapper = __webpack_require__(88),
	    baseLodash = __webpack_require__(82),
	    isArray = __webpack_require__(36),
	    isObjectLike = __webpack_require__(35),
	    wrapperClone = __webpack_require__(89);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chaining. Methods that operate on and return arrays, collections, and
	 * functions can be chained together. Methods that retrieve a single value or
	 * may return a primitive value will automatically end the chain sequence and
	 * return the unwrapped value. Otherwise, the value must be unwrapped with
	 * `_#value`.
	 *
	 * Explicit chaining, which must be unwrapped with `_#value` in all cases,
	 * may be enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	 * fusion is an optimization to merge iteratee calls; this avoids the creation
	 * of intermediate arrays and can greatly reduce the number of iteratee executions.
	 * Sections of a chain sequence qualify for shortcut fusion if the section is
	 * applied to an array of at least two hundred elements and any iteratees
	 * accept only one argument. The heuristic for whether a section qualifies
	 * for shortcut fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatten`, `flattenDeep`, `flattenDepth`, `flip`, `flow`, `flowRight`,
	 * `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`, `intersection`,
	 * `intersectionBy`, `intersectionWith`, `invert`, `invertBy`, `invokeMap`,
	 * `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`,
	 * `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`, `method`,
	 * `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`, `orderBy`,
	 * `over`, `overArgs`, `overEvery`, `overSome`, `partial`, `partialRight`,
	 * `partition`, `pick`, `pickBy`, `plant`, `property`, `propertyOf`, `pull`,
	 * `pullAll`, `pullAllBy`, `pullAllWith`, `pullAt`, `push`, `range`,
	 * `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`, `sampleSize`,
	 * `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
	 * `thru`, `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`,
	 * `transform`, `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`,
	 * `uniqWith`, `unset`, `unshift`, `unzip`, `unzipWith`, `update`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`,
	 * `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `each`, `eachRight`,
	 * `endsWith`, `eq`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	 * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `first`, `floor`,
	 * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	 * `get`, `gt`, `gte`, `has`, `hasIn`, `head`, `identity`, `includes`,
	 * `indexOf`, `inRange`, `invoke`, `isArguments`, `isArray`, `isArrayBuffer`,
	 * `isArrayLike`, `isArrayLikeObject`, `isBoolean`, `isBuffer`, `isDate`,
	 * `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`, `isFinite`,
	 * `isFunction`, `isInteger`, `isLength`, `isMap`, `isMatch`, `isMatchWith`,
	 * `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`,
	 * `isPlainObject`, `isRegExp`, `isSafeInteger`, `isSet`, `isString`,
	 * `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`, `join`, `kebabCase`,
	 * `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`,
	 * `maxBy`, `mean`, `min`, `minBy`, `noConflict`, `noop`, `now`, `pad`,
	 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	 * `sortedLastIndexBy`, `startCase`, `startsWith`, `subtract`, `sum`, `sumBy`,
	 * `template`, `times`, `toInteger`, `toJSON`, `toLength`, `toLower`,
	 * `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`, `trimEnd`,
	 * `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`, `upperFirst`,
	 * `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}
	
	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;
	
	module.exports = lodash;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(72),
	    baseLodash = __webpack_require__(82);
	
	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}
	
	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;
	
	module.exports = LodashWrapper;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    LodashWrapper = __webpack_require__(88),
	    copyArray = __webpack_require__(79);
	
	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}
	
	module.exports = wrapperClone;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(63),
	    now = __webpack_require__(91);
	
	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 150,
	    HOT_SPAN = 16;
	
	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity function
	 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = (function() {
	  var count = 0,
	      lastCalled = 0;
	
	  return function(key, value) {
	    var stamp = now(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return key;
	      }
	    } else {
	      count = 0;
	    }
	    return baseSetData(key, value);
	  };
	}());
	
	module.exports = setData;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = Date.now;
	
	module.exports = now;


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getPlaceholder(func) {
	  var object = func;
	  return object.placeholder;
	}
	
	module.exports = getPlaceholder;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(79),
	    isIndex = __webpack_require__(20);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);
	
	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}
	
	module.exports = reorder;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}
	
	module.exports = replaceHolders;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(6),
	    createCtorWrapper = __webpack_require__(71),
	    root = __webpack_require__(27);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg` and the `partials` prepended to those provided to
	 * the wrapper.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartialWrapper(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	
	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createPartialWrapper;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(75),
	    composeArgsRight = __webpack_require__(76),
	    copyArray = __webpack_require__(79),
	    replaceHolders = __webpack_require__(94);
	
	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	 * modify function arguments, making the order in which they are executed important,
	 * preventing the merging of metadata. However, we make an exception for a safe
	 * combined case where curried functions have `_.ary` and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG);
	
	  var isCombo =
	    ((srcBitmask == ARY_FLAG) && (bitmask == CURRY_FLAG)) ||
	    ((srcBitmask == ARY_FLAG) && (bitmask == REARG_FLAG) && (data[7].length <= source[8])) ||
	    ((srcBitmask == (ARY_FLAG | REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == CURRY_FLAG));
	
	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : copyArray(value);
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : copyArray(source[4]);
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : copyArray(value);
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : copyArray(source[6]);
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = copyArray(value);
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;
	
	  return data;
	}
	
	module.exports = mergeData;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseSet = __webpack_require__(98);
	
	/**
	 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist
	 * it's created. Arrays are created for missing index properties while objects
	 * are created for all other missing properties. Use `_.setWith` to customize
	 * `path` creation.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, 'x[0].y.z', 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */
	function set(object, path, value) {
	  return object == null ? object : baseSet(object, path, value);
	}
	
	module.exports = set;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(11),
	    baseCastPath = __webpack_require__(55),
	    isIndex = __webpack_require__(20),
	    isKey = __webpack_require__(60),
	    isObject = __webpack_require__(18);
	
	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);
	
	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;
	
	  while (nested != null && ++index < length) {
	    var key = path[index];
	    if (isObject(nested)) {
	      var newValue = value;
	      if (index != lastIndex) {
	        var objValue = nested[key];
	        newValue = customizer ? customizer(objValue, key, nested) : undefined;
	        if (newValue === undefined) {
	          newValue = objValue == null
	            ? (isIndex(path[index + 1]) ? [] : {})
	            : objValue;
	        }
	      }
	      assignValue(nested, key, newValue);
	    }
	    nested = nested[key];
	  }
	  return object;
	}
	
	module.exports = baseSet;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(100),
	    createAssigner = __webpack_require__(12);
	
	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable properties of source objects into the destination
	 * object. Source properties that resolve to `undefined` are skipped if a
	 * destination value exists. Array and plain object properties are merged
	 * recursively.Other objects and value types are overridden by assignment.
	 * Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	
	module.exports = merge;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(101),
	    arrayEach = __webpack_require__(126),
	    assignMergeValue = __webpack_require__(127),
	    baseMergeDeep = __webpack_require__(128),
	    isArray = __webpack_require__(36),
	    isObject = __webpack_require__(18),
	    isTypedArray = __webpack_require__(156),
	    keysIn = __webpack_require__(24);
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  var props = (isArray(source) || isTypedArray(source))
	    ? undefined
	    : keysIn(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;
	
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}
	
	module.exports = baseMerge;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(102),
	    stackDelete = __webpack_require__(103),
	    stackGet = __webpack_require__(106),
	    stackHas = __webpack_require__(108),
	    stackSet = __webpack_require__(110);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}
	
	module.exports = stackClear;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(104);
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(105);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	module.exports = assocDelete;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(107);
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocGet(array, key) : data.map.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(105);
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	module.exports = assocGet;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(109);
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocHas(array, key) : data.map.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(105);
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}
	
	module.exports = assocHas;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(111),
	    assocSet = __webpack_require__(124);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;
	
	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(112),
	    mapDelete = __webpack_require__(116),
	    mapGet = __webpack_require__(120),
	    mapHas = __webpack_require__(122),
	    mapSet = __webpack_require__(123);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;
	
	module.exports = MapCache;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(113),
	    Map = __webpack_require__(115);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}
	
	module.exports = mapClear;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(114);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;
	
	module.exports = Hash;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(67),
	    root = __webpack_require__(27);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(115),
	    assocDelete = __webpack_require__(104),
	    hashDelete = __webpack_require__(117),
	    isKeyable = __webpack_require__(119);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}
	
	module.exports = mapDelete;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(118);
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(114);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}
	
	module.exports = isKeyable;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(115),
	    assocGet = __webpack_require__(107),
	    hashGet = __webpack_require__(121),
	    isKeyable = __webpack_require__(119);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}
	
	module.exports = mapGet;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(114);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(115),
	    assocHas = __webpack_require__(109),
	    hashHas = __webpack_require__(118),
	    isKeyable = __webpack_require__(119);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}
	
	module.exports = mapHas;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(115),
	    assocSet = __webpack_require__(124),
	    hashSet = __webpack_require__(125),
	    isKeyable = __webpack_require__(119);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}
	
	module.exports = mapSet;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(105);
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	module.exports = assocSet;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(114);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}
	
	module.exports = hashSet;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);
	
	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (typeof key == 'number' && value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignMergeValue;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(127),
	    baseClone = __webpack_require__(129),
	    copyArray = __webpack_require__(79),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(36),
	    isArrayLikeObject = __webpack_require__(34),
	    isFunction = __webpack_require__(17),
	    isObject = __webpack_require__(18),
	    isPlainObject = __webpack_require__(155),
	    isTypedArray = __webpack_require__(156),
	    toPlainObject = __webpack_require__(157);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	
	  var isCommon = newValue === undefined;
	
	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue, !customizer);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, !customizer);
	      }
	      else {
	        newValue = objValue;
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  stack['delete'](srcValue);
	  assignMergeValue(object, key, newValue);
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(101),
	    arrayEach = __webpack_require__(126),
	    assignValue = __webpack_require__(11),
	    baseAssign = __webpack_require__(130),
	    baseForOwn = __webpack_require__(131),
	    cloneBuffer = __webpack_require__(134),
	    copyArray = __webpack_require__(79),
	    copySymbols = __webpack_require__(135),
	    getTag = __webpack_require__(137),
	    initCloneArray = __webpack_require__(139),
	    initCloneByTag = __webpack_require__(140),
	    initCloneObject = __webpack_require__(152),
	    isArray = __webpack_require__(36),
	    isBuffer = __webpack_require__(153),
	    isHostObject = __webpack_require__(69),
	    isObject = __webpack_require__(18);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[mapTag] = cloneableTags[numberTag] =
	cloneableTags[objectTag] = cloneableTags[regexpTag] =
	cloneableTags[setTag] = cloneableTags[stringTag] =
	cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
	cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
	cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        result = baseAssign(result, value);
	        return isFull ? copySymbols(value, result) : result;
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return (isFull && !isArr) ? copySymbols(value, result) : result;
	}
	
	module.exports = baseClone;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(40),
	    keys = __webpack_require__(41);
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(132),
	    keys = __webpack_require__(41);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(133);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}
	
	module.exports = cloneBuffer;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(40),
	    getSymbols = __webpack_require__(136);
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	module.exports = copySymbols;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};
	
	module.exports = getSymbols;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(115),
	    Set = __webpack_require__(138),
	    WeakMap = __webpack_require__(66);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((Map && getTag(new Map) != mapTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';
	
	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(67),
	    root = __webpack_require__(27);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 139 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(141),
	    cloneMap = __webpack_require__(143),
	    cloneRegExp = __webpack_require__(146),
	    cloneSet = __webpack_require__(147),
	    cloneSymbol = __webpack_require__(150),
	    cloneTypedArray = __webpack_require__(151);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(142);
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	module.exports = cloneArrayBuffer;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(27);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(144),
	    arrayReduce = __webpack_require__(48),
	    mapToArray = __webpack_require__(145);
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  return arrayReduce(mapToArray(map), addMapEntry, new map.constructor);
	}
	
	module.exports = cloneMap;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	module.exports = addMapEntry;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 146 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	module.exports = cloneRegExp;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(148),
	    arrayReduce = __webpack_require__(48),
	    setToArray = __webpack_require__(149);
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  return arrayReduce(setToArray(set), addSetEntry, new set.constructor);
	}
	
	module.exports = cloneSet;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}
	
	module.exports = addSetEntry;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(58);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	module.exports = cloneSymbol;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(141);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.exports = cloneTypedArray;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(72),
	    isPrototype = __webpack_require__(38);
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototypeOf(object))
	    : {};
	}
	
	module.exports = initCloneObject;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var constant = __webpack_require__(154),
	    root = __webpack_require__(27);
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function(value) {
	  return value instanceof Buffer;
	};
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 154 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	
	module.exports = constant;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var isHostObject = __webpack_require__(69),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototypeOf(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(19),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(40),
	    keysIn = __webpack_require__(24);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global console */
	/* eslint-disable no-console */
	
	// TODO: Use "warning" npm module like React is switching to.
	exports.default = {
	  warn: function warn(message) {
	    if (process.env.NODE_ENV !== "production") {
	      if (console && console.warn) {
	        console.warn(message);
	      }
	    }
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(159)))

/***/ },
/* 159 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reduceCssCalc = __webpack_require__(161);
	
	var _reduceCssCalc2 = _interopRequireDefault(_reduceCssCalc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  /**
	   * Given an object with CSS/SVG transform definitions, return the string value
	   * for use with the `transform` CSS property or SVG attribute. Note that we
	   * can't always guarantee the order will match the author's intended order, so
	   * authors should only use the object notation if they know that their transform
	   * is commutative or that there is only one.
	   * @param {Object} obj An object of transform definitions.
	   * @returns {String} The generated transform string.
	   */
	
	  toTransformString: function toTransformString(obj) {
	    if (!obj || typeof obj === "string") {
	      return obj;
	    }
	    var transforms = [];
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = obj[key];
	        transforms.push(key + "(" + value + ")");
	      }
	    }
	    return transforms.join(" ");
	  },
	  calc: function calc(expr, precision) {
	    return (0, _reduceCssCalc2.default)("calc(" + expr + ")", precision);
	  },
	
	
	  /**
	   * Given the name of a color scale, getColorScale will return an array
	   * of 5 hex string values in that color scale. If no 'name' parameter
	   * is given, it will return the Victory default grayscale.
	   * @param {String} name The name of the color scale to return (optional).
	   * @returns {Array} An array of 5 hex string values composing a color scale.
	   */
	  getColorScale: function getColorScale(name) {
	    var scales = {
	      greyscale: ["#7d7d7d", "#5e5e5e", "#969696", "#bdbdbd", "#000000"],
	      qualitative: ["#334D5C", "#45B29D", "#EFC94C", "#E27A3F", "#DF5A49", "#4F7DA1", "#55DBC1", "#EFDA97", "#E2A37F", "#DF948A"],
	      heatmap: ["#428517", "#77D200", "#D6D305", "#EC8E19", "#C92B05"],
	      warm: ["#940031", "#C43343", "#DC5429", "#FF821D", "#FFAF55"],
	      cool: ["#2746B9", "#0B69D4", "#2794DB", "#31BB76", "#60E83B"],
	      red: ["#611310", "#7D1D1D", "#B02928", "#B02928", "#D86B67"],
	      blue: ["#002C61", "#004B8F", "#006BC9", "#3795E5", "#65B4F4"],
	      green: ["#354722", "#466631", "#649146", "#8AB25C", "#A9C97E"]
	    };
	    return name ? scales[name] : scales.greyscale;
	  }
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	var balanced = __webpack_require__(162)
	var reduceFunctionCall = __webpack_require__(163)
	
	/**
	 * Constantes
	 */
	var MAX_STACK = 100 // should be enough for a single calc()...
	var NESTED_CALC_RE = /(\+|\-|\*|\\|[^a-z]|)(\s*)(\()/g
	
	/**
	 * Global variables
	 */
	var stack
	
	/**
	 * Expose reduceCSSCalc plugin
	 *
	 * @type {Function}
	 */
	module.exports = reduceCSSCalc
	
	/**
	 * Reduce CSS calc() in a string, whenever it's possible
	 *
	 * @param {String} value css input
	 */
	function reduceCSSCalc(value, decimalPrecision) {
	  stack = 0
	  decimalPrecision = Math.pow(10, decimalPrecision === undefined ? 5 : decimalPrecision)
	
	  /**
	   * Evaluates an expression
	   *
	   * @param {String} expression
	   * @returns {String}
	   */
	  function evaluateExpression (expression, functionIdentifier, call) {
	    if (stack++ > MAX_STACK) {
	      stack = 0
	      throw new Error("Call stack overflow for " + call)
	    }
	
	    if (expression === "") {
	      throw new Error(functionIdentifier + "(): '" + call + "' must contain a non-whitespace string")
	    }
	
	    expression = evaluateNestedExpression(expression, call)
	
	    var units = getUnitsInExpression(expression)
	
	    // If multiple units let the expression be (i.e. browser calc())
	    if (units.length > 1) {
	      return functionIdentifier + "(" + expression + ")"
	    }
	
	    var unit = units[0] || ""
	
	    if (unit === "%") {
	      // Convert percentages to numbers, to handle expressions like: 50% * 50% (will become: 25%):
	      expression = expression.replace(/\b[0-9\.]+%/g, function(percent) {
	        return parseFloat(percent.slice(0, -1)) * 0.01
	      })
	    }
	
	    // Remove units in expression:
	    var toEvaluate = expression.replace(new RegExp(unit, "gi"), "")
	    var result
	
	    try {
	      result = eval(toEvaluate)
	    }
	    catch (e) {
	      return functionIdentifier + "(" + expression + ")"
	    }
	
	    // Transform back to a percentage result:
	    if (unit === "%") {
	      result *= 100
	    }
	
	    // adjust rounding shit
	    // (0.1 * 0.2 === 0.020000000000000004)
	    result = Math.round(result * decimalPrecision) / decimalPrecision
	
	    // We don't need units for zero values...
	    if (result !== 0) {
	      result += unit
	    }
	
	    return result
	  }
	
	  /**
	   * Evaluates nested expressions
	   *
	   * @param {String} expression
	   * @returns {String}
	   */
	  function evaluateNestedExpression(expression, call) {
	    var evaluatedPart = ""
	    var nonEvaluatedPart = expression
	    var matches
	    while ((matches = NESTED_CALC_RE.exec(nonEvaluatedPart))) {
	      if (matches[0].index > 0) {
	        evaluatedPart += nonEvaluatedPart.substring(0, matches[0].index)
	      }
	
	      var balancedExpr = balanced("(", ")", nonEvaluatedPart.substring([0].index))
	      if (balancedExpr.body === "") {
	        throw new Error("'" + expression + "' must contain a non-whitespace string")
	      }
	
	      var evaluated = evaluateExpression(balancedExpr.body, "", call)
	
	      evaluatedPart += balancedExpr.pre + evaluated
	      nonEvaluatedPart = balancedExpr.post
	    }
	
	    return evaluatedPart + nonEvaluatedPart
	  }
	
	  return reduceFunctionCall(value, /((?:\-[a-z]+\-)?calc)\(/, evaluateExpression)
	}
	
	/**
	 * Checks what units are used in an expression
	 *
	 * @param {String} expression
	 * @returns {Array}
	 */
	
	function getUnitsInExpression(expression) {
	  var uniqueUnits = []
	  var uniqueLowerCaseUnits = []
	  var unitRegEx = /[\.0-9]([%a-z]+)/gi
	  var matches = unitRegEx.exec(expression)
	
	  while (matches) {
	    if (!matches || !matches[1]) {
	      continue
	    }
	
	    if (uniqueLowerCaseUnits.indexOf(matches[1].toLowerCase()) === -1) {
	      uniqueUnits.push(matches[1])
	      uniqueLowerCaseUnits.push(matches[1].toLowerCase())
	    }
	
	    matches = unitRegEx.exec(expression)
	  }
	
	  return uniqueUnits
	}


/***/ },
/* 162 */
/***/ function(module, exports) {

	module.exports = function(a, b, str) {
	  var bal = 0;
	  var m = {};
	
	  for (var i = 0; i < str.length; i++) {
	    if (a == str.substr(i, a.length)) {
	      if (!('start' in m)) m.start = i;
	      bal++;
	    }
	    else if (b == str.substr(i, b.length) && 'start' in m) {
	      bal--;
	      if (!bal) {
	        m.end = i;
	        m.pre = str.substr(0, m.start);
	        m.body = (m.end - m.start > 1)
	          ? str.substring(m.start + a.length, m.end)
	          : '';
	        m.post = str.slice(m.end + b.length);
	        return m;
	      }
	    }
	  }
	};
	


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Module dependencies
	 */
	var balanced = __webpack_require__(164)
	
	/**
	 * Expose `reduceFunctionCall`
	 *
	 * @type {Function}
	 */
	module.exports = reduceFunctionCall
	
	/**
	 * Walkthrough all expressions, evaluate them and insert them into the declaration
	 *
	 * @param {Array} expressions
	 * @param {Object} declaration
	 */
	
	function reduceFunctionCall(string, functionRE, callback) {
	  var call = string
	  return getFunctionCalls(string, functionRE).reduce(function(string, obj) {
	    return string.replace(obj.functionIdentifier + "(" + obj.matches.body + ")", evalFunctionCall(obj.matches.body, obj.functionIdentifier, callback, call, functionRE))
	  }, string)
	}
	
	/**
	 * Parses expressions in a value
	 *
	 * @param {String} value
	 * @returns {Array}
	 * @api private
	 */
	
	function getFunctionCalls(call, functionRE) {
	  var expressions = []
	
	  var fnRE = typeof functionRE === "string" ? new RegExp("\\b(" + functionRE + ")\\(") : functionRE
	  do {
	    var searchMatch = fnRE.exec(call)
	    if (!searchMatch) {
	      return expressions
	    }
	    if (searchMatch[1] === undefined) {
	      throw new Error("Missing the first couple of parenthesis to get the function identifier in " + functionRE)
	    }
	    var fn = searchMatch[1]
	    var startIndex = searchMatch.index
	    var matches = balanced("(", ")", call.substring(startIndex))
	
	    if (!matches) {
	      throw new SyntaxError(fn + "(): missing closing ')' in the value '" + call + "'")
	    }
	
	    expressions.push({matches: matches, functionIdentifier: fn})
	    call = matches.post
	  }
	  while (fnRE.test(call))
	
	  return expressions
	}
	
	/**
	 * Evaluates an expression
	 *
	 * @param {String} expression
	 * @returns {String}
	 * @api private
	 */
	
	function evalFunctionCall (string, functionIdentifier, callback, call, functionRE) {
	  // allow recursivity
	  return callback(reduceFunctionCall(string, functionRE, callback), functionIdentifier, call)
	}


/***/ },
/* 164 */
/***/ function(module, exports) {

	module.exports = function(a, b, str) {
	  var bal = 0;
	  var m = {};
	
	  for (var i = 0; i < str.length; i++) {
	    if (a == str.substr(i, a.length)) {
	      if (!('start' in m)) m.start = i;
	      bal++;
	    }
	    else if (b == str.substr(i, b.length) && 'start' in m) {
	      bal--;
	      if (!bal) {
	        m.end = i;
	        m.pre = str.substr(0, m.start);
	        m.body = (m.end - m.start > 1)
	          ? str.substring(m.start + a.length, m.end)
	          : '';
	        m.post = str.slice(m.end + b.length);
	        return m;
	      }
	    }
	  }
	};
	


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction = __webpack_require__(17);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _react = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Return a new validator based on `validator` but with the option to chain
	 * `isRequired` onto the validation. This is nearly identical to how React
	 * does it internally, but they don't expose their helper for us to use.
	 * @param {Function} validator Validation function.
	 * @returns {Function} Validator with `isRequired` option.
	 */
	/* global console */
	var makeChainable = function makeChainable(validator) {
	  /* eslint-disable max-params */
	  var _chainable = function _chainable(isRequired, props, propName, componentName) {
	    var value = props[propName];
	    if (typeof value === "undefined" || value === null) {
	      if (isRequired) {
	        return new Error("Required `" + propName + "` was not specified in `" + componentName + "`.");
	      }
	      return null;
	    }
	    return validator(props, propName, componentName);
	  };
	  var chainable = _chainable.bind(null, false);
	  chainable.isRequired = _chainable.bind(null, true);
	  return chainable;
	};
	
	var nullConstructor = function nullConstructor() {
	  return null;
	};
	var undefinedConstructor = function undefinedConstructor() {
	  return undefined;
	};
	
	/**
	 * Get the constructor of `value`. If `value` is null or undefined, return the
	 * special singletons `nullConstructor` or `undefinedConstructor`, respectively.
	 * @param {*} value Instance to return the constructor of.
	 * @returns {Function} Constructor of `value`.
	 */
	var getConstructor = function getConstructor(value) {
	  if (typeof value === "undefined") {
	    return undefinedConstructor;
	  } else if (value === null) {
	    return nullConstructor;
	  } else {
	    return value.constructor;
	  }
	};
	
	/**
	 * Get the name of the constructor used to create `value`, using
	 * `Object.protoype.toString`. If the value is null or undefined, return
	 * "null" or "undefined", respectively.
	 * @param {*} value Instance to return the constructor name of.
	 * @returns {String} Name of the constructor.
	 */
	var getConstructorName = function getConstructorName(value) {
	  if (typeof value === "undefined") {
	    return "undefined";
	  } else if (value === null) {
	    return "null";
	  }
	  return Object.prototype.toString.call(value).slice(8, -1);
	};
	
	exports.default = {
	  /**
	   * Return a new validator based on `propType` but which logs a `console.error`
	   * with `explanation` if used.
	   * @param {Function} propType The old, deprecated propType.
	   * @param {String} explanation The message to provide the user of the deprecated propType.
	   * @returns {Function} Validator which logs usage of this propType
	   */
	
	  deprecated: function deprecated(propType, explanation) {
	    return function (props, propName, componentName) {
	      if (process.env.NODE_ENV !== "production") {
	        /* eslint-disable no-console */
	        if (typeof console !== "undefined" && console.error) {
	          if (props[propName] !== null) {
	            console.error(false, "\"" + propName + "\" property of \"" + componentName + "\" has been deprecated " + explanation);
	          }
	        }
	        /* eslint-enable no-console */
	      }
	      return propType(props, propName, componentName);
	    };
	  },
	
	
	  /**
	   * Return a new validator which returns true
	   * if and only if all validators passed as arguments return true.
	   * Like React.propTypes.oneOfType, except "all" instead of "any"
	   * @param {Array} validators Validation functions.
	   * @returns {Function} Combined validator function
	   */
	  allOfType: function allOfType(validators) {
	    return makeChainable(function (props, propName, componentName) {
	      var error = validators.reduce(function (result, validator) {
	        return result || validator(props, propName, componentName);
	      }, undefined);
	      if (error) {
	        return error;
	      }
	    });
	  },
	
	
	  /**
	   * Check that the value is a non-negative number.
	   */
	  nonNegative: makeChainable(function (props, propName, componentName) {
	    var error = _react.PropTypes.number(props, propName, componentName);
	    if (error) {
	      return error;
	    }
	    var value = props[propName];
	    if (value < 0) {
	      return new Error("`" + propName + "` in `" + componentName + "` must be non-negative.");
	    }
	  }),
	
	  /**
	   * Check that the value is an integer.
	   */
	  integer: makeChainable(function (props, propName, componentName) {
	    var error = _react.PropTypes.number(props, propName, componentName);
	    if (error) {
	      return error;
	    }
	    var value = props[propName];
	    if (value % 1 !== 0) {
	      return new Error("`" + propName + "` in `" + componentName + "` must be an integer.");
	    }
	  }),
	
	  /**
	   * Check that the value is an Array of two unique values.
	   */
	  domain: makeChainable(function (props, propName, componentName) {
	    var error = _react.PropTypes.array(props, propName, componentName);
	    if (error) {
	      return error;
	    }
	    var value = props[propName];
	    if (value.length !== 2 || value[1] === value[0]) {
	      return new Error("`" + propName + "` in `" + componentName + "` must be an array of two unique numeric values.");
	    }
	  }),
	
	  /**
	   * Check that the value looks like a d3 `scale` function.
	   */
	  scale: makeChainable(function (props, propName, componentName) {
	    var supportedScaleStrings = ["linear", "time", "log", "sqrt"];
	    var validScale = function validScale(scl) {
	      if ((0, _isFunction2.default)(scl)) {
	        return (0, _isFunction2.default)(scl.copy) && (0, _isFunction2.default)(scl.domain) && (0, _isFunction2.default)(scl.range);
	      } else if (typeof scl === "string") {
	        return supportedScaleStrings.indexOf(scl) !== -1;
	      }
	      return false;
	    };
	
	    var value = props[propName];
	    if (!validScale(value)) {
	      return new Error("`" + propName + "` in `" + componentName + "` must be a d3 scale.");
	    }
	  }),
	
	  /**
	   * Check that an array contains items of the same type.
	   */
	  homogeneousArray: makeChainable(function (props, propName, componentName) {
	    var error = _react.PropTypes.array(props, propName, componentName);
	    if (error) {
	      return error;
	    }
	    var value = props[propName];
	    if (value.length > 1) {
	      var _constructor = getConstructor(value[0]);
	      for (var i = 1; i < value.length; i++) {
	        var otherConstructor = getConstructor(value[i]);
	        if (_constructor !== otherConstructor) {
	          var constructorName = getConstructorName(value[0]);
	          var otherConstructorName = getConstructorName(value[i]);
	          return new Error("Expected `" + propName + "` in `" + componentName + "` to be a " + ("homogeneous array, but found types `" + constructorName + "` and ") + ("`" + otherConstructorName + "`."));
	        }
	      }
	    }
	  }),
	
	  /**
	   * Check that array prop length matches props.data.length
	   */
	  matchDataLength: makeChainable(function (props, propName) {
	    if (props[propName] && Array.isArray(props[propName]) && props[propName].length !== props.data.length) {
	      return new Error("Length of data and " + propName + " arrays must match.");
	    }
	  })
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(159)))

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Ease = __webpack_require__(167);
	
	var _d3Ease2 = _interopRequireDefault(_d3Ease);
	
	var _d3Interpolate = __webpack_require__(168);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
	var _d3Timer = __webpack_require__(170);
	
	var _util = __webpack_require__(171);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	(0, _util.addVictoryInterpolator)();
	
	var VictoryAnimation = function (_React$Component) {
	  _inherits(VictoryAnimation, _React$Component);
	
	  function VictoryAnimation(props) {
	    _classCallCheck(this, VictoryAnimation);
	
	    /* defaults */
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryAnimation).call(this, props));
	
	    _this.state = Array.isArray(_this.props.data) ? _this.props.data[0] : _this.props.data;
	    _this.interpolator = null;
	    _this.queue = Array.isArray(_this.props.data) ? _this.props.data.slice(1) : [];
	    /* build easing function */
	    _this.ease = _d3Ease2.default[_this.props.easing];
	    /*
	      unlike React.createClass({}), there is no autobinding of this in ES6 classes
	      so we bind functionToBeRunEachFrame to current instance of victory animation class
	    */
	    _this.functionToBeRunEachFrame = _this.functionToBeRunEachFrame.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryAnimation, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      // Length check prevents us from triggering `onEnd` in `traverseQueue`.
	      if (this.queue.length) {
	        this.traverseQueue();
	      }
	    }
	    /* lifecycle */
	
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      /* cancel existing loop if it exists */
	      if (this.timer) {
	        this.timer.stop();
	      }
	      /* If an object was supplied */
	      if (!Array.isArray(nextProps.data)) {
	        // Replace the tween queue. Could set `this.queue = [nextProps.data]`,
	        // but let's reuse the same array.
	        this.queue.length = 0;
	        this.queue.push(nextProps.data);
	        /* If an array was supplied */
	      } else {
	          var _queue;
	
	          /* Extend the tween queue */
	          (_queue = this.queue).push.apply(_queue, _toConsumableArray(nextProps.data));
	        }
	      /* Start traversing the tween queue */
	      this.traverseQueue();
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (this.timer) {
	        this.timer.stop();
	      }
	    }
	    /* Traverse the tween queue */
	
	  }, {
	    key: "traverseQueue",
	    value: function traverseQueue() {
	      if (this.queue.length) {
	        /* Get the next index */
	        var data = this.queue[0];
	        /* compare cached version to next props */
	        this.interpolator = _d3Interpolate2.default.value(this.state, data);
	        /* reset step to zero */
	        this.timer = (0, _d3Timer.timer)(this.functionToBeRunEachFrame, this.props.delay);
	      } else if (this.props.onEnd) {
	        this.props.onEnd();
	      }
	    }
	    /* every frame we... */
	
	  }, {
	    key: "functionToBeRunEachFrame",
	    value: function functionToBeRunEachFrame(elapsed) {
	      /*
	        step can generate imprecise values, sometimes greater than 1
	        if this happens set the state to 1 and return, cancelling the timer
	      */
	      var step = elapsed / this.props.duration;
	
	      if (step >= 1) {
	        this.setState(this.interpolator(1));
	        this.timer.stop();
	        this.queue.shift();
	        this.traverseQueue(); // Will take care of calling `onEnd`.
	        return;
	      }
	      /*
	        if we're not at the end of the timer, set the state by passing
	        current step value that's transformed by the ease function to the
	        interpolator, which is cached for performance whenever props are received
	      */
	      this.setState(this.interpolator(this.ease(step)));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children(this.state);
	    }
	  }]);
	
	  return VictoryAnimation;
	}(_react2.default.Component);
	
	VictoryAnimation.propTypes = {
	  /**
	   * The child of should be a function that takes an object of tweened values
	   * and returns a component to render.
	   */
	  children: _react2.default.PropTypes.func,
	  /**
	   * The number of milliseconds the animation should take to complete.
	   */
	  duration: _react2.default.PropTypes.number,
	  /**
	   * The easing prop specifies an easing function name to use for tweening.
	   */
	  easing: _react2.default.PropTypes.oneOf(["back", "backIn", "backOut", "backInOut", "bounce", "bounceIn", "bounceOut", "bounceInOut", "circle", "circleIn", "circleOut", "circleInOut", "linear", "linearIn", "linearOut", "linearInOut", "cubic", "cubicIn", "cubicOut", "cubicInOut", "elastic", "elasticIn", "elasticOut", "elasticInOut", "exp", "expIn", "expOut", "expInOut", "poly", "polyIn", "polyOut", "polyInOut", "quad", "quadIn", "quadOut", "quadInOut", "sin", "sinIn", "sinOut", "sinInOut"]),
	  /**
	   * The delay prop specifies a delay in milliseconds before the animation
	   * begins. If multiple values are in the animation queue, it is the delay
	   * between each animation.
	   */
	  delay: _react2.default.PropTypes.number,
	  /**
	   * The onEnd prop specifies a function to run when the animation ends. If
	   * multiple animations are in the queue, it is called after the last
	   * animation.
	   */
	  onEnd: _react2.default.PropTypes.func,
	  /**
	   * The data prop specifies the latest set of values to tween to. When this
	   * prop changes, VictoryAnimation will begin animating from the current
	   * value to the new value.
	   */
	  data: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array])
	};
	VictoryAnimation.defaultProps = {
	  /* length of animation */
	  duration: 1000,
	  /* easing modifies step each frame */
	  easing: "quadInOut",
	  /* delay between transitions */
	  delay: 0,
	  /* we got nothin' */
	  data: {}
	};
	exports.default = VictoryAnimation;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-ease', ['exports'], factory) :
	  factory((global.d3_ease = {}));
	}(this, function (exports) { 'use strict';
	
	  var slice = Array.prototype.slice;
	
	  function curry1(type, a) {
	    return function(t) {
	      return type(t, a);
	    };
	  }
	
	  function curry2(type, a, b) {
	    return function(t) {
	      return type(t, a, b);
	    };
	  }
	
	  function curryN(type, args) {
	    args = slice.call(args);
	    args[0] = null;
	    return function(t) {
	      args[0] = t;
	      return type.apply(null, args);
	    };
	  }
	
	  function bind(type, a, b) {
	    switch (arguments.length) {
	      case 1: return type;
	      case 2: return curry1(type, a);
	      case 3: return curry2(type, a, b);
	      default: return curryN(type, arguments);
	    }
	  };
	
	  function linearIn(t) {
	    return +t;
	  };
	
	  function quadIn(t) {
	    return t * t;
	  };
	
	  function quadOut(t) {
	    return t * (2 - t);
	  };
	
	  function quadInOut(t) {
	    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	  };
	
	  function cubicIn(t) {
	    return t * t * t;
	  };
	
	  function cubicOut(t) {
	    return --t * t * t + 1;
	  };
	
	  function cubicInOut(t) {
	    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	  };
	
	  function polyIn(t, e) {
	    if (e == null) e = 3;
	    return Math.pow(t, e);
	  };
	
	  function polyOut(t, e) {
	    if (e == null) e = 3;
	    return 1 - Math.pow(1 - t, e);
	  };
	
	  function polyInOut(t, e) {
	    if (e == null) e = 3;
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  };
	
	  var pi = Math.PI;
	  var halfPi = pi / 2;
	  function sinIn(t) {
	    return 1 - Math.cos(t * halfPi);
	  };
	
	  function sinOut(t) {
	    return Math.sin(t * halfPi);
	  };
	
	  function sinInOut(t) {
	    return (1 - Math.cos(pi * t)) / 2;
	  };
	
	  function expIn(t) {
	    return Math.pow(2, 10 * t - 10);
	  };
	
	  function expOut(t) {
	    return 1 - Math.pow(2, -10 * t);
	  };
	
	  function expInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	  };
	
	  function circleIn(t) {
	    return 1 - Math.sqrt(1 - t * t);
	  };
	
	  function circleOut(t) {
	    return Math.sqrt(1 - --t * t);
	  };
	
	  function circleInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	  };
	
	  var b1 = 4 / 11;
	  var b2 = 6 / 11;
	  var b3 = 8 / 11;
	  var b4 = 3 / 4;
	  var b5 = 9 / 11;
	  var b6 = 10 / 11;
	  var b7 = 15 / 16;
	  var b8 = 21 / 22;
	  var b9 = 63 / 64;
	  var b0 = 1 / b1 / b1;
	  function bounceIn(t) {
	    return 1 - bounceOut(1 - t);
	  };
	
	  function bounceOut(t) {
	    return t < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	  };
	
	  function bounceInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	  };
	
	  function backIn(t, s) {
	    s = s == null ? 1.70158 : +s;
	    return t * t * ((s + 1) * t - s);
	  };
	
	  function backOut(t, s) {
	    s = s == null ? 1.70158 : +s;
	    return --t * t * ((s + 1) * t + s) + 1;
	  };
	
	  function backInOut(t, s) {
	    s = s == null ? 1.70158 : +s;
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  };
	
	  var tau = 2 * Math.PI;
	
	  function elasticIn(t, a, p) {
	    a = a == null ? 1 : Math.max(1, a);
	    p = (p == null ? 0.3 : p) / tau;
	    return a * Math.pow(2, 10 * --t) * Math.sin((p * Math.asin(1 / a) - t) / p);
	  };
	
	  function elasticOut(t, a, p) {
	    a = a == null ? 1 : Math.max(1, a);
	    p = (p == null ? 0.3 : p) / tau;
	    return 1 - a * Math.pow(2, -10 * t) * Math.sin((+t + p * Math.asin(1 / a)) / p);
	  };
	
	  function elasticInOut(t, a, p) {
	    a = a == null ? 1 : Math.max(1, a);
	    p = (p == null ? 0.3 : p) / tau;
	    var s = p * Math.asin(1 / a);
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  };
	
	  var version = "0.3.1";
	
	  exports.version = version;
	  exports.bind = bind;
	  exports.linear = linearIn;
	  exports.linearIn = linearIn;
	  exports.linearOut = linearIn;
	  exports.linearInOut = linearIn;
	  exports.quad = quadIn;
	  exports.quadIn = quadIn;
	  exports.quadOut = quadOut;
	  exports.quadInOut = quadInOut;
	  exports.cubic = cubicIn;
	  exports.cubicIn = cubicIn;
	  exports.cubicOut = cubicOut;
	  exports.cubicInOut = cubicInOut;
	  exports.poly = polyIn;
	  exports.polyIn = polyIn;
	  exports.polyOut = polyOut;
	  exports.polyInOut = polyInOut;
	  exports.sin = sinIn;
	  exports.sinIn = sinIn;
	  exports.sinOut = sinOut;
	  exports.sinInOut = sinInOut;
	  exports.exp = expIn;
	  exports.expIn = expIn;
	  exports.expOut = expOut;
	  exports.expInOut = expInOut;
	  exports.circle = circleIn;
	  exports.circleIn = circleIn;
	  exports.circleOut = circleOut;
	  exports.circleInOut = circleInOut;
	  exports.bounce = bounceIn;
	  exports.bounceIn = bounceIn;
	  exports.bounceOut = bounceOut;
	  exports.bounceInOut = bounceInOut;
	  exports.back = backIn;
	  exports.backIn = backIn;
	  exports.backOut = backOut;
	  exports.backInOut = backInOut;
	  exports.elastic = elasticIn;
	  exports.elasticIn = elasticIn;
	  exports.elasticOut = elasticOut;
	  exports.elasticInOut = elasticInOut;
	
	}));

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(169)) :
	  typeof define === 'function' && define.amd ? define('d3-interpolate', ['exports', 'd3-color'], factory) :
	  factory((global.d3_interpolate = {}),global.d3_color);
	}(this, function (exports,d3Color) { 'use strict';
	
	  function deltaHue(h1, h0) {
	    var delta = h1 - h0;
	    return delta > 180 || delta < -180
	        ? delta - 360 * Math.round(delta / 360)
	        : delta;
	  };
	
	  function cubehelixGamma(gamma) {
	    return function(a, b) {
	      a = d3Color.cubehelix(a);
	      b = d3Color.cubehelix(b);
	      var ah = isNaN(a.h) ? b.h : a.h,
	          as = isNaN(a.s) ? b.s : a.s,
	          al = a.l,
	          bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	          bs = isNaN(b.s) ? 0 : b.s - as,
	          bl = b.l - al;
	      return function(t) {
	        a.h = ah + bh * t;
	        a.s = as + bs * t;
	        a.l = al + bl * Math.pow(t, gamma);
	        return a + "";
	      };
	    };
	  };
	
	  function cubehelixGammaLong(gamma) {
	    return function(a, b) {
	      a = d3Color.cubehelix(a);
	      b = d3Color.cubehelix(b);
	      var ah = isNaN(a.h) ? b.h : a.h,
	          as = isNaN(a.s) ? b.s : a.s,
	          al = a.l,
	          bh = isNaN(b.h) ? 0 : b.h - ah,
	          bs = isNaN(b.s) ? 0 : b.s - as,
	          bl = b.l - al;
	      return function(t) {
	        a.h = ah + bh * t;
	        a.s = as + bs * t;
	        a.l = al + bl * Math.pow(t, gamma);
	        return a + "";
	      };
	    };
	  };
	
	  function rgb(a, b) {
	    a = d3Color.rgb(a);
	    b = d3Color.rgb(b);
	    var ar = a.r,
	        ag = a.g,
	        ab = a.b,
	        br = b.r - ar,
	        bg = b.g - ag,
	        bb = b.b - ab;
	    return function(t) {
	      a.r = ar + br * t;
	      a.g = ag + bg * t;
	      a.b = ab + bb * t;
	      return a + "";
	    };
	  };
	
	  function number(a, b) {
	    return a = +a, b -= a, function(t) {
	      return a + b * t;
	    };
	  };
	
	  function object(a, b) {
	    var i = {},
	        c = {},
	        k;
	
	    for (k in a) {
	      if (k in b) {
	        i[k] = value(a[k], b[k]);
	      } else {
	        c[k] = a[k];
	      }
	    }
	
	    for (k in b) {
	      if (!(k in a)) {
	        c[k] = b[k];
	      }
	    }
	
	    return function(t) {
	      for (k in i) c[k] = i[k](t);
	      return c;
	    };
	  };
	
	  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	  var reB = new RegExp(reA.source, "g");
	  function zero(b) {
	    return function() {
	      return b;
	    };
	  }
	
	  function one(b) {
	    return function(t) {
	      return b(t) + "";
	    };
	  }
	
	  function string(a, b) {
	    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	        am, // current match in a
	        bm, // current match in b
	        bs, // string preceding current number in b, if any
	        i = -1, // index in s
	        s = [], // string constants and placeholders
	        q = []; // number interpolators
	
	    // Coerce inputs to strings.
	    a = a + "", b = b + "";
	
	    // Interpolate pairs of numbers in a & b.
	    while ((am = reA.exec(a))
	        && (bm = reB.exec(b))) {
	      if ((bs = bm.index) > bi) { // a string precedes the next number in b
	        bs = b.slice(bi, bs);
	        if (s[i]) s[i] += bs; // coalesce with previous string
	        else s[++i] = bs;
	      }
	      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	        if (s[i]) s[i] += bm; // coalesce with previous string
	        else s[++i] = bm;
	      } else { // interpolate non-matching numbers
	        s[++i] = null;
	        q.push({i: i, x: number(am, bm)});
	      }
	      bi = reB.lastIndex;
	    }
	
	    // Add remains of b.
	    if (bi < b.length) {
	      bs = b.slice(bi);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	
	    // Special optimization for only a single match.
	    // Otherwise, interpolate each of the numbers and rejoin the string.
	    return s.length < 2 ? (q[0]
	        ? one(q[0].x)
	        : zero(b))
	        : (b = q.length, function(t) {
	            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	            return s.join("");
	          });
	  };
	
	  var values = [
	    function(a, b) {
	      var t = typeof b, c;
	      return (t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb) : string)
	          : b instanceof d3Color.color ? rgb
	          : Array.isArray(b) ? array
	          : t === "object" && isNaN(b) ? object
	          : number)(a, b);
	    }
	  ];
	
	  function value(a, b) {
	    var i = values.length, f;
	    while (--i >= 0 && !(f = values[i](a, b)));
	    return f;
	  };
	
	  // TODO sparse arrays?
	  function array(a, b) {
	    var x = [],
	        c = [],
	        na = a.length,
	        nb = b.length,
	        n0 = Math.min(a.length, b.length),
	        i;
	
	    for (i = 0; i < n0; ++i) x.push(value(a[i], b[i]));
	    for (; i < na; ++i) c[i] = a[i];
	    for (; i < nb; ++i) c[i] = b[i];
	
	    return function(t) {
	      for (i = 0; i < n0; ++i) c[i] = x[i](t);
	      return c;
	    };
	  };
	
	  function round(a, b) {
	    return a = +a, b -= a, function(t) {
	      return Math.round(a + b * t);
	    };
	  };
	
	  var rad2deg = 180 / Math.PI;
	  var identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
	  var g;
	  // Compute x-scale and normalize the first row.
	  // Compute shear and make second row orthogonal to first.
	  // Compute y-scale and normalize the second row.
	  // Finally, compute the rotation.
	  function Transform(string) {
	    if (!g) g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	    if (string) g.setAttribute("transform", string), t = g.transform.baseVal.consolidate();
	
	    var t,
	        m = t ? t.matrix : identity,
	        r0 = [m.a, m.b],
	        r1 = [m.c, m.d],
	        kx = normalize(r0),
	        kz = dot(r0, r1),
	        ky = normalize(combine(r1, r0, -kz)) || 0;
	
	    if (r0[0] * r1[1] < r1[0] * r0[1]) {
	      r0[0] *= -1;
	      r0[1] *= -1;
	      kx *= -1;
	      kz *= -1;
	    }
	
	    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * rad2deg;
	    this.translate = [m.e, m.f];
	    this.scale = [kx, ky];
	    this.skew = ky ? Math.atan2(kz, ky) * rad2deg : 0;
	  }
	
	  function dot(a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	  }
	
	  function normalize(a) {
	    var k = Math.sqrt(dot(a, a));
	    if (k) a[0] /= k, a[1] /= k;
	    return k;
	  }
	
	  function combine(a, b, k) {
	    a[0] += k * b[0];
	    a[1] += k * b[1];
	    return a;
	  }
	
	  function pop(s) {
	    return s.length ? s.pop() + "," : "";
	  }
	
	  function translate(ta, tb, s, q) {
	    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
	      var i = s.push("translate(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(ta[0], tb[0])}, {i: i - 2, x: number(ta[1], tb[1])});
	    } else if (tb[0] || tb[1]) {
	      s.push("translate(" + tb + ")");
	    }
	  }
	
	  function rotate(ra, rb, s, q) {
	    if (ra !== rb) {
	      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, ")") - 2, x: number(ra, rb)});
	    } else if (rb) {
	      s.push(pop(s) + "rotate(" + rb + ")");
	    }
	  }
	
	  function skew(wa, wb, s, q) {
	    if (wa !== wb) {
	      q.push({i: s.push(pop(s) + "skewX(", null, ")") - 2, x: number(wa, wb)});
	    } else if (wb) {
	      s.push(pop(s) + "skewX(" + wb + ")");
	    }
	  }
	
	  function scale(ka, kb, s, q) {
	    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(ka[0], kb[0])}, {i: i - 2, x: number(ka[1], kb[1])});
	    } else if (kb[0] !== 1 || kb[1] !== 1) {
	      s.push(pop(s) + "scale(" + kb + ")");
	    }
	  }
	
	  function transform(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = new Transform(a), b = new Transform(b);
	    translate(a.translate, b.translate, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skew(a.skew, b.skew, s, q);
	    scale(a.scale, b.scale, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	
	  var rho = Math.SQRT2;
	  var rho2 = 2;
	  var rho4 = 4;
	  var epsilon2 = 1e-12;
	  function cosh(x) {
	    return ((x = Math.exp(x)) + 1 / x) / 2;
	  }
	
	  function sinh(x) {
	    return ((x = Math.exp(x)) - 1 / x) / 2;
	  }
	
	  function tanh(x) {
	    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	  }
	
	  // p0 = [ux0, uy0, w0]
	  // p1 = [ux1, uy1, w1]
	  function zoom(p0, p1) {
	    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	        dx = ux1 - ux0,
	        dy = uy1 - uy0,
	        d2 = dx * dx + dy * dy,
	        i,
	        S;
	
	    // Special case for u0 ≅ u1.
	    if (d2 < epsilon2) {
	      S = Math.log(w1 / w0) / rho;
	      i = function(t) {
	        return [
	          ux0 + t * dx,
	          uy0 + t * dy,
	          w0 * Math.exp(rho * t * S)
	        ];
	      }
	    }
	
	    // General case.
	    else {
	      var d1 = Math.sqrt(d2),
	          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	      S = (r1 - r0) / rho;
	      i = function(t) {
	        var s = t * S,
	            coshr0 = cosh(r0),
	            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	        return [
	          ux0 + u * dx,
	          uy0 + u * dy,
	          w0 * coshr0 / cosh(rho * s + r0)
	        ];
	      }
	    }
	
	    i.duration = S * 1000;
	
	    return i;
	  };
	
	  function hsl(a, b) {
	    a = d3Color.hsl(a);
	    b = d3Color.hsl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        as = isNaN(a.s) ? b.s : a.s,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	        bs = isNaN(b.s) ? 0 : b.s - as,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.s = as + bs * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  };
	
	  function hslLong(a, b) {
	    a = d3Color.hsl(a);
	    b = d3Color.hsl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        as = isNaN(a.s) ? b.s : a.s,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : b.h - ah,
	        bs = isNaN(b.s) ? 0 : b.s - as,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.s = as + bs * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  };
	
	  function lab(a, b) {
	    a = d3Color.lab(a);
	    b = d3Color.lab(b);
	    var al = a.l,
	        aa = a.a,
	        ab = a.b,
	        bl = b.l - al,
	        ba = b.a - aa,
	        bb = b.b - ab;
	    return function(t) {
	      a.l = al + bl * t;
	      a.a = aa + ba * t;
	      a.b = ab + bb * t;
	      return a + "";
	    };
	  };
	
	  function hcl(a, b) {
	    a = d3Color.hcl(a);
	    b = d3Color.hcl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        ac = isNaN(a.c) ? b.c : a.c,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	        bc = isNaN(b.c) ? 0 : b.c - ac,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.c = ac + bc * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  };
	
	  function hclLong(a, b) {
	    a = d3Color.hcl(a);
	    b = d3Color.hcl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        ac = isNaN(a.c) ? b.c : a.c,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : b.h - ah,
	        bc = isNaN(b.c) ? 0 : b.c - ac,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.c = ac + bc * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  };
	
	  var cubehelix = cubehelixGamma(1);
	  var cubehelixLong = cubehelixGammaLong(1);
	
	  var version = "0.2.1";
	
	  exports.version = version;
	  exports.cubehelix = cubehelix;
	  exports.cubehelixLong = cubehelixLong;
	  exports.cubehelixGamma = cubehelixGamma;
	  exports.cubehelixGammaLong = cubehelixGammaLong;
	  exports.array = array;
	  exports.number = number;
	  exports.object = object;
	  exports.round = round;
	  exports.string = string;
	  exports.transform = transform;
	  exports.values = values;
	  exports.value = value;
	  exports.zoom = zoom;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.hslLong = hslLong;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.hclLong = hclLong;
	
	}));

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_color = {})));
	}(this, function (exports) { 'use strict';
	
	  function Color() {}
	
	  var darker = 0.7;
	  var brighter = 1 / darker;
	
	  var reHex3 = /^#([0-9a-f]{3})$/;
	  var reHex6 = /^#([0-9a-f]{6})$/;
	  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var named = {
	    aliceblue: 0xf0f8ff,
	    antiquewhite: 0xfaebd7,
	    aqua: 0x00ffff,
	    aquamarine: 0x7fffd4,
	    azure: 0xf0ffff,
	    beige: 0xf5f5dc,
	    bisque: 0xffe4c4,
	    black: 0x000000,
	    blanchedalmond: 0xffebcd,
	    blue: 0x0000ff,
	    blueviolet: 0x8a2be2,
	    brown: 0xa52a2a,
	    burlywood: 0xdeb887,
	    cadetblue: 0x5f9ea0,
	    chartreuse: 0x7fff00,
	    chocolate: 0xd2691e,
	    coral: 0xff7f50,
	    cornflowerblue: 0x6495ed,
	    cornsilk: 0xfff8dc,
	    crimson: 0xdc143c,
	    cyan: 0x00ffff,
	    darkblue: 0x00008b,
	    darkcyan: 0x008b8b,
	    darkgoldenrod: 0xb8860b,
	    darkgray: 0xa9a9a9,
	    darkgreen: 0x006400,
	    darkgrey: 0xa9a9a9,
	    darkkhaki: 0xbdb76b,
	    darkmagenta: 0x8b008b,
	    darkolivegreen: 0x556b2f,
	    darkorange: 0xff8c00,
	    darkorchid: 0x9932cc,
	    darkred: 0x8b0000,
	    darksalmon: 0xe9967a,
	    darkseagreen: 0x8fbc8f,
	    darkslateblue: 0x483d8b,
	    darkslategray: 0x2f4f4f,
	    darkslategrey: 0x2f4f4f,
	    darkturquoise: 0x00ced1,
	    darkviolet: 0x9400d3,
	    deeppink: 0xff1493,
	    deepskyblue: 0x00bfff,
	    dimgray: 0x696969,
	    dimgrey: 0x696969,
	    dodgerblue: 0x1e90ff,
	    firebrick: 0xb22222,
	    floralwhite: 0xfffaf0,
	    forestgreen: 0x228b22,
	    fuchsia: 0xff00ff,
	    gainsboro: 0xdcdcdc,
	    ghostwhite: 0xf8f8ff,
	    gold: 0xffd700,
	    goldenrod: 0xdaa520,
	    gray: 0x808080,
	    green: 0x008000,
	    greenyellow: 0xadff2f,
	    grey: 0x808080,
	    honeydew: 0xf0fff0,
	    hotpink: 0xff69b4,
	    indianred: 0xcd5c5c,
	    indigo: 0x4b0082,
	    ivory: 0xfffff0,
	    khaki: 0xf0e68c,
	    lavender: 0xe6e6fa,
	    lavenderblush: 0xfff0f5,
	    lawngreen: 0x7cfc00,
	    lemonchiffon: 0xfffacd,
	    lightblue: 0xadd8e6,
	    lightcoral: 0xf08080,
	    lightcyan: 0xe0ffff,
	    lightgoldenrodyellow: 0xfafad2,
	    lightgray: 0xd3d3d3,
	    lightgreen: 0x90ee90,
	    lightgrey: 0xd3d3d3,
	    lightpink: 0xffb6c1,
	    lightsalmon: 0xffa07a,
	    lightseagreen: 0x20b2aa,
	    lightskyblue: 0x87cefa,
	    lightslategray: 0x778899,
	    lightslategrey: 0x778899,
	    lightsteelblue: 0xb0c4de,
	    lightyellow: 0xffffe0,
	    lime: 0x00ff00,
	    limegreen: 0x32cd32,
	    linen: 0xfaf0e6,
	    magenta: 0xff00ff,
	    maroon: 0x800000,
	    mediumaquamarine: 0x66cdaa,
	    mediumblue: 0x0000cd,
	    mediumorchid: 0xba55d3,
	    mediumpurple: 0x9370db,
	    mediumseagreen: 0x3cb371,
	    mediumslateblue: 0x7b68ee,
	    mediumspringgreen: 0x00fa9a,
	    mediumturquoise: 0x48d1cc,
	    mediumvioletred: 0xc71585,
	    midnightblue: 0x191970,
	    mintcream: 0xf5fffa,
	    mistyrose: 0xffe4e1,
	    moccasin: 0xffe4b5,
	    navajowhite: 0xffdead,
	    navy: 0x000080,
	    oldlace: 0xfdf5e6,
	    olive: 0x808000,
	    olivedrab: 0x6b8e23,
	    orange: 0xffa500,
	    orangered: 0xff4500,
	    orchid: 0xda70d6,
	    palegoldenrod: 0xeee8aa,
	    palegreen: 0x98fb98,
	    paleturquoise: 0xafeeee,
	    palevioletred: 0xdb7093,
	    papayawhip: 0xffefd5,
	    peachpuff: 0xffdab9,
	    peru: 0xcd853f,
	    pink: 0xffc0cb,
	    plum: 0xdda0dd,
	    powderblue: 0xb0e0e6,
	    purple: 0x800080,
	    rebeccapurple: 0x663399,
	    red: 0xff0000,
	    rosybrown: 0xbc8f8f,
	    royalblue: 0x4169e1,
	    saddlebrown: 0x8b4513,
	    salmon: 0xfa8072,
	    sandybrown: 0xf4a460,
	    seagreen: 0x2e8b57,
	    seashell: 0xfff5ee,
	    sienna: 0xa0522d,
	    silver: 0xc0c0c0,
	    skyblue: 0x87ceeb,
	    slateblue: 0x6a5acd,
	    slategray: 0x708090,
	    slategrey: 0x708090,
	    snow: 0xfffafa,
	    springgreen: 0x00ff7f,
	    steelblue: 0x4682b4,
	    tan: 0xd2b48c,
	    teal: 0x008080,
	    thistle: 0xd8bfd8,
	    tomato: 0xff6347,
	    turquoise: 0x40e0d0,
	    violet: 0xee82ee,
	    wheat: 0xf5deb3,
	    white: 0xffffff,
	    whitesmoke: 0xf5f5f5,
	    yellow: 0xffff00,
	    yellowgreen: 0x9acd32
	  };
	
	  color.prototype = Color.prototype = {
	    displayable: function() {
	      return this.rgb().displayable();
	    },
	    toString: function() {
	      return this.rgb() + "";
	    }
	  };
	
	  function color(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf))) // #f00
	        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3]) // rgb(255,0,0)
	        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100) // rgb(100%,0%,0%)
	        : (m = reHslPercent.exec(format)) ? new Hsl(m[1], m[2] / 100, m[3] / 100) // hsl(120,50%,50%)
	        : named.hasOwnProperty(format) ? rgbn(named[format])
	        : null;
	  }
	
	  function rgbn(n) {
	    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff);
	  }
	
	  function rgb(r, g, b) {
	    if (arguments.length === 1) {
	      if (!(r instanceof Color)) r = color(r);
	      if (r) {
	        r = r.rgb();
	        b = r.b;
	        g = r.g;
	        r = r.r;
	      } else {
	        r = g = b = NaN;
	      }
	    }
	    return new Rgb(r, g, b);
	  }
	
	  function Rgb(r, g, b) {
	    this.r = +r;
	    this.g = +g;
	    this.b = +b;
	  }
	
	  var _rgb = rgb.prototype = Rgb.prototype = new Color;
	
	  _rgb.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };
	
	  _rgb.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };
	
	  _rgb.rgb = function() {
	    return this;
	  };
	
	  _rgb.displayable = function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255);
	  };
	
	  _rgb.toString = function() {
	    var r = Math.round(this.r),
	        g = Math.round(this.g),
	        b = Math.round(this.b);
	    return "#"
	        + (isNaN(r) || r <= 0 ? "00" : r < 16 ? "0" + r.toString(16) : r >= 255 ? "ff" : r.toString(16))
	        + (isNaN(g) || g <= 0 ? "00" : g < 16 ? "0" + g.toString(16) : g >= 255 ? "ff" : g.toString(16))
	        + (isNaN(b) || b <= 0 ? "00" : b < 16 ? "0" + b.toString(16) : b >= 255 ? "ff" : b.toString(16));
	  };
	
	  function hsl(h, s, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Hsl) {
	        l = h.l;
	        s = h.s;
	        h = h.h;
	      } else {
	        if (!(h instanceof Color)) h = color(h);
	        if (h) {
	          if (h instanceof Hsl) return h;
	          h = h.rgb();
	          var r = h.r / 255,
	              g = h.g / 255,
	              b = h.b / 255,
	              min = Math.min(r, g, b),
	              max = Math.max(r, g, b),
	              range = max - min;
	          l = (max + min) / 2;
	          if (range) {
	            s = l < 0.5 ? range / (max + min) : range / (2 - max - min);
	            if (r === max) h = (g - b) / range + (g < b) * 6;
	            else if (g === max) h = (b - r) / range + 2;
	            else h = (r - g) / range + 4;
	            h *= 60;
	          } else {
	            h = NaN;
	            s = l > 0 && l < 1 ? 0 : h;
	          }
	        } else {
	          h = s = l = NaN;
	        }
	      }
	    }
	    return new Hsl(h, s, l);
	  }
	
	  function Hsl(h, s, l) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	  }
	
	  var _hsl = hsl.prototype = Hsl.prototype = new Color;
	
	  _hsl.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };
	
	  _hsl.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };
	
	  _hsl.rgb = function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2)
	    );
	  };
	
	  _hsl.displayable = function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1);
	  };
	
	  /* From FvD 13.37, CSS Color Module Level 3 */
	  function hsl2rgb(h, m1, m2) {
	    return (h < 60 ? m1 + (m2 - m1) * h / 60
	        : h < 180 ? m2
	        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	        : m1) * 255;
	  }
	
	  var deg2rad = Math.PI / 180;
	  var rad2deg = 180 / Math.PI;
	
	  var Kn = 18;
	  var Xn = 0.950470;
	  var Yn = 1;
	  var Zn = 1.088830;
	  var t0 = 4 / 29;
	  var t1 = 6 / 29;
	  var t2 = 3 * t1 * t1;
	  var t3 = t1 * t1 * t1;
	  function lab(l, a, b) {
	    if (arguments.length === 1) {
	      if (l instanceof Lab) {
	        b = l.b;
	        a = l.a;
	        l = l.l;
	      } else if (l instanceof Hcl) {
	        var h = l.h * deg2rad;
	        b = Math.sin(h) * l.c;
	        a = Math.cos(h) * l.c;
	        l = l.l;
	      } else {
	        if (!(l instanceof Rgb)) l = rgb(l);
	        b = rgb2xyz(l.r);
	        a = rgb2xyz(l.g);
	        l = rgb2xyz(l.b);
	        var x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	            y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	            z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	        b = 200 * (y - z);
	        a = 500 * (x - y);
	        l = 116 * y - 16;
	      }
	    }
	    return new Lab(l, a, b);
	  }
	
	  function Lab(l, a, b) {
	    this.l = +l;
	    this.a = +a;
	    this.b = +b;
	  }
	
	  var _lab = lab.prototype = Lab.prototype = new Color;
	
	  _lab.brighter = function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b);
	  };
	
	  _lab.darker = function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b);
	  };
	
	  _lab.rgb = function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
	    );
	  };
	
	  function xyz2lab(t) {
	    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	  }
	
	  function lab2xyz(t) {
	    return t > t1 ? t * t * t : t2 * (t - t0);
	  }
	
	  function xyz2rgb(x) {
	    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	  }
	
	  function rgb2xyz(x) {
	    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	  }
	
	  function hcl(h, c, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Hcl) {
	        l = h.l;
	        c = h.c;
	        h = h.h;
	      } else {
	        if (!(h instanceof Lab)) h = lab(h);
	        l = h.l;
	        c = Math.sqrt(h.a * h.a + h.b * h.b);
	        h = Math.atan2(h.b, h.a) * rad2deg;
	        if (h < 0) h += 360;
	      }
	    }
	    return new Hcl(h, c, l);
	  }
	
	  function Hcl(h, c, l) {
	    this.h = +h;
	    this.c = +c;
	    this.l = +l;
	  }
	
	  var _hcl = hcl.prototype = Hcl.prototype = new Color;
	
	  _hcl.brighter = function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
	  };
	
	  _hcl.darker = function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
	  };
	
	  _hcl.rgb = function() {
	    return lab(this).rgb();
	  };
	
	  var A = -0.14861;
	  var B = +1.78277;
	  var C = -0.29227;
	  var D = -0.90649;
	  var E = +1.97294;
	  var ED = E * D;
	  var EB = E * B;
	  var BC_DA = B * C - D * A;
	  function cubehelix(h, s, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Cubehelix) {
	        l = h.l;
	        s = h.s;
	        h = h.h;
	      } else {
	        if (!(h instanceof Rgb)) h = rgb(h);
	        var r = h.r / 255, g = h.g / 255, b = h.b / 255;
	        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB);
	        var bl = b - l, k = (E * (g - l) - C * bl) / D;
	        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)); // NaN if l=0 or l=1
	        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	        if (h < 0) h += 360;
	      }
	    }
	    return new Cubehelix(h, s, l);
	  }
	
	  function Cubehelix(h, s, l) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	  }
	
	  var _cubehelix = cubehelix.prototype = Cubehelix.prototype = new Color;
	
	  _cubehelix.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k);
	  };
	
	  _cubehelix.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k);
	  };
	
	  _cubehelix.rgb = function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh))
	    );
	  };
	
	  var version = "0.3.4";
	
	  exports.version = version;
	  exports.color = color;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.cubehelix = cubehelix;
	
	}));

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-timer', ['exports'], factory) :
	  factory((global.d3_timer = {}));
	}(this, function (exports) { 'use strict';
	
	  var frame = 0;
	  var timeout = 0;
	  var taskHead;
	  var taskTail;
	  var taskId = 0;
	  var taskById = {};
	  var setFrame = typeof window !== "undefined"
	      && (window.requestAnimationFrame
	        || window.msRequestAnimationFrame
	        || window.mozRequestAnimationFrame
	        || window.webkitRequestAnimationFrame
	        || window.oRequestAnimationFrame)
	        || function(callback) { return setTimeout(callback, 17); };
	
	  function Timer(callback, delay, time) {
	    this.id = ++taskId;
	    this.restart(callback, delay, time);
	  }
	
	  Timer.prototype = timer.prototype = {
	    restart: function(callback, delay, time) {
	      if (typeof callback !== "function") throw new TypeError("callback is not a function");
	      time = (time == null ? Date.now() : +time) + (delay == null ? 0 : +delay);
	      var i = this.id, t = taskById[i];
	      if (t) {
	        t.callback = callback, t.time = time;
	      } else {
	        t = {next: null, callback: callback, time: time};
	        if (taskTail) taskTail.next = t; else taskHead = t;
	        taskById[i] = taskTail = t;
	      }
	      sleep();
	    },
	    stop: function() {
	      var i = this.id, t = taskById[i];
	      if (t) {
	        t.callback = null, t.time = Infinity;
	        delete taskById[i];
	        sleep();
	      }
	    }
	  };
	
	  function timer(callback, delay, time) {
	    return new Timer(callback, delay, time);
	  };
	
	  function timerFlush(time) {
	    time = time == null ? Date.now() : +time;
	    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	    try {
	      var t = taskHead, c;
	      while (t) {
	        if (time >= t.time) c = t.callback, c(time - t.time, time);
	        t = t.next;
	      }
	    } finally {
	      --frame;
	    }
	  };
	
	  function wake() {
	    frame = timeout = 0;
	    try {
	      timerFlush();
	    } finally {
	      var t0, t1 = taskHead, time = Infinity;
	      while (t1) {
	        if (t1.callback) {
	          if (time > t1.time) time = t1.time;
	          t1 = (t0 = t1).next;
	        } else {
	          t1 = t0 ? t0.next = t1.next : taskHead = t1.next;
	        }
	      }
	      taskTail = t0;
	      sleep(time);
	    }
	  }
	
	  function sleep(time) {
	    if (frame) return; // Soonest alarm already set, or will be.
	    if (timeout) timeout = clearTimeout(timeout);
	    var delay = time - Date.now();
	    if (delay > 24) { if (time < Infinity) timeout = setTimeout(wake, delay); }
	    else frame = 1, setFrame(wake);
	  }
	
	  var version = "0.0.6";
	
	  exports.version = version;
	  exports.timer = timer;
	  exports.timerFlush = timerFlush;
	
	}));

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addVictoryInterpolator = exports.victoryInterpolator = exports.interpolateFunction = exports.interpolateImmediate = exports.isInterpolatable = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _d3Interpolate = __webpack_require__(168);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
	var _isPlainObject = __webpack_require__(155);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isInterpolatable = exports.isInterpolatable = function isInterpolatable(obj) {
	  // d3 turns null into 0 and undefined into NaN, which we don't want.
	  if (obj !== null) {
	    switch (typeof obj === "undefined" ? "undefined" : _typeof(obj)) {
	      case "undefined":
	        return false;
	      case "number":
	        // The standard `isNaN` is fine in this case since we already know the
	        // type is number.
	        return !isNaN(obj) && obj !== Number.POSITIVE_INFINITY && obj !== Number.NEGATIVE_INFINITY;
	      case "string":
	        // d3 might not *actually* be able to interpolate the string, but it
	        // won't cause any issues to let it try.
	        return true;
	      case "boolean":
	        // d3 turns Booleans into integers, which we don't want. Sure, we could
	        // interpolate from 0 -> 1, but we'd be sending a non-Boolean to
	        // something expecting a Boolean.
	        return false;
	      case "object":
	        // Don't try to interpolate class instances (except Date or Array).
	        return obj instanceof Date || Array.isArray(obj) || (0, _isPlainObject2.default)(obj);
	      case "function":
	        // Careful! There may be extra properties on function objects that the
	        // component expects to access - for instance, it may be a `d3.scale()`
	        // function, which has its own methods attached. We don't know if the
	        // component is only going to call the function (in which case it's
	        // safely interpolatable) or if it's going to access special properties
	        // (in which case our function generated from `interpolateFunction` will
	        // most likely cause an error. We could check for enumerable properties
	        // on the function object here to see if it's a "plain" function, but
	        // let's just require that components prevent such function props from
	        // being animated in the first place.
	        return true;
	    }
	  }
	  return false;
	};
	
	/**
	 * Interpolate immediately to the end value at the given step `when`.
	 * Some nicer default behavior might be to jump at the halfway point or return
	 * `a` if `t` is 0 (instead of always returning `b`). But d3's default
	 * interpolator does not do these things:
	 *
	 *   d3.interpolate('aaa', 'bbb')(0) === 'bbb'
	 *
	 * ...and things might get wonky if we don't replicate that behavior.
	 *
	 * @param {any} a - Start value.
	 * @param {any} b - End value.
	 * @param {Number} when - Step value (0 to 1) at which to jump to `b`.
	 * @returns {Function} An interpolation function.
	 */
	var interpolateImmediate = exports.interpolateImmediate = function interpolateImmediate(a, b) {
	  var when = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	  return function (t) {
	    return t < when ? a : b;
	  };
	};
	
	/**
	 * Interpolate to or from a function. The interpolated value will be a function
	 * that calls `a` (if it's a function) and `b` (if it's a function) and calls
	 * `d3.interpolate` on the resulting values. Note that our function won't
	 * necessarily be called (that's up to the component this eventually gets
	 * passed to) - but if it does get called, it will return an appropriately
	 * interpolated value.
	 *
	 * @param {any} a - Start value.
	 * @param {any} b - End value.
	 * @returns {Function} An interpolation function.
	 */
	var interpolateFunction = exports.interpolateFunction = function interpolateFunction(a, b) {
	  return function (t) {
	    if (t >= 1) {
	      return b;
	    }
	    return function () {
	      /* eslint-disable no-invalid-this */
	      var aval = typeof a === "function" ? a.apply(this, arguments) : a;
	      var bval = typeof b === "function" ? b.apply(this, arguments) : b;
	      return _d3Interpolate2.default.value(aval, bval)(t);
	    };
	  };
	};
	
	/**
	 * By default, the list of interpolators used by `d3.interpolate` has a few
	 * downsides:
	 *
	 * - `null` values get turned into 0.
	 * - `undefined`, `function`, and some other value types get turned into NaN.
	 * - Boolean types get turned into numbers, which probably will be meaningless
	 *   to whatever is consuming them.
	 * - It tries to interpolate between identical start and end values, doing
	 *   unnecessary calculations that sometimes result in floating point rounding
	 *   errors.
	 *
	 * If only the default interpolators are used, `VictoryAnimation` will happily
	 * pass down NaN (and other bad) values as props to the wrapped component.
	 * The component will then either use the incorrect values or complain that it
	 * was passed props of the incorrect type. This custom interpolator is added
	 * using the `d3.interpolators` API, and prevents such cases from happening
	 * for most values.
	 *
	 * @param {any} a - Start value.
	 * @param {any} b - End value.
	 * @returns {Function|undefined} An interpolation function, if necessary.
	 */
	var victoryInterpolator = exports.victoryInterpolator = function victoryInterpolator(a, b) {
	  // If the values are strictly equal, or either value is not interpolatable,
	  // just use either the start value `a` or end value `b` at every step, as
	  // there is no reasonable in-between value.
	  if (a === b || !isInterpolatable(a) || !isInterpolatable(b)) {
	    return interpolateImmediate(a, b);
	  }
	  if (typeof a === "function" || typeof b === "function") {
	    return interpolateFunction(a, b);
	  }
	};
	
	var interpolatorAdded = false;
	
	var addVictoryInterpolator = exports.addVictoryInterpolator = function addVictoryInterpolator() {
	  if (!interpolatorAdded) {
	    _d3Interpolate2.default.values.push(victoryInterpolator);
	    interpolatorAdded = true;
	  }
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(173);
	
	var _merge = __webpack_require__(99);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  stroke: "transparent",
	  fill: "#756f6a",
	  fontSize: 16,
	  fontFamily: "Helvetica",
	  backgroundColor: "#ccc"
	};
	
	var VictoryLabel = function (_React$Component) {
	  _inherits(VictoryLabel, _React$Component);
	
	  function VictoryLabel() {
	    _classCallCheck(this, VictoryLabel);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryLabel).apply(this, arguments));
	  }
	
	  _createClass(VictoryLabel, [{
	    key: "getStyles",
	    value: function getStyles(props) {
	      var style = props.style ? (0, _merge2.default)({}, defaultStyles, props.style) : defaultStyles;
	      var datum = props.datum || props.data;
	      return _index.Helpers.evaluateStyle(style, datum);
	    }
	  }, {
	    key: "getHeight",
	    value: function getHeight(props, type) {
	      var datum = props.datum || props.data;
	      var height = _index.Helpers.evaluateProp(props[type], datum);
	      return typeof height === "number" ? height + "em" : height;
	    }
	  }, {
	    key: "getContent",
	    value: function getContent(props) {
	      var text = props.text || props.children;
	      if (text) {
	        var datum = props.datum || props.data;
	        var child = _index.Helpers.evaluateProp(text, datum);
	        return ("" + child).split("\n");
	      }
	      return [""];
	    }
	  }, {
	    key: "getDy",
	    value: function getDy(props, content, lineHeight) {
	      var datum = props.datum || props.data;
	      var dy = props.dy ? _index.Helpers.evaluateProp(props.dy, datum) : 0;
	      var length = content.length;
	      var capHeight = this.getHeight(props, "capHeight");
	      var verticalAnchor = props.verticalAnchor ? _index.Helpers.evaluateProp(props.verticalAnchor, datum) : "middle";
	      switch (verticalAnchor) {
	        case "end":
	          return _index.Style.calc(dy + " +  " + capHeight + " / 2 + (0.5 - " + length + ") * " + lineHeight);
	        case "middle":
	          return _index.Style.calc(dy + " + " + capHeight + " / 2 + (0.5 - " + length + " / 2) * " + lineHeight);
	        default:
	          return _index.Style.calc(dy + " + " + capHeight + " / 2 + " + lineHeight + " / 2");
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      var datum = this.props.datum || this.props.data;
	      var lineHeight = this.getHeight(this.props, "lineHeight");
	      var transform = this.props.transform && _index.Style.toTransformString(_index.Helpers.evaluateProp(this.props.transform, datum));
	      var textAnchor = this.props.textAnchor ? _index.Helpers.evaluateProp(this.props.textAnchor, datum) : "start";
	      var content = this.getContent(this.props);
	      var style = this.getStyles(this.props);
	      var dx = this.props.dx ? _index.Helpers.evaluateProp(this.props.dx, datum) : 0;
	      var dy = this.getDy(this.props, content, lineHeight);
	      return _react2.default.createElement(
	        "text",
	        _extends({
	          x: this.props.x,
	          y: this.props.y,
	          dy: dy,
	          dx: dx,
	          textAnchor: textAnchor,
	          transform: transform,
	          style: style
	        }, this.props.events),
	        content.map(function (line, i) {
	          return _react2.default.createElement(
	            "tspan",
	            { key: i, x: _this2.props.x, dy: i ? lineHeight : undefined },
	            line
	          );
	        })
	      );
	    }
	  }]);
	
	  return VictoryLabel;
	}(_react2.default.Component);
	
	VictoryLabel.propTypes = {
	  /**
	   * The capHeight prop defines a text metric for the font being used: the
	   * expected height of capital letters. This is necessary because of SVG,
	   * which (a) positions the *bottom* of the text at `y`, and (b) has no
	   * notion of line height. The value should ideally use the same units as
	   * `lineHeight` and `dy`, preferably ems. If given a unitless number, it
	   * is assumed to be ems.
	   */
	  capHeight: _react.PropTypes.oneOfType([_react.PropTypes.string, _index.PropTypes.nonNegative, _react.PropTypes.func]),
	  /**
	   * Victory components can pass a datum prop to their label component. This can
	   * be used to calculate functional styles, and determine child text
	   */
	  datum: _react.PropTypes.object,
	  /**
	   * Labels that apply to an entire data series will recieve the entire series
	   * as `data` instead of an individual datum prop.
	   */
	  data: _react.PropTypes.array,
	  /**
	   * The events prop attaches arbitrary event handlers to the label component.
	   * Event handlers are currently only called with their corresponding events.
	   * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
	   */
	  events: _react.PropTypes.object,
	  /**
	   * all Victory components will pass a text prop to their label component.
	   * This defines the content of the label when child nodes are absent. It
	   * will be ignored if children are provided.
	   */
	  text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.func]),
	  /**
	   * The children of this component define the content of the label. This
	   * makes using the component similar to normal HTML spans or labels.
	   * strings, numbers, and functions of data / value are supported.
	   */
	  children: _react.PropTypes.oneOfType([// TODO: Expand child support in future release
	  _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.func]),
	  /**
	   * The lineHeight prop defines how much space a single line of text should
	   * take up. Note that SVG has no notion of line-height, so the positioning
	   * may differ slightly from what you would expect with CSS, but the result
	   * is similar: a roughly equal amount of extra space is distributed above
	   * and below the line of text. The value should ideally use the same units
	   * as `capHeight` and `dy`, preferably ems. If given a unitless number, it
	   * is assumed to be ems.
	   */
	  lineHeight: _react.PropTypes.oneOfType([_react.PropTypes.string, _index.PropTypes.nonNegative, _react.PropTypes.func]),
	  /**
	   * The style prop applies CSS properties to the rendered `<text>` element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The textAnchor prop defines how the text is horizontally positioned
	   * relative to the given `x` and `y` coordinates.
	   */
	  textAnchor: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["start", "middle", "end", "inherit"]), _react.PropTypes.func]),
	  /**
	   * The verticalAnchor prop defines how the text is vertically positioned
	   * relative to the given `x` and `y` coordinates.
	   */
	  verticalAnchor: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["start", "middle", "end"]), _react.PropTypes.func]),
	  /**
	   * The transform prop applies a transform to the rendered `<text>` element.
	   * In addition to being a string, it can be an object containing transform
	   * definitions for easier authoring.
	   */
	  transform: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.func]),
	  /**
	   * The x prop defines the x coordinate to use as a basis for horizontal
	   * positioning.
	   */
	  x: _react.PropTypes.number,
	  /**
	   * The y prop defines the y coordinate to use as a basis for vertical
	   * positioning.
	   */
	  y: _react.PropTypes.number,
	  /**
	   * The dx prop defines a horizontal shift from the `x` coordinate.
	   */
	  dx: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.func]),
	  /**
	   * The dy prop defines a vertical shift from the `y` coordinate. Since this
	   * component already accounts for `capHeight`, `lineHeight`, and
	   * `verticalAnchor`, this will usually not be necessary.
	   */
	  dy: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.func])
	};
	VictoryLabel.defaultProps = {
	  capHeight: "0.71em", // Magic number from d3.
	  lineHeight: 1
	};
	exports.default = VictoryLabel;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Perf = exports.PropTypes = exports.Style = exports.Log = exports.Helpers = exports.Collection = undefined;
	
	var _collection = __webpack_require__(50);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	var _helpers = __webpack_require__(51);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _log = __webpack_require__(158);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _style = __webpack_require__(160);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _propTypes = __webpack_require__(165);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _perf = __webpack_require__(174);
	
	var _perf2 = _interopRequireDefault(_perf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Collection = _collection2.default;
	exports.Helpers = _helpers2.default;
	exports.Log = _log2.default;
	exports.Style = _style2.default;
	exports.PropTypes = _propTypes2.default;
	exports.Perf = _perf2.default;

/***/ },
/* 174 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Memoizes multi-argument functions.
	 *
	 * NOTE: If `fn` receives another function as its argument, memoization is
	 * not guaranteed to work.  The function will be strigified, but it will
	 * no longer be a closure.
	 *
	 * @param  {Function}  fn  The function to memoize
	 *
	 * @return {Function}      Memoized `fn`.
	 */
	exports.default = {
	  memoize: function memoize(fn) {
	    var cache = {};
	    return function () {
	      var args = Array.prototype.slice.call(arguments);
	      var hash = args.map(function (arg) {
	        return typeof arg === "string" || typeof arg === "number" ? arg : JSON.stringify(arg);
	      }).join("~");
	      return hash in cache ? cache[hash] : cache[hash] = fn.apply(this, args); // eslint-disable-line no-invalid-this
	    };
	  }
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(49);
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _omit = __webpack_require__(176);
	
	var _omit2 = _interopRequireDefault(_omit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Slice = function (_React$Component) {
	  _inherits(Slice, _React$Component);
	
	  function Slice() {
	    _classCallCheck(this, Slice);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Slice).apply(this, arguments));
	  }
	
	  _createClass(Slice, [{
	    key: "renderSlice",
	    value: function renderSlice(props) {
	      var dataStyles = (0, _omit2.default)(props.slice.data, ["x", "y", "label"]);
	      var style = _victoryCore.Helpers.evaluateStyle((0, _defaults2.default)({}, dataStyles, props.style), props.slice.data);
	      var events = _victoryCore.Helpers.getPartialEvents(props.events, props.index, props);
	      return _react2.default.createElement("path", _extends({
	        d: props.pathFunction(props.slice),
	        style: style
	      }, events));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.renderSlice(this.props);
	    }
	  }]);
	
	  return Slice;
	}(_react2.default.Component);
	
	Slice.propTypes = {
	  index: _react.PropTypes.number,
	  slice: _react.PropTypes.object,
	  pathFunction: _react.PropTypes.func,
	  style: _react.PropTypes.object,
	  datum: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = Slice;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(177),
	    baseDifference = __webpack_require__(178),
	    baseFlatten = __webpack_require__(45),
	    basePick = __webpack_require__(47),
	    keysIn = __webpack_require__(24),
	    rest = __webpack_require__(21);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to omit, specified
	 *  individually or in arrays.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = rest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(baseFlatten(props, 1), String);
	  return basePick(object, baseDifference(keysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(179),
	    arrayIncludes = __webpack_require__(181),
	    arrayIncludesWith = __webpack_require__(184),
	    arrayMap = __webpack_require__(177),
	    baseUnary = __webpack_require__(185),
	    cacheHas = __webpack_require__(186);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support for
	 * excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;
	
	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(111),
	    cachePush = __webpack_require__(180);
	
	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.push(values[index]);
	  }
	}
	
	// Add functions to the `SetCache`.
	SetCache.prototype.push = cachePush;
	
	module.exports = SetCache;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(119);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the set cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var map = this.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;
	
	    hash[value] = HASH_UNDEFINED;
	  }
	  else {
	    map.set(value, HASH_UNDEFINED);
	  }
	}
	
	module.exports = cachePush;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(182);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  return !!array.length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(183);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 183 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = indexOfNaN;


/***/ },
/* 184 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 185 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(119);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Checks if `value` is in `cache`.
	 *
	 * @private
	 * @param {Object} cache The set cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function cacheHas(cache, value) {
	  var map = cache.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;
	
	    return hash[value] === HASH_UNDEFINED;
	  }
	  return map.has(value);
	}
	
	module.exports = cacheHas;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(49);
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _assign = __webpack_require__(39);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SliceLabel = function (_React$Component) {
	  _inherits(SliceLabel, _React$Component);
	
	  function SliceLabel() {
	    _classCallCheck(this, SliceLabel);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SliceLabel).apply(this, arguments));
	  }
	
	  _createClass(SliceLabel, [{
	    key: "renderLabelComponent",
	    value: function renderLabelComponent(props, position, label) {
	      var component = props.labels;
	      var style = _victoryCore.Helpers.evaluateStyle((0, _defaults2.default)({}, component.props.style, props.style, { padding: 0 }), this.data);
	      var baseEvents = component && component.props.events ? (0, _defaults2.default)({}, component.props.events, props.events) : props.events;
	      var events = _victoryCore.Helpers.getPartialEvents(baseEvents, props.index, props);
	      var newProps = (0, _assign2.default)({}, events, {
	        x: component.props.x || position[0],
	        y: component.props.y || position[1],
	        datum: props.datum, // Pass data for custom label component to access
	        textAnchor: component.props.textAnchor || "start",
	        verticalAnchor: component.props.verticalAnchor || "middle",
	        text: component.props.text || label,
	        style: style
	      });
	      return _react2.default.cloneElement(component, newProps);
	    }
	  }, {
	    key: "renderVictoryLabel",
	    value: function renderVictoryLabel(props, position, label) {
	      var style = _victoryCore.Helpers.evaluateStyle((0, _assign2.default)({ padding: 0 }, props.style), props.datum);
	      var events = _victoryCore.Helpers.getPartialEvents(props.events, props.index, props);
	      return _react2.default.createElement(_victoryCore.VictoryLabel, _extends({
	        x: position[0],
	        y: position[1],
	        datum: props.datum,
	        style: style,
	        text: label
	      }, events));
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props) {
	      var position = props.positionFunction(props.slice);
	      var dataLabel = props.datum.xName ? "" + props.datum.xName : "" + props.datum.x;
	      var label = props.datum.label ? "" + _victoryCore.Helpers.evaluateProp(props.datum.label, props.datum) : dataLabel;
	      return props.labels && props.labels.props ? this.renderLabelComponent(props, position, label) : this.renderVictoryLabel(props, position, label);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.renderLabel(this.props);
	    }
	  }]);
	
	  return SliceLabel;
	}(_react2.default.Component);
	
	SliceLabel.propTypes = {
	  index: _react.PropTypes.number,
	  labels: _react.PropTypes.any,
	  positionFunction: _react.PropTypes.func,
	  slice: _react.PropTypes.object,
	  style: _react.PropTypes.object,
	  datum: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = SliceLabel;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _memoize = __webpack_require__(189);
	
	var _memoize2 = _interopRequireDefault(_memoize);
	
	exports['default'] = _memoize2['default'];
	module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = memoize;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _singletonCache = __webpack_require__(190);
	
	var _singletonCache2 = _interopRequireDefault(_singletonCache);
	
	var _lruCache = __webpack_require__(191);
	
	var _lruCache2 = _interopRequireDefault(_lruCache);
	
	var _deepEquals = __webpack_require__(192);
	
	var _deepEquals2 = _interopRequireDefault(_deepEquals);
	
	function createCache(limit, equals) {
	  return limit === 1 ? _singletonCache2['default'](equals) : _lruCache2['default'](limit, equals);
	}
	
	function memoize() {
	  var limit = 1;
	  var equals = function equals(valueA, valueB) {
	    return valueA === valueB;
	  };
	  var deepObjects = false;
	
	  for (var _len = arguments.length, config = Array(_len), _key = 0; _key < _len; _key++) {
	    config[_key] = arguments[_key];
	  }
	
	  if (typeof config[0] === 'number') {
	    limit = config.shift();
	  }
	  if (typeof config[0] === 'function') {
	    equals = config.shift();
	  }
	  if (typeof config[0] === 'boolean') {
	    deepObjects = config[0];
	  }
	
	  var cache = createCache(limit, _deepEquals2['default'](equals, deepObjects));
	
	  return function (fn) {
	    return function () {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      var value = cache.get(args);
	      if (value === undefined) {
	        value = fn.apply(fn, args);
	        cache.put(args, value);
	      }
	      return value;
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = singletonCache;
	
	function singletonCache(equals) {
	  var entry = undefined;
	  return {
	    get: function get(key) {
	      if (entry && equals(key, entry.key)) {
	        return entry.value;
	      }
	    },
	
	    put: function put(key, value) {
	      entry = { key: key, value: value };
	    }
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 191 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = lruCache;
	
	function lruCache(limit, equals) {
	  var entries = [];
	
	  function get(key) {
	    for (var index = 0; index < entries.length; index++) {
	      var entry = entries[index];
	      if (equals(key, entry.key)) {
	        if (index > 0) {
	          // move this entry to the top of the cache
	          entries.splice(index, 1);
	          entries.unshift(entry);
	        }
	        return entry.value;
	      }
	    }
	  }
	
	  function put(key, value) {
	    if (!get(key)) {
	      entries.unshift({ key: key, value: value });
	      if (entries.length > limit) {
	        entries.pop();
	      }
	    }
	  }
	
	  return { get: get, put: put };
	}
	
	module.exports = exports["default"];

/***/ },
/* 192 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deepEquals;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	function deepEquals(equals, deepObjects) {
	  function deep(valueA, valueB) {
	    if (equals(valueA, valueB)) {
	      return true;
	    }
	
	    if (Array.isArray(valueA)) {
	      if (!Array.isArray(valueB) || valueA.length !== valueB.length) {
	        return false;
	      }
	      for (var index = 0; index < valueA.length; index++) {
	        if (!deep(valueA[index], valueB[index])) {
	          return false;
	        }
	      }
	      // could not find unequal items
	      return true;
	    }
	
	    if (Array.isArray(valueB)) {
	      return false;
	    }
	
	    if (typeof valueA === 'object') {
	      if (typeof valueB !== 'object') {
	        return false;
	      }
	
	      var isANull = valueA === null;
	      var isBNull = valueB === null;
	      if (isANull || isBNull) {
	        return isANull === isBNull;
	      }
	
	      var aKeys = Object.keys(valueA);
	      var bKeys = Object.keys(valueB);
	
	      if (aKeys.length !== bKeys.length) {
	        return false;
	      }
	
	      for (var index = 0; index < aKeys.length; index++) {
	        var key = aKeys[index];
	        if (hasOwn.call(valueA, key) && (!hasOwn.call(valueB, key) || !(deepObjects ? deep : equals)(valueA[key], valueB[key]))) {
	          return false;
	        }
	      }
	      // could not find unequal keys or values
	      return true;
	    }
	    return false;
	  }
	
	  return deep;
	}
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory-pie.js.map
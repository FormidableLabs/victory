(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["VictoryAnimation"] = factory(require("react"));
	else
		root["VictoryAnimation"] = factory(root["React"]);
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
	
	module.exports = {
	  VictoryAnimation: __webpack_require__(1)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Interpolate = __webpack_require__(3);
	
	var _d3Ease = __webpack_require__(4);
	
	var VictoryAnimation = (function (_React$Component) {
	  _inherits(VictoryAnimation, _React$Component);
	
	  function VictoryAnimation(props) {
	    _classCallCheck(this, VictoryAnimation);
	
	    _get(Object.getPrototypeOf(VictoryAnimation.prototype), "constructor", this).call(this, props);
	    this.state = this.props.data;
	    this.interpolator = null;
	    this.step = 0;
	    this.ease = (0, _d3Ease.ease)(this.props.easing);
	    this.startRaf = this.startRaf.bind(this);
	  }
	
	  _createClass(VictoryAnimation, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      this.raf && cancelAnimationFrame(this.raf);
	      this.interpolator = (0, _d3Interpolate.interpolate)(this.state, nextProps.data);
	      this.step = 0;
	      this.startRaf();
	    }
	  }, {
	    key: "startRaf",
	    value: function startRaf() {
	      if (this.step >= 1) {
	        this.step = 1;
	        this.setState(this.interpolator(this.step));
	        return;
	      }
	      this.setState(this.interpolator(this.ease(this.step)));
	      this.step += this.props.velocity;
	      this.raf = requestAnimationFrame(this.startRaf);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children(this.state);
	    }
	  }]);
	
	  return VictoryAnimation;
	})(_react2["default"].Component);
	
	VictoryAnimation.propTypes = {
	  velocity: _react2["default"].PropTypes.number,
	  easing: _react2["default"].PropTypes.string,
	  data: _react2["default"].PropTypes.object
	};
	
	VictoryAnimation.defaultProps = {
	  velocity: 0.02,
	  easing: "poly-in-out",
	  data: {}
	};
	
	exports["default"] = VictoryAnimation;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  factory((global.interpolate = {}));
	}(this, function (exports) { 'use strict';
	
	  var interpolateNumber = function(a, b) {
	    return a = +a, b -= a, function(t) {
	      return a + b * t;
	    };
	  }
	
	  var interpolate = function(a, b) {
	    var i = interpolators.length, f;
	    while (--i >= 0 && !(f = interpolators[i](a, b)));
	    return f;
	  }
	
	  var interpolateObject = function(a, b) {
	    var i = {},
	        c = {},
	        k;
	
	    for (k in a) {
	      if (k in b) {
	        i[k] = interpolate(a[k], b[k]);
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
	  }// TODO sparse arrays?
	
	  var interpolateArray = function(a, b) {
	    var x = [],
	        c = [],
	        na = a.length,
	        nb = b.length,
	        n0 = Math.min(a.length, b.length),
	        i;
	
	    for (i = 0; i < n0; ++i) x.push(interpolate(a[i], b[i]));
	    for (; i < na; ++i) c[i] = a[i];
	    for (; i < nb; ++i) c[i] = b[i];
	
	    return function(t) {
	      for (i = 0; i < n0; ++i) c[i] = x[i](t);
	      return c;
	    };
	  }
	
	  function format(r, g, b) {
	    if (isNaN(r)) r = 0;
	    if (isNaN(g)) g = 0;
	    if (isNaN(b)) b = 0;
	    return "#"
	        + (r < 16 ? "0" + r.toString(16) : r.toString(16))
	        + (g < 16 ? "0" + g.toString(16) : g.toString(16))
	        + (b < 16 ? "0" + b.toString(16) : b.toString(16));
	  }
	
	  function Rgb(r, g, b) {
	    this.r = Math.max(0, Math.min(255, Math.round(r)));
	    this.g = Math.max(0, Math.min(255, Math.round(g)));
	    this.b = Math.max(0, Math.min(255, Math.round(b)));
	  }
	
	  function Color() {}
	
	  Color.prototype = {
	    toString: function() {
	      return this.rgb() + "";
	    }
	  };
	
	  var _prototype = Rgb.prototype = new Color;
	
	  var darker = .7;
	
	  _prototype.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };
	
	  var brighter = 1 / darker;
	
	  _prototype.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };
	
	  _prototype.rgb = function() {
	    return this;
	  };
	
	  _prototype.toString = function() {
	    return format(this.r, this.g, this.b);
	  };
	
	  var named = (new Map)
	      .set("aliceblue", 0xf0f8ff)
	      .set("antiquewhite", 0xfaebd7)
	      .set("aqua", 0x00ffff)
	      .set("aquamarine", 0x7fffd4)
	      .set("azure", 0xf0ffff)
	      .set("beige", 0xf5f5dc)
	      .set("bisque", 0xffe4c4)
	      .set("black", 0x000000)
	      .set("blanchedalmond", 0xffebcd)
	      .set("blue", 0x0000ff)
	      .set("blueviolet", 0x8a2be2)
	      .set("brown", 0xa52a2a)
	      .set("burlywood", 0xdeb887)
	      .set("cadetblue", 0x5f9ea0)
	      .set("chartreuse", 0x7fff00)
	      .set("chocolate", 0xd2691e)
	      .set("coral", 0xff7f50)
	      .set("cornflowerblue", 0x6495ed)
	      .set("cornsilk", 0xfff8dc)
	      .set("crimson", 0xdc143c)
	      .set("cyan", 0x00ffff)
	      .set("darkblue", 0x00008b)
	      .set("darkcyan", 0x008b8b)
	      .set("darkgoldenrod", 0xb8860b)
	      .set("darkgray", 0xa9a9a9)
	      .set("darkgreen", 0x006400)
	      .set("darkgrey", 0xa9a9a9)
	      .set("darkkhaki", 0xbdb76b)
	      .set("darkmagenta", 0x8b008b)
	      .set("darkolivegreen", 0x556b2f)
	      .set("darkorange", 0xff8c00)
	      .set("darkorchid", 0x9932cc)
	      .set("darkred", 0x8b0000)
	      .set("darksalmon", 0xe9967a)
	      .set("darkseagreen", 0x8fbc8f)
	      .set("darkslateblue", 0x483d8b)
	      .set("darkslategray", 0x2f4f4f)
	      .set("darkslategrey", 0x2f4f4f)
	      .set("darkturquoise", 0x00ced1)
	      .set("darkviolet", 0x9400d3)
	      .set("deeppink", 0xff1493)
	      .set("deepskyblue", 0x00bfff)
	      .set("dimgray", 0x696969)
	      .set("dimgrey", 0x696969)
	      .set("dodgerblue", 0x1e90ff)
	      .set("firebrick", 0xb22222)
	      .set("floralwhite", 0xfffaf0)
	      .set("forestgreen", 0x228b22)
	      .set("fuchsia", 0xff00ff)
	      .set("gainsboro", 0xdcdcdc)
	      .set("ghostwhite", 0xf8f8ff)
	      .set("gold", 0xffd700)
	      .set("goldenrod", 0xdaa520)
	      .set("gray", 0x808080)
	      .set("green", 0x008000)
	      .set("greenyellow", 0xadff2f)
	      .set("grey", 0x808080)
	      .set("honeydew", 0xf0fff0)
	      .set("hotpink", 0xff69b4)
	      .set("indianred", 0xcd5c5c)
	      .set("indigo", 0x4b0082)
	      .set("ivory", 0xfffff0)
	      .set("khaki", 0xf0e68c)
	      .set("lavender", 0xe6e6fa)
	      .set("lavenderblush", 0xfff0f5)
	      .set("lawngreen", 0x7cfc00)
	      .set("lemonchiffon", 0xfffacd)
	      .set("lightblue", 0xadd8e6)
	      .set("lightcoral", 0xf08080)
	      .set("lightcyan", 0xe0ffff)
	      .set("lightgoldenrodyellow", 0xfafad2)
	      .set("lightgray", 0xd3d3d3)
	      .set("lightgreen", 0x90ee90)
	      .set("lightgrey", 0xd3d3d3)
	      .set("lightpink", 0xffb6c1)
	      .set("lightsalmon", 0xffa07a)
	      .set("lightseagreen", 0x20b2aa)
	      .set("lightskyblue", 0x87cefa)
	      .set("lightslategray", 0x778899)
	      .set("lightslategrey", 0x778899)
	      .set("lightsteelblue", 0xb0c4de)
	      .set("lightyellow", 0xffffe0)
	      .set("lime", 0x00ff00)
	      .set("limegreen", 0x32cd32)
	      .set("linen", 0xfaf0e6)
	      .set("magenta", 0xff00ff)
	      .set("maroon", 0x800000)
	      .set("mediumaquamarine", 0x66cdaa)
	      .set("mediumblue", 0x0000cd)
	      .set("mediumorchid", 0xba55d3)
	      .set("mediumpurple", 0x9370db)
	      .set("mediumseagreen", 0x3cb371)
	      .set("mediumslateblue", 0x7b68ee)
	      .set("mediumspringgreen", 0x00fa9a)
	      .set("mediumturquoise", 0x48d1cc)
	      .set("mediumvioletred", 0xc71585)
	      .set("midnightblue", 0x191970)
	      .set("mintcream", 0xf5fffa)
	      .set("mistyrose", 0xffe4e1)
	      .set("moccasin", 0xffe4b5)
	      .set("navajowhite", 0xffdead)
	      .set("navy", 0x000080)
	      .set("oldlace", 0xfdf5e6)
	      .set("olive", 0x808000)
	      .set("olivedrab", 0x6b8e23)
	      .set("orange", 0xffa500)
	      .set("orangered", 0xff4500)
	      .set("orchid", 0xda70d6)
	      .set("palegoldenrod", 0xeee8aa)
	      .set("palegreen", 0x98fb98)
	      .set("paleturquoise", 0xafeeee)
	      .set("palevioletred", 0xdb7093)
	      .set("papayawhip", 0xffefd5)
	      .set("peachpuff", 0xffdab9)
	      .set("peru", 0xcd853f)
	      .set("pink", 0xffc0cb)
	      .set("plum", 0xdda0dd)
	      .set("powderblue", 0xb0e0e6)
	      .set("purple", 0x800080)
	      .set("rebeccapurple", 0x663399)
	      .set("red", 0xff0000)
	      .set("rosybrown", 0xbc8f8f)
	      .set("royalblue", 0x4169e1)
	      .set("saddlebrown", 0x8b4513)
	      .set("salmon", 0xfa8072)
	      .set("sandybrown", 0xf4a460)
	      .set("seagreen", 0x2e8b57)
	      .set("seashell", 0xfff5ee)
	      .set("sienna", 0xa0522d)
	      .set("silver", 0xc0c0c0)
	      .set("skyblue", 0x87ceeb)
	      .set("slateblue", 0x6a5acd)
	      .set("slategray", 0x708090)
	      .set("slategrey", 0x708090)
	      .set("snow", 0xfffafa)
	      .set("springgreen", 0x00ff7f)
	      .set("steelblue", 0x4682b4)
	      .set("tan", 0xd2b48c)
	      .set("teal", 0x008080)
	      .set("thistle", 0xd8bfd8)
	      .set("tomato", 0xff6347)
	      .set("turquoise", 0x40e0d0)
	      .set("violet", 0xee82ee)
	      .set("wheat", 0xf5deb3)
	      .set("white", 0xffffff)
	      .set("whitesmoke", 0xf5f5f5)
	      .set("yellow", 0xffff00)
	      .set("yellowgreen", 0x9acd32);
	
	  function rgbn(n) {
	    return rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff);
	  }
	
	  function Hsl(h, s, l) {
	    this.h = +h;
	    this.s = Math.max(0, Math.min(1, +s));
	    this.l = Math.max(0, Math.min(1, +l));
	  }
	
	  var prototype = Hsl.prototype = new Color;
	
	  prototype.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };
	
	  prototype.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };/* From FvD 13.37, CSS Color Module Level 3 */
	
	  function hsl2rgb(h, m1, m2) {
	    return (h < 60 ? m1 + (m2 - m1) * h / 60
	        : h < 180 ? m2
	        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	        : m1) * 255;
	  }
	
	  prototype.rgb = function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l <= .5 ? l * (1 + s) : l + s - l * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2)
	    );
	  };
	
	  var hsl = function(h, s, l) {
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
	            s = l < .5 ? range / (max + min) : range / (2 - max - min);
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
	
	  var reHex3 = /^#([0-9a-f]{3})$/,
	      reHex6 = /^#([0-9a-f]{6})$/,
	      reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/,
	      reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,
	      reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	
	  var color = function(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf))) // #f00
	        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	        : (m = reRgbInteger.exec(format)) ? rgb(m[1], m[2], m[3]) // rgb(255,0,0)
	        : (m = reRgbPercent.exec(format)) ? rgb(m[1] * 2.55, m[2] * 2.55, m[3] * 2.55) // rgb(100%,0%,0%)
	        : (m = reHslPercent.exec(format)) ? hsl(m[1], m[2] * .01, m[3] * .01) // hsl(120,50%,50%)
	        : named.has(format) ? rgbn(named.get(format))
	        : null;
	  }
	
	  var rgb = function(r, g, b) {
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
	
	  var interpolateRgb = function(a, b) {
	    a = rgb(a);
	    b = rgb(b);
	    var ar = a.r,
	        ag = a.g,
	        ab = a.b,
	        br = b.r - ar,
	        bg = b.g - ag,
	        bb = b.b - ab;
	    return function(t) {
	      return format(Math.round(ar + br * t), Math.round(ag + bg * t), Math.round(ab + bb * t));
	    };
	  }
	
	  function interpolate0(b) {
	    return function() {
	      return b;
	    };
	  }
	
	  function interpolate1(b) {
	    return function(t) {
	      return b(t) + "";
	    };
	  }
	
	  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	      reB = new RegExp(reA.source, "g");
	
	  var interpolateString = function(a, b) {
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
	        q.push({i: i, x: interpolateNumber(am, bm)});
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
	        ? interpolate1(q[0].x)
	        : interpolate0(b))
	        : (b = q.length, function(t) {
	            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	            return s.join("");
	          });
	  }
	
	  var interpolators = [
	    function(a, b) {
	      var t = typeof b, c;
	      return (t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
	          : b instanceof color ? interpolateRgb
	          : Array.isArray(b) ? interpolateArray
	          : t === "object" && isNaN(b) ? interpolateObject
	          : interpolateNumber)(a, b);
	    }
	  ];
	  var rho = Math.SQRT2,
	      rho2 = 2,
	      rho4 = 4;
	
	  function cosh(x) {
	    return ((x = Math.exp(x)) + 1 / x) / 2;
	  }
	
	  function sinh(x) {
	    return ((x = Math.exp(x)) - 1 / x) / 2;
	  }
	
	  function tanh(x) {
	    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	  }// p0 = [ux0, uy0, w0]
	  // p1 = [ux1, uy1, w1]
	
	  var interpolateZoom = function(p0, p1) {
	    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	        dx = ux1 - ux0,
	        dy = uy1 - uy0,
	        d2 = dx * dx + dy * dy,
	        d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1),
	        dr = r1 - r0,
	        S = (dr || Math.log(w1 / w0)) / rho,
	        i = dr ? interpolate : interpolateSpecial;
	
	    // General case.
	    function interpolate(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    }
	
	    // Special case for u0 ~= u1.
	    function interpolateSpecial(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    }
	
	    i.duration = S * 1000;
	
	    return i;
	  }
	
	  var rad2deg = 180 / Math.PI,
	      identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0},
	      g;
	
	  function combine(a, b, k) {
	    a[0] += k * b[0];
	    a[1] += k * b[1];
	    return a;
	  }
	
	  function dot(a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	  }
	
	  function normalize(a) {
	    var k = Math.sqrt(dot(a, a));
	    if (k) a[0] /= k, a[1] /= k;
	    return k;
	  }// Compute x-scale and normalize the first row.
	  // Compute shear and make second row orthogonal to first.
	  // Compute y-scale and normalize the second row.
	  // Finally, compute the rotation.
	
	  function Transform(m) {
	    var r0 = [m.a, m.b],
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
	
	  function transform(string) {
	    if (!g) g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	    if (string != null) {
	      g.setAttribute("transform", string);
	      var t = g.transform.baseVal.consolidate();
	    }
	    return new Transform(t ? t.matrix : identity);
	  }
	
	  var interpolateTransform = function(a, b) {
	    var s = [], // string constants and placeholders
	        q = [], // number interpolators
	        n,
	        A = transform(a),
	        B = transform(b),
	        ta = A.translate,
	        tb = B.translate,
	        ra = A.rotate,
	        rb = B.rotate,
	        wa = A.skew,
	        wb = B.skew,
	        ka = A.scale,
	        kb = B.scale;
	
	    if (ta[0] != tb[0] || ta[1] != tb[1]) {
	      s.push("translate(", null, ",", null, ")");
	      q.push({i: 1, x: interpolateNumber(ta[0], tb[0])}, {i: 3, x: interpolateNumber(ta[1], tb[1])});
	    } else if (tb[0] || tb[1]) {
	      s.push("translate(" + tb + ")");
	    } else {
	      s.push("");
	    }
	
	    if (ra != rb) {
	      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
	      q.push({i: s.push(s.pop() + "rotate(", null, ")") - 2, x: interpolateNumber(ra, rb)});
	    } else if (rb) {
	      s.push(s.pop() + "rotate(" + rb + ")");
	    }
	
	    if (wa != wb) {
	      q.push({i: s.push(s.pop() + "skewX(", null, ")") - 2, x: interpolateNumber(wa, wb)});
	    } else if (wb) {
	      s.push(s.pop() + "skewX(" + wb + ")");
	    }
	
	    if (ka[0] != kb[0] || ka[1] != kb[1]) {
	      n = s.push(s.pop() + "scale(", null, ",", null, ")");
	      q.push({i: n - 4, x: interpolateNumber(ka[0], kb[0])}, {i: n - 2, x: interpolateNumber(ka[1], kb[1])});
	    } else if (kb[0] != 1 || kb[1] != 1) {
	      s.push(s.pop() + "scale(" + kb + ")");
	    }
	
	    n = q.length;
	    return function(t) {
	      var i = -1, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  }
	  var interpolateRound = function(a, b) {
	    return a = +a, b -= a, function(t) {
	      return Math.round(a + b * t);
	    };
	  }
	
	  exports.interpolate = interpolate;
	  exports.interpolateArray = interpolateArray;
	  exports.interpolateNumber = interpolateNumber;
	  exports.interpolateObject = interpolateObject;
	  exports.interpolateRound = interpolateRound;
	  exports.interpolateString = interpolateString;
	  exports.interpolateTransform = interpolateTransform;
	  exports.interpolateZoom = interpolateZoom;
	  exports.interpolators = interpolators;
	
	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Map === "undefined") {
	  Map = function() {};
	  Map.prototype = {
	    set: function(k, v) { this["$" + k] = v; return this; },
	    get: function(k) { return this["$" + k]; },
	    has: function(k) { return "$" + k in this; }
	  };
	}
	
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  factory((global.ease = {}));
	}(this, function (exports) { 'use strict';
	
	  function linearIn(t) {
	    return +t;
	  }
	
	  var k = 1 / (2 * Math.PI);
	
	  var number = function(x, defaultValue) {
	    return x == null || isNaN(x) ? defaultValue : +x;
	  }
	
	  function elasticInOut(a, p) {
	    a = Math.max(1, number(a, 1)), p = number(p, .3) * 1.5 * k; // Note: treatment differs from Penner!
	    var s = p * Math.asin(1 / a);
	    return function(t) {
	      return a * ((t = t * 2 - 1) < 0
	          ? Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	          : Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 2) / 2;
	    };
	  }
	
	  function elasticOut(a, p) {
	    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
	    var s = p * Math.asin(1 / a);
	    return function(t) {
	      return a * Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 1;
	    };
	  }
	
	  function elasticIn(a, p) {
	    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
	    var s = p * Math.asin(1 / a);
	    return function(t) {
	      return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	    };
	  }
	
	  function backInOut(s) {
	    return s = number(s, 1.70158) * 1.525, function(t) {
	      return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	    };
	  }
	
	  function backOut(s) {
	    return s = number(s, 1.70158), function(t) {
	      return --t * t * ((s + 1) * t + s) + 1;
	    };
	  }
	
	  function backIn(s) {
	    return s = number(s, 1.70158), function(t) {
	      return t * t * ((s + 1) * t - s);
	    };
	  }
	  var b1 = 4 / 11,
	      b2 = 6 / 11,
	      b3 = 8 / 11,
	      b4 = 3 / 4,
	      b5 = 9 / 11,
	      b6 = 10 / 11,
	      b7 = 15 / 16,
	      b8 = 21 / 22,
	      b9 = 63 / 64,
	      b0 = 1 / b1 / b1;
	
	  function bounceOut(t) {
	    return t < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	  }
	
	  function bounceInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	  }
	
	  function bounceIn(t) {
	    return 1 - bounceOut(1 - t);
	  }
	
	  function circleInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	  }
	
	  function circleOut(t) {
	    return Math.sqrt(1 - --t * t);
	  }
	  function circleIn(t) {
	    return 1 - Math.sqrt(1 - t * t);
	  }
	
	  function expInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	  }
	
	  function expOut(t) {
	    return 1 - Math.pow(2, -10 * t);
	  }
	  function expIn(t) {
	    return Math.pow(2, 10 * t - 10);
	  }
	  var pi = Math.PI,
	      halfPi = pi / 2;
	
	  function sinInOut(t) {
	    return (1 - Math.cos(pi * t)) / 2;
	  }
	
	  function sinOut(t) {
	    return Math.sin(t * halfPi);
	  }
	
	  function sinIn(t) {
	    return 1 - Math.cos(t * halfPi);
	  }
	
	  function cubicInOut(t) {
	    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	  }
	
	  function cubicOut(t) {
	    return --t * t * t + 1;
	  }
	  function cubicIn(t) {
	    return t * t * t;
	  }
	
	  function quadInOut(t) {
	    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	  }
	
	  function quadOut(t) {
	    return t * (2 - t);
	  }
	  function quadIn(t) {
	    return t * t;
	  }
	
	  var standardEases = (new Map)
	      .set("linear-in", linearIn)
	      .set("linear-out", linearIn)
	      .set("linear-in-out", linearIn)
	      .set("quad-in", quadIn)
	      .set("quad-out", quadOut)
	      .set("quad-in-out", quadInOut)
	      .set("cubic-in", cubicIn)
	      .set("cubic-out", cubicOut)
	      .set("cubic-in-out", cubicInOut)
	      .set("poly-in", cubicIn)
	      .set("poly-out", cubicOut)
	      .set("poly-in-out", cubicInOut)
	      .set("sin-in", sinIn)
	      .set("sin-out", sinOut)
	      .set("sin-in-out", sinInOut)
	      .set("exp-in", expIn)
	      .set("exp-out", expOut)
	      .set("exp-in-out", expInOut)
	      .set("circle-in", circleIn)
	      .set("circle-out", circleOut)
	      .set("circle-in-out", circleInOut)
	      .set("bounce-in", bounceIn)
	      .set("bounce-out", bounceOut)
	      .set("bounce-in-out", bounceInOut)
	      .set("back-in", backIn())
	      .set("back-out", backOut())
	      .set("back-in-out", backInOut())
	      .set("elastic-in", elasticIn())
	      .set("elastic-out", elasticOut())
	      .set("elastic-in-out", elasticInOut());
	
	  function polyInOut(e) {
	    return e = number(e, 3), function(t) {
	      return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	    };
	  }
	
	  function polyOut(e) {
	    return e = number(e, 3), function(t) {
	      return 1 - Math.pow(1 - t, e);
	    };
	  }
	
	  function polyIn(e) {
	    return e = number(e, 3), function(t) {
	      return Math.pow(t, e);
	    };
	  }
	
	  var customEases = (new Map)
	      .set("poly-in", polyIn)
	      .set("poly-out", polyOut)
	      .set("poly-in-out", polyInOut)
	      .set("back-in", backIn)
	      .set("back-out", backOut)
	      .set("back-in-out", backInOut)
	      .set("elastic-in", elasticIn)
	      .set("elastic-out", elasticOut)
	      .set("elastic-in-out", elasticInOut);
	
	  var ease = function(type, a, b) {
	    var i = (type += "").indexOf("-");
	    if (i < 0) type += "-in";
	    return arguments.length > 1 && customEases.has(type)
	        ? customEases.get(type)(a, b)
	        : standardEases.get(type) || linearIn;
	  }
	
	  exports.ease = ease;
	
	}));

/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory-animation.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Victory"] = factory(require("react"));
	else
		root["Victory"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_93__) {
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
	exports.VictoryContainer = exports.VictorySharedEvents = exports.VictoryTransition = exports.VictoryStack = exports.VictoryScatter = exports.VictoryPie = exports.VictoryLabel = exports.VictoryLine = exports.VictoryGroup = exports.VictoryChart = exports.VictoryBar = exports.VictoryAxis = exports.VictoryArea = exports.VictoryAnimation = undefined;
	
	var _victoryCore = __webpack_require__(1);
	
	var _victoryChart = __webpack_require__(130);
	
	var _victoryPie = __webpack_require__(324);
	
	exports.VictoryAnimation = _victoryCore.VictoryAnimation;
	exports.VictoryArea = _victoryChart.VictoryArea;
	exports.VictoryAxis = _victoryChart.VictoryAxis;
	exports.VictoryBar = _victoryChart.VictoryBar;
	exports.VictoryChart = _victoryChart.VictoryChart;
	exports.VictoryGroup = _victoryChart.VictoryGroup;
	exports.VictoryLine = _victoryChart.VictoryLine;
	exports.VictoryLabel = _victoryCore.VictoryLabel;
	exports.VictoryPie = _victoryPie.VictoryPie;
	exports.VictoryScatter = _victoryChart.VictoryScatter;
	exports.VictoryStack = _victoryChart.VictoryStack;
	exports.VictoryTransition = _victoryCore.VictoryTransition;
	exports.VictorySharedEvents = _victoryCore.VictorySharedEvents;
	exports.VictoryContainer = _victoryCore.VictoryContainer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VictoryContainer = exports.VictorySharedEvents = exports.VictoryTransition = exports.VictoryLabel = exports.VictoryAnimation = exports.Transitions = exports.Events = exports.PropTypes = exports.Style = exports.Log = exports.Helpers = exports.Collection = undefined;
	
	var _collection = __webpack_require__(2);
	
	Object.defineProperty(exports, "Collection", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_collection).default;
	  }
	});
	
	var _helpers = __webpack_require__(3);
	
	Object.defineProperty(exports, "Helpers", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_helpers).default;
	  }
	});
	
	var _log = __webpack_require__(85);
	
	Object.defineProperty(exports, "Log", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_log).default;
	  }
	});
	
	var _style = __webpack_require__(87);
	
	Object.defineProperty(exports, "Style", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_style).default;
	  }
	});
	
	var _propTypes = __webpack_require__(92);
	
	Object.defineProperty(exports, "PropTypes", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_propTypes).default;
	  }
	});
	
	var _events = __webpack_require__(94);
	
	Object.defineProperty(exports, "Events", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_events).default;
	  }
	});
	
	var _victoryAnimation = __webpack_require__(110);
	
	Object.defineProperty(exports, "VictoryAnimation", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_victoryAnimation).default;
	  }
	});
	
	var _victoryLabel = __webpack_require__(116);
	
	Object.defineProperty(exports, "VictoryLabel", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_victoryLabel).default;
	  }
	});
	
	var _victoryTransition = __webpack_require__(121);
	
	Object.defineProperty(exports, "VictoryTransition", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_victoryTransition).default;
	  }
	});
	
	var _victorySharedEvents = __webpack_require__(127);
	
	Object.defineProperty(exports, "VictorySharedEvents", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_victorySharedEvents).default;
	  }
	});
	
	var _victoryContainer = __webpack_require__(129);
	
	Object.defineProperty(exports, "VictoryContainer", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_victoryContainer).default;
	  }
	});
	
	var _transitions = __webpack_require__(118);
	
	var Transitions = _interopRequireWildcard(_transitions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Transitions = Transitions;

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _property2 = __webpack_require__(4);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _partial2 = __webpack_require__(17);
	
	var _partial3 = _interopRequireDefault(_partial2);
	
	var _merge2 = __webpack_require__(45);
	
	var _merge3 = _interopRequireDefault(_merge2);
	
	var _isFunction2 = __webpack_require__(63);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(82);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	      return (0, _defaults3.default)({ parent: { height: height, width: width } }, defaultStyles);
	    }
	
	    var data = style.data;
	    var labels = style.labels;
	    var parent = style.parent;
	
	    return {
	      parent: (0, _defaults3.default)({ height: height, width: width }, parent, defaultStyles.parent),
	      labels: (0, _defaults3.default)({}, labels, defaultStyles.labels),
	      data: (0, _defaults3.default)({}, data, defaultStyles.data)
	    };
	  },
	  evaluateProp: function evaluateProp(prop, data) {
	    return (0, _isFunction3.default)(prop) ? prop(data) : prop;
	  },
	  evaluateStyle: function evaluateStyle(style, data) {
	    var _this = this;
	
	    if (!Object.keys(style).some(function (value) {
	      return (0, _isFunction3.default)(style[value]);
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
	    var isVertical = axis !== "x";
	    var padding = this.getPadding(props);
	    if (isVertical) {
	      return [props.height - padding.bottom, padding.top];
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
	      return (0, _defaults3.default)({
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
	    if ((0, _isFunction3.default)(key)) {
	      return key;
	    } else if (key === null || typeof key === "undefined") {
	      // null/undefined means "return the data item itself"
	      return function (x) {
	        return x;
	      };
	    }
	    // otherwise, assume it is an array index, property key or path (_.property handles all three)
	    return (0, _property3.default)(key);
	  },
	  getPartialEvents: function getPartialEvents(events, index, childProps) {
	    return events ? Object.keys(events).reduce(function (memo, eventName) {
	      /* eslint max-params: 0 */
	      memo[eventName] = (0, _partial3.default)(events[eventName], _partial3.default.placeholder, // evt will still be the first argument for event handlers
	      childProps, // event handlers will have access to data component props, including data
	      index, // used in setting a unique state property
	      eventName // used in setting a unique state property
	      );
	      return memo;
	    }, {}) : {};
	  },
	  getEvents: function getEvents(events, namespace) {
	    var _this2 = this;
	
	    var onEvent = function onEvent(evt, childProps, index, eventName) {
	      if (_this2.props.events[namespace] && _this2.props.events[namespace][eventName]) {
	        _this2.setState(_defineProperty({}, index, (0, _merge3.default)({}, _this2.state[index], _this2.props.events[namespace][eventName](evt, childProps, index))));
	      }
	    };
	
	    return events ? Object.keys(this.props.events[namespace]).reduce(function (memo, event) {
	      memo[event] = onEvent;
	      return memo;
	    }, {}) : {};
	  },
	  getEventState: function getEventState(index, namespace) {
	    return this.state[index] && this.state[index][namespace];
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(5),
	    basePropertyDeep = __webpack_require__(6),
	    isKey = __webpack_require__(13),
	    toKey = __webpack_require__(16);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(7);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(8),
	    isKey = __webpack_require__(13),
	    toKey = __webpack_require__(16);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(9),
	    stringToPath = __webpack_require__(10);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(11),
	    toString = __webpack_require__(12);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(9),
	    isSymbol = __webpack_require__(14);
	
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
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(15);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 16 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(18),
	    getHolder = __webpack_require__(35),
	    replaceHolders = __webpack_require__(39),
	    rest = __webpack_require__(44);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with `partials` prepended to the
	 * arguments it receives. This method is like `_.bind` except it does **not**
	 * alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.2.0
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
	  var holders = replaceHolders(partials, getHolder(partial));
	  return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partial.placeholder = {};
	
	module.exports = partial;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(19),
	    createBaseWrapper = __webpack_require__(20),
	    createCurryWrapper = __webpack_require__(26),
	    createHybridWrapper = __webpack_require__(28),
	    createPartialWrapper = __webpack_require__(40),
	    getData = __webpack_require__(41),
	    mergeData = __webpack_require__(42),
	    setData = __webpack_require__(34),
	    toInteger = __webpack_require__(43);
	
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
	 *   512 - `_.flip`
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
/* 19 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var createCtorWrapper = __webpack_require__(21),
	    root = __webpack_require__(24);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(22),
	    isObject = __webpack_require__(23);
	
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
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23);
	
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
/* 23 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(25);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(27),
	    createCtorWrapper = __webpack_require__(21),
	    createHybridWrapper = __webpack_require__(28),
	    createRecurryWrapper = __webpack_require__(32),
	    getHolder = __webpack_require__(35),
	    replaceHolders = __webpack_require__(39),
	    root = __webpack_require__(24);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);
	
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
/* 27 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(29),
	    composeArgsRight = __webpack_require__(30),
	    countHolders = __webpack_require__(31),
	    createCtorWrapper = __webpack_require__(21),
	    createRecurryWrapper = __webpack_require__(32),
	    getHolder = __webpack_require__(35),
	    reorder = __webpack_require__(36),
	    replaceHolders = __webpack_require__(39),
	    root = __webpack_require__(24);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
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
	        args = Array(length),
	        index = length;
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
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
/* 29 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 30 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(33),
	    setData = __webpack_require__(34);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
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
	    newHoldersRight, argPos, ary, arity
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
/* 33 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}
	
	module.exports = getHolder;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(37),
	    isIndex = __webpack_require__(38);
	
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
/* 37 */
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
/* 38 */
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
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(27),
	    createCtorWrapper = __webpack_require__(21),
	    root = __webpack_require__(24);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
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
/* 41 */
/***/ function(module, exports) {

	/**
	 * A method that returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(27),
	    toInteger = __webpack_require__(43);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(46),
	    createAssigner = __webpack_require__(80);
	
	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(47),
	    arrayEach = __webpack_require__(55),
	    assignMergeValue = __webpack_require__(56),
	    baseMergeDeep = __webpack_require__(57),
	    isArray = __webpack_require__(9),
	    isObject = __webpack_require__(23),
	    isTypedArray = __webpack_require__(68),
	    keysIn = __webpack_require__(72);
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  if (!(isArray(source) || isTypedArray(source))) {
	    var props = keysIn(source);
	  }
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(48),
	    listCacheDelete = __webpack_require__(49),
	    listCacheGet = __webpack_require__(52),
	    listCacheHas = __webpack_require__(53),
	    listCacheSet = __webpack_require__(54);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(50);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(51);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
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
/* 51 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(50);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(50);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(50);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(51);
	
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(56),
	    baseClone = __webpack_require__(58),
	    copyArray = __webpack_require__(37),
	    isArguments = __webpack_require__(59),
	    isArray = __webpack_require__(9),
	    isArrayLikeObject = __webpack_require__(60),
	    isFunction = __webpack_require__(63),
	    isObject = __webpack_require__(23),
	    isPlainObject = __webpack_require__(65),
	    isTypedArray = __webpack_require__(68),
	    toPlainObject = __webpack_require__(69);
	
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
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
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
	        newValue = baseClone(srcValue, true);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
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
/* 58 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(61),
	    isObjectLike = __webpack_require__(15);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(62),
	    isFunction = __webpack_require__(63),
	    isLength = __webpack_require__(64);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(5);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 64 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(66),
	    isHostObject = __webpack_require__(67),
	    isObjectLike = __webpack_require__(15);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
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
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(64),
	    isObjectLike = __webpack_require__(15);
	
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
	    dataViewTag = '[object DataView]',
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
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(70),
	    keysIn = __webpack_require__(72);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
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
	
	module.exports = copyObject;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(51);
	
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(73),
	    indexKeys = __webpack_require__(76),
	    isIndex = __webpack_require__(38),
	    isPrototype = __webpack_require__(79);
	
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
	 * @since 3.0.0
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(74),
	    iteratorToArray = __webpack_require__(75);
	
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(24);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(77),
	    isArguments = __webpack_require__(59),
	    isArray = __webpack_require__(9),
	    isLength = __webpack_require__(64),
	    isString = __webpack_require__(78);
	
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
/* 77 */
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(9),
	    isObjectLike = __webpack_require__(15);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 79 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(81),
	    rest = __webpack_require__(44);
	
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
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
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
/* 81 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(27),
	    assignInDefaults = __webpack_require__(83),
	    assignInWith = __webpack_require__(84),
	    rest = __webpack_require__(44);
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(51);
	
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(70),
	    createAssigner = __webpack_require__(80),
	    keysIn = __webpack_require__(72);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
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
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 85 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86)))

/***/ },
/* 86 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reduceCssCalc = __webpack_require__(88);
	
	var _reduceCssCalc2 = _interopRequireDefault(_reduceCssCalc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Given an object with CSS/SVG transform definitions, return the string value
	 * for use with the `transform` CSS property or SVG attribute. Note that we
	 * can't always guarantee the order will match the author's intended order, so
	 * authors should only use the object notation if they know that their transform
	 * is commutative or that there is only one.
	 * @param {Object} obj An object of transform definitions.
	 * @returns {String} The generated transform string.
	 */
	var toTransformString = function toTransformString(obj) {
	  for (var _len = arguments.length, more = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    more[_key - 1] = arguments[_key];
	  }
	
	  if (more.length > 0) {
	    return more.reduce(function (memo, currentObj) {
	      return [memo, toTransformString(currentObj)].join(" ");
	    }, toTransformString(obj));
	  } else {
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
	  }
	};
	
	exports.default = {
	
	  toTransformString: toTransformString,
	
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	var balanced = __webpack_require__(89)
	var reduceFunctionCall = __webpack_require__(90)
	
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
	
	    // If the expression contains multiple units or CSS variables,
	    // then let the expression be (i.e. browser calc())
	    if (units.length > 1 || expression.indexOf("var(") > -1) {
	      return functionIdentifier + "(" + expression + ")"
	    }
	
	    var unit = units[0] || ""
	
	    if (unit === "%") {
	      // Convert percentages to numbers, to handle expressions like: 50% * 50% (will become: 25%):
	      // console.log(expression)
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
	    if (functionIdentifier.length || unit === "%") {
	      result = Math.round(result * decimalPrecision) / decimalPrecision
	    }
	
	    // Add unit
	    result += unit
	
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
/* 89 */
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Module dependencies
	 */
	var balanced = __webpack_require__(91)
	
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
/* 91 */
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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction2 = __webpack_require__(63);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _react = __webpack_require__(93);
	
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
	      if ((0, _isFunction3.default)(scl)) {
	        return (0, _isFunction3.default)(scl.copy) && (0, _isFunction3.default)(scl.domain) && (0, _isFunction3.default)(scl.range);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86)))

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_93__;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _property2 = __webpack_require__(4);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _isEmpty2 = __webpack_require__(95);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _isFunction2 = __webpack_require__(63);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _partial2 = __webpack_require__(17);
	
	var _partial3 = _interopRequireDefault(_partial2);
	
	var _merge2 = __webpack_require__(45);
	
	var _merge3 = _interopRequireDefault(_merge2);
	
	var _extend7 = __webpack_require__(108);
	
	var _extend8 = _interopRequireDefault(_extend7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/* Example Event Prop
	  [
	    {
	      childName: "firstBar",
	      target: "data",
	      eventKey: 1,
	      eventKey: "thisOne",
	      eventHandlers: {
	        onClick: () => {},
	        ...
	      }
	    },
	    {
	      target: "labels",
	      eventHandlers: {
	        onClick: () => {}
	      }
	    }
	  ]
	  */
	
	/* Example Event handler return
	[
	  {
	    childName: "fistBar",
	    target: "data",
	    eventKey: 1,
	    mutation: (propsForTarget) => {
	      return {style: merge({}, propsForTarget.style, {fill: "red"})}
	    }
	  },
	  {
	    target: "labels",
	    eventKey: 2,
	    mutation: () => { return {text: "hello"}; }
	  }
	]
	*/
	
	exports.default = {
	  getPartialEvents: function getPartialEvents(events, eventKey, childProps) {
	    return events ? Object.keys(events).reduce(function (memo, eventName) {
	      /* eslint max-params: 0 */
	      memo[eventName] = (0, _partial3.default)(events[eventName], _partial3.default.placeholder, // evt will still be the first argument for event handlers
	      childProps, // event handlers will have access to data component props, including data
	      eventKey, // used in setting a unique state property
	      eventName // used in setting a unique state property
	      );
	      return memo;
	    }, {}) : {};
	  },
	  getScopedEvents: function getScopedEvents(events, namespace, childType, baseProps) {
	    var _this = this;
	
	    baseProps = baseProps || this.baseProps;
	    var getTargetProps = function getTargetProps(identifier, type) {
	      var childName = identifier.childName;
	      var target = identifier.target;
	      var key = identifier.key;
	
	      var baseType = type === "props" ? baseProps : _this.state;
	      var base = !childName || !baseType[childName] ? baseType : baseType[childName];
	      return key === "parent" ? base.parent : base[key] && base[key][target];
	    };
	
	    var parseEvent = function parseEvent(eventReturn, eventKey) {
	      var nullFunction = function nullFunction() {
	        return null;
	      };
	      var childName = eventReturn.childName || childType;
	      var target = eventReturn.target || namespace;
	
	      var getKeys = function getKeys() {
	        if (baseProps.all || baseProps[childName] && baseProps[childName].all) {
	          return "all";
	        } else if (eventReturn.eventKey === "all") {
	          return baseProps[childName] ? Object.keys(baseProps[childName]) : Object.keys(baseProps);
	        } else if (eventReturn.eventKey === undefined && eventKey === "parent") {
	          return baseProps[childName] ? Object.keys(baseProps[childName]) : Object.keys(baseProps);
	        }
	        return eventReturn.eventKey !== undefined ? eventReturn.eventKey : eventKey;
	      };
	      var mutationKeys = getKeys();
	
	      var getMutationObject = function getMutationObject(key) {
	        var mutationTargetProps = getTargetProps({ childName: childName, key: key, target: target }, "props");
	        var mutationTargetState = getTargetProps({ childName: childName, key: key, target: target }, "state");
	        var mutation = eventReturn.mutation || nullFunction;
	        var mutatedProps = mutation(Object.assign({}, mutationTargetProps, mutationTargetState), baseProps);
	        var childState = _this.state[childName] || {};
	        return childName ? (0, _extend8.default)(_this.state, _defineProperty({}, childName, (0, _extend8.default)(childState, _defineProperty({}, key, (0, _extend8.default)(childState[key], _defineProperty({}, target, mutatedProps)))))) : (0, _extend8.default)(_this.state, _defineProperty({}, key, (0, _extend8.default)(_this.state[key], _defineProperty({}, target, mutatedProps))));
	      };
	      return Array.isArray(mutationKeys) ? mutationKeys.reduce(function (memo, k) {
	        return Object.assign(memo, getMutationObject(k));
	      }, {}) : getMutationObject(mutationKeys);
	    };
	
	    var parseEventReturn = function parseEventReturn(eventReturn, eventKey) {
	      return Array.isArray(eventReturn) ? eventReturn.reduce(function (memo, props) {
	        memo = (0, _merge3.default)({}, memo, parseEvent(props, eventKey));
	        return memo;
	      }, {}) : parseEvent(eventReturn, eventKey);
	    };
	
	    var onEvent = function onEvent(evt, childProps, eventKey, eventName) {
	      var eventReturn = events[eventName](evt, childProps, eventKey);
	      if (eventReturn) {
	        _this.setState(parseEventReturn(eventReturn, eventKey));
	      }
	    };
	
	    return !(0, _isEmpty3.default)(events) ? Object.keys(events).reduce(function (memo, event) {
	      memo[event] = onEvent;
	      return memo;
	    }, {}) : {};
	  },
	  getEvents: function getEvents(props, target, eventKey, getScopedEvents) {
	    var getEventsFromProps = function getEventsFromProps(events) {
	
	      var getSelectedEvents = function getSelectedEvents() {
	        var targetEvents = events.reduce(function (memo, event) {
	          if (event.target !== undefined) {
	            return "" + event.target === "" + target ? memo.concat(event) : memo;
	          }
	          return memo.concat(event);
	        }, []);
	
	        if (eventKey !== undefined && target !== "parent") {
	          return targetEvents.filter(function (obj) {
	            return obj.eventKey ? "" + obj.eventKey === "" + eventKey : true;
	          });
	        }
	        return targetEvents;
	      };
	
	      var selectedEvents = getSelectedEvents();
	      return Array.isArray(selectedEvents) && selectedEvents.reduce(function (memo, event) {
	        return event ? Object.assign(memo, event.eventHandlers) : memo;
	      }, {});
	    };
	
	    var ownEvents = props.events && getScopedEvents(getEventsFromProps(props.events), target);
	    if (!props.sharedEvents) {
	      return ownEvents;
	    }
	    var getSharedEvents = props.sharedEvents.getEvents;
	    var sharedEvents = props.sharedEvents.events && getSharedEvents(getEventsFromProps(props.sharedEvents.events), target);
	    return Object.assign({}, sharedEvents, ownEvents);
	  },
	  getEventState: function getEventState(eventKey, namespace, childType) {
	    if (!childType) {
	      return this.state[eventKey] && this.state[eventKey][namespace];
	    }
	    return this.state[childType] && this.state[childType][eventKey] && this.state[childType][eventKey][namespace];
	  },
	  getEventKey: function getEventKey(key) {
	    // creates a data accessor function
	    // given a property key, path, array index, or null for identity.
	    if ((0, _isFunction3.default)(key)) {
	      return key;
	    } else if (key === null || typeof key === "undefined") {
	      return function () {
	        return undefined;
	      };
	    }
	    // otherwise, assume it is an array index, property key or path (_.property handles all three)
	    return (0, _property3.default)(key);
	  },
	  addEventKeys: function addEventKeys(props, data) {
	    var eventKeyAccessor = this.getEventKey(props.eventKey);
	    return data.map(function (datum, index) {
	      var eventKey = datum.eventKey || eventKeyAccessor(datum) || index;
	      return Object.assign({ eventKey: eventKey }, datum);
	    });
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(96),
	    isArguments = __webpack_require__(59),
	    isArray = __webpack_require__(9),
	    isArrayLike = __webpack_require__(61),
	    isBuffer = __webpack_require__(104),
	    isFunction = __webpack_require__(63),
	    isObjectLike = __webpack_require__(15),
	    isString = __webpack_require__(78),
	    keys = __webpack_require__(107);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || isString(value) || isFunction(value.splice) ||
	        isArguments(value) || isBuffer(value))) {
	    return !value.length;
	  }
	  if (isObjectLike(value)) {
	    var tag = getTag(value);
	    if (tag == mapTag || tag == setTag) {
	      return !value.size;
	    }
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return !(nonEnumShadows && keys(value).length);
	}
	
	module.exports = isEmpty;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(97),
	    Map = __webpack_require__(99),
	    Promise = __webpack_require__(100),
	    Set = __webpack_require__(101),
	    WeakMap = __webpack_require__(102),
	    toSource = __webpack_require__(103);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
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
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(98),
	    root = __webpack_require__(24);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(98),
	    root = __webpack_require__(24);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(98),
	    root = __webpack_require__(24);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(98),
	    root = __webpack_require__(24);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(98),
	    root = __webpack_require__(24);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(24),
	    stubFalse = __webpack_require__(106);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
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
	var isBuffer = !Buffer ? stubFalse : function(value) {
	  return value instanceof Buffer;
	};
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module)))

/***/ },
/* 105 */
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
/* 106 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 107 */
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
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(109);


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71),
	    copyObject = __webpack_require__(70),
	    createAssigner = __webpack_require__(80),
	    isArrayLike = __webpack_require__(61),
	    isPrototype = __webpack_require__(79),
	    keysIn = __webpack_require__(72);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * function Bar() {
	 *   this.d = 4;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 * Bar.prototype.e = 5;
	 *
	 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keysIn(source), object);
	    return;
	  }
	  for (var key in source) {
	    assignValue(object, key, source[key]);
	  }
	});
	
	module.exports = assignIn;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Ease = __webpack_require__(111);
	
	var _d3Ease2 = _interopRequireDefault(_d3Ease);
	
	var _d3Interpolate = __webpack_require__(112);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
	var _d3Timer = __webpack_require__(114);
	
	var _util = __webpack_require__(115);
	
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
/* 111 */
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(113)) :
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
	
	  var version = "0.2.0";
	
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
/* 113 */
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
/* 114 */
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addVictoryInterpolator = exports.victoryInterpolator = exports.interpolateArray = exports.interpolateFunction = exports.interpolateImmediate = exports.isInterpolatable = undefined;
	
	var _isPlainObject2 = __webpack_require__(65);
	
	var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _d3Interpolate = __webpack_require__(112);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
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
	        return obj instanceof Date || Array.isArray(obj) || (0, _isPlainObject3.default)(obj);
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
	 * This function is adapted from https://github.com/d3-interpolate/master/src/array.js
	 * This function may be removed pending the merge of https://github.com/d3/d3-interpolate/pull/19
	 * This function differs from d3-interpolate in that it wont return an array longer
	 * than the end array.
	 *
	 * @param {any} a - Start value.
	 * @param {any} b - End value.
	 * @returns {Function} An interpolation function.
	 */
	var interpolateArray = exports.interpolateArray = function interpolateArray(a, b) {
	  var x = [];
	  var c = [];
	  var na = a ? a.length : 0;
	  var nb = b ? b.length : 0;
	  var n0 = Math.min(na, nb);
	  var i = void 0;
	
	  for (i = 0; i < n0; ++i) {
	    x.push(_d3Interpolate2.default.value(a[i], b[i]));
	  }
	  for (i = 0; i < nb; ++i) {
	    c[i] = b[i];
	  }
	
	  return function (t) {
	    for (i = 0; i < n0; ++i) {
	      c[i] = x[i](t);
	    }
	    return c;
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
	  if (Array.isArray(a) && Array.isArray(b)) {
	    return interpolateArray(a, b);
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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(117);
	
	var _merge = __webpack_require__(45);
	
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
	    key: "getTransform",
	    value: function getTransform(props) {
	      var style = this.getStyles(props);
	      var datum = props.datum;
	      var x = props.x;
	      var y = props.y;
	
	      var angle = props.angle || style.angle;
	      var transform = props.transfrom || style.transform;
	      var transformPart = transform && _index.Helpers.evaluateProp(transform, datum);
	      var rotatePart = angle && { rotate: [angle, x, y] };
	      return (transformPart || angle) && _index.Style.toTransformString(transformPart, rotatePart);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      var datum = this.props.datum || this.props.data;
	      var lineHeight = this.getHeight(this.props, "lineHeight");
	      var transform = this.getTransform(this.props);
	
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
	   * Specifies the angle to rotate the text by.
	   */
	  angle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Events = exports.PropTypes = exports.Transitions = exports.Style = exports.Log = exports.Helpers = exports.Collection = undefined;
	
	var _collection = __webpack_require__(2);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	var _helpers = __webpack_require__(3);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _log = __webpack_require__(85);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _style = __webpack_require__(87);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _propTypes = __webpack_require__(92);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _events = __webpack_require__(94);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _transitions = __webpack_require__(118);
	
	var Transitions = _interopRequireWildcard(_transitions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Collection = _collection2.default;
	exports.Helpers = _helpers2.default;
	exports.Log = _log2.default;
	exports.Style = _style2.default;
	exports.Transitions = Transitions;
	exports.PropTypes = _propTypes2.default;
	exports.Events = _events2.default;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _identity2 = __webpack_require__(119);
	
	var _identity3 = _interopRequireDefault(_identity2);
	
	var _defaults2 = __webpack_require__(82);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _assign2 = __webpack_require__(120);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	exports.getInitialTransitionState = getInitialTransitionState;
	exports.getTransitionPropsFactory = getTransitionPropsFactory;
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable func-style */
	
	
	function getDatumKey(datum, idx) {
	  return (datum.key || idx).toString();
	}
	
	function getKeyedData(data) {
	  return data.reduce(function (keyedData, datum, idx) {
	    var key = getDatumKey(datum, idx);
	    keyedData[key] = datum;
	    return keyedData;
	  }, {});
	}
	
	function getKeyedDataDifference(a, b) {
	  var hasDifference = false;
	  var difference = Object.keys(a).reduce(function (_difference, key) {
	    if (!(key in b)) {
	      hasDifference = true;
	      _difference[key] = true;
	    }
	    return _difference;
	  }, {});
	  return hasDifference && difference;
	}
	
	/**
	 * Calculate which data-points exist in oldData and not nextData -
	 * these are the `entering` data-points.  Also calculate which
	 * data-points exist in nextData and not oldData - thses are the
	 * `entering` data-points.
	 *
	 * @param  {Array} oldData   this.props.data Array
	 * @param  {Array} nextData  this.props.data Array
	 *
	 * @return {Object}          Object with `entering` and `exiting` properties.
	 *                           entering[datum.key] will be true if the data is
	 *                           entering, and similarly for `exiting`.
	 */
	function getNodeTransitions(oldData, nextData) {
	  var oldDataKeyed = oldData && getKeyedData(oldData);
	  var nextDataKeyed = nextData && getKeyedData(nextData);
	
	  return {
	    entering: oldDataKeyed && getKeyedDataDifference(nextDataKeyed, oldDataKeyed),
	    exiting: nextDataKeyed && getKeyedDataDifference(oldDataKeyed, nextDataKeyed)
	  };
	}
	
	function getChildData(child) {
	  if (child.type && child.type.getData) {
	    return child.type.getData(child.props);
	  }
	  return child.props && child.props.data || false;
	}
	
	/**
	 * If a parent component has animation enabled, calculate the transitions
	 * for any data of any child component that supports data transitions
	 * Data transitions are defined as any two datasets where data nodes exist
	 * in the first set and not the second, in the second and not the first,
	 * or both.
	 *
	 * @param  {Children}  oldChildren   this.props.children from old props
	 * @param  {Children}  nextChildren  this.props.children from next props
	 *
	 * @return {Object}                  Object with the following properties:
	 *                                    - nodesWillExit
	 *                                    - nodesWillEnter
	 *                                    - childrenTransitions
	 *                                    - nodesShouldEnter
	 */
	function getInitialTransitionState(oldChildren, nextChildren) {
	  var nodesWillExit = false;
	  var nodesWillEnter = false;
	
	  var getTransition = function getTransition(oldChild, newChild) {
	    if (!newChild || oldChild.type !== newChild.type) {
	      return {};
	    }
	
	    var _ref = getNodeTransitions(getChildData(oldChild), getChildData(newChild)) || {};
	
	    var entering = _ref.entering;
	    var exiting = _ref.exiting;
	
	
	    nodesWillExit = nodesWillExit || !!exiting;
	    nodesWillEnter = nodesWillEnter || !!entering;
	
	    return { entering: entering || false, exiting: exiting || false };
	  };
	
	  var getTransitionsFromChildren = function getTransitionsFromChildren(old, next) {
	    return old.map(function (child, idx) {
	      if (child.props.children) {
	        return getTransitionsFromChildren(_react2.default.Children.toArray(old[idx].props.children), _react2.default.Children.toArray(next[idx].props.children));
	      }
	      return getTransition(child, next[idx]);
	    });
	  };
	
	  var childrenTransitions = getTransitionsFromChildren(_react2.default.Children.toArray(oldChildren), _react2.default.Children.toArray(nextChildren));
	  return {
	    nodesWillExit: nodesWillExit,
	    nodesWillEnter: nodesWillEnter,
	    childrenTransitions: childrenTransitions,
	    // TODO: This may need to be refactored for the following situation.
	    //       The component receives new props, and the data provided
	    //       is a perfect match for the previous data and domain except
	    //       for new nodes. In this case, we wouldn't want a delay before
	    //       the new nodes appear.
	    nodesShouldEnter: false
	  };
	}
	
	function getInitialChildProps(animate, data) {
	  var after = animate.onEnter && animate.onEnter.after ? animate.onEnter.after : _identity3.default;
	  return {
	    data: data.map(function (datum) {
	      return (0, _assign3.default)({}, datum, after(datum));
	    })
	  };
	}
	
	function getChildPropsOnExit(animate, data, exitingNodes, cb) {
	  // eslint-disable-line max-params
	  // Whether or not _this_ child has exiting nodes, we want the exit-
	  // transition for all children to have the same duration, delay, etc.
	  var onExit = animate && animate.onExit;
	  animate = (0, _assign3.default)({}, animate, onExit);
	
	  if (exitingNodes) {
	    (function () {
	      // After the exit transition occurs, trigger the animations for
	      // nodes that are neither exiting or entering.
	      animate.onEnd = cb;
	      var before = animate.onExit && animate.onExit.before ? animate.onExit.before : _identity3.default;
	      // If nodes need to exit, transform them with the provided onExit.before function.
	      data = data.map(function (datum, idx) {
	        var key = (datum.key || idx).toString();
	        return exitingNodes[key] ? (0, _assign3.default)({}, datum, before(datum)) : datum;
	      });
	    })();
	  }
	  return { animate: animate, data: data };
	}
	
	function getChildPropsBeforeEnter(animate, data, enteringNodes, cb) {
	  // eslint-disable-line max-params,max-len
	  if (enteringNodes) {
	    (function () {
	      // Perform a normal animation here, except - when it finishes - trigger
	      // the transition for entering nodes.
	      animate = (0, _assign3.default)({}, animate, { onEnd: cb });
	      var before = animate.onEnter && animate.onEnter.before ? animate.onEnter.before : _identity3.default;
	      // We want the entering nodes to be included in the transition target
	      // domain.  However, we may not want these nodes to be displayed initially,
	      // so perform the `onEnter.before` transformation on each node.
	      data = data.map(function (datum, idx) {
	        var key = (datum.key || idx).toString();
	        return enteringNodes[key] ? (0, _assign3.default)({}, datum, before(datum)) : datum;
	      });
	    })();
	  }
	
	  return { animate: animate, data: data };
	}
	
	function getChildPropsOnEnter(animate, data, enteringNodes) {
	  // Whether or not _this_ child has entering nodes, we want the entering-
	  // transition for all children to have the same duration, delay, etc.
	  var onEnter = animate && animate.onEnter;
	  animate = (0, _assign3.default)({}, animate, onEnter);
	
	  if (enteringNodes) {
	    (function () {
	      // Old nodes have been transitioned to their new values, and the
	      // domain should encompass the nodes that will now enter. So perform
	      // the `onEnter.after` transformation on each node.
	      var after = animate.onEnter && animate.onEnter.after ? animate.onEnter.after : _identity3.default;
	      data = data.map(function (datum, idx) {
	        var key = getDatumKey(datum, idx);
	        return enteringNodes[key] ? (0, _assign3.default)({}, datum, after(datum)) : datum;
	      });
	    })();
	  }
	  return { animate: animate, data: data };
	}
	
	/**
	 * getTransitionPropsFactory - putting the Java in JavaScript.  This will return a
	 * function that returns prop transformations for a child, given that child's props
	 * and its index in the parent's children array.
	 *
	 * In particular, this will include an `animate` object that is set appropriately
	 * so that each child will be synchoronized for each stage of a transition
	 * animation.  It will also include a transformed `data` object, where each datum
	 * is transformed by `animate.onExit` and `animate.onEnter` `before` and `after`
	 * functions.
	 *
	 * @param  {Object}  props       `this.props` for the parent component.
	 * @param  {Object} state        `this.state` for the parent component.
	 * @param  {Function} setState    Function that, when called, will `this.setState` on
	 *                                 the parent component with the provided object.
	 *
	 * @return {Function}              Child-prop transformation function.
	 */
	function getTransitionPropsFactory(props, state, setState) {
	  var nodesWillExit = state && state.nodesWillExit;
	  var nodesWillEnter = state && state.nodesWillEnter;
	  var nodesShouldEnter = state && state.nodesShouldEnter;
	  var childrenTransitions = state && state.childrenTransitions || [];
	  var transitionDurations = {
	    enter: props.animate && props.animate.onEnter && props.animate.onEnter.duration,
	    exit: props.animate && props.animate.onExit && props.animate.onExit.duration,
	    move: props.animate && props.animate.duration
	  };
	
	  var onExit = function onExit(nodes, data, animate) {
	    return getChildPropsOnExit(animate, data, nodes, function () {
	      setState({ nodesWillExit: false });
	    });
	  };
	
	  var onEnter = function onEnter(nodes, data, animate) {
	    return nodesShouldEnter ? getChildPropsOnEnter(animate, data, nodes) : getChildPropsBeforeEnter(animate, data, nodes, function () {
	      setState({ nodesShouldEnter: true });
	    });
	  };
	
	  var getChildTransitionDuration = function getChildTransitionDuration(child, type) {
	    var animate = child.props.animate;
	    var defaultTransitions = child.type && child.type.defaultTransitions;
	    return animate[type] && animate[type].duration || defaultTransitions[type] && defaultTransitions[type].duration;
	  };
	
	  return function getTransitionProps(child, index) {
	    // eslint-disable-line max-statements
	    var data = getChildData(child) || [];
	    var animate = (0, _defaults3.default)({}, props.animate, child.props.animate);
	
	    animate.onExit = (0, _defaults3.default)({}, animate.onExit, child.type.defaultTransitions && child.type.defaultTransitions.onExit);
	    animate.onEnter = (0, _defaults3.default)({}, animate.onEnter, child.type.defaultTransitions && child.type.defaultTransitions.onEnter);
	
	    var childTransitions = childrenTransitions[index] || childrenTransitions[0];
	    if (nodesWillExit) {
	      var exitingNodes = childTransitions && childTransitions.exiting;
	      var exit = transitionDurations.exit || getChildTransitionDuration(child, "onExit");
	      // if nodesWillExit, but this child has no exiting nodes, set a delay instead of a duration
	      var animation = exitingNodes ? { duration: exit } : { delay: exit };
	      return onExit(exitingNodes, data, (0, _assign3.default)({}, animate, animation));
	    } else if (nodesWillEnter) {
	      var enteringNodes = childTransitions && childTransitions.entering;
	      var enter = transitionDurations.enter || getChildTransitionDuration(child, "onEnter");
	      var move = transitionDurations.move || child.props.animate && child.props.animate.duration;
	      var _animation = { duration: nodesShouldEnter && enteringNodes ? enter : move };
	      return onEnter(enteringNodes, data, (0, _assign3.default)({}, animate, _animation));
	    } else if (!state && animate && animate.onExit) {
	      // This is the initial render, and nodes may enter when props change. Because
	      // animation interpolation is determined by old- and next- props, data may need
	      // to be augmented with certain properties.
	      //
	      // For example, it may be desired that exiting nodes go from `opacity: 1` to
	      // `opacity: 0`. Without setting this on a per-datum basis, the interpolation
	      // might go from `opacity: undefined` to `opacity: 0`, which would result in
	      // interpolated `opacity: NaN` values.
	      //
	      return getInitialChildProps(animate, data);
	    }
	    return { animate: animate, data: data };
	  };
	}

/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71),
	    copyObject = __webpack_require__(70),
	    createAssigner = __webpack_require__(80),
	    isArrayLike = __webpack_require__(61),
	    isPrototype = __webpack_require__(79),
	    keys = __webpack_require__(107);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pick2 = __webpack_require__(122);
	
	var _pick3 = _interopRequireDefault(_pick2);
	
	var _isFunction2 = __webpack_require__(63);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(82);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryAnimation = __webpack_require__(110);
	
	var _victoryAnimation2 = _interopRequireDefault(_victoryAnimation);
	
	var _index = __webpack_require__(117);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VictoryTransition = function (_React$Component) {
	  _inherits(VictoryTransition, _React$Component);
	
	  function VictoryTransition() {
	    _classCallCheck(this, VictoryTransition);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryTransition).apply(this, arguments));
	  }
	
	  _createClass(VictoryTransition, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState(this.getTransitionState(this.props, nextProps));
	    }
	  }, {
	    key: "getTransitionState",
	    value: function getTransitionState(props, nextProps) {
	      var animate = props.animate;
	
	      if (!animate) {
	        return {};
	      } else if (animate.parentState) {
	        var oldProps = animate.parentState.nodesWillExit ? props : null;
	        return { oldProps: oldProps };
	      } else {
	        var oldChildren = _react2.default.Children.toArray(props.children);
	        var nextChildren = _react2.default.Children.toArray(nextProps.children);
	
	        var _Transitions$getIniti = _index.Transitions.getInitialTransitionState(oldChildren, nextChildren);
	
	        var nodesWillExit = _Transitions$getIniti.nodesWillExit;
	        var nodesWillEnter = _Transitions$getIniti.nodesWillEnter;
	        var childrenTransitions = _Transitions$getIniti.childrenTransitions;
	        var nodesShouldEnter = _Transitions$getIniti.nodesShouldEnter;
	
	        return {
	          nodesWillExit: nodesWillExit,
	          nodesWillEnter: nodesWillEnter,
	          childrenTransitions: childrenTransitions,
	          nodesShouldEnter: nodesShouldEnter,
	          oldProps: nodesWillExit ? props : null
	        };
	      }
	    }
	  }, {
	    key: "getDomainFromChildren",
	    value: function getDomainFromChildren(props, axis) {
	      var getChildDomains = function getChildDomains(children) {
	        return children.reduce(function (memo, child) {
	          if (child.type && (0, _isFunction3.default)(child.type.getDomain)) {
	            var childDomain = child.props && child.type.getDomain(child.props, axis);
	            return childDomain ? memo.concat(childDomain) : memo;
	          } else if (child.props && child.props.children) {
	            return memo.concat(getChildDomains(_react2.default.Children.toArray(child.props.children)));
	          }
	          return memo;
	        }, []);
	      };
	
	      var childComponents = _react2.default.Children.toArray(props.children);
	      if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
	        return Array.isArray(props.domain) ? props.domain : props.domain[axis];
	      } else {
	        var childDomains = getChildDomains(childComponents);
	        return childDomains.length === 0 ? [0, 1] : [Math.min.apply(Math, _toConsumableArray(childDomains)), Math.max.apply(Math, _toConsumableArray(childDomains))];
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      var props = this.state && this.state.nodesWillExit ? this.state.oldProps : this.props;
	      var getTransitionProps = this.props.animate && this.props.animate.getTransitions ? this.props.animate.getTransitions : _index.Transitions.getTransitionPropsFactory(props, this.state, function (newState) {
	        return _this2.setState(newState);
	      });
	      var child = _react2.default.Children.toArray(props.children)[0];
	      var transitionProps = getTransitionProps(child);
	      var domain = {
	        x: this.getDomainFromChildren(props, "x"),
	        y: this.getDomainFromChildren(props, "y")
	      };
	      var combinedProps = (0, _defaults3.default)({ domain: domain }, transitionProps, child.props);
	      var propsToAnimate = props.animationWhitelist ? (0, _pick3.default)(combinedProps, props.animationWhitelist) : combinedProps;
	      return _react2.default.createElement(
	        _victoryAnimation2.default,
	        _extends({}, combinedProps.animate, { data: propsToAnimate }),
	        function (newProps) {
	          var component = _react2.default.cloneElement(child, (0, _defaults3.default)({ animate: null }, newProps, combinedProps));
	          return component;
	        }
	      );
	    }
	  }]);
	
	  return VictoryTransition;
	}(_react2.default.Component);
	
	VictoryTransition.propTypes = {
	  /**
	   * The animate prop specifies an animation config for the transition.
	   * This prop should be given as an object.
	   */
	  animate: _react2.default.PropTypes.object,
	  /**
	   * VictoryTransition animates a single child component
	   */
	  children: _react2.default.PropTypes.node,
	  /**
	   * This prop specifies which of the child's props are safe to interpolate.
	   * This props should be given as an array.
	   */
	  animationWhitelist: _react2.default.PropTypes.array
	};
	exports.default = VictoryTransition;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(123),
	    baseFlatten = __webpack_require__(124),
	    basePick = __webpack_require__(125),
	    rest = __webpack_require__(44),
	    toKey = __webpack_require__(16);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = rest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
	});
	
	module.exports = pick;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(126);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
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
/* 126 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defaults2 = __webpack_require__(82);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _partialRight2 = __webpack_require__(128);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(63);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(117);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VictorySharedEvents = function (_React$Component) {
	  _inherits(VictorySharedEvents, _React$Component);
	
	  function VictorySharedEvents() {
	    _classCallCheck(this, VictorySharedEvents);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictorySharedEvents).call(this));
	
	    _this.state = {};
	    _this.getScopedEvents = _index.Events.getScopedEvents.bind(_this);
	    _this.getEventState = _index.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictorySharedEvents, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setUpChildren(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setUpChildren(newProps);
	    }
	  }, {
	    key: "setUpChildren",
	    value: function setUpChildren(props) {
	      this.childComponents = _react2.default.Children.toArray(props.children);
	      var childBaseProps = this.getBasePropsFromChildren(this.childComponents);
	      var parentBaseProps = props.container ? { parent: props.container.props } : {};
	      this.baseProps = Object.assign({}, childBaseProps, { parent: parentBaseProps });
	    }
	  }, {
	    key: "getBasePropsFromChildren",
	    value: function getBasePropsFromChildren(childComponents) {
	      var getBaseProps = function getBaseProps(children) {
	        return children.reduce(function (memo, child, index) {
	          if (child.type && (0, _isFunction3.default)(child.type.getBaseProps)) {
	            var baseChildProps = child.props && child.type.getBaseProps(child.props);
	            if (baseChildProps) {
	              var childKey = child.props.name || index;
	              memo[childKey] = baseChildProps;
	              return memo;
	            }
	            return memo;
	          } else if (child.props && child.props.children) {
	            return getBaseProps(_react2.default.Children.toArray(child.props.children));
	          }
	          return memo;
	        }, {});
	      };
	      return getBaseProps(childComponents);
	    }
	  }, {
	    key: "getNewChildren",
	    value: function getNewChildren(props) {
	      var _this2 = this;
	
	      var events = props.events;
	      var eventKey = props.eventKey;
	
	      var childNames = Object.keys(this.baseProps);
	
	      var alterChildren = function alterChildren(children) {
	        return children.reduce(function (memo, child) {
	          if (child.type && (0, _isFunction3.default)(child.type.getBaseProps)) {
	            var _ret = function () {
	              var name = child.props.name || childNames.shift();
	              var childEvents = Array.isArray(events) && events.filter(function (event) {
	                return event.childName === name;
	              });
	              var sharedEvents = {
	                events: childEvents,
	                getEvents: (0, _partialRight3.default)(_this2.getScopedEvents, name, _this2.baseProps),
	                getEventState: (0, _partialRight3.default)(_this2.getEventState, name)
	              };
	              return {
	                v: memo.concat(_react2.default.cloneElement(child, Object.assign({ key: "events-" + name, sharedEvents: sharedEvents, eventKey: eventKey }, child.props)))
	              };
	            }();
	
	            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	          } else if (child.props.children) {
	            return memo.concat(_react2.default.cloneElement(child, child.props, alterChildren(_react2.default.Children.toArray(child.props.children))));
	          } else {
	            return memo.concat(child);
	          }
	        }, []);
	      };
	
	      return alterChildren(this.childComponents);
	    }
	  }, {
	    key: "getContainer",
	    value: function getContainer(props, children) {
	      var parents = Array.isArray(props.events) && props.events.filter(function (event) {
	        return event.target === "parent";
	      });
	      var sharedEvents = parents.length > 0 ? {
	        events: parents,
	        getEvents: (0, _partialRight3.default)(this.getScopedEvents, null, this.baseProps),
	        getEventState: (0, _partialRight3.default)(this.getEventState, null)
	      } : null;
	      var boundGetEvents = _index.Events.getEvents.bind(this);
	      var parentEvents = boundGetEvents({ sharedEvents: sharedEvents }, "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), props.container.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.container, Object.assign({}, parentProps, { events: _index.Events.getPartialEvents(parentEvents, "parent", parentProps) }), children);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.getNewChildren(this.props);
	      return this.props.container ? this.getContainer(this.props, children) : _react2.default.createElement(
	        "g",
	        null,
	        children
	      );
	    }
	  }]);
	
	  return VictorySharedEvents;
	}(_react2.default.Component);
	
	VictorySharedEvents.role = "shared-event-wrapper";
	VictorySharedEvents.propTypes = {
	  /**
	   * VictoryEvents is a wrapper component that coordinates events between child components,
	   */
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  /**
	   * The container prop specifies a container for the children to be rendered into.
	   * If no container is provided, a <g> tag will be used. Shared parent events will only
	   * be attached when a container prop is provided.
	   */
	  container: _react2.default.PropTypes.node,
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a childName, target, eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, (i.e. "data" and "labels"). The childName will refer to an
	   * individual child, either by its name prop, or by index. Only Victory components
	   * that actually render data should be targeted for use with shared events. The eventKey
	   * may optionally be used to select a single element by index or eventKey rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey and childName keys,
	   * and a mutation key whose value is a function. The target and eventKey and childName keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     childName: "firstBar",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              childName: "secondBar",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              childName: "secondBar",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    childName: _react.PropTypes.string,
	    target: _react.PropTypes.string,
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _index.PropTypes.allOfType([_index.PropTypes.integer, _index.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _index.PropTypes.allOfType([_index.PropTypes.integer, _index.PropTypes.nonNegative]), _react.PropTypes.string])
	};
	exports.default = VictorySharedEvents;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(18),
	    getHolder = __webpack_require__(35),
	    replaceHolders = __webpack_require__(39),
	    rest = __webpack_require__(44);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * This method is like `_.partial` except that partially applied arguments
	 * are appended to the arguments it receives.
	 *
	 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
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
	 * var greetFred = _.partialRight(greet, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 *
	 * // Partially applied with placeholders.
	 * var sayHelloTo = _.partialRight(greet, 'hello', _);
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 */
	var partialRight = rest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partialRight));
	  return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VictoryContainer = function (_React$Component) {
	  _inherits(VictoryContainer, _React$Component);
	
	  function VictoryContainer() {
	    _classCallCheck(this, VictoryContainer);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryContainer).apply(this, arguments));
	  }
	
	  _createClass(VictoryContainer, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "svg",
	        _extends({
	          style: this.props.style,
	          viewBox: "0 0 " + this.props.width + " " + this.props.height,
	          role: "img",
	          "aria-labelledby": "title desc"
	        }, this.props.events),
	        _react2.default.createElement(
	          "title",
	          { id: "title" },
	          this.props.title
	        ),
	        _react2.default.createElement(
	          "desc",
	          { id: "desc" },
	          this.props.desc
	        ),
	        this.props.children
	      );
	    }
	  }]);
	
	  return VictoryContainer;
	}(_react2.default.Component);
	
	VictoryContainer.propTypes = {
	  /**
	   * The style prop specifies styles for your VictoryContainer. Any valid inline style properties
	   * will be applied. Height and width should be specified via the height
	   * and width props, as they are used to calculate the alignment of
	   * components within the container. Styles from the child component will
	   * also be passed, if any exist.
	   * @examples {border: 1px solid red}
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The height props specifies the height the svg viewBox of the container.
	   * This value should be given as a number of pixels. If no height prop
	   * is given, the height prop from the child component passed will be used.
	   */
	  height: _react.PropTypes.number,
	  /**
	   * The width props specifies the width of the svg viewBox of the container
	   * This value should be given as a number of pixels. If no width prop
	   * is given, the width prop from the child component passed will be used.
	   */
	  width: _react.PropTypes.number,
	  /**
	   * The events prop attaches arbitrary event handlers to the container component.
	   * Event handlers passed from other Victory components are called with their
	   * corresponding events as well as scale, style, width, height, and data when
	   * applicable. Use the invert method to convert event coordinate information to
	   * data. `scale.x.invert(evt.offsetX)`.
	   * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
	   */
	  events: _react.PropTypes.object,
	  /**
	   * VictoryContainer is a wrapper component that controls some props and behaviors of its
	   * children. VictoryContainer works with all Victory components.
	   * If no children are provided, VictoryContainer will render an empty SVG.
	   * Props from children are used to determine default style, height, and width.
	   */
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  /**
	   * The title prop specifies the title to be applied to the SVG to assist
	   * accessibility for screen readers. The more descriptive this title is, the more
	   * useful it will be. If no title prop is passed, it will default to Victory Chart.
	   * @example "Popularity of Dog Breeds by Percentage"
	   */
	  title: _react.PropTypes.string,
	  /**
	   * The desc prop specifies the description of the chart/SVG to assist with
	   * accessibility for screen readers. The more info about the chart provided in
	   * the description, the more usable it will be for people using screen readers.
	   * This prop defaults to an empty string.
	   * @example "Golden retreivers make up 30%, Labs make up 25%, and other dog breeds are
	   * not represented above 5% each."
	   */
	  desc: _react.PropTypes.string
	};
	VictoryContainer.defaultProps = {
	  title: "Victory Chart",
	  desc: ""
	};
	exports.default = VictoryContainer;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VictoryStack = exports.VictoryGroup = exports.VictoryScatter = exports.VictoryBar = exports.VictoryArea = exports.VictoryAxis = exports.VictoryLine = exports.VictoryChart = undefined;
	
	var _victoryChart = __webpack_require__(131);
	
	var _victoryChart2 = _interopRequireDefault(_victoryChart);
	
	var _victoryLine = __webpack_require__(295);
	
	var _victoryLine2 = _interopRequireDefault(_victoryLine);
	
	var _victoryAxis = __webpack_require__(158);
	
	var _victoryAxis2 = _interopRequireDefault(_victoryAxis);
	
	var _victoryArea = __webpack_require__(301);
	
	var _victoryArea2 = _interopRequireDefault(_victoryArea);
	
	var _victoryBar = __webpack_require__(305);
	
	var _victoryBar2 = _interopRequireDefault(_victoryBar);
	
	var _victoryScatter = __webpack_require__(317);
	
	var _victoryScatter2 = _interopRequireDefault(_victoryScatter);
	
	var _victoryGroup = __webpack_require__(322);
	
	var _victoryGroup2 = _interopRequireDefault(_victoryGroup);
	
	var _victoryStack = __webpack_require__(323);
	
	var _victoryStack2 = _interopRequireDefault(_victoryStack);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.VictoryChart = _victoryChart2.default;
	exports.VictoryLine = _victoryLine2.default;
	exports.VictoryAxis = _victoryAxis2.default;
	exports.VictoryArea = _victoryArea2.default;
	exports.VictoryBar = _victoryBar2.default;
	exports.VictoryScatter = _victoryScatter2.default;
	exports.VictoryGroup = _victoryGroup2.default;
	exports.VictoryStack = _victoryStack2.default;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _victoryAxis = __webpack_require__(158);
	
	var _victoryAxis2 = _interopRequireDefault(_victoryAxis);
	
	var _helperMethods = __webpack_require__(233);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	var _wrapper = __webpack_require__(294);
	
	var _wrapper2 = _interopRequireDefault(_wrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultAxes = {
	  independent: _react2.default.createElement(_victoryAxis2.default, null),
	  dependent: _react2.default.createElement(_victoryAxis2.default, { dependentAxis: true })
	};
	
	var VictoryChart = function (_React$Component) {
	  _inherits(VictoryChart, _React$Component);
	
	  function VictoryChart() {
	    _classCallCheck(this, VictoryChart);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryChart).apply(this, arguments));
	  }
	
	  _createClass(VictoryChart, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var setAnimationState = _wrapper2.default.setAnimationState.bind(this);
	      setAnimationState(nextProps);
	    }
	  }, {
	    key: "getStyles",
	    value: function getStyles(props) {
	      var styleProps = props.style && props.style.parent;
	      return {
	        parent: (0, _defaults3.default)({
	          height: "auto",
	          width: "100%"
	        }, styleProps) };
	    }
	  }, {
	    key: "getAxisProps",
	    value: function getAxisProps(child, props, calculatedProps) {
	      var domain = calculatedProps.domain;
	      var scale = calculatedProps.scale;
	
	      var axis = child.type.getAxis(child.props);
	      var axisOffset = _helperMethods2.default.getAxisOffset(props, calculatedProps);
	      var tickValues = _helperMethods2.default.getTicks(calculatedProps, axis, child);
	      var tickFormat = child.props.tickFormat || _helperMethods2.default.getTickFormat(child, axis, calculatedProps);
	      var offsetY = axis === "y" ? undefined : axisOffset.y;
	      var offsetX = axis === "x" ? undefined : axisOffset.x;
	      var crossAxis = child.props.crossAxis === false ? false : true;
	      return {
	        domain: domain[axis],
	        scale: scale[axis],
	        tickValues: tickValues,
	        tickFormat: tickFormat,
	        offsetY: child.props.offsetY || offsetY,
	        offsetX: child.props.offsetX || offsetX,
	        crossAxis: crossAxis
	      };
	    }
	  }, {
	    key: "getChildProps",
	    value: function getChildProps(child, props, calculatedProps) {
	      var axisChild = _axis2.default.findAxisComponents([child]);
	      if (axisChild.length > 0) {
	        return this.getAxisProps(axisChild[0], props, calculatedProps);
	      }
	      return {
	        domain: calculatedProps.domain,
	        scale: calculatedProps.scale,
	        categories: calculatedProps.categories
	      };
	    }
	  }, {
	    key: "getCalculatedProps",
	    value: function getCalculatedProps(props, childComponents) {
	      var style = this.getStyles(props);
	      var horizontal = childComponents.some(function (component) {
	        return component.props.horizontal;
	      });
	      var axisComponents = {
	        x: _axis2.default.getAxisComponent(childComponents, "x"),
	        y: _axis2.default.getAxisComponent(childComponents, "y")
	      };
	      var domain = {
	        x: _helperMethods2.default.getDomain(props, "x", childComponents),
	        y: _helperMethods2.default.getDomain(props, "y", childComponents)
	      };
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var baseScale = {
	        x: _scale2.default.getScaleFromProps(props, "x") || axisComponents.x && axisComponents.x.type.getScale(axisComponents.x.props) || _scale2.default.getDefaultScale(),
	        y: _scale2.default.getScaleFromProps(props, "y") || axisComponents.y && axisComponents.y.type.getScale(axisComponents.y.props) || _scale2.default.getDefaultScale()
	      };
	      var scale = {
	        x: baseScale.x.domain(domain.x).range(range.x),
	        y: baseScale.y.domain(domain.y).range(range.y)
	      };
	      // TODO: check
	      var categories = {
	        x: _wrapper2.default.getCategories(props, "x", childComponents),
	        y: _wrapper2.default.getCategories(props, "y", childComponents)
	      };
	      var stringMap = {
	        x: _helperMethods2.default.createStringMap(props, "x", childComponents),
	        y: _helperMethods2.default.createStringMap(props, "y", childComponents)
	      };
	      return { axisComponents: axisComponents, categories: categories, domain: domain, horizontal: horizontal, scale: scale, stringMap: stringMap, style: style };
	    }
	  }, {
	    key: "getNewChildren",
	    value: function getNewChildren(props, childComponents, calculatedProps) {
	      var _this2 = this;
	
	      var baseStyle = calculatedProps.style.parent;
	      var getAnimationProps = _wrapper2.default.getAnimationProps.bind(this);
	      return childComponents.map(function (child, index) {
	        var style = (0, _defaults3.default)({}, child.props.style, { parent: baseStyle });
	        var childProps = _this2.getChildProps(child, props, calculatedProps);
	        var newProps = (0, _defaults3.default)({
	          animate: getAnimationProps(props, child, index),
	          height: props.height,
	          width: props.width,
	          padding: _victoryCore.Helpers.getPadding(props),
	          ref: index,
	          key: index,
	          standalone: false,
	          style: style
	        }, childProps);
	        return _react2.default.cloneElement(child, newProps);
	      });
	    }
	  }, {
	    key: "getContainer",
	    value: function getContainer(props, calculatedProps) {
	      var width = props.width;
	      var height = props.height;
	      var containerComponent = props.containerComponent;
	      var scale = calculatedProps.scale;
	      var style = calculatedProps.style;
	
	      var parentProps = (0, _defaults3.default)({}, containerComponent.props, { style: style.parent, scale: scale, width: width, height: height });
	      return _react2.default.cloneElement(containerComponent, parentProps);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var props = this.state && this.state.nodesWillExit ? this.state.oldProps : this.props;
	      var childComponents = _helperMethods2.default.getChildComponents(props, defaultAxes);
	      var calculatedProps = this.getCalculatedProps(props, childComponents);
	      var container = props.standalone && this.getContainer(props, calculatedProps);
	      var newChildren = this.getNewChildren(props, childComponents, calculatedProps);
	      if (props.events) {
	        return _react2.default.createElement(
	          _victoryCore.VictorySharedEvents,
	          { events: props.events, eventKey: props.eventKey, container: container },
	          newChildren
	        );
	      }
	
	      var group = _react2.default.createElement(
	        "g",
	        { style: calculatedProps.style.parent },
	        newChildren
	      );
	      return props.standalone ? _react2.default.cloneElement(container, container.props, group) : group;
	    }
	  }]);
	
	  return VictoryChart;
	}(_react2.default.Component);
	
	VictoryChart.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. If this prop is
	   * given, all children defined in chart will pass the options specified in this prop to
	   * VictoryTransition and VictoryAnimation. Child animation props will be added for any
	   * values not provided via the animation prop for VictoryChart. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively. VictoryChart will coodrinate transitions between all
	   * of its child components so that animation stays in sync
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * VictoryChart is a wrapper component that controls the layout and animation behaviors of its
	   * children. VictoryChart works with VictoryArea, VictoryAxis, VictoryBar, VictoryLine, and
	   * VictoryScatter. Wrapper components like VictoryGroup and VictoryStack may also be
	   * wrapped with VictoryChart. If not children are provided, VictoryChart will render a
	   * set of empty axes.
	   */
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  /**
	   * The domain prop describes the range of values your chart will include. This prop can be
	   * given as a array of the minimum and maximum expected values for your chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples: [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The domainPadding prop specifies a number of pixels of padding to add to the
	   * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
	   * from the origin to prevent crowding. This prop should be given as an object with
	   * numbers specified for x and y.
	   */
	  domainPadding: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	    x: _victoryCore.PropTypes.nonNegative,
	    y: _victoryCore.PropTypes.nonNegative
	  }), _victoryCore.PropTypes.nonNegative]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a childName, target, eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, (i.e. "data" and "labels"). The childName will refer to an
	   * individual child of VictoryChart, either by its name prop, or by index. The eventKey
	   * may optionally be used to select a single element by index or eventKey rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey and childName keys,
	   * and a mutation key whose value is a function. The target and eventKey and childName keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     childName: "firstBar",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              childName: "secondBar",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              childName: "secondBar",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    childName: _react.PropTypes.string,
	    target: _react.PropTypes.string,
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
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
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a string or a function, or as an object that specifies separate scales for x and y.
	   * Supported string scales are "linear", "time", "log" and "sqrt"
	   * @examples d3.time.scale(), {x: "linear", y: "log" }
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryChart with other components within an enclosing <svg> tag. Victory
	   * Component are responsive by default. If you need to create a fixed-size chart, set
	   * standalone to false, and wrap VictoryChart in a custom <svg>
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your chart. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart.
	   * @examples {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
	   */
	  width: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryChart: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryChart will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryChart.defaultProps = {
	  height: 300,
	  width: 450,
	  padding: 50,
	  standalone: true,
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	exports.default = VictoryChart;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(133),
	    assignInDefaults = __webpack_require__(134),
	    assignInWith = __webpack_require__(136),
	    rest = __webpack_require__(141);
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
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
/* 133 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(135);
	
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
/* 135 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(137),
	    createAssigner = __webpack_require__(139),
	    keysIn = __webpack_require__(143);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
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
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(138);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
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
	
	module.exports = copyObject;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(135);
	
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(140),
	    rest = __webpack_require__(141);
	
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
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
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
/* 140 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(133),
	    toInteger = __webpack_require__(142);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 142 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(144),
	    indexKeys = __webpack_require__(149),
	    isIndex = __webpack_require__(156),
	    isPrototype = __webpack_require__(157);
	
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
	 * @since 3.0.0
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(145),
	    iteratorToArray = __webpack_require__(148);
	
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(146);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(147);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 147 */
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
/* 148 */
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(150),
	    isArguments = __webpack_require__(151),
	    isArray = __webpack_require__(152),
	    isLength = __webpack_require__(153),
	    isString = __webpack_require__(154);
	
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
/* 150 */
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
/* 151 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 153 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(152),
	    isObjectLike = __webpack_require__(155);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 155 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 156 */
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
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 157 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _axisLine = __webpack_require__(182);
	
	var _axisLine2 = _interopRequireDefault(_axisLine);
	
	var _grid = __webpack_require__(183);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _tick = __webpack_require__(184);
	
	var _tick2 = _interopRequireDefault(_tick);
	
	var _helperMethods = __webpack_require__(185);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  axis: {
	    stroke: "#756f6a",
	    fill: "none",
	    strokeWidth: 2,
	    strokeLinecap: "round"
	  },
	  axisLabel: {
	    stroke: "transparent",
	    fill: "#756f6a",
	    fontSize: 17,
	    fontFamily: "Helvetica"
	  },
	  grid: {
	    stroke: "transparent",
	    fill: "none",
	    strokeLinecap: "round"
	  },
	  ticks: {
	    stroke: "#756f6a",
	    fill: "none",
	    padding: 5,
	    strokeWidth: 2,
	    strokeLinecap: "round",
	    size: 4
	  },
	  tickLabels: {
	    stroke: "transparent",
	    fill: "#756f6a",
	    fontFamily: "Helvetica",
	    fontSize: 12,
	    padding: 5
	  }
	};
	
	var VictoryAxis = function (_React$Component) {
	  _inherits(VictoryAxis, _React$Component);
	
	  function VictoryAxis() {
	    _classCallCheck(this, VictoryAxis);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryAxis).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Helpers.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryAxis, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.dataKeys = Object.keys(this.baseProps).filter(function (key) {
	        return key !== "parent";
	      });
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderLine",
	    value: function renderLine(props) {
	      var key = 0;
	      var axisEvents = this.getEvents(props, "axis", key);
	      var axisProps = (0, _defaults3.default)({}, this.getEventState(key, "axis"), this.getSharedEventState(key, "axis"), props.axisComponent.props, this.baseProps[key].axis);
	      return _react2.default.cloneElement(props.axisComponent, Object.assign({}, axisProps, { events: _victoryCore.Events.getPartialEvents(axisEvents, key, axisProps) }));
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props) {
	      var key = 0;
	      var axisLabelEvents = this.getEvents(props, "axisLabel", key);
	      var axisLabelProps = (0, _defaults3.default)({}, this.getEventState(key, "axisLabel"), this.getSharedEventState(key, "axisLabel"), props.axisLabelComponent.props, this.baseProps[key].axisLabel);
	      return _react2.default.cloneElement(props.axisLabelComponent, Object.assign({}, axisLabelProps, { events: _victoryCore.Events.getPartialEvents(axisLabelEvents, key, axisLabelProps) }));
	    }
	  }, {
	    key: "renderGridAndTicks",
	    value: function renderGridAndTicks(props) {
	      var _this2 = this;
	
	      var tickComponent = props.tickComponent;
	      var tickLabelComponent = props.tickLabelComponent;
	      var gridComponent = props.gridComponent;
	
	      return this.dataKeys.map(function (key) {
	        var tickEvents = _this2.getEvents(props, "ticks", key);
	        var tickProps = (0, _defaults3.default)({}, _this2.getEventState(key, "ticks"), _this2.getSharedEventState(key, "ticks"), tickComponent.props, _this2.baseProps[key].ticks);
	        var TickComponent = _react2.default.cloneElement(tickComponent, Object.assign({}, tickProps, { events: _victoryCore.Events.getPartialEvents(tickEvents, key, tickProps) }));
	        var gridEvents = _this2.getEvents(props, "grid", key);
	        var gridProps = (0, _defaults3.default)({}, _this2.getEventState(key, "grid"), _this2.getSharedEventState(key, "grid"), gridComponent.props, _this2.baseProps[key].grid);
	        var GridComponent = _react2.default.cloneElement(gridComponent, Object.assign({}, gridProps, { events: _victoryCore.Events.getPartialEvents(gridEvents, key, gridProps) }));
	        var tickLabelProps = (0, _defaults3.default)({}, _this2.getEventState(key, "tickLabels"), _this2.getSharedEventState(key, "tickLabels"), tickLabelComponent.props, _this2.baseProps[key].tickLabels);
	        var tickLabelEvents = _this2.getEvents(props, "tickLabels", key);
	        var TickLabel = _react2.default.cloneElement(tickLabelComponent, Object.assign({
	          events: _victoryCore.Events.getPartialEvents(tickLabelEvents, key, tickLabelProps)
	        }, tickLabelProps));
	        return _react2.default.createElement(
	          "g",
	          { key: "tick-group-" + key },
	          GridComponent,
	          TickComponent,
	          TickLabel
	        );
	      });
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var animate = _props.animate;
	      var standalone = _props.standalone;
	
	      if (animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var whitelist = ["style", "domain", "range", "tickCount", "tickValues", "offsetX", "offsetY", "padding", "width", "height"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryAxis, this.props)
	        );
	      }
	      var style = _helperMethods2.default.getStyles(this.props, defaultStyles);
	      var group = _react2.default.createElement(
	        "g",
	        { style: style.parent },
	        this.renderGridAndTicks(this.props),
	        this.renderLine(this.props),
	        this.renderLabel(this.props)
	      );
	
	      return standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryAxis;
	}(_react2.default.Component);
	
	VictoryAxis.role = "axis";
	VictoryAxis.defaultTransitions = {
	  onExit: {
	    duration: 500
	  },
	  onEnter: {
	    duration: 500
	  }
	};
	VictoryAxis.propTypes = {
	  /**
	   * The animate prop specifies props for victory-animation to use. It this prop is
	   * not given, the axis will not tween between changing data / style props.
	   * Large datasets might animate slowly due to the inherent limits of svg rendering.
	   * @examples {duration: 500, onEnd: () => alert("done!")}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The axisComponent prop takes in an entire component which will be used
	   * to create the axis line. The new element created from the passed axisComponent
	   * will be supplied with the following properties: x1, y1, x2, y2, style and events.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If an axisComponent
	   * is not supplied, VictoryAxis will render its default AxisLine component.
	   */
	  axisComponent: _react.PropTypes.element,
	  /**
	   * The axisLabelComponent prop takes in an entire component which will be used
	   * to create the axis label. The new element created from the passed axisLabelComponent
	   * will be supplied with the following properties: x, y, verticalAnchor, textAnchor,
	   * angle, transform, style and events. Any of these props may be overridden by
	   * passing in props to the supplied component, or modified or ignored within
	   * the custom component itself. If an axisLabelComponent is not supplied, a new
	   * VictoryLabel will be created with props described above
	   */
	  axisLabelComponent: _react.PropTypes.element,
	  /**
	   * This prop specifies whether a given axis is intended to cross another axis.
	   */
	  crossAxis: _react.PropTypes.bool,
	  /**
	   * The dependentAxis prop specifies whether the axis corresponds to the
	   * dependent variable (usually y). This prop is useful when composing axis
	   * with other components to form a chart.
	   */
	  dependentAxis: _react.PropTypes.bool,
	  /**
	   * The domain prop describes the range of values your axis will include. This prop should be
	   * given as a array of the minimum and maximum expected values for your axis.
	   * If this value is not given it will be calculated based on the scale or tickValues.
	   * @examples [-1, 1]
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "axis", "axisLabel", "ticks", "tickLabels", and "grid" are
	   * all valid targets for VictoryAxis events. The eventKey may optionally be used to select a
	   * single element by index rather than an entire set. The eventHandlers object
	   * should be given as an object whose keys are standard event names (i.e. onClick)
	   * and whose values are event callbacks. The return value of an event handler
	   * be used to modify other elemnts. The return value should be given as an object or
	   * an array of objects with optional target and eventKey keys, and a mutation
	   * key whose value is a function. The target and eventKey keys will default to those
	   * corresponding to the element the event handler was attached to. The mutation
	   * function will be called with the calculated props for the individual selected
	   * element (i.e. a single tick), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "grid",
	   *     eventKey: 2,
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *           {
	   *             mutation: (props) => {
	   *               return {style: merge({}, props.style, {stroke: "orange"})};
	   *             }
	   *           }, {
	   *             target: "tickLabels",
	   *             mutation: () => {
	   *               return {text: "hey"};
	   *             }
	   *           }
	   *         ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * This prop is used to coordinate events between VictoryAxis and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
	  }),
	  /**
	   * The gridComponent prop takes in an entire component which will be used
	   * to create grid lines. The new element created from the passed gridComponent
	   * will be supplied with the following properties: x1, y1, x2, y2, tick, style and events.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a gridComponent
	   * is not supplied, VictoryAxis will render its default GridLine component.
	   */
	  gridComponent: _react.PropTypes.element,
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The label prop defines the label that will appear along the axis. This
	   * prop should be given as a value or an entire, HTML-complete label
	   * component. If a label component is given, it will be cloned. The new
	   * element's properties x, y, textAnchor, verticalAnchor, and transform
	   * will have defaults provided by the axis; styles filled out with
	   * defaults provided by the axis, and overrides from the label component.
	   * If a value is given, a new VictoryLabel will be created with props and
	   * styles from the axis.
	   */
	  label: _react.PropTypes.any,
	  /**
	   * This value describes how far from the "edge" of its permitted area each axis
	   * will be set back in the x-direction.  If this prop is not given,
	   * the offset is calculated based on font size, axis orientation, and label padding.
	   */
	  offsetX: _react.PropTypes.number,
	  /**
	   * This value describes how far from the "edge" of its permitted area each axis
	   * will be set back in the y-direction.  If this prop is not given,
	   * the offset is calculated based on font size, axis orientation, and label padding.
	   */
	  offsetY: _react.PropTypes.number,
	  /**
	   * The orientation prop specifies the position and orientation of your axis.
	   */
	  orientation: _react.PropTypes.oneOf(["top", "bottom", "left", "right"]),
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
	   * The scale prop determines which scales your axis should use. This prop can be
	   * given as a `d3-scale@0.3.0` function or as a string corresponding to a supported d3-string
	   * function.
	   * @examples d3Scale.time(), "linear", "time", "log", "sqrt"
	   */
	  scale: _victoryCore.PropTypes.scale,
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryAxis with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your VictoryAxis. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart.
	   * @examples {axis: {stroke: "#756f6a"}, grid: {stroke: "grey"}, ticks: {stroke: "grey"},
	   * tickLabels: {fontSize: 10, padding: 5}, axisLabel: {fontSize: 16, padding: 20}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    axis: _react.PropTypes.object,
	    axisLabel: _react.PropTypes.object,
	    grid: _react.PropTypes.object,
	    ticks: _react.PropTypes.object,
	    tickLabels: _react.PropTypes.object
	  }),
	  /**
	   * The tickComponent prop takes in an entire component which will be used
	   * to create tick lines. The new element created from the passed tickComponent
	   * will be supplied with the following properties: x1, y1, x2, y2, tick, style and events.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a tickComponent
	   * is not supplied, VictoryAxis will render its default Tick component.
	   */
	  tickComponent: _react.PropTypes.element,
	  /**
	   * The tickCount prop specifies approximately how many ticks should be drawn on the axis if
	   * tickValues are not explicitly provided. This values is calculated by d3 scale and
	   * prioritizes returning "nice" values and evenly spaced ticks over an exact numnber of ticks
	   */
	  tickCount: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The tickLabelComponent prop takes in an entire component which will be used
	   * to create the tick labels. The new element created from the passed tickLabelComponent
	   * will be supplied with the following properties: x, y, verticalAnchor, textAnchor,
	   * angle, tick, style and events. Any of these props may be overridden by
	   * passing in props to the supplied component, or modified or ignored within
	   * the custom component itself. If an tickLabelComponent is not supplied, a new
	   * VictoryLabel will be created with props described above
	   */
	  tickLabelComponent: _react.PropTypes.element,
	  /**
	   * The tickFormat prop specifies how tick values should be expressed visually.
	   * tickFormat can be given as a function to be applied to every tickValue, or as
	   * an array of display values for each tickValue.
	   * @examples d3.time.format("%Y"), (x) => x.toPrecision(2), ["first", "second", "third"]
	   */
	  tickFormat: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.homogeneousArray]),
	  /**
	   * The tickValues prop explicitly specifies which tick values to draw on the axis.
	   * @examples ["apples", "bananas", "oranges"], [2, 4, 6, 8]
	   */
	  tickValues: _victoryCore.PropTypes.homogeneousArray,
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
	   */
	  width: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryAxis: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryAxis will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryAxis.defaultProps = {
	  axisComponent: _react2.default.createElement(_axisLine2.default, null),
	  axisLabelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  tickLabelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  tickComponent: _react2.default.createElement(_tick2.default, null),
	  gridComponent: _react2.default.createElement(_grid2.default, null),
	  height: 300,
	  padding: 50,
	  scale: "linear",
	  standalone: true,
	  tickCount: 5,
	  width: 450,
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryAxis.getDomain = _helperMethods2.default.getDomain.bind(_helperMethods2.default);
	VictoryAxis.getAxis = _axis2.default.getAxis.bind(_axis2.default);
	VictoryAxis.getScale = _helperMethods2.default.getScale.bind(_helperMethods2.default);
	VictoryAxis.getStyles = (0, _partialRight3.default)(_helperMethods2.default.getStyles.bind(_helperMethods2.default), defaultStyles);
	VictoryAxis.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryAxis;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(160),
	    getHolder = __webpack_require__(174),
	    replaceHolders = __webpack_require__(177),
	    rest = __webpack_require__(141);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * This method is like `_.partial` except that partially applied arguments
	 * are appended to the arguments it receives.
	 *
	 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
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
	 * var greetFred = _.partialRight(greet, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 *
	 * // Partially applied with placeholders.
	 * var sayHelloTo = _.partialRight(greet, 'hello', _);
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 */
	var partialRight = rest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partialRight));
	  return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(161),
	    createBaseWrapper = __webpack_require__(162),
	    createCurryWrapper = __webpack_require__(166),
	    createHybridWrapper = __webpack_require__(167),
	    createPartialWrapper = __webpack_require__(178),
	    getData = __webpack_require__(179),
	    mergeData = __webpack_require__(180),
	    setData = __webpack_require__(173),
	    toInteger = __webpack_require__(142);
	
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
	 *   512 - `_.flip`
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
/* 161 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var createCtorWrapper = __webpack_require__(163),
	    root = __webpack_require__(146);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(164),
	    isObject = __webpack_require__(165);
	
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
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(165);
	
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
/* 165 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(133),
	    createCtorWrapper = __webpack_require__(163),
	    createHybridWrapper = __webpack_require__(167),
	    createRecurryWrapper = __webpack_require__(171),
	    getHolder = __webpack_require__(174),
	    replaceHolders = __webpack_require__(177),
	    root = __webpack_require__(146);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);
	
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(168),
	    composeArgsRight = __webpack_require__(169),
	    countHolders = __webpack_require__(170),
	    createCtorWrapper = __webpack_require__(163),
	    createRecurryWrapper = __webpack_require__(171),
	    getHolder = __webpack_require__(174),
	    reorder = __webpack_require__(175),
	    replaceHolders = __webpack_require__(177),
	    root = __webpack_require__(146);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
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
	        args = Array(length),
	        index = length;
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
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
/* 168 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 169 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 170 */
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(172),
	    setData = __webpack_require__(173);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
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
	    newHoldersRight, argPos, ary, arity
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
/* 172 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 174 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}
	
	module.exports = getHolder;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(176),
	    isIndex = __webpack_require__(156);
	
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
/* 176 */
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
/* 177 */
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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(133),
	    createCtorWrapper = __webpack_require__(163),
	    root = __webpack_require__(146);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
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
/* 179 */
/***/ function(module, exports) {

	/**
	 * A method that returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 180 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(165);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AxisLine = function (_React$Component) {
	  _inherits(AxisLine, _React$Component);
	
	  function AxisLine() {
	    _classCallCheck(this, AxisLine);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AxisLine).apply(this, arguments));
	  }
	
	  _createClass(AxisLine, [{
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var x1 = _props.x1;
	      var x2 = _props.x2;
	      var y1 = _props.y1;
	      var y2 = _props.y2;
	      var style = _props.style;
	      var events = _props.events;
	
	      return _react2.default.createElement("line", _extends({
	        x1: x1, x2: x2, y1: y1, y2: y2, style: style,
	        vectorEffect: "non-scaling-stroke"
	      }, events));
	    }
	  }]);
	
	  return AxisLine;
	}(_react2.default.Component);
	
	AxisLine.propTypes = {
	  x1: _react.PropTypes.number,
	  x2: _react.PropTypes.number,
	  y1: _react.PropTypes.number,
	  y2: _react.PropTypes.number,
	  style: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = AxisLine;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GridLine = function (_React$Component) {
	  _inherits(GridLine, _React$Component);
	
	  function GridLine() {
	    _classCallCheck(this, GridLine);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridLine).apply(this, arguments));
	  }
	
	  _createClass(GridLine, [{
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var events = _props.events;
	      var x1 = _props.x1;
	      var y1 = _props.y1;
	      var x2 = _props.x2;
	      var y2 = _props.y2;
	      var style = _props.style;
	
	      return _react2.default.createElement("line", _extends({}, events, {
	        x1: x1,
	        y1: y1,
	        x2: x2,
	        y2: y2,
	        style: style,
	        vectorEffect: "non-scaling-stroke"
	      }));
	    }
	  }]);
	
	  return GridLine;
	}(_react2.default.Component);
	
	GridLine.propTypes = {
	  tick: _react.PropTypes.any,
	  x1: _react.PropTypes.number,
	  y1: _react.PropTypes.number,
	  x2: _react.PropTypes.number,
	  y2: _react.PropTypes.number,
	  style: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = GridLine;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tick = function (_React$Component) {
	  _inherits(Tick, _React$Component);
	
	  function Tick() {
	    _classCallCheck(this, Tick);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tick).apply(this, arguments));
	  }
	
	  _createClass(Tick, [{
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var x1 = _props.x1;
	      var y1 = _props.y1;
	      var x2 = _props.x2;
	      var y2 = _props.y2;
	      var style = _props.style;
	      var events = _props.events;
	
	      return _react2.default.createElement("line", _extends({}, events, {
	        x1: x1,
	        y1: y1,
	        x2: x2,
	        y2: y2,
	        style: style,
	        vectorEffect: "non-scaling-stroke"
	      }));
	    }
	  }]);
	
	  return Tick;
	}(_react2.default.Component);
	
	Tick.propTypes = {
	  x1: _react.PropTypes.number,
	  y1: _react.PropTypes.number,
	  x2: _react.PropTypes.number,
	  y2: _react.PropTypes.number,
	  tick: _react.PropTypes.any,
	  style: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = Tick;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _without2 = __webpack_require__(186);
	
	var _without3 = _interopRequireDefault(_without2);
	
	var _range2 = __webpack_require__(209);
	
	var _range3 = _interopRequireDefault(_range2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _includes2 = __webpack_require__(213);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var orientationSign = {
	  top: -1,
	  left: -1,
	  right: 1,
	  bottom: 1
	};
	
	exports.default = {
	  // exposed for use by VictoryChart
	
	  getDomain: function getDomain(props, axis) {
	    var inherentAxis = this.getAxis(props);
	    if (axis && axis !== inherentAxis) {
	      return undefined;
	    }
	    if (Array.isArray(props.domain)) {
	      return props.domain;
	    } else if (props.domain && props.domain[inherentAxis]) {
	      return props.domain[inherentAxis];
	    } else if (props.tickValues) {
	      return _domain2.default.getDomainFromTickValues(props);
	    }
	    return undefined;
	  },
	
	
	  // exposed for use by VictoryChart
	  getAxis: function getAxis(props, flipped) {
	    if (props.orientation) {
	      var vertical = { top: "x", bottom: "x", left: "y", right: "y" };
	      return vertical[props.orientation];
	    }
	    var axisType = props.dependentAxis ? "dependent" : "independent";
	    var flippedAxis = { dependent: "x", independent: "y" };
	    var normalAxis = { independent: "x", dependent: "y" };
	    return flipped ? flippedAxis[axisType] : normalAxis[axisType];
	  },
	
	
	  // exposed for use by VictoryChart
	  getScale: function getScale(props) {
	    var axis = this.getAxis(props);
	    var scale = _scale2.default.getBaseScale(props, axis);
	    var domain = this.getDomain(props) || scale.domain();
	    scale.range(_victoryCore.Helpers.getRange(props, axis));
	    scale.domain(domain);
	    return scale;
	  },
	  getStyles: function getStyles(props, defaultStyles) {
	    var style = props.style || {};
	    var parentStyleProps = { height: "auto", width: "100%" };
	    return {
	      parent: (0, _defaults3.default)(parentStyleProps, style.parent, defaultStyles.parent),
	      axis: (0, _defaults3.default)({}, style.axis, defaultStyles.axis),
	      axisLabel: (0, _defaults3.default)({}, style.axisLabel, defaultStyles.axisLabel),
	      grid: (0, _defaults3.default)({}, style.grid, defaultStyles.grid),
	      ticks: (0, _defaults3.default)({}, style.ticks, defaultStyles.ticks),
	      tickLabels: (0, _defaults3.default)({}, style.tickLabels, defaultStyles.tickLabels)
	    };
	  },
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _this = this;
	
	    var calculatedValues = this.getCalculatedValues(props, defaultStyles);
	    var style = calculatedValues.style;
	    var padding = calculatedValues.padding;
	    var orientation = calculatedValues.orientation;
	    var isVertical = calculatedValues.isVertical;
	    var scale = calculatedValues.scale;
	    var ticks = calculatedValues.ticks;
	    var tickFormat = calculatedValues.tickFormat;
	    var stringTicks = calculatedValues.stringTicks;
	    var anchors = calculatedValues.anchors;
	    var width = props.width;
	    var height = props.height;
	
	
	    var offset = this.getOffset(props, calculatedValues);
	
	    var globalTransform = this.getTransform(props, calculatedValues, offset);
	
	    var gridOffset = this.getGridOffset(props, calculatedValues, offset);
	    var gridEdge = this.getGridEdge(props, calculatedValues);
	
	    var axisProps = {
	      style: style.axis,
	      x1: isVertical ? globalTransform.x : padding.left + globalTransform.x,
	      x2: isVertical ? globalTransform.x : props.width - padding.right + globalTransform.x,
	      y1: isVertical ? padding.top + globalTransform.y : globalTransform.y,
	      y2: isVertical ? props.height - padding.bottom + globalTransform.y : globalTransform.y
	    };
	
	    var parentProps = { style: style.parent, ticks: ticks, scale: scale, width: width, height: height };
	    var axisLabelProps = this.getAxisLabelProps(props, calculatedValues, globalTransform);
	
	    return ticks.reduce(function (memo, data, index) {
	      var tick = stringTicks ? props.tickValues[data - 1] : data;
	      var tickStyle = _victoryCore.Helpers.evaluateStyle(style.ticks, tick);
	      var scaledTick = scale(data);
	      var tickPosition = _this.getTickPosition(tickStyle, orientation, isVertical);
	      var tickTransform = {
	        x: isVertical ? globalTransform.x : scaledTick + globalTransform.x,
	        y: isVertical ? scaledTick + globalTransform.y : globalTransform.y
	      };
	
	      var gridTransform = {
	        x: isVertical ? -gridOffset.x + globalTransform.x : scaledTick + globalTransform.x,
	        y: isVertical ? scaledTick + globalTransform.y : gridOffset.y + globalTransform.y
	      };
	
	      var tickProps = {
	        x1: tickTransform.x,
	        y1: tickTransform.y,
	        x2: tickTransform.x + tickPosition.x2,
	        y2: tickTransform.y + tickPosition.y2,
	        style: tickStyle,
	        tick: tick
	      };
	      var text = tickFormat(tick, index);
	      var labelStyle = _victoryCore.Helpers.evaluateStyle(style.tickLabels, tick);
	      var tickLabelProps = {
	        style: labelStyle,
	        x: tickTransform.x + tickPosition.x,
	        y: tickTransform.y + tickPosition.y,
	        verticalAnchor: labelStyle.verticalAnchor || anchors.verticalAnchor,
	        textAnchor: labelStyle.textAnchor || anchors.textAnchor,
	        angle: labelStyle.angle,
	        text: text,
	        tick: tick
	      };
	
	      var gridProps = {
	        x1: gridTransform.x,
	        y1: gridTransform.y,
	        x2: gridEdge.x + gridTransform.x,
	        y2: gridEdge.y + gridTransform.y,
	        style: _victoryCore.Helpers.evaluateStyle(style.grid, tick),
	        tick: tick
	      };
	
	      memo[index] = {
	        axis: axisProps,
	        axisLabel: axisLabelProps,
	        ticks: tickProps,
	        tickLabels: tickLabelProps,
	        grid: gridProps
	      };
	
	      return memo;
	    }, { parent: parentProps });
	  },
	  getCalculatedValues: function getCalculatedValues(props, defaultStyles) {
	    var style = this.getStyles(props, defaultStyles);
	    var padding = _victoryCore.Helpers.getPadding(props);
	    var orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
	    var isVertical = _axis2.default.isVertical(props);
	    var labelPadding = this.getLabelPadding(props, style);
	    var stringTicks = _axis2.default.stringTicks(props);
	    var scale = this.getScale(props);
	    var ticks = this.getTicks(props, scale);
	    var tickFormat = this.getTickFormat(props, scale, ticks);
	    var anchors = this.getAnchors(orientation, isVertical);
	
	    return {
	      style: style, padding: padding, orientation: orientation, isVertical: isVertical, labelPadding: labelPadding, stringTicks: stringTicks,
	      anchors: anchors, scale: scale, ticks: ticks, tickFormat: tickFormat
	    };
	  },
	  getAxisLabelProps: function getAxisLabelProps(props, calculatedValues, globalTransform) {
	    var style = calculatedValues.style;
	    var orientation = calculatedValues.orientation;
	    var padding = calculatedValues.padding;
	    var labelPadding = calculatedValues.labelPadding;
	    var isVertical = calculatedValues.isVertical;
	
	    var sign = orientationSign[orientation];
	    var hPadding = padding.left + padding.right;
	    var vPadding = padding.top + padding.bottom;
	    var x = isVertical ? -((props.height - vPadding) / 2) - padding.top : (props.width - hPadding) / 2 + padding.left;
	    var verticalAnchor = sign < 0 ? "end" : "start";
	    var labelStyle = style.axisLabel;
	    return {
	      x: x + globalTransform.x,
	      y: sign * labelPadding + globalTransform.y,
	      verticalAnchor: labelStyle.verticalAnchor || verticalAnchor,
	      textAnchor: labelStyle.textAnchor || "middle",
	      angle: labelStyle.angle,
	      style: labelStyle,
	      transform: isVertical ? "rotate(-90)" : "",
	      text: props.label
	    };
	  },
	  getTicks: function getTicks(props, scale) {
	    if (props.tickValues) {
	      if (_axis2.default.stringTicks(props)) {
	        return (0, _range3.default)(1, props.tickValues.length + 1);
	      }
	      return props.tickValues;
	    } else if (scale.ticks && (0, _isFunction3.default)(scale.ticks)) {
	      var ticks = scale.ticks(props.tickCount);
	      if (props.crossAxis) {
	        return (0, _includes3.default)(ticks, 0) ? (0, _without3.default)(ticks, 0) : ticks;
	      }
	      return ticks;
	    }
	    return scale.domain();
	  },
	  getAnchors: function getAnchors(orientation, isVertical) {
	    var anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
	    var anchor = anchorOrientation[orientation];
	    return {
	      textAnchor: isVertical ? anchor : "middle",
	      verticalAnchor: isVertical ? "middle" : anchor
	    };
	  },
	  getTickFormat: function getTickFormat(props, scale) {
	    if (props.tickFormat && (0, _isFunction3.default)(props.tickFormat)) {
	      return props.tickFormat;
	    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
	      return function (x, index) {
	        return props.tickFormat[index];
	      };
	    } else if (_axis2.default.stringTicks(props)) {
	      return function (x, index) {
	        return props.tickValues[index];
	      };
	    } else if (scale.tickFormat && (0, _isFunction3.default)(scale.tickFormat)) {
	      return scale.tickFormat();
	    } else {
	      return function (x) {
	        return x;
	      };
	    }
	  },
	  getLabelPadding: function getLabelPadding(props, style) {
	    var labelStyle = style.axisLabel;
	    if (typeof labelStyle.padding !== "undefined" && labelStyle.padding !== null) {
	      return labelStyle.padding;
	    }
	    var isVertical = _axis2.default.isVertical(props);
	    // TODO: magic numbers
	    return props.label ? labelStyle.fontSize * (isVertical ? 2.3 : 1.6) : 0;
	  },
	  getOffset: function getOffset(props, calculatedValues) {
	    var style = calculatedValues.style;
	    var padding = calculatedValues.padding;
	    var isVertical = calculatedValues.isVertical;
	    var orientation = calculatedValues.orientation;
	    var labelPadding = calculatedValues.labelPadding;
	    var stringTicks = calculatedValues.stringTicks;
	    var ticks = calculatedValues.ticks;
	
	    var xPadding = orientation === "right" ? padding.right : padding.left;
	    var yPadding = orientation === "top" ? padding.top : padding.bottom;
	    var fontSize = style.axisLabel.fontSize;
	    var offsetX = props.offsetX !== null && props.offsetX !== undefined ? props.offsetX : xPadding;
	    var offsetY = props.offsetY !== null && props.offsetY !== undefined ? props.offsetY : yPadding;
	    var tickSizes = ticks.map(function (data) {
	      var tick = stringTicks ? props.tickValues[data - 1] : data;
	      var tickStyle = _victoryCore.Helpers.evaluateStyle(style.ticks, tick);
	      return tickStyle.size;
	    });
	    var totalPadding = fontSize + 2 * Math.max.apply(Math, _toConsumableArray(tickSizes)) + labelPadding;
	    var minimumPadding = 1.2 * fontSize; // TODO: magic numbers
	    var x = isVertical ? totalPadding : minimumPadding;
	    var y = isVertical ? minimumPadding : totalPadding;
	    return {
	      x: offsetX !== null && offsetX !== undefined ? offsetX : x,
	      y: offsetY !== null && offsetY !== undefined ? offsetY : y
	    };
	  },
	  getTransform: function getTransform(props, calculatedValues, offset) {
	    var orientation = calculatedValues.orientation;
	
	    return {
	      top: { x: 0, y: offset.y },
	      bottom: { x: 0, y: props.height - offset.y },
	      left: { x: offset.x, y: 0 },
	      right: { x: props.width - offset.x, y: 0 }
	    }[orientation];
	  },
	  getTickPosition: function getTickPosition(style, orientation, isVertical) {
	    var tickSpacing = style.size + style.padding;
	    var sign = orientationSign[orientation];
	    return {
	      x: isVertical ? sign * tickSpacing : 0,
	      x2: isVertical ? sign * style.size : 0,
	      y: isVertical ? 0 : sign * tickSpacing,
	      y2: isVertical ? 0 : sign * style.size
	    };
	  },
	  getGridEdge: function getGridEdge(props, calculatedValues) {
	    var orientation = calculatedValues.orientation;
	    var padding = calculatedValues.padding;
	    var isVertical = calculatedValues.isVertical;
	
	    var sign = -orientationSign[orientation];
	    var x = isVertical ? sign * (props.width - (padding.left + padding.right)) : 0;
	    var y = isVertical ? 0 : sign * (props.height - (padding.top + padding.bottom));
	    return { x: x, y: y };
	  },
	  getGridOffset: function getGridOffset(props, calculatedValues, offset) {
	    var padding = calculatedValues.padding;
	    var orientation = calculatedValues.orientation;
	
	    var xPadding = orientation === "right" ? padding.right : padding.left;
	    var yPadding = orientation === "top" ? padding.top : padding.bottom;
	    return {
	      x: props.crossAxis ? offset.x - xPadding : 0,
	      y: props.crossAxis ? offset.y - yPadding : 0
	    };
	  }
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(187),
	    isArrayLikeObject = __webpack_require__(205),
	    rest = __webpack_require__(141);
	
	/**
	 * Creates an array excluding all given values using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...*} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.difference, _.xor
	 * @example
	 *
	 * _.without([2, 1, 2, 3], 1, 2);
	 * // => [3]
	 */
	var without = rest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, values)
	    : [];
	});
	
	module.exports = without;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(188),
	    arrayIncludes = __webpack_require__(198),
	    arrayIncludesWith = __webpack_require__(201),
	    arrayMap = __webpack_require__(202),
	    baseUnary = __webpack_require__(203),
	    cacheHas = __webpack_require__(204);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
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
	
	    value = (comparator || value !== 0) ? value : 0;
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
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(189),
	    setCacheAdd = __webpack_require__(196),
	    setCacheHas = __webpack_require__(197);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
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
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(190),
	    listCacheDelete = __webpack_require__(191),
	    listCacheGet = __webpack_require__(193),
	    listCacheHas = __webpack_require__(194),
	    listCacheSet = __webpack_require__(195);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 190 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(192);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(135);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
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
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(192);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(192);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(192);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 196 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(199);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(200);
	
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
/* 200 */
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
	      index = fromIndex + (fromRight ? 1 : -1);
	
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
/* 201 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 202 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 203 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 204 */
/***/ function(module, exports) {

	/**
	 * Checks if a cache value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(206),
	    isObjectLike = __webpack_require__(155);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
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
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(207),
	    isFunction = __webpack_require__(181),
	    isLength = __webpack_require__(153);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(208);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 208 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(210);
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();
	
	module.exports = range;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(211),
	    isIterateeCall = __webpack_require__(140),
	    toNumber = __webpack_require__(212);
	
	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toNumber(start);
	    start = start === start ? start : 0;
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toNumber(end) || 0;
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : (toNumber(step) || 0);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	module.exports = createRange;


/***/ },
/* 211 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = baseRange;


/***/ },
/* 212 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(199);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _includes2 = __webpack_require__(213);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _flatten2 = __webpack_require__(215);
	
	var _flatten3 = _interopRequireDefault(_flatten2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _d3Scale = __webpack_require__(217);
	
	var _d3Scale2 = _interopRequireDefault(_d3Scale);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var supportedScaleStrings = ["linear", "time", "log", "sqrt"];
	
	exports.default = {
	  getDefaultScale: function getDefaultScale() {
	    return _d3Scale2.default.scaleLinear();
	  },
	  toNewName: function toNewName(scale) {
	    // d3 scale changed the naming scheme for scale from "linear" -> "scaleLinear" etc.
	    var capitalize = function capitalize(s) {
	      return s && s[0].toUpperCase() + s.slice(1);
	    };
	    return "scale" + capitalize(scale);
	  },
	  validScale: function validScale(scale) {
	    if (typeof scale === "function") {
	      return (0, _isFunction3.default)(scale.copy) && (0, _isFunction3.default)(scale.domain) && (0, _isFunction3.default)(scale.range);
	    } else if (typeof scale === "string") {
	      return (0, _includes3.default)(supportedScaleStrings, scale);
	    }
	    return false;
	  },
	  isScaleDefined: function isScaleDefined(props, axis) {
	    if (!props.scale) {
	      return false;
	    } else if (props.scale.x || props.scale.y) {
	      return props.scale[axis] ? true : false;
	    }
	    return true;
	  },
	  getScaleFromProps: function getScaleFromProps(props, axis) {
	    if (!this.isScaleDefined(props, axis)) {
	      return undefined;
	    }
	    var scale = props.scale[axis] || props.scale;
	    if (this.validScale(scale)) {
	      return (0, _isFunction3.default)(scale) ? scale : _d3Scale2.default[this.toNewName(scale)]();
	    }
	  },
	  getScaleTypeFromData: function getScaleTypeFromData(props, axis) {
	    if (!props.data) {
	      return "linear";
	    }
	    var accessor = _victoryCore.Helpers.createAccessor(props[axis]);
	    var allData = (0, _flatten3.default)(props.data);
	    var axisData = allData.map(accessor);
	    return _victoryCore.Collection.containsDates(axisData) ? "time" : "linear";
	  },
	  getBaseScale: function getBaseScale(props, axis) {
	    var scale = this.getScaleFromProps(props, axis);
	    if (scale) {
	      return scale;
	    }
	    var dataScale = this.getScaleTypeFromData(props, axis);
	    return _d3Scale2.default[this.toNewName(dataScale)]();
	  },
	  getScaleType: function getScaleType(props, axis) {
	    var scale = this.getScaleFromProps(props, axis);
	    // if the scale was not given in props, it will be set to linear or time depending on data
	    if (!scale) {
	      return this.getScaleTypeFromData(props, axis);
	    } else if (typeof scale === "string") {
	      return (0, _includes3.default)(supportedScaleStrings, scale) ? scale : "invalid";
	    } else if (!this.validScale(scale)) {
	      return "invalid";
	    }
	    var duckTypes = [{ name: "log", method: "base" }, { name: "ordinal", method: "unknown" }, { name: "pow-sqrt", method: "exponent" }, { name: "quantile", method: "quantiles" }, { name: "quantize-threshold", method: "invertExtent" }];
	    var scaleType = duckTypes.filter(function (type) {
	      return scale[type.method] !== undefined;
	    })[0];
	    if (scaleType) {
	      return scaleType.name;
	    }
	    return this.getScaleTypeFromData(props, axis);
	  }
	};

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(216);
	
	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}
	
	module.exports = flatten;


/***/ },
/* 216 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(218), __webpack_require__(219), __webpack_require__(220), __webpack_require__(222), __webpack_require__(223), __webpack_require__(224), __webpack_require__(221)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format', 'd3-color'], factory) :
	  (factory((global.d3_scale = global.d3_scale || {}),global.d3_array,global.d3_collection,global.d3_interpolate,global.d3_format,global.d3_time,global.d3_time_format,global.d3_color));
	}(this, function (exports,d3Array,d3Collection,d3Interpolate,d3Format,d3Time,d3TimeFormat,d3Color) { 'use strict';
	
	  var array = Array.prototype;
	
	  var map$1 = array.map;
	  var slice = array.slice;
	
	  var implicit = {name: "implicit"};
	
	  function ordinal() {
	    var index = d3Collection.map(),
	        domain = [],
	        range = [],
	        unknown = implicit;
	
	    function scale(d) {
	      var key = d + "", i = index.get(key);
	      if (!i) {
	        if (unknown !== implicit) return unknown;
	        index.set(key, i = domain.push(d));
	      }
	      return range[(i - 1) % range.length];
	    }
	
	    scale.domain = function(_) {
	      if (!arguments.length) return domain.slice();
	      domain = [], index = d3Collection.map();
	      var i = -1, n = _.length, d, key;
	      while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	      return scale;
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (range = slice.call(_), scale) : range.slice();
	    };
	
	    scale.unknown = function(_) {
	      return arguments.length ? (unknown = _, scale) : unknown;
	    };
	
	    scale.copy = function() {
	      return ordinal()
	          .domain(domain)
	          .range(range)
	          .unknown(unknown);
	    };
	
	    return scale;
	  }
	
	  function band() {
	    var scale = ordinal().unknown(undefined),
	        domain = scale.domain,
	        ordinalRange = scale.range,
	        range = [0, 1],
	        step,
	        bandwidth,
	        round = false,
	        paddingInner = 0,
	        paddingOuter = 0,
	        align = 0.5;
	
	    delete scale.unknown;
	
	    function rescale() {
	      var n = domain().length,
	          reverse = range[1] < range[0],
	          start = range[reverse - 0],
	          stop = range[1 - reverse];
	      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	      if (round) step = Math.floor(step);
	      start += (stop - start - step * (n - paddingInner)) * align;
	      bandwidth = step * (1 - paddingInner);
	      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	      var values = d3Array.range(n).map(function(i) { return start + step * i; });
	      return ordinalRange(reverse ? values.reverse() : values);
	    }
	
	    scale.domain = function(_) {
	      return arguments.length ? (domain(_), rescale()) : domain();
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
	    };
	
	    scale.rangeRound = function(_) {
	      return range = [+_[0], +_[1]], round = true, rescale();
	    };
	
	    scale.bandwidth = function() {
	      return bandwidth;
	    };
	
	    scale.step = function() {
	      return step;
	    };
	
	    scale.round = function(_) {
	      return arguments.length ? (round = !!_, rescale()) : round;
	    };
	
	    scale.padding = function(_) {
	      return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	    };
	
	    scale.paddingInner = function(_) {
	      return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	    };
	
	    scale.paddingOuter = function(_) {
	      return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
	    };
	
	    scale.align = function(_) {
	      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	    };
	
	    scale.copy = function() {
	      return band()
	          .domain(domain())
	          .range(range)
	          .round(round)
	          .paddingInner(paddingInner)
	          .paddingOuter(paddingOuter)
	          .align(align);
	    };
	
	    return rescale();
	  }
	
	  function pointish(scale) {
	    var copy = scale.copy;
	
	    scale.padding = scale.paddingOuter;
	    delete scale.paddingInner;
	    delete scale.paddingOuter;
	
	    scale.copy = function() {
	      return pointish(copy());
	    };
	
	    return scale;
	  }
	
	  function point() {
	    return pointish(band().paddingInner(1));
	  }
	
	  function constant(x) {
	    return function() {
	      return x;
	    };
	  }
	
	  function number(x) {
	    return +x;
	  }
	
	  var unit = [0, 1];
	
	  function deinterpolate(a, b) {
	    return (b -= (a = +a))
	        ? function(x) { return (x - a) / b; }
	        : constant(b);
	  }
	
	  function deinterpolateClamp(deinterpolate) {
	    return function(a, b) {
	      var d = deinterpolate(a = +a, b = +b);
	      return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
	    };
	  }
	
	  function reinterpolateClamp(reinterpolate) {
	    return function(a, b) {
	      var r = reinterpolate(a = +a, b = +b);
	      return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
	    };
	  }
	
	  function bimap(domain, range, deinterpolate, reinterpolate) {
	    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
	    if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
	    else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
	    return function(x) { return r0(d0(x)); };
	  }
	
	  function polymap(domain, range, deinterpolate, reinterpolate) {
	    var j = Math.min(domain.length, range.length) - 1,
	        d = new Array(j),
	        r = new Array(j),
	        i = -1;
	
	    // Reverse descending domains.
	    if (domain[j] < domain[0]) {
	      domain = domain.slice().reverse();
	      range = range.slice().reverse();
	    }
	
	    while (++i < j) {
	      d[i] = deinterpolate(domain[i], domain[i + 1]);
	      r[i] = reinterpolate(range[i], range[i + 1]);
	    }
	
	    return function(x) {
	      var i = d3Array.bisect(domain, x, 1, j) - 1;
	      return r[i](d[i](x));
	    };
	  }
	
	  function copy(source, target) {
	    return target
	        .domain(source.domain())
	        .range(source.range())
	        .interpolate(source.interpolate())
	        .clamp(source.clamp());
	  }
	
	  // deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	  // reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
	  function continuous(deinterpolate$$, reinterpolate) {
	    var domain = unit,
	        range = unit,
	        interpolate = d3Interpolate.interpolate,
	        clamp = false,
	        output,
	        input;
	
	    function rescale() {
	      var map = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
	      output = map(domain, range, clamp ? deinterpolateClamp(deinterpolate$$) : deinterpolate$$, interpolate);
	      input = map(range, domain, deinterpolate, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate);
	      return scale;
	    }
	
	    function scale(x) {
	      return output(+x);
	    }
	
	    scale.invert = function(y) {
	      return input(+y);
	    };
	
	    scale.domain = function(_) {
	      return arguments.length ? (domain = map$1.call(_, number), rescale()) : domain.slice();
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
	    };
	
	    scale.rangeRound = function(_) {
	      return range = slice.call(_), interpolate = d3Interpolate.interpolateRound, rescale();
	    };
	
	    scale.clamp = function(_) {
	      return arguments.length ? (clamp = !!_, rescale()) : clamp;
	    };
	
	    scale.interpolate = function(_) {
	      return arguments.length ? (interpolate = _, rescale()) : interpolate;
	    };
	
	    return rescale();
	  }
	
	  function tickFormat(domain, count, specifier) {
	    var start = domain[0],
	        stop = domain[domain.length - 1],
	        step = d3Array.tickStep(start, stop, count == null ? 10 : count),
	        precision;
	    specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
	    switch (specifier.type) {
	      case "s": {
	        var value = Math.max(Math.abs(start), Math.abs(stop));
	        if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
	        return d3Format.formatPrefix(specifier, value);
	      }
	      case "":
	      case "e":
	      case "g":
	      case "p":
	      case "r": {
	        if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	        break;
	      }
	      case "f":
	      case "%": {
	        if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	        break;
	      }
	    }
	    return d3Format.format(specifier);
	  }
	
	  function linearish(scale) {
	    var domain = scale.domain;
	
	    scale.ticks = function(count) {
	      var d = domain();
	      return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      return tickFormat(domain(), count, specifier);
	    };
	
	    scale.nice = function(count) {
	      var d = domain(),
	          i = d.length - 1,
	          n = count == null ? 10 : count,
	          start = d[0],
	          stop = d[i],
	          step = d3Array.tickStep(start, stop, n);
	
	      if (step) {
	        step = d3Array.tickStep(Math.floor(start / step) * step, Math.ceil(stop / step) * step, n);
	        d[0] = Math.floor(start / step) * step;
	        d[i] = Math.ceil(stop / step) * step;
	        domain(d);
	      }
	
	      return scale;
	    };
	
	    return scale;
	  }
	
	  function linear() {
	    var scale = continuous(deinterpolate, d3Interpolate.interpolateNumber);
	
	    scale.copy = function() {
	      return copy(scale, linear());
	    };
	
	    return linearish(scale);
	  }
	
	  function identity() {
	    var domain = [0, 1];
	
	    function scale(x) {
	      return +x;
	    }
	
	    scale.invert = scale;
	
	    scale.domain = scale.range = function(_) {
	      return arguments.length ? (domain = map$1.call(_, number), scale) : domain.slice();
	    };
	
	    scale.copy = function() {
	      return identity().domain(domain);
	    };
	
	    return linearish(scale);
	  }
	
	  function nice(domain, interval) {
	    domain = domain.slice();
	
	    var i0 = 0,
	        i1 = domain.length - 1,
	        x0 = domain[i0],
	        x1 = domain[i1],
	        t;
	
	    if (x1 < x0) {
	      t = i0, i0 = i1, i1 = t;
	      t = x0, x0 = x1, x1 = t;
	    }
	
	    domain[i0] = interval.floor(x0);
	    domain[i1] = interval.ceil(x1);
	    return domain;
	  }
	
	  function deinterpolate$1(a, b) {
	    return (b = Math.log(b / a))
	        ? function(x) { return Math.log(x / a) / b; }
	        : constant(b);
	  }
	
	  function reinterpolate(a, b) {
	    return a < 0
	        ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
	        : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
	  }
	
	  function pow10(x) {
	    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
	  }
	
	  function powp(base) {
	    return base === 10 ? pow10
	        : base === Math.E ? Math.exp
	        : function(x) { return Math.pow(base, x); };
	  }
	
	  function logp(base) {
	    return base === Math.E ? Math.log
	        : base === 10 && Math.log10
	        || base === 2 && Math.log2
	        || (base = Math.log(base), function(x) { return Math.log(x) / base; });
	  }
	
	  function reflect(f) {
	    return function(x) {
	      return -f(-x);
	    };
	  }
	
	  function log() {
	    var scale = continuous(deinterpolate$1, reinterpolate).domain([1, 10]),
	        domain = scale.domain,
	        base = 10,
	        logs = logp(10),
	        pows = powp(10);
	
	    function rescale() {
	      logs = logp(base), pows = powp(base);
	      if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
	      return scale;
	    }
	
	    scale.base = function(_) {
	      return arguments.length ? (base = +_, rescale()) : base;
	    };
	
	    scale.domain = function(_) {
	      return arguments.length ? (domain(_), rescale()) : domain();
	    };
	
	    scale.ticks = function(count) {
	      var d = domain(),
	          u = d[0],
	          v = d[d.length - 1],
	          r;
	
	      if (r = v < u) i = u, u = v, v = i;
	
	      var i = logs(u),
	          j = logs(v),
	          p,
	          k,
	          t,
	          n = count == null ? 10 : +count,
	          z = [];
	
	      if (!(base % 1) && j - i < n) {
	        i = Math.round(i) - 1, j = Math.round(j) + 1;
	        if (u > 0) for (; i < j; ++i) {
	          for (k = 1, p = pows(i); k < base; ++k) {
	            t = p * k;
	            if (t < u) continue;
	            if (t > v) break;
	            z.push(t);
	          }
	        } else for (; i < j; ++i) {
	          for (k = base - 1, p = pows(i); k >= 1; --k) {
	            t = p * k;
	            if (t < u) continue;
	            if (t > v) break;
	            z.push(t);
	          }
	        }
	        if (r) z.reverse();
	      } else {
	        z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
	      }
	
	      return z;
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
	      if (typeof specifier !== "function") specifier = d3Format.format(specifier);
	      if (count === Infinity) return specifier;
	      if (count == null) count = 10;
	      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
	      return function(d) {
	        var i = d / pows(Math.round(logs(d)));
	        if (i * base < base - 0.5) i *= base;
	        return i <= k ? specifier(d) : "";
	      };
	    };
	
	    scale.nice = function() {
	      return domain(nice(domain(), {
	        floor: function(x) { return pows(Math.floor(logs(x))); },
	        ceil: function(x) { return pows(Math.ceil(logs(x))); }
	      }));
	    };
	
	    scale.copy = function() {
	      return copy(scale, log().base(base));
	    };
	
	    return scale;
	  }
	
	  function raise(x, exponent) {
	    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	  }
	
	  function pow() {
	    var exponent = 1,
	        scale = continuous(deinterpolate, reinterpolate),
	        domain = scale.domain;
	
	    function deinterpolate(a, b) {
	      return (b = raise(b, exponent) - (a = raise(a, exponent)))
	          ? function(x) { return (raise(x, exponent) - a) / b; }
	          : constant(b);
	    }
	
	    function reinterpolate(a, b) {
	      b = raise(b, exponent) - (a = raise(a, exponent));
	      return function(t) { return raise(a + b * t, 1 / exponent); };
	    }
	
	    scale.exponent = function(_) {
	      return arguments.length ? (exponent = +_, domain(domain())) : exponent;
	    };
	
	    scale.copy = function() {
	      return copy(scale, pow().exponent(exponent));
	    };
	
	    return linearish(scale);
	  }
	
	  function sqrt() {
	    return pow().exponent(0.5);
	  }
	
	  function quantile$1() {
	    var domain = [],
	        range = [],
	        thresholds = [];
	
	    function rescale() {
	      var i = 0, n = Math.max(1, range.length);
	      thresholds = new Array(n - 1);
	      while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
	      return scale;
	    }
	
	    function scale(x) {
	      if (!isNaN(x = +x)) return range[d3Array.bisect(thresholds, x)];
	    }
	
	    scale.invertExtent = function(y) {
	      var i = range.indexOf(y);
	      return i < 0 ? [NaN, NaN] : [
	        i > 0 ? thresholds[i - 1] : domain[0],
	        i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
	      ];
	    };
	
	    scale.domain = function(_) {
	      if (!arguments.length) return domain.slice();
	      domain = [];
	      for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
	      domain.sort(d3Array.ascending);
	      return rescale();
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
	    };
	
	    scale.quantiles = function() {
	      return thresholds.slice();
	    };
	
	    scale.copy = function() {
	      return quantile$1()
	          .domain(domain)
	          .range(range);
	    };
	
	    return scale;
	  }
	
	  function quantize() {
	    var x0 = 0,
	        x1 = 1,
	        n = 1,
	        domain = [0.5],
	        range = [0, 1];
	
	    function scale(x) {
	      if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
	    }
	
	    function rescale() {
	      var i = -1;
	      domain = new Array(n);
	      while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
	      return scale;
	    }
	
	    scale.domain = function(_) {
	      return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
	    };
	
	    scale.invertExtent = function(y) {
	      var i = range.indexOf(y);
	      return i < 0 ? [NaN, NaN]
	          : i < 1 ? [x0, domain[0]]
	          : i >= n ? [domain[n - 1], x1]
	          : [domain[i - 1], domain[i]];
	    };
	
	    scale.copy = function() {
	      return quantize()
	          .domain([x0, x1])
	          .range(range);
	    };
	
	    return linearish(scale);
	  }
	
	  function threshold() {
	    var domain = [0.5],
	        range = [0, 1],
	        n = 1;
	
	    function scale(x) {
	      if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
	    }
	
	    scale.domain = function(_) {
	      return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
	    };
	
	    scale.range = function(_) {
	      return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
	    };
	
	    scale.invertExtent = function(y) {
	      var i = range.indexOf(y);
	      return [domain[i - 1], domain[i]];
	    };
	
	    scale.copy = function() {
	      return threshold()
	          .domain(domain)
	          .range(range);
	    };
	
	    return scale;
	  }
	
	  var durationSecond = 1000;
	  var durationMinute = durationSecond * 60;
	  var durationHour = durationMinute * 60;
	  var durationDay = durationHour * 24;
	  var durationWeek = durationDay * 7;
	  var durationMonth = durationDay * 30;
	  var durationYear = durationDay * 365;
	  function newDate(t) {
	    return new Date(t);
	  }
	
	  function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
	    var scale = continuous(deinterpolate, d3Interpolate.interpolateNumber),
	        invert = scale.invert,
	        domain = scale.domain;
	
	    var formatMillisecond = format(".%L"),
	        formatSecond = format(":%S"),
	        formatMinute = format("%I:%M"),
	        formatHour = format("%I %p"),
	        formatDay = format("%a %d"),
	        formatWeek = format("%b %d"),
	        formatMonth = format("%B"),
	        formatYear = format("%Y");
	
	    var tickIntervals = [
	      [second,  1,      durationSecond],
	      [second,  5,  5 * durationSecond],
	      [second, 15, 15 * durationSecond],
	      [second, 30, 30 * durationSecond],
	      [minute,  1,      durationMinute],
	      [minute,  5,  5 * durationMinute],
	      [minute, 15, 15 * durationMinute],
	      [minute, 30, 30 * durationMinute],
	      [  hour,  1,      durationHour  ],
	      [  hour,  3,  3 * durationHour  ],
	      [  hour,  6,  6 * durationHour  ],
	      [  hour, 12, 12 * durationHour  ],
	      [   day,  1,      durationDay   ],
	      [   day,  2,  2 * durationDay   ],
	      [  week,  1,      durationWeek  ],
	      [ month,  1,      durationMonth ],
	      [ month,  3,  3 * durationMonth ],
	      [  year,  1,      durationYear  ]
	    ];
	
	    function tickFormat(date) {
	      return (second(date) < date ? formatMillisecond
	          : minute(date) < date ? formatSecond
	          : hour(date) < date ? formatMinute
	          : day(date) < date ? formatHour
	          : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
	          : year(date) < date ? formatMonth
	          : formatYear)(date);
	    }
	
	    function tickInterval(interval, start, stop, step) {
	      if (interval == null) interval = 10;
	
	      // If a desired tick count is specified, pick a reasonable tick interval
	      // based on the extent of the domain and a rough estimate of tick size.
	      // Otherwise, assume interval is already a time interval and use it.
	      if (typeof interval === "number") {
	        var target = Math.abs(stop - start) / interval,
	            i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
	        if (i === tickIntervals.length) {
	          step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
	          interval = year;
	        } else if (i) {
	          i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	          step = i[1];
	          interval = i[0];
	        } else {
	          step = d3Array.tickStep(start, stop, interval);
	          interval = millisecond;
	        }
	      }
	
	      return step == null ? interval : interval.every(step);
	    }
	
	    scale.invert = function(y) {
	      return new Date(invert(y));
	    };
	
	    scale.domain = function(_) {
	      return arguments.length ? domain(_) : domain().map(newDate);
	    };
	
	    scale.ticks = function(interval, step) {
	      var d = domain(),
	          t0 = d[0],
	          t1 = d[d.length - 1],
	          r = t1 < t0,
	          t;
	      if (r) t = t0, t0 = t1, t1 = t;
	      t = tickInterval(interval, t0, t1, step);
	      t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
	      return r ? t.reverse() : t;
	    };
	
	    scale.tickFormat = function(specifier) {
	      return specifier == null ? tickFormat : format(specifier);
	    };
	
	    scale.nice = function(interval, step) {
	      var d = domain();
	      return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
	          ? domain(nice(d, interval))
	          : scale;
	    };
	
	    scale.copy = function() {
	      return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
	    };
	
	    return scale;
	  }
	
	  function time() {
	    return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	  }
	
	  function utcTime() {
	    return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	  }
	
	  function colors(s) {
	    return s.match(/.{6}/g).map(function(x) {
	      return "#" + x;
	    });
	  }
	
	  var colors10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
	
	  function category10() {
	    return ordinal().range(colors10);
	  }
	
	  var colors20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");
	
	  function category20b() {
	    return ordinal().range(colors20b);
	  }
	
	  var colors20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");
	
	  function category20c() {
	    return ordinal().range(colors20c);
	  }
	
	  var colors20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");
	
	  function category20() {
	    return ordinal().range(colors20);
	  }
	
	  function cubehelix$1() {
	    return linear()
	        .interpolate(d3Interpolate.interpolateCubehelixLong)
	        .range([d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0)]);
	  }
	
	  function sequential(interpolate) {
	    var x0 = 0,
	        x1 = 1,
	        clamp = false;
	
	    function scale(x) {
	      var t = (x - x0) / (x1 - x0);
	      return interpolate(clamp ? Math.max(0, Math.min(1, t)) : t);
	    }
	
	    scale.domain = function(_) {
	      return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
	    };
	
	    scale.clamp = function(_) {
	      return arguments.length ? (clamp = !!_, scale) : clamp;
	    };
	
	    scale.copy = function() {
	      return sequential(interpolate).domain([x0, x1]).clamp(clamp);
	    };
	
	    return linearish(scale);
	  }
	
	  function warm() {
	    return sequential(d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8)));
	  }
	
	  function cool() {
	    return sequential(d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8)));
	  }
	
	  function rainbow() {
	    var rainbow = d3Color.cubehelix();
	    return sequential(function(t) {
	      if (t < 0 || t > 1) t -= Math.floor(t);
	      var ts = Math.abs(t - 0.5);
	      rainbow.h = 360 * t - 100;
	      rainbow.s = 1.5 - 1.5 * ts;
	      rainbow.l = 0.8 - 0.9 * ts;
	      return rainbow + "";
	    });
	  }
	
	  var rangeViridis = colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725");
	  var rangeMagma = colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf");
	  var rangeInferno = colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4");
	  var rangePlasma = colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921");
	  function ramp(range) {
	    var s = sequential(function(t) { return range[Math.round(t * range.length - t)]; }).clamp(true);
	    delete s.clamp;
	    return s;
	  }
	
	  function viridis() {
	    return ramp(rangeViridis);
	  }
	
	  function magma() {
	    return ramp(rangeMagma);
	  }
	
	  function inferno() {
	    return ramp(rangeInferno);
	  }
	
	  function plasma() {
	    return ramp(rangePlasma);
	  }
	
	  var version = "0.6.4";
	
	  exports.version = version;
	  exports.scaleBand = band;
	  exports.scalePoint = point;
	  exports.scaleIdentity = identity;
	  exports.scaleLinear = linear;
	  exports.scaleLog = log;
	  exports.scaleOrdinal = ordinal;
	  exports.scaleImplicit = implicit;
	  exports.scalePow = pow;
	  exports.scaleSqrt = sqrt;
	  exports.scaleQuantile = quantile$1;
	  exports.scaleQuantize = quantize;
	  exports.scaleThreshold = threshold;
	  exports.scaleTime = time;
	  exports.scaleUtc = utcTime;
	  exports.scaleCategory10 = category10;
	  exports.scaleCategory20b = category20b;
	  exports.scaleCategory20c = category20c;
	  exports.scaleCategory20 = category20;
	  exports.scaleCubehelix = cubehelix$1;
	  exports.scaleRainbow = rainbow;
	  exports.scaleWarm = warm;
	  exports.scaleCool = cool;
	  exports.scaleViridis = viridis;
	  exports.scaleMagma = magma;
	  exports.scaleInferno = inferno;
	  exports.scalePlasma = plasma;
	
	}));

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_array = {})));
	}(this, function (exports) { 'use strict';
	
	  function ascending(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	  }
	
	  function bisector(compare) {
	    if (compare.length === 1) compare = ascendingComparator(compare);
	    return {
	      left: function(a, x, lo, hi) {
	        if (lo == null) lo = 0;
	        if (hi == null) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) < 0) lo = mid + 1;
	          else hi = mid;
	        }
	        return lo;
	      },
	      right: function(a, x, lo, hi) {
	        if (lo == null) lo = 0;
	        if (hi == null) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) > 0) hi = mid;
	          else lo = mid + 1;
	        }
	        return lo;
	      }
	    };
	  }
	
	  function ascendingComparator(f) {
	    return function(d, x) {
	      return ascending(f(d), x);
	    };
	  }
	
	  var ascendingBisect = bisector(ascending);
	  var bisectRight = ascendingBisect.right;
	  var bisectLeft = ascendingBisect.left;
	
	  function descending(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  }
	
	  function number$1(x) {
	    return x === null ? NaN : +x;
	  }
	
	  function variance(array, f) {
	    var n = array.length,
	        m = 0,
	        a,
	        d,
	        s = 0,
	        i = -1,
	        j = 0;
	
	    if (f == null) {
	      while (++i < n) {
	        if (!isNaN(a = number$1(array[i]))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    }
	
	    else {
	      while (++i < n) {
	        if (!isNaN(a = number$1(f(array[i], i, array)))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    }
	
	    if (j > 1) return s / (j - 1);
	  }
	
	  function deviation(array, f) {
	    var v = variance(array, f);
	    return v ? Math.sqrt(v) : v;
	  }
	
	  function extent(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b,
	        c;
	
	    if (f == null) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
	      while (++i < n) if ((b = array[i]) != null) {
	        if (a > b) a = b;
	        if (c < b) c = b;
	      }
	    }
	
	    else {
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; }
	      while (++i < n) if ((b = f(array[i], i, array)) != null) {
	        if (a > b) a = b;
	        if (c < b) c = b;
	      }
	    }
	
	    return [a, c];
	  }
	
	  function constant(x) {
	    return function() {
	      return x;
	    };
	  }
	
	  function identity(x) {
	    return x;
	  }
	
	  function range(start, stop, step) {
	    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
	
	    var i = -1,
	        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	        range = new Array(n);
	
	    while (++i < n) {
	      range[i] = start + i * step;
	    }
	
	    return range;
	  }
	
	  var e10 = Math.sqrt(50);
	  var e5 = Math.sqrt(10);
	  var e2 = Math.sqrt(2);
	  function ticks(start, stop, count) {
	    var step = tickStep(start, stop, count);
	    return range(
	      Math.ceil(start / step) * step,
	      Math.floor(stop / step) * step + step / 2, // inclusive
	      step
	    );
	  }
	
	  function tickStep(start, stop, count) {
	    var step0 = Math.abs(stop - start) / Math.max(0, count),
	        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	        error = step0 / step1;
	    if (error >= e10) step1 *= 10;
	    else if (error >= e5) step1 *= 5;
	    else if (error >= e2) step1 *= 2;
	    return stop < start ? -step1 : step1;
	  }
	
	  function sturges(values) {
	    return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	  }
	
	  function number(x) {
	    return +x;
	  }
	
	  function histogram() {
	    var value = identity,
	        domain = extent,
	        threshold = sturges;
	
	    function histogram(data) {
	      var i,
	          n = data.length,
	          x,
	          values = new Array(n);
	
	      // Coerce values to numbers.
	      for (i = 0; i < n; ++i) {
	        values[i] = +value(data[i], i, data);
	      }
	
	      var xz = domain(values),
	          x0 = +xz[0],
	          x1 = +xz[1],
	          tz = threshold(values, x0, x1);
	
	      // Convert number of thresholds into uniform thresholds.
	      if (!Array.isArray(tz)) tz = ticks(x0, x1, +tz);
	
	      // Coerce thresholds to numbers, ignoring any outside the domain.
	      var m = tz.length;
	      for (i = 0; i < m; ++i) tz[i] = +tz[i];
	      while (tz[0] <= x0) tz.shift(), --m;
	      while (tz[m - 1] >= x1) tz.pop(), --m;
	
	      var bins = new Array(m + 1),
	          bin;
	
	      // Initialize bins.
	      for (i = 0; i <= m; ++i) {
	        bin = bins[i] = [];
	        bin.x0 = i > 0 ? tz[i - 1] : x0;
	        bin.x1 = i < m ? tz[i] : x1;
	      }
	
	      // Assign data to bins by value, ignoring any outside the domain.
	      for (i = 0; i < n; ++i) {
	        x = values[i];
	        if (x0 <= x && x <= x1) {
	          bins[bisectRight(tz, x, 0, m)].push(data[i]);
	        }
	      }
	
	      return bins;
	    }
	
	    histogram.value = function(_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram) : value;
	    };
	
	    histogram.domain = function(_) {
	      return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram) : domain;
	    };
	
	    histogram.thresholds = function(_) {
	      if (!arguments.length) return threshold;
	      threshold = typeof _ === "function" ? _
	          : Array.isArray(_) ? constant(Array.prototype.map.call(_, number))
	          : constant(+_);
	      return histogram;
	    };
	
	    return histogram;
	  }
	
	  function quantile(array, p, f) {
	    if (f == null) f = number$1;
	    if (!(n = array.length)) return;
	    if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
	    if (p >= 1) return +f(array[n - 1], n - 1, array);
	    var n,
	        h = (n - 1) * p,
	        i = Math.floor(h),
	        a = +f(array[i], i, array),
	        b = +f(array[i + 1], i + 1, array);
	    return a + (b - a) * (h - i);
	  }
	
	  function freedmanDiaconis(values, min, max) {
	    values.sort(ascending);
	    return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	  }
	
	  function scott(values, min, max) {
	    return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	  }
	
	  function max(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b;
	
	    if (f == null) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	    }
	
	    else {
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
	    }
	
	    return a;
	  }
	
	  function mean(array, f) {
	    var s = 0,
	        n = array.length,
	        a,
	        i = -1,
	        j = n;
	
	    if (f == null) {
	      while (++i < n) if (!isNaN(a = number$1(array[i]))) s += a; else --j;
	    }
	
	    else {
	      while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) s += a; else --j;
	    }
	
	    if (j) return s / j;
	  }
	
	  function median(array, f) {
	    var numbers = [],
	        n = array.length,
	        a,
	        i = -1;
	
	    if (f == null) {
	      while (++i < n) if (!isNaN(a = number$1(array[i]))) numbers.push(a);
	    }
	
	    else {
	      while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) numbers.push(a);
	    }
	
	    return quantile(numbers.sort(ascending), 0.5);
	  }
	
	  function merge(arrays) {
	    var n = arrays.length,
	        m,
	        i = -1,
	        j = 0,
	        merged,
	        array;
	
	    while (++i < n) j += arrays[i].length;
	    merged = new Array(j);
	
	    while (--n >= 0) {
	      array = arrays[n];
	      m = array.length;
	      while (--m >= 0) {
	        merged[--j] = array[m];
	      }
	    }
	
	    return merged;
	  }
	
	  function min(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b;
	
	    if (f == null) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	    }
	
	    else {
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
	    }
	
	    return a;
	  }
	
	  function pairs(array) {
	    var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
	    while (i < n) pairs[i] = [p, p = array[++i]];
	    return pairs;
	  }
	
	  function permute(array, indexes) {
	    var i = indexes.length, permutes = new Array(i);
	    while (i--) permutes[i] = array[indexes[i]];
	    return permutes;
	  }
	
	  function scan(array, compare) {
	    if (!(n = array.length)) return;
	    var i = 0,
	        n,
	        j = 0,
	        xi,
	        xj = array[j];
	
	    if (!compare) compare = ascending;
	
	    while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;
	
	    if (compare(xj, xj) === 0) return j;
	  }
	
	  function shuffle(array, i0, i1) {
	    var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	        t,
	        i;
	
	    while (m) {
	      i = Math.random() * m-- | 0;
	      t = array[m + i0];
	      array[m + i0] = array[i + i0];
	      array[i + i0] = t;
	    }
	
	    return array;
	  }
	
	  function sum(array, f) {
	    var s = 0,
	        n = array.length,
	        a,
	        i = -1;
	
	    if (f == null) {
	      while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
	    }
	
	    else {
	      while (++i < n) if (a = +f(array[i], i, array)) s += a;
	    }
	
	    return s;
	  }
	
	  function transpose(matrix) {
	    if (!(n = matrix.length)) return [];
	    for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	        row[j] = matrix[j][i];
	      }
	    }
	    return transpose;
	  }
	
	  function length(d) {
	    return d.length;
	  }
	
	  function zip() {
	    return transpose(arguments);
	  }
	
	  var version = "0.7.1";
	
	  exports.version = version;
	  exports.bisect = bisectRight;
	  exports.bisectRight = bisectRight;
	  exports.bisectLeft = bisectLeft;
	  exports.ascending = ascending;
	  exports.bisector = bisector;
	  exports.descending = descending;
	  exports.deviation = deviation;
	  exports.extent = extent;
	  exports.histogram = histogram;
	  exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	  exports.thresholdScott = scott;
	  exports.thresholdSturges = sturges;
	  exports.max = max;
	  exports.mean = mean;
	  exports.median = median;
	  exports.merge = merge;
	  exports.min = min;
	  exports.pairs = pairs;
	  exports.permute = permute;
	  exports.quantile = quantile;
	  exports.range = range;
	  exports.scan = scan;
	  exports.shuffle = shuffle;
	  exports.sum = sum;
	  exports.ticks = ticks;
	  exports.tickStep = tickStep;
	  exports.transpose = transpose;
	  exports.variance = variance;
	  exports.zip = zip;
	
	}));

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_collection = global.d3_collection || {})));
	}(this, function (exports) { 'use strict';
	
	  var prefix = "$";
	
	  function Map() {}
	
	  Map.prototype = map.prototype = {
	    constructor: Map,
	    has: function(key) {
	      return (prefix + key) in this;
	    },
	    get: function(key) {
	      return this[prefix + key];
	    },
	    set: function(key, value) {
	      this[prefix + key] = value;
	      return this;
	    },
	    remove: function(key) {
	      var property = prefix + key;
	      return property in this && delete this[property];
	    },
	    clear: function() {
	      for (var property in this) if (property[0] === prefix) delete this[property];
	    },
	    keys: function() {
	      var keys = [];
	      for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	      return keys;
	    },
	    values: function() {
	      var values = [];
	      for (var property in this) if (property[0] === prefix) values.push(this[property]);
	      return values;
	    },
	    entries: function() {
	      var entries = [];
	      for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	      return entries;
	    },
	    size: function() {
	      var size = 0;
	      for (var property in this) if (property[0] === prefix) ++size;
	      return size;
	    },
	    empty: function() {
	      for (var property in this) if (property[0] === prefix) return false;
	      return true;
	    },
	    each: function(f) {
	      for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	    }
	  };
	
	  function map(object, f) {
	    var map = new Map;
	
	    // Copy constructor.
	    if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });
	
	    // Index array by numeric index or specified key function.
	    else if (Array.isArray(object)) {
	      var i = -1,
	          n = object.length,
	          o;
	
	      if (f == null) while (++i < n) map.set(i, object[i]);
	      else while (++i < n) map.set(f(o = object[i], i, object), o);
	    }
	
	    // Convert object to map.
	    else if (object) for (var key in object) map.set(key, object[key]);
	
	    return map;
	  }
	
	  function nest() {
	    var keys = [],
	        sortKeys = [],
	        sortValues,
	        rollup,
	        nest;
	
	    function apply(array, depth, createResult, setResult) {
	      if (depth >= keys.length) return rollup
	          ? rollup(array) : (sortValues
	          ? array.sort(sortValues)
	          : array);
	
	      var i = -1,
	          n = array.length,
	          key = keys[depth++],
	          keyValue,
	          value,
	          valuesByKey = map(),
	          values,
	          result = createResult();
	
	      while (++i < n) {
	        if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	          values.push(value);
	        } else {
	          valuesByKey.set(keyValue, [value]);
	        }
	      }
	
	      valuesByKey.each(function(values, key) {
	        setResult(result, key, apply(values, depth, createResult, setResult));
	      });
	
	      return result;
	    }
	
	    function entries(map, depth) {
	      if (depth >= keys.length) return map;
	
	      var array = [],
	          sortKey = sortKeys[depth++];
	
	      map.each(function(value, key) {
	        array.push({key: key, values: entries(value, depth)});
	      });
	
	      return sortKey
	          ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
	          : array;
	    }
	
	    return nest = {
	      object: function(array) { return apply(array, 0, createObject, setObject); },
	      map: function(array) { return apply(array, 0, createMap, setMap); },
	      entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	      key: function(d) { keys.push(d); return nest; },
	      sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	      sortValues: function(order) { sortValues = order; return nest; },
	      rollup: function(f) { rollup = f; return nest; }
	    };
	  }
	
	  function createObject() {
	    return {};
	  }
	
	  function setObject(object, key, value) {
	    object[key] = value;
	  }
	
	  function createMap() {
	    return map();
	  }
	
	  function setMap(map, key, value) {
	    map.set(key, value);
	  }
	
	  function Set() {}
	
	  var proto = map.prototype;
	
	  Set.prototype = set.prototype = {
	    constructor: Set,
	    has: proto.has,
	    add: function(value) {
	      value += "";
	      this[prefix + value] = value;
	      return this;
	    },
	    remove: proto.remove,
	    clear: proto.clear,
	    values: proto.keys,
	    size: proto.size,
	    empty: proto.empty,
	    each: proto.each
	  };
	
	  function set(object, f) {
	    var set = new Set;
	
	    // Copy constructor.
	    if (object instanceof Set) object.each(function(value) { set.add(value); });
	
	    // Otherwise, assume it’s an array.
	    else if (object) {
	      var i = -1, n = object.length;
	      if (f == null) while (++i < n) set.add(object[i]);
	      else while (++i < n) set.add(f(object[i], i, object));
	    }
	
	    return set;
	  }
	
	  function keys(map) {
	    var keys = [];
	    for (var key in map) keys.push(key);
	    return keys;
	  }
	
	  function values(map) {
	    var values = [];
	    for (var key in map) values.push(map[key]);
	    return values;
	  }
	
	  function entries(map) {
	    var entries = [];
	    for (var key in map) entries.push({key: key, value: map[key]});
	    return entries;
	  }
	
	  var version = "0.1.2";
	
	  exports.version = version;
	  exports.nest = nest;
	  exports.set = set;
	  exports.map = map;
	  exports.keys = keys;
	  exports.values = values;
	  exports.entries = entries;
	
	}));

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(221)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	  (factory((global.d3_interpolate = global.d3_interpolate || {}),global.d3_color));
	}(this, function (exports,d3Color) { 'use strict';
	
	  function constant(x) {
	    return function() {
	      return x;
	    };
	  }
	
	  function linear(a, d) {
	    return function(t) {
	      return a + t * d;
	    };
	  }
	
	  function exponential(a, b, y) {
	    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	      return Math.pow(a + t * b, y);
	    };
	  }
	
	  function interpolateHue(a, b) {
	    var d = b - a;
	    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	  }
	
	  function gamma(y) {
	    return (y = +y) === 1 ? nogamma : function(a, b) {
	      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	    };
	  }
	
	  function nogamma(a, b) {
	    var d = b - a;
	    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	  }
	
	  var rgb$1 = (function gamma$$(y) {
	    var interpolateColor = gamma(y);
	
	    function interpolateRgb(start, end) {
	      var r = interpolateColor((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	          g = interpolateColor(start.g, end.g),
	          b = interpolateColor(start.b, end.b),
	          opacity = interpolateColor(start.opacity, end.opacity);
	      return function(t) {
	        start.r = r(t);
	        start.g = g(t);
	        start.b = b(t);
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    interpolateRgb.gamma = gamma$$;
	
	    return interpolateRgb;
	  })(1);
	
	  // TODO sparse arrays?
	  function array(a, b) {
	    var x = [],
	        c = [],
	        na = a ? a.length : 0,
	        nb = b ? b.length : 0,
	        n0 = Math.min(na, nb),
	        i;
	
	    for (i = 0; i < n0; ++i) x.push(value(a[i], b[i]));
	    for (; i < na; ++i) c[i] = a[i];
	    for (; i < nb; ++i) c[i] = b[i];
	
	    return function(t) {
	      for (i = 0; i < n0; ++i) c[i] = x[i](t);
	      return c;
	    };
	  }
	
	  function number(a, b) {
	    return a = +a, b -= a, function(t) {
	      return a + b * t;
	    };
	  }
	
	  function object(a, b) {
	    var i = {},
	        c = {},
	        k;
	
	    if (a === null || typeof a !== "object") a = {};
	    if (b === null || typeof b !== "object") b = {};
	
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
	  }
	
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
	  }
	
	  function value(a, b) {
	    var t = typeof b, c;
	    return b == null || t === "boolean" ? constant(b)
	        : (t === "number" ? number
	        : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	        : b instanceof d3Color.color ? rgb$1
	        : Array.isArray(b) ? array
	        : object)(a, b);
	  }
	
	  function round(a, b) {
	    return a = +a, b -= a, function(t) {
	      return Math.round(a + b * t);
	    };
	  }
	
	  var rad2deg = 180 / Math.PI;
	
	  var identity = {
	    translateX: 0,
	    translateY: 0,
	    rotate: 0,
	    skewX: 0,
	    scaleX: 1,
	    scaleY: 1
	  };
	
	  function decompose(a, b, c, d, e, f) {
	    if (a * d === b * c) return null;
	
	    var scaleX = Math.sqrt(a * a + b * b);
	    a /= scaleX, b /= scaleX;
	
	    var skewX = a * c + b * d;
	    c -= a * skewX, d -= b * skewX;
	
	    var scaleY = Math.sqrt(c * c + d * d);
	    c /= scaleY, d /= scaleY, skewX /= scaleY;
	
	    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	
	    return {
	      translateX: e,
	      translateY: f,
	      rotate: Math.atan2(b, a) * rad2deg,
	      skewX: Math.atan(skewX) * rad2deg,
	      scaleX: scaleX,
	      scaleY: scaleY
	    };
	  }
	
	  var cssNode;
	  var cssRoot;
	  var cssView;
	  var svgNode;
	  function parseCss(value) {
	    if (value === "none") return identity;
	    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	    cssNode.style.transform = value;
	    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	    cssRoot.removeChild(cssNode);
	    var m = value.slice(7, -1).split(",");
	    return decompose(+m[0], +m[1], +m[2], +m[3], +m[4], +m[5]);
	  }
	
	  function parseSvg(value) {
	    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	    svgNode.setAttribute("transform", value == null ? "" : value);
	    var m = svgNode.transform.baseVal.consolidate().matrix;
	    return decompose(m.a, m.b, m.c, m.d, m.e, m.f);
	  }
	
	  function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	    function pop(s) {
	      return s.length ? s.pop() + " " : "";
	    }
	
	    function translate(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push("translate(", null, pxComma, null, pxParen);
	        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	      } else if (xb || yb) {
	        s.push("translate(" + xb + pxComma + yb + pxParen);
	      }
	    }
	
	    function rotate(a, b, s, q) {
	      if (a !== b) {
	        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	      } else if (b) {
	        s.push(pop(s) + "rotate(" + b + degParen);
	      }
	    }
	
	    function skewX(a, b, s, q) {
	      if (a !== b) {
	        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	      } else if (b) {
	        s.push(pop(s) + "skewX(" + b + degParen);
	      }
	    }
	
	    function scale(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	      } else if (xb !== 1 || yb !== 1) {
	        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	      }
	    }
	
	    return function(a, b) {
	      var s = [], // string constants and placeholders
	          q = []; // number interpolators
	      a = parse(a), b = parse(b);
	      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	      rotate(a.rotate, b.rotate, s, q);
	      skewX(a.skewX, b.skewX, s, q);
	      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	      a = b = null; // gc
	      return function(t) {
	        var i = -1, n = q.length, o;
	        while (++i < n) s[(o = q[i]).i] = o.x(t);
	        return s.join("");
	      };
	    };
	  }
	
	  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
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
	  }
	
	  function interpolateHsl(start, end) {
	    var h = interpolateHue((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  function interpolateHslLong(start, end) {
	    var h = nogamma((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  function interpolateLab(start, end) {
	    var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	        a = nogamma(start.a, end.a),
	        b = nogamma(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.l = l(t);
	      start.a = a(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  function interpolateHcl(start, end) {
	    var h = interpolateHue((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  function interpolateHclLong(start, end) {
	    var h = nogamma((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  var cubehelix$1 = (function gamma(y) {
	    y = +y;
	
	    function interpolateCubehelix(start, end) {
	      var h = interpolateHue((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    interpolateCubehelix.gamma = gamma;
	
	    return interpolateCubehelix;
	  })(1);
	
	  var cubehelixLong = (function gamma(y) {
	    y = +y;
	
	    function interpolateCubehelixLong(start, end) {
	      var h = nogamma((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    interpolateCubehelixLong.gamma = gamma;
	
	    return interpolateCubehelixLong;
	  })(1);
	
	  var version = "0.7.0";
	
	  exports.version = version;
	  exports.interpolate = value;
	  exports.interpolateArray = array;
	  exports.interpolateNumber = number;
	  exports.interpolateObject = object;
	  exports.interpolateRound = round;
	  exports.interpolateString = string;
	  exports.interpolateTransformCss = interpolateTransformCss;
	  exports.interpolateTransformSvg = interpolateTransformSvg;
	  exports.interpolateZoom = zoom;
	  exports.interpolateRgb = rgb$1;
	  exports.interpolateHsl = interpolateHsl;
	  exports.interpolateHslLong = interpolateHslLong;
	  exports.interpolateLab = interpolateLab;
	  exports.interpolateHcl = interpolateHcl;
	  exports.interpolateHclLong = interpolateHclLong;
	  exports.interpolateCubehelix = cubehelix$1;
	  exports.interpolateCubehelixLong = cubehelixLong;
	
	}));

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_color = global.d3_color || {})));
	}(this, function (exports) { 'use strict';
	
	  function define(constructor, factory, prototype) {
	    constructor.prototype = factory.prototype = prototype;
	    prototype.constructor = constructor;
	  }
	
	  function extend(parent, definition) {
	    var prototype = Object.create(parent.prototype);
	    for (var key in definition) prototype[key] = definition[key];
	    return prototype;
	  }
	
	  function Color() {}
	
	  var darker = 0.7;
	  var brighter = 1 / darker;
	
	  var reHex3 = /^#([0-9a-f]{3})$/;
	  var reHex6 = /^#([0-9a-f]{6})$/;
	  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	  var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
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
	
	  define(Color, color, {
	    displayable: function() {
	      return this.rgb().displayable();
	    },
	    toString: function() {
	      return this.rgb() + "";
	    }
	  });
	
	  function color(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	        : named.hasOwnProperty(format) ? rgbn(named[format])
	        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	        : null;
	  }
	
	  function rgbn(n) {
	    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	  }
	
	  function rgba(r, g, b, a) {
	    if (a <= 0) r = g = b = NaN;
	    return new Rgb(r, g, b, a);
	  }
	
	  function rgbConvert(o) {
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Rgb;
	    o = o.rgb();
	    return new Rgb(o.r, o.g, o.b, o.opacity);
	  }
	
	  function rgb(r, g, b, opacity) {
	    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	  }
	
	  function Rgb(r, g, b, opacity) {
	    this.r = +r;
	    this.g = +g;
	    this.b = +b;
	    this.opacity = +opacity;
	  }
	
	  define(Rgb, rgb, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    rgb: function() {
	      return this;
	    },
	    displayable: function() {
	      return (0 <= this.r && this.r <= 255)
	          && (0 <= this.g && this.g <= 255)
	          && (0 <= this.b && this.b <= 255)
	          && (0 <= this.opacity && this.opacity <= 1);
	    },
	    toString: function() {
	      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	      return (a === 1 ? "rgb(" : "rgba(")
	          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	          + (a === 1 ? ")" : ", " + a + ")");
	    }
	  }));
	
	  function hsla(h, s, l, a) {
	    if (a <= 0) h = s = l = NaN;
	    else if (l <= 0 || l >= 1) h = s = NaN;
	    else if (s <= 0) h = NaN;
	    return new Hsl(h, s, l, a);
	  }
	
	  function hslConvert(o) {
	    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Hsl;
	    if (o instanceof Hsl) return o;
	    o = o.rgb();
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        min = Math.min(r, g, b),
	        max = Math.max(r, g, b),
	        h = NaN,
	        s = max - min,
	        l = (max + min) / 2;
	    if (s) {
	      if (r === max) h = (g - b) / s + (g < b) * 6;
	      else if (g === max) h = (b - r) / s + 2;
	      else h = (r - g) / s + 4;
	      s /= l < 0.5 ? max + min : 2 - max - min;
	      h *= 60;
	    } else {
	      s = l > 0 && l < 1 ? 0 : h;
	    }
	    return new Hsl(h, s, l, o.opacity);
	  }
	
	  function hsl(h, s, l, opacity) {
	    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	  }
	
	  function Hsl(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }
	
	  define(Hsl, hsl, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function() {
	      var h = this.h % 360 + (this.h < 0) * 360,
	          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	          l = this.l,
	          m2 = l + (l < 0.5 ? l : 1 - l) * s,
	          m1 = 2 * l - m2;
	      return new Rgb(
	        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	        hsl2rgb(h, m1, m2),
	        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	        this.opacity
	      );
	    },
	    displayable: function() {
	      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	          && (0 <= this.l && this.l <= 1)
	          && (0 <= this.opacity && this.opacity <= 1);
	    }
	  }));
	
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
	  function labConvert(o) {
	    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	    if (o instanceof Hcl) {
	      var h = o.h * deg2rad;
	      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	    }
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var b = rgb2xyz(o.r),
	        a = rgb2xyz(o.g),
	        l = rgb2xyz(o.b),
	        x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	        y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	        z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	  }
	
	  function lab(l, a, b, opacity) {
	    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	  }
	
	  function Lab(l, a, b, opacity) {
	    this.l = +l;
	    this.a = +a;
	    this.b = +b;
	    this.opacity = +opacity;
	  }
	
	  define(Lab, lab, extend(Color, {
	    brighter: function(k) {
	      return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    darker: function(k) {
	      return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    rgb: function() {
	      var y = (this.l + 16) / 116,
	          x = isNaN(this.a) ? y : y + this.a / 500,
	          z = isNaN(this.b) ? y : y - this.b / 200;
	      y = Yn * lab2xyz(y);
	      x = Xn * lab2xyz(x);
	      z = Zn * lab2xyz(z);
	      return new Rgb(
	        xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	        xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	        xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	        this.opacity
	      );
	    }
	  }));
	
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
	
	  function hclConvert(o) {
	    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	    if (!(o instanceof Lab)) o = labConvert(o);
	    var h = Math.atan2(o.b, o.a) * rad2deg;
	    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	  }
	
	  function hcl(h, c, l, opacity) {
	    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	  }
	
	  function Hcl(h, c, l, opacity) {
	    this.h = +h;
	    this.c = +c;
	    this.l = +l;
	    this.opacity = +opacity;
	  }
	
	  define(Hcl, hcl, extend(Color, {
	    brighter: function(k) {
	      return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	    },
	    darker: function(k) {
	      return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	    },
	    rgb: function() {
	      return labConvert(this).rgb();
	    }
	  }));
	
	  var A = -0.14861;
	  var B = +1.78277;
	  var C = -0.29227;
	  var D = -0.90649;
	  var E = +1.97294;
	  var ED = E * D;
	  var EB = E * B;
	  var BC_DA = B * C - D * A;
	  function cubehelixConvert(o) {
	    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	        bl = b - l,
	        k = (E * (g - l) - C * bl) / D,
	        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	  }
	
	  function cubehelix(h, s, l, opacity) {
	    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	  }
	
	  function Cubehelix(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }
	
	  define(Cubehelix, cubehelix, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function() {
	      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	          l = +this.l,
	          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	          cosh = Math.cos(h),
	          sinh = Math.sin(h);
	      return new Rgb(
	        255 * (l + a * (A * cosh + B * sinh)),
	        255 * (l + a * (C * cosh + D * sinh)),
	        255 * (l + a * (E * cosh)),
	        this.opacity
	      );
	    }
	  }));
	
	  var version = "0.4.2";
	
	  exports.version = version;
	  exports.color = color;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.cubehelix = cubehelix;
	
	}));

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_format = {})));
	}(this, function (exports) { 'use strict';
	
	  // Computes the decimal coefficient and exponent of the specified number x with
	  // significant digits p, where x is positive and p is in [1, 21] or undefined.
	  // For example, formatDecimal(1.23) returns ["123", 0].
	  function formatDecimal(x, p) {
	    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	    var i, coefficient = x.slice(0, i);
	
	    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	    return [
	      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	      +x.slice(i + 1)
	    ];
	  }
	
	  function exponent(x) {
	    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	  }
	
	  function formatGroup(grouping, thousands) {
	    return function(value, width) {
	      var i = value.length,
	          t = [],
	          j = 0,
	          g = grouping[0],
	          length = 0;
	
	      while (i > 0 && g > 0) {
	        if (length + g + 1 > width) g = Math.max(1, width - length);
	        t.push(value.substring(i -= g, i + g));
	        if ((length += g + 1) > width) break;
	        g = grouping[j = (j + 1) % grouping.length];
	      }
	
	      return t.reverse().join(thousands);
	    };
	  }
	
	  function formatDefault(x, p) {
	    x = x.toPrecision(p);
	
	    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	      switch (x[i]) {
	        case ".": i0 = i1 = i; break;
	        case "0": if (i0 === 0) i0 = i; i1 = i; break;
	        case "e": break out;
	        default: if (i0 > 0) i0 = 0; break;
	      }
	    }
	
	    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	  }
	
	  var prefixExponent;
	
	  function formatPrefixAuto(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1],
	        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	        n = coefficient.length;
	    return i === n ? coefficient
	        : i > n ? coefficient + new Array(i - n + 1).join("0")
	        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	        : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	  }
	
	  function formatRounded(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1];
	    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	  }
	
	  var formatTypes = {
	    "": formatDefault,
	    "%": function(x, p) { return (x * 100).toFixed(p); },
	    "b": function(x) { return Math.round(x).toString(2); },
	    "c": function(x) { return x + ""; },
	    "d": function(x) { return Math.round(x).toString(10); },
	    "e": function(x, p) { return x.toExponential(p); },
	    "f": function(x, p) { return x.toFixed(p); },
	    "g": function(x, p) { return x.toPrecision(p); },
	    "o": function(x) { return Math.round(x).toString(8); },
	    "p": function(x, p) { return formatRounded(x * 100, p); },
	    "r": formatRounded,
	    "s": formatPrefixAuto,
	    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
	    "x": function(x) { return Math.round(x).toString(16); }
	  };
	
	  // [[fill]align][sign][symbol][0][width][,][.precision][type]
	  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	
	  function formatSpecifier(specifier) {
	    return new FormatSpecifier(specifier);
	  }
	
	  function FormatSpecifier(specifier) {
	    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	
	    var match,
	        fill = match[1] || " ",
	        align = match[2] || ">",
	        sign = match[3] || "-",
	        symbol = match[4] || "",
	        zero = !!match[5],
	        width = match[6] && +match[6],
	        comma = !!match[7],
	        precision = match[8] && +match[8].slice(1),
	        type = match[9] || "";
	
	    // The "n" type is an alias for ",g".
	    if (type === "n") comma = true, type = "g";
	
	    // Map invalid types to the default format.
	    else if (!formatTypes[type]) type = "";
	
	    // If zero fill is specified, padding goes after sign and before digits.
	    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";
	
	    this.fill = fill;
	    this.align = align;
	    this.sign = sign;
	    this.symbol = symbol;
	    this.zero = zero;
	    this.width = width;
	    this.comma = comma;
	    this.precision = precision;
	    this.type = type;
	  }
	
	  FormatSpecifier.prototype.toString = function() {
	    return this.fill
	        + this.align
	        + this.sign
	        + this.symbol
	        + (this.zero ? "0" : "")
	        + (this.width == null ? "" : Math.max(1, this.width | 0))
	        + (this.comma ? "," : "")
	        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
	        + this.type;
	  };
	
	  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];
	
	  function identity(x) {
	    return x;
	  }
	
	  function locale(locale) {
	    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
	        currency = locale.currency,
	        decimal = locale.decimal;
	
	    function newFormat(specifier) {
	      specifier = formatSpecifier(specifier);
	
	      var fill = specifier.fill,
	          align = specifier.align,
	          sign = specifier.sign,
	          symbol = specifier.symbol,
	          zero = specifier.zero,
	          width = specifier.width,
	          comma = specifier.comma,
	          precision = specifier.precision,
	          type = specifier.type;
	
	      // Compute the prefix and suffix.
	      // For SI-prefix, the suffix is lazily computed.
	      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";
	
	      // What format function should we use?
	      // Is this an integer type?
	      // Can this type generate exponential notation?
	      var formatType = formatTypes[type],
	          maybeSuffix = !type || /[defgprs%]/.test(type);
	
	      // Set the default precision if not specified,
	      // or clamp the specified precision to the supported range.
	      // For significant precision, it must be in [1, 21].
	      // For fixed precision, it must be in [0, 20].
	      precision = precision == null ? (type ? 6 : 12)
	          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	          : Math.max(0, Math.min(20, precision));
	
	      function format(value) {
	        var valuePrefix = prefix,
	            valueSuffix = suffix,
	            i, n, c;
	
	        if (type === "c") {
	          valueSuffix = formatType(value) + valueSuffix;
	          value = "";
	        } else {
	          value = +value;
	
	          // Convert negative to positive, and compute the prefix.
	          // Note that -0 is not less than 0, but 1 / -0 is!
	          var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);
	
	          // Perform the initial formatting.
	          value = formatType(value, precision);
	
	          // If the original value was negative, it may be rounded to zero during
	          // formatting; treat this as (positive) zero.
	          if (valueNegative) {
	            i = -1, n = value.length;
	            valueNegative = false;
	            while (++i < n) {
	              if (c = value.charCodeAt(i), (48 < c && c < 58)
	                  || (type === "x" && 96 < c && c < 103)
	                  || (type === "X" && 64 < c && c < 71)) {
	                valueNegative = true;
	                break;
	              }
	            }
	          }
	
	          // Compute the prefix and suffix.
	          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");
	
	          // Break the formatted value into the integer “value” part that can be
	          // grouped, and fractional or exponential “suffix” part that is not.
	          if (maybeSuffix) {
	            i = -1, n = value.length;
	            while (++i < n) {
	              if (c = value.charCodeAt(i), 48 > c || c > 57) {
	                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	                value = value.slice(0, i);
	                break;
	              }
	            }
	          }
	        }
	
	        // If the fill character is not "0", grouping is applied before padding.
	        if (comma && !zero) value = group(value, Infinity);
	
	        // Compute the padding.
	        var length = valuePrefix.length + value.length + valueSuffix.length,
	            padding = length < width ? new Array(width - length + 1).join(fill) : "";
	
	        // If the fill character is "0", grouping is applied after padding.
	        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
	
	        // Reconstruct the final output based on the desired alignment.
	        switch (align) {
	          case "<": return valuePrefix + value + valueSuffix + padding;
	          case "=": return valuePrefix + padding + value + valueSuffix;
	          case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
	        }
	        return padding + valuePrefix + value + valueSuffix;
	      }
	
	      format.toString = function() {
	        return specifier + "";
	      };
	
	      return format;
	    }
	
	    function formatPrefix(specifier, value) {
	      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	          k = Math.pow(10, -e),
	          prefix = prefixes[8 + e / 3];
	      return function(value) {
	        return f(k * value) + prefix;
	      };
	    }
	
	    return {
	      format: newFormat,
	      formatPrefix: formatPrefix
	    };
	  }
	
	  var defaultLocale = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["$", ""]
	  });
	
	  var caES = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });
	
	  var csCZ = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0Kč"]
	  });
	
	  var deCH = locale({
	    decimal: ",",
	    thousands: "'",
	    grouping: [3],
	    currency: ["", "\xa0CHF"]
	  });
	
	  var deDE = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });
	
	  var enCA = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["$", ""]
	  });
	
	  var enGB = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["£", ""]
	  });
	
	  var esES = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });
	
	  var fiFI = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });
	
	  var frCA = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "$"]
	  });
	
	  var frFR = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });
	
	  var heIL = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["₪", ""]
	  });
	
	  var huHU = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0Ft"]
	  });
	
	  var itIT = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["€", ""]
	  });
	
	  var jaJP = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["", "円"]
	  });
	
	  var koKR = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["₩", ""]
	  });
	
	  var mkMK = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0ден."]
	  });
	
	  var nlNL = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["€\xa0", ""]
	  });
	
	  var plPL = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "zł"]
	  });
	
	  var ptBR = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["R$", ""]
	  });
	
	  var ruRU = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0руб."]
	  });
	
	  var svSE = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "SEK"]
	  });
	
	  var zhCN = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["¥", ""]
	  });
	
	  function precisionFixed(step) {
	    return Math.max(0, -exponent(Math.abs(step)));
	  }
	
	  function precisionPrefix(step, value) {
	    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	  }
	
	  function precisionRound(step, max) {
	    step = Math.abs(step), max = Math.abs(max) - step;
	    return Math.max(0, exponent(max) - exponent(step)) + 1;
	  }
	
	  var format = defaultLocale.format;
	  var formatPrefix = defaultLocale.formatPrefix;
	
	  var version = "0.5.1";
	
	  exports.version = version;
	  exports.format = format;
	  exports.formatPrefix = formatPrefix;
	  exports.formatLocale = locale;
	  exports.formatCaEs = caES;
	  exports.formatCsCz = csCZ;
	  exports.formatDeCh = deCH;
	  exports.formatDeDe = deDE;
	  exports.formatEnCa = enCA;
	  exports.formatEnGb = enGB;
	  exports.formatEnUs = defaultLocale;
	  exports.formatEsEs = esES;
	  exports.formatFiFi = fiFI;
	  exports.formatFrCa = frCA;
	  exports.formatFrFr = frFR;
	  exports.formatHeIl = heIL;
	  exports.formatHuHu = huHU;
	  exports.formatItIt = itIT;
	  exports.formatJaJp = jaJP;
	  exports.formatKoKr = koKR;
	  exports.formatMkMk = mkMK;
	  exports.formatNlNl = nlNL;
	  exports.formatPlPl = plPL;
	  exports.formatPtBr = ptBR;
	  exports.formatRuRu = ruRU;
	  exports.formatSvSe = svSE;
	  exports.formatZhCn = zhCN;
	  exports.formatSpecifier = formatSpecifier;
	  exports.precisionFixed = precisionFixed;
	  exports.precisionPrefix = precisionPrefix;
	  exports.precisionRound = precisionRound;
	
	}));

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_time = global.d3_time || {})));
	}(this, function (exports) { 'use strict';
	
	  var version = "0.2.6";
	
	  var t0 = new Date;
	  var t1 = new Date;
	  function newInterval(floori, offseti, count, field) {
	
	    function interval(date) {
	      return floori(date = new Date(+date)), date;
	    }
	
	    interval.floor = interval;
	
	    interval.ceil = function(date) {
	      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
	    };
	
	    interval.round = function(date) {
	      var d0 = interval(date),
	          d1 = interval.ceil(date);
	      return date - d0 < d1 - date ? d0 : d1;
	    };
	
	    interval.offset = function(date, step) {
	      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	    };
	
	    interval.range = function(start, stop, step) {
	      var range = [];
	      start = interval.ceil(start);
	      step = step == null ? 1 : Math.floor(step);
	      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	      do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
	      return range;
	    };
	
	    interval.filter = function(test) {
	      return newInterval(function(date) {
	        while (floori(date), !test(date)) date.setTime(date - 1);
	      }, function(date, step) {
	        while (--step >= 0) while (offseti(date, 1), !test(date));
	      });
	    };
	
	    if (count) {
	      interval.count = function(start, end) {
	        t0.setTime(+start), t1.setTime(+end);
	        floori(t0), floori(t1);
	        return Math.floor(count(t0, t1));
	      };
	
	      interval.every = function(step) {
	        step = Math.floor(step);
	        return !isFinite(step) || !(step > 0) ? null
	            : !(step > 1) ? interval
	            : interval.filter(field
	                ? function(d) { return field(d) % step === 0; }
	                : function(d) { return interval.count(0, d) % step === 0; });
	      };
	    }
	
	    return interval;
	  }
	
	  var millisecond = newInterval(function() {
	    // noop
	  }, function(date, step) {
	    date.setTime(+date + step);
	  }, function(start, end) {
	    return end - start;
	  });
	
	  // An optimized implementation for this simple case.
	  millisecond.every = function(k) {
	    k = Math.floor(k);
	    if (!isFinite(k) || !(k > 0)) return null;
	    if (!(k > 1)) return millisecond;
	    return newInterval(function(date) {
	      date.setTime(Math.floor(date / k) * k);
	    }, function(date, step) {
	      date.setTime(+date + step * k);
	    }, function(start, end) {
	      return (end - start) / k;
	    });
	  };
	
	  var second$1 = 1e3;
	  var minute = 6e4;
	  var hour = 36e5;
	  var day = 864e5;
	  var week = 6048e5;
	
	  var second = newInterval(function(date) {
	    date.setTime(Math.floor(date / second$1) * second$1);
	  }, function(date, step) {
	    date.setTime(+date + step * second$1);
	  }, function(start, end) {
	    return (end - start) / second$1;
	  }, function(date) {
	    return date.getUTCSeconds();
	  });
	
	  var minute$1 = newInterval(function(date) {
	    date.setTime(Math.floor(date / minute) * minute);
	  }, function(date, step) {
	    date.setTime(+date + step * minute);
	  }, function(start, end) {
	    return (end - start) / minute;
	  }, function(date) {
	    return date.getMinutes();
	  });
	
	  var hour$1 = newInterval(function(date) {
	    var offset = date.getTimezoneOffset() * minute % hour;
	    if (offset < 0) offset += hour;
	    date.setTime(Math.floor((+date - offset) / hour) * hour + offset);
	  }, function(date, step) {
	    date.setTime(+date + step * hour);
	  }, function(start, end) {
	    return (end - start) / hour;
	  }, function(date) {
	    return date.getHours();
	  });
	
	  var day$1 = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * minute) / day;
	  }, function(date) {
	    return date.getDate() - 1;
	  });
	
	  function weekday(i) {
	    return newInterval(function(date) {
	      date.setHours(0, 0, 0, 0);
	      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	    }, function(date, step) {
	      date.setDate(date.getDate() + step * 7);
	    }, function(start, end) {
	      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * minute) / week;
	    });
	  }
	
	  var sunday = weekday(0);
	  var monday = weekday(1);
	  var tuesday = weekday(2);
	  var wednesday = weekday(3);
	  var thursday = weekday(4);
	  var friday = weekday(5);
	  var saturday = weekday(6);
	
	  var month = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	    date.setDate(1);
	  }, function(date, step) {
	    date.setMonth(date.getMonth() + step);
	  }, function(start, end) {
	    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	  }, function(date) {
	    return date.getMonth();
	  });
	
	  var year = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	    date.setMonth(0, 1);
	  }, function(date, step) {
	    date.setFullYear(date.getFullYear() + step);
	  }, function(start, end) {
	    return end.getFullYear() - start.getFullYear();
	  }, function(date) {
	    return date.getFullYear();
	  });
	
	  var utcMinute = newInterval(function(date) {
	    date.setUTCSeconds(0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * minute);
	  }, function(start, end) {
	    return (end - start) / minute;
	  }, function(date) {
	    return date.getUTCMinutes();
	  });
	
	  var utcHour = newInterval(function(date) {
	    date.setUTCMinutes(0, 0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * hour);
	  }, function(start, end) {
	    return (end - start) / hour;
	  }, function(date) {
	    return date.getUTCHours();
	  });
	
	  var utcDay = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step);
	  }, function(start, end) {
	    return (end - start) / day;
	  }, function(date) {
	    return date.getUTCDate() - 1;
	  });
	
	  function utcWeekday(i) {
	    return newInterval(function(date) {
	      date.setUTCHours(0, 0, 0, 0);
	      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	    }, function(date, step) {
	      date.setUTCDate(date.getUTCDate() + step * 7);
	    }, function(start, end) {
	      return (end - start) / week;
	    });
	  }
	
	  var utcSunday = utcWeekday(0);
	  var utcMonday = utcWeekday(1);
	  var utcTuesday = utcWeekday(2);
	  var utcWednesday = utcWeekday(3);
	  var utcThursday = utcWeekday(4);
	  var utcFriday = utcWeekday(5);
	  var utcSaturday = utcWeekday(6);
	
	  var utcMonth = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	    date.setUTCDate(1);
	  }, function(date, step) {
	    date.setUTCMonth(date.getUTCMonth() + step);
	  }, function(start, end) {
	    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	  }, function(date) {
	    return date.getUTCMonth();
	  });
	
	  var utcYear = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	    date.setUTCMonth(0, 1);
	  }, function(date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step);
	  }, function(start, end) {
	    return end.getUTCFullYear() - start.getUTCFullYear();
	  }, function(date) {
	    return date.getUTCFullYear();
	  });
	
	  var timeMilliseconds = millisecond.range;
	  var timeSeconds = second.range;
	  var timeMinutes = minute$1.range;
	  var timeHours = hour$1.range;
	  var timeDays = day$1.range;
	  var timeSundays = sunday.range;
	  var timeMondays = monday.range;
	  var timeTuesdays = tuesday.range;
	  var timeWednesdays = wednesday.range;
	  var timeThursdays = thursday.range;
	  var timeFridays = friday.range;
	  var timeSaturdays = saturday.range;
	  var timeWeeks = sunday.range;
	  var timeMonths = month.range;
	  var timeYears = year.range;
	
	  var utcMilliseconds = timeMilliseconds;
	  var utcSeconds = timeSeconds;
	  var utcMinutes = utcMinute.range;
	  var utcHours = utcHour.range;
	  var utcDays = utcDay.range;
	  var utcSundays = utcSunday.range;
	  var utcMondays = utcMonday.range;
	  var utcTuesdays = utcTuesday.range;
	  var utcWednesdays = utcWednesday.range;
	  var utcThursdays = utcThursday.range;
	  var utcFridays = utcFriday.range;
	  var utcSaturdays = utcSaturday.range;
	  var utcWeeks = utcSunday.range;
	  var utcMonths = utcMonth.range;
	  var utcYears = utcYear.range;
	
	  exports.timeMilliseconds = timeMilliseconds;
	  exports.timeSeconds = timeSeconds;
	  exports.timeMinutes = timeMinutes;
	  exports.timeHours = timeHours;
	  exports.timeDays = timeDays;
	  exports.timeSundays = timeSundays;
	  exports.timeMondays = timeMondays;
	  exports.timeTuesdays = timeTuesdays;
	  exports.timeWednesdays = timeWednesdays;
	  exports.timeThursdays = timeThursdays;
	  exports.timeFridays = timeFridays;
	  exports.timeSaturdays = timeSaturdays;
	  exports.timeWeeks = timeWeeks;
	  exports.timeMonths = timeMonths;
	  exports.timeYears = timeYears;
	  exports.utcMilliseconds = utcMilliseconds;
	  exports.utcSeconds = utcSeconds;
	  exports.utcMinutes = utcMinutes;
	  exports.utcHours = utcHours;
	  exports.utcDays = utcDays;
	  exports.utcSundays = utcSundays;
	  exports.utcMondays = utcMondays;
	  exports.utcTuesdays = utcTuesdays;
	  exports.utcWednesdays = utcWednesdays;
	  exports.utcThursdays = utcThursdays;
	  exports.utcFridays = utcFridays;
	  exports.utcSaturdays = utcSaturdays;
	  exports.utcWeeks = utcWeeks;
	  exports.utcMonths = utcMonths;
	  exports.utcYears = utcYears;
	  exports.timeMillisecond = millisecond;
	  exports.timeSecond = second;
	  exports.timeMinute = minute$1;
	  exports.timeHour = hour$1;
	  exports.timeDay = day$1;
	  exports.timeSunday = sunday;
	  exports.timeMonday = monday;
	  exports.timeTuesday = tuesday;
	  exports.timeWednesday = wednesday;
	  exports.timeThursday = thursday;
	  exports.timeFriday = friday;
	  exports.timeSaturday = saturday;
	  exports.timeWeek = sunday;
	  exports.timeMonth = month;
	  exports.timeYear = year;
	  exports.utcMillisecond = millisecond;
	  exports.utcSecond = second;
	  exports.utcMinute = utcMinute;
	  exports.utcHour = utcHour;
	  exports.utcDay = utcDay;
	  exports.utcSunday = utcSunday;
	  exports.utcMonday = utcMonday;
	  exports.utcTuesday = utcTuesday;
	  exports.utcWednesday = utcWednesday;
	  exports.utcThursday = utcThursday;
	  exports.utcFriday = utcFriday;
	  exports.utcSaturday = utcSaturday;
	  exports.utcWeek = utcSunday;
	  exports.utcMonth = utcMonth;
	  exports.utcYear = utcYear;
	  exports.version = version;
	  exports.timeInterval = newInterval;
	
	  Object.defineProperty(exports, '__esModule', { value: true });
	
	}));

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(223)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
	  (factory((global.d3_time_format = global.d3_time_format || {}),global.d3_time));
	}(this, function (exports,d3Time) { 'use strict';
	
	  var version = "0.3.2";
	
	  function localDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	      date.setFullYear(d.y);
	      return date;
	    }
	    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	  }
	
	  function utcDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	      date.setUTCFullYear(d.y);
	      return date;
	    }
	    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	  }
	
	  function newYear(y) {
	    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
	  }
	
	  function locale$1(locale) {
	    var locale_dateTime = locale.dateTime,
	        locale_date = locale.date,
	        locale_time = locale.time,
	        locale_periods = locale.periods,
	        locale_weekdays = locale.days,
	        locale_shortWeekdays = locale.shortDays,
	        locale_months = locale.months,
	        locale_shortMonths = locale.shortMonths;
	
	    var periodRe = formatRe(locale_periods),
	        periodLookup = formatLookup(locale_periods),
	        weekdayRe = formatRe(locale_weekdays),
	        weekdayLookup = formatLookup(locale_weekdays),
	        shortWeekdayRe = formatRe(locale_shortWeekdays),
	        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	        monthRe = formatRe(locale_months),
	        monthLookup = formatLookup(locale_months),
	        shortMonthRe = formatRe(locale_shortMonths),
	        shortMonthLookup = formatLookup(locale_shortMonths);
	
	    var formats = {
	      "a": formatShortWeekday,
	      "A": formatWeekday,
	      "b": formatShortMonth,
	      "B": formatMonth,
	      "c": null,
	      "d": formatDayOfMonth,
	      "e": formatDayOfMonth,
	      "H": formatHour24,
	      "I": formatHour12,
	      "j": formatDayOfYear,
	      "L": formatMilliseconds,
	      "m": formatMonthNumber,
	      "M": formatMinutes,
	      "p": formatPeriod,
	      "S": formatSeconds,
	      "U": formatWeekNumberSunday,
	      "w": formatWeekdayNumber,
	      "W": formatWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatYear,
	      "Y": formatFullYear,
	      "Z": formatZone,
	      "%": formatLiteralPercent
	    };
	
	    var utcFormats = {
	      "a": formatUTCShortWeekday,
	      "A": formatUTCWeekday,
	      "b": formatUTCShortMonth,
	      "B": formatUTCMonth,
	      "c": null,
	      "d": formatUTCDayOfMonth,
	      "e": formatUTCDayOfMonth,
	      "H": formatUTCHour24,
	      "I": formatUTCHour12,
	      "j": formatUTCDayOfYear,
	      "L": formatUTCMilliseconds,
	      "m": formatUTCMonthNumber,
	      "M": formatUTCMinutes,
	      "p": formatUTCPeriod,
	      "S": formatUTCSeconds,
	      "U": formatUTCWeekNumberSunday,
	      "w": formatUTCWeekdayNumber,
	      "W": formatUTCWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatUTCYear,
	      "Y": formatUTCFullYear,
	      "Z": formatUTCZone,
	      "%": formatLiteralPercent
	    };
	
	    var parses = {
	      "a": parseShortWeekday,
	      "A": parseWeekday,
	      "b": parseShortMonth,
	      "B": parseMonth,
	      "c": parseLocaleDateTime,
	      "d": parseDayOfMonth,
	      "e": parseDayOfMonth,
	      "H": parseHour24,
	      "I": parseHour24,
	      "j": parseDayOfYear,
	      "L": parseMilliseconds,
	      "m": parseMonthNumber,
	      "M": parseMinutes,
	      "p": parsePeriod,
	      "S": parseSeconds,
	      "U": parseWeekNumberSunday,
	      "w": parseWeekdayNumber,
	      "W": parseWeekNumberMonday,
	      "x": parseLocaleDate,
	      "X": parseLocaleTime,
	      "y": parseYear,
	      "Y": parseFullYear,
	      "Z": parseZone,
	      "%": parseLiteralPercent
	    };
	
	    // These recursive directive definitions must be deferred.
	    formats.x = newFormat(locale_date, formats);
	    formats.X = newFormat(locale_time, formats);
	    formats.c = newFormat(locale_dateTime, formats);
	    utcFormats.x = newFormat(locale_date, utcFormats);
	    utcFormats.X = newFormat(locale_time, utcFormats);
	    utcFormats.c = newFormat(locale_dateTime, utcFormats);
	
	    function newFormat(specifier, formats) {
	      return function(date) {
	        var string = [],
	            i = -1,
	            j = 0,
	            n = specifier.length,
	            c,
	            pad,
	            format;
	
	        if (!(date instanceof Date)) date = new Date(+date);
	
	        while (++i < n) {
	          if (specifier.charCodeAt(i) === 37) {
	            string.push(specifier.slice(j, i));
	            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	            else pad = c === "e" ? " " : "0";
	            if (format = formats[c]) c = format(date, pad);
	            string.push(c);
	            j = i + 1;
	          }
	        }
	
	        string.push(specifier.slice(j, i));
	        return string.join("");
	      };
	    }
	
	    function newParse(specifier, newDate) {
	      return function(string) {
	        var d = newYear(1900),
	            i = parseSpecifier(d, specifier, string += "", 0);
	        if (i != string.length) return null;
	
	        // The am-pm flag is 0 for AM, and 1 for PM.
	        if ("p" in d) d.H = d.H % 12 + d.p * 12;
	
	        // Convert day-of-week and week-of-year to day-of-year.
	        if ("W" in d || "U" in d) {
	          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	          var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	          d.m = 0;
	          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
	        }
	
	        // If a time zone is specified, all fields are interpreted as UTC and then
	        // offset according to the specified time zone.
	        if ("Z" in d) {
	          d.H += d.Z / 100 | 0;
	          d.M += d.Z % 100;
	          return utcDate(d);
	        }
	
	        // Otherwise, all fields are in local time.
	        return newDate(d);
	      };
	    }
	
	    function parseSpecifier(d, specifier, string, j) {
	      var i = 0,
	          n = specifier.length,
	          m = string.length,
	          c,
	          parse;
	
	      while (i < n) {
	        if (j >= m) return -1;
	        c = specifier.charCodeAt(i++);
	        if (c === 37) {
	          c = specifier.charAt(i++);
	          parse = parses[c in pads ? specifier.charAt(i++) : c];
	          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
	        } else if (c != string.charCodeAt(j++)) {
	          return -1;
	        }
	      }
	
	      return j;
	    }
	
	    function parsePeriod(d, string, i) {
	      var n = periodRe.exec(string.slice(i));
	      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }
	
	    function parseShortWeekday(d, string, i) {
	      var n = shortWeekdayRe.exec(string.slice(i));
	      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }
	
	    function parseWeekday(d, string, i) {
	      var n = weekdayRe.exec(string.slice(i));
	      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }
	
	    function parseShortMonth(d, string, i) {
	      var n = shortMonthRe.exec(string.slice(i));
	      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }
	
	    function parseMonth(d, string, i) {
	      var n = monthRe.exec(string.slice(i));
	      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }
	
	    function parseLocaleDateTime(d, string, i) {
	      return parseSpecifier(d, locale_dateTime, string, i);
	    }
	
	    function parseLocaleDate(d, string, i) {
	      return parseSpecifier(d, locale_date, string, i);
	    }
	
	    function parseLocaleTime(d, string, i) {
	      return parseSpecifier(d, locale_time, string, i);
	    }
	
	    function formatShortWeekday(d) {
	      return locale_shortWeekdays[d.getDay()];
	    }
	
	    function formatWeekday(d) {
	      return locale_weekdays[d.getDay()];
	    }
	
	    function formatShortMonth(d) {
	      return locale_shortMonths[d.getMonth()];
	    }
	
	    function formatMonth(d) {
	      return locale_months[d.getMonth()];
	    }
	
	    function formatPeriod(d) {
	      return locale_periods[+(d.getHours() >= 12)];
	    }
	
	    function formatUTCShortWeekday(d) {
	      return locale_shortWeekdays[d.getUTCDay()];
	    }
	
	    function formatUTCWeekday(d) {
	      return locale_weekdays[d.getUTCDay()];
	    }
	
	    function formatUTCShortMonth(d) {
	      return locale_shortMonths[d.getUTCMonth()];
	    }
	
	    function formatUTCMonth(d) {
	      return locale_months[d.getUTCMonth()];
	    }
	
	    function formatUTCPeriod(d) {
	      return locale_periods[+(d.getUTCHours() >= 12)];
	    }
	
	    return {
	      format: function(specifier) {
	        var f = newFormat(specifier += "", formats);
	        f.toString = function() { return specifier; };
	        return f;
	      },
	      parse: function(specifier) {
	        var p = newParse(specifier += "", localDate);
	        p.toString = function() { return specifier; };
	        return p;
	      },
	      utcFormat: function(specifier) {
	        var f = newFormat(specifier += "", utcFormats);
	        f.toString = function() { return specifier; };
	        return f;
	      },
	      utcParse: function(specifier) {
	        var p = newParse(specifier, utcDate);
	        p.toString = function() { return specifier; };
	        return p;
	      }
	    };
	  }
	
	  var pads = {"-": "", "_": " ", "0": "0"};
	  var numberRe = /^\s*\d+/;
	  var percentRe = /^%/;
	  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
	  function pad(value, fill, width) {
	    var sign = value < 0 ? "-" : "",
	        string = (sign ? -value : value) + "",
	        length = string.length;
	    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	  }
	
	  function requote(s) {
	    return s.replace(requoteRe, "\\$&");
	  }
	
	  function formatRe(names) {
	    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	  }
	
	  function formatLookup(names) {
	    var map = {}, i = -1, n = names.length;
	    while (++i < n) map[names[i].toLowerCase()] = i;
	    return map;
	  }
	
	  function parseWeekdayNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 1));
	    return n ? (d.w = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseWeekNumberSunday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.U = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseWeekNumberMonday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.W = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseFullYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 4));
	    return n ? (d.y = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	  }
	
	  function parseZone(d, string, i) {
	    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
	    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	  }
	
	  function parseMonthNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	  }
	
	  function parseDayOfMonth(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.d = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseDayOfYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseHour24(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.H = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseMinutes(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.M = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseSeconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.S = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseMilliseconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.L = +n[0], i + n[0].length) : -1;
	  }
	
	  function parseLiteralPercent(d, string, i) {
	    var n = percentRe.exec(string.slice(i, i + 1));
	    return n ? i + n[0].length : -1;
	  }
	
	  function formatDayOfMonth(d, p) {
	    return pad(d.getDate(), p, 2);
	  }
	
	  function formatHour24(d, p) {
	    return pad(d.getHours(), p, 2);
	  }
	
	  function formatHour12(d, p) {
	    return pad(d.getHours() % 12 || 12, p, 2);
	  }
	
	  function formatDayOfYear(d, p) {
	    return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
	  }
	
	  function formatMilliseconds(d, p) {
	    return pad(d.getMilliseconds(), p, 3);
	  }
	
	  function formatMonthNumber(d, p) {
	    return pad(d.getMonth() + 1, p, 2);
	  }
	
	  function formatMinutes(d, p) {
	    return pad(d.getMinutes(), p, 2);
	  }
	
	  function formatSeconds(d, p) {
	    return pad(d.getSeconds(), p, 2);
	  }
	
	  function formatWeekNumberSunday(d, p) {
	    return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
	  }
	
	  function formatWeekdayNumber(d) {
	    return d.getDay();
	  }
	
	  function formatWeekNumberMonday(d, p) {
	    return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
	  }
	
	  function formatYear(d, p) {
	    return pad(d.getFullYear() % 100, p, 2);
	  }
	
	  function formatFullYear(d, p) {
	    return pad(d.getFullYear() % 10000, p, 4);
	  }
	
	  function formatZone(d) {
	    var z = d.getTimezoneOffset();
	    return (z > 0 ? "-" : (z *= -1, "+"))
	        + pad(z / 60 | 0, "0", 2)
	        + pad(z % 60, "0", 2);
	  }
	
	  function formatUTCDayOfMonth(d, p) {
	    return pad(d.getUTCDate(), p, 2);
	  }
	
	  function formatUTCHour24(d, p) {
	    return pad(d.getUTCHours(), p, 2);
	  }
	
	  function formatUTCHour12(d, p) {
	    return pad(d.getUTCHours() % 12 || 12, p, 2);
	  }
	
	  function formatUTCDayOfYear(d, p) {
	    return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
	  }
	
	  function formatUTCMilliseconds(d, p) {
	    return pad(d.getUTCMilliseconds(), p, 3);
	  }
	
	  function formatUTCMonthNumber(d, p) {
	    return pad(d.getUTCMonth() + 1, p, 2);
	  }
	
	  function formatUTCMinutes(d, p) {
	    return pad(d.getUTCMinutes(), p, 2);
	  }
	
	  function formatUTCSeconds(d, p) {
	    return pad(d.getUTCSeconds(), p, 2);
	  }
	
	  function formatUTCWeekNumberSunday(d, p) {
	    return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
	  }
	
	  function formatUTCWeekdayNumber(d) {
	    return d.getUTCDay();
	  }
	
	  function formatUTCWeekNumberMonday(d, p) {
	    return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
	  }
	
	  function formatUTCYear(d, p) {
	    return pad(d.getUTCFullYear() % 100, p, 2);
	  }
	
	  function formatUTCFullYear(d, p) {
	    return pad(d.getUTCFullYear() % 10000, p, 4);
	  }
	
	  function formatUTCZone() {
	    return "+0000";
	  }
	
	  function formatLiteralPercent() {
	    return "%";
	  }
	
	  var locale = locale$1({
	    dateTime: "%a %b %e %X %Y",
	    date: "%m/%d/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });
	
	  var caES = locale$1({
	    dateTime: "%A, %e de %B de %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
	    shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
	    months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
	    shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
	  });
	
	  var deCH = locale$1({
	    dateTime: "%A, der %e. %B %Y, %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	  });
	
	  var deDE = locale$1({
	    dateTime: "%A, der %e. %B %Y, %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	  });
	
	  var enCA = locale$1({
	    dateTime: "%a %b %e %X %Y",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });
	
	  var enGB = locale$1({
	    dateTime: "%a %e %b %X %Y",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });
	
	  var esES = locale$1({
	    dateTime: "%A, %e de %B de %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	    shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	    months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	    shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
	  });
	
	  var fiFI = locale$1({
	    dateTime: "%A, %-d. %Bta %Y klo %X",
	    date: "%-d.%-m.%Y",
	    time: "%H:%M:%S",
	    periods: ["a.m.", "p.m."],
	    days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
	    shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
	    months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
	    shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
	  });
	
	  var frCA = locale$1({
	    dateTime: "%a %e %b %Y %X",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["", ""],
	    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	    shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
	    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	    shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
	  });
	
	  var frFR = locale$1({
	    dateTime: "%A, le %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	    shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
	    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	    shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
	  });
	
	  var heIL = locale$1({
	    dateTime: "%A, %e ב%B %Y %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
	    shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
	    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
	    shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
	  });
	
	  var huHU = locale$1({
	    dateTime: "%Y. %B %-e., %A %X",
	    date: "%Y. %m. %d.",
	    time: "%H:%M:%S",
	    periods: ["de.", "du."], // unused
	    days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
	    shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
	    months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
	    shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
	  });
	
	  var itIT = locale$1({
	    dateTime: "%A %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
	    shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
	    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
	    shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
	  });
	
	  var jaJP = locale$1({
	    dateTime: "%Y %b %e %a %X",
	    date: "%Y/%m/%d",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	    shortDays: ["日", "月", "火", "水", "木", "金", "土"],
	    months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
	    shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	  });
	
	  var koKR = locale$1({
	    dateTime: "%Y/%m/%d %a %X",
	    date: "%Y/%m/%d",
	    time: "%H:%M:%S",
	    periods: ["오전", "오후"],
	    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
	    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	    shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	  });
	
	  var mkMK = locale$1({
	    dateTime: "%A, %e %B %Y г. %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
	    shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
	    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
	    shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
	  });
	
	  var nlNL = locale$1({
	    dateTime: "%a %e %B %Y %T",
	    date: "%d-%m-%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
	    shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
	    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
	    shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
	  });
	
	  var plPL = locale$1({
	    dateTime: "%A, %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
	    shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
	    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
	    shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
	  });
	
	  var ptBR = locale$1({
	    dateTime: "%A, %e de %B de %Y. %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
	    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
	  });
	
	  var ruRU = locale$1({
	    dateTime: "%A, %e %B %Y г. %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
	    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
	    months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
	    shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
	  });
	
	  var svSE = locale$1({
	    dateTime: "%A den %d %B %Y %X",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["fm", "em"],
	    days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
	    shortDays: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
	    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
	  });
	
	  var zhCN = locale$1({
	    dateTime: "%x %A %X",
	    date: "%Y年%-m月%-d日",
	    time: "%H:%M:%S",
	    periods: ["上午", "下午"],
	    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    shortDays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	  });
	
	  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
	
	  function formatIsoNative(date) {
	    return date.toISOString();
	  }
	
	  var formatIso = Date.prototype.toISOString
	      ? formatIsoNative
	      : locale.utcFormat(isoSpecifier);
	
	  function parseIsoNative(string) {
	    var date = new Date(string);
	    return isNaN(date) ? null : date;
	  }
	
	  var parseIso = +new Date("2000-01-01T00:00:00.000Z")
	      ? parseIsoNative
	      : locale.utcParse(isoSpecifier);
	
	  var timeFormat = locale.format;
	  var timeParse = locale.parse;
	  var utcFormat = locale.utcFormat;
	  var utcParse = locale.utcParse;
	
	  exports.timeFormat = timeFormat;
	  exports.timeParse = timeParse;
	  exports.utcFormat = utcFormat;
	  exports.utcParse = utcParse;
	  exports.version = version;
	  exports.timeFormatLocale = locale$1;
	  exports.timeFormatCaEs = caES;
	  exports.timeFormatDeCh = deCH;
	  exports.timeFormatDeDe = deDE;
	  exports.timeFormatEnCa = enCA;
	  exports.timeFormatEnGb = enGB;
	  exports.timeFormatEnUs = locale;
	  exports.timeFormatEsEs = esES;
	  exports.timeFormatFiFi = fiFI;
	  exports.timeFormatFrCa = frCA;
	  exports.timeFormatFrFr = frFR;
	  exports.timeFormatHeIl = heIL;
	  exports.timeFormatHuHu = huHU;
	  exports.timeFormatItIt = itIT;
	  exports.timeFormatJaJp = jaJP;
	  exports.timeFormatKoKr = koKR;
	  exports.timeFormatMkMk = mkMK;
	  exports.timeFormatNlNl = nlNL;
	  exports.timeFormatPlPl = plPL;
	  exports.timeFormatPtBr = ptBR;
	  exports.timeFormatRuRu = ruRU;
	  exports.timeFormatSvSe = svSE;
	  exports.timeFormatZhCn = zhCN;
	  exports.isoFormat = formatIso;
	  exports.isoParse = parseIso;
	
	}));

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _identity2 = __webpack_require__(226);
	
	var _identity3 = _interopRequireDefault(_identity2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  /**
	   * Returns the axis (x or y) of a particular axis component
	   * @param {Object} props: the props object.
	   * @param {Boolean} flipped: true when the axis component is in an atypical orientation
	   * @returns {String} the dimension appropriate for the axis given its props
	   */
	
	  getAxis: function getAxis(props) {
	    if (props.orientation) {
	      var vertical = { top: "x", bottom: "x", left: "y", right: "y" };
	      return vertical[props.orientation];
	    }
	    return props.dependentAxis ? "y" : "x";
	  },
	
	
	  /**
	   * Returns a single axis component of the desired axis type (x or y)
	   * @param {Array} childComponents: an array of children
	   * @param {String} axis: desired axis either "x" or "y".
	   * @returns {ReactComponent} an axis component of the desired axis or undefined
	   */
	  getAxisComponent: function getAxisComponent(childComponents, axis) {
	    var matchesAxis = function matchesAxis(component) {
	      var type = component.type.getAxis(component.props);
	      return type === axis;
	    };
	    return this.findAxisComponents(childComponents, matchesAxis)[0];
	  },
	
	
	  /**
	   * Returns all axis components that pass a given predicate
	   * @param {Array} childComponents: an array of children
	   * @param {Function} predicate: a predicate function that will be called with each
	   * @returns {Array} all axis components that pass the given predicate or []
	   */
	  findAxisComponents: function findAxisComponents(childComponents, predicate) {
	    predicate = predicate || _identity3.default;
	    var findAxes = function findAxes(children) {
	      return children.reduce(function (memo, child) {
	        if (child.type && child.type.role === "axis" && predicate(child)) {
	          return memo.concat(child);
	        } else if (child.props && child.props.children) {
	          return memo.concat(findAxes(_react2.default.Children.toArray(child.props.children)));
	        }
	        return memo;
	      }, []);
	    };
	
	    return findAxes(childComponents);
	  },
	
	
	  /**
	   * Returns all axis components of the desired axis type (x or y) along with any
	   * parent components excluding VictoryChart
	   * @param {Array} childComponents: an optional array of children.
	   * @param {String} type: desired axis either "dependent" or "independent".
	   * @returns {ReactComponent} an axis component of the desired type or undefined
	   */
	  getAxisComponentsWithParent: function getAxisComponentsWithParent(childComponents, type) {
	    var matchesType = function matchesType(child) {
	      return type === "dependent" ? child.props.dependentAxis : !child.props.dependentAxis;
	    };
	
	    var findAxisComponents = function findAxisComponents(children) {
	      return children.reduce(function (memo, child) {
	        if (child.type && child.type.role === "axis" && matchesType(child)) {
	          return memo.concat(child);
	        } else if (child.props && child.props.children) {
	          var childAxis = findAxisComponents(_react2.default.Children.toArray(child.props.children));
	          return childAxis.length > 0 ? memo.concat(child) : memo;
	        }
	        return memo;
	      }, []);
	    };
	
	    return findAxisComponents(childComponents);
	  },
	
	
	  /**
	   * @param {ReactComponent} component: a victory axis component.
	   * @param {String} axis: desired axis either "x" or "y".
	   * @returns {String} the orientation of the axis ("top", "bottom", "left", or "right")
	   */
	  getOrientation: function getOrientation(component, axis) {
	    var typicalOrientations = { x: "bottom", y: "left" };
	    var flippedOrientations = { x: "left", y: "bottom" };
	    if (!component) {
	      return typicalOrientations[axis];
	    } else if (component.props && component.props.orientation) {
	      return component.props.orientation;
	    }
	    var dependent = component.props.dependentAxis;
	    return dependent && axis === "y" || !dependent && axis === "x" ? typicalOrientations[axis] : flippedOrientations[axis];
	  },
	
	
	  /**
	   * @param {Array} childComponents: an array of children
	   * @returns {Object} an object with orientations specified for x and y
	   */
	  getAxisOrientations: function getAxisOrientations(childComponents) {
	    return {
	      x: this.getOrientation(this.getAxisComponent(childComponents, "x"), "x"),
	      y: this.getOrientation(this.getAxisComponent(childComponents, "y"), "y")
	    };
	  },
	
	
	  /**
	   * @param {Object} props: axis component props
	   * @returns {Boolean} true when the axis is vertical
	   */
	  isVertical: function isVertical(props) {
	    var orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
	    var vertical = { top: false, bottom: false, left: true, right: true };
	    return vertical[orientation];
	  },
	
	
	  /**
	   * @param {Object} props: axis component props
	   * @returns {Boolean} true when tickValues contain strings
	   */
	  stringTicks: function stringTicks(props) {
	    return props.tickValues !== undefined && _victoryCore.Collection.containsStrings(props.tickValues);
	  }
	};

/***/ },
/* 226 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _includes2 = __webpack_require__(213);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _flatten2 = __webpack_require__(215);
	
	var _flatten3 = _interopRequireDefault(_flatten2);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  getDomain: function getDomain(props, axis) {
	    var propsDomain = this.getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return propsDomain;
	    }
	    var categoryDomain = this.getDomainFromCategories(props, axis);
	    if (categoryDomain) {
	      return categoryDomain;
	    }
	    var dataset = _data2.default.getData(props);
	    return this.getDomainFromData(props, axis, dataset);
	  },
	  getDomainWithZero: function getDomainWithZero(props, axis) {
	    var propsDomain = this.getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return propsDomain;
	    }
	    var horizontal = props.horizontal;
	
	    var ensureZero = function ensureZero(domain) {
	      var isDependent = axis === "y" && !horizontal || axis === "x" && horizontal;
	      return isDependent ? [Math.min.apply(Math, _toConsumableArray(domain).concat([0])), Math.max.apply(Math, _toConsumableArray(domain).concat([0]))] : domain;
	    };
	    var categoryDomain = this.getDomainFromCategories(props, axis);
	    if (categoryDomain) {
	      return ensureZero(categoryDomain);
	    }
	    var dataset = _data2.default.getData(props);
	    return ensureZero(this.getDomainFromData(props, axis, dataset));
	  },
	  getDomainFromProps: function getDomainFromProps(props, axis) {
	    if (props.domain && props.domain[axis]) {
	      return props.domain[axis];
	    } else if (props.domain && Array.isArray(props.domain)) {
	      return props.domain;
	    }
	  },
	  getDomainFromData: function getDomainFromData(props, axis, dataset) {
	    var otherAxis = axis === "x" ? "y" : "x";
	    var currentAxis = props.horizontal ? otherAxis : axis;
	    var allData = (0, _flatten3.default)(dataset).map(function (datum) {
	      return datum[currentAxis];
	    });
	    var min = Math.min.apply(Math, _toConsumableArray(allData));
	    var max = Math.max.apply(Math, _toConsumableArray(allData));
	    // TODO: is this the correct behavior, or should we just error. How do we
	    // handle charts with just one data point?
	    if (min === max) {
	      var adjustedMax = max === 0 ? 1 : max;
	      return [0, adjustedMax];
	    }
	    return [min, max];
	  },
	  getDomainFromTickValues: function getDomainFromTickValues(props) {
	    var domain = void 0;
	    if (_axis2.default.stringTicks(props)) {
	      domain = [1, props.tickValues.length];
	    } else {
	      // coerce ticks to numbers
	      var ticks = props.tickValues.map(function (value) {
	        return +value;
	      });
	      domain = [Math.min.apply(Math, _toConsumableArray(ticks)), Math.max.apply(Math, _toConsumableArray(ticks))];
	    }
	    if (_axis2.default.isVertical(props)) {
	      domain.reverse();
	    }
	    return domain;
	  },
	  getDomainFromCategories: function getDomainFromCategories(props, axis) {
	    var categories = _data2.default.getCategories(props, axis);
	    if (!categories) {
	      return undefined;
	    }
	    var stringArray = _victoryCore.Collection.containsStrings(categories) ? _data2.default.getStringsFromCategories(props, axis) : [];
	    var stringMap = stringArray.length === 0 ? null : stringArray.reduce(function (memo, string, index) {
	      memo[string] = index + 1;
	      return memo;
	    }, {});
	    var categoryValues = stringMap ? categories.map(function (value) {
	      return stringMap[value];
	    }) : categories;
	    return [Math.min.apply(Math, _toConsumableArray(categoryValues)), Math.max.apply(Math, _toConsumableArray(categoryValues))];
	  },
	  getDomainFromGroupedData: function getDomainFromGroupedData(props, axis, datasets) {
	    var horizontal = props.horizontal;
	
	    var dependent = axis === "x" && !horizontal || axis === "y" && horizontal;
	    if (dependent && props.categories) {
	      return this.getDomainFromCategories(props, axis);
	    }
	    var globalDomain = this.getDomainFromData(props, axis, datasets);
	
	    // find the cumulative max for stacked chart types
	    var cumulativeData = !dependent ? this.getCumulativeData(props, axis, datasets) : [];
	
	    var cumulativeMaxArray = cumulativeData.map(function (dataset) {
	      return dataset.reduce(function (memo, val) {
	        return val > 0 ? memo + val : memo;
	      }, 0);
	    });
	    var cumulativeMinArray = cumulativeData.map(function (dataset) {
	      return dataset.reduce(function (memo, val) {
	        return val < 0 ? memo + val : memo;
	      }, 0);
	    });
	
	    var cumulativeMin = Math.min.apply(Math, _toConsumableArray(cumulativeMinArray));
	    // use greatest min / max
	    var domainMin = cumulativeMin < 0 ? cumulativeMin : Math.min.apply(Math, _toConsumableArray(globalDomain));
	    var domainMax = Math.max.apply(Math, _toConsumableArray(globalDomain).concat(_toConsumableArray(cumulativeMaxArray)));
	    // TODO: is this the correct behavior, or should we just error. How do we
	    // handle charts with just one data point?
	    if (domainMin === domainMax) {
	      var adjustedMax = domainMax === 0 ? 1 : domainMax;
	      return [0, adjustedMax];
	    }
	    return [domainMin, domainMax];
	  },
	  getCumulativeData: function getCumulativeData(props, axis, datasets) {
	    var otherAxis = axis === "x" ? "y" : "x";
	    var currentAxis = props.horizontal ? otherAxis : axis;
	    var categories = [];
	    var axisValues = [];
	    datasets.forEach(function (dataset) {
	      dataset.forEach(function (data) {
	        if (data.category !== undefined && !(0, _includes3.default)(categories, data.category)) {
	          categories.push(data.category);
	        } else if (!(0, _includes3.default)(axisValues, data[currentAxis])) {
	          axisValues.push(data[currentAxis]);
	        }
	      });
	    });
	
	    var _dataByCategory = function _dataByCategory() {
	      return categories.map(function (value) {
	        return datasets.reduce(function (prev, data) {
	          return data.category === value ? prev.concat(data[axis]) : prev;
	        }, []);
	      });
	    };
	
	    var _dataByIndex = function _dataByIndex() {
	      return axisValues.map(function (value, index) {
	        return datasets.map(function (data) {
	          return data[index] && data[index][currentAxis];
	        });
	      });
	    };
	
	    return categories.length === 0 ? _dataByIndex() : _dataByCategory();
	  },
	  padDomain: function padDomain(domain, props, axis) {
	    if (!props.domainPadding) {
	      return domain;
	    }
	    var domainPadding = typeof props.domainPadding === "number" ? props.domainPadding : props.domainPadding[axis];
	
	    if (!domainPadding) {
	      return domain;
	    }
	    var domainMin = Math.min.apply(Math, _toConsumableArray(domain));
	    var domainMax = Math.max.apply(Math, _toConsumableArray(domain));
	    var range = _victoryCore.Helpers.getRange(props, axis);
	    var rangeExtent = Math.abs(Math.max.apply(Math, _toConsumableArray(range)) - Math.min.apply(Math, _toConsumableArray(range)));
	    var padding = Math.abs(domainMax - domainMin) * domainPadding / rangeExtent;
	    // don't make the axes cross if they aren't already
	    var adjustedMin = domainMin >= 0 && domainMin - padding <= 0 ? 0 : domainMin.valueOf() - padding;
	    var adjustedMax = domainMax <= 0 && domainMax + padding >= 0 ? 0 : domainMax.valueOf() + padding;
	    return domainMin instanceof Date || domainMax instanceof Date ? [new Date(adjustedMin), new Date(adjustedMax)] : [adjustedMin, adjustedMax];
	  },
	  orientDomain: function orientDomain(domain, orientations, axis) {
	    // If the other axis is in a reversed orientation, the domain of this axis
	    // needs to be reversed
	    var otherAxis = axis === "x" ? "y" : "x";
	    var defaultOrientation = function defaultOrientation(ax) {
	      return ax === "x" ? "bottom" : "left";
	    };
	    var flippedAxis = orientations.x === "left" || orientations.x === "right";
	    var standardOrientation = flippedAxis ? orientations[otherAxis] === defaultOrientation(axis) : orientations[otherAxis] === defaultOrientation(otherAxis);
	    if (flippedAxis) {
	      return standardOrientation ? domain.concat().reverse() : domain;
	    } else {
	      return standardOrientation ? domain : domain.concat().reverse();
	    }
	  }
	};

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _uniq2 = __webpack_require__(229);
	
	var _uniq3 = _interopRequireDefault(_uniq2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  // String Data
	
	  createStringMap: function createStringMap(props, axis) {
	    var stringsFromAxes = this.getStringsFromAxes(props, axis);
	    var stringsFromCategories = this.getStringsFromCategories(props, axis);
	    var stringsFromData = _victoryCore.Helpers.getStringsFromData(props, axis);
	
	    var allStrings = (0, _uniq3.default)([].concat(_toConsumableArray(stringsFromAxes), _toConsumableArray(stringsFromCategories), _toConsumableArray(stringsFromData)));
	    return allStrings.length === 0 ? null : allStrings.reduce(function (memo, string, index) {
	      memo[string] = index + 1;
	      return memo;
	    }, {});
	  },
	  getStringsFromAxes: function getStringsFromAxes(props, axis) {
	    if (!props.tickValues || !Array.isArray(props.tickValues) && !props.tickValues[axis]) {
	      return [];
	    }
	    var tickValueArray = props.tickValues[axis] || props.tickValues;
	    return tickValueArray.filter(function (val) {
	      return typeof val === "string";
	    });
	  },
	  getStringsFromCategories: function getStringsFromCategories(props, axis) {
	    if (!props.categories) {
	      return [];
	    }
	    var categories = this.getCategories(props, axis);
	    var categoryStrings = categories && categories.filter(function (val) {
	      return typeof val === "string";
	    });
	    return categoryStrings ? _victoryCore.Collection.removeUndefined(categoryStrings) : [];
	  },
	  getCategories: function getCategories(props, axis) {
	    return props.categories && !Array.isArray(props.categories) ? props.categories[axis] : props.categories;
	  },
	  getData: function getData(props) {
	    if (props.data) {
	      return this.formatData(props.data, props);
	    } else {
	      var generatedData = (props.x || props.y) && this.generateData(props);
	      return this.formatData(generatedData, props);
	    }
	  },
	  generateData: function generateData(props) {
	    // create an array of values evenly spaced across the x domain that include domain min/max
	    var domain = props.domain ? props.domain.x || props.domain : _scale2.default.getBaseScale(props, "x").domain();
	    var samples = props.samples || 1;
	    var max = Math.max.apply(Math, _toConsumableArray(domain));
	    var values = Array.apply(undefined, _toConsumableArray(Array(samples))).map(function (val, index) {
	      var v = max / samples * index + Math.min.apply(Math, _toConsumableArray(domain));
	      return { x: v, y: v };
	    });
	    return values[samples - 1].x === max ? values : values.concat([{ x: max, y: max }]);
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
	      x: _victoryCore.Helpers.createAccessor(props.x),
	      y: _victoryCore.Helpers.createAccessor(props.y)
	    };
	    return this.cleanData(dataset, props).map(function (datum) {
	      var x = accessor.x(datum);
	      var y = accessor.y(datum);
	      return Object.assign({}, datum, { x: x, y: y },
	      // map string data to numeric values, and add names
	      typeof x === "string" ? { x: stringMap.x[x], xName: x } : {}, typeof y === "string" ? { y: stringMap.y[y], yName: y } : {});
	    });
	  },
	  cleanData: function cleanData(dataset, props) {
	    // Some scale types break when certain data is supplies. This method will
	    // remove data points that break scales. So far this method only removes
	    // zeroes for log scales
	    // TODO other cases?
	    var scaleType = {
	      x: _scale2.default.getScaleType(props, "x"),
	      y: _scale2.default.getScaleType(props, "y")
	    };
	    var accessor = {
	      x: _victoryCore.Helpers.createAccessor(props.x),
	      y: _victoryCore.Helpers.createAccessor(props.y)
	    };
	    if (scaleType.x !== "log" && scaleType.y !== "log") {
	      return dataset;
	    }
	    var rules = function rules(datum, axis) {
	      return scaleType[axis] === "log" ? accessor[axis](datum) !== 0 : true;
	    };
	    return dataset.filter(function (datum) {
	      return rules(datum, "x") && rules(datum, "y");
	    });
	  }
	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(230);
	
	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each
	 * element is kept.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length)
	    ? baseUniq(array)
	    : [];
	}
	
	module.exports = uniq;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(188),
	    arrayIncludes = __webpack_require__(198),
	    arrayIncludesWith = __webpack_require__(201),
	    cacheHas = __webpack_require__(204),
	    createSet = __webpack_require__(231),
	    setToArray = __webpack_require__(232);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;
	
	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 231 */
/***/ function(module, exports) {

	/**
	 * A method that returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 232 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
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
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _values2 = __webpack_require__(234);
	
	var _values3 = _interopRequireDefault(_values2);
	
	var _sortBy2 = __webpack_require__(237);
	
	var _sortBy3 = _interopRequireDefault(_sortBy2);
	
	var _invert2 = __webpack_require__(287);
	
	var _invert3 = _interopRequireDefault(_invert2);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _wrapper = __webpack_require__(294);
	
	var _wrapper2 = _interopRequireDefault(_wrapper);
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var identity = function identity(x) {
	  return x;
	};
	
	exports.default = {
	  getChildComponents: function getChildComponents(props, defaultAxes) {
	    var childComponents = _react2.default.Children.toArray(props.children);
	    if (childComponents.length === 0) {
	      return [defaultAxes.independent, defaultAxes.dependent];
	    }
	
	    var axisComponents = {
	      dependent: _axis2.default.getAxisComponentsWithParent(childComponents, "dependent"),
	      independent: _axis2.default.getAxisComponentsWithParent(childComponents, "independent")
	    };
	
	    if (axisComponents.dependent.length === 0 && axisComponents.independent.length === 0) {
	      return [defaultAxes.independent, defaultAxes.dependent].concat(childComponents);
	    }
	    if (axisComponents.dependent.length > 1 || axisComponents.independent.length > 1) {
	      var msg = "Only one VictoryAxis component of each axis type is allowed when " + "using the VictoryChart wrapper. Only the first axis will be used. Please compose " + "multi-axis charts manually";
	      _victoryCore.Log.warn(msg);
	      var dataComponents = this.getDataComponents(childComponents);
	      return _victoryCore.Collection.removeUndefined([axisComponents.dependent[0], axisComponents.independent[0]].concat(dataComponents));
	    }
	    return childComponents;
	  },
	  getDataComponents: function getDataComponents(childComponents) {
	    var findDataComponents = function findDataComponents(children) {
	      return children.reduce(function (memo, child) {
	        if (child.type && child.type.role === "axis") {
	          return memo;
	        } else if (child.props && child.props.children) {
	          return memo.concat(findDataComponents(_react2.default.Children.toArray(child.props.children)));
	        }
	        return memo.concat(child);
	      }, []);
	    };
	
	    return findDataComponents(childComponents);
	  },
	  getDomain: function getDomain(props, axis, childComponents) {
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    var domain = _wrapper2.default.getDomain(props, axis, childComponents);
	    var orientations = _axis2.default.getAxisOrientations(childComponents);
	    return _domain2.default.orientDomain(domain, orientations, axis);
	  },
	  getAxisOffset: function getAxisOffset(props, calculatedProps) {
	    var axisComponents = calculatedProps.axisComponents;
	    var domain = calculatedProps.domain;
	    var scale = calculatedProps.scale;
	    // make the axes line up, and cross when appropriate
	
	    var origin = {
	      x: Math.max(Math.min.apply(Math, _toConsumableArray(domain.x)), 0),
	      y: Math.max(Math.min.apply(Math, _toConsumableArray(domain.y)), 0)
	    };
	    var axisOrientations = {
	      x: _axis2.default.getOrientation(axisComponents.x, "x"),
	      y: _axis2.default.getOrientation(axisComponents.y, "y")
	    };
	    var orientationOffset = {
	      x: axisOrientations.y === "left" ? 0 : props.width,
	      y: axisOrientations.x === "bottom" ? props.height : 0
	    };
	    var calculatedOffset = {
	      x: Math.abs(orientationOffset.x - scale.x.call(null, origin.x)),
	      y: Math.abs(orientationOffset.y - scale.y.call(null, origin.y))
	    };
	    return {
	      x: axisComponents.x && axisComponents.x.offsetX || calculatedOffset.x,
	      y: axisComponents.y && axisComponents.y.offsetY || calculatedOffset.y
	    };
	  },
	  getTicksFromData: function getTicksFromData(calculatedProps, axis) {
	    var stringMap = calculatedProps.stringMap[axis];
	    // if tickValues are defined for an axis component use them
	    var categoryArray = calculatedProps.categories[axis];
	    var ticksFromCategories = categoryArray && _victoryCore.Collection.containsOnlyStrings(categoryArray) ? categoryArray.map(function (tick) {
	      return stringMap[tick];
	    }) : categoryArray;
	    var ticksFromStringMap = stringMap && (0, _values3.default)(stringMap);
	    // when ticks is undefined, axis will determine it's own ticks
	    return ticksFromCategories && ticksFromCategories.length !== 0 ? ticksFromCategories : ticksFromStringMap;
	  },
	  getTicksFromAxis: function getTicksFromAxis(calculatedProps, axis, component) {
	    var tickValues = component.props.tickValues;
	    if (!tickValues) {
	      return undefined;
	    }
	    var stringMap = calculatedProps.stringMap[axis];
	    return _victoryCore.Collection.containsOnlyStrings(tickValues) && stringMap ? tickValues.map(function (tick) {
	      return stringMap[tick];
	    }) : tickValues;
	  },
	  getTicks: function getTicks() {
	    return this.getTicksFromAxis.apply(this, arguments) || this.getTicksFromData.apply(this, arguments);
	  },
	  getTickFormat: function getTickFormat(component, axis, calculatedProps) {
	    var tickValues = component.props.tickValues;
	    var stringMap = calculatedProps.stringMap[axis];
	    var useIdentity = tickValues && !_victoryCore.Collection.containsStrings(tickValues) && !_victoryCore.Collection.containsDates(tickValues);
	    if (useIdentity) {
	      return identity;
	    } else if (stringMap !== null) {
	      var _ret = function () {
	        var tickValueArray = (0, _sortBy3.default)((0, _values3.default)(stringMap), function (n) {
	          return n;
	        });
	        var invertedStringMap = (0, _invert3.default)(stringMap);
	        var dataNames = tickValueArray.map(function (tick) {
	          return invertedStringMap[tick];
	        });
	        // string ticks should have one tick of padding at the beginning
	        var dataTicks = [""].concat(_toConsumableArray(dataNames), [""]);
	        return {
	          v: function v(x) {
	            return dataTicks[x];
	          }
	        };
	      }();
	
	      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      return calculatedProps.scale[axis].tickFormat() || identity;
	    }
	  },
	  createStringMap: function createStringMap(props, axis, childComponents) {
	    var allStrings = _wrapper2.default.getStringsFromChildren(props, axis, childComponents);
	    return allStrings.length === 0 ? null : allStrings.reduce(function (memo, string, index) {
	      memo[string] = index + 1;
	      return memo;
	    }, {});
	  }
	};

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(235),
	    keys = __webpack_require__(236);
	
	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}
	
	module.exports = values;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(202);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 236 */
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
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(216),
	    baseOrderBy = __webpack_require__(238),
	    isArray = __webpack_require__(152),
	    isFlattenableIteratee = __webpack_require__(286),
	    isIterateeCall = __webpack_require__(140),
	    rest = __webpack_require__(141);
	
	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection thru each iteratee. This method
	 * performs a stable sort, that is, it preserves the original sort order of
	 * equal elements. The iteratees are invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
	 *  [iteratees=[_.identity]] The iteratees to sort by.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'fred',   'age': 48 },
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 },
	 *   { 'user': 'barney', 'age': 34 }
	 * ];
	 *
	 * _.sortBy(users, function(o) { return o.user; });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	 *
	 * _.sortBy(users, 'user', function(o) {
	 *   return Math.floor(o.age / 10);
	 * });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 */
	var sortBy = rest(function(collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees = [iteratees[0]];
	  }
	  iteratees = (iteratees.length == 1 && isArray(iteratees[0]))
	    ? iteratees[0]
	    : baseFlatten(iteratees, 1, isFlattenableIteratee);
	
	  return baseOrderBy(collection, iteratees, []);
	});
	
	module.exports = sortBy;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(202),
	    baseIteratee = __webpack_require__(239),
	    baseMap = __webpack_require__(282),
	    baseSortBy = __webpack_require__(283),
	    baseUnary = __webpack_require__(203),
	    compareMultiple = __webpack_require__(284),
	    identity = __webpack_require__(226);
	
	/**
	 * The base implementation of `_.orderBy` without param guards.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	 * @param {string[]} orders The sort orders of `iteratees`.
	 * @returns {Array} Returns the new sorted array.
	 */
	function baseOrderBy(collection, iteratees, orders) {
	  var index = -1;
	  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));
	
	  var result = baseMap(collection, function(value, key, collection) {
	    var criteria = arrayMap(iteratees, function(iteratee) {
	      return iteratee(value);
	    });
	    return { 'criteria': criteria, 'index': ++index, 'value': value };
	  });
	
	  return baseSortBy(result, function(object, other) {
	    return compareMultiple(object, other, orders);
	  });
	}
	
	module.exports = baseOrderBy;


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(240),
	    baseMatchesProperty = __webpack_require__(267),
	    identity = __webpack_require__(226),
	    isArray = __webpack_require__(152),
	    property = __webpack_require__(280);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(241),
	    getMatchData = __webpack_require__(264),
	    matchesStrictComparable = __webpack_require__(266);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(242),
	    baseIsEqual = __webpack_require__(243);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(190),
	    listCacheDelete = __webpack_require__(191),
	    listCacheGet = __webpack_require__(193),
	    listCacheHas = __webpack_require__(194),
	    listCacheSet = __webpack_require__(195);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(244),
	    isObject = __webpack_require__(165),
	    isObjectLike = __webpack_require__(155);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(242),
	    equalArrays = __webpack_require__(245),
	    equalByTag = __webpack_require__(247),
	    equalObjects = __webpack_require__(251),
	    getTag = __webpack_require__(254),
	    isArray = __webpack_require__(152),
	    isHostObject = __webpack_require__(262),
	    isTypedArray = __webpack_require__(263);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(188),
	    arraySome = __webpack_require__(246);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 246 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(248),
	    Uint8Array = __webpack_require__(249),
	    equalArrays = __webpack_require__(245),
	    mapToArray = __webpack_require__(250),
	    setToArray = __webpack_require__(232);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);
	
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(146);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(146);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 250 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
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
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(252),
	    keys = __webpack_require__(236);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(253);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 253 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(255),
	    Map = __webpack_require__(257),
	    Promise = __webpack_require__(258),
	    Set = __webpack_require__(259),
	    WeakMap = __webpack_require__(260),
	    toSource = __webpack_require__(261);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
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
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(256),
	    root = __webpack_require__(146);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 256 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(256),
	    root = __webpack_require__(146);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(256),
	    root = __webpack_require__(146);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(256),
	    root = __webpack_require__(146);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(256),
	    root = __webpack_require__(146);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 261 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 262 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(153),
	    isObjectLike = __webpack_require__(155);
	
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
	    dataViewTag = '[object DataView]',
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
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(265),
	    keys = __webpack_require__(236);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(165);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 266 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(243),
	    get = __webpack_require__(268),
	    hasIn = __webpack_require__(277),
	    isKey = __webpack_require__(274),
	    isStrictComparable = __webpack_require__(265),
	    matchesStrictComparable = __webpack_require__(266),
	    toKey = __webpack_require__(276);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(269);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(270),
	    isKey = __webpack_require__(274),
	    toKey = __webpack_require__(276);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(152),
	    stringToPath = __webpack_require__(271);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(272),
	    toString = __webpack_require__(273);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 272 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 273 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(152),
	    isSymbol = __webpack_require__(275);
	
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
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(155);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 276 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(278),
	    hasPath = __webpack_require__(279);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 278 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(270),
	    isArguments = __webpack_require__(151),
	    isArray = __webpack_require__(152),
	    isIndex = __webpack_require__(156),
	    isKey = __webpack_require__(274),
	    isLength = __webpack_require__(153),
	    isString = __webpack_require__(154),
	    toKey = __webpack_require__(276);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(208),
	    basePropertyDeep = __webpack_require__(281),
	    isKey = __webpack_require__(274),
	    toKey = __webpack_require__(276);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(269);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 282 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 283 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sortBy` which uses `comparer` to define the
	 * sort order of `array` and replaces criteria objects with their corresponding
	 * values.
	 *
	 * @private
	 * @param {Array} array The array to sort.
	 * @param {Function} comparer The function to define sort order.
	 * @returns {Array} Returns `array`.
	 */
	function baseSortBy(array, comparer) {
	  var length = array.length;
	
	  array.sort(comparer);
	  while (length--) {
	    array[length] = array[length].value;
	  }
	  return array;
	}
	
	module.exports = baseSortBy;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var compareAscending = __webpack_require__(285);
	
	/**
	 * Used by `_.orderBy` to compare multiple properties of a value to another
	 * and stable sort them.
	 *
	 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	 * specify an order of "desc" for descending or "asc" for ascending sort order
	 * of corresponding values.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {boolean[]|string[]} orders The order to sort by for each property.
	 * @returns {number} Returns the sort order indicator for `object`.
	 */
	function compareMultiple(object, other, orders) {
	  var index = -1,
	      objCriteria = object.criteria,
	      othCriteria = other.criteria,
	      length = objCriteria.length,
	      ordersLength = orders.length;
	
	  while (++index < length) {
	    var result = compareAscending(objCriteria[index], othCriteria[index]);
	    if (result) {
	      if (index >= ordersLength) {
	        return result;
	      }
	      var order = orders[index];
	      return result * (order == 'desc' ? -1 : 1);
	    }
	  }
	  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	  // that causes it, under certain circumstances, to provide the same value for
	  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	  // for more details.
	  //
	  // This also ensures a stable sort in V8 and other engines.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
	  return object.index - other.index;
	}
	
	module.exports = compareMultiple;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(275);
	
	/**
	 * Compares values to sort them in ascending order.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function compareAscending(value, other) {
	  if (value !== other) {
	    var valIsDefined = value !== undefined,
	        valIsNull = value === null,
	        valIsReflexive = value === value,
	        valIsSymbol = isSymbol(value);
	
	    var othIsDefined = other !== undefined,
	        othIsNull = other === null,
	        othIsReflexive = other === other,
	        othIsSymbol = isSymbol(other);
	
	    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	        (valIsNull && othIsDefined && othIsReflexive) ||
	        (!valIsDefined && othIsReflexive) ||
	        !valIsReflexive) {
	      return 1;
	    }
	    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	        (othIsNull && valIsDefined && valIsReflexive) ||
	        (!othIsDefined && valIsReflexive) ||
	        !othIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}
	
	module.exports = compareAscending;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(152),
	    isFunction = __webpack_require__(181);
	
	/**
	 * Checks if `value` is a flattenable array and not a `_.matchesProperty`
	 * iteratee shorthand.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenableIteratee(value) {
	  return isArray(value) && !(value.length == 2 && !isFunction(value[0]));
	}
	
	module.exports = isFlattenableIteratee;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(288),
	    createInverter = __webpack_require__(289),
	    identity = __webpack_require__(226);
	
	/**
	 * Creates an object composed of the inverted keys and values of `object`.
	 * If `object` contains duplicate values, subsequent values overwrite
	 * property assignments of previous values.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.7.0
	 * @category Object
	 * @param {Object} object The object to invert.
	 * @returns {Object} Returns the new inverted object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2, 'c': 1 };
	 *
	 * _.invert(object);
	 * // => { '1': 'c', '2': 'b' }
	 */
	var invert = createInverter(function(result, value, key) {
	  result[value] = key;
	}, constant(identity));
	
	module.exports = invert;


/***/ },
/* 288 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	
	module.exports = constant;


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var baseInverter = __webpack_require__(290);
	
	/**
	 * Creates a function like `_.invertBy`.
	 *
	 * @private
	 * @param {Function} setter The function to set accumulator values.
	 * @param {Function} toIteratee The function to resolve iteratees.
	 * @returns {Function} Returns the new inverter function.
	 */
	function createInverter(setter, toIteratee) {
	  return function(object, iteratee) {
	    return baseInverter(object, setter, toIteratee(iteratee), {});
	  };
	}
	
	module.exports = createInverter;


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(291);
	
	/**
	 * The base implementation of `_.invert` and `_.invertBy` which inverts
	 * `object` with values transformed by `iteratee` and set by `setter`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} setter The function to set `accumulator` values.
	 * @param {Function} iteratee The iteratee to transform values.
	 * @param {Object} accumulator The initial inverted object.
	 * @returns {Function} Returns `accumulator`.
	 */
	function baseInverter(object, setter, iteratee, accumulator) {
	  baseForOwn(object, function(value, key, object) {
	    setter(accumulator, iteratee(value), key, object);
	  });
	  return accumulator;
	}
	
	module.exports = baseInverter;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(292),
	    keys = __webpack_require__(236);
	
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
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(293);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
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
/* 293 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
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
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _uniq2 = __webpack_require__(229);
	
	var _uniq3 = _interopRequireDefault(_uniq2);
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _flatten2 = __webpack_require__(215);
	
	var _flatten3 = _interopRequireDefault(_flatten2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _axis = __webpack_require__(225);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  getData: function getData(props, childComponents) {
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    return this.getDataFromChildren(childComponents);
	  },
	  getDomain: function getDomain(props, axis, childComponents) {
	    var propsDomain = _domain2.default.getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return _domain2.default.padDomain(propsDomain, props, axis);
	    }
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    var domain = this.getDomainFromChildren(props, axis, childComponents);
	    return _domain2.default.padDomain(domain, props, axis);
	  },
	  setAnimationState: function setAnimationState(nextProps) {
	    if (!this.props.animate) {
	      return;
	    }
	    if (this.props.animate.parentState) {
	      var nodesWillExit = this.props.animate.parentState.nodesWillExit;
	      var oldProps = nodesWillExit ? this.props : null;
	      this.setState((0, _defaults3.default)({ oldProps: oldProps }, this.props.animate.parentState));
	    } else {
	      var oldChildren = _react2.default.Children.toArray(this.props.children);
	      var nextChildren = _react2.default.Children.toArray(nextProps.children);
	
	      var _Transitions$getIniti = _victoryCore.Transitions.getInitialTransitionState(oldChildren, nextChildren);
	
	      var _nodesWillExit = _Transitions$getIniti.nodesWillExit;
	      var nodesWillEnter = _Transitions$getIniti.nodesWillEnter;
	      var childrenTransitions = _Transitions$getIniti.childrenTransitions;
	      var nodesShouldEnter = _Transitions$getIniti.nodesShouldEnter;
	
	
	      this.setState({
	        nodesWillExit: _nodesWillExit,
	        nodesWillEnter: nodesWillEnter,
	        childrenTransitions: childrenTransitions,
	        nodesShouldEnter: nodesShouldEnter,
	        oldProps: _nodesWillExit ? this.props : null
	      });
	    }
	  },
	  getAnimationProps: function getAnimationProps(props, child, index) {
	    var _this = this;
	
	    if (!props.animate) {
	      return child.props.animate;
	    }
	    var getFilteredState = function getFilteredState() {
	      var childrenTransitions = _this.state && _this.state.childrenTransitions;
	      childrenTransitions = _victoryCore.Collection.isArrayOfArrays(childrenTransitions) ? childrenTransitions[index] : childrenTransitions;
	      return (0, _defaults3.default)({ childrenTransitions: childrenTransitions }, _this.state);
	    };
	
	    var getTransitions = props.animate && props.animate.getTransitions;
	    var state = getFilteredState();
	    var parentState = props.animate && props.animate.parentState || state;
	    if (!getTransitions) {
	      var getTransitionProps = _victoryCore.Transitions.getTransitionPropsFactory(props, state, function (newState) {
	        return _this.setState(newState);
	      });
	      getTransitions = (0, _partialRight3.default)(getTransitionProps, index);
	    }
	    return (0, _defaults3.default)({ getTransitions: getTransitions, parentState: parentState }, props.animate, child.props.animate);
	  },
	  getDomainFromChildren: function getDomainFromChildren(props, axis, childComponents) {
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    var horizontalChildren = childComponents.some(function (child) {
	      return child.props.horizontal;
	    });
	    var horizontal = props && props.horizontal || horizontalChildren.length > 0;
	    var otherAxis = axis === "x" ? "y" : "x";
	    var currentAxis = horizontal ? otherAxis : axis;
	    var getChildDomains = function getChildDomains(children) {
	      return children.reduce(function (memo, child) {
	        if (child.type && (0, _isFunction3.default)(child.type.getDomain)) {
	          var childDomain = child.props && child.type.getDomain(child.props, currentAxis);
	          return childDomain ? memo.concat(childDomain) : memo;
	        } else if (child.props && child.props.children) {
	          return memo.concat(getChildDomains(_react2.default.Children.toArray(child.props.children)));
	        }
	        return memo;
	      }, []);
	    };
	
	    var childDomains = getChildDomains(childComponents);
	    return childDomains.length === 0 ? [0, 1] : [Math.min.apply(Math, _toConsumableArray(childDomains)), Math.max.apply(Math, _toConsumableArray(childDomains))];
	  },
	  getDataFromChildren: function getDataFromChildren(props, childComponents) {
	    var getData = function getData(childProps) {
	      var data = _data2.default.getData(childProps);
	      return Array.isArray(data) && data.length > 0 ? data : undefined;
	    };
	
	    var getChildData = function getChildData(children) {
	      return children.map(function (child) {
	        if (child.type && (0, _isFunction3.default)(child.type.getData)) {
	          var childData = child.props && child.type.getData(child.props);
	          return childData;
	        } else if (child.props && child.props.children) {
	          return (0, _flatten3.default)(getChildData(_react2.default.Children.toArray(child.props.children)));
	        }
	        return getData(child.props);
	      });
	    };
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    return getChildData(childComponents);
	  },
	  getStackedDomain: function getStackedDomain(props, axis) {
	    var propsDomain = _domain2.default.getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return _domain2.default.padDomain(propsDomain, props, axis);
	    }
	    var horizontal = props.horizontal;
	
	    var ensureZero = function ensureZero(domain) {
	      var isDependent = axis === "y" && !horizontal || axis === "x" && horizontal;
	      return isDependent ? [Math.min.apply(Math, _toConsumableArray(domain).concat([0])), Math.max.apply(Math, _toConsumableArray(domain).concat([0]))] : domain;
	    };
	    var datasets = this.getDataFromChildren(props);
	    var dataDomain = ensureZero(_domain2.default.getDomainFromGroupedData(props, axis, datasets));
	    return _domain2.default.padDomain(dataDomain, props, axis);
	  },
	  getColor: function getColor(calculatedProps, index) {
	    // check for styles first
	    var style = calculatedProps.style;
	    var colorScale = calculatedProps.colorScale;
	
	    if (style && style.data && style.data.fill) {
	      return style.data.fill;
	    }
	    var colors = Array.isArray(colorScale) ? colorScale : _victoryCore.Style.getColorScale(colorScale);
	    return colors[index % colors.length];
	  },
	  getChildStyle: function getChildStyle(child, index, calculatedProps) {
	    var style = calculatedProps.style;
	
	    var role = child.type && child.type.role;
	    var defaultFill = role === "group-wrapper" || role === "stack-wrapper" ? undefined : this.getColor(calculatedProps, index);
	    var childStyle = child.props.style || {};
	    var dataStyle = (0, _defaults3.default)({}, childStyle.data, style.data, { fill: defaultFill });
	    var labelsStyle = (0, _defaults3.default)({}, childStyle.labels, style.labels);
	    return {
	      parent: style.parent,
	      data: dataStyle,
	      labels: labelsStyle
	    };
	  },
	  getStringsFromCategories: function getStringsFromCategories(childComponents, axis) {
	    var stringsFromCategories = function stringsFromCategories(children) {
	      return children.reduce(function (memo, child) {
	        if (child.props && child.props.categories) {
	          return memo.concat(_data2.default.getStringsFromCategories(child.props, axis));
	        } else if (child.props && child.props.children) {
	          return memo.concat(stringsFromCategories(_react2.default.Children.toArray(child.props.children)));
	        }
	        return memo;
	      }, []);
	    };
	
	    return stringsFromCategories(childComponents);
	  },
	  getStringsFromData: function getStringsFromData(childComponents, axis) {
	    var stringsFromData = function stringsFromData(children) {
	      return children.reduce(function (memo, child) {
	        if (child.props && child.props.data) {
	          return memo.concat(_victoryCore.Helpers.getStringsFromData(child.props, axis));
	        } else if (child.type && (0, _isFunction3.default)(child.type.getData)) {
	          var _ret = function () {
	            var data = (0, _flatten3.default)(child.type.getData(child.props));
	            var attr = axis === "x" ? "xName" : "yName";
	            return {
	              v: memo.concat(data.reduce(function (prev, datum) {
	                return datum[attr] ? prev.concat(datum[attr]) : prev;
	              }, []))
	            };
	          }();
	
	          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	        } else if (child.props && child.props.children) {
	          return memo.concat(stringsFromData(_react2.default.Children.toArray(child.props.children)));
	        }
	        return memo;
	      }, []);
	    };
	
	    return stringsFromData(childComponents);
	  },
	  getStringsFromChildren: function getStringsFromChildren(props, axis, childComponents) {
	    childComponents = childComponents || _react2.default.Children.toArray(props.children);
	    var axisComponent = _axis2.default.getAxisComponent(childComponents, axis);
	    var axisStrings = axisComponent ? _data2.default.getStringsFromAxes(axisComponent.props, axis) : [];
	    var categoryStrings = this.getStringsFromCategories(childComponents, axis);
	    var dataStrings = this.getStringsFromData(childComponents, axis);
	    return (0, _uniq3.default)((0, _flatten3.default)([].concat(_toConsumableArray(categoryStrings), _toConsumableArray(dataStrings), _toConsumableArray(axisStrings))));
	  },
	  getCategories: function getCategories(props, axis) {
	    var categories = _data2.default.getCategories(props, axis) || this.getStringsFromChildren(props, axis);
	    return categories.length > 0 ? categories : undefined;
	  },
	  getY0: function getY0(datum, index, calculatedProps) {
	    var datasets = calculatedProps.datasets;
	
	    var y = datum.y;
	    var previousDataSets = datasets.slice(0, index);
	    var previousPoints = previousDataSets.reduce(function (prev, dataset) {
	      return prev.concat(dataset.filter(function (previousDatum) {
	        return datum.x instanceof Date ? previousDatum.x.getTime() === datum.x.getTime() : previousDatum.x === datum.x;
	      }).map(function (previousDatum) {
	        return previousDatum.y || 0;
	      }));
	    }, []);
	    return previousPoints.reduce(function (memo, value) {
	      var sameSign = y < 0 && value < 0 || y >= 0 && value >= 0;
	      return sameSign ? memo + value : memo;
	    }, 0);
	  }
	};

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lineSegment = __webpack_require__(296);
	
	var _lineSegment2 = _interopRequireDefault(_lineSegment);
	
	var _helperMethods = __webpack_require__(299);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    strokeWidth: 2,
	    fill: "none",
	    stroke: "#756f6a",
	    opacity: 1
	  },
	  labels: {
	    padding: 5,
	    fontFamily: "Helvetica",
	    fontSize: 13,
	    strokeWidth: 0,
	    stroke: "transparent",
	    textAnchor: "start"
	  }
	};
	
	var VictoryLine = function (_React$Component) {
	  _inherits(VictoryLine, _React$Component);
	
	  function VictoryLine() {
	    _classCallCheck(this, VictoryLine);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryLine).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryLine, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props) {
	      var _this2 = this;
	
	      var dataComponent = props.dataComponent;
	      var labelComponent = props.labelComponent;
	
	      var dataSegments = _helperMethods2.default.getDataSegments(_data2.default.getData(props));
	      return dataSegments.map(function (data, key) {
	        var dataEvents = _this2.getEvents(props, "data", "all");
	        var dataProps = (0, _defaults3.default)({ key: "line-" + key }, _this2.getEventState("all", "data"), _this2.getSharedEventState("all", "data"), { data: data }, dataComponent.props, _this2.baseProps.all.data);
	        var lineComponent = _react2.default.cloneElement(dataComponent, Object.assign({}, dataProps, { events: _victoryCore.Events.getPartialEvents(dataEvents, "all", dataProps) }));
	
	        var labelProps = (0, _defaults3.default)({ key: "line-label-" + key }, _this2.getEventState("all", "labels"), _this2.getSharedEventState("all", "labels"), { data: data }, labelComponent.props, _this2.baseProps.all.labels);
	        if (labelProps && labelProps.text) {
	          var labelEvents = _this2.getEvents(props, "labels", "all");
	          var lineLabel = _react2.default.cloneElement(labelComponent, Object.assign({
	            events: _victoryCore.Events.getPartialEvents(labelEvents, "all", labelProps)
	          }, labelProps));
	          return _react2.default.createElement(
	            "g",
	            { key: "line-group-" + key },
	            lineComponent,
	            lineLabel
	          );
	        }
	        return lineComponent;
	      });
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var animate = _props.animate;
	      var style = _props.style;
	      var standalone = _props.standalone;
	
	
	      if (animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        // TODO: extract into helper
	        var whitelist = ["data", "domain", "height", "padding", "samples", "style", "width", "x", "y"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryLine, this.props)
	        );
	      }
	
	      var baseStyles = _victoryCore.Helpers.getStyles(style, defaultStyles, "auto", "100%");
	
	      var group = _react2.default.createElement(
	        "g",
	        { role: "presentation", style: baseStyles.parent },
	        this.renderData(this.props)
	      );
	
	      return standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryLine;
	}(_react2.default.Component);
	
	VictoryLine.role = "line";
	VictoryLine.defaultTransitions = {
	  onExit: {
	    duration: 500,
	    before: function before() {
	      return { y: null };
	    }
	  },
	  onEnter: {
	    duration: 500,
	    before: function before() {
	      return { y: null };
	    },
	    after: function after(datum) {
	      return { y: datum.y };
	    }
	  }
	};
	VictoryLine.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively.
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these arrays of values specified for x and y. If this prop is not set,
	   * categorical data will be plotted in the order it was given in the data array
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * The data prop specifies the data to be plotted.
	   * Data should be in the form of an array of data points.
	   * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
	   * but by default, an object with x and y properties is expected.
	   * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
	   * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
	   */
	
	  data: _react.PropTypes.array,
	  /**
	   * The dataComponent prop takes an entire component which will be used to create line segments
	   * for each continuous set of data. (i.e. null data will result in multiple line segments)
	   * The new element created from the passed dataComponent will be provided with the following
	   * properties calculated by VictoryLine: data, index, scale, interpolation, and events.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is not
	   * provided, VictoryLine will use its default LineSegment component.
	   */
	  dataComponent: _react.PropTypes.element,
	  /**
	   * The domain prop describes the range of values your chart will include. This prop can be
	   * given as a array of the minimum and maximum expected values for your chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "data" and "labels" are all valid targets for VictoryLine events.
	   * Since VictoryLine only renders a single element, the eventKey property is not used.
	   * The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey keys,
	   * and a mutation key whose value is a function. The target and eventKey keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a line), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {stroke: "orange"})};
	   *              }
	   *            }, {
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * This prop is used to coordinate events between VictoryArea and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
	  }),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The interpolation prop determines how data points should be connected
	   * when plotting a line
	   */
	  interpolation: _react.PropTypes.oneOf(["basis", "basisClosed", "basisOpen", "bundle", "cardinal", "cardinalClosed", "cardinalOpen", "catmullRom", "catmullRomClosed", "catmullRomOpen", "linear", "linearClosed", "monotoneX", "monotoneY", "natural", "radial", "step", "stepAfter", "stepBefore"]),
	  /**
	   * The label prop defines the label that will appear at the end of the line.
	   * This prop should be given a string or as a function of data. If individual
	   * labels are required for each data point, they should be created by composing
	   * VictoryLine with VictoryScatter
	   * @examples: "Series 1", (data) => `${data.length} points`
	   */
	  label: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	  /**
	   * The labelComponent prop takes in an entire label component which will be used
	   * to create a label for the line. The new element created from the passed labelComponent
	   * will be supplied with the following properties: x, y, index, data, verticalAnchor,
	   * textAnchor, angle, style, text, and events. any of these props may be overridden
	   * by passing in props to the supplied component, or modified or ignored within
	   * the custom component itself. If labelComponent is omitted, a new VictoryLabel
	   * will be created with props described above. This labelComponent prop should be used to
	   * provide a series label for VictoryLine. If individual labels are required for each
	   * data point, they should be created by composing VictoryLine with VictoryScatter
	   */
	  labelComponent: _react.PropTypes.any,
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
	   * The samples prop specifies how many individual points to plot when plotting
	   * y as a function of x. Samples is ignored if x props are provided instead.
	   */
	  samples: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
	   * as a d3 scale function, or as an object with scales specified for x and y
	   * @exampes d3Scale.time(), {x: "linear", y: "log"}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryLine with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your VictoryLine. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart. in addition to normal style properties, angle and verticalAnchor
	   * may also be specified via the labels object, and they will be passed as props to
	   * VictoryLabel, or any custom labelComponent.
	   * @examples {data: {stroke: "red"}, labels: {fontSize: 12}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
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
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryLine: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryLine will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryLine.defaultProps = {
	  height: 300,
	  interpolation: "linear",
	  padding: 50,
	  samples: 50,
	  scale: "linear",
	  standalone: true,
	  width: 450,
	  x: "x",
	  y: "y",
	  dataComponent: _react2.default.createElement(_lineSegment2.default, null),
	  labelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryLine.getDomain = _domain2.default.getDomain.bind(_domain2.default);
	VictoryLine.getData = _data2.default.getData.bind(_data2.default);
	VictoryLine.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryLine;

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Shape = __webpack_require__(297);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LineSegment = function (_React$Component) {
	  _inherits(LineSegment, _React$Component);
	
	  function LineSegment() {
	    _classCallCheck(this, LineSegment);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LineSegment).apply(this, arguments));
	  }
	
	  _createClass(LineSegment, [{
	    key: "toNewName",
	    value: function toNewName(interpolation) {
	      // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
	      var capitalize = function capitalize(s) {
	        return s && s[0].toUpperCase() + s.slice(1);
	      };
	      return "curve" + capitalize(interpolation);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var events = _props.events;
	      var style = _props.style;
	      var interpolation = _props.interpolation;
	      var scale = _props.scale;
	      var data = _props.data;
	
	      var xScale = scale.x;
	      var yScale = scale.y;
	      var lineFunction = _d3Shape2.default.line().curve(_d3Shape2.default[this.toNewName(interpolation)]).x(function (d) {
	        return xScale(d.x);
	      }).y(function (d) {
	        return yScale(d.y);
	      });
	      var path = lineFunction(data);
	      return _react2.default.createElement("path", _extends({ style: style, d: path }, events, { vectorEffect: "non-scaling-stroke" }));
	    }
	  }]);
	
	  return LineSegment;
	}(_react2.default.Component);
	
	LineSegment.propTypes = {
	  data: _react.PropTypes.array,
	  events: _react.PropTypes.object,
	  interpolation: _react.PropTypes.string,
	  scale: _react.PropTypes.object,
	  style: _react.PropTypes.object
	};
	exports.default = LineSegment;

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(298)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3_shape = global.d3_shape || {}),global.d3_path));
	}(this, function (exports,d3Path) { 'use strict';
	
	  var version = "0.6.1";
	
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
	      else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
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
	      if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; // proceed
	        default: {
	          if (this._t <= 0) {
	            this._context.lineTo(this._x, y);
	            this._context.lineTo(x, y);
	          } else {
	            var x1 = this._x * (1 - this._t) + x * this._t;
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
/* 298 */
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
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _last2 = __webpack_require__(300);
	
	var _last3 = _interopRequireDefault(_last2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _sortBy2 = __webpack_require__(237);
	
	var _sortBy3 = _interopRequireDefault(_sortBy2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _getCalculatedValues = this.getCalculatedValues(props);
	
	    var scale = _getCalculatedValues.scale;
	    var dataSegments = _getCalculatedValues.dataSegments;
	    var dataset = _getCalculatedValues.dataset;
	
	    var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	    var interpolation = props.interpolation;
	    var label = props.label;
	    var width = props.width;
	    var height = props.height;
	
	    var dataStyle = _victoryCore.Helpers.evaluateStyle(style.data, dataset);
	    var dataProps = {
	      scale: scale,
	      interpolation: _victoryCore.Helpers.evaluateProp(interpolation, dataset),
	      style: dataStyle
	    };
	
	    var text = _victoryCore.Helpers.evaluateProp(label, dataset);
	    var lastData = (0, _last3.default)((0, _last3.default)(dataSegments));
	    var baseLabelStyle = _victoryCore.Helpers.evaluateStyle(style.labels, dataset);
	    var labelStyle = this.getLabelStyle(baseLabelStyle, dataStyle);
	
	    var labelProps = {
	      x: scale.x(lastData.x) + labelStyle.padding,
	      y: scale.y(lastData.y),
	      style: labelStyle,
	      textAnchor: labelStyle.textAnchor || "start",
	      verticalAnchor: labelStyle.verticalAnchor || "middle",
	      angle: labelStyle.angle,
	      scale: scale,
	      text: text
	    };
	
	    var parentProps = { style: style.parent, scale: scale, data: dataset, width: width, height: height };
	    return {
	      parent: parentProps,
	      all: {
	        data: dataProps,
	        labels: labelProps
	      }
	    };
	  },
	  getCalculatedValues: function getCalculatedValues(props) {
	    var dataset = _data2.default.getData(props);
	    var dataSegments = this.getDataSegments(dataset);
	    var range = {
	      x: _victoryCore.Helpers.getRange(props, "x"),
	      y: _victoryCore.Helpers.getRange(props, "y")
	    };
	    var domain = {
	      x: _domain2.default.getDomain(props, "x"),
	      y: _domain2.default.getDomain(props, "y")
	    };
	    var scale = {
	      x: _scale2.default.getBaseScale(props, "x").domain(domain.x).range(range.x),
	      y: _scale2.default.getBaseScale(props, "y").domain(domain.y).range(range.y)
	    };
	    return { dataset: dataset, dataSegments: dataSegments, scale: scale };
	  },
	  getLabelStyle: function getLabelStyle(labelStyle, dataStyle) {
	    // match labels styles to data style by default (fill, opacity, others?)
	    var opacity = dataStyle.opacity;
	    // match label color to data color if it is not given.
	    // use fill instead of stroke for text
	    var fill = dataStyle.stroke;
	    var padding = labelStyle.padding || 0;
	    return (0, _defaults3.default)({}, labelStyle, { opacity: opacity, fill: fill, padding: padding });
	  },
	  getDataSegments: function getDataSegments(dataset) {
	    var orderedData = (0, _sortBy3.default)(dataset, "x");
	    var segments = [];
	    var segmentStartIndex = 0;
	    orderedData.forEach(function (datum, index) {
	      if (datum.y === null || typeof datum.y === "undefined") {
	        segments.push(orderedData.slice(segmentStartIndex, index));
	        segmentStartIndex = index + 1;
	      }
	    });
	    segments.push(orderedData.slice(segmentStartIndex, orderedData.length));
	    return segments.filter(function (segment) {
	      return Array.isArray(segment) && segment.length > 0;
	    });
	  }
	};

/***/ },
/* 300 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _victoryCore = __webpack_require__(1);
	
	var _area = __webpack_require__(302);
	
	var _area2 = _interopRequireDefault(_area);
	
	var _helperMethods = __webpack_require__(304);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    fill: "#756f6a"
	  },
	  labels: {
	    fontSize: 13,
	    padding: 4,
	    fill: "black"
	  }
	};
	
	var VictoryArea = function (_React$Component) {
	  _inherits(VictoryArea, _React$Component);
	
	  function VictoryArea() {
	    _classCallCheck(this, VictoryArea);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryArea).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryArea, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props) {
	      var dataComponent = props.dataComponent;
	      var labelComponent = props.labelComponent;
	
	      var dataEvents = this.getEvents(props, "data", "all");
	      var dataProps = (0, _defaults3.default)({}, this.getEventState("all", "data"), this.getSharedEventState("all", "data"), dataComponent.props, this.baseProps.all.data);
	      var areaComponent = _react2.default.cloneElement(dataComponent, Object.assign({}, dataProps, { events: _victoryCore.Events.getPartialEvents(dataEvents, "all", dataProps) }));
	
	      var labelProps = (0, _defaults3.default)({}, this.getEventState("all", "labels"), this.getSharedEventState("all", "labels"), labelComponent.props, this.baseProps.all.labels);
	      if (labelProps && labelProps.text) {
	        var labelEvents = this.getEvents(props, "labels", "all");
	        var areaLabel = _react2.default.cloneElement(labelComponent, Object.assign({
	          events: _victoryCore.Events.getPartialEvents(labelEvents, "all", labelProps)
	        }, labelProps));
	        return _react2.default.createElement(
	          "g",
	          null,
	          areaComponent,
	          areaLabel
	        );
	      }
	      return areaComponent;
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var animate = _props.animate;
	      var style = _props.style;
	      var standalone = _props.standalone;
	
	
	      if (animate) {
	        var whitelist = ["data", "domain", "height", "padding", "style", "width"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryArea, this.props)
	        );
	      }
	
	      var baseStyles = _victoryCore.Helpers.getStyles(style, defaultStyles, "auto", "100%");
	
	      var group = _react2.default.createElement(
	        "g",
	        { role: "presentation", style: baseStyles.parent },
	        this.renderData(this.props)
	      );
	
	      return standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryArea;
	}(_react2.default.Component);
	
	VictoryArea.role = "area";
	VictoryArea.defaultTransitions = {
	  onExit: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, yOffset: 0 };
	    }
	  },
	  onEnter: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, yOffset: 0, xOffset: 0 };
	    },
	    after: function after(datum) {
	      return { y: datum.y, yOffset: datum.yOffset, xOffset: datum.xOffset };
	    }
	  }
	};
	VictoryArea.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively.
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these arrays of values specified for x and y. If this prop is not set,
	   * categorical data will be plotted in the order it was given in the data array
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * The data prop specifies the data to be plotted. Data should be in the form of an array
	   * of data points, or an array of arrays of data points for multiple datasets.
	   * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
	   * but by default, an object with x and y properties is expected.
	   * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
	   * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
	   */
	  data: _react.PropTypes.array,
	  /**
	   * The dataComponent prop takes an entire component which will be used to create an area.
	   * The new element created from the passed dataComponent will be provided with the
	   * following properties calculated by VictoryArea: a scale, style, events, interpolation,
	   * and an array of modified data objects (including x, y, and calculated y0 and y1).
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryArea will use its default Area component.
	   */
	  dataComponent: _react.PropTypes.element,
	  /**
	   * The domain prop describes the range of values your bar chart will cover. This prop can be
	   * given as a array of the minimum and maximum expected values for your bar chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "data" and "labels" are all valid targets for VictoryArea events.
	   * Since VictoryArea only renders a single element, the eventKey property is not used.
	   * The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey keys,
	   * and a mutation key whose value is a function. The target and eventKey keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. an area), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOf(["all"]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * This prop is used to coordinate events between VictoryArea and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
	  }),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The interpolation prop determines how data points should be connected
	   * when plotting a line
	   */
	  interpolation: _react.PropTypes.oneOf(["basis", "basisClosed", "basisOpen", "bundle", "cardinal", "cardinalClosed", "cardinalOpen", "catmullRom", "catmullRomClosed", "catmullRomOpen", "linear", "linearClosed", "monotoneX", "monotoneY", "natural", "radial", "step", "stepAfter", "stepBefore"]),
	  /**
	   * The label prop defines the label that will appear at the edge of the area.
	   * This prop should be given a string or as a function of data. If individual
	   * labels are required for each data point, they should be created by composing
	   * VictoryArea with VictoryScatter
	   * @examples: "Series 1", (data) => `${data.length} points`
	   */
	  label: _react.PropTypes.string,
	  /**
	   * The labelComponent prop takes in an entire label component which will be used
	   * to create a label for the area. The new element created from the passed labelComponent
	   * will be supplied with the following properties: x, y, index, data, verticalAnchor,
	   * textAnchor, angle, style, text, and events. any of these props may be overridden
	   * by passing in props to the supplied component, or modified or ignored within
	   * the custom component itself. If labelComponent is omitted, a new VictoryLabel
	   * will be created with props described above. This labelComponent prop should be used to
	   * provide a series label for VictoryArea. If individual labels are required for each
	   * data point, they should be created by composing VictoryArea with VictoryScatter
	   */
	  labelComponent: _react.PropTypes.element,
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
	   * The samples prop specifies how many individual points to plot when plotting
	   * y as a function of x. Samples is ignored if x props are provided instead.
	   */
	  samples: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
	   * as a d3 scale function, or as an object with scales specified for x and y
	   * @exampes d3Scale.time(), {x: "linear", y: "log"}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryBar with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your VictoryArea. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart.
	   * @examples {data: {fill: "red"}, labels: {fontSize: 12}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
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
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.arrayOf(_react.PropTypes.func)]),
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryArea: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryArea will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryArea.defaultProps = {
	  dataComponent: _react2.default.createElement(_area2.default, null),
	  labelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  height: 300,
	  padding: 50,
	  scale: "linear",
	  samples: 50,
	  standalone: true,
	  interpolation: "linear",
	  width: 450,
	  x: "x",
	  y: "y",
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryArea.getDomain = _domain2.default.getDomainWithZero.bind(_domain2.default);
	VictoryArea.getData = _data2.default.getData.bind(_data2.default);
	VictoryArea.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryArea;

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(303);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Shape = __webpack_require__(297);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Area = function (_React$Component) {
	  _inherits(Area, _React$Component);
	
	  function Area() {
	    _classCallCheck(this, Area);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Area).apply(this, arguments));
	  }
	
	  _createClass(Area, [{
	    key: "toNewName",
	    value: function toNewName(interpolation) {
	      // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
	      var capitalize = function capitalize(s) {
	        return s && s[0].toUpperCase() + s.slice(1);
	      };
	      return "curve" + capitalize(interpolation);
	    }
	  }, {
	    key: "renderArea",
	    value: function renderArea(style, interpolation, events) {
	      var xScale = this.props.scale.x;
	      var yScale = this.props.scale.y;
	      var areaStroke = style.stroke ? "none" : style.fill;
	      var areaStyle = (0, _assign3.default)({}, style, { stroke: areaStroke });
	      var areaFunction = _d3Shape2.default.area().curve(_d3Shape2.default[this.toNewName(interpolation)]).x(function (data) {
	        return xScale(data.x);
	      }).y1(function (data) {
	        return yScale(data.y1);
	      }).y0(function (data) {
	        return yScale(data.y0);
	      });
	      var path = areaFunction(this.props.data);
	
	      return _react2.default.createElement("path", _extends({ style: areaStyle, d: path }, events));
	    }
	  }, {
	    key: "renderLine",
	    value: function renderLine(style, interpolation, events) {
	      if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
	        return undefined;
	      }
	      var lineStyle = (0, _assign3.default)({}, style, { fill: "none" });
	      var xScale = this.props.scale.x;
	      var yScale = this.props.scale.y;
	      var lineFunction = _d3Shape2.default.line().curve(_d3Shape2.default[this.toNewName(interpolation)]).x(function (data) {
	        return xScale(data.x);
	      }).y(function (data) {
	        return yScale(data.y1);
	      });
	      var path = lineFunction(this.props.data);
	      return _react2.default.createElement("path", _extends({ style: lineStyle, d: path }, events));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var style = _props.style;
	      var interpolation = _props.interpolation;
	      var events = _props.events;
	
	      return _react2.default.createElement(
	        "g",
	        null,
	        this.renderArea(style, interpolation, events),
	        this.renderLine(style, interpolation, events)
	      );
	    }
	  }]);
	
	  return Area;
	}(_react2.default.Component);
	
	Area.propTypes = {
	  data: _react.PropTypes.array,
	  interpolation: _react.PropTypes.string,
	  scale: _react.PropTypes.object,
	  style: _react.PropTypes.object,
	  events: _react.PropTypes.object
	};
	exports.default = Area;

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(138),
	    copyObject = __webpack_require__(137),
	    createAssigner = __webpack_require__(139),
	    isArrayLike = __webpack_require__(206),
	    isPrototype = __webpack_require__(157),
	    keys = __webpack_require__(236);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
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
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _last2 = __webpack_require__(300);
	
	var _last3 = _interopRequireDefault(_last2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _getCalculatedValues = this.getCalculatedValues(props, defaultStyles);
	
	    var scale = _getCalculatedValues.scale;
	    var style = _getCalculatedValues.style;
	    var data = _getCalculatedValues.data;
	    var interpolation = props.interpolation;
	    var label = props.label;
	    var width = props.width;
	    var height = props.height;
	
	
	    var dataProps = {
	      data: data,
	      scale: scale,
	      interpolation: _victoryCore.Helpers.evaluateProp(interpolation, data),
	      style: _victoryCore.Helpers.evaluateStyle(style.data, data)
	    };
	
	    var text = _victoryCore.Helpers.evaluateProp(label, data);
	    var lastData = (0, _last3.default)(data);
	    var labelStyle = _victoryCore.Helpers.evaluateStyle(style.labels, data);
	
	    var labelProps = {
	      x: scale.x(lastData.x) + labelStyle.padding,
	      y: scale.y(lastData.y1),
	      y0: scale.y(lastData.y0),
	      style: labelStyle,
	      textAnchor: labelStyle.textAnchor || "start",
	      verticalAnchor: labelStyle.verticalAnchor || "middle",
	      angle: labelStyle.angle,
	      data: data,
	      scale: scale,
	      text: text
	    };
	
	    return {
	      parent: { style: style.parent, width: width, height: height, scale: scale, data: data },
	      all: {
	        data: dataProps,
	        labels: labelProps
	      }
	    };
	  },
	  getCalculatedValues: function getCalculatedValues(props, defaultStyles) {
	    var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	    var range = {
	      x: _victoryCore.Helpers.getRange(props, "x"),
	      y: _victoryCore.Helpers.getRange(props, "y")
	    };
	    var domain = {
	      x: _domain2.default.getDomainWithZero(props, "x"),
	      y: _domain2.default.getDomainWithZero(props, "y")
	    };
	    var scale = {
	      x: _scale2.default.getBaseScale(props, "x").domain(domain.x).range(range.x),
	      y: _scale2.default.getBaseScale(props, "y").domain(domain.y).range(range.y)
	    };
	    var data = this.getDataWithBaseline(props, domain);
	    return { style: style, data: data, scale: scale };
	  },
	  getDataWithBaseline: function getDataWithBaseline(props, domain) {
	    var data = _data2.default.getData(props);
	    var minY = Math.min.apply(Math, _toConsumableArray(domain.y)) > 0 ? Math.min.apply(Math, _toConsumableArray(domain.y)) : 0;
	    return data.map(function (datum) {
	      var y1 = datum.yOffset ? datum.yOffset + datum.y : datum.y;
	      var y0 = datum.yOffset || minY;
	      return Object.assign({ y0: y0, y1: y1 }, datum);
	    });
	  }
	};

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _bar = __webpack_require__(306);
	
	var _bar2 = _interopRequireDefault(_bar);
	
	var _helperMethods = __webpack_require__(307);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    width: 8,
	    padding: 6,
	    stroke: "transparent",
	    strokeWidth: 0,
	    fill: "#756f6a",
	    opacity: 1
	  },
	  labels: {
	    fontSize: 13,
	    padding: 4,
	    fill: "black"
	  }
	};
	
	var defaultData = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }];
	
	var VictoryBar = function (_React$Component) {
	  _inherits(VictoryBar, _React$Component);
	
	  function VictoryBar() {
	    _classCallCheck(this, VictoryBar);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryBar).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryBar, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.dataKeys = Object.keys(this.baseProps).filter(function (key) {
	        return key !== "parent";
	      });
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props) {
	      var _this2 = this;
	
	      var dataComponent = props.dataComponent;
	      var labelComponent = props.labelComponent;
	
	      var barComponents = [];
	      var barLabelComponents = [];
	      this.dataKeys.forEach(function (key) {
	        var dataEvents = _this2.getEvents(props, "data", key);
	        var dataProps = (0, _defaults3.default)({ key: "bar-" + key }, _this2.getEventState(key, "data"), _this2.getSharedEventState(key, "data"), dataComponent.props, _this2.baseProps[key].data);
	
	        barComponents.push(_react2.default.cloneElement(dataComponent, Object.assign({}, dataProps, { events: _victoryCore.Events.getPartialEvents(dataEvents, key, dataProps) })));
	
	        var labelProps = (0, _defaults3.default)({ key: "bar-label-" + key }, _this2.getEventState(key, "labels"), _this2.getSharedEventState(key, "labels"), labelComponent.props, _this2.baseProps[key].labels);
	
	        if (labelProps && labelProps.text) {
	          var labelEvents = _this2.getEvents(props, "labels", key);
	          barLabelComponents.push(_react2.default.cloneElement(labelComponent, Object.assign({
	            events: _victoryCore.Events.getPartialEvents(labelEvents, key, labelProps)
	          }, labelProps)));
	        }
	      });
	
	      if (barLabelComponents.length > 0) {
	        return _react2.default.createElement(
	          "g",
	          null,
	          barComponents,
	          barLabelComponents
	        );
	      }
	      return barComponents;
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var animate = _props.animate;
	      var style = _props.style;
	      var standalone = _props.standalone;
	
	
	      if (animate) {
	        var whitelist = ["data", "domain", "height", "padding", "style", "width"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryBar, this.props)
	        );
	      }
	
	      var baseStyles = _victoryCore.Helpers.getStyles(style, defaultStyles, "auto", "100%");
	
	      var group = _react2.default.createElement(
	        "g",
	        { role: "presentation", style: baseStyles.parent },
	        this.renderData(this.props)
	      );
	
	      return standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryBar;
	}(_react2.default.Component);
	
	VictoryBar.role = "bar";
	VictoryBar.defaultTransitions = {
	  onExit: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, yOffset: 0 };
	    }
	  },
	  onEnter: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, yOffset: 0 };
	    },
	    after: function after(datum) {
	      return { y: datum.y, yOffset: datum.yOffset };
	    }
	  }
	};
	VictoryBar.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively.
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these arrays of values specified for x and y. If this prop is not set,
	   * categorical data will be plotted in the order it was given in the data array
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * The data prop specifies the data to be plotted. Data should be in the form of an array
	   * of data points. Each data point may be any format you wish
	   * (depending on the `x` and `y` accessor props), but by default, an object
	   * with x and y properties is expected.
	   * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
	   * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
	   */
	  data: _react.PropTypes.array,
	  /**
	   * The dataComponent prop takes an entire component which will be used to create bars for
	   * each datum in the chart. The new element created from the passed dataComponent will be
	   * provided with the following properties calculated by VictoryBar: datum, index, scale,
	   * style, events, horizontal (boolean), x, y, and y0. Any of these props may be overridden
	   * by passing in props to the supplied component, or modified or ignored within the custom
	   * component itself. If a dataComponent is not provided, VictoryBar will use its default
	   * Bar component.
	   */
	  dataComponent: _react.PropTypes.element,
	  /**
	   * The domain prop describes the range of values your bar chart will cover. This prop can be
	   * given as a array of the minimum and maximum expected values for your bar chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "data" and "labels" are all valid targets for VictoryBar events.
	   * The eventKey may optionally be used to select a single element by index rather than an entire
	   * set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey keys,
	   * and a mutation key whose value is a function. The target and eventKey keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     eventKey: "thisOne",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              eventKey: "theOtherOne",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              eventKey: "theOtherOne",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * This prop is used to coordinate events between VictoryArea and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
	  }),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The horizontal prop determines whether the bars will be laid vertically or
	   * horizontally. The bars will be vertical if this prop is false or unspecified,
	   * or horizontal if the prop is set to true.
	   */
	  horizontal: _react.PropTypes.bool,
	  /**
	   * The labels prop defines labels that will appear above each bar in your bar chart.
	   * This prop should be given as an array of values or as a function of data.
	   * If given as an array, the number of elements in the array should be equal to
	   * the length of the data array. Labels may also be added directly to the data object
	   * like data={[{x: 1, y: 1, label: "first"}]}.
	   * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
	   */
	  labels: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
	  /**
	   * The labelComponent prop takes in an entire label component which will be used
	   * to create labels for each bar in the bar chart. The new element created from
	   * the passed labelComponent will be supplied with the following properties:
	   * x, y, y0, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If labelComponent is omitted,
	   * a new VictoryLabel will be created with props described above.
	   */
	  labelComponent: _react.PropTypes.element,
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
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
	   * as a d3 scale function, or as an object with scales specified for x and y
	   * @exampes d3Scale.time(), {x: "linear", y: "log"}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryBar with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your VictoryBar. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart. In addition to normal style properties, angle and verticalAnchor
	   * may also be specified via the labels object, and they will be passed as props to
	   * VictoryLabel, or any custom labelComponent.
	   * @examples {data: {fill: "red", width: 8}, labels: {fontSize: 12}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
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
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryBar: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryBar will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryBar.defaultProps = {
	  data: defaultData,
	  dataComponent: _react2.default.createElement(_bar2.default, null),
	  labelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  height: 300,
	  padding: 50,
	  scale: "linear",
	  standalone: true,
	  width: 450,
	  x: "x",
	  y: "y",
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryBar.getDomain = _domain2.default.getDomainWithZero.bind(_domain2.default);
	VictoryBar.getData = _data2.default.getData.bind(_data2.default);
	VictoryBar.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryBar;

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bar = function (_React$Component) {
	  _inherits(Bar, _React$Component);
	
	  function Bar() {
	    _classCallCheck(this, Bar);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).apply(this, arguments));
	  }
	
	  _createClass(Bar, [{
	    key: "getVerticalBarPath",
	    value: function getVerticalBarPath(props, width) {
	      var x = props.x;
	      var y0 = props.y0;
	      var y = props.y;
	
	      var size = width / 2;
	      return "M " + (x - size) + ", " + y0 + "\n      L " + (x - size) + ", " + y + "\n      L " + (x + size) + ", " + y + "\n      L " + (x + size) + ", " + y0 + "\n      L " + (x - size) + ", " + y0;
	    }
	  }, {
	    key: "getHorizontalBarPath",
	    value: function getHorizontalBarPath(props, width) {
	      var x = props.x;
	      var y0 = props.y0;
	      var y = props.y;
	
	      var size = width / 2;
	      return "M " + y0 + ", " + (x - size) + "\n      L " + y0 + ", " + (x + size) + "\n      L " + y + ", " + (x + size) + "\n      L " + y + ", " + (x - size) + "\n      L " + y0 + ", " + (x - size);
	    }
	  }, {
	    key: "getBarPath",
	    value: function getBarPath(props, width) {
	      return this.props.horizontal ? this.getHorizontalBarPath(props, width) : this.getVerticalBarPath(props, width);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      // TODO better bar width calculation
	      var barWidth = this.props.style && this.props.style.width || 8;
	      var path = typeof this.props.x === "number" ? this.getBarPath(this.props, barWidth) : undefined;
	      return _react2.default.createElement("path", _extends({}, this.props.events, {
	        d: path,
	        style: this.props.style,
	        shapeRendering: "optimizeSpeed"
	      }));
	    }
	  }]);
	
	  return Bar;
	}(_react2.default.Component);
	
	Bar.propTypes = {
	  index: _react.PropTypes.number,
	  events: _react.PropTypes.object,
	  horizontal: _react.PropTypes.bool,
	  scale: _react.PropTypes.object,
	  style: _react.PropTypes.object,
	  datum: _react.PropTypes.object,
	  x: _react2.default.PropTypes.number,
	  y: _react2.default.PropTypes.number,
	  y0: _react2.default.PropTypes.number
	};
	exports.default = Bar;

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _omit2 = __webpack_require__(308);
	
	var _omit3 = _interopRequireDefault(_omit2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  getScale: function getScale(props) {
	    var horizontal = props.horizontal;
	
	    var range = {
	      x: _victoryCore.Helpers.getRange(props, "x"),
	      y: _victoryCore.Helpers.getRange(props, "y")
	    };
	    var domain = {
	      x: _domain2.default.getDomainWithZero(props, "x"),
	      y: _domain2.default.getDomainWithZero(props, "y")
	    };
	    var xScale = _scale2.default.getBaseScale(props, "x").domain(domain.x).range(range.x);
	    var yScale = _scale2.default.getBaseScale(props, "y").domain(domain.y).range(range.y);
	    return {
	      x: horizontal ? yScale : xScale,
	      y: horizontal ? xScale : yScale
	    };
	  },
	  getBarPosition: function getBarPosition(props, datum, scale) {
	    var yOffset = datum.yOffset || 0;
	    var xOffset = datum.xOffset || 0;
	    var y0 = yOffset;
	    var y = datum.y + yOffset;
	    var x = datum.x + xOffset;
	    var formatValue = function formatValue(value, axis) {
	      return datum[axis] instanceof Date ? new Date(value) : value;
	    };
	    return {
	      x: scale.x(formatValue(x, "x")),
	      y0: scale.y(formatValue(y0, "y")),
	      y: scale.y(formatValue(y, "y"))
	    };
	  },
	  getBarStyle: function getBarStyle(datum, baseStyle) {
	    var styleData = (0, _omit3.default)(datum, ["xName", "yName", "x", "y", "label"]);
	    return (0, _defaults3.default)({}, styleData, baseStyle);
	  },
	  getLabelStyle: function getLabelStyle(style, datum) {
	    var labelStyle = (0, _defaults3.default)({
	      angle: datum.angle,
	      textAnchor: datum.textAnchor,
	      verticalAnchor: datum.verticalAnchor
	    }, style);
	    return _victoryCore.Helpers.evaluateStyle(labelStyle, datum);
	  },
	  getLabel: function getLabel(props, datum, index) {
	    var propsLabel = Array.isArray(props.labels) ? props.labels[index] : _victoryCore.Helpers.evaluateProp(props.labels, datum);
	    return datum.label || propsLabel;
	  },
	  getLabelAnchors: function getLabelAnchors(datum, horizontal) {
	    var sign = datum.y >= 0 ? 1 : -1;
	    if (!horizontal) {
	      return {
	        vertical: sign >= 0 ? "end" : "start",
	        text: "middle"
	      };
	    } else {
	      return {
	        vertical: "middle",
	        text: sign >= 0 ? "start" : "end"
	      };
	    }
	  },
	  getlabelPadding: function getlabelPadding(style, horizontal) {
	    var defaultPadding = style.padding || 0;
	    return {
	      x: horizontal ? defaultPadding : 0,
	      y: horizontal ? 0 : defaultPadding
	    };
	  },
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _this = this;
	
	    var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	    var data = _victoryCore.Events.addEventKeys(props, _data2.default.getData(props));
	    var scale = this.getScale(props);
	    var horizontal = props.horizontal;
	    var width = props.width;
	    var height = props.height;
	
	    var parentProps = { scale: scale, width: width, height: height, data: data, style: style.parent };
	
	    return data.reduce(function (memo, datum, index) {
	      var eventKey = datum.eventKey;
	      var position = _this.getBarPosition(props, datum, scale);
	      var barStyle = _this.getBarStyle(datum, style.data);
	      var dataProps = Object.assign({
	        style: _victoryCore.Helpers.evaluateStyle(barStyle, datum),
	        index: index,
	        datum: datum,
	        scale: scale,
	        horizontal: horizontal
	      }, position);
	
	      var text = _this.getLabel(props, datum, index);
	      var labelStyle = _this.getLabelStyle(style.labels, datum);
	      var padding = _this.getlabelPadding(labelStyle, horizontal);
	      var anchors = _this.getLabelAnchors(datum, horizontal);
	      var labelPosition = {
	        x: horizontal ? position.y : position.x,
	        y: horizontal ? position.x : position.y
	      };
	      var labelProps = {
	        style: labelStyle,
	        x: labelPosition.x + padding.x,
	        y: labelPosition.y - padding.y,
	        y0: position.y0,
	        text: text,
	        index: index,
	        scale: scale,
	        datum: dataProps.datum,
	        textAnchor: labelStyle.textAnchor || anchors.text,
	        verticalAnchor: labelStyle.verticalAnchor || anchors.vertical,
	        angle: labelStyle.angle
	      };
	
	      memo[eventKey] = {
	        data: dataProps,
	        labels: labelProps
	      };
	      return memo;
	    }, { parent: parentProps });
	  }
	};

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(202),
	    baseDifference = __webpack_require__(187),
	    baseFlatten = __webpack_require__(216),
	    basePick = __webpack_require__(309),
	    getAllKeysIn = __webpack_require__(311),
	    rest = __webpack_require__(141),
	    toKey = __webpack_require__(276);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable string keyed properties of `object` that are
	 * not omitted.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to omit.
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
	  props = arrayMap(baseFlatten(props, 1), toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(310);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
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
/* 310 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
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
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(312),
	    getSymbolsIn = __webpack_require__(314),
	    keysIn = __webpack_require__(143);
	
	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}
	
	module.exports = getAllKeysIn;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(313),
	    isArray = __webpack_require__(152);
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	module.exports = baseGetAllKeys;


/***/ },
/* 313 */
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
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(313),
	    getPrototype = __webpack_require__(253),
	    getSymbols = __webpack_require__(315);
	
	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !getOwnPropertySymbols ? getSymbols : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};
	
	module.exports = getSymbolsIn;


/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var stubArray = __webpack_require__(316);
	
	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}
	
	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = stubArray;
	}
	
	module.exports = getSymbols;


/***/ },
/* 316 */
/***/ function(module, exports) {

	/**
	 * A method that returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	module.exports = stubArray;


/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partialRight2 = __webpack_require__(159);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(181);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _point = __webpack_require__(318);
	
	var _point2 = _interopRequireDefault(_point);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _victoryCore = __webpack_require__(1);
	
	var _helperMethods = __webpack_require__(320);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    fill: "#756f6a",
	    opacity: 1,
	    stroke: "transparent",
	    strokeWidth: 0
	  },
	  labels: {
	    stroke: "transparent",
	    fill: "#756f6a",
	    fontFamily: "Helvetica",
	    fontSize: 13,
	    textAnchor: "middle",
	    padding: 10
	  }
	};
	
	var VictoryScatter = function (_React$Component) {
	  _inherits(VictoryScatter, _React$Component);
	
	  function VictoryScatter() {
	    _classCallCheck(this, VictoryScatter);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryScatter).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryScatter, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.dataKeys = Object.keys(this.baseProps).filter(function (key) {
	        return key !== "parent";
	      });
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props) {
	      var _this2 = this;
	
	      var dataComponent = props.dataComponent;
	      var labelComponent = props.labelComponent;
	
	      var pointComponents = [];
	      var pointLabelComponents = [];
	      this.dataKeys.forEach(function (key) {
	        var dataEvents = _this2.getEvents(props, "data", key);
	        var dataProps = (0, _defaults3.default)({ key: "scatter-" + key }, _this2.getEventState(key, "data"), _this2.getSharedEventState(key, "data"), dataComponent.props, _this2.baseProps[key].data);
	
	        pointComponents.push(_react2.default.cloneElement(dataComponent, Object.assign({}, dataProps, { events: _victoryCore.Events.getPartialEvents(dataEvents, key, dataProps) })));
	
	        var labelProps = (0, _defaults3.default)({ key: "scatter-label-" + key }, _this2.getEventState(key, "labels"), _this2.getSharedEventState(key, "labels"), labelComponent.props, _this2.baseProps[key].labels);
	        if (labelProps && labelProps.text) {
	          var labelEvents = _this2.getEvents(props, "labels", key);
	          pointLabelComponents.push(_react2.default.cloneElement(labelComponent, Object.assign({
	            events: _victoryCore.Events.getPartialEvents(labelEvents, key, labelProps)
	          }, labelProps)));
	        }
	      });
	
	      if (pointLabelComponents.length > 0) {
	        return _react2.default.createElement(
	          "g",
	          null,
	          pointComponents,
	          pointLabelComponents
	        );
	      }
	      return pointComponents;
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var animate = _props.animate;
	      var style = _props.style;
	      var standalone = _props.standalone;
	
	
	      if (animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var whitelist = ["data", "domain", "height", "maxBubbleSize", "padding", "samples", "size", "style", "width", "x", "y"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryScatter, this.props)
	        );
	      }
	
	      var baseStyles = _victoryCore.Helpers.getStyles(style, defaultStyles, "auto", "100%");
	
	      var group = _react2.default.createElement(
	        "g",
	        { role: "presentation", style: baseStyles.parent },
	        this.renderData(this.props)
	      );
	
	      return standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryScatter;
	}(_react2.default.Component);
	
	VictoryScatter.role = "scatter";
	VictoryScatter.defaultTransitions = {
	  onExit: {
	    duration: 600,
	    before: function before() {
	      return { opacity: 0 };
	    }
	  },
	  onEnter: {
	    duration: 600,
	    before: function before() {
	      return { opacity: 0 };
	    },
	    after: function after(datum) {
	      return { opacity: datum.opacity || 1 };
	    }
	  }
	};
	VictoryScatter.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively.
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these arrays of values specified for x and y. If this prop is not set,
	   * categorical data will be plotted in the order it was given in the data array
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * The bubbleProperty prop indicates which property of the data object should be used
	   * to scale data points in a bubble chart
	   */
	  bubbleProperty: _react.PropTypes.string,
	  /**
	   * The data prop specifies the data to be plotted.
	   * Data should be in the form of an array of data points.
	   * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
	   * but by default, an object with x and y properties is expected.
	   * Other properties may be added to the data point object, such as fill, size, and symbol.
	   * These properties will be interpreted and applied to the individual lines
	   * @examples [{x: 1, y: 2, fill: "red"}, {x: 2, y: 3, label: "foo"}]
	   */
	
	  data: _react.PropTypes.array,
	  /**
	   * The dataComponent prop takes an entire component which will be used to create points for
	   * each datum in the chart. The new element created from the passed dataComponent will be
	   * provided with the following properties calculated by VictoryScatter: datum, index, scale,
	   * style, events, x, y, size, and symbol. Any of these props may be overridden by passing in
	   * props to the supplied component, or modified or ignored within the custom component itself.
	   * If a dataComponent is not provided, VictoryScatter will use its default Point component.
	   */
	  dataComponent: _react.PropTypes.element,
	  /**
	   * The domain prop describes the range of values your chart will include. This prop can be
	   * given as a array of the minimum and maximum expected values for your chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "data" and "labels" are all valid targets for VictoryScatter
	   * events. The eventKey may optionally be used to select a single element by index rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey keys,
	   * and a mutation key whose value is a function. The target and eventKey keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     eventKey: "thisOne",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              eventKey: "theOtherOne",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              eventKey: "theOtherOne",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * This prop is used to coordinate events between VictoryArea and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
	  }),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The labelComponent prop takes in an entire label component which will be used
	   * to create labels for each point in the scatter. The new element created from
	   * the passed labelComponent will be supplied with the following properties:
	   * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
	   * any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If labelComponent is omitted,
	   * a new VictoryLabel will be created with props described above.
	   */
	  labelComponent: _react.PropTypes.element,
	  /**
	   * The labels prop defines labels that will appear with each point in your chart.
	   * This prop should be given as an array of values or as a function of data.
	   * If given as an array, the number of elements in the array should be equal to
	   * the length of the data array. Labels may also be added directly to the data object
	   * like data={[{x: 1, y: 1, label: "first"}]}.
	   * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
	   */
	  labels: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
	  /**
	   * The maxBubbleSize prop sets an upper limit for scaling data points in a bubble chart
	   */
	  maxBubbleSize: _victoryCore.PropTypes.nonNegative,
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
	   * The samples prop specifies how many individual points to plot when plotting
	   * y as a function of x. Samples is ignored if x props are provided instead.
	   */
	  samples: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
	   * as a d3 scale function, or as an object with scales specified for x and y
	   * @exampes d3Scale.time(), {x: "linear", y: "log"}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The size prop determines how to scale each data point
	   */
	  size: _react.PropTypes.oneOfType([_victoryCore.PropTypes.nonNegative, _react.PropTypes.func]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryScatter with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your VictoryScatter. Any valid inline style properties
	   * will be applied. Height, width, and padding should be specified via the height,
	   * width, and padding props, as they are used to calculate the alignment of
	   * components within chart. In addition to normal style properties, angle and verticalAnchor
	   * may also be specified via the labels object, and they will be passed as props to
	   * VictoryLabel, or any custom labelComponent.
	   * @examples {data: {fill: "red"}, labels: {fontSize: 12}}
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The symbol prop determines which symbol should be drawn to represent data points.
	   */
	  symbol: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"]), _react.PropTypes.func]),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
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
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryScatter: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryScatter will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryScatter.defaultProps = {
	  height: 300,
	  padding: 50,
	  samples: 50,
	  scale: "linear",
	  size: 3,
	  standalone: true,
	  symbol: "circle",
	  width: 450,
	  x: "x",
	  y: "y",
	  dataComponent: _react2.default.createElement(_point2.default, null),
	  labelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryScatter.getDomain = _domain2.default.getDomain.bind(_domain2.default);
	VictoryScatter.getData = _data2.default.getData.bind(_data2.default);
	VictoryScatter.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryScatter;

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pathHelpers = __webpack_require__(319);
	
	var _pathHelpers2 = _interopRequireDefault(_pathHelpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Point = function (_React$Component) {
	  _inherits(Point, _React$Component);
	
	  function Point() {
	    _classCallCheck(this, Point);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Point).apply(this, arguments));
	  }
	
	  _createClass(Point, [{
	    key: "getPath",
	    value: function getPath(props) {
	      var pathFunctions = {
	        circle: _pathHelpers2.default.circle,
	        square: _pathHelpers2.default.square,
	        diamond: _pathHelpers2.default.diamond,
	        triangleDown: _pathHelpers2.default.triangleDown,
	        triangleUp: _pathHelpers2.default.triangleUp,
	        plus: _pathHelpers2.default.plus,
	        star: _pathHelpers2.default.star
	      };
	      return pathFunctions[props.symbol].call(null, props.x, props.y, props.size);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement("path", _extends({}, this.props.events, {
	        style: this.props.style,
	        d: this.getPath(this.props),
	        shapeRendering: "optimizeSpeed"
	      }));
	    }
	  }]);
	
	  return Point;
	}(_react2.default.Component);
	
	Point.propTypes = {
	  index: _react2.default.PropTypes.number,
	  datum: _react.PropTypes.object,
	  events: _react.PropTypes.object,
	  symbol: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"]), _react.PropTypes.func]),
	  size: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]),
	  scale: _react.PropTypes.object,
	  style: _react.PropTypes.object,
	  x: _react2.default.PropTypes.number,
	  y: _react2.default.PropTypes.number
	};
	exports.default = Point;

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _range2 = __webpack_require__(209);
	
	var _range3 = _interopRequireDefault(_range2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  circle: function circle(x, y, size) {
	    return "M " + x + ", " + y + " m " + -size + ", 0\n      a " + size + ", " + size + " 0 1,0 " + size * 2 + ",0\n      a " + size + ", " + size + " 0 1,0 " + -size * 2 + ",0";
	  },
	  square: function square(x, y, size) {
	    var baseSize = 0.87 * size;
	    return "M " + (x - baseSize) + ", " + (y + baseSize) + "\n      L " + (x + baseSize) + ", " + (y + baseSize) + "\n      L " + (x + baseSize) + ", " + (y - baseSize) + "\n      L " + (x - baseSize) + ", " + (y - baseSize) + "\n      z";
	  },
	  diamond: function diamond(x, y, size) {
	    var baseSize = 0.87 * size;
	    var length = Math.sqrt(2 * (baseSize * baseSize));
	    return "M " + x + ", " + (y + length) + "\n      L " + (x + length) + ", " + y + "\n      L " + x + ", " + (y - length) + "\n      L " + (x - length) + ", " + y + "\n      z";
	  },
	  triangleDown: function triangleDown(x, y, size) {
	    var height = size / 2 * Math.sqrt(3);
	    return "M " + (x - size) + ", " + (y - size) + "\n      L " + (x + size) + ", " + (y - size) + "\n      L " + x + ", " + (y + height) + "\n      z";
	  },
	  triangleUp: function triangleUp(x, y, size) {
	    var height = size / 2 * Math.sqrt(3);
	    return "M " + (x - size) + ", " + (y + size) + "\n      L " + (x + size) + ", " + (y + size) + "\n      L " + x + ", " + (y - height) + "\n      z";
	  },
	  plus: function plus(x, y, size) {
	    var baseSize = 1.1 * size;
	    return "M " + (x - baseSize / 2.5) + ", " + (y + baseSize) + "\n      L " + (x + baseSize / 2.5) + ", " + (y + baseSize) + "\n      L " + (x + baseSize / 2.5) + ", " + (y + baseSize / 2.5) + "\n      L " + (x + baseSize) + ", " + (y + baseSize / 2.5) + "\n      L " + (x + baseSize) + ", " + (y - baseSize / 2.5) + "\n      L " + (x + baseSize / 2.5) + ", " + (y - baseSize / 2.5) + "\n      L " + (x + baseSize / 2.5) + ", " + (y - baseSize) + "\n      L " + (x - baseSize / 2.5) + ", " + (y - baseSize) + "\n      L " + (x - baseSize / 2.5) + ", " + (y - baseSize / 2.5) + "\n      L " + (x - baseSize) + ", " + (y - baseSize / 2.5) + "\n      L " + (x - baseSize) + ", " + (y + baseSize / 2.5) + "\n      L " + (x - baseSize / 2.5) + ", " + (y + baseSize / 2.5) + "\n      z";
	  },
	  star: function star(x, y, size) {
	    var baseSize = 1.35 * size;
	    var angle = Math.PI / 5;
	    var starCoords = (0, _range3.default)(10).map(function (index) {
	      var length = index % 2 === 0 ? baseSize : baseSize / 2;
	      return length * Math.sin(angle * (index + 1)) + x + ",\n        " + (length * Math.cos(angle * (index + 1)) + y);
	    });
	    return "M " + starCoords.join("L") + " z";
	  }
	};

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _omit2 = __webpack_require__(308);
	
	var _omit3 = _interopRequireDefault(_omit2);
	
	var _pick2 = __webpack_require__(321);
	
	var _pick3 = _interopRequireDefault(_pick2);
	
	var _values2 = __webpack_require__(234);
	
	var _values3 = _interopRequireDefault(_values2);
	
	var _victoryCore = __webpack_require__(1);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	var _domain = __webpack_require__(227);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _data = __webpack_require__(228);
	
	var _data2 = _interopRequireDefault(_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _this = this;
	
	    var calculatedValues = this.getCalculatedValues(props, defaultStyles);
	    var data = calculatedValues.data;
	    var style = calculatedValues.style;
	    var scale = calculatedValues.scale;
	    var height = props.height;
	    var width = props.width;
	
	    var parentProps = { style: style.parent, scale: scale, data: data, height: height, width: width };
	    return data.reduce(function (memo, datum, index) {
	      var eventKey = datum.eventKey;
	      var x = scale.x(datum.x);
	      var y = scale.y(datum.y);
	      var size = _this.getSize(datum, props, calculatedValues);
	      var symbol = _this.getSymbol(datum, props);
	      var dataStyle = _this.getDataStyles(datum, style.data);
	      var dataProps = {
	        x: x, y: y, size: size, scale: scale, datum: datum, symbol: symbol, index: index, style: dataStyle
	      };
	
	      var text = _this.getLabelText(props, datum, index);
	      var labelStyle = _this.getLabelStyle(style.labels, dataProps);
	      var labelProps = {
	        style: labelStyle,
	        x: x,
	        y: y - labelStyle.padding,
	        text: text,
	        index: index,
	        scale: scale,
	        datum: dataProps.datum,
	        textAnchor: labelStyle.textAnchor,
	        verticalAnchor: labelStyle.verticalAnchor || "end",
	        angle: labelStyle.angle
	      };
	      memo[eventKey] = {
	        data: dataProps,
	        labels: labelProps
	      };
	      return memo;
	    }, { parent: parentProps });
	  },
	  getCalculatedValues: function getCalculatedValues(props, defaultStyles) {
	    var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	    var data = _victoryCore.Events.addEventKeys(props, _data2.default.getData(props));
	    var range = {
	      x: _victoryCore.Helpers.getRange(props, "x"),
	      y: _victoryCore.Helpers.getRange(props, "y")
	    };
	    var domain = {
	      x: _domain2.default.getDomain(props, "x"),
	      y: _domain2.default.getDomain(props, "y")
	    };
	    var scale = {
	      x: _scale2.default.getBaseScale(props, "x").domain(domain.x).range(range.x),
	      y: _scale2.default.getBaseScale(props, "y").domain(domain.y).range(range.y)
	    };
	    var z = props.bubbleProperty || "z";
	    return { data: data, scale: scale, style: style, z: z };
	  },
	  getDataStyles: function getDataStyles(datum, style) {
	    var stylesFromData = (0, _omit3.default)(datum, ["x", "y", "z", "size", "symbol", "name", "label"]);
	    var baseDataStyle = (0, _defaults3.default)({}, stylesFromData, style);
	    return _victoryCore.Helpers.evaluateStyle(baseDataStyle, datum);
	  },
	  getLabelText: function getLabelText(props, datum, index) {
	    var propsLabel = Array.isArray(props.labels) ? props.labels[index] : _victoryCore.Helpers.evaluateProp(props.labels, datum);
	    return datum.label || propsLabel;
	  },
	  getLabelStyle: function getLabelStyle(labelStyle, dataProps) {
	    var datum = dataProps.datum;
	    var size = dataProps.size;
	    var style = dataProps.style;
	
	    var matchedStyle = (0, _pick3.default)(style, ["opacity", "fill"]);
	    var padding = labelStyle.padding || size * 0.25;
	    var baseLabelStyle = (0, _defaults3.default)({}, labelStyle, matchedStyle, { padding: padding });
	    return _victoryCore.Helpers.evaluateStyle(baseLabelStyle, datum);
	  },
	  getSymbol: function getSymbol(data, props) {
	    if (props.bubbleProperty) {
	      return "circle";
	    }
	    var symbol = data.symbol || props.symbol;
	    return _victoryCore.Helpers.evaluateProp(symbol, data);
	  },
	  getBubbleSize: function getBubbleSize(datum, props, calculatedValues) {
	    var data = calculatedValues.data;
	    var z = calculatedValues.z;
	
	    var getMaxRadius = function getMaxRadius() {
	      var minPadding = Math.min.apply(Math, _toConsumableArray((0, _values3.default)(_victoryCore.Helpers.getPadding(props))));
	      return Math.max(minPadding, 5);
	    };
	    var zData = data.map(function (point) {
	      return point.z;
	    });
	    var zMin = Math.min.apply(Math, _toConsumableArray(zData));
	    var zMax = Math.max.apply(Math, _toConsumableArray(zData));
	    var maxRadius = props.maxBubbleSize || getMaxRadius();
	    var maxArea = Math.PI * Math.pow(maxRadius, 2);
	    var area = (datum[z] - zMin) / (zMax - zMin) * maxArea;
	    var radius = Math.sqrt(area / Math.PI);
	    return Math.max(radius, 1);
	  },
	  getSize: function getSize(data, props, calculatedValues) {
	    var size = void 0;
	    if (data.size) {
	      size = typeof data.size === "function" ? data.size : Math.max(data.size, 1);
	    } else if (typeof props.size === "function") {
	      size = props.size;
	    } else if (data[calculatedValues.z]) {
	      size = this.getBubbleSize(data, props, calculatedValues);
	    } else {
	      size = Math.max(props.size, 1);
	    }
	    return _victoryCore.Helpers.evaluateProp(size, data);
	  }
	};

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(202),
	    baseFlatten = __webpack_require__(216),
	    basePick = __webpack_require__(309),
	    rest = __webpack_require__(141),
	    toKey = __webpack_require__(276);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = rest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
	});
	
	module.exports = pick;


/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _uniq2 = __webpack_require__(229);
	
	var _uniq3 = _interopRequireDefault(_uniq2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	var _wrapper = __webpack_require__(294);
	
	var _wrapper2 = _interopRequireDefault(_wrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    width: 8,
	    padding: 6
	  }
	};
	
	var VictoryGroup = function (_React$Component) {
	  _inherits(VictoryGroup, _React$Component);
	
	  function VictoryGroup() {
	    _classCallCheck(this, VictoryGroup);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryGroup).apply(this, arguments));
	  }
	
	  _createClass(VictoryGroup, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var setAnimationState = _wrapper2.default.setAnimationState.bind(this);
	      setAnimationState(nextProps);
	    }
	  }, {
	    key: "getCalculatedProps",
	    value: function getCalculatedProps(props, childComponents, style) {
	      var horizontal = props.horizontal || childComponents.every(function (component) {
	        return component.props.horizontal;
	      });
	      var datasets = _wrapper2.default.getDataFromChildren(props);
	      var domain = {
	        x: _wrapper2.default.getDomain(props, "x", childComponents),
	        y: _wrapper2.default.getDomain(props, "y", childComponents)
	      };
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var baseScale = {
	        x: _scale2.default.getScaleFromProps(props, "x") || _scale2.default.getDefaultScale(),
	        y: _scale2.default.getScaleFromProps(props, "y") || _scale2.default.getDefaultScale()
	      };
	      var xScale = baseScale.x.domain(domain.x).range(range.x);
	      var yScale = baseScale.y.domain(domain.y).range(range.y);
	      var scale = {
	        x: horizontal ? yScale : xScale,
	        y: horizontal ? xScale : yScale
	      };
	      var categories = {
	        x: _wrapper2.default.getCategories(props, "x"),
	        y: _wrapper2.default.getCategories(props, "y")
	      };
	      var colorScale = props.colorScale;
	      return { datasets: datasets, categories: categories, range: range, domain: domain, horizontal: horizontal, scale: scale, style: style, colorScale: colorScale };
	    }
	  }, {
	    key: "pixelsToValue",
	    value: function pixelsToValue(props, axis, calculatedProps) {
	      if (props.offset === 0) {
	        return 0;
	      }
	      var childComponents = _react2.default.Children.toArray(props.children);
	      var horizontalChildren = childComponents.some(function (child) {
	        return child.props.horizontal;
	      });
	      var horizontal = props && props.horizontal || horizontalChildren.length > 0;
	      var otherAxis = axis === "x" ? "y" : "x";
	      var currentAxis = horizontal ? otherAxis : axis;
	      var domain = calculatedProps.domain[currentAxis];
	      var range = calculatedProps.range[currentAxis];
	      var domainExtent = Math.max.apply(Math, _toConsumableArray(domain)) - Math.min.apply(Math, _toConsumableArray(domain));
	      var rangeExtent = Math.max.apply(Math, _toConsumableArray(range)) - Math.min.apply(Math, _toConsumableArray(range));
	      return domainExtent / rangeExtent * props.offset;
	    }
	  }, {
	    key: "getXO",
	    value: function getXO(props, calculatedProps, datasets, index) {
	      // eslint-disable-line max-params
	      var center = (datasets.length - 1) / 2;
	      var totalWidth = this.pixelsToValue(props, "x", calculatedProps);
	      return (index - center) * totalWidth;
	    }
	  }, {
	    key: "getLabels",
	    value: function getLabels(props, datasets, index) {
	      if (!props.labels) {
	        return undefined;
	      }
	      return Math.floor(datasets.length / 2) === index ? props.labels : undefined;
	    }
	  }, {
	    key: "getChildProps",
	    value: function getChildProps(props, calculatedProps) {
	      var categories = calculatedProps.categories;
	      var domain = calculatedProps.domain;
	      var scale = calculatedProps.scale;
	      var horizontal = calculatedProps.horizontal;
	
	      return {
	        height: props.height,
	        width: props.width,
	        padding: _victoryCore.Helpers.getPadding(props),
	        standalone: false,
	        categories: categories,
	        domain: domain,
	        scale: scale,
	        horizontal: horizontal
	      };
	    }
	  }, {
	    key: "getColorScale",
	    value: function getColorScale(props, child) {
	      var role = child.type && child.type.role;
	      if (role !== "group-wrapper" && role !== "stack-wrapper") {
	        return undefined;
	      }
	      return child.props.colorScale || props.colorScale;
	    }
	
	    // the old ones were bad
	
	  }, {
	    key: "getNewChildren",
	    value: function getNewChildren(props, childComponents, calculatedProps) {
	      var _this2 = this;
	
	      var datasets = calculatedProps.datasets;
	
	      var childProps = this.getChildProps(props, calculatedProps);
	      var getAnimationProps = _wrapper2.default.getAnimationProps.bind(this);
	      return childComponents.map(function (child, index) {
	        var xOffset = _this2.getXO(props, calculatedProps, datasets, index);
	        var data = datasets[index].map(function (datum) {
	          return Object.assign({}, datum, { xOffset: xOffset });
	        });
	        var style = _wrapper2.default.getChildStyle(child, index, calculatedProps);
	        var labels = props.labels ? _this2.getLabels(props, datasets, index) : child.props.labels;
	        return _react2.default.cloneElement(child, Object.assign({
	          animate: getAnimationProps(props, child, index),
	          key: index,
	          labels: labels,
	          labelComponent: props.labelComponent || child.props.labelComponent,
	          style: style,
	          data: data,
	          xOffset: child.type.role === "stack-wrapper" ? xOffset : undefined,
	          colorScale: _this2.getColorScale(props, child)
	        }, childProps));
	      });
	    }
	  }, {
	    key: "getContainer",
	    value: function getContainer(props, calculatedProps) {
	      var width = props.width;
	      var height = props.height;
	      var containerComponent = props.containerComponent;
	      var scale = calculatedProps.scale;
	      var style = calculatedProps.style;
	
	      var parentProps = (0, _defaults3.default)({}, containerComponent.props, { style: style.parent, scale: scale, width: width, height: height });
	      return _react2.default.cloneElement(containerComponent, parentProps);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var props = this.state && this.state.nodesWillExit ? this.state.oldProps : this.props;
	      var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	      var childComponents = _react2.default.Children.toArray(props.children);
	      var types = (0, _uniq3.default)(childComponents.map(function (child) {
	        return child.type.role;
	      }));
	      if (types.length > 1) {
	        _victoryCore.Log.warn("Only components of the same type can be grouped");
	      }
	      var calculatedProps = this.getCalculatedProps(props, childComponents, style);
	
	      var container = props.standalone && this.getContainer(props, calculatedProps);
	      var newChildren = this.getNewChildren(props, childComponents, calculatedProps);
	      if (props.events) {
	        return _react2.default.createElement(
	          _victoryCore.VictorySharedEvents,
	          { events: props.events, eventKey: props.eventKey, container: container },
	          newChildren
	        );
	      }
	
	      var group = _react2.default.createElement(
	        "g",
	        { style: style.parent },
	        newChildren
	      );
	      return props.standalone ? _react2.default.cloneElement(container, container.props, group) : group;
	    }
	  }]);
	
	  return VictoryGroup;
	}(_react2.default.Component);
	
	VictoryGroup.role = "group-wrapper";
	VictoryGroup.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. If this prop is
	   * given, all children of VictoryGroup will pass the options specified in this prop to
	   * VictoryTransition and VictoryAnimation. Child animation props will be added for any
	   * values not provided via the animation prop for VictoryGroup. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively. VictoryGroup will coodrinate transitions between all
	   * of its child components so that animation stays in sync
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these values for x and y. When categories are not given as an object
	   * When this prop is set on a wrapper component, it will dictate the categories of
	   * its the children. If this prop is not set, any categories on child component
	   * or catigorical data, will be merged to create a shared set of categories.
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * VictoryGroup is a wrapper component that controls the layout and animation behaviors of its
	   * children. VictoryGroup creates a grouped layout for  VictoryArea, or VictoryBar components.
	   * VictoryGroup  can also group components wrapped in VictoryStack
	   */
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  /**
	   * The colorScale prop is an optional prop that defines the color scale the chart's bars
	   * will be created on. This prop should be given as an array of CSS colors, or as a string
	   * corresponding to one of the built in color scales. VictoryBar will automatically assign
	   * values from this color scale to the bars unless colors are explicitly provided in the
	   * `dataAttributes` prop.
	   */
	  colorScale: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.oneOf(["greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"])]),
	  /**
	   * The domain prop describes the range of values your chart will include. This prop can be
	   * given as a array of the minimum and maximum expected values for your chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples: [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The domainPadding prop specifies a number of pixels of padding to add to the
	   * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
	   * from the origin to prevent crowding. This prop should be given as an object with
	   * numbers specified for x and y.
	   */
	  domainPadding: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	    x: _victoryCore.PropTypes.nonNegative,
	    y: _victoryCore.PropTypes.nonNegative
	  }), _victoryCore.PropTypes.nonNegative]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a childName, target, eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, (i.e. "data" and "labels"). The childName will refer to an
	   * individual child of VictoryGroup, either by its name prop, or by index. The eventKey
	   * may optionally be used to select a single element by index or eventKey rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey and childName keys,
	   * and a mutation key whose value is a function. The target and eventKey and childName keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	         childName: "firstBar",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              childName: "secondBar",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              childName: "secondBar",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    childName: _react.PropTypes.string,
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The horizontal prop determines whether the bars will be laid vertically or
	   * horizontally. The bars will be vertical if this prop is false or unspecified,
	   * or horizontal if the prop is set to true.
	   */
	  horizontal: _react.PropTypes.bool,
	  /**
	   * The labels prop defines labels that will appear above group of data.
	   * This prop should be given as an array of values or as a function of data.
	   * If given as an array, the number of elements in the array should be equal to
	   * the length of the data array. Group labels will appear above the center
	   * series of the group, and will override the labels prop of child components.
	   * To use group labels with individual data labels, individual labels should be
	   * added directly to data.
	   * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
	   */
	  labels: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
	  /**
	   * The labelComponent prop takes in an entire, HTML-complete label
	   * component which will be used to create labels for each group of data in the
	   * chart. The new element created from the passed labelComponent will have
	   * property data provided by the bar's datum; properties x, y, textAnchor,
	   * and verticalAnchor preserved or default values provided by the data component; and
	   * styles filled out with defaults provided by the component, and overrides from
	   * the datum. If labelComponent is omitted, a new VictoryLabel will be
	   * created with props and styles from the bar.
	   */
	  labelComponent: _react.PropTypes.element,
	  /**
	   * The offset prop derermines the number of pixels each element in a group should
	   * be offset from its original position on the independent axis. In the case of
	   * groups of bars, this number should be equal to the width of the bar plus
	   * the desired spacing between bars.
	   */
	  offset: _react.PropTypes.number,
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
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a function, or as an object that specifies separate functions for x and y.
	   * @examples d3.time.scale(), {x: d3.scale.linear(), y: d3.scale.log()}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryChart with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your grouped chart. These styles will be
	   * applied to all grouped children
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
	   */
	  width: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryGroup: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryGroup will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryGroup.defaultProps = {
	  scale: "linear",
	  offset: 0,
	  height: 300,
	  width: 450,
	  padding: 50,
	  standalone: true,
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryGroup.getDomain = _wrapper2.default.getDomain.bind(_wrapper2.default);
	VictoryGroup.getData = _wrapper2.default.getData.bind(_wrapper2.default);
	exports.default = VictoryGroup;

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defaults2 = __webpack_require__(132);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _uniq2 = __webpack_require__(229);
	
	var _uniq3 = _interopRequireDefault(_uniq2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _scale = __webpack_require__(214);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	var _wrapper = __webpack_require__(294);
	
	var _wrapper2 = _interopRequireDefault(_wrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultStyles = {
	  data: {
	    width: 8,
	    padding: 6
	  }
	};
	
	var VictoryStack = function (_React$Component) {
	  _inherits(VictoryStack, _React$Component);
	
	  function VictoryStack() {
	    _classCallCheck(this, VictoryStack);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryStack).apply(this, arguments));
	  }
	
	  _createClass(VictoryStack, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      var setAnimationState = _wrapper2.default.setAnimationState.bind(this);
	      setAnimationState(nextProps);
	    }
	  }, {
	    key: "getCalculatedProps",
	    value: function getCalculatedProps(props, childComponents, style) {
	      var horizontal = props.horizontal || childComponents.every(function (component) {
	        return component.props.horizontal;
	      });
	      var datasets = _wrapper2.default.getDataFromChildren(props);
	      var domain = {
	        x: _wrapper2.default.getStackedDomain(props, "x", datasets),
	        y: _wrapper2.default.getStackedDomain(props, "y", datasets)
	      };
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var baseScale = {
	        x: _scale2.default.getScaleFromProps(props, "x") || _scale2.default.getDefaultScale(),
	        y: _scale2.default.getScaleFromProps(props, "y") || _scale2.default.getDefaultScale()
	      };
	      var xScale = baseScale.x.domain(domain.x).range(range.x);
	      var yScale = baseScale.y.domain(domain.y).range(range.y);
	      var scale = {
	        x: horizontal ? yScale : xScale,
	        y: horizontal ? xScale : yScale
	      };
	      var categories = {
	        x: _wrapper2.default.getCategories(props, "x"),
	        y: _wrapper2.default.getCategories(props, "y")
	      };
	      var colorScale = props.colorScale;
	      return { datasets: datasets, categories: categories, range: range, domain: domain, horizontal: horizontal, scale: scale, style: style, colorScale: colorScale };
	    }
	  }, {
	    key: "addLayoutData",
	    value: function addLayoutData(props, calculatedProps, datasets, index) {
	      // eslint-disable-line max-params
	      return datasets[index].map(function (datum) {
	        return Object.assign(datum, {
	          yOffset: _wrapper2.default.getY0(datum, index, calculatedProps),
	          xOffset: props.xOffset
	        });
	      });
	    }
	  }, {
	    key: "getLabels",
	    value: function getLabels(props, datasets, index) {
	      if (!props.labels) {
	        return undefined;
	      }
	      return datasets.length === index + 1 ? props.labels : undefined;
	    }
	  }, {
	    key: "getChildProps",
	    value: function getChildProps(props, calculatedProps) {
	      var categories = calculatedProps.categories;
	      var domain = calculatedProps.domain;
	      var scale = calculatedProps.scale;
	      var horizontal = calculatedProps.horizontal;
	
	      return {
	        height: props.height,
	        width: props.width,
	        padding: _victoryCore.Helpers.getPadding(props),
	        standalone: false,
	        categories: categories,
	        domain: domain,
	        scale: scale,
	        horizontal: horizontal
	      };
	    }
	
	    // the old ones were bad
	
	  }, {
	    key: "getNewChildren",
	    value: function getNewChildren(props, childComponents, calculatedProps) {
	      var _this2 = this;
	
	      var datasets = calculatedProps.datasets;
	
	      var childProps = this.getChildProps(props, calculatedProps);
	      var getAnimationProps = _wrapper2.default.getAnimationProps.bind(this);
	      return childComponents.map(function (child, index) {
	        var data = _this2.addLayoutData(props, calculatedProps, datasets, index);
	        var style = _wrapper2.default.getChildStyle(child, index, calculatedProps);
	        var labels = props.labels ? _this2.getLabels(props, datasets, index) : child.props.labels;
	        return _react2.default.cloneElement(child, Object.assign({
	          animate: getAnimationProps(props, child, index),
	          key: index,
	          labels: labels,
	          labelComponent: props.labelComponent || child.props.labelComponent,
	          style: style,
	          data: data
	        }, childProps));
	      });
	    }
	  }, {
	    key: "getContainer",
	    value: function getContainer(props, calculatedProps) {
	      var width = props.width;
	      var height = props.height;
	      var containerComponent = props.containerComponent;
	      var scale = calculatedProps.scale;
	      var style = calculatedProps.style;
	
	      var parentProps = (0, _defaults3.default)({}, containerComponent.props, { style: style.parent, scale: scale, width: width, height: height });
	      return _react2.default.cloneElement(containerComponent, parentProps);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var props = this.state && this.state.nodesWillExit ? this.state.oldProps : this.props;
	      var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	      var childComponents = _react2.default.Children.toArray(props.children);
	      var types = (0, _uniq3.default)(childComponents.map(function (child) {
	        return child.type.role;
	      }));
	      if (types.some(function (type) {
	        return type === "group-wrapper";
	      })) {
	        _victoryCore.Log.warn("It is not possible to stack groups.");
	      }
	      var calculatedProps = this.getCalculatedProps(props, childComponents, style);
	
	      var container = props.standalone && this.getContainer(props, calculatedProps);
	      var newChildren = this.getNewChildren(props, childComponents, calculatedProps);
	      if (props.events) {
	        return _react2.default.createElement(
	          _victoryCore.VictorySharedEvents,
	          { events: props.events, eventKey: props.eventKey, container: container },
	          newChildren
	        );
	      }
	
	      var group = _react2.default.createElement(
	        "g",
	        { style: style.parent },
	        newChildren
	      );
	      return props.standalone ? _react2.default.cloneElement(container, container.props, group) : group;
	    }
	  }]);
	
	  return VictoryStack;
	}(_react2.default.Component);
	
	VictoryStack.role = "stack-wrapper";
	VictoryStack.propTypes = {
	  /**
	   * The animate prop specifies props for VictoryAnimation to use. If this prop is
	   * given, all children of VictoryStack will pass the options specified in this prop to
	   * VictoryTransition and VictoryAnimation. Child animation props will be added for any
	   * values not provided via the animation prop for VictoryStack. The animate prop should
	   * also be used to specify enter and exit transition configurations with the `onExit`
	   * and `onEnter` namespaces respectively. VictoryStack will coodrinate transitions between all
	   * of its child components so that animation stays in sync
	   * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
	   */
	  animate: _react.PropTypes.object,
	  /**
	   * The categories prop specifies how categorical data for a chart should be ordered.
	   * This prop should be given as an array of string values, or an object with
	   * these values for x and y. When categories are not given as an object
	   * When this prop is set on a wrapper component, it will dictate the categories of
	   * its the children. If this prop is not set, any categories on child component
	   * or catigorical data, will be merged to create a shared set of categories.
	   * @examples ["dogs", "cats", "mice"]
	   */
	  categories: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.shape({
	    x: _react.PropTypes.arrayOf(_react.PropTypes.string),
	    y: _react.PropTypes.arrayOf(_react.PropTypes.string)
	  })]),
	  /**
	   * VictoryStack is a wrapper component that controls the layout and animation behaviors of its
	   * children. VictoryStack creates a stacked layout for  VictoryArea, or VictoryBar components.
	   */
	  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
	  /**
	   * The colorScale prop is an optional prop that defines the color scale the chart's bars
	   * will be created on. This prop should be given as an array of CSS colors, or as a string
	   * corresponding to one of the built in color scales. VictoryBar will automatically assign
	   * values from this color scale to the bars unless colors are explicitly provided in the
	   * `dataAttributes` prop.
	   */
	
	  colorScale: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.oneOf(["greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"])]),
	  /**
	   * The domain prop describes the range of values your chart will include. This prop can be
	   * given as a array of the minimum and maximum expected values for your chart,
	   * or as an object that specifies separate arrays for x and y.
	   * If this prop is not provided, a domain will be calculated from data, or other
	   * available information.
	   * @examples: [-1, 1], {x: [0, 100], y: [0, 1]}
	   */
	  domain: _react.PropTypes.oneOfType([_victoryCore.PropTypes.domain, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.domain,
	    y: _victoryCore.PropTypes.domain
	  })]),
	  /**
	   * The domainPadding prop specifies a number of pixels of padding to add to the
	   * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
	   * from the origin to prevent crowding. This prop should be given as an object with
	   * numbers specified for x and y.
	   */
	  domainPadding: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	    x: _victoryCore.PropTypes.nonNegative,
	    y: _victoryCore.PropTypes.nonNegative
	  }), _victoryCore.PropTypes.nonNegative]),
	  /**
	   * The event prop take an array of event objects. Event objects are composed of
	   * a childName, target, eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, (i.e. "data" and "labels"). The childName will refer to an
	   * individual child of VictoryStack, either by its name prop, or by index. The eventKey
	   * may optionally be used to select a single element by index or eventKey rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey and childName keys,
	   * and a mutation key whose value is a function. The target and eventKey and childName keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     childName: "firstBar",
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              childName: "secondBar",
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              childName: "secondBar",
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    childName: _react.PropTypes.string,
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * The height props specifies the height the svg viewBox of the chart container.
	   * This value should be given as a number of pixels
	   */
	  height: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The horizontal prop determines whether the bars will be laid vertically or
	   * horizontally. The bars will be vertical if this prop is false or unspecified,
	   * or horizontal if the prop is set to true.
	   */
	  horizontal: _react.PropTypes.bool,
	  /**
	   * The labels prop defines labels that will appear above stack of data.
	   * This prop should be given as an array of values or as a function of data.
	   * If given as an array, the number of elements in the array should be equal to
	   * the length of the data array. Stack labels will appear above the last
	   * series of the stack, and will override the labels prop of child components.
	   * To use group labels with individual data labels, individual labels should be
	   * added directly to data.
	   * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
	   */
	  labels: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
	  /**
	   * The labelComponent prop takes in an entire, HTML-complete label
	   * component which will be used to create labels for each stack of data in the
	   * chart. The new element created from the passed labelComponent will have
	   * property data provided by the bar's datum; properties x, y, textAnchor,
	   * and verticalAnchor preserved or default values provided by the data component; and
	   * styles filled out with defaults provided by the component, and overrides from
	   * the datum. If labelComponent is omitted, a new VictoryLabel will be
	   * created with props and styles from the bar.
	   */
	  labelComponent: _react.PropTypes.element,
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
	   * The scale prop determines which scales your chart should use. This prop can be
	   * given as a function, or as an object that specifies separate functions for x and y.
	   * @examples d3.time.scale(), {x: d3.scale.linear(), y: d3.scale.log()}
	   */
	  scale: _react.PropTypes.oneOfType([_victoryCore.PropTypes.scale, _react.PropTypes.shape({
	    x: _victoryCore.PropTypes.scale,
	    y: _victoryCore.PropTypes.scale
	  })]),
	  /**
	   * The standalone prop determines whether the component will render a standalone svg
	   * or a <g> tag that will be included in an external svg. Set standalone to false to
	   * compose VictoryChart with other components within an enclosing <svg> tag.
	   */
	  standalone: _react.PropTypes.bool,
	  /**
	   * The style prop specifies styles for your grouped chart. These styles will be
	   * applied to all grouped children
	   */
	  style: _react.PropTypes.shape({
	    parent: _react.PropTypes.object,
	    data: _react.PropTypes.object,
	    labels: _react.PropTypes.object
	  }),
	  /**
	   * The width props specifies the width of the svg viewBox of the chart container
	   * This value should be given as a number of pixels
	   */
	  width: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The xOffset prop is used for grouping stacks of bars. This prop will be set
	   * by the VictoryGroup component wrapper, or can be set manually.
	   */
	  xOffset: _react.PropTypes.number,
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryStack: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryStack will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryStack.defaultProps = {
	  scale: "linear",
	  height: 300,
	  width: 450,
	  padding: 50,
	  standalone: true,
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryStack.getDomain = _wrapper2.default.getStackedDomain.bind(_wrapper2.default);
	VictoryStack.getData = _wrapper2.default.getData.bind(_wrapper2.default);
	exports.default = VictoryStack;

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VictoryPie = undefined;
	
	var _victoryPie = __webpack_require__(325);
	
	var _victoryPie2 = _interopRequireDefault(_victoryPie);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.VictoryPie = _victoryPie2.default;

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partialRight2 = __webpack_require__(326);
	
	var _partialRight3 = _interopRequireDefault(_partialRight2);
	
	var _isFunction2 = __webpack_require__(354);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(355);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _slice = __webpack_require__(375);
	
	var _slice2 = _interopRequireDefault(_slice);
	
	var _helperMethods = __webpack_require__(376);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
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
	    fontSize: 13,
	    textAnchor: "middle"
	  }
	};
	
	var VictoryPie = function (_React$Component) {
	  _inherits(VictoryPie, _React$Component);
	
	  function VictoryPie() {
	    _classCallCheck(this, VictoryPie);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VictoryPie).call(this));
	
	    _this.state = {};
	    var getScopedEvents = _victoryCore.Events.getScopedEvents.bind(_this);
	    _this.getEvents = (0, _partialRight3.default)(_victoryCore.Events.getEvents.bind(_this), getScopedEvents);
	    _this.getEventState = _victoryCore.Events.getEventState.bind(_this);
	    return _this;
	  }
	
	  _createClass(VictoryPie, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setupEvents(this.props);
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this.setupEvents(newProps);
	    }
	  }, {
	    key: "setupEvents",
	    value: function setupEvents(props) {
	      var sharedEvents = props.sharedEvents;
	
	      this.baseProps = _helperMethods2.default.getBaseProps(props, defaultStyles);
	      this.dataKeys = Object.keys(this.baseProps).filter(function (key) {
	        return key !== "parent";
	      });
	      this.getSharedEventState = sharedEvents && (0, _isFunction3.default)(sharedEvents.getEventState) ? sharedEvents.getEventState : function () {
	        return undefined;
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props) {
	      var _this2 = this;
	
	      var sliceComponents = [];
	      var sliceLabelComponents = [];
	      this.dataKeys.forEach(function (key) {
	        var dataEvents = _this2.getEvents(props, "data", key);
	        var dataProps = (0, _defaults3.default)({ key: "pie-" + key }, _this2.getEventState(key, "data"), _this2.getSharedEventState(key, "data"), _this2.baseProps[key].data, props.dataComponent.props);
	        sliceComponents.push(_react2.default.cloneElement(props.dataComponent, Object.assign({}, dataProps, { events: _victoryCore.Events.getPartialEvents(dataEvents, key, dataProps) })));
	
	        var labelProps = (0, _defaults3.default)({ key: "pie-label-" + key }, _this2.getEventState(key, "labels"), _this2.getSharedEventState(key, "labels"), _this2.baseProps[key].labels, props.labelComponent.props);
	        if (labelProps && labelProps.text) {
	          var labelEvents = _this2.getEvents(props, "labels", key);
	          sliceLabelComponents.push(_react2.default.cloneElement(props.labelComponent, Object.assign({
	            events: _victoryCore.Events.getPartialEvents(labelEvents, key, labelProps)
	          }, labelProps)));
	        }
	      });
	
	      if (sliceLabelComponents.length > 0) {
	        return _react2.default.createElement(
	          "g",
	          { key: "pie-group" },
	          sliceComponents,
	          sliceLabelComponents
	        );
	      }
	      return sliceComponents;
	    }
	  }, {
	    key: "renderContainer",
	    value: function renderContainer(props, group) {
	      var parentEvents = this.getEvents(props, "parent", "parent");
	      var parentProps = (0, _defaults3.default)({}, this.getEventState("parent", "parent"), this.getSharedEventState("parent", "parent"), props.containerComponent.props, this.baseProps.parent);
	      return _react2.default.cloneElement(props.containerComponent, Object.assign({}, parentProps, { events: _victoryCore.Events.getPartialEvents(parentEvents, "parent", parentProps) }), group);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      // If animating, return a `VictoryAnimation` element that will create
	      // a new `VictoryBar` with nearly identical props, except (1) tweened
	      // and (2) `animate` set to null so we don't recurse forever.
	      if (this.props.animate) {
	        var whitelist = ["data", "endAngle", "height", "innerRadius", "cornerRadius", "padAngle", "padding", "colorScale", "startAngle", "style", "width"];
	        return _react2.default.createElement(
	          _victoryCore.VictoryTransition,
	          { animate: this.props.animate, animationWhitelist: whitelist },
	          _react2.default.createElement(VictoryPie, this.props)
	        );
	      }
	
	      var calculatedProps = _helperMethods2.default.getCalculatedValues(this.props, defaultStyles);
	      var style = calculatedProps.style;
	      var padding = calculatedProps.padding;
	      var radius = calculatedProps.radius;
	
	      var xOffset = radius + padding.left;
	      var yOffset = radius + padding.top;
	      var group = _react2.default.createElement(
	        "g",
	        { role: "presentation", style: style.parent, transform: "translate(" + xOffset + ", " + yOffset + ")" },
	        this.renderData(this.props, calculatedProps)
	      );
	
	      return this.props.standalone ? this.renderContainer(this.props, group) : group;
	    }
	  }]);
	
	  return VictoryPie;
	}(_react2.default.Component);
	
	VictoryPie.defaultTransitions = {
	  onExit: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, label: " " };
	    }
	  },
	  onEnter: {
	    duration: 500,
	    before: function before() {
	      return { y: 0, label: " " };
	    },
	    after: function after(datum) {
	      return { y: datum.y, label: datum.label };
	    }
	  }
	};
	VictoryPie.propTypes = {
	  /**
	   * The animate prop specifies props for victory-animation to use. If this prop is
	   * not given, the pie chart will not tween between changing data / style props.
	   * Large datasets might animate slowly due to the inherent limits of svg rendering.
	   * @examples {duration: 500, onEnd: () => alert("done!")}
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
	   * The dataComponent prop takes an entire, HTML-complete data component which will be used to
	   * create slices for each datum in the pie chart. The new element created from the passed
	   * dataComponent will have the property datum set by the pie chart for the point it renders;
	   * properties style and pathFunction calculated by VictoryPie; an index property set
	   * corresponding to the location of the datum in the data provided to the pie; events bound to
	   * the VictoryPie; and the d3 compatible slice object.
	   * If a dataComponent is not provided, VictoryPie's Slice component will be used.
	   */
	  dataComponent: _react.PropTypes.element,
	  /**
	   * The overall end angle of the pie in degrees. This prop is used in conjunction with
	   * startAngle to create a pie that spans only a segment of a circle.
	   */
	  endAngle: _react.PropTypes.number,
	  /**
	   * The event prop takes an array of event objects. Event objects are composed of
	   * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
	   * for a given component, so "data" and "labels" are all valid targets for VictoryPie
	   * events. The eventKey may optionally be used to select a single element by index rather than
	   * an entire set. The eventHandlers object should be given as an object whose keys are standard
	   * event names (i.e. onClick) and whose values are event callbacks. The return value
	   * of an event handler is used to modify elemnts. The return value should be given
	   * as an object or an array of objects with optional target and eventKey keys,
	   * and a mutation key whose value is a function. The target and eventKey keys
	   * will default to those corresponding to the element the event handler was attached to.
	   * The mutation function will be called with the calculated props for the individual selected
	   * element (i.e. a single bar), and the object returned from the mutation function
	   * will override the props of the selected element via object assignment.
	   * @examples
	   * events={[
	   *   {
	   *     target: "data",
	   *     eventKey: 1,
	   *     eventHandlers: {
	   *       onClick: () => {
	   *         return [
	   *            {
	   *              eventKey: 2,
	   *              mutation: (props) => {
	   *                return {style: merge({}, props.style, {fill: "orange"})};
	   *              }
	   *            }, {
	   *              eventKey: 2,
	   *              target: "labels",
	   *              mutation: () => {
	   *                return {text: "hey"};
	   *              }
	   *            }
	   *          ];
	   *       }
	   *     }
	   *   }
	   * ]}
	   *}}
	   */
	  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    target: _react.PropTypes.oneOf(["data", "labels", "parent"]),
	    eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	    eventHandlers: _react.PropTypes.object
	  })),
	  /**
	   * The name prop is used to reference a component instance when defining shared events.
	   */
	  name: _react.PropTypes.string,
	  /**
	   * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	   * assign eventKeys to data
	   */
	  eventKey: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string]),
	  /**
	   * This prop is used to coordinate events between VictoryArea and other Victory
	   * Components via VictorySharedEvents. This prop should not be set manually.
	   */
	  sharedEvents: _react.PropTypes.shape({
	    events: _react.PropTypes.array,
	    getEventState: _react.PropTypes.func
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
	   * Set the cornerRadius for every dataComponent (Slice by default) within VictoryPie
	   */
	  cornerRadius: _victoryCore.PropTypes.nonNegative,
	  /**
	   * The labelComponent prop takes in an entire label component which will be used
	   * to create labels for each slice in the pie chart. The new element created from
	   * the passed labelComponent will be supplied with the following properties:
	   * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
	   * any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If labelComponent is omitted,
	   * a new VictoryLabel will be created with props described above.
	   */
	  labelComponent: _react.PropTypes.element,
	  /**
	   * The labels prop defines labels that will appear in each slice on your pie chart.
	   * This prop should be given as an array of values or as a function of data.
	   * If given as an array, the number of elements in the array should be equal to
	   * the length of the data array. Labels may also be added directly to the data object
	   * like data={[{x: 1, y: 1, label: "first"}]}. If labels are not provided, they
	   * will be created based on x values. If you don't want to render labels, pass
	   * an empty array or a function that returns undefined.
	   * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
	   */
	  labels: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
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
	  y: _react.PropTypes.oneOfType([_react.PropTypes.func, _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer, _victoryCore.PropTypes.nonNegative]), _react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  /**
	   * The containerComponent prop takes an entire component which will be used to
	   * create a container element for standalone charts.
	   * The new element created from the passed containerComponent wil be provided with
	   * these props from VictoryPie: height, width, children
	   * (the chart itself) and style. Props that are not provided by the
	   * child chart component include title and desc, both of which
	   * are intended to add accessibility to Victory components. The more descriptive these props
	   * are, the more accessible your data will be for people using screen readers.
	   * Any of these props may be overridden by passing in props to the supplied component,
	   * or modified or ignored within the custom component itself. If a dataComponent is
	   * not provided, VictoryPie will use the default VictoryContainer component.
	   * @example <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
	   * popular each dog breed is by percentage in Seattle." />
	   */
	  containerComponent: _react.PropTypes.element
	};
	VictoryPie.defaultProps = {
	  data: [{ x: "A", y: 1 }, { x: "B", y: 2 }, { x: "C", y: 3 }, { x: "D", y: 1 }, { x: "E", y: 2 }],
	  endAngle: 360,
	  height: 400,
	  innerRadius: 0,
	  cornerRadius: 0,
	  padAngle: 0,
	  padding: 30,
	  colorScale: ["#75C776", "#39B6C5", "#78CCC4", "#62C3A4", "#64A8D1", "#8C95C8", "#3BAF74"],
	  startAngle: 0,
	  standalone: true,
	  width: 400,
	  x: "x",
	  y: "y",
	  dataComponent: _react2.default.createElement(_slice2.default, null),
	  labelComponent: _react2.default.createElement(_victoryCore.VictoryLabel, null),
	  containerComponent: _react2.default.createElement(_victoryCore.VictoryContainer, null)
	};
	VictoryPie.getBaseProps = (0, _partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default), defaultStyles);
	exports.default = VictoryPie;

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(327),
	    getHolder = __webpack_require__(344),
	    replaceHolders = __webpack_require__(348),
	    rest = __webpack_require__(353);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * This method is like `_.partial` except that partially applied arguments
	 * are appended to the arguments it receives.
	 *
	 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
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
	 * var greetFred = _.partialRight(greet, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 *
	 * // Partially applied with placeholders.
	 * var sayHelloTo = _.partialRight(greet, 'hello', _);
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 */
	var partialRight = rest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partialRight));
	  return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(328),
	    createBaseWrapper = __webpack_require__(329),
	    createCurryWrapper = __webpack_require__(335),
	    createHybridWrapper = __webpack_require__(337),
	    createPartialWrapper = __webpack_require__(349),
	    getData = __webpack_require__(350),
	    mergeData = __webpack_require__(351),
	    setData = __webpack_require__(343),
	    toInteger = __webpack_require__(352);
	
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
	 *   512 - `_.flip`
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
/* 328 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var createCtorWrapper = __webpack_require__(330),
	    root = __webpack_require__(333);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
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
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(331),
	    isObject = __webpack_require__(332);
	
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
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(332);
	
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
/* 332 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(334);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 334 */
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
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(336),
	    createCtorWrapper = __webpack_require__(330),
	    createHybridWrapper = __webpack_require__(337),
	    createRecurryWrapper = __webpack_require__(341),
	    getHolder = __webpack_require__(344),
	    replaceHolders = __webpack_require__(348),
	    root = __webpack_require__(333);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurryWrapper(func, bitmask, arity) {
	  var Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);
	
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
/* 336 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
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
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(338),
	    composeArgsRight = __webpack_require__(339),
	    countHolders = __webpack_require__(340),
	    createCtorWrapper = __webpack_require__(330),
	    createRecurryWrapper = __webpack_require__(341),
	    getHolder = __webpack_require__(344),
	    reorder = __webpack_require__(345),
	    replaceHolders = __webpack_require__(348),
	    root = __webpack_require__(333);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
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
	        args = Array(length),
	        index = length;
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
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
/* 338 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 339 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
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
/* 340 */
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
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(342),
	    setData = __webpack_require__(343);
	
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
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
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
	    newHoldersRight, argPos, ary, arity
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
/* 342 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 343 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 344 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}
	
	module.exports = getHolder;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(346),
	    isIndex = __webpack_require__(347);
	
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
/* 346 */
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
/* 347 */
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
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 348 */
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
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(336),
	    createCtorWrapper = __webpack_require__(330),
	    root = __webpack_require__(333);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
	 *  for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
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
/* 350 */
/***/ function(module, exports) {

	/**
	 * A method that returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 351 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 352 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(336),
	    toInteger = __webpack_require__(352);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(332);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(336),
	    assignInDefaults = __webpack_require__(356),
	    assignInWith = __webpack_require__(358),
	    rest = __webpack_require__(353);
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
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
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(357);
	
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
/* 357 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(359),
	    createAssigner = __webpack_require__(361),
	    keysIn = __webpack_require__(363);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
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
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(360);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
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
	
	module.exports = copyObject;


/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(357);
	
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
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(362),
	    rest = __webpack_require__(353);
	
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
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
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
/* 362 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(364),
	    indexKeys = __webpack_require__(367),
	    isIndex = __webpack_require__(347),
	    isPrototype = __webpack_require__(374);
	
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
	 * @since 3.0.0
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
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(365),
	    iteratorToArray = __webpack_require__(366);
	
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
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(333);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 366 */
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
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(368),
	    isArguments = __webpack_require__(369),
	    isArray = __webpack_require__(370),
	    isLength = __webpack_require__(371),
	    isString = __webpack_require__(372);
	
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
/* 368 */
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
/* 369 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 370 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 371 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
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
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(370),
	    isObjectLike = __webpack_require__(373);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 373 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 374 */
/***/ function(module, exports) {

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(93);
	
	var _react2 = _interopRequireDefault(_react);
	
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
	
	      return _react2.default.createElement("path", _extends({
	        d: props.pathFunction(props.slice),
	        style: props.style
	      }, props.events));
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
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _omit2 = __webpack_require__(377);
	
	var _omit3 = _interopRequireDefault(_omit2);
	
	var _isFunction2 = __webpack_require__(354);
	
	var _isFunction3 = _interopRequireDefault(_isFunction2);
	
	var _defaults2 = __webpack_require__(355);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _assign2 = __webpack_require__(407);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _d3Shape = __webpack_require__(297);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	var _victoryCore = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  checkForValidText: function checkForValidText(text) {
	    if (text === undefined || text === null) {
	      return text;
	    } else {
	      return "" + text;
	    }
	  },
	  getBaseProps: function getBaseProps(props, defaultStyles) {
	    var _this = this;
	
	    var calculatedValues = this.getCalculatedValues(props, defaultStyles);
	    var slices = calculatedValues.slices;
	    var style = calculatedValues.style;
	    var pathFunction = calculatedValues.pathFunction;
	    var colors = calculatedValues.colors;
	    var labelPosition = calculatedValues.labelPosition;
	    var width = props.width;
	    var height = props.height;
	
	    var parentProps = { slices: slices, pathFunction: pathFunction, width: width, height: height, style: style.parent };
	    return slices.reduce(function (memo, slice, index) {
	      var datum = slice.data;
	      var eventKey = datum.eventKey;
	      var fill = _this.getColor(style, colors, index);
	      var dataStyles = (0, _omit3.default)(slice.data, ["x", "y", "label"]);
	      var sliceStyle = (0, _defaults3.default)({}, { fill: fill }, style.data, dataStyles);
	      var dataProps = {
	        index: index,
	        slice: slice,
	        pathFunction: pathFunction,
	        style: _victoryCore.Helpers.evaluateStyle(sliceStyle, datum),
	        datum: datum
	      };
	
	      var text = _this.getLabelText(props, datum, index);
	      var position = labelPosition.centroid(slice);
	      var labelStyle = _victoryCore.Helpers.evaluateStyle((0, _assign3.default)({ padding: 0 }, style.labels), dataProps.datum);
	
	      var labelProps = {
	        style: labelStyle,
	        x: position[0],
	        y: position[1],
	        slice: slice,
	        text: _this.checkForValidText(text),
	        index: index,
	        datum: dataProps.datum,
	        textAnchor: labelStyle.textAnchor || "start",
	        verticalAnchor: labelStyle.verticalAnchor || "middle",
	        angle: labelStyle.angle
	      };
	      memo[eventKey] = {
	        data: dataProps,
	        labels: labelProps
	      };
	      return memo;
	    }, { parent: parentProps });
	  },
	  getCalculatedValues: function getCalculatedValues(props, defaultStyles) {
	    var style = _victoryCore.Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
	    var colors = Array.isArray(props.colorScale) ? props.colorScale : _victoryCore.Style.getColorScale(props.colorScale);
	    var padding = _victoryCore.Helpers.getPadding(props);
	    var radius = this.getRadius(props, padding);
	    var data = _victoryCore.Events.addEventKeys(props, _victoryCore.Helpers.getData(props));
	    var labelPosition = this.getLabelPosition(props, style, radius);
	    var layoutFunction = this.getSliceFunction(props);
	    var slices = layoutFunction(data);
	    var pathFunction = _d3Shape2.default.arc().cornerRadius(props.cornerRadius).outerRadius(radius).innerRadius(props.innerRadius);
	    return { style: style, colors: colors, padding: padding, radius: radius, data: data, slices: slices, labelPosition: labelPosition, pathFunction: pathFunction };
	  },
	  getColor: function getColor(style, colors, index) {
	    if (style && style.data && style.data.fill) {
	      return style.data.fill;
	    }
	    return colors[index % colors.length];
	  },
	  getRadius: function getRadius(props, padding) {
	    return Math.min(props.width - padding.left - padding.right, props.height - padding.top - padding.bottom) / 2;
	  },
	  getLabelPosition: function getLabelPosition(props, style, radius) {
	    // TODO: better label positioning
	    var innerRadius = props.innerRadius ? props.innerRadius + style.labels.padding : style.labels.padding;
	    return _d3Shape2.default.arc().outerRadius(radius).innerRadius(innerRadius);
	  },
	  getLabelText: function getLabelText(props, datum, index) {
	    if (datum.label) {
	      return datum.label;
	    } else if (Array.isArray(props.labels)) {
	      return props.labels[index];
	    }
	    return (0, _isFunction3.default)(props.labels) ? props.labels(datum) : datum.xName || datum.x;
	  },
	  getSliceFunction: function getSliceFunction(props) {
	    var degreesToRadians = function degreesToRadians(degrees) {
	      return degrees * (Math.PI / 180);
	    };
	
	    return _d3Shape2.default.pie().sort(null).startAngle(degreesToRadians(props.startAngle)).endAngle(degreesToRadians(props.endAngle)).padAngle(degreesToRadians(props.padAngle)).value(function (datum) {
	      return datum.y;
	    });
	  }
	};

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(378),
	    baseDifference = __webpack_require__(379),
	    baseFlatten = __webpack_require__(396),
	    basePick = __webpack_require__(397),
	    getAllKeysIn = __webpack_require__(399),
	    rest = __webpack_require__(353),
	    toKey = __webpack_require__(406);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable string keyed properties of `object` that are
	 * not omitted.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to omit.
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
	  props = arrayMap(baseFlatten(props, 1), toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 378 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(380),
	    arrayIncludes = __webpack_require__(390),
	    arrayIncludesWith = __webpack_require__(393),
	    arrayMap = __webpack_require__(378),
	    baseUnary = __webpack_require__(394),
	    cacheHas = __webpack_require__(395);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
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
	
	    value = (comparator || value !== 0) ? value : 0;
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
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(381),
	    setCacheAdd = __webpack_require__(388),
	    setCacheHas = __webpack_require__(389);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
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
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(382),
	    listCacheDelete = __webpack_require__(383),
	    listCacheGet = __webpack_require__(385),
	    listCacheHas = __webpack_require__(386),
	    listCacheSet = __webpack_require__(387);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 382 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(384);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(357);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
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
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(384);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(384);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(384);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 388 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 389 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(391);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(392);
	
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
/* 392 */
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
	      index = fromIndex + (fromRight ? 1 : -1);
	
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
/* 393 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 394 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 395 */
/***/ function(module, exports) {

	/**
	 * Checks if a cache value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 396 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(398);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
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
/* 398 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
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
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(400),
	    getSymbolsIn = __webpack_require__(402),
	    keysIn = __webpack_require__(363);
	
	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}
	
	module.exports = getAllKeysIn;


/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(401),
	    isArray = __webpack_require__(370);
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	module.exports = baseGetAllKeys;


/***/ },
/* 401 */
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
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(401),
	    getPrototype = __webpack_require__(403),
	    getSymbols = __webpack_require__(404);
	
	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !getOwnPropertySymbols ? getSymbols : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};
	
	module.exports = getSymbolsIn;


/***/ },
/* 403 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	var stubArray = __webpack_require__(405);
	
	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}
	
	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = stubArray;
	}
	
	module.exports = getSymbols;


/***/ },
/* 405 */
/***/ function(module, exports) {

	/**
	 * A method that returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	module.exports = stubArray;


/***/ },
/* 406 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(360),
	    copyObject = __webpack_require__(359),
	    createAssigner = __webpack_require__(361),
	    isArrayLike = __webpack_require__(408),
	    isPrototype = __webpack_require__(374),
	    keys = __webpack_require__(411);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
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
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(409),
	    isFunction = __webpack_require__(354),
	    isLength = __webpack_require__(371);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(410);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 410 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 411 */
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory.js.map
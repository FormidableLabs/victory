(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Victory"] = factory(require("react"));
	else
		root["Victory"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_48__) {
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
	
	var _victoryCore = __webpack_require__(1);
	
	var _victoryChart = __webpack_require__(69);
	
	var _victoryPie = __webpack_require__(157);
	
	exports.VictoryAnimation = _victoryCore.VictoryAnimation;
	exports.VictoryAxis = _victoryChart.VictoryAxis;
	exports.VictoryBar = _victoryChart.VictoryBar;
	exports.VictoryChart = _victoryChart.VictoryChart;
	exports.VictoryLine = _victoryChart.VictoryLine;
	exports.VictoryLabel = _victoryCore.VictoryLabel;
	exports.VictoryPie = _victoryPie.VictoryPie;
	exports.VictoryScatter = _victoryChart.VictoryScatter;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	var _victoryUtilCollection = __webpack_require__(2);
	
	var Collection = _interopRequireWildcard(_victoryUtilCollection);
	
	var _victoryUtilHelpers = __webpack_require__(3);
	
	var _victoryUtilHelpers2 = _interopRequireDefault(_victoryUtilHelpers);
	
	var _victoryUtilLog = __webpack_require__(39);
	
	var Log = _interopRequireWildcard(_victoryUtilLog);
	
	var _victoryUtilStyle = __webpack_require__(41);
	
	var Style = _interopRequireWildcard(_victoryUtilStyle);
	
	var _victoryUtilType = __webpack_require__(46);
	
	var Type = _interopRequireWildcard(_victoryUtilType);
	
	var _victoryUtilPropTypes = __webpack_require__(47);
	
	var PropTypes = _interopRequireWildcard(_victoryUtilPropTypes);
	
	var _victoryAnimationVictoryAnimation = __webpack_require__(49);
	
	var _victoryAnimationVictoryAnimation2 = _interopRequireDefault(_victoryAnimationVictoryAnimation);
	
	var _victoryLabelVictoryLabel = __webpack_require__(59);
	
	var _victoryLabelVictoryLabel2 = _interopRequireDefault(_victoryLabelVictoryLabel);
	
	module.exports = {
	  Collection: Collection,
	  Helpers: _victoryUtilHelpers2["default"],
	  Log: Log,
	  PropTypes: PropTypes,
	  Style: Style,
	  Type: Type,
	  VictoryAnimation: _victoryAnimationVictoryAnimation2["default"],
	  VictoryLabel: _victoryLabelVictoryLabel2["default"]
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isNonEmptyArray = function isNonEmptyArray(collection) {
	  return Array.isArray(collection) && collection.length > 0;
	};
	
	exports.isNonEmptyArray = isNonEmptyArray;
	var containsStrings = function containsStrings(collection) {
	  return Array.isArray(collection) && collection.some(function (value) {
	    return typeof value === "string";
	  });
	};
	
	exports.containsStrings = containsStrings;
	var containsDates = function containsDates(collection) {
	  return Array.isArray(collection) && collection.some(function (value) {
	    return value instanceof Date;
	  });
	};
	
	exports.containsDates = containsDates;
	var containsOnlyStrings = function containsOnlyStrings(collection) {
	  return isNonEmptyArray(collection) && collection.every(function (value) {
	    return typeof value === "string";
	  });
	};
	
	exports.containsOnlyStrings = containsOnlyStrings;
	var isArrayOfArrays = function isArrayOfArrays(collection) {
	  return isNonEmptyArray(collection) && collection.every(Array.isArray);
	};
	
	exports.isArrayOfArrays = isArrayOfArrays;
	var removeUndefined = function removeUndefined(arr) {
	  return arr.filter(function (el) {
	    return el !== undefined;
	  });
	};
	exports.removeUndefined = removeUndefined;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _lodashLangIsFunction = __webpack_require__(10);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _lodashUtilityProperty = __webpack_require__(31);
	
	var _lodashUtilityProperty2 = _interopRequireDefault(_lodashUtilityProperty);
	
	var _lodashArrayZipObject = __webpack_require__(38);
	
	var _lodashArrayZipObject2 = _interopRequireDefault(_lodashArrayZipObject);
	
	module.exports = {
	  getPadding: function getPadding(props) {
	    var padding = typeof props.padding === "number" ? props.padding : 0;
	    var paddingObj = typeof props.padding === "object" ? props.padding : {};
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
	      return (0, _lodashObjectDefaults2["default"])({ parent: { height: height, width: width } }, defaultStyles);
	    }
	
	    var data = style.data;
	    var labels = style.labels;
	    var parent = style.parent;
	
	    return {
	      parent: (0, _lodashObjectDefaults2["default"])({ height: height, width: width }, parent, defaultStyles.parent),
	      labels: (0, _lodashObjectDefaults2["default"])({}, labels, defaultStyles.labels),
	      data: (0, _lodashObjectDefaults2["default"])({}, data, defaultStyles.data)
	    };
	  },
	
	  evaluateProp: function evaluateProp(prop, data) {
	    return (0, _lodashLangIsFunction2["default"])(prop) ? prop(data) : prop;
	  },
	
	  evaluateStyle: function evaluateStyle(style, data) {
	    var _this = this;
	
	    if (!Object.keys(style).some(function (value) {
	      return (0, _lodashLangIsFunction2["default"])(style[value]);
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
	      return (0, _lodashObjectDefaults2["default"])({
	        // map string data to numeric values, and add names
	        x: typeof x === "string" ? stringMap.x[x] : x,
	        y: typeof y === "string" ? stringMap.y[y] : y
	      }, xName, yName, datum);
	    });
	  },
	
	  createStringMap: function createStringMap(props, axis) {
	    var stringsFromData = this.getStringsFromData(props, axis);
	    return stringsFromData.length === 0 ? null : (0, _lodashArrayZipObject2["default"])(stringsFromData.map(function (string, index) {
	      return [string, index + 1];
	    }));
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
	    if ((0, _lodashLangIsFunction2["default"])(key)) {
	      return key;
	    } else if (key === null || typeof key === "undefined") {
	      // null/undefined means "return the data item itself"
	      return function (x) {
	        return x;
	      };
	    }
	    // otherwise, assume it is an array index, property key or path (_.property handles all three)
	    return (0, _lodashUtilityProperty2["default"])(key);
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(5),
	    assignDefaults = __webpack_require__(29),
	    createDefaults = __webpack_require__(30);
	
	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to `undefined`. Once a
	 * property is set, additional values of the same property are ignored.
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
	var defaults = createDefaults(assign, assignDefaults);
	
	module.exports = defaults;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var assignWith = __webpack_require__(6),
	    baseAssign = __webpack_require__(22),
	    createAssigner = __webpack_require__(24);
	
	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});
	
	module.exports = assign;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(7);
	
	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);
	
	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}
	
	module.exports = assignWith;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(8),
	    isArrayLike = __webpack_require__(13),
	    isObject = __webpack_require__(11),
	    shimKeys = __webpack_require__(17);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
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
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(9);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(10),
	    isObjectLike = __webpack_require__(12);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 11 */
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(14),
	    isLength = __webpack_require__(16);
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(15);
	
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
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(18),
	    isArray = __webpack_require__(19),
	    isIndex = __webpack_require__(20),
	    isLength = __webpack_require__(16),
	    keysIn = __webpack_require__(21);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13),
	    isObjectLike = __webpack_require__(12);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(8),
	    isLength = __webpack_require__(16),
	    isObjectLike = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	module.exports = isArray;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
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

	var isArguments = __webpack_require__(18),
	    isArray = __webpack_require__(19),
	    isIndex = __webpack_require__(20),
	    isLength = __webpack_require__(16),
	    isObject = __webpack_require__(11);
	
	/** Used for native method references. */
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
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(23),
	    keys = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(25),
	    isIterateeCall = __webpack_require__(27),
	    restParam = __webpack_require__(28);
	
	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;
	
	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(26);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13),
	    isIndex = __webpack_require__(20),
	    isObject = __webpack_require__(11);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
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
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Used by `_.defaults` to customize its `_.assign` use.
	 *
	 * @private
	 * @param {*} objectValue The destination object property value.
	 * @param {*} sourceValue The source object property value.
	 * @returns {*} Returns the value to assign to the destination object.
	 */
	function assignDefaults(objectValue, sourceValue) {
	  return objectValue === undefined ? sourceValue : objectValue;
	}
	
	module.exports = assignDefaults;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var restParam = __webpack_require__(28);
	
	/**
	 * Creates a `_.defaults` or `_.defaultsDeep` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Function} Returns the new defaults function.
	 */
	function createDefaults(assigner, customizer) {
	  return restParam(function(args) {
	    var object = args[0];
	    if (object == null) {
	      return object;
	    }
	    args.push(customizer);
	    return assigner.apply(undefined, args);
	  });
	}
	
	module.exports = createDefaults;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(15),
	    basePropertyDeep = __webpack_require__(32),
	    isKey = __webpack_require__(37);
	
	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(33),
	    toPath = __webpack_require__(35);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(34);
	
	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(36),
	    isArray = __webpack_require__(19);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = toPath;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(19),
	    toObject = __webpack_require__(34);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
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
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}
	
	module.exports = isKey;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(19);
	
	/**
	 * The inverse of `_.pairs`; this method returns an object composed from arrays
	 * of property names and values. Provide either a single two dimensional array,
	 * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
	 * and one of corresponding values.
	 *
	 * @static
	 * @memberOf _
	 * @alias object
	 * @category Array
	 * @param {Array} props The property names.
	 * @param {Array} [values=[]] The property values.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.zipObject([['fred', 30], ['barney', 40]]);
	 * // => { 'fred': 30, 'barney': 40 }
	 *
	 * _.zipObject(['fred', 'barney'], [30, 40]);
	 * // => { 'fred': 30, 'barney': 40 }
	 */
	function zipObject(props, values) {
	  var index = -1,
	      length = props ? props.length : 0,
	      result = {};
	
	  if (length && !values && !isArray(props[0])) {
	    values = [];
	  }
	  while (++index < length) {
	    var key = props[index];
	    if (values) {
	      result[key] = values[index];
	    } else if (key) {
	      result[key[0]] = key[1];
	    }
	  }
	  return result;
	}
	
	module.exports = zipObject;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* global console */
	/* eslint-disable no-console */
	
	// TODO: Use "warning" npm module like React is switching to.
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var warn = function warn(message) {
	  if (process.env.NODE_ENV !== "production") {
	    if (console && console.warn) {
	      console.warn(message);
	    }
	  }
	};
	exports.warn = warn;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _reduceCssCalc = __webpack_require__(42);
	
	var _reduceCssCalc2 = _interopRequireDefault(_reduceCssCalc);
	
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
	};
	
	exports.toTransformString = toTransformString;
	var calc = function calc(expr, precision) {
	  return (0, _reduceCssCalc2["default"])("calc(" + expr + ")", precision);
	};
	
	exports.calc = calc;
	/**
	 * Given the name of a color scale, getColorScale will return an array
	 * of 5 hex string values in that color scale. If no 'name' parameter
	 * is given, it will return the Victory default grayscale.
	 * @param {String} name The name of the color scale to return (optional).
	 * @returns {Array} An array of 5 hex string values composing a color scale.
	 */
	var getColorScale = function getColorScale(name) {
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
	};
	exports.getColorScale = getColorScale;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	var balanced = __webpack_require__(43)
	var reduceFunctionCall = __webpack_require__(44)
	
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
	    var toEvaluate = expression.replace(new RegExp(unit, "g"), "")
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
	  var unitRegEx = /[\.0-9]([%a-z]+)/g
	  var matches = unitRegEx.exec(expression)
	
	  while (matches) {
	    if (!matches || !matches[1]) {
	      continue
	    }
	
	    if (uniqueUnits.indexOf(matches[1]) === -1) {
	      uniqueUnits.push(matches[1])
	    }
	
	    matches = unitRegEx.exec(expression)
	  }
	
	  return uniqueUnits
	}


/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Module dependencies
	 */
	var balanced = __webpack_require__(45)
	
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
/* 45 */
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
/* 46 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nullConstructor = function nullConstructor() {
	  return null;
	};
	exports.nullConstructor = nullConstructor;
	var undefinedConstructor = function undefinedConstructor() {
	  return;
	};
	exports.undefinedConstructor = undefinedConstructor;
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
	
	exports.getConstructor = getConstructor;
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
	exports.getConstructorName = getConstructorName;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* global console */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashLangIsFunction = __webpack_require__(10);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _react = __webpack_require__(48);
	
	var _type = __webpack_require__(46);
	
	/**
	 * Return a new validator based on `propType` but which logs a `console.error`
	 * with `explanation` if used.
	 * @param {Function} propType The old, deprecated propType.
	 * @param {String} explanation The message to provide the user of the deprecated propType.
	 * @returns {Function} Validator which logs usage of this propType
	 */
	var deprecated = function deprecated(propType, explanation) {
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
	};
	
	exports.deprecated = deprecated;
	/**
	 * Return a new validator based on `validator` but with the option to chain
	 * `isRequired` onto the validation. This is nearly identical to how React
	 * does it internally, but they don't expose their helper for us to use.
	 * @param {Function} validator Validation function.
	 * @returns {Function} Validator with `isRequired` option.
	 */
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
	
	exports.makeChainable = makeChainable;
	/**
	 * Return a new validator which returns true
	 * if and only if all validators passed as arguments return true.
	 * Like React.propTypes.oneOfType, except "all" instead of "any"
	 * @param {Array} validators Validation functions.
	 * @returns {Function} Combined validator function
	 */
	var allOfType = function allOfType(validators) {
	  return makeChainable(function (props, propName, componentName) {
	    var error = validators.reduce(function (result, validator) {
	      return result || validator(props, propName, componentName);
	    }, undefined);
	    if (error) {
	      return error;
	    }
	  });
	};
	
	exports.allOfType = allOfType;
	/**
	 * Check that the value is a non-negative number.
	 */
	var nonNegative = makeChainable(function (props, propName, componentName) {
	  var error = _react.PropTypes.number(props, propName, componentName);
	  if (error) {
	    return error;
	  }
	  var value = props[propName];
	  if (value < 0) {
	    return new Error("`" + propName + "` in `" + componentName + "` must be non-negative.");
	  }
	});
	
	exports.nonNegative = nonNegative;
	/**
	 * Check that the value is an integer.
	 */
	var integer = makeChainable(function (props, propName, componentName) {
	  var error = _react.PropTypes.number(props, propName, componentName);
	  if (error) {
	    return error;
	  }
	  var value = props[propName];
	  if (value % 1 !== 0) {
	    return new Error("`" + propName + "` in `" + componentName + "` must be an integer.");
	  }
	});
	
	exports.integer = integer;
	/**
	 * Check that the value is an Array of two unique values.
	 */
	var domain = makeChainable(function (props, propName, componentName) {
	  var error = _react.PropTypes.array(props, propName, componentName);
	  if (error) {
	    return error;
	  }
	  var value = props[propName];
	  if (value.length !== 2 || value[1] === value[0]) {
	    return new Error("`" + propName + "` in `" + componentName + "` must be an array of two unique numeric values.");
	  }
	});
	
	exports.domain = domain;
	/**
	 * Check that the value looks like a d3 `scale` function.
	 */
	var scale = makeChainable(function (props, propName, componentName) {
	  var supportedScaleStrings = ["linear", "time", "log", "sqrt"];
	  var validScale = function validScale(scl) {
	    if ((0, _lodashLangIsFunction2["default"])(scl)) {
	      return (0, _lodashLangIsFunction2["default"])(scl.copy) && (0, _lodashLangIsFunction2["default"])(scl.domain) && (0, _lodashLangIsFunction2["default"])(scl.range);
	    } else if (typeof scl === "string") {
	      return supportedScaleStrings.indexOf(scl) !== -1;
	    }
	    return false;
	  };
	
	  var value = props[propName];
	  if (!validScale(value)) {
	    return new Error("`" + propName + "` in `" + componentName + "` must be a d3 scale.");
	  }
	});
	
	exports.scale = scale;
	/**
	 * Check that an array contains items of the same type.
	 */
	var homogeneousArray = makeChainable(function (props, propName, componentName) {
	  var error = _react.PropTypes.array(props, propName, componentName);
	  if (error) {
	    return error;
	  }
	  var value = props[propName];
	  if (value.length > 1) {
	    var _constructor = (0, _type.getConstructor)(value[0]);
	    for (var i = 1; i < value.length; i++) {
	      var otherConstructor = (0, _type.getConstructor)(value[i]);
	      if (_constructor !== otherConstructor) {
	        var constructorName = (0, _type.getConstructorName)(value[0]);
	        var otherConstructorName = (0, _type.getConstructorName)(value[i]);
	        return new Error("Expected `" + propName + "` in `" + componentName + "` to be a " + ("homogeneous array, but found types `" + constructorName + "` and ") + ("`" + otherConstructorName + "`."));
	      }
	    }
	  }
	});
	
	exports.homogeneousArray = homogeneousArray;
	/**
	 * Check that array prop length matches props.data.length
	 */
	var matchDataLength = makeChainable(function (props, propName) {
	  if (props[propName] && Array.isArray(props[propName]) && props[propName].length !== props.data.length) {
	    return new Error("Length of data and " + propName + " arrays must match.");
	  }
	});
	exports.matchDataLength = matchDataLength;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Ease = __webpack_require__(50);
	
	var _d3Ease2 = _interopRequireDefault(_d3Ease);
	
	var _d3Interpolate = __webpack_require__(51);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
	var _d3Timer = __webpack_require__(53);
	
	var _util = __webpack_require__(54);
	
	(0, _util.addVictoryInterpolator)();
	
	var VictoryAnimation = (function (_React$Component) {
	  _inherits(VictoryAnimation, _React$Component);
	
	  _createClass(VictoryAnimation, null, [{
	    key: "propTypes",
	    value: {
	      /**
	       * The child of should be a function that takes an object of tweened values
	       * and returns a component to render.
	       */
	      children: _react2["default"].PropTypes.func,
	      /**
	       * The number of milliseconds the animation should take to complete.
	       */
	      duration: _react2["default"].PropTypes.number,
	      /**
	       * The easing prop specifies an easing function name to use for tweening.
	       */
	      easing: _react2["default"].PropTypes.oneOf(["back", "backIn", "backOut", "backInOut", "bounce", "bounceIn", "bounceOut", "bounceInOut", "circle", "circleIn", "circleOut", "circleInOut", "linear", "linearIn", "linearOut", "linearInOut", "cubic", "cubicIn", "cubicOut", "cubicInOut", "elastic", "elasticIn", "elasticOut", "elasticInOut", "exp", "expIn", "expOut", "expInOut", "poly", "polyIn", "polyOut", "polyInOut", "quad", "quadIn", "quadOut", "quadInOut", "sin", "sinIn", "sinOut", "sinInOut"]),
	      /**
	       * The delay prop specifies a delay in milliseconds before the animation
	       * begins. If multiple values are in the animation queue, it is the delay
	       * between each animation.
	       */
	      delay: _react2["default"].PropTypes.number,
	      /**
	       * The onEnd prop specifies a function to run when the animation ends. If
	       * multiple animations are in the queue, it is called after the last
	       * animation.
	       */
	      onEnd: _react2["default"].PropTypes.func,
	      /**
	       * The data prop specifies the latest set of values to tween to. When this
	       * prop changes, VictoryAnimation will begin animating from the current
	       * value to the new value.
	       */
	      data: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.object, _react2["default"].PropTypes.array])
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      /* length of animation */
	      duration: 1000,
	      /* easing modifies step each frame */
	      easing: "quadInOut",
	      /* delay between transitions */
	      delay: 0,
	      /* we got nothin' */
	      data: {}
	    },
	    enumerable: true
	  }]);
	
	  function VictoryAnimation(props) {
	    _classCallCheck(this, VictoryAnimation);
	
	    _get(Object.getPrototypeOf(VictoryAnimation.prototype), "constructor", this).call(this, props);
	    /* defaults */
	    this.state = Array.isArray(this.props.data) ? this.props.data[0] : this.props.data;
	    this.interpolator = null;
	    this.queue = Array.isArray(this.props.data) ? this.props.data.slice(1) : [];
	    /* build easing function */
	    this.ease = _d3Ease2["default"][this.props.easing];
	    /*
	      unlike React.createClass({}), there is no autobinding of this in ES6 classes
	      so we bind functionToBeRunEachFrame to current instance of victory animation class
	    */
	    this.functionToBeRunEachFrame = this.functionToBeRunEachFrame.bind(this);
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
	        this.interpolator = _d3Interpolate2["default"].value(this.state, data);
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
	})(_react2["default"].Component);
	
	exports["default"] = VictoryAnimation;
	module.exports = exports["default"];

/***/ },
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(52)) :
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
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _d3Interpolate = __webpack_require__(51);
	
	var _d3Interpolate2 = _interopRequireDefault(_d3Interpolate);
	
	var _lodashLangIsPlainObject = __webpack_require__(55);
	
	var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);
	
	var isInterpolatable = function isInterpolatable(obj) {
	  // d3 turns null into 0 and undefined into NaN, which we don't want.
	  if (obj !== null) {
	    switch (typeof obj) {
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
	        return obj instanceof Date || Array.isArray(obj) || (0, _lodashLangIsPlainObject2["default"])(obj);
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
	
	exports.isInterpolatable = isInterpolatable;
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
	var interpolateImmediate = function interpolateImmediate(a, b) {
	  var when = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	  return function (t) {
	    return t < when ? a : b;
	  };
	};
	
	exports.interpolateImmediate = interpolateImmediate;
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
	var interpolateFunction = function interpolateFunction(a, b) {
	  return function (t) {
	    if (t >= 1) {
	      return b;
	    }
	    return function () {
	      /* eslint-disable no-invalid-this */
	      var aval = typeof a === "function" ? a.apply(this, arguments) : a;
	      var bval = typeof b === "function" ? b.apply(this, arguments) : b;
	      return _d3Interpolate2["default"].value(aval, bval)(t);
	    };
	  };
	};
	
	exports.interpolateFunction = interpolateFunction;
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
	var victoryInterpolator = function victoryInterpolator(a, b) {
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
	
	exports.victoryInterpolator = victoryInterpolator;
	var interpolatorAdded = false;
	
	var addVictoryInterpolator = function addVictoryInterpolator() {
	  if (!interpolatorAdded) {
	    _d3Interpolate2["default"].values.push(victoryInterpolator);
	    interpolatorAdded = true;
	  }
	};
	exports.addVictoryInterpolator = addVictoryInterpolator;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(56),
	    isArguments = __webpack_require__(18),
	    isObjectLike = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
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
	  var Ctor;
	
	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(57),
	    keysIn = __webpack_require__(21);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(58);
	
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(34);
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryUtilIndex = __webpack_require__(60);
	
	var _lodashObjectMerge = __webpack_require__(62);
	
	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
	var defaultStyles = {
	  stroke: "transparent",
	  fill: "#756f6a",
	  fontSize: 16,
	  fontFamily: "Helvetica",
	  backgroundColor: "#ccc"
	};
	
	var VictoryLabel = (function (_React$Component) {
	  _inherits(VictoryLabel, _React$Component);
	
	  function VictoryLabel() {
	    _classCallCheck(this, VictoryLabel);
	
	    _get(Object.getPrototypeOf(VictoryLabel.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryLabel, [{
	    key: "getStyles",
	    value: function getStyles(props) {
	      var style = props.style ? (0, _lodashObjectMerge2["default"])({}, defaultStyles, props.style) : defaultStyles;
	      return _victoryUtilIndex.Helpers.evaluateStyle(style);
	    }
	  }, {
	    key: "getHeight",
	    value: function getHeight(props, type) {
	      var height = _victoryUtilIndex.Helpers.evaluateProp(props[type]);
	      return typeof height === "number" ? height + "em" : height;
	    }
	  }, {
	    key: "getContent",
	    value: function getContent(props) {
	      var text = props.text || props.children;
	      if (text) {
	        var child = _victoryUtilIndex.Helpers.evaluateProp(text);
	        return ("" + child).split("\n");
	      }
	      return [""];
	    }
	  }, {
	    key: "getDy",
	    value: function getDy(props, content, lineHeight) {
	      var dy = props.dy ? _victoryUtilIndex.Helpers.evaluateProp(props.dy) : 0;
	      var length = content.length;
	      var capHeight = this.getHeight(props, "capHeight");
	      var verticalAnchor = props.verticalAnchor ? _victoryUtilIndex.Helpers.evaluateProp(props.verticalAnchor) : "middle";
	      switch (verticalAnchor) {
	        case "end":
	          return _victoryUtilIndex.Style.calc(dy + " +  " + capHeight + " / 2 + (0.5 - " + length + ") * " + lineHeight);
	        case "middle":
	          return _victoryUtilIndex.Style.calc(dy + " + " + capHeight + " / 2 + (0.5 - " + length + " / 2) * " + lineHeight);
	        default:
	          return _victoryUtilIndex.Style.calc(dy + " + " + capHeight + " / 2 + " + lineHeight + " / 2");
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;
	
	      var lineHeight = this.getHeight(this.props, "lineHeight");
	      var transform = this.props.transform && _victoryUtilIndex.Style.toTransformString(_victoryUtilIndex.Helpers.evaluateProp(this.props.transform));
	      var textAnchor = this.props.textAnchor ? _victoryUtilIndex.Helpers.evaluateProp(this.props.textAnchor) : "start";
	      var content = this.getContent(this.props);
	      var style = this.getStyles(this.props);
	      var dx = this.props.dx ? _victoryUtilIndex.Helpers.evaluateProp(this.props.dx) : 0;
	      var dy = this.getDy(this.props, content, lineHeight);
	      return _react2["default"].createElement(
	        "text",
	        {
	          x: this.props.x,
	          y: this.props.y,
	          dy: dy,
	          dx: dx,
	          textAnchor: textAnchor,
	          transform: transform,
	          style: style
	        },
	        content.map(function (line, i) {
	          return _react2["default"].createElement(
	            "tspan",
	            { key: i, x: _this.props.x, dy: i ? lineHeight : undefined },
	            line
	          );
	        })
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      /**
	       * The capHeight prop defines a text metric for the font being used: the
	       * expected height of capital letters. This is necessary because of SVG,
	       * which (a) positions the *bottom* of the text at `y`, and (b) has no
	       * notion of line height. The value should ideally use the same units as
	       * `lineHeight` and `dy`, preferably ems. If given a unitless number, it
	       * is assumed to be ems.
	       */
	      capHeight: _react.PropTypes.oneOfType([_react.PropTypes.string, _victoryUtilIndex.PropTypes.nonNegative, _react.PropTypes.func]),
	      /**
	       * all Victory components will pass a data prop to their label component. This can
	       * be used to calculate functional styles, and determine child text
	       */
	      data: _react.PropTypes.object,
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
	      lineHeight: _react.PropTypes.oneOfType([_react.PropTypes.string, _victoryUtilIndex.PropTypes.nonNegative, _react.PropTypes.func]),
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
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      capHeight: "0.71em", // Magic number from d3.
	      lineHeight: 1
	    },
	    enumerable: true
	  }]);
	
	  return VictoryLabel;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryLabel;
	module.exports = exports["default"];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	var _collection = __webpack_require__(2);
	
	var Collection = _interopRequireWildcard(_collection);
	
	var _helpers = __webpack_require__(3);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var _log = __webpack_require__(39);
	
	var Log = _interopRequireWildcard(_log);
	
	var _style = __webpack_require__(41);
	
	var Style = _interopRequireWildcard(_style);
	
	var _type = __webpack_require__(46);
	
	var Type = _interopRequireWildcard(_type);
	
	var _propTypes = __webpack_require__(47);
	
	var PropTypes = _interopRequireWildcard(_propTypes);
	
	var _perf = __webpack_require__(61);
	
	var Perf = _interopRequireWildcard(_perf);
	
	exports["default"] = {
	  Collection: Collection,
	  Helpers: _helpers2["default"],
	  Log: Log,
	  Style: Style,
	  Type: Type,
	  PropTypes: PropTypes,
	  Perf: Perf
	};
	module.exports = exports["default"];

/***/ },
/* 61 */
/***/ function(module, exports) {

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
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var memoize = function memoize(fn) {
	  var cache = {};
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var hash = args.map(function (arg) {
	      return typeof arg === "string" || typeof arg === "number" ? arg : JSON.stringify(arg);
	    }).join("~");
	    return hash in cache ? cache[hash] : cache[hash] = fn.apply(this, args); // eslint-disable-line no-invalid-this
	  };
	};
	exports.memoize = memoize;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(63),
	    createAssigner = __webpack_require__(24);
	
	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
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
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);
	
	module.exports = merge;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(64),
	    baseMergeDeep = __webpack_require__(65),
	    isArray = __webpack_require__(19),
	    isArrayLike = __webpack_require__(13),
	    isObject = __webpack_require__(11),
	    isObjectLike = __webpack_require__(12),
	    isTypedArray = __webpack_require__(67),
	    keys = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;
	
	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}
	
	module.exports = baseMerge;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(66),
	    isArguments = __webpack_require__(18),
	    isArray = __webpack_require__(19),
	    isArrayLike = __webpack_require__(13),
	    isPlainObject = __webpack_require__(55),
	    isTypedArray = __webpack_require__(67),
	    toPlainObject = __webpack_require__(68);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];
	
	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;
	
	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = arrayCopy;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(16),
	    isObjectLike = __webpack_require__(12);
	
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
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
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
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(23),
	    keysIn = __webpack_require__(21);
	
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
	  return baseCopy(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  VictoryChart: __webpack_require__(70),
	  VictoryLine: __webpack_require__(139),
	  VictoryAxis: __webpack_require__(71),
	  VictoryBar: __webpack_require__(147),
	  VictoryScatter: __webpack_require__(153)
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _victoryAxisVictoryAxis = __webpack_require__(71);
	
	var _victoryAxisVictoryAxis2 = _interopRequireDefault(_victoryAxisVictoryAxis);
	
	var _helperMethods = __webpack_require__(125);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _helpersAxis = __webpack_require__(101);
	
	var _helpersAxis2 = _interopRequireDefault(_helpersAxis);
	
	var _helpersScale = __webpack_require__(94);
	
	var _helpersScale2 = _interopRequireDefault(_helpersScale);
	
	var defaultAxes = {
	  independent: _react2["default"].createElement(_victoryAxisVictoryAxis2["default"], { animate: { velocity: 0.02 } }),
	  dependent: _react2["default"].createElement(_victoryAxisVictoryAxis2["default"], { dependentAxis: true, animate: { velocity: 0.02 } })
	};
	
	var VictoryChart = (function (_React$Component) {
	  _inherits(VictoryChart, _React$Component);
	
	  function VictoryChart() {
	    _classCallCheck(this, VictoryChart);
	
	    _get(Object.getPrototypeOf(VictoryChart.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryChart, [{
	    key: "getStyles",
	    value: function getStyles(props) {
	      var styleProps = props.style && props.style.parent;
	      return {
	        parent: (0, _lodashObjectDefaults2["default"])({
	          height: props.height,
	          width: props.width
	        }, styleProps) };
	    }
	  }, {
	    key: "getAxisProps",
	    value: function getAxisProps(child, props, calculatedProps) {
	      var domain = calculatedProps.domain;
	      var scale = calculatedProps.scale;
	
	      var axis = child.type.getAxis(child.props);
	      var axisOffset = _helperMethods2["default"].getAxisOffset(props, calculatedProps);
	      var tickValues = _helperMethods2["default"].getTicks(calculatedProps, axis, child);
	      var tickFormat = child.props.tickFormat || _helperMethods2["default"].getTickFormat(child, axis, calculatedProps);
	      var offsetY = axis === "y" ? undefined : axisOffset.y;
	      var offsetX = axis === "x" ? undefined : axisOffset.x;
	      return {
	        domain: domain[axis],
	        scale: scale[axis],
	        tickValues: tickValues,
	        tickFormat: tickFormat,
	        offsetY: offsetY,
	        offsetX: offsetX,
	        crossAxis: true
	      };
	    }
	  }, {
	    key: "getGroupedDataProps",
	    value: function getGroupedDataProps(child, calculatedProps) {
	      var domain = calculatedProps.domain;
	      var flipped = calculatedProps.flipped;
	      var scale = calculatedProps.scale;
	      var stringMap = calculatedProps.stringMap;
	
	      var categoryAxis = flipped ? "y" : "x";
	      var categories = stringMap[categoryAxis] && Object.keys(stringMap[categoryAxis]);
	      return {
	        domain: domain,
	        scale: scale,
	        categories: child.props.categories || categories
	      };
	    }
	  }, {
	    key: "getChildProps",
	    value: function getChildProps(child, props, calculatedProps) {
	      var type = child.type && child.type.role;
	      if (type === "axis") {
	        return this.getAxisProps(child, props, calculatedProps);
	      } else if (type === "bar") {
	        return this.getGroupedDataProps(child, calculatedProps);
	      }
	      return {
	        domain: calculatedProps.domain,
	        scale: calculatedProps.scale
	      };
	    }
	  }, {
	    key: "getCalculatedProps",
	    value: function getCalculatedProps(props, childComponents) {
	      var flipped = childComponents.some(function (component) {
	        return component.props.horizontal;
	      });
	      var axisComponents = {
	        x: _helpersAxis2["default"].getAxisComponent(childComponents, "x"),
	        y: _helpersAxis2["default"].getAxisComponent(childComponents, "y")
	      };
	      var domain = {
	        x: _helperMethods2["default"].getDomain(props, childComponents, "x"),
	        y: _helperMethods2["default"].getDomain(props, childComponents, "y")
	      };
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var baseScale = {
	        x: _helpersScale2["default"].getScaleFromProps(props, "x") || axisComponents.x.type.getScale(axisComponents.x.props),
	        y: _helpersScale2["default"].getScaleFromProps(props, "y") || axisComponents.y.type.getScale(axisComponents.y.props)
	      };
	      var scale = {
	        x: baseScale.x.domain(domain.x).range(range.x),
	        y: baseScale.y.domain(domain.y).range(range.y)
	      };
	      // TODO: check
	      var categories = {
	        x: _helperMethods2["default"].getCategories(childComponents, "x"),
	        y: _helperMethods2["default"].getCategories(childComponents, "y")
	      };
	      var stringMap = {
	        x: _helperMethods2["default"].createStringMap(childComponents, "x"),
	        y: _helperMethods2["default"].createStringMap(childComponents, "y")
	      };
	      return { axisComponents: axisComponents, categories: categories, domain: domain, flipped: flipped, scale: scale, stringMap: stringMap };
	    }
	
	    // the old ones were bad
	  }, {
	    key: "getNewChildren",
	    value: function getNewChildren(props, childComponents, baseStyle) {
	      var _this = this;
	
	      var calculatedProps = this.getCalculatedProps(props, childComponents);
	      return childComponents.map(function (child, index) {
	        var style = (0, _lodashObjectDefaults2["default"])({ parent: baseStyle.parent }, child.props.style);
	        var childProps = _this.getChildProps(child, props, calculatedProps);
	        return _react2["default"].cloneElement(child, (0, _lodashObjectDefaults2["default"])({
	          animate: child.props.animate || props.animate,
	          height: props.height,
	          width: props.width,
	          padding: _victoryCore.Helpers.getPadding(props),
	          ref: index,
	          key: index,
	          standalone: false,
	          style: style
	        }, childProps));
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var style = this.getStyles(this.props);
	      var childComponents = _helperMethods2["default"].getChildComponents(this.props, defaultAxes);
	      var group = _react2["default"].createElement(
	        "g",
	        { style: style.parent },
	        this.getNewChildren(this.props, childComponents, style)
	      );
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: style.parent },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      /**
	       * The animate prop specifies props for victory-animation to use. If this prop is
	       * given, all children defined in chart will pass the options specified in this prop to
	       * victory-animation, unless they have animation props of their own specified.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * @examples {velocity: 0.02, onEnd: () => alert("woo!")}
	       */
	      animate: _react.PropTypes.object,
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
	       * The height props specifies the height of the chart container element in pixels
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
	       * The style prop specifies styles for your chart. Victory Chart relies on Radium,
	       * so valid Radium style objects should work for this prop. Height, width, and
	       * padding should be specified via the height, width, and padding props, as they
	       * are used to calculate the alignment of components within chart.
	       * @examples {background: transparent, margin: 50}
	       */
	      style: _react.PropTypes.object,
	      /**
	       * The width props specifies the width of the chart container element in pixels
	       */
	      width: _victoryCore.PropTypes.nonNegative
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      height: 300,
	      width: 450,
	      padding: 50,
	      standalone: true
	    },
	    enumerable: true
	  }]);
	
	  return VictoryChart;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryChart;
	module.exports = exports["default"];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _axisLine = __webpack_require__(77);
	
	var _axisLine2 = _interopRequireDefault(_axisLine);
	
	var _grid = __webpack_require__(78);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _tick = __webpack_require__(79);
	
	var _tick2 = _interopRequireDefault(_tick);
	
	var _helperMethods = __webpack_require__(80);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _helpersAxis = __webpack_require__(101);
	
	var _helpersAxis2 = _interopRequireDefault(_helpersAxis);
	
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
	    fontSize: 16,
	    fontFamily: "Helvetica"
	  },
	  grid: {
	    stroke: "none",
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
	    fontSize: 10,
	    padding: 5
	  }
	};
	
	var orientationSign = {
	  top: -1,
	  left: -1,
	  right: 1,
	  bottom: 1
	};
	
	var getStyles = function getStyles(props) {
	  var style = props.style || {};
	  var parentStyleProps = { height: props.height, width: props.width };
	  return {
	    parent: (0, _lodashObjectDefaults2["default"])(parentStyleProps, style.parent, defaultStyles.parent),
	    axis: (0, _lodashObjectDefaults2["default"])({}, style.axis, defaultStyles.axis),
	    axisLabel: (0, _lodashObjectDefaults2["default"])({}, style.axisLabel, defaultStyles.axisLabel),
	    grid: (0, _lodashObjectDefaults2["default"])({}, style.grid, defaultStyles.grid),
	    ticks: (0, _lodashObjectDefaults2["default"])({}, style.ticks, defaultStyles.ticks),
	    tickLabels: (0, _lodashObjectDefaults2["default"])({}, style.tickLabels, defaultStyles.tickLabels)
	  };
	};
	
	var VictoryAxis = (function (_React$Component) {
	  _inherits(VictoryAxis, _React$Component);
	
	  function VictoryAxis() {
	    _classCallCheck(this, VictoryAxis);
	
	    _get(Object.getPrototypeOf(VictoryAxis.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryAxis, [{
	    key: "getTickProps",
	    value: function getTickProps(props) {
	      var stringTicks = _helpersAxis2["default"].stringTicks(props);
	      var scale = _helperMethods2["default"].getScale(props);
	      var ticks = _helperMethods2["default"].getTicks(props, scale);
	      return { scale: scale, ticks: ticks, stringTicks: stringTicks };
	    }
	  }, {
	    key: "getLayoutProps",
	    value: function getLayoutProps(props) {
	      var style = getStyles(props);
	      var padding = _victoryCore.Helpers.getPadding(props);
	      var orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
	      var isVertical = _helpersAxis2["default"].isVertical(props);
	      var labelPadding = _helperMethods2["default"].getLabelPadding(props, style);
	      var offset = _helperMethods2["default"].getOffset(props, style);
	      return { style: style, padding: padding, orientation: orientation, isVertical: isVertical, labelPadding: labelPadding, offset: offset };
	    }
	  }, {
	    key: "renderLine",
	    value: function renderLine(props, layoutProps) {
	      var style = layoutProps.style;
	      var padding = layoutProps.padding;
	      var isVertical = layoutProps.isVertical;
	
	      return _react2["default"].createElement(_axisLine2["default"], { key: "line",
	        style: style.axis,
	        x1: isVertical ? null : padding.left,
	        x2: isVertical ? null : props.width - padding.right,
	        y1: isVertical ? padding.top : null,
	        y2: isVertical ? props.height - padding.bottom : null
	      });
	    }
	  }, {
	    key: "renderTicks",
	    value: function renderTicks(props, layoutProps, tickProps) {
	      var _this = this;
	
	      var style = layoutProps.style;
	      var orientation = layoutProps.orientation;
	      var scale = tickProps.scale;
	      var ticks = tickProps.ticks;
	      var stringTicks = tickProps.stringTicks;
	
	      var tickFormat = _helperMethods2["default"].getTickFormat(props, tickProps);
	      return ticks.map(function (tick, index) {
	        var position = scale(tick);
	        return _react2["default"].createElement(_tick2["default"], { key: "tick-" + index,
	          position: position,
	          tick: stringTicks ? props.tickValues[tick - 1] : tick,
	          orientation: orientation,
	          label: tickFormat.call(_this, tick, index),
	          style: {
	            ticks: style.ticks,
	            tickLabels: style.tickLabels
	          }
	        });
	      });
	    }
	  }, {
	    key: "renderGrid",
	    value: function renderGrid(props, layoutProps, tickProps) {
	      var scale = tickProps.scale;
	      var ticks = tickProps.ticks;
	      var stringTicks = tickProps.stringTicks;
	      var style = layoutProps.style;
	      var padding = layoutProps.padding;
	      var isVertical = layoutProps.isVertical;
	      var offset = layoutProps.offset;
	      var orientation = layoutProps.orientation;
	
	      var xPadding = orientation === "right" ? padding.right : padding.left;
	      var yPadding = orientation === "top" ? padding.top : padding.bottom;
	      var sign = -orientationSign[orientation];
	      var xOffset = props.crossAxis ? offset.x - xPadding : 0;
	      var yOffset = props.crossAxis ? offset.y - yPadding : 0;
	      var x2 = isVertical ? sign * (props.width - (padding.left + padding.right)) : 0;
	      var y2 = isVertical ? 0 : sign * (props.height - (padding.top + padding.bottom));
	      return ticks.map(function (tick, index) {
	        // determine the position and translation of each gridline
	        var position = scale(tick);
	        return _react2["default"].createElement(_grid2["default"], { key: "grid-" + index,
	          tick: stringTicks ? props.tickValues[tick - 1] : tick,
	          x2: x2,
	          y2: y2,
	          xTransform: isVertical ? -xOffset : position,
	          yTransform: isVertical ? position : yOffset,
	          style: style.grid
	        });
	      });
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props, layoutProps) {
	      if (!props.label) {
	        return undefined;
	      }
	      var newProps = this.getLableProps(props, layoutProps);
	      return props.label.props ? _react2["default"].cloneElement(props.label, newProps) : _react2["default"].createElement(_victoryCore.VictoryLabel, newProps, props.label);
	    }
	  }, {
	    key: "getLableProps",
	    value: function getLableProps(props, layoutProps) {
	      var componentProps = props.label.props || {};
	      var style = layoutProps.style;
	      var orientation = layoutProps.orientation;
	      var padding = layoutProps.padding;
	      var labelPadding = layoutProps.labelPadding;
	      var isVertical = layoutProps.isVertical;
	
	      var sign = orientationSign[orientation];
	      var hPadding = padding.left + padding.right;
	      var vPadding = padding.top + padding.bottom;
	      var x = isVertical ? -((props.height - vPadding) / 2) - padding.top : (props.width - hPadding) / 2 + padding.left;
	      var y = sign * labelPadding;
	      var verticalAnchor = sign < 0 ? "end" : "start";
	      var transform = isVertical ? "rotate(-90)" : "";
	      return {
	        key: "label",
	        x: componentProps.x || x,
	        y: componentProps.y || y,
	        textAnchor: componentProps.textAnchor || "middle",
	        verticalAnchor: componentProps.verticalAnchor || verticalAnchor,
	        style: (0, _lodashObjectDefaults2["default"])({}, style.axisLabel, componentProps.style),
	        transform: componentProps.transform || transform
	      };
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      // If animating, return a `VictoryAnimation` element that will create
	      // a new `VictoryAxis` with nearly identical props, except (1) tweened
	      // and (2) `animate` set to null so we don't recurse forever.
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var whitelist = ["style", "domain", "range", "tickCount", "tickValues", "labelPadding", "offsetX", "offsetY", "padding", "width", "height"];
	        var animateData = (0, _lodashObjectPick2["default"])(this.props, whitelist);
	        return _react2["default"].createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2["default"].createElement(VictoryAxis, _extends({}, _this2.props, props, { animate: null }));
	          }
	        );
	      }
	      var layoutProps = this.getLayoutProps(this.props);
	      var tickProps = this.getTickProps(this.props);
	      var style = layoutProps.style;
	
	      var transform = _helperMethods2["default"].getTransform(this.props, layoutProps);
	      var group = _react2["default"].createElement(
	        "g",
	        { style: style.parent, transform: transform },
	        this.renderLabel(this.props, layoutProps),
	        this.renderTicks(this.props, layoutProps, tickProps),
	        this.renderLine(this.props, layoutProps),
	        this.renderGrid(this.props, layoutProps, tickProps)
	      );
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: style.parent },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "role",
	    value: "axis",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      /**
	       * The animate prop specifies props for victory-animation to use. It this prop is
	       * not given, the axis will not tween between changing data / style props.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * @examples {velocity: 0.02, onEnd: () => alert("done!")}
	       */
	      animate: _react.PropTypes.object,
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
	      domain: _victoryCore.PropTypes.domain,
	      /**
	       * The height prop specifies the height of the chart container element in pixels.
	       */
	      height: _victoryCore.PropTypes.nonNegative,
	      /**
	       * The label prop specifies the label for your axis. This prop can be a string or
	       * a label component.
	       */
	      label: _react.PropTypes.any,
	      /**
	       * The labelPadding prop specifies the padding in pixels for your axis label.
	       */
	      labelPadding: _react.PropTypes.number,
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
	       * The style prop specifies styles for your chart. Victory Axis relies on Radium,
	       * so valid Radium style objects should work for this prop, however height, width, and margin
	       * are used to calculate range, and need to be expressed as a number of pixels.
	       * Styles for axis lines, gridlines, and ticks are scoped to separate props.
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
	       * The tickCount prop specifies how many ticks should be drawn on the axis if
	       * tickValues are not explicitly provided.
	       */
	      tickCount: _victoryCore.PropTypes.nonNegative,
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
	       * The width props specifies the width of the chart container element in pixels
	       */
	      width: _victoryCore.PropTypes.nonNegative
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      height: 300,
	      padding: 50,
	      scale: "linear",
	      standalone: true,
	      tickCount: 5,
	      width: 450
	    },
	    enumerable: true
	  }, {
	    key: "getDomain",
	    value: _helperMethods2["default"].getDomain.bind(_helperMethods2["default"]),
	    enumerable: true
	  }, {
	    key: "getAxis",
	    value: _helperMethods2["default"].getAxis.bind(_helperMethods2["default"]),
	    enumerable: true
	  }, {
	    key: "getScale",
	    value: _helperMethods2["default"].getScale.bind(_helperMethods2["default"]),
	    enumerable: true
	  }, {
	    key: "getStyles",
	    value: getStyles,
	    enumerable: true
	  }]);
	
	  return VictoryAxis;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryAxis;
	module.exports = exports["default"];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(73),
	    bindCallback = __webpack_require__(25),
	    pickByArray = __webpack_require__(75),
	    pickByCallback = __webpack_require__(76),
	    restParam = __webpack_require__(28);
	
	/**
	 * Creates an object composed of the picked `object` properties. Property
	 * names may be specified as individual arguments or as arrays of property
	 * names. If `predicate` is provided it's invoked for each property of `object`
	 * picking the properties `predicate` returns truthy for. The predicate is
	 * bound to `thisArg` and invoked with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to pick, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.pick(object, 'user');
	 * // => { 'user': 'fred' }
	 *
	 * _.pick(object, _.isString);
	 * // => { 'user': 'fred' }
	 */
	var pick = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  return typeof props[0] == 'function'
	    ? pickByCallback(object, bindCallback(props[0], props[1], 3))
	    : pickByArray(object, baseFlatten(props));
	});
	
	module.exports = pick;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(74),
	    isArguments = __webpack_require__(18),
	    isArray = __webpack_require__(19),
	    isArrayLike = __webpack_require__(13),
	    isObjectLike = __webpack_require__(12);
	
	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(34);
	
	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);
	
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}
	
	module.exports = pickByArray;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(56);
	
	/**
	 * A specialized version of `_.pick` which picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}
	
	module.exports = pickByCallback;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var AxisLine = (function (_React$Component) {
	  _inherits(AxisLine, _React$Component);
	
	  function AxisLine() {
	    _classCallCheck(this, AxisLine);
	
	    _get(Object.getPrototypeOf(AxisLine.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(AxisLine, [{
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement("line", this.props);
	    }
	  }], [{
	    key: "role",
	    value: "line",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      x1: _react.PropTypes.number,
	      x2: _react.PropTypes.number,
	      y1: _react.PropTypes.number,
	      y2: _react.PropTypes.number,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return AxisLine;
	})(_react2["default"].Component);
	
	exports["default"] = AxisLine;
	module.exports = exports["default"];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var GridLine = (function (_React$Component) {
	  _inherits(GridLine, _React$Component);
	
	  function GridLine() {
	    _classCallCheck(this, GridLine);
	
	    _get(Object.getPrototypeOf(GridLine.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(GridLine, [{
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "g",
	        { transform: "translate(" + this.props.xTransform + ", " + this.props.yTransform + ")" },
	        _react2["default"].createElement("line", {
	          x2: this.props.x2,
	          y2: this.props.y2,
	          style: _victoryCore.Helpers.evaluateStyle(this.props.style, this.props.tick)
	        })
	      );
	    }
	  }], [{
	    key: "role",
	    value: "grid",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      tick: _react.PropTypes.any,
	      x2: _react.PropTypes.number,
	      y2: _react.PropTypes.number,
	      xTransform: _react.PropTypes.number,
	      yTransform: _react.PropTypes.number,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return GridLine;
	})(_react2["default"].Component);
	
	exports["default"] = GridLine;
	module.exports = exports["default"];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var Tick = (function (_React$Component) {
	  _inherits(Tick, _React$Component);
	
	  function Tick() {
	    _classCallCheck(this, Tick);
	
	    _get(Object.getPrototypeOf(Tick.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(Tick, [{
	    key: "getPosition",
	    value: function getPosition(props, isVertical) {
	      var orientationSign = { top: -1, left: -1, right: 1, bottom: 1 };
	      var style = props.style.ticks;
	      var tickSpacing = style.size + style.padding;
	      var sign = orientationSign[props.orientation];
	      return {
	        x: isVertical ? sign * tickSpacing : 0,
	        x2: isVertical ? sign * style.size : 0,
	        y: isVertical ? 0 : sign * tickSpacing,
	        y2: isVertical ? 0 : sign * style.size
	      };
	    }
	  }, {
	    key: "getAnchors",
	    value: function getAnchors(props, isVertical) {
	      var anchorOrientation = { top: "end", left: "end", right: "start", bottom: "start" };
	      var anchor = anchorOrientation[props.orientation];
	      return {
	        textAnchor: isVertical ? anchor : "middle",
	        verticalAnchor: isVertical ? "middle" : anchor
	      };
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props, position, isVertical) {
	      if (!props.label) {
	        return undefined;
	      }
	      var componentProps = props.label.props ? props.label.props : {};
	      var style = componentProps.style || props.style.tickLabels;
	      var anchors = this.getAnchors(props, isVertical);
	      var newProps = {
	        x: position.x,
	        y: position.y,
	        textAnchor: componentProps.textAnchor || anchors.textAnchor,
	        verticalAnchor: componentProps.verticalAnchor || anchors.verticalAnchor,
	        style: _victoryCore.Helpers.evaluateStyle(style, props.tick)
	      };
	      return props.label.props ? _react2["default"].cloneElement(props.label, newProps) : _react2["default"].createElement(_victoryCore.VictoryLabel, newProps, props.label);
	    }
	  }, {
	    key: "renderTick",
	    value: function renderTick(props, position) {
	      return _react2["default"].createElement("line", {
	        x: position.x,
	        x2: position.x2,
	        y: position.y,
	        y2: position.y2,
	        style: _victoryCore.Helpers.evaluateStyle(props.style.ticks, props.ticks)
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var isVertical = this.props.orientation === "left" || this.props.orientation === "right";
	      var transform = isVertical ? "translate(0, " + this.props.position + ")" : "translate(" + this.props.position + ", 0)";
	      var position = this.getPosition(this.props, isVertical);
	      return _react2["default"].createElement(
	        "g",
	        { transform: transform },
	        this.renderTick(this.props, position),
	        this.renderLabel(this.props, position, isVertical)
	      );
	    }
	  }], [{
	    key: "role",
	    value: "tick",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      position: _react.PropTypes.number,
	      tick: _react.PropTypes.any,
	      orientation: _react.PropTypes.oneOf(["top", "bottom", "left", "right"]),
	      style: _react.PropTypes.object,
	      label: _react.PropTypes.any
	    },
	    enumerable: true
	  }]);
	
	  return Tick;
	})(_react2["default"].Component);
	
	exports["default"] = Tick;
	module.exports = exports["default"];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashLangIsFunction = __webpack_require__(10);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _lodashCollectionIncludes = __webpack_require__(81);
	
	var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);
	
	var _lodashArrayWithout = __webpack_require__(87);
	
	var _lodashArrayWithout2 = _interopRequireDefault(_lodashArrayWithout);
	
	var _lodashUtilityRange = __webpack_require__(93);
	
	var _lodashUtilityRange2 = _interopRequireDefault(_lodashUtilityRange);
	
	var _helpersScale = __webpack_require__(94);
	
	var _helpersScale2 = _interopRequireDefault(_helpersScale);
	
	var _helpersAxis = __webpack_require__(101);
	
	var _helpersAxis2 = _interopRequireDefault(_helpersAxis);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	var _victoryCore = __webpack_require__(1);
	
	module.exports = {
	  // exposed for use by VictoryChart
	  getDomain: function getDomain(props, axis) {
	    if (axis && axis !== this.getAxis(props)) {
	      return undefined;
	    }
	    if (props.domain) {
	      return props.domain;
	    } else if (props.tickValues) {
	      return _helpersDomain2["default"].getDomainFromTickValues(props);
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
	    var scale = _helpersScale2["default"].getBaseScale(props, axis);
	    var domain = this.getDomain(props) || scale.domain();
	    scale.range(_victoryCore.Helpers.getRange(props, axis));
	    scale.domain(domain);
	    return scale;
	  },
	
	  getTicks: function getTicks(props, scale) {
	    if (props.tickValues) {
	      if (_helpersAxis2["default"].stringTicks(props)) {
	        return (0, _lodashUtilityRange2["default"])(1, props.tickValues.length + 1);
	      }
	      return props.tickValues;
	    } else if (scale.ticks && (0, _lodashLangIsFunction2["default"])(scale.ticks)) {
	      var ticks = scale.ticks(props.tickCount);
	      if (props.crossAxis) {
	        return (0, _lodashCollectionIncludes2["default"])(ticks, 0) ? (0, _lodashArrayWithout2["default"])(ticks, 0) : ticks;
	      }
	      return ticks;
	    }
	    return scale.domain();
	  },
	
	  getTickFormat: function getTickFormat(props, tickProps) {
	    var scale = tickProps.scale;
	    var ticks = tickProps.ticks;
	
	    if (props.tickFormat && (0, _lodashLangIsFunction2["default"])(props.tickFormat)) {
	      return props.tickFormat;
	    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
	      return function (x, index) {
	        return props.tickFormat[index];
	      };
	    } else if (_helpersAxis2["default"].stringTicks(props)) {
	      return function (x, index) {
	        return props.tickValues[index];
	      };
	    } else if (scale.tickFormat && (0, _lodashLangIsFunction2["default"])(scale.tickFormat)) {
	      return scale.tickFormat(ticks.length);
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
	    var isVertical = _helpersAxis2["default"].isVertical(props);
	    // TODO: magic numbers
	    return props.label ? labelStyle.fontSize * (isVertical ? 2.3 : 1.6) : 0;
	  },
	
	  getOffset: function getOffset(props, style) {
	    var padding = _victoryCore.Helpers.getPadding(props);
	    var isVertical = _helpersAxis2["default"].isVertical(props);
	    var orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
	    var labelPadding = this.getLabelPadding(props, style);
	    var xPadding = orientation === "right" ? padding.right : padding.left;
	    var yPadding = orientation === "top" ? padding.top : padding.bottom;
	    var fontSize = style.axisLabel.fontSize;
	    var offsetX = props.offsetX || xPadding;
	    var offsetY = props.offsetY || yPadding;
	    var totalPadding = fontSize + 2 * style.ticks.size + labelPadding;
	    var minimumPadding = 1.2 * fontSize; // TODO: magic numbers
	    var x = isVertical ? totalPadding : minimumPadding;
	    var y = isVertical ? minimumPadding : totalPadding;
	    return {
	      x: offsetX || x,
	      y: offsetY || y
	    };
	  },
	
	  getTransform: function getTransform(props, layoutProps) {
	    var offset = layoutProps.offset;
	    var orientation = layoutProps.orientation;
	
	    var translate = ({
	      top: [0, offset.y],
	      bottom: [0, props.height - offset.y],
	      left: [offset.x, 0],
	      right: [props.width - offset.x, 0]
	    })[orientation];
	    return "translate(" + translate[0] + ", " + translate[1] + ")";
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(82),
	    getLength = __webpack_require__(14),
	    isArray = __webpack_require__(19),
	    isIterateeCall = __webpack_require__(27),
	    isLength = __webpack_require__(16),
	    isString = __webpack_require__(84),
	    values = __webpack_require__(85);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Checks if `target` is in `collection` using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	 * from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @alias contains, include
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} target The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	 * // => true
	 *
	 * _.includes('pebbles', 'eb');
	 * // => true
	 */
	function includes(collection, target, fromIndex, guard) {
	  var length = collection ? getLength(collection) : 0;
	  if (!isLength(length)) {
	    collection = values(collection);
	    length = collection.length;
	  }
	  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
	    fromIndex = 0;
	  } else {
	    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	  }
	  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
	    ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, target, fromIndex) > -1);
	}
	
	module.exports = includes;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(83);
	
	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
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
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
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
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(86),
	    keys = __webpack_require__(7);
	
	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	  return baseValues(object, keys(object));
	}
	
	module.exports = values;


/***/ },
/* 86 */
/***/ function(module, exports) {

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
	  var index = -1,
	      length = props.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}
	
	module.exports = baseValues;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(88),
	    isArrayLike = __webpack_require__(13),
	    restParam = __webpack_require__(28);
	
	/**
	 * Creates an array excluding all provided values using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to filter.
	 * @param {...*} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.without([1, 2, 1, 3], 1, 2);
	 * // => [3]
	 */
	var without = restParam(function(array, values) {
	  return isArrayLike(array)
	    ? baseDifference(array, values)
	    : [];
	});
	
	module.exports = without;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(82),
	    cacheIndexOf = __webpack_require__(89),
	    createCache = __webpack_require__(90);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];
	
	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;
	
	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];
	
	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
	
	  return result ? 0 : -1;
	}
	
	module.exports = cacheIndexOf;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var SetCache = __webpack_require__(91),
	    getNative = __webpack_require__(8);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}
	
	module.exports = createCache;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var cachePush = __webpack_require__(92),
	    getNative = __webpack_require__(8);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;
	
	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}
	
	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;
	
	module.exports = SetCache;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}
	
	module.exports = cachePush;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(27);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. If `end` is not specified it's
	 * set to `start` with `start` then set to `0`. If `end` is less than `start`
	 * a zero-length range is created unless a negative `step` is specified.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
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
	function range(start, end, step) {
	  if (step && isIterateeCall(start, end, step)) {
	    end = step = undefined;
	  }
	  start = +start || 0;
	  step = step == null ? 1 : (+step || 0);
	
	  if (end == null) {
	    end = start;
	    start = 0;
	  } else {
	    end = +end || 0;
	  }
	  // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	  // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = range;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashArrayFlatten = __webpack_require__(95);
	
	var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);
	
	var _lodashCollectionIncludes = __webpack_require__(81);
	
	var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);
	
	var _lodashLangIsFunction = __webpack_require__(10);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _victoryCore = __webpack_require__(1);
	
	var _d3Scale = __webpack_require__(96);
	
	var _d3Scale2 = _interopRequireDefault(_d3Scale);
	
	var supportedScaleStrings = ["linear", "time", "log", "sqrt"];
	
	module.exports = {
	  validScale: function validScale(scale) {
	    if (typeof scale === "function") {
	      return (0, _lodashLangIsFunction2["default"])(scale.copy) && (0, _lodashLangIsFunction2["default"])(scale.domain) && (0, _lodashLangIsFunction2["default"])(scale.range);
	    } else if (typeof scale === "string") {
	      return (0, _lodashCollectionIncludes2["default"])(supportedScaleStrings, scale);
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
	      return (0, _lodashLangIsFunction2["default"])(scale) ? scale : _d3Scale2["default"][scale]();
	    }
	  },
	
	  getScaleTypeFromData: function getScaleTypeFromData(props, axis) {
	    if (!props.data) {
	      return "linear";
	    }
	    var accessor = _victoryCore.Helpers.createAccessor(props[axis]);
	    var allData = (0, _lodashArrayFlatten2["default"])(props.data);
	    var axisData = allData.map(accessor);
	    return _victoryCore.Collection.containsDates(axisData) ? "time" : "linear";
	  },
	
	  getBaseScale: function getBaseScale(props, axis) {
	    var scale = this.getScaleFromProps(props, axis);
	    if (scale) {
	      return scale;
	    }
	    return _d3Scale2["default"][this.getScaleTypeFromData(props, axis)]();
	  },
	
	  getScaleType: function getScaleType(props, axis) {
	    var scale = this.getScaleFromProps(props, axis);
	    // if the scale was not given in props, it will be set to linear or time depending on data
	    if (!scale) {
	      return this.getScaleTypeFromData(props, axis);
	    } else if (typeof scale === "string") {
	      return (0, _lodashCollectionIncludes2["default"])(supportedScaleStrings, scale) ? scale : "invalid";
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(73),
	    isIterateeCall = __webpack_require__(27);
	
	/**
	 * Flattens a nested array. If `isDeep` is `true` the array is recursively
	 * flattened, otherwise it's only flattened a single level.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, 3, [4]]]);
	 * // => [1, 2, 3, [4]]
	 *
	 * // using `isDeep`
	 * _.flatten([1, [2, 3, [4]]], true);
	 * // => [1, 2, 3, 4]
	 */
	function flatten(array, isDeep, guard) {
	  var length = array ? array.length : 0;
	  if (guard && isIterateeCall(array, isDeep, guard)) {
	    isDeep = false;
	  }
	  return length ? baseFlatten(array, isDeep) : [];
	}
	
	module.exports = flatten;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(52), __webpack_require__(51), __webpack_require__(97), __webpack_require__(98), __webpack_require__(99), __webpack_require__(100)) :
	  typeof define === 'function' && define.amd ? define('d3-scale', ['exports', 'd3-color', 'd3-interpolate', 'd3-arrays', 'd3-format', 'd3-time-format', 'd3-time'], factory) :
	  factory((global.d3_scale = {}),global.d3_color,global.d3_interpolate,global.d3_arrays,global.d3_format,global.d3_time_format,global.d3_time);
	}(this, function (exports,d3Color,d3Interpolate,d3Arrays,d3Format,d3TimeFormat,d3Time) { 'use strict';
	
	  function steps(length, start, step) {
	    var steps = new Array(length), i = -1;
	    while (++i < length) steps[i] = start + step * i;
	    return steps;
	  }
	
	  function newOrdinal(domain, ranger) {
	    var index,
	        range,
	        rangeBand;
	
	    function scale(x) {
	      var k = x + "", i = index.get(k);
	      if (!i) {
	        if (ranger.t !== "range") return;
	        index.set(k, i = domain.push(x));
	      }
	      return range[(i - 1) % range.length];
	    }
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = [];
	      index = d3Arrays.map();
	      var i = -1, n = x.length, xi, xk;
	      while (++i < n) if (!index.has(xk = (xi = x[i]) + "")) index.set(xk, domain.push(xi));
	      return scale[ranger.t].apply(scale, ranger.a);
	    };
	
	    scale.range = function(x) {
	      if (!arguments.length) return range.slice();
	      range = x.slice();
	      rangeBand = 0;
	      ranger = {t: "range", a: arguments};
	      return scale;
	    };
	
	    scale.rangePoints = function(x, padding) {
	      padding = arguments.length < 2 ? 0 : +padding;
	      var start = +x[0],
	          stop = +x[1],
	          step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
	      range = steps(domain.length, start + step * padding / 2, step);
	      rangeBand = 0;
	      ranger = {t: "rangePoints", a: arguments};
	      return scale;
	    };
	
	    scale.rangeRoundPoints = function(x, padding) {
	      padding = arguments.length < 2 ? 0 : +padding;
	      var start = +x[0],
	          stop = +x[1],
	          step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0; // bitwise floor for symmetry
	      range = steps(domain.length, start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
	      rangeBand = 0;
	      ranger = {t: "rangeRoundPoints", a: arguments};
	      return scale;
	    };
	
	    scale.rangeBands = function(x, padding, outerPadding) {
	      padding = arguments.length < 2 ? 0 : +padding;
	      outerPadding = arguments.length < 3 ? padding : +outerPadding;
	      var reverse = +x[1] < +x[0],
	          start = +x[reverse - 0],
	          stop = +x[1 - reverse],
	          step = (stop - start) / (domain.length - padding + 2 * outerPadding);
	      range = steps(domain.length, start + step * outerPadding, step);
	      if (reverse) range.reverse();
	      rangeBand = step * (1 - padding);
	      ranger = {t: "rangeBands", a: arguments};
	      return scale;
	    };
	
	    scale.rangeRoundBands = function(x, padding, outerPadding) {
	      padding = arguments.length < 2 ? 0 : +padding;
	      outerPadding = arguments.length < 3 ? padding : +outerPadding;
	      var reverse = +x[1] < +x[0],
	          start = +x[reverse - 0],
	          stop = +x[1 - reverse],
	          step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
	      range = steps(domain.length, start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
	      if (reverse) range.reverse();
	      rangeBand = Math.round(step * (1 - padding));
	      ranger = {t: "rangeRoundBands", a: arguments};
	      return scale;
	    };
	
	    scale.rangeBand = function() {
	      return rangeBand;
	    };
	
	    scale.rangeExtent = function() {
	      var t = ranger.a[0], start = t[0], stop = t[t.length - 1];
	      if (stop < start) t = stop, stop = start, start = t;
	      return [start, stop];
	    };
	
	    scale.copy = function() {
	      return newOrdinal(domain, ranger);
	    };
	
	    return scale.domain(domain);
	  }
	
	  function ordinal() {
	    return newOrdinal([], {t: "range", a: [[]]});
	  };
	
	  function category10() {
	    return ordinal().range([
	      "#1f77b4",
	      "#ff7f0e",
	      "#2ca02c",
	      "#d62728",
	      "#9467bd",
	      "#8c564b",
	      "#e377c2",
	      "#7f7f7f",
	      "#bcbd22",
	      "#17becf"
	    ]);
	  };
	
	  function category20b() {
	    return ordinal().range([
	      "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
	      "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
	      "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
	      "#843c39", "#ad494a", "#d6616b", "#e7969c",
	      "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
	    ]);
	  };
	
	  function category20c() {
	    return ordinal().range([
	      "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
	      "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
	      "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
	      "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
	      "#636363", "#969696", "#bdbdbd", "#d9d9d9"
	    ]);
	  };
	
	  function category20() {
	    return ordinal().range([
	      "#1f77b4", "#aec7e8",
	      "#ff7f0e", "#ffbb78",
	      "#2ca02c", "#98df8a",
	      "#d62728", "#ff9896",
	      "#9467bd", "#c5b0d5",
	      "#8c564b", "#c49c94",
	      "#e377c2", "#f7b6d2",
	      "#7f7f7f", "#c7c7c7",
	      "#bcbd22", "#dbdb8d",
	      "#17becf", "#9edae5"
	    ]);
	  };
	
	  function nice(domain, step) {
	    domain = domain.slice();
	    if (!step) return domain;
	
	    var i0 = 0,
	        i1 = domain.length - 1,
	        x0 = domain[i0],
	        x1 = domain[i1],
	        t;
	
	    if (x1 < x0) {
	      t = i0, i0 = i1, i1 = t;
	      t = x0, x0 = x1, x1 = t;
	    }
	
	    domain[i0] = Math.floor(x0 / step) * step;
	    domain[i1] = Math.ceil(x1 / step) * step;
	    return domain;
	  };
	
	  var e10 = Math.sqrt(50);
	  var e5 = Math.sqrt(10);
	  var e2 = Math.sqrt(2);
	  function tickRange(domain, count) {
	    if (count == null) count = 10;
	
	    var start = domain[0],
	        stop = domain[domain.length - 1];
	
	    if (stop < start) error = stop, stop = start, start = error;
	
	    var span = stop - start,
	        step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10)),
	        error = span / count / step;
	
	    // Filter ticks to get closer to the desired count.
	    if (error >= e10) step *= 10;
	    else if (error >= e5) step *= 5;
	    else if (error >= e2) step *= 2;
	
	    // Round start and stop values to step interval.
	    return [
	      Math.ceil(start / step) * step,
	      Math.floor(stop / step) * step + step / 2, // inclusive
	      step
	    ];
	  };
	
	  function ticks(domain, count) {
	    return d3Arrays.range.apply(null, tickRange(domain, count));
	  };
	
	  function tickFormat(domain, count, specifier) {
	    var range = tickRange(domain, count);
	    if (specifier == null) {
	      specifier = ",." + d3Format.precisionFixed(range[2]) + "f";
	    } else {
	      switch (specifier = d3Format.formatSpecifier(specifier), specifier.type) {
	        case "s": {
	          var value = Math.max(Math.abs(range[0]), Math.abs(range[1]));
	          if (specifier.precision == null) specifier.precision = d3Format.precisionPrefix(range[2], value);
	          return d3Format.formatPrefix(specifier, value);
	        }
	        case "":
	        case "e":
	        case "g":
	        case "p":
	        case "r": {
	          if (specifier.precision == null) specifier.precision = d3Format.precisionRound(range[2], Math.max(Math.abs(range[0]), Math.abs(range[1]))) - (specifier.type === "e");
	          break;
	        }
	        case "f":
	        case "%": {
	          if (specifier.precision == null) specifier.precision = d3Format.precisionFixed(range[2]) - (specifier.type === "%") * 2;
	          break;
	        }
	      }
	    }
	    return d3Format.format(specifier);
	  };
	
	  function uninterpolateClamp(a, b) {
	    b = (b -= a = +a) || 1 / b;
	    return function(x) {
	      return Math.max(0, Math.min(1, (x - a) / b));
	    };
	  }
	
	  function uninterpolateNumber(a, b) {
	    b = (b -= a = +a) || 1 / b;
	    return function(x) {
	      return (x - a) / b;
	    };
	  }
	
	  function bilinear(domain, range, uninterpolate, interpolate) {
	    var u = uninterpolate(domain[0], domain[1]),
	        i = interpolate(range[0], range[1]);
	    return function(x) {
	      return i(u(x));
	    };
	  }
	
	  function polylinear(domain, range, uninterpolate, interpolate) {
	    var k = Math.min(domain.length, range.length) - 1,
	        u = new Array(k),
	        i = new Array(k),
	        j = -1;
	
	    // Handle descending domains.
	    if (domain[k] < domain[0]) {
	      domain = domain.slice().reverse();
	      range = range.slice().reverse();
	    }
	
	    while (++j < k) {
	      u[j] = uninterpolate(domain[j], domain[j + 1]);
	      i[j] = interpolate(range[j], range[j + 1]);
	    }
	
	    return function(x) {
	      var j = d3Arrays.bisect(domain, x, 1, k) - 1;
	      return i[j](u[j](x));
	    };
	  }
	
	  function newLinear(domain, range, interpolate, clamp) {
	    var output,
	        input;
	
	    function rescale() {
	      var linear = Math.min(domain.length, range.length) > 2 ? polylinear : bilinear,
	          uninterpolate = clamp ? uninterpolateClamp : uninterpolateNumber;
	      output = linear(domain, range, uninterpolate, interpolate);
	      input = linear(range, domain, uninterpolate, d3Interpolate.number);
	      return scale;
	    }
	
	    function scale(x) {
	      return output(x);
	    }
	
	    scale.invert = function(y) {
	      return input(y);
	    };
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = x.map(Number);
	      return rescale();
	    };
	
	    scale.range = function(x) {
	      if (!arguments.length) return range.slice();
	      range = x.slice();
	      return rescale();
	    };
	
	    scale.rangeRound = function(x) {
	      return scale.range(x).interpolate(d3Interpolate.round);
	    };
	
	    scale.clamp = function(x) {
	      if (!arguments.length) return clamp;
	      clamp = !!x;
	      return rescale();
	    };
	
	    scale.interpolate = function(x) {
	      if (!arguments.length) return interpolate;
	      interpolate = x;
	      return rescale();
	    };
	
	    scale.ticks = function(count) {
	      return ticks(domain, count);
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      return tickFormat(domain, count, specifier);
	    };
	
	    scale.nice = function(count) {
	      domain = nice(domain, tickRange(domain, count)[2]);
	      return rescale();
	    };
	
	    scale.copy = function() {
	      return newLinear(domain, range, interpolate, clamp);
	    };
	
	    return rescale();
	  }
	
	  function rebind(scale, linear) {
	    scale.range = function() {
	      var x = linear.range.apply(linear, arguments);
	      return x === linear ? scale : x;
	    };
	
	    scale.rangeRound = function() {
	      var x = linear.rangeRound.apply(linear, arguments);
	      return x === linear ? scale : x;
	    };
	
	    scale.clamp = function() {
	      var x = linear.clamp.apply(linear, arguments);
	      return x === linear ? scale : x;
	    };
	
	    scale.interpolate = function() {
	      var x = linear.interpolate.apply(linear, arguments);
	      return x === linear ? scale : x;
	    };
	
	    return scale;
	  };
	
	  function linear() {
	    return newLinear([0, 1], [0, 1], d3Interpolate.value, false);
	  };
	
	  function cubehelix() {
	    return linear()
	        .interpolate(d3Interpolate.cubehelixLong)
	        .range([d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0)]);
	  };
	
	  function newIdentity(domain) {
	
	    function scale(x) {
	      return +x;
	    }
	
	    scale.invert = scale;
	
	    scale.domain = scale.range = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = x.map(Number);
	      return scale;
	    };
	
	    scale.ticks = function(count) {
	      return ticks(domain, count);
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      return tickFormat(domain, count, specifier);
	    };
	
	    scale.copy = function() {
	      return newIdentity(domain);
	    };
	
	    return scale;
	  }
	
	  function identity() {
	    return newIdentity([0, 1]);
	  };
	
	  var tickFormat10 = d3Format.format(".0e");
	  var tickFormatOther = d3Format.format(",");
	  function newLog(linear, base, domain) {
	
	    function log(x) {
	      return (domain[0] < 0 ? -Math.log(x > 0 ? 0 : -x) : Math.log(x < 0 ? 0 : x)) / Math.log(base);
	    }
	
	    function pow(x) {
	      return domain[0] < 0 ? -Math.pow(base, -x) : Math.pow(base, x);
	    }
	
	    function scale(x) {
	      return linear(log(x));
	    }
	
	    scale.invert = function(x) {
	      return pow(linear.invert(x));
	    };
	
	    scale.base = function(x) {
	      if (!arguments.length) return base;
	      base = +x;
	      return scale.domain(domain);
	    };
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = x.map(Number);
	      linear.domain(domain.map(log));
	      return scale;
	    };
	
	    scale.nice = function() {
	      var x = nice(linear.domain(), 1);
	      linear.domain(x);
	      domain = x.map(pow);
	      return scale;
	    };
	
	    scale.ticks = function() {
	      var u = domain[0],
	          v = domain[domain.length - 1];
	      if (v < u) i = u, u = v, v = i;
	      var i = Math.floor(log(u)),
	          j = Math.ceil(log(v)),
	          k,
	          t,
	          n = base % 1 ? 2 : base,
	          ticks = [];
	
	      if (isFinite(j - i)) {
	        if (u > 0) {
	          for (--j, k = 1; k < n; ++k) if ((t = pow(i) * k) < u) continue; else ticks.push(t);
	          while (++i < j) for (k = 1; k < n; ++k) ticks.push(pow(i) * k);
	          for (k = 1; k < n; ++k) if ((t = pow(i) * k) > v) break; else ticks.push(t);
	        } else {
	          for (++i, k = n - 1; k >= 1; --k) if ((t = pow(i) * k) < u) continue; else ticks.push(t);
	          while (++i < j) for (k = n - 1; k >= 1; --k) ticks.push(pow(i) * k);
	          for (k = n - 1; k >= 1; --k) if ((t = pow(i) * k) > v) break; else ticks.push(t);
	        }
	      }
	
	      return ticks;
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      if (specifier == null) specifier = base === 10 ? tickFormat10 : tickFormatOther;
	      else if (typeof specifier !== "function") specifier = d3Format.format(specifier);
	      if (count == null) return specifier;
	      var k = Math.min(base, scale.ticks().length / count),
	          f = domain[0] > 0 ? (e = 1e-12, Math.ceil) : (e = -1e-12, Math.floor),
	          e;
	      return function(d) {
	        return pow(f(log(d) + e)) / d >= k ? specifier(d) : "";
	      };
	    };
	
	    scale.copy = function() {
	      return newLog(linear.copy(), base, domain);
	    };
	
	    return rebind(scale, linear);
	  }
	
	  function log() {
	    return newLog(linear(), 10, [1, 10]);
	  };
	
	  function newPow(linear, exponent, domain) {
	
	    function powp(x) {
	      return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	    }
	
	    function powb(x) {
	      return x < 0 ? -Math.pow(-x, 1 / exponent) : Math.pow(x, 1 / exponent);
	    }
	
	    function scale(x) {
	      return linear(powp(x));
	    }
	
	    scale.invert = function(x) {
	      return powb(linear.invert(x));
	    };
	
	    scale.exponent = function(x) {
	      if (!arguments.length) return exponent;
	      exponent = +x;
	      return scale.domain(domain);
	    };
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = x.map(Number);
	      linear.domain(domain.map(powp));
	      return scale;
	    };
	
	    scale.ticks = function(count) {
	      return ticks(domain, count);
	    };
	
	    scale.tickFormat = function(count, specifier) {
	      return tickFormat(domain, count, specifier);
	    };
	
	    scale.nice = function(count) {
	      return scale.domain(nice(domain, tickRange(domain, count)[2]));
	    };
	
	    scale.copy = function() {
	      return newPow(linear.copy(), exponent, domain);
	    };
	
	    return rebind(scale, linear);
	  }
	
	  function sqrt() {
	    return newPow(linear(), .5, [0, 1]);
	  };
	
	  function pow() {
	    return newPow(linear(), 1, [0, 1]);
	  };
	
	  function newQuantile(domain, range) {
	    var thresholds;
	
	    function rescale() {
	      var k = 0,
	          q = range.length;
	      thresholds = [];
	      while (++k < q) thresholds[k - 1] = d3Arrays.quantile(domain, k / q);
	      return scale;
	    }
	
	    function scale(x) {
	      if (!isNaN(x = +x)) return range[d3Arrays.bisect(thresholds, x)];
	    }
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      domain = [];
	      for (var i = 0, n = x.length, v; i < n; ++i) if (v = x[i], v != null && !isNaN(v = +v)) domain.push(v);
	      domain.sort(d3Arrays.ascending);
	      return rescale();
	    };
	
	    scale.range = function(x) {
	      if (!arguments.length) return range.slice();
	      range = x.slice();
	      return rescale();
	    };
	
	    scale.quantiles = function() {
	      return thresholds;
	    };
	
	    scale.invertExtent = function(y) {
	      y = range.indexOf(y);
	      return y < 0 ? [NaN, NaN] : [
	        y > 0 ? thresholds[y - 1] : domain[0],
	        y < thresholds.length ? thresholds[y] : domain[domain.length - 1]
	      ];
	    };
	
	    scale.copy = function() {
	      return newQuantile(domain, range); // copy on write!
	    };
	
	    return rescale();
	  }
	
	  function quantile() {
	    return newQuantile([], []);
	  };
	
	  function newQuantize(x0, x1, range) {
	    var kx, i;
	
	    function scale(x) {
	      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
	    }
	
	    function rescale() {
	      kx = range.length / (x1 - x0);
	      i = range.length - 1;
	      return scale;
	    }
	
	    scale.domain = function(x) {
	      if (!arguments.length) return [x0, x1];
	      x0 = +x[0];
	      x1 = +x[x.length - 1];
	      return rescale();
	    };
	
	    scale.range = function(x) {
	      if (!arguments.length) return range.slice();
	      range = x.slice();
	      return rescale();
	    };
	
	    scale.invertExtent = function(y) {
	      y = range.indexOf(y);
	      y = y < 0 ? NaN : y / kx + x0;
	      return [y, y + 1 / kx];
	    };
	
	    scale.copy = function() {
	      return newQuantize(x0, x1, range); // copy on write
	    };
	
	    return rescale();
	  }
	
	  function quantize() {
	    return newQuantize(0, 1, [0, 1]);
	  };
	
	  function rainbow() {
	    return linear()
	        .interpolate(d3Interpolate.cubehelixLong)
	        .domain([0, 0.5, 1.0])
	        .range([d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8), d3Color.cubehelix(260, 0.75, 0.35)]);
	  };
	
	  function newThreshold(domain, range, n) {
	
	    function scale(x) {
	      if (x <= x) return range[d3Arrays.bisect(domain, x, 0, n)];
	    }
	
	    scale.domain = function(x) {
	      if (!arguments.length) return domain.slice();
	      domain = x.slice(), n = Math.min(domain.length, range.length - 1);
	      return scale;
	    };
	
	    scale.range = function(x) {
	      if (!arguments.length) return range.slice();
	      range = x.slice(), n = Math.min(domain.length, range.length - 1);
	      return scale;
	    };
	
	    scale.invertExtent = function(y) {
	      return y = range.indexOf(y), [domain[y - 1], domain[y]];
	    };
	
	    scale.copy = function() {
	      return newThreshold(domain, range);
	    };
	
	    return scale;
	  };
	
	  function threshold() {
	    return newThreshold([.5], [0, 1], 1);
	  };
	
	  var millisecondsPerSecond = 1000;
	  var millisecondsPerMinute = millisecondsPerSecond * 60;
	  var millisecondsPerHour = millisecondsPerMinute * 60;
	  var millisecondsPerDay = millisecondsPerHour * 24;
	  var millisecondsPerWeek = millisecondsPerDay * 7;
	  var millisecondsPerMonth = millisecondsPerDay * 30;
	  var millisecondsPerYear = millisecondsPerDay * 365;
	  var bisectTickIntervals = d3Arrays.bisector(function(method) { return method[2]; }).right;
	  function newDate(t) {
	    return new Date(t);
	  }
	
	  function newTime(linear, year, month, week, day, hour, minute, second, millisecond, format) {
	    var formatMillisecond = format(".%L"),
	        formatSecond = format(":%S"),
	        formatMinute = format("%I:%M"),
	        formatHour = format("%I %p"),
	        formatDay = format("%a %d"),
	        formatWeek = format("%b %d"),
	        formatMonth = format("%B"),
	        formatYear = format("%Y");
	
	    var tickIntervals = [
	      [second,  1,      millisecondsPerSecond],
	      [second,  5,  5 * millisecondsPerSecond],
	      [second, 15, 15 * millisecondsPerSecond],
	      [second, 30, 30 * millisecondsPerSecond],
	      [minute,  1,      millisecondsPerMinute],
	      [minute,  5,  5 * millisecondsPerMinute],
	      [minute, 15, 15 * millisecondsPerMinute],
	      [minute, 30, 30 * millisecondsPerMinute],
	      [  hour,  1,      millisecondsPerHour  ],
	      [  hour,  3,  3 * millisecondsPerHour  ],
	      [  hour,  6,  6 * millisecondsPerHour  ],
	      [  hour, 12, 12 * millisecondsPerHour  ],
	      [   day,  1,      millisecondsPerDay   ],
	      [   day,  2,  2 * millisecondsPerDay   ],
	      [  week,  1,      millisecondsPerWeek  ],
	      [ month,  1,      millisecondsPerMonth ],
	      [ month,  3,  3 * millisecondsPerMonth ],
	      [  year,  1,      millisecondsPerYear  ]
	    ];
	
	    function scale(x) {
	      return linear(x);
	    }
	
	    scale.invert = function(x) {
	      return newDate(linear.invert(x));
	    };
	
	    scale.domain = function(x) {
	      if (!arguments.length) return linear.domain().map(newDate);
	      linear.domain(x);
	      return scale;
	    };
	
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
	            i = bisectTickIntervals(tickIntervals, target);
	        if (i === tickIntervals.length) {
	          step = tickRange([start / millisecondsPerYear, stop / millisecondsPerYear], interval)[2];
	          interval = year;
	        } else if (i) {
	          i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	          step = i[1];
	          interval = i[0];
	        } else {
	          step = tickRange([start, stop], interval)[2];
	          interval = millisecond;
	        }
	      }
	
	      return step == null ? interval : interval.every(step);
	    }
	
	    scale.ticks = function(interval, step) {
	      var domain = linear.domain(),
	          t0 = domain[0],
	          t1 = domain[domain.length - 1],
	          t;
	
	      if (t1 < t0) t = t0, t0 = t1, t1 = t;
	
	      return (interval = tickInterval(interval, t0, t1, step))
	          ? interval.range(t0, t1 + 1) // inclusive stop
	          : [];
	    };
	
	    scale.tickFormat = function(specifier) {
	      return specifier == null ? tickFormat : format(specifier);
	    };
	
	    scale.nice = function(interval, step) {
	      var domain = linear.domain(),
	          i0 = 0,
	          i1 = domain.length - 1,
	          t0 = domain[i0],
	          t1 = domain[i1],
	          t;
	
	      if (t1 < t0) {
	        t = i0, i0 = i1, i1 = t;
	        t = t0, t0 = t1, t1 = t;
	      }
	
	      if (interval = tickInterval(interval, t0, t1, step)) {
	        domain[i0] = +interval.floor(t0);
	        domain[i1] = +interval.ceil(t1);
	        linear.domain(domain);
	      }
	
	      return scale;
	    };
	
	    scale.copy = function() {
	      return newTime(linear.copy(), year, month, week, day, hour, minute, second, millisecond, format);
	    };
	
	    return rebind(scale, linear);
	  };
	
	  function time() {
	    return newTime(linear(), d3Time.year, d3Time.month, d3Time.week, d3Time.day, d3Time.hour, d3Time.minute, d3Time.second, d3Time.millisecond, d3TimeFormat.format).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	  };
	
	  function utcTime() {
	    return newTime(linear(), d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	  };
	
	  var version = "0.2.0";
	
	  exports.version = version;
	  exports.category10 = category10;
	  exports.category20b = category20b;
	  exports.category20c = category20c;
	  exports.category20 = category20;
	  exports.cubehelix = cubehelix;
	  exports.identity = identity;
	  exports.linear = linear;
	  exports.log = log;
	  exports.ordinal = ordinal;
	  exports.pow = pow;
	  exports.sqrt = sqrt;
	  exports.quantile = quantile;
	  exports.quantize = quantize;
	  exports.rainbow = rainbow;
	  exports.threshold = threshold;
	  exports.time = time;
	  exports.utcTime = utcTime;
	
	}));

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-arrays', ['exports'], factory) :
	  factory((global.d3_arrays = {}));
	}(this, function (exports) { 'use strict';
	
	  function ascending(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	  };
	
	  function bisector(compare) {
	    if (compare.length === 1) compare = ascendingComparator(compare);
	    return {
	      left: function(a, x, lo, hi) {
	        if (arguments.length < 3) lo = 0;
	        if (arguments.length < 4) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) < 0) lo = mid + 1;
	          else hi = mid;
	        }
	        return lo;
	      },
	      right: function(a, x, lo, hi) {
	        if (arguments.length < 3) lo = 0;
	        if (arguments.length < 4) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) > 0) hi = mid;
	          else lo = mid + 1;
	        }
	        return lo;
	      }
	    };
	  };
	
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
	  };
	
	  function number(x) {
	    return x === null ? NaN : +x;
	  };
	
	  function variance(array, f) {
	    var n = array.length,
	        m = 0,
	        a,
	        d,
	        s = 0,
	        i = -1,
	        j = 0;
	
	    if (arguments.length === 1) {
	      while (++i < n) {
	        if (!isNaN(a = number(array[i]))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    }
	
	    else {
	      while (++i < n) {
	        if (!isNaN(a = number(f(array[i], i, array)))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    }
	
	    if (j > 1) return s / (j - 1);
	  };
	
	  function deviation() {
	    var v = variance.apply(this, arguments);
	    return v ? Math.sqrt(v) : v;
	  };
	
	  function entries(map) {
	    var entries = [];
	    for (var key in map) entries.push({key: key, value: map[key]});
	    return entries;
	  };
	
	  function extent(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b,
	        c;
	
	    if (arguments.length === 1) {
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
	  };
	
	  function keys(map) {
	    var keys = [];
	    for (var key in map) keys.push(key);
	    return keys;
	  };
	
	  var prefix = "$";
	
	  function Map() {}
	
	  Map.prototype = map.prototype = {
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
	
	      if (arguments.length === 1) while (++i < n) map.set(i, object[i]);
	      else while (++i < n) map.set(f(o = object[i], i, object), o);
	    }
	
	    // Convert object to map.
	    else if (object) for (var key in object) map.set(key, object[key]);
	
	    return map;
	  }
	
	  function max(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b;
	
	    if (arguments.length === 1) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	    }
	
	    else {
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
	    }
	
	    return a;
	  };
	
	  function mean(array, f) {
	    var s = 0,
	        n = array.length,
	        a,
	        i = -1,
	        j = n;
	
	    if (arguments.length === 1) {
	      while (++i < n) if (!isNaN(a = number(array[i]))) s += a; else --j;
	    }
	
	    else {
	      while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) s += a; else --j;
	    }
	
	    if (j) return s / j;
	  };
	
	  // R-7 per <http://en.wikipedia.org/wiki/Quantile>
	  function quantile(values, p) {
	    var H = (values.length - 1) * p + 1,
	        h = Math.floor(H),
	        v = +values[h - 1],
	        e = H - h;
	    return e ? v + e * (values[h] - v) : v;
	  };
	
	  function median(array, f) {
	    var numbers = [],
	        n = array.length,
	        a,
	        i = -1;
	
	    if (arguments.length === 1) {
	      while (++i < n) if (!isNaN(a = number(array[i]))) numbers.push(a);
	    }
	
	    else {
	      while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) numbers.push(a);
	    }
	
	    if (numbers.length) return quantile(numbers.sort(ascending), .5);
	  };
	
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
	  };
	
	  function min(array, f) {
	    var i = -1,
	        n = array.length,
	        a,
	        b;
	
	    if (arguments.length === 1) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	    }
	
	    else {
	      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	      while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
	    }
	
	    return a;
	  };
	
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
	  };
	
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
	
	  function pairs(array) {
	    var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
	    while (i < n) pairs[i] = [p0 = p1, p1 = array[++i]];
	    return pairs;
	  };
	
	  function permute(array, indexes) {
	    var i = indexes.length, permutes = new Array(i);
	    while (i--) permutes[i] = array[indexes[i]];
	    return permutes;
	  };
	
	  function range(start, stop, step) {
	    if ((n = arguments.length) < 3) {
	      step = 1;
	      if (n < 2) {
	        stop = start;
	        start = 0;
	      }
	    }
	
	    var i = -1,
	        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	        range = new Array(n);
	
	    while (++i < n) {
	      range[i] = start + i * step;
	    }
	
	    return range;
	  };
	
	  function Set() {}
	
	  var proto = map.prototype;
	
	  Set.prototype = set.prototype = {
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
	
	  function set(object) {
	    var set = new Set;
	
	    // Copy constructor.
	    if (object instanceof Set) object.each(function(value) { set.add(value); });
	
	    // Otherwise, assume it’s an array.
	    else if (object) for (var i = 0, n = object.length; i < n; ++i) set.add(object[i]);
	
	    return set;
	  }
	
	  function shuffle(array, i0, i1) {
	    if ((m = arguments.length) < 3) {
	      i1 = array.length;
	      if (m < 2) i0 = 0;
	    }
	
	    var m = i1 - i0,
	        t,
	        i;
	
	    while (m) {
	      i = Math.random() * m-- | 0;
	      t = array[m + i0];
	      array[m + i0] = array[i + i0];
	      array[i + i0] = t;
	    }
	
	    return array;
	  };
	
	  function sum(array, f) {
	    var s = 0,
	        n = array.length,
	        a,
	        i = -1;
	
	    if (arguments.length === 1) {
	      while (++i < n) if (!isNaN(a = +array[i])) s += a; // Note: zero and null are equivalent.
	    }
	
	    else {
	      while (++i < n) if (!isNaN(a = +f(array[i], i, array))) s += a;
	    }
	
	    return s;
	  };
	
	  function transpose(matrix) {
	    if (!(n = matrix.length)) return [];
	    for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	        row[j] = matrix[j][i];
	      }
	    }
	    return transpose;
	  };
	
	  function length(d) {
	    return d.length;
	  }
	
	  function values(map) {
	    var values = [];
	    for (var key in map) values.push(map[key]);
	    return values;
	  };
	
	  function zip() {
	    return transpose(arguments);
	  };
	
	  var version = "0.4.1";
	
	  exports.version = version;
	  exports.bisect = bisectRight;
	  exports.bisectRight = bisectRight;
	  exports.bisectLeft = bisectLeft;
	  exports.ascending = ascending;
	  exports.bisector = bisector;
	  exports.descending = descending;
	  exports.deviation = deviation;
	  exports.entries = entries;
	  exports.extent = extent;
	  exports.keys = keys;
	  exports.map = map;
	  exports.max = max;
	  exports.mean = mean;
	  exports.median = median;
	  exports.merge = merge;
	  exports.min = min;
	  exports.nest = nest;
	  exports.pairs = pairs;
	  exports.permute = permute;
	  exports.quantile = quantile;
	  exports.range = range;
	  exports.set = set;
	  exports.shuffle = shuffle;
	  exports.sum = sum;
	  exports.transpose = transpose;
	  exports.values = values;
	  exports.variance = variance;
	  exports.zip = zip;
	
	}));

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-format', ['exports'], factory) :
	  factory((global.d3_format = {}));
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
	  };
	
	  function exponent(x) {
	    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	  };
	
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
	  };
	
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
	  };
	
	  function formatRounded(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1];
	    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	  };
	
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
	  };
	
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
	  };
	
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
	
	    function format(specifier) {
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
	
	      return function(value) {
	        var valuePrefix = prefix,
	            valueSuffix = suffix;
	
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
	            var i = -1, n = value.length, c;
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
	            var i = -1, n = value.length, c;
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
	      };
	    }
	
	    function formatPrefix(specifier, value) {
	      var f = format((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	          k = Math.pow(10, -e),
	          prefix = prefixes[8 + e / 3];
	      return function(value) {
	        return f(k * value) + prefix;
	      };
	    }
	
	    return {
	      format: format,
	      formatPrefix: formatPrefix
	    };
	  };
	
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
	    currency: ["", "\xa0Kč"],
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
	  };
	
	  function precisionPrefix(step, value) {
	    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	  };
	
	  function precisionRound(step, max) {
	    step = Math.abs(step), max = Math.abs(max) - step;
	    return Math.max(0, exponent(max) - exponent(step)) + 1;
	  };
	
	  var format = defaultLocale.format;
	  var formatPrefix = defaultLocale.formatPrefix;
	
	  var version = "0.4.2";
	
	  exports.version = version;
	  exports.format = format;
	  exports.formatPrefix = formatPrefix;
	  exports.locale = locale;
	  exports.localeCaEs = caES;
	  exports.localeCsCz = csCZ;
	  exports.localeDeCh = deCH;
	  exports.localeDeDe = deDE;
	  exports.localeEnCa = enCA;
	  exports.localeEnGb = enGB;
	  exports.localeEnUs = defaultLocale;
	  exports.localeEsEs = esES;
	  exports.localeFiFi = fiFI;
	  exports.localeFrCa = frCA;
	  exports.localeFrFr = frFR;
	  exports.localeHeIl = heIL;
	  exports.localeHuHu = huHU;
	  exports.localeItIt = itIT;
	  exports.localeJaJp = jaJP;
	  exports.localeKoKr = koKR;
	  exports.localeMkMk = mkMK;
	  exports.localeNlNl = nlNL;
	  exports.localePlPl = plPL;
	  exports.localePtBr = ptBR;
	  exports.localeRuRu = ruRU;
	  exports.localeSvSe = svSE;
	  exports.localeZhCn = zhCN;
	  exports.formatSpecifier = formatSpecifier;
	  exports.precisionFixed = precisionFixed;
	  exports.precisionPrefix = precisionPrefix;
	  exports.precisionRound = precisionRound;
	
	}));

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(100)) :
	  typeof define === 'function' && define.amd ? define('d3-time-format', ['exports', 'd3-time'], factory) :
	  factory((global.d3_time_format = {}),global.d3_time);
	}(this, function (exports,d3Time) { 'use strict';
	
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
	        f.parse = newParse(specifier, localDate);
	        f.toString = function() { return specifier; };
	        return f;
	      },
	      utcFormat: function(specifier) {
	        var f = newFormat(specifier += "", utcFormats);
	        f.parse = newParse(specifier, utcDate);
	        f.toString = function() { return specifier; };
	        return f;
	      }
	    };
	  };
	
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
	    return pad(1 + d3Time.day.count(d3Time.year(d), d), p, 3);
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
	    return pad(d3Time.sunday.count(d3Time.year(d), d), p, 2);
	  }
	
	  function formatWeekdayNumber(d) {
	    return d.getDay();
	  }
	
	  function formatWeekNumberMonday(d, p) {
	    return pad(d3Time.monday.count(d3Time.year(d), d), p, 2);
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
	    dateTime: "%a %b %e %X %Y",
	    date: "%Y/%-m/%-d",
	    time: "%H:%M:%S",
	    periods: ["上午", "下午"],
	    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	  });
	
	  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
	
	  function formatIsoNative(date) {
	    return date.toISOString();
	  }
	
	  formatIsoNative.parse = function(string) {
	    var date = new Date(string);
	    return isNaN(date) ? null : date;
	  };
	
	  formatIsoNative.toString = function() {
	    return isoSpecifier;
	  };
	
	  var formatIso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
	      ? formatIsoNative
	      : locale.utcFormat(isoSpecifier);
	
	  var format = locale.format;
	  var utcFormat = locale.utcFormat;
	
	  var version = "0.2.1";
	
	  exports.version = version;
	  exports.format = format;
	  exports.utcFormat = utcFormat;
	  exports.locale = locale$1;
	  exports.localeCaEs = caES;
	  exports.localeDeCh = deCH;
	  exports.localeDeDe = deDE;
	  exports.localeEnCa = enCA;
	  exports.localeEnGb = enGB;
	  exports.localeEnUs = locale;
	  exports.localeEsEs = esES;
	  exports.localeFiFi = fiFI;
	  exports.localeFrCa = frCA;
	  exports.localeFrFr = frFR;
	  exports.localeHeIl = heIL;
	  exports.localeHuHu = huHU;
	  exports.localeItIt = itIT;
	  exports.localeJaJp = jaJP;
	  exports.localeKoKr = koKR;
	  exports.localeMkMk = mkMK;
	  exports.localeNlNl = nlNL;
	  exports.localePlPl = plPL;
	  exports.localePtBr = ptBR;
	  exports.localeRuRu = ruRU;
	  exports.localeSvSe = svSE;
	  exports.localeZhCn = zhCN;
	  exports.isoFormat = formatIso;
	
	}));

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define('d3-time', ['exports'], factory) :
	  factory((global.d3_time = {}));
	}(this, function (exports) { 'use strict';
	
	  var t0 = new Date;
	  var t1 = new Date;
	  function newInterval(floori, offseti, count, field) {
	
	    function interval(date) {
	      return floori(date = new Date(+date)), date;
	    }
	
	    interval.floor = interval;
	
	    interval.round = function(date) {
	      var d0 = new Date(+date),
	          d1 = new Date(date - 1);
	      floori(d0), floori(d1), offseti(d1, 1);
	      return date - d0 < d1 - date ? d0 : d1;
	    };
	
	    interval.ceil = function(date) {
	      return floori(date = new Date(date - 1)), offseti(date, 1), date;
	    };
	
	    interval.offset = function(date, step) {
	      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	    };
	
	    interval.range = function(start, stop, step) {
	      var range = [];
	      start = new Date(start - 1);
	      stop = new Date(+stop);
	      step = step == null ? 1 : Math.floor(step);
	      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	      offseti(start, 1), floori(start);
	      if (start < stop) range.push(new Date(+start));
	      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
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
	  };
	
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
	
	  var second = newInterval(function(date) {
	    date.setMilliseconds(0);
	  }, function(date, step) {
	    date.setTime(+date + step * 1e3);
	  }, function(start, end) {
	    return (end - start) / 1e3;
	  }, function(date) {
	    return date.getSeconds();
	  });
	
	  var minute = newInterval(function(date) {
	    date.setSeconds(0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 6e4);
	  }, function(start, end) {
	    return (end - start) / 6e4;
	  }, function(date) {
	    return date.getMinutes();
	  });
	
	  var hour = newInterval(function(date) {
	    date.setMinutes(0, 0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 36e5);
	  }, function(start, end) {
	    return (end - start) / 36e5;
	  }, function(date) {
	    return date.getHours();
	  });
	
	  var day = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
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
	      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
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
	
	  var utcSecond = newInterval(function(date) {
	    date.setUTCMilliseconds(0);
	  }, function(date, step) {
	    date.setTime(+date + step * 1e3);
	  }, function(start, end) {
	    return (end - start) / 1e3;
	  }, function(date) {
	    return date.getUTCSeconds();
	  });
	
	  var utcMinute = newInterval(function(date) {
	    date.setUTCSeconds(0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 6e4);
	  }, function(start, end) {
	    return (end - start) / 6e4;
	  }, function(date) {
	    return date.getUTCMinutes();
	  });
	
	  var utcHour = newInterval(function(date) {
	    date.setUTCMinutes(0, 0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 36e5);
	  }, function(start, end) {
	    return (end - start) / 36e5;
	  }, function(date) {
	    return date.getUTCHours();
	  });
	
	  var utcDay = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step);
	  }, function(start, end) {
	    return (end - start) / 864e5;
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
	      return (end - start) / 6048e5;
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
	
	  var milliseconds = millisecond.range;
	  var seconds = second.range;
	  var minutes = minute.range;
	  var hours = hour.range;
	  var days = day.range;
	  var sundays = sunday.range;
	  var mondays = monday.range;
	  var tuesdays = tuesday.range;
	  var wednesdays = wednesday.range;
	  var thursdays = thursday.range;
	  var fridays = friday.range;
	  var saturdays = saturday.range;
	  var weeks = sunday.range;
	  var months = month.range;
	  var years = year.range;
	
	  var utcMillisecond = millisecond;
	  var utcMilliseconds = milliseconds;
	  var utcSeconds = utcSecond.range;
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
	
	  var version = "0.1.1";
	
	  exports.version = version;
	  exports.milliseconds = milliseconds;
	  exports.seconds = seconds;
	  exports.minutes = minutes;
	  exports.hours = hours;
	  exports.days = days;
	  exports.sundays = sundays;
	  exports.mondays = mondays;
	  exports.tuesdays = tuesdays;
	  exports.wednesdays = wednesdays;
	  exports.thursdays = thursdays;
	  exports.fridays = fridays;
	  exports.saturdays = saturdays;
	  exports.weeks = weeks;
	  exports.months = months;
	  exports.years = years;
	  exports.utcMillisecond = utcMillisecond;
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
	  exports.millisecond = millisecond;
	  exports.second = second;
	  exports.minute = minute;
	  exports.hour = hour;
	  exports.day = day;
	  exports.sunday = sunday;
	  exports.monday = monday;
	  exports.tuesday = tuesday;
	  exports.wednesday = wednesday;
	  exports.thursday = thursday;
	  exports.friday = friday;
	  exports.saturday = saturday;
	  exports.week = sunday;
	  exports.month = month;
	  exports.year = year;
	  exports.utcSecond = utcSecond;
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
	  exports.interval = newInterval;
	
	}));

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _victoryCore = __webpack_require__(1);
	
	module.exports = {
	  getAxisType: function getAxisType(component) {
	    if (!component.type || component.type.role !== "axis") {
	      return undefined;
	    }
	    return component.props.dependentAxis ? "dependent" : "independent";
	  },
	
	  getAxisComponent: function getAxisComponent(childComponents, axis) {
	    var getAxis = function getAxis(component) {
	      var flipped = childComponents.some(function (child) {
	        return child.props.horizontal;
	      });
	      return component.type.getAxis(component.props, flipped);
	    };
	    var axisComponents = childComponents.filter(function (component) {
	      return component.type.role === "axis" && getAxis(component) === axis;
	    });
	    return axisComponents[0];
	  },
	
	  getOrientation: function getOrientation(component, axis) {
	    if (component.props && component.props.orientation) {
	      return component.props.orientation;
	    }
	    var typicalOrientations = { x: "bottom", y: "left" };
	    var flippedOrientations = { x: "left", y: "bottom" };
	    var dependent = component.props.dependentAxis;
	    return dependent && axis === "y" || !dependent && axis === "x" ? typicalOrientations[axis] : flippedOrientations[axis];
	  },
	
	  getAxisOrientations: function getAxisOrientations(childComponents) {
	    return {
	      x: this.getOrientation(this.getAxisComponent(childComponents, "x"), "x"),
	      y: this.getOrientation(this.getAxisComponent(childComponents, "y"), "y")
	    };
	  },
	
	  isVertical: function isVertical(props) {
	    var orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
	    var vertical = { top: false, bottom: false, left: true, right: true };
	    return vertical[orientation];
	  },
	
	  stringTicks: function stringTicks(props) {
	    return props.tickValues !== undefined && _victoryCore.Collection.containsStrings(props.tickValues);
	  }
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _lodashArrayFlatten = __webpack_require__(95);
	
	var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);
	
	var _lodashCollectionIncludes = __webpack_require__(81);
	
	var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);
	
	var _lodashArrayZipObject = __webpack_require__(38);
	
	var _lodashArrayZipObject2 = _interopRequireDefault(_lodashArrayZipObject);
	
	var _data = __webpack_require__(103);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _axis = __webpack_require__(101);
	
	var _axis2 = _interopRequireDefault(_axis);
	
	var _victoryCore = __webpack_require__(1);
	
	module.exports = {
	  getDomain: function getDomain(props, axis) {
	    var propsDomain = this.getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return propsDomain;
	    }
	    var dataset = _data2["default"].getData(props);
	    return this.getDomainFromData(dataset, axis);
	  },
	
	  getDomainFromProps: function getDomainFromProps(props, axis) {
	    if (props.domain && props.domain[axis]) {
	      return props.domain[axis];
	    } else if (props.domain && Array.isArray(props.domain)) {
	      return props.domain;
	    }
	  },
	
	  getDomainFromData: function getDomainFromData(dataset, axis) {
	    var allData = (0, _lodashArrayFlatten2["default"])(dataset).map(function (datum) {
	      return datum[axis];
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
	    var domain = undefined;
	    if (_axis2["default"].stringTicks(props)) {
	      domain = [1, props.tickValues.length];
	    } else {
	      // coerce ticks to numbers
	      var ticks = props.tickValues.map(function (value) {
	        return +value;
	      });
	      domain = [Math.min.apply(Math, _toConsumableArray(ticks)), Math.max.apply(Math, _toConsumableArray(ticks))];
	    }
	    if (_axis2["default"].isVertical(props)) {
	      domain.reverse();
	    }
	    return domain;
	  },
	
	  getDomainFromCategories: function getDomainFromCategories(props, axis) {
	    if (axis !== "x" || !props.categories) {
	      return undefined;
	    }
	    var categories = (0, _lodashArrayFlatten2["default"])(props.categories);
	    var stringArray = _victoryCore.Collection.containsStrings(categories) ? _data2["default"].getStringsFromCategories(props, axis) : [];
	    var stringMap = stringArray.length === 0 ? null : (0, _lodashArrayZipObject2["default"])(stringArray.map(function (string, index) {
	      return [string, index + 1];
	    }));
	    var categoryValues = stringMap ? categories.map(function (value) {
	      return stringMap[value];
	    }) : categories;
	    return [Math.min.apply(Math, _toConsumableArray(categoryValues)), Math.max.apply(Math, _toConsumableArray(categoryValues))];
	  },
	
	  getDomainFromGroupedData: function getDomainFromGroupedData(props, axis) {
	    if (axis === "x" && props.categories) {
	      return this.getDomainFromCategories(props, axis);
	    }
	    // find the global min and max
	    var hasMultipleDatasets = props.stacked || this.shouldGroup(props);
	    var datasets = _data2["default"].formatDatasets(props, hasMultipleDatasets).map(function (dataset) {
	      return dataset.data;
	    });
	    var globalDomain = this.getDomainFromData(datasets, axis);
	
	    // find the cumulative max for stacked chart types
	    var cumulativeData = this.isStacked(props, axis) ? this.getCumulativeData(datasets, axis) : [];
	
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
	
	  shouldGroup: function shouldGroup(props) {
	    // automatically create grouped bars if data is array of arrays
	    // and x/y accessors are the default "x" and "y" keys,
	    return !props.stacked && (props.grouped || typeof props.grouped === "undefined" && _victoryCore.Collection.isArrayOfArrays(props.data) && props.x === "x" && props.y === "y");
	  },
	
	  isStacked: function isStacked(props, axis) {
	    // checks whether grouped data is stacked,
	    // whether there are multiple datasets to stack
	    // and whether the current axis is y (dependent)
	    // TODO: check assumptions for inverted axis charts
	
	    return props.stacked === true && _victoryCore.Collection.isArrayOfArrays(props.data) && axis === "y";
	  },
	
	  getCumulativeData: function getCumulativeData(datasets, axis) {
	    var categories = [];
	    var axisValues = [];
	    datasets.forEach(function (dataset) {
	      dataset.forEach(function (data) {
	        if (data.category !== undefined && !(0, _lodashCollectionIncludes2["default"])(categories, data.category)) {
	          categories.push(data.category);
	        } else if (!(0, _lodashCollectionIncludes2["default"])(axisValues, data[axis])) {
	          axisValues.push(data[axis]);
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
	          return data[index] && data[index][axis];
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _lodashArrayFlatten = __webpack_require__(95);
	
	var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);
	
	var _lodashArrayFindIndex = __webpack_require__(104);
	
	var _lodashArrayFindIndex2 = _interopRequireDefault(_lodashArrayFindIndex);
	
	var _lodashArrayUniq = __webpack_require__(122);
	
	var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _lodashObjectAssign = __webpack_require__(5);
	
	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
	var _lodashArrayZipObject = __webpack_require__(38);
	
	var _lodashArrayZipObject2 = _interopRequireDefault(_lodashArrayZipObject);
	
	var _victoryCore = __webpack_require__(1);
	
	var _scale = __webpack_require__(94);
	
	var _scale2 = _interopRequireDefault(_scale);
	
	exports["default"] = {
	  // String Data
	  createStringMap: function createStringMap(props, axis) {
	    var hasMultipleDatasets = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	    var stringsFromAxes = this.getStringsFromAxes(props, axis);
	    var stringsFromCategories = this.getStringsFromCategories(props, axis);
	    var stringsFromData = hasMultipleDatasets ? props.data.reduce(function (prev, dataset) {
	      return prev.concat(_victoryCore.Helpers.getStringsFromData((0, _lodashObjectDefaults2["default"])({}, { data: dataset }, props), axis));
	    }, []) : this.getStringsFromData(props, axis);
	
	    var allStrings = (0, _lodashArrayUniq2["default"])([].concat(_toConsumableArray(stringsFromAxes), _toConsumableArray(stringsFromCategories), _toConsumableArray(stringsFromData)));
	    return allStrings.length === 0 ? null : (0, _lodashArrayZipObject2["default"])(allStrings.map(function (string, index) {
	      return [string, index + 1];
	    }));
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
	    // TODO generalize for independent vertical axes
	    if (!props.categories || axis !== "x") {
	      return [];
	    } else {
	      var categoryArray = (0, _lodashArrayFlatten2["default"])(props.categories);
	      return categoryArray.filter(function (val) {
	        return typeof val === "string";
	      });
	    }
	  },
	
	  getStringsFromData: function getStringsFromData(props, axis) {
	    if (!props.data) {
	      return [];
	    }
	    var accessor = _victoryCore.Helpers.createAccessor(typeof props[axis] !== "undefined" ? props[axis] : axis);
	    return props.data.reduce(function (prev, curr) {
	      var datum = accessor(curr);
	      return typeof datum === "string" && prev.indexOf(datum) === -1 ? prev.concat(datum) : prev;
	    }, []);
	  },
	
	  // for components that take single datasets
	  getData: function getData(props) {
	    if (props.data) {
	      return this.formatData(props.data, props);
	    }
	    var data = this.generateData(props);
	    return this.formatData(data, props);
	  },
	
	  generateData: function generateData(props) {
	    // create an array of values evenly spaced across the x domain that include domain min/max
	    var domain = props.domain ? props.domain.x || props.domain : _scale2["default"].getBaseScale(props, "x").domain();
	    var samples = props.samples || 1;
	    var max = Math.max.apply(Math, _toConsumableArray(domain));
	    var values = Array.apply(undefined, _toConsumableArray(Array(samples))).map(function (val, index) {
	      var v = max / samples * index + Math.min.apply(Math, _toConsumableArray(domain));
	      return { x: v, y: v };
	    });
	    return values[samples - 1].x === max ? values : values.concat([{ x: max, y: max }]);
	  },
	
	  formatData: function formatData(dataset, props, stringMap) {
	    var _this = this;
	
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
	      var category = _this.determineCategoryIndex(x, props.categories);
	      return (0, _lodashObjectAssign2["default"])({}, datum, { x: x, y: y }, typeof category !== "undefined" ? { category: category } : {},
	      // map string data to numeric values, and add names
	      typeof x === "string" ? { x: stringMap.x[x], xName: x } : {}, typeof y === "string" ? { y: stringMap.y[y], yName: y } : {});
	    });
	  },
	
	  // For components that take multiple datasets
	  //
	  // NOTE: This code is in the hot path.  Future optimizations may be possible by
	  // reducing the frequency and number of data transformations that occur here.
	  formatDatasets: function formatDatasets(props, hasMultipleDatasets) {
	    var _this2 = this;
	
	    // string map must be calculated using all datasets and shared
	    var stringMap = {
	      x: this.createStringMap(props, "x", hasMultipleDatasets),
	      y: this.createStringMap(props, "y", hasMultipleDatasets)
	    };
	
	    var _format = function _format(dataset, index) {
	      return {
	        attrs: _this2.getAttributes(props, index),
	        data: _this2.formatData(dataset, props, stringMap)
	      };
	    };
	
	    return hasMultipleDatasets ? props.data.map(_format) : [_format(props.data, 0)];
	  },
	
	  cleanData: function cleanData(dataset, props) {
	    // Some scale types break when certain data is supplies. This method will
	    // remove data points that break scales. So far this method only removes
	    // zeroes for log scales
	    // TODO other cases?
	    var scaleType = {
	      x: _scale2["default"].getScaleType(props, "x"),
	      y: _scale2["default"].getScaleType(props, "y")
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
	  },
	
	  determineCategoryIndex: function determineCategoryIndex(x, categories) {
	    // if categories don't exist or are not given as an array of arrays, return undefined;
	    if (!categories || !Array.isArray(categories[0])) {
	      return undefined;
	    }
	    // determine which range band this x value belongs to, and return the index of that range band.
	    return (0, _lodashArrayFindIndex2["default"])(categories, function (category) {
	      return x >= Math.min.apply(Math, _toConsumableArray(category)) && x <= Math.max.apply(Math, _toConsumableArray(category));
	    });
	  },
	
	  getAttributes: function getAttributes(props, index) {
	    var attributes = props.dataAttributes && props.dataAttributes[index] ? props.dataAttributes[index] : props.dataAttributes;
	    if (attributes) {
	      attributes.fill = attributes.fill || this.getColor(props, index);
	    } else {
	      attributes = { fill: this.getColor(props, index) };
	    }
	    var requiredAttributes = {
	      name: attributes && attributes.name ? attributes.name : "data-" + index
	    };
	    return (0, _lodashObjectDefaults2["default"])(requiredAttributes, attributes);
	  },
	
	  getColor: function getColor(props, index) {
	    // check for styles first
	    if (props.style && props.style.data && props.style.data.fill) {
	      return props.style.data.fill;
	    }
	    var colorScale = Array.isArray(props.colorScale) ? props.colorScale : _victoryCore.Style.getColorScale(props.colorScale);
	    return colorScale[index % colorScale.length];
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var createFindIndex = __webpack_require__(105);
	
	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(chr) {
	 *   return chr.user == 'barney';
	 * });
	 * // => 0
	 *
	 * // using the `_.matches` callback shorthand
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.findIndex(users, 'active', false);
	 * // => 0
	 *
	 * // using the `_.property` callback shorthand
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	var findIndex = createFindIndex();
	
	module.exports = findIndex;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(106),
	    baseFindIndex = __webpack_require__(121);
	
	/**
	 * Creates a `_.findIndex` or `_.findLastIndex` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFindIndex(fromRight) {
	  return function(array, predicate, thisArg) {
	    if (!(array && array.length)) {
	      return -1;
	    }
	    predicate = baseCallback(predicate, thisArg, 3);
	    return baseFindIndex(array, predicate, fromRight);
	  };
	}
	
	module.exports = createFindIndex;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(107),
	    baseMatchesProperty = __webpack_require__(118),
	    bindCallback = __webpack_require__(25),
	    identity = __webpack_require__(26),
	    property = __webpack_require__(31);
	
	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}
	
	module.exports = baseCallback;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(108),
	    getMatchData = __webpack_require__(115),
	    toObject = __webpack_require__(34);
	
	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];
	
	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(109),
	    toObject = __webpack_require__(34);
	
	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
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
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(110),
	    isObject = __webpack_require__(11),
	    isObjectLike = __webpack_require__(12);
	
	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(111),
	    equalByTag = __webpack_require__(113),
	    equalObjects = __webpack_require__(114),
	    isArray = __webpack_require__(19),
	    isTypedArray = __webpack_require__(67);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);
	
	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
	
	  stackA.pop();
	  stackB.pop();
	
	  return result;
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(112);
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
	
	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalArrays;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
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
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(7);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;
	
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalObjects;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(116),
	    pairs = __webpack_require__(117);
	
	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(7),
	    toObject = __webpack_require__(34);
	
	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);
	
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);
	
	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}
	
	module.exports = pairs;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(33),
	    baseIsEqual = __webpack_require__(109),
	    baseSlice = __webpack_require__(119),
	    isArray = __webpack_require__(19),
	    isKey = __webpack_require__(37),
	    isStrictComparable = __webpack_require__(116),
	    last = __webpack_require__(120),
	    toObject = __webpack_require__(34),
	    toPath = __webpack_require__(35);
	
	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');
	
	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
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
/* 121 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(106),
	    baseUniq = __webpack_require__(123),
	    isIterateeCall = __webpack_require__(27),
	    sortedUniq = __webpack_require__(124);
	
	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurence of each element
	 * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	 * for sorted arrays. If an iteratee function is provided it's invoked for
	 * each element in the array to generate the criterion by which uniqueness
	 * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index, array).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias unique
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {boolean} [isSorted] Specify the array is sorted.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 *
	 * // using `isSorted`
	 * _.uniq([1, 1, 2], true);
	 * // => [1, 2]
	 *
	 * // using an iteratee function
	 * _.uniq([1, 2.5, 1.5, 2], function(n) {
	 *   return this.floor(n);
	 * }, Math);
	 * // => [1, 2.5]
	 *
	 * // using the `_.property` callback shorthand
	 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	function uniq(array, isSorted, iteratee, thisArg) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  if (isSorted != null && typeof isSorted != 'boolean') {
	    thisArg = iteratee;
	    iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
	    isSorted = false;
	  }
	  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
	  return (isSorted)
	    ? sortedUniq(array, iteratee)
	    : baseUniq(array, iteratee);
	}
	
	module.exports = uniq;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(82),
	    cacheIndexOf = __webpack_require__(89),
	    createCache = __webpack_require__(90);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];
	
	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;
	
	    if (isCommon && value === value) {
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
	    else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * An implementation of `_.uniq` optimized for sorted arrays without support
	 * for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function sortedUniq(array, iteratee) {
	  var seen,
	      index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;
	
	    if (!index || seen !== computed) {
	      seen = computed;
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = sortedUniq;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _lodashObjectInvert = __webpack_require__(126);
	
	var _lodashObjectInvert2 = _interopRequireDefault(_lodashObjectInvert);
	
	var _lodashCollectionSortBy = __webpack_require__(127);
	
	var _lodashCollectionSortBy2 = _interopRequireDefault(_lodashCollectionSortBy);
	
	var _lodashObjectValues = __webpack_require__(85);
	
	var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);
	
	var _lodashUtilityIdentity = __webpack_require__(26);
	
	var _lodashUtilityIdentity2 = _interopRequireDefault(_lodashUtilityIdentity);
	
	var _lodashMathSum = __webpack_require__(135);
	
	var _lodashMathSum2 = _interopRequireDefault(_lodashMathSum);
	
	var _lodashArrayUniq = __webpack_require__(122);
	
	var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);
	
	var _lodashArrayZipObject = __webpack_require__(38);
	
	var _lodashArrayZipObject2 = _interopRequireDefault(_lodashArrayZipObject);
	
	var _helpersAxis = __webpack_require__(101);
	
	var _helpersAxis2 = _interopRequireDefault(_helpersAxis);
	
	var _helpersData = __webpack_require__(103);
	
	var _helpersData2 = _interopRequireDefault(_helpersData);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	module.exports = {
	  getChildComponents: function getChildComponents(props, defaultAxes) {
	    // set up a counter for component types
	    var counts = {};
	    var addChild = function addChild(child) {
	      var type = child.type && child.type.role;
	      var axis = _helpersAxis2["default"].getAxisType(child);
	      if (!counts[type]) {
	        counts[type] = axis ? { independent: 0, dependent: 0 } : 0;
	      }
	      if (axis) {
	        counts[type][axis] = counts[type][axis] += 1;
	      } else {
	        counts[type] = counts[type] += 1;
	      }
	    };
	
	    var limitReached = function limitReached(child) {
	      var type = child.type && child.type.role;
	      var axis = _helpersAxis2["default"].getAxisType(child);
	      if (!counts[type]) {
	        return false;
	      } else if (axis) {
	        return counts[type][axis] >= 1;
	      } else if (type === "bar") {
	        // TODO: should we remove the limit on grouped data types?
	        return counts[type] >= 1;
	      }
	      return false;
	    };
	
	    var total = function total(type, axis) {
	      var totalCount = axis && counts[type] ? counts[type][axis] : counts[type];
	      return totalCount || 0;
	    };
	
	    if (!props.children) {
	      return [defaultAxes.independent, defaultAxes.dependent];
	    }
	    var childComponents = [];
	    // loop through children, and add each child to the childComponents array
	    // unless the limit for that child type has already been reached.
	    _react2["default"].Children.forEach(props.children, function (child) {
	      if (!child || !child.type) {
	        return;
	      }
	      var type = child.type && child.type.role;
	      if (limitReached(child)) {
	        var msg = type === "axis" ? "Only one VictoryAxis component of each axis type is allowed when using the " + "VictoryChart wrapper. Only the first axis will be used. Please compose " + "multi-axis charts manually" : "Only one \" + type + \"component is allowed per chart. If you are trying " + "to plot several datasets, please pass an array of data arrays directly " + ("into " + type + ".");
	        _victoryCore.Log.warn(msg);
	      } else {
	        childComponents.push(child);
	      }
	      addChild(child);
	    });
	
	    // Add default axis components if necessary
	    // TODO: should we add both axes by default?
	    if (total("axis", "independent") < 1) {
	      childComponents.push(defaultAxes.independent);
	    }
	    if (total("axis", "dependent") < 1) {
	      childComponents.push(defaultAxes.dependent);
	    }
	    return childComponents;
	  },
	
	  getDataComponents: function getDataComponents(childComponents, type) {
	    var predicate = {
	      all: function all(role) {
	        return role !== "axis";
	      },
	      data: function data(role) {
	        return role !== "axis" && role !== "bar";
	      },
	      grouped: function grouped(role) {
	        return role === "bar";
	      }
	    };
	    return childComponents.filter(function (child) {
	      var role = child.type && child.type.role;
	      return predicate[type].call(null, role);
	    });
	  },
	
	  getDomain: function getDomain(props, childComponents, axis) {
	    var domain = undefined;
	    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
	      domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
	    } else {
	      var childDomains = childComponents.reduce(function (prev, component) {
	        var childDomain = component.type.getDomain(component.props, axis);
	        return childDomain ? prev.concat(childDomain) : prev;
	      }, []);
	      domain = childDomains.length === 0 ? [0, 1] : [Math.min.apply(Math, _toConsumableArray(childDomains)), Math.max.apply(Math, _toConsumableArray(childDomains))];
	    }
	    var paddedDomain = _helpersDomain2["default"].padDomain(domain, props, axis);
	    var orientations = _helpersAxis2["default"].getAxisOrientations(childComponents);
	    return _helpersDomain2["default"].orientDomain(paddedDomain, orientations, axis);
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
	      x: _helpersAxis2["default"].getOrientation(axisComponents.x, "x"),
	      y: _helpersAxis2["default"].getOrientation(axisComponents.y, "y")
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
	      x: axisComponents.x.offsetX || calculatedOffset.x,
	      y: axisComponents.y.offsetY || calculatedOffset.y
	    };
	  },
	
	  getTicksFromData: function getTicksFromData(calculatedProps, axis) {
	    var stringMap = calculatedProps.stringMap[axis];
	    // if tickValues are defined for an axis component use them
	    var categoryArray = calculatedProps.categories[axis];
	    var ticksFromCategories = categoryArray && _victoryCore.Collection.containsOnlyStrings(categoryArray) ? categoryArray.map(function (tick) {
	      return stringMap[tick];
	    }) : categoryArray;
	    var ticksFromStringMap = stringMap && (0, _lodashObjectValues2["default"])(stringMap);
	    // when ticks is undefined, axis will determine it's own ticks
	    return ticksFromCategories || ticksFromStringMap;
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
	    if (tickValues && !_victoryCore.Collection.containsStrings(tickValues)) {
	      return _lodashUtilityIdentity2["default"];
	    } else if (stringMap !== null) {
	      var _ret = (function () {
	        var tickValueArray = (0, _lodashCollectionSortBy2["default"])((0, _lodashObjectValues2["default"])(stringMap), function (n) {
	          return n;
	        });
	        var invertedStringMap = (0, _lodashObjectInvert2["default"])(stringMap);
	        var dataNames = tickValueArray.map(function (tick) {
	          return invertedStringMap[tick];
	        });
	        // string ticks should have one tick of padding at the beginning
	        var dataTicks = [""].concat(_toConsumableArray(dataNames), [""]);
	        return {
	          v: function (x) {
	            return dataTicks[x];
	          }
	        };
	      })();
	
	      if (typeof _ret === "object") return _ret.v;
	    } else {
	      return calculatedProps.scale[axis].tickFormat() || _lodashUtilityIdentity2["default"];
	    }
	  },
	
	  createStringMap: function createStringMap(childComponents, axis) {
	    var axisComponent = _helpersAxis2["default"].getAxisComponent(childComponents, axis);
	    var tickStrings = _helpersData2["default"].getStringsFromAxes(axisComponent.props, axis);
	
	    var categoryStrings = childComponents.reduce(function (prev, component) {
	      var categoryData = _helpersData2["default"].getStringsFromCategories(component.props, axis);
	      return categoryData ? prev.concat(categoryData) : prev;
	    }, []);
	    var dataStrings = childComponents.reduce(function (prev, component) {
	      var stringData = _helpersData2["default"].getStringsFromData(component.props, axis);
	      return stringData ? prev.concat(stringData) : prev;
	    }, []);
	    var allStrings = (0, _lodashArrayUniq2["default"])([].concat(_toConsumableArray(tickStrings), _toConsumableArray(categoryStrings), _toConsumableArray(dataStrings)));
	
	    return allStrings.length === 0 ? null : (0, _lodashArrayZipObject2["default"])(allStrings.map(function (string, index) {
	      return [string, index + 1];
	    }));
	  },
	
	  getCategories: function getCategories(childComponents) {
	    var groupedComponents = this.getDataComponents(childComponents, "grouped");
	    if (groupedComponents.length === 0) {
	      return undefined;
	    }
	    // otherwise, create a set of groupedComponent categories
	    var allCategories = groupedComponents.reduce(function (prev, component) {
	      var cats = component.props.categories;
	      var categories = cats && _victoryCore.Collection.isArrayOfArrays(cats) ? cats.map(function (arr) {
	        return (0, _lodashMathSum2["default"])(arr) / arr.length;
	      }) : cats;
	      return categories && prev.indexOf(categories) === -1 ? prev.concat(categories) : prev;
	    }, []);
	    return allCategories.length === 0 ? undefined : allCategories;
	  }
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(27),
	    keys = __webpack_require__(7);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an object composed of the inverted keys and values of `object`.
	 * If `object` contains duplicate values, subsequent values overwrite property
	 * assignments of previous values unless `multiValue` is `true`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to invert.
	 * @param {boolean} [multiValue] Allow multiple values per key.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Object} Returns the new inverted object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2, 'c': 1 };
	 *
	 * _.invert(object);
	 * // => { '1': 'c', '2': 'b' }
	 *
	 * // with `multiValue`
	 * _.invert(object, true);
	 * // => { '1': ['a', 'c'], '2': ['b'] }
	 */
	function invert(object, multiValue, guard) {
	  if (guard && isIterateeCall(object, multiValue, guard)) {
	    multiValue = undefined;
	  }
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (multiValue) {
	      if (hasOwnProperty.call(result, value)) {
	        result[value].push(key);
	      } else {
	        result[value] = [key];
	      }
	    }
	    else {
	      result[value] = key;
	    }
	  }
	  return result;
	}
	
	module.exports = invert;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(106),
	    baseMap = __webpack_require__(128),
	    baseSortBy = __webpack_require__(132),
	    compareAscending = __webpack_require__(133),
	    isIterateeCall = __webpack_require__(27);
	
	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection through `iteratee`. This method performs
	 * a stable sort, that is, it preserves the original sort order of equal elements.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * _.sortBy([1, 2, 3], function(n) {
	 *   return Math.sin(n);
	 * });
	 * // => [3, 1, 2]
	 *
	 * _.sortBy([1, 2, 3], function(n) {
	 *   return this.sin(n);
	 * }, Math);
	 * // => [3, 1, 2]
	 *
	 * var users = [
	 *   { 'user': 'fred' },
	 *   { 'user': 'pebbles' },
	 *   { 'user': 'barney' }
	 * ];
	 *
	 * // using the `_.property` callback shorthand
	 * _.pluck(_.sortBy(users, 'user'), 'user');
	 * // => ['barney', 'fred', 'pebbles']
	 */
	function sortBy(collection, iteratee, thisArg) {
	  if (collection == null) {
	    return [];
	  }
	  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	    iteratee = undefined;
	  }
	  var index = -1;
	  iteratee = baseCallback(iteratee, thisArg, 3);
	
	  var result = baseMap(collection, function(value, key, collection) {
	    return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
	  });
	  return baseSortBy(result, compareAscending);
	}
	
	module.exports = sortBy;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(129),
	    isArrayLike = __webpack_require__(13);
	
	/**
	 * The base implementation of `_.map` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(130),
	    createBaseEach = __webpack_require__(131);
	
	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(57),
	    keys = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(14),
	    isLength = __webpack_require__(16),
	    toObject = __webpack_require__(34);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sortBy` which uses `comparer` to define
	 * the sort order of `array` and replaces criteria objects with their
	 * corresponding values.
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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseCompareAscending = __webpack_require__(134);
	
	/**
	 * Used by `_.sortBy` to compare transformed elements of a collection and stable
	 * sort them in ascending order.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @returns {number} Returns the sort order indicator for `object`.
	 */
	function compareAscending(object, other) {
	  return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
	}
	
	module.exports = compareAscending;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `compareAscending` which compares values and
	 * sorts them in ascending order without guaranteeing a stable sort.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function baseCompareAscending(value, other) {
	  if (value !== other) {
	    var valIsNull = value === null,
	        valIsUndef = value === undefined,
	        valIsReflexive = value === value;
	
	    var othIsNull = other === null,
	        othIsUndef = other === undefined,
	        othIsReflexive = other === other;
	
	    if ((value > other && !othIsNull) || !valIsReflexive ||
	        (valIsNull && !othIsUndef && othIsReflexive) ||
	        (valIsUndef && othIsReflexive)) {
	      return 1;
	    }
	    if ((value < other && !valIsNull) || !othIsReflexive ||
	        (othIsNull && !valIsUndef && valIsReflexive) ||
	        (othIsUndef && valIsReflexive)) {
	      return -1;
	    }
	  }
	  return 0;
	}
	
	module.exports = baseCompareAscending;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var arraySum = __webpack_require__(136),
	    baseCallback = __webpack_require__(106),
	    baseSum = __webpack_require__(137),
	    isArray = __webpack_require__(19),
	    isIterateeCall = __webpack_require__(27),
	    toIterable = __webpack_require__(138);
	
	/**
	 * Gets the sum of the values in `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {number} Returns the sum.
	 * @example
	 *
	 * _.sum([4, 6]);
	 * // => 10
	 *
	 * _.sum({ 'a': 4, 'b': 6 });
	 * // => 10
	 *
	 * var objects = [
	 *   { 'n': 4 },
	 *   { 'n': 6 }
	 * ];
	 *
	 * _.sum(objects, function(object) {
	 *   return object.n;
	 * });
	 * // => 10
	 *
	 * // using the `_.property` callback shorthand
	 * _.sum(objects, 'n');
	 * // => 10
	 */
	function sum(collection, iteratee, thisArg) {
	  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	    iteratee = undefined;
	  }
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return iteratee.length == 1
	    ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
	    : baseSum(collection, iteratee);
	}
	
	module.exports = sum;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.sum` for arrays without support for callback
	 * shorthands and `this` binding..
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function arraySum(array, iteratee) {
	  var length = array.length,
	      result = 0;
	
	  while (length--) {
	    result += +iteratee(array[length]) || 0;
	  }
	  return result;
	}
	
	module.exports = arraySum;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(129);
	
	/**
	 * The base implementation of `_.sum` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function baseSum(collection, iteratee) {
	  var result = 0;
	  baseEach(collection, function(value, index, collection) {
	    result += +iteratee(value, index, collection) || 0;
	  });
	  return result;
	}
	
	module.exports = baseSum;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13),
	    isObject = __webpack_require__(11),
	    values = __webpack_require__(85);
	
	/**
	 * Converts `value` to an array-like object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array|Object} Returns the array-like object.
	 */
	function toIterable(value) {
	  if (value == null) {
	    return [];
	  }
	  if (!isArrayLike(value)) {
	    return values(value);
	  }
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toIterable;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashCollectionSortBy = __webpack_require__(127);
	
	var _lodashCollectionSortBy2 = _interopRequireDefault(_lodashCollectionSortBy);
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lineSegment = __webpack_require__(140);
	
	var _lineSegment2 = _interopRequireDefault(_lineSegment);
	
	var _lineLabel = __webpack_require__(143);
	
	var _lineLabel2 = _interopRequireDefault(_lineLabel);
	
	var _helpersScale = __webpack_require__(94);
	
	var _helpersScale2 = _interopRequireDefault(_helpersScale);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	var _helpersData = __webpack_require__(103);
	
	var _helpersData2 = _interopRequireDefault(_helpersData);
	
	var _victoryCore = __webpack_require__(1);
	
	var _memoizerific = __webpack_require__(144);
	
	var _memoizerific2 = _interopRequireDefault(_memoizerific);
	
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
	    fontSize: 10,
	    strokeWidth: 0,
	    stroke: "transparent",
	    textAnchor: "start"
	  }
	};
	
	var VictoryLine = (function (_React$Component) {
	  _inherits(VictoryLine, _React$Component);
	
	  function VictoryLine() {
	    _classCallCheck(this, VictoryLine);
	
	    _get(Object.getPrototypeOf(VictoryLine.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryLine, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.memoized = {
	        // Provide performant, multiple-argument memoization with LRU cache-size of 1.
	        getStyles: (0, _memoizerific2["default"])(1)(_victoryCore.Helpers.getStyles)
	      };
	    }
	  }, {
	    key: "getDataSegments",
	    value: function getDataSegments(dataset) {
	      var orderedData = (0, _lodashCollectionSortBy2["default"])(dataset, "x");
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
	  }, {
	    key: "getLabelStyle",
	    value: function getLabelStyle(style) {
	      // match labels styles to data style by default (fill, opacity, others?)
	      var opacity = style.data.opacity;
	      // match label color to data color if it is not given.
	      // use fill instead of stroke for text
	      var fill = style.data.stroke;
	      var padding = style.labels.padding || 0;
	      return (0, _lodashObjectDefaults2["default"])({ opacity: opacity, fill: fill, padding: padding }, style.labels);
	    }
	  }, {
	    key: "renderLine",
	    value: function renderLine(calculatedProps) {
	      var _this = this;
	
	      var dataSegments = calculatedProps.dataSegments;
	      var scale = calculatedProps.scale;
	      var style = calculatedProps.style;
	
	      return dataSegments.map(function (segment, index) {
	        return _react2["default"].createElement(_lineSegment2["default"], {
	          key: "line-segment-" + index,
	          data: segment,
	          interpolation: _this.props.interpolation,
	          scale: scale,
	          style: style.data
	        });
	      });
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(calculatedProps) {
	      var dataset = calculatedProps.dataset;
	      var dataSegments = calculatedProps.dataSegments;
	      var scale = calculatedProps.scale;
	      var style = calculatedProps.style;
	
	      if (!this.props.label) {
	        return undefined;
	      }
	      var lastSegment = dataSegments[dataSegments.length - 1];
	      var lastPoint = Array.isArray(lastSegment) ? lastSegment[lastSegment.length - 1] : lastSegment;
	      return _react2["default"].createElement(_lineLabel2["default"], {
	        key: "line-label",
	        data: dataset,
	        position: {
	          x: scale.x.call(this, lastPoint.x),
	          y: scale.y.call(this, lastPoint.y)
	        },
	        label: this.props.label,
	        style: this.getLabelStyle(style)
	      });
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props, style) {
	      var dataset = _helpersData2["default"].getData(props);
	      var dataSegments = this.getDataSegments(dataset);
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var domain = {
	        x: _helpersDomain2["default"].getDomain(props, "x"),
	        y: _helpersDomain2["default"].getDomain(props, "y")
	      };
	      var scale = {
	        x: _helpersScale2["default"].getBaseScale(props, "x").domain(domain.x).range(range.x),
	        y: _helpersScale2["default"].getBaseScale(props, "y").domain(domain.y).range(range.y)
	      };
	      var calculatedProps = { dataset: dataset, dataSegments: dataSegments, scale: scale, style: style };
	      return _react2["default"].createElement(
	        "g",
	        { style: style.parent },
	        this.renderLine(calculatedProps),
	        this.renderLabel(calculatedProps)
	      );
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      // If animating, return a `VictoryAnimation` element that will create
	      // a new `VictoryLine` with nearly identical props, except (1) tweened
	      // and (2) `animate` set to null so we don't recurse forever.
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        // TODO: extract into helper
	        var whitelist = ["data", "domain", "height", "padding", "samples", "style", "width", "x", "y"];
	        var animateData = (0, _lodashObjectPick2["default"])(this.props, whitelist);
	        return _react2["default"].createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2["default"].createElement(VictoryLine, _extends({}, _this2.props, props, { animate: null }));
	          }
	        );
	      }
	      var style = this.memoized.getStyles(this.props.style, defaultStyles, this.props.height, this.props.width);
	      var group = _react2["default"].createElement(
	        "g",
	        { style: style.parent },
	        this.renderData(this.props, style)
	      );
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: style.parent },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "role",
	    value: "line",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      /**
	       * The animate prop specifies props for victory-animation to use. It this prop is
	       * not given, the line will not tween between changing data / style props.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * @examples {velocity: 0.02, onEnd: () => alert("done!")}
	       */
	      animate: _react.PropTypes.object,
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
	       * The height props specifies the height of the chart container element in pixels
	       */
	      height: _victoryCore.PropTypes.nonNegative,
	      /**
	       * The interpolation prop determines how data points should be connected
	       * when plotting a line
	       */
	      interpolation: _react.PropTypes.oneOf(["basis", "basisClosed", "basisOpen", "bundle", "cardinal", "cardinalClosed", "cardinalOpen", "catmullRom", "catmullRomClosed", "catmullRomOpen", "linear", "linearClosed", "monotone", "natural", "radial", "step", "stepAfter", "stepBefore"]),
	      /**
	       * The label prop specifies a label to display at the end of a line component.
	       * This prop can be given as a value, or as an entire, HTML-complete label component.
	       * If given as a value, a new VictoryLabel will be created with props and
	       * styles from the line. When given as a component, a new element will be
	       * cloned from the label component. The new element will have default
	       * values provided by the line for properties x, y, textAnchor, and
	       * verticalAnchor; and styles filled out with defaults from the line, and
	       * overrides from the datum.
	       */
	      label: _react.PropTypes.any,
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
	       * The style prop specifies styles for your chart. VictoryLine relies on Radium,
	       * so valid Radium style objects should work for this prop, however height, width, and margin
	       * are used to calculate range, and need to be expressed as a number of pixels
	       * @examples {data: {stroke: "red"}, labels: {fontSize: 14}}
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
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      height: 300,
	      interpolation: "linear",
	      padding: 50,
	      samples: 50,
	      scale: "linear",
	      standalone: true,
	      width: 450,
	      x: "x",
	      y: "y"
	    },
	    enumerable: true
	  }, {
	    key: "getDomain",
	    value: _helpersDomain2["default"].getDomain.bind(_helpersDomain2["default"]),
	    enumerable: true
	  }]);
	
	  return VictoryLine;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryLine;
	module.exports = exports["default"];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Shape = __webpack_require__(141);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	var _victoryCore = __webpack_require__(1);
	
	var LineSegment = (function (_React$Component) {
	  _inherits(LineSegment, _React$Component);
	
	  function LineSegment() {
	    _classCallCheck(this, LineSegment);
	
	    _get(Object.getPrototypeOf(LineSegment.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(LineSegment, [{
	    key: "render",
	    value: function render() {
	      var style = _victoryCore.Helpers.evaluateStyle(this.props.style, this.props.data);
	      var interpolation = _victoryCore.Helpers.evaluateProp(this.props.interpolation, this.props.data);
	      var xScale = this.props.scale.x;
	      var yScale = this.props.scale.y;
	      var lineFunction = _d3Shape2["default"].line().curve(_d3Shape2["default"][interpolation]).x(function (data) {
	        return xScale(data.x);
	      }).y(function (data) {
	        return yScale(data.y);
	      });
	      var path = lineFunction(this.props.data);
	      return _react2["default"].createElement("path", { style: style, d: path });
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      data: _react.PropTypes.array,
	      interpolation: _react.PropTypes.string,
	      scale: _react.PropTypes.object,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return LineSegment;
	})(_react2["default"].Component);
	
	exports["default"] = LineSegment;
	module.exports = exports["default"];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(142)) :
	  typeof define === 'function' && define.amd ? define('d3-shape', ['exports', 'd3-path'], factory) :
	  factory((global.d3_shape = {}),global.d3_path);
	}(this, function (exports,d3Path) { 'use strict';
	
	  function constant(x) {
	    return function constant() {
	      return x;
	    };
	  };
	
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
	        context = null,
	        output = null;
	
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
	            rc1 = rc;
	
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
	          var t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw),
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
	          var t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw),
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
	      return arguments.length ? ((context = output = _ == null ? null : _), arc) : context;
	    };
	
	    return arc;
	  };
	
	  var slice = Array.prototype.slice;
	
	  function bind(curve, args) {
	    if (args.length < 2) return curve;
	    args = slice.call(args);
	    args[0] = null;
	    return function(context) {
	      args[0] = context;
	      return curve.apply(null, args);
	    };
	  };
	
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
	  };
	
	  function x(p) {
	    return p[0];
	  };
	
	  function y(p) {
	    return p[1];
	  };
	
	  function area() {
	    var x0 = x,
	        x1 = null,
	        y0 = constant(0),
	        y1 = y,
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
	
	      if (!context) output = curve(buffer = d3Path.path());
	
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
	      return arguments.length ? (curve = bind(_, arguments), context != null && (output = curve(context)), area) : curve;
	    };
	
	    area.context = function(_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	    };
	
	    return area;
	  };
	
	  function noop() {};
	
	  function point(that, x, y) {
	    that._context.bezierCurveTo(
	      (2 * that._x0 + that._x1) / 3,
	      (2 * that._y0 + that._y1) / 3,
	      (that._x0 + 2 * that._x1) / 3,
	      (that._y0 + 2 * that._y1) / 3,
	      (that._x0 + 4 * that._x1 + x) / 6,
	      (that._y0 + 4 * that._y1 + y) / 6
	    );
	  };
	
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
	  };
	
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
	  };
	
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
	  };
	
	  function Bundle(context, beta) {
	    this._basis = basis(context);
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
	
	  function bundle(context, beta) {
	    return beta == null ? new Bundle(context, 0.85)
	        : (beta = +beta) === 1 ? basis(context)
	        : new Bundle(context, beta);
	  };
	
	  function point$1(that, x, y) {
	    that._context.bezierCurveTo(
	      that._x1 + that._k * (that._x2 - that._x0),
	      that._y1 + that._k * (that._y2 - that._y0),
	      that._x2 + that._k * (that._x1 - x),
	      that._y2 + that._k * (that._y1 - y),
	      that._x2,
	      that._y2
	    );
	  };
	
	  function Cardinal(context, k) {
	    this._context = context;
	    this._k = k;
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
	
	  function cardinal(context, tension) {
	    return new Cardinal(context, (tension == null ? 1 : 1 - tension) / 6);
	  };
	
	  function CardinalClosed(context, k) {
	    this._context = context;
	    this._k = k;
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
	
	  function cardinalClosed(context, tension) {
	    return new CardinalClosed(context, (tension == null ? 1 : 1 - tension) / 6);
	  };
	
	  function CardinalOpen(context, k) {
	    this._context = context;
	    this._k = k;
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
	
	  function cardinalOpen(context, tension) {
	    return new CardinalOpen(context, (tension == null ? 1 : 1 - tension) / 6);
	  };
	
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
	  };
	
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
	
	  function catmullRom(context, alpha) {
	    return (alpha = alpha == null ? 0.5 : +alpha)
	        ? new CatmullRom(context, alpha)
	        : cardinal(context, 0);
	  };
	
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
	
	  function catmullRomClosed(context, alpha) {
	    return (alpha = alpha == null ? 0.5 : +alpha)
	        ? new CatmullRomClosed(context, alpha)
	        : cardinalClosed(context, 0);
	  };
	
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
	
	  function catmullRomOpen(context, alpha) {
	    return (alpha = alpha == null ? 0.5 : +alpha)
	        ? new CatmullRomOpen(context, alpha)
	        : cardinalOpen(context, 0);
	  };
	
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
	  };
	
	  function line() {
	    var x$$ = x,
	        y$$ = y,
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
	
	      if (!context) output = curve(buffer = d3Path.path());
	
	      for (i = 0; i <= n; ++i) {
	        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	          if (defined0 = !defined0) output.lineStart();
	          else output.lineEnd();
	        }
	        if (defined0) output.point(+x$$(d, i, data), +y$$(d, i, data));
	      }
	
	      if (buffer) return output = null, buffer + "" || null;
	    }
	
	    line.x = function(_) {
	      return arguments.length ? (x$$ = typeof _ === "function" ? _ : constant(+_), line) : x$$;
	    };
	
	    line.y = function(_) {
	      return arguments.length ? (y$$ = typeof _ === "function" ? _ : constant(+_), line) : y$$;
	    };
	
	    line.defined = function(_) {
	      return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
	    };
	
	    line.curve = function(_) {
	      return arguments.length ? (curve = bind(_, arguments), context != null && (output = curve(context)), line) : curve;
	    };
	
	    line.context = function(_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	    };
	
	    return line;
	  };
	
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
	        s0 = (that._y1 - that._y0) / h0,
	        s1 = (y2 - that._y1) / h1,
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
	
	  function Monotone(context) {
	    this._context = context;
	  }
	
	  Monotone.prototype = {
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
	
	  function monotone(context) {
	    return new Monotone(context);
	  };
	
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
	  };
	
	  function descending(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  };
	
	  function identity(d) {
	    return d;
	  };
	
	  function pie() {
	    var value = identity,
	        sortValues = descending,
	        sort = null,
	        startAngle = constant(0),
	        endAngle = constant(tau),
	        padAngle = constant(0);
	
	    function pie(data) {
	      var n = data.length,
	          sum = 0,
	          index = new Array(n),
	          arcs = new Array(n),
	          a0 = +startAngle.apply(this, arguments),
	          da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	          a1,
	          p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	          pa = p * (da < 0 ? -1 : 1);
	
	      for (var i = 0, v; i < n; ++i) {
	        if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	          sum += v;
	        }
	      }
	
	      // Optionally sort the arcs by previously-computed values or by data.
	      if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	      else if (sort !== null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	      // Compute the arcs! They are stored in the original data's order.
	      for (var i = 0, j, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	        j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	          data: data[j],
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
	  };
	
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
	      a -= halfPi, this._curve.point(r * Math.cos(a), r * Math.sin(a));
	    }
	  };
	
	  function curveRadial(curve, args) {
	    curve = bind(curve, args);
	
	    function radial(context) {
	      return new Radial(curve(context));
	    }
	
	    radial._curve = curve;
	
	    return radial;
	  };
	
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
	      return arguments.length ? c(curveRadial(_, arguments)) : c()._curve;
	    };
	
	    return a.curve(curveLinear);
	  };
	
	  function radialLine() {
	    var l = line(),
	        c = l.curve;
	
	    l.angle = l.x, delete l.x;
	    l.radius = l.y, delete l.y;
	
	    l.curve = function(_) {
	      return arguments.length ? c(curveRadial(_, arguments)) : c()._curve;
	    };
	
	    return l.curve(curveLinear);
	  };
	
	  var square = {
	    draw: function(context, size) {
	      var w = Math.sqrt(size),
	          x = -w / 2;
	      context.rect(x, x, w, w);
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
	
	  function StepAfter(context) {
	    this._context = context;
	  }
	
	  StepAfter.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._y = NaN;
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
	        default: {
	          this._context.lineTo(x, this._y);
	          this._context.lineTo(x, y);
	          break;
	        }
	      }
	      this._y = y;
	    }
	  };
	
	  function stepAfter(context) {
	    return new StepAfter(context);
	  };
	
	  function StepBefore(context) {
	    this._context = context;
	  }
	
	  StepBefore.prototype = {
	    areaStart: function() {
	      this._line = 0;
	    },
	    areaEnd: function() {
	      this._line = NaN;
	    },
	    lineStart: function() {
	      this._x = NaN;
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
	        default: {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	          break;
	        }
	      }
	      this._x = x;
	    }
	  };
	
	  function stepBefore(context) {
	    return new StepBefore(context);
	  };
	
	  function Step(context) {
	    this._context = context;
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
	      if (this._point === 2) this._context.lineTo(this._x, this._y);
	      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	        case 1: this._point = 2; // proceed
	        default: {
	          var x1 = (this._x + x) / 2;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	          break;
	        }
	      }
	      this._x = x, this._y = y;
	    }
	  };
	
	  function step(context) {
	    return new Step(context);
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
	  };
	
	  var version = "0.2.2";
	
	  exports.version = version;
	  exports.arc = arc;
	  exports.area = area;
	  exports.basisClosed = basisClosed;
	  exports.basisOpen = basisOpen;
	  exports.basis = basis;
	  exports.bundle = bundle;
	  exports.cardinalClosed = cardinalClosed;
	  exports.cardinalOpen = cardinalOpen;
	  exports.cardinal = cardinal;
	  exports.catmullRomClosed = catmullRomClosed;
	  exports.catmullRomOpen = catmullRomOpen;
	  exports.catmullRom = catmullRom;
	  exports.circle = circle;
	  exports.cross = cross;
	  exports.diamond = diamond;
	  exports.linearClosed = linearClosed;
	  exports.linear = curveLinear;
	  exports.line = line;
	  exports.monotone = monotone;
	  exports.natural = natural;
	  exports.pie = pie;
	  exports.radialArea = radialArea;
	  exports.radialLine = radialLine;
	  exports.square = square;
	  exports.star = star;
	  exports.stepAfter = stepAfter;
	  exports.stepBefore = stepBefore;
	  exports.step = step;
	  exports.symbol = symbol;
	  exports.symbols = symbols;
	  exports.triangle = triangle;
	  exports.wye = wye;
	
	}));

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_path = {})));
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
	
	  var version = "0.1.4";
	
	  exports.version = version;
	  exports.path = path;
	
	}));

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var LineLabel = (function (_React$Component) {
	  _inherits(LineLabel, _React$Component);
	
	  function LineLabel() {
	    _classCallCheck(this, LineLabel);
	
	    _get(Object.getPrototypeOf(LineLabel.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(LineLabel, [{
	    key: "renderLabelComponent",
	    value: function renderLabelComponent(props) {
	      var component = props.label;
	      var baseStyle = (0, _lodashObjectDefaults2["default"])({ padding: 0 }, component.props.style, props.style);
	      var style = _victoryCore.Helpers.evaluateStyle(baseStyle, props.data);
	      var children = component.props.children || "";
	      var newProps = {
	        x: component.props.x || props.position.x + style.padding,
	        y: component.props.y || props.position.y - style.padding,
	        data: props.data,
	        textAnchor: component.props.textAnchor || "start",
	        verticalAnchor: component.props.verticalAnchor || "middle",
	        style: style
	      };
	      return _react2["default"].cloneElement(component, newProps, children);
	    }
	  }, {
	    key: "renderVictoryLabel",
	    value: function renderVictoryLabel(props) {
	      var style = _victoryCore.Helpers.evaluateStyle((0, _lodashObjectDefaults2["default"])({ padding: 0 }, props.style), props.data);
	      return _react2["default"].createElement(
	        _victoryCore.VictoryLabel,
	        {
	          x: props.position.x + style.padding,
	          y: props.position.y - style.padding,
	          textAnchor: "start",
	          verticalAnchor: "middle",
	          style: style
	        },
	        props.label
	      );
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props) {
	      return props.label && props.label.props ? this.renderLabelComponent(props) : this.renderVictoryLabel(props);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "g",
	        null,
	        this.renderLabel(this.props)
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      data: _react.PropTypes.array,
	      position: _react.PropTypes.object,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return LineLabel;
	})(_react2["default"].Component);
	
	exports["default"] = LineLabel;
	module.exports = exports["default"];

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var MapOrSimilar = __webpack_require__(145);
	
	module.exports = function (limit) {
	    var cache = new MapOrSimilar(),
	        lru = [];
	
	    return function (fn) {
	        var memoizerific = function () {
	            var currentCache = cache,
	                newMap,
	                fnResult,
	                argsLengthMinusOne = arguments.length - 1,
	                lruPath = Array(argsLengthMinusOne + 1),
	                isMemoized = true,
	                i;
	
	            // loop through each argument to traverse the map tree
	            for (i = 0; i < argsLengthMinusOne; i++) {
	                lruPath[i] = {
	                    cacheItem: currentCache,
	                    arg: arguments[i]
	                };
	
	                // if all arguments exist in map tree, the memoized result will be last value to be retrieved
	                if (currentCache.has(arguments[i])) {
	                    currentCache = currentCache.get(arguments[i]);
	                    continue;
	                }
	
	                isMemoized = false;
	
	                // make maps until last value
	                newMap = new MapOrSimilar();
	                currentCache.set(arguments[i], newMap);
	                currentCache = newMap;
	            }
	
	            // we are at the last arg, check if it is really memoized
	            if (isMemoized) {
	                if (currentCache.has(arguments[argsLengthMinusOne])) {
	                    fnResult = currentCache.get(arguments[argsLengthMinusOne]);
	                } else {
	                    isMemoized = false;
	                }
	            }
	
	            if (!isMemoized) {
	                fnResult = fn.apply(null, arguments);
	                currentCache.set(arguments[argsLengthMinusOne], fnResult);
	            }
	
	            if (limit > 0) {
	                lruPath[argsLengthMinusOne] = {
	                    cacheItem: currentCache,
	                    arg: arguments[argsLengthMinusOne]
	                };
	
	                if (isMemoized) {
	                    moveToMostRecentLru(lru, lruPath);
	                } else {
	                    lru.push(lruPath);
	                }
	
	                if (lru.length > limit) {
	                    removeCachedResult(lru.shift());
	                }
	            }
	
	            memoizerific.wasMemoized = isMemoized;
	
	            return fnResult;
	        };
	
	        memoizerific.limit = limit;
	        memoizerific.wasMemoized = false;
	        memoizerific.cache = cache;
	        memoizerific.lru = lru;
	
	        return memoizerific;
	    };
	};
	
	// move current args to most recent position
	function moveToMostRecentLru(lru, lruPath) {
	    var lruLen = lru.length,
	        lruPathLen = lruPath.length,
	        isMatch,
	        i, ii;
	
	    for (i = 0; i < lruLen; i++) {
	        isMatch = true;
	        for (ii = 0; ii < lruPathLen; ii++) {
	            if (lru[i][ii].arg !== lruPath[ii].arg) {
	                isMatch = false;
	                break;
	            }
	        }
	        if (isMatch) {
	            break;
	        }
	    }
	
	    lru.push(lru.splice(i, 1)[0]);
	}
	
	// remove least recently used cache item and all dead branches
	function removeCachedResult(removedLru) {
	    var removedLruLen = removedLru.length,
	        currentLru = removedLru[removedLruLen - 1],
	        tmp,
	        i;
	
	    currentLru.cacheItem.delete(currentLru.arg);
	
	    // walk down the tree removing dead branches (size 0) along the way
	    for (i = removedLruLen - 2; i >= 0; i--) {
	        currentLru = removedLru[i];
	        tmp = currentLru.cacheItem.get(currentLru.arg);
	
	        if (!tmp || !tmp.size) {
	            currentLru.cacheItem.delete(currentLru.arg);
	        } else {
	            break;
	        }
	    }
	}


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (typeof Map !== 'function' || (process && process.env && process.env.TEST_MAPORSIMILAR === 'true')) {
	    module.exports = __webpack_require__(146);
	}
	else {
	    module.exports = Map;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 146 */
/***/ function(module, exports) {

	function Similar() {
	    this.list = [];
	    this.lastItem = undefined;
	    this.size = 0;
	
	    return this;
	}
	
	Similar.prototype.get = function(key) {
	    var index;
	
	    if (this.lastItem && this.lastItem.key === key) {
	        return this.lastItem.val;
	    }
	
	    index = this.indexOf(key);
	    if (index >= 0) {
	        this.lastItem = this.list[index];
	        return this.list[index].val;
	    }
	
	    return undefined;
	};
	
	Similar.prototype.set = function(key, val) {
	    var index;
	
	    if (this.lastItem && this.lastItem.key === key) {
	        this.lastItem.val = val;
	        return this;
	    }
	
	    index = this.indexOf(key);
	    if (index >= 0) {
	        this.lastItem = this.list[index];
	        this.list[index].val = val;
	        return this;
	    }
	
	    this.lastItem = { key: key, val: val };
	    this.list.push(this.lastItem);
	    this.size++;
	
	    return this;
	};
	
	Similar.prototype.delete = function(key) {
	    var index;
	
	    if (this.lastItem && this.lastItem.key === key) {
	        this.lastItem = undefined;
	    }
	
	    index = this.indexOf(key);
	    if (index >= 0) {
	        this.size--;
	        return this.list.splice(index, 1)[0];
	    }
	
	    return undefined;
	};
	
	
	// important that has() doesn't use get() in case an existing key has a falsy value, in which case has() would return false
	Similar.prototype.has = function(key) {
	    var index;
	
	    if (this.lastItem && this.lastItem.key === key) {
	        return true;
	    }
	
	    index = this.indexOf(key);
	    if (index >= 0) {
	        this.lastItem = this.list[index];
	        return true;
	    }
	
	    return false;
	};
	
	Similar.prototype.forEach = function(callback, thisArg) {
	    var i;
	    for (i = 0; i < this.size; i++) {
	        callback.call(thisArg || this, this.list[i].val, this.list[i].key, this);
	    }
	};
	
	Similar.prototype.indexOf = function(key) {
	    var i;
	    for (i = 0; i < this.size; i++) {
	        if (this.list[i].key === key) {
	            return i;
	        }
	    }
	    return -1;
	};
	
	module.exports = Similar;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _memoizerific = __webpack_require__(144);
	
	var _memoizerific2 = _interopRequireDefault(_memoizerific);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _bar = __webpack_require__(148);
	
	var _bar2 = _interopRequireDefault(_bar);
	
	var _barLabel = __webpack_require__(149);
	
	var _barLabel2 = _interopRequireDefault(_barLabel);
	
	var _helperMethods = __webpack_require__(150);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _helpersData = __webpack_require__(103);
	
	var _helpersData2 = _interopRequireDefault(_helpersData);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	var _helpersScale = __webpack_require__(94);
	
	var _helpersScale2 = _interopRequireDefault(_helpersScale);
	
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
	    fontSize: 12,
	    padding: 4,
	    fill: "black"
	  }
	};
	
	var defaultData = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }];
	
	var VictoryBar = (function (_React$Component) {
	  _inherits(VictoryBar, _React$Component);
	
	  function VictoryBar() {
	    _classCallCheck(this, VictoryBar);
	
	    _get(Object.getPrototypeOf(VictoryBar.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryBar, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.memoized = {
	        // Provide performant, multiple-argument memoization with LRU cache-size of 1.
	        getStyles: (0, _memoizerific2["default"])(1)(_victoryCore.Helpers.getStyles)
	      };
	    }
	  }, {
	    key: "renderBars",
	    value: function renderBars(dataset, seriesIndex, calculatedProps) {
	      var _this = this;
	
	      return dataset.data.map(function (datum, barIndex) {
	        var index = { seriesIndex: seriesIndex, barIndex: barIndex };
	        var position = _helperMethods2["default"].getBarPosition(datum, index, calculatedProps);
	        var baseStyle = calculatedProps.style;
	        var style = _helperMethods2["default"].getBarStyle(datum, dataset, baseStyle);
	        var barComponent = _react2["default"].createElement(_bar2["default"], { key: "series-" + seriesIndex + "-bar-" + barIndex,
	          horizontal: _this.props.horizontal,
	          style: style,
	          position: position,
	          datum: datum
	        });
	        var shouldPlotLabel = _helperMethods2["default"].shouldPlotLabel(seriesIndex, _this.props, calculatedProps.datasets);
	        if (datum.label || shouldPlotLabel) {
	          var labelIndex = _helperMethods2["default"].getLabelIndex(datum, calculatedProps);
	          var labelText = _this.props.labels ? _this.props.labels[labelIndex] || _this.props.labels[0] : "";
	          return _react2["default"].createElement(
	            "g",
	            { key: "series-" + index + "-bar-" + barIndex },
	            barComponent,
	            _react2["default"].createElement(_barLabel2["default"], { key: "label-series-" + index + "-bar-" + barIndex,
	              horizontal: _this.props.horizontal,
	              style: baseStyle.labels,
	              position: position,
	              datum: datum,
	              labelText: datum.label || labelText,
	              labelComponent: _this.props.labelComponent
	            })
	          );
	        }
	        return barComponent;
	      });
	    }
	  }, {
	    key: "calculateProps",
	    value: function calculateProps(props, style) {
	      var stacked = props.stacked;
	      var categories = props.categories;
	
	      var grouped = _helpersDomain2["default"].shouldGroup(props);
	      var hasMultipleDatasets = grouped || stacked;
	      var datasets = _helpersData2["default"].formatDatasets(props, hasMultipleDatasets);
	      var stringMap = {
	        x: _helpersData2["default"].createStringMap(props, "x", hasMultipleDatasets),
	        y: _helpersData2["default"].createStringMap(props, "y", hasMultipleDatasets)
	      };
	      var padding = _victoryCore.Helpers.getPadding(props);
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var domain = {
	        x: _helperMethods2["default"].getDomain(props, "x"),
	        y: _helperMethods2["default"].getDomain(props, "y")
	      };
	      var scale = {
	        x: _helpersScale2["default"].getBaseScale(props, "x").domain(domain.x).range(range.x),
	        y: _helpersScale2["default"].getBaseScale(props, "y").domain(domain.y).range(range.y)
	      };
	      var uniqueX = _helperMethods2["default"].getUniqueX(datasets);
	      return {
	        categories: categories, datasets: datasets, domain: domain, padding: padding, range: range, scale: scale,
	        grouped: grouped, stacked: stacked, stringMap: stringMap, style: style, uniqueX: uniqueX
	      };
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props, style) {
	      var _this2 = this;
	
	      var calculatedProps = this.calculateProps(props, style);
	      return calculatedProps.datasets.map(function (dataset, index) {
	        return _this2.renderBars(dataset, index, calculatedProps);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	
	      // If animating, return a `VictoryAnimation` element that will create
	      // a new `VictoryBar` with nearly identical props, except (1) tweened
	      // and (2) `animate` set to null so we don't recurse forever.
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var whitelist = ["data", "dataAttributes", "categories", "colorScale", "domain", "height", "padding", "style", "width"];
	        var animateData = (0, _lodashObjectPick2["default"])(this.props, whitelist);
	        return _react2["default"].createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2["default"].createElement(VictoryBar, _extends({}, _this3.props, props, { animate: null }));
	          }
	        );
	      }
	
	      var style = this.memoized.getStyles(this.props.style, defaultStyles, this.props.height, this.props.width);
	      var group = _react2["default"].createElement(
	        "g",
	        { style: style.parent },
	        this.renderData(this.props, style)
	      );
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: style.parent },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "role",
	    value: "bar",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      /**
	       * The animate prop specifies props for victory-animation to use. It this prop is
	       * not given, the bar chart will not tween between changing data / style props.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * @examples {velocity: 0.02, onEnd: () => alert("done!")}
	       */
	      animate: _react.PropTypes.object,
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
	       * The dataAttributes prop describes how a data set should be styled.
	       * This prop can be given as an object, or an array of objects. If this prop is
	       * given as an array of objects, the properties of each object in the array will
	       * be applied to the data points in the corresponding array of the data prop.
	       * @examples {fill: "blue", opacity: 0.6}, [{fill: "red"}, {fill: "orange"}]
	       */
	      dataAttributes: _victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.matchDataLength, _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)])]),
	      /**
	       * The categories prop specifies the categories for a bar chart. This prop should
	       * be given as an array of string values, numeric values, or arrays. When this prop is
	       * given as an array of arrays, the minimum and maximum values of the arrays define range bands,
	       * allowing numeric data to be grouped into segments.
	       * @examples ["dogs", "cats", "mice"], [[0, 5], [5, 10], [10, 15]]
	       */
	      categories: _victoryCore.PropTypes.homogeneousArray,
	      /**
	       * The colorScale prop is an optional prop that defines the color scale the chart's bars
	       * will be created on. This prop should be given as an array of CSS colors, or as a string
	       * corresponding to one of the built in color scales. VictoryBar will automatically assign
	       * values from this color scale to the bars unless colors are explicitly provided in the
	       * `dataAttributes` prop.
	       */
	      colorScale: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.oneOf(["greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"])]),
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
	       * The domainPadding prop specifies a number of pixels of padding to add to the
	       * beginning and end of a domain. This prop is useful for preventing 0 pixel bars,
	       * and taking bar width into account.
	       */
	      domainPadding: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	        x: _victoryCore.PropTypes.nonNegative,
	        y: _victoryCore.PropTypes.nonNegative
	      }), _victoryCore.PropTypes.nonNegative]),
	      /**
	       * The grouped prop determines whether the chart should consist of sets of grouped bars.
	       * When this prop is set to true, the data prop *must* be an array of multiple data series
	       * ie. not an array of data points, but an array of arrays of data points.  If data is
	       * given as an array or arrays, and data accessor props have default values
	       * (ie. x={"x"} y={"y"}), the grouped prop will default to true.
	       */
	      grouped: _react.PropTypes.bool,
	      /**
	       * The height props specifies the height of the chart container element in pixels
	       */
	      height: _victoryCore.PropTypes.nonNegative,
	      /**
	       * The horizontal prop determines whether the bars will be laid vertically or
	       * horizontally. The bars will be vertical if this prop is false or unspecified,
	       * or horizontal if the prop is set to true.
	       */
	      horizontal: _react.PropTypes.bool,
	      /**
	       * The labels prop defines labels that will appear above each bar or
	       * group of bars in your bar chart. This prop should be given as an array of values.
	       * The number of elements in the label array should be equal to number of elements in
	       * the categories array, or if categories is not defined, to the number of unique
	       * x values in your data. Use this prop to add labels to individual bars, stacked bars,
	       * and groups of bars.
	       * @examples: ["spring", "summer", "fall", "winter"]
	       */
	      labels: _react.PropTypes.array,
	      /**
	        * The labelComponent prop takes in an entire, HTML-complete label
	        * component which will be used to create labels for each bar in the bar
	        * chart. The new element created from the passed labelComponent will have
	        * children preserved, or provided as the label property from the bar's
	        * datum; property data provided by the bar's datum; properties x, y,
	        * textAnchor, and verticalAnchor preserved or default values provided by
	        * the bar; and styles filled out with defaults provided by the bar, and
	        * overrides from the datum. If labelComponent is omitted, a new
	        * VictoryLabel will be created with props and styles from the bar.
	       */
	      labelComponent: _react.PropTypes.element,
	      /**
	       * Deprecated: Use labelComponent instead!
	       * The labelComponents prop defines labels - as entire, HTML-complete label
	       * components - that will appear above each bar or group of bars in your
	       * bar chart. This prop should be given as an array of elements. The number
	       * of elements in the labelComponents array should be equal to the number
	       * of elements in the categories array, or, if categories is not defined,
	       * to the number of unique x values in your data. Use this prop to add
	       * labels to individual bars, stacked bars, and groups of bars. The new
	       * element created from each element of the labelComponents array will have
	       * children preserved, or provided as the label from the bar's datum;
	       * property data provided by the bar's datum; properties x, y, textAnchor,
	       * and verticalAnchor preserved or default values provided by the bar; and
	       * styles filled out with defaults provided by the bar. If you do not
	       * provide enough elements in the labelComponents array, a new VictoryLabel
	       * will be created with props and styles from the bar.
	       labelComponents: PropTypes.deprecated(PropTypes.array, `You'll find you
	                                            have less repetition if you use the
	                                            new labelComponent propType`),
	      */
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
	       * The stacked prop determines whether the chart should consist of stacked bars.
	       * When this prop is set to true, the data prop *must* be an array of multiple data series
	       * ie. not an array of data points, but an array of arrays of data points
	       */
	      stacked: _react.PropTypes.bool,
	      /**
	       * The standalone prop determines whether the component will render a standalone svg
	       * or a <g> tag that will be included in an external svg. Set standalone to false to
	       * compose VictoryBar with other components within an enclosing <svg> tag.
	       */
	      standalone: _react.PropTypes.bool,
	      /**
	       * The style prop specifies styles for your chart. VictoryBar relies on Radium,
	       * so valid Radium style objects should work for this prop, however height, width, and margin
	       * are used to calculate range, and need to be expressed as a number of pixels
	       * @examples {data: {fill: "red", width: 8}, labels: {fontSize: 12}}
	       */
	      style: _react.PropTypes.shape({
	        parent: _react.PropTypes.object,
	        data: _react.PropTypes.object,
	        labels: _react.PropTypes.object
	      }),
	      /**
	       * The width prop specifies the width of the chart container element in pixels
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
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      data: defaultData,
	      colorScale: "greyscale",
	      height: 300,
	      padding: 50,
	      scale: "linear",
	      stacked: false,
	      standalone: true,
	      width: 450,
	      x: "x",
	      y: "y"
	    },
	    enumerable: true
	  }, {
	    key: "getDomain",
	    value: _helperMethods2["default"].getDomain.bind(_helperMethods2["default"]),
	    enumerable: true
	  }]);
	
	  return VictoryBar;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryBar;
	module.exports = exports["default"];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var Bar = (function (_React$Component) {
	  _inherits(Bar, _React$Component);
	
	  function Bar() {
	    _classCallCheck(this, Bar);
	
	    _get(Object.getPrototypeOf(Bar.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(Bar, [{
	    key: "getVerticalBarPath",
	    value: function getVerticalBarPath(position, width) {
	      var independent = position.independent;
	      var dependent0 = position.dependent0;
	      var dependent1 = position.dependent1;
	
	      var size = width / 2;
	      return "M " + (independent - size) + ", " + dependent0 + "\n      L " + (independent - size) + ", " + dependent1 + "\n      L " + (independent + size) + ", " + dependent1 + "\n      L " + (independent + size) + ", " + dependent0 + "\n      L " + (independent - size) + ", " + dependent0;
	    }
	  }, {
	    key: "getHorizontalBarPath",
	    value: function getHorizontalBarPath(position, width) {
	      var independent = position.independent;
	      var dependent0 = position.dependent0;
	      var dependent1 = position.dependent1;
	
	      var size = width / 2;
	      return "M " + dependent0 + ", " + (independent - size) + "\n      L " + dependent0 + ", " + (independent + size) + "\n      L " + dependent1 + ", " + (independent + size) + "\n      L " + dependent1 + ", " + (independent - size) + "\n      L " + dependent0 + ", " + (independent - size);
	    }
	  }, {
	    key: "getBarPath",
	    value: function getBarPath(position, width) {
	      return this.props.horizontal ? this.getHorizontalBarPath(position, width) : this.getVerticalBarPath(position, width);
	    }
	  }, {
	    key: "renderBar",
	    value: function renderBar(props) {
	      var style = _victoryCore.Helpers.evaluateStyle(props.style, props.datum);
	      // TODO better bar width calculation
	      var barWidth = style.width;
	      var path = props.position.independent ? this.getBarPath(props.position, barWidth) : undefined;
	      return _react2["default"].createElement("path", {
	        d: path,
	        style: style,
	        shapeRendering: "optimizeSpeed"
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "g",
	        null,
	        this.renderBar(this.props)
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      position: _react.PropTypes.object,
	      horizontal: _react.PropTypes.bool,
	      style: _react.PropTypes.object,
	      datum: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return Bar;
	})(_react2["default"].Component);
	
	exports["default"] = Bar;
	module.exports = exports["default"];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var BarLabel = (function (_React$Component) {
	  _inherits(BarLabel, _React$Component);
	
	  function BarLabel() {
	    _classCallCheck(this, BarLabel);
	
	    _get(Object.getPrototypeOf(BarLabel.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(BarLabel, [{
	    key: "getLabelAnchors",
	    value: function getLabelAnchors(props) {
	      var sign = props.datum.y >= 0 ? 1 : -1;
	      if (!props.horizontal) {
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
	    }
	  }, {
	    key: "getlabelPadding",
	    value: function getlabelPadding(props, style) {
	      return {
	        x: props.horizontal ? style.padding : 0,
	        y: props.horizontal ? 0 : style.padding
	      };
	    }
	  }, {
	    key: "renderLabelComponent",
	    value: function renderLabelComponent(props, position, anchors) {
	      var component = props.labelComponent;
	      var baseStyle = (0, _lodashObjectDefaults2["default"])({ padding: 0 }, component.props.style, props.style);
	      var style = _victoryCore.Helpers.evaluateStyle(baseStyle, props.datum);
	      var padding = this.getlabelPadding(props, style);
	      var children = component.props.children || props.labelText;
	      var newProps = {
	        x: component.props.x || position.x + padding.x,
	        y: component.props.y || position.y - padding.y,
	        data: props.datum, // Pass data for custom label component to access - todo: rename to datum
	        textAnchor: component.props.textAnchor || anchors.text,
	        verticalAnchor: component.props.verticalAnchor || anchors.vertical,
	        style: style
	      };
	      return _react2["default"].cloneElement(component, newProps, children);
	    }
	  }, {
	    key: "renderVictoryLabel",
	    value: function renderVictoryLabel(props, position, anchors) {
	      var baseStyle = (0, _lodashObjectDefaults2["default"])({ padding: 0 }, props.style);
	      var style = _victoryCore.Helpers.evaluateStyle(baseStyle, props.datum);
	      var padding = this.getlabelPadding(props, style);
	      return _react2["default"].createElement(
	        _victoryCore.VictoryLabel,
	        {
	          x: position.x + padding.x,
	          y: position.y - padding.y,
	          data: props.datum, // todo: rename to datum
	          textAnchor: anchors.text,
	          verticalAnchor: anchors.vertical,
	          style: style
	        },
	        props.labelText
	      );
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props) {
	      var anchors = this.getLabelAnchors(props);
	      var position = {
	        x: props.horizontal ? props.position.dependent1 : props.position.independent,
	        y: props.horizontal ? props.position.independent : props.position.dependent1
	      };
	      return props.labelComponent ? this.renderLabelComponent(props, position, anchors) : this.renderVictoryLabel(props, position, anchors);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "g",
	        null,
	        this.renderLabel(this.props)
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      position: _react.PropTypes.object,
	      horizontal: _react.PropTypes.bool,
	      style: _react.PropTypes.object,
	      datum: _react.PropTypes.object,
	      labelText: _react.PropTypes.string,
	      labelComponent: _react.PropTypes.any
	    },
	    enumerable: true
	  }]);
	
	  return BarLabel;
	})(_react2["default"].Component);
	
	exports["default"] = BarLabel;
	module.exports = exports["default"];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _lodashArrayUniq = __webpack_require__(122);
	
	var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);
	
	var _lodashObjectOmit = __webpack_require__(151);
	
	var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	module.exports = {
	  getDomain: function getDomain(props, axis) {
	    var propsDomain = _helpersDomain2["default"].getDomainFromProps(props, axis);
	    if (propsDomain) {
	      return _helpersDomain2["default"].padDomain(propsDomain, props, axis);
	    }
	    var ensureZero = function ensureZero(domain) {
	      return axis === "y" ? [Math.min.apply(Math, _toConsumableArray(domain).concat([0])), Math.max.apply(Math, _toConsumableArray(domain).concat([0]))] : domain;
	    };
	    var dataDomain = ensureZero(_helpersDomain2["default"].getDomainFromGroupedData(props, axis));
	    return _helpersDomain2["default"].padDomain(dataDomain, props, axis);
	  },
	
	  // Layout Helpers
	  getBarPosition: function getBarPosition(datum, index, calculatedProps) {
	    var scale = calculatedProps.scale;
	    var stacked = calculatedProps.stacked;
	    var categories = calculatedProps.categories;
	
	    var yOffset = stacked ? this.getYOffset(datum, index, calculatedProps) : 0;
	    var y0 = yOffset;
	    var y1 = yOffset + datum.y;
	    var x = stacked && !categories ? datum.x : this.adjustX(datum, index.seriesIndex, calculatedProps);
	    var formatValue = function formatValue(value, axis) {
	      return datum[axis] instanceof Date ? new Date(value) : value;
	    };
	    return {
	      independent: scale.x(formatValue(x, "x")),
	      dependent0: scale.y(formatValue(y0, "y")),
	      dependent1: scale.y(formatValue(y1, "y"))
	    };
	  },
	
	  getYOffset: function getYOffset(datum, index, calculatedProps) {
	    var datasets = calculatedProps.datasets;
	
	    if (index.seriesIndex === 0) {
	      return 0;
	    }
	    var y = datum.y;
	    var previousDataSets = datasets.slice(0, index.seriesIndex);
	    var previousBars = previousDataSets.reduce(function (prev, dataset) {
	      return prev.concat(dataset.data.filter(function (previousDatum) {
	        return datum.x instanceof Date ? previousDatum.x.getTime() === datum.x.getTime() : previousDatum.x === datum.x;
	      }).map(function (previousDatum) {
	        return previousDatum.y || 0;
	      }));
	    }, []);
	    return previousBars.reduce(function (memo, barValue) {
	      var sameSign = y < 0 && barValue < 0 || y >= 0 && barValue >= 0;
	      return sameSign ? memo + barValue : memo;
	    }, 0);
	  },
	
	  adjustX: function adjustX(datum, index, calculatedProps) {
	    var stacked = calculatedProps.stacked;
	    var categories = calculatedProps.categories;
	
	    var style = calculatedProps.style.data;
	    var x = datum.x;
	    var datasets = calculatedProps.datasets;
	    var center = datasets.length % 2 === 0 ? datasets.length / 2 : (datasets.length - 1) / 2;
	    var centerOffset = index - center;
	    var totalWidth = this.pixelsToValue(style.padding, "x", calculatedProps) + this.pixelsToValue(style.width, "x", calculatedProps);
	    if (datum.category !== undefined) {
	      // if this is category data, shift x to the center of its category
	      var rangeBand = categories[datum.category];
	      var bandCenter = (Math.max.apply(Math, _toConsumableArray(rangeBand)) + Math.min.apply(Math, _toConsumableArray(rangeBand))) / 2;
	      return stacked ? bandCenter : bandCenter + centerOffset * totalWidth;
	    }
	    return stacked ? x : x + centerOffset * totalWidth;
	  },
	
	  pixelsToValue: function pixelsToValue(pixels, axis, calculatedProps) {
	    if (pixels === 0) {
	      return 0;
	    }
	    var domain = calculatedProps.domain[axis];
	    var range = calculatedProps.range[axis];
	    var domainExtent = Math.max.apply(Math, _toConsumableArray(domain)) - Math.min.apply(Math, _toConsumableArray(domain));
	    var rangeExtent = Math.max.apply(Math, _toConsumableArray(range)) - Math.min.apply(Math, _toConsumableArray(range));
	    return domainExtent / rangeExtent * pixels;
	  },
	
	  // Label Helpers
	  shouldPlotLabel: function shouldPlotLabel(index, props, datasets) {
	    var isCenter = Math.floor(datasets.length / 2) === index;
	    var isLast = datasets.length === index + 1;
	    var stacked = props.stacked;
	    var plotGroupLabel = stacked && isLast || !stacked && isCenter;
	    var labelExists = props.labels || props.labelComponents ? true : false;
	    return plotGroupLabel && labelExists;
	  },
	
	  getUniqueX: function getUniqueX(datasets) {
	    return (0, _lodashArrayUniq2["default"])(datasets.reduce(function (prev, dataset) {
	      return prev.concat(dataset.data.map(function (d) {
	        return d.x;
	      }));
	    }, []));
	  },
	
	  getLabelIndex: function getLabelIndex(datum, calculatedProps) {
	    var stringMap = calculatedProps.stringMap;
	    var uniqueX = calculatedProps.uniqueX;
	
	    if (datum.category !== undefined) {
	      return datum.category;
	    } else if (stringMap.x) {
	      return datum.x - 1;
	    } else {
	      return uniqueX.findIndex(function (x) {
	        return x === datum.x;
	      });
	    }
	  },
	
	  getBarStyle: function getBarStyle(datum, dataset, baseStyle) {
	    var styleData = (0, _lodashObjectOmit2["default"])(datum, ["xName", "yName", "x", "y", "label", "category"]);
	    return (0, _lodashObjectDefaults2["default"])({}, styleData, (0, _lodashObjectOmit2["default"])(dataset.attrs, "name"), baseStyle.data);
	  }
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(152),
	    baseDifference = __webpack_require__(88),
	    baseFlatten = __webpack_require__(73),
	    bindCallback = __webpack_require__(25),
	    keysIn = __webpack_require__(21),
	    pickByArray = __webpack_require__(75),
	    pickByCallback = __webpack_require__(76),
	    restParam = __webpack_require__(28);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function(value, key, object) {
	    return !predicate(value, key, object);
	  });
	});
	
	module.exports = omit;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _point = __webpack_require__(154);
	
	var _point2 = _interopRequireDefault(_point);
	
	var _helpersScale = __webpack_require__(94);
	
	var _helpersScale2 = _interopRequireDefault(_helpersScale);
	
	var _helpersDomain = __webpack_require__(102);
	
	var _helpersDomain2 = _interopRequireDefault(_helpersDomain);
	
	var _helpersData = __webpack_require__(103);
	
	var _helpersData2 = _interopRequireDefault(_helpersData);
	
	var _victoryCore = __webpack_require__(1);
	
	var _helperMethods = __webpack_require__(155);
	
	var _helperMethods2 = _interopRequireDefault(_helperMethods);
	
	var _memoizerific = __webpack_require__(144);
	
	var _memoizerific2 = _interopRequireDefault(_memoizerific);
	
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
	    fontSize: 10,
	    textAnchor: "middle",
	    padding: 5
	  }
	};
	
	var VictoryScatter = (function (_React$Component) {
	  _inherits(VictoryScatter, _React$Component);
	
	  function VictoryScatter() {
	    _classCallCheck(this, VictoryScatter);
	
	    _get(Object.getPrototypeOf(VictoryScatter.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryScatter, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.memoized = {
	        // Provide performant, multiple-argument memoization with LRU cache-size of 1.
	        getStyles: (0, _memoizerific2["default"])(1)(_victoryCore.Helpers.getStyles)
	      };
	    }
	  }, {
	    key: "renderPoint",
	    value: function renderPoint(data, index, calculatedProps) {
	      var position = {
	        x: calculatedProps.scale.x.call(null, data.x),
	        y: calculatedProps.scale.y.call(null, data.y)
	      };
	      return _react2["default"].createElement(_point2["default"], {
	        key: "point-" + index,
	        labelComponent: this.props.labelComponent,
	        showLabels: this.props.showLabels,
	        style: calculatedProps.style,
	        x: position.x,
	        y: position.y,
	        data: data,
	        size: _helperMethods2["default"].getSize(data, this.props, calculatedProps),
	        symbol: _helperMethods2["default"].getSymbol(data, this.props)
	      });
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props, style) {
	      var _this = this;
	
	      var data = _helpersData2["default"].getData(props);
	      var range = {
	        x: _victoryCore.Helpers.getRange(props, "x"),
	        y: _victoryCore.Helpers.getRange(props, "y")
	      };
	      var domain = {
	        x: _helpersDomain2["default"].getDomain(props, "x"),
	        y: _helpersDomain2["default"].getDomain(props, "y")
	      };
	      var scale = {
	        x: _helpersScale2["default"].getBaseScale(props, "x").domain(domain.x).range(range.x),
	        y: _helpersScale2["default"].getBaseScale(props, "y").domain(domain.y).range(range.y)
	      };
	      var z = props.bubbleProperty || "z";
	      var calculatedProps = { data: data, scale: scale, style: style, z: z };
	      return data.map(function (datum, index) {
	        return _this.renderPoint(datum, index, calculatedProps);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      // If animating, return a `VictoryAnimation` element that will create
	      // a new `VictoryScatter` with nearly identical props, except (1) tweened
	      // and (2) `animate` set to null so we don't recurse forever.
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var animateData = (0, _lodashObjectPick2["default"])(this.props, ["data", "domain", "height", "maxBubbleSize", "padding", "samples", "size", "style", "width", "x", "y"]);
	
	        return _react2["default"].createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2["default"].createElement(VictoryScatter, _extends({}, _this2.props, props, { animate: null }));
	          }
	        );
	      }
	      var style = this.memoized.getStyles(this.props.style, defaultStyles, this.props.height, this.props.width);
	      var group = _react2["default"].createElement(
	        "g",
	        { style: style.parent },
	        this.renderData(this.props, style)
	      );
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: style.parent },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "role",
	    value: "scatter",
	    enumerable: true
	  }, {
	    key: "propTypes",
	    value: {
	      /**
	       * The animate prop specifies props for victory-animation to use. It this prop is
	       * not given, the scatter plot will not tween between changing data / style props.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * @examples {delay: 5, velocity: 0.02, onEnd: () => alert("woo!")}
	       */
	      animate: _react.PropTypes.object,
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
	       * The height props specifies the height of the chart container element in pixels
	       */
	      height: _victoryCore.PropTypes.nonNegative,
	      /**
	       * The labelComponent prop takes in an entire, HTML-complete label component which will be used
	       * to create labels for each point in the scatter plot. The new element created from the passed
	       * labelComponent will have children preserved, or provided as the label property from the
	       * point's datum; property data provided by the point's datum; properties x, y, dy, textAnchor,
	       * and verticalAnchor preserved or default values provided by the point; and styles filled out
	       * with defaults from the scatter, and overrides from the datum. If labelComponent is omitted, a
	       * new VictoryLabel will be created with props and styles from the point.
	       */
	      labelComponent: _react.PropTypes.element,
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
	       * The showLabels prop determines whether to show any labels associated with a data point.
	       * Large datasets might animate slowly due to the inherent limits of svg rendering.
	       * If animations are running slowly, try setting this prop to false to cut down on
	       * the number of svg nodes
	       */
	      showLabels: _react.PropTypes.bool,
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
	       * The style prop specifies styles for your scatter plot. VictoryScatter relies on Radium,
	       * so valid Radium style objects should work for this prop. Height, width, and
	       * padding should be specified via the height, width, and padding props, as they
	       * are used to calculate the alignment of components within chart.
	       * @examples {parent: {margin: 50}, data: {fill: "red"}, labels: {padding: 20}}
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
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      height: 300,
	      padding: 50,
	      samples: 50,
	      scale: "linear",
	      showLabels: true,
	      size: 3,
	      standalone: true,
	      symbol: "circle",
	      width: 450,
	      x: "x",
	      y: "y"
	    },
	    enumerable: true
	  }, {
	    key: "getDomain",
	    value: _helpersDomain2["default"].getDomain.bind(_helpersDomain2["default"]),
	    enumerable: true
	  }]);
	
	  return VictoryScatter;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryScatter;
	module.exports = exports["default"];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _lodashObjectDefaults = __webpack_require__(4);
	
	var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
	
	var _lodashObjectOmit = __webpack_require__(151);
	
	var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _helperMethods = __webpack_require__(155);
	
	var Point = (function (_React$Component) {
	  _inherits(Point, _React$Component);
	
	  function Point() {
	    _classCallCheck(this, Point);
	
	    _get(Object.getPrototypeOf(Point.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(Point, [{
	    key: "getStyle",
	    value: function getStyle(props) {
	      var stylesFromData = (0, _lodashObjectOmit2["default"])(props.data, ["x", "y", "z", "size", "symbol", "name", "label"]);
	      var baseDataStyle = (0, _lodashObjectDefaults2["default"])({}, stylesFromData, props.style.data);
	      var dataStyle = _victoryCore.Helpers.evaluateStyle(baseDataStyle, props.data);
	      // match certain label styles to data if styles are not given
	      var matchedStyle = (0, _lodashObjectPick2["default"])(dataStyle, ["opacity", "fill"]);
	      var padding = props.style.labels.padding || props.size * 0.25;
	      var baseLabelStyle = (0, _lodashObjectDefaults2["default"])({ padding: padding }, props.style.labels, matchedStyle);
	      var labelStyle = _victoryCore.Helpers.evaluateStyle(baseLabelStyle, props.data);
	      return { data: dataStyle, labels: labelStyle };
	    }
	  }, {
	    key: "renderPoint",
	    value: function renderPoint(props, style) {
	      return _react2["default"].createElement("path", {
	        style: style.data,
	        d: (0, _helperMethods.getPath)(props),
	        shapeRendering: "optimizeSpeed"
	      });
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props, style) {
	      if (props.showLabels === false || !props.data.label) {
	        return undefined;
	      }
	      var component = props.labelComponent;
	      var componentStyle = component && component.props.style || {};
	      var baseStyle = (0, _lodashObjectDefaults2["default"])({}, componentStyle, style.labels);
	      var labelStyle = _victoryCore.Helpers.evaluateStyle(baseStyle, props.data);
	      var children = component && component.props.children || props.data.label;
	      var labelProps = {
	        x: component && component.props.x || props.x,
	        y: component && component.props.y || props.y - labelStyle.padding,
	        dy: component && component.props.dy,
	        data: props.data,
	        textAnchor: component && component.props.textAnchor || labelStyle.textAnchor,
	        verticalAnchor: component && component.props.verticalAnchor || "end",
	        style: labelStyle
	      };
	
	      return component ? _react2["default"].cloneElement(component, labelProps, children) : _react2["default"].createElement(_victoryCore.VictoryLabel, labelProps, children);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var style = this.getStyle(this.props);
	      return _react2["default"].createElement(
	        "g",
	        null,
	        this.renderPoint(this.props, style),
	        this.renderLabel(this.props, style)
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      data: _react.PropTypes.shape({
	        x: _react2["default"].PropTypes.any,
	        y: _react2["default"].PropTypes.any
	      }),
	      labelComponent: _react2["default"].PropTypes.element,
	      symbol: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["circle", "diamond", "plus", "square", "star", "triangleDown", "triangleUp"]), _react.PropTypes.func]),
	      size: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]),
	      showLabels: _react2["default"].PropTypes.bool,
	      style: _react.PropTypes.shape({
	        data: _react2["default"].PropTypes.object,
	        labels: _react2["default"].PropTypes.object
	      }),
	      x: _react2["default"].PropTypes.number,
	      y: _react2["default"].PropTypes.number
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      showLabels: true
	    },
	    enumerable: true
	  }]);
	
	  return Point;
	})(_react2["default"].Component);
	
	exports["default"] = Point;
	module.exports = exports["default"];

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _lodashObjectValues = __webpack_require__(85);
	
	var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);
	
	var _pathHelpers = __webpack_require__(156);
	
	var _pathHelpers2 = _interopRequireDefault(_pathHelpers);
	
	var _victoryCore = __webpack_require__(1);
	
	module.exports = {
	  getSymbol: function getSymbol(data, props) {
	    if (props.bubbleProperty) {
	      return "circle";
	    }
	    return data.symbol || props.symbol;
	  },
	
	  getBubbleSize: function getBubbleSize(datum, props, calculatedProps) {
	    var data = calculatedProps.data;
	    var z = calculatedProps.z;
	
	    var getMaxRadius = function getMaxRadius() {
	      var minPadding = Math.min.apply(Math, _toConsumableArray((0, _lodashObjectValues2["default"])(_victoryCore.Helpers.getPadding(props))));
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
	
	  getSize: function getSize(data, props, calculatedProps) {
	    if (data.size) {
	      return typeof data.size === "function" ? data.size : Math.max(data.size, 1);
	    } else if (typeof props.size === "function") {
	      return props.size;
	    } else if (data[calculatedProps.z]) {
	      return this.getBubbleSize(data, props, calculatedProps);
	    } else {
	      return Math.max(props.size, 1);
	    }
	  },
	
	  getPath: function getPath(props) {
	    var pathFunctions = {
	      circle: _pathHelpers2["default"].circle,
	      square: _pathHelpers2["default"].square,
	      diamond: _pathHelpers2["default"].diamond,
	      triangleDown: _pathHelpers2["default"].triangleDown,
	      triangleUp: _pathHelpers2["default"].triangleUp,
	      plus: _pathHelpers2["default"].plus,
	      star: _pathHelpers2["default"].star
	    };
	    var size = _victoryCore.Helpers.evaluateProp(props.size, props.data);
	    var symbol = _victoryCore.Helpers.evaluateProp(props.symbol, props.data);
	    return pathFunctions[symbol].call(null, props.x, props.y, size);
	  }
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _lodashUtilityRange = __webpack_require__(93);
	
	var _lodashUtilityRange2 = _interopRequireDefault(_lodashUtilityRange);
	
	module.exports = {
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
	    var starCoords = (0, _lodashUtilityRange2["default"])(10).map(function (index) {
	      var length = index % 2 === 0 ? baseSize : baseSize / 2;
	      return length * Math.sin(angle * (index + 1)) + x + ",\n        " + (length * Math.cos(angle * (index + 1)) + y);
	    });
	    return "M " + starCoords.join("L") + " z";
	  }
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  VictoryPie: __webpack_require__(158)
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _d3Shape = __webpack_require__(141);
	
	var _d3Shape2 = _interopRequireDefault(_d3Shape);
	
	var _lodashLangIsArray = __webpack_require__(19);
	
	var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);
	
	var _lodashObjectMerge = __webpack_require__(62);
	
	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
	var _lodashObjectAssign = __webpack_require__(5);
	
	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
	var _lodashObjectPick = __webpack_require__(72);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	var _victoryCore = __webpack_require__(1);
	
	var _slice = __webpack_require__(159);
	
	var _slice2 = _interopRequireDefault(_slice);
	
	var _sliceLabel = __webpack_require__(160);
	
	var _sliceLabel2 = _interopRequireDefault(_sliceLabel);
	
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
	  return _d3Shape2["default"].arc().outerRadius(radius).innerRadius(innerRadius);
	};
	
	var VictoryPie = (function (_React$Component) {
	  _inherits(VictoryPie, _React$Component);
	
	  function VictoryPie() {
	    _classCallCheck(this, VictoryPie);
	
	    _get(Object.getPrototypeOf(VictoryPie.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryPie, [{
	    key: "renderSlice",
	    value: function renderSlice(slice, index, calculatedProps) {
	      var style = calculatedProps.style;
	      var colorScale = calculatedProps.colorScale;
	      var makeSlicePath = calculatedProps.makeSlicePath;
	      var labelPosition = calculatedProps.labelPosition;
	
	      var fill = colorScale[index % colorScale.length];
	      var sliceStyle = (0, _lodashObjectMerge2["default"])({}, style.data, { fill: fill });
	      return _react2["default"].createElement(
	        "g",
	        { key: index },
	        _react2["default"].createElement(_slice2["default"], {
	          slice: slice,
	          pathFunction: makeSlicePath,
	          style: sliceStyle
	        }),
	        _react2["default"].createElement(_sliceLabel2["default"], {
	          labelComponent: this.props.labelComponent,
	          style: style.labels,
	          positionFunction: labelPosition.centroid,
	          slice: slice
	        })
	      );
	    }
	  }, {
	    key: "renderData",
	    value: function renderData(props, calculatedProps) {
	      var _this = this;
	
	      var _calculatedProps = calculatedProps;
	      var style = _calculatedProps.style;
	      var radius = _calculatedProps.radius;
	
	      var data = _victoryCore.Helpers.getData(props);
	      var labelPosition = getLabelPosition(props, style, radius);
	      var colorScale = (0, _lodashLangIsArray2["default"])(props.colorScale) ? props.colorScale : _victoryCore.Style.getColorScale(props.colorScale);
	      var makeSlicePath = _d3Shape2["default"].arc().outerRadius(radius).innerRadius(this.props.innerRadius);
	
	      calculatedProps = (0, _lodashObjectAssign2["default"])(calculatedProps, { data: data, colorScale: colorScale, makeSlicePath: makeSlicePath, labelPosition: labelPosition });
	
	      var pie = _d3Shape2["default"].pie().sort(null).startAngle(degreesToRadians(props.startAngle)).endAngle(degreesToRadians(props.endAngle)).padAngle(degreesToRadians(props.padAngle)).value(function (datum) {
	        return datum.y;
	      });
	      var slices = pie(data);
	
	      return _react2["default"].createElement(
	        "g",
	        null,
	        slices.map(function (slice, index) {
	          return _this.renderSlice(slice, index, calculatedProps);
	        })
	      );
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      if (this.props.animate) {
	        // Do less work by having `VictoryAnimation` tween only values that
	        // make sense to tween. In the future, allow customization of animated
	        // prop whitelist/blacklist?
	        var animateData = (0, _lodashObjectPick2["default"])(this.props, ["data", "endAngle", "height", "innerRadius", "padAngle", "padding", "colorScale", "startAngle", "style", "width"]);
	        return _react2["default"].createElement(
	          _victoryCore.VictoryAnimation,
	          _extends({}, this.props.animate, { data: animateData }),
	          function (props) {
	            return _react2["default"].createElement(VictoryPie, _extends({}, _this2.props, props, { animate: null }));
	          }
	        );
	      }
	
	      var style = _victoryCore.Helpers.getStyles(this.props.style, defaultStyles, this.props.height, this.props.width);
	      var padding = _victoryCore.Helpers.getPadding(this.props);
	      var radius = getRadius(this.props, padding);
	      var parentStyle = style.parent;
	      var xOffset = radius + padding.left;
	      var yOffset = radius + padding.top;
	
	      var group = _react2["default"].createElement(
	        "g",
	        { style: parentStyle, transform: "translate(" + xOffset + ", " + yOffset + ")" },
	        this.renderData(this.props, { style: style, padding: padding, radius: radius })
	      );
	
	      return this.props.standalone ? _react2["default"].createElement(
	        "svg",
	        { style: parentStyle },
	        group
	      ) : group;
	    }
	  }], [{
	    key: "propTypes",
	    value: {
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
	       * of each data point will be used as a label.
	       */
	      labelComponent: _react.PropTypes.element,
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
	    },
	    enumerable: true
	  }, {
	    key: "defaultProps",
	    value: {
	      data: [{ x: "A", y: 1 }, { x: "B", y: 2 }, { x: "C", y: 3 }, { x: "D", y: 1 }, { x: "E", y: 2 }],
	      endAngle: 360,
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
	    },
	    enumerable: true
	  }]);
	
	  return VictoryPie;
	})(_react2["default"].Component);
	
	exports["default"] = VictoryPie;
	module.exports = exports["default"];

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _lodashObjectMerge = __webpack_require__(62);
	
	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
	var _lodashObjectOmit = __webpack_require__(151);
	
	var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);
	
	var Slice = (function (_React$Component) {
	  _inherits(Slice, _React$Component);
	
	  function Slice() {
	    _classCallCheck(this, Slice);
	
	    _get(Object.getPrototypeOf(Slice.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(Slice, [{
	    key: "renderSlice",
	    value: function renderSlice(props) {
	      var dataStyles = (0, _lodashObjectOmit2["default"])(props.slice.data, ["x", "y", "label"]);
	      var style = _victoryCore.Helpers.evaluateStyle((0, _lodashObjectMerge2["default"])({}, props.style, dataStyles), props.slice.data);
	      return _react2["default"].createElement("path", {
	        d: props.pathFunction(props.slice),
	        style: style
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.renderSlice(this.props);
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      slice: _react.PropTypes.object,
	      pathFunction: _react.PropTypes.func,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return Slice;
	})(_react2["default"].Component);
	
	exports["default"] = Slice;
	module.exports = exports["default"];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _victoryCore = __webpack_require__(1);
	
	var _lodashObjectMerge = __webpack_require__(62);
	
	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
	var _lodashObjectAssign = __webpack_require__(5);
	
	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
	var SliceLabel = (function (_React$Component) {
	  _inherits(SliceLabel, _React$Component);
	
	  function SliceLabel() {
	    _classCallCheck(this, SliceLabel);
	
	    _get(Object.getPrototypeOf(SliceLabel.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(SliceLabel, [{
	    key: "renderLabelComponent",
	    value: function renderLabelComponent(props, position, label) {
	      var component = props.labelComponent;
	      var style = _victoryCore.Helpers.evaluateStyle((0, _lodashObjectMerge2["default"])({ padding: 0 }, props.style, component.props.style), this.data);
	      var children = component.props.children || label;
	      var newProps = {
	        x: component.props.x || position[0],
	        y: component.props.y || position[1],
	        data: props.slice.data, // Pass data for custom label component to access
	        textAnchor: component.props.textAnchor || "start",
	        verticalAnchor: component.props.verticalAnchor || "middle",
	        style: style
	      };
	      return _react2["default"].cloneElement(component, newProps, children);
	    }
	  }, {
	    key: "renderVictoryLabel",
	    value: function renderVictoryLabel(props, position, label) {
	      var style = _victoryCore.Helpers.evaluateStyle((0, _lodashObjectAssign2["default"])({ padding: 0 }, props.style), props.slice.data);
	      return _react2["default"].createElement(
	        _victoryCore.VictoryLabel,
	        {
	          x: position[0],
	          y: position[1],
	          data: props.slice.data,
	          style: style
	        },
	        label
	      );
	    }
	  }, {
	    key: "renderLabel",
	    value: function renderLabel(props) {
	      var position = props.positionFunction(props.slice);
	      var data = props.slice.data;
	      var dataLabel = data.xName ? "" + data.xName : "" + data.x;
	      var label = data.label ? "" + _victoryCore.Helpers.evaluateProp(data.label, data) : dataLabel;
	      return props.labelComponent ? this.renderLabelComponent(props, position, label) : this.renderVictoryLabel(props, position, label);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.renderLabel(this.props);
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      labelComponent: _react.PropTypes.any,
	      positionFunction: _react.PropTypes.func,
	      slice: _react.PropTypes.object,
	      style: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return SliceLabel;
	})(_react2["default"].Component);
	
	exports["default"] = SliceLabel;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory.js.map
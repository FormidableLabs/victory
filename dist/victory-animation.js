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
	
	var _radium = __webpack_require__(3);
	
	var _radium2 = _interopRequireDefault(_radium);
	
	var VictoryAnimation = (function (_React$Component) {
	  _inherits(VictoryAnimation, _React$Component);
	
	  function VictoryAnimation() {
	    _classCallCheck(this, _VictoryAnimation);
	
	    _get(Object.getPrototypeOf(_VictoryAnimation.prototype), "constructor", this).apply(this, arguments);
	  }
	
	  _createClass(VictoryAnimation, [{
	    key: "getStyles",
	    value: function getStyles() {
	      return {
	        base: {
	          color: "#000",
	          fontSize: 12,
	          textDecoration: "underline"
	        },
	        red: {
	          color: "#d71920",
	          fontSize: 30
	        }
	      };
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var styles = this.getStyles();
	      return _react2["default"].createElement(
	        "div",
	        { style: [styles.base, this.props.color === "red" && styles.red] },
	        "Edit me!"
	      );
	    }
	  }]);
	
	  var _VictoryAnimation = VictoryAnimation;
	  VictoryAnimation = (0, _radium2["default"])(VictoryAnimation) || VictoryAnimation;
	  return VictoryAnimation;
	})(_react2["default"].Component);
	
	VictoryAnimation.propTypes = {
	  color: _react2["default"].PropTypes.string
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

	'use strict';
	
	var Enhancer = __webpack_require__(4);
	
	module.exports = function (ComposedComponent) {
	  return Enhancer(ComposedComponent);
	};
	module.exports.Style = __webpack_require__(14);
	module.exports.getState = __webpack_require__(8);
	module.exports.keyframes = __webpack_require__(16);
	module.exports.Config = __webpack_require__(13);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* @flow */
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var resolveStyles = __webpack_require__(6);
	
	var enhanceWithRadium = function enhanceWithRadium(ComposedComponent) {
	  var RadiumEnhancer = (function (_ComposedComponent) {
	    function RadiumEnhancer() {
	      _classCallCheck(this, RadiumEnhancer);
	
	      _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'constructor', this).apply(this, arguments);
	
	      this.state = this.state || {};
	      this.state._radiumStyleState = {};
	    }
	
	    _inherits(RadiumEnhancer, _ComposedComponent);
	
	    _createClass(RadiumEnhancer, [{
	      key: 'render',
	      value: function render() {
	        var renderedElement = _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'render', this).call(this);
	        return resolveStyles(this, renderedElement);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        if (_get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this)) {
	          _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this).call(this);
	        }
	
	        if (this._radiumMouseUpListener) {
	          this._radiumMouseUpListener.remove();
	        }
	
	        if (this._radiumMediaQueryListenersByQuery) {
	          Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
	            this._radiumMediaQueryListenersByQuery[query].remove();
	          }, this);
	        }
	      }
	    }]);
	
	    return RadiumEnhancer;
	  })(ComposedComponent);
	
	  // Class inheritance uses Object.create and because of __proto__ issues
	  // with IE <10 any static properties of the superclass aren't inherited and
	  // so need to be manually populated
	  // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-
	  var staticKeys = ['defaultProps', 'propTypes', 'contextTypes', 'childContextTypes'];
	
	  staticKeys.forEach(function (key) {
	    if (ComposedComponent.hasOwnProperty(key)) {
	      RadiumEnhancer[key] = ComposedComponent[key];
	    }
	  });
	
	  if (process.env.NODE_ENV !== 'production') {
	    // This fixes React Hot Loader by exposing the original components top level
	    // prototype methods on the Radium enhanced prototype as discussed in #219.
	    Object.keys(ComposedComponent.prototype).forEach(function (key) {
	      if (!RadiumEnhancer.prototype.hasOwnProperty(key)) {
	        RadiumEnhancer.prototype[key] = ComposedComponent.prototype[key];
	      }
	    });
	  }
	
	  RadiumEnhancer.displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
	
	  return RadiumEnhancer;
	};
	
	module.exports = enhanceWithRadium;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
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
	            currentQueue[queueIndex].run();
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
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* @flow */
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var MouseUpListener = __webpack_require__(7);
	var getState = __webpack_require__(8);
	var getStateKey = __webpack_require__(9);
	var Prefixer = __webpack_require__(10);
	var Config = __webpack_require__(13);
	
	var ExecutionEnvironment = __webpack_require__(11);
	var React = __webpack_require__(2);
	
	// babel-eslint 3.1.7 fails here for some reason, error:
	//   0:0  error  Cannot call method 'isSequenceExpression' of undefined
	//
	// declare class RadiumComponent extends ReactComponent {
	//   _lastMouseDown: number,
	//   _radiumMediaQueryListenersByQuery: Object<string, {remove: () => void}>,
	//   _radiumMouseUpListener: {remove: () => void},
	// }
	
	var mediaQueryListByQueryString = {};
	
	var _isSpecialKey = function _isSpecialKey(key) {
	  return key[0] === ':' || key[0] === '@';
	};
	
	var _getStyleState = function _getStyleState(component, key, value) {
	  return getState(component.state, key, value);
	};
	
	var _setStyleState = function _setStyleState(component, key, newState) {
	  var existing = component._lastRadiumState || component.state && component.state._radiumStyleState || {};
	
	  var state = { _radiumStyleState: _extends({}, existing) };
	  state._radiumStyleState[key] = _extends({}, state._radiumStyleState[key], newState);
	
	  component._lastRadiumState = state._radiumStyleState;
	  component.setState(state);
	};
	
	// Merge style objects. Special casing for props starting with ';'; the values
	// should be objects, and are merged with others of the same name (instead of
	// overwriting).
	var _mergeStyles = function _mergeStyles(styles) {
	  var result = {};
	
	  styles.forEach(function (style) {
	    if (!style || typeof style !== 'object' || Array.isArray(style)) {
	      return;
	    }
	
	    Object.keys(style).forEach(function (key) {
	      if (_isSpecialKey(key) && result[key]) {
	        result[key] = _mergeStyles([result[key], style[key]]);
	      } else {
	        result[key] = style[key];
	      }
	    });
	  });
	
	  return result;
	};
	
	var _mouseUp = function _mouseUp(component) {
	  Object.keys(component.state._radiumStyleState).forEach(function (key) {
	    if (_getStyleState(component, key, ':active')) {
	      _setStyleState(component, key, { ':active': false });
	    }
	  });
	};
	
	var _onMediaQueryChange = function _onMediaQueryChange(component, query, mediaQueryList) {
	  var state = {};
	  state[query] = mediaQueryList.matches;
	  _setStyleState(component, '_all', state);
	};
	
	var _resolveMediaQueryStyles = function _resolveMediaQueryStyles(component, style) {
	  if (!Config.canMatchMedia()) {
	    return style;
	  }
	
	  Object.keys(style).filter(function (name) {
	    return name[0] === '@';
	  }).map(function (query) {
	    var mediaQueryStyles = style[query];
	    query = query.replace('@media ', '');
	
	    // Create a global MediaQueryList if one doesn't already exist
	    var mql = mediaQueryListByQueryString[query];
	    if (!mql) {
	      mediaQueryListByQueryString[query] = mql = Config.matchMedia(query);
	    }
	
	    // Keep track of which keys already have listeners
	    if (!component._radiumMediaQueryListenersByQuery) {
	      component._radiumMediaQueryListenersByQuery = {};
	    }
	
	    if (!component._radiumMediaQueryListenersByQuery[query]) {
	      var listener = _onMediaQueryChange.bind(null, component, query);
	      mql.addListener(listener);
	      component._radiumMediaQueryListenersByQuery[query] = {
	        remove: function remove() {
	          mql.removeListener(listener);
	        }
	      };
	    }
	
	    // Apply media query states
	    if (mql.matches) {
	      style = _mergeStyles([style, mediaQueryStyles]);
	    }
	  });
	
	  return style;
	};
	
	// Wrapper around React.cloneElement. To avoid processing the same element
	// twice, whenever we clone an element add a special non-enumerable prop to
	// make sure we don't process this element again.
	var _cloneElement = function _cloneElement(renderedElement, newProps, newChildren) {
	  var clone = React.cloneElement(renderedElement, newProps, newChildren);
	
	  Object.defineProperty(clone.props, '_radiumDidResolveStyles', { value: true, enumerable: false });
	
	  return clone;
	};
	
	//
	// The nucleus of Radium. resolveStyles is called on the rendered elements
	// before they are returned in render. It iterates over the elements and
	// children, rewriting props to add event handlers required to capture user
	// interactions (e.g. mouse over). It also replaces the style prop because it
	// adds in the various interaction styles (e.g. :hover).
	//
	var resolveStyles = function resolveStyles(component, // ReactComponent, flow+eslint complaining
	renderedElement, // ReactElement
	existingKeyMap) {
	  // ReactElement
	  existingKeyMap = existingKeyMap || {};
	
	  if (!renderedElement || renderedElement.props && renderedElement.props._radiumDidResolveStyles) {
	    return renderedElement;
	  }
	
	  // Recurse over children first in case we bail early. Note that children only
	  // include those rendered in `this` component. Child nodes in other components
	  // will not be here, so each component needs to use Radium.
	  var newChildren;
	  var oldChildren = renderedElement.props.children;
	  if (oldChildren) {
	    var childrenType = typeof oldChildren;
	    if (childrenType === 'string' || childrenType === 'number' || childrenType === 'function') {
	      // Don't do anything with a single primitive child or functions
	      newChildren = oldChildren;
	    } else if (React.Children.count(oldChildren) === 1 && oldChildren.type) {
	      // If a React Element is an only child, don't wrap it in an array for
	      // React.Children.map() for React.Children.only() compatibility.
	      var onlyChild = React.Children.only(oldChildren);
	      newChildren = resolveStyles(component, onlyChild, existingKeyMap);
	    } else {
	      newChildren = React.Children.map(oldChildren, function (child) {
	        if (React.isValidElement(child)) {
	          return resolveStyles(component, child, existingKeyMap);
	        }
	
	        return child;
	      });
	    }
	  }
	
	  // Bail early if element is not a simple ReactDOMElement.
	  if (!React.isValidElement(renderedElement) || typeof renderedElement.type !== 'string') {
	    if (oldChildren === newChildren) {
	      return renderedElement;
	    }
	
	    return _cloneElement(renderedElement, renderedElement.props, newChildren);
	  }
	
	  var props = renderedElement.props;
	  var style = props.style;
	  var newProps = {};
	
	  // Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
	  // Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
	  if (Array.isArray(style)) {
	    style = _mergeStyles(style);
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    // Warn if you use longhand and shorthand properties in the same style
	    // object.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
	
	    var shorthandPropertyExpansions = {
	      'background': ['backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundPositionX', 'backgroundPositionY', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'backgroundSize'],
	      'border': ['borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth'],
	      'borderImage': ['borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth'],
	      'borderRadius': ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
	      'font': ['fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontWeight', 'lineHeight'],
	      'listStyle': ['listStyleImage', 'listStylePosition', 'listStyleType'],
	      'margin': ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
	      'padding': ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
	      'transition': ['transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction']
	    };
	
	    var checkProps = function checkProps(s) {
	      if (typeof s !== 'object' || !s) {
	        return;
	      }
	
	      var styleKeys = Object.keys(s);
	      styleKeys.forEach(function (styleKey) {
	        if (shorthandPropertyExpansions[styleKey] && shorthandPropertyExpansions[styleKey].some(function (sp) {
	          return styleKeys.indexOf(sp) !== -1;
	        })) {
	          /* eslint-disable no-console */
	          console.warn('Radium: property "' + styleKey + '" in style object', style, ': do not mix longhand and ' + 'shorthand properties in the same style object. Check the render ' + 'method of ' + component.constructor.displayName + '.', 'See https://github.com/FormidableLabs/radium/issues/95 for more ' + 'information.');
	          /* eslint-enable no-console */
	        }
	      });
	
	      styleKeys.forEach(function (k) {
	        return checkProps(s[k]);
	      });
	    };
	    checkProps(style);
	  }
	
	  // Bail early if no interactive styles.
	  if (!style || !Object.keys(style).some(_isSpecialKey)) {
	    if (style) {
	      // Still perform vendor prefixing, though.
	      newProps.style = Prefixer.getPrefixedStyle(style);
	      return _cloneElement(renderedElement, newProps, newChildren);
	    } else if (newChildren) {
	      return _cloneElement(renderedElement, {}, newChildren);
	    }
	
	    return renderedElement;
	  }
	
	  // We need a unique key to correlate state changes due to user interaction
	  // with the rendered element, so we know to apply the proper interactive
	  // styles.
	  var originalKey = renderedElement.ref || renderedElement.key;
	  var key = getStateKey(originalKey);
	
	  if (existingKeyMap[key]) {
	    throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.'));
	  }
	
	  existingKeyMap[key] = true;
	
	  // Media queries can contain pseudo styles, like :hover
	  style = _resolveMediaQueryStyles(component, style);
	
	  var newStyle = {};
	  Object.keys(style).forEach(function (styleKey) {
	    if (!_isSpecialKey(styleKey)) {
	      newStyle[styleKey] = style[styleKey];
	    }
	  });
	
	  // Only add handlers if necessary
	  if (style[':hover'] || style[':active']) {
	    // Always call the existing handler if one is already defined.
	    // This code, and the very similar ones below, could be abstracted a bit
	    // more, but it hurts readability IMO.
	    var existingOnMouseEnter = props.onMouseEnter;
	    newProps.onMouseEnter = function (e) {
	      existingOnMouseEnter && existingOnMouseEnter(e);
	      _setStyleState(component, key, { ':hover': true });
	    };
	
	    var existingOnMouseLeave = props.onMouseLeave;
	    newProps.onMouseLeave = function (e) {
	      existingOnMouseLeave && existingOnMouseLeave(e);
	      _setStyleState(component, key, { ':hover': false });
	    };
	  }
	
	  if (style[':active']) {
	    var existingOnMouseDown = props.onMouseDown;
	    newProps.onMouseDown = function (e) {
	      existingOnMouseDown && existingOnMouseDown(e);
	      component._lastMouseDown = Date.now();
	      _setStyleState(component, key, { ':active': true });
	    };
	  }
	
	  if (style[':focus']) {
	    var existingOnFocus = props.onFocus;
	    newProps.onFocus = function (e) {
	      existingOnFocus && existingOnFocus(e);
	      _setStyleState(component, key, { ':focus': true });
	    };
	
	    var existingOnBlur = props.onBlur;
	    newProps.onBlur = function (e) {
	      existingOnBlur && existingOnBlur(e);
	      _setStyleState(component, key, { ':focus': false });
	    };
	  }
	
	  // Merge the styles in the order they were defined
	  var interactionStyles = Object.keys(style).filter(function (name) {
	    return name === ':active' && _getStyleState(component, key, ':active') || name === ':hover' && _getStyleState(component, key, ':hover') || name === ':focus' && _getStyleState(component, key, ':focus');
	  }).map(function (name) {
	    return style[name];
	  });
	
	  if (interactionStyles.length) {
	    newStyle = _mergeStyles([newStyle].concat(interactionStyles));
	  }
	
	  if (style[':active'] && !component._radiumMouseUpListener && ExecutionEnvironment.canUseEventListeners) {
	    component._radiumMouseUpListener = MouseUpListener.subscribe(_mouseUp.bind(null, component));
	  }
	
	  newProps.style = Prefixer.getPrefixedStyle(newStyle);
	
	  return _cloneElement(renderedElement, newProps, newChildren);
	};
	
	// Exposing methods for tests is ugly, but the alternative, re-requiring the
	// module each time, is too slow
	resolveStyles.__clearStateForTests = function () {
	  mediaQueryListByQueryString = {};
	};
	
	module.exports = resolveStyles;
	
	// Bail if we've already processed this element. This ensures that only the
	// owner of an element processes that element, since the owner's render
	// function will be called first (which will always be the case, since you
	// can't know what else to render until you render the parent component).
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* @flow */
	
	'use strict';
	
	var _callbacks = [];
	var _mouseUpListenerIsActive = false;
	
	var _handleMouseUp = function _handleMouseUp(ev) {
	  _callbacks.forEach(function (callback) {
	    callback(ev);
	  });
	};
	
	var subscribe = function subscribe(callback) {
	  if (_callbacks.indexOf(callback) === -1) {
	    _callbacks.push(callback);
	  }
	
	  if (!_mouseUpListenerIsActive) {
	    window.addEventListener('mouseup', _handleMouseUp);
	    _mouseUpListenerIsActive = true;
	  }
	
	  return {
	    remove: function remove() {
	      var index = _callbacks.indexOf(callback);
	      _callbacks.splice(index, 1);
	
	      if (_callbacks.length === 0 && _mouseUpListenerIsActive) {
	        window.removeEventListener('mouseup', _handleMouseUp);
	        _mouseUpListenerIsActive = false;
	      }
	    }
	  };
	};
	
	module.exports = {
	  subscribe: subscribe
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	'use strict';
	
	var getStateKey = __webpack_require__(9);
	
	var VALID_KEYS = [':active', ':focus', ':hover'];
	
	var getState = function getState(state, elementKey, value) {
	  if (VALID_KEYS.indexOf(value) === -1) {
	    throw new Error('Radium.getState invalid value param: `' + value + '`');
	  }
	
	  var key = getStateKey(elementKey);
	
	  return !!(state && state._radiumStyleState && state._radiumStyleState[key] && state._radiumStyleState[key][value]) || false;
	};
	
	module.exports = getState;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/* @flow */
	
	'use strict';
	
	var getStateKey = function getStateKey(elementKey) {
	  return elementKey === null || elementKey === undefined ? 'main' : elementKey.toString();
	};
	
	module.exports = getStateKey;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Based on https://github.com/jsstyles/css-vendor, but without having to
	 * convert between different cases all the time.
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(11);
	var arrayFind = __webpack_require__(12);
	
	var VENDOR_PREFIX_REGEX = /-(moz|webkit|ms|o)-/;
	
	var infoByCssPrefix = {
	  '-moz-': {
	    cssPrefix: '-moz-',
	    jsPrefix: 'Moz',
	    alternativeProperties: {
	      // OLD - Firefox 19-
	      alignItems: [{ css: '-moz-box-align', js: 'MozBoxAlign' }],
	      flex: [{ css: '-moz-box-flex', js: 'MozBoxFlex' }],
	      flexDirection: [{ css: '-moz-box-orient', js: 'MozBoxOrient' }],
	      justifyContent: [{ css: '-moz-box-pack', js: 'MozBoxPack' }],
	      order: [{ css: '-moz-box-ordinal-group', js: 'MozBoxOrdinalGroup' }]
	    },
	    alternativeValues: {
	      // OLD - Firefox 19-
	      alignItems: {
	        'flex-start': ['start'],
	        'flex-end': ['end']
	      },
	      display: {
	        flex: ['-moz-box']
	      },
	      flexDirection: {
	        column: ['vertical'],
	        row: ['horizontal']
	      },
	      justifyContent: {
	        'flex-start': ['start'],
	        'flex-end': ['end'],
	        'space-between': ['justify']
	      }
	    }
	  },
	  '-ms-': {
	    cssPrefix: '-ms-',
	    jsPrefix: 'ms',
	    alternativeProperties: {
	      // TWEENER - IE 10
	      alignContent: [{ css: '-ms-flex-line-pack', js: 'msFlexLinePack' }],
	      alignItems: [{ css: '-ms-flex-align', js: 'msFlexAlign' }],
	      alignSelf: [{ css: '-ms-flex-align-item', js: 'msFlexAlignItem' }],
	      justifyContent: [{ css: '-ms-flex-pack', js: 'msFlexPack' }],
	      order: [{ css: '-ms-flex-order', js: 'msFlexOrder' }]
	    },
	    alternativeValues: {
	      // TWEENER - IE 10
	      alignContent: {
	        'flex-start': ['start'],
	        'flex-end': ['end'],
	        'space-between': ['justify'],
	        'space-around': ['distribute']
	      },
	      alignItems: {
	        'flex-start': ['start'],
	        'flex-end': ['end']
	      },
	      alignSelf: {
	        'flex-start': ['start'],
	        'flex-end': ['end']
	      },
	      display: {
	        flex: ['-ms-flexbox'],
	        'inline-flex': ['-ms-inline-flexbox']
	      },
	      justifyContent: {
	        'flex-start': ['start'],
	        'flex-end': ['end'],
	        'space-between': ['justify'],
	        'space-around': ['distribute']
	      }
	    }
	  },
	  '-o-': {
	    cssPrefix: '-o-',
	    jsPrefix: 'O'
	  },
	  '-webkit-': {
	    cssPrefix: '-webkit-',
	    jsPrefix: 'Webkit',
	    alternativeProperties: {
	      // OLD - iOS 6-, Safari 3.1-6
	      alignItems: [{ css: '-webkit-box-align', js: 'WebkitBoxAlign' }],
	      flex: [{ css: '-webkit-box-flex', js: 'MozBoxFlex' }],
	      flexDirection: [{ css: '-webkit-box-orient', js: 'WebkitBoxOrient' }],
	      justifyContent: [{ css: '-webkit-box-pack', js: 'WebkitBoxPack' }],
	      order: [{ css: '-webkit-box-ordinal-group', js: 'WebkitBoxOrdinalGroup' }]
	    },
	    alternativeValues: {
	      // OLD - iOS 6-, Safari 3.1-6
	      alignItems: {
	        'flex-start': ['start'],
	        'flex-end': ['end']
	      },
	      display: {
	        flex: ['-webkit-box']
	      },
	      flexDirection: {
	        row: ['horizontal'],
	        column: ['vertical']
	      },
	      justifyContent: {
	        'flex-start': ['start'],
	        'flex-end': ['end'],
	        'space-between': ['justify']
	      }
	    }
	  }
	};
	
	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 * Copied from React core June 22, 2015.
	 * https://github.com/facebook/react/blob/
	 * ba81b60ad8e93b747be42a03b797065932c49c96/
	 * src/renderers/dom/shared/CSSProperty.js
	 */
	var isUnitlessNumber = {
	  boxFlex: true,
	  boxFlexGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	
	  // SVG-related properties
	  fillOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	
	var domStyle = {};
	var prefixedPropertyCache = {};
	var prefixedValueCache = {};
	var prefixInfo = {
	  cssPrefix: '',
	  jsPrefix: ''
	};
	
	if (ExecutionEnvironment.canUseDOM) {
	  domStyle = document.createElement('p').style;
	
	  // older Firefox versions may have no float property in style object
	  // so we need to add it manually
	  if (domStyle.float === undefined) {
	    domStyle.float = '';
	  }
	
	  // Based on http://davidwalsh.name/vendor-prefix
	  var cssVendorPrefix;
	  var prefixMatch;
	  var windowStyles = window.getComputedStyle(document.documentElement, '');
	
	  // Array.prototype.slice.call(windowStyles) fails with
	  // "Uncaught TypeError: undefined is not a function"
	  // in older versions Android (KitKat) web views
	  for (var i = 0; i < windowStyles.length; i++) {
	    prefixMatch = windowStyles[i].match(VENDOR_PREFIX_REGEX);
	
	    if (prefixMatch) {
	      break;
	    }
	  }
	
	  cssVendorPrefix = prefixMatch && prefixMatch[0];
	
	  prefixInfo = infoByCssPrefix[cssVendorPrefix] || prefixInfo;
	}
	
	var _camelCaseRegex = /([a-z])?([A-Z])/g;
	var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
	  return p1 + '-' + p2.toLowerCase();
	};
	var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
	  return s.replace(_camelCaseRegex, _camelCaseReplacer);
	};
	
	var getPrefixedPropertyName = function getPrefixedPropertyName(property) {
	  if (prefixedPropertyCache.hasOwnProperty(property)) {
	    return prefixedPropertyCache[property];
	  }
	
	  var unprefixed = {
	    css: _camelCaseToDashCase(property),
	    js: property,
	    isDefaultForServer: true
	  };
	
	  // Try the prefixed version first. Chrome in particular has the `filter` and
	  // `webkitFilter` properties availalbe on the style object, but only the
	  // prefixed version actually works.
	  var possiblePropertyNames = [
	  // Prefixed
	  {
	    css: prefixInfo.cssPrefix + _camelCaseToDashCase(property),
	    js: prefixInfo.jsPrefix + property[0].toUpperCase() + property.slice(1)
	  }, unprefixed];
	
	  // Alternative property names
	  if (prefixInfo.alternativeProperties && prefixInfo.alternativeProperties[property]) {
	    possiblePropertyNames = possiblePropertyNames.concat(prefixInfo.alternativeProperties[property]);
	  }
	
	  var workingProperty = arrayFind(possiblePropertyNames, function (possiblePropertyName) {
	    if (possiblePropertyName.js in domStyle) {
	      return possiblePropertyName;
	    }
	  }) || false;
	
	  return prefixedPropertyCache[property] = workingProperty;
	};
	
	// React is planning to deprecate adding px automatically
	// (https://github.com/facebook/react/issues/1873), and if they do, this
	// should change to a warning or be removed in favor of React's warning.
	// Same goes for below.
	var _addPixelSuffixToValueIfNeeded = function _addPixelSuffixToValueIfNeeded(originalProperty, value) {
	  if (value !== 0 && !isNaN(value) && !isUnitlessNumber[originalProperty]) {
	    return value + 'px';
	  }
	  return value;
	};
	
	var _getPrefixedValue = function _getPrefixedValue(property, value, originalProperty) {
	  if (!Array.isArray(value)) {
	    // don't test numbers (pure or stringy), but do add 'px' prefix if needed
	    if (!isNaN(value) && value !== null) {
	      return _addPixelSuffixToValueIfNeeded(originalProperty, value);
	    }
	
	    if (typeof value !== 'string') {
	      if (value !== null && value !== undefined) {
	        value = value.toString();
	      } else {
	        return value;
	      }
	    }
	
	    // don't test numbers with units (e.g. 10em)
	    if (!isNaN(parseInt(value, 10))) {
	      return value;
	    }
	  }
	
	  var cacheKey = Array.isArray(value) ? value.join(' || ')
	  /* babel-eslint bug: https://github.com/babel/babel-eslint/issues/149 */
	  /* eslint-disable space-infix-ops */
	  :
	  /* eslint-enable space-infix-ops */
	  property + value;
	
	  if (prefixedValueCache.hasOwnProperty(cacheKey)) {
	    return prefixedValueCache[cacheKey];
	  }
	
	  var possibleValues;
	  if (Array.isArray(value)) {
	    // Add px for the same values React would, otherwise the testing below will
	    // fail and it will try to fallback.
	    possibleValues = value.map(function (v) {
	      return _addPixelSuffixToValueIfNeeded(originalProperty, v);
	    });
	
	    // Add prefixed versions
	    possibleValues = possibleValues.concat(value.filter(function (v) {
	      return !isNaN(v);
	    }) // Don't prefix numbers
	    .map(function (v) {
	      return prefixInfo.cssPrefix + v;
	    }));
	  } else {
	    possibleValues = [
	    // Unprefixed
	    value,
	    // Prefixed
	    prefixInfo.cssPrefix + value];
	  }
	
	  // Alternative values
	  if (prefixInfo.alternativeValues && prefixInfo.alternativeValues[originalProperty] && prefixInfo.alternativeValues[originalProperty][value]) {
	    possibleValues = possibleValues.concat(prefixInfo.alternativeValues[originalProperty][value]);
	  }
	
	  // Test possible value in order
	  var workingValue = arrayFind(possibleValues, function (possibleValue) {
	    domStyle[property] = '';
	    domStyle[property] = possibleValue;
	
	    // Note that we just make sure it is not an empty string. Browsers will
	    // sometimes rewrite values, but still accept them. They will set the value
	    // to an empty string if not supported.
	    // E.g. for border, "solid 1px black" becomes "1px solid black"
	    //      but "foobar" becomes "", since it is not supported.
	    return !!domStyle[property];
	  });
	
	  if (workingValue) {
	    prefixedValueCache[cacheKey] = workingValue;
	  } else {
	    // Unsupported, assume unprefixed works, but warn
	    prefixedValueCache[cacheKey] = value;
	
	    if (process.env.NODE_ENV !== 'production') {
	      /* eslint-disable no-console */
	      if (console && console.warn) {
	        console.warn('Unsupported CSS value "' + value + '" for property "' + property + '"');
	      }
	      /* eslint-enable no-console */
	    }
	  }
	
	  return prefixedValueCache[cacheKey];
	};
	
	// Returns a new style object with vendor prefixes added to property names
	// and values.
	var getPrefixedStyle = function getPrefixedStyle(style, mode /* 'css' or 'js' */) {
	  mode = mode || 'js';
	
	  if (!ExecutionEnvironment.canUseDOM) {
	    return Object.keys(style).reduce(function (newStyle, key) {
	      var value = style[key];
	      var newKey = mode === 'css' ? _camelCaseToDashCase(key) : key;
	      var newValue = Array.isArray(value) ? value[0] : value;
	      newStyle[newKey] = newValue;
	      return newStyle;
	    }, {});
	  }
	
	  var prefixedStyle = {};
	  Object.keys(style).forEach(function (property) {
	    var value = style[property];
	
	    var newProperty = getPrefixedPropertyName(property);
	    if (newProperty === false) {
	      // Ignore unsupported properties
	      /* eslint-disable no-console */
	      if (console && console.warn) {
	        console.warn('Unsupported CSS property "' + property + '"');
	      }
	      /* eslint-enable no-console */
	      return;
	    }
	
	    var newValue = _getPrefixedValue(newProperty.js, value, property);
	
	    prefixedStyle[newProperty[mode]] = newValue;
	  });
	  return prefixedStyle;
	};
	
	module.exports = {
	  getPrefixedPropertyName: getPrefixedPropertyName,
	  getPrefixedStyle: getPrefixedStyle,
	  cssPrefix: prefixInfo.cssPrefix,
	  jsPrefix: prefixInfo.jsPrefix
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/
	
	(function () {
		'use strict';
	
		var canUseDOM = !!(
			typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
		);
	
		var ExecutionEnvironment = {
	
			canUseDOM: canUseDOM,
	
			canUseWorkers: typeof Worker !== 'undefined',
	
			canUseEventListeners:
				canUseDOM && !!(window.addEventListener || window.attachEvent),
	
			canUseViewport: canUseDOM && !!window.screen
	
		};
	
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return ExecutionEnvironment;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}
	
	}());


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	function find(array, predicate, context) {
	  if (typeof Array.prototype.find === 'function') {
	    return array.find(predicate, context);
	  }
	
	  context = context || this;
	  var length = array.length;
	  var i;
	
	  if (typeof predicate !== 'function') {
	    throw new TypeError(predicate + ' is not a function');
	  }
	
	  for (i = 0; i < length; i++) {
	    if (predicate.call(context, array[i], i, array)) {
	      return array[i];
	    }
	  }
	}
	
	module.exports = find;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(11);
	
	var _matchMediaFunction = ExecutionEnvironment.canUseDOM && window && window.matchMedia && function (mediaQueryString) {
	  return window.matchMedia(mediaQueryString);
	};
	
	module.exports = {
	  canMatchMedia: function canMatchMedia() {
	    return typeof _matchMediaFunction === 'function';
	  },
	
	  matchMedia: function matchMedia(query) {
	    return _matchMediaFunction(query);
	  },
	
	  setMatchMedia: function setMatchMedia(nextMatchMediaFunction) {
	    _matchMediaFunction = nextMatchMediaFunction;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createMarkupForStyles = __webpack_require__(15);
	var Prefixer = __webpack_require__(10);
	
	var React = __webpack_require__(2);
	
	var buildCssString = function buildCssString(selector, rules) {
	  if (!selector || !rules) {
	    return;
	  }
	
	  var prefixedRules = Prefixer.getPrefixedStyle(rules, 'css');
	  var serializedRules = createMarkupForStyles(prefixedRules);
	
	  return selector + '{' + serializedRules + '}';
	};
	
	var Style = React.createClass({
	  displayName: 'Style',
	
	  propTypes: {
	    rules: React.PropTypes.object,
	    scopeSelector: React.PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      scopeSelector: ''
	    };
	  },
	
	  _buildStyles: function _buildStyles(styles) {
	    var _this = this;
	
	    return Object.keys(styles).reduce(function (accumulator, selector) {
	      var rules = styles[selector];
	
	      if (selector === 'mediaQueries') {
	        accumulator += _this._buildMediaQueryString(rules);
	      } else {
	        var completeSelector = (_this.props.scopeSelector ? _this.props.scopeSelector + ' ' : '') + selector;
	        accumulator += buildCssString(completeSelector, rules);
	      }
	
	      return accumulator;
	    }, '');
	  },
	
	  _buildMediaQueryString: function _buildMediaQueryString(mediaQueryObj) {
	    var _this2 = this;
	
	    var contextMediaQueries = this._getContextMediaQueries();
	    var mediaQueryString = '';
	
	    Object.keys(mediaQueryObj).forEach(function (query) {
	      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
	      mediaQueryString += '@media ' + completeQuery + '{' + _this2._buildStyles(mediaQueryObj[query]) + '}';
	    });
	
	    return mediaQueryString;
	  },
	
	  _getContextMediaQueries: function _getContextMediaQueries() {
	    var contextMediaQueries = {};
	    if (this.context && this.context.mediaQueries) {
	      Object.keys(this.context.mediaQueries).forEach((function (query) {
	        contextMediaQueries[query] = this.context.mediaQueries[query].media;
	      }).bind(this));
	    }
	
	    return contextMediaQueries;
	  },
	
	  render: function render() {
	    if (!this.props.rules) {
	      return null;
	    }
	
	    var styles = this._buildStyles(this.props.rules);
	
	    return React.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
	  }
	});
	
	module.exports = Style;

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* @flow */
	
	'use strict';
	
	var createMarkupForStyles = function createMarkupForStyles(style, spaces) {
	  spaces = spaces || '';
	  return Object.keys(style).map(function (property) {
	    return spaces + property + ': ' + style[property] + ';';
	  }).join('\n');
	};
	
	module.exports = createMarkupForStyles;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	'use strict';
	
	var createMarkupForStyles = __webpack_require__(15);
	var Prefixer = __webpack_require__(10);
	
	var ExecutionEnvironment = __webpack_require__(11);
	
	var isAnimationSupported = ExecutionEnvironment.canUseDOM && Prefixer.getPrefixedPropertyName('animation') !== false;
	
	var animationIndex = 1;
	var animationStyleSheet = null;
	var keyframesPrefixed = null;
	
	if (isAnimationSupported) {
	  animationStyleSheet = document.createElement('style');
	  document.head.appendChild(animationStyleSheet);
	
	  // Test if prefix needed for keyframes (copied from PrefixFree)
	  keyframesPrefixed = 'keyframes';
	  animationStyleSheet.textContent = '@keyframes {}';
	  if (!animationStyleSheet.sheet.cssRules.length) {
	    keyframesPrefixed = Prefixer.cssPrefix + 'keyframes';
	  }
	}
	
	// Simple animation helper that injects CSS into a style object containing the
	// keyframes, and returns a string with the generated animation name.
	var keyframes = function keyframes(keyframeRules) {
	  var name = 'Animation' + animationIndex;
	  animationIndex += 1;
	
	  if (!isAnimationSupported) {
	    return name;
	  }
	
	  var rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' + Object.keys(keyframeRules).map(function (percentage) {
	    var props = keyframeRules[percentage];
	    var prefixedProps = Prefixer.getPrefixedStyle(props, 'css');
	    var serializedProps = createMarkupForStyles(prefixedProps, '  ');
	    return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
	  }).join('\n') + '\n}\n';
	
	  // for flow
	  /* istanbul ignore next */
	  if (!animationStyleSheet) {
	    throw new Error('keyframes not initialized properly');
	  }
	
	  animationStyleSheet.sheet.insertRule(rule, animationStyleSheet.sheet.cssRules.length);
	  return name;
	};
	
	module.exports = keyframes;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory-animation.js.map
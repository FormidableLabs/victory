(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["VictoryPie"] = factory(require("react"));
	else
		root["VictoryPie"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_66__) {
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

	Object.defineProperty(exports,"__esModule",{value:true});exports.VictoryPie=undefined;var _victoryPie=__webpack_require__(1);var _victoryPie2=_interopRequireDefault(_victoryPie);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.
	VictoryPie=_victoryPie2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _partialRight2=__webpack_require__(2);var _partialRight3=_interopRequireDefault(_partialRight2);var _isFunction2=__webpack_require__(43);var _isFunction3=_interopRequireDefault(_isFunction2);var _defaults2=__webpack_require__(44);var _defaults3=_interopRequireDefault(_defaults2);var _assign2=__webpack_require__(62);var _assign3=_interopRequireDefault(_assign2);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	
	var _victoryCore=__webpack_require__(67);
	
	
	
	
	
	
	
	
	
	var _helperMethods=__webpack_require__(253);var _helperMethods2=_interopRequireDefault(_helperMethods);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
	
	var fallbackProps={
	endAngle:360,
	height:400,
	innerRadius:0,
	cornerRadius:0,
	padAngle:0,
	padding:30,
	width:400,
	startAngle:0,
	colorScale:[
	"#ffffff",
	"#f0f0f0",
	"#d9d9d9",
	"#bdbdbd",
	"#969696",
	"#737373",
	"#525252",
	"#252525",
	"#000000"]};var
	
	
	
	VictoryPie=function(_React$Component){_inherits(VictoryPie,_React$Component);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function VictoryPie(){_classCallCheck(this,VictoryPie);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(VictoryPie).call(this));
	
	_this.state={};
	var getScopedEvents=_victoryCore.Events.getScopedEvents.bind(_this);
	_this.getEvents=(0,_partialRight3.default)(_victoryCore.Events.getEvents.bind(_this),getScopedEvents);
	_this.getEventState=_victoryCore.Events.getEventState.bind(_this);return _this;
	}_createClass(VictoryPie,[{key:"componentWillMount",value:function componentWillMount()
	
	{
	this.setupEvents(this.props);
	}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(
	
	newProps){
	this.setupEvents(newProps);
	}},{key:"setupEvents",value:function setupEvents(
	
	props){var
	sharedEvents=props.sharedEvents;
	var components=["dataComponent","labelComponent","groupComponent","containerComponent"];
	this.componentEvents=_victoryCore.Events.getComponentEvents(props,components);
	this.baseProps=_helperMethods2.default.getBaseProps(props,fallbackProps);
	this.dataKeys=Object.keys(this.baseProps).filter(function(key){return key!=="parent";});
	this.getSharedEventState=sharedEvents&&(0,_isFunction3.default)(sharedEvents.getEventState)?
	sharedEvents.getEventState:function(){return undefined;};
	this.hasEvents=props.events||props.sharedEvents||this.componentEvents;
	}},{key:"renderData",value:function renderData(
	
	props){var _this2=this;var
	dataComponent=props.dataComponent;var labelComponent=props.labelComponent;var groupComponent=props.groupComponent;var clipId=props.clipId;var
	role=VictoryPie.role;
	var dataComponents=[];
	var labelComponents=[];
	var getComponentProps=function getComponentProps(index,component,type){
	var key=_this2.dataKeys[index];
	if(_this2.hasEvents){
	var events=_this2.getEvents(props,type,key);
	var componentProps=(0,_defaults3.default)(
	{index:index,key:role+"-"+type+"-"+key,role:role+"-"+index,clipId:clipId},
	_this2.getEventState(key,type),
	_this2.getSharedEventState(key,type),
	component.props,
	_this2.baseProps[key][type]);
	
	return(0,_assign3.default)(
	{},componentProps,{events:_victoryCore.Events.getPartialEvents(events,key,componentProps)});
	
	}
	return(0,_defaults3.default)(
	{index:index,key:role+"-"+type+"-"+key,role:role+"-"+index,clipId:clipId},
	component.props,
	_this2.baseProps[key][type]);
	
	};
	
	for(var index=0,len=this.dataKeys.length;index<len;index++){
	var key=this.dataKeys[index];
	var dataProps=getComponentProps(index,dataComponent,"data");
	dataComponents[index]=_react2.default.cloneElement(dataComponent,dataProps);
	
	if(this.baseProps[key].labels||this.hasEvents){
	var labelProps=getComponentProps(index,labelComponent,"labels");
	if(labelProps&&labelProps.text){
	labelComponents[index]=_react2.default.cloneElement(labelComponent,labelProps);
	}
	}
	}
	return labelComponents.length>0?
	_react2.default.cloneElement.apply(_react2.default,[groupComponent,{}].concat(dataComponents,labelComponents)):
	dataComponents;
	}},{key:"renderContainer",value:function renderContainer(
	
	props,group){
	var parentProps=void 0;
	if(this.hasEvents){
	var parentEvents=this.getEvents(props,"parent","parent");
	var baseProps=(0,_defaults3.default)(
	{},
	this.getEventState("parent","parent"),
	this.getSharedEventState("parent","parent"),
	props.containerComponent.props,
	this.baseProps.parent);
	
	parentProps=(0,_assign3.default)(
	{},baseProps,{events:_victoryCore.Events.getPartialEvents(parentEvents,"parent",baseProps)});
	
	}else{
	parentProps=(0,_defaults3.default)({},props.containerComponent.props,this.baseProps.parent);
	}
	
	return _react2.default.cloneElement(props.containerComponent,parentProps,group);
	}},{key:"renderGroup",value:function renderGroup(
	
	children,style,offset){var
	x=offset.x;var y=offset.y;
	return _react2.default.cloneElement(
	this.props.groupComponent,
	{role:"presentation",style:style,transform:"translate("+x+", "+y+")"},
	children);
	
	}},{key:"render",value:function render()
	
	{
	var props=_victoryCore.Helpers.modifyProps(this.props,fallbackProps,"pie");var
	
	animate=props.animate;var standalone=props.standalone;
	
	
	
	if(animate){
	var whitelist=[
	"data","endAngle","height","innerRadius","cornerRadius","padAngle","padding",
	"colorScale","startAngle","style","width"];
	
	return(
	_react2.default.createElement(_victoryCore.VictoryTransition,{animate:animate,animationWhitelist:whitelist},
	_react2.default.createElement(this.constructor,props)));
	
	
	}
	
	var calculatedProps=_helperMethods2.default.getCalculatedValues(props,fallbackProps);var
	style=calculatedProps.style;var padding=calculatedProps.padding;var radius=calculatedProps.radius;
	var offset={x:radius+padding.left,y:radius+padding.top};
	var children=this.renderData(props,calculatedProps);
	var group=this.renderGroup(children,style.parent,offset);
	return standalone?this.renderContainer(props,group):group;
	}}]);return VictoryPie;}(_react2.default.Component);VictoryPie.displayName="VictoryPie";VictoryPie.defaultTransitions={onExit:{duration:500,before:function before(){return{y:0,label:" "};}},onEnter:{duration:500,before:function before(){return{y:0,label:" "};},after:function after(datum){return{y:datum.y,label:datum.label};}}};VictoryPie.propTypes={animate:_react.PropTypes.object,colorScale:_react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string),_react.PropTypes.oneOf(["greyscale","qualitative","heatmap","warm","cool","red","green","blue"])]),data:_react.PropTypes.array,dataComponent:_react.PropTypes.element,endAngle:_react.PropTypes.number,events:_react.PropTypes.arrayOf(_react.PropTypes.shape({target:_react.PropTypes.oneOf(["data","labels","parent"]),eventKey:_react.PropTypes.oneOfType([_react.PropTypes.func,_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer,_victoryCore.PropTypes.nonNegative]),_react.PropTypes.string]),eventHandlers:_react.PropTypes.object})),name:_react.PropTypes.string,eventKey:_react.PropTypes.oneOfType([_react.PropTypes.func,_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer,_victoryCore.PropTypes.nonNegative]),_react.PropTypes.string]),sharedEvents:_react.PropTypes.shape({events:_react.PropTypes.array,getEventState:_react.PropTypes.func}),height:_victoryCore.PropTypes.nonNegative,innerRadius:_victoryCore.PropTypes.nonNegative,cornerRadius:_victoryCore.PropTypes.nonNegative,labelComponent:_react.PropTypes.element,labels:_react.PropTypes.oneOfType([_react.PropTypes.func,_react.PropTypes.array]),labelRadius:_react.PropTypes.oneOfType([_victoryCore.PropTypes.nonNegative,_react.PropTypes.func]),padAngle:_victoryCore.PropTypes.nonNegative,padding:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.shape({top:_react.PropTypes.number,bottom:_react.PropTypes.number,left:_react.PropTypes.number,right:_react.PropTypes.number})]),standalone:_react.PropTypes.bool,startAngle:_react.PropTypes.number,style:_react.PropTypes.shape({parent:_react.PropTypes.object,data:_react.PropTypes.object,labels:_react.PropTypes.object}),width:_victoryCore.PropTypes.nonNegative,x:_react.PropTypes.oneOfType([_react.PropTypes.func,_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer,_victoryCore.PropTypes.nonNegative]),_react.PropTypes.string,_react.PropTypes.arrayOf(_react.PropTypes.string)]),y:_react.PropTypes.oneOfType([_react.PropTypes.func,_victoryCore.PropTypes.allOfType([_victoryCore.PropTypes.integer,_victoryCore.PropTypes.nonNegative]),_react.PropTypes.string,_react.PropTypes.arrayOf(_react.PropTypes.string)]),containerComponent:_react.PropTypes.element,theme:_react.PropTypes.object,groupComponent:_react.PropTypes.element};VictoryPie.defaultProps={data:[{x:"A",y:1},{x:"B",y:2},{x:"C",y:3},{x:"D",y:1},{x:"E",y:2}],standalone:true,x:"x",y:"y",dataComponent:_react2.default.createElement(_victoryCore.Slice,null),labelComponent:_react2.default.createElement(_victoryCore.VictoryLabel,null),containerComponent:_react2.default.createElement(_victoryCore.VictoryContainer,null),groupComponent:_react2.default.createElement("g",null),theme:_victoryCore.VictoryTheme.grayscale};VictoryPie.getBaseProps=(0,_partialRight3.default)(_helperMethods2.default.getBaseProps.bind(_helperMethods2.default),fallbackProps);exports.default=VictoryPie;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(3),
	    createWrap = __webpack_require__(5),
	    getHolder = __webpack_require__(34),
	    replaceHolders = __webpack_require__(38);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
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
	var partialRight = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partialRight));
	  return createWrap(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(4);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = baseRest;


/***/ },
/* 4 */
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
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(6),
	    createBind = __webpack_require__(7),
	    createCurry = __webpack_require__(13),
	    createHybrid = __webpack_require__(14),
	    createPartial = __webpack_require__(39),
	    getData = __webpack_require__(40),
	    mergeData = __webpack_require__(41),
	    setData = __webpack_require__(20),
	    setWrapToString = __webpack_require__(21),
	    toInteger = __webpack_require__(42);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags.
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
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
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
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setWrapToString(setter(result, newData), func, bitmask);
	}
	
	module.exports = createWrap;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var createCtor = __webpack_require__(8),
	    root = __webpack_require__(11);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);
	
	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}
	
	module.exports = createBind;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(9),
	    isObject = __webpack_require__(10);
	
	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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
	
	module.exports = createCtor;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10);
	
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
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(12);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(4),
	    createCtor = __webpack_require__(8),
	    createHybrid = __webpack_require__(14),
	    createRecurry = __webpack_require__(18),
	    getHolder = __webpack_require__(34),
	    replaceHolders = __webpack_require__(38),
	    root = __webpack_require__(11);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);
	
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
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createCurry;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(15),
	    composeArgsRight = __webpack_require__(16),
	    countHolders = __webpack_require__(17),
	    createCtor = __webpack_require__(8),
	    createRecurry = __webpack_require__(18),
	    getHolder = __webpack_require__(34),
	    reorder = __webpack_require__(35),
	    replaceHolders = __webpack_require__(38),
	    root = __webpack_require__(11);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
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
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);
	
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
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
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
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}
	
	module.exports = createHybrid;


/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(19),
	    setData = __webpack_require__(20),
	    setWrapToString = __webpack_require__(21);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
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
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
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
	  return setWrapToString(result, func, bitmask);
	}
	
	module.exports = createRecurry;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 20 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(22),
	    defineProperty = __webpack_require__(23),
	    getWrapDetails = __webpack_require__(25),
	    identity = __webpack_require__(26),
	    insertWrapDetails = __webpack_require__(27),
	    updateWrapDetails = __webpack_require__(28);
	
	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return defineProperty(wrapper, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
	  });
	};
	
	module.exports = setWrapToString;


/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(24);
	
	/* Used to set `toString` methods. */
	var defineProperty = (function() {
	  var func = getNative(Object, 'defineProperty'),
	      name = getNative.name;
	
	  return (name && name.length > 2) ? func : undefined;
	}());
	
	module.exports = defineProperty;


/***/ },
/* 24 */
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
/* 25 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;
	
	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}
	
	module.exports = getWrapDetails;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
	
	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length,
	      lastIndex = length - 1;
	
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}
	
	module.exports = insertWrapDetails;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(29),
	    arrayIncludes = __webpack_require__(30);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256,
	    FLIP_FLAG = 512;
	
	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', ARY_FLAG],
	  ['bind', BIND_FLAG],
	  ['bindKey', BIND_KEY_FLAG],
	  ['curry', CURRY_FLAG],
	  ['curryRight', CURRY_RIGHT_FLAG],
	  ['flip', FLIP_FLAG],
	  ['partial', PARTIAL_FLAG],
	  ['partialRight', PARTIAL_RIGHT_FLAG],
	  ['rearg', REARG_FLAG]
	];
	
	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}
	
	module.exports = updateWrapDetails;


/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(31);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(32),
	    baseIsNaN = __webpack_require__(33);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
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
/* 32 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}
	
	module.exports = baseIsNaN;


/***/ },
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(36),
	    isIndex = __webpack_require__(37);
	
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(4),
	    createCtor = __webpack_require__(8),
	    root = __webpack_require__(11);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);
	
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
	
	module.exports = createPartial;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
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
/* 41 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
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
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
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
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
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
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(4),
	    assignInDefaults = __webpack_require__(45),
	    assignInWith = __webpack_require__(47),
	    baseRest = __webpack_require__(3);
	
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
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(46);
	
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
/* 46 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(48),
	    createAssigner = __webpack_require__(50),
	    keysIn = __webpack_require__(52);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(49);
	
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
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(46);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(3),
	    isIterateeCall = __webpack_require__(51);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
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
/* 51 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(53),
	    baseKeysIn = __webpack_require__(57),
	    isArrayLike = __webpack_require__(60);
	
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
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	module.exports = keysIn;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(54),
	    isArguments = __webpack_require__(55),
	    isArray = __webpack_require__(56),
	    isIndex = __webpack_require__(37);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 54 */
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
/* 55 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 56 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(10),
	    isPrototype = __webpack_require__(58),
	    nativeKeysIn = __webpack_require__(59);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 59 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(43),
	    isLength = __webpack_require__(61);
	
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
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(49),
	    copyObject = __webpack_require__(48),
	    createAssigner = __webpack_require__(50),
	    isArrayLike = __webpack_require__(60),
	    isPrototype = __webpack_require__(58),
	    keys = __webpack_require__(63);
	
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
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(58),
	    nativeKeys = __webpack_require__(64);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(65);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});exports.Flyout=exports.Voronoi=exports.Slice=exports.Point=exports.Line=exports.ErrorBar=exports.Curve=exports.ClipPath=exports.Candle=exports.Bar=exports.Area=exports.VictoryTooltip=exports.VictoryTheme=exports.VictoryContainer=exports.VictorySharedEvents=exports.VictoryTransition=exports.VictoryLabel=exports.VictoryAnimation=exports.DefaultTransitions=exports.Transitions=exports.TextSize=exports.Events=exports.PropTypes=exports.Style=exports.Log=exports.Helpers=exports.Collection=undefined;var _collection=__webpack_require__(68);Object.defineProperty(exports,"Collection",{enumerable:true,get:function get(){return _interopRequireDefault(_collection).default;}});var _helpers=__webpack_require__(69);Object.defineProperty(exports,"Helpers",{enumerable:true,get:function get(){return _interopRequireDefault(_helpers).
	default;}});var _log=__webpack_require__(185);Object.defineProperty(exports,"Log",{enumerable:true,get:function get(){return _interopRequireDefault(_log).
	default;}});var _style=__webpack_require__(187);Object.defineProperty(exports,"Style",{enumerable:true,get:function get(){return _interopRequireDefault(_style).
	default;}});var _propTypes=__webpack_require__(188);Object.defineProperty(exports,"PropTypes",{enumerable:true,get:function get(){return _interopRequireDefault(_propTypes).
	default;}});var _events=__webpack_require__(189);Object.defineProperty(exports,"Events",{enumerable:true,get:function get(){return _interopRequireDefault(_events).
	default;}});var _textsize=__webpack_require__(206);Object.defineProperty(exports,"TextSize",{enumerable:true,get:function get(){return _interopRequireDefault(_textsize).
	default;}});var _victoryAnimation=__webpack_require__(207);Object.defineProperty(exports,"VictoryAnimation",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryAnimation).
	
	
	
	
	default;}});var _victoryLabel=__webpack_require__(213);Object.defineProperty(exports,"VictoryLabel",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryLabel).
	default;}});var _victoryTransition=__webpack_require__(226);Object.defineProperty(exports,"VictoryTransition",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryTransition).
	default;}});var _victorySharedEvents=__webpack_require__(227);Object.defineProperty(exports,"VictorySharedEvents",{enumerable:true,get:function get(){return _interopRequireDefault(_victorySharedEvents).
	default;}});var _victoryContainer=__webpack_require__(229);Object.defineProperty(exports,"VictoryContainer",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryContainer).
	default;}});var _victoryTheme=__webpack_require__(230);Object.defineProperty(exports,"VictoryTheme",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryTheme).
	default;}});var _victoryTooltip=__webpack_require__(233);Object.defineProperty(exports,"VictoryTooltip",{enumerable:true,get:function get(){return _interopRequireDefault(_victoryTooltip).
	default;}});var _index=__webpack_require__(234);Object.defineProperty(exports,"Area",{enumerable:true,get:function get(){return _index.
	
	Area;}});Object.defineProperty(exports,"Bar",{enumerable:true,get:function get(){return _index.Bar;}});Object.defineProperty(exports,"Candle",{enumerable:true,get:function get(){return _index.Candle;}});Object.defineProperty(exports,"ClipPath",{enumerable:true,get:function get(){return _index.ClipPath;}});Object.defineProperty(exports,"Curve",{enumerable:true,get:function get(){return _index.Curve;}});Object.defineProperty(exports,"ErrorBar",{enumerable:true,get:function get(){return _index.ErrorBar;}});Object.defineProperty(exports,"Line",{enumerable:true,get:function get(){return _index.Line;}});Object.defineProperty(exports,"Point",{enumerable:true,get:function get(){return _index.Point;}});Object.defineProperty(exports,"Slice",{enumerable:true,get:function get(){return _index.Slice;}});Object.defineProperty(exports,"Voronoi",{enumerable:true,get:function get(){return _index.Voronoi;}});Object.defineProperty(exports,"Flyout",{enumerable:true,get:function get(){return _index.Flyout;}});var _transitions=__webpack_require__(216);var Transitions=_interopRequireWildcard(_transitions);var _defaultTransitions=__webpack_require__(217);var DefaultTransitions=_interopRequireWildcard(_defaultTransitions);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.Transitions=Transitions;exports.DefaultTransitions=DefaultTransitions;

/***/ },
/* 68 */
/***/ function(module, exports) {

	Object.defineProperty(exports,"__esModule",{value:true});function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}exports.default={
	isNonEmptyArray:function isNonEmptyArray(collection){
	return Array.isArray(collection)&&collection.length>0;
	},
	
	containsStrings:function containsStrings(collection){
	return Array.isArray(collection)&&collection.some(function(value){return typeof value==="string";});
	},
	
	containsDates:function containsDates(collection){
	return Array.isArray(collection)&&collection.some(function(value){return value instanceof Date;});
	},
	
	containsOnlyStrings:function containsOnlyStrings(collection){
	return this.isNonEmptyArray(collection)&&
	collection.every(function(value){return typeof value==="string";});
	},
	
	isArrayOfArrays:function isArrayOfArrays(collection){
	return this.isNonEmptyArray(collection)&&collection.every(Array.isArray);
	},
	
	removeUndefined:function removeUndefined(arr){
	return arr.filter(function(el){return el!==undefined;});
	},
	
	getMaxValue:function getMaxValue(arr){for(var _len=arguments.length,values=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){values[_key-1]=arguments[_key];}
	var array=arr.concat(values);
	return this.containsDates(array)?
	new Date(Math.max.apply(Math,_toConsumableArray(array))):
	Math.max.apply(Math,_toConsumableArray(array));
	},
	
	getMinValue:function getMinValue(arr){for(var _len2=arguments.length,values=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){values[_key2-1]=arguments[_key2];}
	var array=arr.concat(values);
	return this.containsDates(array)?
	new Date(Math.min.apply(Math,_toConsumableArray(array))):
	Math.min.apply(Math,_toConsumableArray(array));
	}};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _omit2=__webpack_require__(70);var _omit3=_interopRequireDefault(_omit2);var _property2=__webpack_require__(122);var _property3=_interopRequireDefault(_property2);var _partial2=__webpack_require__(133);var _partial3=_interopRequireDefault(_partial2);var _merge2=__webpack_require__(164);var _merge3=_interopRequireDefault(_merge2);var _isFunction2=__webpack_require__(119);var _isFunction3=_interopRequireDefault(_isFunction2);var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}exports.default=
	
	{
	getPadding:function getPadding(props){
	var padding=typeof props.padding==="number"?props.padding:0;
	var paddingObj=typeof props.padding==="object"?props.padding:{};
	return{
	top:paddingObj.top||padding,
	bottom:paddingObj.bottom||padding,
	left:paddingObj.left||padding,
	right:paddingObj.right||padding};
	
	},
	
	getStyles:function getStyles(style,defaultStyles,height,width){// eslint-disable-line max-params
	if(!style){
	return(0,_defaults3.default)({parent:{height:height,width:width}},defaultStyles);
	}var
	
	data=style.data;var labels=style.labels;var parent=style.parent;
	var defaultParent=defaultStyles&&defaultStyles.parent||{};
	var defaultLabels=defaultStyles&&defaultStyles.labels||{};
	var defaultData=defaultStyles&&defaultStyles.data||{};
	return{
	parent:(0,_defaults3.default)({height:height,width:width},parent,defaultParent),
	labels:(0,_defaults3.default)({},labels,defaultLabels),
	data:(0,_defaults3.default)({},data,defaultData)};
	
	},
	
	evaluateProp:function evaluateProp(prop,data,index){
	return(0,_isFunction3.default)(prop)?prop(data,index):prop;
	},
	
	evaluateStyle:function evaluateStyle(style,data,index){var _this=this;
	if(!style||!Object.keys(style).some(function(value){return(0,_isFunction3.default)(style[value]);})){
	return style;
	}
	return Object.keys(style).reduce(function(prev,curr){
	prev[curr]=_this.evaluateProp(style[curr],data,index);
	return prev;
	},{});
	},
	
	getRange:function getRange(props,axis){
	// determine how to lay the axis and what direction positive and negative are
	var isVertical=axis!=="x";
	var padding=this.getPadding(props);
	if(isVertical){
	return[props.height-padding.bottom,padding.top];
	}
	return[padding.left,props.width-padding.right];
	},
	
	// for components that take single datasets
	getData:function getData(props){
	if(props.data){
	return this.formatData(props.data,props);
	}
	},
	
	formatData:function formatData(dataset,props,stringMap){
	if(!dataset){
	return[];
	}
	stringMap=stringMap||{
	x:this.createStringMap(props,"x"),
	y:this.createStringMap(props,"y")};
	
	var accessor={
	x:this.createAccessor(props.x),
	y:this.createAccessor(props.y)};
	
	
	return dataset.map(function(datum){
	var x=accessor.x(datum);
	var y=accessor.y(datum);
	var xName=typeof x==="string"?{xName:x}:undefined;
	var yName=typeof y==="string"?{yName:y}:undefined;
	return(0,_defaults3.default)({
	// map string data to numeric values, and add names
	x:typeof x==="string"?stringMap.x[x]:x,
	y:typeof y==="string"?stringMap.y[y]:y},
	xName,yName,datum);
	});
	},
	
	createStringMap:function createStringMap(props,axis){
	var stringsFromData=this.getStringsFromData(props,axis);
	if(stringsFromData.length){
	return stringsFromData.reduce(function(acc,string,index){
	acc[string]=index+1;
	return acc;
	},{});
	}
	return null;
	},
	
	getStringsFromData:function getStringsFromData(props,axis){
	if(!props.data){
	return[];
	}
	var key=typeof props[axis]==="undefined"?axis:props[axis];
	var accessor=this.createAccessor(key);
	var dataStrings=props.data.
	map(function(datum){return accessor(datum);}).
	filter(function(datum){return typeof datum==="string";});
	// return a unique set of strings
	return dataStrings.reduce(function(prev,curr){
	if(typeof curr!=="undefined"&&curr!==null&&prev.indexOf(curr)===-1){
	prev.push(curr);
	}
	return prev;
	},[]);
	},
	
	createAccessor:function createAccessor(key){
	// creates a data accessor function
	// given a property key, path, array index, or null for identity.
	if((0,_isFunction3.default)(key)){
	return key;
	}else if(key===null||typeof key==="undefined"){
	// null/undefined means "return the data item itself"
	return function(x){return x;};
	}
	// otherwise, assume it is an array index, property key or path (_.property handles all three)
	return(0,_property3.default)(key);
	},
	
	getPartialEvents:function getPartialEvents(events,index,childProps){
	return events?
	Object.keys(events).reduce(function(memo,eventName){
	/* eslint max-params: 0 */
	memo[eventName]=(0,_partial3.default)(
	events[eventName],
	_partial3.default.placeholder,// evt will still be the first argument for event handlers
	childProps,// event handlers will have access to data component props, including data
	index,// used in setting a unique state property
	eventName// used in setting a unique state property
	);
	return memo;
	},{}):
	{};
	},
	
	modifyProps:function modifyProps(props,fallbackProps,role){
	var theme=props.theme&&props.theme[role]?props.theme[role]:{};
	var themeProps=(0,_omit3.default)(theme,["style"]);
	var baseProps=(0,_defaults3.default)({},props,themeProps,fallbackProps);
	return(0,_defaults3.default)({},baseProps,{clipWidth:baseProps.width,clipHeight:baseProps.height});
	},
	
	getEvents:function getEvents(events,namespace){var _this2=this;
	var onEvent=function onEvent(evt,childProps,index,eventName){
	if(_this2.props.events[namespace]&&_this2.props.events[namespace][eventName]){
	_this2.setState(_defineProperty({},
	index,(0,_merge3.default)(
	{},
	_this2.state[index],
	_this2.props.events[namespace][eventName](evt,childProps,index))));
	
	
	}
	};
	
	return events?
	Object.keys(this.props.events[namespace]).reduce(function(memo,event){
	memo[event]=onEvent;
	return memo;
	},{}):{};
	},
	
	getEventState:function getEventState(index,namespace){
	return this.state[index]&&this.state[index][namespace];
	}};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(71),
	    baseDifference = __webpack_require__(72),
	    baseFlatten = __webpack_require__(91),
	    basePick = __webpack_require__(99),
	    baseRest = __webpack_require__(101),
	    getAllKeysIn = __webpack_require__(103),
	    toKey = __webpack_require__(121);
	
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
	var omit = baseRest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(baseFlatten(props, 1), toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(73),
	    arrayIncludes = __webpack_require__(84),
	    arrayIncludesWith = __webpack_require__(88),
	    arrayMap = __webpack_require__(71),
	    baseUnary = __webpack_require__(89),
	    cacheHas = __webpack_require__(90);
	
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(74),
	    setCacheAdd = __webpack_require__(82),
	    setCacheHas = __webpack_require__(83);
	
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(75),
	    listCacheDelete = __webpack_require__(76),
	    listCacheGet = __webpack_require__(79),
	    listCacheHas = __webpack_require__(80),
	    listCacheSet = __webpack_require__(81);
	
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
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(77);
	
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(78);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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
/* 78 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(77);
	
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(77);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(77);
	
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
/* 82 */
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
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(85);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(86),
	    baseIsNaN = __webpack_require__(87);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
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
/* 86 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}
	
	module.exports = baseIsNaN;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
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
/* 89 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
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
/* 90 */
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(92),
	    isFlattenable = __webpack_require__(93);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	
	  predicate || (predicate = isFlattenable);
	  result || (result = []);
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
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
/* 92 */
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(94),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(98);
	
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
	
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	
	module.exports = isFlattenable;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(95);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(96);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 97 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 98 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(100);
	
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
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}
	
	module.exports = basePick;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = basePickBy;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(102);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = baseRest;


/***/ },
/* 102 */
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
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(104),
	    getSymbolsIn = __webpack_require__(105),
	    keysIn = __webpack_require__(110);
	
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(92),
	    isArray = __webpack_require__(98);
	
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(92),
	    getPrototype = __webpack_require__(106),
	    getSymbols = __webpack_require__(108),
	    stubArray = __webpack_require__(109);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};
	
	module.exports = getSymbolsIn;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(107);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(107),
	    stubArray = __webpack_require__(109);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
	
	module.exports = getSymbols;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(111),
	    baseKeysIn = __webpack_require__(114),
	    isArrayLike = __webpack_require__(118);
	
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
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	module.exports = keysIn;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(112),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(98),
	    isIndex = __webpack_require__(113);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 112 */
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
/* 113 */
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(115),
	    isPrototype = __webpack_require__(116),
	    nativeKeysIn = __webpack_require__(117);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
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
/* 116 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 117 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(119),
	    isLength = __webpack_require__(120);
	
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
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(115);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
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
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
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
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 121 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(123),
	    basePropertyDeep = __webpack_require__(124),
	    isKey = __webpack_require__(130),
	    toKey = __webpack_require__(121);
	
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
/* 123 */
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(125);
	
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(126),
	    isKey = __webpack_require__(130),
	    toKey = __webpack_require__(121);
	
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(98),
	    stringToPath = __webpack_require__(127);
	
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(128),
	    toString = __webpack_require__(129);
	
	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	
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
	  string = toString(string);
	
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(98),
	    isSymbol = __webpack_require__(131);
	
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(132);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
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
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
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
/* 132 */
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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(101),
	    createWrap = __webpack_require__(134),
	    getHolder = __webpack_require__(156),
	    replaceHolders = __webpack_require__(159);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
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
	var partial = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partial));
	  return createWrap(func, PARTIAL_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partial.placeholder = {};
	
	module.exports = partial;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(135),
	    createBind = __webpack_require__(136),
	    createCurry = __webpack_require__(139),
	    createHybrid = __webpack_require__(140),
	    createPartial = __webpack_require__(160),
	    getData = __webpack_require__(161),
	    mergeData = __webpack_require__(162),
	    setData = __webpack_require__(146),
	    setWrapToString = __webpack_require__(147),
	    toInteger = __webpack_require__(163);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags.
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
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
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
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setWrapToString(setter(result, newData), func, bitmask);
	}
	
	module.exports = createWrap;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var createCtor = __webpack_require__(137),
	    root = __webpack_require__(95);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);
	
	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}
	
	module.exports = createBind;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(138),
	    isObject = __webpack_require__(115);
	
	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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
	
	module.exports = createCtor;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(115);
	
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(102),
	    createCtor = __webpack_require__(137),
	    createHybrid = __webpack_require__(140),
	    createRecurry = __webpack_require__(144),
	    getHolder = __webpack_require__(156),
	    replaceHolders = __webpack_require__(159),
	    root = __webpack_require__(95);
	
	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);
	
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
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createCurry;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(141),
	    composeArgsRight = __webpack_require__(142),
	    countHolders = __webpack_require__(143),
	    createCtor = __webpack_require__(137),
	    createRecurry = __webpack_require__(144),
	    getHolder = __webpack_require__(156),
	    reorder = __webpack_require__(157),
	    replaceHolders = __webpack_require__(159),
	    root = __webpack_require__(95);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
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
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);
	
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
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
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
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}
	
	module.exports = createHybrid;


/***/ },
/* 141 */
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
/* 142 */
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
/* 143 */
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(145),
	    setData = __webpack_require__(146),
	    setWrapToString = __webpack_require__(147);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
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
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
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
	  return setWrapToString(result, func, bitmask);
	}
	
	module.exports = createRecurry;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 146 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(148),
	    defineProperty = __webpack_require__(149),
	    getWrapDetails = __webpack_require__(151),
	    identity = __webpack_require__(152),
	    insertWrapDetails = __webpack_require__(153),
	    updateWrapDetails = __webpack_require__(154);
	
	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return defineProperty(wrapper, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
	  });
	};
	
	module.exports = setWrapToString;


/***/ },
/* 148 */
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150);
	
	/* Used to set `toString` methods. */
	var defineProperty = (function() {
	  var func = getNative(Object, 'defineProperty'),
	      name = getNative.name;
	
	  return (name && name.length > 2) ? func : undefined;
	}());
	
	module.exports = defineProperty;


/***/ },
/* 150 */
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
/* 151 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;
	
	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}
	
	module.exports = getWrapDetails;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
	
	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length,
	      lastIndex = length - 1;
	
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}
	
	module.exports = insertWrapDetails;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(155),
	    arrayIncludes = __webpack_require__(84);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256,
	    FLIP_FLAG = 512;
	
	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', ARY_FLAG],
	  ['bind', BIND_FLAG],
	  ['bindKey', BIND_KEY_FLAG],
	  ['curry', CURRY_FLAG],
	  ['curryRight', CURRY_RIGHT_FLAG],
	  ['flip', FLIP_FLAG],
	  ['partial', PARTIAL_FLAG],
	  ['partialRight', PARTIAL_RIGHT_FLAG],
	  ['rearg', REARG_FLAG]
	];
	
	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}
	
	module.exports = updateWrapDetails;


/***/ },
/* 155 */
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
/* 156 */
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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(158),
	    isIndex = __webpack_require__(113);
	
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
/* 158 */
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
/* 159 */
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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(102),
	    createCtor = __webpack_require__(137),
	    root = __webpack_require__(95);
	
	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);
	
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
	
	module.exports = createPartial;


/***/ },
/* 161 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
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
/* 162 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 163 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(165),
	    createAssigner = __webpack_require__(180);
	
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
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	
	module.exports = merge;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(166),
	    arrayEach = __webpack_require__(155),
	    assignMergeValue = __webpack_require__(167),
	    baseKeysIn = __webpack_require__(114),
	    baseMergeDeep = __webpack_require__(168),
	    isArray = __webpack_require__(98),
	    isObject = __webpack_require__(115),
	    isTypedArray = __webpack_require__(173);
	
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
	    var props = baseKeysIn(source);
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(75),
	    listCacheDelete = __webpack_require__(76),
	    listCacheGet = __webpack_require__(79),
	    listCacheHas = __webpack_require__(80),
	    listCacheSet = __webpack_require__(81);
	
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(78);
	
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(167),
	    baseClone = __webpack_require__(169),
	    copyArray = __webpack_require__(158),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(98),
	    isArrayLikeObject = __webpack_require__(170),
	    isFunction = __webpack_require__(119),
	    isObject = __webpack_require__(115),
	    isPlainObject = __webpack_require__(171),
	    isTypedArray = __webpack_require__(173),
	    toPlainObject = __webpack_require__(177);
	
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
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 169 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(118),
	    isObjectLike = __webpack_require__(132);
	
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(106),
	    isHostObject = __webpack_require__(172),
	    isObjectLike = __webpack_require__(132);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
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
/* 172 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(174),
	    baseUnary = __webpack_require__(89),
	    nodeUtil = __webpack_require__(175);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(120),
	    isObjectLike = __webpack_require__(132);
	
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
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(96);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(176)(module)))

/***/ },
/* 176 */
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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(178),
	    keysIn = __webpack_require__(110);
	
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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(179);
	
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
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(78);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(101),
	    isIterateeCall = __webpack_require__(181);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
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
/* 181 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(102),
	    assignInDefaults = __webpack_require__(183),
	    assignInWith = __webpack_require__(184),
	    baseRest = __webpack_require__(101);
	
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
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(78);
	
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
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(178),
	    createAssigner = __webpack_require__(180),
	    keysIn = __webpack_require__(110);
	
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
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports,"__esModule",{value:true});/* global console */
	/* eslint-disable no-console */
	
	// TODO: Use "warning" npm module like React is switching to.
	exports.default={
	warn:function warn(message){
	if(process.env.NODE_ENV!=="production"){
	if(console&&console.warn){
	console.warn(message);
	}
	}
	}};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(186)))

/***/ },
/* 186 */
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
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 187 */
/***/ function(module, exports) {

	Object.defineProperty(exports,"__esModule",{value:true});/**
	 * Given an object with CSS/SVG transform definitions, return the string value
	 * for use with the `transform` CSS property or SVG attribute. Note that we
	 * can't always guarantee the order will match the author's intended order, so
	 * authors should only use the object notation if they know that their transform
	 * is commutative or that there is only one.
	 * @param {Object} obj An object of transform definitions.
	 * @returns {String} The generated transform string.
	 */
	var toTransformString=function toTransformString(obj){for(var _len=arguments.length,more=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){more[_key-1]=arguments[_key];}
	if(more.length>0){
	return more.reduce(function(memo,currentObj){
	return[memo,toTransformString(currentObj)].join(" ");
	},toTransformString(obj));
	}else{
	if(!obj||typeof obj==="string"){
	return obj;
	}
	var transforms=[];
	for(var key in obj){
	if(obj.hasOwnProperty(key)){
	var value=obj[key];
	transforms.push(key+"("+value+")");
	}
	}
	return transforms.join(" ");
	}
	};exports.default=
	
	{
	
	toTransformString:toTransformString,
	
	/**
	   * Given the name of a color scale, getColorScale will return an array
	   * of 5 hex string values in that color scale. If no 'name' parameter
	   * is given, it will return the Victory default grayscale.
	   * @param {String} name The name of the color scale to return (optional).
	   * @returns {Array} An array of 5 hex string values composing a color scale.
	   */
	getColorScale:function getColorScale(name){
	var scales={
	greyscale:[
	"#cccccc","#969696","#636363","#252525"],
	
	qualitative:[
	"#334D5C","#45B29D","#EFC94C","#E27A3F","#DF5A49",
	"#4F7DA1","#55DBC1","#EFDA97","#E2A37F","#DF948A"],
	
	heatmap:["#428517","#77D200","#D6D305","#EC8E19","#C92B05"],
	warm:["#940031","#C43343","#DC5429","#FF821D","#FFAF55"],
	cool:["#2746B9","#0B69D4","#2794DB","#31BB76","#60E83B"],
	red:["#611310","#7D1D1D","#B02928","#B02928","#D86B67"],
	blue:["#002C61","#004B8F","#006BC9","#3795E5","#65B4F4"],
	green:["#354722","#466631","#649146","#8AB25C","#A9C97E"]};
	
	return name?scales[name]:scales.greyscale;
	}};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports,"__esModule",{value:true});var _isFunction2=__webpack_require__(119);var _isFunction3=_interopRequireDefault(_isFunction2);
	
	var _react=__webpack_require__(66);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
	
	/**
	 * Return a new validator based on `validator` but with the option to chain
	 * `isRequired` onto the validation. This is nearly identical to how React
	 * does it internally, but they don't expose their helper for us to use.
	 * @param {Function} validator Validation function.
	 * @returns {Function} Validator with `isRequired` option.
	 */
	var makeChainable=function makeChainable(validator){
	/* eslint-disable max-params */
	var _chainable=function _chainable(isRequired,props,propName,componentName){
	var value=props[propName];
	if(typeof value==="undefined"||value===null){
	if(isRequired){
	return new Error("Required `"+
	propName+"` was not specified in `"+componentName+"`.");
	
	}
	return null;
	}for(var _len=arguments.length,rest=Array(_len>4?_len-4:0),_key=4;_key<_len;_key++){rest[_key-4]=arguments[_key];}
	return validator.apply(undefined,[props,propName,componentName].concat(rest));
	};
	var chainable=_chainable.bind(null,false);
	chainable.isRequired=_chainable.bind(null,true);
	return chainable;
	};/* global console */
	
	var nullConstructor=function nullConstructor(){return null;};
	var undefinedConstructor=function undefinedConstructor(){return undefined;};
	
	/**
	 * Get the constructor of `value`. If `value` is null or undefined, return the
	 * special singletons `nullConstructor` or `undefinedConstructor`, respectively.
	 * @param {*} value Instance to return the constructor of.
	 * @returns {Function} Constructor of `value`.
	 */
	var getConstructor=function getConstructor(value){
	if(typeof value==="undefined"){
	return undefinedConstructor;
	}else if(value===null){
	return nullConstructor;
	}else{
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
	var getConstructorName=function getConstructorName(value){
	if(typeof value==="undefined"){
	return"undefined";
	}else if(value===null){
	return"null";
	}
	return Object.prototype.toString.call(value).slice(8,-1);
	};exports.default=
	
	{
	/**
	   * Return a new validator based on `propType` but which logs a `console.error`
	   * with `explanation` if used.
	   * @param {Function} propType The old, deprecated propType.
	   * @param {String} explanation The message to provide the user of the deprecated propType.
	   * @returns {Function} Validator which logs usage of this propType
	   */
	deprecated:function deprecated(propType,explanation){
	return function(props,propName,componentName){for(var _len2=arguments.length,rest=Array(_len2>3?_len2-3:0),_key2=3;_key2<_len2;_key2++){rest[_key2-3]=arguments[_key2];}
	if(process.env.NODE_ENV!=="production"){
	/* eslint-disable no-console */
	if(typeof console!=="undefined"&&console.error){
	if(props[propName]!==null){
	console.error(false,"\""+
	propName+"\" property of \""+componentName+"\" has been deprecated "+explanation);
	}
	}
	/* eslint-enable no-console */
	}
	return propType.apply(undefined,[props,propName,componentName].concat(rest));
	};
	},
	
	/**
	   * Return a new validator which returns true
	   * if and only if all validators passed as arguments return true.
	   * Like React.propTypes.oneOfType, except "all" instead of "any"
	   * @param {Array} validators Validation functions.
	   * @returns {Function} Combined validator function
	   */
	allOfType:function allOfType(validators){
	return makeChainable(function(props,propName,componentName){for(var _len3=arguments.length,rest=Array(_len3>3?_len3-3:0),_key3=3;_key3<_len3;_key3++){rest[_key3-3]=arguments[_key3];}
	var error=validators.reduce(function(result,validator){
	return result||validator.apply(undefined,[props,propName,componentName].concat(rest));
	},undefined);
	if(error){
	return error;
	}
	});
	},
	
	/**
	   * Check that the value is a non-negative number.
	   */
	nonNegative:makeChainable(function(props,propName,componentName){for(var _len4=arguments.length,rest=Array(_len4>3?_len4-3:0),_key4=3;_key4<_len4;_key4++){rest[_key4-3]=arguments[_key4];}
	var error=_react.PropTypes.number.apply(_react.PropTypes,[props,propName,componentName].concat(rest));
	if(error){
	return error;
	}
	var value=props[propName];
	if(value<0){
	return new Error("`"+
	propName+"` in `"+componentName+"` must be non-negative.");
	
	}
	}),
	
	/**
	   * Check that the value is an integer.
	   */
	integer:makeChainable(function(props,propName,componentName){for(var _len5=arguments.length,rest=Array(_len5>3?_len5-3:0),_key5=3;_key5<_len5;_key5++){rest[_key5-3]=arguments[_key5];}
	var error=_react.PropTypes.number.apply(_react.PropTypes,[props,propName,componentName].concat(rest));
	if(error){
	return error;
	}
	var value=props[propName];
	if(value%1!==0){
	return new Error("`"+
	propName+"` in `"+componentName+"` must be an integer.");
	
	}
	}),
	
	/**
	   * Check that the value is greater than zero.
	   */
	greaterThanZero:makeChainable(function(props,propName,componentName){for(var _len6=arguments.length,rest=Array(_len6>3?_len6-3:0),_key6=3;_key6<_len6;_key6++){rest[_key6-3]=arguments[_key6];}
	var error=_react.PropTypes.number.apply(_react.PropTypes,[props,propName,componentName].concat(rest));
	if(error){
	return error;
	}
	var value=props[propName];
	if(value<=0){
	return new Error("`"+
	propName+"` in `"+componentName+"` must be greater than zero.");
	
	}
	}),
	
	/**
	   * Check that the value is an Array of two unique values.
	   */
	domain:makeChainable(function(props,propName,componentName){for(var _len7=arguments.length,rest=Array(_len7>3?_len7-3:0),_key7=3;_key7<_len7;_key7++){rest[_key7-3]=arguments[_key7];}
	var error=_react.PropTypes.array.apply(_react.PropTypes,[props,propName,componentName].concat(rest));
	if(error){
	return error;
	}
	var value=props[propName];
	if(value.length!==2||value[1]===value[0]){
	return new Error("`"+
	propName+"` in `"+componentName+"` must be an array of two unique numeric values.");
	
	}
	}),
	
	/**
	   * Check that the value looks like a d3 `scale` function.
	   */
	scale:makeChainable(function(props,propName,componentName){
	var supportedScaleStrings=["linear","time","log","sqrt"];
	var validScale=function validScale(scl){
	if((0,_isFunction3.default)(scl)){
	return(0,_isFunction3.default)(scl.copy)&&(0,_isFunction3.default)(scl.domain)&&(0,_isFunction3.default)(scl.range);
	}else if(typeof scl==="string"){
	return supportedScaleStrings.indexOf(scl)!==-1;
	}
	return false;
	};
	
	var value=props[propName];
	if(!validScale(value)){
	return new Error("`"+
	propName+"` in `"+componentName+"` must be a d3 scale.");
	
	}
	}),
	
	/**
	   * Check that an array contains items of the same type.
	   */
	homogeneousArray:makeChainable(function(props,propName,componentName){for(var _len8=arguments.length,rest=Array(_len8>3?_len8-3:0),_key8=3;_key8<_len8;_key8++){rest[_key8-3]=arguments[_key8];}
	var error=_react.PropTypes.array.apply(_react.PropTypes,[props,propName,componentName].concat(rest));
	if(error){
	return error;
	}
	var value=props[propName];
	if(value.length>1){
	var _constructor=getConstructor(value[0]);
	for(var i=1;i<value.length;i++){
	var otherConstructor=getConstructor(value[i]);
	if(_constructor!==otherConstructor){
	var constructorName=getConstructorName(value[0]);
	var otherConstructorName=getConstructorName(value[i]);
	return new Error(
	"Expected `"+propName+"` in `"+componentName+"` to be a "+("homogeneous array, but found types `"+
	constructorName+"` and ")+("`"+
	otherConstructorName+"`."));
	
	}
	}
	}
	}),
	
	/**
	   * Check that array prop length matches props.data.length
	   */
	matchDataLength:makeChainable(function(props,propName){
	if(
	props[propName]&&
	Array.isArray(props[propName])&&
	props[propName].length!==props.data.length)
	{
	return new Error("Length of data and "+propName+" arrays must match.");
	}
	})};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(186)))

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _property2=__webpack_require__(122);var _property3=_interopRequireDefault(_property2);var _isEmpty2=__webpack_require__(190);var _isEmpty3=_interopRequireDefault(_isEmpty2);var _isFunction2=__webpack_require__(119);var _isFunction3=_interopRequireDefault(_isFunction2);var _partial2=__webpack_require__(133);var _partial3=_interopRequireDefault(_partial2);var _merge2=__webpack_require__(164);var _merge3=_interopRequireDefault(_merge2);var _extend7=__webpack_require__(202);var _extend8=_interopRequireDefault(_extend7);var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}
	
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
	  */exports.default=
	
	{
	getPartialEvents:function getPartialEvents(events,eventKey,childProps){
	return events?
	Object.keys(events).reduce(function(memo,eventName){
	/* eslint max-params: 0 */
	memo[eventName]=(0,_partial3.default)(
	events[eventName],
	_partial3.default.placeholder,// evt will still be the first argument for event handlers
	childProps,// event handlers will have access to data component props, including data
	eventKey,// used in setting a unique state property
	eventName// used in setting a unique state property
	);
	return memo;
	},{}):
	{};
	},
	
	getScopedEvents:function getScopedEvents(events,namespace,childType,baseProps){var _this=this;
	if((0,_isEmpty3.default)(events)){
	return{};
	}
	
	baseProps=baseProps||this.baseProps;
	var getTargetProps=function getTargetProps(identifier,type){var
	childName=identifier.childName;var target=identifier.target;var key=identifier.key;
	var baseType=type==="props"?baseProps:_this.state;
	var base=!childName||!baseType[childName]?baseType:baseType[childName];
	return key==="parent"?base.parent:base[key]&&base[key][target];
	};
	
	var parseEvent=function parseEvent(eventReturn,eventKey){
	var childNames=namespace==="parent"?
	eventReturn.childName:eventReturn.childName||childType;
	var target=eventReturn.target||namespace;
	
	var getKeys=function getKeys(childName){
	if(baseProps.all||baseProps[childName]&&baseProps[childName].all){
	return"all";
	}else if(eventReturn.eventKey==="all"){
	return baseProps[childName]?
	Object.keys(baseProps[childName]):Object.keys(baseProps);
	}else if(eventReturn.eventKey===undefined&&eventKey==="parent"){
	return baseProps[childName]?
	Object.keys(baseProps[childName]):Object.keys(baseProps);
	}
	return eventReturn.eventKey!==undefined?eventReturn.eventKey:eventKey;
	};
	
	var getMutationObject=function getMutationObject(key,childName){
	var nullFunction=function nullFunction(){return null;};
	var mutationTargetProps=getTargetProps({childName:childName,key:key,target:target},"props");
	var mutationTargetState=getTargetProps({childName:childName,key:key,target:target},"state");
	var mutation=eventReturn.mutation||nullFunction;
	var mutatedProps=mutation(
	(0,_assign3.default)({},mutationTargetProps,mutationTargetState),baseProps);
	
	var childState=_this.state[childName]||{};
	return childName?
	(0,_extend8.default)(_this.state,_defineProperty({},
	childName,(0,_extend8.default)(childState,_defineProperty({},
	key,(0,_extend8.default)(childState[key],_defineProperty({},target,mutatedProps)))))):
	
	
	(0,_extend8.default)(_this.state,_defineProperty({},
	key,(0,_extend8.default)(_this.state[key],_defineProperty({},target,mutatedProps))));
	
	};
	
	var getReturnByChild=function getReturnByChild(childName){
	var mutationKeys=getKeys(childName);
	return Array.isArray(mutationKeys)?
	mutationKeys.reduce(function(memo,key){
	return(0,_assign3.default)(memo,getMutationObject(key,childName));
	},{}):
	getMutationObject(mutationKeys,childName);
	};
	
	return Array.isArray(childNames)?childNames.reduce(function(memo,childName){
	return(0,_assign3.default)(memo,getReturnByChild(childName));
	},{}):getReturnByChild(childNames);
	};
	
	var parseEventReturn=function parseEventReturn(eventReturn,eventKey){
	return Array.isArray(eventReturn)?
	eventReturn.reduce(function(memo,props){
	memo=(0,_merge3.default)({},memo,parseEvent(props,eventKey));
	return memo;
	},{}):
	parseEvent(eventReturn,eventKey);
	};
	
	var onEvent=function onEvent(evt,childProps,eventKey,eventName){
	var eventReturn=events[eventName](evt,childProps,eventKey);
	if(eventReturn){
	_this.setState(parseEventReturn(eventReturn,eventKey));
	}
	};
	
	return Object.keys(events).reduce(function(memo,event){
	memo[event]=onEvent;
	return memo;
	},{});
	},
	
	getEvents:function getEvents(props,target,eventKey,getScopedEvents){var _this2=this;
	var getEventsFromProps=function getEventsFromProps(events){
	
	var getSelectedEvents=function getSelectedEvents(){
	var targetEvents=events.reduce(function(memo,event){
	if(event.target!==undefined){
	return""+event.target===""+target?memo.concat(event):memo;
	}
	return memo.concat(event);
	},[]);
	
	if(eventKey!==undefined&&target!=="parent"){
	return targetEvents.filter(function(obj){
	var targetKeys=obj.eventKey;
	var useKey=function useKey(key){return key?""+key===""+eventKey:true;};
	return Array.isArray(targetKeys)?
	targetKeys.some(function(k){return useKey(k);}):useKey(targetKeys);
	});
	}
	return targetEvents;
	};
	
	var selectedEvents=getSelectedEvents();
	return Array.isArray(selectedEvents)&&selectedEvents.reduce(function(memo,event){
	return event?(0,_assign3.default)(memo,event.eventHandlers):memo;
	},{});
	};
	
	var getAllEvents=function getAllEvents(){
	if(Array.isArray(_this2.componentEvents)){var _componentEvents;
	return Array.isArray(props.events)?
	(_componentEvents=_this2.componentEvents).concat.apply(_componentEvents,_toConsumableArray(props.events)):_this2.componentEvents;
	}
	return props.events;
	};
	
	var allEvents=getAllEvents();
	var ownEvents=allEvents&&getScopedEvents(getEventsFromProps(allEvents),target);
	if(!props.sharedEvents){
	return ownEvents;
	}
	var getSharedEvents=props.sharedEvents.getEvents;
	var sharedEvents=props.sharedEvents.events&&
	getSharedEvents(getEventsFromProps(props.sharedEvents.events),target);
	return(0,_assign3.default)({},sharedEvents,ownEvents);
	},
	
	getEventState:function getEventState(eventKey,namespace,childType){
	if(!childType){
	return this.state[eventKey]&&this.state[eventKey][namespace];
	}
	return this.state[childType]&&
	this.state[childType][eventKey]&&
	this.state[childType][eventKey][namespace];
	},
	
	getEventKey:function getEventKey(key){
	// creates a data accessor function
	// given a property key, path, array index, or null for identity.
	if((0,_isFunction3.default)(key)){
	return key;
	}else if(key===null||typeof key==="undefined"){
	return function(){return undefined;};
	}
	// otherwise, assume it is an array index, property key or path (_.property handles all three)
	return(0,_property3.default)(key);
	},
	
	addEventKeys:function addEventKeys(props,data){
	var eventKeyAccessor=this.getEventKey(props.eventKey);
	return data.map(function(datum,index){
	var eventKey=datum.eventKey||eventKeyAccessor(datum)||index;
	return(0,_assign3.default)({eventKey:eventKey},datum);
	});
	},
	
	getComponentEvents:function getComponentEvents(props,components){
	var events=Array.isArray(components)&&components.reduce(function(memo,componentName){var _memo;
	var component=props[componentName];
	var componentEvents=component&&component.type&&component.type.defaultEvents;
	memo=Array.isArray(componentEvents)?(_memo=memo).concat.apply(_memo,_toConsumableArray(componentEvents)):memo;
	return memo;
	},[]);
	return events&&events.length?events:undefined;
	}};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(191),
	    isArguments = __webpack_require__(97),
	    isArray = __webpack_require__(98),
	    isArrayLike = __webpack_require__(118),
	    isBuffer = __webpack_require__(199),
	    isPrototype = __webpack_require__(116),
	    nativeKeys = __webpack_require__(201);
	
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
	      (isArray(value) || typeof value == 'string' ||
	        typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (nonEnumShadows || isPrototype(value)) {
	    return !nativeKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = isEmpty;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(192),
	    Map = __webpack_require__(193),
	    Promise = __webpack_require__(194),
	    Set = __webpack_require__(195),
	    WeakMap = __webpack_require__(196),
	    baseGetTag = __webpack_require__(197),
	    toSource = __webpack_require__(198);
	
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
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
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
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150),
	    root = __webpack_require__(95);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150),
	    root = __webpack_require__(95);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150),
	    root = __webpack_require__(95);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150),
	    root = __webpack_require__(95);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(150),
	    root = __webpack_require__(95);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 198 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
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
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(95),
	    stubFalse = __webpack_require__(200);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
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
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(176)(module)))

/***/ },
/* 200 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
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
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(107);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(203);


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(178),
	    createAssigner = __webpack_require__(180),
	    keysIn = __webpack_require__(110);
	
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
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  copyObject(source, keysIn(source), object);
	});
	
	module.exports = assignIn;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(179),
	    copyObject = __webpack_require__(178),
	    createAssigner = __webpack_require__(180),
	    isArrayLike = __webpack_require__(118),
	    isPrototype = __webpack_require__(116),
	    keys = __webpack_require__(205);
	
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
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
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
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(116),
	    nativeKeys = __webpack_require__(201);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);var _merge2=__webpack_require__(164);var _merge3=_interopRequireDefault(_merge2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}//http://www.pearsonified.com/2012/01/characters-per-line.php
	
	
	var fontDictionary={
	"American Typewriter":2.09,
	"Baskerville":2.51,
	"Georgia":2.27,
	"Hoefler Text":2.39,
	"Palatino":2.26,
	"Times New Roman":2.48,
	"Arial":2.26,
	"Gill Sans":2.47,
	"Gill Sans 300":2.58,
	"Helvetica Neue":2.24,
	"Lucida Grande":2.05,
	"Tahoma":2.25,
	"Trebuchet MS":2.2,
	"Verdana":1.96,
	"Courier New":1.67,
	"cursive":1.84,
	"fantasy":2.09,
	"monospace":1.81,
	"serif":2.04,
	"sans-serif":1.89};
	
	//https://developer.mozilla.org/en/docs/Web/CSS/length
	// Absolute sizes in pixels for obsolete measurement units.
	var absoluteMeasurementUnitsToPixels={
	"mm":3.8,
	"sm":38,
	"pt":1.33,
	"pc":16,
	"in":96,
	"px":1};
	
	var relativeMeasurementUnitsCoef={
	"em":1,
	"ex":0.5};
	
	
	var coefficients={
	averageFontConstant:2.1675,// Average pixels per glyph in existing font.
	widthOverlapCoef:1.25,// Coefficient for width value to prevent overlap.
	heightOverlapCoef:1.05,// Coefficient for height value to prevent overlap.
	lineCapitalCoef:1.15,// Coefficient for height value. Reserve space for capital chars.
	lineSpaceHeightCoef:0.2// Coefficient for height value. Reserve space between lines.
	};
	var defaultStyle={
	lineHeight:1,
	letterSpacing:"0px",
	fontSize:0,
	angle:0,
	fontFamily:""};
	
	
	var degreeToRadian=function degreeToRadian(angle){return angle*Math.PI/180;};
	
	var getFontCharacterConstant=function getFontCharacterConstant(fontFamily){
	var firstFont=fontFamily.split(",")[0].replace(/'|"/g,"");
	return fontDictionary[firstFont]||coefficients.averageFontConstant;
	};
	
	var splitToLines=function splitToLines(text){return text.toString().split(/\r\n|\r|\n/g);};
	
	var getWidestString=function getWidestString(strings){return strings.reduce(function(max,elem){return(
	max.length>=elem.length?max:elem);});};
	
	
	var getSizeWithRotate=function getSizeWithRotate(axisSize,dependentSize,angle){
	var angleInRadian=degreeToRadian(angle);
	return Math.abs(Math.cos(angleInRadian)*axisSize)+
	Math.abs(Math.sin(angleInRadian)*dependentSize);
	};
	
	var aproximateTextWidthInternal=function aproximateTextWidthInternal(text,style){
	var strLength=getWidestString(splitToLines(text.toString())).length;
	return strLength*style.fontSize/style.characterConstant+
	style.letterSpacing*Math.max(strLength-1,0);
	};
	
	var aproximateTextHeightInternal=function aproximateTextHeightInternal(text,style){
	var splittedTextArray=splitToLines(text);
	var lineCount=splittedTextArray.length;
	var lineHeightNumber=style.fontSize*coefficients.lineCapitalCoef;
	var emptySpace=style.fontSize*coefficients.lineSpaceHeightCoef;
	return style.lineHeight*(lineHeightNumber*lineCount+emptySpace*(lineCount-1));
	};
	
	/**
	 * Convert length-type parameters from specific measurement units to pixels
	 * @param  {string} length Css length string value.
	 * @param  {number} fontSize Current text font-size.
	 * @returns {number} Approximate Css length in pixels.
	*/
	var convertLengthToPixels=function convertLengthToPixels(length,fontSize){
	var attribute=length.match(/[a-zA-Z%]+/)[0];
	var value=length.match(/[0-9.,]+/);
	var result=void 0;
	if(absoluteMeasurementUnitsToPixels.hasOwnProperty(attribute)){
	result=value*absoluteMeasurementUnitsToPixels[attribute];
	}else if(relativeMeasurementUnitsCoef.hasOwnProperty(attribute)){
	result=(fontSize?value*fontSize:value*coefficients.defaultFontSize)*
	relativeMeasurementUnitsCoef[attribute];
	}else{
	result=value;
	}
	return result;
	};
	
	var prepareParams=function prepareParams(inputStyle){
	var style=(0,_defaults3.default)(inputStyle,defaultStyle);
	return(0,_merge3.default)({},style,{
	characterConstant:style.characterConstant||getFontCharacterConstant(style.fontFamily),
	letterSpacing:convertLengthToPixels(style.letterSpacing,style.fontSize),
	fontSize:typeof style.fontSize==="number"?
	style.fontSize:
	convertLengthToPixels(String(style.fontSize))});
	
	};
	
	/**
	 * Predict text size by font params.
	 * @param {string} text Content for width calculation.
	 * @param {Object} style Text styles, ,fontFamily, fontSize, etc.
	 * @param {string} style.fontFamily Text fontFamily.
	 * @param {(number|string)} style.fontSize Text fontSize.
	 * @param {number} style.angle Text rotate angle.
	 * @param {string} style.letterSpacing Text letterSpacing(space between letters).
	 * @param {number} style.characterConstant Average pixels per glyph.
	 * @param {number} style.lineHeight Line height coefficient.
	 * @returns {number} Approximate text label height.
	*/
	var approximateTextSize=function approximateTextSize(text,style){
	var params=prepareParams(style);
	var height=aproximateTextHeightInternal(text,params);
	var width=aproximateTextWidthInternal(text,params);
	var widthWithRotate=getSizeWithRotate(width,height,params.angle);
	var heightWithRotate=getSizeWithRotate(height,width,params.angle);
	return{
	width:widthWithRotate*coefficients.widthOverlapCoef,
	height:heightWithRotate*coefficients.heightOverlapCoef};
	
	};exports.default=
	
	{
	approximateTextSize:approximateTextSize,
	convertLengthToPixels:convertLengthToPixels};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _d3Ease=__webpack_require__(208);var _d3Ease2=_interopRequireDefault(_d3Ease);
	var _d3Interpolate=__webpack_require__(209);var _d3Interpolate2=_interopRequireDefault(_d3Interpolate);
	var _d3Timer=__webpack_require__(211);
	var _util=__webpack_require__(212);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
	
	
	(0,_util.addVictoryInterpolator)();var
	
	VictoryAnimation=function(_React$Component){_inherits(VictoryAnimation,_React$Component);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function VictoryAnimation(props){_classCallCheck(this,VictoryAnimation);
	
	/* defaults */var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(VictoryAnimation).call(this,props));
	_this.state={
	data:Array.isArray(_this.props.data)?
	_this.props.data[0]:_this.props.data,
	animationInfo:{
	progress:0,
	animating:false}};
	
	
	_this.interpolator=null;
	_this.queue=Array.isArray(_this.props.data)?
	_this.props.data.slice(1):[];
	/* build easing function */
	_this.ease=_d3Ease2.default[_this.props.easing];
	/*
	      unlike React.createClass({}), there is no autobinding of this in ES6 classes
	      so we bind functionToBeRunEachFrame to current instance of victory animation class
	    */
	_this.functionToBeRunEachFrame=_this.functionToBeRunEachFrame.bind(_this);return _this;
	}_createClass(VictoryAnimation,[{key:"componentDidMount",value:function componentDidMount()
	{
	// Length check prevents us from triggering `onEnd` in `traverseQueue`.
	if(this.queue.length){
	this.traverseQueue();
	}
	}
	/* lifecycle */},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(
	nextProps){
	/* cancel existing loop if it exists */
	if(this.timer){
	this.timer.stop();
	}
	/* If an object was supplied */
	if(!Array.isArray(nextProps.data)){
	// Replace the tween queue. Could set `this.queue = [nextProps.data]`,
	// but let's reuse the same array.
	this.queue.length=0;
	this.queue.push(nextProps.data);
	/* If an array was supplied */
	}else{var _queue;
	/* Extend the tween queue */
	(_queue=this.queue).push.apply(_queue,_toConsumableArray(nextProps.data));
	}
	/* Start traversing the tween queue */
	this.traverseQueue();
	}},{key:"componentWillUnmount",value:function componentWillUnmount()
	{
	if(this.timer){
	this.timer.stop();
	}
	}
	/* Traverse the tween queue */},{key:"traverseQueue",value:function traverseQueue()
	{
	if(this.queue.length){
	/* Get the next index */
	var data=this.queue[0];
	/* compare cached version to next props */
	this.interpolator=_d3Interpolate2.default.value(this.state.data,data);
	/* reset step to zero */
	this.timer=(0,_d3Timer.timer)(this.functionToBeRunEachFrame,this.props.delay);
	}else if(this.props.onEnd){
	this.props.onEnd();
	}
	}
	/* every frame we... */},{key:"functionToBeRunEachFrame",value:function functionToBeRunEachFrame(
	elapsed){
	/*
	      step can generate imprecise values, sometimes greater than 1
	      if this happens set the state to 1 and return, cancelling the timer
	    */
	var step=elapsed/this.props.duration;
	
	if(step>=1){
	this.setState({
	data:this.interpolator(1),
	animationInfo:{
	progress:1,
	animating:false}});
	
	
	this.timer.stop();
	this.queue.shift();
	this.traverseQueue();// Will take care of calling `onEnd`.
	return;
	}
	/*
	      if we're not at the end of the timer, set the state by passing
	      current step value that's transformed by the ease function to the
	      interpolator, which is cached for performance whenever props are received
	    */
	this.setState({
	data:this.interpolator(this.ease(step)),
	animationInfo:{
	progress:step,
	animating:step<1}});
	
	
	}},{key:"render",value:function render()
	{
	return this.props.children(this.state.data,this.state.animationInfo);
	}}]);return VictoryAnimation;}(_react2.default.Component);VictoryAnimation.displayName="VictoryAnimation";VictoryAnimation.propTypes={/**
	     * The child of should be a function that takes an object of tweened values
	     * and returns a component to render.
	     */children:_react2.default.PropTypes.func,/**
	     * The number of milliseconds the animation should take to complete.
	     */duration:_react2.default.PropTypes.number,/**
	     * The easing prop specifies an easing function name to use for tweening.
	     */easing:_react2.default.PropTypes.oneOf(["back","backIn","backOut","backInOut","bounce","bounceIn","bounceOut","bounceInOut","circle","circleIn","circleOut","circleInOut","linear","linearIn","linearOut","linearInOut","cubic","cubicIn","cubicOut","cubicInOut","elastic","elasticIn","elasticOut","elasticInOut","exp","expIn","expOut","expInOut","poly","polyIn","polyOut","polyInOut","quad","quadIn","quadOut","quadInOut","sin","sinIn","sinOut","sinInOut"]),/**
	     * The delay prop specifies a delay in milliseconds before the animation
	     * begins. If multiple values are in the animation queue, it is the delay
	     * between each animation.
	     */delay:_react2.default.PropTypes.number,/**
	     * The onEnd prop specifies a function to run when the animation ends. If
	     * multiple animations are in the queue, it is called after the last
	     * animation.
	     */onEnd:_react2.default.PropTypes.func,/**
	     * The data prop specifies the latest set of values to tween to. When this
	     * prop changes, VictoryAnimation will begin animating from the current
	     * value to the new value.
	     */data:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object,_react2.default.PropTypes.array])};VictoryAnimation.defaultProps={/* length of animation */duration:1000,/* easing modifies step each frame */easing:"quadInOut",/* delay between transitions */delay:0,/* we got nothin' */data:{}};exports.default=VictoryAnimation;

/***/ },
/* 208 */
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
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(210)) :
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
/* 210 */
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
/* 211 */
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
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});exports.addVictoryInterpolator=exports.victoryInterpolator=exports.interpolateArray=exports.interpolateFunction=exports.interpolateImmediate=exports.isInterpolatable=undefined;var _isPlainObject2=__webpack_require__(171);var _isPlainObject3=_interopRequireDefault(_isPlainObject2);var _d3Interpolate=__webpack_require__(209);var _d3Interpolate2=_interopRequireDefault(_d3Interpolate);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
	
	
	var isInterpolatable=exports.isInterpolatable=function isInterpolatable(obj){
	// d3 turns null into 0 and undefined into NaN, which we don't want.
	if(obj!==null){
	switch(typeof obj){
	case"undefined":
	return false;
	case"number":
	// The standard `isNaN` is fine in this case since we already know the
	// type is number.
	return!isNaN(obj)&&obj!==Number.POSITIVE_INFINITY&&obj!==Number.NEGATIVE_INFINITY;
	case"string":
	// d3 might not *actually* be able to interpolate the string, but it
	// won't cause any issues to let it try.
	return true;
	case"boolean":
	// d3 turns Booleans into integers, which we don't want. Sure, we could
	// interpolate from 0 -> 1, but we'd be sending a non-Boolean to
	// something expecting a Boolean.
	return false;
	case"object":
	// Don't try to interpolate class instances (except Date or Array).
	return obj instanceof Date||Array.isArray(obj)||(0,_isPlainObject3.default)(obj);
	case"function":
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
	return true;}
	
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
	var interpolateImmediate=exports.interpolateImmediate=function interpolateImmediate(a,b){var when=arguments.length<=2||arguments[2]===undefined?0:arguments[2];
	return function(t){
	return t<when?a:b;
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
	var interpolateFunction=exports.interpolateFunction=function interpolateFunction(a,b){
	return function(t){
	if(t>=1){
	return b;
	}
	return function(){
	/* eslint-disable no-invalid-this */
	var aval=typeof a==="function"?a.apply(this,arguments):a;
	var bval=typeof b==="function"?b.apply(this,arguments):b;
	return _d3Interpolate2.default.value(aval,bval)(t);
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
	var interpolateArray=exports.interpolateArray=function interpolateArray(a,b){
	var x=[];
	var c=[];
	var na=a?a.length:0;
	var nb=b?b.length:0;
	var n0=Math.min(na,nb);
	var i=void 0;
	
	for(i=0;i<n0;++i){x.push(_d3Interpolate2.default.value(a[i],b[i]));}
	for(i=0;i<nb;++i){c[i]=b[i];}
	
	return function(t){
	for(i=0;i<n0;++i){c[i]=x[i](t);}
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
	var victoryInterpolator=exports.victoryInterpolator=function victoryInterpolator(a,b){
	// If the values are strictly equal, or either value is not interpolatable,
	// just use either the start value `a` or end value `b` at every step, as
	// there is no reasonable in-between value.
	if(a===b||!isInterpolatable(a)||!isInterpolatable(b)){
	return interpolateImmediate(a,b);
	}
	if(typeof a==="function"||typeof b==="function"){
	return interpolateFunction(a,b);
	}
	if(Array.isArray(a)&&Array.isArray(b)){
	return interpolateArray(a,b);
	}
	};
	
	var interpolatorAdded=false;
	
	var addVictoryInterpolator=exports.addVictoryInterpolator=function addVictoryInterpolator(){
	if(!interpolatorAdded){
	_d3Interpolate2.default.values.push(victoryInterpolator);
	interpolatorAdded=true;
	}
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _pick2=__webpack_require__(214);var _pick3=_interopRequireDefault(_pick2);var _merge2=__webpack_require__(164);var _merge3=_interopRequireDefault(_merge2);var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _index=__webpack_require__(215);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
	
	
	var defaultStyles={
	fill:"#252525",
	fontSize:14,
	fontFamily:"'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
	stroke:"transparent"};var
	
	
	VictoryLabel=function(_React$Component){_inherits(VictoryLabel,_React$Component);function VictoryLabel(){_classCallCheck(this,VictoryLabel);return _possibleConstructorReturn(this,Object.getPrototypeOf(VictoryLabel).apply(this,arguments));}_createClass(VictoryLabel,[{key:"getStyles",value:function getStyles(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props){
	var style=props.style?(0,_merge3.default)({},defaultStyles,props.style):defaultStyles;
	var datum=props.datum||props.data;
	var baseStyles=_index.Helpers.evaluateStyle(style,datum);
	return(0,_assign3.default)({},baseStyles,{fontSize:this.getFontSize(baseStyles)});
	}},{key:"getHeight",value:function getHeight(
	
	props,type){
	var datum=props.datum||props.data;
	return _index.Helpers.evaluateProp(props[type],datum);
	}},{key:"getContent",value:function getContent(
	
	props){
	var text=props.text||props.children;
	if(text){
	var datum=props.datum||props.data;
	var child=_index.Helpers.evaluateProp(text,datum);
	return(""+child).split("\n");
	}
	return[" "];
	}},{key:"getDy",value:function getDy(
	
	props,content,lineHeight){
	var datum=props.datum||props.data;
	var dy=props.dy?_index.Helpers.evaluateProp(props.dy,datum):0;
	var length=content.length;
	var capHeight=this.getHeight(props,"capHeight");
	var verticalAnchor=props.verticalAnchor?
	_index.Helpers.evaluateProp(props.verticalAnchor,datum):"middle";
	switch(verticalAnchor){
	case"end":
	return dy+capHeight/2+(0.5-length)*lineHeight;
	case"middle":
	return dy+capHeight/2+(0.5-length/2)*lineHeight;
	default:
	return dy+capHeight/2+lineHeight/2;}
	
	}},{key:"getTransform",value:function getTransform(
	
	props){
	var style=this.getStyles(props);var
	datum=props.datum;var x=props.x;var y=props.y;
	var angle=props.angle||style.angle;
	var transform=props.transform||style.transform;
	var transformPart=transform&&_index.Helpers.evaluateProp(transform,datum);
	var rotatePart=angle&&{rotate:[angle,x,y]};
	return transformPart||angle?
	_index.Style.toTransformString(transformPart,rotatePart):undefined;
	}},{key:"getFontSize",value:function getFontSize(
	
	style){
	var baseSize=style&&style.fontSize;
	if(typeof baseSize==="number"){
	return baseSize;
	}else if(baseSize===undefined||baseSize===null){
	return defaultStyles.fontSize;
	}else if(typeof baseSize==="string"){
	var fontSize=+baseSize.replace("px","");
	if(!isNaN(fontSize)){
	return fontSize;
	}else{
	_index.Log.warn("fontSize should be expressed as a number of pixels");
	return defaultStyles.fontSize;
	}
	}
	return defaultStyles.fontSize;
	}},{key:"renderElements",value:function renderElements(
	
	props,content){
	var transform=this.getTransform(props);
	var textProps=(0,_pick3.default)(props,["dx","dy","x","y","style","textAnchor"]);
	var fontSize=this.getFontSize(props.style);
	return(
	_react2.default.createElement("text",_extends({},textProps,{
	transform:transform},
	props.events),
	
	content.map(function(line,i){
	var dy=i?props.lineHeight*fontSize:undefined;
	return(
	_react2.default.createElement("tspan",{key:i,x:props.x,dy:dy},
	line));
	
	
	})));
	
	
	}},{key:"render",value:function render()
	
	{
	var datum=this.props.datum||this.props.data;
	var style=this.getStyles(this.props);
	var lineHeight=this.getHeight(this.props,"lineHeight");
	var textAnchor=this.props.textAnchor?
	_index.Helpers.evaluateProp(this.props.textAnchor,datum):"start";
	var content=this.getContent(this.props);
	var dx=this.props.dx?_index.Helpers.evaluateProp(this.props.dx,datum):0;
	var dy=this.getDy(this.props,content,lineHeight)*style.fontSize;
	var labelProps=(0,_assign3.default)(
	{},this.props,{dy:dy,dx:dx,datum:datum,lineHeight:lineHeight,textAnchor:textAnchor,style:style},this.props.events);
	
	return this.renderElements(labelProps,content);
	}}]);return VictoryLabel;}(_react2.default.Component);VictoryLabel.displayName="VictoryLabel";VictoryLabel.propTypes={/**
	     * Specifies the angle to rotate the text by.
	     */angle:_react.PropTypes.oneOfType([_react.PropTypes.string,_react.PropTypes.number]),/**
	     * The capHeight prop defines a text metric for the font being used: the
	     * expected height of capital letters. This is necessary because of SVG,
	     * which (a) positions the *bottom* of the text at `y`, and (b) has no
	     * notion of line height. The value should ideally use the same units as
	     * `lineHeight` and `dy`, preferably ems. If given a unitless number, it
	     * is assumed to be ems.
	     */capHeight:_react.PropTypes.oneOfType([_react.PropTypes.string,_index.PropTypes.nonNegative,_react.PropTypes.func]),/**
	     * Victory components can pass a datum prop to their label component. This can
	     * be used to calculate functional styles, and determine child text
	     */datum:_react.PropTypes.object,/**
	     * Labels that apply to an entire data series will recieve the entire series
	     * as `data` instead of an individual datum prop.
	     */data:_react.PropTypes.array,/**
	     * The events prop attaches arbitrary event handlers to the label component.
	     * Event handlers are currently only called with their corresponding events.
	     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
	     */events:_react.PropTypes.object,/**
	     * all Victory components will pass a text prop to their label component.
	     * This defines the content of the label when child nodes are absent. It
	     * will be ignored if children are provided.
	     */text:_react.PropTypes.oneOfType([_react.PropTypes.string,_react.PropTypes.number,_react.PropTypes.func]),/**
	     * The children of this component define the content of the label. This
	     * makes using the component similar to normal HTML spans or labels.
	     * strings, numbers, and functions of data / value are supported.
	     */children:_react.PropTypes.oneOfType([// TODO: Expand child support in future release
	_react.PropTypes.string,_react.PropTypes.number,_react.PropTypes.func]),/**
	     * The lineHeight prop defines how much space a single line of text should
	     * take up. Note that SVG has no notion of line-height, so the positioning
	     * may differ slightly from what you would expect with CSS, but the result
	     * is similar: a roughly equal amount of extra space is distributed above
	     * and below the line of text. The value should ideally use the same units
	     * as `capHeight` and `dy`, preferably ems. If given a unitless number, it
	     * is assumed to be ems.
	     */lineHeight:_react.PropTypes.oneOfType([_react.PropTypes.string,_index.PropTypes.nonNegative,_react.PropTypes.func]),/**
	     * The style prop applies CSS properties to the rendered `<text>` element.
	     */style:_react.PropTypes.object,/**
	     * The textAnchor prop defines how the text is horizontally positioned
	     * relative to the given `x` and `y` coordinates.
	     */textAnchor:_react.PropTypes.oneOfType([_react.PropTypes.oneOf(["start","middle","end","inherit"]),_react.PropTypes.func]),/**
	     * The verticalAnchor prop defines how the text is vertically positioned
	     * relative to the given `x` and `y` coordinates.
	     */verticalAnchor:_react.PropTypes.oneOfType([_react.PropTypes.oneOf(["start","middle","end"]),_react.PropTypes.func]),/**
	     * The transform prop applies a transform to the rendered `<text>` element.
	     * In addition to being a string, it can be an object containing transform
	     * definitions for easier authoring.
	     */transform:_react.PropTypes.oneOfType([_react.PropTypes.string,_react.PropTypes.object,_react.PropTypes.func]),/**
	     * The x prop defines the x coordinate to use as a basis for horizontal
	     * positioning.
	     */x:_react.PropTypes.number,/**
	     * The y prop defines the y coordinate to use as a basis for vertical
	     * positioning.
	     */y:_react.PropTypes.number,/**
	     * The dx prop defines a horizontal shift from the `x` coordinate.
	     */dx:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.string,_react.PropTypes.func]),/**
	     * The dy prop defines a vertical shift from the `y` coordinate. Since this
	     * component already accounts for `capHeight`, `lineHeight`, and
	     * `verticalAnchor`, this will usually not be necessary.
	     */dy:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.string,_react.PropTypes.func])};VictoryLabel.defaultProps={capHeight:0.71,// Magic number from d3.
	lineHeight:1};exports.default=VictoryLabel;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(71),
	    baseFlatten = __webpack_require__(91),
	    basePick = __webpack_require__(99),
	    baseRest = __webpack_require__(101),
	    toKey = __webpack_require__(121);
	
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
	var pick = baseRest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
	});
	
	module.exports = pick;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});exports.TextSize=exports.Events=exports.PropTypes=exports.DefaultTransitions=exports.Transitions=exports.Style=exports.Log=exports.Helpers=exports.Collection=undefined;var _collection=__webpack_require__(68);var _collection2=_interopRequireDefault(_collection);
	var _helpers=__webpack_require__(69);var _helpers2=_interopRequireDefault(_helpers);
	var _log=__webpack_require__(185);var _log2=_interopRequireDefault(_log);
	var _style=__webpack_require__(187);var _style2=_interopRequireDefault(_style);
	var _propTypes=__webpack_require__(188);var _propTypes2=_interopRequireDefault(_propTypes);
	var _events=__webpack_require__(189);var _events2=_interopRequireDefault(_events);
	var _transitions=__webpack_require__(216);var Transitions=_interopRequireWildcard(_transitions);
	var _textsize=__webpack_require__(206);var _textsize2=_interopRequireDefault(_textsize);
	var _defaultTransitions=__webpack_require__(217);var DefaultTransitions=_interopRequireWildcard(_defaultTransitions);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.
	
	
	Collection=_collection2.default;exports.
	Helpers=_helpers2.default;exports.
	Log=_log2.default;exports.
	Style=_style2.default;exports.
	Transitions=Transitions;exports.
	DefaultTransitions=DefaultTransitions;exports.
	PropTypes=_propTypes2.default;exports.
	Events=_events2.default;exports.
	TextSize=_textsize2.default;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _identity2=__webpack_require__(152);var _identity3=_interopRequireDefault(_identity2);var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	getInitialTransitionState=getInitialTransitionState;exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	getTransitionPropsFactory=getTransitionPropsFactory;var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function getDatumKey(datum,idx){return(datum.key||idx).toString();}/* eslint-disable func-style */function getKeyedData(data){return data.reduce(function(keyedData,datum,idx){var key=getDatumKey(datum,idx);keyedData[key]=datum;return keyedData;},{});}function getKeyedDataDifference(a,b){var hasDifference=false;var difference=Object.keys(a).reduce(function(_difference,key){if(!(key in b)){hasDifference=true;_difference[key]=true;}return _difference;},{});return hasDifference&&difference;}/**
	 * Calculate which data-points exist in oldData and not nextData -
	 * these are the `exiting` data-points.  Also calculate which
	 * data-points exist in nextData and not oldData - these are the
	 * `entering` data-points.
	 *
	 * @param  {Array} oldData   this.props.data Array
	 * @param  {Array} nextData  this.props.data Array
	 *
	 * @return {Object}          Object with `entering` and `exiting` properties.
	 *                           entering[datum.key] will be true if the data is
	 *                           entering, and similarly for `exiting`.
	 */function getNodeTransitions(oldData,nextData){var oldDataKeyed=oldData&&getKeyedData(oldData);var nextDataKeyed=nextData&&getKeyedData(nextData);return{entering:oldDataKeyed&&getKeyedDataDifference(nextDataKeyed,oldDataKeyed),exiting:nextDataKeyed&&getKeyedDataDifference(oldDataKeyed,nextDataKeyed)};}function getChildData(child){if(child.type&&child.type.getData){return child.type.getData(child.props);}return child.props&&child.props.data||false;}/**
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
	 *                                    - nodesDoneClipPathEnter
	 *                                    - nodesDoneClipPathExit
	 */function getInitialTransitionState(oldChildren,nextChildren){var nodesWillExit=false;var nodesWillEnter=false;var getTransition=function getTransition(oldChild,newChild){if(!newChild||oldChild.type!==newChild.type){return{};}var _ref=getNodeTransitions(getChildData(oldChild),getChildData(newChild))||{};var entering=_ref.entering;var exiting=_ref.exiting;nodesWillExit=nodesWillExit||!!exiting;nodesWillEnter=nodesWillEnter||!!entering;return{entering:entering||false,exiting:exiting||false};};var getTransitionsFromChildren=function getTransitionsFromChildren(old,next){return old.map(function(child,idx){if(child&&child.props&&child.props.children){return getTransitionsFromChildren(_react2.default.Children.toArray(old[idx].props.children),_react2.default.Children.toArray(next[idx].props.children));}// get Transition entering and exiting nodes
	return getTransition(child,next[idx]);});};var childrenTransitions=getTransitionsFromChildren(_react2.default.Children.toArray(oldChildren),_react2.default.Children.toArray(nextChildren));return{nodesWillExit:nodesWillExit,nodesWillEnter:nodesWillEnter,childrenTransitions:childrenTransitions,// TODO: This may need to be refactored for the following situation.
	//       The component receives new props, and the data provided
	//       is a perfect match for the previous data and domain except
	//       for new nodes. In this case, we wouldn't want a delay before
	//       the new nodes appear.
	nodesShouldEnter:false,nodesShouldLoad:false,nodesDoneLoad:false,nodesDoneClipPathLoad:false,nodesDoneClipPathEnter:false,nodesDoneClipPathExit:false,animating:nodesWillExit||nodesWillEnter||childrenTransitions.length>0};}function getInitialChildProps(animate,data){var after=animate.onEnter&&animate.onEnter.after?animate.onEnter.after:_identity3.default;return{data:data.map(function(datum){return(0,_assign3.default)({},datum,after(datum));})};}function getChildBeforeLoad(animate,child,data,cb){// eslint-disable-line max-params
	var before=animate.onLoad&&animate.onLoad.before?animate.onLoad.before:_identity3.default;var beforeClipPathWidth=animate.onLoad&&animate.onLoad.beforeClipPathWidth;// If nodes need to exit, transform them with the provided onLoad.before function.
	data=data.map(function(datum){return(0,_assign3.default)({},datum,before(datum));});if(beforeClipPathWidth){var _beforeClipPathWidth=beforeClipPathWidth(data,child,animate);var clipWidth=_beforeClipPathWidth.clipWidth;var translateX=_beforeClipPathWidth.translateX;return{animate:animate,data:data,clipWidth:clipWidth,translateX:translateX,cb:cb};}return{animate:animate,data:data,cb:cb};}function getChildOnLoad(animate,data,cb){// eslint-disable-line max-params
	animate=(0,_assign3.default)({},animate,{onEnd:cb});var after=animate.onLoad&&animate.onLoad.after?animate.onLoad.after:_identity3.default;// If nodes need to exit, transform them with the provided onLoad.after function.
	data=data.map(function(datum){return(0,_assign3.default)({},datum,after(datum));});return{animate:animate,data:data};}function getChildClipPathToLoad(animate,child,data,cb){// eslint-disable-line max-params, max-len
	animate=(0,_assign3.default)({},animate,{onEnd:cb});var afterClipPathWidth=animate.onLoad&&animate.onLoad.afterClipPathWidth;if(afterClipPathWidth){var _afterClipPathWidth=afterClipPathWidth(data,child,animate);var clipWidth=_afterClipPathWidth.clipWidth;var translateX=_afterClipPathWidth.translateX;return{animate:animate,clipWidth:clipWidth,translateX:translateX};}return{animate:animate};}function getChildClipPathToExit(animate,child,data,exitingNodes,cb){// eslint-disable-line max-params, max-len
	var clipWidth=void 0;if(exitingNodes){animate=(0,_assign3.default)({},animate,{onEnd:cb});var beforeClipPathWidth=animate.onExit&&animate.onExit.beforeClipPathWidth;if(beforeClipPathWidth){clipWidth=beforeClipPathWidth(data,child,exitingNodes);return{animate:animate,clipWidth:clipWidth};}}return{animate:animate};}function getChildPropsOnExit(animate,data,exitingNodes,cb){// eslint-disable-line max-params, max-len
	// Whether or not _this_ child has exiting nodes, we want the exit-
	// transition for all children to have the same duration, delay, etc.
	var onExit=animate&&animate.onExit;animate=(0,_assign3.default)({},animate,onExit);if(exitingNodes){(function(){// After the exit transition occurs, trigger the animations for
	// nodes that are neither exiting or entering.
	animate.onEnd=cb;var before=animate.onExit&&animate.onExit.before?animate.onExit.before:_identity3.default;// If nodes need to exit, transform them with the provided onExit.before function.
	data=data.map(function(datum,idx){var key=(datum.key||idx).toString();return exitingNodes[key]?(0,_assign3.default)({},datum,before(datum)):datum;});})();}return{animate:animate,data:data};}function getChildClipPathToEnter(animate,child,data,enteringNodes,cb){// eslint-disable-line max-params, max-len
	var clipWidth=void 0;if(enteringNodes){animate=(0,_assign3.default)({},animate,{onEnd:cb});var afterClipPathWidth=animate.onEnter&&animate.onEnter.afterClipPathWidth;if(afterClipPathWidth){clipWidth=afterClipPathWidth(data,child);return{animate:animate,clipWidth:clipWidth};}}return{animate:animate};}function getChildPropsBeforeEnter(animate,child,data,enteringNodes,cb){// eslint-disable-line max-params,max-len
	var clipWidth=void 0;if(enteringNodes){var _ret2=function(){// Perform a normal animation here, except - when it finishes - trigger
	// the transition for entering nodes.
	animate=(0,_assign3.default)({},animate,{onEnd:cb});var before=animate.onEnter&&animate.onEnter.before?animate.onEnter.before:_identity3.default;var beforeClipPathWidth=animate.onEnter&&animate.onEnter.beforeClipPathWidth;// We want the entering nodes to be included in the transition target
	// domain.  However, we may not want these nodes to be displayed initially,
	// so perform the `onEnter.before` transformation on each node.
	data=data.map(function(datum,idx){var key=(datum.key||idx).toString();return enteringNodes[key]?(0,_assign3.default)({},datum,before(datum)):datum;});if(beforeClipPathWidth){clipWidth=beforeClipPathWidth(data,child,enteringNodes);return{v:{animate:animate,data:data,clipWidth:clipWidth}};}}();if(typeof _ret2==="object")return _ret2.v;}return{animate:animate,data:data};}function getChildPropsOnEnter(animate,data,enteringNodes,cb){// eslint-disable-line max-params, max-len
	// Whether or not _this_ child has entering nodes, we want the entering-
	// transition for all children to have the same duration, delay, etc.
	var onEnter=animate&&animate.onEnter;animate=(0,_assign3.default)({},animate,onEnter);if(enteringNodes){(function(){// Old nodes have been transitioned to their new values, and the
	// domain should encompass the nodes that will now enter. So perform
	// the `onEnter.after` transformation on each node.
	animate.onEnd=cb;var after=animate.onEnter&&animate.onEnter.after?animate.onEnter.after:_identity3.default;data=data.map(function(datum,idx){var key=getDatumKey(datum,idx);return enteringNodes[key]?(0,_assign3.default)({},datum,after(datum)):datum;});})();}return{animate:animate,data:data};}/**
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
	 */function getTransitionPropsFactory(props,state,setState){var nodesWillExit=state&&state.nodesWillExit;var nodesWillEnter=state&&state.nodesWillEnter;var nodesShouldEnter=state&&state.nodesShouldEnter;var nodesShouldLoad=state&&state.nodesShouldLoad;var nodesDoneLoad=state&&state.nodesDoneLoad;var nodesDoneClipPathLoad=state&&state.nodesDoneClipPathLoad;var nodesDoneClipPathEnter=state&&state.nodesDoneClipPathEnter;var nodesDoneClipPathExit=state&&state.nodesDoneClipPathExit;var childrenTransitions=state&&state.childrenTransitions||[];var transitionDurations={enter:props.animate&&props.animate.onEnter&&props.animate.onEnter.duration,exit:props.animate&&props.animate.onExit&&props.animate.onExit.duration,load:props.animate&&props.animate.onLoad&&props.animate.onLoad.duration,move:props.animate&&props.animate.duration};var onLoad=function onLoad(child,data,animate){if(nodesShouldLoad){if(!nodesDoneClipPathLoad){return getChildClipPathToLoad(animate,child,data,function(){setState({nodesDoneClipPathLoad:true});});}return getChildOnLoad(animate,data,function(){setState({nodesDoneLoad:true,animating:false});});}return getChildBeforeLoad(animate,child,data,function(){setState({nodesShouldLoad:true});});};var onExit=function onExit(nodes,child,data,animate){// eslint-disable-line max-params
	if(!nodesDoneClipPathExit){return getChildClipPathToExit(animate,child,data,nodes,function(){setState({nodesDoneClipPathExit:true});});}return getChildPropsOnExit(animate,data,nodes,function(){setState({nodesWillExit:false,animating:false});});};var onEnter=function onEnter(nodes,child,data,animate){// eslint-disable-line max-params
	if(nodesShouldEnter){if(!nodesDoneClipPathEnter){return getChildClipPathToEnter(animate,child,data,nodes,function(){setState({nodesDoneClipPathEnter:true});});}return getChildPropsOnEnter(animate,data,nodes,function(){setState({nodesWillEnter:false,animating:false});});}return getChildPropsBeforeEnter(animate,child,data,nodes,function(){setState({nodesShouldEnter:true});});};var getChildTransitionDuration=function getChildTransitionDuration(child,type){var animate=child.props.animate;var defaultTransitions=child.type&&child.type.defaultTransitions;if(defaultTransitions){return animate[type]&&animate[type].duration||defaultTransitions[type]&&defaultTransitions[type].duration;}return{};};return function getTransitionProps(child,index){// eslint-disable-line max-statements, complexity, max-len
	var data=getChildData(child)||[];var animate=(0,_defaults3.default)({},props.animate,child.props.animate);animate.onExit=(0,_defaults3.default)({},animate.onExit,child.type.defaultTransitions&&child.type.defaultTransitions.onExit);
	
	animate.onEnter=(0,_defaults3.default)(
	{},animate.onEnter,child.type.defaultTransitions&&child.type.defaultTransitions.onEnter);
	
	animate.onLoad=(0,_defaults3.default)(
	{},animate.onLoad,child.type.defaultTransitions&&child.type.defaultTransitions.onLoad);
	
	
	var childTransitions=childrenTransitions[index]||childrenTransitions[0];
	if(!nodesDoneLoad){
	// should do onLoad animation
	var load=transitionDurations.load||getChildTransitionDuration(child,"onLoad");
	var animation={duration:load};
	return onLoad(child,data,(0,_assign3.default)({},animate,animation));
	}else if(nodesWillExit){
	var exitingNodes=childTransitions&&childTransitions.exiting;
	var exit=transitionDurations.exit||getChildTransitionDuration(child,"onExit");
	// if nodesWillExit, but this child has no exiting nodes, set a delay instead of a duration
	var _animation=exitingNodes?{duration:exit}:{delay:exit};
	return onExit(exitingNodes,child,data,(0,_assign3.default)({},animate,_animation));
	}else if(nodesWillEnter){
	var enteringNodes=childTransitions&&childTransitions.entering;
	var enter=transitionDurations.enter||getChildTransitionDuration(child,"onEnter");
	var move=transitionDurations.move||
	child.props.animate&&child.props.animate.duration;
	var _animation2={duration:nodesShouldEnter&&enteringNodes?enter:move};
	return onEnter(enteringNodes,child,data,(0,_assign3.default)({},animate,_animation2));
	}else if(!state&&animate&&animate.onExit){
	// This is the initial render, and nodes may enter when props change. Because
	// animation interpolation is determined by old- and next- props, data may need
	// to be augmented with certain properties.
	//
	// For example, it may be desired that exiting nodes go from `opacity: 1` to
	// `opacity: 0`. Without setting this on a per-datum basis, the interpolation
	// might go from `opacity: undefined` to `opacity: 0`, which would result in
	// interpolated `opacity: NaN` values.
	//
	return getInitialChildProps(animate,data);
	}
	
	animate.onEnd=function(){setState({animating:false});};
	return{animate:animate,data:data};
	};
	}

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _sum2=__webpack_require__(218);var _sum3=_interopRequireDefault(_sum2);var _min2=__webpack_require__(220);var _min3=_interopRequireDefault(_min2);var _max2=__webpack_require__(223);var _max3=_interopRequireDefault(_max2);var _filter2=__webpack_require__(225);var _filter3=_interopRequireDefault(_filter2);exports.
	
	
	
	
	continuousTransitions=continuousTransitions;exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	discreteTransitions=discreteTransitions;var _helpers=__webpack_require__(69);var _helpers2=_interopRequireDefault(_helpers);var _log=__webpack_require__(185);var _log2=_interopRequireDefault(_log);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/* eslint-disable func-style */function continuousTransitions(){return{onLoad:{duration:2000,entrance:"left",beforeClipPathWidth:function beforeClipPathWidth(data,child,animate){var range=_helpers2.default.getRange(child.props,"x");var paddingLeft=range[0];var paddingRight=child.props.width-range[1];// eslint-disable-line max-len
	if(animate.onLoad.entrance==="left"){return{clipWidth:paddingLeft+paddingRight};}else if(animate.onLoad.entrance==="right"){return{clipWidth:paddingLeft+paddingRight,translateX:child.props.width-paddingLeft-paddingRight};}else{_log2.default.warn("onLoad entrance should be one of left or right");return{};}},afterClipPathWidth:function afterClipPathWidth(data,child,animate){var range=_helpers2.default.getRange(child.props,"x");if(animate.onLoad.entrance==="left"){return{clipWidth:(0,_sum3.default)(range)};}else if(animate.onLoad.entrance==="right"){return{clipWidth:(0,_sum3.default)(range),translateX:0};}else{_log2.default.warn("onLoad entrance should be one of left or right");return{};}}},onExit:{duration:500,beforeClipPathWidth:function beforeClipPathWidth(data,child,exitingNodes){var filterExit=(0,_filter3.default)(data,function(datum,index){return!exitingNodes[index];});var xVals=filterExit.map(function(datum){return child.type.getScale(child.props).x(datum.x);});var clipPath=(0,_min3.default)(xVals)+(0,_max3.default)(xVals);return clipPath;}},onEnter:{duration:500,beforeClipPathWidth:function beforeClipPathWidth(data,child,enteringNodes){var filterEnter=(0,_filter3.default)(data,function(datum,index){return!enteringNodes[index];});var xVals=filterEnter.map(function(datum){return child.type.getScale(child.props).x(datum.x);});var clipPath=(0,_min3.default)(xVals)+(0,_max3.default)(xVals);return clipPath;},afterClipPathWidth:function afterClipPathWidth(data,child){var xVals=data.map(function(datum){return child.type.getScale(child.props).x(datum.x);});var clipPath=(0,_min3.default)(xVals)+(0,_max3.default)(xVals);return clipPath;}}};}function discreteTransitions(){return{
	onLoad:{
	duration:2000,
	before:function before(){return{opacity:0};},
	after:function after(datum){return{opacity:datum.opacity||1};}},
	
	onExit:{
	duration:600,
	before:function before(){return{opacity:0};}},
	
	onEnter:{
	duration:600,
	before:function before(){return{opacity:0};},
	after:function after(datum){return{opacity:datum.opacity||1};}}};
	
	
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var baseSum = __webpack_require__(219),
	    identity = __webpack_require__(152);
	
	/**
	 * Computes the sum of the values in `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.4.0
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {number} Returns the sum.
	 * @example
	 *
	 * _.sum([4, 2, 8, 6]);
	 * // => 20
	 */
	function sum(array) {
	  return (array && array.length)
	    ? baseSum(array, identity)
	    : 0;
	}
	
	module.exports = sum;


/***/ },
/* 219 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sum` and `_.sumBy` without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {number} Returns the sum.
	 */
	function baseSum(array, iteratee) {
	  var result,
	      index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var current = iteratee(array[index]);
	    if (current !== undefined) {
	      result = result === undefined ? current : (result + current);
	    }
	  }
	  return result;
	}
	
	module.exports = baseSum;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var baseExtremum = __webpack_require__(221),
	    baseLt = __webpack_require__(222),
	    identity = __webpack_require__(152);
	
	/**
	 * Computes the minimum value of `array`. If `array` is empty or falsey,
	 * `undefined` is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {*} Returns the minimum value.
	 * @example
	 *
	 * _.min([4, 2, 8, 6]);
	 * // => 2
	 *
	 * _.min([]);
	 * // => undefined
	 */
	function min(array) {
	  return (array && array.length)
	    ? baseExtremum(array, identity, baseLt)
	    : undefined;
	}
	
	module.exports = min;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(131);
	
	/**
	 * The base implementation of methods like `_.max` and `_.min` which accepts a
	 * `comparator` to determine the extremum value.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The iteratee invoked per iteration.
	 * @param {Function} comparator The comparator used to compare values.
	 * @returns {*} Returns the extremum value.
	 */
	function baseExtremum(array, iteratee, comparator) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index],
	        current = iteratee(value);
	
	    if (current != null && (computed === undefined
	          ? (current === current && !isSymbol(current))
	          : comparator(current, computed)
	        )) {
	      var computed = current,
	          result = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseExtremum;


/***/ },
/* 222 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.lt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is less than `other`,
	 *  else `false`.
	 */
	function baseLt(value, other) {
	  return value < other;
	}
	
	module.exports = baseLt;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var baseExtremum = __webpack_require__(221),
	    baseGt = __webpack_require__(224),
	    identity = __webpack_require__(152);
	
	/**
	 * Computes the maximum value of `array`. If `array` is empty or falsey,
	 * `undefined` is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {*} Returns the maximum value.
	 * @example
	 *
	 * _.max([4, 2, 8, 6]);
	 * // => 8
	 *
	 * _.max([]);
	 * // => undefined
	 */
	function max(array) {
	  return (array && array.length)
	    ? baseExtremum(array, identity, baseGt)
	    : undefined;
	}
	
	module.exports = max;


/***/ },
/* 224 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.gt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is greater than `other`,
	 *  else `false`.
	 */
	function baseGt(value, other) {
	  return value > other;
	}
	
	module.exports = baseGt;


/***/ },
/* 225 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _identity2=__webpack_require__(152);var _identity3=_interopRequireDefault(_identity2);var _filter2=__webpack_require__(225);var _filter3=_interopRequireDefault(_filter2);var _pick2=__webpack_require__(214);var _pick3=_interopRequireDefault(_pick2);var _isFunction2=__webpack_require__(119);var _isFunction3=_interopRequireDefault(_isFunction2);var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _victoryAnimation=__webpack_require__(207);var _victoryAnimation2=_interopRequireDefault(_victoryAnimation);
	var _index=__webpack_require__(215);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	
	VictoryTransition=function(_React$Component){_inherits(VictoryTransition,_React$Component);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function VictoryTransition(props){_classCallCheck(this,VictoryTransition);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(VictoryTransition).call(this,
	props));
	
	_this.state={
	nodesShouldLoad:false,
	nodesDoneLoad:false,
	nodesDoneClipPathLoad:false,
	animating:true};
	
	
	_this.getTransitionState=_this.getTransitionState.bind(_this);return _this;
	}_createClass(VictoryTransition,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(
	
	nextProps){
	this.setState(this.getTransitionState(this.props,nextProps));
	}},{key:"componentWillUpdate",value:function componentWillUpdate(
	
	nextProps,nextState){
	if(nextState.animating!==this.state.animating&&nextState.animating===false){
	var onEnd=nextProps&&nextProps.animate&&nextProps.animate.onEnd||_identity3.default;
	onEnd();
	}
	}},{key:"componentDidMount",value:function componentDidMount()
	
	{
	if(this.transitionProps&&this.transitionProps.cb){
	this.transitionProps.cb();
	}
	}},{key:"getTransitionState",value:function getTransitionState(
	
	props,nextProps){var
	animate=props.animate;
	if(!animate){
	return{};
	}else if(animate.parentState){
	var oldProps=animate.parentState.nodesWillExit?props:null;
	return{oldProps:oldProps};
	}else{
	var oldChildren=_react2.default.Children.toArray(props.children);
	var nextChildren=_react2.default.Children.toArray(nextProps.children);var _Transitions$getIniti=
	
	
	
	
	
	
	
	
	
	
	
	_index.Transitions.getInitialTransitionState(oldChildren,nextChildren);var nodesWillExit=_Transitions$getIniti.nodesWillExit;var nodesWillEnter=_Transitions$getIniti.nodesWillEnter;var childrenTransitions=_Transitions$getIniti.childrenTransitions;var nodesShouldEnter=_Transitions$getIniti.nodesShouldEnter;var nodesShouldLoad=_Transitions$getIniti.nodesShouldLoad;var nodesDoneLoad=_Transitions$getIniti.nodesDoneLoad;var nodesDoneClipPathLoad=_Transitions$getIniti.nodesDoneClipPathLoad;var nodesDoneClipPathEnter=_Transitions$getIniti.nodesDoneClipPathEnter;var nodesDoneClipPathExit=_Transitions$getIniti.nodesDoneClipPathExit;var animating=_Transitions$getIniti.animating;
	
	return{
	nodesWillExit:nodesWillExit,
	nodesWillEnter:nodesWillEnter,
	childrenTransitions:childrenTransitions,
	nodesShouldEnter:nodesShouldEnter,
	nodesDoneClipPathEnter:nodesDoneClipPathEnter,
	nodesDoneClipPathExit:nodesDoneClipPathExit,
	nodesShouldLoad:nodesShouldLoad||this.state.nodesShouldLoad,
	nodesDoneClipPathLoad:nodesDoneClipPathLoad||this.state.nodesDoneClipPathLoad,
	nodesDoneLoad:nodesDoneLoad||this.state.nodesDoneLoad,
	animating:animating||this.state.animating,
	oldProps:nodesWillExit?props:null};
	
	}
	}},{key:"getDomainFromChildren",value:function getDomainFromChildren(
	
	props,axis){
	var getChildDomains=function getChildDomains(children){
	return children.reduce(function(memo,child){
	if(child.type&&(0,_isFunction3.default)(child.type.getDomain)){
	var childDomain=child.props&&child.type.getDomain(child.props,axis);
	return childDomain?memo.concat(childDomain):memo;
	}else if(child.props&&child.props.children){
	return memo.concat(getChildDomains(_react2.default.Children.toArray(child.props.children)));
	}
	return memo;
	},[]);
	};
	
	var childComponents=_react2.default.Children.toArray(props.children);
	if(props.domain&&(Array.isArray(props.domain)||props.domain[axis])){
	return Array.isArray(props.domain)?props.domain:props.domain[axis];
	}else{
	var childDomains=getChildDomains(childComponents);
	return childDomains.length===0?
	[0,1]:[_index.Collection.getMinValue(childDomains),_index.Collection.getMaxValue(childDomains)];
	}
	}},{key:"render",value:function render()
	
	{var _this2=this;
	var props=this.state&&this.state.nodesWillExit?
	this.state.oldProps:this.props;
	var getTransitionProps=this.props.animate&&this.props.animate.getTransitions?
	this.props.animate.getTransitions:
	_index.Transitions.getTransitionPropsFactory(
	props,
	this.state,
	function(newState){return _this2.setState(newState);});
	
	var child=_react2.default.Children.toArray(props.children)[0];
	var transitionProps=getTransitionProps(child);
	this.transitionProps=transitionProps;
	var domain={
	x:this.getDomainFromChildren(props,"x"),
	y:this.getDomainFromChildren(props,"y")};
	
	var combinedProps=(0,_defaults3.default)(
	{domain:domain},transitionProps,child.props);
	
	var animationWhitelist=props.animationWhitelist;
	var clipPathWhitelist=["clipWidth","clipHeight","translateX"];
	
	if(this.state&&this.state.nodesDoneClipPathExit&&this.state.nodesWillExit||
	transitionProps.animate&&
	transitionProps.animate.parentState&&
	transitionProps.animate.parentState.nodesDoneClipPathExit&&
	transitionProps.animate.parentState.nodesWillExit){
	clipPathWhitelist=(0,_filter3.default)(clipPathWhitelist,function(list){
	return list!=="clipWidth";
	});
	}
	
	var propsToAnimate=animationWhitelist?
	(0,_pick3.default)(combinedProps,animationWhitelist.concat(clipPathWhitelist)):combinedProps;
	
	return(
	_react2.default.createElement(_victoryAnimation2.default,_extends({},combinedProps.animate,{data:propsToAnimate}),
	function(newProps){
	var component=_react2.default.cloneElement(
	child,(0,_defaults3.default)({animate:null},newProps,combinedProps));
	return component;
	}));
	
	
	}}]);return VictoryTransition;}(_react2.default.Component);VictoryTransition.displayName="VictoryTransition";VictoryTransition.propTypes={/**
	     * The animate prop specifies an animation config for the transition.
	     * This prop should be given as an object.
	     */animate:_react2.default.PropTypes.object,/**
	     * VictoryTransition animates a single child component
	     */children:_react2.default.PropTypes.node,/**
	     * This prop specifies which of the child's props are safe to interpolate.
	     * This props should be given as an array.
	     */animationWhitelist:_react2.default.PropTypes.array};exports.default=VictoryTransition;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);var _partialRight2=__webpack_require__(228);var _partialRight3=_interopRequireDefault(_partialRight2);var _isFunction2=__webpack_require__(119);var _isFunction3=_interopRequireDefault(_isFunction2);var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
	var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _index=__webpack_require__(215);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	VictorySharedEvents=function(_React$Component){_inherits(VictorySharedEvents,_React$Component);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function VictorySharedEvents(){_classCallCheck(this,VictorySharedEvents);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(VictorySharedEvents).call(this));
	
	_this.state={};
	_this.getScopedEvents=_index.Events.getScopedEvents.bind(_this);
	_this.getEventState=_index.Events.getEventState.bind(_this);return _this;
	}_createClass(VictorySharedEvents,[{key:"componentWillMount",value:function componentWillMount()
	
	{
	this.setUpChildren(this.props);
	}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(
	
	newProps){
	this.setUpChildren(newProps);
	}},{key:"setUpChildren",value:function setUpChildren(
	
	props){
	this.childComponents=_react2.default.Children.toArray(props.children);
	var childBaseProps=this.getBasePropsFromChildren(this.childComponents);
	var parentBaseProps=props.container?{parent:props.container.props}:{};
	this.baseProps=(0,_assign3.default)({},childBaseProps,{parent:parentBaseProps});
	}},{key:"getBasePropsFromChildren",value:function getBasePropsFromChildren(
	
	childComponents){
	var getBaseProps=function getBaseProps(children){
	return children.reduce(function(memo,child,index){
	if(child.type&&(0,_isFunction3.default)(child.type.getBaseProps)){
	var baseChildProps=child.props&&child.type.getBaseProps(child.props);
	if(baseChildProps){
	var childKey=child.props.name||index;
	memo[childKey]=baseChildProps;
	return memo;
	}
	return memo;
	}else if(child.props&&child.props.children){
	return getBaseProps(_react2.default.Children.toArray(child.props.children));
	}
	return memo;
	},{});
	};
	return getBaseProps(childComponents);
	}},{key:"getNewChildren",value:function getNewChildren(
	
	props){var _this2=this;var
	events=props.events;var eventKey=props.eventKey;
	var childNames=Object.keys(this.baseProps);
	
	var alterChildren=function alterChildren(children){
	return children.reduce(function(memo,child){
	if(child.type&&(0,_isFunction3.default)(child.type.getBaseProps)){var _ret=function(){
	var name=child.props.name||childNames.shift();
	var childEvents=Array.isArray(events)&&
	events.filter(function(event){
	return Array.isArray(event.childName)?
	event.childName.indexOf(name)>-1:
	event.childName===name||event.childName==="all";
	});
	var sharedEvents={
	events:childEvents,
	getEvents:(0,_partialRight3.default)(_this2.getScopedEvents,name,_this2.baseProps),
	getEventState:(0,_partialRight3.default)(_this2.getEventState,name)};
	
	return{v:memo.concat(_react2.default.cloneElement(child,(0,_assign3.default)(
	{key:"events-"+name,sharedEvents:sharedEvents,eventKey:eventKey},
	child.props)))};}();if(typeof _ret==="object")return _ret.v;
	
	}else if(child.props.children){
	return memo.concat(_react2.default.cloneElement(
	child,
	child.props,
	alterChildren(_react2.default.Children.toArray(child.props.children))));
	
	}else{
	return memo.concat(child);
	}
	},[]);
	};
	
	return alterChildren(this.childComponents);
	}},{key:"getContainer",value:function getContainer(
	
	props,children){
	var parents=Array.isArray(props.events)&&
	props.events.filter(function(event){return event.target==="parent";});
	var sharedEvents=parents.length>0?
	{
	events:parents,
	getEvents:(0,_partialRight3.default)(this.getScopedEvents,null,this.baseProps),
	getEventState:(0,_partialRight3.default)(this.getEventState,null)}:
	null;
	var boundGetEvents=_index.Events.getEvents.bind(this);
	var parentEvents=boundGetEvents({sharedEvents:sharedEvents},"parent");
	var parentProps=(0,_defaults3.default)(
	{},
	this.getEventState("parent","parent"),
	props.container.props,
	this.baseProps.parent);
	
	return _react2.default.cloneElement(
	props.container,
	(0,_assign3.default)(
	{},parentProps,{events:_index.Events.getPartialEvents(parentEvents,"parent",parentProps)}),
	
	children);
	
	}},{key:"render",value:function render()
	
	{
	var children=this.getNewChildren(this.props);
	return this.props.container?this.getContainer(this.props,children):_react2.default.createElement("g",null,children);
	
	}}]);return VictorySharedEvents;}(_react2.default.Component);VictorySharedEvents.displayName="VictorySharedEvents";VictorySharedEvents.role="shared-event-wrapper";VictorySharedEvents.propTypes={/**
	     * VictoryEvents is a wrapper component that coordinates events between child components,
	     */children:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node),_react2.default.PropTypes.node]),/**
	     * The container prop specifies a container for the children to be rendered into.
	     * If no container is provided, a <g> tag will be used. Shared parent events will only
	     * be attached when a container prop is provided.
	     */container:_react2.default.PropTypes.node,/**
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
	     */events:_react.PropTypes.arrayOf(_react.PropTypes.shape({childName:_react.PropTypes.oneOfType([_react.PropTypes.string,_react.PropTypes.array]),target:_react.PropTypes.string,eventKey:_react.PropTypes.oneOfType([_react.PropTypes.array,_react.PropTypes.func,_index.PropTypes.allOfType([_index.PropTypes.integer,_index.PropTypes.nonNegative]),_react.PropTypes.string]),eventHandlers:_react.PropTypes.object})),/**
	     * Similar to data accessor props `x` and `y`, this prop may be used to functionally
	     * assign eventKeys to data
	     */eventKey:_react.PropTypes.oneOfType([_react.PropTypes.array,_react.PropTypes.func,_index.PropTypes.allOfType([_index.PropTypes.integer,_index.PropTypes.nonNegative]),_react.PropTypes.string])};exports.default=VictorySharedEvents;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(101),
	    createWrap = __webpack_require__(134),
	    getHolder = __webpack_require__(156),
	    replaceHolders = __webpack_require__(159);
	
	/** Used to compose bitmasks for function metadata. */
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
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
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
	var partialRight = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partialRight));
	  return createWrap(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	VictoryContainer=function(_React$Component){_inherits(VictoryContainer,_React$Component);function VictoryContainer(){_classCallCheck(this,VictoryContainer);return _possibleConstructorReturn(this,Object.getPrototypeOf(VictoryContainer).apply(this,arguments));}_createClass(VictoryContainer,[{key:"render",value:function render()
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	{
	return(
	_react2.default.createElement("svg",_extends({
	style:this.props.style,
	viewBox:"0 0 "+this.props.width+" "+this.props.height,
	role:"img",
	"aria-labelledby":"title desc"},
	this.props.events),
	
	_react2.default.createElement("title",{id:"title"},this.props.title),
	_react2.default.createElement("desc",{id:"desc"},this.props.desc),
	this.props.children));
	
	
	}}]);return VictoryContainer;}(_react2.default.Component);VictoryContainer.displayName="VictoryContainer";VictoryContainer.propTypes={/**
	     * The style prop specifies styles for your VictoryContainer. Any valid inline style properties
	     * will be applied. Height and width should be specified via the height
	     * and width props, as they are used to calculate the alignment of
	     * components within the container. Styles from the child component will
	     * also be passed, if any exist.
	     * @examples {border: 1px solid red}
	     */style:_react.PropTypes.object,/**
	     * The height props specifies the height the svg viewBox of the container.
	     * This value should be given as a number of pixels. If no height prop
	     * is given, the height prop from the child component passed will be used.
	     */height:_react.PropTypes.number,/**
	     * The width props specifies the width of the svg viewBox of the container
	     * This value should be given as a number of pixels. If no width prop
	     * is given, the width prop from the child component passed will be used.
	     */width:_react.PropTypes.number,/**
	     * The events prop attaches arbitrary event handlers to the container component.
	     * Event handlers passed from other Victory components are called with their
	     * corresponding events as well as scale, style, width, height, and data when
	     * applicable. Use the invert method to convert event coordinate information to
	     * data. `scale.x.invert(evt.offsetX)`.
	     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
	     */events:_react.PropTypes.object,/**
	     * VictoryContainer is a wrapper component that controls some props and behaviors of its
	     * children. VictoryContainer works with all Victory components.
	     * If no children are provided, VictoryContainer will render an empty SVG.
	     * Props from children are used to determine default style, height, and width.
	     */children:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node),_react2.default.PropTypes.node]),/**
	     * The title prop specifies the title to be applied to the SVG to assist
	     * accessibility for screen readers. The more descriptive this title is, the more
	     * useful it will be. If no title prop is passed, it will default to Victory Chart.
	     * @examples "Popularity of Dog Breeds by Percentage"
	     */title:_react.PropTypes.string,/**
	     * The desc prop specifies the description of the chart/SVG to assist with
	     * accessibility for screen readers. The more info about the chart provided in
	     * the description, the more usable it will be for people using screen readers.
	     * This prop defaults to an empty string.
	     * @examples "Golden retreivers make up 30%, Labs make up 25%, and other dog breeds are
	     * not represented above 5% each."
	     */desc:_react.PropTypes.string};VictoryContainer.defaultProps={title:"Victory Chart",desc:""};exports.default=VictoryContainer;

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _material=__webpack_require__(231);var _material2=_interopRequireDefault(_material);
	var _grayscale=__webpack_require__(232);var _grayscale2=_interopRequireDefault(_grayscale);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=
	
	{
	material:_material2.default,
	grayscale:_grayscale2.default};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
	
	// *
	// * Colors
	// *
	var yellow200="#FFF59D";
	var deepOrange600="#F4511E";
	var lime300="#DCE775";
	var lightGreen500="#8BC34A";
	var teal700="#00796B";
	var cyan900="#006064";
	var colors=[
	deepOrange600,
	yellow200,
	lime300,
	lightGreen500,
	teal700,
	cyan900];
	
	var blueGrey50="#ECEFF1";
	var blueGrey300="#90A4AE";
	var blueGrey700="#455A64";
	var grey900="#212121";
	// *
	// * Typography
	// *
	var sansSerif="'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
	var letterSpacing="normal";
	var fontSize=12;
	// *
	// * Layout
	// *
	var padding=8;
	var baseProps={
	width:350,
	height:350,
	padding:50};
	
	// *
	// * Labels
	// *
	var baseLabelStyles={
	fontFamily:sansSerif,
	fontSize:fontSize,
	letterSpacing:letterSpacing,
	padding:padding,
	fill:blueGrey700};
	
	
	var centeredLabelStyles=(0,_assign3.default)({textAnchor:"middle"},baseLabelStyles);
	// *
	// * Strokes
	// *
	var strokeDasharray="10, 5";
	var strokeLinecap="round";
	var strokeLinejoin="round";exports.default=
	
	{
	area:(0,_assign3.default)({
	style:{
	data:{
	fill:grey900},
	
	labels:centeredLabelStyles}},
	
	baseProps),
	axis:(0,_assign3.default)({
	style:{
	axis:{
	fill:"none",
	stroke:blueGrey300,
	strokeWidth:2,
	strokeLinecap:strokeLinecap,
	strokeLinejoin:strokeLinejoin},
	
	axisLabel:(0,_assign3.default)({},centeredLabelStyles,{
	padding:padding,
	stroke:"transparent"}),
	
	grid:{
	fill:"none",
	stroke:blueGrey50,
	strokeDasharray:strokeDasharray,
	strokeLinecap:strokeLinecap,
	strokeLinejoin:strokeLinejoin},
	
	ticks:{
	fill:"none",
	padding:padding,
	size:5,
	stroke:blueGrey300,
	strokeWidth:1,
	strokeLinecap:strokeLinecap,
	strokeLinejoin:strokeLinejoin},
	
	tickLabels:(0,_assign3.default)({},baseLabelStyles,{
	fill:blueGrey700,
	stroke:"transparent"})}},
	
	
	baseProps),
	bar:(0,_assign3.default)({
	style:{
	data:{
	fill:blueGrey700,
	padding:padding,
	stroke:"transparent",
	strokeWidth:0,
	width:5},
	
	labels:baseLabelStyles}},
	
	baseProps),
	candlestick:(0,_assign3.default)({
	style:{
	data:{
	stroke:blueGrey700},
	
	labels:centeredLabelStyles},
	
	candleColors:{
	positive:"#ffffff",
	negative:blueGrey700}},
	
	baseProps),
	chart:baseProps,
	errorbar:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	opacity:1,
	stroke:blueGrey700,
	strokeWidth:2},
	
	labels:(0,_assign3.default)({},centeredLabelStyles,{
	stroke:"transparent",
	strokeWidth:0})}},
	
	
	baseProps),
	group:(0,_assign3.default)({
	colorScale:colors},
	baseProps),
	line:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	opacity:1,
	stroke:blueGrey700,
	strokeWidth:2},
	
	labels:(0,_assign3.default)({},baseLabelStyles,{
	stroke:"transparent",
	strokeWidth:0,
	textAnchor:"start"})}},
	
	
	baseProps),
	pie:(0,_assign3.default)({
	colorScale:colors,
	style:{
	data:{
	padding:padding,
	stroke:blueGrey50,
	strokeWidth:1},
	
	labels:(0,_assign3.default)({},baseLabelStyles,{
	padding:20,
	stroke:"transparent",
	strokeWidth:0})}},
	
	
	baseProps),
	scatter:(0,_assign3.default)({
	style:{
	data:{
	fill:blueGrey700,
	opacity:1,
	stroke:"transparent",
	strokeWidth:0},
	
	labels:(0,_assign3.default)({},centeredLabelStyles,{
	stroke:"transparent"})}},
	
	
	baseProps),
	stack:(0,_assign3.default)({
	colorScale:colors},
	baseProps),
	tooltip:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:"transparent",
	strokeWidth:0},
	
	labels:centeredLabelStyles,
	flyout:{
	stroke:blueGrey700,
	strokeWidth:1,
	fill:"#f0f0f0"}},
	
	
	flyoutProps:{
	cornerRadius:10,
	pointerLength:10}},
	
	baseProps),
	voronoi:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:"transparent",
	strokeWidth:0},
	
	labels:centeredLabelStyles}},
	
	baseProps)};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
	
	// *
	// * Colors
	// *
	var colors=[
	"#252525",
	"#525252",
	"#737373",
	"#969696",
	"#bdbdbd",
	"#d9d9d9",
	"#f0f0f0"];
	
	
	var charcoal="#252525";
	// *
	// * Typography
	// *
	var sansSerif="'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
	var letterSpacing="normal";
	var fontSize=14;
	// *
	// * Layout
	// *
	var baseProps={
	width:450,
	height:300,
	padding:50,
	colorScale:colors};
	
	// *
	// * Labels
	// *
	var baseLabelStyles={
	fontFamily:sansSerif,
	fontSize:fontSize,
	letterSpacing:letterSpacing,
	padding:10,
	fill:charcoal,
	stroke:"transparent"};
	
	
	var centeredLabelStyles=(0,_assign3.default)({textAnchor:"middle"},baseLabelStyles);
	// *
	// * Strokes
	// *
	var strokeLinecap="round";
	var strokeLinejoin="round";exports.default=
	
	{
	area:(0,_assign3.default)({
	style:{
	data:{
	fill:charcoal},
	
	labels:centeredLabelStyles}},
	
	baseProps),
	axis:(0,_assign3.default)({
	style:{
	axis:{
	fill:"none",
	stroke:charcoal,
	strokeWidth:1,
	strokeLinecap:strokeLinecap,
	strokeLinejoin:strokeLinejoin},
	
	axisLabel:(0,_assign3.default)({},centeredLabelStyles,{
	padding:25}),
	
	grid:{
	fill:"none",
	stroke:"transparent"},
	
	ticks:{
	fill:"none",
	padding:10,
	size:1,
	stroke:"transparent"},
	
	tickLabels:baseLabelStyles}},
	
	baseProps),
	bar:(0,_assign3.default)({
	style:{
	data:{
	fill:charcoal,
	padding:10,
	stroke:"transparent",
	strokeWidth:0,
	width:8},
	
	labels:baseLabelStyles}},
	
	baseProps),
	candlestick:(0,_assign3.default)({
	style:{
	data:{
	stroke:charcoal,
	strokeWidth:1},
	
	labels:centeredLabelStyles},
	
	candleColors:{
	positive:"#ffffff",
	negative:charcoal}},
	
	baseProps),
	chart:baseProps,
	errorbar:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:charcoal,
	strokeWidth:2},
	
	labels:centeredLabelStyles}},
	
	baseProps),
	group:(0,_assign3.default)({
	colorScale:colors},
	baseProps),
	line:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:charcoal,
	strokeWidth:2},
	
	labels:(0,_assign3.default)({},baseLabelStyles,{
	textAnchor:"start"})}},
	
	
	baseProps),
	pie:{
	style:{
	data:{
	padding:10,
	stroke:"none",
	strokeWidth:1},
	
	labels:(0,_assign3.default)({},baseLabelStyles,{
	padding:20})},
	
	
	colorScale:colors,
	width:400,
	height:400,
	padding:50},
	
	scatter:(0,_assign3.default)({
	style:{
	data:{
	fill:charcoal,
	stroke:"transparent",
	strokeWidth:0},
	
	labels:centeredLabelStyles}},
	
	baseProps),
	stack:(0,_assign3.default)({
	colorScale:colors},
	baseProps),
	tooltip:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:"transparent",
	strokeWidth:0},
	
	labels:centeredLabelStyles,
	flyout:{
	stroke:charcoal,
	strokeWidth:1,
	fill:"#f0f0f0"}},
	
	
	flyoutProps:{
	cornerRadius:10,
	pointerLength:10}},
	
	baseProps),
	voronoi:(0,_assign3.default)({
	style:{
	data:{
	fill:"none",
	stroke:"transparent",
	strokeWidth:0},
	
	labels:centeredLabelStyles}},
	
	baseProps)};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _defaults2=__webpack_require__(182);var _defaults3=_interopRequireDefault(_defaults2);var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _index=__webpack_require__(215);
	var _victoryLabel=__webpack_require__(213);var _victoryLabel2=_interopRequireDefault(_victoryLabel);
	var _index2=__webpack_require__(234);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
	
	
	var defaultStyles={
	stroke:"black",
	strokeWidth:1,
	fill:"f0f0f0"};
	
	
	var defaultLabelStyles={
	fill:"#252525",
	fontSize:14,
	fontFamily:"'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
	stroke:"transparent",
	padding:5};var
	
	
	VictoryTooltip=function(_React$Component){_inherits(VictoryTooltip,_React$Component);function VictoryTooltip(){_classCallCheck(this,VictoryTooltip);return _possibleConstructorReturn(this,Object.getPrototypeOf(VictoryTooltip).apply(this,arguments));}_createClass(VictoryTooltip,[{key:"getEvaluatedProps",value:function getEvaluatedProps(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props){var
	
	horizontal=
	
	props.horizontal;var datum=props.datum;var pointerLength=props.pointerLength;var pointerWidth=props.pointerWidth;var cornerRadius=props.cornerRadius;var width=props.width;var height=props.height;var orientation=props.orientation;var dx=props.dx;var dy=props.dy;var text=props.text;var active=props.active;
	var style=_index.Helpers.evaluateStyle(props.style,datum);
	var flyoutStyle=_index.Helpers.evaluateStyle(props.flyoutStyle,datum);
	var padding=flyoutStyle&&flyoutStyle.padding||0;
	var defaultDx=horizontal?padding:0;
	var defaultDy=horizontal?0:padding;
	var getDefaultOrientation=function getDefaultOrientation(){
	var positive=horizontal?"right":"top";
	var negative=horizontal?"left":"bottom";
	return datum&&datum.y<0?negative:positive;
	};
	return(0,_assign3.default)(
	{},
	props,
	{
	style:style,
	flyoutStyle:flyoutStyle,
	dx:dx!==undefined?_index.Helpers.evaluateProp(dx,datum):defaultDx,
	dy:dy!==undefined?_index.Helpers.evaluateProp(dy,datum):defaultDy,
	cornerRadius:_index.Helpers.evaluateProp(cornerRadius,datum),
	pointerLength:_index.Helpers.evaluateProp(pointerLength,datum),
	pointerWidth:_index.Helpers.evaluateProp(pointerWidth,datum),
	orientation:_index.Helpers.evaluateProp(orientation,datum)||getDefaultOrientation(),
	width:_index.Helpers.evaluateProp(width,datum),
	height:_index.Helpers.evaluateProp(height,datum),
	active:_index.Helpers.evaluateProp(active,datum),
	text:_index.Helpers.evaluateProp(text,datum)});
	
	
	}},{key:"getCalculatedValues",value:function getCalculatedValues(
	
	props){var
	style=props.style;var text=props.text;var datum=props.datum;
	var baseLabelStyle=style?
	(0,_defaults3.default)({},style,defaultLabelStyles):defaultLabelStyles;
	var baseFlyoutStyle=props.flyoutStyle?
	(0,_defaults3.default)({},props.flyoutStyle,defaultStyles):defaultStyles;
	var labelStyle=_index.Helpers.evaluateStyle(baseLabelStyle,datum);
	var flyoutStyle=_index.Helpers.evaluateStyle(baseFlyoutStyle,datum);
	var labelSize=_index.TextSize.approximateTextSize(text,labelStyle);
	var flyoutDimensions=this.getDimensions(props,labelSize,labelStyle);
	var flyoutCenter=this.getFlyoutCenter(props,flyoutDimensions);
	return{labelStyle:labelStyle,flyoutStyle:flyoutStyle,labelSize:labelSize,flyoutDimensions:flyoutDimensions,flyoutCenter:flyoutCenter};
	}},{key:"getFlyoutCenter",value:function getFlyoutCenter(
	
	props,dimensions){var
	x=props.x;var y=props.y;var dx=props.dx;var dy=props.dy;var pointerLength=props.pointerLength;var orientation=props.orientation;var
	height=dimensions.height;var width=dimensions.width;
	var sign=orientation==="right"||orientation==="top"?1:-1;
	return{
	x:orientation==="left"||orientation==="right"?
	x+sign*(pointerLength+width/2+dx):x+sign*dx,
	y:orientation==="top"||orientation==="bottom"?
	y-sign*(pointerLength+height/2+dy):y-sign*dy};
	
	}},{key:"getDimensions",value:function getDimensions(
	
	props,labelSize,labelStyle){var
	orientation=props.orientation;var cornerRadius=props.cornerRadius;var pointerLength=props.pointerLength;var pointerWidth=props.pointerWidth;
	var padding=labelStyle&&labelStyle.padding||0;
	var getHeight=function getHeight(){
	var calculatedHeight=labelSize.height+padding;
	var minHeight=orientation==="top"||orientation==="bottom"?
	2*cornerRadius:2*cornerRadius+pointerWidth;
	return Math.max(minHeight,calculatedHeight);
	};
	var getWidth=function getWidth(){
	var calculatedWidth=labelSize.width+padding;
	var minWidth=orientation==="left"||orientation==="right"?
	2*cornerRadius+pointerLength:2*cornerRadius;
	return Math.max(minWidth,calculatedWidth);
	};
	return{
	height:props.height||getHeight(props,labelSize,orientation)+padding/2,
	width:props.width||getWidth(props,labelSize,orientation)+padding};
	
	}},{key:"getLabelProps",value:function getLabelProps(
	
	props,calculatedValues){var
	flyoutCenter=calculatedValues.flyoutCenter;var labelStyle=calculatedValues.labelStyle;var labelSize=calculatedValues.labelSize;var flyoutDimensions=calculatedValues.flyoutDimensions;var
	text=props.text;var datum=props.datum;var labelComponent=props.labelComponent;var index=props.index;
	var textAnchor=labelStyle.textAnchor||"middle";
	var getLabelX=function getLabelX(){
	var sign=textAnchor==="end"?-1:1;
	return flyoutCenter.x-sign*(flyoutDimensions.width-labelSize.width);
	};
	return(0,_defaults3.default)(
	{},
	labelComponent.props,
	{
	key:"label-"+index,
	text:text,datum:datum,textAnchor:textAnchor,
	style:labelStyle,
	x:!labelStyle.textAnchor||labelStyle.textAnchor==="middle"?
	flyoutCenter.x:getLabelX(),
	y:flyoutCenter.y,
	verticalAnchor:"middle",
	angle:labelStyle.angle});
	
	
	}},{key:"getFlyoutProps",value:function getFlyoutProps(
	
	props,calculatedValues){var
	flyoutDimensions=calculatedValues.flyoutDimensions;var flyoutStyle=calculatedValues.flyoutStyle;var
	
	x=
	
	props.x;var y=props.y;var dx=props.dx;var dy=props.dy;var orientation=props.orientation;var pointerLength=props.pointerLength;var pointerWidth=props.pointerWidth;var cornerRadius=props.cornerRadius;var events=props.events;var flyoutComponent=props.flyoutComponent;var index=props.index;
	return(0,_defaults3.default)(
	{},
	flyoutComponent.props,
	{
	x:x,y:y,dx:dx,dy:dy,orientation:orientation,pointerLength:pointerLength,pointerWidth:pointerWidth,cornerRadius:cornerRadius,events:events,
	key:"flyout-"+index,
	width:flyoutDimensions.width,
	height:flyoutDimensions.height,
	style:flyoutStyle});
	
	
	}},{key:"renderTooltip",value:function renderTooltip(
	
	props){var
	flyoutComponent=props.flyoutComponent;var labelComponent=props.labelComponent;var groupComponent=props.groupComponent;var active=props.active;
	if(!active){
	return null;
	}
	var calculatedValues=this.getCalculatedValues(props);
	var children=[
	_react2.default.cloneElement(flyoutComponent,this.getFlyoutProps(props,calculatedValues)),
	_react2.default.cloneElement(labelComponent,this.getLabelProps(props,calculatedValues))];
	
	return _react2.default.cloneElement(groupComponent,{role:"presentation"},children);
	}},{key:"render",value:function render()
	
	{
	var evaluatedProps=this.getEvaluatedProps(this.props);
	return this.renderTooltip(evaluatedProps);
	}}]);return VictoryTooltip;}(_react2.default.Component);VictoryTooltip.displayName="VictoryTooltip";VictoryTooltip.propTypes={/**
	     * Specifies whether the flyout will be displayed
	     */active:_react.PropTypes.bool,/**
	     * Victory components can pass a datum prop to their tooltip component. This can
	     * be used to calculate functional styles, and determine child text
	     */datum:_react.PropTypes.object,/**
	     * Labels that apply to an entire data series will recieve the entire series
	     * as `data` instead of an individual datum prop.
	     */data:_react.PropTypes.array,/**
	     * The events prop attaches arbitrary event handlers to the tooltip component.
	     * Event handlers are currently only called with their corresponding events.
	     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
	     */events:_react.PropTypes.object,/**
	     * all Victory components will pass a text prop to their label component.
	     * This defines the content of the label.
	     */text:_react.PropTypes.oneOfType([_react.PropTypes.string,_react.PropTypes.number,_react.PropTypes.func]),/**
	     * The style prop applies CSS properties to the rendered `<path>` element.
	     */style:_react.PropTypes.object,/**
	     * The style prop applies CSS properties to the rendered `<text>` element.
	     */flyoutStyle:_react.PropTypes.object,/**
	     * The x prop defines the x coordinate to use as a basis for horizontal
	     * positioning.
	     */x:_react.PropTypes.number,/**
	     * The y prop defines the y coordinate to use as a basis for vertical
	     * positioning.
	     */y:_react.PropTypes.number,/**
	     * The dx prop defines a horizontal shift from the `x` coordinate.
	     */dx:_index.PropTypes.nonNegative,/**
	     * The dy prop defines a vertical shift from the `y` coordinate.
	     */dy:_index.PropTypes.nonNegative,/**
	     * The width prop defines the width of the tooltip flyout.
	     */width:_index.PropTypes.nonNegative,/**
	     * The height prop defines the height of the tooltip flyout.
	     */height:_index.PropTypes.nonNegative,/**
	     * The orientation prop determines which side of the (x, y) coordinate the tooltip
	     * be rendered on
	     */orientation:_react.PropTypes.oneOf(["top","bottom","left","right"]),/**
	     * The pointerLength prop determines the length of the pointer extending from the flyout
	     */pointerLength:_index.PropTypes.nonNegative,/**
	     * The pointerLength prop determines the width of the base of the triangular pointer
	     * extending from the flyout
	     */pointerWidth:_index.PropTypes.nonNegative,/**
	     * The cornerRadius prop determines corner radius of the flyout container
	     */cornerRadius:_index.PropTypes.nonNegative,/**
	     * The horizontal prop determines whether to plot the flyouts to the left / right
	     * of the (x, y) coordinate rather than top / bottom. This is useful when an orientation
	     * prop is not provided, and data will determine the default orientation. i.e. negative
	     * values result in a left orientation and positive values will result in a y orientation
	     * by default
	     */horizontal:_react.PropTypes.bool,/**
	     * The labelComponent prop takes in an entire label component which will be used
	     * to create labels for each tooltip. The new element created from
	     * the passed labelComponent will be supplied with the following properties:
	     * x, y, index, datum, verticalAnchor, textAnchor, angle, style, text, and events.
	     * any of these props may be overridden by passing in props to the supplied component,
	     * or modified or ignored within the custom component itself. If labelComponent is omitted,
	     * a new VictoryLabel will be created with props described above.
	     */labelComponent:_react.PropTypes.element,/**
	     * The flyoutComponent prop takes in an entire flyout component which will be used
	     * to create the container path for each tooltip. The new element created from
	     * the passed flyoutComponent will be supplied with the following properties:
	     * x, y, dx, dy, index, datum, cornerRadius, pointerLength, pointerWidth, width, height,
	     * style, and events. Any of these props may be overridden by passing in props to
	     * the supplied component, or modified or ignored within the custom component itself.
	     * If labelComponent is omitted, a a default Flyout component will be created with
	     * props described above.
	     */flyoutComponent:_react.PropTypes.element,/**
	     * The groupComponent prop takes an entire component which will be used to
	     * create group elements for use within container elements. This prop defaults
	     * to a <g> tag.
	     */groupComponent:_react.PropTypes.element,/**
	     * Victory components pass an index prop to their tooltip component.
	     */index:_react.PropTypes.number};VictoryTooltip.defaultProps={active:false,cornerRadius:5,pointerLength:10,pointerWidth:10,labelComponent:_react2.default.createElement(_victoryLabel2.default,null),flyoutComponent:_react2.default.createElement(_index2.Flyout,null),groupComponent:_react2.default.createElement("g",null)};VictoryTooltip.defaultEvents=[{target:"data",eventHandlers:{onMouseOver:function onMouseOver(){return{target:"labels",mutation:function mutation(){return{active:true};}};},onMouseOut:function onMouseOut(){return{target:"labels",mutation:function mutation(){return{active:false};}};}}}];exports.default=VictoryTooltip;

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});exports.Flyout=exports.Voronoi=exports.Slice=exports.Point=exports.Line=exports.ErrorBar=exports.Curve=exports.ClipPath=exports.Candle=exports.Bar=exports.Area=undefined;var _area=__webpack_require__(235);var _area2=_interopRequireDefault(_area);
	var _bar=__webpack_require__(238);var _bar2=_interopRequireDefault(_bar);
	var _candle=__webpack_require__(239);var _candle2=_interopRequireDefault(_candle);
	var _clipPath=__webpack_require__(240);var _clipPath2=_interopRequireDefault(_clipPath);
	var _curve=__webpack_require__(241);var _curve2=_interopRequireDefault(_curve);
	var _errorBar=__webpack_require__(242);var _errorBar2=_interopRequireDefault(_errorBar);
	var _line=__webpack_require__(243);var _line2=_interopRequireDefault(_line);
	var _point=__webpack_require__(244);var _point2=_interopRequireDefault(_point);
	var _slice=__webpack_require__(250);var _slice2=_interopRequireDefault(_slice);
	var _voronoi=__webpack_require__(251);var _voronoi2=_interopRequireDefault(_voronoi);
	var _flyout=__webpack_require__(252);var _flyout2=_interopRequireDefault(_flyout);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.
	
	
	
	Area=_area2.default;exports.Bar=_bar2.default;exports.Candle=_candle2.default;exports.ClipPath=_clipPath2.default;exports.Curve=_curve2.default;exports.ErrorBar=_errorBar2.default;exports.Line=_line2.default;exports.Point=_point2.default;exports.Slice=_slice2.default;exports.Voronoi=_voronoi2.default;exports.Flyout=_flyout2.default;

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	
	var _d3Shape=__webpack_require__(236);var d3Shape=_interopRequireWildcard(_d3Shape);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Area=function(_React$Component){_inherits(Area,_React$Component);function Area(){_classCallCheck(this,Area);return _possibleConstructorReturn(this,Object.getPrototypeOf(Area).apply(this,arguments));}_createClass(Area,[{key:"toNewName",value:function toNewName(
	
	
	
	
	
	
	
	
	
	
	
	interpolation){
	// d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
	var capitalize=function capitalize(s){return s&&s[0].toUpperCase()+s.slice(1);};
	return"curve"+capitalize(interpolation);
	}},{key:"getAreaPath",value:function getAreaPath(
	
	props){
	var xScale=props.scale.x;
	var yScale=props.scale.y;
	var areaFunction=d3Shape.area().
	curve(d3Shape[this.toNewName(props.interpolation)]).
	x(function(data){return xScale(data.x1||data.x);}).
	y1(function(data){return yScale(data.y1||data.y);}).
	y0(function(data){return yScale(data.y0);});
	return areaFunction(props.data);
	}},{key:"getLinePath",value:function getLinePath(
	
	props){
	var xScale=props.scale.x;
	var yScale=props.scale.y;
	var lineFunction=d3Shape.line().
	curve(d3Shape[this.toNewName(props.interpolation)]).
	x(function(data){return xScale(data.x1||data.x);}).
	y(function(data){return yScale(data.y1);});
	return lineFunction(props.data);
	}},{key:"renderArea",value:function renderArea(
	
	path,style,events){
	var areaStroke=style.stroke?"none":style.fill;
	var areaStyle=(0,_assign3.default)({},style,{stroke:areaStroke});var _props=
	this.props;var role=_props.role;var clipId=_props.clipId;
	return(
	_react2.default.createElement("path",_extends({
	key:"area",
	style:areaStyle,
	role:role,
	d:path},
	events,{
	clipPath:"url(#"+clipId+")"})));
	
	
	}},{key:"renderLine",value:function renderLine(
	
	path,style,events){
	if(!style.stroke||style.stroke==="none"||style.stroke==="transparent"){
	return undefined;
	}var _props2=
	this.props;var role=_props2.role;var clipId=_props2.clipId;
	var lineStyle=(0,_assign3.default)({},style,{fill:"none"});
	return(
	_react2.default.createElement("path",_extends({
	key:"area-stroke",
	style:lineStyle,
	role:role,
	d:path},
	events,{
	clipPath:"url(#"+clipId+")"})));
	
	
	}},{key:"render",value:function render()
	
	{var _props3=
	this.props;var events=_props3.events;var groupComponent=_props3.groupComponent;
	var style=(0,_assign3.default)({fill:"black"},this.props.style);
	var area=this.renderArea(this.getAreaPath(this.props),style,events);
	var line=this.renderLine(this.getLinePath(this.props),style,events);
	return _react2.default.cloneElement(groupComponent,{},area,line);
	}}]);return Area;}(_react2.default.Component);Area.propTypes={clipId:_react.PropTypes.number,data:_react.PropTypes.array,events:_react.PropTypes.object,groupComponent:_react.PropTypes.element,interpolation:_react.PropTypes.string,role:_react.PropTypes.string,scale:_react.PropTypes.object,style:_react.PropTypes.object};exports.default=Area;

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(237)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';
	
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
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
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
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
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
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	}
	
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
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
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
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
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
	
	var curveRadialLinear = curveRadial(curveLinear);
	
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
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	function radialLine$1() {
	  return radialLine(line().curve(curveRadialLinear));
	}
	
	function radialArea() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
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
	      case 3: this.point(this._x2, this._y2); break;
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
	
	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
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
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.1. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
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
	
	  exports.path = path;
	
	  Object.defineProperty(exports, '__esModule', { value: true });
	
	}));

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	
	Bar=function(_React$Component){_inherits(Bar,_React$Component);function Bar(){_classCallCheck(this,Bar);return _possibleConstructorReturn(this,Object.getPrototypeOf(Bar).apply(this,arguments));}_createClass(Bar,[{key:"getVerticalBarPath",value:function getVerticalBarPath(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props,width){var
	x=props.x;var y0=props.y0;var y=props.y;
	var size=width/2;
	return"M "+(x-size)+", "+y0+"\n      L "+(
	x-size)+", "+y+"\n      L "+(
	x+size)+", "+y+"\n      L "+(
	x+size)+", "+y0+"\n      L "+(
	x-size)+", "+y0;
	}},{key:"getHorizontalBarPath",value:function getHorizontalBarPath(
	
	props,width){var
	x=props.x;var y0=props.y0;var y=props.y;
	var size=width/2;
	return"M "+y0+", "+(x-size)+"\n      L "+
	y0+", "+(x+size)+"\n      L "+
	y+", "+(x+size)+"\n      L "+
	y+", "+(x-size)+"\n      L "+
	y0+", "+(x-size);
	}},{key:"getBarPath",value:function getBarPath(
	
	props,width){
	return this.props.horizontal?
	this.getHorizontalBarPath(props,width):this.getVerticalBarPath(props,width);
	}},{key:"getBarWidth",value:function getBarWidth(
	
	props){var
	style=props.style;var width=props.width;var data=props.data;
	var padding=props.padding.left||props.padding;
	var defaultWidth=data.length===0?8:(width-2*padding)/data.length;
	return style&&style.width?style.width:defaultWidth;
	}},{key:"renderBar",value:function renderBar(
	
	path,style,events){var _props=
	this.props;var role=_props.role;var clipId=_props.clipId;
	return(
	_react2.default.createElement("path",_extends({
	d:path,
	style:style,
	role:role,
	shapeRendering:"optimizeSpeed"},
	events,{
	clipPath:"url(#"+clipId+")"})));
	
	
	}},{key:"render",value:function render()
	
	{
	// TODO better bar width calculation
	var barWidth=this.getBarWidth(this.props);
	var path=typeof this.props.x==="number"?
	this.getBarPath(this.props,barWidth):undefined;
	var style=(0,_assign3.default)({fill:"black",stroke:"none"},this.props.style);
	return this.renderBar(path,style,this.props.events);
	}}]);return Bar;}(_react2.default.Component);Bar.propTypes={clipId:_react.PropTypes.number,datum:_react.PropTypes.object,events:_react.PropTypes.object,horizontal:_react.PropTypes.bool,index:_react.PropTypes.number,role:_react.PropTypes.string,scale:_react.PropTypes.object,style:_react.PropTypes.object,x:_react.PropTypes.number,y:_react.PropTypes.number,y0:_react.PropTypes.number,width:_react.PropTypes.number,padding:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.object]),data:_react.PropTypes.array};exports.default=Bar;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	
	
	Candle=function(_React$Component){_inherits(Candle,_React$Component);function Candle(){_classCallCheck(this,Candle);return _possibleConstructorReturn(this,Object.getPrototypeOf(Candle).apply(this,arguments));}_createClass(Candle,[{key:"renderWick",value:function renderWick(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	wickProps){
	return _react2.default.createElement("line",wickProps);
	}},{key:"renderCandle",value:function renderCandle(
	
	candleProps){
	return _react2.default.createElement("rect",candleProps);
	}},{key:"getCandleProps",value:function getCandleProps(
	
	props){var
	width=props.width;var candleHeight=props.candleHeight;var x=props.x;var y=props.y;var data=props.data;var events=props.events;var role=props.role;
	var style=(0,_assign3.default)({stroke:"black"},props.style);
	var padding=props.padding.left||props.padding;
	var candleWidth=style.width||0.5*(width-2*padding)/data.length;
	var candleX=x-candleWidth/2;
	return(0,_assign3.default)({x:candleX,y:y,style:style,role:role,width:candleWidth,height:candleHeight},events);
	}},{key:"getWickProps",value:function getWickProps(
	
	props){var
	x=props.x;var y1=props.y1;var y2=props.y2;var events=props.events;var role=props.role;
	var style=(0,_assign3.default)({stroke:"black"},props.style);
	return(0,_assign3.default)({x1:x,x2:x,y1:y1,y2:y2,style:style,role:role},events);
	}},{key:"render",value:function render()
	
	{
	var candleProps=this.getCandleProps(this.props);
	var wickProps=this.getWickProps(this.props);
	return _react2.default.cloneElement(
	this.props.groupComponent,{},this.renderWick(wickProps),this.renderCandle(candleProps));
	
	}}]);return Candle;}(_react2.default.Component);Candle.propTypes={index:_react2.default.PropTypes.number,x:_react.PropTypes.number,y1:_react.PropTypes.number,y2:_react.PropTypes.number,y:_react.PropTypes.number,events:_react.PropTypes.object,candleHeight:_react.PropTypes.number,scale:_react.PropTypes.object,style:_react.PropTypes.object,datum:_react.PropTypes.object,width:_react.PropTypes.number,padding:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.object]),data:_react.PropTypes.array,groupComponent:_react.PropTypes.element,role:_react.PropTypes.string};exports.default=Candle;

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _index=__webpack_require__(215);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	
	
	ClipPath=function(_React$Component){_inherits(ClipPath,_React$Component);function ClipPath(){_classCallCheck(this,ClipPath);return _possibleConstructorReturn(this,Object.getPrototypeOf(ClipPath).apply(this,arguments));}_createClass(ClipPath,[{key:"renderClipPath",value:function renderClipPath(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props,id){
	return(
	_react2.default.createElement("defs",null,
	_react2.default.createElement("clipPath",{id:id},
	_react2.default.createElement("rect",props))));
	
	
	
	}},{key:"render",value:function render()
	
	{var _props=
	
	
	
	
	
	
	this.props;var clipId=_props.clipId;var clipWidth=_props.clipWidth;var clipHeight=_props.clipHeight;var translateX=_props.translateX;var clipPadding=_props.clipPadding;
	
	var padding=_index.Helpers.getPadding(this.props);
	
	var totalPadding=function totalPadding(side){return padding[side]-(clipPadding[side]||0);};
	
	var clipProps={
	x:totalPadding("left")+translateX,
	y:totalPadding("top"),
	width:clipWidth-totalPadding("left")-totalPadding("right"),
	height:clipHeight-totalPadding("top")-totalPadding("bottom")};
	
	
	return this.renderClipPath(clipProps,clipId);
	}}]);return ClipPath;}(_react2.default.Component);ClipPath.propTypes={/**
	     * A unique ID for clipPath so, it could make sure using specific clipPath on
	     * specific chart
	     * @type {Number}
	     */clipId:_react.PropTypes.number,/**
	     * The clipPadding props specifies the paddings in clipPath
	     * @type {Number}
	     */clipPadding:_react.PropTypes.shape({top:_react.PropTypes.number,bottom:_react.PropTypes.number,left:_react.PropTypes.number,right:_react.PropTypes.number}),/**
	     * The clipHeight props specifies the height of the clipPath
	     * This value should be given as a number of pixels
	     */clipHeight:_index.PropTypes.nonNegative,/**
	     * The clipWidth props specifies the width of the clipPath
	     * This value should be given as a number of pixels
	     */clipWidth:_index.PropTypes.nonNegative,/**
	     * The padding props specifies the amount of padding in number of pixels between
	     * the edge of the chart and any rendered child components. This prop should be given
	     * as an object with padding specified for top, bottom, left and right.
	     */padding:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.shape({top:_react.PropTypes.number,bottom:_react.PropTypes.number,left:_react.PropTypes.number,right:_react.PropTypes.number})]),/**
	     * The translateX props specifies the x-axis translation of the clipPath
	     */translateX:_react.PropTypes.number};ClipPath.defaultProps={translateX:0,clipPadding:{top:5,bottom:5,left:0,right:0}};exports.default=ClipPath;

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	
	var _d3Shape=__webpack_require__(236);var d3Shape=_interopRequireWildcard(_d3Shape);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Curve=function(_React$Component){_inherits(Curve,_React$Component);function Curve(){_classCallCheck(this,Curve);return _possibleConstructorReturn(this,Object.getPrototypeOf(Curve).apply(this,arguments));}_createClass(Curve,[{key:"toNewName",value:function toNewName(
	
	
	
	
	
	
	
	
	
	
	
	interpolation){
	// d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
	var capitalize=function capitalize(s){return s&&s[0].toUpperCase()+s.slice(1);};
	return"curve"+capitalize(interpolation);
	}},{key:"renderLine",value:function renderLine(
	
	path,style,events){var _props=
	this.props;var role=_props.role;var clipId=_props.clipId;
	return(
	_react2.default.createElement("path",_extends({
	style:style,
	d:path,
	role:role},
	events,{
	clipPath:"url(#"+clipId+")",
	vectorEffect:"non-scaling-stroke"})));
	
	
	}},{key:"render",value:function render()
	
	{var _props2=
	this.props;var data=_props2.data;var events=_props2.events;var interpolation=_props2.interpolation;var scale=_props2.scale;var style=_props2.style;
	var xScale=scale.x;
	var yScale=scale.y;
	var lineFunction=d3Shape.line().
	curve(d3Shape[this.toNewName(interpolation)]).
	x(function(d){return xScale(d.x1||d.x);}).
	y(function(d){return yScale(d.y1||d.y);});
	var lineStyle=(0,_assign3.default)({fill:"none",stroke:"black"},style);
	return this.renderLine(lineFunction(data),lineStyle,events);
	}}]);return Curve;}(_react2.default.Component);Curve.propTypes={clipId:_react.PropTypes.number,data:_react.PropTypes.array,events:_react.PropTypes.object,index:_react.PropTypes.number,interpolation:_react.PropTypes.string,role:_react.PropTypes.string,scale:_react.PropTypes.object,style:_react.PropTypes.object};exports.default=Curve;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
	var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/* eslint-disable max-statements */var
	
	
	ErrorBar=function(_React$Component){_inherits(ErrorBar,_React$Component);
	function ErrorBar(props){_classCallCheck(this,ErrorBar);return _possibleConstructorReturn(this,Object.getPrototypeOf(ErrorBar).call(this,
	props));
	}_createClass(ErrorBar,[{key:"renderErrorBar",value:function renderErrorBar(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	error){var _props=
	this.props;var x=_props.x;var y=_props.y;var borderWidth=_props.borderWidth;var groupComponent=_props.groupComponent;var events=_props.events;
	var style=(0,_assign3.default)({stroke:"black"},this.props.style);
	return _react2.default.cloneElement(groupComponent,{},
	error.errorRight?
	_react2.default.createElement("line",_extends({
	key:"borderRight"},
	events,{
	style:style,
	x1:error.errorRight,
	x2:error.errorRight,
	y1:y-borderWidth,
	y2:y+borderWidth})):
	
	null,
	
	error.errorLeft?
	_react2.default.createElement("line",_extends({
	key:"borderLeft"},
	events,{
	style:style,
	x1:error.errorLeft,
	x2:error.errorLeft,
	y1:y-borderWidth,
	y2:y+borderWidth})):
	
	null,
	
	error.errorBottom?
	_react2.default.createElement("line",_extends({
	key:"borderBottom"},
	events,{
	style:style,
	x1:x-borderWidth,
	x2:x+borderWidth,
	y1:error.errorBottom,
	y2:error.errorBottom})):
	
	null,
	
	error.errorTop?
	_react2.default.createElement("line",_extends({
	key:"borderTop"},
	events,{
	style:style,
	x1:x-borderWidth,
	x2:x+borderWidth,
	y1:error.errorTop,
	y2:error.errorTop})):
	
	null,
	
	error.errorTop?
	_react2.default.createElement("line",_extends({
	key:"crossTop"},
	events,{
	style:style,
	x1:x,
	x2:x,
	y1:y,
	y2:error.errorTop,
	shapeRendering:"optimizeSpeed"})):
	
	null,
	
	error.errorBottom?
	_react2.default.createElement("line",_extends({
	key:"crossBottom"},
	events,{
	style:style,
	x1:x,
	x2:x,
	y1:y,
	y2:error.errorBottom,
	shapeRendering:"optimizeSpeed"})):
	
	null,
	
	error.errorLeft?
	_react2.default.createElement("line",_extends({
	key:"crossLeft"},
	events,{
	style:style,
	x1:x,
	x2:error.errorLeft,
	y1:y,
	y2:y,
	shapeRendering:"optimizeSpeed"})):
	null,
	
	error.errorRight?
	_react2.default.createElement("line",_extends({
	key:"crossRight"},
	events,{
	style:style,
	x1:x,
	x2:error.errorRight,
	y1:y,
	y2:y,
	shapeRendering:"optimizeSpeed"})):
	null);
	
	}},{key:"render",value:function render()
	
	{var _props2=
	
	
	
	
	this.props;var errorX=_props2.errorX;var errorY=_props2.errorY;var scale=_props2.scale;
	var rangeX=void 0;
	var rangeY=void 0;
	var positiveErrorX=void 0;
	var negativeErrorX=void 0;
	var positiveErrorY=void 0;
	var negativeErrorY=void 0;
	var errorTop=void 0;
	var errorBottom=void 0;
	var errorRight=void 0;
	var errorLeft=void 0;
	
	if(errorX){
	rangeX=scale.x.range();
	positiveErrorX=errorX[0];
	negativeErrorX=errorX[1];
	errorRight=positiveErrorX>=rangeX[1]?rangeX[1]:positiveErrorX;
	errorLeft=negativeErrorX<=rangeX[0]?rangeX[0]:negativeErrorX;
	}
	
	if(errorY){
	rangeY=scale.y.range();
	positiveErrorY=errorY[1];
	negativeErrorY=errorY[0];
	errorTop=positiveErrorY>=rangeY[0]?rangeY[0]:positiveErrorY;
	errorBottom=negativeErrorY<=rangeY[1]?rangeY[1]:negativeErrorY;
	}
	
	return _react2.default.cloneElement(
	this.props.groupComponent,
	{},
	this.renderErrorBar({errorTop:errorTop,errorBottom:errorBottom,errorRight:errorRight,errorLeft:errorLeft}));
	
	}}]);return ErrorBar;}(_react2.default.Component);ErrorBar.propTypes={index:_react2.default.PropTypes.number,datum:_react.PropTypes.object,events:_react.PropTypes.object,scale:_react.PropTypes.object,style:_react.PropTypes.object,x:_react.PropTypes.number,y:_react.PropTypes.number,errorX:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.array,_react.PropTypes.bool]),errorY:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.array,_react.PropTypes.bool]),borderWidth:_react.PropTypes.number,groupComponent:_react.PropTypes.element};ErrorBar.defaultProps={borderWidth:10};exports.default=ErrorBar;

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _assign2=__webpack_require__(204);var _assign3=_interopRequireDefault(_assign2);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	
	Line=function(_React$Component){_inherits(Line,_React$Component);function Line(){_classCallCheck(this,Line);return _possibleConstructorReturn(this,Object.getPrototypeOf(Line).apply(this,arguments));}_createClass(Line,[{key:"renderAxisLine",value:function renderAxisLine(
	
	
	
	
	
	
	
	
	
	
	
	props,style,events){
	return _react2.default.createElement("line",_extends({},props,{style:style},events,{vectorEffect:"non-scaling-stroke"}));
	}},{key:"render",value:function render()
	
	{var _props=
	this.props;var x1=_props.x1;var x2=_props.x2;var y1=_props.y1;var y2=_props.y2;var events=_props.events;
	var style=(0,_assign3.default)({stroke:"black"},this.props.style);
	return this.renderAxisLine({x1:x1,x2:x2,y1:y1,y2:y2},style,events);
	}}]);return Line;}(_react2.default.Component);Line.propTypes={index:_react.PropTypes.number,tick:_react.PropTypes.any,x1:_react.PropTypes.number,x2:_react.PropTypes.number,y1:_react.PropTypes.number,y2:_react.PropTypes.number,style:_react.PropTypes.object,events:_react.PropTypes.object};exports.default=Line;

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);
	var _pathHelpers=__webpack_require__(245);var _pathHelpers2=_interopRequireDefault(_pathHelpers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Point=function(_React$Component){_inherits(Point,_React$Component);function Point(){_classCallCheck(this,Point);return _possibleConstructorReturn(this,Object.getPrototypeOf(Point).apply(this,arguments));}_createClass(Point,[{key:"getPath",value:function getPath(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props){
	var pathFunctions={
	circle:_pathHelpers2.default.circle,
	square:_pathHelpers2.default.square,
	diamond:_pathHelpers2.default.diamond,
	triangleDown:_pathHelpers2.default.triangleDown,
	triangleUp:_pathHelpers2.default.triangleUp,
	plus:_pathHelpers2.default.plus,
	star:_pathHelpers2.default.star};
	
	return pathFunctions[props.symbol].call(null,props.x,props.y,props.size);
	}},{key:"renderPoint",value:function renderPoint(
	
	path,style,events){var
	role=this.props.role;
	return(
	_react2.default.createElement("path",_extends({},events,{d:path,role:role,shapeRendering:"optimizeSpeed",style:style})));
	
	}},{key:"render",value:function render()
	
	{
	return this.renderPoint(this.getPath(this.props),this.props.style,this.props.events);
	}}]);return Point;}(_react2.default.Component);Point.propTypes={datum:_react.PropTypes.object,events:_react.PropTypes.object,index:_react.PropTypes.number,role:_react.PropTypes.string,size:_react.PropTypes.oneOfType([_react.PropTypes.number,_react.PropTypes.func]),symbol:_react.PropTypes.oneOfType([_react.PropTypes.oneOf(["circle","diamond","plus","square","star","triangleDown","triangleUp"]),_react.PropTypes.func]),scale:_react.PropTypes.object,style:_react.PropTypes.object,x:_react.PropTypes.number,y:_react.PropTypes.number};exports.default=Point;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _range2=__webpack_require__(246);var _range3=_interopRequireDefault(_range2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=
	
	{
	circle:function circle(x,y,size){
	return"M "+x+", "+y+" m "+-size+", 0\n      a "+
	size+", "+size+" 0 1,0 "+size*2+",0\n      a "+
	size+", "+size+" 0 1,0 "+-size*2+",0";
	},
	
	square:function square(x,y,size){
	var baseSize=0.87*size;
	return"M "+(x-baseSize)+", "+(y+baseSize)+"\n      L "+(
	x+baseSize)+", "+(y+baseSize)+"\n      L "+(
	x+baseSize)+", "+(y-baseSize)+"\n      L "+(
	x-baseSize)+", "+(y-baseSize)+"\n      z";
	
	},
	
	diamond:function diamond(x,y,size){
	var baseSize=0.87*size;
	var length=Math.sqrt(2*(baseSize*baseSize));
	return"M "+x+", "+(y+length)+"\n      L "+(
	x+length)+", "+y+"\n      L "+
	x+", "+(y-length)+"\n      L "+(
	x-length)+", "+y+"\n      z";
	
	},
	
	triangleDown:function triangleDown(x,y,size){
	var height=size/2*Math.sqrt(3);
	return"M "+(x-size)+", "+(y-size)+"\n      L "+(
	x+size)+", "+(y-size)+"\n      L "+
	x+", "+(y+height)+"\n      z";
	
	},
	
	triangleUp:function triangleUp(x,y,size){
	var height=size/2*Math.sqrt(3);
	return"M "+(x-size)+", "+(y+size)+"\n      L "+(
	x+size)+", "+(y+size)+"\n      L "+
	x+", "+(y-height)+"\n      z";
	
	},
	
	plus:function plus(x,y,size){
	var baseSize=1.1*size;
	return"M "+(x-baseSize/2.5)+", "+(y+baseSize)+"\n      L "+(
	x+baseSize/2.5)+", "+(y+baseSize)+"\n      L "+(
	x+baseSize/2.5)+", "+(y+baseSize/2.5)+"\n      L "+(
	x+baseSize)+", "+(y+baseSize/2.5)+"\n      L "+(
	x+baseSize)+", "+(y-baseSize/2.5)+"\n      L "+(
	x+baseSize/2.5)+", "+(y-baseSize/2.5)+"\n      L "+(
	x+baseSize/2.5)+", "+(y-baseSize)+"\n      L "+(
	x-baseSize/2.5)+", "+(y-baseSize)+"\n      L "+(
	x-baseSize/2.5)+", "+(y-baseSize/2.5)+"\n      L "+(
	x-baseSize)+", "+(y-baseSize/2.5)+"\n      L "+(
	x-baseSize)+", "+(y+baseSize/2.5)+"\n      L "+(
	x-baseSize/2.5)+", "+(y+baseSize/2.5)+"\n      z";
	
	},
	
	star:function star(x,y,size){
	var baseSize=1.35*size;
	var angle=Math.PI/5;
	var starCoords=(0,_range3.default)(10).map(function(index){
	var length=index%2===0?baseSize:baseSize/2;
	return length*Math.sin(angle*(index+1))+x+",\n        "+(
	length*Math.cos(angle*(index+1))+y);
	});
	return"M "+starCoords.join("L")+" z";
	}};

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(247);
	
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
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(248),
	    isIterateeCall = __webpack_require__(181),
	    toFinite = __webpack_require__(249);
	
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
	    start = toFinite(start);
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toFinite(end);
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	module.exports = createRange;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
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
/* 249 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Slice=function(_React$Component){_inherits(Slice,_React$Component);function Slice(){_classCallCheck(this,Slice);return _possibleConstructorReturn(this,Object.getPrototypeOf(Slice).apply(this,arguments));}_createClass(Slice,[{key:"renderSlice",value:function renderSlice(
	
	
	
	
	
	
	
	
	
	props){
	return(
	_react2.default.createElement("path",_extends({
	d:props.pathFunction(props.slice),
	style:props.style},
	props.events)));
	
	
	}},{key:"render",value:function render()
	
	{
	return this.renderSlice(this.props);
	}}]);return Slice;}(_react2.default.Component);Slice.propTypes={index:_react.PropTypes.number,slice:_react.PropTypes.object,pathFunction:_react.PropTypes.func,style:_react.PropTypes.object,datum:_react.PropTypes.object,events:_react.PropTypes.object};exports.default=Slice;

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Voronoi=function(_React$Component){_inherits(Voronoi,_React$Component);function Voronoi(){_classCallCheck(this,Voronoi);return _possibleConstructorReturn(this,Object.getPrototypeOf(Voronoi).apply(this,arguments));}_createClass(Voronoi,[{key:"getVoronoiPath",value:function getVoronoiPath(
	
	
	
	
	
	
	
	
	
	
	
	
	props){
	return"M "+props.polygon.join("L")+" Z";
	}},{key:"getCirclePath",value:function getCirclePath(
	
	props){var
	x=props.x;var y=props.y;var size=props.size;
	return"M "+x+", "+y+" m "+-size+", 0\n      a "+
	size+", "+size+" 0 1,0 "+size*2+",0\n      a "+
	size+", "+size+" 0 1,0 "+-size*2+",0";
	}},{key:"renderPoint",value:function renderPoint(
	
	paths,style,events){
	var clipId="clipPath-"+Math.random();
	return paths.circle?
	
	_react2.default.createElement("g",null,
	_react2.default.createElement("defs",null,
	_react2.default.createElement("clipPath",{id:clipId},
	_react2.default.createElement("path",{d:paths.voronoi}))),
	
	
	_react2.default.createElement("path",_extends({d:paths.circle,clipPath:"url(#"+clipId+")",style:style},events))):
	
	
	_react2.default.createElement("path",_extends({d:paths.voronoi,style:style},events));
	}},{key:"render",value:function render()
	
	{
	var paths={
	circle:this.props.size&&this.getCirclePath(this.props),
	voronoi:this.getVoronoiPath(this.props)};var _props=
	
	this.props;var style=_props.style;var events=_props.events;
	return this.renderPoint(paths,style,events);
	}}]);return Voronoi;}(_react2.default.Component);Voronoi.propTypes={datum:_react.PropTypes.object,events:_react.PropTypes.object,index:_react.PropTypes.number,polygon:_react.PropTypes.array,scale:_react.PropTypes.object,size:_react.PropTypes.number,style:_react.PropTypes.object,x:_react.PropTypes.number,y:_react.PropTypes.number};exports.default=Voronoi;

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(66);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
	
	Flyout=function(_React$Component){_inherits(Flyout,_React$Component);function Flyout(){_classCallCheck(this,Flyout);return _possibleConstructorReturn(this,Object.getPrototypeOf(Flyout).apply(this,arguments));}_createClass(Flyout,[{key:"getVerticalPath",value:function getVerticalPath(
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	props){var
	pointerLength=props.pointerLength;var pointerWidth=props.pointerWidth;var cornerRadius=props.cornerRadius;var orientation=props.orientation;var width=props.width;var height=props.height;
	var sign=orientation==="top"?1:-1;
	var x=props.x+(props.dx||0);
	var y=props.y-sign*(props.dy||0);
	var pointerEdge=y-sign*pointerLength;
	var oppositeEdge=y-sign*pointerLength-sign*height;
	var rightEdge=x+width/2;
	var leftEdge=x-width/2;
	var direction=orientation==="top"?"0 0 0":"0 0 1";
	var arc=cornerRadius+" "+cornerRadius+" "+direction;
	return"M "+(x-pointerWidth/2)+", "+pointerEdge+"\n      L "+
	x+", "+y+"\n      L "+(
	x+pointerWidth/2)+", "+pointerEdge+"\n      L "+(
	rightEdge-cornerRadius)+", "+pointerEdge+"\n      A "+
	arc+" "+rightEdge+", "+(pointerEdge-sign*cornerRadius)+"\n      L "+
	rightEdge+", "+(oppositeEdge+sign*cornerRadius)+"\n      A "+
	arc+" "+(rightEdge-cornerRadius)+", "+oppositeEdge+"\n      L "+(
	leftEdge+cornerRadius)+", "+oppositeEdge+"\n      A "+
	arc+" "+leftEdge+", "+(oppositeEdge+sign*cornerRadius)+"\n      L "+
	leftEdge+", "+(pointerEdge-sign*cornerRadius)+"\n      A "+
	arc+" "+(leftEdge+cornerRadius)+", "+pointerEdge+"\n      z";
	
	}},{key:"getHorizontalPath",value:function getHorizontalPath(
	
	props){var
	pointerLength=props.pointerLength;var pointerWidth=props.pointerWidth;var cornerRadius=props.cornerRadius;var orientation=props.orientation;var width=props.width;var height=props.height;
	var sign=orientation==="right"?1:-1;
	var x=props.x+sign*(props.dx||0);
	var y=props.y-(props.dy||0);
	var pointerEdge=x+sign*pointerLength;
	var oppositeEdge=x+sign*pointerLength+sign*width;
	var bottomEdge=y+height/2;
	var topEdge=y-height/2;
	var direction=orientation==="right"?"0 0 0":"0 0 1";
	var arc=cornerRadius+" "+cornerRadius+" "+direction;
	return"M "+pointerEdge+", "+(y-pointerWidth/2)+"\n      L "+
	x+", "+y+"\n      L "+
	pointerEdge+", "+(y+pointerWidth/2)+"\n      L "+
	pointerEdge+", "+(bottomEdge-cornerRadius)+"\n      A "+
	arc+" "+(pointerEdge+sign*cornerRadius)+", "+bottomEdge+"\n      L "+(
	oppositeEdge-sign*cornerRadius)+", "+bottomEdge+"\n      A "+
	arc+" "+oppositeEdge+", "+(bottomEdge-cornerRadius)+"\n      L "+
	oppositeEdge+", "+(topEdge+cornerRadius)+"\n      A "+
	arc+" "+(oppositeEdge-sign*cornerRadius)+", "+topEdge+"\n      L "+(
	pointerEdge+sign*cornerRadius)+", "+topEdge+"\n      A "+
	arc+" "+pointerEdge+", "+(topEdge+cornerRadius)+"\n      z";
	
	}},{key:"getFlyoutPath",value:function getFlyoutPath(
	
	props){
	var orientation=props.orientation||"top";
	return orientation==="left"||orientation==="right"?
	this.getHorizontalPath(props):this.getVerticalPath(props);
	}},{key:"renderFlyout",value:function renderFlyout(
	
	path,style,events){
	return(
	_react2.default.createElement("path",_extends({d:path,style:style},events)));
	
	}},{key:"render",value:function render()
	
	{
	var path=this.getFlyoutPath(this.props);
	return this.renderFlyout(path,this.props.style,this.props.events);
	}}]);return Flyout;}(_react2.default.Component);Flyout.propTypes={style:_react.PropTypes.object,x:_react.PropTypes.number,y:_react.PropTypes.number,dx:_react.PropTypes.number,dy:_react.PropTypes.number,width:_react.PropTypes.number,height:_react.PropTypes.number,orientation:_react.PropTypes.oneOf(["top","bottom","left","right"]),pointerLength:_react.PropTypes.number,pointerWidth:_react.PropTypes.number,cornerRadius:_react.PropTypes.number,events:_react.PropTypes.object};exports.default=Flyout;

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports,"__esModule",{value:true});var _omit2=__webpack_require__(254);var _omit3=_interopRequireDefault(_omit2);var _isFunction2=__webpack_require__(43);var _isFunction3=_interopRequireDefault(_isFunction2);var _defaults2=__webpack_require__(44);var _defaults3=_interopRequireDefault(_defaults2);var _assign2=__webpack_require__(62);var _assign3=_interopRequireDefault(_assign2);
	var _d3Shape=__webpack_require__(283);var _d3Shape2=_interopRequireDefault(_d3Shape);
	
	var _victoryCore=__webpack_require__(67);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=
	
	{
	checkForValidText:function checkForValidText(text){
	if(text===undefined||text===null){
	return text;
	}else{
	return""+text;
	}
	},
	
	getSliceStyle:function getSliceStyle(datum,index,calculatedValues){var
	style=calculatedValues.style;var colors=calculatedValues.colors;
	var fill=this.getColor(style,colors,index);
	var dataStyles=(0,_omit3.default)(datum,["x","y","label"]);
	var sliceStyle=(0,_defaults3.default)({},{fill:fill},style.data,dataStyles);
	return _victoryCore.Helpers.evaluateStyle(sliceStyle,datum);
	},
	
	getBaseProps:function getBaseProps(props,fallbackProps){
	props=_victoryCore.Helpers.modifyProps(props,fallbackProps,"pie");
	var calculatedValues=this.getCalculatedValues(props);var
	slices=calculatedValues.slices;var style=calculatedValues.style;var pathFunction=calculatedValues.pathFunction;
	var childProps={parent:{
	slices:slices,pathFunction:pathFunction,width:props.width,height:props.height,style:style.parent}};
	
	for(var index=0,len=slices.length;index<len;index++){
	var slice=slices[index];
	var datum=slice.data;
	var eventKey=datum.eventKey||index;
	var dataProps={
	index:index,
	slice:slice,
	pathFunction:pathFunction,
	style:this.getSliceStyle(datum,index,calculatedValues),
	datum:datum};
	
	
	childProps[eventKey]={
	data:dataProps,
	labels:this.getLabelProps(props,dataProps,calculatedValues)};
	
	}
	return childProps;
	},
	
	getLabelProps:function getLabelProps(props,dataProps,calculatedValues){var
	index=dataProps.index;var datum=dataProps.datum;var slice=dataProps.slice;var
	style=calculatedValues.style;var radius=calculatedValues.radius;
	var labelStyle=_victoryCore.Helpers.evaluateStyle((0,_assign3.default)({padding:0},style.labels),datum);
	var labelRadius=_victoryCore.Helpers.evaluateProp(props.labelRadius,datum);
	var labelPosition=this.getLabelPosition(radius,labelRadius,labelStyle);
	var position=labelPosition.centroid(slice);
	var orientation=this.getLabelOrientation(slice);
	return{
	index:index,datum:datum,slice:slice,orientation:orientation,
	style:labelStyle,
	x:position[0],
	y:position[1],
	text:this.getLabelText(props,datum,index),
	textAnchor:labelStyle.textAnchor||this.getTextAnchor(orientation),
	verticalAnchor:labelStyle.verticalAnchor||this.getVerticalAnchor(orientation),
	angle:labelStyle.angle};
	
	},
	
	getCalculatedValues:function getCalculatedValues(props){var
	theme=props.theme;var colorScale=props.colorScale;
	var styleObject=theme&&theme.pie&&theme.pie.style?theme.pie.style:{};
	var style=_victoryCore.Helpers.getStyles(props.style,styleObject,"auto","100%");
	var colors=Array.isArray(colorScale)?colorScale:_victoryCore.Style.getColorScale(colorScale);
	var padding=_victoryCore.Helpers.getPadding(props);
	var radius=this.getRadius(props,padding);
	var data=_victoryCore.Events.addEventKeys(props,_victoryCore.Helpers.getData(props));
	var layoutFunction=this.getSliceFunction(props);
	var slices=layoutFunction(data);
	var pathFunction=_d3Shape2.default.arc().
	cornerRadius(props.cornerRadius).
	outerRadius(radius).
	innerRadius(props.innerRadius);
	return{style:style,colors:colors,padding:padding,radius:radius,data:data,slices:slices,pathFunction:pathFunction};
	},
	
	getColor:function getColor(style,colors,index){
	if(style&&style.data&&style.data.fill){
	return style.data.fill;
	}
	return colors[index%colors.length];
	},
	
	getRadius:function getRadius(props,padding){
	return Math.min(
	props.width-padding.left-padding.right,
	props.height-padding.top-padding.bottom)/
	2;
	},
	
	getLabelPosition:function getLabelPosition(radius,labelRadius,style){
	
	var padding=style&&style.padding||0;
	var arcRadius=labelRadius||radius+padding;
	return _d3Shape2.default.arc().
	outerRadius(arcRadius).
	innerRadius(arcRadius);
	},
	
	getLabelOrientation:function getLabelOrientation(slice){
	var radiansToDegrees=function radiansToDegrees(radians){
	return radians*(180/Math.PI);
	};
	var start=radiansToDegrees(slice.startAngle);
	var end=radiansToDegrees(slice.endAngle);
	var degree=start+(end-start)/2;
	if(degree<45||degree>315){
	return"top";
	}else if(degree>=45&&degree<135){
	return"right";
	}else if(degree>=135&&degree<225){
	return"bottom";
	}else{
	return"left";
	}
	},
	
	getTextAnchor:function getTextAnchor(orientation){
	if(orientation==="top"||orientation==="bottom"){
	return"middle";
	}
	return orientation==="right"?"start":"end";
	},
	
	getVerticalAnchor:function getVerticalAnchor(orientation){
	if(orientation==="left"||orientation==="right"){
	return"middle";
	}
	return orientation==="bottom"?"start":"end";
	},
	
	getLabelText:function getLabelText(props,datum,index){
	var text=void 0;
	if(datum.label){
	text=datum.label;
	}else if(Array.isArray(props.labels)){
	text=props.labels[index];
	}else{
	text=(0,_isFunction3.default)(props.labels)?props.labels(datum):datum.xName||datum.x;
	}
	return this.checkForValidText(text);
	},
	
	getSliceFunction:function getSliceFunction(props){
	var degreesToRadians=function degreesToRadians(degrees){
	return degrees*(Math.PI/180);
	};
	
	return _d3Shape2.default.pie().
	sort(null).
	startAngle(degreesToRadians(props.startAngle)).
	endAngle(degreesToRadians(props.endAngle)).
	padAngle(degreesToRadians(props.padAngle)).
	value(function(datum){return datum.y;});
	}};

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(255),
	    baseDifference = __webpack_require__(256),
	    baseFlatten = __webpack_require__(270),
	    basePick = __webpack_require__(274),
	    baseRest = __webpack_require__(3),
	    getAllKeysIn = __webpack_require__(276),
	    toKey = __webpack_require__(282);
	
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
	var omit = baseRest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(baseFlatten(props, 1), toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 255 */
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
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(257),
	    arrayIncludes = __webpack_require__(30),
	    arrayIncludesWith = __webpack_require__(267),
	    arrayMap = __webpack_require__(255),
	    baseUnary = __webpack_require__(268),
	    cacheHas = __webpack_require__(269);
	
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
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(258),
	    setCacheAdd = __webpack_require__(265),
	    setCacheHas = __webpack_require__(266);
	
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
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(259),
	    listCacheDelete = __webpack_require__(260),
	    listCacheGet = __webpack_require__(262),
	    listCacheHas = __webpack_require__(263),
	    listCacheSet = __webpack_require__(264);
	
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
/* 259 */
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
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(261);
	
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
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(46);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(261);
	
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
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(261);
	
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(261);
	
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
/* 265 */
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
/* 266 */
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
/* 267 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
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
/* 268 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
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
/* 269 */
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
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(271),
	    isFlattenable = __webpack_require__(272);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	
	  predicate || (predicate = isFlattenable);
	  result || (result = []);
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
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
/* 271 */
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
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(273),
	    isArguments = __webpack_require__(55),
	    isArray = __webpack_require__(56);
	
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
	
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	
	module.exports = isFlattenable;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(11);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(275);
	
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
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}
	
	module.exports = basePick;


/***/ },
/* 275 */
/***/ function(module, exports) {

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = basePickBy;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(277),
	    getSymbolsIn = __webpack_require__(278),
	    keysIn = __webpack_require__(52);
	
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
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(271),
	    isArray = __webpack_require__(56);
	
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
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(271),
	    getPrototype = __webpack_require__(279),
	    getSymbols = __webpack_require__(280),
	    stubArray = __webpack_require__(281);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};
	
	module.exports = getSymbolsIn;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(65);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(65),
	    stubArray = __webpack_require__(281);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
	
	module.exports = getSymbols;


/***/ },
/* 281 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
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
/* 282 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(284)) :
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
/* 284 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=victory-pie.js.map
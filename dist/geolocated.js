(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Geolocated"] = factory(require("react"));
	else
		root["Geolocated"] = factory(root["React"]);
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

	'use strict';
	
	var _geolocated = __webpack_require__(1);
	
	var _geolocated2 = _interopRequireDefault(_geolocated);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = { geolocated: _geolocated2.default, geoPropTypes: _geolocated.geoPropTypes };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.geoPropTypes = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function getDisplayName(WrappedComponent) {
	    return 'Geolocated(' + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ')';
	}
	
	var geolocated = function geolocated() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$positionOptions = _ref.positionOptions;
	    var positionOptions = _ref$positionOptions === undefined ? {
	        enableHighAccuracy: true,
	        maximumAge: 0,
	        timeout: Infinity
	    } : _ref$positionOptions;
	    var _ref$userDecisionTime = _ref.userDecisionTimeout;
	    var userDecisionTimeout = _ref$userDecisionTime === undefined ? null : _ref$userDecisionTime;
	    var _ref$geolocationProvi = _ref.geolocationProvider;
	    var geolocationProvider = _ref$geolocationProvi === undefined ? typeof navigator !== 'undefined' && navigator.geolocation : _ref$geolocationProvi;
	    return function (WrappedComponent) {
	        var result = function (_Component) {
	            _inherits(Geolocated, _Component);
	
	            function Geolocated(props) {
	                _classCallCheck(this, Geolocated);
	
	                var _this = _possibleConstructorReturn(this, (Geolocated.__proto__ || Object.getPrototypeOf(Geolocated)).call(this, props));
	
	                _this.state = {
	                    coords: null,
	                    isGeolocationAvailable: Boolean(geolocationProvider),
	                    isGeolocationEnabled: true, // be optimistic
	                    positionError: null
	                };
	
	                if (userDecisionTimeout) {
	                    _this.userDecisionTimeoutId = setTimeout(function () {
	                        _this.onPositionError();
	                    }, userDecisionTimeout);
	                }
	
	                _this.onPositionError = _this.onPositionError.bind(_this);
	                _this.onPositionSuccess = _this.onPositionSuccess.bind(_this);
	                _this.cancelUserDecisionTimeout = _this.cancelUserDecisionTimeout.bind(_this);
	                return _this;
	            }
	
	            _createClass(Geolocated, [{
	                key: 'cancelUserDecisionTimeout',
	                value: function cancelUserDecisionTimeout() {
	                    if (this.userDecisionTimeoutId) {
	                        clearTimeout(this.userDecisionTimeoutId);
	                    }
	                }
	            }, {
	                key: 'onPositionError',
	                value: function onPositionError(positionError) {
	                    this.cancelUserDecisionTimeout();
	                    this.setState({
	                        coords: null,
	                        isGeolocationAvailable: this.state.isGeolocationAvailable,
	                        isGeolocationEnabled: false,
	                        positionError: positionError
	                    });
	                }
	            }, {
	                key: 'onPositionSuccess',
	                value: function onPositionSuccess(position) {
	                    this.cancelUserDecisionTimeout();
	                    this.setState({
	                        coords: position.coords,
	                        isGeolocationAvailable: this.state.isGeolocationAvailable,
	                        isGeolocationEnabled: true,
	                        positionError: null
	                    });
	                }
	            }, {
	                key: 'componentDidMount',
	                value: function componentDidMount() {
	                    if (!geolocationProvider || !geolocationProvider.getCurrentPosition) {
	                        throw new Error('The provided geolocation provider is invalid');
	                    }
	                    geolocationProvider.getCurrentPosition(this.onPositionSuccess, this.onPositionError, positionOptions);
	                }
	            }, {
	                key: 'componentWillUnmount',
	                value: function componentWillUnmount() {
	                    this.cancelUserDecisionTimeout();
	                }
	            }, {
	                key: 'render',
	                value: function render() {
	                    return _react2.default.createElement(WrappedComponent, _extends({}, this.state, this.props));
	                }
	            }]);
	
	            return Geolocated;
	        }(_react.Component);
	        result.displayName = getDisplayName(WrappedComponent);
	        return result;
	    };
	};
	
	exports.default = geolocated;
	var geoPropTypes = exports.geoPropTypes = {
	    coords: _react.PropTypes.shape({
	        latitude: _react.PropTypes.number,
	        longitude: _react.PropTypes.number,
	        altitude: _react.PropTypes.number,
	        accuracy: _react.PropTypes.number,
	        altitudeAccuracy: _react.PropTypes.number,
	        heading: _react.PropTypes.number,
	        speed: _react.PropTypes.number
	    }),
	    isGeolocationAvailable: _react.PropTypes.bool,
	    isGeolocationEnabled: _react.PropTypes.bool,
	    positionError: _react.PropTypes.shape({
	        code: _react.PropTypes.oneOf([1, 2, 3]),
	        message: _react.PropTypes.string
	    })
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=geolocated.js.map
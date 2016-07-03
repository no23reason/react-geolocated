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
	
	// this should be the entry point to your library
	module.exports = { geolocated: _geolocated2.default };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
	
	var geolocated = function geolocated(config) {
	    return function (WrappedComponent) {
	        var activeConfig = {
	            positionOptions: config && config.positionOptions || {
	                enableHighAccuracy: true,
	                maximumAge: 0,
	                timeout: Infinity
	            }
	        };
	
	        var result = function (_React$Component) {
	            _inherits(Geolocated, _React$Component);
	
	            function Geolocated(props) {
	                _classCallCheck(this, Geolocated);
	
	                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Geolocated).call(this, props));
	
	                _this.state = {
	                    coords: null,
	                    isGeolocationAvailable: Boolean(navigator && navigator.geolocation),
	                    isGeolocationEnabled: false,
	                    isGettingPosition: true,
	                    positionError: null
	                };
	
	                _this.onPositionError = _this.onPositionError.bind(_this);
	                _this.onPositionSuccess = _this.onPositionSuccess.bind(_this);
	                return _this;
	            }
	
	            _createClass(Geolocated, [{
	                key: 'onPositionError',
	                value: function onPositionError(positionError) {
	                    this.setState({
	                        coords: null,
	                        isGeolocationAvailable: this.state.isGeolocationAvailable,
	                        isGeolocationEnabled: false,
	                        isGettingPosition: false,
	                        positionError: positionError
	                    });
	                }
	            }, {
	                key: 'onPositionSuccess',
	                value: function onPositionSuccess(position) {
	                    this.setState({
	                        coords: position.coords,
	                        isGeolocationAvailable: this.state.isGeolocationAvailable,
	                        isGeolocationEnabled: true,
	                        isGettingPosition: false,
	                        positionError: null
	                    });
	                }
	            }, {
	                key: 'componentDidMount',
	                value: function componentDidMount() {
	                    navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError, activeConfig.positionOptions);
	                }
	            }, {
	                key: 'render',
	                value: function render() {
	                    return _react2.default.createElement(WrappedComponent, this.state);
	                }
	            }]);
	
	            return Geolocated;
	        }(_react2.default.Component);
	        result.displayName = getDisplayName(WrappedComponent);
	        return result;
	    };
	};
	
	exports.default = geolocated;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=geolocated.js.map
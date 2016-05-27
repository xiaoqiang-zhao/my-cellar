/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************!*\
  !*** ./a.js ***!
  \**************/
/***/ function(module, exports, __webpack_require__) {

	var text = 'Hello';
	
	document.getElementsByTagName('body')[0].innerHTML = text;
	
	setTimeout(function () {
	    var b = __webpack_require__(/*! . */ 1).ensure('./b');
	    console.log(3 + b);
	}, 2000);
	
	console.log('1');
	module.exports = {
	    text: text
	};

/***/ },
/* 1 */
/*!******************!*\
  !*** . ^\.\/.*$ ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./b": 2,
		"./b.js": 2,
		"./dist/main": 3,
		"./dist/main.js": 3,
		"./webpack.config": 6,
		"./webpack.config.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/*!**************!*\
  !*** ./b.js ***!
  \**************/
/***/ function(module, exports) {

	// ------------ b ------------
	console.log('2');
	module.exports = {
	    text: ' world.'
	};

/***/ },
/* 3 */
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/***/ function(module, exports) {

	/******/ (function(modules) { // webpackBootstrap
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
	/******/ 	__webpack_require__.p = "/js/";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/*!**************!*\
	  !*** ./a.js ***!
	  \**************/
	/***/ function(module, exports, __webpack_require__) {
	
		var text = 'Hello';
		
		document.getElementsByTagName('body')[0].innerHTML = text;
		
		setTimeout(function () {
		    var b = __webpack_require__(/*! ./b */ 1);
		    console.log(b.text);
		}, 2000);
		
		console.log('1');
		module.exports = {
		    text: text
		};
	
	/***/ },
	/* 1 */
	/*!**************!*\
	  !*** ./b.js ***!
	  \**************/
	/***/ function(module, exports) {
	
		// ------------ b ------------
		console.log('b');
		module.exports = {
		    text: ' world.'
		};
	
	/***/ }
	/******/ ]);
	//# sourceMappingURL=main.js.map

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = {
	    entry: {
	        main: './a.js'
	    },
	
	    output: {
	        path: './dist/',
	        publicPath: '/js/',
	        filename: 'main.js'
	    }
	};


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map
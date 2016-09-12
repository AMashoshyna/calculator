var app =
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
	
	var CalcController = __webpack_require__(1);
	
	var app = new CalcController({
		element: document.getElementById('calculator')
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//temporary tooltip for elements to be completed
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var wipButtons = document.getElementsByClassName('under-construction');
	
	var _loop = function _loop(i) {
		wipButtons[i].onmouseover = function () {
			wipButtons[i].style.position = "relative";
			var tooltip = document.createElement('span');
			tooltip.innerHTML = "under construction";
			tooltip.style = '\n\t\twidth: 120px;\n\t\tbackground-color: grey;\n\t\topacity: 0.8;\n\t\tcolor: #fff;\n\t\ttext-align: center;\n\t\tborder-radius: 6px;\n\t\tpadding: 5px 0;\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\ttop: 20px;\n\t\tleft: 20px;\n\t\t';
			wipButtons[i].appendChild(tooltip);
			wipButtons[i].onmouseout = function () {
				wipButtons[i].removeChild(wipButtons[i].firstElementChild);
			};
		};
	};
	
	for (var i = 0; i < wipButtons.length; i++) {
		_loop(i);
	}
	
	var BasicComputation = __webpack_require__(2);
	var InputFromButtons = __webpack_require__(3);
	var InputFromKeyboard = __webpack_require__(4);
	var Display = __webpack_require__(5);
	
	var CalcController = function CalcController(options) {
		_classCallCheck(this, CalcController);
	
		this._el = options.element;
	
		this._computation = new BasicComputation({
			element: document.getElementById('calculator'),
			maxRegisterLength: 14
		});
	
		this._inputFromButtons = new InputFromButtons({
			element: this._el.querySelector("[data-component='keyboard']")
	
		});
	
		this._inputFromKeyboard = new InputFromKeyboard({
			// module under construction
	
		});
	
		this._display = new Display({
			element: this._el.querySelector('[data-component="output-field"]')
	
		});
		this._inputFromButtons.getElement().addEventListener("newValueInput", this._computation.handleNewInput.bind(this._computation));
	
		this._computation.getElement().addEventListener("outputUpdate", this._display.displayOutput.bind(this._display));
	
		this._inputFromButtons.getElement().addEventListener("reset", this._computation.reset.bind(this));
	};
	
	;
	
	module.exports = CalcController;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var register = {
		operandA: [],
		operandB: [],
		operation: null
	};
	
	var memoryRegister = 0;
	
	var operations = {
		"+": function _(a, b) {
			return a + b;
		},
		"-": function _(a, b) {
			return a - b;
		},
		"*": function _(a, b) {
			return a * b;
		},
		"/": function _(a, b) {
			return a / b;
		}
	};
	
	var memoryOperations = {
		"memory-clear": function memoryClear() {
			memoryRegister = 0;
			console.log("memory register " + memoryRegister);
		},
	
		"memory-store": function memoryStore() {
			//value check needed;
			memoryRegister = output;
			console.log("memory register " + memoryRegister);
		},
	
		"memory-recall": function memoryRecall() {
			output = memoryRegister;
			console.log("memory register " + memoryRegister);
		},
	
		"memory-add": function memoryAdd() {
			memoryRegister += output;
			console.log("memory register " + memoryRegister);
		},
	
		"memory-subtract": function memorySubtract() {
			memoryRegister = memoryRegister - output;
			console.log("memory register " + memoryRegister);
		}
	};
	
	var output = void 0;
	
	var BasicComputation = function () {
		function BasicComputation(options) {
			_classCallCheck(this, BasicComputation);
	
			this._el = options.element;
			this._maxRegisterLength = options.maxRegisterLength;
		}
	
		_createClass(BasicComputation, [{
			key: "getElement",
			value: function getElement() {
				return this._el;
			}
		}, {
			key: "handleNewInput",
			value: function handleNewInput(value) {
	
				value = value.detail;
	
				if (!isNaN(parseFloat(value)) || value === "." || value === "minus") {
	
					this._numberHandler(value);
				} else if (operations.hasOwnProperty(value) || value === "=") {
	
					this._operationHandler(value);
				} else if (memoryOperations.hasOwnProperty(value)) {
	
					this._memoryHandler(value);
				} else {
					register.operandA = [];
					register.operandB = [];
					register.operation = null;
					this._outputUpdateEvent("error");
				}
			}
		}, {
			key: "reset",
			value: function reset() {
				register.operandA = [];
				register.operandB = [];
				register.operation = null;
				var event = new CustomEvent("outputUpdate", {
					detail: 0
				});
				this._el.dispatchEvent(event);
			}
		}, {
			key: "_compute",
			value: function _compute(operandA, operandB, operation) {
				if (operation == "=") {
					return operations[register.operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")));
				};
				return operations[operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")));
			}
		}, {
			key: "_numberHandler",
			value: function _numberHandler(value) {
	
				if (register.operation) {
	
					if (register.operandA.length > 0 && register.operandB.length < this._maxRegisterLength) {
	
						minus: if (value === "minus") {
	
							if (register.operandB[0] === "-") {
	
								register.operandB.shift();
								break minus;
							}
	
							register.operandB.splice(0, 0, "-");
						} else {
	
							register.operandB.push(value);
						}
	
						output = parseFloat(register.operandB.join(""));
						console.log("operand B " + register.operandB);
					} else return;
				} else {
	
					if (register.operandA.length < this._maxRegisterLength) {
	
						minus: if (value === "minus") {
	
							if (register.operandA[0] === "-") {
	
								register.operandA.shift();
								break minus;
							}
	
							register.operandA.splice(0, 0, "-");
						} else {
	
							register.operandA.push(value);
						}
	
						output = parseFloat(register.operandA.join(""));
						console.log("operand A " + register.operandA);
					} else return;
				};
				this._outputUpdateEvent(output);
			}
		}, {
			key: "_operationHandler",
			value: function _operationHandler(value) {
				if (register.operandA.length == 0) return;
	
				if (register.operandB.length > 0) {
	
					var interimResult = this._compute(register.operandA, register.operandB, register.operation);
	
					register.operandA = [];
					register.operandB = [];
					register.operandA.push(interimResult);
					output = parseFloat(register.operandA.join(""));
					console.log("operand A " + register.operandA);
	
					if (value === "=") {
						this._outputUpdateEvent(output);
					} else {
	
						register.operation = value;
					}
				}
	
				if (value != "=") {
	
					register.operation = value;
				};
			}
		}, {
			key: "_memoryHandler",
			value: function _memoryHandler(value) {
	
				if (value !== "memory-recall") {
					memoryOperations[value]();
				} else {
					this._memoryRecall();
				}
			}
		}, {
			key: "_memoryRecall",
			value: function _memoryRecall() {
				if (register.operandA.length > 0 && register.operation) {
					register.operandB.push(memoryRegister);
					console.log("operand B " + register.operandB);
				} else {
					register.operandA.push(memoryRegister);
					console.log("operand A " + register.operandA);
				}
				output = memoryRegister;
				this._outputUpdateEvent(output);
			}
		}, {
			key: "_outputUpdateEvent",
			value: function _outputUpdateEvent(output) {
	
				if (output.toString().length > this._maxRegisterLength) {
	
					output = output.toExponential();
				}
	
				var event = new CustomEvent("outputUpdate", {
					detail: output
				});
				this._el.dispatchEvent(event);
			}
		}]);
	
		return BasicComputation;
	}();
	
	;
	
	module.exports = BasicComputation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InputFromButtons = function () {
		function InputFromButtons(options) {
			_classCallCheck(this, InputFromButtons);
	
			this._el = options.element;
	
			var inputButtons = this._el.querySelectorAll('[data-element="inputButton"]');
	
			for (var i = 0; i < inputButtons.length; i++) {
	
				inputButtons[i].addEventListener('click', this._provideNewValue.bind(this));
			};
	
			var resetButton = this._el.querySelectorAll('[data-element="resetButton"]');
	
			for (var i = 0; i < resetButton.length; i++) {
	
				resetButton[i].addEventListener('click', this._resetValue.bind(this));
			}
		}
	
		_createClass(InputFromButtons, [{
			key: 'getElement',
			value: function getElement() {
				return this._el;
			}
		}, {
			key: '_provideNewValue',
			value: function _provideNewValue(e) {
	
				var event = new CustomEvent('newValueInput', {
					detail: e.target.dataset.number || e.target.dataset.operation || e.target.dataset.inputOperation
				});
				this._el.dispatchEvent(event);
			}
		}, {
			key: '_resetValue',
			value: function _resetValue(e) {
				var event = new CustomEvent('reset');
				this._el.dispatchEvent(event);
			}
		}]);
	
		return InputFromButtons;
	}();
	
	;
	
	module.exports = InputFromButtons;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InputFromKeyboard = function InputFromKeyboard(options) {
		_classCallCheck(this, InputFromKeyboard);
	
		this._el = options.element;
		// to be completed
	};
	
	;
	
	module.exports = InputFromKeyboard;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Display = function () {
		function Display(options) {
			_classCallCheck(this, Display);
	
			this._el = options.element;
		}
	
		_createClass(Display, [{
			key: 'displayOutput',
			value: function displayOutput(value) {
				var output = value.detail;
				this._el.innerHTML = output;
			}
		}]);
	
		return Display;
	}();
	
	;
	
	module.exports = Display;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map
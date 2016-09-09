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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BasicComputation = __webpack_require__(2);
	var InputFromButtons = __webpack_require__(3);
	var InputFromKeyboard = __webpack_require__(4);
	var Display = __webpack_require__(5);
	
	var CalcController = function CalcController(options) {
			_classCallCheck(this, CalcController);
	
			this._el = options.element;
	
			this._computation = new BasicComputation({
					element: document.getElementById('calculator'),
					maxRegisterLength: 15
			});
	
			this._inputFromButtons = new InputFromButtons({
					element: this._el.querySelector("[data-component='keyboard']")
	
			});
	
			this._inputFromKeyboard = new InputFromKeyboard({});
	
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

	'use strict';
	
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
	
	var memoryHandlers = {
		"memory-clear": function memoryClear() {
			memoryRegister = 0;
		},
		"memory-store": function memoryStore() {
			//value check needed;
			memoryRegister = output;
		},
		"memory-recall": function memoryRecall() {
			output = memoryRegister;
			this._outputUpdateEvent(output);
			return output;
		},
		"memory-add": function memoryAdd() {
			memoryRegister += output;
		},
		"memory-subtract": function memorySubtract() {
			memoryRegister = memoryRegister - output;
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
			key: "_compute",
			value: function _compute(operandA, operandB, operation) {
				if (operation == "=") {
					return operations[register.operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")), operation);
				};
				return operations[operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")), operation);
			}
		}, {
			key: "getElement",
			value: function getElement() {
				return this._el;
			}
		}, {
			key: "handleNewInput",
			value: function handleNewInput(value) {
	
				value = value.detail;
				if (!isNaN(parseFloat(value)) || value === ".") {
					if (register.operandA.length > 0 && register.operandB.length < this._maxRegisterLength && register.operation) {
						register.operandB.push(value);
						output = parseFloat(register.operandB.join(""));
						console.log("operand B " + register.operandB);
						this._outputUpdateEvent(output);
					} else {
						if (register.operandA.length < this._maxRegisterLength) {
	
							register.operandA.push(value);
							output = parseFloat(register.operandA.join(""));
							console.log("operand A " + register.operandA);
							this._outputUpdateEvent(output);
						}
					}
				} else {
					if (register.operandA.length == 0) return;else if (operations.hasOwnProperty(value) || value == "=") {
						if (register.operandB.length > 0) {
							var interimResult = this._compute(register.operandA, register.operandB, register.operation);
							register.operandA = [];
							register.operandB = [];
							register.operandA.push(interimResult);
							output = parseFloat(register.operandA.join(""));
							console.log("operand A " + register.operandA);
							if (value == "=") {
								this._outputUpdateEvent(output);
							} else {
	
								register.operation = value;
							}
						}
						if (value != "=") {
							register.operation = value;
						};
					} else {
						register.operandA = [];
						register.operandB = [];
						register.operation = null;
						this._outputUpdateEvent("error");
					}
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
			var inputButtons = this._el.querySelectorAll('[data-element="numberButton"]');
	
			for (var i = 0; i < inputButtons.length; i++) {
				inputButtons[i].addEventListener('click', this._provideNewValue.bind(this));
	
				var resetButton = this._el.querySelector('[data-element="resetButton"]');
				resetButton.addEventListener('click', this._resetValue.bind(this));
			};
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
					detail: e.target.dataset.number || e.target.dataset.operation
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
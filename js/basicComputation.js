'use strict'


	let operations = {
		addition: (a, b) => {a + b},
		deduction: (a, b) => {a - b},
		multiplication: (a, b) => { a * b},
		division: (a, b) => {a / b},
	}

class BasicComputation {
	constructor(options) {
		// this._operandA = options.operandA;
		// this._operation = options.operation;
		// this._operandB = options.operandB;


	};

	_compute (operandA, operation, operandB) {
		return operations[operation](operandA, operandB);
	};


}
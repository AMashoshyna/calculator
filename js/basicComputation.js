"use strict";

let register = {
	operandA: [],
	operandB: [],
	operation: null
};

let memoryRegister = 0;


let operations = {
	"+": function(a, b) {return a + b;},
	"-": function(a, b) {return a - b;},
	"*": function(a, b) {return a * b;},
	"/": function(a, b) {return a / b;}
};

let memoryOperations =
{
	"memory-clear": function() {
		memoryRegister = 0;
		console.log("memory register " + memoryRegister);
	},

	"memory-store": function() {
	//value check needed;
	memoryRegister = output;
	console.log("memory register " + memoryRegister);
},

"memory-recall": function() {
	output = memoryRegister;
	console.log("memory register " + memoryRegister);
},

"memory-add": function() {
	memoryRegister += output;
	console.log("memory register " + memoryRegister);
},

"memory-subtract": function() {
	memoryRegister =  memoryRegister - output;
	console.log("memory register " + memoryRegister);
}
};

let output;

class BasicComputation {
	constructor(options) {
		this._el = options.element;
		this._maxRegisterLength = options.maxRegisterLength;
	};


	getElement() {
		return this._el;
	}


	handleNewInput(value) {

		value = value.detail;

		if( !isNaN(parseFloat(value)) || value ==="." || value ==="minus") {

			this._numberHandler(value);
		}

		else if (operations.hasOwnProperty(value) || value ==="=") {

			this._operationHandler(value);
		} 

		else if (memoryOperations.hasOwnProperty(value)) {

			this._memoryHandler(value);
		}

		else {
			register.operandA = [];
			register.operandB = [];
			register.operation = null;
			this._outputUpdateEvent("error");
		}

	};


	reset() {
		register.operandA = [];
		register.operandB = [];
		register.operation = null;
		var event = new CustomEvent("outputUpdate", {
			detail: 0
		});
		this._el.dispatchEvent(event);

	};

	_compute(operandA, operandB, operation) {
		if (operation == "=") 
		{
			return operations[register.operation](
				parseFloat(operandA.join("")), 
				parseFloat(operandB.join(""))
				);
		};
		return operations[operation](
			parseFloat(operandA.join("")), 
			parseFloat(operandB.join(""))
			);
	};

	_numberHandler(value) {

		if (register.operation) {

			if (register.operandA.length > 0 
				&& register.operandB.length < this._maxRegisterLength) {

			minus: if (value === "minus") {

				if (register.operandB[0] === "-") {

					register.operandB.shift();
					break minus;
				} 

			register.operandB.splice(0, 0, "-") 
				
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

			register.operandA.splice(0, 0, "-") 
				
			} else {

			register.operandA.push(value);

			}

			output = parseFloat(register.operandA.join(""));
			console.log("operand A " + register.operandA);

		} else return;

	};
	this._outputUpdateEvent(output);
};

_operationHandler(value) {
	if (register.operandA.length == 0) return;

	if (register.operandB.length > 0) {

		var interimResult = this._compute(
			register.operandA, 
			register.operandB, 
			register.operation)

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

	if (value!="=") {

		register.operation = value;
	};

};

_memoryHandler(value) {

	if (value !== "memory-recall") {
		memoryOperations[value]();

	} else {
		this._memoryRecall();
	}

};

_memoryRecall() {
	if (register.operandA.length > 0 
		&& register.operation)  {
		register.operandB.push(memoryRegister);
	console.log("operand B " + register.operandB);

} else {
	register.operandA.push(memoryRegister);
	console.log("operand A " + register.operandA);


}
output = memoryRegister;
this._outputUpdateEvent(output)
}

_outputUpdateEvent(output) {

	if (output.toString().length > this._maxRegisterLength) {

		output = output.toExponential();
	}

	var event = new CustomEvent("outputUpdate", {
		detail: output
	});
	this._el.dispatchEvent(event);
}

};

module.exports = BasicComputation; 



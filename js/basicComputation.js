'use strict'

let register = {
	operandA: [],
	operandB: [],
	operation: null
}


let operations = {
	"+": function(a, b) {return a + b},
	"-": function(a, b) {return a - b},
	"*": function(a, b) {return a * b},
	"/": function(a, b) {return a / b},
}

let output;

class BasicComputation {
	constructor(options) {
		this._el = options.element;
	};

	_compute(operandA, operandB, operation) {
		if(operation == "=") {
			return operations[register.operation](parseFloat(operandA), parseFloat(operandB),operation)
		};
		return operations[operation](parseFloat(operandA), parseFloat(operandB),operation);
	};

	getElement() {
		return this._el;
	}

	handleNewInput(value){

		value = value.detail;
		if(parseInt(value)){
			if(register.operandA.length > 0 && register.operation) {
				register.operandB.push(value);
				output = register.operandB.join("");
				console.log("operand B "+ register.operandB);
				this._computation._outputUpdateEvent(output);
			} else {
				register.operandA.push(value);
				output = register.operandA.join("");
				console.log("operand A "+ register.operandA);
				this._computation._outputUpdateEvent(output);
			}
			
		} 
		else if(value == ",") {
			register.operandA.push(value);
			output = register.operandA.join("");
			this._computation._outputUpdateEvent(output);
		} 
		else {
			if(register.operandA.length ==0) return;
			else if(operations.hasOwnProperty(value) || value =="=") {
				if(register.operandB.length > 0){
					var interimResult = this._computation._compute(register.operandA, register.operandB, register.operation)
					register.operandA = [];
					register.operandB = [];
					register.operandA.push(interimResult);
					output = register.operandA.join("");
					console.log("operand A "+ register.operandA);
					if(value=="=") {
					this._computation._outputUpdateEvent(output);
						
					} else {
						
					register.operation = value;
					}
				}
				register.operation = value;
			} else {
				register.operandA = [];
				register.operandB = [];
				register.operation = null;
				this._computation._outputUpdateEvent("error");

			}

		}
		
	}

	_outputUpdateEvent(output) {
		var event = new CustomEvent("outputUpdate", {
			detail: output
		});
		this._el.dispatchEvent(event);
	}

}



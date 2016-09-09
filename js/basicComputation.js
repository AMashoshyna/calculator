'use strict'

let register = {
	operandA: [],
	operandB: [],
	operation: null
};

let memoryRegister = 0;


let operations = {
	"+": function(a, b) {return a + b},
	"-": function(a, b) {return a - b},
	"*": function(a, b) {return a * b},
	"/": function(a, b) {return a / b},
};

let memoryHandlers ={
	"memory-clear": function(){
		memoryRegister = 0;
	},
	"memory-store": function(){
	//value check needed;
		memoryRegister = output;
	},
	"memory-recall": function(){
		output = memoryRegister;
		this._outputUpdateEvent(output);
		return output;
	},
	"memory-add": function(){
		memoryRegister += output;
	},
	"memory-subtract": function(){
		memoryRegister =  memoryRegister - output;

	},

}

let output;

class BasicComputation {
	constructor(options) {
		this._el = options.element;
		this._maxRegisterLength = options.maxRegisterLength;
	};

	_compute(operandA, operandB, operation) {
		if(operation == "=") {
			return operations[register.operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")),operation)
		};
		return operations[operation](parseFloat(operandA.join("")), parseFloat(operandB.join("")),operation);
	};

	getElement() {
		return this._el;
	}


	handleNewInput(value){

		value = value.detail;
		if( !isNaN(parseFloat(value)) || value ==="."){
			if(register.operandA.length > 0 
				&& register.operandB.length < this._maxRegisterLength
				&& register.operation) 
			{
				register.operandB.push(value);
				output = parseFloat(register.operandB.join(""));
				console.log("operand B "+ register.operandB);
				this._outputUpdateEvent(output);
			} else {
				if(register.operandA.length < this._maxRegisterLength) {

				register.operandA.push(value);
				output = parseFloat(register.operandA.join(""));
				console.log("operand A "+ register.operandA);
				this._outputUpdateEvent(output);
				}
			}
			
		} 
		else {
			if(register.operandA.length ==0) return;
			else if(operations.hasOwnProperty(value) || value =="=") {
				if(register.operandB.length > 0){
					var interimResult = this._compute(register.operandA, register.operandB, register.operation)
					register.operandA = [];
					register.operandB = [];
					register.operandA.push(interimResult);
					output = parseFloat(register.operandA.join(""));
					console.log("operand A "+ register.operandA);
					if(value=="=") {
					this._outputUpdateEvent(output);
						
					} else {
						
					register.operation = value;
					}
				}
				if(value!="="){
					register.operation = value;
				};
			} else {
				register.operandA = [];
				register.operandB = [];
				register.operation = null;
				this._outputUpdateEvent("error");

			}

		}
		
	};

	reset(){
		register.operandA = [];
		register.operandB = [];
		register.operation = null;
		var event = new CustomEvent("outputUpdate", {
			detail: 0
		});
		this._el.dispatchEvent(event);

	}

	_outputUpdateEvent(output) {
		if (output.toString().length>this._maxRegisterLength)
		{
			output = output.toExponential();
		}

		var event = new CustomEvent("outputUpdate", {
			detail: output
		});
		this._el.dispatchEvent(event);
	}

};

module.exports = BasicComputation; 



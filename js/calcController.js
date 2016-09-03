'use strict'

let register = {
		operandA: null,
		operandB: null,
		operation: null
	}

class CalcController {
	constructor(options) {
		this._el = options.element;

		this._computation = new BasicComputation();

		this._inputFromButtons = new InputFromButtons({
			element: this._el.querySelector("[data-component='keyboard']")

		});

		this._inputFromKeyboard = new InputFromKeyboard({

		});

		this._display = new Display({
			element: this._el.querySelector('[data-component="inputField"]')

		});

		this._inputFromButtons.getElement().addEventListener('newValueInputBegin', this._newValueHandler.bind(this));
		this._inputFromButtons.getElement().addEventListener('actionInput', this._newActionHandler.bind(this));
		this._inputFromButtons.getElement().addEventListener('returnButtonPressed', this._showResult.bind(this));

	}

	


	_newValueHandler(value) {
		this._inputFromButtons.recordNewValue(event);

	};

_newActionHandler(event){
//check the register
	if(!register.operandA){
		return

	} else if(register.operandA&&!register.operandB) {
		register.operation = event.target.dataset.operation;

	} else if(register.operandA&&register.operandB) {
		register.operandA = this._computation.compute(register);
		register.operandB = null;
		register.operation = event.target.dataset.operation;

	}

}


// _recordNewValue(event){
// 	var newValue = [];
// 	newValue.push(event.detail);

// 	this._el.addEventListener('click', function inputHandler(event) {
// 		if(event.target.closest('[data-element="numberButton"]')){
// 			newValue.push(event.target.dataset.number); 
// 		} else {
// 			this._el.removeEventListener('click', inputHandler)
// 			newValue = parseFloat(newValue.join());
// 			console.log(newValue);
// 			return newValue;
// 		}
// 	})
// }

_recordNewAction(){


}

_showResult(){

}


}
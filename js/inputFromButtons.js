'use strict'

class InputFromButtons {
	constructor(options){
		this._el = options.element;
		let inputButtons = this._el.querySelectorAll('[data-element="numberButton"]');
		for(var i=0; i < inputButtons.length; i++) {
			inputButtons[i].addEventListener('click', this._provideNewValue.bind(this));
		}
	}

	getElement() {
		return this._el;
	}
	
	// recordNewValue(event){
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

	_provideNewValue(e) {

		let event = new CustomEvent('newValueInput', {
			detail: e.target.dataset.number || e.target.dataset.operation
		});
		this._el.dispatchEvent(event);
	};
}
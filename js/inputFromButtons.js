'use strict'

class InputFromButtons {
	constructor(options){
		this._el = options.element;
		let inputButtons = this._el.querySelectorAll('[data-element="inputButton"]');

		for(var i=0; i < inputButtons.length; i++) {
			inputButtons[i].addEventListener('click', this._provideNewValue.bind(this));

			let resetButton = this._el.querySelector('[data-element="resetButton"]');
			resetButton.addEventListener('click', this._resetValue.bind(this));
		};

	}

	getElement() {
		return this._el;
	}

	_provideNewValue(e) {

		let event = new CustomEvent('newValueInput', {
			detail: e.target.dataset.number || e.target.dataset.operation || e.target.dataset.inputOperation
		});
		this._el.dispatchEvent(event);
	};


	_resetValue(e) {
		let event = new CustomEvent('reset');
		this._el.dispatchEvent(event);

	}

};

module.exports = InputFromButtons; 

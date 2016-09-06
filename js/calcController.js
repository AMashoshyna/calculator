'use strict'


class CalcController {
	constructor(options) {
		this._el = options.element;

		this._computation = new BasicComputation({
			element: document.getElementById('calculator')
		});

		this._inputFromButtons = new InputFromButtons({
			element: this._el.querySelector("[data-component='keyboard']")

		});

		this._inputFromKeyboard = new InputFromKeyboard({

		});

		this._display = new Display({
			element: this._el.querySelector('[data-component="output-field"]')

		});
		this._inputFromButtons.getElement().addEventListener("newValueInput", 
			this._computation.handleNewInput.bind(this));

		this._computation.getElement().addEventListener("outputUpdate",
			this._display.displayOutput.bind(this._display));

	}



}
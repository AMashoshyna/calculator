'use strict'

//temporary tooltip for elements to be completed
let wipButtons = document.getElementsByClassName('under-construction');
for (let i = 0; i < wipButtons.length; i++) {
	wipButtons[i].onmouseover = function(){
		wipButtons[i].style.position = "relative"
		var tooltip = document.createElement('span');
		tooltip.innerHTML = "under construction";
		tooltip.style = 
		`
		width: 120px;
		background-color: grey;
		opacity: 0.8;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;
		position: absolute;
		z-index: 1;
		top: 20px;
		left: 20px;
		`
		wipButtons[i].appendChild(tooltip);
		wipButtons[i].onmouseout = function() {
			wipButtons[i].removeChild(wipButtons[i].firstElementChild)
		}
	}
}

const BasicComputation = require('./basicComputation.js');
const InputFromButtons = require('./inputFromButtons.js');
const InputFromKeyboard = require('./inputFromKeyboard.js');
const Display = require('./display.js');


class CalcController {
	constructor(options) {
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
		this._inputFromButtons.getElement().addEventListener("newValueInput", 
			this._computation.handleNewInput.bind(this._computation));


		this._computation.getElement().addEventListener("outputUpdate",
			this._display.displayOutput.bind(this._display));

		this._inputFromButtons.getElement().addEventListener("reset", 
			this._computation.reset.bind(this));

	}

};

module.exports = CalcController; 
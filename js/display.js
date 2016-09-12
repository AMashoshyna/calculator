'use strict'

class Display {
	constructor (options) {
		this._el= options.element;

	}

	displayOutput(value){
		let output = value.detail;
		this._el.innerHTML = output;

	}
};

module.exports = Display; 

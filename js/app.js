'use strict'

let CalcController = require('./calcController.js')

var app = new CalcController({
	element: document.getElementById('calculator')
})
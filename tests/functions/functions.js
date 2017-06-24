/**
 *    _____ __
 *   / ___// /_  _____
 *   \__ \/ / / / / _ \
 *  ___/ / / /_/ /  __/
 * /____/_/\__, /\___/
 *       /____/
 *       Copyright 2017 Slye Development Team. All Rights Reserved.
 *       Licence: MIT License
 */

const {compare}   = require('../tools');

exports.$simple  = function (assert) {
	var code    = `
function a(x){
	console.log(x * 5)
}
a(6)
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$nested = function (assert) {
	var code    = `
function a(x){
	console.log(x * 5)
	// This line is also a test for "ASI/return"
	return function b(y){
		console.log(x * 5 + y)
		return x * 4 + y
	}
}
function c(x){
	console.log(x * 8)
	function d(y){
		console.log(x * 8 + y)
	}
	function e(z){
		console.log("Hello!")
		return z + x;
	}
	d(e(9))
}
var v1 = a(6)(9)
var v2 = c(12)
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
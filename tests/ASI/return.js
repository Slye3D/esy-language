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
const {compile, safeEval, compare}   = require('../tools');

module.exports.$return = function (assert) {
	var code    = `
	var a = 2, b = 3;
	function f(){
		return
		a+b
	}
	f()
	`;
	try {
		code = compile(code);
		var re = safeEval(code);
		assert(re == undefined);
	}catch (e){
		assert(false);
	}
};

module.exports.$return1 = function (assert) {
	var code    = `
	var a = 2, b = 3;
	function f(){
		return a+b
	}
	f()
	`;
	try {
		code = compile(code);
		var re = safeEval(code);
		assert(re == 5);
	}catch (e){
		assert(false);
	}
};

module.exports.$function    = function (assert) {
	var code    = `
function a(x){
	console.log(x * 5)
	return function (y){
		console.log(x * 5 + y)
		return x * 4 + y
	}
}
function b(x){
	console.log(x * 5)
	return
	function z(y){
		console.log(x * 5 + y)
		return x * 4 + y
	}
}
var v1 = a(6)(9)
var v2 = b(6)
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
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
const {compile, safeEval}   = require('../tools');

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
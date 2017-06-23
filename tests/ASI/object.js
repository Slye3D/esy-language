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

exports.$simple  = function (assert) {
	var code    = `
re = {
	a: 5,
	b: 6
}
	`;
	try {
		var esy = compile(code);
		assert(JSON.stringify(safeEval(esy)) == JSON.stringify(safeEval(code)));
	}catch (e){
		assert(false);
	}
};

exports.$function   = function(assert){
	var code    = `
re = {
	a: 5,
	b: function(c){
		return c * 5
	}
}
re.b(7)
	`;
	try {
		var esy = compile(code);
		assert(safeEval(esy) == 35);
	}catch (e){
		assert(false);
	}
};


exports.$getter = function(assert){
	var code    = `
re = {
	a: 5,
	get b(){
		return 7;
	},
	c: 9
}
re.b
	`;
	try {
		var esy = compile(code);
		assert(safeEval(esy) == 7);
	}catch (e){
		assert(false);
	}
};

exports.$setter = function(assert){
	var j       = false;
	var code    = `
re = {
	a: 5,
	set b(v){
		j = true
		return v
	},
	c: 9
}
re.b = 8
	`;
	try {
		var esy = compile(code);
		eval(esy);
		assert(j);
	}catch (e){
		assert(false);
	}
};


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

const {compile}   = require('../tools');

exports.$simple = function (assert) {
	var j   = 0;
	var code    = `
	for(var i = 0;i < 10;i++){
		j++;
	}	
	`;
	try {
		var esy = compile(code);
		eval(esy);
		assert(j == 10);
	}catch (e){
		assert(false);
	}
};

exports.$WithoutFirstPart   = function (assert) {
	var j   = 0;
	var i   = 5;
	var code    = `
	for(;i < 10;i++){
		j++;
	}	
	`;
	try {
		var esy = compile(code);
		eval(esy);
		assert(j == 5);
	}catch (e){
		assert(false);
	}
};

exports.$WithoutLastPart   = function (assert) {
	var j   = 0;
	var code    = `
	for(i = 0;i < 10;){
		j++;
		i += 2;
	}	
	`;
	try {
		var esy = compile(code);
		eval(esy);
		assert(j == 5);
	}catch (e){
		assert(false);
	}
};


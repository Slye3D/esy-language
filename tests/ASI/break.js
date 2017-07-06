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

module.exports.$break = function (assert) {
	var code    = `
re = 0;
a:
for(var i = 1; i < 5;i++){
	for(var j = 0;j < 10;j++){
		re += i*j;
		if(j == 7){
			break a;
		}
	}
}
re
	`;
	try {
		var esy = compile(code);
		assert(safeEval(esy) == safeEval(code));
	}catch (e){
		assert(false);
	}
};

module.exports.$break1 = function (assert) {
	var code    = `
re = 0;
a:
for(var i = 1; i < 5;i++){
	for(var j = 0;j < 10;j++){
		re += i*j;
		if(j == 7){
			break 
			a;
		}
	}
}
re
	`;
	try {
		var esy = compile(code);
		assert(safeEval(esy) == safeEval(code));
	}catch (e){
		assert(false);
	}
};


exports.$test   = function (assert) {
	var code    = `
re = 0
a:
for(var i = 1; i < 5;i++){
	for(var j = 0;j < 10;j++){
		re += i*j;
		if(j == 7){
			break 
			a;
		}
		console.log(i, j)
	}
}
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test2  = function (assert) {
	var code    = `
re = 0
a:
for(var i = 1; i < 5;i++){
	for(var j = 0;j < 10;j++){
		re += i*j;
		if(j == 7){
			break a;
		}
		console.log(i, j)
	}
}
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
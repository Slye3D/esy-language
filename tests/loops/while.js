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

exports.$simple = function (assert) {
	var code    = `
	var i = 0
	while(i < 10){
		console.log(i)  // Some comments in code
		i++;
	}
	`;
	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$doWhile    = function(assert) {
	var code    = `
	var i = 0
	do{
		console.log(i)  // Some comments in code
		i++;
	} while(i < 50 /* Hi */);
	`;
	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
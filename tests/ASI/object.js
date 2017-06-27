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
re = {
	a: 5,
	b: 6
}
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
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

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
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

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
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

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


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

exports.$test1  = function(assert) {
	var code = `
	env test{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("Hello");
	console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$test2  = function(assert) {
	var code = `
	env h,t2{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("Hello");
	console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$test3  = function(assert) {
	var code = `
	env h{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$test4  = function(assert) {
	var code = `
	env h{
		console.log("Hi")
	}else{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("Hello");console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};



exports.$test5  = function(assert) {
	var code = `
	env h, "t2"{
		console.log("Hi")
	}else{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("Hi");console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};



exports.$test6  = function(assert) {
	var code = `
	env h, "t3"{
		console.log("Hi")
	}else{
		console.log("Hello")
	}
	console.log("World!")
`;
	var js  = `console.log("Hello");console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


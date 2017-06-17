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

const spaces  = require('../../src/libs/refactor/spaces');
module.exports  = function (test) {
	var code    = `
	function a(){
		console
			.log("a");
	}
	function b(){
			return   
			c + d
	}
	function d(){
		break
		"hello"
	}
	function c(){
		return "test"
	}
	for(var i = 0;i <= 500;i++){}
	console.log("There are 4 spaces in this quote    ")
	var a = 5
	a
	++
	c
	++a
`;
	test(spaces(code) == 'function a(){console.log("a");}function b(){return;c+d}function d(){break;"hello"}function c(){return "test"}for(var i=0;i<=500;i++){}console.log("There are 4 spaces in this quote    ");var a=5;a;++;c;++a;');
};
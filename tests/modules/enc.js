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
	a = 5;
	(function(){
		enc{
			a=6;
			console.log("Hello");
			console.log("World!")
		}
	})()
`;
	var js  = `a=6;console.log("Hello");
	console.log("World!")`;

	compare(code, js).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
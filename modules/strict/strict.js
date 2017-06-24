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

/**
 * Run codes in strict mode
 * @param esy
 * @return {{name: string, version: string, author: string}}
 */
function strict(esy){
	/**
	 * strict{...code}
	 */
	esy.block(/^strict\s*$/ig, (matches, block) => {
		var code = esy.compile(block.body);
		return `(function(){
		"use strict";
		${code}
		)();`
	});
	return {
		name    : "Esy Strict",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = strict;
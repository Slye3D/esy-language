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
 * Compile a esy code
 * @param code
 */
function compile(code) {
	var esy     = require('../src/index');
	esy.configs.run('cache.active', false);
	var tree    = esy.tree(code);
	return esy.compile(tree);
}

/**
 * Evaluate a js code
 * returns error.toString on errors
 * @param code
 * @return {*}
 */
function safeEval(code) {
	var re;
	try {
		re = eval(code);
	}catch (e){
		re = e.toString();
	}
	return re;
}

module.exports.compile  = compile;
module.exports.safeEval = safeEval;
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

const vm    = require('vm');

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

/**
 * Compare result of Esy code and JS version
 */
function compare(EsyCode, js){
	js      = js || EsyCode;
	EsyCode = compile(EsyCode);

	var sandbox1    = {},   // For Esy
		sandbox2    = {};   // For JS

	try {
		const script1   = new vm.Script(EsyCode);
		script1.runInNewContext(sandbox1);
	}catch (e){
		return false;
	}

	try {
		const script2   = new vm.Script(js);
		script2.runInNewContext(sandbox2);
	}catch (e){
		return false;
	}

	return JSON.stringify(sandbox1) == JSON.stringify(sandbox2);
}

module.exports.compile  = compile;
module.exports.safeEval = safeEval;
module.exports.compare  = compare;
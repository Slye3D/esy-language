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

const EsyError  = require('../libs/errors/esy_error');

// Save all keywords and their parsers
global.keywords    = global.keywords || {};

/**
 * Add a new keyword parser
 * @param name
 * @param parser
 */
function add(name, parser){
	if(typeof parser !== 'function')
		throw new EsyError("Second argument of add function must be a function.");
	global.keywords[name] = parser;
}

/**
 * Add a mirror keyword
 * @param name
 */
add.self    = function(name){
	add(name, a => name + ' ' + a);
};

/**
 * Get parser for a special keyword
 * @param name
 * @return {*}
 */
function get(name){
	return global.keywords[name];
}

module.exports  = {
	add : add,
	get : get
};
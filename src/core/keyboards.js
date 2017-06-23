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

// Save all keyboards and their parsers
global.keyboards    = global.keyboards || {};

/**
 * Add a new keyboard parser
 * @param name
 * @param parser
 */
function add(name, parser){
	if(typeof parser !== 'function')
		throw new EsyError("Second argument of add function must be a function.");
	global.keyboards[name] = parser;
}

/**
 * Add a mirror keyboard
 * @param name
 */
add.self    = function(name){
	add(name, a => name + ' ' + a + ';');
};

/**
 * Get parser for a special keyboard
 * @param name
 * @return {*}
 */
function get(name){
	return global.keyboards[name];
}

module.exports  = {
	add : add,
	get : get
};
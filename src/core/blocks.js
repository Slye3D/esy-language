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

// Load required modules
const EsyError  = require('../libs/errors/esy_error');

/**
 * Setup a global variable to store all blocks and it'll be accessible in all program's scope
 * @type []
 */
global.blocks   = global.blocks     || [];
global.patterns = global.patterns   || [];

/**
 * Add a new block recognizer with custom headline pattern
 * @param pattern   Regex pattern to identify the header
 * @param callback  method(matches, block, parent, offset)
 */
function add(pattern, callback){
	if(typeof callback !== 'function')
		throw new EsyError('Error adding new block parser, callback must be type of function');
	global.patterns.push(new RegExp(pattern));
	global.blocks.push(callback);
}

/**
 * Find the parser for given block headline
 * @param headline
 * @returns {{matches: *, parser: *}}
 */
function search(headline) {
	var i;
	for(i = global.patterns.length - 1; i >= 0;i--){
		if(global.patterns[i].test(headline)){
			// I don't have any idea why it's happening!?
			// the RegExp.exec always returns null at first call :|
			var matches = global.patterns[i].exec(headline);
			while(matches == null){
				matches = global.patterns[i].exec(headline);
			}
			return {
				matches : matches,
				parser  : global.blocks[i]
			}
		}
	}
}

module.exports  = {
	add     : add,
	search  : search
};
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
global.blockKeys= global.blockKeys  || {};

/**
 *
 * @param esy
 */
function add(esy){
	/**
	 * Add a new block recognizer with custom headline pattern
	 * @param pattern   Regex pattern to identify the header
	 * @param callback  method(matches, block, parent, offset)
	 */
	function Block(pattern, callback){
		if(typeof callback !== 'function')
			throw new EsyError('Error adding new block parser, callback must be type of function');
		global.patterns.push(pattern);
		global.blocks.push(callback);
		var re = {
			keyword(keyword) {
				global.blockKeys[keyword.toLowerCase()] = pattern;
				return re;
			}
		};
		return re;
	}
	Block['self'] = (pattern) => {
		Block(pattern, (matches, block) => {
			return block.head + '{' + esy.compile(block.body) + '}';
		})
	};
	return Block;
}

/**
 * Find the parser for given block headline
 * @param headline
 * @returns {{matches: *, parser: *}}
 */
function search(headline) {
	var i;
	for(i = global.patterns.length - 1; i >= 0;i--){
		var p   = new RegExp(global.patterns[i]);
		if(p.test(headline)){
			// I don't have any idea why it's happening!?
			// the RegExp.exec always returns null at first call :|
			var matches = p.exec(headline);
			while(matches == null){
				matches = p.exec(headline);
			}
			return {
				matches : matches,
				parser  : global.blocks[i]
			}
		}
	}
}

/**
 * Return the longest matched pattern for a code
 * @see Tree (../libs/tree/index.js)
 * @param code
 * @return {number}
 */
function find(code){
	function isClosed(matched){
		var oc  = {
			'(': 0,
			')': 0,
			'[': 0,
			']': 0
		};
		var keys    = Object.keys(oc);
		for(var char of matched)

			if(keys.indexOf(char) > -1)
				oc[char]++;
		return (oc['('] == oc[')']) && (oc['['] == oc[']']);
	}
	var h   = false;
	var newRegExp   = pattern => {
		h   = false;
		var flags   = pattern.flags,
			source  = pattern.source;
		// Remove ^ from first of source
		if(source[0] == '^') {
			source = source.substr(1);
			h   = true;
		}
		source = '(?:\\W|^)' + source;
		// Add $ to the end of source if not exists
		if(!source.endsWith('$'))
			source  += '$';
		return new RegExp(source, flags);
	};
	var results     = [0], i;
	for(i = 0; i < global.patterns.length;i++){
		var p   = newRegExp(global.patterns[i]);
		if(p.test(code)){
			var matches = p.exec(code);
			while(matches == null){
				matches = p.exec(code);
			}
			var j   = 0;
			matches[j]  = matches[j].trim();
			var len = matches[j].length;
			if(/\W/.test(matches[j][0]))
				len--;
				var ll  = code[code.length - len - 1];
			if(isClosed(matches[j]) && ll !== '.') {
				results.push(len);
			}
		}
	}
	return Math.max(...results);
}

module.exports  = {
	add     : add,
	search  : search,
	find    : find
};
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

const {get: getKeyword} = require('../../core/keywords');
const EsyError          = require('./esy_error');
const isPunctuator      = require('../characters/punctuator');

function errors(tree){
	var offset  = 0,
		code,
		keyword;
	for(; offset < tree.length;offset++){
		var e = undefined;
		if(typeof tree[offset] == 'object') {
			errors(tree[offset]);
		} else {
			code    = tree[offset];
			if(/^\w+\s+.+$/.test(code)){
				keyword = code.substr(0, code.indexOf(' '));
				if(!getKeyword(keyword)){
					if(!code.endsWith(';') && typeof tree[offset + 1] == 'string' && tree[offset + 1].startsWith('{')){
						e = `Unknown header <${code}>`
					}else {
						e = `Unknown keyword <${code}>`
					}
				}
			}else if(
				(/^\w+$/.test(code) && typeof tree[offset + 1] == 'string' && tree[offset + 1].startsWith('{')) ||
				(/^\w+\{.*$/.test(code))
			){
				if(code.indexOf('{') > -1)
					code = code.substr(0, code.indexOf('{'));

				e = `Unknown header <${code}>`
			}
			// if(code.startsWith('{') && typeof tree[offset - 1] == 'string' && !isPunctuator.endsWith(tree[offset - 1])){
				// code = tree[offset - 1];
				// e = `Unknown header <${code}>`;
			// }
		}
		if(e){
			throw new EsyError(e);
		}
	}
}

module.exports = errors;

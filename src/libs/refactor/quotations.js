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

const cache_sys = require('../../core/cache');

function quotations(code) {
	// const cache = cache_lib(code, 10);
	var quotations  = cache_sys.cache('quotations', code, (code) => {
		/**
		 * '/' is for regex expressions like /[a-z]+/ig
		 * @type {string[]}
		 */
		const quotation_signs   = ['"', "'", '`', '/'];
		var quotations  = [];
		var in_q    = false;
		var l_q     = ''; // Either one of " or '
		var bs      = false; // Check for backspace
		var start   = 0; // Start offset
		var comment = '';
		var open_comments   = 0;
		var close_comments  = 0;
		for(var offset = 0; offset < code.length; offset++){
			var l = code[offset];
			if(in_q){
				if(!bs) {
					if (l == l_q) {
						in_q = false;
						quotations.push([start, offset]);
						continue;
					}
					if(l == '\\'){
						bs  = true;
					}
				}else {
					bs = false;
				}
			}else {
				if(quotation_signs.indexOf(l) > -1){
					comment = (l == '/' && code[offset + 1] && code[offset + 1] == '*');
					if(comment)
						open_comments++;
					if(open_comments == close_comments){
						// It's start of a quotation
						start   = offset;
						l_q     = l;
						in_q    = true;
					}
					if(l == '/' && code[offset - 1] && code[offset - 1] == '*')
						close_comments++;
				}
			}
		}
		return quotations;
	});

	// Now we have the code & quotations offsets :), let's find blocks
	return {
		inQuote:function (offset) {
			// var re = cache.memory.list(offset);
			// if(re !== undefined)
			// 	return re;
			for(var i = 0;i < quotations.length;i++){
				if(offset > quotations[i][0] && offset < quotations[i][1]) {
					// cache.memory.list(offset, true);
					return true;
				}
				if(quotations[i+1] && offset < quotations[i+1][0])
					break;
			}
			// cache.memory.list(offset, false);
			return false;
		},
		quotations: quotations
	}
}
module.exports = quotations;
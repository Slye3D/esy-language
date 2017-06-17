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

const quotations    = require('./quotations');
const isSpace       = require('../characters/space');

/**
 * Convert the following pattern to a more readable format for other steps
 *  var square = n => n^2;
 *  It becomes:
 *  var square = n => {return n^2};
 * @param code
 */
function func(code){
	var isQuote     = quotations(code).inQuote;
	var re          = '';
	var isIn        = false;
	var offset ,letter, next;
	for(offset = 0; offset < code.length;offset++){
		if(isQuote(offset)){
			re += code[offset];
			continue;
		}
		letter  = code[offset];
		if(letter == '=' && offset + 1 < code.length){
			if(code[offset + 1] == '>'){
				next = offset + 2;
				while(next < code.length && (isQuote(next) || isSpace(code[next]))){
					next++;
				}
				if(code[next] != '{'){
					re      += '=>{return ';
					isIn    = true;
					offset  = next - 1;
					continue;
				}
			}
		}
		if(isIn && letter == ';'){
			re      += '}';
			isIn    = false;
		}
		re += letter;
	}
	return re;
}
module.exports  = func;
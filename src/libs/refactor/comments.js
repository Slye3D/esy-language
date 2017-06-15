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
/**
 * Clean all comments from code
 */
function comments(code){
	const comment_signs = [
		['//', '\n'],
		['/*', '*/'],
		['<!--', '-->']
	];
	var sign_length = comment_signs.length;
	var isQuote     = quotations(code).inQuote;

	var last_code   = '';
	var close_sign  = '';
	var in_comment  = false;
	var re          = '';
	for(var offset  = 0;offset < code.length;offset++){
		if(isQuote(offset)){
			if(!in_comment)
				re += code[offset];
			continue;
		}
		last_code += code[offset];
		// Just keep last ten code letters
		last_code   = last_code.substring(last_code.length - 10);

		if(!in_comment){
			var g;
			for(var j = 0; j < sign_length;j++){
				if(last_code.substring(last_code.length - comment_signs[j][0].length) == comment_signs[j][0]){
					in_comment  = true;
					close_sign  = comment_signs[j][1];
					g           = comment_signs[j][0];
				}
			}
			if(!in_comment){
				re += code[offset];
			}else {
				re = re.substring(0, re.length - (g.length - 1))
			}
		}else {
			// console.log(last_code.substring(last_code.length - close_sign.length) + ':'+ close_sign + ':' +last_code.substring(last_code.length - close_sign.length).length)
			if(last_code.substring(last_code.length - close_sign.length) == close_sign){
				if(close_sign == '\n')
					re += '\n'
				in_comment = false;
				close_sign = '';
			}
		}
	}
	return re;
}
module.exports  = comments;
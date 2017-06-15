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

const quotations    = require('../libs/refactor/quotations');
const comments      = require('../libs/refactor/comments');
const spaces        = require('../libs/refactor/spaces');
const arrow_func    = require('../libs/refactor/arrow_func');
const return_p      = require('../libs/refactor/return_parenthesis');
const OLB           = require('../libs/refactor/one_line_blocks');
const cache         = require('./cache');

/**
 * Make Structure Tree for given code
 * @param code formatted code without any comments
 *      It's better to have not many unnecessary blank spaces
 * @param start_point
 * @param end_point
 * @param isQuote
 * @returns {Array}
 */
function tree(code, start_point, end_point, isQuote){
	return cache.cache('tree', arguments, () => {
		if(arguments.length == 1){
			code    += '\n';
			code    = comments(code);
			code    = spaces(code);
			code    = arrow_func(code);
		}
		start_point = start_point || 0;
		end_point   = end_point || code.length;
		isQuote     = isQuote || quotations(code).inQuote;

		var isAlphabets = letter => letter >= 'A' && letter <= 'z';

		var re  =   [];

		var oc  = {
			'(': 0,
			')': 0,
			'[': 0,
			']': 0,
		};
		var keys    = Object.keys(oc);
		var notIn       = () => {
			return (oc['('] == oc[')']) && (oc['['] == oc[']']) ;
		};

		var last_code   = '';
		var offset, letter;
		for(offset  = start_point;offset < end_point;offset++){
			if(isQuote(offset)){
				last_code += code[offset];
				continue;
			}
			letter      = code[offset];
			if(keys.indexOf(letter) > -1)
				oc[letter]++;
			if(letter == '{'){
				var o = 0;
				var c = 0;
				var j;
				for(j = offset;j < end_point;j++){
					if(!isQuote(j)){
						if(code[j] == '{')
							o++;
						if(code[j] == '}')
							c++;
						if(o == c)
							break;
					}
				}


				if(last_code[0] == ';')
					last_code = last_code.substr(1);

				o = c = 0;
				for(var t = offset - 1, s = 0;t >= 0 && s < last_code.length;t--,s++){
					if(!isQuote(t)){
						if(code[t] == '(')
							o++;
						if(code[t] == ')')
							c++;
						if(o == c && code[t] == ','){
							break;
						}
						if(code[t] == '=' && code[t+1] == '>'){
							break;
						}
						if((o == c && code[t] !== '(' && o >= 1) || (c + 1 == o) && code[t] == '(') {
							if ((code[t] !== ' ' && code[t] !== '.' && code[t] + code[t+1] !== '=>') && !isAlphabets(code[t])) {
								break;
							}
						}
					}
				}
				var head = last_code.substr(last_code.length - (offset - t - 1)).trim();
				last_code =last_code.substr(0, last_code.length - (offset - t - 1)).trim();
				if(last_code !== '')
					re.push(last_code);
				re.push({
					head: head,
					body: tree(code, offset + 1, j, isQuote)
				});
				last_code = '';
				offset = j;
				continue;
			}
			if(letter   == ';' && notIn() && last_code !== ''){
				if(last_code[0] == ';')
					last_code = last_code.substr(1);
				re.push(last_code);
				last_code   = '';
			}else {
				last_code   += code[offset];
			}
		}
		if(last_code !== '')
			re.push(last_code);
		if(arguments.length == 1){
			re  = return_p(re);
			re  = OLB(re);
		}
		return re;
	}, ['0', '1', '2'])
}
module.exports = tree;
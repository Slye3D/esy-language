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
 * Remove all spaces from source code and put all semicolons
 * @param code
 */
function spaces(code){
	var isQuote     = quotations(code).inQuote;
	var re          = '';
	var isSpace     = letter => [' ', '\t', '\n', '\r'].indexOf(letter) > -1;
	var needSpace   = letter => [
		';','{','}','(',')','=', '[', ']',
		'+', '-', '*', '/', '^',
		'?', ':', ',',
		'!', '%', '&', '<', '>', '|'
	].indexOf(letter) == -1;
	var isAlphabets = letter => letter >= 'A' && letter <= 'z';
	var oc  = {
		'(': 0,
		')': 0,
		'[': 0,
		']': 0,
		'{': 0,
		'}': 0
	};
	var keys    = Object.keys(oc);
	var notIn       = () => {
		return (oc['('] == oc[')']) && (oc['['] == oc[']']) && (oc['{'] == oc['}']) ;
	};
	for(var offset = 0; offset < code.length;offset++){
		if(isQuote(offset)){
			re += code[offset];
		}else {
			if(keys.indexOf(code[offset]) > -1)
				oc[code[offset]]++;
			var next = offset + 1;
			while(next < code.length && (isQuote(next) || isSpace(code[next]))){
				next++;
			}
			var pre = offset - 1;
			while(pre > 0 && (isQuote(pre) || isSpace(code[pre]))){
				pre--;
			}
			if(code[offset] == ';'){
				if([';','}'].indexOf(code[pre]) == -1){
					re += ';';
				}
				continue;
			}
			if(re.length > 0 && code[offset] == '\n' && notIn() && re[re.length - 1] !== ';' && code[next] !== '{' && code[pre] !== '}' && code[pre] !== ';')
				re += ';';
			if(!(offset > 0 && re[re.length - 1] == ' ' && isSpace(code[offset]))){
				if(isSpace(code[offset])){
					if(re.length > 0 && needSpace(re[re.length - 1]))
						re += ' ';
				}else {
					if(!needSpace(code[offset]) && re[re.length - 1] == ' ')
						re = re.substr(0, re.length - 1);
					re += code[offset];
				}
			}

			var as = code[next];
			var second = next + 1;
			while(second < code.length - 1&& isQuote(second)){
				second++;
			}
			as += code[second];
			if(!isAlphabets(code[second + 1]))
				as += ' ';
			if(as == 'as ' && re[re.length - 1] !== ' ')
				re += ' ';
			if(re.length > 0 && code[offset] == ')' && (isAlphabets(code[next]) || code[next] == '}') && as !== 'as ')
				re += ';';
		}
	}
	return re.trim();
}
module.exports  = spaces;
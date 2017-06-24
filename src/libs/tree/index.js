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

// Load modules
const {find}    = require('../../core/blocks');
const comments  = require('./comments');
const spaces    = require('./spaces');
const quotations= require('./quotations');
const AF        = require('./arrow_function');
const OBL       = require('./one_line_blocks');
const EsyError  = require('../errors/esy_error');
const Cache     = require('../../core/cache');

/**
 * Prepare code to use in Tree function
 * @param code
 * @return {*}
 */
function prepare_code(code) {
	return Cache.cache('refactor', code, function () {
		code    = quotations.encode(code);
		code    = comments.encode(code);
		code    = spaces(code);
		code    = AF(code);
		return code;
	})
}

function Tree(code, first_call = true){
	if(first_call)
		code = prepare_code(code);
	return Cache.cache('tree', code, function () {
		var re      = [],
			offset  = 0,
			preCode = '',
			char;
		var insert  = () => {
			preCode = preCode.trim();
			if(preCode.length > 0 && preCode !== ';'){
				preCode = preCode.split(';');
				preCode.forEach(value => {
					if(value !== ';' && value.length > 0)
						re.push(value)
				})
			}
		};
		for(;offset < code.length;offset++){
			char    = code[offset];
			if(char == '{'){
				var o   = 1,    // Number of open braces    {
					c   = 0,    // Number of closed braces  }
					e   = offset;
				while(o !== c){
					e++;
					if(e == code.length)
						throw new EsyError("Unclosed brace!");
					if(code[e] == '}')
						c++;
					if(code[e] == '{')
						o++;
				}
				// Now `e` is offset of last }

				if(preCode.endsWith('\\q') || preCode.endsWith('\\c')){
					var id  = parseInt(code.substring(offset + 1, e), 36);
					var ewq = preCode.endsWith('q');
					var get = (ewq ? quotations : comments).get;
					preCode = preCode.substr(0, preCode.length - 2);
					if(ewq){
						preCode+= get(id);
					}else {
						insert();
						re.push(get(id));
						preCode = '';
					}
				}else {
					var body    = Tree(code.substring(offset + 1, e), false),
						head_len= find(preCode),
						head    = preCode.substr(preCode.length - head_len);
					preCode = preCode.substr(0, preCode.length - head_len).trim();
					if(preCode.endsWith('return'))
						preCode += '~';
					insert();
					preCode = '';
					re.push({
						head: head,
						body: body
					});
				}
				offset = e;
			}else{
				preCode += char;
			}
		}
		insert();
		if(first_call)
			re = OBL(re);
		return re;
	});
}

module.exports = Tree;
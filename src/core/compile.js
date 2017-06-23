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
const Blocks    = require('./blocks');
const keywords = require('./keywords');
const Cache     = require('./cache');
const Beautify  = require('js-beautify').js_beautify;
const Configs   = require('./config');
const isPunctuators = require('../libs/characters/punctuator');

Configs.def('beautify', {
	"indent_size": 4,
	"indent_char": " ",
	"indent_with_tabs": false,
	"eol": "\n",
	"end_with_newline": false,
	"indent_level": 0,
	"preserve_newlines": true,
	"max_preserve_newlines": 10,
	"space_in_paren": false,
	"space_in_empty_paren": false,
	"jslint_happy": false,
	"space_after_anon_function": false,
	"brace_style": "collapse",
	"break_chained_methods": false,
	"keep_array_indentation": false,
	"unescape_strings": false,
	"wrap_line_length": 0,
	"e4x": false,
	"comma_first": false,
	"operator_position": "before-newline"
});

String.prototype.endsWithA  = function (array) {
	for(var string of array){
		if(this.endsWith(string)){
			return true;
		}
	}
	return false;
};

/**
 * Compile esy code to JavaScript and return the beautiful/nested code
 * @param tree
 * @returns {string}
 */
function compile(tree){
	var e;
	if(typeof tree !== 'object') {
		e   = new EsyError('tree argument must be type of array');
		throw e;
	}
	var re  = Cache.cache('compile', tree, function () {
		var offset  = 0,
			re      = '';
		var isComment = code => {
			var regex   = /^(\/\*[\s\S]*?\*\/|\/\/[^\u000A\u000D\u2028\u2029]*|<!--[\s\S]*?-->)$/g;
			return regex.test(code.trim());
		};
		var iskeyword  = code => {
			var regex   = /^\s*\w+\s+/ig;
			return regex.test(code);
		};
		for(; offset < tree.length;offset++){
			if(typeof tree[offset] == 'string'){
				// Now we don't support any replace process on codes, now we just replace blocks
				if(isComment(tree[offset])){
					re += tree[offset] + '\n'
				}else if(iskeyword(tree[offset])){
					var regex   = /^\s*(\w+)\s+/ig;
					var exec    = regex.exec(tree[offset]);
					while (exec === null){
						exec    = regex.exec(tree[offset]);
					}
					var name    = exec[1];
					var parser  = keywords.get(name);
					if(typeof parser == 'function'){
						var ret = parser(tree[offset].substr(name.length).trim());
						re += ret;
						if(ret.trim().endsWithA([')', ']', '}', 'return', 'break', 'continue', 'throw', 'yield', '++', '--'])){
							if(!isPunctuators.endsWith(ret)){
								re += ';\n'
							}
						}
					}else {
						throw new EsyError(`<${name}> is not a valid keyword.`);
					}
				}else {
					re += tree[offset];
					if(tree[offset].trim().endsWithA([')', ']', '}', 'return', 'break', 'continue', 'throw', 'yield', '++', '--'])){
						if(!isPunctuators.endsWith(tree[offset])){
							re += ';\n'
						}
					}
				}
			}else {
				var block   = tree[offset];
				var b       = Blocks.search(block.head);
				if(b){
					// Sth like passing a variable by it's reference
					var o   = {index: offset};
					var r   = b.parser(b.matches, block, tree, o);
					if(r)
						re += r;
					offset  = o.index;
				}else {
					re  += block.head + '{' + compile(block.body) + '}';
				}
			}
		}
		return re;
	});
	return Cache.cache('beautify', [re, Configs.get('beautify')], () => {
		return Beautify(re, Configs.get('beautify'))
	})
}
module.exports  = compile;
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
const keywords  = require('./keywords');
const Cache     = require('./cache');
const Beautify  = require('js-beautify').js_beautify;
const Configs   = require('./config');
const quotations= require('../libs/tree/quotations');
const isPunctuator  = require('../libs/characters/punctuator');

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

function compile(tree) {
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
		var oc  = {
			'(' : 0,
			')' : 0,
			'[' : 0,
			']' : 0
		};
		var keys    = Object.keys(oc);
		var isClose = () => oc['('] == oc[')'] && oc['['] == oc[']'];
		var insert  = (code) => {
			code    = quotations.encode(code);
			for(var i = 0;i < code.length;i++){
				if(keys.indexOf(code[i]) > -1)
					oc[code[i]]++;
			}
			code    = code.replace(/\\q{(\w+?)}/ig, (match) => {
				return quotations.get(parseInt(match.substring(3, match.length - 1), 36))
			});
			re  += code;
			if(
				isClose() && !re.endsWith(';') && !re.endsWith('}') && !re.endsWith(':') &&
				offset !== tree.length - 1 &&
				(!isPunctuator.endsWith(re) ||
					(
						re.endsWith('++') || re.endsWith(')') ||
						re.endsWith('--') || re.endsWith(']')
					)
				)
			)
				re += ';\n'
		};
		var parser;
		for(; offset < tree.length;offset++){
			var code    = tree[offset];
			if(typeof code == 'string'){
				if(isComment(code.trim())){
					code = code.trim()
					if(code[1] == '/'){
						re += '/*'+code.substr(2)+'*/\n'
					}else {
						re += code + '\n';
					}
				}else if(iskeyword(code)){
					var regex   = /^\s*(\w+)\s+/ig;
					var exec    = regex.exec(tree[offset]);
					while (exec === null){
						exec    = regex.exec(tree[offset]);
					}
					var name    = exec[1];
					parser  = keywords.get(name);
					if(typeof parser == 'function'){
						code    = parser(tree[offset].substr(name.length).trim());
					}
					insert(code);
				}else {
					insert(code);
				}
			}else if(code !== undefined){
				parser = Blocks.search(code.head);
				if(parser){
					// Sth like passing a variable by it's reference
					var o   = {index: offset};
					var r   = parser.parser(parser.matches, code, tree, o);
					if(typeof r == 'string')
						insert(r);
					offset  = o.index;
				}else {
					insert(code.head + '{' + compile(code.body) + '}');
				}
			}
		}
		return re
	});

	return Cache.cache('beautify', [re, Configs.get('beautify')], () => {
		return Beautify(re, Configs.get('beautify'))
	})
}
module.exports = compile;
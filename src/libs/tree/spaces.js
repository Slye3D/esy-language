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

const isEOL     = require('../characters/eol');
const isSpace   = require('../characters/space');
const isPunctuators = require('../characters/punctuator');

function spaces(code){
	// Strategy:
	// Trim lines
	// Multiple spaces to one space
	// Multiple EOLs to one EOL
	// Auto semicolon insertion
	// Remove all of EOLs

	// Trim lines
	code    = code.replace(new RegExp(`^${isSpace.regex}+|${isSpace.regex}+$`, 'gm'), '');
	// Convert multiple spaces to one space
	code    = code.replace(new RegExp(`${isSpace.regex}+`, 'g'), ' ');
	// Convert multiple line terminators to one \n
	code    = code.replace(new RegExp(`${isEOL.regex}+`, 'g'), '\n');
	// Remove un-needed spaces
	code    = code.replace(new RegExp('\\s*'+isPunctuators.regex+'\\s*', 'g'), '$1');

	var noTerminatorHere   = {
		behind  : [
			'++',
			'--',
			'continue',
			'break',
			'return',
			'throw',
			'yield',

		],
		ahead : [
			'=>'
		]
	};

	var re      = '',
		offset  = 0,
		char;   // Current character
	var insert  = (x = '') => {
		if(!re.endsWith(';'))
			re += ';' + x
	};

	for(;offset < code.length;offset++){
		char    = code[offset];
		if(((/\d$/g.test(re) && /^\D$/g.test(char) && isEOL(code[offset + 1])) || /(false|true|null)$/ig.test(re)) && !isPunctuators.startsWith(code.substr(offset).trim())){
			insert();
		}
		if(re.endsWith('else') && char !== '{'){
			insert()
		}
		if(!isEOL(char)){
			re += char;
		}else {
			if (!isPunctuators.endsWith(re) && !isPunctuators.startsWith(code.substr(offset + 1).trim())) {
				insert()
			}
			for(var behind of noTerminatorHere.behind){
				if(re.endsWith(behind)){
					insert();
				}
			}
			for(var ahead of noTerminatorHere.ahead){
				if(code.substr(offset + 1).trim().startsWith(ahead)){
					insert();
				}
			}
		}

		if(['}',']', ')'].indexOf(re[re.length - 1]) > -1 && !isPunctuators.startsWith(code.substr(offset + 1).trim())) {
			insert()
		}
	}
	insert();
	return re.replace(new RegExp('\\s*'+isPunctuators.regex+'\\s*', 'g'), '$1');
}

module.exports  = spaces;

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

/**
 * Support for interval and timeout property
 * @param esy
 */
function readline(esy){
	esy.block(/^readline(sync)?\s*([$A-Z_][$A-Z_0-9]*)$/ig, (matches, block, parent, offset) => {
		var isSync      = Boolean(matches[1]);
		var name        = matches[2];
		var callback    = esy.compile(block.body);
		var syncCode    = '';
		if(isSync && offset.index !== parent.length - 1){
			syncCode        = '\n' + esy.compile(parent.slice(offset.index + 1, parent.length));
			offset.index    = parent.length;
		}
		var header      = `const readline = require('readline');`;
		esy.head('esy-readline-0.0.1', header);
		var random  = Math.floor(Math.random() * 100);
		return  `
const rl${random} = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl${random}.on('line', (${name}) => {
	rl${random}.close();  
	${callback}
	${syncCode}
});
`;
	}).keyword('readlinesync');
	return {
		name    : "Esy Readline",
		version : "0.0.3",
		author  : "Slye Development Team"
	};
}
module.exports  = readline;
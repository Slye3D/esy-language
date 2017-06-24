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
	esy.block(/^readline\s*<([$A-Z_][$A-Z_0-9]*)>$/ig, (matches, block) => {
		var name        = matches[1];
		var callback    = esy.compile(block.body);
		var header      = `
const readline = require('readline');
	`;
		esy.head('esy-readline-0.0.1', header);
		var random  = Math.floor(Math.random() * 100);
		var code    = `
const rl${random} = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl${random}.on('line', (${name}) => {
  ${callback}
  rl${random}.close();
});
`;
		return code;
	});
	return {
		name    : "Esy Readline",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = readline;
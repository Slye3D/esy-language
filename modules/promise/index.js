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
 *  Wait [for] sth() as [(data)]{...}error{...}
 *  Promise sth(a1,a2,...)[(resolve, reject)]{....}
 * @param esy
 */
function promise(esy){
	const promise   = /^promise\s*([$A-Z_][$A-Z_0-9]*)?\s*\(((?:(?:\s*[$A-Z_][$A-Z_0-9]*\s*)(?:,(?=\s*[$A-Z_]+))?)+)?\)\s*(?:<([$A-Z_][$A-Z_0-9]*)(?:\s*,\s*([$A-Z_][$A-Z_0-9]*))?>)?$/ig;
	const wait      = /^wait\s+(?:for\s+)?(.+?)(?:\s*as\s*([$_A-Z][$_A-Z0-9]*))?$/ig;
	const error     = /^(?:error|catch)(?:\s+\(([$_A-Z][$_A-Z]*)\))?$/ig;
	/**
	 * Promise Block
	 */
	esy.block(promise, (matches, block) => {
		var func = matches[1];
		var args = matches[2];
		var resolve = matches[3] || 'resolve';
		var reject = matches[4] || 'reject';
		var body = esy.compile(block.body);

		return `function ${func}(${args}){
				return new Promise((${resolve},${reject}) => {
					${body}
				})
			}`;
	});

	/**
	 * Wait [for] block
	 */
	esy.block(wait, (matches, block, parent, offset) => {
		var func    = matches[1];
		var result  = matches[2] || 'result';
		var body    = esy.compile(block.body);

		var er      = false;
		var er_var, er_body;
		var next    = offset.index + 1;
		var p       = new RegExp(error);
		if(typeof parent[next] == 'object' && p.test(parent[next].head)){
			er      = true;
			er_var  = p.exec(parent[next].head);
			while(er_var == null) {
				er_var = p.exec(parent[next].head);
			}
			er_var = er_var[1] || 'reason';
			er_body= esy.compile(parent[next].body);
			offset.index++;
		}
		var re  = `${func}.then(function(${result}){
			${body}
		}`;
		if(er){
			re += `,function(${er_var}){
				${er_body}
			}`
		}
		re  += ');';
		return re;
	});
	return {
		name    : "Esy Promise",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = promise;
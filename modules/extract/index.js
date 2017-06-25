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
 *  Extract block (same functionality with the With block)
 * @param esy
 */
function Extract(esy){
	/**
	 * extract object{...code}
	 */
	esy.block(/^extract\s*(.+?)\s*$/ig, (matches, block) => {
		var obj = matches[1];
		var body = esy.compile(block.body);

		return `(function (__obj) {
	var __names = Object.getOwnPropertyNames(__obj)
	var __defs  = {};
	var __removes = [];
	for(var __k of __names){
		if(this.hasOwnProperty(__k))
			__defs[__k]   = this[__k]
		else
			__removes.push(__k)
		this[__k] = __obj[__k];
	}
	(function (__names, __defs, __removes) {
		${body}
	})();
	for(__k of __names){
		this[__k] = __defs[__k]
	}
	for(__k of __removes){
		delete this[__k]
	}
})(${obj})`;
	});
	return {
		name    : "Esy Extract",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = Extract;
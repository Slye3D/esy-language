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
 * Support for angular.js
 * This version (0.0.1) supports:
 *  config
 *  controller
 * @param esy
 */
function angular(esy) {
	let {block, compile} = esy;

	const regex = /(\$[$A-Z_0-9]*)\.(config|controller)\s*(?:<(.+)>\s*)?\(((?:(?:\s*[$A-Z_][$A-Z_0-9]*\s*)(?:,(?=\s*[$A-Z_]+))?)+)?\)$/ig;

	block(regex, (matches, {body, head}) => {
		let [, app, func, param1, modules] = matches;
		body = compile(body);
		param1 = (param1 ? param1.length : 0) > 0 ? param1 + ', ' : '';
		let module_names    = "'" + modules.split(',').join("','") + "'";
		return `${app}.${func}(${param1}[${module_names}, function(${modules}){
			${body}
		}])`;
	});

	return {
		name    : "Esy Angular",
		version : "0.0.2",
		author  : "Slye Development Team"
	};
}
module.exports = angular;
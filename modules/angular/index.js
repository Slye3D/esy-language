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
 * This version (0.0.3) supports:
 *  config
 *  controller
 * @param esy
 */
function angular(esy) {
	let {block, compile, regex} = esy;

	const pattern   = new regex(
		regex.beginning(),
		regex.group(
			regex.text('$'),
			regex.identifier()
		).capture(),
		regex.text('.'),
		regex.text('config', 'controller').capture(),
		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),
		regex.group(
			regex.text('('),
			regex.arguments().optional().capture(),
			regex.text(')')
		),
		regex.end()
	).autoSpace();

	block(pattern.toObj(), (matches, {body}) => {
		let [, app, func, param1, modules] = matches;
		body = compile(body);
		param1 = (param1 ? param1.length : 0) > 0 ? param1 + ', ' : '';
		let module_names    = "'" + modules.split(',').map(a => a.trim()).join("','") + "'";
		return `${app}.${func}(${param1}[${module_names}, function(${modules}){
			${body}
		}])`;
	});

	return {
		name    : "Esy Angular",
		version : "0.0.3",
		author  : "Slye Development Team"
	};
}
module.exports = angular;
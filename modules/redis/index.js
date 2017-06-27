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

function redis(esy){
	const {block, compile, configs} = esy;

	block(/^redis\s*(?:<(.+?)>\s*)?(\w+)\s+(.*[^,])?\s*$/ig, (matches, {head, body}) => {

	}).keyword('redis');

	return {
		name    : "Esy Redis",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = redis;
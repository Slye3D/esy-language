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

exports.command = 'lpush <key> <values..>';
exports.desc = 'Push one ore more value to configs (Works on arrays)';
exports.builder = function (yargs) {
};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	var isArray = array => typeof array == 'object' && array.length !== undefined;
	var current = esy.configs.get(argv.key);
	if (current === undefined)
		current = [];
	if (!isArray(current))
		return console.error(`<${argv.key}> is not an array`);
	for (var value of argv.values) {
		if (current.indexOf(value) == -1)
			current.push(value)
	}
	esy.configs.set(argv.key, current);
	console.log("Value(s) pushed successfully");
};
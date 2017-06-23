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

exports.command = 'lrem <key> <values..>';
exports.desc    = 'Remove one ore more value from configs (Works on arrays)';
exports.builder = function () {};
exports.handler = function (argv) {
	var {configs}   = require('../../loader')(argv);
	var isArray = array => typeof array == 'object' && array.length !== undefined;
	var current = configs.get(argv.key);
	if (current === undefined)
		current = [];
	if (!isArray(current))
		return console.error(`<${argv.key}> is not an array`);
	var i;
	for (var value of argv.values) {
		i = current.indexOf(value);
		if (i > -1)
			current.splice(i, 1);
	}
	configs.set(argv.key, current);
	console.log("Value(s) removed successfully");
};
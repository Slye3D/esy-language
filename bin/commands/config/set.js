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

exports.command = 'set <key> <value>';
exports.desc = 'Set a config value';
exports.builder = function (yargs) {};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	if(argv.value == 'true')
		argv.value  = true;
	else if(argv.value == 'false')
		argv.value  = false;
	esy.configs.set(argv.key, argv.value);
	console.log("Config changed.")
};
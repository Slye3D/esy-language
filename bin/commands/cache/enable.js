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

exports.command = 'enable';
exports.desc = 'Enable cache functionality for program';
exports.builder = function (yargs) {
};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	esy.configs.set('cache', true);
	console.log('Cache is now enable');
};
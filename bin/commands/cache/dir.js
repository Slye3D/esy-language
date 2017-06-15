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

exports.command = 'dir';
exports.desc = 'Get full path of cache storage';
exports.builder = function (yargs) {};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	console.log(esy.cache.dir())
};
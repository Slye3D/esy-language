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

exports.command = 'clean';
exports.desc = 'Clearing cache storage';
exports.builder = function (yargs) {};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	console.log('Removing cache directory');
	esy.cache.clear().then(function () {
		console.log('Cache directory is empty now.')
	})
};
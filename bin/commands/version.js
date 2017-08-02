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

exports.command = 'version';
exports.desc    = 'Print Esy version';
exports.builder = function (yargs) {
	return yargs.commandDir('config')
};
exports.handler = function (argv) {
	var {version}       = require('../loader')(argv);
    console.log('esy-language@' + version);
};

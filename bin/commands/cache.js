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

exports.command = 'cache <command>';
exports.desc    = 'Mange cache storage';
exports.builder = function (yargs) {
	return yargs.commandDir('cache')
};
exports.handler = function () {
	console.log("Command not found, you can only use:\n\t`esy cache dir`\n\t`esy cache clean`")
};
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

exports.command = 'modules <command>';
exports.desc = 'Manage Esy modules';
exports.builder = function (yargs) {
	return yargs.commandDir('modules')
};
exports.handler = function (argv) {
	console.log("Command not found, use `esy modules --help` for more information")
};
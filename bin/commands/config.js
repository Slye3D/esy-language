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

exports.command = 'config <command>';
exports.desc = 'Manage config values';
exports.builder = function (yargs) {
	return yargs.commandDir('config')
};
exports.handler = function (argv) {
	console.log("Command not found, you can only use:\n\t`esy config set <key> <value>`\n\t`esy config get <key>`")
};
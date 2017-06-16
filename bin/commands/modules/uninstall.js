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

exports.command = 'uninstall <name>';
exports.desc = 'Remove a local module from project';
exports.builder = function (yargs) {
};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	var path = require('path');
	var name = argv.name;
	// check if name is a local path
	if (name[0] == '/' || name[0] == '\\' || name.substr(0, 2) == '..') {
		name = path.join(process.cwd(), name);
	}
	var actives = esy.configs.get('modules');
	if (typeof actives !== 'object' || actives.length === undefined)
		actives = [];
	var index = actives.indexOf(name);
	if (index == -1) {
		console.error("Module is not installed!");
		return;
	}
	actives.splice(index, 1);
	esy.configs.set('modules', name);
	console.log("Nodule uninstalled successfully");
};
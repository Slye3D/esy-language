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

exports.command = 'install <name>';
exports.desc    = 'Add a new module for current project';
exports.builder = function () {};
exports.handler = function (argv) {
	var {modules, configs}  = require('../../loader')(argv);
	var path = require('path');
	var name = argv.name;
	// check if name is a local path
	if (name[0] == '/' || name[0] == '\\' || name.substr(0, 2) == '..') {
		name = path.join(process.cwd(), name);
	}
	try {
		modules.load(name);
		var actives = configs.get('modules');
		if (typeof actives !== 'object' || actives.length === undefined)
			actives = [];
		if (actives.indexOf(name) > -1) {
			console.error("Module is already installed.");
		} else {
			actives.push(name);
			configs.set('modules', actives);
		}
	} catch (e) {
		console.error(`Can not install module <${name}>`);
		console.error("\t", "Detail(s):", e.toString());
	}
};
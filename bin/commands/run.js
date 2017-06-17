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

function run(code) {
	eval(code);
}

exports.command = '* [file]';
exports.desc = 'Manage config values';
exports.builder = function (yargs) {};
exports.handler = function (argv) {
	if(!argv.file)
		return;
	const fs    = require('fs'),
		esy     = require('../loader')(argv);
	var file    = argv.file;
	var data    = fs.readFileSync(file).toString();
	var tree    = esy.tree(data);
	var js      = esy.compile(tree);
	run(js);
};
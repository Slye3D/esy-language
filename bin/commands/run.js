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

const vm    = require('vm');

function run(code) {
	const script = new vm.Script(code);
	var sandbox = {};
	for(var name of sandbox_names){
		if(name !== 'global')
			sandbox[name] = global[name];
		else
			sandbox[name]   = sandbox
	}
	script.runInNewContext(sandbox);
}

exports.command = '* [file]';
exports.desc = 'Run esy file';
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
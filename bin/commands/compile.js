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

var PrettyError = require('pretty-error');

exports.command = 'compile <files..>';
exports.desc = 'Compile Esy file to JavaScript';
exports.builder = function (yargs) {
	yargs
		.option('save', {
			describe: 'Save file in same directory',
			default: false,
			alias: 's'
		})
		.option('tree', {
			describe: 'Just print parsed code tree',
			default: false,
			alias: 't'
		});
};
exports.handler = function (argv) {
	const fs = require('fs'),
		esy = require('../loader')(argv);
	if (argv.tree && argv.files.length > 1)
		return console.error("Error: Can not make tree for multiple files");
	var js = '';
	for (var file of argv.files) {
		var data = fs.readFileSync(file).toString();
		var tree = esy.tree(data);
		if (argv.tree) {
			js = JSON.stringify(tree, null, 4);
		} else {
			js += esy.compile(tree);
		}
	}
	if (argv.save) {
		var to = 'esy.js';
		if (argv.files.length == 1) {
			to = argv.files[0].substr(0, argv.files[0].lastIndexOf(".")) + '.' + (argv.tree ? 'json' : 'js');
		}
		if (typeof argv.save == 'string')
			to = argv.save;
		fs.writeFileSync(to, js);
		console.log(`Output saved to \`${to}\``);
	} else {
		console.log(js)
	}
};

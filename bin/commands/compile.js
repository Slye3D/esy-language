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

var UglifyJS;

exports.command = 'compile <files..>';
exports.desc    = 'Compile Esy file to JavaScript';
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
		})
		.option('min', {
			describe: 'Minify output',
			default: false,
			alias: 'm'
		})
		.option('dest', {
			describe: 'Output destination',
			alias: 'd',
			type: 'string'
		})
		.option('watch', {
			describe: 'Run program in watch mode',
			default: false,
			alias: 'w'
		});
};
exports.handler = function (argv) {
	const fs = require('fs'),
		esy = require('../loader')(argv);
	if (argv.tree && argv.files.length > 1)
		return console.error("Error: Can not make tree for multiple files");
	if(argv.dest == '')
		return console.error("Please specify output destination with --dest option.");
	argv.save = argv.s = Boolean(argv.dest) || Boolean(argv.s);
	var compile = () => {
		var js = '';
		for (var file of argv.files) {
			var data = fs.readFileSync(file).toString();
			var tree = esy.tree(data);
			if (argv.tree) {
				if(argv.min)
					js = JSON.stringify(tree);
				else
					js = JSON.stringify(tree, null, 4);
			} else {
				js += esy.compile(tree);
				if(argv.min){
					UglifyJS = UglifyJS || require("uglify-es");
					js = UglifyJS.minify(js).code
				}
			}
		}
		if (argv.save) {
			var to = 'esy.js';
			if (argv.files.length == 1) {
				to = argv.files[0].substr(0, argv.files[0].lastIndexOf(".")) + (argv.min ? '.min' : '') + '.' + (argv.tree ? 'json' : 'js');
			}
			to = argv.dest || to;
			if (typeof argv.save == 'string')
				to = argv.save;
			fs.writeFileSync(to, js);
			console.log(`Output saved to \`${to}\``);
		} else {
			console.log(js)
		}
	};
	if(argv.w){
		console.log("Watch for changes:");
		for (var file of argv.files) {
			(function (f) {
				fs.watchFile(file, () => {
					console.log("Change detected on <"+f+">");
					compile();
				})
			})(file);
			compile();
		}
	}else {
		compile();
	}
};

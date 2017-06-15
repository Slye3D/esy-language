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
var pe          = new PrettyError();

exports.command = 'compile <file>';
exports.desc = 'Compile Esy file to JavaScript';
exports.builder = function (yargs) {
	yargs
		.option('out', {
			describe: 'Output file descriptor',
			type: 'string',
			alias: 'o'
		})
		.option('save', {
			describe: 'Save file in same directory',
			default: false,
			alias: 's'
		})
		// .option('yes', {
		// 	describe: 'Replace file even if file names are the same, otherwise user should confirm rewrite',
		// 	default: false,
		// 	alias: 'y'
		// })
};
exports.handler = function (argv) {
	const   fs      = require('fs'),
			esy     = require('../loader')(argv);
			path    = require('path');
	var data    = fs.readFileSync(argv.file).toString();
	var tree    = esy.tree(data);
	var js      = esy.compile(tree);
	if(argv.out){
		fs.writeFileSync(path.join(process.cwd(), argv.out), js)
	}else {
	 	if(argv.save){
	 		var file    = argv.file.substr(0, argv.file.lastIndexOf(".")) + '.esy.js';
		    fs.writeFileSync(path.join(process.cwd(), file), js)
		    console.log(`Output saved to \`${file}\``);
	    }else {
		    console.log(js)
	    }
	}
};

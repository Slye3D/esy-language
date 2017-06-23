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

exports.command = 'list';
exports.desc    = 'List all active modules';
exports.builder = function (yargs) {
	yargs
		.option('json', {
			describe: 'Print data in JSON format',
			default: false,
			alias: 'j'
		})
		.option('beauty', {
			describe: 'Print JSON data in human-readable mode',
			default: false,
			alias: 'b'
		});
};
exports.handler = function (argv) {
	var {modules} = require('../../loader')(argv);
	var val = modules.list();
	var {beauty,json}   = argv;
	if (json) {
		if (beauty) {
			console.log(JSON.stringify(val, null, 4))
		} else {
			console.log(JSON.stringify(val))
		}
	} else {
		if (beauty) {
			console.error("--beauty option only works when you're in JSON mode (--json)")
		}
		console.log(`Active modules:`);
		for (var name of val) {
			console.log("\t", name);
		}
	}
};
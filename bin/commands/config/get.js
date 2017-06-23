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

exports.command = 'get <key>';
exports.desc    = 'Set a config value';
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
	var {configs}       = require('../../loader')(argv);
	var val             = configs.get(argv.key);
	var {json, beauty}  = argv;
	if(json){
		if(beauty){
			console.log(JSON.stringify(val, null, 4))
		}else {
			console.log(JSON.stringify(val))
		}
	}else{
		if(beauty){
			console.error("--beauty option only works when you're in JSON mode (--json)")
		}
		console.log(val)
	}
};
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

exports.command = 'status';
exports.desc = 'Get cache status active/deactive';
exports.builder = function (yargs) {
};
exports.handler = function (argv) {
	var esy = require('../../loader')(argv);
	console.log(esy.configs.get('cache') ? 'active' : 'deactive');
};
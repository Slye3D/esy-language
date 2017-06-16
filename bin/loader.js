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

/**
 * Make an instance of Esy and load configurations
 * @param argv
 */
function load(argv) {
	const esy   = require('../src/index');
	esy.configs.load(argv['config']);
	esy.cache.load();
	var modules = esy.configs.get('modules');
	for (var module of modules) {
		try {
			esy.modules.load(module)
		} catch (e) {
			console.error(`Can not load module <${module}>`);
			throw e;
		}
	}
	return esy;
}
module.exports  = load;
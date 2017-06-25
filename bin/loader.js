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

	// Load all extra modules that starts with esy-
	var dependencies = [];
	try{
		var stdout = require('child_process').execSync('npm ls --json');
		dependencies = Object.keys((JSON.parse(stdout))['dependencies']);
	} catch (e){
		console.error(`Can not load list of modules.`)
	}finally {
		dependencies = dependencies.filter(n => n !== 'esy-language' && n.startsWith('esy-'))
		for (var dependency of dependencies) {
			try {
				esy.modules.load(dependency)
			} catch (e) {
				console.error(`Can not load module <${dependency }>`);
			}
		}
	}

	if (argv.environments)
		esy.configs.set('environments', argv.environments, false);
	var modules = esy.configs.get('modules');
	if (typeof modules !== 'object' || modules.length === undefined)
		modules = [];
	for (module of modules) {
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
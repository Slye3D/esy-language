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
 * Allow user to write codes for different environment in one Esy file
 * @param esy
 */
function env(esy) {
	esy.configs.def('environment', []);
	esy.block(/^env\s*(?:("|'|`)(?=[A-z]+\1))?(\w+)\1$/ig, (matches, block, parent, offset) => {
		var env = matches[2];
		var envs = esy.configs.get('environment');
		if (typeof envs !== 'object' || !envs.indexOf)
			envs = [];
		var next = offset.index + 1;
		var el = false;
		if (typeof parent[next] == 'object' && parent[next].head == 'else') {
			offset.index++;
			el = true;
		}
		if (envs.indexOf(env) > -1) {
			return esy.compile(block.body);
		} else if (el) {
			return esy.compile(parent[next].body);
		}
	});
	return {
		name: "Esy Environment",
		version: "0.0.1",
		author: "Slye Development Team"
	};
}
module.exports = env;
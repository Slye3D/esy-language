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
	esy.block(/^env\s*((?:(?:("|'|`)(?=[A-z]+\2))?(\w+)\2(?:\s*,\s*(?=.+))?)+)$/ig, (matches, block, parent, offset) => {
		var env = matches[1].split(",");
		var envs = esy.configs.get('environment');
		if (typeof envs !== 'object' || !envs.indexOf)
			envs = [];
		var match = false;
		for (var e of env) {
			if (['"', "'", '`'].indexOf(e[0]) > -1)
				e = e.substr(1, e.length - 2);
			if (envs.indexOf(e) > -1) {
				match = true;
				break;
			}
		}
		var next = offset.index + 1;
		var el = false;
		if (typeof parent[next] == 'object' && parent[next].head == 'else') {
			offset.index++;
			el = true;
		}
		if (match) {
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
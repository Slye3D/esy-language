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
	/**
	 * ^env\s*              # start with env and some optional spaces
	 *  (                   # capture group 1: list of environments, split by ","
	 *      (?:             # match one environment name, examples: name, "name", 'name', `name`
	 *
	 *          (?: #quotation mark
	 *              ("|'|`)         # capture group 2: match quotations marks: ",',`
	 *              (?=\w+\2)       # check if string ends with the same quotation mark it started
	 *          )?  #quotation mark is optional
	 *
	 *          (?:\w+)     # get environment name without quotation marks
	 *          \2          # name should end with what it started, it's null or a quotation mark
	 *
	 *          (?: #match comma
	 *              \s*,\s*     # it's allowed to use optional spaces around comma notation
	 *              (?=.+)      # comma is not allowed in end of line,
	 *                          #   ex: `env a,v,` is not allowed but `env a,v` has no problem
	 *          )?
	 *      )+
	 *  )
	 *  $           # end of line
	 */
	esy.block(/^env\s*((?:(?:("|'|`)(?=\w+\2))?(?:\w+)\2(?:\s*,\s*(?=.+))?)+)$/ig, (matches, block, parent, offset) => {
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
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
var glob,
	fs,
	path,
	UglifyJS;

// TODO: Completely rewrite this file in better form, it's toooooooooo ugly!

/**
 * Compile files based on build's config and save them to dest folder
 * @param configs       configs.get('builds')
 * @param platform      a key in configs
 * @param dest          folder to save files in configs.get('build_dest')
 * @param cwd           current working directory, same as config's file directory (esy.json)
 * @param esy           Esy
 */
function build(configs, platform, dest, cwd, esy) {
	// Make instance from glob
	glob = glob || require('glob');
	fs = fs || require('fs');
	path = path || require('path');
	UglifyJS = UglifyJS || require("uglify-es");
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest);
	}
	if (!fs.lstatSync(dest).isDirectory()) {
		e = new Error(`Build dir <${dest}> must be a directory.`);
		throw e;
	}
	var keys = Object.keys(configs);
	if (keys.indexOf(platform) == -1) {
		e = new Error(`Platform <${platform}> does not exist on build's config.`);
		throw e;
	}
	var name = platform,
		files = [],
		environments;
	platform = configs[platform];
	environments = (platform.environments ? (typeof platform.environments == 'string' ? [platform.environments] : platform.environments) : []);
	esy.configs.run('environments', environments);
	var patterns = (platform.files ? (typeof platform.files == 'string' ? [platform.files] : platform.files) : []);
	if (patterns.length == 0) {
		return console.error(`Empty files <${name}>`);
	}
	for (var pattern of patterns) {
		var f = glob.sync(pattern, {cwd: cwd});
		for (var file of f) {
			if (files.indexOf(file) == -1)
				files.push(file)
		}
	}
	if (files.length == 0)
		return console.error(`Empty files <${name}>`);
	var re = '';
	for (file of files) {
		var data = fs.readFileSync(file).toString();
		var tree = esy.tree(data);
		re += esy.compile(tree);
	}
	if (name.lastIndexOf('.') > -1)
		name = name.substr(0, name.lastIndexOf("."));
	fs.writeFileSync(path.join(cwd, dest, name + '.js'), re);
	fs.writeFileSync(path.join(cwd, dest, name + '.min.js'), UglifyJS.minify(re).code);
	console.log(`Build <${name}> saved.`);
}

/**
 * Split a text by comma (,)
 * @param string
 * @returns {*}
 */
function split(string) {
	string = string.trim();
	var match_pattern = /^((?:(?:("|'|`)(?=[\s\S]+\2))?(?:[\s\S]+)\2(?:\s*,\s*(?=.+))?)+)$/ig;
	var split_pattern = /("|'|`)(?:[\s\S]+?\1)|\w+/ig;
	if (!match_pattern.test(string))
		return [];
	var values = string.match(split_pattern);
	values.forEach((value, key) => {
		if (['"', "'", '`'].indexOf(value[0]) > -1)
			values[key] = value.substr(1, value.length - 2)
	});
	return values;
}

exports.command = 'build [platforms..]';
exports.desc = 'Compile files from build configs';
exports.builder = function (yargs) {
	yargs
		.option('add', {
			describe: 'Add new build platform',
			default: false,
			alias: 'a'
		})
};
exports.handler = function (argv) {
	fs = fs || require('fs');
	const esy = require('../loader')(argv),
		{configs}   = esy,
		readline = require('readline'),
		cfg_file = esy.configs.file(),
		cwd = cfg_file.substring(0, Math.max(cfg_file.lastIndexOf("/"), cfg_file.lastIndexOf("\\")));
	configs.def('build_dest', 'build');
	configs.def('builds', {});
	var dest = configs.get('build_dest');
	if (argv.add) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		var name_pattern = /^\w+$/ig;
		var ask_name = () => rl.question('Build name:', (name) => {
			name = name.trim();
			if (!name_pattern.test(name))
				return ask_name();
			var ask_files = () => rl.question('Files (separate with ","):', files => {
				files = split(files);
				if (files.length == 0)
					return ask_files();
				rl.question('Environments (separate with ",")::', (environments) => {
					environments = split(environments);
					configs.set(`builds.${name}`, {
						files: files,
						environments: environments
					});
					rl.close();
				})
			});
			ask_files();
		});
		ask_name();
	} else {
		var build_cfg = configs.get('builds'),
			platforms;
		if (argv.platforms.length == 0 && Object.keys(build_cfg).length == 0) {
			return console.error("There is no build config available.\n    Use `--add` option to add one");
		}
		platforms = argv.platforms.length == 0 ? Object.keys(build_cfg) : argv.platforms;
		for (var platform of platforms) {
			build(build_cfg, platform, dest, cwd, esy);
		}
	}
};

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

const tree      = require('./libs/tree');
const compile   = require('./core/compile');
const modules   = require('./core/modules');
const blocks    = require('./core/blocks');
const keywords  = require('./core/keywords');
const configs   = require('./core/config');
const cache     = require('./core/cache');
const head      = require('./core/head');
const glob      = require('glob');
const path      = require('path');

var esy_lang  = {
	tree    : tree,
	compile : compile,
	cache   : cache,
	configs : configs,
	keyword : keywords.add,
	head    : head.add
};
esy_lang['block']   = blocks.add(esy_lang);
esy_lang['modules'] = modules._esy(esy_lang);

// Load modules
(function () {
	var modules = glob.sync('../modules/*/index.js', {cwd: __dirname}),
		len     = modules.length,
		i       = 0;
	for(;i < len;i++)
		esy_lang.modules.load(path.join(__dirname, modules[i]))
})();

module.exports = esy_lang;

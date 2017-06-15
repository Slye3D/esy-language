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

const tree      = require('./core/tree');
const compile   = require('./core/compile');
const modules   = require('./core/modules');
const blocks    = require('./core/blocks');
const configs   = require('./core/config');
const cache     = require('./core/cache');

var esy_lang  = {
	tree    : tree,
	compile : compile,
	cache   : cache,
	configs : configs,
	block   : blocks.add,
	modules : modules._esy(esy_lang)
};

module.exports = esy_lang;

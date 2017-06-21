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

const EsyError          = require('../libs/errors/esy_error');
const VersionCompare    = require('node-version-compare');


global.modules = global.modules || {};
var esy;

function load(name){
	var e;
	try {
		var module = require(name)(esy);
	}catch (e){
		e   = new EsyError(`Can not load module <${name}>.\n${e}`);
		throw e;
	}
	if(typeof module !== 'object'){
		e   = new EsyError(`Can not load module <${name}>.\nEsy module must return an object containing information about the package.`);
		throw e;
	}
	if(!module.name) {
		e   = new EsyError(`Can not load module <${name}>.\nPackage does not have a name.`);
		throw e;
	}
	if(global.modules[module.name] && module[module.name].version == module.version){
		var v   = module.version ? ' ('+module.version+')' : '';
		e       = new EsyError(`Module <${module.name}${v}> has been loaded before.`);
		throw e;
	}

	// Only replace module if it's newer than the current installed version
	// VersionCompare example: ('1.0.0', '1.0.1') -> -1
	// VersionCompare example: ('10.2.0-alpha', '10.2.0-beta') -> 1
	if(global.modules[module.name]){
		if(VersionCompare(global.modules[module.name].version,module.version) == -1){
			global.modules[module.name]    = module;
		}
	}else {
		global.modules[module.name]    = module;
	}
}

function list(){
	return Object.keys(global.modules);
}

function info(name){
	return global.modules[name];
}

module.exports  = {
	_esy: function (_esy) {
		esy = _esy;
		return {
			load: load,
			list: list,
			info: info
		};
	}
};
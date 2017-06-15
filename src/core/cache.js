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

const md5       = require('md5');
const configs   = require('./config');
const fs        = require('fs');
const path      = require('path');
const EsyError  = require('../libs/errors/esy_error');
const rimraf    = require('rimraf');
// Set config default value
configs.def('cache_dir', '.cache');

// Save cache objects
global.cahce    = [];   // List of all available files in cache directory
global.used     = [];   // list of used files to keep them in cleanup process
global.cache_dir= '';

/**
 * Load list of cached values from [cache_dir]/index.json
 */
function load(){
	global.cache_dir    = configs.get('cache_dir'); // Prevent from change value from configs object
	const dir           = path.join(process.cwd(), global.cache_dir);
	const index_path    = path.join(dir, 'index.json');
	var e;
	if(!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	if(!fs.lstatSync(dir).isDirectory()){
		e   = new EsyError(`cache_dir <${dir}> must be a directory.`);
		throw e;
	}
	if(fs.existsSync(index_path)){
		if(!fs.lstatSync(index_path).isFile()){
			e   =  new EsyError(`Cache index <${index_path}> file must be a file.`);
			throw e;
		}
		var data    = fs.readFileSync(index_path);
		try {
			global.cache    = JSON.parse(data);
		}catch (e){
			e   = new EsyError(`Cache index is not a valid JSON string.`);
			throw e;
		}
	}else {
		fs.writeFileSync(index_path, JSON.stringify([]))
	}
	if(!global.cache)
		global.cache = [];
}

/**
 * Open a cache object
 * @param file
 * @returns {*}
 */
function open_file(file) {
	if(global.used.indexOf(file) < 0)
		global.used.push(file);
	var file_path   = path.join(process.cwd(), global.cache_dir, file),
		e           = new EsyError(`Broken cache object <${file}>, try clean cache dir and restart program.`);
	if(fs.existsSync(file_path) && fs.lstatSync(file_path).isFile()){
		var data    = fs.readFileSync(file_path);
		try {
			data = JSON.parse(data);
			return data;
		}catch (err){
			throw e;
		}
	}else {
		throw e;
	}
}

/**
 * Save cache object
 * @param file
 * @param data
 */
function save_file(file, data){
	data    = JSON.stringify(data);
	try {
		if(global.used.indexOf(file) < 0)
			global.used.push(file);
		var file_path= path.join(process.cwd(), global.cache_dir, file);
		fs.writeFileSync(file_path, data);
	}catch (e){
		e   = new EsyError(`Unable to write cache object.\nPlease insure you have the permission to write on this file`);
		throw e;
	}
}

/**
 * Return the cached object if it exists otherwise run the function and saves the return value as a new cache object
 * @param functionality
 * @param inputs
 * @param func
 * @param only
 * @returns {*}
 */
function cache(functionality, inputs, func, only = []){
	var key, keys, i;
	if(typeof inputs == 'string')
		inputs = [inputs];
	if(only.length == 0){
		key =   md5(JSON.stringify(inputs));
	}else {
		keys    = [];
		for(i   = 0;i < only.length;i++){
			keys.push(inputs[only[i]])
		}
		key = md5(JSON.stringify(keys));
	}
	var file    = functionality + '-' + key + '.json',
		re;
	if(global.cache.indexOf(file) > -1){
		try{
			re  = open_file(file);
			return re;
		}catch (err){}
	}
	re  = func(...inputs);
	save_file(file, re);
	return re;
}

/**
 * Use this function to clear cache storage manually
 * @returns {Promise}
 */
function clear(){
	global.cleared  = true;
	return new Promise(resolve => {
		rimraf(path.join(process.cwd(), global.cache_dir), resolve);
	})
}

/**
 * Get full path of cache directory
 * @returns string
 */
function getDir(){
	return path.join(process.cwd(), global.cache_dir);
}

// https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
/**
 * Cleanup the cache directory
 * @param options
 * @param err
 */
function exitHandler(options, err) {
	if (options.cleanup && !global.cleared) {
		const dir           = path.join(process.cwd(), global.cache_dir);
		const index_path    = path.join(dir, 'index.json');
		fs.writeFileSync(index_path, JSON.stringify(global.used));
		if(!global.cache)
			return;
		for(var i = 0;i < global.cache.length;i++){
			if(global.used.indexOf(global.cache[i]) == -1){
				fs.unlink(path.join(dir, global.cache[i]));
			}
		}
	}
	if(options.err) console.log(options.err)
	if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

module.exports  = {
	load    : load,
	cache   : cache,
	clear   : clear,
	dir     : getDir
};
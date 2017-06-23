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
const os        = require('os');
const {Buffer}  = require('buffer');

// Set default config values
configs.def('cache', {
	// By default cache is enable
	'active': true,
	// On linux systems we save all of caches in just one directory
	'dir'   : os.platform() == 'linux' ? '/var/cache/esy' : '.cache',
	// Default cache size limit is 10MB
	// 0 means unlimited
	'limit' : '10M'
});

// %cache_dir/index.json file
global.cache_index  = global.cache_index || {};
// Cache should cache itself!, save open files and we won't reopen this files
global.cache_files  = global.cache_files || {};
// Prevent from loading cache index for multiple times
global.cache_loaded = false;

// Convert a path to absolute path
var toAbsolute  = src => path.isAbsolute(src) ? src : path.join(process.cwd(), src);

/**
 * Convert a size to an integer in bytes
 * @param size
 * @return {number}
 */
function convertToBytes(size){
	var powers  = ['B', 'K', 'M', 'G', 'T', 'P'];
	var regex   = new RegExp('^\\s*(\\d+(?:\\.\d+)?)\\s*(?:(B(?!B)|['+powers.slice(1).join('')+'])([bB])?)?\\s*$', 'gi');
	if(!regex.test(size))
		return NaN;
	var exec    = regex.exec(size);
	var i   = 0;
	while(exec == null){
		i++;
		exec    = regex.exec(size);
		if(i == 10)
			return undefined;
	}
	var number      = parseInt(exec[1]),
		// One of powers member
		suffix      = (exec[2] ? exec[2] : 'B').toUpperCase(),
		// Lowercase b means number was written in bits instead of bytes (b: 98, B:66)
		isBit       = exec[3] && exec[3].charCodeAt(0) == 98;
	return Math.floor((number * Math.pow(1024, powers.indexOf(suffix))) / (isBit ? 8 : 1));
}

// Save cache values as constant, to have a faster access to each of theme
var active      = configs.get('cache.active');
const dir     = toAbsolute(configs.get('cache.dir'));
const limit   = convertToBytes(configs.get('cache.limit'));

/**
 * Load index.json file
 */
function load(){
	if(!active)
		return;
	if(global.cache_loaded)
		return;
	global.cache_loaded = true;

	//Cleanup cache after closing
	process.on('exit', exitHandler.bind(null,{cleanup:true}));

	// Check if cache directory exists
	if(!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	// Check if `dir` path refers to a directory not file or something else
	if(!fs.lstatSync(dir).isDirectory()){
		e   = new EsyError(`cache_dir <${dir}> must be a directory.`);
		throw e;
	}

	// Create absolute path of cache's index.json
	var index_path  = path.join(dir, 'index.json');
	// Check if file exists
	if(fs.existsSync(index_path)){
		// Check if file is really a file not a directory or sth else
		if(!fs.lstatSync(index_path).isFile()){
			e   =  new EsyError(`Cache index <${index_path}> file must be a file.`);
			throw e;
		}
		// Read data from file
		var data    = fs.readFileSync(index_path);
		try {
			global.cache_index  = JSON.parse(data);
			// Add one to runtimes counter
			global.cache_index.runtimes++;
		}catch (e){
			// Use default structure for a non-JSON index file.
			global.cache_index  = {
				runtimes    : 1,
				files       : {},
				removed     : {}
			};
		}
	}else {
		// This is default data for an empty index.json file
		global.cache_index  = {
			runtimes    : 1,
			files       : {},
			removed     : {}
		};
	}
	// Write modified data to the file
	fs.writeFileSync(index_path, JSON.stringify(global.cache_index))
}

/**
 * Load cache object from disk
 * @param key
 * @return {*}
 */
function open_object(key) {
	if(global.cache_files[key])
		return global.cache_files[key];
	try{
		var data    = fs.readFileSync(path.join(dir));
		data        = data.toString();
		global.cache_index.files[key][0]++;
		return JSON.parse(data);
	}catch (e){
		throw e;
	}
}

/**
 * Save cache object to disk
 * @param key
 * @param value
 */
function save_object(key, value){
	var data    = new Buffer(JSON.stringify(value));
	fs.writeFile(path.join(dir, key), data, err => {
		if(err)
			return;
		var uses    = 0;
		if(global.cache_index.removed[key]){
			uses    = global.cache_index.removed[key];
			delete global.cache_index.removed[key];
		}
		uses++;
		var size    = data.length;
		global.cache_index.files[key] = [uses, size];
	});
}

/**
 * Return the cached object if it exists otherwise run the function and saves the returned  value as a new cache object
 * @param functionality
 * @param inputs
 * @param func
 * @param only
 * @return {*}
 */
function cache(functionality, inputs, func, only = []){
	// Return actual function call when cache is disable
	if(!active)
		return func(...inputs);

	// Create cache key
	var key, keys, i, re;
	if(typeof inputs == 'string')
		inputs = [inputs];
	if(only.length == 0){
		key =   md5(functionality + '-' +JSON.stringify(inputs));
	}else {
		keys    = [];
		for(i   = 0;i < only.length;i++){
			keys.push(inputs[only[i]])
		}
		key = md5(functionality + '-' + JSON.stringify(keys));
	}

	if(global.cache_index.files[key]){
		// Object is in cache storage
		try{
			re = open_object(key);
			return re;
		}catch (e){
			re  = func(...inputs);
			save_object(key, re);
			return re;
		}
	}
	re  = func(...inputs);
	save_object(key, re);
	return re;
}

/**
 * Remove cache directory
 */
function clear(){
	return new Promise(resolve => {
		rimraf(path.join(process.cwd(), global.cache_dir), () => {
			active = false;
			global.cache_loaded = false;
			global.cache_index  = {};
			global.cache_files  = {};
			resolve();
		});
	})
}

/**
 * Returns cache status
 * @return {*}
 */
function status(){
	return active;
}

/**
 * Enable cache
 */
function enable(){
	if(!active)
		configs.set('cache.active', true);
	active = true;
}

/**
 * Disable cache
 */
function disable(){
	if(active)
		configs.set('cache.active', false);
	active = false;
}

/**
 * Cleanup cache
 */
function exitHandler() {
	if(!active || !global.cache_loaded || limit == 0)
		return;
	var size    = 0,
		files   = [/*[key, uses_time, size],...*/];
	for(var key in global.cache_index.files){
		if(global.cache_index.files.hasOwnProperty(key)) {
			size += global.cache_index.files[key][1];
			files.push([key, global.cache_index.files[key][0], global.cache_index.files[key][1]])
		}
	}
	// Remove some cache objects
	// 1KB for index.json
	if(size > (limit - 1024)){
		var diff    = size - (limit - 1024);
		// Sort files by file size
		files.sort((a,b) => b[2] - a[2]);
		var remove_files    = [],
			remove_size     = 0,
			j               = 0,
			i;
		// Make a list from files we should remove
		while(diff < remove_size){
			i   = 0;
			while(diff < remove_size && i < files.length){
				if(
					remove_files.indexOf(files[i][0]) == -1 && // Check if file is not currently in list
					(files[i][1]/global.cache_index.runtimes*100) < (25 + (j * 5)) && // skip file if it's so useful
					(files[i][2] <= 2/3 * diff || j > 3) // and skip file (in first 3 runs) if it's larger than our need
				){
					remove_size += files[i][2];
					remove_files.push(files[0]);
				}
				i++;
			}
			j++;
		}
		// Remove files
		remove_files.forEach(key => {
			var uses_time   = global.cache_index.files[key][0];
			delete global.cache_index.files[key];
			global.cache_index.removed[key] = uses_time;
			// Remove file from disk
			fs.unlinkSync(path.join(dir, key));
		})
	}

	// Write new index.json file
	var index_path  = path.join(dir, 'index.json');
	fs.writeFileSync(index_path, JSON.stringify(global.cache_index));
}

module.exports  = {
	load    : load,
	cache   : cache,
	clear   : clear,
	status  : status,
	enable  : enable,
	disable : disable,
	dir     : () => dir
};